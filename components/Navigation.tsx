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
      if (window.scrollY > window.innerHeight * 0.5) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* 1. LOGO (Fixed Left-Top) */}
      <div className="fixed top-0 left-0 z-50 p-6 md:p-8 mix-blend-difference text-white pointer-events-auto">
        <Link href="/" className="text-xl font-bold tracking-widest">
          PORTFOLIO.
        </Link>
      </div>

      {/* 2. PC Navigation List (Hero Mode) */}
      <nav 
        className={`
          hidden md:flex flex-col fixed top-0 
          right-[20%] /* ← 変更: 30%ではなく20%の位置へ */
          z-40 h-screen w-auto 
          items-start pt-32 /* ← 変更: 中央揃え(justify-center)を廃止し、ロゴの下あたりに来るよう余白調整 */
          transition-all duration-700 ease-in-out
          ${isScrolled ? 'opacity-0 translate-y-[-20px] pointer-events-none' : 'opacity-100 translate-y-0 pointer-events-auto'}
        `}
      >
        <div className="flex flex-col gap-8 text-sm font-medium tracking-wide mix-blend-difference text-white">
          
          {/* SERVICES (Hover Logic) */}
          <div className="relative group">
            <Link href="/#services" className="block hover:opacity-70 transition-opacity py-2">
              SERVICES
            </Link>

            {/* Sub Menu */}
            <div 
              className={`
                absolute left-full top-0 pl-16 w-64
                opacity-0 -translate-x-4 pointer-events-none
                group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto
                transition-all duration-300 ease-out
              `}
            >
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

      {/* 3. Scrolled Menu Trigger (Collapsed Mode) */}
      <button 
        onClick={() => setIsMenuOpen(true)}
        className={`
          hidden md:block fixed top-6 right-6 z-50 mix-blend-difference text-white
          transition-all duration-500 delay-100
          ${isScrolled ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}
        `}
      >
        <div className="flex items-center gap-2 group cursor-pointer">
          <span className="text-xs font-bold tracking-widest group-hover:opacity-70 transition-opacity">MENU</span>
          <Menu className="w-8 h-8 group-hover:scale-110 transition-transform" />
        </div>
      </button>

      {/* 4. Mobile Navigation Trigger */}
      <button 
        className="md:hidden fixed top-6 right-6 z-50 mix-blend-difference text-white"
        onClick={() => setIsMenuOpen(true)}
      >
        <Menu className="w-8 h-8" />
      </button>

      {/* 5. Full Screen Menu Overlay */}
      <div className={`fixed top-0 right-0 w-full h-screen bg-black-main text-white-main z-[60] flex flex-col justify-center items-center gap-8 text-3xl font-light transition-transform duration-500 ease-cubic ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button 
          className="absolute top-6 right-6 hover:text-gray-400 transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          <X className="w-8 h-8" />
        </button>
        
        {['SERVICES', 'WORK', 'ABOUT', 'CONTACT'].map((item) => (
          <Link 
            key={item} 
            href={`/#${item.toLowerCase()}`} 
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-gray-400 transition-colors"
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