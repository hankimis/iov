'use client';

import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/all';
import { CustomEase } from 'gsap/all';
import { Flip } from 'gsap/all';
import './gallery.css';

type Creator = {
  name: string;
  image: string;
  category?: string;
  followers?: string | number;
  platform?: string;
  link?: string;
};

// ---- Gallery Classes (adapted from provided demo, wired to creators API) ----

type ImageDataItem = {
  number: string;
  title: string;
  description: string;
  followers?: string;
  link?: string;
};

class FashionGallery {
  viewport: HTMLElement;
  canvasWrapper: HTMLElement;
  gridContainer: HTMLElement;
  splitScreenContainer: HTMLElement;
  imageTitleOverlay: HTMLElement;
  closeButton: HTMLButtonElement;
  controlsContainer: HTMLElement;
  soundToggle: HTMLButtonElement;

  customEase: gsap.EaseFunction;
  centerEase: gsap.EaseFunction;

  config = {
    itemSize: 320,
    baseGap: 16,
    rows: 8,
    cols: 12,
    currentZoom: 0.6,
    currentGap: 32,
  };

  zoomState: {
    isActive: boolean;
    selectedItem: any;
    flipAnimation: any;
    scalingOverlay: HTMLElement | null;
  } = {
    isActive: false,
    selectedItem: null,
    flipAnimation: null,
    scalingOverlay: null,
  };

  gridItems: any[] = [];
  gridDimensions: any = {};
  lastValidPosition = { x: 0, y: 0 };
  draggable: any = null;
  viewportObserver: IntersectionObserver | null = null;

  soundSystem: any;
  fashionImages: string[] = [];
  imageData: ImageDataItem[] = [];
  descriptionLines: NodeListOf<HTMLElement> | null = null;

  constructor(creators: Creator[]) {
    this.viewport = document.getElementById('viewport') as HTMLElement;
    this.canvasWrapper = document.getElementById('canvasWrapper') as HTMLElement;
    this.gridContainer = document.getElementById('gridContainer') as HTMLElement;
    this.splitScreenContainer = document.getElementById('splitScreenContainer') as HTMLElement;
    this.imageTitleOverlay = document.getElementById('imageTitleOverlay') as HTMLElement;
    this.closeButton = document.getElementById('closeButton') as HTMLButtonElement;
    this.controlsContainer = document.getElementById('controlsContainer') as HTMLElement;
    this.soundToggle = document.getElementById('soundToggle') as HTMLButtonElement;

    this.customEase = CustomEase.create('smooth', '.87,0,.13,1');
    this.centerEase = CustomEase.create('center', '.25,.46,.45,.94');

    this.initSoundSystem();
    this.initImageData(creators);
  }

  initSoundSystem() {
    this.soundSystem = {
      enabled: false,
      sounds: {
        click: new Audio('https://assets.codepen.io/7558/glitch-fx-001.mp3'),
        open: new Audio('https://assets.codepen.io/7558/click-glitch-001.mp3'),
        close: new Audio('https://assets.codepen.io/7558/click-glitch-001.mp3'),
      },
      play: (name: string) => {
        if (!this.soundSystem.enabled || !this.soundSystem.sounds[name]) return;
        const audio = this.soundSystem.sounds[name];
        try {
          audio.currentTime = 0;
          audio.play().catch(() => {});
        } catch {
          // ignore
        }
      },
      toggle: () => {
        this.soundSystem.enabled = !this.soundSystem.enabled;
        this.soundToggle.classList.toggle('active', this.soundSystem.enabled);
      },
    };
    Object.values(this.soundSystem.sounds).forEach((audio: any) => {
      audio.preload = 'auto';
      audio.volume = 0.3;
    });
  }

  initImageData(creators: Creator[]) {
    this.fashionImages = creators.map((c) => c.image);
    this.imageData = creators.map((c, idx) => ({
      number: String(idx + 1).padStart(2, '0'),
      title: c.name,
      description: c.category ? `${c.category}` : 'Creator',
      followers: c.followers ? String(c.followers) : undefined,
      link: c.link,
    }));
  }

