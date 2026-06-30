'use client';
import { ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';
import { SERVICES_DATA } from '@/data/services'; // データファイルからインポート
import DepthTilt from '@/components/ui/DepthTilt';
import LazyVideo from '@/components/ui/LazyVideo';

export default function Services() {
  const handleMouseEnter = () => document.body.classList.add('hovering');
  const handleMouseLeave = () => document.body.classList.remove('hovering');

  return (
    <section id="services" className="services-section section-scene text-white-main relative border-t border-white/10 overflow-hidden" data-section-theme="dark">
      <div className="section-depth-map" aria-hidden="true"></div>
      <div className="flex flex-col md:flex-row max-w-[1600px] mx-auto">
        <div className="section-copy-panel w-full md:w-1/3 px-6 md:pl-20 py-20 md:py-0 md:h-screen md:sticky md:top-0 flex flex-col justify-center items-start z-10">
          <h2 className="text-xs md:text-sm font-bold tracking-widest mb-6 uppercase text-white/50">Services</h2>
          <h3 className="text-4xl md:text-6xl font-medium mb-8 leading-tight">What We Do</h3>
          <p className="text-white/60 text-base md:text-lg font-light leading-relaxed mb-10 max-w-sm">
            サイト制作から運用、撮影まで。ワンストップで、事業の成長に伴走します。<br />ブランドの核心を捉え、最適な形へと落とし込みます。
          </p>
          <a href="#contact" className="group flex items-center gap-3 text-sm font-bold tracking-wide border-b border-white pb-1 hover:opacity-60 transition-opacity" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            START A PROJECT
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <div className="service-meta-grid" aria-hidden="true">
            <span>01</span>
            <span>Strategy</span>
            <span>02</span>
            <span>Build</span>
            <span>03</span>
            <span>Growth</span>
          </div>
        </div>

        <div className="w-full md:w-2/3 px-6 md:pr-20 pb-24 md:py-24 space-y-32 md:space-y-48">
          {SERVICES_DATA.map((service, index) => (
            <div key={service.id} className="scroll-trigger opacity-0 group section-lift-item" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              
              <Link
                href={`/services/${service.slug}`}
                className="service-visual-link block mb-8"
                aria-label={`${service.title}の詳細を見る`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <DepthTilt className="service-visual">
                  <div className="depth-card-surface relative w-full aspect-video bg-white/5 overflow-hidden">
                    <LazyVideo
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      src={service.videoSrc}
                      poster={service.posterSrc}
                    />
                    <div className="work-card-shine" aria-hidden="true"></div>
                    <div className="service-index text-white/80">
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    {service.hasPlay && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <Play className="w-6 h-6 text-white fill-white ml-1" />
                        </div>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500 z-20">
                      <span className="text-white text-lg tracking-[0.2em] font-light border-b border-white/50 pb-1">
                        VIEW MORE
                      </span>
                    </div>
                  </div>
                </DepthTilt>
              </Link>
              
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 border-t border-white/10 pt-6">
                <h4 className="text-3xl md:text-4xl font-light">{service.title}</h4>
                <p className="text-white/60 font-light text-sm md:text-base md:w-1/2">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
