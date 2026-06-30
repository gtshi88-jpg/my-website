import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Reveal from '@/components/ui/Reveal';
import FaqAccordion from '@/components/about/FaqAccordion';
import { REASONS } from '@/data/about';
import { PROCESS_DATA } from '@/data/process';
import { COMPANY } from '@/data/company';

export const metadata: Metadata = {
  title: `About | ${COMPANY.name}`,
  description: `${COMPANY.name}が選ばれる理由、制作の流れ、よくあるご質問をご紹介します。`,
};

export default function AboutPage() {
  return (
    <main className="bg-white-main text-text-main">
      <SiteHeader theme="light" />

      {/* HERO */}
      <section className="about-page-hero px-6 md:px-20 pt-40 md:pt-52 pb-20 md:pb-28 border-b border-black/10">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <p className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-text-sub mb-6">About Us</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-medium leading-[1.05] tracking-tight max-w-5xl">
              事業の成長を、<br />Webでつくる。
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-10 md:mt-14 text-base md:text-xl font-light leading-relaxed text-text-sub max-w-2xl">
              {COMPANY.name} は、コーポレートサイト・ECサイトの制作を軸に、撮影・映像から運用・保守までをワンストップで手がける、少人数のデジタルスタジオです。デザインと技術の両面から、ブランドの「伝えたい」を成果につなげます。
            </p>
          </Reveal>

          <Reveal delay={240} className="mt-14 md:mt-20">
            <div className="about-page-hero-visual">
              <Image
                src="/images/about/about-hero.jpg"
                alt="Prism Works スタジオのビジュアル"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 92vw"
              />
              <div className="about-page-hero-visual__shade" aria-hidden="true" />
              <p className="about-page-hero-visual__caption">Design × Technology</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* REASONS */}
      <section className="px-6 md:px-20 py-24 md:py-36">
        <div className="max-w-[1600px] mx-auto">
          <Reveal className="mb-16 md:mb-24">
            <p className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-text-sub mb-4">Why Choose Us</p>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight">選ばれる理由</h2>
          </Reveal>

          <div className="space-y-24 md:space-y-40">
            {REASONS.map((reason, i) => (
              <div
                key={reason.no}
                className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center"
              >
                <Reveal className={i % 2 === 1 ? 'md:order-2' : ''}>
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    <Image
                      src={reason.image}
                      alt={reason.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </Reveal>
                <Reveal delay={120} className={i % 2 === 1 ? 'md:order-1' : ''}>
                  <div>
                    <div className="flex items-baseline gap-4 mb-6">
                      <span className="text-5xl md:text-7xl font-light tracking-tighter text-text-sub/30">{reason.no}</span>
                      <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-text-sub">{reason.titleEn}</span>
                    </div>
                    <h3 className="text-2xl md:text-4xl font-medium leading-snug mb-6">{reason.title}</h3>
                    <p className="text-base md:text-lg font-light leading-relaxed text-text-sub max-w-xl">{reason.desc}</p>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FLOW */}
      <section id="flow" className="bg-black-main text-white-main px-6 md:px-20 py-24 md:py-36 scroll-mt-24">
        <div className="max-w-[1600px] mx-auto">
          <Reveal className="mb-16 md:mb-24 max-w-2xl">
            <p className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-4">Flow</p>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6">制作の流れ</h2>
            <p className="text-base md:text-lg font-light leading-relaxed text-white/60">
              ご相談から公開後の運用まで。一貫した体制で、はじめての方にも安心して進めていただけます。
            </p>
          </Reveal>

          <div className="border-t border-white/15">
            {PROCESS_DATA.map((step, i) => (
              <Reveal key={step.no} delay={i * 60}>
                <div className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 items-baseline py-10 md:py-14 border-b border-white/15">
                  <div className="md:col-span-2 text-6xl md:text-8xl font-extralight tracking-tighter text-white/25 group-hover:text-white transition-colors duration-500">
                    {step.no}
                  </div>
                  <div className="md:col-span-4">
                    <p className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-white/40 mb-2">{step.title}</p>
                    <h3 className="text-2xl md:text-4xl font-light">{step.titleJa}</h3>
                  </div>
                  <p className="md:col-span-6 text-white/60 font-light text-base md:text-lg leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16">
            <Link
              href="/pricing"
              className="group inline-flex items-center gap-3 text-sm font-bold tracking-wide px-7 py-4 bg-white text-black rounded-full hover:opacity-80 transition-opacity"
            >
              料金プランを見る
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-20 py-24 md:py-36">
        <div className="max-w-[1100px] mx-auto">
          <Reveal className="mb-12 md:mb-16">
            <p className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-text-sub mb-4">FAQ</p>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight">よくあるご質問</h2>
          </Reveal>
          <Reveal>
            <FaqAccordion />
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