  splitTextIntoLines(element: HTMLElement, text: string) {
    element.innerHTML = '';
    const sentences = text.split(/(?<=[.!?])\s+/);
    const lines: string[] = [];
    const temp = document.createElement('div');
    temp.style.cssText = `
      position: absolute;
      visibility: hidden;
      width: ${element.offsetWidth || 400}px;
      font-family: 'PPNeueMontreal', sans-serif;
      font-size: 16px;
      font-weight: 300;
      line-height: 1.4;
    `;
    document.body.appendChild(temp);
    let currentLine = '';
    sentences.forEach((sentence) => {
      const words = sentence.split(' ');
      words.forEach((word) => {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        temp.textContent = testLine;
        if (temp.offsetWidth > (element.offsetWidth || 400) && currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      });
    });
    if (currentLine) lines.push(currentLine);
    document.body.removeChild(temp);
    lines.forEach((lineText) => {
      const lineSpan = document.createElement('span');
      lineSpan.className = 'description-line';
      lineSpan.textContent = lineText;
      element.appendChild(lineSpan);
    });
    return element.querySelectorAll('.description-line') as NodeListOf<HTMLElement>;
  }

  calculateGapForZoom(zoomLevel: number) {
    if (zoomLevel >= 1.0) return 16;
    if (zoomLevel >= 0.6) return 32;
    return 64;
  }

  calculateGridDimensions(gap = this.config.currentGap) {
    const totalWidth = this.config.cols * (this.config.itemSize + gap) - gap;
    const totalHeight = this.config.rows * (this.config.itemSize + gap) - gap;
    this.gridDimensions = {
      width: totalWidth,
      height: totalHeight,
      scaledWidth: totalWidth * this.config.currentZoom,
      scaledHeight: totalHeight * this.config.currentZoom,
      gap,
    };
    return this.gridDimensions;
  }

  generateGridItems() {
    this.config.currentGap = this.calculateGapForZoom(this.config.currentZoom);
    this.calculateGridDimensions();
    this.canvasWrapper.style.width = this.gridDimensions.width + 'px';
    this.canvasWrapper.style.height = this.gridDimensions.height + 'px';
    this.gridContainer.innerHTML = '';
    this.gridItems = [];

    let imageIndex = 0;
    for (let row = 0; row < this.config.rows; row++) {
      for (let col = 0; col < this.config.cols; col++) {
        const item = document.createElement('div');
        item.className = 'grid-item';
        const x = col * (this.config.itemSize + this.config.currentGap);
        const y = row * (this.config.itemSize + this.config.currentGap);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        item.style.opacity = '0';

        const imageUrl = this.fashionImages.length
          ? this.fashionImages[imageIndex % this.fashionImages.length]
          : '';
        imageIndex++;

        if (imageUrl) {
          const img = document.createElement('img');
          img.src = imageUrl;
          img.alt = `Creator ${imageIndex}`;
          item.appendChild(img);
        }

        const itemData = {
          element: item,
          row,
          col,
          baseX: x,
          baseY: y,
          index: this.gridItems.length,
        };

        item.addEventListener('click', () => {
          if (!this.zoomState.isActive) {
            this.soundSystem.play('click');
            this.enterZoomMode(itemData);
          }
        });

        this.gridContainer.appendChild(item);
        this.gridItems.push(itemData);
      }
    }
  }

  updateTitleOverlay(imageIndex: number) {
    if (!this.imageData.length) return;
    const data = this.imageData[imageIndex % this.imageData.length];
    const numberElement = document.querySelector('#imageSlideNumber span') as HTMLElement | null;
    const titleElement = document.querySelector('#imageSlideTitle h1') as HTMLElement | null;
    const descriptionElement = document.getElementById('imageSlideDescription') as HTMLElement | null;
    const followElement = document.getElementById('imageSlideFollow') as HTMLElement | null;

    if (numberElement) numberElement.textContent = data.number;
    if (titleElement) titleElement.textContent = data.title;

    if (descriptionElement) {
      this.descriptionLines = this.splitTextIntoLines(descriptionElement, data.description);
    }

    if (followElement) {
      if (data.followers && data.link) {
        followElement.innerHTML = `<a href="${data.link}" target="_blank" rel="noreferrer">${data.followers} followers · view profile</a>`;
      } else if (data.followers) {
        followElement.textContent = `${data.followers} followers`;
      } else {
        followElement.textContent = '';
      }
    }
  }

  createScalingOverlay(sourceImg: HTMLImageElement) {
    const overlay = document.createElement('div');
    overlay.className = 'scaling-image-overlay';
    const img = document.createElement('img');
    img.src = sourceImg.src;
    img.alt = sourceImg.alt;
    overlay.appendChild(img);
    // 갤러리 컨테이너 안에 넣어서 .creators-page .scaling-image-overlay 스타일이 제대로 적용되도록
    const host = document.querySelector('.creators-page') || document.body;
    host.appendChild(overlay);
    const rect = sourceImg.getBoundingClientRect();
    gsap.set(overlay, {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
      opacity: 1,
    });
    return overlay;
  }

  enterZoomMode(selectedItemData: any) {
    if (this.zoomState.isActive) return;
    this.zoomState.isActive = true;
    this.zoomState.selectedItem = selectedItemData;
    this.soundSystem.play('open');

    const splitContainer = this.splitScreenContainer;
    const zoomTarget = document.getElementById('zoomTarget') as HTMLElement;
    splitContainer.classList.add('active');
    gsap.to(splitContainer, { opacity: 1, duration: 1.2, ease: this.customEase });

    const img = selectedItemData.element.querySelector('img') as HTMLImageElement | null;
    if (!img) return;
    this.zoomState.scalingOverlay = this.createScalingOverlay(img);
    gsap.set(img, { opacity: 0 });

    this.zoomState.flipAnimation = Flip.fit(this.zoomState.scalingOverlay, zoomTarget, {
      duration: 1.2,
      ease: this.customEase,
      absolute: true,
      onComplete: () => {
        this.updateTitleOverlay(selectedItemData.index);
        const imageTitleOverlay = this.imageTitleOverlay;

        gsap.set('#imageSlideNumber span', { y: 20, opacity: 0 });
        gsap.set('#imageSlideTitle h1', { y: 60, opacity: 0 });
        if (this.descriptionLines) gsap.set(this.descriptionLines, { y: 80, opacity: 0 });

        imageTitleOverlay.classList.add('active');
        gsap.to(imageTitleOverlay, { opacity: 1, duration: 0.3, ease: 'power2.out' });

        gsap.to('#imageSlideNumber span', {
          duration: 0.8,
          y: 0,
          opacity: 1,
          ease: this.customEase,
          delay: 0.1,
        });
        gsap.to('#imageSlideTitle h1', {
          duration: 0.8,
          y: 0,
          opacity: 1,
          ease: this.customEase,
          delay: 0.15,
        });
        if (this.descriptionLines) {
          gsap.to(this.descriptionLines, {
            duration: 0.8,
            y: 0,
            opacity: 1,
            ease: this.customEase,
            delay: 0.2,
            stagger: 0.15,
          });
        }
      },
    });

    this.controlsContainer.classList.add('split-mode');
    gsap.fromTo(
      this.closeButton,
      { x: 40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.9 },
    );
    this.closeButton.classList.add('active');

    document.getElementById('splitLeft')?.addEventListener('click', this.handleSplitAreaClick);
    document.getElementById('splitRight')?.addEventListener('click', this.handleSplitAreaClick);
    document.addEventListener('keydown', this.handleZoomKeys);
  }

  handleSplitAreaClick = (e: Event) => {
    if (e.target === e.currentTarget) this.exitZoomMode();
  };

  handleZoomKeys = (e: KeyboardEvent) => {
    if (!this.zoomState.isActive) return;
    if (e.key === 'Escape') this.exitZoomMode();
  };

  exitZoomMode() {
    if (!this.zoomState.isActive || !this.zoomState.selectedItem || !this.zoomState.scalingOverlay) return;
    this.soundSystem.play('close');
    document.removeEventListener('keydown', this.handleZoomKeys);
    document.getElementById('splitLeft')?.removeEventListener('click', this.handleSplitAreaClick);
    document.getElementById('splitRight')?.removeEventListener('click', this.handleSplitAreaClick);

    const splitContainer = this.splitScreenContainer;
    const selectedElement = this.zoomState.selectedItem.element as HTMLElement;
    const selectedImg = selectedElement.querySelector('img') as HTMLImageElement | null;

    if (this.zoomState.flipAnimation) this.zoomState.flipAnimation.kill();

    const overlayElement = this.imageTitleOverlay;
    gsap.to(overlayElement, { opacity: 0, duration: 0.3, ease: 'power2.out' });
    gsap.to('#imageSlideNumber span', { duration: 0.4, y: -20, opacity: 0, ease: 'power2.out' });
    gsap.to('#imageSlideTitle h1', { duration: 0.4, y: -60, opacity: 0, ease: 'power2.out' });
    if (this.descriptionLines) {
      gsap.to(this.descriptionLines, {
        duration: 0.4,
        y: -80,
        opacity: 0,
        ease: 'power2.out',
        stagger: -0.05,
        onComplete: () => {
          overlayElement.classList.remove('active');
        },
      });
    }

    gsap.to(this.closeButton, { duration: 0.3, opacity: 0, x: 40, ease: 'power2.in' });
    splitContainer.classList.remove('active');
    this.controlsContainer.classList.remove('split-mode');
    gsap.to(splitContainer, { opacity: 0, duration: 0.8, ease: 'power2.out' });

    Flip.fit(this.zoomState.scalingOverlay, selectedElement, {
      duration: 1.2,
      ease: this.customEase,
      absolute: true,
      onComplete: () => {
        if (selectedImg) gsap.set(selectedImg, { opacity: 1 });
        if (this.zoomState.scalingOverlay) {
          const parent = this.zoomState.scalingOverlay.parentNode;
          if (parent) {
            parent.removeChild(this.zoomState.scalingOverlay);
          }
          this.zoomState.scalingOverlay = null;
        }
        this.closeButton.classList.remove('active');
        this.zoomState.isActive = false;
        this.zoomState.selectedItem = null;
        this.zoomState.flipAnimation = null;
      },
    });
  }

  calculateBounds() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const { scaledWidth, scaledHeight } = this.gridDimensions;
    const marginX = this.config.currentGap * this.config.currentZoom;
    const marginY = this.config.currentGap * this.config.currentZoom;
    let minX, maxX, minY, maxY;

    if (scaledWidth <= vw) {
      const centerX = (vw - scaledWidth) / 2;
      minX = maxX = centerX;
    } else {
      maxX = marginX;
      minX = vw - scaledWidth - marginX;
    }

    if (scaledHeight <= vh) {
      const centerY = (vh - scaledHeight) / 2;
      minY = maxY = centerY;
    } else {
      maxY = marginY;
      minY = vh - scaledHeight - marginY;
    }

    return { minX, maxX, minY, maxY };
  }

