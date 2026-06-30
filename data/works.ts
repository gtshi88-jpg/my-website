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
  {
    id: '3',
    url: '/#contact',
    category: 'web',
    title: 'Corporate Website Renewal',
    subtitle: 'dummy-corporate-site',
    label: 'Web Engineering',
    image: '/video/EC_img.jpg'
  },
  {
    id: '4',
    url: '/#contact',
    category: 'ui',
    title: 'Commerce UI Prototype',
    subtitle: 'dummy-ui-system',
    label: 'UI Design',
    image: '/video/EC-poster.jpg'
  },
  {
    id: '5',
    url: '/#contact',
    category: 'photo',
    title: 'Editorial Portrait Series',
    subtitle: 'dummy-portrait-shoot',
    label: 'Photography',
    image: '/images/root/my-bio-img.jpg'
  },
  {
    id: '6',
    url: '/#contact',
    category: 'video',
    title: 'Brand Motion Reel',
    subtitle: 'dummy-brand-film',
    label: 'Videography',
    image: '/video/hero-img.jpg'
  },
  {
    id: '7',
    url: '/#contact',
    category: 'web',
    title: 'E-Commerce Launch Kit',
    subtitle: 'dummy-commerce-build',
    label: 'Web Engineering',
    image: '/video/EC-poster.jpg'
  },
  {
    id: '8',
    url: '/#contact',
    category: 'ui',
    title: 'Booking Experience Design',
    subtitle: 'dummy-product-design',
    label: 'UI Design',
    image: '/video/EC_img.jpg'
  },
];
