import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Reveal from '@/components/ui/Reveal';
import SiteAtmosphere from '@/components/SiteAtmosphere';
import { COMPANY } from '@/data/company';
import { WORKS_DATA, WORK_CATEGORIES } from '@/data/works';

export const metadata: Metadata = {
  title: `Works | ${COMPANY.name}`,
  description: `${COMPANY.name}が手がけた、Web制作・UIデザイン・撮影・映像の制作実績をご紹介します。`,
};

export default function WorksPage() {
  const groups = WORK_CATEGORIES.map((category) => ({
    category,
    works: WORKS_DATA.filter((work) => work.category === category.id),
  })).filter((group) => group.works.length > 0);

  return (
    <main className="relative bg-black-main text-white-main">
      <SiteHeader theme="dark" />

      {/* 全ページ共通の背景アトモスフィア（星屑＋グロー） */}
      <SiteAtmosphere />

      <div className="relative z-10">
        {/* HERO */}
        <section className="works-page-hero text-white-main px-6 md:px-20 pt-36 md:pt-44 pb-20 md:pb-28">
          <div className="works-page-hero__inner max-w-[1600px] mx-auto">
            {/* Breadcrumb */}
            <Reveal>
              <nav className="flex items-center gap-2 text-xs md:text-sm font-medium tracking-wide text-white/50 mb-16 md:mb-24">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-white/80">実績一覧</span>
              </nav>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Title */}
              <div className="lg:col-span-7">
                <Reveal>
                  <h1 className="text-6xl md:text-8xl lg:text-9xl font-medium leading-[0.95] tracking-tight">
                    Works
                  </h1>
                </Reveal>
                <Reveal delay={120}>
                  <p className="mt-8 md:mt-12 text-sm font-bold tracking-[0.2em] text-white/80">実績一覧</p>
                </Reveal>
                <Reveal delay={200}>
                  <p className="mt-6 text-base md:text-lg font-light leading-relaxed text-white/60 max-w-xl">
                    {COMPANY.name} が手がけたプロジェクトの一部をご紹介します。Web制作・UIデザイン・撮影・映像まで、領域を横断してブランドの「伝えたい」を形にしてきました。
                  </p>
                </Reveal>
              </div>

              {/* 目次 (Table of contents) */}
              <div className="lg:col-span-5">
                <Reveal delay={160}>
                  <div className="bg-white text-text-main rounded-3xl shadow-2xl shadow-black/30 p-8 md:p-10">
                    <p className="text-base font-bold tracking-wide">目次</p>
                    <div className="mt-5 border-t border-black/10">
                      {groups.map(({ category }) => (
                        <a
                          key={category.id}
                          href={`#${category.id}`}
                          className="group flex items-center justify-between gap-4 py-5 border-b border-black/10 hover:opacity-60 transition-opacity"
                        >
                          <span className="text-base md:text-lg font-medium">{category.labelJa}</span>
                          <ChevronRight className="w-5 h-5 shrink-0 text-text-sub transition-transform group-hover:translate-x-1" />
                        </a>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>

            <Reveal delay={280} className="mt-14 md:mt-20">
              <div className="works-page-hero-visual">
                <Image
                  src="/images/works/works-hero.jpg"
                  alt="Prism Works の制作実績ビジュアル"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 92vw"
                />
                <div className="works-page-hero-visual__shade" aria-hidden="true" />
                <p className="works-page-hero-visual__caption">Selected Works</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CATEGORY SECTIONS */}
        {groups.map(({ category, works }) => (
          <section
            key={category.id}
            id={category.id}
            className="px-6 md:px-20 py-24 md:py-36 border-b border-white/10 scroll-mt-24"
          >
            <div className="max-w-[1600px] mx-auto">
              <Reveal className="text-center mb-16 md:mb-24">
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight">{category.labelEn}</h2>
                <p className="mt-4 text-sm md:text-base font-bold tracking-[0.2em] text-white/50">{category.labelJa}</p>
                <p className="mt-8 text-base md:text-lg font-light leading-relaxed text-white/55 max-w-2xl mx-auto">
                  {category.desc}
                </p>
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 md:gap-y-24">
                {works.map((work, i) => {
                  const isExternal = work.url.startsWith('http');
                  return (
                    <Reveal key={work.id} delay={(i % 2) * 100}>
                      <Link
                        href={work.url}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                        className="group block"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden bg-white/5 rounded-sm">
                          <Image
                            src={work.image}
                            alt={work.title}
                            fill
                            className="object-cover object-center transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                        </div>
                        <div className="mt-6 flex items-start justify-between gap-6">
                          <div>
                            <p className="text-xs font-medium tracking-[0.2em] uppercase text-white/40 mb-2">
                              {work.label}
                            </p>
                            <h3 className="text-xl md:text-2xl font-medium tracking-tight leading-snug">
                              {work.title}
                            </h3>
                            <p className="mt-1 text-sm text-white/50 font-light">{work.subtitle}</p>
                          </div>
                          <span className="shrink-0 mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-white/60 group-hover:text-white transition-colors">
                            もっとみる
                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </span>
                        </div>
                      </Link>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>
        ))}

        {/* CTA */}
        <section className="px-6 md:px-20 py-24 md:py-36">
          <div className="max-w-[1600px] mx-auto">
            <Reveal className="max-w-3xl">
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight leading-snug mb-8">
                次のプロジェクトを、<br />ご一緒しませんか。
              </h2>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 text-sm font-bold tracking-wide px-7 py-4 bg-white text-black rounded-full hover:opacity-80 transition-opacity"
              >
                お問い合わせ
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Reveal>
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
