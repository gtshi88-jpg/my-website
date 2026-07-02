'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { COMPANY } from '@/data/company';
import { SERVICES_DATA } from '@/data/services';

const NAV_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/works' },
  { label: 'Company', href: '/company' },
];

type SiteHeaderProps = {
  /** ページ最上部（ヒーロー）の背景。'dark' のヒーロー上では文字を白に、'light' では黒にする */
  theme?: 'dark' | 'light';
};

export default function SiteHeader({ theme = 'light' }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ダークテーマのページではスクロール後も暗いバー＋白文字を維持し、
  // ライトテーマのページは従来どおりスクロール後に白背景＋黒文字にする。
  const isDark = theme === 'dark';
  const textClass = isDark ? 'text-white' : 'text-text-main';
  const subTextClass = isDark ? 'text-white/80' : 'text-text-sub';
  const ctaClass = isDark
    ? 'bg-white text-black hover:opacity-80'
    : 'bg-black text-white hover:opacity-80';
  const scrolledBg = isDark
    ? 'bg-black-main/80 backdrop-blur-md border-b border-white/10 py-4'
    : 'bg-white-main/90 backdrop-blur-md border-b border-black/5 py-4';

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[70] transition-all duration-300 ${
          scrolled ? scrolledBg : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-20 flex items-center justify-between">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className={`text-lg md:text-xl font-bold tracking-widest transition-colors hover:opacity-60 ${textClass}`}
          >
            {COMPANY.name}.
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors hover:opacity-60 ${subTextClass}`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className={`group flex items-center gap-2 text-sm font-bold tracking-wide px-5 py-2.5 rounded-full transition-opacity ${ctaClass}`}
            >
              Contact
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </nav>

          {/* Mobile trigger */}
          <button
            className={`md:hidden transition-colors ${menuOpen ? 'text-white' : textClass}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="メニュー"
          >
            {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <div
        className={`fixed inset-0 z-[60] bg-[#0a0a0a] text-white flex flex-col justify-center items-center gap-8 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] md:hidden ${
          menuOpen ? 'translate-x-0 pointer-events-auto' : 'translate-x-full pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center gap-7 text-3xl font-light">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="hover:text-gray-400 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setMenuOpen(false)} className="hover:text-gray-400 transition-colors">
            Contact
          </Link>
        </nav>

        <div className="mt-6 pt-8 border-t border-white/20 grid grid-cols-2 gap-x-12 gap-y-3 text-base">
          {SERVICES_DATA.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              onClick={() => setMenuOpen(false)}
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