  initDraggable() {
    if (this.draggable) this.draggable.kill();
    this.calculateGridDimensions(this.config.currentGap);
    const bounds = this.calculateBounds();
    const instances = Draggable.create(this.canvasWrapper, {
      type: 'x,y',
      bounds,
      edgeResistance: 0.8,
      inertia: false,
      onDragStart: () => {
        this.lastValidPosition.x = (this.draggable && this.draggable.x) || 0;
        this.lastValidPosition.y = (this.draggable && this.draggable.y) || 0;
      },
      onDrag: () => {
        this.lastValidPosition.x = this.draggable.x;
        this.lastValidPosition.y = this.draggable.y;
      },
    });
    this.draggable = (instances && instances[0]) || null;
  }

  calculateFitZoom() {
    const vw = window.innerWidth;
    const vh = window.innerHeight - 80;
    const currentGap = this.calculateGapForZoom(1.0);
    const gridWidth = this.config.cols * (this.config.itemSize + currentGap) - currentGap;
    const gridHeight = this.config.rows * (this.config.itemSize + currentGap) - currentGap;
    const margin = 40;
    const availableWidth = vw - margin * 2;
    const availableHeight = vh - margin * 2;
    const zoomToFitWidth = availableWidth / gridWidth;
    const zoomToFitHeight = availableHeight / gridHeight;
    const fitZoom = Math.min(zoomToFitWidth, zoomToFitHeight);
    return Math.max(0.1, Math.min(2.0, fitZoom));
  }

