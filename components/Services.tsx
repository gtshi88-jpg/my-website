'use client';
import { ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';
import { SERVICES_DATA } from '@/data/services'; // データファイルからインポート

export default function Services() {
  const handleMouseEnter = () => document.body.classList.add('hovering');
  const handleMouseLeave = () => document.body.classList.remove('hovering');

  return (
    <section id="services" className="bg-white-main text-text-main relative border-t border-black/5">
      <div className="flex flex-col md:flex-row max-w-[1600px] mx-auto">
        <div className="w-full md:w-1/3 px-6 md:pl-20 py-20 md:py-0 md:h-screen md:sticky md:top-0 flex flex-col justify-center items-start z-10 bg-white-main">
          <h2 className="text-xs md:text-sm font-bold tracking-widest mb-6 uppercase text-text-sub">Services</h2>
          <h3 className="text-4xl md:text-6xl font-medium mb-8 leading-tight">What I Do</h3>
          <p className="text-text-sub text-base md:text-lg font-light leading-relaxed mb-10 max-w-sm">
            ビジュアル制作から実装まで、ワンストップで。<br />ブランドの核心を捉え、最適な表現手法で形にします。
          </p>
          <a href="#contact" className="group flex items-center gap-3 text-sm font-bold tracking-wide border-b border-black pb-1 hover:opacity-60 transition-opacity" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            START A PROJECT
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="w-full md:w-2/3 px-6 md:pr-20 pb-24 md:py-24 space-y-32 md:space-y-48">
          {SERVICES_DATA.map((service) => (
            <div key={service.id} className="scroll-trigger opacity-0 group" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              
              {/* ▼ 画像エリア全体をリンクで囲む & VIEW MOREオーバーレイを追加 */}
              <Link href={`/services/${service.slug}`} className="block relative w-full aspect-video bg-gray-100 overflow-hidden mb-8">
                <video 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                  poster={service.posterSrc}
                >
                    <source src={service.videoSrc} type="video/mp4" />
                </video>
                
                {service.hasPlay && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 text-white fill-white ml-1" />
                    </div>
                  </div>
                )}

                {/* ▼ ホバー時に表示される VIEW MORE オーバーレイ */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                  <span className="text-white text-lg tracking-[0.2em] font-light border-b border-white/50 pb-1">
                    VIEW MORE
                  </span>
                </div>
              </Link>
              
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 border-t border-black/10 pt-6">
                <h4 className="text-3xl md:text-4xl font-light">{service.title}</h4>
                <p className="text-text-sub font-light text-sm md:text-base md:w-1/2">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}