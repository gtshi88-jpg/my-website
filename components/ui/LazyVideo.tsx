'use client';

import { useEffect, useRef, useState } from 'react';

type LazyVideoProps = {
  src: string;
  poster: string;
  className?: string;
};

// 遅延ロード
export default function LazyVideo({ src, poster, className = '' }: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  // ビデオが画面に入った時
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '500px 0px' }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  // ビデオを再生
  useEffect(() => {
    if (!shouldLoad) return;
    videoRef.current?.play().catch(() => undefined);
  }, [shouldLoad]);

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload={shouldLoad ? 'metadata' : 'none'}
      poster={poster}
    >
      {shouldLoad && <source src={src} type="video/mp4" />}
    </video>
  );
}
