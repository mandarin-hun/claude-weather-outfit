import type { Coordinates } from '@/entities/location';

/**
 * 기온 (섭씨).
 */
export type Temperature = number;

/**
 * 현재 날씨 스냅샷.
 * KMA 초단기실황 응답을 도메인 모델로 정제한 결과.
 */
export interface Weather {
  temperature: Temperature;
  /** ISO 8601 관측 시각 */
  observedAt: string;
}

/**
 * 날씨 공급자 추상.
 * (DIP + LSP) Features 는 이 인터페이스에 의존하며,
 * 구현체는 KMA/OpenWeatherMap 등 어떤 것으로도 교체 가능.
 */
export interface IWeatherProvider {
  getCurrentWeather(coords: Coordinates): Promise<Weather>;
}
