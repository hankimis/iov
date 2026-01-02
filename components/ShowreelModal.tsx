'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useShowreel } from '@/context/ShowreelContext';

export default function ShowreelModal() {
    const { isOpen, closeShowreel } = useShowreel();

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeShowreel();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [closeShowreel]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[1000] bg-black flex items-center justify-center p-4 md:p-20"
                >
                    {/* Close Button */}
                    <button
                        onClick={closeShowreel}
                        className="absolute top-8 right-8 text-white hover:text-[#dfff00] transition-colors z-50 mix-blend-difference"
                    >
                        <X size={48} />
                    </button>

                    {/* Video Container */}
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.9 }}
                        className="relative w-full h-full max-w-[1920px] max-h-[1080px] bg-black rounded-xl overflow-hidden shadow-2xl"
                    >
                        <iframe
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&controls=0&modestbranding=1&rel=0"
                            title="Showreel"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />
                        {/* Note: Replaced with a placeholder YouTube video. In real prod, use Vimeo or hosted mp4 for tighter control. */}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
