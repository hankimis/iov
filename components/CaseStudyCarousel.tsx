'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface CaseStudy {
    brand: string;
    logo: string;
    description: string;
    mockup: string;
    highlight?: string;
}

const caseStudies: CaseStudy[] = [
    {
        brand: "LG Electronics",
        logo: "/logos/lg.png",
        description: "LG NeoChef 글로벌 틱톡 콘텐츠 제작으로",
        highlight: "총 1.5억뷰 달성",
        mockup: "https://images.unsplash.com/photo-1556656793-08538906a9f8?q=80&w=2670&auto=format&fit=crop"
    },
    {
        brand: "농심",
        logo: "/logos/nongshim.png",
        description: "유럽·중동·동남아 맞춤형 크리에이터 마케팅으로 지역별 브랜드 인지도 상승",
        mockup: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?q=80&w=2670&auto=format&fit=crop"
    },
    {
        brand: "TIRTIR",
        logo: "/logos/tirtir.png",
        description: "30가지 컬러 USP를 강조한 AR 필터를 제작하고 참여형 콘텐츠로 바이럴 성공 유도",
        mockup: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2680&auto=format&fit=crop"
    },
    {
        brand: "MISSHA",
        logo: "/logos/missha.png",
        description: "제품 특성과 잘 맞는 북미 크리에이터 협업으로 진정성 있는 콘텐츠 제작",
        mockup: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2687&auto=format&fit=crop"
    }
];

export default function CaseStudyCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);

    const next = () => {
        setActiveIndex((prev) => (prev + 1) % caseStudies.length);
    };

    const prev = () => {
        setActiveIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
    };

    return (
        <div className="relative">
            {/* Header */}
            <div className="text-center mb-16">
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight"
                >
                    모두가 숏폼에서 <br className="md:hidden" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dfff00] to-[#00ffff]">바라던 것</span>
                </motion.h3>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-gray-400"
                >
                    IOV가 눈부신 성과로 증명합니다.
                </motion.p>
            </div>

            {/* Carousel */}
            <div className="relative max-w-5xl mx-auto">
                <div className="overflow-hidden">
                    <motion.div
                        className="flex"
                        animate={{ x: `-${activeIndex * 100}%` }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        {caseStudies.map((study, idx) => (
                            <div key={idx} className="min-w-full px-4">
                                <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-3xl overflow-hidden">
                                    {/* Mockup Image */}
                                    <div className="relative aspect-[16/10] bg-black">
                                        <Image
                                            src={study.mockup}
                                            alt={study.brand}
                                            fill
                                            className="object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                                        {/* Floating Phone Mockup Effect */}
                                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 h-96 bg-white/10 backdrop-blur-xl rounded-[2.5rem] border-4 border-white/20 shadow-2xl">
                                            <div className="absolute inset-2 bg-black rounded-[2rem] overflow-hidden">
                                                <Image
                                                    src={study.mockup}
                                                    alt={study.brand}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 md:p-12">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="h-12 w-32 bg-white/10 rounded-lg flex items-center justify-center">
                                                <span className="text-white font-bold">{study.brand}</span>
                                            </div>
                                        </div>
                                        <p className="text-lg text-gray-300 leading-relaxed mb-2">
                                            {study.description}
                                        </p>
                                        {study.highlight && (
                                            <p className="text-2xl font-black text-[#dfff00]">
                                                {study.highlight}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Navigation */}
                <div className="flex justify-center gap-4 mt-8">
                    <button
                        onClick={prev}
                        className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                        <ChevronLeft className="text-white" />
                    </button>

                    {/* Dots */}
                    <div className="flex items-center gap-2">
                        {caseStudies.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveIndex(idx)}
                                className={`w-2 h-2 rounded-full transition-all ${idx === activeIndex
                                        ? 'bg-[#dfff00] w-8'
                                        : 'bg-white/30 hover:bg-white/50'
                                    }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={next}
                        className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                        <ChevronRight className="text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
}
