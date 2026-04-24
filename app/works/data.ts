export type WorkLink = {
  label: string;
  href: string;
};

export type WorkItem = {
  slug: string;
  title: string;
  summary: string;
  thumbnail: string;
  description: string;
  links: WorkLink[];
};

export const works: WorkItem[] = [
  {
    slug: "smart-home-dashboard",
    title: "Smart Home Dashboard",
    summary: "일상 루틴을 빠르게 관리하는 홈 IoT UX 설계",
    thumbnail: "/window.svg",
    description:
      "가정 내 다양한 디바이스를 한 화면에서 제어할 수 있도록 정보 구조와 액션 흐름을 재정의한 프로젝트입니다. 사용자 조사에서 확인한 핵심 시나리오를 기준으로 우선순위를 재배치하고, 상태 확인과 제어 단계를 짧게 줄여 학습 비용을 낮추는 데 집중했습니다. 특히 반복 동작을 중심으로 위젯 구조를 설계해 사용자가 매일 자연스럽게 사용할 수 있는 경험을 만드는 것을 목표로 했습니다.",
    links: [
      { label: "Behance", href: "https://www.behance.net/" },
      { label: "GitHub", href: "https://github.com/" },
    ],
  },
  {
    slug: "mobile-commerce-flow",
    title: "Mobile Commerce Flow",
    summary: "구매 전환율 개선을 위한 결제 플로우 리디자인",
    thumbnail: "/globe.svg",
    description:
      "모바일 커머스 앱의 장바구니부터 결제 완료까지의 흐름을 분석하고, 이탈 구간을 줄이는 데 초점을 맞춘 리디자인 작업입니다. 단계별 인지 부담을 낮추기 위해 핵심 정보 노출 순서를 조정했고, 입력 오류를 사전에 방지하는 인터랙션을 도입했습니다. 그 결과 사용자는 더 적은 탭으로 결제를 완료할 수 있고, 결제 과정 전반에서 확신을 얻도록 경험을 설계했습니다.",
    links: [
      { label: "Dribbble", href: "https://dribbble.com/" },
      { label: "Behance", href: "https://www.behance.net/" },
    ],
  },
  {
    slug: "design-system-refresh",
    title: "Design System Refresh",
    summary: "제품 일관성을 높인 모바일 디자인 시스템 개선",
    thumbnail: "/file.svg",
    description:
      "여러 팀이 공통으로 사용하는 컴포넌트 체계를 정비하고, 브랜드 톤을 유지하면서도 구현 효율을 높이기 위해 디자인 시스템을 리프레시한 프로젝트입니다. 컬러, 타이포, 간격 규칙을 재정의하고, 자주 사용하는 패턴을 문서화해 협업 비용을 줄였습니다. 디자이너와 개발자가 동일한 기준으로 의사결정할 수 있도록 컴포넌트 사용 원칙과 예외 상황까지 함께 정리했습니다.",
    links: [
      { label: "GitHub", href: "https://github.com/" },
      { label: "Dribbble", href: "https://dribbble.com/" },
    ],
  },
];
