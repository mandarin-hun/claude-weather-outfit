import type { OutfitRule } from '@/entities/outfit';

/**
 * 여성 기준 기온별 옷차림 추천 규칙.
 * 남성 규칙과 동일한 8단계 기온 구간 + 품목만 여성복으로 교체.
 */
export const womenOutfitRules: OutfitRule[] = [
  {
    minTemp: 28,
    maxTemp: Infinity,
    label: '한여름',
    description: '최대한 시원하고 통기성 좋은 소재로',
    items: {
      tops: ['tank-top', 'tshirt-loose', 'linen-short-shirt', 'blouse'],
      bottoms: ['linen-shorts', 'cotton-shorts', 'flare-skirt'],
      outerwear: [],
      shoes: ['sandals', 'slippers', 'sneakers'],
      accessories: ['bucket-hat', 'sunglasses', 'ball-cap'],
    },
  },
  {
    minTemp: 23,
    maxTemp: 28,
    label: '더움',
    description: '가볍고 활동적인 코디',
    items: {
      tops: ['tshirt', 'blouse', 'linen-short-shirt'],
      bottoms: ['linen-dress', 'a-line-skirt', 'denim-shorts', 'thin-slacks'],
      outerwear: [],
      shoes: ['sneakers', 'sandals', 'loafer-flats'],
      accessories: ['ball-cap', 'sunglasses'],
    },
  },
  {
    minTemp: 20,
    maxTemp: 23,
    label: '따뜻',
    description: '얇은 긴팔 한 장 또는 가디건',
    items: {
      tops: ['long-sleeve-tshirt', 'long-sleeve-blouse', 'thin-shirt'],
      bottoms: ['jeans', 'a-line-skirt', 'slacks', 'flare-skirt'],
      outerwear: ['thin-cardigan'],
      shoes: ['sneakers', 'loafer-flats', 'mary-jane'],
      accessories: [],
    },
  },
  {
    minTemp: 17,
    maxTemp: 20,
    label: '선선',
    description: '얇은 니트나 가디건이 어울려요',
    items: {
      tops: ['thin-knit', 'sweatshirt', 'long-sleeve-blouse'],
      bottoms: ['jeans', 'slacks', 'long-skirt', 'knit-dress'],
      outerwear: ['cardigan', 'thin-windbreaker', 'shirt-jacket'],
      shoes: ['sneakers', 'mary-jane', 'loafer-flats', 'ankle-boots'],
      accessories: [],
    },
  },
  {
    minTemp: 12,
    maxTemp: 17,
    label: '쌀쌀',
    description: '자켓/트렌치코트 챙기세요',
    items: {
      tops: ['knit', 'sweatshirt', 'hoodie'],
      bottoms: ['jeans', 'slacks', 'long-skirt', 'leggings'],
      outerwear: ['blazer', 'denim-jacket', 'trench-coat', 'windbreaker'],
      shoes: ['sneakers', 'ankle-boots', 'mary-jane'],
      accessories: [],
    },
  },
  {
    minTemp: 9,
    maxTemp: 12,
    label: '추움',
    description: '코트와 두꺼운 니트 타이밍',
    items: {
      tops: ['thick-knit', 'turtleneck-knit', 'knit-dress'],
      bottoms: ['skinny-jeans', 'slacks', 'leggings', 'stockings'],
      outerwear: ['trench-coat', 'leather-jacket', 'long-coat'],
      shoes: ['ankle-boots', 'sneakers', 'long-boots'],
      accessories: ['thin-muffler', 'scarf'],
    },
  },
  {
    minTemp: 5,
    maxTemp: 9,
    label: '많이 추움',
    description: '울코트/히트텍 필수',
    items: {
      tops: ['thick-knit', 'turtleneck', 'heattech'],
      bottoms: ['fleece-jeans', 'leggings', 'wool-pants'],
      outerwear: ['wool-coat', 'short-padding', 'long-coat'],
      shoes: ['long-boots', 'ankle-boots', 'winter-boots'],
      accessories: ['muffler', 'beanie', 'leather-gloves', 'earmuffs'],
    },
  },
  {
    minTemp: -Infinity,
    maxTemp: 5,
    label: '한파',
    description: '롱패딩/두꺼운 아우터 필수',
    items: {
      tops: ['thick-knit', 'turtleneck', 'thick-heattech'],
      bottoms: ['fleece-pants', 'fleece-jeans', 'winter-pants'],
      outerwear: ['long-padding', 'heavy-wool-coat', 'fur-coat'],
      shoes: ['winter-boots', 'long-boots', 'winter-sneakers'],
      accessories: ['thick-muffler', 'beanie', 'winter-gloves', 'earmuffs', 'hot-pack'],
    },
  },
];
