'use client';

import { useState, useEffect } from 'react';
// import { Menu, X } from 'lucide-react'; // ← 削除
// import { useRef } from 'react'; // ← カーソル用だったので削除

// 作成したコンポーネントをインポート
import Navigation from '@/components/Navigation'; // ← 追加
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Works from '@/components/Works';
import Marquee from '@/components/Marquee';
import About from '@/components/About';
import Contact from '@/components/Contact';

export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true);
  // const [isMenuOpen, setIsMenuOpen] = useState(false); // ← Navigationコンポーネントに移ったので削除
  
  // カーソル用 RefとEffect も削除 (CustomCursor.tsxに移ったため)
  
  // ローディング処理
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Intersection Observer (スクロールアニメーション)
  useEffect(() => {
    if (isLoading) return;

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
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    setTimeout(() => {
      document.querySelectorAll('.scroll-trigger').forEach(el => observer.observe(el));
    }, 100);
    
    setTimeout(() => {
      document.querySelectorAll('.reveal-text-init').forEach(el => el.classList.add('is-visible'));
    }, 500);

    return () => observer.disconnect();
  }, [isLoading]);

  return (
    <>
      {/* Loader */}
      <div 
        className={`fixed top-0 left-0 w-full h-full bg-white z-[10000] flex justify-center items-center transition-transform duration-1000 ease-in-out ${isLoading ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="text-black-main text-2xl font-semibold tracking-widest animate-pulse">
          LOADING PORTFOLIO...
        </div>
      </div>

      {/* Navigation Component */}
      <Navigation />

      <main>
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