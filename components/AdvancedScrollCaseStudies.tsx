'use client';

import { CSSProperties, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface CaseStudy {
    id: number;
    brand: string;
    title: string;
    description: string;
    badge: string;
    period: string;
    views: string;
    engagement: string;
    thumbnail: string;
    videoUrl: string;
}

const caseStudies: CaseStudy[] = [
    {
        id: 1,
        brand: 'MISSHA',
        title: '미샤 크리에이터 협업 캠페인',
        description:
            '미샤의 제품을 소비자들에게 진심으로 설명해 줄 수 있는 크리에이터들을 선별하는데 많은 노력을 기울였습니다. K-beauty, Skinfluencer 등 제품과 밀접한 특색을 가진 크리에이터와 협업하여 단일 영상만으로 850만 이상의 조회수를 달성하였습니다.',
        badge: 'No.1',
        period: '2024.03 - 2024.06',
        views: '850만+',
        engagement: '12.5%',
        thumbnail:
            'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=700&fit=crop',
        videoUrl:
            'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=700&fit=crop',
    },
    {
        id: 2,
        brand: 'TIRTIR',
        title: '티르티르 AR 필터 캠페인',
        description:
            '30가지 컬러 USP를 강조한 AR 필터를 제작하고 참여형 콘텐츠로 바이럴 성공을 유도했습니다. 사용자들이 직접 제품을 체험할 수 있는 인터랙티브한 경험을 제공하여 높은 참여율을 기록했습니다.',
        badge: 'Viral',
        period: '2024.01 - 2024.03',
        views: '620만+',
        engagement: '15.2%',
        thumbnail:
            'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=700&fit=crop',
        videoUrl:
            'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=700&fit=crop',
    },
    {
        id: 3,
        brand: 'LG생활건강',
        title: 'LG 뷰티 라인 론칭',
        description:
            '신제품 라인의 핵심 가치를 숏폼으로 효과적으로 전달하여 론칭 초기부터 강력한 브랜드 인지도를 구축했습니다. 타겟 오디언스에 최적화된 콘텐츠 전략으로 높은 전환율을 달성했습니다.',
        badge: 'Best',
        period: '2023.11 - 2024.02',
        views: '720만+',
        engagement: '11.8%',
        thumbnail:
            'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=700&fit=crop',
        videoUrl:
            'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=700&fit=crop',
    },
    {
        id: 4,
        brand: '농심',
        title: '농심 신제품 바이럴 마케팅',
        description:
            'MZ세대를 타겟으로 한 크리에이티브한 숏폼 콘텐츠로 신제품 인지도를 극대화했습니다. 트렌디한 밈과 챌린지를 활용하여 자연스러운 바이럴 확산을 이끌어냈습니다.',
        badge: 'Trending',
        period: '2024.04 - 2024.07',
        views: '580만+',
        engagement: '13.4%',
        thumbnail:
            'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=700&fit=crop',
        videoUrl:
            'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=700&fit=crop',
    },
];

export default function AdvancedScrollCaseStudies() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [progress, setProgress] = useState(0); // 0 ~ 1

    // 섹션 기준 스크롤 진행도 계산 (useScroll 대신 수동 계산 - Turbopack / React 19 호환성 이슈 회피)
    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight || 1;
            const totalScrollable = rect.height - viewportHeight;

            if (totalScrollable <= 0) {
                setProgress(0);
                return;
            }

            const current = Math.min(
                Math.max(-rect.top, 0),
                totalScrollable
            );
            setProgress(current / totalScrollable);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    // 섹션 안에 있을 때만 컨텐츠를 화면에 고정시키는 수동 pin 로직
    const isPinned = progress > 0 && progress < 1;

    const pinnedContainerStyle: CSSProperties = isPinned
        ? {
            position: 'fixed',
            inset: 0,
            height: '100vh',
        }
        : progress <= 0
            ? {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '100vh',
            }
            : {
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '100vh',
            };

    // 0 ~ 0.3: 히어로 카피 + 중앙 카드
    // 0.3 ~ 0.6: 3D 카드 스택 등장, 카피 페이드아웃
    // 0.6 ~ 1: 우측 디테일 패널 등장
    const stackIntroPhase = Math.min(Math.max((progress - 0.3) / 0.3, 0), 1);
    const heroCopyOpacity = 1 - stackIntroPhase;
    // 중앙 카드가 왼쪽으로 살짝 이동하면서 3D 스택이 나타나는 느낌
    const mainCardX = -80 * stackIntroPhase;
    const mainCardScale = 1 - 0.05 * stackIntroPhase;

    // 디테일 패널 등장 (0.6 ~ 0.9 구간)
    const detailPhase = Math.min(Math.max((progress - 0.6) / 0.3, 0), 1);
    const detailOpacity = detailPhase;
    const detailX = 80 * (1 - detailPhase);

    return (
        <section
            ref={containerRef}
            className="relative h-[360vh] bg-black overflow-visible"
        >
            {/* 
              NOTE: position: sticky가 Chrome + 특정 상위 레이아웃 조합에서 안정적으로
              동작하지 않아, 수동으로 fixed/absolute를 전환하는 pin 로직을 사용한다.
              섹션 내부 컨텐츠는 항상 화면 높이(100vh)를 유지하면서,
              섹션 진행도에 따라 상단/중앙/하단에 배치된다.
            */}
            <div style={pinnedContainerStyle}>
                {/* 배경 레이어 */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(223,255,0,0.15),transparent_55%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,255,255,0.15),transparent_45%)]" />
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage:
                                'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
                            backgroundSize: '60px 60px',
                        }}
                    />
            </div>

                <div className="relative z-10 flex h-full items-center justify-center">
                    <div className="flex h-full w-full max-w-[1520px] items-center gap-10 px-6 lg:px-8">
                        {/* 좌측: 히어로 카피 → 3D 카드 스택 (클릭으로 케이스 변경) */}
                        <div className="hidden flex-[0.9] flex-col justify-center md:flex">
                            {/* 히어로 카피 */}
                <motion.div
                                style={{ opacity: heroCopyOpacity }}
                                className="mb-10"
                >
                                <p className="text-5xl lg:text-6xl font-black text-white leading-tight">
                                    모두가
                                    <br />
                                    숏폼에서
                                    <br />
                        바라던 것
                                </p>
                </motion.div>

                            {/* 3D 카드 스택 */}
                <motion.div
                                style={{
                                    opacity: stackIntroPhase,
                                    transformStyle: 'preserve-3d',
                                    willChange: 'transform',
                                }}
                                className="relative h-[260px] w-[180px] md:h-[320px] md:w-[220px] cursor-pointer"
                            >
                                {caseStudies.map((card, index) => {
                                    const isActive = index === activeIndex;
                                    const depth = caseStudies.length - index;

                                    return (
                                        <motion.div
                                            key={card.id}
                                            onClick={() => setActiveIndex(index)}
                                            className="absolute inset-0"
                                            style={{
                                                transformStyle: 'preserve-3d',
                                                zIndex: depth,
                                                willChange: 'transform, opacity',
                                            }}
                                            initial={false}
                                            animate={{
                                                opacity:
                                                    stackIntroPhase *
                                                    (isActive ? 1 : 0.85),
                                                scale: isActive
                                                    ? 1
                                                    : 0.9 - index * 0.04,
                                                x: -index * 14,
                                                y: index * 22,
                                                rotateY: isActive ? -10 : -18,
                                            }}
                                            transition={{
                                                duration: 0.5,
                                                ease: 'easeOut',
                                            }}
                                        >
                                            <div
                                                className={`h-full w-full overflow-hidden rounded-[18px] bg-black shadow-2xl border ${isActive ? 'border-[#dfff00]' : 'border-white/10'
                                }`}
                            style={{
                                                    boxShadow:
                                                        '0 24px 60px rgba(0,0,0,0.5)',
                                                }}
                                            >
                                                <img
                                                    src={card.thumbnail}
                                                    alt={card.brand}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        </div>

                        {/* 중앙: 선택된 메인 카드 (스크롤 시 살짝 왼쪽으로 이동) */}
                        <motion.div
                            className="flex flex-[1.1] items-center justify-center"
                            style={{ x: mainCardX, scale: mainCardScale }}
                        >
                            <div
                                className="relative h-[480px] w-[260px] md:h-[560px] md:w-[320px] overflow-hidden rounded-[24px] bg-black shadow-2xl"
                                style={{
                                    boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
                                }}
                            >
                                <img
                                    src={caseStudies[activeIndex].videoUrl}
                                    alt={caseStudies[activeIndex].brand}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </motion.div>

                        {/* 우측: 디테일 패널 */}
                <motion.div
                            style={{ opacity: detailOpacity, x: detailX }}
                            className="hidden flex-1 pl-6 md:flex md:items-center"
                >
                            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                                <div className="mb-6 flex items-center justify-between">
                                    <span className="inline-flex rounded-full bg-gradient-to-r from-[#dfff00] to-[#00ffff] px-4 py-1 text-xs font-bold text-black">
                            {caseStudies[activeIndex].badge}
                                    </span>
                                    <span className="text-sm font-semibold text-white/70">
                                        {caseStudies[activeIndex].brand}
                                    </span>
                        </div>

                                <h3 className="mb-3 text-2xl font-black text-white">
                                    {caseStudies[activeIndex].title}
                        </h3>

                                <p className="mb-6 text-sm leading-relaxed text-gray-300">
                            {caseStudies[activeIndex].description}
                        </p>

                                <div className="mb-6 space-y-3 text-sm">
                                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                                        <span className="text-gray-400">
                                            캠페인 기간
                                        </span>
                                        <span className="font-semibold text-white">
                                            {caseStudies[activeIndex].period}
                                        </span>
                            </div>
                                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                                        <span className="text-gray-400">
                                            총 조회수
                                        </span>
                                        <span className="text-lg font-bold text-[#dfff00]">
                                            {caseStudies[activeIndex].views}
                                        </span>
                            </div>
                                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                                        <span className="text-gray-400">
                                            평균 참여율
                                        </span>
                                        <span className="text-lg font-bold text-[#00ffff]">
                                            {caseStudies[activeIndex].engagement}
                                        </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                                    {Array.from({ length: 3 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="aspect-square overflow-hidden rounded-lg bg-white/5"
                                        >
                                <img
                                                src={
                                                    caseStudies[activeIndex]
                                                        .thumbnail
                                                }
                                                alt={`${caseStudies[activeIndex].brand} thumbnail ${i + 1}`}
                                                className="h-full w-full object-cover"
                                />
                            </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* 모바일 레이아웃: 중앙 카드 + 간단 디테일 */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 md:hidden">
                        <div className="text-center">
                            <p className="text-3xl font-black text-white leading-tight">
                                모두가
                                <br />
                                숏폼에서
                                <br />
                                바라던 것
                            </p>
                        </div>

                        <div className="flex items-center justify-center">
                            <div className="relative h-[420px] w-[240px] overflow-hidden rounded-[22px] bg-black shadow-2xl">
                                <img
                                    src={caseStudies[activeIndex].videoUrl}
                                    alt={caseStudies[activeIndex].brand}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>

                        <motion.div
                            style={{ opacity: detailOpacity, x: detailX }}
                            className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <span className="inline-flex rounded-full bg-gradient-to-r from-[#dfff00] to-[#00ffff] px-3 py-1 text-[11px] font-bold text-black">
                                    {caseStudies[activeIndex].badge}
                                </span>
                                <span className="text-xs font-semibold text-white/70">
                                    {caseStudies[activeIndex].brand}
                                </span>
                            </div>
                            <h3 className="mb-2 text-lg font-black text-white">
                                {caseStudies[activeIndex].title}
                            </h3>
                            <p className="mb-4 text-xs leading-relaxed text-gray-300">
                                {caseStudies[activeIndex].description}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
