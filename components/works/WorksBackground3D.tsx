'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type RenderState = {
  rafId: number;
  disposed: boolean;
};

/**
 * Works ページ全面の固定背景。波打つパーティクルグリッドを GPU シェーダーで
 * 常時アニメーションさせ、ヒーローの暗色（#050507）に溶け込ませる。
 * HeroScene3D と同様に prefers-reduced-motion を尊重し、unmount で全リソースを破棄する。
 */
export default function WorksBackground3D() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const stateRef = useRef<RenderState>({ rafId: 0, disposed: false });

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const state = stateRef.current;
    state.disposed = false;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.domElement.className = 'works-webgl-canvas';
    host.appendChild(renderer.domElement);

    // パーティクルの密度（低性能端末では控えめに）
    const isSmall = window.innerWidth < 768;
    const segX = isSmall ? 90 : 150;
    const segY = isSmall ? 60 : 100;
    const spanX = 34;
    const spanY = 24;

    const count = (segX + 1) * (segY + 1);
    const positions = new Float32Array(count * 3);
    const rand = new Float32Array(count);
    let p = 0;
    for (let iy = 0; iy <= segY; iy += 1) {
      for (let ix = 0; ix <= segX; ix += 1) {
        positions[p * 3] = (ix / segX - 0.5) * spanX;
        positions[p * 3 + 1] = (iy / segY - 0.5) * spanY;
        positions[p * 3 + 2] = 0;
        rand[p] = Math.random();
        p += 1;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aRand', new THREE.BufferAttribute(rand, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: isSmall ? 46 : 60 },
        uColorA: { value: new THREE.Color(0x5eead4) }, // teal
        uColorB: { value: new THREE.Color(0xfb7185) }, // pink
        uColorC: { value: new THREE.Color(0x93c5fd) }, // blue
      },
      vertexShader: /* glsl */ `
        uniform float uTime;
        uniform float uSize;
        attribute float aRand;
        varying float vElev;
        varying float vRand;
        void main() {
          vec3 pos = position;
          float wave = sin(pos.x * 0.32 + uTime * 0.6) * cos(pos.y * 0.28 + uTime * 0.45);
          float ripple = sin((pos.x + pos.y) * 0.22 + uTime * 0.9);
          float elev = wave * 1.5 + ripple * 0.9;
          pos.z += elev;
          vElev = elev;
          vRand = aRand;
          vec4 mv = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = (uSize / -mv.z) * (0.5 + aRand * 0.9);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */ `
        precision mediump float;
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        uniform vec3 uColorC;
        varying float vElev;
        varying float vRand;
        void main() {
          vec2 c = gl_PointCoord - 0.5;
          float d = length(c);
          if (d > 0.5) discard;
          float alpha = smoothstep(0.5, 0.0, d);
          float t = clamp(vElev * 0.25 + 0.5, 0.0, 1.0);
          vec3 col = mix(uColorA, uColorB, t);
          col = mix(col, uColorC, vRand * 0.5);
          gl_FragColor = vec4(col, alpha * 0.32);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    points.rotation.x = -0.55; // 床のように奥へ傾ける
    scene.add(points);

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
    const motionScale = prefersReducedMotion ? 0.25 : 1;

    const render = () => {
      const elapsed = clock.getElapsedTime();
      material.uniforms.uTime.value = elapsed * motionScale;

      pointer.x += (target.x - pointer.x) * 0.04;
      pointer.y += (target.y - pointer.y) * 0.04;

      camera.position.x = pointer.x * 0.8;
      camera.position.y = -pointer.y * 0.5;
      camera.lookAt(0, 0, 0);

      points.rotation.z = Math.sin(elapsed * 0.05) * 0.05 * motionScale;

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
      window.removeEventListener('resize', resize);

      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={hostRef} className="works-webgl-stage" aria-hidden="true" />;
}
