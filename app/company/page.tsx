import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import PageShell from '@/components/PageShell';
import PageHero from '@/components/ui/PageHero';
import Reveal from '@/components/ui/Reveal';
import { COMPANY } from '@/data/company';

export const metadata: Metadata = {
  title: `Company | ${COMPANY.name}`,
  description: `${COMPANY.name}の会社概要。事業内容・所在地・お問い合わせ先などをご案内します。`,
};

export default function CompanyPage() {
  const rows: { label: string; value: React.ReactNode }[] = [
    { label: '屋号 / 名称', value: `${COMPANY.name}（${COMPANY.nameJa}）` },
    { label: '代表者', value: COMPANY.representative },
    { label: '設立', value: COMPANY.established },
    { label: '所在地', value: COMPANY.location },
    {
      label: 'お問い合わせ',
      value: (
        <a
          href={`mailto:${COMPANY.email}`}
          className="border-b border-white/30 hover:border-white transition-colors break-all"
        >
          {COMPANY.email}
        </a>
      ),
    },
    { label: '営業時間', value: COMPANY.businessHours },
  ];

  return (
    <PageShell>
      <PageHero
        crumb="会社概要"
        kicker="Company"
        title="会社概要"
        lead={`${COMPANY.name} は、コーポレートサイト・ECサイトの制作を軸に、撮影・映像から運用・保守までをワンストップで手がける、少人数のデジタルスタジオです。`}
      />

      {/* PROFILE */}
      <section className="px-6 md:px-20 py-20 md:py-28 border-b border-white/10">
        <div className="max-w-[1100px] mx-auto">
          <Reveal className="mb-12 md:mb-16">
            <p className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-white/50">Profile</p>
          </Reveal>
          <Reveal>
            <dl className="divide-y divide-white/10 border-t border-white/10">
              {rows.map((row) => (
                <div key={row.label} className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-8 py-6">
                  <dt className="text-sm font-bold tracking-wide text-white/50">{row.label}</dt>
                  <dd className="md:col-span-3 text-base md:text-lg font-light leading-relaxed">{row.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* BUSINESS */}
      <section className="px-6 md:px-20 py-20 md:py-28 border-b border-white/10">
        <div className="max-w-[1100px] mx-auto">
          <Reveal className="mb-12 md:mb-16">
            <p className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-4">Business</p>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight">事業内容</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-px">
            {COMPANY.business.map((item, i) => (
              <Reveal key={item} delay={(i % 2) * 100}>
                <div className="flex items-baseline gap-5 py-6 border-t border-white/10">
                  <span className="text-sm font-light tabular-nums text-white/40">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-lg md:text-xl font-light leading-relaxed">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-20 py-24 md:py-36">
        <div className="max-w-[1100px] mx-auto">
          <Reveal className="max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight leading-snug mb-8">
              お仕事のご相談は、<br />お気軽にお問い合わせください。
            </h2>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 text-sm font-bold tracking-wide px-7 py-4 bg-white text-black rounded-full hover:opacity-80 transition-opacity"
              >
                お問い合わせ
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="/works"
                className="group inline-flex items-center gap-3 text-sm font-bold tracking-wide px-7 py-4 border border-white/40 rounded-full hover:bg-white hover:text-black transition-colors"
              >
                制作実績を見る
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </PageShell>
  );
}
