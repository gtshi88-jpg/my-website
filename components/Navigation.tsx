'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { SERVICES_DATA } from '@/data/services';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 0.5 (50%) だとまだ背景が暗い場合があるので 0.9 (90%) に変更
      // これで「完全に白いエリアに入ってから」黒文字になります
      if (window.scrollY > window.innerHeight * 0.9) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ▼ 色の決定ロジック
  // 1. メニューが開いている時 -> 常に白 (黒背景の上だから)
  // 2. スクロールした後 -> 黒 (標準の text-black を使用して確実性を向上)
  // 3. トップにいる時 -> 白
  const textColorClass = isMenuOpen 
    ? 'text-white' 
    : (isScrolled ? 'text-black' : 'text-white');

  return (
    <>
      {/* 1. LOGO */}
      {/* z-indexを 70 に上げて、メニューオーバーレイ(z-60)より上に表示させます */}
      <div className={`fixed top-0 left-0 z-[70] p-6 md:p-8 transition-colors duration-300 pointer-events-auto ${textColorClass}`}>
        <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold tracking-widest">
          Prism Works.
        </Link>
      </div>

      {/* 2. PC Navigation List (Hero Mode) */}
      <nav 
        className={`
          hidden md:flex flex-col fixed top-0 
          right-[20%] 
          z-40 h-screen w-auto 
          items-start pt-32 
          transition-all duration-700 ease-in-out
          ${isScrolled ? 'opacity-0 translate-y-[-20px] pointer-events-none' : 'opacity-100 translate-y-0 pointer-events-auto'}
        `}
      >
        <div className="flex flex-col gap-8 text-sm font-medium tracking-wide text-white mix-blend-difference">
          <div className="relative group">
            <Link href="/#services" className="block hover:opacity-70 transition-opacity py-2">
              SERVICES
            </Link>
            <div className="absolute left-full top-0 pl-16 w-64 opacity-0 -translate-x-4 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto transition-all duration-300 ease-out">
              <div className="flex flex-col gap-4 border-l border-white/30 pl-6 py-1">
                {SERVICES_DATA.map((service) => (
                  <Link 
                    key={service.id} 
                    href={`/services/${service.slug}`}
                    className="block text-xs text-white/60 hover:text-white hover:scale-105 origin-left transition-all whitespace-nowrap"
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href="/#work" className="hover:opacity-70 transition-opacity py-2">WORK</Link>
          <Link href="/#about" className="hover:opacity-70 transition-opacity py-2">ABOUT</Link>
          <Link href="/#contact" className="hover:opacity-70 transition-opacity py-2">CONTACT</Link>
        </div>
      </nav>

      {/* 3. Scrolled Menu Trigger (PC Only) */}
      <button 
        onClick={() => setIsMenuOpen(true)}
        className={`
          hidden md:block fixed top-6 right-6 z-50 
          transition-all duration-500 delay-100
          ${isScrolled ? 'opacity-100 translate-y-0 pointer-events-auto text-black' : 'opacity-0 -translate-y-4 pointer-events-none text-white'}
        `}
      >
        <div className="flex items-center gap-2 group cursor-pointer">
          <span className="text-xs font-bold tracking-widest group-hover:opacity-70 transition-opacity">MENU</span>
          <Menu className="w-8 h-8 group-hover:scale-110 transition-transform" />
        </div>
      </button>

      {/* 4. Mobile Navigation Trigger */}
      {/* z-indexを 70 に上げて、メニューが開いた後も「X」ボタンの代わりにこの位置をキープできるようにします */}
      <button 
        className={`md:hidden fixed top-6 right-6 z-[70] transition-colors duration-300 ${textColorClass}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)} // トグル動作に変更
      >
        {isMenuOpen ? (
           <X className="w-8 h-8" />
        ) : (
           <Menu className="w-8 h-8" />
        )}
      </button>

      {/* 5. Full Screen Menu Overlay */}
      <div className={`fixed top-0 right-0 w-full h-screen bg-[#0a0a0a] text-white z-[60] flex flex-col justify-center items-center gap-8 text-3xl font-light transition-transform duration-500 ease-cubic ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* メニューリンク */}
        {['SERVICES', 'WORK', 'ABOUT', 'CONTACT'].map((item) => (
          <Link 
            key={item} 
            href={`/#${item.toLowerCase()}`} 
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-gray-400 transition-colors text-white"
          >
            {item}
          </Link>
        ))}

        <div className="mt-8 pt-8 border-t border-white/20 grid grid-cols-2 gap-x-12 gap-y-4 text-base">
           {SERVICES_DATA.map((service) => (
              <Link 
                key={service.id} 
                href={`/services/${service.slug}`}
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {service.title}
              </Link>
           ))}
        </div>
      </div>
    </>
  );
}