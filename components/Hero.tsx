'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ArrowDown } from 'lucide-react';

const HeroScene3D = dynamic(() => import('@/components/HeroScene3D'), {
  ssr: false,
  loading: () => <div className="hero-scene-fallback" aria-hidden="true" />,
});

type IdleWindow = Window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
  cancelIdleCallback?: (handle: number) => void;
};

export default function Hero({ isLoading }: { isLoading: boolean }) {
  const [showScene, setShowScene] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || window.innerWidth < 768) return;

    let timeoutId = 0;
    let idleId = 0;
    const loadScene = () => setShowScene(true);
    const idleWindow = window as IdleWindow;

    if (typeof idleWindow.requestIdleCallback === 'function') {
      idleId = idleWindow.requestIdleCallback(loadScene, { timeout: 1600 });
    } else {
      timeoutId = window.setTimeout(loadScene, 900);
    }

    return () => {
      window.clearTimeout(timeoutId);
      if (idleId && typeof idleWindow.cancelIdleCallback === 'function') {
        idleWindow.cancelIdleCallback(idleId);
      }
    };
  }, [isLoading]);

  return (
    <header className="hero-shell section-scene section-is-visible min-h-screen flex flex-col justify-center px-6 md:px-20 pt-20 relative overflow-hidden" data-section-theme="dark">
      <div className="hero-prism-grid" aria-hidden="true"></div>
      <div className="hero-depth-veil" aria-hidden="true"></div>
      <div className="hero-scene-shell" aria-hidden="true">
        {showScene ? <HeroScene3D /> : <div className="hero-scene-fallback" />}
      </div>

      <div className="hero-content-lock relative z-10 max-w-7xl w-full mx-auto text-white">
        <p className={`hero-kicker transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          WEB DESIGN / E-COMMERCE / CREATIVE PRODUCTION
        </p>
        <h1 className="hero-title text-6xl md:text-8xl lg:text-9xl font-semibold leading-tight mb-8 tracking-tighter">
          <div className="reveal-text reveal-text-init"><span>YOUR DIGITAL</span></div>
          <div className="reveal-text reveal-text-init"><span>PARTNER.</span></div>
        </h1>
        
        <div className={`hero-copy-panel flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mt-12 border-t border-white/30 pt-8 transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100 animate-fade-in-up'}`} style={{ animationDelay: '1s' }}>
          <div className="max-w-lg">
            <p className="text-base md:text-lg text-white/90 font-light leading-relaxed drop-shadow-md">
              Prism Works is a digital studio based in Japan, building corporate websites and e-commerce that grow your business.
              <br className="hidden md:block" />
              <span className="text-white mt-3 block font-normal">
                コーポレートサイト・EC構築から運用、撮影まで。多角的な視点で、事業の成長に伴走するデジタルスタジオです。
              </span>
            </p>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-sm text-white/80 mb-2">SCROLL TO EXPLORE</p>
            <ArrowDown className="w-6 h-6 ml-auto text-white animate-bounce" />
          </div>
        </div>
      </div>
    </header>
  );
}
