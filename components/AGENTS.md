# AGENTS.md (`components/`)

## Module Context

재사용 UI와 shadcn/ui 기본 블록이 모인다. 앱 라우트와의 결합은 props·슬롯으로 유지하고, 이 폴더에서는 프레젠테이션과 접근성에 집중한다.

## Tech Stack & Constraints

- shadcn/ui: Radix + `class-variance-authority` + `cn()`(`@/lib/utils`) 패턴을 유지한다.
- Magic UI: 섹션 진입·강조 모션에 사용한다. 도입 시 기존 Tailwind 토큰과 충돌하지 않게 조정한다.
- GSAP: 스크롤·마우스 연동 등 복잡한 타임라인에만 사용하고, `useEffect`/`useLayoutEffect` 내에서 정리(cleanup)를 반드시 구현한다.
- 단순 호버·페이드는 Tailwind 트랜지션으로 처리해 의존성과 번들을 늘리지 않는다.

## Implementation Patterns

- 새 shadcn 블록은 CLI 권장 흐름에 맞추고, 생성된 파일은 `components/ui` 또는 합의된 하위 폴더에 둔다.
- 클래스 병합은 항상 `cn()`을 사용한다.
- 클라이언트 전용 컴포넌트는 파일 상단에 `"use client"`를 명시한다.

## Testing Strategy

시각 회귀·스토리북이 없으면 `bun run lint`와 수동 스크린 확인을 기본으로 한다.

## Local Golden Rules

- Do: 폼·모달·드롭다운 등은 shadcn 패턴을 따르고, 디자인 토큰은 `globals.css`의 테마 변수와 맞춘다.
- Don't: 동일 역할의 애니메이션을 Magic UI와 GSAP으로 이중 구현하지 않는다(한 가지 도구로 통일).
- Don't: API 키나 환경별 시크릿을 컴포넌트 상수로 넣지 않는다.
