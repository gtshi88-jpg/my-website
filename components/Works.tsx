'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { WORKS_DATA } from '@/data/works';
import DepthTilt from '@/components/ui/DepthTilt';

export default function Works() {
  const [activeFilter, setActiveFilter] = useState('all');
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const filteredWorks = useMemo(() => WORKS_DATA.filter(item => {
    return activeFilter === 'all' || item.category === activeFilter;
  }), [activeFilter]);

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;
    if (!section || !viewport || !track) return;

    let rafId = 0;

    const clamp = (value: number) => Math.min(1, Math.max(0, value));

    const setSectionHeight = () => {
      if (window.innerWidth < 768) {
        section.style.removeProperty('--works-scroll-length');
        track.style.transform = 'translate3d(0, 0, 0)';
        if (progress) progress.style.transform = 'scaleX(0)';
        return;
      }

      const distance = Math.max(0, track.scrollWidth - viewport.clientWidth);
      section.style.setProperty('--works-scroll-length', `${distance + window.innerHeight * 0.65}px`);
    };

    const update = () => {
      rafId = 0;

      if (window.innerWidth < 768) {
        track.style.transform = 'translate3d(0, 0, 0)';
        if (progress) progress.style.transform = 'scaleX(0)';
        return;
      }

      const sectionTop = section.offsetTop;
      const scrollable = Math.max(1, section.offsetHeight - window.innerHeight);
      const ratio = clamp((window.scrollY - sectionTop) / scrollable);
      const distance = Math.max(0, track.scrollWidth - viewport.clientWidth);

      track.style.transform = `translate3d(${-distance * ratio}px, 0, 0)`;
      if (progress) progress.style.transform = `scaleX(${ratio})`;
    };

    const requestUpdate = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(update);
    };

    const resize = () => {
      setSectionHeight();
      requestUpdate();
    };

    setSectionHeight();
    requestUpdate();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(track);
    resizeObserver.observe(viewport);

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', resize);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', resize);
    };
  }, [activeFilter, filteredWorks.length]);

  return (
    <section id="work" ref={sectionRef} className="works-flow-section section-scene text-white-main border-t border-white/10" data-section-theme="dark">
      <div className="works-flow-sticky">
        <div className="works-flow-layout max-w-[1600px] mx-auto">
          <aside className="works-flow-copy section-copy-panel scroll-trigger opacity-0">
            <p className="text-xs md:text-sm font-bold tracking-widest uppercase text-white/50 mb-6">Selected Work</p>
            <h2 className="text-5xl md:text-7xl font-medium text-white-main leading-none tracking-tight">
              Work that moves with the story.
            </h2>
            <p className="mt-8 text-white/60 text-base md:text-lg font-light leading-relaxed max-w-sm">
              実績の流れをスクロールに合わせて横方向へ展開します。視線は左の情報に残しながら、右側で制作物を連続的に見せる構成です。
            </p>

            <div className="works-filter-list">
            {['all', 'photo', 'video', 'ui', 'web'].map(filter => (
              <button 
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`works-filter-button ${activeFilter === filter ? 'is-active' : ''}`}
              >
                {filter === 'all' ? 'All' : filter === 'ui' ? 'UI Design' : filter.charAt(0).toUpperCase() + filter.slice(1) + (filter === 'photo' || filter === 'video' ? 'graphy' : filter === 'web' ? ' Engineering' : '')}
              </button>
            ))}
            </div>

            <div className="works-progress" aria-hidden="true">
              <span>{String(filteredWorks.length).padStart(2, '0')} PROJECTS</span>
              <div className="works-progress-track">
                <div ref={progressRef} className="works-progress-bar"></div>
              </div>
            </div>
          </aside>

          <div ref={viewportRef} className="works-flow-viewport">
            <div ref={trackRef} className="works-flow-track">
              {filteredWorks.map((work, index) => (
                <Link 
                  key={work.id} 
                  href={work.url} 
                  className="works-flow-item"
                >
                  <DepthTilt className="work-card section-lift-item group relative cursor-pointer animate-fade-in-up">
                    <article className="works-flow-card">
                      <div className="work-frame depth-card-surface w-full h-full overflow-hidden bg-gray-100 relative">
                        <Image 
                          src={work.image} 
                          alt={work.title} 
                          fill
                          className="work-card-img object-cover object-center"
                          sizes="(max-width: 768px) 100vw, 46vw"
                        />
                        <div className="work-card-chrome" aria-hidden="true"></div>
                        <div className="work-card-shine" aria-hidden="true"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-90 transition-opacity duration-300"></div>
                        
                        <div className="absolute top-5 left-5 md:top-8 md:left-8 text-white/80 z-10 text-xs md:text-sm tracking-[0.28em]">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                        
                        <div className="absolute bottom-7 left-5 right-5 md:bottom-10 md:left-8 md:right-8 text-white z-10">
                          <div className="flex flex-col gap-5 md:gap-8">
                            <div>
                              <h3 className="text-3xl md:text-5xl font-light tracking-tight leading-none mb-3">{work.title}</h3>
                              <p className="text-sm md:text-base text-gray-300 font-light">{work.subtitle}</p>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <p className="text-xs md:text-sm text-white/60 tracking-[0.24em] uppercase">Prism Works</p>
                              <p className="work-pill shrink-0 text-sm md:text-base font-medium tracking-wide border border-white/30 px-4 py-2 backdrop-blur-sm group-hover:bg-white group-hover:text-black transition-colors duration-300">
                                {work.label}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  </DepthTilt>
                </Link>
              ))}
              
              {filteredWorks.length === 0 && (
                <div className="works-empty">
                  No works found in this category.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
