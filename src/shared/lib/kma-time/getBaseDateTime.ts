export interface KmaBaseDateTime {
  /** YYYYMMDD */
  baseDate: string;
  /** HHMM (e.g. "1400") */
  baseTime: string;
}

/**
 * 기상청 초단기실황(getUltraSrtNcst) API 의 base_date / base_time 계산.
 *
 * 초단기실황은 매시각 :40 에 발표되므로,
 *  - 현재 분 >= 40  →  그 시각의 정각 (HH:00) 사용
 *  - 현재 분 <  40  →  한 시간 전 정각 ((HH-1):00) 사용 (00시인 경우 전날 23시로 롤오버)
 *
 * @param now 기준 시각 (테스트 주입용). 기본값: new Date()
 */
export function getBaseDateTime(now: Date = new Date()): KmaBaseDateTime {
  const base = new Date(now.getTime());

  if (base.getMinutes() < 40) {
    // 이전 정각으로 롤백
    base.setHours(base.getHours() - 1);
  }

  const yyyy = base.getFullYear().toString();
  const mm = String(base.getMonth() + 1).padStart(2, '0');
  const dd = String(base.getDate()).padStart(2, '0');
  const hh = String(base.getHours()).padStart(2, '0');

  return {
    baseDate: `${yyyy}${mm}${dd}`,
    baseTime: `${hh}00`,
  };
}
