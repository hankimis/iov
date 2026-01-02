'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { usePathname } from 'next/navigation';

const Navigation = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname?.startsWith('/admin')) return null;

  const navItems = [
    { name: 'BUSINESS', href: '/business' },
    { name: 'CREATORS', href: '/creators' },
    { name: 'NEWS', href: '/news' },
    { name: 'RECRUIT', href: '/recruit' },
    { name: 'CONTACT', href: '/contact' },
  ];

  /* Magnetic Effect Helper */
  const MagneticWrapper = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = ref.current?.getBoundingClientRect() || { height: 0, width: 0, left: 0, top: 0 };
      const middleX = clientX - (left + width / 2);
      const middleY = clientY - (top + height / 2);
      setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
    };

    const reset = () => {
      setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;
    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        animate={{ x, y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      >
        {children}
      </motion.div>
    );
  };

  const isCreators = pathname === '/creators';

  const navStyle =
    isCreators
      ? 'bg-black/80 backdrop-blur-md border-b border-white/10 py-4'
      : scrolled
        ? 'glass-nav py-4'
        : 'bg-transparent py-6';

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-[100] transition-all duration-300 ${navStyle}`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link href="/" className="group flex items-center gap-2">
              <span className="text-2xl font-black tracking-tighter text-white group-hover:text-[#dfff00] transition-colors">
                IOV
              </span>
              <div className="h-1.5 w-1.5 rounded-full bg-[#dfff00]" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <MagneticWrapper key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group cursor-hover px-2 py-1"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#dfff00] transition-all duration-300 group-hover:w-full" />
                  </Link>
                </MagneticWrapper>
              ))}
              <MagneticWrapper>
                <Link
                  href="/contact"
                  className="px-5 py-2 text-sm font-bold text-black bg-white rounded-full hover:bg-[#dfff00] transition-colors duration-300 cursor-hover"
                >
                  Let's Talk
                </Link>
              </MagneticWrapper>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden text-white p-2"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-black md:hidden"
          >
            <div className="flex flex-col h-full p-8">
              <div className="flex justify-between items-center mb-12">
                <span className="text-2xl font-black text-white">IOV</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-white/50 hover:text-white"
                >
                  <X size={32} />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="text-4xl font-bold text-white/80 hover:text-[#dfff00] transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto">
                <p className="text-gray-500 text-sm mb-4">Contact us</p>
                <p className="text-xl font-medium text-white mb-6">contact@iov.kr</p>
                <Link
                  href="/contact"
                  className="block w-full py-4 text-center font-bold text-black bg-[#dfff00] rounded-xl hover:bg-white transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Start Project
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
