'use client';

import { useEffect, useRef } from 'react';

/**
 * Works セクションへ入るときの「プリズムの三角形が拡大して覆う」ワイプ演出。
 * Works セクション（#work）の上端がビューポート下端→上端へ進む区間で、
 * 三角形（薄いグレー = Works の背景色）をスクロールに応じて拡大し、
 * 覆いきったところで Works（グレーのシーン）が開幕する。
 */
export default function WorksIntro() {
  const veilRef = useRef<HTMLDivElement | null>(null);
  const triRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const veil = veilRef.current;
    const tri = triRef.current;
    if (!veil || !tri) return;

    const section = document.getElementById('work');
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let rafId = 0;

    const clamp = (v: number) => Math.min(1, Math.max(0, v));
    // 緩急（イーズイン）で終盤に一気に覆う印象にする
    const ease = (t: number) => t * t;

    const update = () => {
      rafId = 0;
      const vh = window.innerHeight;
      const top = section.getBoundingClientRect().top;

      // top: vh（画面下）→ 0（画面上/ピン開始）で進捗 0→1
      const raw = clamp(1 - top / vh);
      const active = top > 0 && top < vh && !prefersReducedMotion;

      if (active) {
        veil.classList.add('is-active');
        // 三角が覆いきるまでは Works の中身（テキスト・カード）を隠す
        section.classList.add('is-entering');
        // 0 から少し大きめに始めて、最後は画面を確実に覆うスケールへ
        const p = 0.02 + ease(raw) * 1.25;
        tri.style.setProperty('--works-intro-p', p.toFixed(4));
        // ワイプ後半から、マスク下から見出しが這い出てくる（キッカー→タイトルの順に少し遅らせる）
        const r1 = clamp((raw - 0.32) / 0.35);
        const r2 = clamp((raw - 0.44) / 0.35);
        veil.style.setProperty('--works-reveal-1', r1.toFixed(3));
        veil.style.setProperty('--works-reveal-2', r2.toFixed(3));
      } else {
        veil.classList.remove('is-active');
        section.classList.remove('is-entering');
      }
    };

    const requestUpdate = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      section.classList.remove('is-entering');
      veil.classList.remove('is-active');
    };
  }, []);

  return (
    <div ref={veilRef} className="works-intro-veil" aria-hidden="true">
      <div ref={triRef} className="works-intro-triangle" />
      <div className="works-intro-copy">
        <div className="works-flow-layout max-w-[1600px] mx-auto">
          <div className="works-flow-copy">
            <div className="works-intro-mask is-kicker mb-6">
              <p className="text-xs md:text-sm font-bold tracking-widest uppercase text-text-sub">Selected Work</p>
            </div>
            <div className="works-intro-mask is-title">
              <h2 className="text-5xl md:text-7xl font-medium text-text-main leading-none tracking-tight">
                Work that moves with the story.
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
