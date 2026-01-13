export type ServiceItem = {
  id: number | string;
  slug: string;        // URL (例: /services/photography)
  title: string;
  desc: string;
  videoSrc: string;
  posterSrc: string;
  hasPlay: boolean;
};

export const SERVICES_DATA: ServiceItem[] = [
  { 
    id: '1',
    slug: 'photography',
    title: 'Photography', 
    desc: 'ポートレート、建築、プロダクト撮影まで。光と構図を操り、被写体の持つ本来の魅力を最大限に引き出します。',
    videoSrc: '/video/photo_image.mp4',
    posterSrc: 'https://images.unsplash.com/photo-1542038784424-48ed7461330d?q=80&w=1600&auto=format&fit=crop',
    hasPlay: false 
  },
  { 
    id: '2',
    slug: 'videography',
    title: 'Videography', 
    desc: 'シネマティックな映像表現で、ブランドの物語を紡ぎます。企画、撮影、編集、グレーディングまで一貫して対応可能です。',
    videoSrc: '/video/video_editing_image.mp4', 
    posterSrc: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1600&auto=format&fit=crop',
    hasPlay: true 
  },
  { 
    id: '3',
    slug: 'ui-ux-design',
    title: 'UI/UX Design', 
    desc: '美しさと機能性を兼ね備えたインターフェースデザイン。ユーザー体験を第一に考え、直感的で洗練されたデザインを提供します。',
    videoSrc: '/video/uiux-img.mp4',
    posterSrc: 'https://images.unsplash.com/photo-1586717791821-3f44a5638d0f?q=80&w=1600&auto=format&fit=crop',
    hasPlay: false 
  },
  { 
    id: '4',
    slug: 'engineering',
    title: 'Engineering', 
    desc: 'デザインを忠実に再現し、パフォーマンスの高いWebサイトを構築。モダンな技術スタック(React/Next.js)を用いた実装が得意です。',
    videoSrc: '/video/ec-img.mp4',
    posterSrc: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1600&auto=format&fit=crop',
    hasPlay: false 
  },
];