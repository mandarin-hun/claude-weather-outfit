import type { Coordinates } from '@/entities/location';
import type { IWeatherProvider, Weather } from '@/entities/weather';
import { convertToGrid } from '@/shared/lib/grid-converter';
import { getBaseDateTime } from '@/shared/lib/kma-time';
import { KmaApiError, type KmaNcstResponse } from './types';

const KMA_ENDPOINT =
  'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst';

export interface KmaApiClientOptions {
  /** 기상청에서 발급받은 Encoding 서비스키 */
  serviceKey: string;
  /** 테스트용 fetch 주입 */
  fetchImpl?: typeof fetch;
  /** 테스트용 now 주입 */
  now?: () => Date;
}

/**
 * 기상청 초단기실황(getUltraSrtNcst) 기반 IWeatherProvider 구현.
 * (SRP) KMA API 호출 및 응답 파싱만 담당.
 */
export class KmaApiClient implements IWeatherProvider {
  private readonly serviceKey: string;
  private readonly fetchImpl: typeof fetch;
  private readonly now: () => Date;

  constructor(options: KmaApiClientOptions) {
    this.serviceKey = options.serviceKey;
    this.fetchImpl = options.fetchImpl ?? fetch;
    this.now = options.now ?? (() => new Date());
  }

  async getCurrentWeather(coords: Coordinates): Promise<Weather> {
    const { nx, ny } = convertToGrid(coords);
    const { baseDate, baseTime } = getBaseDateTime(this.now());

    const url = new URL(KMA_ENDPOINT);
    // serviceKey 는 공공데이터포털에서 이미 URL-encoded 형태로 발급되므로
    // URLSearchParams 를 거치면 이중 인코딩이 발생한다.
    // 따라서 params 문자열을 수동 조립.
    const params = [
      `serviceKey=${this.serviceKey}`,
      'pageNo=1',
      'numOfRows=1000',
      'dataType=JSON',
      `base_date=${baseDate}`,
      `base_time=${baseTime}`,
      `nx=${nx}`,
      `ny=${ny}`,
    ].join('&');

    const fullUrl = `${url.toString()}?${params}`;

    const response = await this.fetchImpl(fullUrl, {
      method: 'GET',
      // Next.js App Router 에서 서버 컴포넌트/route handler 캐시 비활성화
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new KmaApiError(
        String(response.status),
        `KMA API HTTP ${response.status}`,
      );
    }

    // 인증 실패 시 XML(OpenAPI_ServiceResponse) 로 오는 경우 대비
    const contentType = response.headers.get('content-type') ?? '';
    if (!contentType.includes('json')) {
      const text = await response.text();
      throw new KmaApiError(
        'NON_JSON_RESPONSE',
        `KMA API 가 JSON 이 아닌 응답을 반환했습니다 (서비스키 또는 파라미터 확인 필요): ${text.slice(0, 200)}`,
      );
    }

    const json = (await response.json()) as KmaNcstResponse;
    const header = json?.response?.header;

    if (!header || header.resultCode !== '00') {
      throw new KmaApiError(
        header?.resultCode ?? 'UNKNOWN',
        `KMA API 오류: ${header?.resultMsg ?? 'no header'}`,
      );
    }

    const items = json.response.body?.items?.item ?? [];
    const tempItem = items.find((i) => i.category === 'T1H');

    if (!tempItem) {
      throw new KmaApiError(
        'NO_T1H',
        '응답에서 기온(T1H) 데이터를 찾을 수 없습니다.',
      );
    }

    const temperature = Number(tempItem.obsrValue);
    if (Number.isNaN(temperature)) {
      throw new KmaApiError(
        'INVALID_TEMPERATURE',
        `기온 값 파싱 실패: ${tempItem.obsrValue}`,
      );
    }

    // baseDate + baseTime 을 ISO 문자열로 변환
    const observedAt = this.buildObservedAt(tempItem.baseDate, tempItem.baseTime);

    return {
      temperature,
      observedAt,
    };
  }

  private buildObservedAt(baseDate: string, baseTime: string): string {
    // baseDate: YYYYMMDD, baseTime: HHMM  →  로컬 시각 기준 Date 생성
    const y = Number(baseDate.slice(0, 4));
    const m = Number(baseDate.slice(4, 6)) - 1;
    const d = Number(baseDate.slice(6, 8));
    const h = Number(baseTime.slice(0, 2));
    const min = Number(baseTime.slice(2, 4));
    return new Date(y, m, d, h, min, 0).toISOString();
  }
}
