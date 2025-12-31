'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname(); // ページ遷移を検知するために取得

  useEffect(() => {
    // マウス移動時の処理
    const handleMouseMove = (e: MouseEvent) => {
      const posX = e.clientX;
      const posY = e.clientY;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${posX}px`;
        cursorDotRef.current.style.top = `${posY}px`;
      }
      
      if (cursorOutlineRef.current) {
        cursorOutlineRef.current.animate({
          left: `${posX}px`,
          top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
      }
    };

    // ホバー時のクラス付与処理
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // リンクやボタン、.hover-triggerクラスを持つ要素に反応
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.closest('.hover-trigger')
      ) {
        document.body.classList.add('hovering');
      } else {
        document.body.classList.remove('hovering');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.classList.remove('hovering'); // クリーンアップ
    };
  }, [pathname]); // ページ遷移時にも再設定

  return (
    <>
      <div ref={cursorDotRef} className="cursor-dot hidden md:block fixed z-[9999] pointer-events-none" />
      <div ref={cursorOutlineRef} className="cursor-outline hidden md:block fixed z-[9999] pointer-events-none" />
    </>
  );
}