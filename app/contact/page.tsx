import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Reveal from '@/components/ui/Reveal';
import ContactForm from '@/components/contact/ContactForm';
import { COMPANY } from '@/data/company';

export const metadata: Metadata = {
  title: `Contact | ${COMPANY.name}`,
  description: `${COMPANY.name}へのお仕事のご依頼・ご相談はこちらから。必要事項をご入力の上、お気軽にお問い合わせください。`,
};

export default function ContactPage() {
  return (
    <main className="bg-white-main text-text-main">
      <SiteHeader theme="dark" />

      {/* HERO */}
      <section className="bg-black-main text-white-main px-6 md:px-20 pt-36 md:pt-44 pb-20 md:pb-28">
        <div className="max-w-[1100px] mx-auto">
          <Reveal>
            <nav className="flex items-center gap-2 text-xs md:text-sm font-medium tracking-wide text-white/50 mb-16 md:mb-24">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white/80">お問い合わせ</span>
            </nav>
          </Reveal>

          <Reveal delay={80}>
            <p className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-6">Contact</p>
          </Reveal>
          <Reveal delay={140}>
            <h1 className="text-4xl md:text-7xl font-medium leading-[1.05] tracking-tight">
              お仕事のご依頼
            </h1>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-10 md:mt-14 text-base md:text-lg font-light leading-relaxed text-white/60 max-w-2xl">
              制作に関するご依頼や各種ご相談について、必要事項をご入力の上、お気軽にお問い合わせください。2〜3営業日以内に、担当よりメールにてご返信いたします。
            </p>
          </Reveal>
        </div>
      </section>

      {/* FORM */}
      <section className="px-6 md:px-20 py-20 md:py-28">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Side info */}
            <aside className="lg:col-span-4">
              <Reveal>
                <div className="lg:sticky lg:top-32 space-y-10">
                  <div>
                    <p className="text-xs font-bold tracking-[0.2em] uppercase text-text-sub mb-3">Email</p>
                    <a
                      href={`mailto:${COMPANY.email}`}
                      className="text-base md:text-lg font-light tracking-tight border-b border-black/20 hover:border-black transition-colors pb-0.5 break-all"
                    >
                      {COMPANY.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-[0.2em] uppercase text-text-sub mb-3">Business Hours</p>
                    <p className="text-base text-text-main font-light">{COMPANY.businessHours}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-[0.2em] uppercase text-text-sub mb-3">Location</p>
                    <p className="text-base text-text-main font-light">{COMPANY.location}</p>
                  </div>
                  <p className="text-sm font-light leading-relaxed text-text-sub max-w-xs">
                    「何から始めればいいか分からない」段階でも大歓迎です。ご相談・お見積りは無料です。
                  </p>
                </div>
              </Reveal>
            </aside>

            {/* Form */}
            <div className="lg:col-span-8">
              <Reveal delay={120}>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