  updatePercentageIndicator(zoomLevel: number) {
    const percentage = Math.round(zoomLevel * 100);
    const el = document.getElementById('percentageIndicator');
    if (el) el.textContent = `${percentage}%`;
  }

  autoFitZoom(buttonElement: HTMLButtonElement | null = null) {
    const fitZoom = this.calculateFitZoom();
    this.setZoomInternal(fitZoom, buttonElement || null);
  }

  setZoom(zoomLevel: number, buttonElement: HTMLButtonElement | null = null) {
    this.setZoomInternal(zoomLevel, buttonElement);
  }

  setZoomInternal(zoomLevel: number, buttonElement: HTMLButtonElement | null) {
    const newGap = this.calculateGapForZoom(zoomLevel);
    const oldZoom = this.config.currentZoom;
    this.config.currentZoom = zoomLevel;
    this.soundSystem.play(zoomLevel < oldZoom ? 'click' : 'click');
    this.calculateGridDimensions(this.config.currentGap);
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const currentScaledWidth = this.gridDimensions.width * oldZoom;
    const currentScaledHeight = this.gridDimensions.height * oldZoom;
    const centerX = (vw - currentScaledWidth) / 2;
    const centerY = (vh - currentScaledHeight) / 2;

    gsap.to(this.canvasWrapper, {
      duration: 0.6,
      x: centerX,
      y: centerY,
      ease: this.centerEase,
      onComplete: () => {
        if (newGap !== this.config.currentGap) {
          this.gridItems.forEach((itemData) => {
            const newX = itemData.col * (this.config.itemSize + newGap);
            const newY = itemData.row * (this.config.itemSize + newGap);
            itemData.baseX = newX;
            itemData.baseY = newY;
            gsap.to(itemData.element, { duration: 1.0, left: newX, top: newY, ease: this.customEase });
          });
          const newWidth = this.config.cols * (this.config.itemSize + newGap) - newGap;
          const newHeight = this.config.rows * (this.config.itemSize + newGap) - newGap;
          gsap.to(this.canvasWrapper, {
            duration: 1.0,
            width: newWidth,
            height: newHeight,
            ease: this.customEase,
          });
          this.config.currentGap = newGap;
        }

        this.calculateGridDimensions(newGap);
        const finalScaledWidth = this.gridDimensions.width * zoomLevel;
        const finalScaledHeight = this.gridDimensions.height * zoomLevel;
        const finalCenterX = (vw - finalScaledWidth) / 2;
        const finalCenterY = (vh - finalScaledHeight) / 2;

        gsap.to(this.canvasWrapper, {
          duration: 1.2,
          scale: zoomLevel,
          x: finalCenterX,
          y: finalCenterY,
          ease: this.customEase,
          onComplete: () => {
            this.lastValidPosition.x = finalCenterX;
            this.lastValidPosition.y = finalCenterY;
            this.initDraggable();
          },
        });
      },
    });

    this.updatePercentageIndicator(zoomLevel);
    document.querySelectorAll('.switch-button').forEach((btn) => btn.classList.remove('switch-button-current'));
    if (buttonElement) buttonElement.classList.add('switch-button-current');
  }

