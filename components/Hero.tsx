'use client';
import { ArrowDown } from 'lucide-react';

export default function Hero({ isLoading }: { isLoading: boolean }) {
  return (
    <header className="h-screen flex flex-col justify-center px-6 md:px-20 pt-20 relative overflow-hidden">
      <video className="absolute top-0 left-0 w-full h-full object-cover z-0" autoPlay muted loop playsInline poster="/root/hero-img.jpg">
        <source src="/video/hero-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/20 z-0"></div>

      <div className="relative z-10 max-w-7xl w-full mx-auto text-white">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-semibold leading-tight mb-8 tracking-tighter mix-blend-overlay">
          <div className="reveal-text reveal-text-init"><span>DIGITAL</span></div>
          <div className="reveal-text reveal-text-init"><span>CRAFTSMAN</span></div>
        </h1>
        
        <div className={`flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mt-12 border-t border-white/30 pt-8 transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100 animate-fade-in-up'}`} style={{ animationDelay: '1s' }}>
          <div className="max-w-lg">
            <p className="text-base md:text-lg text-white/90 font-light leading-relaxed drop-shadow-md">
              I am a Photographer, Videographer, UI Designer, and Web Engineer based in Japan.
              <br className="hidden md:block" />
              <span className="text-white mt-3 block font-normal">
                写真、映像、デザイン、そしてコード。多角的な視点でデジタル体験を構築します。
              </span>
            </p>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-sm text-white/80 mb-2">SCROLL TO EXPLORE</p>
            <ArrowDown className="w-6 h-6 ml-auto text-white animate-bounce" />
          </div>
        </div>
      </div>
    </header>
  );
}