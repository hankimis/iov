'use client';

import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

export default function Recruit() {
  const [activeTab, setActiveTab] = useState<'creator' | 'business'>('creator');

  return (
    <div className="bg-[#0a0a0a] pt-20 min-h-screen">
      <section className="py-20 max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
            JOIN <span className="text-[#dfff00]">US</span>
          </h1>
          <p className="text-xl text-gray-400">
            IOV와 함께 새로운 가치를 만들어갈 파트너를 찾습니다.
          </p>
        </div>

        <div className="flex justify-center mb-12">
           <div className="bg-[#111] p-1 rounded-full border border-white/10 flex">
              <button 
                onClick={() => setActiveTab('creator')}
                className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${
                   activeTab === 'creator' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                For Creators
              </button>
              <button 
                onClick={() => setActiveTab('business')}
                className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${
                   activeTab === 'business' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                For Business
              </button>
           </div>
        </div>

        <div className="bg-[#111] border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#dfff00]/5 rounded-full blur-[80px]" />
          
          <div className="relative z-10">
             <div className="mb-10">
                <h3 className="text-2xl font-bold text-white mb-2">
                   {activeTab === 'creator' ? '크리에이터 지원 신청' : '비즈니스 파트너 신청'}
                </h3>
                <p className="text-gray-400 text-sm">
                   작성해주신 내용은 담당자 검토 후 개별 연락드립니다.
                </p>
             </div>

             <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase">Name</label>
                      <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#dfff00] transition-colors" placeholder="홍길동" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase">Contact</label>
                      <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#dfff00] transition-colors" placeholder="010-0000-0000" />
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                   <input type="email" className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#dfff00] transition-colors" placeholder="email@example.com" />
                </div>

                {activeTab === 'creator' && (
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-gray-500 uppercase">SNS URL</label>
                     <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#dfff00] transition-colors" placeholder="https://instagram.com/..." />
                  </div>
                )}
                
                {activeTab === 'business' && (
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-gray-500 uppercase">Company Name</label>
                     <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#dfff00] transition-colors" placeholder="회사명" />
                  </div>
                )}

                <div className="space-y-2">
                   <label className="text-xs font-bold text-gray-500 uppercase">Message</label>
                   <textarea rows={5} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#dfff00] transition-colors resize-none" placeholder="간단한 소개와 지원 동기를 적어주세요." />
                </div>

                <div className="pt-4">
                   <button className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-[#dfff00] transition-colors flex items-center justify-center gap-2">
                      <Send size={18} /> Submit Application
                   </button>
                </div>
             </form>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-20 grid md:grid-cols-3 gap-6">
           {[
              '위약금 없는 공정한 계약',
              '초기 비용 0원 지원',
              '전문가 1:1 전담 케어'
           ].map((text, i) => (
              <div key={i} className="flex items-center gap-3 text-gray-300">
                 <CheckCircle className="text-[#dfff00]" size={20} />
                 <span>{text}</span>
              </div>
           ))}
        </div>
      </section>
    </div>
  );
}
