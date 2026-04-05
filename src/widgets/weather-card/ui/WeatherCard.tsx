import type { Weather } from '@/entities/weather';
import { Card } from '@/shared/ui';

interface WeatherCardProps {
  weather: Weather;
}

export function WeatherCard({ weather }: WeatherCardProps) {
  const observedLabel = formatObservedAt(weather.observedAt);

  return (
    <Card className="text-center">
      <p className="text-xs font-medium uppercase tracking-widest text-slate-500 dark:text-slate-400">
        현재 기온
      </p>
      <p className="mt-2 text-6xl font-bold text-slate-900 dark:text-slate-50">
        {weather.temperature.toFixed(1)}
        <span className="ml-1 text-3xl font-medium text-slate-500">℃</span>
      </p>
      <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
        기상청 관측 · {observedLabel}
      </p>
    </Card>
  );
}

function formatObservedAt(iso: string): string {
  try {
    const d = new Date(iso);
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const hh = String(d.getHours()).padStart(2, '0');
    const mi = String(d.getMinutes()).padStart(2, '0');
    return `${mm}/${dd} ${hh}:${mi}`;
  } catch {
    return iso;
  }
}
