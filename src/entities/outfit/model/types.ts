import type { Garment, GarmentId } from '@/entities/garment';
import type { Temperature } from '@/entities/weather';

/**
 * 카테고리별 의류 아이템 ID 컬렉션.
 * 규칙(OutfitRule) 에서 사용하는 입력 타입.
 * 빈 배열은 해당 카테고리 추천 없음을 의미.
 */
export interface OutfitRuleItems {
  tops: GarmentId[];
  bottoms: GarmentId[];
  outerwear: GarmentId[];
  shoes: GarmentId[];
  accessories: GarmentId[];
}

/**
 * 기온 구간별 추천 규칙.
 * [minTemp, maxTemp) 반열린 구간.
 */
export interface OutfitRule {
  minTemp: number;
  maxTemp: number;
  label: string;
  description: string;
  items: OutfitRuleItems;
}

/**
 * 위젯 렌더링용으로 해석된 의류 컬렉션.
 * 각 ID 가 카탈로그에서 Garment 객체로 resolved 됨.
 */
export interface OutfitItems {
  tops: Garment[];
  bottoms: Garment[];
  outerwear: Garment[];
  shoes: Garment[];
  accessories: Garment[];
}

/**
 * 최종 추천 결과 (UI 에서 즉시 사용 가능).
 */
export interface Outfit {
  label: string;
  description: string;
  items: OutfitItems;
}

/**
 * 옷차림 추천기 추상.
 * (DIP) Widget/View 는 이 인터페이스에 의존.
 */
export interface IOutfitRecommender {
  recommend(temperature: Temperature): Outfit;
}
