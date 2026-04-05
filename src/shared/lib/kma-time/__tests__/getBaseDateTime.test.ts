import { describe, it, expect } from 'vitest';
import { getBaseDateTime } from '../getBaseDateTime';

describe('getBaseDateTime', () => {
  it(':40 이후 시각은 해당 시각의 정각을 base_time 으로 사용', () => {
    // 2026-04-05 14:40 → baseTime = 1400
    const now = new Date(2026, 3, 5, 14, 40, 0);
    const result = getBaseDateTime(now);
    expect(result.baseDate).toBe('20260405');
    expect(result.baseTime).toBe('1400');
  });

  it(':41 도 해당 시각의 정각 사용', () => {
    const now = new Date(2026, 3, 5, 14, 41, 0);
    const result = getBaseDateTime(now);
    expect(result.baseTime).toBe('1400');
  });

  it(':39 이전은 이전 시각의 정각 사용', () => {
    // 2026-04-05 14:39 → baseTime = 1300
    const now = new Date(2026, 3, 5, 14, 39, 0);
    const result = getBaseDateTime(now);
    expect(result.baseDate).toBe('20260405');
    expect(result.baseTime).toBe('1300');
  });

  it('00:39 은 전날 23시로 롤오버', () => {
    // 2026-04-05 00:39 → baseDate = 20260404, baseTime = 2300
    const now = new Date(2026, 3, 5, 0, 39, 0);
    const result = getBaseDateTime(now);
    expect(result.baseDate).toBe('20260404');
    expect(result.baseTime).toBe('2300');
  });

  it('00:40 은 당일 00시 사용', () => {
    const now = new Date(2026, 3, 5, 0, 40, 0);
    const result = getBaseDateTime(now);
    expect(result.baseDate).toBe('20260405');
    expect(result.baseTime).toBe('0000');
  });

  it('월/년 경계에서도 정상 롤오버', () => {
    // 2026-01-01 00:39 → 2025-12-31 23:00
    const now = new Date(2026, 0, 1, 0, 39, 0);
    const result = getBaseDateTime(now);
    expect(result.baseDate).toBe('20251231');
    expect(result.baseTime).toBe('2300');
  });

  it('baseTime 은 4자리 문자열이다', () => {
    const now = new Date(2026, 3, 5, 9, 5, 0); // 09시 → 0800
    const result = getBaseDateTime(now);
    expect(result.baseTime).toHaveLength(4);
    expect(result.baseTime).toBe('0800');
  });
});
