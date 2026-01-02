'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

const services = [
  {
    category: "ENTERTAINMENT",
    title: "Creator Entertainment",
    desc: "라이브, 숏폼, 버라이어티까지. IOV는 크리에이터의 일상을 콘텐츠로 설계하고, 팬덤이 사랑하는 엔터테인먼트 IP로 확장시킵니다.",
    image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=2670&auto=format&fit=crop",
    tags: ["MCN / Management", "Live Commerce", "IP Collaboration"],
    bullets: [
      "크리에이터 발굴·전속 계약 및 장기 브랜딩 플랜 수립",
      "틱톡·유튜브 라이브 포맷 기획과 실시간 운영",
      "굿즈·이벤트·오프라인 팬미팅 등 팬덤 비즈니스 설계"
    ]
  },
  {
    category: "MARKETING AGENCY",
    title: "Performance Marketing",
    desc: "브랜드 인지에서 퍼포먼스까지 한번에. 숏폼 퍼포먼스 캠페인과 인플루언서 미디어 믹스로, 숫자로 증명되는 캠페인을 만듭니다.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    tags: ["Campaign Strategy", "Paid + Organic", "End-to-End Reporting"],
    bullets: [
      "브랜드 목표에 맞춘 숏폼·라이브 캠페인 플래닝",
      "성과 기반 인플루언서 시딩·애드(ADS) 운영",
      "대시보드 리포트로 조회수·전환·ROAS 실시간 공유"
    ]
  },
  {
    category: "PRODUCTION STUDIO",
    title: "Creative Production",
    desc: "숏폼도, 브랜디드 필름도, 뮤직비디오 퀄리티로. in-house 제작팀과 스튜디오 인프라로, 플랫폼에 최적화된 영상을 만듭니다.",
    image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=2574&auto=format&fit=crop",
    tags: ["Shortform Studio", "Brand Film", "3D / Motion / VFX"],
    bullets: [
      "기획·스크립트·콘티까지 풀 패키지 크리에이티브",
      "숏폼 패키지·캠페인 메인 필름·메이킹 영상 동시 제작",
      "3D·모션그래픽·VFX까지 포함한 하이브리드 제작 파이프라인"
    ]
  }
];

export default function Business() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !canvasRef.current) return;

    let app: any = null;
    let destroyed = false;
    let clickHandler: ((e: MouseEvent) => void) | null = null;

    // 흑백 톤만 사용하도록 그레이스케일 컬러 생성
    function randomColors(count: number) {
      return new Array(count).fill(0).map(() => {
        const v = Math.floor(Math.random() * 256);
        const hex = v.toString(16).padStart(2, '0');
        return `#${hex}${hex}${hex}`;
      });
    }

    (async () => {
      try {
        // threejs-components를 클라이언트에서만 동적 로드
        const mod = await import('threejs-components/build/cursors/tubes1.min.js');
        const TubesCursor = (mod.default || mod) as any;

        if (destroyed || !canvasRef.current || !TubesCursor) return;

        app = TubesCursor(canvasRef.current, {
          tubes: {
            colors: ['#ffffff', '#cfcfcf', '#8a8a8a'],
            lights: {
              intensity: 200,
              colors: ['#ffffff', '#e5e5e5', '#b0b0b0', '#707070'],
            },
          },
        });

        clickHandler = () => {
          if (!app) return;
          const colors = randomColors(3);
          const lightsColors = randomColors(4);
          app.tubes.setColors(colors);
          app.tubes.setLightsColors(lightsColors);
        };

        window.addEventListener('click', clickHandler);
      } catch (e) {
        console.error('[Business TubesCursor] Failed to load:', e);
      }
    })();

    return () => {
      destroyed = true;
      if (clickHandler) window.removeEventListener('click', clickHandler);
      if (app && typeof app.dispose === 'function') {
        try {
          app.dispose();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  return (
    <div className="bg-[#0a0a0a] text-white">

      {/* 1. OUR WORK + Tubes Cursor Hero */}
      <section className="relative min-h-[30vh] md:min-h-[50vh] overflow-hidden">
        {/* Tubes background */}
        <canvas
          ref={canvasRef}
          id="business-tubes-canvas"
          className="absolute inset-0 w-full h-full"
        />

        {/* Hero text */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-40 pb-24 flex flex-col items-center justify-center h-full text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black tracking-tighter mb-8"
          >
            OUR WORK
          </motion.h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl border-l border-white/20 pl-6 mx-auto">
            IOV is an all-in-one solution for Creators and Brands. <br />
            We define the standard of digital entertainment.
          </p>
        </div>
      </section>

      {/* 2. Service Gallery */}
      <section className="pb-40 px-6">
        <div className="max-w-7xl mx-auto space-y-40">
          {services.map((service, idx) => (
            <div key={idx} className="group relative">
              {/* Top Info */}
              <div className="flex flex-col md:flex-row justify-between items-start mb-10 border-t border-white/20 pt-8">
                <div className="flex items-center gap-4 mb-4 md:mb-0">
                  <span className="font-mono text-gray-400 text-sm">0{idx + 1}</span>
                  <span className="text-xl font-bold tracking-widest">{service.category}</span>
                </div>
                <div className="md:text-right">
                  <div className="flex gap-2 justify-end mb-2 flex-wrap">
                    {service.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full border border-white/20 text-xs text-gray-400 uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <h2 className="text-4xl md:text-6xl font-bold mb-4 transition-colors leading-[0.95]">
                    {service.title}
                  </h2>
                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6 max-w-xl">
                    {service.desc}
                  </p>
                  {service.bullets && (
                    <ul className="space-y-2 mb-8 text-sm md:text-base text-gray-400">
                      {service.bullets.map((line: string) => (
                        <li key={line} className="flex gap-2">
                          <span className="mt-[6px] h-[3px] w-[14px] bg-white rounded-full shrink-0" />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <motion.button
                    whileHover={{ x: 10 }}
                    className="text-sm md:text-base font-bold inline-flex items-center gap-2 group/btn border border-white/20 rounded-full px-5 py-2.5 hover:border-white transition-colors"
                  >
                    View Case Studies
                    <ArrowUpRight className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </motion.button>
                </div>

                <div className="order-1 lg:order-2 relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#111]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Partners Marquee */}
      <section className="py-20 border-y border-white/10 bg-[#050505] overflow-hidden">
        <div className="mb-10 text-center text-sm font-mono text-gray-500 uppercase tracking-widest">Trusted By</div>
        <div className="flex whitespace-nowrap overflow-hidden">
          <motion.div
            className="flex gap-20 px-10"
            animate={{ x: "-50%" }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-20 items-center">
                {['TIKTOK', 'YOUTUBE', 'NETFLIX', 'COUPANG', 'MUSINSA', 'KIA', 'SAMSUNG'].map((brand) => (
                  <span key={brand} className="text-5xl font-black text-[#222] hover:text-white transition-colors cursor-default">
                    {brand}
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Bottom CTA */}
      <section className="py-40 px-6 text-center">
        <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tighter">
          READY TO <br />
          <span className="text-white">
            SCALE UP?
          </span>
        </h2>
        <a href="/contact" className="inline-block px-12 py-5 bg-white text-black rounded-full text-xl font-bold hover:bg-gray-100 hover:scale-110 transition-all">
          Start Your Journey
        </a>
      </section>

    </div>
  );
}

