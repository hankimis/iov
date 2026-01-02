'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Instagram, Youtube, Facebook, Mail } from 'lucide-react';

const Footer = () => {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  const links = [
    { name: 'About', href: '/about' },
    { name: 'Business', href: '/business' },
    { name: 'Creators', href: '/creators' },
    { name: 'News', href: '/news' },
    { name: 'Contact', href: '/contact' },
  ];

  const socials = [
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'Youtube', icon: Youtube, href: '#' },
    { name: 'Facebook', icon: Facebook, href: '#' },
  ];

  return (
    <footer className="bg-black text-white pt-32 pb-12 border-t border-white/10 relative overflow-hidden">
      {/* Background Text */}
      <div className="absolute top-0 left-0 w-full overflow-hidden opacity-[0.03] pointer-events-none select-none">
        <span className="text-[20vw] font-black leading-none whitespace-nowrap block translate-y-[-20%]">
          INPUT OUTPUT VALUE
        </span>
      </div>

      <div className="max-w-[1920px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-20 mb-32">

          {/* Brand & CTA */}
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
              Let's create <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dfff00] to-white">
                something unreal.
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-lg">
              IOV는 크리에이터와 비즈니스의 경계를 허무는 <br />
              글로벌 Tech-Media Group입니다.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-2xl font-bold border-b-2 border-white hover:text-[#dfff00] hover:border-[#dfff00] transition-colors pb-1"
            >
              Start a Project <ArrowUpRight size={24} />
            </Link>
          </div>

          {/* Navigation Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-24 w-full lg:w-auto">
            <div>
              <h4 className="text-sm font-mono text-gray-500 mb-6 uppercase tracking-wider">Sitemap</h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-lg hover:text-[#dfff00] transition-colors block w-fit">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-mono text-gray-500 mb-6 uppercase tracking-wider">Socials</h4>
              <ul className="space-y-4">
                {socials.map((social) => (
                  <li key={social.name}>
                    <a href={social.href} className="text-lg hover:text-[#dfff00] transition-colors flex items-center gap-2 group w-fit">
                      {social.name}
                      <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h4 className="text-sm font-mono text-gray-500 mb-6 uppercase tracking-wider">Office</h4>
              <address className="not-italic text-lg text-gray-300 space-y-2">
                <p>서울특별시 강남구 테헤란로</p>
                <p>IOV 빌딩 5층</p>
                <a href="mailto:contact@iov.kr" className="block mt-4 hover:text-[#dfff00] transition-colors">
                  contact@iov.kr
                </a>
              </address>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-end border-t border-white/10 pt-12">
          <div className="mb-8 md:mb-0">
            <span className="text-[12vw] md:text-[8vw] font-black leading-[0.8] tracking-tighter text-white/10 block select-none pointer-events-none">
              IOV.KR
            </span>
          </div>
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-sm text-gray-500 pb-4">
            <p>&copy; 2024 IOV Corp.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
