/**
 * 개별 의류 아이템.
 * 카탈로그의 유일한 식별자(id)와 표시명(name) 을 보유.
 */
export interface Garment {
  id: GarmentId;
  name: string;
}

/**
 * 의류 고유 식별자.
 * 카탈로그 키로 사용.
 */
export type GarmentId = string;
