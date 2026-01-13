import { SERVICES_DATA } from '@/data/services';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// URLパラメータからスラッグを受け取るための型定義
type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ServiceDetailPage({ params }: Props) {
  
  const { slug } = await params;
  
  // スラッグに一致するデータを探す
  const service = SERVICES_DATA.find((item) => item.slug === slug);

  // データが見つからない場合は404ページへ
  if (!service) {
    return notFound();
  }

  // --- 以下、LPのレイアウト (自由にデザインを作り込めます) ---
  return (
    <main className="bg-white min-h-screen text-black pb-20">
      {/* 簡易ヘッダー */}
      <nav className="p-6 fixed top-0 w-full z-50 mix-blend-difference text-white">
        <Link href="/#services" className="flex items-center gap-2 hover:opacity-70 transition-opacity font-bold tracking-widest">
          <ArrowLeft className="w-5 h-5" />
          BACK TO HOME
        </Link>
      </nav>

      {/* ヒーローセクション */}
      <header className="h-[70vh] relative flex items-center justify-center overflow-hidden">
         <Image 
            src={service.posterSrc} 
            alt={service.title} 
            fill 
            className="object-cover brightness-50"
         />
         <h1 className="relative z-10 text-5xl md:text-8xl text-white font-bold tracking-tighter">
            {service.title}
         </h1>
      </header>

      {/* コンテンツエリア */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-bold mb-6">Overview</h2>
        <p className="text-lg leading-relaxed text-gray-700 mb-12">
          {/* ここに詳細な説明文が入ります。現状はdescを表示 */}
          {service.desc}
          <br /><br />
          このページは「{service.title}」のLP詳細ページです。<br />
          ここには料金表、撮影の流れ、過去の事例ギャラリー、FAQなどを自由に配置できます。
        </p>

        {/* プレースホルダーセクション */}
        <div className="bg-gray-100 p-12 text-center rounded-lg">
           <p className="text-gray-500">ここに詳細コンテンツ（プラン、実績、フローなど）を追加</p>
        </div>
      </div>
    </main>
  );
}