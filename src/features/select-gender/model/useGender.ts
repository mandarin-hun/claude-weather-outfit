'use client';

import { useCallback, useEffect, useState } from 'react';
import type { Gender } from '@/entities/user';

const STORAGE_KEY = 'weather-outfit:gender';

export interface UseGenderReturn {
  /** 저장된 성별 (초기 hydration 전에는 null) */
  gender: Gender | null;
  /** localStorage hydration 완료 여부 */
  hydrated: boolean;
  /** 성별 설정 + localStorage 저장 */
  setGender: (g: Gender) => void;
  /** 성별 해제 (변경 플로우에서 사용) */
  clearGender: () => void;
}

function isGender(value: unknown): value is Gender {
  return value === 'male' || value === 'female';
}

/**
 * 성별 선택 상태 훅.
 * (SRP) localStorage 연동 + React 상태 관리만 담당.
 *
 * SSR-safe: localStorage 는 useEffect 안에서만 접근.
 */
export function useGender(): UseGenderReturn {
  const [gender, setGenderState] = useState<Gender | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (isGender(stored)) {
        setGenderState(stored);
      }
    } catch {
      // localStorage 접근 실패(시크릿 모드 등) 시 무시
    }
    setHydrated(true);
  }, []);

  const setGender = useCallback((g: Gender) => {
    try {
      localStorage.setItem(STORAGE_KEY, g);
    } catch {
      // 저장 실패 시 메모리에만 유지
    }
    setGenderState(g);
  }, []);

  const clearGender = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setGenderState(null);
  }, []);

  return { gender, hydrated, setGender, clearGender };
}
