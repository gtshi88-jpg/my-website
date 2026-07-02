import type { Metadata } from 'next';
import LegalLayout from '@/components/LegalLayout';
import { COMPANY, LEGAL_UPDATED } from '@/data/company';

export const metadata: Metadata = {
  title: `特定商取引法に基づく表記 | ${COMPANY.name}`,
  description: `${COMPANY.name}の特定商取引法に基づく表記です。`,
};

export default function LegalPage() {
  const rows: { label: string; value: React.ReactNode }[] = [
    { label: '販売事業者', value: `${COMPANY.name}（${COMPANY.nameJa}）` },
    { label: '運営責任者', value: COMPANY.representative },
    { label: '所在地', value: COMPANY.location },
    { label: '電話番号', value: COMPANY.phone },
    { label: 'メールアドレス', value: <a href={`mailto:${COMPANY.email}`} className="border-b border-white/30 hover:border-white transition-colors">{COMPANY.email}</a> },
    { label: '営業時間', value: COMPANY.businessHours },
    { label: '販売価格', value: '各サービスページ・お見積りにて表示する金額（税別表記の場合は別途消費税を申し受けます）。' },
    { label: '代金以外の必要料金', value: 'ドメイン取得費・サーバー利用料・有料素材費など、別途必要となる実費。お見積り時にご案内します。' },
    { label: 'お支払い方法', value: '銀行振込（請求書を発行いたします）。' },
    { label: 'お支払い時期', value: '原則として、着手時に着手金、納品時に残額をお支払いいただきます（個別契約により定めます）。' },
    { label: 'サービス提供時期', value: 'ご契約後、別途打ち合わせの上で定める納期に従い提供します。' },
    {
      label: 'キャンセル・返品について',
      value:
        '本サービスは個別の受託制作のため、制作着手後のキャンセルは原則お受けできません。やむを得ない事情がある場合は、それまでの作業内容に応じた費用を申し受けます。',
    },
  ];

  return (
    <LegalLayout title="Legal Notice" titleJa="特定商取引法に基づく表記" updated={LEGAL_UPDATED}>
      <p className="text-base md:text-lg font-light leading-relaxed text-white/60 mb-10">
        特定商取引法第11条に基づき、以下のとおり表示します。
      </p>
      <dl className="divide-y divide-white/10 border-t border-white/10">
        {rows.map((row) => (
          <div key={row.label} className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-8 py-6">
            <dt className="text-sm font-bold tracking-wide text-white/50">{row.label}</dt>
            <dd className="md:col-span-3 text-base md:text-lg font-light leading-relaxed">{row.value}</dd>
          </div>
        ))}
      </dl>
    </LegalLayout>
  );
}