  setupEventListeners() {
    window.addEventListener('resize', () => {
      setTimeout(() => {
        this.initDraggable();
      }, 100);
    });

    this.closeButton.addEventListener('click', () => this.exitZoomMode());
    this.soundToggle.addEventListener('click', () => this.soundSystem.toggle());
  }

  playIntroAnimation() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const screenCenterX = vw / 2;
    const screenCenterY = vh / 2;
    const canvasStyle = getComputedStyle(this.canvasWrapper);
    const canvasMatrix = new DOMMatrix(canvasStyle.transform);
    const canvasX = canvasMatrix.m41;
    const canvasY = canvasMatrix.m42;
    const canvasScale = canvasMatrix.a;
    const centerX = (screenCenterX - canvasX) / canvasScale - this.config.itemSize / 2;
    const centerY = (screenCenterY - canvasY) / canvasScale - this.config.itemSize / 2;

    this.gridItems.forEach((itemData, index) => {
      const zIndex = this.gridItems.length - index;
      gsap.set(itemData.element, {
        left: centerX,
        top: centerY,
        scale: 0.8,
        zIndex,
        opacity: 0,
      });
    });

    gsap.to(
      this.gridItems.map((i) => i.element),
      {
        duration: 0.2,
        left: (index: number) => this.gridItems[index].baseX,
        top: (index: number) => this.gridItems[index].baseY,
        scale: 1,
        opacity: 1,
        ease: 'power2.out',
        stagger: {
          amount: 1.5,
          from: 'start',
          grid: [this.config.rows, this.config.cols],
        },
        onComplete: () => {
          this.gridItems.forEach((itemData) => {
            gsap.set(itemData.element, { zIndex: 1 });
          });

          const percentageIndicator = this.controlsContainer.querySelector(
            '.percentage-indicator',
          ) as HTMLElement | null;
          const switchElement = this.controlsContainer.querySelector('.switch') as HTMLElement | null;
          const soundToggle = this.controlsContainer.querySelector('.sound-toggle') as HTMLElement | null;

          gsap.set(this.controlsContainer, { opacity: 0 });
          if (percentageIndicator) gsap.set(percentageIndicator, { x: '-3em' });
          if (switchElement) gsap.set(switchElement, { y: '2em' });
          if (soundToggle) gsap.set(soundToggle, { x: '3em' });

          const navTimeline = gsap.timeline();
          navTimeline.to(this.controlsContainer, { opacity: 1, duration: 0.5, ease: 'power2.out' }, 0);
          if (percentageIndicator)
            navTimeline.to(
              percentageIndicator,
              { x: 0, duration: 0.2, ease: 'power2.out' },
              0.25,
            );
          if (switchElement)
            navTimeline.to(
              switchElement,
              { y: 0, duration: 0.2, ease: 'power2.out' },
              0.3,
            );
          if (soundToggle)
            navTimeline.to(
              soundToggle,
              { x: 0, duration: 0.2, ease: 'power2.out' },
              0.35,
            );
          this.controlsContainer.classList.add('visible');
        },
      },
    );
  }

  init() {
    this.config.currentGap = this.calculateGapForZoom(this.config.currentZoom);
    this.generateGridItems();
    gsap.set(this.viewport, { opacity: 0 });
    gsap.set(this.canvasWrapper, { scale: this.config.currentZoom });
    this.calculateGridDimensions(this.config.currentGap);
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const { scaledWidth, scaledHeight } = this.gridDimensions;
    const centerX = (vw - scaledWidth) / 2;
    const centerY = (vh - scaledHeight) / 2;
    gsap.set(this.canvasWrapper, { x: centerX, y: centerY });
    this.lastValidPosition.x = centerX;
    this.lastValidPosition.y = centerY;
    this.updatePercentageIndicator(this.config.currentZoom);
    this.setupEventListeners();

    gsap.to(this.viewport, {
      duration: 0.6,
      opacity: 1,
      ease: 'power2.inOut',
      onComplete: () => {
        this.playIntroAnimation();
        setTimeout(() => {
          this.initDraggable();
        }, 1500);
      },
    });
  }
}

