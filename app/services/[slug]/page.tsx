import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Layers, MonitorSmartphone, MousePointer2 } from 'lucide-react';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Reveal from '@/components/ui/Reveal';
import { COMPANY } from '@/data/company';
import { SERVICES_DATA, type ServiceDetail, type ServiceItem } from '@/data/services';
import { WORKS_DATA } from '@/data/works';

type Props = {
  params: Promise<{ slug: string }>;
};

const TOC_LINKS = [
  { href: '#overview', label: '概要' },
  { href: '#features', label: 'できること' },
  { href: '#flow', label: '進め方' },
  { href: '#works', label: '実績' },
  { href: '#media', label: '関連情報' },
];

const SERVICE_ICONS = [MonitorSmartphone, MousePointer2, Layers];

function findService(slug: string) {
  return SERVICES_DATA.find((item) => item.slug === slug);
}

function createFallbackDetail(service: ServiceItem): ServiceDetail {
  return {
    titleJa: service.title,
    heroLead: service.desc,
    heroImage: service.posterSrc,
    overview: `${service.title}のご相談内容に合わせて、企画・制作・公開後の運用まで一貫してサポートします。目的、必要な素材、更新体制を整理し、無理なく継続できる制作体制をご提案します。`,
    stats: [
      { label: 'Scope', value: 'Planning / Creative' },
      { label: 'Output', value: 'Design / Build' },
      { label: 'Support', value: 'Operation' },
    ],
    features: [
      {
        title: `${service.title} Planning`,
        desc: 'まずは目的とターゲットを整理し、必要な表現・導線・制作範囲を明確にします。',
        image: service.posterSrc,
        label: 'Planning',
      },
      {
        title: `${service.title} Production`,
        desc: 'デザイン、撮影、編集、実装など、必要な制作工程をまとめて進行します。',
        image: '/images/root/hero-img.jpg',
        label: 'Production',
        reverse: true,
      },
      {
        title: 'Operation Support',
        desc: '公開・納品後の更新、改善、追加制作まで継続的に支援します。',
        image: '/images/root/tiam-pv-thumbnail.JPG',
        label: 'Growth',
      },
    ],
    process: [
      { no: '01', title: 'Hearing', desc: '目的、課題、希望納期、必要な素材を確認します。' },
      { no: '02', title: 'Plan', desc: '制作範囲、構成、スケジュール、お見積りを整理します。' },
      { no: '03', title: 'Create', desc: 'デザイン・制作を進め、確認と調整を重ねます。' },
      { no: '04', title: 'Support', desc: '納品後の更新や改善も必要に応じて対応します。' },
    ],
    deliverables: ['企画整理', '構成案', 'デザイン制作', '素材制作', '公開・納品', '運用サポート'],
    articles: [
      {
        title: '制作相談の前に整理しておきたいポイント',
        category: 'Guide',
        date: '2026.06.30',
        image: '/images/root/hero-img.jpg',
        href: '/about#faq',
      },
      {
        title: '料金プランと制作範囲の考え方',
        category: 'Pricing',
        date: '2026.06.30',
        image: '/video/EC-poster.jpg',
        href: '/pricing',
      },
      {
        title: '公開後の更新・改善サポートについて',
        category: 'Maintenance',
        date: '2026.06.30',
        image: '/video/EC_img.jpg',
        href: '/services/maintenance',
      },
    ],
  };
}

