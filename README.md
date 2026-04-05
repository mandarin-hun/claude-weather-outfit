# 오늘 뭐 입지? (claude-weather-outfit)

사용자의 현재 위치를 감지하고 기상청 초단기실황 API로 실시간 기온을 조회하여
**남성 옷차림**을 추천해주는 웹 애플리케이션입니다.

- **Stack**: Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Vitest
- **Architecture**: Feature-Sliced Design (FSD)
- **Principles**: SOLID

---

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 기상청 서비스키 발급

1. [공공데이터포털](https://www.data.go.kr) 회원가입
2. **"기상청_단기예보((구)_동네예보) 조회서비스"** 검색 후 활용신청
3. 승인 후 발급된 **Encoding 서비스키**(`%2B`, `%3D` 등이 포함된 형태)를 복사

### 3. 환경변수 설정

```bash
cp .env.local.example .env.local
```

`.env.local` 파일을 열어 발급받은 서비스키를 입력:

```
KMA_SERVICE_KEY=발급받은_Encoding_서비스키
```

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속.
(브라우저에서 위치 권한을 허용해야 날씨 정보가 표시됩니다.)

---

## 주요 스크립트

| 명령어 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 프로덕션 서버 실행 |
| `npm run test` | 유닛 테스트 (Vitest) 실행 |
| `npm run test:watch` | 유닛 테스트 watch 모드 |

---

## FSD 디렉토리 구조

```
src/
├── app/                        # Next.js App Router (routing + API)
│   ├── layout.tsx
│   ├── page.tsx                # '/' → HomeView
│   ├── globals.css
│   └── api/weather/route.ts    # KMA 프록시 (서비스키 서버 전용)
├── views/                      # FSD pages (페이지 조합)
│   └── home/
├── widgets/                    # 독립 UI 블록
│   ├── weather-card/
│   └── outfit-recommendation/
├── features/                   # 사용자 상호작용
│   ├── detect-location/        # useGeolocation
│   ├── fetch-current-weather/  # useCurrentWeather + fetchWeather
│   └── recommend-outfit/       # OutfitRecommender + outfitRules
├── entities/                   # 도메인 모델 (순수 타입)
│   ├── weather/
│   ├── location/
│   └── outfit/
└── shared/                     # 공용 인프라
    ├── api/kma/                # KmaApiClient (IWeatherProvider)
    ├── lib/grid-converter/     # LCC DFS 좌표 변환
    ├── lib/kma-time/           # base_date/base_time 계산
    ├── ui/                     # Card / Skeleton / ErrorMessage
    └── config/env.ts           # 환경변수 검증
```

**의존성 규칙**: `app → views → widgets → features → entities → shared`
(상위 레이어는 하위 레이어만 import 가능)

---

## SOLID 원칙 적용

- **SRP** — `KmaApiClient` 는 API 호출만, `OutfitRecommender` 는 규칙 매칭만, `GridConverter` 는 좌표 변환만 담당
- **OCP** — `outfitRules.ts` 배열에 규칙만 추가하면 추천 로직 수정 없이 구간 확장 가능
- **LSP** — `IWeatherProvider` 인터페이스로 KMA 외 다른 기상 서비스로 치환 가능
- **ISP** — `ILocationProvider`, `IWeatherProvider`, `IOutfitRecommender` 를 각각 분리하여 필요한 메서드만 의존
- **DIP** — `features` 는 `entities` 에 선언된 추상(interface)에 의존. 클라이언트는 `/api/weather` 를 호출할 뿐 KMA 세부사항 모름

---

## 데이터 흐름

```
HomeView
  └─ useGeolocation() → {lat, lon}
  └─ useCurrentWeather({lat, lon})
       └─ fetch('/api/weather?lat=..&lon=..')
            └─ API Route → KmaApiClient.getCurrentWeather()
                 ├─ convertToGrid({lat, lon}) → {nx, ny}
                 ├─ getBaseDateTime() → {baseDate, baseTime}
                 └─ KMA getUltraSrtNcst 호출 → T1H 추출
       └─ Weather { temperature, observedAt }
  └─ OutfitRecommender.recommend(temperature)
       └─ Outfit { label, description, items: {tops, bottoms, ...} }
  └─ <WeatherCard /> + <OutfitRecommendation />
```

---

## 기온 구간별 추천 규칙 (남성)

| 기온 구간 | 라벨 | 예시 코디 |
| --- | --- | --- |
| 28℃~ | 한여름 | 민소매 / 반팔 / 반바지 / 샌들 |
| 23~27℃ | 더움 | 반팔 / 얇은 슬랙스 / 스니커즈 |
| 20~22℃ | 따뜻 | 긴팔 / 얇은 셔츠 / 면바지 |
| 17~19℃ | 선선 | 얇은 니트 / 가디건 / 청바지 |
| 12~16℃ | 쌀쌀 | 블레이저 / 야상 / 청바지 |
| 9~11℃ | 추움 | 트렌치코트 / 두꺼운 니트 |
| 5~8℃ | 많이 추움 | 울코트 / 히트텍 / 기모 바지 |
| ~4℃ | 한파 | 롱패딩 / 방한부츠 / 머플러 / 장갑 |

---

## 검증 체크리스트

- [ ] `npm run test` → 모든 유닛 테스트 통과
- [ ] `npm run build` → 타입 체크 + 프로덕션 빌드 성공
- [ ] `npm run dev` 접속 시 위치 권한 요청이 뜬다
- [ ] 권한 허용 시 현재 기온과 옷차림이 표시된다
- [ ] 권한 거부 시 안내 메시지가 표시된다
- [ ] `curl "http://localhost:3000/api/weather?lat=37.5665&lon=126.978"` → 기온 JSON 반환
