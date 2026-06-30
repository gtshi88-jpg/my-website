'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import DepthTilt from '@/components/ui/DepthTilt';

export default function About() {
  const handleMouseEnter = () => document.body.classList.add('hovering');
  const handleMouseLeave = () => document.body.classList.remove('hovering');

  return (
    <section id="about" className="about-section section-scene px-6 md:px-20 py-24 md:py-32 text-white-main overflow-hidden" data-section-theme="dark">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <DepthTilt className="about-portrait section-lift-item relative scroll-trigger opacity-0" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div className="depth-card-surface relative aspect-[3/4] overflow-hidden">
            <Image 
              src="/images/root/my-bio-img.jpg"
              alt="Profile"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="work-card-shine" aria-hidden="true"></div>
          </div>
        </DepthTilt>

        <div className="section-copy-panel space-y-8 scroll-trigger opacity-0">
            <h2 className="text-4xl md:text-5xl font-medium leading-tight text-white-main">
                BRIDGING THE GAP <br />BETWEEN DESIGN <br />AND TECHNOLOGY.
            </h2>
            <div className="space-y-6 text-white/60 text-lg font-light leading-relaxed">
                <p>
                    <span className="text-white-main block mb-2 font-normal">領域を横断する、少人数のデジタルスタジオ</span>
                    Prism Works は、Webサイト・EC構築を軸に、運用保守から撮影・映像まで一気通貫でご提供するチームです。デザイン・実装・撮影を分業せず、少人数だからこそ生まれる密度と速さで、事業の成長に伴走します。
                </p>
                <p>
                    Prism Works is a small, multidisciplinary studio. We combine the photographer&apos;s eye for light, the designer&apos;s pursuit of usability, and the engineer&apos;s technical capability under one roof. We don&apos;t just build websites; we craft memorable digital experiences that grow your business.
                </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-white/10">
                <div>
                    <h4 className="text-white-main font-medium mb-2">Services</h4>
                    <ul className="text-sm text-white/60 space-y-1">
                        <li>Web Design / Corporate Site</li>
                        <li>E-Commerce</li>
                        <li>Maintenance &amp; Growth</li>
                        <li>Photo / Film / Design</li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white-main font-medium mb-2">Tech Stack</h4>
                    <ul className="text-sm text-white/60 space-y-1">
                        <li>React / Next.js</li>
                        <li>TypeScript</li>
                        <li>Shopify</li>
                        <li>Adobe Creative Cloud</li>
                    </ul>
                </div>
            </div>

            <Link
                href="/about"
                className="group inline-flex items-center gap-3 text-sm font-bold tracking-wide border-b border-white pb-1 hover:opacity-60 transition-opacity"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                MORE ABOUT US
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
        </div>
      </div>
    </section>
  );
}
