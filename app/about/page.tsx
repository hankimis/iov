'use client';

import { motion } from 'framer-motion';
import { Target, Eye, Zap, Award, Users, Lightbulb, ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-[#0a0a0a] pt-20">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden border-b border-white/5">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#dfff00] font-mono text-sm tracking-widest mb-4 block"
          >
            WHO WE ARE
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight"
          >
            We Define the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600">Future of Media.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl leading-relaxed"
          >
            IOV는 데이터와 기술, 그리고 크리에이티브의 결합을 통해 
            미디어 엔터테인먼트의 새로운 기준을 만들어갑니다.
          </motion.p>
        </div>
      </section>

      {/* Identity Section with Mockup */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                Input · Output · Value
              </h2>
              <div className="space-y-8 text-lg text-gray-400">
                <p>
                  <strong className="text-white">IOV</strong>는 단순한 MCN이 아닙니다. 
                  우리는 크리에이터의 아이디어를 기술이라는 그릇에 담아 
                  가장 가치 있는 결과물로 재탄생시키는 <strong className="text-[#dfff00]">Tech-Media Group</strong>입니다.
                </p>
                <p>
                  전 틱톡 1위 회사의 핵심 기술진들이 설립한 IOV는 
                  자체 개발된 분석 플랫폼과 독보적인 영상 제작 파이프라인을 보유하고 있습니다.
                </p>
                <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
                  <div>
                    <div className="text-3xl font-bold text-white mb-1">Top 1%</div>
                    <div className="text-sm text-gray-500">Tech Team</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white mb-1">All-in</div>
                    <div className="text-sm text-gray-500">One Solution</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white mb-1">Global</div>
                    <div className="text-sm text-gray-500">Standard</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Abstract Mockup Area */}
            <div className="lg:w-1/2 w-full">
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-[#111] border border-white/10 group">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                
                {/* Floating Elements Mockup */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-3/4 h-3/4">
                    {/* Back Card */}
                    <div className="absolute top-0 right-0 w-full h-full bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm transform rotate-6 scale-90" />
                    {/* Front Card */}
                    <div className="absolute top-0 left-0 w-full h-full bg-[#0a0a0a] rounded-2xl border border-white/10 p-8 flex flex-col justify-between shadow-2xl">
                      <div className="flex justify-between items-start">
                        <div className="w-12 h-12 rounded-full bg-[#dfff00] opacity-20" />
                        <div className="space-y-2">
                          <div className="w-20 h-2 bg-white/20 rounded-full" />
                          <div className="w-12 h-2 bg-white/10 rounded-full ml-auto" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="w-full h-32 bg-gradient-to-br from-white/5 to-transparent rounded-xl border border-white/5" />
                        <div className="flex gap-4">
                          <div className="w-1/2 h-4 bg-white/20 rounded-full" />
                          <div className="w-1/4 h-4 bg-[#dfff00]/50 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-32 bg-[#050505] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="p-10 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-[#dfff00]/30 transition-colors group">
              <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-8 group-hover:bg-[#dfff00] group-hover:text-black transition-all text-white">
                <Target size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Mission</h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                "Imagination to Reality" <br />
                크리에이터와 비즈니스의 경계를 허물고, <br />
                모든 아이디어가 실질적인 가치로 전환되는 생태계를 구축합니다.
              </p>
            </div>

            <div className="p-10 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-[#dfff00]/30 transition-colors group">
              <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-8 group-hover:bg-[#dfff00] group-hover:text-black transition-all text-white">
                <Eye size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Vision</h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                "The Global Content Hub" <br />
                대한민국을 넘어 전 세계가 즐기는 콘텐츠를 생산하며, <br />
                글로벌 미디어 시장의 새로운 표준을 제시하는 기업이 됩니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-white mb-4">Our Core Values</h2>
            <p className="text-gray-400">우리가 일하는 방식과 태도</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Lightbulb size={32} />,
                title: "Innovation",
                desc: "기존의 방식에 안주하지 않고 끊임없이 새로운 기술과 포맷을 시도합니다."
              },
              {
                icon: <Users size={32} />,
                title: "Collaboration",
                desc: "개인의 능력보다 팀의 시너지를 믿으며, 파트너와의 동반 성장을 추구합니다."
              },
              {
                icon: <Award size={32} />,
                title: "Excellence",
                desc: "타협하지 않는 퀄리티로 고객과 대중에게 최고의 경험을 선사합니다."
              }
            ].map((item, idx) => (
              <div key={idx} className="text-center p-8 rounded-2xl hover:bg-white/5 transition-colors">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#111] border border-white/10 text-[#dfff00] mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Join the Innovation</h2>
          <a
            href="/recruit"
            className="inline-flex items-center px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-[#dfff00] transition-colors"
          >
            IOV와 함께하기 <ArrowRight className="ml-2" size={20} />
          </a>
        </div>
      </section>
    </div>
  );
}