// ---- Page Component ----

export default function Creators() {
  const [creators, setCreators] = useState<Creator[]>([]);

  useEffect(() => {
    fetch('/api/creators')
      .then((res) => res.json())
      .then((data) => setCreators(data))
      .catch((err) => console.error('Failed to fetch creators:', err));
  }, []);

  // creators 페이지에서는 전체 페이지 스크롤을 막아 Footer가 보이지 않게 처리
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    if (creators.length === 0) return;

    if (typeof window === 'undefined') return;

    gsap.registerPlugin(Draggable, CustomEase, Flip);

    const gallery = new FashionGallery(creators);
    gallery.init();
    (window as any).creatorsGallery = gallery;
  }, [creators]);

  return (
    <div className="creators-page">
      {/* Main Viewport */}
      <div className="viewport" id="viewport">
        <div className="canvas-wrapper" id="canvasWrapper">
          <div className="grid-container" id="gridContainer" />
        </div>
      </div>

      {/* Split Screen Container */}
      <div className="split-screen-container" id="splitScreenContainer">
        <div className="split-left" id="splitLeft">
          <div className="zoom-target" id="zoomTarget" />
        </div>
        <div className="split-right" id="splitRight" />
      </div>

      {/* Image Title Overlay */}
      <div className="image-title-overlay" id="imageTitleOverlay">
        <div className="image-slide-number" id="imageSlideNumber">
          <span>01</span>
        </div>
        <div className="image-slide-title" id="imageSlideTitle">
          <h1>Creator</h1>
        </div>
        <div className="image-slide-description" id="imageSlideDescription" />
        <div className="image-slide-follow" id="imageSlideFollow" />
      </div>

      {/* Close Button */}
      <button className="close-button" id="closeButton" aria-label="Close detail view">
        <svg width="64" height="64" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7.89873 16L6.35949 14.48L11.8278 9.08H0V6.92H11.8278L6.35949 1.52L7.89873 0L16 8L7.89873 16Z"
            fill="white"
          />
        </svg>
      </button>

      {/* Controls */}
      <div className="controls-container" id="controlsContainer">
        <div className="percentage-indicator" id="percentageIndicator">
          60%
        </div>
        <div className="switch" id="controls">
          <button
            className="switch-button"
            onClick={() => (window as any).creatorsGallery?.setZoom(0.3, event?.currentTarget as HTMLButtonElement)}
          >
            <span className="indicator-dot" />
            ZOOM OUT
          </button>
          <button
            className="switch-button switch-button-current"
            onClick={() => (window as any).creatorsGallery?.setZoom(0.6, event?.currentTarget as HTMLButtonElement)}
          >
            <span className="indicator-dot" />
            NORMAL
          </button>
          <button
            className="switch-button"
            onClick={() => (window as any).creatorsGallery?.setZoom(1.0, event?.currentTarget as HTMLButtonElement)}
          >
            <span className="indicator-dot" />
            ZOOM IN
          </button>
          <button
            className="switch-button"
            onClick={() => (window as any).creatorsGallery?.autoFitZoom(event?.currentTarget as HTMLButtonElement)}
          >
            <span className="indicator-dot" />
            FIT
          </button>
        </div>
        <button className="sound-toggle" id="soundToggle">
          <canvas className="sound-wave-canvas" id="soundWaveCanvas" width={32} height={16} />
        </button>
      </div>

      {/* Page vignette */}
      <div className="page-vignette-container">
        <div className="page-vignette-extreme" />
      </div>
    </div>
  );
}

