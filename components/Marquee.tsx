'use client';

export default function Marquee() {
  return (
    <div className="py-16 md:py-24 border-y border-black/5 bg-black-main text-white-main overflow-hidden">
      <div className="overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-marquee text-6xl md:text-9xl font-bold tracking-tighter">
          CREATIVE DIRECTION — VISUAL STORYTELLING — UI/UX DESIGN — FULL STACK DEVELOPMENT — CREATIVE DIRECTION — VISUAL STORYTELLING — UI/UX DESIGN — FULL STACK DEVELOPMENT —
        </div>
      </div>
    </div>
  );
}