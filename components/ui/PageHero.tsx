import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

type PageHeroProps = {
  /** パンくずの現在地ラベル（日本語） */
  crumb: string;
  /** 英字ラベル（例: Contact） */
  kicker: string;
  /** メイン見出し */
  title: React.ReactNode;
  /** リード文（任意） */
  lead?: React.ReactNode;
  /** ヒーロー内に差し込む追加要素（目次カード等） */
  children?: React.ReactNode;
};

/**
 * 全下層ページ共通のヒーロー。
 * パンくず → 英字ラベル → 大見出し → リード の構成と余白・タイプスケールを統一する。
 */
export default function PageHero({ crumb, kicker, title, lead, children }: PageHeroProps) {
  return (
    <section className="px-6 md:px-20 pt-36 md:pt-44 pb-16 md:pb-24 border-b border-white/10">
      <div className="max-w-[1600px] mx-auto">
        <Reveal>
          <nav className="flex items-center gap-2 text-xs md:text-sm font-medium tracking-wide text-white/50 mb-16 md:mb-24">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/80">{crumb}</span>
          </nav>
        </Reveal>
        <Reveal delay={80}>
          <p className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-6">{kicker}</p>
        </Reveal>
        <Reveal delay={140}>
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-medium leading-[1.05] tracking-tight">{title}</h1>
        </Reveal>
        {lead && (
          <Reveal delay={220}>
            <p className="mt-10 md:mt-14 text-base md:text-lg font-light leading-relaxed text-white/60 max-w-2xl">
              {lead}
            </p>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
