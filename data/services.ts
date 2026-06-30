export type ServiceItem = {
  id: number | string;
  slug: string;        // URL (例: /services/photography)
  title: string;
  desc: string;
  videoSrc: string;
  posterSrc: string;
  hasPlay: boolean;
  detail?: ServiceDetail;
};

export type ServiceDetail = {
  titleJa: string;
  heroLead: string;
  heroImage: string;
  overview: string;
  stats: {
    label: string;
    value: string;
  }[];
  features: {
    title: string;
    desc: string;
    image: string;
    label: string;
    href?: string;
    reverse?: boolean;
  }[];
  process: {
    no: string;
    title: string;
    desc: string;
  }[];
  deliverables: string[];
  articles: {
    title: string;
    category: string;
    date: string;
    image: string;
    href: string;
  }[];
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: '1',
    slug: 'web-design',
    title: 'Web Design',
    desc: '企業の「顔」となるコーポレートサイトやランディングページを、戦略設計から制作・実装まで一貫して。ブランドの世界観を、成果につながる体験へと落とし込みます。',
    videoSrc: '/video/uiux-img2.mp4',
    posterSrc: '/video/EC_img.jpg',
    hasPlay: false,
    detail: {
      titleJa: 'ウェブデザイン',
      heroLead: '伝えたい価値を、成果につながるWeb体験へ。企画・情報設計・UIデザイン・実装・公開後の改善まで、ひとつの流れで伴走します。',
      heroImage: '/video/EC_img.jpg',
      overview: 'コーポレートサイト、サービスサイト、ランディングページ、キャンペーンページまで。事業の目的やユーザー導線を整理し、見た目だけで終わらないWebサイトを設計します。ブランドのらしさを視覚化しながら、更新しやすく、運用しやすい形で構築します。',
      stats: [
        { label: 'Scope', value: 'Strategy / UI / Build' },
        { label: 'Output', value: 'Corporate / LP / CMS' },
        { label: 'Support', value: 'Launch + Growth' },
      ],
      features: [
        {
          title: 'Webデザイン',
          desc: '課題の整理からサイトマップ、ワイヤーフレーム、画面設計、ビジュアルデザインまで。サービスの魅力が伝わる構造をつくり、迷わず行動できる導線に落とし込みます。',
          image: '/video/EC_img.jpg',
          label: 'Corporate / Service Site',
          href: '/#work',
        },
        {
          title: 'キャンペーンサイト・LP',
          desc: '短期施策や広告流入に合わせたページを設計します。ファーストビュー、訴求順、CTA、フォーム導線まで、目的に対して必要な要素を絞り込みます。',
          image: '/video/EC-poster.jpg',
          label: 'Landing Page',
          href: '/pricing',
          reverse: true,
        },
        {
          title: 'バナー・運用クリエイティブ',
          desc: '公開後の改善や広告配信に必要なバナー、KV、SNS素材も制作します。サイト本体とトーンを揃え、継続的な運用でもブランドが崩れない状態を保ちます。',
          image: '/images/root/hero-img.jpg',
          label: 'Creative Assets',
        },
      ],
      process: [
        {
          no: '01',
          title: 'Discovery',
          desc: '事業の目的、ターゲット、既存サイトの課題、必要な機能を整理し、制作の優先順位を決めます。',
        },
        {
          no: '02',
          title: 'Structure',
          desc: 'サイトマップとワイヤーフレームを作成し、情報の流れ、CTA、更新しやすいページ構成を設計します。',
        },
        {
          no: '03',
          title: 'Design / Build',
          desc: 'ブランドの印象を整えながらUIを制作し、Next.jsやCMS連携など目的に合う実装へ進めます。',
        },
        {
          no: '04',
          title: 'Launch / Improve',
          desc: '公開前チェック、速度・SEO・レスポンシブ確認を行い、公開後の更新や改善も継続して支援します。',
        },
      ],
      deliverables: [
        'サイト構成・導線設計',
        'ワイヤーフレーム',
        'PC / SP UIデザイン',
        'レスポンシブ実装',
        'CMS・フォーム連携',
        '公開後の改善提案',
      ],
      articles: [
        {
          title: 'Webサイト制作を依頼する前に整理したい6つのこと',
          category: 'Knowledge',
          date: '2026.06.30',
          image: '/video/EC-poster.jpg',
          href: '/about#faq',
        },
        {
          title: 'コーポレートサイトで問い合わせにつなげる情報設計',
          category: 'Planning',
          date: '2026.06.30',
          image: '/video/EC_img.jpg',
          href: '/pricing',
        },
        {
          title: '公開後に育てるWeb運用とメンテナンスの考え方',
          category: 'Growth',
          date: '2026.06.30',
          image: '/images/root/tiam-pv-thumbnail.JPG',
          href: '/services/maintenance',
        },
      ],
    },
  },
  {
    id: '2',
    slug: 'e-commerce',
    title: 'E-Commerce',
    desc: 'ShopifyをはじめとするECサイトの構築・改善。「売れる」導線と、運用しやすい仕組みを両立し、オンラインでの売上づくりを支えます。',
    videoSrc: '/video/ec-img2.mp4',
    posterSrc: '/video/EC-poster.jpg',
    hasPlay: false
  },
  {
    id: '3',
    slug: 'maintenance',
    title: 'Maintenance',
    desc: '公開して終わり、ではありません。更新代行、改善、セキュリティ対応まで。サイトを継続的に育てる運用・保守で、公開後の成長に伴走します。',
    videoSrc: '/video/video_editing_image.mp4',
    posterSrc: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop',
    hasPlay: false
  },
  {
    id: '4',
    slug: 'creative',
    title: 'Creative',
    desc: '写真・映像・グラフィック。サイトに載せる素材そのものを内製できるのが私たちの強みです。一貫した世界観で、ブランドの魅力を最大限に引き出します。',
    videoSrc: '/video/photo_image.mp4',
    posterSrc: 'https://images.unsplash.com/photo-1542038784424-48ed7461330d?q=80&w=1600&auto=format&fit=crop',
    hasPlay: true
  },
];
