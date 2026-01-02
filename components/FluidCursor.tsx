'use client';

import { useEffect, useRef } from 'react';

interface Point {
    x: number;
    y: number;
    age: number;
    vx: number;
    vy: number;
}

export default function FluidCursor() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const points = useRef<Point[]>([]);
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        const onMouseMove = (e: MouseEvent) => {
            // Add velocity based on movement
            const dx = e.clientX - mouse.current.x;
            const dy = e.clientY - mouse.current.y;
            mouse.current = { x: e.clientX, y: e.clientY };

            // Add particles
            for (let i = 0; i < 3; i++) {
                points.current.push({
                    x: e.clientX + (Math.random() - 0.5) * 10,
                    y: e.clientY + (Math.random() - 0.5) * 10,
                    age: 0,
                    vx: dx * 0.5 + (Math.random() - 0.5) * 2,
                    vy: dy * 0.5 + (Math.random() - 0.5) * 2
                });
            }
        };
        window.addEventListener('mousemove', onMouseMove);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw points
            for (let i = points.current.length - 1; i >= 0; i--) {
                const p = points.current[i];
                p.x += p.vx;
                p.y += p.vy;
                p.age++;

                // Resistance
                p.vx *= 0.9;
                p.vy *= 0.9;

                if (p.age > 50) {
                    points.current.splice(i, 1);
                    continue;
                }

                const opacity = 1 - (p.age / 50);
                const radius = (1 - (p.age / 50)) * 20; // shrinking

                ctx.beginPath();
                // Gradient color from neon yellow to transparent
                const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius);
                grad.addColorStop(0, `rgba(223, 255, 0, ${opacity * 0.8})`); // #dfff00
                grad.addColorStop(1, `rgba(223, 255, 0, 0)`);

                ctx.fillStyle = grad;
                ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
                ctx.fill();
            }

            requestAnimationFrame(animate);
        };
        const animId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[99999] mix-blend-overlay"
        />
    );
}
