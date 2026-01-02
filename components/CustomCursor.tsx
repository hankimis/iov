'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function CustomCursor() {
    const pathname = usePathname();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    // ... (hooks)
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Prepare for logic
        const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
        const isAdmin = pathname?.startsWith('/admin');

        // If Admin or Touch device, show default cursor and do nothing else
        if (isAdmin || isTouchDevice) {
            document.body.style.cursor = 'auto';
            setVisible(false);
            return;
        }

        // Otherwise hide default cursor
        document.body.style.cursor = 'none';
        setVisible(true);


        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            // ...
            const target = e.target as HTMLElement;
            if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button') || target.classList.contains('cursor-hover')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
            document.body.style.cursor = 'auto';
        };
    }, []);

    if (pathname?.startsWith('/admin')) return null;
    if (!visible) return null;

    return (
        <>
            {/* ... existing JSX */}
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 bg-[#dfff00] rounded-full pointer-events-none z-[9999] mix-blend-difference"
                animate={{
                    x: mousePosition.x - 8,
                    y: mousePosition.y - 8,
                    scale: isHovering ? 3 : 1,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 28,
                }}
            />
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9998] mix-blend-difference"
                animate={{
                    x: mousePosition.x - 16,
                    y: mousePosition.y - 16,
                    scale: isHovering ? 1.5 : 1,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 250,
                    damping: 20,
                }}
            />
        </>
    );
}
