export type WorkItem = {
  id: string;
  url: string; 
  category: 'photo' | 'video' | 'ui' | 'web';
  title: string;
  subtitle: string;
  label: string;
  image: string;
};

export const WORKS_DATA: WorkItem[] = [
  {
    id: '1',
    // ここでディレクトリ構造と一致するパスを直接指定します
    url: '/works/wedding', 
    category: 'photo',
    title: 'Wedding Photography',
    subtitle: 'wedding-jogashima',
    label: 'Photography',
    image: '/images/works/wedding-jogashima/01_hero.jpg'
  },
  {
    id: '2',
    url: 'https://www.instagram.com/p/DK6RLBAJ2Vf/', // ← フォルダ名と一致させる
    category: 'ui',
    title: 'Fintech Wallet',
    subtitle: 'Mobile App Redesign',
    label: 'UI/UX Design',
    image: '/images/root/tiam-pv-thumbnail.JPG'
  },
  // ... 他のアイテムも同様に修正
];