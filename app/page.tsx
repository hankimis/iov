'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, Zap, Globe, TrendingUp, Users, Video, Briefcase, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import Typewriter from 'typewriter-effect';

export default function Home() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="bg-[#0a0a0a] overflow-x-hidden">
      {/* 
        =============================================
        SUPER HERO SECTION
        =============================================
      */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* 1. Dynamic Video Background with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" /> {/* Dark Overlay */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 z-10" /> {/* Texture */}
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover grayscale opacity-50 scale-105"
          >
            {/* 고퀄리티 무료 스톡 비디오 (크리에이터, 스튜디오, 라이브 방송 느낌) */}
            <source src="https://videos.pexels.com/video-files/3196232/3196232-hd_1920_1080_25fps.mp4" type="video/mp4" />
          </video>
        </div>

        {/* 2. Content */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col items-start justify-center h-full">
            
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-6 flex items-center gap-3"
            >
              <span className="px-3 py-1 rounded-full border border-[#dfff00] text-[#dfff00] text-xs font-mono tracking-widest bg-[#dfff00]/10 backdrop-blur-md">
                NEXT GEN MCN
              </span>
              <div className="h-[1px] w-20 bg-gradient-to-r from-[#dfff00] to-transparent" />
            </motion.div>

            {/* Main Title with Glitch/Typewriter Effect */}
            <div className="mb-8">
              <motion.h1 
                className="text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-[0.9]"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                WE MAKE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">
                  YOUR
                </span>
              </motion.h1>
              
              <motion.div 
                className="text-7xl md:text-8xl lg:text-9xl font-black text-[#dfff00] tracking-tighter leading-[0.9]"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {mounted && (
                  <Typewriter
                    options={{
                      strings: ['VALUE.', 'FAME.', 'IMPACT.', 'TREND.'],
                      autoStart: true,
                      loop: true,
                      cursor: '_',
                      deleteSpeed: 50,
                      delay: 100,
                    }}
                  />
                )}
              </motion.div>
            </div>

            {/* Description */}
            <motion.p
              className="text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed mb-12 border-l-4 border-[#dfff00] pl-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              아이디어(Input)를 기술로 처리(Output)하여<br />
              세상이 놀랄만한 가치(Value)로 증명합니다.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <Link href="/contact" className="group relative px-8 py-4 bg-[#dfff00] text-black font-bold text-lg rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(223,255,0,0.5)]">
                <span className="relative z-10 flex items-center gap-2">
                  Start Project <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-30 transition-opacity" />
              </Link>
              
              <Link href="/about" className="group px-8 py-4 border border-white/30 text-white font-bold text-lg rounded-full hover:bg-white/10 backdrop-blur-sm transition-all flex items-center gap-2">
                <Play size={18} className="fill-white group-hover:scale-110 transition-transform" />
                Watch Showreel
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span className="text-[10px] font-mono text-[#dfff00] tracking-widest uppercase">Scroll Down</span>
          <ChevronDown className="text-white" />
        </motion.div>
      </section>


      {/* 
        =============================================
        BENTO GRID SECTION
        =============================================
      */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 flex items-end justify-between"
          >
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tighter">OUR <span className="text-[#dfff00]">BUSINESS</span></h2>
              <p className="text-xl text-gray-400">IOV가 제공하는 3가지 핵심 밸류체인</p>
            </div>
            <div className="hidden md:block w-1/3 h-[1px] bg-white/10 mb-4" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* Entertainment - Large */}
            <motion.div
              style={{ y: y1 }}
              className="md:col-span-2 row-span-2 group relative overflow-hidden rounded-[2rem] bg-[#111] border border-white/5"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=2070&auto=format&fit=crop" 
                alt="Entertainment"
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
              />
              <div className="absolute bottom-0 left-0 p-10 z-20 w-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#dfff00] flex items-center justify-center text-black shadow-[0_0_20px_rgba(223,255,0,0.4)]">
                    <Users size={28} strokeWidth={2.5} />
                  </div>
                  <div className="px-4 py-1.5 rounded-full border border-white/20 bg-black/50 backdrop-blur text-sm text-white">
                    Core Business 01
                  </div>
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase italic">Entertainment</h3>
                <p className="text-gray-300 text-lg mb-8 max-w-lg leading-relaxed">
                  틱톡, 유튜브 라이브부터 인플루언서 매니지먼트까지. 
                  크리에이터의 잠재력을 폭발시키는 체계적인 육성 시스템.
                </p>
                <div className="flex gap-3">
                  {['Live Streaming', 'Management', 'Global'].map((tag) => (
                    <span key={tag} className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm font-bold backdrop-blur-sm border border-white/5 hover:bg-[#dfff00] hover:text-black transition-colors cursor-default">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Marketing - Tall */}
            <motion.div
              className="md:col-span-1 row-span-2 group relative overflow-hidden rounded-[2rem] bg-[#111] border border-white/5 hover:border-purple-500/50 transition-colors duration-500"
            >
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-purple-900/30 group-hover:opacity-100 opacity-50 transition-opacity" />
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center opacity-10 group-hover:opacity-20 transition-opacity">
                <TrendingUp size={200} className="mx-auto text-purple-500" />
              </div>

              <div className="absolute bottom-0 left-0 p-8 z-20 w-full h-full flex flex-col justify-end">
                <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center mb-6 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                  <Zap size={24} strokeWidth={2.5} />
                </div>
                <h3 className="text-3xl font-black text-white mb-4 uppercase italic">Marketing</h3>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  데이터 기반의 정교한 타겟팅. 개인 사업자부터 브랜드까지, 
                  매출로 직결되는 퍼포먼스 마케팅.
                </p>
                <Link href="/business" className="w-full py-4 border border-white/20 rounded-xl flex items-center justify-center text-white hover:bg-white hover:text-purple-900 transition-all font-bold group-hover:translate-y-0 translate-y-2">
                  Learn more <ArrowRight size={18} className="ml-2" />
                </Link>
              </div>
            </motion.div>

            {/* Production - Wide */}
            <motion.div
              style={{ y: y2 }}
              className="md:col-span-3 row-span-1 group relative overflow-hidden rounded-[2rem] bg-[#111] border border-white/5"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
              <video 
                autoPlay loop muted playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity grayscale"
              >
                <source src="https://videos.pexels.com/video-files/3205915/3205915-hd_1920_1080_25fps.mp4" type="video/mp4" />
              </video>
              
              <div className="absolute inset-0 flex items-center p-12 z-20">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                      <Video size={24} fill="currentColor" />
                    </div>
                    <h3 className="text-4xl font-black text-white italic uppercase">Video Production</h3>
                  </div>
                  <p className="text-gray-300 text-lg max-w-xl">
                    기획, 촬영, 편집, 모션그래픽까지. 방송국 출신 전문가들이 만드는 압도적 퀄리티의 영상 콘텐츠.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 
        =============================================
        STATS SECTION (KINETIC)
        =============================================
      */}
      <section className="py-20 border-y border-white/5 bg-[#050505] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: "Creators", value: "50+", color: "text-[#dfff00]" },
              { label: "Total Views", value: "500M+", color: "text-white" },
              { label: "Followers", value: "10M+", color: "text-white" },
              { label: "Partners", value: "100+", color: "text-[#dfff00]" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center group relative">
                <div className="absolute -inset-4 bg-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                <h3 className={`text-5xl md:text-7xl font-black mb-2 ${stat.color} tracking-tighter relative z-10`}>
                  {stat.value}
                </h3>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-sm group-hover:text-white transition-colors relative z-10">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 
        =============================================
        TECH & MOCKUP SECTION
        =============================================
      */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-20">
            <div className="w-full md:w-1/2">
              <h2 className="text-5xl md:text-6xl font-black mb-10 leading-[0.9] text-white tracking-tighter">
                WHY <br />
                <span className="text-[#dfff00]">IOV?</span>
              </h2>
              <div className="space-y-10">
                {[
                  {
                    title: "AI-Driven Analytics",
                    desc: "자체 개발된 AI 알고리즘으로 시청자 데이터를 분석하여 최적의 콘텐츠 방향성을 제시합니다.",
                    icon: <Zap />
                  },
                  {
                    title: "Global Network",
                    desc: "틱톡, 유튜브 등 글로벌 플랫폼과의 파트너십을 통해 크리에이터의 세계 무대 진출을 돕습니다.",
                    icon: <Globe />
                  },
                  {
                    title: "Full-Stack Support",
                    desc: "기획부터 법률 자문, 세무 관리까지. 크리에이터가 창작에만 집중할 수 있는 환경을 만듭니다.",
                    icon: <Briefcase />
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-[#111] border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-black group-hover:bg-[#dfff00] group-hover:border-[#dfff00] transition-all shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-3 text-white">{item.title}</h3>
                      <p className="text-gray-400 leading-relaxed text-lg">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* 3D-like Mockup */}
            <div className="w-full md:w-1/2 perspective-1000">
               <motion.div 
                 className="relative h-[600px] w-full rounded-[2.5rem] bg-[#0a0a0a] border border-white/10 p-4 shadow-2xl overflow-hidden transform rotate-y-12 rotate-x-6 hover:rotate-0 transition-transform duration-700 ease-out"
                 initial={{ rotateY: -10, rotateX: 5 }}
                 whileHover={{ rotateY: 0, rotateX: 0 }}
               >
                  {/* Screen Content */}
                  <div className="h-full w-full bg-[#111] rounded-[2rem] overflow-hidden relative">
                    <div className="absolute top-0 left-0 right-0 h-16 bg-[#1a1a1a] border-b border-white/5 flex items-center px-6 gap-4 z-20">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                      </div>
                    </div>

                    <div className="p-8 pt-24 space-y-6">
                       <div className="flex justify-between items-end">
                          <div className="space-y-2">
                             <div className="text-gray-500 text-sm font-mono">TOTAL REVENUE</div>
                             <div className="text-4xl font-bold text-white">$ 1,240,500</div>
                          </div>
                          <div className="px-3 py-1 bg-[#dfff00]/20 text-[#dfff00] rounded-lg text-sm font-bold">+24.5%</div>
                       </div>
                       
                       {/* Chart Mockup */}
                       <div className="h-48 flex items-end justify-between gap-2 px-2 pb-4 border-b border-white/5">
                          {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                             <div key={i} className="w-full bg-[#dfff00] opacity-80 rounded-t-sm hover:opacity-100 transition-opacity" style={{ height: `${h}%` }} />
                          ))}
                       </div>

                       <div className="grid grid-cols-2 gap-4">
                          <div className="bg-[#1a1a1a] p-4 rounded-xl border border-white/5">
                             <div className="text-gray-500 text-xs mb-2">ENGAGEMENT</div>
                             <div className="text-2xl font-bold text-white">8.4M</div>
                          </div>
                          <div className="bg-[#1a1a1a] p-4 rounded-xl border border-white/5">
                             <div className="text-gray-500 text-xs mb-2">FOLLOWERS</div>
                             <div className="text-2xl font-bold text-white">1.2M</div>
                          </div>
                       </div>
                    </div>

                    {/* Glow Effect */}
                    <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#dfff00]/20 rounded-full blur-[100px] pointer-events-none" />
                  </div>
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        =============================================
        MARQUEE SECTION
        =============================================
      */}
      <section className="py-20 overflow-hidden bg-black border-y border-white/5">
        <div className="relative flex whitespace-nowrap overflow-hidden">
          <div className="flex animate-marquee gap-20 px-10">
             {[...Array(4)].map((_, i) => (
                <div key={i} className="flex gap-20 items-center">
                  {['TIKTOK', 'YOUTUBE', 'META', 'NAVER', 'KAKAO', 'COUPANG'].map((brand) => (
                    <span key={brand} className="text-4xl md:text-5xl font-black text-[#222] hover:text-[#dfff00] transition-colors cursor-default tracking-tighter">
                      {brand}
                    </span>
                  ))}
                </div>
             ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent pointer-events-none" />
        </div>
      </section>

      {/* 
        =============================================
        CTA SECTION
        =============================================
      */}
      <section className="py-40 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[#dfff00] z-0">
           <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 mix-blend-multiply" />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80" />
        </div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
            READY TO <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#dfff00] to-white">SHINE?</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto font-medium">
            당신의 아이디어가 세상의 가치가 되는 순간, <br />
            IOV가 가장 강력한 파트너가 되겠습니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/recruit"
              className="px-10 py-5 bg-white text-black text-xl font-bold rounded-full hover:bg-[#dfff00] transition-all hover:scale-105 shadow-2xl"
            >
              Join as Creator
            </Link>
            <Link 
              href="/contact"
              className="px-10 py-5 bg-transparent border-2 border-white text-white text-xl font-bold rounded-full hover:bg-white hover:text-black transition-all hover:scale-105"
            >
              Business Contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
