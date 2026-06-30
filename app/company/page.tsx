import type { Metadata } from 'next';
import LegalLayout from '@/components/LegalLayout';
import { COMPANY } from '@/data/company';

export const metadata: Metadata = {
  title: `会社概要 | ${COMPANY.name}`,
  description: `${COMPANY.name}の会社概要です。`,
};

export default function CompanyPage() {
  const rows: { label: string; value: React.ReactNode }[] = [
    { label: '屋号 / 名称', value: `${COMPANY.name}（${COMPANY.nameJa}）` },
    { label: '代表者', value: COMPANY.representative },
    { label: '設立', value: COMPANY.established },
    { label: '所在地', value: COMPANY.location },
    { label: 'お問い合わせ', value: <a href={`mailto:${COMPANY.email}`} className="border-b border-black/20 hover:border-black transition-colors">{COMPANY.email}</a> },
    { label: '営業時間', value: COMPANY.businessHours },
    {
      label: '事業内容',
      value: (
        <ul className="space-y-1">
          {COMPANY.business.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <LegalLayout title="Company" titleJa="会社概要">
      <dl className="divide-y divide-black/10 border-t border-black/10">
        {rows.map((row) => (
          <div key={row.label} className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-8 py-6">
            <dt className="text-sm font-bold tracking-wide text-text-sub">{row.label}</dt>
            <dd className="md:col-span-3 text-base md:text-lg font-light leading-relaxed">{row.value}</dd>
          </div>
        ))}
      </dl>
    </LegalLayout>
  );
}
