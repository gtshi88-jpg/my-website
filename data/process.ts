export type ProcessStep = {
  no: string;
  title: string;       // 英語見出し
  titleJa: string;     // 日本語見出し
  desc: string;
};

export const PROCESS_DATA: ProcessStep[] = [
  {
    no: '01',
    title: 'Hearing',
    titleJa: 'ヒアリング',
    desc: 'まずはご要望・課題・目標をじっくり伺います。事業の背景まで理解した上で、本当に必要なものをご提案します。',
  },
  {
    no: '02',
    title: 'Strategy & Estimate',
    titleJa: '設計・お見積り',
    desc: 'サイト構成や要件を整理し、最適なプランとお見積りをご提示。ご納得いただいてから制作に入ります。',
  },
  {
    no: '03',
    title: 'Design & Build',
    titleJa: '制作',
    desc: 'デザインから実装まで一気通貫で。途中経過を共有しながら進めるので、認識のズレなく形にしていきます。',
  },
  {
    no: '04',
    title: 'Launch',
    titleJa: '公開',
    desc: '最終確認と各種設定を経て公開。ドメイン取得やサーバー周りの設定も含め、まるごとお任せいただけます。',
  },
  {
    no: '05',
    title: 'Growth',
    titleJa: '運用・保守',
    desc: '公開して終わりではありません。更新代行・改善・保守で、サイトを継続的に育てながら成長に伴走します。',
  },
];
