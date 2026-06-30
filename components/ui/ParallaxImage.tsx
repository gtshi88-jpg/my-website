'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// パララックスイメージ
export const ParallaxImage = ({ 
  src, 
  alt, 
  speed = 0.05, 
  className = "", 
  containerClass = "" 
}: {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
  containerClass?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [offset, setOffset] = useState(0);

  // パララックスイメージが画面に入った時
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0 });
    
    if (ref.current) observer.observe(ref.current);
    
    // スクロールした時
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrollProgress = rect.top - window.innerHeight;
      setOffset(scrollProgress * speed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  // パララックスイメージを返す
  return (
    <div ref={ref} className={`relative overflow-hidden ${containerClass}`}>
      <div className={`absolute inset-0 bg-[#F5F5F0] z-20 transition-transform duration-[1.2s] ease-[cubic-bezier(0.76,0,0.24,1)] origin-bottom ${isVisible ? 'scale-y-0' : 'scale-y-100'}`} />
      <div className="w-full h-full overflow-hidden relative">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`object-cover transition-transform duration-700 ease-out will-change-transform ${className}`}
          style={{ transform: `translateY(${offset}px) scale(1.15)` }}
          priority={containerClass.includes('h-screen')}
        />
      </div>
    </div>
  );
};