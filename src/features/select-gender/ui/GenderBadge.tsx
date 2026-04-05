'use client';

import type { Gender } from '@/entities/user';

interface GenderBadgeProps {
  gender: Gender;
  onChange: () => void;
}

const GENDER_LABEL: Record<Gender, { emoji: string; text: string }> = {
  male: { emoji: '🧑', text: '남성' },
  female: { emoji: '👩', text: '여성' },
};

export function GenderBadge({ gender, onChange }: GenderBadgeProps) {
  const info = GENDER_LABEL[gender];
  return (
    <button
      type="button"
      onClick={onChange}
      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 transition hover:border-sky-400 hover:text-sky-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-sky-500 dark:hover:text-sky-300"
      aria-label="성별 변경"
    >
      <span aria-hidden>{info.emoji}</span>
      <span>{info.text}</span>
      <span className="text-slate-400">· 변경</span>
    </button>
  );
}
