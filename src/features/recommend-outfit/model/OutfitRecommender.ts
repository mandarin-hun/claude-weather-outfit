import {
  garmentCatalog,
  type Garment,
  type GarmentId,
} from '@/entities/garment';
import type {
  IOutfitRecommender,
  Outfit,
  OutfitRule,
} from '@/entities/outfit';
import type { Temperature } from '@/entities/weather';

/**
 * 규칙 기반 옷차림 추천기.
 * (SRP) 규칙 매칭 + 카탈로그 해석만 담당.
 * (OCP) 다른 규칙 세트(여성/아동 등) 주입으로 확장.
 * (DIP) 카탈로그를 주입받아 테스트 시 mock 가능.
 */
export class OutfitRecommender implements IOutfitRecommender {
  private readonly rules: OutfitRule[];
  private readonly catalog: Record<GarmentId, Garment>;

  constructor(
    rules: OutfitRule[],
    catalog: Record<GarmentId, Garment> = garmentCatalog,
  ) {
    this.rules = rules;
    this.catalog = catalog;
  }

  recommend(temperature: Temperature): Outfit {
    const matched = this.rules.find(
      (rule) => temperature >= rule.minTemp && temperature < rule.maxTemp,
    );

    if (!matched) {
      throw new Error(
        `기온 ${temperature}℃ 에 매칭되는 옷차림 규칙이 없습니다.`,
      );
    }

    return {
      label: matched.label,
      description: matched.description,
      items: {
        tops: this.resolveAll(matched.items.tops),
        bottoms: this.resolveAll(matched.items.bottoms),
        outerwear: this.resolveAll(matched.items.outerwear),
        shoes: this.resolveAll(matched.items.shoes),
        accessories: this.resolveAll(matched.items.accessories),
      },
    };
  }

  private resolveAll(ids: GarmentId[]): Garment[] {
    return ids.map((id) => {
      const garment = this.catalog[id];
      if (!garment) {
        throw new Error(`Unknown garment id: ${id}`);
      }
      return garment;
    });
  }
}
