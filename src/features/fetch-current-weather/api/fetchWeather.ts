import type { Coordinates } from '@/entities/location';
import type { Weather } from '@/entities/weather';

export class WeatherFetchError extends Error {
  constructor(message: string, public readonly status?: number) {
    super(message);
    this.name = 'WeatherFetchError';
  }
}

/**
 * 내부 API Route (/api/weather) 호출.
 * (DIP) 구체적인 KMA 호출 로직은 서버에 숨겨져 있으며,
 * 클라이언트는 단순히 {lat, lon} 을 넘기고 Weather 도메인 객체를 받는다.
 */
export async function fetchWeather(coords: Coordinates): Promise<Weather> {
  const url = `/api/weather?lat=${coords.lat}&lon=${coords.lon}`;
  const res = await fetch(url, { cache: 'no-store' });

  if (!res.ok) {
    let message = `날씨 정보 조회 실패 (HTTP ${res.status})`;
    try {
      const body = (await res.json()) as { error?: string };
      if (body?.error) message = body.error;
    } catch {
      // ignore body parse failures
    }
    throw new WeatherFetchError(message, res.status);
  }

  return (await res.json()) as Weather;
}
