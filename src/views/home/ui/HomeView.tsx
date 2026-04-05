'use client';

import { useMemo } from 'react';
import { useGeolocation } from '@/features/detect-location';
import { useCurrentWeather } from '@/features/fetch-current-weather';
import {
  OutfitRecommender,
  menOutfitRules,
  womenOutfitRules,
} from '@/features/recommend-outfit';
import {
  GenderBadge,
  GenderSelector,
  useGender,
} from '@/features/select-gender';
import { WeatherCard } from '@/widgets/weather-card';
import { OutfitRecommendation } from '@/widgets/outfit-recommendation';
import { Card, ErrorMessage, Skeleton } from '@/shared/ui';

export function HomeView() {
  const { gender, hydrated, setGender, clearGender } = useGender();
  const geo = useGeolocation();
  const weatherState = useCurrentWeather(geo.coords);

  // (DIP) View 는 IOutfitRecommender 추상에 의존. 성별별 규칙 주입.
  const recommender = useMemo(() => {
    const rules = gender === 'female' ? womenOutfitRules : menOutfitRules;
    return new OutfitRecommender(rules);
  }, [gender]);

  const outfit =
    weatherState.status === 'success' && weatherState.weather && gender
      ? recommender.recommend(weatherState.weather.temperature)
      : null;

  // localStorage hydration 전에는 빈 화면 (깜빡임 방지)
  if (!hydrated) {
    return <main className="min-h-screen" />;
  }

  // 성별 미선택 → 성별 선택 화면
  if (gender === null) {
    return <GenderSelector onSelect={setGender} />;
  }

  // 성별 선택됨 → 메인 화면
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-5 px-4 py-10 sm:py-16">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
            오늘 뭐 입지?
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            현재 위치의 기온에 맞는 옷차림을 추천해드려요
          </p>
        </div>
        <GenderBadge gender={gender} onChange={clearGender} />
      </header>

      {geo.status === 'loading' && (
        <Card className="text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            위치 정보를 불러오는 중...
          </p>
        </Card>
      )}

      {geo.status === 'error' && geo.error && (
        <ErrorMessage title="위치 조회 실패" message={geo.error} />
      )}

      {geo.status === 'success' && weatherState.status === 'loading' && (
        <>
          <Card className="text-center">
            <Skeleton className="mx-auto h-4 w-20" />
            <Skeleton className="mx-auto mt-4 h-14 w-40" />
            <Skeleton className="mx-auto mt-4 h-3 w-32" />
          </Card>
          <Card>
            <Skeleton className="h-4 w-32" />
            <Skeleton className="mt-4 h-20 w-full" />
          </Card>
        </>
      )}

      {weatherState.status === 'error' && weatherState.error && (
        <ErrorMessage title="날씨 조회 실패" message={weatherState.error} />
      )}

      {weatherState.status === 'success' && weatherState.weather && outfit && (
        <>
          <WeatherCard weather={weatherState.weather} />
          <OutfitRecommendation outfit={outfit} />
        </>
      )}

      <footer className="mt-auto pt-8 text-center text-xs text-slate-400 dark:text-slate-500">
        기상청 초단기실황 API · FSD + SOLID
      </footer>
    </main>
  );
}
