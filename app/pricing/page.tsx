import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, ArrowUpRight, ArrowRight } from 'lucide-react';
import PageShell from '@/components/PageShell';
import PageHero from '@/components/ui/PageHero';
import Reveal from '@/components/ui/Reveal';
import { PRICING_DATA, MAINTENANCE_NOTE } from '@/data/pricing';
import { COMPANY } from '@/data/company';

export const metadata: Metadata = {
  title: `Pricing | ${COMPANY.name}`,
  description: `${COMPANY.name}の料金プラン。ランディングページ・コーポレートサイト・ECサイト構築の目安料金をご案内します。`,
};

export default function PricingPage() {
  return (
    <PageShell>
      <PageHero
        crumb="料金プラン"
        kicker="Pricing"
        title="料金プラン"
        lead="下記は目安の料金です。ページ数・機能・素材の有無により変動します。ご予算やご要望に合わせて最適なプランをご提案しますので、まずはお気軽にご相談ください。"
      />

      {/* PLANS */}
      <section className="px-6 md:px-20 py-20 md:py-28">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {PRICING_DATA.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 100} className="h-full">
              <div
                className={`h-full flex flex-col p-8 md:p-10 border rounded-2xl transition-colors duration-300 ${
                  plan.featured
                    ? 'bg-white text-black border-white md:-translate-y-4 shadow-2xl shadow-black/40'
                    : 'bg-white/[0.03] border-white/15 hover:border-white/35'
                }`}
              >
                {plan.featured && (
                  <span className="self-start text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 mb-6 border border-black/30 rounded-full">
                    Most Popular
                  </span>
                )}
                <p className={`text-xs font-bold tracking-[0.2em] uppercase mb-2 ${plan.featured ? 'text-black/50' : 'text-white/50'}`}>
                  {plan.name}
                </p>
                <h2 className="text-2xl md:text-3xl font-light mb-6">{plan.nameJa}</h2>

                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-4xl md:text-5xl font-medium tracking-tighter">{plan.price}</span>
                  <span className={`text-sm ${plan.featured ? 'text-black/50' : 'text-white/50'}`}>〜（税別）</span>
                </div>
                <p className={`text-sm font-light leading-relaxed mb-8 ${plan.featured ? 'text-black/70' : 'text-white/60'}`}>
                  {plan.desc}
                </p>

                <ul className="space-y-3 mb-10">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm font-light">
                      <Check className={`w-4 h-4 mt-0.5 shrink-0 ${plan.featured ? 'text-black' : 'text-white'}`} />
                      <span className={plan.featured ? 'text-black/90' : 'text-white/90'}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`group mt-auto flex items-center justify-between gap-3 text-sm font-bold tracking-wide px-6 py-4 rounded-full transition-all ${
                    plan.featured
                      ? 'bg-black text-white hover:opacity-80'
                      : 'border border-white/40 hover:bg-white hover:text-black'
                  }`}
                >
                  このプランで相談する
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* MAINTENANCE */}
      <section className="px-6 md:px-20 pb-8">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 md:p-12 bg-white/[0.03] border border-white/15 rounded-2xl">
              <div>
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/50 mb-2">Maintenance</p>
                <p className="text-white-main font-light text-lg md:text-xl max-w-2xl leading-relaxed">{MAINTENANCE_NOTE.desc}</p>
              </div>
              <div className="flex items-baseline gap-1 shrink-0">
                <span className="text-4xl md:text-5xl font-medium tracking-tighter">{MAINTENANCE_NOTE.price}</span>
                <span className="text-sm text-white/50">{MAINTENANCE_NOTE.unit}〜</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 md:px-20 pb-24 md:pb-32">
        <div className="max-w-[1600px] mx-auto">
          <p className="text-xs text-white/40 font-light mb-12">
            ※ 表示価格は目安です。ページ数・機能・素材の有無により変動します。詳細はお見積りにてご案内します。
          </p>

          <Reveal>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-12 border-t border-white/10">
              <div>
                <h2 className="text-2xl md:text-4xl font-medium tracking-tight mb-3">ご依頼の流れも、ぜひご確認ください。</h2>
                <p className="text-white/60 font-light">ご相談から公開後の運用まで、進め方をまとめています。</p>
              </div>
              <Link
                href="/about#flow"
                className="group inline-flex items-center gap-3 shrink-0 text-sm font-bold tracking-wide px-7 py-4 border border-white/40 rounded-full hover:bg-white hover:text-black transition-all"
              >
                制作の流れを見る
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
