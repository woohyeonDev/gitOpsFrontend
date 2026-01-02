# Tube Standard Web

Tube Standard API를 테스트하기 위한 SvelteKit 기반 웹 애플리케이션

## 기능

- LTI 1.3 SSO API 연결 테스트
- 플랫폼 등록 UI
- 등록된 플랫폼 목록 조회
- API 엔드포인트 정보 확인

## 기술 스택

- **Framework**: SvelteKit
- **Styling**: TailwindCSS
- **Language**: TypeScript

## 설치

```bash
# 프로젝트 디렉토리로 이동
cd tube-standard-web

# 의존성이 이미 설치되어 있으므로 생략 가능
npm install
```

## 환경 설정

`.env` 파일을 생성하고 API URL을 설정합니다:

```env
PUBLIC_API_URL=http://localhost:3000
```

## 실행

```bash
# 개발 서버 실행
npm run dev

# 브라우저에서 자동으로 열기
npm run dev -- --open

# 포트 지정
npm run dev -- --port 5173
```

기본적으로 `http://localhost:5173`에서 실행됩니다.

## 프로덕션 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드된 앱 미리보기
npm run preview
```

## 사용 방법

### 1. API 서버 실행

먼저 `tube-standard-api` 서버를 실행해야 합니다:

```bash
cd ../tube-standard-api
npm run start:dev
```

### 2. 웹 애플리케이션 실행

```bash
cd ../tube-standard-web
npm run dev -- --open
```

### 3. API 테스트

웹 페이지에서 다음을 수행할 수 있습니다:

1. **API 연결 테스트**: API Base URL을 입력하고 "연결 테스트" 버튼 클릭
2. **플랫폼 등록**: 폼에 플랫폼 정보를 입력하고 등록
3. **플랫폼 목록 조회**: "새로고침" 버튼으로 등록된 플랫폼 목록 확인

## 프로젝트 구조

```
src/
├── routes/
│   ├── +layout.svelte      # 레이아웃 (TailwindCSS 임포트)
│   └── +page.svelte         # 메인 페이지 (API 테스트 UI)
├── app.css                  # TailwindCSS 설정
└── lib/                     # 라이브러리 및 컴포넌트
```

## 주요 기능 설명

### API 정보 조회

`GET /api/lti/info` 엔드포인트를 호출하여 API 정보를 가져옵니다.

### 플랫폼 등록

`POST /api/lti/register-platform` 엔드포인트로 새로운 LMS 플랫폼을 등록합니다.

필수 정보:
- Platform URL
- Platform Name
- Client ID
- Authentication Endpoint
- Access Token Endpoint
- JWKS URL

### 플랫폼 목록

`GET /api/lti/platforms` 엔드포인트로 등록된 모든 플랫폼을 조회합니다.

## 개발 팁

- 개발 중에는 HMR (Hot Module Replacement)이 자동으로 적용됩니다
- Svelte 5의 새로운 `$state` rune을 사용하여 상태 관리
- TailwindCSS를 사용한 반응형 디자인

## 라이선스

MIT
