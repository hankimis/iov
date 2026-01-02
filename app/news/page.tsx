'use client';

import { Calendar, ArrowUpRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function News() {
  const [newsItems, setNewsItems] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/news')
      .then(res => res.json())
      .then(data => setNewsItems(data))
      .catch(err => console.error('Failed to fetch news:', err));
  }, []);

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
                  <span className={`text-xs font-bold px-2 py-1 rounded border ${item.category === 'NOTICE' ? 'text-[#dfff00] border-[#dfff00]' : 'text-gray-500 border-gray-700'
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
