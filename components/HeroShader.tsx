import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

// ... (NetworkGrid component stays same, targeting imports and HeroShader component)

// I need to be careful with replace_file_content context.
// Let's target the HeroShader component specifically.


const NetworkGrid = () => {
    const mesh = useRef<THREE.InstancedMesh>(null);
    const count = 100; // Fewer, larger, more structured points
    const dummy = useMemo(() => new THREE.Object3D(), []);

    const particles = useMemo(() => {
        const temp = [];
        // Create a structured grid instead of random chaos
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                const t = Math.random() * 100;
                const factor = 10 + Math.random() * 5; // Reduced factor for stability
                const speed = 0.005 + Math.random() / 500; // Slower speed

                // Grid definition
                const xFactor = (x - 5) * 8; // Spread out coordinates
                const yFactor = (y - 5) * 8;
                const zFactor = -10; // Keep them back slightly

                temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
            }
        }
        return temp;
    }, []);

    useFrame((state) => {
        if (!mesh.current) return;

        const time = state.clock.getElapsedTime();

        particles.forEach((particle, i) => {
            let { xFactor, yFactor, zFactor } = particle;

            // Gentle floating wave motion
            const yWave = Math.sin(time * 0.5 + xFactor * 0.2) * 2;
            const xWave = Math.cos(time * 0.3 + yFactor * 0.2) * 2;

            dummy.position.set(
                xFactor + xWave,
                yFactor + yWave,
                zFactor
            );

            // Pulsing scale
            const scale = 1 + Math.sin(time * 2 + i) * 0.2;
            dummy.scale.set(scale, scale, scale);

            dummy.updateMatrix();
            if (mesh.current) mesh.current.setMatrixAt(i, dummy.matrix);
        });

        if (mesh.current) mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <>
            <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshBasicMaterial color="#dfff00" wireframe />
            </instancedMesh>

            {/* Connecting Lines (Conceptual Grid) */}
            <gridHelper args={[100, 20, 0x222222, 0x111111]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -20]} />
        </>
    );
};

export default function HeroShader() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="absolute inset-0 w-full h-full bg-[#0a0a0a]" />;

    return (
        <div className="absolute inset-0 w-full h-full bg-[#0a0a0a]">
            <Canvas
                camera={{ position: [0, 0, 20], fov: 60 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
            >
                <color attach="background" args={['#0a0a0a']} />

                {/* Clean Lighting */}
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />

                <NetworkGrid />

                {/* Deep Fog for depth */}
                <fog attach="fog" args={['#0a0a0a', 15, 40]} />
            </Canvas>
        </div>
    );
}
