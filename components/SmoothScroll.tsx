'use client';

import { ReactNode } from 'react';

interface SmoothScrollProps {
  children: ReactNode;
}

// NOTE:
// Lenis 기반 스무스 스크롤은 position: sticky, Scroll 기반 섹션(pin 효과)과
// 동시에 사용할 때 Chrome에서 여러 레이아웃/렌더링 버그를 유발했다.
// (특히 Next.js 16 + React 19 + Turbopack 환경에서 섹션 고정이 깨지고
//  검은 화면이 나오거나, NotFoundError가 발생하는 문제가 있었음)
//
// 따라서 이 프로젝트에서는 브라우저 기본 스크롤을 사용하도록
// SmoothScroll을 단순 패스스루 컴포넌트로 유지한다.
export default function SmoothScroll({ children }: SmoothScrollProps) {
  return <>{children}</>;
}
