'use client';

import type { HTMLAttributes, PointerEvent, ReactNode } from 'react';

type DepthTiltProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};
// ディープティル
export default function DepthTilt({ children, className = '', ...props }: DepthTiltProps) {
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    target.style.setProperty('--tilt-x', `${(0.5 - y) * 8}deg`);
    target.style.setProperty('--tilt-y', `${(x - 0.5) * 10}deg`);
    target.style.setProperty('--shine-x', `${x * 100}%`);
    target.style.setProperty('--shine-y', `${y * 100}%`);
  };
// ポインターが離れた時
  const handlePointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    target.style.setProperty('--tilt-x', '0deg');
    target.style.setProperty('--tilt-y', '0deg');
    target.style.setProperty('--shine-x', '50%');
    target.style.setProperty('--shine-y', '50%');
  };

  return (
    <div
      {...props}
      className={`depth-card ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </div>
  );
}
