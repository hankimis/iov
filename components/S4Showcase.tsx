'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const BRAND_THUMBS = [
  '/asset/img/main/s4_thumb_tirtir.jpg',
  '/asset/img/main/s4_thumb_nongsim.jpg',
  '/asset/img/main/s4_thumb_lg.jpg',
  '/asset/img/main/s4_thumb_misha.jpg',
];

export default function S4Showcase() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const updateVisualRef = useRef<((stage: number) => void) | null>(null);
  const updateAllRef = useRef<((stage: number, showText: boolean) => void) | null>(
    null,
  );
  const isInteractiveRef = useRef(false);
  const hasEnteredFinalRef = useRef(false);
  const hasInitializedRef = useRef(false);
  const currentStageRef = useRef(1); // 현재 중앙 카드(브랜드) 인덱스

  const handleCardClick = (slotIndex: number) => {
    if (!isInteractiveRef.current) return;
    const section = sectionRef.current;
    if (!section) return;

    // 현재 중앙에 있는 브랜드 인덱스
    const current = currentStageRef.current;

    // 클릭한 카드 위치(slot)에 따라 어떤 브랜드를 보여줄지 계산
    let targetStage = current;
    if (slotIndex === 3) {
      // 중앙 카드(n4)를 클릭하면 현재 브랜드 유지
      targetStage = current;
    } else {
      // 스택 카드(n1~n3)는 "현재 브랜드를 제외한 나머지 3개" 중에서 해당 순서
      const others = BRAND_THUMBS.map((_, i) => i).filter((i) => i !== current);
      targetStage = others[slotIndex] ?? current;
    }

    // sample의 "3→4 전환" 느낌(슬라이드+플립)을 클릭 때도 재생
    section.classList.add('replay');
    // force reflow (transition: none 상태를 확실히 적용)
    void section.offsetHeight;

    if (updateAllRef.current) {
      updateAllRef.current(targetStage, true);
    }

    requestAnimationFrame(() => {
      section.classList.remove('replay');
    });
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const txtBox = section.querySelector<HTMLDivElement>('.txtBx');
    const txtNodes = Array.from(
      section.querySelectorAll<HTMLDivElement>('.txtBx .txt'),
    );
    const mainImgGroup = section.querySelector<HTMLDivElement>('.card.n4 .imgBx');
    const stackImgGroups = Array.from(
      section.querySelectorAll<HTMLDivElement>('.card.n1 .imgBx, .card.n2 .imgBx, .card.n3 .imgBx'),
    );
    const mainVideoEls = Array.from(
      section.querySelectorAll<HTMLIFrameElement>('.card.n4 .videoBx > *'),
    );

    // 카드/비디오만 바꾸는 함수 (텍스트는 건드리지 않음)
    const updateVisual = (stage: number) => {
      // 현재 중앙 카드(stage)를 기억해 두기
      currentStageRef.current = stage;

      // 중앙 카드(n4) 썸네일만 on/off (스택 카드들은 고정)
      if (mainImgGroup) {
        const items = Array.from(mainImgGroup.querySelectorAll<HTMLDivElement>('div'));
        items.forEach((div, idx) => {
          if (idx === stage) div.classList.add('on');
          else div.classList.remove('on');
        });
      }

      // 스택 카드(n1~n3)는 "선택된 브랜드를 제외한 나머지 3개"로 채우기
      const others = BRAND_THUMBS.map((_, i) => i).filter((i) => i !== stage);
      stackImgGroups.forEach((group, idx) => {
        const thumbIndex = others[idx];
        if (thumbIndex == null) return;
        let child = group.querySelector<HTMLDivElement>('div');
        if (!child) {
          child = document.createElement('div');
          group.appendChild(child);
        }
        child.style.backgroundImage = `url(${BRAND_THUMBS[thumbIndex]})`;
        child.classList.add('on');
      });

      // 중앙 카드(n4) 비디오만 on/off
      mainVideoEls.forEach((el, idx) => {
        if (idx === stage) el.classList.add('on');
        else el.classList.remove('on');
      });
    };

    const showTextFor = (stage: number) => {
      if (txtBox) txtBox.classList.add('on');
      txtNodes.forEach((el, idx) => {
        if (idx === stage) el.classList.add('on');
        else el.classList.remove('on');
      });
    };

    const hideText = () => {
      if (txtBox) txtBox.classList.remove('on');
      txtNodes.forEach((el) => el.classList.remove('on'));
    };

    // 클릭 핸들러에서 사용할 수 있도록 ref에 저장
    updateVisualRef.current = updateVisual;
    updateAllRef.current = (stage: number, showText: boolean) => {
      if (showText) showTextFor(stage);
      else hideText();
      updateVisual(stage);
    };

    // 모바일(태블릿 이하)에서는 ScrollTrigger/pin을 사용하지 않고,
    // 첫 번째 브랜드(티르티르)만 고정으로 보여주기
    const isMobile =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(max-width: 1024px)').matches;

    if (isMobile) {
      section.classList.remove('motion1', 'motion2', 'motion3');
      // 모바일에서는 두 번째 카드(스테이지 1)를 기본으로 노출
      updateAllRef.current?.(1, true);
      isInteractiveRef.current = false; // 모바일에서는 카드 클릭 전환 비활성화
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=400%',
      scrub: true,
      pin: section,
      onUpdate: (self) => {
        // 첫 진입 시에는 스크롤 위치와 관계없이 항상 "두 번째 카드(스테이지 1)"부터 보여주기
        if (!hasInitializedRef.current) {
          hasInitializedRef.current = true;
          section.classList.add('motion1');
          updateAllRef.current?.(1, false);
          return;
        }

        const p = self.progress;
        section.classList.remove('motion1', 'motion2', 'motion3');

        let scrollStage = 0; // 모션(레이아웃) 단계
        let visualStage = 1; // 실제로 보여줄 카드/텍스트 인덱스

        if (p < 0.25) {
          scrollStage = 0;
          visualStage = 1; // 두 번째 카드
          section.classList.add('motion1');
        } else if (p < 0.5) {
          scrollStage = 1;
          visualStage = 2;
          section.classList.add('motion1');
        } else if (p < 0.75) {
          scrollStage = 2;
          visualStage = 3;
          section.classList.add('motion2');
        } else {
          scrollStage = 3;
          visualStage = 3;
          section.classList.add('motion3');
        }

        // 최종 스테이지(3)에서는 카드 클릭으로 브랜드(비주얼)만 바꾸고,
        // 스크롤은 모션(카드 위치/회전)과 텍스트 진입 타이밍만 제어
        isInteractiveRef.current = scrollStage === 3;

        if (scrollStage === 3) {
          if (!hasEnteredFinalRef.current) {
            hasEnteredFinalRef.current = true;
            updateAllRef.current?.(visualStage, true); // 처음 진입 시 최종 카드 + 텍스트 노출
          }
        } else {
          hasEnteredFinalRef.current = false;
          updateAllRef.current?.(visualStage, false);
        }
      },
    });

    // 초기 상태 (데스크톱) - 두 번째 카드부터
    section.classList.add('motion1');
    updateAllRef.current?.(1, false);
    ScrollTrigger.refresh();

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="s4 bg-black text-white relative">
      {/* PC 레이아웃 (3D 카드 + ScrollTrigger) */}
      <div className="cont pc">
        <h3>
          <div className="side left">
            <div>
              <p className="text-3xl md:text-5xl font-bold leading-tight">
                수많은 컨텐츠를 제작하며
              </p>
              <p className="mt-4 text-lg text-gray-400">
                데이터를 누적하여 쌓아온
              </p>
            </div>
          </div>
          <div className="side right">
            <div>
              <p className="text-3xl md:text-5xl font-bold leading-tight">
                가치를 창출해왔습니다.
              </p>
              <p className="mt-4 text-lg text-gray-400">
                 아이오브 스튜디오만의 데이터입니다.
              </p>
            </div>
          </div>
          <div className="pinBx">
            <div className="cardArea">
              <div className="card n1" onClick={() => handleCardClick(0)}>
                <div>
                  <div className="imgBx">
                    <div
                      className="on"
                      style={{ backgroundImage: 'url(/asset/img/main/s4_thumb_tirtir.jpg)' }}
                    />
                  </div>
                </div>
              </div>
              <div className="card n2" onClick={() => handleCardClick(1)}>
                <div>
                  <div className="imgBx">
                    <div
                      className="on"
                      style={{ backgroundImage: 'url(/asset/img/main/s4_thumb_nongsim.jpg)' }}
                    />
                  </div>
                </div>
              </div>
              <div className="card n3" onClick={() => handleCardClick(2)}>
                <div>
                  <div className="imgBx">
                    <div
                      className="on"
                      style={{ backgroundImage: 'url(/asset/img/main/s4_thumb_lg.jpg)' }}
                    />
                  </div>
                </div>
              </div>
              <div className="card n4" onClick={() => handleCardClick(3)}>
                <div>
                  <div className="back">
                    <div className="imgBx">
                      <div style={{ backgroundImage: 'url(/asset/img/main/s4_thumb_tirtir.jpg)' }} />
                      <div
                        style={{ backgroundImage: 'url(/asset/img/main/s4_thumb_nongsim.jpg)' }}
                      />
                      <div style={{ backgroundImage: 'url(/asset/img/main/s4_thumb_lg.jpg)' }} />
                      <div
                        style={{ backgroundImage: 'url(/asset/img/main/s4_thumb_misha.jpg)' }}
                      />
                    </div>
                    <div className="videoBx">
                      <iframe
                        src="https://player.vimeo.com/video/1116036197?autoplay=1&muted=1&loop=1&background=1"
                        frameBorder="0"
                        allow="autoplay; fullscreen"
                        allowFullScreen
                      />
                      <iframe
                        src="https://player.vimeo.com/video/1116036182?autoplay=1&muted=1&loop=1&background=1"
                        frameBorder="0"
                        allow="autoplay; fullscreen"
                        allowFullScreen
                      />
                      <iframe
                        src="https://player.vimeo.com/video/1116036167?autoplay=1&muted=1&loop=1&background=1"
                        frameBorder="0"
                        allow="autoplay; fullscreen"
                        allowFullScreen
                      />
                      <iframe
                        src="https://player.vimeo.com/video/1116036157?autoplay=1&muted=1&loop=1&background=1"
                        frameBorder="0"
                        allow="autoplay; fullscreen"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Text / KPI blocks */}
            <div className="txtBx">
              {/* TIRTIR */}
              <div className="txt">
                <div className="logo">
                  <img src="/asset/img/main/logo_tirtir.png" alt="TIRTIR 로고" />
                </div>
                <p>
                  30가지의 색상으로 확장된 제품의 USP를 연구하는 것에서부터 아이디어가
                  <br />
                  시작되었습니다. AR 필터를 통해 제품의 핵심 강점인 ‘다양한 컬러’를 소비자들이
                  <br />
                  직접 체험할 수 있도록 개발하였고, 누구나 자신에게 꼭 맞는 색을 찾을 수 있다는
                  <br />
                  메시지를 담은 콘텐츠 바이럴을 성공적으로 이끌어냈습니다.
                </p>
                <div className="bottom">
                  <div className="row">
                    <div className="flexBx">
                      <div>
                        <small>Total Video Views</small>
                        <div className="big">
                          <div className="dot odometer odometer-auto-theme">
                            <div className="odometer-inside">
                              <span className="odometer-digit">
                                <span className="odometer-digit-spacer">8</span>
                                <span className="odometer-digit-inner">
                                  <span className="odometer-ribbon">
                                    <span className="odometer-ribbon-inner">
                                      <span className="odometer-value">0</span>
                                    </span>
                                  </span>
                                </span>
                              </span>
                            </div>
                          </div>
                          M
                        </div>
                      </div>
                      <div>
                        <small>Video Creations</small>
                        <div className="big">
                          <div className="dot odometer odometer-auto-theme">
                            <div className="odometer-inside">
                              <span className="odometer-digit">
                                <span className="odometer-digit-spacer">8</span>
                                <span className="odometer-digit-inner">
                                  <span className="odometer-ribbon">
                                    <span className="odometer-ribbon-inner">
                                      <span className="odometer-value">0</span>
                                    </span>
                                  </span>
                                </span>
                              </span>
                            </div>
                          </div>
                          K
                        </div>
                      </div>
                      <div>
                        <small>Engagement Rate</small>
                        <div className="big">
                          <div className="dot odometer odometer-auto-theme">
                            <div className="odometer-inside">
                              <span className="odometer-digit">
                                <span className="odometer-digit-spacer">8</span>
                                <span className="odometer-digit-inner">
                                  <span className="odometer-ribbon">
                                    <span className="odometer-ribbon-inner">
                                      <span className="odometer-value">0</span>
                                    </span>
                                  </span>
                                </span>
                              </span>
                            </div>
                          </div>
                          %
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* NONGSHIM */}
              <div className="txt">
                <div className="logo">
                  <img src="/asset/img/main/logo_nongsim.png" alt="농심 로고" />
                </div>
                <p>
                  유럽, 중동, 동남아를 중심으로 국가마다 홍보 대상을 다르게 두어, 지역 별 입맛에
                  <br />
                  맞춘 제품을 홍보하였습니다. 각 국가의 다양한 크리에이터를 섭외하여 브랜드
                  <br />
                  인지도 및 호감도를 향상시켰으며, 특히 동남아에서는 참여형 캠페인(BM+BE)을
                  <br />
                  통해 틱톡 내 버즈를 일으키도록 캠페인을 전개하였습니다.
                </p>
                {/* KPI rows omitted for brevity */}
              </div>
              {/* LG */}
              <div className="txt">
                <div className="logo">
                  <img src="/asset/img/main/logo_lg.png" alt="LG 로고" />
                </div>
                <p>
                  LG전자의 NeoChef 제품을 홍보하기 위한 콘텐츠를 기획, 촬영, 편집까지
                  <br />
                  숏뜨에서 제작 전 과정을 진행하였습니다. LG의 글로벌 틱톡 계정은 물론,
                  <br />
                  국가별 채널에 활용되었으며 모든 채널에서 훌륭한 성과를 보여주었습니다.
                  <br />
                  총 조회수 1.5억 뷰를 달성하며 국내뿐만 아니라
                  <br />
                  글로벌에서도 유의미한 Creative 성과를 만들어 냈습니다.
                </p>
              </div>
              {/* MISSHA (active) */}
              <div className="txt">
                <div className="logo">
                  <img src="/asset/img/main/logo_missha.png" alt="미샤 로고" />
                </div>
                <p>
                  미샤의 제품을 소비자들에게 진심으로 설명해 줄 수 있는 크리에이터들을
                  <br />
                  선별하는데 많은 노력을 기울였습니다. 각 크리에이터의 특성과
                  <br />
                  히스토리에 알맞은 콘텐츠를 만들었으며, <span>K-beauty, Skinfluencer</span> 등
                  <br />
                  제품과 밀접한 특색을 가진 크리에이터와 협업하여 단일 영상만으로
                  <br />
                  850만 이상의 조회수를 달성하였습니다.
                </p>
              </div>
            </div>

          </div>
        </h3>
      </div>

      {/* 모바일 레이아웃: 단순 세로 카드 리스트 */}
      <div className="cont mo">
        <div className="max-w-md mx-auto space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-5">
            <div
              className="w-full rounded-2xl overflow-hidden mb-4 aspect-[9/16] bg-center bg-cover"
              style={{ backgroundImage: 'url(/asset/img/main/s4_thumb_tirtir.jpg)' }}
            />
            <div className="logo mb-3 flex justify-center">
              <img src="/asset/img/main/logo_tirtir.png" alt="TIRTIR 로고" className="h-6 object-contain" />
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              30가지의 색상으로 확장된 제품의 USP를 연구하는 것에서부터 아이디어가 시작되었습니다. AR 필터를 통해 제품의 핵심 강점인
              ‘다양한 컬러’를 소비자들이 직접 체험할 수 있도록 개발하였고, 누구나 자신에게 꼭 맞는 색을 찾을 수 있다는 메시지를 담은
              콘텐츠 바이럴을 성공적으로 이끌어냈습니다.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-5">
            <div
              className="w-full rounded-2xl overflow-hidden mb-4 aspect-[9/16] bg-center bg-cover"
              style={{ backgroundImage: 'url(/asset/img/main/s4_thumb_nongsim.jpg)' }}
            />
            <div className="logo mb-3 flex justify-center">
              <img src="/asset/img/main/logo_nongsim.png" alt="농심 로고" className="h-6 object-contain" />
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              유럽, 중동, 동남아를 중심으로 국가마다 홍보 대상을 다르게 두어, 지역 별 입맛에 맞춘 제품을 홍보하였습니다. 각 국가의 다양한
              크리에이터를 섭외하여 브랜드 인지도 및 호감도를 향상시켰으며, 특히 동남아에서는 참여형 캠페인(BM+BE)을 통해 틱톡 내 버즈를
              일으키도록 캠페인을 전개하였습니다.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-5">
            <div
              className="w-full rounded-2xl overflow-hidden mb-4 aspect-[9/16] bg-center bg-cover"
              style={{ backgroundImage: 'url(/asset/img/main/s4_thumb_lg.jpg)' }}
            />
            <div className="logo mb-3 flex justify-center">
              <img src="/asset/img/main/logo_lg.png" alt="LG 로고" className="h-6 object-contain" />
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              LG전자의 NeoChef 제품을 홍보하기 위한 콘텐츠를 기획, 촬영, 편집까지 숏뜨에서 제작 전 과정을 진행하였습니다. LG의 글로벌 틱톡
              계정은 물론, 국가별 채널에 활용되었으며 모든 채널에서 훌륭한 성과를 보여주었습니다. 총 조회수 1.5억 뷰를 달성하며 국내뿐만
              아니라 글로벌에서도 유의미한 Creative 성과를 만들어 냈습니다.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-5">
            <div
              className="w-full rounded-2xl overflow-hidden mb-4 aspect-[9/16] bg-center bg-cover"
              style={{ backgroundImage: 'url(/asset/img/main/s4_thumb_misha.jpg)' }}
            />
            <div className="logo mb-3 flex justify-center">
              <img src="/asset/img/main/logo_missha.png" alt="미샤 로고" className="h-6 object-contain" />
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              미샤의 제품을 소비자들에게 진심으로 설명해 줄 수 있는 크리에이터들을 선별하는데 많은 노력을 기울였습니다. 각 크리에이터의
              특성과 히스토리에 알맞은 콘텐츠를 만들었으며, K-beauty, Skinfluencer 등 제품과 밀접한 특색을 가진 크리에이터와 협업하여 단일
              영상만으로 850만 이상의 조회수를 달성하였습니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


