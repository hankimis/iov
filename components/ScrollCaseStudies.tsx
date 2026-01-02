'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface CaseStudy {
    id: number;
    brand: string;
    logo: string;
    description: string;
    highlight?: string;
    mockup: string;
    stats?: {
        label: string;
        value: string;
    }[];
}

const caseStudies: CaseStudy[] = [
    {
        id: 1,
        brand: "TIRTIR",
        logo: "/logos/tirtir.png",
        description: "30가지 컬러 USP를 강조한 AR 필터를 제작하고 참여형 콘텐츠로 바이럴 성공 유도",
        mockup: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800",
        stats: [
            { label: "Total Views", value: "117.2M" },
            { label: "Creations", value: "16.9K" }
        ]
    },
    {
        id: 2,
        brand: "농심",
        logo: "/logos/nongshim.png",
        description: "유럽·중동·동남아 맞춤형 크리에이터 마케팅으로 지역별 브랜드 인지도 상승",
        mockup: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?q=80&w=800",
        stats: [
            { label: "Video Views", value: "290M" },
            { label: "Engagements", value: "3.1M" }
        ]
    },
    {
        id: 3,
        brand: "LG Electronics",
        logo: "/logos/lg.png",
        description: "LG NeoChef 글로벌 틱톡 콘텐츠 제작으로",
        highlight: "총 1.5억뷰 달성",
        mockup: "https://images.unsplash.com/photo-1556656793-08538906a9f8?q=80&w=800",
        stats: [
            { label: "Total Views", value: "157M" },
            { label: "Engagement", value: "513K" }
        ]
    },
    {
        id: 4,
        brand: "MISSHA",
        logo: "/logos/missha.png",
        description: "제품 특성과 잘 맞는 북미 크리에이터 협업으로 진정성 있는 콘텐츠 제작",
        mockup: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800",
        stats: [
            { label: "Campaign Period", value: "May 2024 - Jul 2025" },
            { label: "Total Views", value: "39.7M" }
        ]
    }
];

export default function ScrollCaseStudies() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            // Pin the container
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: 'top top',
                end: `+=${caseStudies.length * 100}%`,
                pin: true,
                scrub: 1,
            });

            // Animate each case study
            caseStudies.forEach((_, index) => {
                const progress = index / caseStudies.length;
                const nextProgress = (index + 1) / caseStudies.length;

                ScrollTrigger.create({
                    trigger: containerRef.current,
                    start: `top+=${progress * 100}% top`,
                    end: `top+=${nextProgress * 100}% top`,
                    onEnter: () => setActiveIndex(index),
                    onEnterBack: () => setActiveIndex(index),
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative h-screen bg-black overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 h-full flex items-center">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full items-center">

                    {/* Left: Phone Mockups */}
                    <div className="relative h-[600px] flex items-center justify-center">
                        {caseStudies.map((study, idx) => (
                            <motion.div
                                key={study.id}
                                className="absolute"
                                initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                                animate={{
                                    opacity: activeIndex === idx ? 1 : 0,
                                    scale: activeIndex === idx ? 1 : 0.8,
                                    rotateY: activeIndex === idx ? 0 : -20,
                                    z: activeIndex === idx ? 0 : -100
                                }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                style={{ perspective: 1000 }}
                            >
                                {/* 3D Phone Mockup */}
                                <div className="relative w-[280px] h-[560px] bg-black rounded-[3rem] border-8 border-white/20 shadow-2xl overflow-hidden">
                                    <div className="absolute inset-2 bg-black rounded-[2.5rem] overflow-hidden">
                                        <Image
                                            src={study.mockup}
                                            alt={study.brand}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    {/* Notch */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10" />
                                </div>

                                {/* Floating decorations */}
                                {activeIndex === idx && (
                                    <>
                                        <motion.div
                                            className="absolute -top-10 -right-10 text-6xl"
                                            animate={{ rotate: [0, 10, 0], y: [0, -10, 0] }}
                                            transition={{ duration: 3, repeat: Infinity }}
                                        >
                                            🌸
                                        </motion.div>
                                        <motion.div
                                            className="absolute -bottom-10 -left-10 text-5xl"
                                            animate={{ rotate: [0, -10, 0], y: [0, 10, 0] }}
                                            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                                        >
                                            ✨
                                        </motion.div>
                                    </>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Right: Content */}
                    <div className="relative">
                        {caseStudies.map((study, idx) => (
                            <motion.div
                                key={study.id}
                                className="absolute inset-0"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{
                                    opacity: activeIndex === idx ? 1 : 0,
                                    x: activeIndex === idx ? 0 : 50
                                }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="space-y-6">
                                    {/* Logo */}
                                    <div className="h-12 w-40 bg-white/10 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-black text-xl">{study.brand}</span>
                                    </div>

                                    {/* Description */}
                                    <p className="text-2xl text-gray-300 leading-relaxed">
                                        {study.description}
                                    </p>

                                    {study.highlight && (
                                        <p className="text-3xl font-black text-[#dfff00]">
                                            {study.highlight}
                                        </p>
                                    )}

                                    {/* Stats */}
                                    {study.stats && (
                                        <div className="grid grid-cols-2 gap-6 pt-6">
                                            {study.stats.map((stat, statIdx) => (
                                                <div key={statIdx} className="space-y-2">
                                                    <p className="text-sm text-gray-500 uppercase tracking-wider">
                                                        {stat.label}
                                                    </p>
                                                    <p className="text-4xl font-black text-white">
                                                        {stat.value}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}

                        {/* Progress Indicator */}
                        <div className="absolute -left-8 top-1/2 -translate-y-1/2 flex flex-col gap-3">
                            {caseStudies.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`w-1 h-12 rounded-full transition-all ${idx === activeIndex ? 'bg-[#dfff00]' : 'bg-white/20'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Hint */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-sm"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                Scroll to explore
            </motion.div>
        </section>
    );
}
