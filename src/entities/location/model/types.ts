/**
 * 위경도 좌표 (WGS84).
 */
export interface Coordinates {
  lat: number;
  lon: number;
}

/**
 * 기상청 격자 좌표.
 * LCC DFS projection 으로 변환된 정수 X, Y.
 */
export interface GridCoordinates {
  nx: number;
  ny: number;
}

/**
 * 위치 조회 공급자 추상.
 * (ISP) 위치를 얻는 단일 메서드만 노출.
 */
export interface ILocationProvider {
  getCurrentCoordinates(): Promise<Coordinates>;
}
