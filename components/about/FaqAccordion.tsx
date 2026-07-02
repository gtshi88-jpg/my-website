'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { FAQS } from '@/data/about';

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t border-white/10">
      {FAQS.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={faq.q} className="border-b border-white/10">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-start justify-between gap-6 text-left py-7 md:py-8 group"
            >
              <span className="flex items-start gap-4 md:gap-6">
                <span className="text-sm md:text-base font-bold text-white/40 pt-1 tabular-nums">Q{String(i + 1).padStart(2, '0')}</span>
                <span className="text-lg md:text-2xl font-light text-white-main">{faq.q}</span>
              </span>
              <Plus
                className={`w-6 h-6 shrink-0 mt-1 text-white transition-transform duration-500 ${isOpen ? 'rotate-45' : 'rotate-0'}`}
              />
            </button>
            <div
              className={`grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <p className="pl-9 md:pl-12 pr-6 pb-8 text-base md:text-lg font-light leading-relaxed text-white/60 max-w-3xl">
                  {faq.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
