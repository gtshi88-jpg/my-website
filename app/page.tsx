'use client';

import { useState, useEffect } from 'react';

// コンポーネントのインポート
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Works from '@/components/Works';
import Marquee from '@/components/Marquee';
import About from '@/components/About';
import Contact from '@/components/Contact';

export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true);
  const [percent, setPercent] = useState(0);

  // ---------------------------------------------------------
  // 1. ローディングカウントアップ処理
  // ---------------------------------------------------------
  useEffect(() => {
    // 0% -> 99% まで進めるタイマー
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 99) return 99; // 読み込み完了待ち
        return prev + 1;
      });
    }, 20); // 数字が上がるスピード

    // 擬似的な読み込み完了タイマー (2.0秒後に完了とする)
    const completionTimer = setTimeout(() => {
      setPercent(100); // 強制的に100%へ
      
      // 100%を見せてから少し待ってローダーを消す
      setTimeout(() => {
        clearInterval(interval);
        setIsLoading(false);
      }, 500);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(completionTimer);
    };
  }, []);

  // ---------------------------------------------------------
  // 2. スクロールアニメーション (Intersection Observer)
  // ---------------------------------------------------------
  useEffect(() => {
    // ローディング中は監視しない（DOMの高さが確定していない可能性があるため）
    if (isLoading) return;

    // 監視の設定
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -50px 0px", // 画面下から50px入ったら発火
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // ふわっと表示させるクラスを付与
          entry.target.classList.add('animate-fade-in-up');
          entry.target.classList.remove('opacity-0');
          
          // テキストリビール用
          if (entry.target.classList.contains('reveal-text-container')) {
             entry.target.classList.add('is-visible');
          }
          
          // 一度表示したら監視を終了（パフォーマンス対策）
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // 少しだけ遅らせてDOM取得を確実にする
    const timer = setTimeout(() => {
      const targets = document.querySelectorAll('.scroll-trigger');
      targets.forEach(el => observer.observe(el));
      
      // 初期のテキスト表示（Heroセクション用）
      document.querySelectorAll('.reveal-text-init').forEach(el => el.classList.add('is-visible'));
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [isLoading]); // isLoadingが変わったタイミングで再実行

  return (
    <>
      {/* Loader Overlay (Center Layout) 
        - justify-center items-center で画面中央配置に変更
      */}
      <div 
        className={`
          fixed top-0 left-0 w-full h-full bg-white z-[10000] 
          flex flex-col justify-center items-center
          transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)]
          ${isLoading ? 'translate-y-0' : '-translate-y-full'}
        `}
      >
        <div className="relative">
          {/* パーセンテージ表示 */}
          <div className="text-9xl md:text-[10rem] font-bold leading-none tracking-tighter text-black-main tabular-nums">
            {percent}%
          </div>
          
          {/* 装飾テキスト */}
          <div className="absolute -bottom-8 left-0 w-full text-center text-sm font-medium tracking-[0.4em] text-gray-400 animate-pulse">
            LOADING
          </div>
        </div>
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main>
        {/* HeroにはisLoadingを渡して、ローダーが消えてから動画などが動き出す制御も可能 */}
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