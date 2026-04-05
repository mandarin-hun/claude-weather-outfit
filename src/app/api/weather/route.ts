import { NextResponse } from 'next/server';
import { KmaApiClient, KmaApiError } from '@/shared/api/kma';
import { getKmaServiceKey, MissingEnvError } from '@/shared/config/env';

// 캐시 비활성화 (매 요청마다 최신 기온 조회)
export const dynamic = 'force-dynamic';

/**
 * GET /api/weather?lat={lat}&lon={lon}
 *
 * 위경도를 받아 기상청 격자로 변환 후 현재 기온을 반환.
 * (DIP) 내부적으로 IWeatherProvider 구현체인 KmaApiClient 를 사용.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const latParam = searchParams.get('lat');
  const lonParam = searchParams.get('lon');

  if (!latParam || !lonParam) {
    return NextResponse.json(
      { error: 'lat, lon 쿼리 파라미터가 필요합니다.' },
      { status: 400 },
    );
  }

  const lat = Number(latParam);
  const lon = Number(lonParam);

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    return NextResponse.json(
      { error: 'lat, lon 은 숫자여야 합니다.' },
      { status: 400 },
    );
  }

  // 대한민국 범위 대략 검증 (KMA 격자 범위 벗어나면 에러 발생 가능)
  if (lat < 32 || lat > 39 || lon < 124 || lon > 132) {
    return NextResponse.json(
      { error: '대한민국 범위 내의 좌표를 입력해주세요.' },
      { status: 400 },
    );
  }

  try {
    const serviceKey = getKmaServiceKey();
    const client = new KmaApiClient({ serviceKey });
    const weather = await client.getCurrentWeather({ lat, lon });

    return NextResponse.json(weather);
  } catch (err) {
    if (err instanceof MissingEnvError) {
      console.error('[api/weather] env missing:', err.message);
      return NextResponse.json(
        { error: '서버 설정 오류: KMA 서비스키가 설정되지 않았습니다.' },
        { status: 500 },
      );
    }
    if (err instanceof KmaApiError) {
      console.error('[api/weather] KMA error:', err.code, err.message);
      return NextResponse.json(
        { error: '기상청 API 호출에 실패했습니다.', code: err.code },
        { status: 502 },
      );
    }
    console.error('[api/weather] unexpected error:', err);
    return NextResponse.json(
      { error: '알 수 없는 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
