'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef, useState, useEffect } from 'react';
import { Float, Html, PerspectiveCamera, PresentationControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const DashboardModel = () => {
    return (
        <group rotation={[0, 0, 0]}>
            {/* Device Frame */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[4, 3, 0.2]} />
                <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Screen */}
            <mesh position={[0, 0, 0.11]}>
                <planeGeometry args={[3.8, 2.8]} />
                <meshBasicMaterial color="#000" />
            </mesh>

            {/* Screen Content (HTML Overlay) */}
            <Html
                transform
                position={[0, 0, 0.12]}
                occlude
                style={{
                    width: '380px',
                    height: '280px',
                    background: '#111',
                    padding: '20px',
                    borderRadius: '10px',
                    overflow: 'hidden'
                }}
            >
                <div className="flex flex-col h-full text-white font-sans pointer-events-none select-none">
                    <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                        <div className="flex gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500" />
                            <div className="w-2 h-2 rounded-full bg-yellow-500" />
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                        </div>
                        <div className="text-[8px] text-gray-500">IOV DASHBOARD</div>
                    </div>

                    <div className="flex-1 flex gap-4">
                        <div className="w-1/3 flex flex-col gap-2">
                            <div className="bg-white/5 p-2 rounded h-full flex flex-col justify-center items-center">
                                <div className="text-[8px] text-gray-500 mb-1">REVENUE</div>
                                <div className="text-xl font-bold text-[#dfff00]">$1.2M</div>
                            </div>
                            <div className="bg-white/5 p-2 rounded h-full flex flex-col justify-center items-center">
                                <div className="text-[8px] text-gray-500 mb-1">VIEWS</div>
                                <div className="text-lg font-bold">502K</div>
                            </div>
                        </div>
                        <div className="w-2/3 bg-white/5 rounded p-2 flex items-end justify-between gap-1">
                            {[40, 70, 50, 90, 60, 80, 50].map((h, i) => (
                                <div key={i} className="w-full bg-gradient-to-t from-blue-500 to-[#dfff00] opacity-80 rounded-t-sm" style={{ height: `${h}%` }} />
                            ))}
                        </div>
                    </div>

                    <div className="mt-4 bg-[#dfff00]/10 p-2 rounded border border-[#dfff00]/20">
                        <div className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-[#dfff00] rounded-full animate-pulse" />
                            <div className="text-[8px] text-[#dfff00]">LIVE MONITORING ACTIVE</div>
                        </div>
                    </div>
                </div>
            </Html>
        </group>
    );
};

export default function InteractiveMockup() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="w-full h-[600px] relative bg-[#0a0a0a]" />;

    return (
        <div className="w-full h-[600px] relative cursor-grab active:cursor-grabbing">
            <Canvas dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={50} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={2048} castShadow />

                <PresentationControls
                    global
                    snap={true}
                    rotation={[0, 0.3, 0]}
                    polar={[-Math.PI / 4, Math.PI / 4]}
                    azimuth={[-Math.PI / 4, Math.PI / 4]}
                >
                    <Float rotationIntensity={0.4}>
                        <DashboardModel />
                    </Float>
                </PresentationControls>

                <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
                <Environment preset="city" />
            </Canvas>
        </div>
    );
}
