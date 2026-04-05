'use client';

import { useEffect, useState } from 'react';
import type { Coordinates } from '@/entities/location';

export type GeolocationStatus = 'idle' | 'loading' | 'success' | 'error';

export interface GeolocationState {
  status: GeolocationStatus;
  coords: Coordinates | null;
  error: string | null;
}

export interface UseGeolocationOptions {
  /** 브라우저 기본값 대체용. 테스트/SSR 시 주입. */
  geolocation?: Geolocation;
  /** 타임아웃(ms). 기본 10초 */
  timeout?: number;
}

/**
 * 브라우저 Geolocation API 훅.
 * (SRP) 위치 조회 상태 관리만 담당.
 */
export function useGeolocation(
  options: UseGeolocationOptions = {},
): GeolocationState {
  const [state, setState] = useState<GeolocationState>({
    status: 'idle',
    coords: null,
    error: null,
  });

  useEffect(() => {
    const geo =
      options.geolocation ??
      (typeof navigator !== 'undefined' ? navigator.geolocation : undefined);

    if (!geo) {
      setState({
        status: 'error',
        coords: null,
        error: '이 브라우저는 위치 조회를 지원하지 않습니다.',
      });
      return;
    }

    setState({ status: 'loading', coords: null, error: null });

    const timeout = options.timeout ?? 10_000;

    geo.getCurrentPosition(
      (pos) => {
        setState({
          status: 'success',
          coords: { lat: pos.coords.latitude, lon: pos.coords.longitude },
          error: null,
        });
      },
      (err) => {
        const message = mapGeolocationError(err);
        setState({ status: 'error', coords: null, error: message });
      },
      {
        enableHighAccuracy: false,
        maximumAge: 60_000,
        timeout,
      },
    );
  }, [options.geolocation, options.timeout]);

  return state;
}

function mapGeolocationError(err: GeolocationPositionError): string {
  switch (err.code) {
    case err.PERMISSION_DENIED:
      return '위치 권한이 거부되었습니다. 브라우저 설정에서 위치 권한을 허용해주세요.';
    case err.POSITION_UNAVAILABLE:
      return '현재 위치를 확인할 수 없습니다.';
    case err.TIMEOUT:
      return '위치 조회 시간이 초과되었습니다.';
    default:
      return '위치 조회 중 오류가 발생했습니다.';
  }
}
