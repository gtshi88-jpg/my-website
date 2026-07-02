'use client';

import { useState, useEffect } from 'react';

import SiteHeader from '@/components/SiteHeader';
import HomeStarfield from '@/components/HomeStarfield';
import WorksIntro from '@/components/WorksIntro';
import PrismServiceTransition from '@/components/PrismServiceTransition';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Works from '@/components/Works';
import Marquee from '@/components/Marquee';
import About from '@/components/About';
import Contact from '@/components/Contact';

export default function Portfolio() {
  // 初期値は true だが、useEffectで即座に判定する
  const [isLoading, setIsLoading] = useState(true);
  const [percent, setPercent] = useState(0);
  const [isFirstVisit, setIsFirstVisit] = useState(true); // 初回訪問判定用

  // ---------------------------------------------------------
  // 1. ローディング判定 & カウントアップ処理
  // ---------------------------------------------------------
  useEffect(() => {
    // セッションストレージを確認（ブラウザを閉じるまで有効）
    const hasVisited = sessionStorage.getItem('visited');

    if (hasVisited) {
      // ■ 2回目以降の訪問の場合
      const skipLoadingTimer = window.setTimeout(() => {
        setIsLoading(false);     // ローディング画面を出さない
        setIsFirstVisit(false);  // アニメーション用フラグもオフ
        setPercent(100);
      }, 0);
      
      // スクロールアニメーション用のクラスを即座に付与
      const revealTimer = window.setTimeout(() => {
         document.querySelectorAll('.scroll-trigger').forEach(el => {
             el.classList.add('animate-fade-in-up', 'opacity-100'); // 最初から表示
             el.classList.remove('opacity-0');
         });
         document.querySelectorAll('.reveal-text-init').forEach(el => el.classList.add('is-visible'));
      }, 100);

      return () => {
        window.clearTimeout(skipLoadingTimer);
        window.clearTimeout(revealTimer);
      };

    } else {
      // ■ 初回訪問の場合
      // 訪問済みフラグをセット
      sessionStorage.setItem('visited', 'true');

      // --- カウントアップ処理 (前回と同じ) ---
      const interval = setInterval(() => {
        setPercent((prev) => {
          if (prev >= 96) return 96;
          return Math.min(96, prev + 4);
        });
      }, 24);

      const completionTimer = setTimeout(() => {
        setPercent(100);
        setTimeout(() => {
          clearInterval(interval);
          setIsLoading(false);
        }, 260);
      }, 760);

      return () => {
        clearInterval(interval);
        clearTimeout(completionTimer);
      };
    }
  }, []);

  // ---------------------------------------------------------
  // 2. スクロールアニメーション (Intersection Observer)
  // ---------------------------------------------------------
  useEffect(() => {
    if (isLoading) return;

    // 初回訪問でない場合、すでに表示済み処理をしているのでObserverは不要な場合もあるが、
    // 下の方のコンテンツのために走らせておく
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -50px 0px",
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          entry.target.classList.remove('opacity-0');
          if (entry.target.classList.contains('reveal-text-container')) {
             entry.target.classList.add('is-visible');
          }
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    setTimeout(() => {
      const targets = document.querySelectorAll('.scroll-trigger');
      targets.forEach(el => observer.observe(el));
      
      // 初回訪問時のみ、ふわっと出す演出をする
      if (isFirstVisit) {
        document.querySelectorAll('.reveal-text-init').forEach(el => el.classList.add('is-visible'));
      }
    }, 100);

    return () => observer.disconnect();
  }, [isLoading, isFirstVisit]);

  // ---------------------------------------------------------
  // 3. セクション遷移演出 & 背景トーン切り替え
  // ---------------------------------------------------------
  useEffect(() => {
    if (isLoading) return;
    let rafId = 0;

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('section-is-visible');
        const theme = (entry.target as HTMLElement).dataset.sectionTheme;
        if (theme) {
          document.body.dataset.sectionTheme = theme;
        }
      });
    }, {
      root: null,
      rootMargin: '-20% 0px -50% 0px',
      threshold: 0.08,
    });

    const sections = Array.from(document.querySelectorAll<HTMLElement>('.section-scene'));
    sections.forEach((section) => sectionObserver.observe(section));

    const updateActiveSection = () => {
      rafId = 0;
      const viewportHeight = window.innerHeight;
      const focusY = viewportHeight * 0.52;
      let activeSection: HTMLElement | null = null;
      let hasFocusedSection = false;
      let closestDistance = Number.POSITIVE_INFINITY;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();

        if (rect.top < viewportHeight * 0.78 && rect.bottom > viewportHeight * 0.05) {
          section.classList.add('section-is-visible');
        }

        if (rect.top <= focusY && rect.bottom >= focusY) {
          activeSection = section;
          hasFocusedSection = true;
          continue;
        }

        if (hasFocusedSection) continue;

        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - focusY);
        if (distance < closestDistance) {
          closestDistance = distance;
          activeSection = section;
        }
      }

      const theme = activeSection?.dataset.sectionTheme;
      if (theme) {
        document.body.dataset.sectionTheme = theme;
      }
    };

    const requestUpdate = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(updateActiveSection);
    };

    requestUpdate();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      sectionObserver.disconnect();
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, [isLoading]);

  return (
    <>
      {/* Loader Overlay */}
      {/* isLoadingが false になったらDOM自体を削除するように条件付きレンダリングに変更しても良いが、
          フェードアウト演出のために opacity で制御する形を維持 */}
      <div 
        className={`
          fixed top-0 left-0 w-full h-full bg-black-main z-[10000]
          flex flex-col justify-center items-center
          transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]
          ${isLoading ? 'translate-y-0 pointer-events-auto' : '-translate-y-full pointer-events-none'}
        `}
      >
        <div className="relative">
          <div className="text-9xl md:text-[10rem] font-bold leading-none tracking-tighter text-white-main tabular-nums">
            {percent}%
          </div>
          <div className="absolute -bottom-8 left-0 w-full text-center text-sm font-medium tracking-[0.4em] text-gray-400 animate-pulse">
            LOADING
          </div>
        </div>
      </div>

      <SiteHeader theme="dark" />
      <div className="section-tone-layer" aria-hidden="true"></div>
      <HomeStarfield />
      <div className="prism-ambient-layer" aria-hidden="true"></div>
      <PrismServiceTransition isLoading={isLoading} />
      <WorksIntro />

      <main className="relative z-10">
        {/* Heroコンポーネントにも isFirstVisit を渡して、
           「初回なら派手に文字が出る」「2回目なら最初から文字が出ている」
           という制御をするとさらにストレスが減ります
        */}
        <Hero isLoading={isLoading} />
        <Services />
        <Marquee />
        <Works />
        <About />
        <Contact />
      </main>
    </>
  );
}
