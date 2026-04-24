# AGENTS.md (`app/`)

## Module Context

Next.js App Router의 라우트 트리, 루트 레이아웃, 페이지, 향후 `route.ts`·서버 액션 등이 위치한다. 서버·클라이언트 경계를 명확히 하는 것이 이 디렉터리의 핵심이다.

## Tech Stack & Constraints

- Next.js 16 App Router, React 19.
- 전역 스타일은 `app/globals.css`에서만 확장하고, 페이지별로 불필요한 전역 오염을 피한다.
- 클라이언트 전용 훅·브라우저 API·이벤트 핸들러가 필요하면 파일 상단에 `"use client"`를 두고, 그 범위를 최소화한다.

## Implementation Patterns

- 공개 메타데이터는 `layout.tsx` 또는 각 세그먼트의 `metadata` export로 관리한다.
- 환경 변수는 서버에서만 읽어야 할 값과 `NEXT_PUBLIC_` 공개 값을 분리한다. 민감 값은 Route Handler나 Server Action 등 서버 경로에만 둔다.
- 새 라우트는 폴더 기반으로 추가하고, 기본은 Server Component로 시작한 뒤 필요한 leaf만 클라이언트로 전환한다.

## Testing Strategy

프로젝트에 단위 테스트 스크립트가 없을 때는 `bun run lint`로 정적 검사를 통과시키는 것을 최소 기준으로 한다. 테스트 스크립트가 추가되면 본 절을 그 명령에 맞게 갱신한다.

## Local Golden Rules

- Do: 레이아웃 공통 여백·타이포는 Tailwind 유틸과 루트 레이아웃의 클래스 패턴을 재사용한다.
- Don't: 클라이언트 컴포넌트를 루트 레이아웃 전체로 키우지 않는다(번들·워터폴 악화).
- Don't: `app/` 아래에 비밀 문자열이나 키 파일을 두지 않는다.
