'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { WORKS_DATA } from '@/data/works';

export default function Works() {
  const [activeFilter, setActiveFilter] = useState('all');

  const handleMouseEnter = () => document.body.classList.add('hovering');
  const handleMouseLeave = () => document.body.classList.remove('hovering');

  const filteredWorks = WORKS_DATA.filter(item => {
    return activeFilter === 'all' || item.category === activeFilter;
  });

  return (
    <section id="work" className="px-6 md:px-20 py-24 bg-white-main border-t border-black/5">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 scroll-trigger opacity-0">
          <h2 className="text-4xl md:text-6xl font-medium text-text-main">SELECTED WORK</h2>
          
          <div className="flex flex-wrap gap-6 mt-8 md:mt-0 text-sm md:text-base font-medium">
            {['all', 'photo', 'video', 'ui', 'web'].map(filter => (
              <button 
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`transition-all pb-1 ${activeFilter === filter ? 'text-black border-b border-black' : 'text-gray-400 hover:text-black'}`}
              >
                {filter === 'all' ? 'All' : filter === 'ui' ? 'UI Design' : filter.charAt(0).toUpperCase() + filter.slice(1) + (filter === 'photo' || filter === 'video' ? 'graphy' : filter === 'web' ? ' Engineering' : '')}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-y-24 md:gap-y-32">
          {filteredWorks.map((work) => (
            <Link 
              key={work.id} 
              href={work.url} /* ← 修正箇所: ここでデータ内の固定URLを直接読み込みます */
              className="block w-full"
              onMouseEnter={handleMouseEnter} 
              onMouseLeave={handleMouseLeave}
            >
              <article className="work-card group relative cursor-pointer scroll-trigger opacity-0 animate-fade-in-up">
                 <div className="w-full aspect-[3/4] md:aspect-[16/10] overflow-hidden bg-gray-100 relative">
                      <Image 
                        src={work.image} 
                        alt={work.title} 
                        fill
                        className="work-card-img object-cover object-center"
                        sizes="(max-width: 768px) 100vw, 80vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 transition-opacity duration-300"></div>
                      
                      <div className="absolute bottom-8 left-6 md:bottom-12 md:left-12 text-white z-10">
                          <h3 className="text-3xl md:text-5xl font-light tracking-tight mb-2 md:mb-4">{work.title}</h3>
                          <p className="text-sm md:text-lg text-gray-300 font-light">{work.subtitle}</p>
                      </div>
                      
                      <div className="absolute bottom-8 right-6 md:bottom-12 md:right-12 text-white z-10 text-right">
                          <p className="text-sm md:text-base font-medium tracking-wide border border-white/30 px-4 py-2 rounded-full backdrop-blur-sm group-hover:bg-white group-hover:text-black transition-colors duration-300">
                              {work.label}
                          </p>
                      </div>
                 </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}