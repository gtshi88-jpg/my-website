'use client';
import Link from 'next/link';
import { Instagram, Github, ArrowUpRight } from 'lucide-react';

export default function Contact() {
  const handleMouseEnter = () => document.body.classList.add('hovering');
  const handleMouseLeave = () => document.body.classList.remove('hovering');

  return (
    <section id="contact" className="contact-section section-scene px-6 md:px-20 py-24 md:py-32 text-white-main" data-section-theme="dark">
       <div className="max-w-[1600px] mx-auto">
          <div className="section-copy-panel flex flex-col md:flex-row justify-between items-start md:items-end mb-12 scroll-trigger opacity-0">
              <div className="max-w-2xl">
                  <p className="text-sm font-bold tracking-widest mb-4">CONTACT</p>
                  <h2
                    className="text-5xl md:text-8xl font-bold leading-none tracking-tighter cursor-pointer group"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                      LET&apos;S TALK
                      <span className="block h-2 bg-white w-0 group-hover:w-full transition-all duration-500"></span>
                  </h2>
                  <p className="mt-8 text-white/60 text-base md:text-lg font-light leading-relaxed">
                      ホームページ・ECサイトの制作から運用まで、お気軽にご相談ください。<br className="hidden md:block" />
                      <span className="text-white-main font-normal">ご相談・お見積りは無料です。</span>「何から始めればいいか分からない」段階でも大歓迎です。
                  </p>
              </div>
              <a
                href="mailto:shu@the-prism-works.com?subject=Web%E5%88%B6%E4%BD%9C%E3%81%AE%E3%81%94%E7%9B%B8%E8%AB%87&body=%E3%81%94%E7%A4%BE%E5%90%8D%2F%E3%81%8A%E5%90%8D%E5%89%8D%EF%BC%9A%0A%E3%81%94%E4%BA%88%E7%AE%97%EF%BC%88%E4%BB%BB%E6%84%8F%EF%BC%89%EF%BC%9A%0A%E5%B8%8C%E6%9C%9B%E6%99%82%E6%9C%9F%EF%BC%88%E4%BB%BB%E6%84%8F%EF%BC%89%EF%BC%9A%0A%E3%81%94%E7%9B%B8%E8%AB%87%E5%86%85%E5%AE%B9%EF%BC%9A%0A"
                className="group mt-10 md:mt-0 shrink-0 flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full hover:opacity-80 transition-all"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                  メールで相談する
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
          </div>

          <div className="mb-20 scroll-trigger opacity-0">
              <p className="text-sm text-white/50 mb-1">または直接メールでも受け付けています</p>
              <a
                href="mailto:shu@the-prism-works.com"
                className="text-lg md:text-2xl font-light tracking-tight border-b border-white/30 hover:border-white transition-colors pb-1"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                  shu@the-prism-works.com
              </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-8 border-t border-white/10">
              <div>
                  <p className="text-sm font-bold mb-2">SOCIALS</p>
                  <div className="flex gap-4">
                      {[Instagram,  Github].map((Icon, i) => (
                         <a key={i} href="https://www.instagram.com/xiu_884/" className="text-white/70 hover:text-white transition-colors" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                           <Icon className="w-5 h-5" />
                         </a>
                      ))}
                  </div>
              </div>
              <div>
                  <p className="text-sm font-bold mb-2">LOCATION</p>
                  <p className="text-white/60">Tokyo, Japan</p>
              </div>
              <div>
                  <p className="text-sm font-bold mb-2">INFORMATION</p>
                  <ul className="space-y-1 text-white/60 text-sm">
                      <li><Link href="/company" className="hover:text-white transition-colors" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>会社概要</Link></li>
                      <li><Link href="/privacy" className="hover:text-white transition-colors" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>プライバシーポリシー</Link></li>
                      <li><Link href="/legal" className="hover:text-white transition-colors" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>特定商取引法に基づく表記</Link></li>
                  </ul>
              </div>
              <div className="md:text-right flex flex-col justify-end">
                  <p className="text-white/50 text-sm">© 2026 Prism Works. All Rights Reserved.</p>
              </div>
          </div>
       </div>
    </section>
  );
}