export function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = findService(slug);

  if (!service) {
    return {
      title: `Service | ${COMPANY.name}`,
    };
  }

  return {
    title: `${service.title} | ${COMPANY.name}`,
    description: service.desc,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = findService(slug);

  if (!service) {
    notFound();
  }

  const serviceIndex = SERVICES_DATA.findIndex((item) => item.slug === service.slug);
  const detail = service.detail ?? createFallbackDetail(service);
  const relatedWorks = WORKS_DATA.filter((work) => (
    service.slug === 'web-design'
      ? work.category === 'web' || work.category === 'ui'
      : work.category !== 'photo'
  )).slice(0, 3);
  const relatedServices = SERVICES_DATA.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <main className="service-detail-page bg-[#f7f7f4] text-text-main">
      <SiteHeader theme="light" />

      <section className="service-detail-hero px-6 md:px-20 pt-36 md:pt-48 pb-16 md:pb-24">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <nav className="flex flex-wrap items-center gap-3 text-xs md:text-sm font-bold tracking-[0.18em] uppercase text-text-sub mb-14">
              <Link href="/" className="hover:text-text-main transition-colors">Home</Link>
              <span>/</span>
              <Link href="/#services" className="hover:text-text-main transition-colors">Services</Link>
              <span>/</span>
              <span className="text-text-main">{service.title}</span>
            </nav>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-12 lg:gap-20 items-end">
            <div>
              <Reveal>
                <p className="text-xs md:text-sm font-bold tracking-[0.34em] uppercase text-text-sub mb-6">
                  Service Detail
                </p>
              </Reveal>
              <Reveal delay={80}>
                <p className="text-text-sub font-medium tracking-[0.22em] text-sm md:text-base mb-5">
                  {String(serviceIndex + 1).padStart(2, '0')} / {String(SERVICES_DATA.length).padStart(2, '0')}
                </p>
                <h1 className="text-5xl md:text-8xl lg:text-9xl font-medium leading-[0.92] tracking-tight">
                  {service.title}
                </h1>
                <p className="mt-6 text-xl md:text-3xl font-light tracking-tight">{detail.titleJa}</p>
              </Reveal>
            </div>

            <Reveal delay={160}>
              <div className="service-detail-toc">
                <p className="service-detail-toc__title">目次</p>
                <div className="service-detail-toc__grid">
                  {TOC_LINKS.map((link) => (
                    <a key={link.href} href={link.href} className="service-detail-toc__link">
                      <span>{link.label}</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={220} className="mt-14 md:mt-20">
            <div className="service-detail-visual">
              <Image
                src={detail.heroImage}
                alt={service.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 92vw"
              />
              <div className="service-detail-visual__shade"></div>
              <div className="service-browser-mock" aria-hidden="true">
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
              <p className="service-detail-visual__caption">
                Strategy / UI Design / Frontend / CMS
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="overview" className="service-detail-overview px-6 md:px-20 py-20 md:py-32 scroll-mt-24">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[0.55fr_1fr] gap-12 lg:gap-24">
          <Reveal>
            <div className="service-detail-section-label">
              <p>Overview</p>
              <Link href="/#services" className="inline-flex items-center gap-2 text-sm font-bold tracking-wide hover:opacity-60 transition-opacity">
                <ArrowLeft className="w-4 h-4" />
                サービス一覧へ戻る
              </Link>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <h2 className="text-3xl md:text-6xl font-medium leading-tight tracking-tight max-w-4xl">
                {detail.heroLead}
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-10 text-base md:text-xl font-light leading-relaxed text-text-sub max-w-3xl">
                {detail.overview}
              </p>
            </Reveal>
            <div className="service-detail-stats mt-12">
              {detail.stats.map((stat, index) => (
                <Reveal key={stat.label} delay={index * 70}>
                  <div className="service-detail-stat">
                    <p>{stat.label}</p>
                    <span>{stat.value}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="px-6 md:px-20 py-20 md:py-32 bg-white-main scroll-mt-24">
        <div className="max-w-[1600px] mx-auto">
          <Reveal className="mb-14 md:mb-20">
            <p className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-text-sub mb-5">What We Create</p>
            <h2 className="text-3xl md:text-6xl font-medium tracking-tight">できること</h2>
          </Reveal>

          <div className="space-y-16 md:space-y-24">
            {detail.features.map((feature, index) => {
              const Icon = SERVICE_ICONS[index % SERVICE_ICONS.length];
              return (
                <Reveal key={feature.title} delay={index * 100}>
                  <article className={`service-feature-card ${feature.reverse ? 'is-reverse' : ''}`}>
                    <div className="service-feature-card__image">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 46vw"
                      />
                      <span>{feature.label}</span>
                    </div>
                    <div className="service-feature-card__body">
                      <div className="service-feature-card__icon">
                        <Icon className="w-5 h-5" />
                      </div>
                      <p className="text-sm font-bold tracking-[0.22em] uppercase text-text-sub mb-4">
                        {String(index + 1).padStart(2, '0')}
                      </p>
                      <h3 className="text-3xl md:text-5xl font-light tracking-tight mb-6">{feature.title}</h3>
                      <p className="text-base md:text-lg font-light leading-relaxed text-text-sub max-w-xl">{feature.desc}</p>
                      {feature.href && (
                        <Link href={feature.href} className="service-feature-card__link">
                          詳しく見る
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="flow" className="service-detail-flow bg-black-main text-white-main px-6 md:px-20 py-24 md:py-36 scroll-mt-24">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[0.65fr_1fr] gap-14 lg:gap-24">
          <Reveal>
            <div className="lg:sticky lg:top-32">
              <p className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-5">Flow</p>
              <h2 className="text-3xl md:text-6xl font-medium tracking-tight mb-8">進め方</h2>
              <p className="text-base md:text-lg font-light leading-relaxed text-white/60 max-w-md">
                企画から公開までを一本の流れで進めます。必要に応じて撮影・原稿・保守もまとめて設計できます。
              </p>
            </div>
          </Reveal>

          <div>
            {detail.process.map((step, index) => (
              <Reveal key={step.no} delay={index * 70}>
                <div className="service-flow-row">
                  <span>{step.no}</span>
                  <div>
                    <p>{step.title}</p>
                    <h3>{step.desc}</h3>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-20 py-20 md:py-28 bg-[#f7f7f4]">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-start">
          <Reveal>
            <div>
              <p className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-text-sub mb-5">Deliverables</p>
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight">制作範囲</h2>
            </div>
          </Reveal>
          <div className="service-deliverables">
            {detail.deliverables.map((item, index) => (
              <Reveal key={item} delay={index * 50}>
                <div className="service-deliverable">
                  <Check className="w-5 h-5" />
                  <span>{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="works" className="service-related-works px-6 md:px-20 py-24 md:py-36 bg-black-main text-white-main scroll-mt-24">
        <div className="max-w-[1600px] mx-auto">
          <Reveal className="mb-14 md:mb-20">
            <p className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-5">Other Works</p>
            <h2 className="text-3xl md:text-6xl font-medium tracking-tight">関連する実績</h2>
          </Reveal>

          <div className="service-work-grid">
            {relatedWorks.map((work, index) => (
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

      <section id="media" className="px-6 md:px-20 py-24 md:py-36 bg-white-main scroll-mt-24">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[0.6fr_1fr] gap-12 lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-32">
              <p className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-text-sub mb-5">Media</p>
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6">関連情報</h2>
              <p className="text-text-sub font-light leading-relaxed max-w-sm">
                制作前の検討や、公開後の改善に役立つ情報をまとめています。
              </p>
            </div>
          </Reveal>

          <div className="service-media-list">
            {detail.articles.map((article, index) => (
              <Reveal key={article.title} delay={index * 80}>
                <Link href={article.href} className="service-media-card">
                  <div className="service-media-card__image">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 38vw, 18vw"
                    />
                  </div>
                  <div className="service-media-card__body">
                    <p>{article.category} / {article.date}</p>
                    <h3>{article.title}</h3>
                  </div>
                  <ArrowUpRight className="w-5 h-5 shrink-0" />
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
                <p className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-4">Next Services</p>
                <h2 className="text-3xl md:text-5xl font-medium tracking-tight">ほかのサービスも見る</h2>
              </div>
              <div className="service-next-links">
                {relatedServices.map((item) => (
                  <Link key={item.slug} href={`/services/${item.slug}`} className="service-next-link">
                    <span>{item.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
