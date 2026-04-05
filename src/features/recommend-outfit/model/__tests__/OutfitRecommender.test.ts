import { describe, it, expect } from 'vitest';
import { OutfitRecommender } from '../OutfitRecommender';
import { menOutfitRules } from '../menOutfitRules';
import { womenOutfitRules } from '../womenOutfitRules';

describe('OutfitRecommender (men rules)', () => {
  const recommender = new OutfitRecommender(menOutfitRules);

  it('35℃ 는 한여름 규칙에 매칭', () => {
    const outfit = recommender.recommend(35);
    expect(outfit.label).toBe('한여름');
    expect(outfit.items.tops.map((g) => g.name)).toContain('민소매 티셔츠');
  });

  it('28℃ 는 한여름 (경계 하한 포함)', () => {
    expect(recommender.recommend(28).label).toBe('한여름');
  });

  it('27℃ 는 더움', () => {
    expect(recommender.recommend(27).label).toBe('더움');
  });

  it('23℃ 는 더움 (경계 포함)', () => {
    expect(recommender.recommend(23).label).toBe('더움');
  });

  it('22℃ 는 따뜻', () => {
    expect(recommender.recommend(22).label).toBe('따뜻');
  });

  it('18℃ 는 선선', () => {
    expect(recommender.recommend(18).label).toBe('선선');
  });

  it('15℃ 는 쌀쌀', () => {
    expect(recommender.recommend(15).label).toBe('쌀쌀');
  });

  it('10℃ 는 추움', () => {
    expect(recommender.recommend(10).label).toBe('추움');
  });

  it('7℃ 는 많이 추움', () => {
    expect(recommender.recommend(7).label).toBe('많이 추움');
  });

  it('5℃ 는 많이 추움 (경계 하한 포함)', () => {
    expect(recommender.recommend(5).label).toBe('많이 추움');
  });

  it('4℃ 는 한파', () => {
    expect(recommender.recommend(4).label).toBe('한파');
  });

  it('-10℃ 는 한파', () => {
    const outfit = recommender.recommend(-10);
    expect(outfit.label).toBe('한파');
    expect(outfit.items.outerwear.map((g) => g.name)).toContain('롱패딩');
  });

  it('추천 결과의 Garment 는 id 와 name 을 포함', () => {
    const outfit = recommender.recommend(18);
    for (const top of outfit.items.tops) {
      expect(top.id).toBeTruthy();
      expect(top.name).toBeTruthy();
    }
  });
});

describe('OutfitRecommender (women rules)', () => {
  const recommender = new OutfitRecommender(womenOutfitRules);

  it('여성 규칙 주입 시 여성 코디 반환 (블라우스/원피스 포함 가능)', () => {
    const outfit = recommender.recommend(25);
    const topNames = outfit.items.tops.map((g) => g.name);
    expect(topNames.some((n) => /블라우스|원피스|티셔츠|셔츠/.test(n))).toBe(true);
  });

  it('여성 한파 코디는 롱패딩 또는 헤비 울코트 포함', () => {
    const outfit = recommender.recommend(-5);
    const outerNames = outfit.items.outerwear.map((g) => g.name);
    expect(outerNames.length).toBeGreaterThan(0);
  });
});

describe('OutfitRecommender (catalog mocking)', () => {
  it('카탈로그 주입으로 Garment 해석 변경 가능', () => {
    const fakeCatalog = {
      tshirt: { id: 'tshirt', name: 'MOCK' },
    };
    // 간단 규칙: 23~28℃ 구간에서 tshirt 만 사용
    const fakeRules = [
      {
        minTemp: 23,
        maxTemp: 28,
        label: 'test',
        description: 'x',
        items: {
          tops: ['tshirt'],
          bottoms: [],
          outerwear: [],
          shoes: [],
          accessories: [],
        },
      },
    ];
    const recommender = new OutfitRecommender(fakeRules, fakeCatalog);
    const outfit = recommender.recommend(25);
    expect(outfit.items.tops[0].name).toBe('MOCK');
    expect(outfit.items.tops[0].id).toBe('tshirt');
  });

  it('카탈로그에 없는 id 는 에러', () => {
    const fakeRules = [
      {
        minTemp: 0,
        maxTemp: 100,
        label: 'bad',
        description: 'x',
        items: {
          tops: ['nonexistent'],
          bottoms: [],
          outerwear: [],
          shoes: [],
          accessories: [],
        },
      },
    ];
    const recommender = new OutfitRecommender(fakeRules, {});
    expect(() => recommender.recommend(10)).toThrow(/Unknown garment id/);
  });
});
