'use client';

export default function Template({ children }: { children: React.ReactNode }) {
    /**
     * NOTE:
     * App Router의 template에서 framer-motion 래퍼를 사용하면
     * 런타임에 wrapper에 transform/filter가 주입되는 경우가 있어
     * 하위의 position: sticky / fixed가 뷰포트 기준으로 동작하지 않고
     * "그냥 스크롤로 넘어가 버리는" 현상이 발생할 수 있다. (특히 Chrome)
     *
     * 스크롤 기반 pin 섹션을 안정적으로 동작시키기 위해
     * template 래퍼는 순수 DOM 래퍼로 유지한다.
     */
    return <>{children}</>;
}
