/**
 * 기상청 초단기실황 응답 스키마.
 * https://www.data.go.kr/data/15084084/openapi.do
 */

export interface KmaResponseHeader {
  resultCode: string;
  resultMsg: string;
}

export interface KmaNcstItem {
  baseDate: string;
  baseTime: string;
  /** 관측 카테고리 코드: T1H(기온), RN1(1시간 강수량), UUU, VVV, REH(습도), PTY, VEC, WSD */
  category: string;
  nx: number;
  ny: number;
  obsrValue: string;
}

export interface KmaNcstBody {
  dataType: string;
  items: { item: KmaNcstItem[] };
  pageNo: number;
  numOfRows: number;
  totalCount: number;
}

export interface KmaNcstResponse {
  response: {
    header: KmaResponseHeader;
    body: KmaNcstBody;
  };
}

export class KmaApiError extends Error {
  constructor(
    public readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = 'KmaApiError';
  }
}
