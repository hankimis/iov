'use client';

import { useEffect, useRef, useState } from 'react';
import { Camera, Mesh, Program, Renderer, Texture, Transform } from 'ogl';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import type { CameraAnimation, ParticleMesh } from '@/lib/codrops/variant-1/types';
import { cylinderConfig, imageConfig, images, particleConfig, perspectives } from '@/lib/codrops/variant-1/data';
import {
  createCylinderGeometry,
  createParticleGeometry,
  drawImageCover,
  getPositionClasses,
} from '@/lib/codrops/variant-1/utils';
import {
  cylinderFragment,
  cylinderVertex,
  particleFragment,
  particleVertex,
} from '@/lib/codrops/variant-1/shaders';
import Loader from '@/components/codrops/Loader';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, CustomEase);
  CustomEase.create('cinematicSilk', '0.45, 0.05, 0.55, 0.95');
  CustomEase.create('cinematicSmooth', '0.25, 0.1, 0.25, 1');
  CustomEase.create('cinematicFlow', '0.33, 0, 0.2, 1');
  CustomEase.create('cinematicLinear', '0.4, 0, 0.6, 1');
}

export default function CylinderCarousel() {
  const [isLoading, setIsLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rendererRef = useRef<Renderer | null>(null);
  const sceneRef = useRef<Transform | null>(null);
  const cameraRef = useRef<Camera | null>(null);
  const cylinderRef = useRef<Mesh | null>(null);
  const cameraAnimRef = useRef<CameraAnimation>({ x: 0, y: 0, z: 8, rotY: 0 });
  const particlesRef = useRef<ParticleMesh[]>([]);
  const lastRotationRef = useRef(0);
  const velocityRef = useRef(0);
  const momentumRef = useRef(0);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const renderer = new Renderer({
      canvas: canvasRef.current,
      width: window.innerWidth,
      height: window.innerHeight,
      dpr: Math.min(window.devicePixelRatio, 2),
      alpha: true,
      antialias: true,
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 1);
    gl.disable(gl.CULL_FACE);
    rendererRef.current = renderer;

    const getResponsiveDimensions = () => {
      const width = window.innerWidth;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;

      const maxRadius = isMobile ? 1.8 : isTablet ? 2.2 : 2.5;
      const cylinderHeight = isMobile ? 0.8 : isTablet ? 1.0 : 1.2;
      const cameraZ = isMobile ? 6 : isTablet ? 7 : 8;
      const fov = isMobile ? 50 : 45;

      return {
        cylinderScale: maxRadius / cylinderConfig.radius,
        cylinderHeight,
        cameraZ,
        fov,
        isMobile,
      };
    };

    const dimensions = getResponsiveDimensions();

    const camera = new Camera(gl, { fov: dimensions.fov });
    camera.position.set(0, 0, dimensions.cameraZ);
    cameraRef.current = camera;

    const scene = new Transform();
    sceneRef.current = scene;

    const geometry = createCylinderGeometry(gl, cylinderConfig);

    const hardwareLimit = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    const isMobileDevice = window.innerWidth < 768;
    const safeLimit = isMobileDevice ? 2048 : Math.min(hardwareLimit, 8192);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', {
      willReadFrequently: false,
      alpha: false,
    })!;
    const numImages = images.length;

    const totalWidthOriginal = imageConfig.width * numImages;
    const heightOriginal = imageConfig.height;
    const scale = Math.min(1, safeLimit / totalWidthOriginal);

    canvas.width = Math.floor(totalWidthOriginal * scale);
    canvas.height = Math.floor(heightOriginal * scale);

    let loadedImages = 0;
    const imageElements: HTMLImageElement[] = [];

    const circumference = 2 * Math.PI * cylinderConfig.radius;
    const textureAspectRatio = imageConfig.height / (imageConfig.width * images.length);
    const idealHeight = circumference * textureAspectRatio;
    const heightCorrection = idealHeight / cylinderConfig.height;

    const handleResize = () => {
      if (rendererRef.current && cameraRef.current && cylinderRef.current) {
        const newDimensions = getResponsiveDimensions();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);

        cameraRef.current.perspective({
          fov: newDimensions.fov,
          aspect: window.innerWidth / window.innerHeight,
        });

        cylinderRef.current.scale.set(
          newDimensions.cylinderScale,
          newDimensions.cylinderScale * heightCorrection,
          newDimensions.cylinderScale
        );

        if (
          cameraAnimRef.current.z === 8 ||
          cameraAnimRef.current.z === 7 ||
          cameraAnimRef.current.z === 6
        ) {
          cameraAnimRef.current.z = newDimensions.cameraZ;
        }
      }
    };

    images.forEach((imageSrc, index) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        imageElements[index] = img;
        loadedImages++;

        const totalCanvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        if (loadedImages === numImages) {
          imageElements.forEach((imgEl, i) => {
            const xStartExact = (i / numImages) * totalCanvasWidth;
            const xEndExact = ((i + 1) / numImages) * totalCanvasWidth;

            const xPos = Math.floor(xStartExact);
            const xEnd = Math.floor(xEndExact);

            const drawWidthActual = xEnd - xPos;
            drawImageCover(ctx, imgEl, xPos, 0, drawWidthActual, canvasHeight);
          });

          const texture = new Texture(gl, {
            wrapS: gl.CLAMP_TO_EDGE,
            wrapT: gl.CLAMP_TO_EDGE,
            minFilter: gl.LINEAR,
            magFilter: gl.LINEAR,
            generateMipmaps: false,
          });

          texture.image = canvas;
          texture.needsUpdate = true;

          const program = new Program(gl, {
            vertex: cylinderVertex,
            fragment: cylinderFragment,
            uniforms: {
              tMap: { value: texture },
              uDarkness: { value: 0.3 },
            },
            cullFace: null,
          });

          const cylinder = new Mesh(gl, { geometry, program });
          cylinder.setParent(scene);
          cylinder.rotation.y = 0.5;
          cylinder.scale.set(dimensions.cylinderScale, dimensions.cylinderScale, dimensions.cylinderScale);
          cylinderRef.current = cylinder;

          setIsLoading(false);

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current!,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 1,
            },
          });

          tl.to(cameraAnimRef.current, {
            x: 0,
            y: 0,
            z: dimensions.cameraZ,
            duration: 1,
            ease: 'cinematicSilk',
          })
            .to(cameraAnimRef.current, {
              x: 0,
              y: 5,
              z: 5,
              duration: 1,
              ease: 'cinematicFlow',
            })
            .to(cameraAnimRef.current, {
              x: 1.5,
              y: 2,
              z: 2,
              duration: 2,
              ease: 'cinematicLinear',
            })
            .to(cameraAnimRef.current, {
              x: 0.5,
              y: 0,
              z: 0.8,
              duration: 3.5,
              ease: 'power1.inOut',
            })
            .to(cameraAnimRef.current, {
              x: -6,
              y: -1,
              z: dimensions.cameraZ,
              duration: 1,
              ease: 'cinematicSmooth',
            });

          tl.to(
            (cylinderRef.current as Mesh).rotation,
            {
              y: '+=28.27',
              duration: 8.5,
              ease: 'none',
            },
            0
          );

          textRefs.current.forEach((textEl, idx) => {
            if (!textEl) return;
            const sectionDuration = 100 / perspectives.length;
            const start = idx * sectionDuration;
            const end = (idx + 1) * sectionDuration;

            const textTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: containerRef.current!,
                start: `${start}% top`,
                end: `${end}% top`,
                scrub: 0.8,
              },
            });

            textTimeline
              .fromTo(textEl, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: 'cinematicSmooth' })
              .to(textEl, { opacity: 1, duration: 0.6, ease: 'none' })
              .to(textEl, { opacity: 0, duration: 0.2, ease: 'cinematicSmooth' });
          });

          for (let i = 0; i < particleConfig.numParticles; i++) {
            const { geometry: lineGeometry, userData } = createParticleGeometry(
              gl,
              particleConfig,
              i,
              cylinderConfig.height
            );

            const lineProgram = new Program(gl, {
              vertex: particleVertex,
              fragment: particleFragment,
              uniforms: {
                uColor: { value: [1.0, 1.0, 1.0] },
                uOpacity: { value: 0.0 },
              },
              transparent: true,
              depthTest: true,
            });

            const particle = new Mesh(gl, {
              geometry: lineGeometry,
              program: lineProgram,
              mode: gl.LINE_STRIP,
            }) as ParticleMesh;

            particle.userData = userData;
            particle.setParent(scene);
            particlesRef.current.push(particle);
          }

          window.addEventListener('resize', handleResize);

          const animate = () => {
            requestAnimationFrame(animate);

            camera.position.set(cameraAnimRef.current.x, cameraAnimRef.current.y, cameraAnimRef.current.z);
            camera.lookAt([0, 0, 0]);

            if (cylinderRef.current) {
              const currentRotation = cylinderRef.current.rotation.y;
              velocityRef.current = currentRotation - lastRotationRef.current;
              lastRotationRef.current = currentRotation;

              const inertiaFactor = 0.15;
              const decayFactor = 0.92;
              momentumRef.current = momentumRef.current * decayFactor + velocityRef.current * inertiaFactor;

              const speed = Math.abs(velocityRef.current) * 100;
              const isRotating = Math.abs(velocityRef.current) > 0.0001;

              particlesRef.current.forEach((particleMesh) => {
                const userData = particleMesh.userData;
                const targetOpacity = isRotating ? Math.min(speed * 3, 0.95) : 0;
                const currentOpacity = particleMesh.program.uniforms.uOpacity.value as number;
                particleMesh.program.uniforms.uOpacity.value =
                  currentOpacity + (targetOpacity - currentOpacity) * 0.15;

                if (isRotating) {
                  const rotationOffset = velocityRef.current * userData.speed * 1.5;
                  const newBaseAngle = userData.baseAngle + rotationOffset;
                  userData.baseAngle = newBaseAngle;

                  const segments = particleConfig.segments;
                  const positions = particleMesh.geometry.attributes.position.data as Float32Array;

                  for (let j = 0; j <= segments; j++) {
                    const t = j / segments;
                    const angle = newBaseAngle + userData.angleSpan * t;
                    const radiusWithSpeed = userData.radius;

                    positions[j * 3] = Math.cos(angle) * radiusWithSpeed;
                    positions[j * 3 + 1] = userData.baseY;
                    positions[j * 3 + 2] = Math.sin(angle) * radiusWithSpeed;
                  }

                  particleMesh.geometry.attributes.position.needsUpdate = true;
                }
              });
            }

            renderer.render({ scene, camera });
          };

          animate();
        }
      };
      img.onerror = () => {
        setIsLoading(false);
      };
      img.src = imageSrc;
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <Loader isLoading={isLoading} className="bg-[#000]" classNameLoader="bg-[#fff]" />

      {/* Hero Section: 이 구간만 sticky로 고정되고, 끝나면 아래 섹션으로 자연스럽게 이어짐 */}
      <section ref={containerRef} className="relative h-[500vh] bg-black">
        <div className="sticky top-0 h-screen">
          <div className="absolute inset-0 w-full h-full z-0">
            <canvas ref={canvasRef} className="w-full h-full" style={{ display: 'block' }} />
          </div>

          <div className="absolute inset-0 pointer-events-none z-10 text-white">
            {perspectives.map((perspective, index) => (
              <div
                key={index}
                ref={(el) => {
                  textRefs.current[index] = el;
                }}
                className={`absolute text-center opacity-0 max-md:w-full ${getPositionClasses(
                  perspective.position
                )}`}
              >
                <h2 className="text-7xl font-[300] max-md:text-3xl leading-[0.8]">{perspective.title}</h2>
                {perspective.description && (
                  <p className="text-2xl font-[300] max-md:text-base opacity-50 mt-2">
                    {perspective.description}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="absolute bottom-8 right-8 z-10 pointer-events-none">
            <div className="flex flex-col items-center gap-2 animate-bounce">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-white/60"
              >
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
              <span className="text-m text-white/40">Scroll</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


