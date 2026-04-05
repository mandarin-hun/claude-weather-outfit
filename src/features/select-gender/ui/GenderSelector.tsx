'use client';

import type { Gender } from '@/entities/user';

interface GenderSelectorProps {
  onSelect: (gender: Gender) => void;
}

export function GenderSelector({ onSelect }: GenderSelectorProps) {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-4 py-10">
      <div className="w-full rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-lg backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/70">
        <header className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50 sm:text-3xl">
            어떤 옷차림을 추천해드릴까요?
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            성별을 선택하면 맞춤 코디를 추천해드려요
          </p>
        </header>

        <div className="mt-8 grid grid-cols-2 gap-3">
          <GenderButton
            value="male"
            emoji="🧑"
            label="남성"
            onClick={() => onSelect('male')}
          />
          <GenderButton
            value="female"
            emoji="👩"
            label="여성"
            onClick={() => onSelect('female')}
          />
        </div>

        <p className="mt-6 text-center text-xs text-slate-400 dark:text-slate-500">
          선택은 이 브라우저에만 저장되며, 언제든 변경할 수 있어요.
        </p>
      </div>
    </main>
  );
}

interface GenderButtonProps {
  value: Gender;
  emoji: string;
  label: string;
  onClick: () => void;
}

function GenderButton({ value, emoji, label, onClick }: GenderButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-gender={value}
      className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-sky-400 hover:bg-sky-50 hover:shadow-md active:translate-y-0 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-sky-600 dark:hover:bg-sky-950/40"
    >
      <span className="text-4xl" aria-hidden>
        {emoji}
      </span>
      <span className="text-base font-semibold text-slate-900 dark:text-slate-100">
        {label}
      </span>
    </button>
  );
}
