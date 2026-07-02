import type { Metadata } from 'next';
import LegalLayout from '@/components/LegalLayout';
import { COMPANY, LEGAL_UPDATED } from '@/data/company';

export const metadata: Metadata = {
  title: `プライバシーポリシー | ${COMPANY.name}`,
  description: `${COMPANY.name}のプライバシーポリシー（個人情報の取り扱い）です。`,
};

const sections: { heading: string; body: React.ReactNode }[] = [
  {
    heading: '1. 個人情報の定義',
    body: (
      <p>
        個人情報とは、個人情報保護法にいう「個人情報」を指し、生存する個人に関する情報であって、氏名、メールアドレス等の記述により特定の個人を識別できる情報を指します。
      </p>
    ),
  },
  {
    heading: '2. 個人情報の収集方法',
    body: (
      <p>
        {COMPANY.name}（以下「当方」といいます）は、お問い合わせフォームやメールを通じて、お名前・会社名・メールアドレス・お問い合わせ内容などの個人情報をお伺いすることがあります。
      </p>
    ),
  },
  {
    heading: '3. 個人情報を収集・利用する目的',
    body: (
      <>
        <p>当方が個人情報を収集・利用する目的は、以下のとおりです。</p>
        <ul className="list-disc pl-6 space-y-1 mt-3">
          <li>お問い合わせやご依頼に対応するため</li>
          <li>お見積り・ご提案・各種ご連絡を行うため</li>
          <li>制作・運用業務を遂行するため</li>
          <li>サービス向上のための分析を行うため</li>
        </ul>
      </>
    ),
  },
  {
    heading: '4. 個人情報の第三者提供',
    body: (
      <p>
        当方は、法令に定める場合を除き、あらかじめご本人の同意を得ることなく、第三者に個人情報を提供することはありません。ただし、業務を委託する場合に、必要な範囲で取扱いを委託することがあります。
      </p>
    ),
  },
  {
    heading: '5. 個人情報の開示・訂正・削除',
    body: (
      <p>
        ご本人から個人情報の開示・訂正・削除のお求めがあった場合は、ご本人であることを確認の上、法令に従い遅滞なく対応いたします。お問い合わせは
        <a href={`mailto:${COMPANY.email}`} className="border-b border-white/30 hover:border-white transition-colors mx-1">{COMPANY.email}</a>
        までご連絡ください。
      </p>
    ),
  },
  {
    heading: '6. アクセス解析ツールについて',
    body: (
      <p>
        当サイトでは、サービス改善のためにアクセス解析ツールを利用する場合があります。これらはトラフィックデータの収集のためにCookieを使用することがありますが、個人を特定する情報は含みません。Cookieはブラウザの設定により無効にすることができます。
      </p>
    ),
  },
  {
    heading: '7. プライバシーポリシーの変更',
    body: (
      <p>
        本ポリシーの内容は、法令その他本ポリシーに別段の定めのある事項を除いて、ご利用者に通知することなく変更することができるものとします。変更後のプライバシーポリシーは、当サイトに掲載したときから効力を生じるものとします。
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" titleJa="プライバシーポリシー" updated={LEGAL_UPDATED}>
      <div className="space-y-10 md:space-y-12">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl md:text-2xl font-medium mb-4">{section.heading}</h2>
            <div className="text-base md:text-lg font-light leading-relaxed text-white/60 space-y-3">
              {section.body}
            </div>
          </section>
        ))}
      </div>
    </LegalLayout>
  );
}
