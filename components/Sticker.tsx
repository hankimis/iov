'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface StickerProps {
    src?: string;
    emoji?: string;
    alt?: string;
    className?: string;
    delay?: number;
    duration?: number;
    rotate?: number;
}

export default function Sticker({
    src,
    emoji,
    alt = 'sticker',
    className = '',
    delay = 0,
    duration = 5,
    rotate = 10
}: StickerProps) {
    return (
        <motion.div
            className={`absolute select-none pointer-events-none z-10 ${className}`}
            animate={{
                y: [-15, 15, -15],
                rotate: [-rotate, rotate, -rotate],
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay
            }}
            whileHover={{ scale: 1.2, rotate: 0 }}
        >
            {src ? (
                <div className="relative w-20 h-20 md:w-32 md:h-32 drop-shadow-2xl">
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        className="object-contain"
                    />
                </div>
            ) : (
                <span className="text-6xl md:text-8xl drop-shadow-lg filter">{emoji}</span>
            )}
        </motion.div>
    );
}
