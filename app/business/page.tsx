'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, BarChart3, Repeat, Share2, Link2 } from 'lucide-react';

export default function Business() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !canvasRef.current) return;

    let app: any = null;
    let destroyed = false;
    let clickHandler: ((e: MouseEvent) => void) | null = null;

    // 흑백 톤만 사용하도록 그레이스케일 컬러 생성
    function randomColors(count: number) {
      return new Array(count).fill(0).map(() => {
        const v = Math.floor(Math.random() * 256);
        const hex = v.toString(16).padStart(2, '0');
        return `#${hex}${hex}${hex}`;
      });
    }

    (async () => {
      try {
        // threejs-components를 클라이언트에서만 동적 로드
        const mod = await import('threejs-components/build/cursors/tubes1.min.js');
        const TubesCursor = (mod.default || mod) as any;

        if (destroyed || !canvasRef.current || !TubesCursor) return;

        app = TubesCursor(canvasRef.current, {
          tubes: {
            colors: ['#ffffff', '#cfcfcf', '#8a8a8a'],
            lights: {
              intensity: 200,
              colors: ['#ffffff', '#e5e5e5', '#b0b0b0', '#707070'],
            },
          },
        });

        clickHandler = () => {
          if (!app) return;
          const colors = randomColors(3);
          const lightsColors = randomColors(4);
          app.tubes.setColors(colors);
          app.tubes.setLightsColors(lightsColors);
        };

        window.addEventListener('click', clickHandler);
      } catch (e) {
        console.error('[Business TubesCursor] Failed to load:', e);
      }
    })();

    return () => {
      destroyed = true;
      if (clickHandler) window.removeEventListener('click', clickHandler);
      if (app && typeof app.dispose === 'function') {
        try {
          app.dispose();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  return (
    <div className="bg-[#0a0a0a] text-white">

      {/* 1. Hero (기존 Tubes Cursor 유지, 카피만 비즈니스용으로 변경) */}
      <section className="relative min-h-[40vh] md:min-h-[60vh] overflow-hidden">
        {/* Tubes background */}
        <canvas
          ref={canvasRef}
          id="business-tubes-canvas"
          className="absolute inset-0 w-full h-full"
        />

        {/* Hero text */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 flex flex-col items-center justify-center h-full text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black tracking-tighter mb-6 leading-tight"
          >
            데이터로 설계하는<br className="hidden md:block" /> 크리에이터 성장 MCN
          </motion.h1>
          <p className="text-base md:text-xl text-gray-200 max-w-2xl border-l border-white/20 pl-6 mx-auto mb-6">
            IOV STUDIO는 바이럴 데이터와 콘텐츠 시스템을 기반으로<br />
            크리에이터의 성장을 반복 가능하게 만드는 MCN입니다.
          </p>
          <p className="text-sm md:text-base text-gray-400 mb-8">
            아이디어를 Input하여 콘텐츠를 Output하고, Value를 만들어냅니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/recruit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black text-sm md:text-base font-bold hover:bg-gray-100 transition-colors"
            >
              크리에이터 협업 문의
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/30 text-sm md:text-base font-bold hover:bg-white hover:text-black transition-colors"
            >
              광고 / 브랜드 문의
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 2. IOV STUDIO 정체성 */}
      <section className="py-24 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm font-mono text-[#dfff00] tracking-[0.25em] uppercase mb-4">
            IOV STUDIO IDENTITY
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
            IOV STUDIO는 무엇이 다른가?
          </h2>
          <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-10">
            IOV STUDIO는 감과 경험에 의존하던 MCN 구조를, 데이터와 시스템 중심으로 재설계한 크리에이터 스튜디오입니다.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-8 flex flex-col items-center text-center">
              <div className="mb-4 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-[#dfff00]/10 flex items-center justify-center border border-[#dfff00]/40">
                  <BarChart3 className="w-5 h-5 text-[#dfff00]" />
                </div>
              </div>
              <h3 className="text-sm font-bold mb-2">데이터 기반</h3>
              <p className="text-sm text-gray-300">
                바이럴 데이터와 계정 지표를 토대로, 감이 아닌 수치로 방향을 결정합니다.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-8 flex flex-col items-center text-center">
              <div className="mb-4 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-[#dfff00]/10 flex items-center justify-center border border-[#dfff00]/40">
                  <Repeat className="w-5 h-5 text-[#dfff00]" />
                </div>
              </div>
              <h3 className="text-sm font-bold mb-2">반복 가능한 성장</h3>
              <p className="text-sm text-gray-300">
                한 번의 히트가 아니라, 구조화된 포맷으로 성장 곡선을 반복합니다.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-8 flex flex-col items-center text-center">
              <div className="mb-4 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-[#dfff00]/10 flex items-center justify-center border border-[#dfff00]/40">
                  <Share2 className="w-5 h-5 text-[#dfff00]" />
                </div>
              </div>
              <h3 className="text-sm font-bold mb-2">바이럴 구조화</h3>
              <p className="text-sm text-gray-300">
                플랫폼별 성공하는 숏폼·라이브 구조를 수집·정리해, 전략에 바로 연결합니다.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-8 flex flex-col items-center text-center">
              <div className="mb-4 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-[#dfff00]/10 flex items-center justify-center border border-[#dfff00]/40">
                  <Link2 className="w-5 h-5 text-[#dfff00]" />
                </div>
              </div>
              <h3 className="text-sm font-bold mb-2">수익 연결</h3>
              <p className="text-sm text-gray-300">
                크리에이터 성장과 클라이언트 성과를 동시에 만드는 비즈니스 구조를 설계합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 비즈니스 구조 요약 */}
      <section className="py-24 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm font-mono text-[#dfff00] tracking-[0.25em] uppercase mb-4">
            BUSINESS STRUCTURE
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
            크리에이터의 성장이<br className="hidden md:block" /> 클라이언트의 성과가 되는 구조
          </h2>
          <p className="text-base md:text-lg text-gray-300 mb-12">
            IOV STUDIO는 크리에이터, IOV STUDIO(MCN), 클라이언트가 하나의 바이럴 구조 안에서 작동하도록 설계합니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-8 flex flex-col items-center text-center">
              <p className="text-xs font-mono text-gray-400 mb-2">01</p>
              <h3 className="text-lg font-bold mb-3">Creator</h3>
              <p className="text-sm text-gray-300 mb-4">
                크리에이터의 콘텐츠, IP, 수익 구조를 함께 설계합니다.
              </p>
              <ul className="space-y-1 text-sm text-gray-400">
                <li>· 계정 성장 및 브랜딩 설계</li>
                <li>· IP 및 포맷 개발</li>
                <li>· 수익 다각화 구조 설계</li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-8 flex flex-col items-center text-center">
              <p className="text-xs font-mono text-gray-400 mb-2">02</p>
              <h3 className="text-lg font-bold mb-3">IOV STUDIO (MCN)</h3>
              <p className="text-sm text-gray-300 mb-4">
                데이터와 시스템으로 크리에이터와 클라이언트를 연결합니다.
              </p>
              <ul className="space-y-1 text-sm text-gray-400">
                <li>· 기획 · 제작 · 분석 · 최적화</li>
                <li>· 바이럴 데이터 플랫폼 운영</li>
                <li>· 크리에이터·브랜드 매칭</li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-8 flex flex-col items-center text-center">
              <p className="text-xs font-mono text-gray-400 mb-2">03</p>
              <h3 className="text-lg font-bold mb-3">Client</h3>
              <p className="text-sm text-gray-300 mb-4">
                성과 중심의 바이럴 구조로 브랜드 문제를 해결합니다.
              </p>
              <ul className="space-y-1 text-sm text-gray-400">
                <li>· 숏폼 / 라이브 캠페인</li>
                <li>· 인플루언서 / 크리에이터 협업</li>
                <li>· 성과 리포트 &amp; 인사이트 제공</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Business 01. 크리에이터 성장 솔루션 */}
      <section className="py-24 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
            <p className="text-sm font-mono text-[#dfff00] tracking-[0.25em] uppercase mb-4">
              BUSINESS 01
            </p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
              크리에이터 성장 솔루션
            </h2>
            <p className="text-base md:text-lg text-gray-300 mb-4">
              분석으로 끝나는 툴이 아니라, 성장 전략의 출발점입니다.
            </p>
          <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-3xl mx-auto">
              IOV STUDIO는 자사 바이럴 데이터를 기반으로 크리에이터 계정의 성장 가능성을 수치화하고,
              콘텐츠 방향과 전략을 설계합니다.
            </p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-8 text-left md:text-center flex flex-col items-start md:items-center">
              <span className="text-xs font-mono text-gray-400 mb-2">01</span>
              <h3 className="text-sm font-bold mb-3">크리에이터 계정 가치 분석</h3>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>· 팔로워, 조회수, 반응률 등 핵심 지표 진단</li>
                <li>· 콘텐츠 구조 기반 성장 지표 산출</li>
                <li>· 계정 잠재력 스코어링 및 진단 리포트</li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-8 text-left md:text-center flex flex-col items-start md:items-center">
              <span className="text-xs font-mono text-gray-400 mb-2">02</span>
              <h3 className="text-sm font-bold mb-3">바이럴 콘텐츠 빅데이터 분석</h3>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>· 플랫폼별 바이럴 패턴 수집</li>
                <li>· 컷 구조, 후킹 포인트, 전환 구간 분석</li>
                <li>· 반복되는 성공 구조 정리 및 템플릿화</li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-8 text-left md:text-center flex flex-col items-start md:items-center">
              <span className="text-xs font-mono text-gray-400 mb-2">03</span>
              <h3 className="text-sm font-bold mb-3">콘텐츠 &amp; IP 빌딩</h3>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>· 크리에이터 브랜딩 및 포지셔닝 설계</li>
                <li>· IP 확장 방향 및 포맷 기획</li>
                <li>· 수익 모델 및 파트너십 구조 연결</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Business 02. 데이터 기반 바이럴 플랫폼 */}
      <section className="py-24 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
            <p className="text-sm font-mono text-[#dfff00] tracking-[0.25em] uppercase mb-4">
              BUSINESS 02
            </p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
              자사 바이럴 빅데이터 기반 플랫폼
            </h2>
            <p className="text-base md:text-lg text-gray-300 mb-4">
              바이럴 콘텐츠 분석부터 기획 · 제작까지 연결합니다.
            </p>
          <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-3xl mx-auto">
              IOV STUDIO는 TikTok, Instagram Reels, YouTube Shorts 등 숏폼 플랫폼의
              바이럴 콘텐츠 데이터를 수집·정리하고, 이를 기획과 제작에 활용하는 구조를 설계하고 있습니다.
            </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-8 text-left md:text-center flex flex-col items-start md:items-center">
              <span className="text-xs font-mono text-gray-400 mb-2">01</span>
              <h3 className="text-sm font-bold mb-3">실시간 트렌딩 분석</h3>
              <p className="text-sm text-gray-300">
                플랫폼별 트렌딩 콘텐츠와 해시태그, 사운드를 모니터링해,
                캠페인·콘텐츠 기획에 바로 반영합니다.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-8 text-left md:text-center flex flex-col items-start md:items-center">
              <span className="text-xs font-mono text-gray-400 mb-2">02</span>
              <h3 className="text-sm font-bold mb-3">유사 콘텐츠 구조 매칭</h3>
              <p className="text-sm text-gray-300">
                업종·타겟별로 유사한 성공 사례를 찾아,
                크리에이터·클라이언트에 맞는 포맷을 제안합니다.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-8 text-left md:text-center flex flex-col items-start md:items-center">
              <span className="text-xs font-mono text-gray-400 mb-2">03</span>
              <h3 className="text-sm font-bold mb-3">기획 레퍼런스 자동화</h3>
              <p className="text-sm text-gray-300">
                반복되는 성공 구조를 템플릿으로 정리해,
                내부 기획과 피칭 과정의 효율을 높입니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Business 03. 클라이언트용 바이럴 마케팅 솔루션 */}
      <section className="py-24 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
            <p className="text-sm font-mono text-[#dfff00] tracking-[0.25em] uppercase mb-4">
              BUSINESS 03
            </p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
              클라이언트를 위한<br />저비용 · 고효율 바이럴 마케팅
            </h2>
            <p className="text-base md:text-lg text-gray-300 mb-4">
              대형 모델이 아닌, 성과가 검증된 구조를 씁니다.
            </p>
          <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-3xl mx-auto">
              업종과 타겟에 맞는 데이터 기반 바이럴 구조를 찾고,
              크리에이터와 숏폼 콘텐츠로 실제 성과를 만드는 캠페인을 설계합니다.
            </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-7 text-left md:text-center flex flex-col items-start md:items-center">
              <span className="text-xs font-mono text-gray-400 mb-2">STEP 1</span>
              <h3 className="text-sm font-bold mb-2">제품 / 서비스 분석</h3>
              <p className="text-sm text-gray-300">
                업종, 타겟, 메시지를 정리하고 브랜드가 해결하고 싶은 문제를 정의합니다.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-7 text-left md:text-center flex flex-col items-start md:items-center">
              <span className="text-xs font-mono text-gray-400 mb-2">STEP 2</span>
              <h3 className="text-sm font-bold mb-2">바이럴 데이터 매칭</h3>
              <p className="text-sm text-gray-300">
                유사 업종·목표를 가진 바이럴 사례를 매칭하고, 사용할 구조를 선택합니다.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-7 text-left md:text-center flex flex-col items-start md:items-center">
              <span className="text-xs font-mono text-gray-400 mb-2">STEP 3</span>
              <h3 className="text-sm font-bold mb-2">콘텐츠 기획 &amp; 제작</h3>
              <p className="text-sm text-gray-300">
                크리에이터 맞춤 기획과 숏폼 중심 분산 테스트로, 다양한 버전을 동시에 검증합니다.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-7 text-left md:text-center flex flex-col items-start md:items-center">
              <span className="text-xs font-mono text-gray-400 mb-2">STEP 4</span>
              <h3 className="text-sm font-bold mb-2">성과 기반 확산</h3>
              <p className="text-sm text-gray-300">
                반응 데이터 분석을 기반으로, 잘 작동하는 구조만 확대 집행합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. MCN 사업 영역 정리 */}
      <section className="py-24 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm font-mono text-[#dfff00] tracking-[0.25em] uppercase mb-4">
            MCN AREAS
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-8">
            IOV STUDIO MCN 영역
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-300 mt-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-6 flex flex-col items-start md:items-center text-left md:text-center">
              <h3 className="font-bold mb-2">라이브 에이전시</h3>
              <p className="text-gray-400 text-xs">
                TikTok LIVE 수익화, 크리에이터 라이브 운영, 포맷 기획 및 운영 대행
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-6 flex flex-col items-start md:items-center text-left md:text-center">
              <h3 className="font-bold mb-2">콘텐츠 &amp; IP 빌딩</h3>
              <p className="text-gray-400 text-xs">
                크리에이터 브랜딩, IP 기획 및 확장, 장기 성장 전략 수립
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-6 flex flex-col items-start md:items-center text-left md:text-center">
              <h3 className="font-bold mb-2">콘텐츠 제작</h3>
              <p className="text-gray-400 text-xs">
                파트너사 · 자사 크리에이터를 활용한 숏폼·브랜디드 콘텐츠 제작
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-6 flex flex-col items-start md:items-center text-left md:text-center">
              <h3 className="font-bold mb-2">그로스 마케팅</h3>
              <p className="text-gray-400 text-xs">
                자사 크리에이터 인벤토리 기반 캠페인 집행 및 성과 중심 운영
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. IOV STUDIO가 지향하는 방향 + CTA */}
      <section className="py-32 px-6 border-t border-white/10 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm font-mono text-[#dfff00] tracking-[0.25em] uppercase mb-4">
            VISION
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6">
            IOV STUDIO가 만드는 변화
          </h2>
          <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-8">
            IOV STUDIO는 크리에이터의 성장을 감이 아닌 데이터로 설명하고,<br />
            성과를 일회성이 아닌 구조로 만듭니다. <br className="hidden md:block" />
            더 많은 크리에이터가 지속 가능한 방식으로 성장할 수 있도록 시스템을 설계하고 있습니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/recruit"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-white text-black text-sm md:text-base font-bold hover:bg-gray-100 transition-colors"
            >
              크리에이터 협업 문의
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full border border-white/30 text-sm md:text-base font-bold hover:bg-white hover:text-black transition-colors"
            >
              비즈니스 제휴 문의
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

