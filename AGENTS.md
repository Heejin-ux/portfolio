# AGENTS.md (루트)

## Operational Commands

패키지 매니저는 **Bun**만 사용한다. `npm` / `yarn` / `pnpm`으로 스크립트를 돌리지 않는다.

```bash
bun install
bun run dev
bun run build
bun run start
bun run lint
```

Next.js 16.x는 학습 데이터와 API·관례가 다를 수 있으므로, 의심스러울 때는 공식 문서와 `node_modules/next` 내 가이드를 우선 확인한다.

## Golden Rules

### Immutable (보안·비밀)

- API 키·시크릿·토큰을 소스에 하드코딩하지 않는다. `process.env.*`와 서버 전용 변수(`NEXT_PUBLIC_` 접두는 공개 전제)를 올바르게 구분한다.
- `.env.local` 및 기타 비밀 환경 파일을 저장소에 커밋하지 않는다. 예시는 `.env.example` 등 비밀 없는 파일로만 제공한다.

### Do

- 사용자 대화 응답과 코드 주석은 **한국어**로 작성한다.
- 레이아웃·간격·타이포는 **Tailwind**로 우선 해결한다.
- **폼·다이얼로그·복합 입력 UI**는 **shadcn/ui**(Radix 기반) 패턴을 따른다.
- **진입(히어로·섹션 등) 애니메이션**은 **Magic UI** 계열 컴포넌트/패턴을 우선 검토한다.
- **마우스·스크롤 기반의 고급 타임라인 애니메이션**은 **GSAP**을 사용한다(필요 시 의존성 추가).
- shadcn/ui 블록은 **필요할 때만** CLI로 추가하고, 단순 스타일은 Tailwind만으로 처리한다.

### Don't

- 공개 클라이언트 번들에 서버 전용 시크릿을 넣지 않는다.
- 동일 목적의 UI 라이브러리를 이유 없이 중복 도입하지 않는다.

## Project Context

개인 포트폴리오 사이트를 목표로 하며, 방문자에게 프로젝트와 역량을 명확히 전달하는 것이 목적이다.

**Tech stack:** Next.js (App Router), TypeScript, Tailwind CSS v4, shadcn/ui, Magic UI(계획·도입 시), GSAP(고급 인터랙션 시), Bun.

## Standards & References

- 컴포넌트 스타일은 기존 `components/ui` 및 `app/globals.css`의 토큰·유틸과 맞춘다.
- 커밋 메시지는 변경 요약을 한 줄 또는 짧은 본문으로, 불필요한 메타데이터는 넣지 않는다.

**Maintenance:** 이 문서와 실제 코드·의존성이 어긋나면 PR/작업 시점에 본 파일을 갱신하는 것을 제안한다.

## Context Map (하위 규칙)

- **[App Router·페이지·레이아웃·Route Handler](./app/AGENTS.md)** — `app/` 트리, RSC/클라이언트 경계, 메타데이터·라우팅 작업 시.
- **[UI·shadcn·애니메이션 컴포넌트](./components/AGENTS.md)** — `components/` 재사용 UI, shadcn/Magic UI/GSAP 적용 시.
