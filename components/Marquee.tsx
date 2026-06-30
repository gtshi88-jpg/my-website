'use client';

import Image from 'next/image';

const marqueeImages = [
  '/video/EC-poster.jpg',
  '/images/root/hero-img.jpg',
  '/video/EC_img.jpg',
  '/images/root/tiam-pv-thumbnail.JPG',
  '/video/hero-img.jpg',
];

export default function Marquee() {
  return (
    <section className="marquee-section section-scene py-16 md:py-24 border-y border-white/10 text-white-main overflow-hidden" data-section-theme="dark">
      <div className="overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-marquee text-6xl md:text-9xl font-bold tracking-tighter">
          WEB DESIGN — E-COMMERCE — MAINTENANCE &amp; GROWTH — CREATIVE PRODUCTION — WEB DESIGN — E-COMMERCE — MAINTENANCE &amp; GROWTH — CREATIVE PRODUCTION —
        </div>
      </div>
      <div className="media-marquee mt-12" aria-hidden="true">
        <div className="media-marquee-track">
          {[...marqueeImages, ...marqueeImages].map((src, index) => (
            <div className="media-marquee-card" key={`${src}-${index}`}>
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="220px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
