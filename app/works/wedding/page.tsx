'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Cormorant_Garamond, Montserrat } from 'next/font/google';
import { ArrowLeft, MoveRight } from 'lucide-react';

// ▼ データファイルのインポート（ID 1~30まで定義されている前提）
import { WEDDING_PHOTOS } from '@/data/works/wedding-jogashima';

// ▼ UIコンポーネント
import { RevealText } from '@/components/ui/RevealText';
import { ParallaxImage } from '@/components/ui/ParallaxImage';

// フォント設定
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['200', '400', '600'],
  variable: '--font-montserrat',
  display: 'swap',
});

export default function WeddingPage() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  // ヘッダーの出し入れ制御
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ▼ 修正: データがない場合はダミー画像のURLを返すように変更
  const getPhoto = (index: number) => {
    const photo = WEDDING_PHOTOS[index];
    if (!photo) {
      // データ不足時はダミー画像を表示してクラッシュを防ぐ
      return { 
        url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&auto=format&fit=crop", 
        alt: "Coming Soon" 
      };
    }
    return photo;
  };

  return (
    <main className={`min-h-screen bg-[#F5F5F0] text-[#1a1a1a] selection:bg-[#d4cfc7] selection:text-black overflow-x-hidden ${cormorant.variable} ${montserrat.variable} font-serif`}>
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 px-6 py-6 md:px-12 flex justify-between items-center transition-all duration-500 ${isHeaderVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'} mix-blend-difference text-white`}>
        <Link href="/#work" className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase hover:opacity-70 transition-opacity group font-sans">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/>
          <span>Back to Works</span>
        </Link>
        <div className="text-sm tracking-[0.2em] font-bold uppercase hidden md:block font-sans">Studio.M</div>
        <div className="w-8 md:hidden"></div>
      </nav>

      {/* Hero Section */}
      <header className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ParallaxImage 
            src={getPhoto(0).url} // ID:1
            alt="Hero Background" 
            speed={0.2}
            className="opacity-90 grayscale-[10%]"
            containerClass="w-full h-full"
          />
          <div className="absolute inset-0 bg-black/20 z-10" />
        </div>
        
        <div className="relative z-20 text-center text-white px-4 flex flex-col items-center">
          <RevealText delay={500} className="mb-6">
            <p className="text-xs md:text-sm tracking-[0.4em] uppercase font-sans">Jogashima, Kanagawa</p>
          </RevealText>
          <RevealText delay={700}>
            <h1 className="text-5xl md:text-8xl tracking-wider font-light mb-8 font-serif">
              Shuhei & Hana
            </h1>
          </RevealText>
          <RevealText delay={900}>
            <p className="text-xs tracking-[0.2em] uppercase opacity-80 font-sans">2025.11.22</p>
          </RevealText>
        </div>
      </header>

      {/* Introduction */}
      <section className="py-24 md:py-32 px-6 md:px-20 max-w-4xl mx-auto text-center md:text-left">
        <RevealText>
            <p className="text-lg md:text-2xl leading-relaxed font-light text-gray-800 font-serif">
              「好きなもの」が似ている二人。<br/>
              そんなシンプルな理由が、<br className="md:hidden"/>一生を共にする理由になる。
            </p>
            <p className="mt-8 text-sm text-gray-500 leading-8 text-justify md:text-left font-sans">
              城ヶ島の荒々しい岩肌と、どこまでも続く水平線。美容師の新郎様と、ラグジュアリーブランド勤務の新婦様。
              美意識を共有し、アニメやスノーボードという共通の趣味で笑い合う。
              お二人の「洗練された美しさ」と「飾らない素顔」が交差する一日を記録しました。
            </p>
        </RevealText>
      </section>

      {/* Act 1: The Couple (Stylish) */}
      <section className="px-4 md:px-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="mt-0 md:mt-24">
            <ParallaxImage src={getPhoto(2).url} alt="Groom" containerClass="aspect-[3/4] w-full" speed={0.06} />
            <p className="text-xs text-gray-400 mt-4 tracking-widest uppercase text-right md:text-left font-sans">Shuhei</p>
          </div>
          <div className="mb-0 md:mb-24">
            <ParallaxImage src={getPhoto(3).url} alt="Bride" containerClass="aspect-[3/4] w-full" speed={0.03} />
            <p className="text-xs text-gray-400 mt-4 tracking-widest uppercase text-right font-sans">Hana</p>
          </div>
        </div>
      </section>

      {/* Act 2: Atmosphere (Masonry Grid) */}
      <section className="px-4 md:px-12 pb-32">
        <RevealText className="mb-12 text-center">
          <h3 className="text-2xl font-light italic font-serif">"Details & Texture"</h3>
        </RevealText>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {/* Column 1 */}
          <div className="space-y-4 md:space-y-8">
            <ParallaxImage src={getPhoto(5).url} alt="Detail" containerClass="aspect-[4/5] w-full" speed={0.02} />
            <ParallaxImage src={getPhoto(6).url} alt="Detail" containerClass="aspect-video w-full" speed={0.04} />
          </div>
          {/* Column 2 (Offset on Desktop) */}
          <div className="space-y-4 md:space-y-8 md:pt-16">
            <ParallaxImage src={getPhoto(7).url} alt="Detail" containerClass="aspect-[3/4] w-full" speed={0.01} />
            <ParallaxImage src={getPhoto(8).url} alt="Detail" containerClass="aspect-square w-full" speed={0.05} />
          </div>
          {/* Column 3 */}
          <div className="col-span-2 md:col-span-1 space-y-4 md:space-y-8">
            <ParallaxImage src={getPhoto(9).url} alt="Detail" containerClass="aspect-square w-full" speed={0.03} />
            <ParallaxImage src={getPhoto(10).url} alt="Detail" containerClass="aspect-[3/4] w-full" speed={0.06} />
          </div>
        </div>
      </section>

      {/* Act 3: Full Width Break (Cinema) */}
      <section className="w-full pb-32">
        <div className="relative w-full h-[50vh] md:h-[80vh] overflow-hidden">
          <ParallaxImage 
            src={getPhoto(4).url} 
            alt="Wide shot" 
            containerClass="w-full h-full" 
            speed={0.1} 
          />
          <div className="absolute bottom-8 left-8 text-white mix-blend-difference z-10">
            <p className="text-xs tracking-[0.3em] uppercase font-sans">Cinema Scope</p>
          </div>
        </div>
      </section>

      {/* Act 4: Playful & Real */}
      <section className="px-4 md:px-24 pb-32">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/3 order-2 md:order-1">
            <RevealText>
                <h3 className="text-3xl mb-6 font-serif">Unscripted</h3>
                <p className="text-sm text-gray-500 leading-7 text-justify font-sans">
                  カメラを忘れて笑い合う瞬間。<br/>
                  クールな表情の裏側にある、少年少女のような無邪気さ。<br/>
                  それがお二人の本当の魅力。
                </p>
            </RevealText>
          </div>
          <div className="w-full md:w-2/3 grid grid-cols-2 gap-4 order-1 md:order-2">
            <ParallaxImage src={getPhoto(11).url} alt="Laugh" containerClass="aspect-[3/4] w-full" speed={0.02} />
            <div className="space-y-4 md:pt-12">
              <ParallaxImage src={getPhoto(12).url} alt="Back" containerClass="aspect-square w-full" speed={0.04} />
              <ParallaxImage src={getPhoto(13).url} alt="Play" containerClass="aspect-[4/3] w-full" speed={0.01} />
            </div>
          </div>
        </div>
      </section>

      {/* Act 5: Monochrome Mood */}
      <section className="bg-[#1a1a1a] text-gray-300 py-32 px-4 md:px-12 -mx-0">
        <div className="max-w-6xl mx-auto">
            <RevealText className="text-center mb-16">
              <span className="text-xs tracking-[0.4em] uppercase text-gray-500 font-sans">Monochrome</span>
            </RevealText>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <ParallaxImage src={getPhoto(15).url} alt="Mono 1" containerClass="aspect-square w-full grayscale opacity-90" speed={0.03} />
              <ParallaxImage src={getPhoto(16).url} alt="Mono 2" containerClass="aspect-[3/4] w-full grayscale md:scale-110 z-10 my-8 md:my-0" speed={0} />
              <ParallaxImage src={getPhoto(17).url} alt="Mono 3" containerClass="aspect-square w-full grayscale opacity-90" speed={0.03} />
            </div>
        </div>
      </section>

      
      {/* Outro (ID 29) */}
      <section className="h-screen flex items-center justify-center px-6 relative overflow-hidden">
        <div className="text-center z-10">
            <div className="w-16 h-[1px] bg-black/20 mx-auto mb-8"></div>
            <RevealText>
              <p className="text-2xl md:text-3xl font-light mb-8 font-serif">
                末長く、お幸せに。
              </p>
              <p className="text-xs tracking-[0.2em] text-gray-500 uppercase font-sans">
                November 22, 2024<br/>Keisuke & Yurika
              </p>
            </RevealText>
        </div>
        {/* Background fade out */}
        <div className="absolute inset-0 -z-10 opacity-20">
            <Image 
              src={getPhoto(29).url} 
              alt="End"
              fill
              className="object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#F5F5F0] via-[#F5F5F0]/80 to-transparent"></div>
        </div>
      </section>

      {/* Footer / Next Navigation */}
      <footer className="bg-white border-t border-gray-100 py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <h3 className="text-xs tracking-[0.2em] uppercase text-gray-400 font-sans">Next Project</h3>
          <Link href="/works/next-project" className="block group">
              <span className="text-3xl md:text-4xl font-light group-hover:opacity-50 transition-opacity font-serif">
                Urban Night Wedding
              </span>
              <div className="mt-2 flex justify-center text-gray-300 group-hover:translate-x-2 transition-transform duration-300">
                <MoveRight size={24} />
              </div>
          </Link>
            
          <div className="pt-16 flex justify-center gap-8 text-[10px] tracking-widest uppercase text-gray-400 font-sans">
            <Link href="#" className="hover:text-black transition-colors">Back to Top</Link>
            <Link href="/#work" className="hover:text-black transition-colors">All Works</Link>
          </div>
            
          <p className="text-[10px] text-gray-300 tracking-widest mt-8 font-sans">&copy; 2024 Studio.M Portfolio</p>
        </div>
      </footer>
    </main>
  );
}