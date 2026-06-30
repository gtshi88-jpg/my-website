import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Home } from 'lucide-react';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Reveal from '@/components/ui/Reveal';
import { COMPANY } from '@/data/company';

export const metadata: Metadata = {
  title: `404 | ${COMPANY.name}`,
  description: 'お探しのページは見つかりませんでした。',
};

const QUICK_LINKS = [
  { label: 'About', labelJa: '私たちについて', href: '/about' },
  { label: 'Works', labelJa: '実績一覧', href: '/works' },
  { label: 'Pricing', labelJa: '料金プラン', href: '/pricing' },
  { label: 'Contact', labelJa: 'お問い合わせ', href: '/contact' },
];

export default function NotFound() {
  return (
    <main className="bg-black-main text-white-main min-h-screen">
      <SiteHeader theme="dark" />

      <section className="not-found-hero px-6 md:px-20 pt-36 md:pt-44 pb-24 md:pb-32">
        <div className="not-found-hero__inner max-w-[1600px] mx-auto min-h-[calc(100vh-12rem)] flex flex-col justify-center">
          <Reveal>
            <p className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-8 md:mb-10">
              Page Not Found
            </p>
          </Reveal>

          <Reveal delay={80}>
            <p
              className="not-found-hero__code text-[clamp(7rem,22vw,16rem)] font-extralight leading-none tracking-tighter text-white/20 select-none"
              aria-hidden="true"
            >
              404
            </p>
          </Reveal>

          <Reveal delay={160}>
            <h1 className="mt-2 md:-mt-6 text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.05] tracking-tight max-w-3xl">
              お探しのページは<br className="md:hidden" />見つかりませんでした。
            </h1>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-8 md:mt-10 text-base md:text-lg font-light leading-relaxed text-white/60 max-w-xl">
              URLが変更されたか、削除された可能性があります。トップページや下記のリンクから、目的のページへお進みください。
            </p>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-12 md:mt-14 flex flex-col sm:flex-row flex-wrap gap-4">
              <Link
                href="/"
                className="group inline-flex items-center justify-center gap-3 text-sm font-bold tracking-wide px-7 py-4 bg-white text-black rounded-full hover:opacity-80 transition-opacity"
              >
                <Home className="w-4 h-4" />
                ホームへ戻る
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-3 text-sm font-bold tracking-wide px-7 py-4 border border-white/30 rounded-full hover:bg-white/10 transition-colors"
              >
                お問い合わせ
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <nav className="mt-16 md:mt-20 pt-10 border-t border-white/10" aria-label="クイックリンク">
              <p className="text-xs font-bold tracking-[0.24em] uppercase text-white/40 mb-6">Quick Links</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {QUICK_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center justify-between gap-4 px-5 py-4 border border-white/10 rounded-lg hover:border-white/25 hover:bg-white/5 transition-colors"
                    >
                      <span>
                        <span className="block text-sm font-medium">{link.labelJa}</span>
                        <span className="block text-xs tracking-[0.18em] uppercase text-white/40 mt-1">{link.label}</span>
                      </span>
                      <ArrowUpRight className="w-4 h-4 shrink-0 text-white/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white/70" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
