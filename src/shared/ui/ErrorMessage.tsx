interface ErrorMessageProps {
  title?: string;
  message: string;
}

export function ErrorMessage({ title = '오류', message }: ErrorMessageProps) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-800 dark:border-red-900 dark:bg-red-950/50 dark:text-red-200">
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1 text-sm">{message}</p>
    </div>
  );
}
