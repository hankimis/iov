'use client';

import { Calendar, ArrowUpRight } from 'lucide-react';

export default function News() {
  const newsItems = [
    {
      category: 'NOTICE',
      title: '2024년 상반기 신규 크리에이터 공개 모집',
      date: '2024.12.15',
      desc: 'IOV와 함께할 열정적인 크리에이터를 찾습니다. 나이, 경력 무관. 오직 가능성만 봅니다.'
    },
    {
      category: 'TECH',
      title: '자체 개발 AI 분석 솔루션 "IOV Analytics" 베타 오픈',
      date: '2024.12.10',
      desc: '크리에이터의 시청자 데이터를 심층 분석하여 콘텐츠 방향성을 제안하는 AI 솔루션을 런칭했습니다.'
    },
    {
      category: 'PARTNERSHIP',
      title: '글로벌 숏폼 플랫폼 T사 공식 파트너사 선정',
      date: '2024.12.01',
      desc: '국내 MCN 중 유일하게 T사 공식 마케팅/매니지먼트 파트너사로 선정되었습니다.'
    },
    {
      category: 'BUSINESS',
      title: '시리즈 A 투자 유치 완료 (100억 규모)',
      date: '2024.11.20',
      desc: '기술력과 성장성을 인정받아 국내 유수의 VC로부터 투자를 유치했습니다.'
    },
    {
      category: 'EVENT',
      title: 'IOV Creator Night 2024 개최 안내',
      date: '2024.11.15',
      desc: '소속 크리에이터와 브랜드 관계자가 함께하는 네트워킹 파티가 열립니다.'
    }
  ];

  return (
    <div className="bg-[#0a0a0a] pt-20 min-h-screen">
      <section className="py-20 max-w-5xl mx-auto px-6 lg:px-8">
        <h1 className="text-6xl font-black text-white mb-20 tracking-tighter">NEWSROOM</h1>

        <div className="space-y-4">
          {newsItems.map((item, index) => (
            <div 
              key={index}
              className="group border-b border-white/10 py-10 hover:bg-white/5 transition-colors cursor-pointer px-4 rounded-xl"
            >
              <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
                <div className="md:w-32">
                  <span className={`text-xs font-bold px-2 py-1 rounded border ${
                    item.category === 'NOTICE' ? 'text-[#dfff00] border-[#dfff00]' : 'text-gray-500 border-gray-700'
                  }`}>
                    {item.category}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#dfff00] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-1 group-hover:text-gray-300">
                    {item.desc}
                  </p>
                </div>
                <div className="flex items-center gap-8 md:justify-end md:w-48">
                  <span className="text-gray-600 font-mono text-sm flex items-center gap-2">
                    <Calendar size={14} /> {item.date}
                  </span>
                  <ArrowUpRight className="text-white opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <button className="px-8 py-3 border border-white/20 text-white rounded-full hover:bg-white hover:text-black transition-colors text-sm font-bold">
            Load More News
          </button>
        </div>
      </section>
    </div>
  );
}
