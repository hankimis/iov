'use client';

import { Instagram, Youtube, Music } from 'lucide-react';

export default function Creators() {
  const creators = [
    {
      name: 'JIWON',
      category: 'Beauty',
      followers: '1.2M',
      platform: 'TikTok',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop'
    },
    {
      name: 'JUNHYUK',
      category: 'Gaming',
      followers: '890K',
      platform: 'YouTube',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop'
    },
    {
      name: 'SEOYEON',
      category: 'Fashion',
      followers: '560K',
      platform: 'Instagram',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop'
    },
    {
      name: 'MINJUN',
      category: 'Food',
      followers: '2.1M',
      platform: 'TikTok',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop'
    },
    {
      name: 'SOOA',
      category: 'Dance',
      followers: '1.5M',
      platform: 'TikTok',
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1887&auto=format&fit=crop'
    },
    {
      name: 'TAEYANG',
      category: 'Vlog',
      followers: '430K',
      platform: 'YouTube',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop'
    }
  ];

  return (
    <div className="bg-[#0a0a0a] pt-20">
      <section className="py-20 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter">
            OUR <span className="text-[#dfff00]">STARS</span>
          </h1>
          <p className="text-xl text-gray-400">
            IOV와 함께 성장하는 크리에이터들을 만나보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {creators.map((creator, index) => (
            <div 
              key={index}
              className="group relative h-[500px] rounded-3xl overflow-hidden bg-[#111] border border-white/5"
            >
              <img 
                src={creator.image} 
                alt={creator.name}
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
              
              <div className="absolute bottom-0 left-0 w-full p-8">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs text-[#dfff00] mb-3 border border-white/10">
                    {creator.category}
                  </span>
                  <h3 className="text-4xl font-bold text-white mb-2">{creator.name}</h3>
                  <div className="flex items-center justify-between border-t border-white/20 pt-4 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                     <div className="text-white">
                        <p className="text-xs text-gray-400 uppercase">Followers</p>
                        <p className="text-xl font-bold">{creator.followers}</p>
                     </div>
                     <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-[#dfff00] transition-colors cursor-pointer">
                        {creator.platform === 'TikTok' ? <Music size={20} /> : 
                         creator.platform === 'YouTube' ? <Youtube size={20} /> : 
                         <Instagram size={20} />}
                     </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 p-12 rounded-3xl bg-[#111] border border-white/5 text-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#dfff00] to-transparent opacity-50" />
           <h2 className="text-3xl font-bold text-white mb-6">Become the Next Star</h2>
           <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
             당신의 재능을 IOV의 기술과 결합하세요. <br />
             체계적인 매니지먼트와 전폭적인 지원이 기다리고 있습니다.
           </p>
           <a href="/recruit" className="inline-block px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-[#dfff00] transition-colors">
             Apply Now
           </a>
        </div>
      </section>
    </div>
  );
}
