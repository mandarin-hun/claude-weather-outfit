import type { Outfit, OutfitItems } from '@/entities/outfit';
import { Card } from '@/shared/ui';

interface OutfitRecommendationProps {
  outfit: Outfit;
}

const CATEGORY_LABELS: Record<keyof OutfitItems, string> = {
  tops: '상의',
  bottoms: '하의',
  outerwear: '아우터',
  shoes: '신발',
  accessories: '액세서리',
};

const CATEGORY_ORDER: Array<keyof OutfitItems> = [
  'outerwear',
  'tops',
  'bottoms',
  'shoes',
  'accessories',
];

export function OutfitRecommendation({ outfit }: OutfitRecommendationProps) {
  return (
    <Card>
      <div className="flex items-baseline gap-3">
        <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700 dark:bg-sky-950 dark:text-sky-200">
          {outfit.label}
        </span>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {outfit.description}
        </p>
      </div>

      <div className="mt-5 space-y-4">
        {CATEGORY_ORDER.map((category) => {
          const items = outfit.items[category];
          if (!items || items.length === 0) return null;

          return (
            <section key={category}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {CATEGORY_LABELS[category]}
              </h3>
              <ul className="mt-2 flex flex-wrap gap-2">
                {items.map((garment) => (
                  <li
                    key={garment.id}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  >
                    {garment.name}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </Card>
  );
}
