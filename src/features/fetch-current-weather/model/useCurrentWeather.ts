'use client';

import { useEffect, useState } from 'react';
import type { Coordinates } from '@/entities/location';
import type { Weather } from '@/entities/weather';
import { fetchWeather } from '../api/fetchWeather';

export type WeatherStatus = 'idle' | 'loading' | 'success' | 'error';

export interface CurrentWeatherState {
  status: WeatherStatus;
  weather: Weather | null;
  error: string | null;
}

/**
 * 좌표가 주어지면 자동으로 날씨를 조회.
 * (SRP) 날씨 조회 상태 관리만 담당.
 */
export function useCurrentWeather(
  coords: Coordinates | null,
): CurrentWeatherState {
  const [state, setState] = useState<CurrentWeatherState>({
    status: 'idle',
    weather: null,
    error: null,
  });

  useEffect(() => {
    if (!coords) {
      setState({ status: 'idle', weather: null, error: null });
      return;
    }

    let cancelled = false;
    setState({ status: 'loading', weather: null, error: null });

    fetchWeather(coords)
      .then((weather) => {
        if (cancelled) return;
        setState({ status: 'success', weather, error: null });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const message =
          err instanceof Error ? err.message : '날씨 조회 중 오류가 발생했습니다.';
        setState({ status: 'error', weather: null, error: message });
      });

    return () => {
      cancelled = true;
    };
  }, [coords?.lat, coords?.lon]);

  return state;
}
