import type { Garment, GarmentId } from './types';

/**
 * 의류 카탈로그 (단일 소스 원칙).
 * 규칙(OutfitRule) 은 여기서 id 만 참조하고, 이름은 여기서 관리.
 *
 * (OCP) 아이템 추가 시 이 객체에만 항목을 더하면 됨.
 */
export const garmentCatalog: Record<GarmentId, Garment> = {
  // ============ 상의 (tops) ============
  'tank-top': { id: 'tank-top', name: '민소매 티셔츠' },
  'tshirt-loose': { id: 'tshirt-loose', name: '루즈핏 반팔 티셔츠' },
  'tshirt': { id: 'tshirt', name: '반팔 티셔츠' },
  'linen-short-shirt': { id: 'linen-short-shirt', name: '린넨 반팔 셔츠' },
  'cooling-tshirt': { id: 'cooling-tshirt', name: '쿨링 기능성 티셔츠' },
  'pique-shirt': { id: 'pique-shirt', name: '피케 셔츠' },
  'thin-short-shirt': { id: 'thin-short-shirt', name: '얇은 반팔 셔츠' },
  'henley-short': { id: 'henley-short', name: '헨리넥 반팔' },
  'long-sleeve-tshirt': { id: 'long-sleeve-tshirt', name: '긴팔 티셔츠' },
  'thin-shirt': { id: 'thin-shirt', name: '얇은 셔츠' },
  'pique-long': { id: 'pique-long', name: '피케 긴팔' },
  'thin-hoodie-zipup': { id: 'thin-hoodie-zipup', name: '얇은 후드 집업' },
  'henley-long': { id: 'henley-long', name: '헨리넥 긴팔' },
  'thin-knit': { id: 'thin-knit', name: '얇은 니트' },
  'sweatshirt': { id: 'sweatshirt', name: '맨투맨' },
  'long-shirt': { id: 'long-shirt', name: '긴팔 셔츠' },
  'hoodie': { id: 'hoodie', name: '후드티' },
  'knit': { id: 'knit', name: '니트' },
  'thick-knit': { id: 'thick-knit', name: '두꺼운 니트' },
  'turtleneck-knit': { id: 'turtleneck-knit', name: '터틀넥 니트' },
  'turtleneck': { id: 'turtleneck', name: '터틀넥' },
  'heattech': { id: 'heattech', name: '히트텍/기모 이너' },
  'thick-heattech': { id: 'thick-heattech', name: '두꺼운 히트텍 이너' },
  'sweatshirt-with-inner': { id: 'sweatshirt-with-inner', name: '맨투맨 + 이너' },

  // ============ 하의 (bottoms) ============
  'linen-shorts': { id: 'linen-shorts', name: '린넨 반바지' },
  'cotton-shorts': { id: 'cotton-shorts', name: '면 반바지' },
  'half-slacks': { id: 'half-slacks', name: '하프 슬랙스' },
  'jogger-shorts': { id: 'jogger-shorts', name: '조거 쇼츠' },
  'cotton-pants': { id: 'cotton-pants', name: '면바지' },
  'chino-shorts': { id: 'chino-shorts', name: '치노 쇼츠' },
  'thin-slacks': { id: 'thin-slacks', name: '얇은 슬랙스' },
  'denim-shorts': { id: 'denim-shorts', name: '데님 반바지' },
  'chino-pants': { id: 'chino-pants', name: '치노팬츠' },
  'slacks': { id: 'slacks', name: '슬랙스' },
  'jeans': { id: 'jeans', name: '청바지' },
  'corduroy-pants': { id: 'corduroy-pants', name: '코듀로이 팬츠' },
  'fleece-jeans': { id: 'fleece-jeans', name: '기모 청바지' },
  'fleece-slacks': { id: 'fleece-slacks', name: '기모 슬랙스' },
  'wool-pants': { id: 'wool-pants', name: '울 팬츠' },
  'fleece-pants': { id: 'fleece-pants', name: '기모 바지' },
  'winter-pants': { id: 'winter-pants', name: '방한 팬츠' },

  // ============ 아우터 (outerwear) ============
  'thin-cardigan': { id: 'thin-cardigan', name: '얇은 가디건' },
  'shirt-jacket': { id: 'shirt-jacket', name: '셔츠 자켓' },
  'thin-windbreaker': { id: 'thin-windbreaker', name: '얇은 바람막이' },
  'blazer': { id: 'blazer', name: '블레이저' },
  'denim-jacket': { id: 'denim-jacket', name: '데님 자켓' },
  'military-jacket': { id: 'military-jacket', name: '야상 자켓' },
  'windbreaker': { id: 'windbreaker', name: '바람막이' },
  'thin-mustang': { id: 'thin-mustang', name: '얇은 무스탕' },
  'trench-coat': { id: 'trench-coat', name: '트렌치코트' },
  'leather-jacket': { id: 'leather-jacket', name: '가죽 자켓' },
  'wool-blazer': { id: 'wool-blazer', name: '울 블레이저' },
  'thick-military-jacket': { id: 'thick-military-jacket', name: '두꺼운 야상' },
  'wool-coat': { id: 'wool-coat', name: '울 코트' },
  'short-padding': { id: 'short-padding', name: '숏패딩' },
  'thick-leather-jacket': { id: 'thick-leather-jacket', name: '두꺼운 가죽 자켓' },
  'long-padding': { id: 'long-padding', name: '롱패딩' },
  'thick-short-padding': { id: 'thick-short-padding', name: '두꺼운 숏패딩' },
  'heavy-wool-coat': { id: 'heavy-wool-coat', name: '헤비 울코트' },

  // ============ 신발 (shoes) ============
  'sneakers': { id: 'sneakers', name: '스니커즈' },
  'sandals': { id: 'sandals', name: '샌들' },
  'slippers': { id: 'slippers', name: '슬리퍼' },
  'aqua-shoes': { id: 'aqua-shoes', name: '아쿠아슈즈' },
  'loafers': { id: 'loafers', name: '로퍼' },
  'canvas-shoes': { id: 'canvas-shoes', name: '캔버스화' },
  'derby-shoes': { id: 'derby-shoes', name: '더비 슈즈' },
  'chelsea-boots': { id: 'chelsea-boots', name: '첼시 부츠' },
  'boots': { id: 'boots', name: '부츠' },
  'workers': { id: 'workers', name: '워커' },
  'leather-sneakers': { id: 'leather-sneakers', name: '가죽 스니커즈' },
  'winter-boots': { id: 'winter-boots', name: '방한 부츠' },
  'winter-sneakers': { id: 'winter-sneakers', name: '방한 스니커즈' },

  // ============ 액세서리 (accessories) ============
  'ball-cap': { id: 'ball-cap', name: '볼캡' },
  'bucket-hat': { id: 'bucket-hat', name: '버킷햇' },
  'sunglasses': { id: 'sunglasses', name: '선글라스' },
  'thin-muffler': { id: 'thin-muffler', name: '얇은 머플러' },
  'muffler': { id: 'muffler', name: '머플러' },
  'beanie': { id: 'beanie', name: '비니' },
  'leather-gloves': { id: 'leather-gloves', name: '가죽 장갑' },
  'thick-muffler': { id: 'thick-muffler', name: '두꺼운 머플러' },
  'winter-gloves': { id: 'winter-gloves', name: '방한 장갑' },
  'hot-pack': { id: 'hot-pack', name: '핫팩' },

  // ============ 여성 전용 추가 아이템 ============
  'blouse': { id: 'blouse', name: '블라우스' },
  'long-sleeve-blouse': { id: 'long-sleeve-blouse', name: '긴팔 블라우스' },
  'dress': { id: 'dress', name: '원피스' },
  'linen-dress': { id: 'linen-dress', name: '린넨 원피스' },
  'knit-dress': { id: 'knit-dress', name: '니트 원피스' },
  'cardigan': { id: 'cardigan', name: '가디건' },
  'flare-skirt': { id: 'flare-skirt', name: '플레어 스커트' },
  'a-line-skirt': { id: 'a-line-skirt', name: 'A라인 스커트' },
  'long-skirt': { id: 'long-skirt', name: '롱 스커트' },
  'leggings': { id: 'leggings', name: '레깅스' },
  'skinny-jeans': { id: 'skinny-jeans', name: '스키니진' },
  'long-coat': { id: 'long-coat', name: '롱 코트' },
  'fur-coat': { id: 'fur-coat', name: '퍼 코트' },
  'mary-jane': { id: 'mary-jane', name: '메리제인 슈즈' },
  'ankle-boots': { id: 'ankle-boots', name: '앵클 부츠' },
  'long-boots': { id: 'long-boots', name: '롱 부츠' },
  'heels': { id: 'heels', name: '힐' },
  'loafer-flats': { id: 'loafer-flats', name: '플랫 슈즈' },
  'scarf': { id: 'scarf', name: '스카프' },
  'earmuffs': { id: 'earmuffs', name: '귀마개' },
  'stockings': { id: 'stockings', name: '스타킹' },
};

/**
 * 카탈로그에서 Garment 를 조회. 없으면 예외.
 */
export function getGarment(id: GarmentId): Garment {
  const g = garmentCatalog[id];
  if (!g) {
    throw new Error(`Unknown garment id: ${id}`);
  }
  return g;
}
