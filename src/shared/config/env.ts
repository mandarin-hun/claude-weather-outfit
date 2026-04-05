/**
 * 서버 전용 환경변수 로더.
 * 클라이언트 번들에 포함되면 안 되므로 이 모듈은 API Route 등 server-only 코드에서만 import.
 */

export class MissingEnvError extends Error {
  constructor(key: string) {
    super(`환경변수 ${key} 가 설정되지 않았습니다. .env.local 을 확인하세요.`);
    this.name = 'MissingEnvError';
  }
}

export function getKmaServiceKey(): string {
  const key = process.env.KMA_SERVICE_KEY;
  if (!key || key.trim() === '') {
    throw new MissingEnvError('KMA_SERVICE_KEY');
  }
  return key;
}
