import type { OutfitRule } from '@/entities/outfit';

/**
 * 남성 기준 기온별 옷차림 추천 규칙.
 * 아이템은 garmentCatalog 의 ID 를 참조.
 *
 * (OCP) 품목 추가/변경 시 이 배열만 수정.
 * 구간은 [minTemp, maxTemp) 반열린 구간.
 */
export const menOutfitRules: OutfitRule[] = [
  {
    minTemp: 28,
    maxTemp: Infinity,
    label: '한여름',
    description: '최대한 시원하고 통기성 좋은 소재로',
    items: {
      tops: ['tank-top', 'tshirt-loose', 'linen-short-shirt', 'cooling-tshirt'],
      bottoms: ['linen-shorts', 'cotton-shorts', 'half-slacks', 'jogger-shorts'],
      outerwear: [],
      shoes: ['sneakers', 'sandals', 'slippers', 'aqua-shoes'],
      accessories: ['ball-cap', 'bucket-hat', 'sunglasses'],
    },
  },
  {
    minTemp: 23,
    maxTemp: 28,
    label: '더움',
    description: '반팔 위주, 얇고 가벼운 하의',
    items: {
      tops: ['tshirt', 'pique-shirt', 'thin-short-shirt', 'henley-short'],
      bottoms: ['cotton-pants', 'chino-shorts', 'thin-slacks', 'denim-shorts'],
      outerwear: [],
      shoes: ['sneakers', 'loafers', 'canvas-shoes'],
      accessories: ['ball-cap', 'sunglasses'],
    },
  },
  {
    minTemp: 20,
    maxTemp: 23,
    label: '따뜻',
    description: '긴팔 한 장 또는 얇은 셔츠',
    items: {
      tops: ['long-sleeve-tshirt', 'thin-shirt', 'pique-long', 'thin-hoodie-zipup'],
      bottoms: ['cotton-pants', 'chino-pants', 'slacks', 'jeans'],
      outerwear: ['thin-cardigan'],
      shoes: ['sneakers', 'loafers', 'derby-shoes'],
      accessories: [],
    },
  },
  {
    minTemp: 17,
    maxTemp: 20,
    label: '선선',
    description: '얇은 아우터 하나 걸치기 좋은 날씨',
    items: {
      tops: ['thin-knit', 'sweatshirt', 'long-shirt', 'henley-long'],
      bottoms: ['jeans', 'slacks', 'cotton-pants', 'chino-pants'],
      outerwear: ['thin-cardigan', 'shirt-jacket', 'thin-windbreaker'],
      shoes: ['sneakers', 'loafers', 'chelsea-boots'],
      accessories: [],
    },
  },
  {
    minTemp: 12,
    maxTemp: 17,
    label: '쌀쌀',
    description: '가을 자켓/블레이저가 어울리는 날씨',
    items: {
      tops: ['knit', 'sweatshirt', 'hoodie', 'long-shirt'],
      bottoms: ['jeans', 'cotton-pants', 'slacks', 'corduroy-pants'],
      outerwear: ['blazer', 'denim-jacket', 'military-jacket', 'windbreaker', 'thin-mustang'],
      shoes: ['sneakers', 'chelsea-boots', 'derby-shoes'],
      accessories: [],
    },
  },
  {
    minTemp: 9,
    maxTemp: 12,
    label: '추움',
    description: '코트/두꺼운 자켓이 필요',
    items: {
      tops: ['thick-knit', 'sweatshirt-with-inner', 'turtleneck-knit'],
      bottoms: ['jeans', 'slacks', 'corduroy-pants'],
      outerwear: ['trench-coat', 'leather-jacket', 'wool-blazer', 'thick-military-jacket'],
      shoes: ['boots', 'sneakers', 'chelsea-boots'],
      accessories: ['thin-muffler'],
    },
  },
  {
    minTemp: 5,
    maxTemp: 9,
    label: '많이 추움',
    description: '울코트/히트텍 필수',
    items: {
      tops: ['thick-knit', 'turtleneck', 'heattech'],
      bottoms: ['fleece-jeans', 'fleece-slacks', 'wool-pants'],
      outerwear: ['wool-coat', 'short-padding', 'thick-leather-jacket'],
      shoes: ['boots', 'workers', 'leather-sneakers'],
      accessories: ['muffler', 'beanie', 'leather-gloves'],
    },
  },
  {
    minTemp: -Infinity,
    maxTemp: 5,
    label: '한파',
    description: '롱패딩/두꺼운 아우터 필수',
    items: {
      tops: ['thick-knit', 'turtleneck', 'thick-heattech'],
      bottoms: ['fleece-pants', 'fleece-jeans', 'wool-pants', 'winter-pants'],
      outerwear: ['long-padding', 'thick-short-padding', 'heavy-wool-coat'],
      shoes: ['winter-boots', 'workers', 'winter-sneakers'],
      accessories: ['thick-muffler', 'beanie', 'winter-gloves', 'hot-pack'],
    },
  },
];
