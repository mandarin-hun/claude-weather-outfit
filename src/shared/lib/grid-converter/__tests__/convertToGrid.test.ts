import { describe, it, expect } from 'vitest';
import { convertToGrid } from '../convertToGrid';

describe('convertToGrid (LCC DFS projection)', () => {
  it('서울시청 좌표를 기상청 격자(60, 127) 근처로 변환한다', () => {
    // 서울시청 공식 좌표: 37.5665, 126.9780
    const result = convertToGrid({ lat: 37.5665, lon: 126.978 });
    expect(result.nx).toBe(60);
    expect(result.ny).toBe(127);
  });

  it('부산시청 좌표를 기상청 격자(98, 76) 근처로 변환한다', () => {
    // 부산시청 좌표: 35.1796, 129.0756
    const result = convertToGrid({ lat: 35.1796, lon: 129.0756 });
    expect(result.nx).toBe(98);
    expect(result.ny).toBe(76);
  });

  it('대전시청 좌표를 기상청 격자(67, 100) 근처로 변환한다', () => {
    // 대전시청 좌표: 36.3504, 127.3845
    const result = convertToGrid({ lat: 36.3504, lon: 127.3845 });
    expect(result.nx).toBe(67);
    expect(result.ny).toBe(100);
  });

  it('정수값만 반환한다', () => {
    const result = convertToGrid({ lat: 37.5665, lon: 126.978 });
    expect(Number.isInteger(result.nx)).toBe(true);
    expect(Number.isInteger(result.ny)).toBe(true);
  });
});
