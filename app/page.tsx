'use client';

import { useState, useEffect } from 'react';

import Navigation from '@/components/Navigation';
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
      setIsLoading(false);     // ローディング画面を出さない
      setIsFirstVisit(false);  // アニメーション用フラグもオフ
      setPercent(100);
      
      // スクロールアニメーション用のクラスを即座に付与
      setTimeout(() => {
         document.querySelectorAll('.scroll-trigger').forEach(el => {
             el.classList.add('animate-fade-in-up', 'opacity-100'); // 最初から表示
             el.classList.remove('opacity-0');
         });
         document.querySelectorAll('.reveal-text-init').forEach(el => el.classList.add('is-visible'));
      }, 100);

    } else {
      // ■ 初回訪問の場合
      // 訪問済みフラグをセット
      sessionStorage.setItem('visited', 'true');

      // --- カウントアップ処理 (前回と同じ) ---
      const interval = setInterval(() => {
        setPercent((prev) => {
          if (prev >= 99) return 99;
          return prev + 1;
        });
      }, 20);

      const completionTimer = setTimeout(() => {
        setPercent(100);
        setTimeout(() => {
          clearInterval(interval);
          setIsLoading(false);
        }, 500);
      }, 2000);

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

  return (
    <>
      {/* Loader Overlay */}
      {/* isLoadingが false になったらDOM自体を削除するように条件付きレンダリングに変更しても良いが、
          フェードアウト演出のために opacity で制御する形を維持 */}
      <div 
        className={`
          fixed top-0 left-0 w-full h-full bg-white z-[10000] 
          flex flex-col justify-center items-center
          transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)]
          ${isLoading ? 'translate-y-0' : '-translate-y-full'}
        `}
      >
        <div className="relative">
          <div className="text-9xl md:text-[10rem] font-bold leading-none tracking-tighter text-black-main tabular-nums">
            {percent}%
          </div>
          <div className="absolute -bottom-8 left-0 w-full text-center text-sm font-medium tracking-[0.4em] text-gray-400 animate-pulse">
            LOADING
          </div>
        </div>
      </div>

      <Navigation />

      <main>
        {/* Heroコンポーネントにも isFirstVisit を渡して、
           「初回なら派手に文字が出る」「2回目なら最初から文字が出ている」
           という制御をするとさらにストレスが減ります
        */}
        <Hero isLoading={isLoading} />
        <Services />
        <Works />
        <Marquee />
        <About />
        <Contact />
      </main>
    </>
  );
}