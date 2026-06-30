'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type RenderState = {
  rafId: number;
  disposed: boolean;
};

export default function HeroScene3D() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const stateRef = useRef<RenderState>({ rafId: 0, disposed: false });

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const state = stateRef.current;
    state.disposed = false;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(0, 0.3, 8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.domElement.className = 'hero-webgl-canvas';
    host.appendChild(renderer.domElement);

    const root = new THREE.Group();
    root.rotation.set(-0.08, -0.18, 0);
    scene.add(root);

    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(2, 4, 5);
    scene.add(ambient, keyLight);

    const colors = [0xffffff, 0x5eead4, 0xfacc15, 0xfb7185, 0x93c5fd];
    const panels: THREE.Mesh[] = [];

    for (let i = 0; i < 14; i += 1) {
      const width = 0.85 + (i % 3) * 0.18;
      const height = 1.18 + (i % 4) * 0.16;
      const geometry = new THREE.PlaneGeometry(width, height, 1, 1);
      const material = new THREE.MeshPhysicalMaterial({
        color: colors[i % colors.length],
        emissive: colors[(i + 1) % colors.length],
        emissiveIntensity: 0.08,
        metalness: 0.15,
        roughness: 0.25,
        transparent: true,
        opacity: 0.42,
        side: THREE.DoubleSide,
      });
      const panel = new THREE.Mesh(geometry, material);
      const column = (i % 7) - 3;
      const row = Math.floor(i / 7) - 0.5;
      panel.position.set(column * 0.9, row * 1.25, -Math.abs(column) * 0.18 - i * 0.025);
      panel.rotation.set(0.18 * row, -0.22 * column, (column % 2) * 0.05);
      panels.push(panel);
      root.add(panel);
    }

    const haloGeometry = new THREE.TorusKnotGeometry(1.05, 0.018, 120, 8);
    const haloMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.46,
      wireframe: true,
    });
    const halo = new THREE.Mesh(haloGeometry, haloMaterial);
    halo.position.set(1.95, -0.4, -0.45);
    root.add(halo);

    const particleCount = 160;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 7.5;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4.2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4.5;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.022,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    root.add(particles);

    const pointer = new THREE.Vector2(0, 0);
    const onPointerMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();

    const clock = new THREE.Clock();
    const render = () => {
      const elapsed = clock.getElapsedTime();
      const motionScale = prefersReducedMotion ? 0.18 : 1;

      root.rotation.y += ((pointer.x * 0.16 - 0.18) - root.rotation.y) * 0.045;
      root.rotation.x += ((-pointer.y * 0.08 - 0.08) - root.rotation.x) * 0.045;

      panels.forEach((panel, index) => {
        panel.position.y += Math.sin(elapsed * 0.7 + index) * 0.0009 * motionScale;
        panel.rotation.z += Math.sin(elapsed * 0.45 + index) * 0.0006 * motionScale;
      });

      halo.rotation.x = elapsed * 0.18 * motionScale;
      halo.rotation.y = elapsed * 0.26 * motionScale;
      particles.rotation.y = elapsed * 0.035 * motionScale;

      renderer.render(scene, camera);

      if (!state.disposed) {
        state.rafId = window.requestAnimationFrame(render);
      }
    };
    render();

    return () => {
      state.disposed = true;
      window.cancelAnimationFrame(state.rafId);
      window.removeEventListener('pointermove', onPointerMove);
      resizeObserver.disconnect();

      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
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

  return <div ref={hostRef} className="hero-webgl-stage" aria-hidden="true" />;
}
