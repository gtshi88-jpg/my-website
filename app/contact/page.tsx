import type { Metadata } from 'next';
import Reveal from '@/components/ui/Reveal';
import PageShell from '@/components/PageShell';
import PageHero from '@/components/ui/PageHero';
import ContactForm from '@/components/contact/ContactForm';
import { COMPANY } from '@/data/company';

export const metadata: Metadata = {
  title: `Contact | ${COMPANY.name}`,
  description: `${COMPANY.name}へのお仕事のご依頼・ご相談はこちらから。必要事項をご入力の上、お気軽にお問い合わせください。`,
};

export default function ContactPage() {
  return (
    <PageShell>
      <PageHero
        crumb="お問い合わせ"
        kicker="Contact"
        title="お仕事のご依頼"
        lead="制作に関するご依頼や各種ご相談について、必要事項をご入力の上、お気軽にお問い合わせください。2〜3営業日以内に、担当よりメールにてご返信いたします。"
      />

      {/* FORM */}
      <section className="px-6 md:px-20 py-20 md:py-28">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Side info */}
            <aside className="lg:col-span-4">
              <Reveal>
                <div className="lg:sticky lg:top-32 space-y-10">
                  <div>
                    <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/50 mb-3">Email</p>
                    <a
                      href={`mailto:${COMPANY.email}`}
                      className="text-base md:text-lg font-light tracking-tight border-b border-white/30 hover:border-white transition-colors pb-0.5 break-all"
                    >
                      {COMPANY.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/50 mb-3">Business Hours</p>
                    <p className="text-base text-white-main font-light">{COMPANY.businessHours}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/50 mb-3">Location</p>
                    <p className="text-base text-white-main font-light">{COMPANY.location}</p>
                  </div>
                  <p className="text-sm font-light leading-relaxed text-white/60 max-w-xs">
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
    </PageShell>
  );
}
