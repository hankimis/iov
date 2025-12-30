'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Play, TrendingUp, Mic, Globe, Cpu } from 'lucide-react';

export default function Business() {
  return (
    <div className="bg-[#0a0a0a] pt-20">
      <section className="py-32 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-black text-white mb-20 tracking-tighter"
        >
          BUSINESS <span className="text-[#dfff00]">AREA</span>
        </motion.h1>

        {/* 1. Entertainment */}
        <div className="mb-32">
          <div className="flex flex-col md:flex-row items-end gap-6 mb-12 border-b border-white/10 pb-8">
            <span className="text-[#dfff00] font-mono text-xl">01</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Entertainment</h2>
            <p className="text-gray-500 md:ml-auto max-w-sm text-sm">
              Global Creator Management & Live Streaming
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-[#111] rounded-3xl p-10 border border-white/5 flex flex-col justify-between h-[500px] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10" />
              <img 
                src="https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=2070&auto=format&fit=crop" 
                alt="Entertainment" 
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="relative z-20 mt-auto">
                <h3 className="text-3xl font-bold text-white mb-4">Creator Management</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#dfff00] rounded-full" /> 인플루언서 1:1 전담 케어</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#dfff00] rounded-full" /> 데이터 기반 성장 전략 수립</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#dfff00] rounded-full" /> 글로벌 플랫폼(TikTok) 진출 지원</li>
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-[#111] rounded-3xl p-10 border border-white/5 hover:border-[#dfff00]/30 transition-colors h-[240px] flex flex-col justify-center">
                <Mic className="text-[#dfff00] mb-6" size={32} />
                <h3 className="text-2xl font-bold text-white mb-2">Live Streaming</h3>
                <p className="text-gray-400">틱톡, 유튜브 라이브 기획 및 전문 장비/스튜디오 지원으로 실시간 소통을 극대화합니다.</p>
              </div>
              <div className="bg-[#111] rounded-3xl p-10 border border-white/5 hover:border-[#dfff00]/30 transition-colors h-[240px] flex flex-col justify-center">
                <Globe className="text-[#dfff00] mb-6" size={32} />
                <h3 className="text-2xl font-bold text-white mb-2">Global Expansion</h3>
                <p className="text-gray-400">해외 MCN과의 파트너십을 통해 크리에이터의 글로벌 팬덤 확장을 지원합니다.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Marketing */}
        <div className="mb-32">
          <div className="flex flex-col md:flex-row items-end gap-6 mb-12 border-b border-white/10 pb-8">
            <span className="text-[#dfff00] font-mono text-xl">02</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Marketing Solution</h2>
            <p className="text-gray-500 md:ml-auto max-w-sm text-sm">
              Performance Marketing & Brand Commerce
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 bg-[#111] rounded-3xl p-8 border border-white/5">
              <TrendingUp className="text-white mb-6" size={32} />
              <h3 className="text-2xl font-bold text-white mb-4">Viral Contents</h3>
              <p className="text-gray-400 mb-6">
                단순 노출이 아닌, '터지는' 콘텐츠를 기획합니다. 
                트렌드 밈과 브랜드 메시지를 결합하여 자연스러운 바이럴을 유도합니다.
              </p>
            </div>
            <div className="md:col-span-1 bg-[#111] rounded-3xl p-8 border border-white/5">
              <Cpu className="text-white mb-6" size={32} />
              <h3 className="text-2xl font-bold text-white mb-4">AI Targeting</h3>
              <p className="text-gray-400 mb-6">
                자체 AI 솔루션으로 타겟 오디언스를 정밀 분석하여 
                마케팅 효율(ROAS)을 극대화합니다.
              </p>
            </div>
            <div className="md:col-span-1 bg-[#111] rounded-3xl p-8 border border-white/5 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-10">
                 <h1 className="text-9xl font-black text-white">0%</h1>
               </div>
              <h3 className="text-2xl font-bold text-white mb-4 mt-16">No Initial Cost</h3>
              <p className="text-gray-400 mb-6 relative z-10">
                초기 비용 부담 없는 수수료제(Revenue Share) 모델로 
                파트너사와 함께 성장하는 구조를 만듭니다.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Production */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row items-end gap-6 mb-12 border-b border-white/10 pb-8">
            <span className="text-[#dfff00] font-mono text-xl">03</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Video Production</h2>
            <p className="text-gray-500 md:ml-auto max-w-sm text-sm">
              High-End Visual Creative
            </p>
          </div>

          <div className="w-full h-[600px] bg-[#111] rounded-3xl overflow-hidden relative border border-white/5 group">
             {/* Mockup Interface of Video Editor */}
             <div className="absolute inset-0 flex items-center justify-center bg-[#050505]">
                <div className="w-[90%] h-[80%] border border-white/10 rounded-xl bg-[#1a1a1a] flex flex-col overflow-hidden shadow-2xl">
                   {/* Header */}
                   <div className="h-10 border-b border-white/5 bg-[#222] flex items-center px-4 gap-2">
                      <div className="flex gap-1.5">
                         <div className="w-3 h-3 rounded-full bg-red-500/50" />
                         <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                         <div className="w-3 h-3 rounded-full bg-green-500/50" />
                      </div>
                      <div className="ml-auto text-xs text-gray-500">IOV_Project_Final_v02.prproj</div>
                   </div>
                   {/* Body */}
                   <div className="flex-1 flex">
                      <div className="w-1/4 border-r border-white/5 p-4 space-y-2">
                         <div className="h-20 bg-white/5 rounded" />
                         <div className="h-20 bg-white/5 rounded" />
                         <div className="h-20 bg-white/5 rounded" />
                      </div>
                      <div className="w-3/4 p-4 flex flex-col gap-4">
                         <div className="flex-1 bg-black rounded flex items-center justify-center relative">
                            <Play className="text-white/20 w-16 h-16" fill="currentColor" />
                            <div className="absolute bottom-4 left-4 text-white font-mono text-sm">00:01:24:15</div>
                         </div>
                         <div className="h-32 bg-[#222] rounded border border-white/5 relative overflow-hidden">
                            <div className="absolute top-4 left-0 w-full h-8 bg-blue-500/20" />
                            <div className="absolute top-14 left-0 w-full h-8 bg-purple-500/20" />
                            <div className="absolute top-0 left-1/3 w-[1px] h-full bg-red-500" />
                         </div>
                      </div>
                   </div>
                </div>
             </div>

             <div className="absolute bottom-0 left-0 w-full p-10 bg-gradient-to-t from-black via-black/80 to-transparent">
                <h3 className="text-3xl font-bold text-white mb-2">One-Stop Solution</h3>
                <p className="text-gray-400 max-w-2xl">
                   기획, 촬영, 편집, 모션그래픽, 사운드 믹싱까지. <br />
                   방송국 출신 베테랑 PD와 전문 편집팀이 최상의 퀄리티를 보장합니다.
                </p>
             </div>
          </div>
        </div>

        <div className="text-center pt-20">
          <a href="/contact" className="inline-block border-b border-white text-white text-xl pb-1 hover:text-[#dfff00] hover:border-[#dfff00] transition-colors">
            Start a Project with Us →
          </a>
        </div>
      </section>
    </div>
  );
}
