export type PricingPlan = {
  id: string;
  name: string;        // 英語プラン名
  nameJa: string;      // 日本語プラン名
  price: string;       // 表示価格（税別・「〜」表記）
  unit?: string;       // 補助単位（例: /月）
  desc: string;
  features: string[];
  featured?: boolean;  // 強調表示
};

// ※ 価格はすべて「仮」です。実際の単価が決まり次第、ここを書き換えてください。
export const PRICING_DATA: PricingPlan[] = [
  {
    id: 'light',
    name: 'Light',
    nameJa: 'ランディングページ',
    price: '¥150,000',
    desc: '1ページ完結のLPや、数ページの小規模サイト。スピード重視で立ち上げたい方へ。',
    features: [
      'LP / 小規模サイト（〜3ページ）',
      'レスポンシブ対応',
      'お問い合わせフォーム',
      '公開サポート',
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    nameJa: 'コーポレートサイト',
    price: '¥400,000',
    desc: '本格的な企業サイト。ブランドの世界観をしっかり表現し、運用しやすい仕組みまで。',
    features: [
      'コーポレートサイト（〜10ページ目安）',
      'オリジナルデザイン',
      'CMS導入（更新可能）',
      'お問い合わせフォーム / SEO基本設定',
    ],
    featured: true,
  },
  {
    id: 'ec',
    name: 'E-Commerce',
    nameJa: 'ECサイト構築',
    price: '¥600,000',
    desc: 'Shopify等を用いたECサイトの構築。「売れる」導線づくりから運用サポートまで。',
    features: [
      'ECサイト構築（Shopify 等）',
      '決済・配送設定',
      '商品登録サポート',
      '特商法表記・運用レクチャー',
    ],
  },
];

export const MAINTENANCE_NOTE = {
  price: '¥10,000',
  unit: '/月',
  desc: '公開後の更新代行・改善・保守。月額の運用プランもご用意しています。',
};
