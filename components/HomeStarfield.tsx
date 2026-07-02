'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type RenderState = {
  rafId: number;
  visibilityRafId: number;
  disposed: boolean;
  running: boolean;
};

/**
 * ホームページ全面の固定背景。ヒーローの「星屑が浮いている」演出を
 * ヒーロー直下のコンテンツ背景まで連続させるための、ゆっくり漂う白いパーティクル群。
 * HeroScene3D と同じ流儀で prefers-reduced-motion を尊重し、unmount で全リソースを破棄する。
 */
export default function HomeStarfield() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const stateRef = useRef<RenderState>({
    rafId: 0,
    visibilityRafId: 0,
    disposed: false,
    running: false,
  });

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const state = stateRef.current;
    state.disposed = false;
    state.running = false;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.1));
    renderer.domElement.className = 'home-starfield-canvas';
    host.appendChild(renderer.domElement);

    const root = new THREE.Group();
    scene.add(root);

    // 2層構成（奥／手前）で奥行きのある星屑にする
    const makeLayer = (count: number, spreadXY: number, spreadZ: number, size: number, opacity: number) => {
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i += 1) {
        positions[i * 3] = (Math.random() - 0.5) * spreadXY;
        positions[i * 3 + 1] = (Math.random() - 0.5) * spreadXY * 0.7;
        positions[i * 3 + 2] = (Math.random() - 0.5) * spreadZ;
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size,
        sizeAttenuation: true,
        transparent: true,
        opacity,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const points = new THREE.Points(geometry, material);
      root.add(points);
      return points;
    };

    const isSmall = window.innerWidth < 768;
    const farLayer = makeLayer(isSmall ? 180 : 260, 46, 28, 0.07, 0.45);
    const nearLayer = makeLayer(isSmall ? 70 : 120, 38, 20, 0.12, 0.62);

    const pointer = new THREE.Vector2(0, 0);
    const target = new THREE.Vector2(0, 0);
    const onPointerMove = (event: PointerEvent) => {
      target.x = (event.clientX / window.innerWidth - 0.5) * 2;
      target.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const resize = () => {
      const width = Math.max(1, window.innerWidth);
      const height = Math.max(1, window.innerHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', resize);
    resize();

    const clock = new THREE.Clock();
    const motionScale = prefersReducedMotion ? 0.2 : 1;

    const renderFrame = () => {
      const elapsed = clock.getElapsedTime();

      // ゆっくり漂うような回転＋上下のうねり
      root.rotation.y = elapsed * 0.012 * motionScale;
      farLayer.rotation.z = Math.sin(elapsed * 0.04) * 0.06 * motionScale;
      nearLayer.position.y = Math.sin(elapsed * 0.18) * 0.4 * motionScale;
      farLayer.position.y = Math.sin(elapsed * 0.12 + 1.5) * 0.3 * motionScale;

      pointer.x += (target.x - pointer.x) * 0.03;
      pointer.y += (target.y - pointer.y) * 0.03;
      camera.position.x = pointer.x * 1.4;
      camera.position.y = -pointer.y * 0.9;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    const render = () => {
      state.rafId = 0;
      renderFrame();

      if (!state.disposed && state.running && !prefersReducedMotion) {
        state.rafId = window.requestAnimationFrame(render);
      }
    };

    const start = () => {
      if (state.disposed) return;
      host.classList.remove('is-paused');
      if (prefersReducedMotion) {
        renderFrame();
        return;
      }
      if (state.running) return;
      state.running = true;
      state.rafId = window.requestAnimationFrame(render);
    };

    const stop = () => {
      state.running = false;
      if (state.rafId) {
        window.cancelAnimationFrame(state.rafId);
        state.rafId = 0;
      }
      host.classList.add('is-paused');
    };

    const updateVisibility = () => {
      state.visibilityRafId = 0;
      const hero = document.querySelector<HTMLElement>('.hero-shell');
      const services = document.querySelector<HTMLElement>('#services');

      if (!hero || !services) {
        start();
        return;
      }

      const viewportHeight = window.innerHeight;
      const heroRect = hero.getBoundingClientRect();
      const serviceRect = services.getBoundingClientRect();
      const shouldRun = heroRect.bottom > -viewportHeight * 0.2
        && serviceRect.top > viewportHeight * 0.18;

      if (shouldRun) {
        start();
      } else {
        stop();
      }
    };

    const requestVisibilityUpdate = () => {
      if (state.visibilityRafId) return;
      state.visibilityRafId = window.requestAnimationFrame(updateVisibility);
    };

    updateVisibility();
    window.addEventListener('scroll', requestVisibilityUpdate, { passive: true });
    window.addEventListener('resize', requestVisibilityUpdate);

    return () => {
      state.disposed = true;
      state.running = false;
      window.cancelAnimationFrame(state.rafId);
      window.cancelAnimationFrame(state.visibilityRafId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', resize);
      window.removeEventListener('resize', requestVisibilityUpdate);
      window.removeEventListener('scroll', requestVisibilityUpdate);

      scene.traverse((object) => {
        if (object instanceof THREE.Points) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });

      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={hostRef} className="home-starfield-stage" aria-hidden="true" />;
}
