import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import SiteAtmosphere from '@/components/SiteAtmosphere';
import Reveal from '@/components/ui/Reveal';
import { COMPANY } from '@/data/company';
import { SERVICES_DATA } from '@/data/services';
import { WORKS_DATA } from '@/data/works';

export const metadata: Metadata = {
  title: `Services | ${COMPANY.name}`,
  description: `${COMPANY.name}が提供するWeb制作、EC構築、保守運用、クリエイティブ制作のサービス一覧です。`,
};

const SERVICE_POINTS: Record<string, string[]> = {
  'web-design': ['情報設計・UIデザイン', 'Next.js / CMS実装', '公開後の改善提案'],
  'e-commerce': ['Shopify構築', '商品導線・購入導線設計', '運用しやすい管理設計'],
  maintenance: ['更新代行', 'セキュリティ・速度改善', '月次改善サポート'],
  creative: ['写真撮影', '映像編集', 'Webと連動する素材制作'],
};

export default function ServicesPage() {
  const featuredWorks = WORKS_DATA.filter((work) => work.category === 'web' || work.category === 'ui' || work.category === 'video').slice(0, 3);

  return (
    <main className="service-index-page relative bg-black-main text-white-main">
      <SiteHeader theme="dark" />
      <SiteAtmosphere />

      <div className="relative z-10">
      <section className="service-index-hero px-6 md:px-20 pt-36 md:pt-48 pb-16 md:pb-24">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <nav className="flex flex-wrap items-center gap-3 text-xs md:text-sm font-bold tracking-[0.18em] uppercase text-white/50 mb-14">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white/80">Services</span>
            </nav>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-12 lg:gap-20 items-end">
            <div>
              <Reveal>
                <p className="text-xs md:text-sm font-bold tracking-[0.34em] uppercase text-white/50 mb-6">
                  Service
                </p>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="text-5xl md:text-8xl lg:text-9xl font-medium leading-[0.92] tracking-tight">
                  Service
                </h1>
                <p className="mt-6 text-xl md:text-3xl font-light tracking-tight">提供できるサービス</p>
              </Reveal>
            </div>

            <Reveal delay={160}>
              <div className="service-detail-toc">
                <p className="service-detail-toc__title">目次</p>
                <div className="service-detail-toc__grid">
                  {SERVICES_DATA.map((service) => (
                    <a key={service.slug} href={`#${service.slug}`} className="service-detail-toc__link">
                      <span>{service.title}</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={220} className="mt-14 md:mt-20">
            <div className="service-index-visual">
              <Image
                src="/video/EC_img.jpg"
                alt="Prism Works services"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 92vw"
              />
              <div className="service-index-visual__shade"></div>
              <div className="service-browser-mock service-index-visual__mock" aria-hidden="true">
                <div className="service-browser-mock__bar">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="service-browser-mock__body">
                  <div className="service-browser-mock__headline"></div>
                  <div className="service-browser-mock__line"></div>
                  <div className="service-browser-mock__line --short"></div>
                  <div className="service-browser-mock__grid">
                    <i></i>
                    <i></i>
                    <i></i>
                  </div>
                </div>
              </div>
              <p className="service-index-visual__caption">Planning / Design / Build / Growth</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="service-index-lead px-6 md:px-20 py-20 md:py-32">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[0.55fr_1fr] gap-12 lg:gap-24">
          <Reveal>
            <p className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-white/50">What We Do</p>
          </Reveal>
          <Reveal delay={100}>
            <div>
              <h2 className="text-3xl md:text-6xl font-medium leading-tight tracking-tight max-w-4xl">
                サイト制作から運用、素材制作まで。事業の成長に必要なWeb体験を一貫して設計します。
              </h2>
              <p className="mt-10 text-base md:text-xl font-light leading-relaxed text-white/60 max-w-3xl">
                事業の状態や目的に合わせて、企画から制作、公開後の改善まで必要な範囲を組み合わせてご提案します。
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="service-index-list px-6 md:px-20">
        <div className="max-w-[1600px] mx-auto">
          {SERVICES_DATA.map((service, index) => {
            const points = SERVICE_POINTS[service.slug] ?? ['企画整理', '制作進行', '運用サポート'];

            return (
              <section key={service.slug} id={service.slug} className="service-index-block scroll-mt-28">
                <Reveal className="service-index-block__media">
                  <Image
                    src={service.posterSrc}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 48vw"
                  />
                  <div className="service-index-block__image-shade"></div>
                  <p>{String(index + 1).padStart(2, '0')}</p>
                </Reveal>

                <Reveal delay={100} className="service-index-block__content">
                  <p className="service-index-block__kicker">Service {String(index + 1).padStart(2, '0')}</p>
                  <h2>{service.title}</h2>
                  <p className="service-index-block__desc">{service.desc}</p>

                  <div className="service-index-features">
                    {points.map((point) => (
                      <div key={point} className="service-index-feature">
                        <Check className="w-5 h-5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                  <div className="service-index-actions">
                    <Link href={`/services/${service.slug}`} className="service-index-primary-link">
                      詳細を見る
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                    <Link href="/contact" className="service-index-secondary-link">
                      相談する
                    </Link>
                  </div>
                </Reveal>
              </section>
            );
          })}
        </div>
      </section>

      <section className="service-index-works px-6 md:px-20 py-24 md:py-36">
        <div className="max-w-[1600px] mx-auto">
          <Reveal className="mb-14 md:mb-20">
            <p className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-5">Other Works</p>
            <h2 className="text-3xl md:text-6xl font-medium tracking-tight">関連する実績</h2>
          </Reveal>

          <div className="service-work-grid">
            {featuredWorks.map((work, index) => (
              <Reveal key={work.id} delay={index * 100}>
                <Link href={work.url} className="service-work-card">
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 32vw"
                  />
                  <div className="service-work-card__shade"></div>
                  <div className="service-work-card__body">
                    <p>{String(index + 1).padStart(2, '0')} / {work.label}</p>
                    <h3>{work.title}</h3>
                    <span>
                      View more
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="service-next-section px-6 md:px-20 py-20 md:py-28">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <div className="service-next-section__inner">
              <div>
                <p className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-4">Contact</p>
                <h2 className="text-3xl md:text-5xl font-medium tracking-tight">制作のご相談はこちら</h2>
              </div>
              <div className="service-next-links">
                <Link href="/contact" className="service-next-link">
                  <span>お問い合わせ</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/pricing" className="service-next-link">
                  <span>料金プランを見る</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
      </div>
    </main>
  );
}
