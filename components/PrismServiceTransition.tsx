'use client';

import { useEffect } from 'react';

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const easeInOut = (value: number) => value * value * (3 - 2 * value);

export default function PrismServiceTransition({ isLoading }: { isLoading: boolean }) {
  useEffect(() => {
    if (isLoading) return;

    const root = document.documentElement;
    const services = document.querySelector<HTMLElement>('#services');
    const hero = document.querySelector<HTMLElement>('.hero-shell');
    const heroContent = document.querySelector<HTMLElement>('.hero-content-lock');
    if (!services || !hero || !heroContent) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.body.classList.remove('is-prism-bridge-active');
      root.style.setProperty('--hero-prism-bridge-opacity', '0');
      root.style.setProperty('--hero-bridge-backdrop-opacity', '0');
      root.style.setProperty('--hero-bridge-content-opacity', '1');
      services.style.setProperty('--service-reveal-opacity', '1');
      services.style.setProperty('--service-reveal-progress', '1');
      services.style.setProperty('--service-reveal-radius', '160vmax');
      services.style.setProperty('--service-reveal-x', '50%');
      services.style.setProperty('--service-reveal-y', '50%');
      root.style.setProperty('--service-reveal-radius', '160vmax');
      root.style.setProperty('--service-reveal-screen-x', '50vw');
      root.style.setProperty('--service-reveal-screen-y', '50vh');
      root.style.setProperty('--service-reveal-ring-opacity', '0');
      return;
    }

    let rafId = 0;
    let wasBridgeActive = false;

    const freezeHeroContent = (start: number) => {
      const rect = heroContent.getBoundingClientRect();
      const fixedTop = rect.top + Math.max(0, window.scrollY - start);
      root.style.setProperty('--hero-bridge-content-top', `${fixedTop.toFixed(2)}px`);
      root.style.setProperty('--hero-bridge-content-left', `${rect.left.toFixed(2)}px`);
      root.style.setProperty('--hero-bridge-content-width', `${rect.width.toFixed(2)}px`);
    };

    const setTransition = () => {
      rafId = 0;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const heroTop = hero.offsetTop;
      const heroHeight = hero.offsetHeight;
      const servicesTop = services.offsetTop;

      const start = heroTop + heroHeight * 0.035;
      const end = Math.max(start + 1, servicesTop - viewportHeight * 0.12);
      const progress = clamp((window.scrollY - start) / (end - start));
      const eased = easeInOut(progress);

      const revealProgress = easeInOut(clamp((progress - 0.78) / 0.22));
      const fadeIn = clamp(progress / 0.13);
      const fadeOut = clamp((1 - progress) / 0.16);
      const bridgeOpacity = Math.min(fadeIn, fadeOut);
      const backdropOpacity = 1 - easeInOut(clamp((revealProgress - 0.72) / 0.28));
      const contentOpacity = 1 - easeInOut(clamp((progress - 0.84) / 0.16));
      const serviceRect = services.getBoundingClientRect();
      const isServiceVisualZone = serviceRect.top < viewportHeight * 0.7;
      const revealCenterX = viewportWidth < 768 ? viewportWidth * 0.5 : viewportWidth * 0.6;
      const revealCenterY = viewportWidth < 768 ? viewportHeight * 0.54 : viewportHeight * 0.52;
      const serviceCenterY = revealCenterY - serviceRect.top;
      const maxRadius = Math.hypot(
        Math.max(revealCenterX, viewportWidth - revealCenterX),
        Math.max(revealCenterY, viewportHeight - revealCenterY),
      ) + 180;
      const revealRadius = revealProgress <= 0
        ? 0
        : 14 + revealProgress * maxRadius;
      const ringOpacity = revealProgress <= 0
        ? 0
        : clamp(revealProgress / 0.18) * (1 - easeInOut(clamp((revealProgress - 0.86) / 0.14)));

      const scale = viewportWidth < 768
        ? 1 + eased * 0.75
        : 1 + eased * 1.42;
      const bridgeX = viewportWidth < 768
        ? -eased * Math.min(viewportWidth * 0.12, 56)
        : -eased * Math.min(viewportWidth * 0.32, 480);
      const bridgeY = viewportWidth < 768
        ? eased * viewportHeight * 0.02
        : eased * viewportHeight * 0.045;
      const heroOpacity = Math.min(0.86, 0.2 + bridgeOpacity * 0.66);
      const isBridgeActive = bridgeOpacity > 0.002;

      if (isBridgeActive && !wasBridgeActive) {
        freezeHeroContent(start);
      }

      if (!isBridgeActive && wasBridgeActive) {
        root.style.removeProperty('--hero-bridge-content-top');
        root.style.removeProperty('--hero-bridge-content-left');
        root.style.removeProperty('--hero-bridge-content-width');
      }

      document.body.classList.toggle('is-prism-bridge-active', isBridgeActive);
      document.body.classList.toggle('is-service-visual-zone', isServiceVisualZone);
      wasBridgeActive = isBridgeActive;
      root.style.setProperty('--hero-prism-bridge-progress', progress.toFixed(4));
      root.style.setProperty('--hero-prism-bridge-opacity', heroOpacity.toFixed(4));
      root.style.setProperty('--hero-bridge-backdrop-opacity', backdropOpacity.toFixed(4));
      root.style.setProperty('--hero-bridge-content-opacity', contentOpacity.toFixed(4));
      root.style.setProperty('--hero-prism-bridge-x', `${bridgeX.toFixed(2)}px`);
      root.style.setProperty('--hero-prism-bridge-y', `${bridgeY.toFixed(2)}px`);
      root.style.setProperty('--hero-prism-bridge-scale', scale.toFixed(4));
      root.style.setProperty('--service-reveal-radius', `${revealRadius.toFixed(2)}px`);
      root.style.setProperty('--service-reveal-screen-x', `${revealCenterX.toFixed(2)}px`);
      root.style.setProperty('--service-reveal-screen-y', `${revealCenterY.toFixed(2)}px`);
      root.style.setProperty('--service-reveal-ring-opacity', ringOpacity.toFixed(4));

      services.style.setProperty('--service-reveal-progress', revealProgress.toFixed(4));
      services.style.setProperty('--service-reveal-opacity', revealProgress.toFixed(4));
      services.style.setProperty('--service-reveal-radius', `${revealRadius.toFixed(2)}px`);
      services.style.setProperty('--service-reveal-x', `${revealCenterX.toFixed(2)}px`);
      services.style.setProperty('--service-reveal-y', `${serviceCenterY.toFixed(2)}px`);
    };

    const requestUpdate = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(setTransition);
    };

    setTransition();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      document.body.classList.remove('is-prism-bridge-active');
      document.body.classList.remove('is-service-visual-zone');
      root.style.removeProperty('--hero-bridge-content-top');
      root.style.removeProperty('--hero-bridge-content-left');
      root.style.removeProperty('--hero-bridge-content-width');
      root.style.removeProperty('--hero-bridge-backdrop-opacity');
      root.style.removeProperty('--service-reveal-radius');
      root.style.removeProperty('--service-reveal-screen-x');
      root.style.removeProperty('--service-reveal-screen-y');
      root.style.removeProperty('--service-reveal-ring-opacity');
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, [isLoading]);

  return null;
}
