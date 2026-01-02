'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedTextRevealProps {
    lines: string[];
    className?: string;
}

export default function AnimatedTextReveal({ lines, className = '' }: AnimatedTextRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <div ref={ref} className={className}>
            {lines.map((line, idx) => (
                <div key={idx} className="overflow-hidden">
                    <motion.p
                        initial={{ y: '100%' }}
                        animate={isInView ? { y: 0 } : { y: '100%' }}
                        transition={{
                            duration: 0.8,
                            delay: idx * 0.15,
                            ease: [0.33, 1, 0.68, 1]
                        }}
                        className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight"
                    >
                        {line}
                    </motion.p>
                </div>
            ))}
        </div>
    );
}
