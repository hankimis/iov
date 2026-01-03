'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView } from 'framer-motion';
import { ArrowRight, Play, Zap, Globe, TrendingUp, Users, Video, Briefcase, ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Typewriter from 'typewriter-effect';
import Sticker from '@/components/Sticker';
import AnimatedTextReveal from '@/components/AnimatedTextReveal';
import CylinderCarousel from '@/components/codrops/CylinderCarousel';
import S4Showcase from '@/components/S4Showcase';

function AnimatedStatNumber({
  value,
  suffix,
  realtime = false,
  step = 1,
  intervalMs = 100,
}: {
  value: number;
  suffix: string;
  realtime?: boolean;
  step?: number;
  intervalMs?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  // 1단계: 0 → value 까지 부드러운 카운트업
  useEffect(() => {
    if (!isInView) return;
    let start: number | null = null;
    const duration = 1200; // 초기 카운트업 시간(ms)
    let frameId: number;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const current = Math.round(value * eased);
      setDisplay(current > value ? value : current);
      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setDisplay(value);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, value]);

  // 2단계: value 도달 후, 1단위로 계속 올라가는 효과
  useEffect(() => {
    if (!isInView || !realtime) return;
    const interval = setInterval(() => {
      setDisplay((prev) => prev + step);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [isInView, realtime, step, intervalMs]);

  return (
    <span ref={ref}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Home() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  const [mounted, setMounted] = useState(false);

  // Mouse Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = clientX / innerWidth - 0.5;
    const y = clientY / innerHeight - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const heroX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const heroY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const bgX = useTransform(heroX, [-0.5, 0.5], ['2%', '-2%']);
  const bgY = useTransform(heroY, [-0.5, 0.5], ['2%', '-2%']);
  const textX = useTransform(heroX, [-0.5, 0.5], ['-1%', '1%']);
  const textY = useTransform(heroY, [-0.5, 0.5], ['-1%', '1%']);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="bg-black">
      {/* HERO: Codrops Demo 1 (겹침 방지 위해 CodropsFrame 헤더 제거됨) */}
      <CylinderCarousel />


      {/* 
        =============================================
        SERVICES SECTION (SHORTT STYLE)
        =============================================
      */}
      <section className="py-32 relative bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
              WHAT WE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dfff00] to-[#00ffff]">DO</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              크리에이터부터 브랜드까지, 모든 것을 연결합니다.
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Card 1 - Entertainment */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              className="group relative bg-gradient-to-br from-purple-900/20 to-black border border-white/10 rounded-3xl p-8 hover:border-[#dfff00]/50 transition-all overflow-hidden"
            >
              <div className="absolute top-4 right-4 text-6xl opacity-10 group-hover:opacity-20 transition-opacity">
                🎬
              </div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users size={28} className="text-purple-400" />
                </div>
                <h3 className="text-3xl font-black text-white mb-4 uppercase">Entertainment</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  틱톡, 유튜브 라이브부터 글로벌 인플루언서 매니지먼트까지.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Live', 'Creator', 'Global'].map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-white/5 text-xs text-gray-300 border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Card 2 - Marketing */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group relative bg-gradient-to-br from-blue-900/20 to-black border border-white/10 rounded-3xl p-8 hover:border-[#00ffff]/50 transition-all overflow-hidden"
            >
              <div className="absolute top-4 right-4 text-6xl opacity-10 group-hover:opacity-20 transition-opacity">
                📈
              </div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <TrendingUp size={28} className="text-blue-400" />
                </div>
                <h3 className="text-3xl font-black text-white mb-4 uppercase">Marketing</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  데이터 기반 타겟팅으로 확실한 ROAS를 만듭니다.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Viral', 'AI', 'Performance'].map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-white/5 text-xs text-gray-300 border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Card 3 - Production */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group relative bg-gradient-to-br from-green-900/20 to-black border border-white/10 rounded-3xl p-8 hover:border-[#dfff00]/50 transition-all overflow-hidden"
            >
              <div className="absolute top-4 right-4 text-6xl opacity-10 group-hover:opacity-20 transition-opacity">
                🎥
              </div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Video size={28} className="text-green-400" />
                </div>
                <h3 className="text-3xl font-black text-white mb-4 uppercase">Production</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  방송국 수준의 영상 제작, 기획부터 편집까지.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['TVC', 'Motion', '3D/VFX'].map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-white/5 text-xs text-gray-300 border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 
        =============================================
        SAMPLE S4 SHOWCASE SECTION (REPLACES TEXT + STATS)
        =============================================
      */}
      <S4Showcase />

      {/* 
        =============================================
        CTA SECTION (SHORTT STYLE)
        =============================================
      */}
      <section className="py-40 relative overflow-hidden flex items-center justify-center bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-black to-black" />

        {/* Floating Stickers */}
        <Sticker emoji="💫" className="top-1/4 left-[5%]" delay={0} />
        <Sticker emoji="🎯" className="bottom-1/4 right-[5%]" delay={1} />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none"
          >
            READY TO <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dfff00] to-[#00ffff]">GO VIRAL?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto font-medium"
          >
            당신의 아이디어가 세상의 트렌드가 되는 순간, <br />
            IOV가 가장 강력한 파트너가 되겠습니다.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link
              href="/recruit"
              className="group px-10 py-5 bg-[#dfff00] text-black text-xl font-black rounded-full hover:bg-white transition-all hover:scale-105 shadow-[0_0_40px_rgba(223,255,0,0.3)]"
            >
              JOIN AS CREATOR
            </Link>
            <Link
              href="/contact"
              className="group px-10 py-5 bg-transparent border-2 border-white text-white text-xl font-black rounded-full hover:bg-white hover:text-black transition-all hover:scale-105"
            >
              BUSINESS CONTACT
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
