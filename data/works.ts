export type WorkCategory = 'photo' | 'video' | 'ui' | 'web';

export type WorkItem = {
  id: string;
  url: string;
  category: WorkCategory;
  title: string;
  subtitle: string;
  label: string;
  image: string;
};

export type WorkCategoryMeta = {
  id: WorkCategory;
  /** 目次・見出しの英語ラベル */
  labelEn: string;
  /** 見出しの日本語ラベル */
  labelJa: string;
  /** カテゴリの説明文 */
  desc: string;
};

/** Works ページの目次・セクション構成（表示順） */
export const WORK_CATEGORIES: WorkCategoryMeta[] = [
  {
    id: 'web',
    labelEn: 'Web Engineering',
    labelJa: 'Web制作',
    desc: 'コーポレート・ECサイトの設計から実装、公開後の運用まで。成果につながるWeb体験を構築します。',
  },
  {
    id: 'ui',
    labelEn: 'UI Design',
    labelJa: 'UIデザイン',
    desc: '使う人の流れに寄り添うインターフェース設計。プロトタイプから実装可能なデザインまで一貫して手がけます。',
  },
  {
    id: 'photo',
    labelEn: 'Photography',
    labelJa: '撮影',
    desc: '人・空間・商品の魅力を引き出すフォトグラフィ。ブランドの世界観に合わせた一枚をお届けします。',
  },
  {
    id: 'video',
    labelEn: 'Videography',
    labelJa: '映像',
    desc: 'プロモーションからブランドムービーまで。動きと音で物語を伝える映像表現を制作します。',
  },
];

export const WORKS_DATA: WorkItem[] = [
  {
    id: 'neew',
    url: 'https://neewinc.com/ja',
    category: 'web',
    title: 'neew Corporate Site',
    subtitle: 'neewinc.com',
    label: 'Web Engineering',
    image: '/images/works/neew-hero.png',
  },
  {
    id: 'galaxia',
    url: 'https://galaxia-app.com/ja/',
    category: 'web',
    title: 'GALAXIA',
    subtitle: 'galaxia-app.com',
    label: 'Web Engineering',
    image: '/images/works/galaxia-hero.png',
  },
  {
    id: '1',
    url: '/works/wedding', 
    category: 'photo',
    title: 'Wedding Photography',
    subtitle: 'wedding-jogashima',
    label: 'Photography',
    image: '/images/works/wedding-jogashima/01_hero.jpg'
  },
  {
    id: '2',
    url: 'https://www.instagram.com/p/DK6RLBAJ2Vf/',
    category: 'video',
    title: 'Clinic Promotion Video',
    subtitle: 'clinic-pv',
    label: 'videography',
    image: '/images/root/tiam-pv-thumbnail.JPG'
  },
];
