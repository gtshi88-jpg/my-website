'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type RenderState = {
  rafId: number;
  visibilityRafId: number;
  disposed: boolean;
  running: boolean;
};

export default function HeroScene3D() {
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
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0.15, 7.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.2));
    renderer.domElement.className = 'hero-webgl-canvas';
    host.appendChild(renderer.domElement);

    const root = new THREE.Group();
    root.rotation.set(-0.06, -0.22, -0.02);
    scene.add(root);

    const prismUniforms = {
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uResolution: { value: new THREE.Vector2(1, 1) },
    };

    const prismMaterial = new THREE.ShaderMaterial({
      uniforms: prismUniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;

        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;

        uniform float uTime;
        uniform vec2 uPointer;
        uniform vec2 uResolution;
        varying vec2 vUv;
        varying vec3 vPosition;

        float line(vec2 uv, float angle, float offset, float width) {
          vec2 dir = vec2(cos(angle), sin(angle));
          float d = dot(uv - 0.5, dir) + offset;
          return smoothstep(width, 0.0, abs(d));
        }

        vec3 spectrum(float t) {
          return 0.55 + 0.45 * cos(6.28318 * (vec3(0.0, 0.34, 0.67) + t));
        }

        void main() {
          vec2 uv = vUv;
          vec2 centered = uv - 0.5;
          float aspect = uResolution.x / max(uResolution.y, 1.0);
          centered.x *= aspect;

          float wave = sin((centered.x * 2.4 + centered.y * 3.1 + uTime * 0.28) * 3.14159);
          float caustic = line(centered, -0.58, sin(uTime * 0.22) * 0.14, 0.018);
          caustic += line(centered, -0.58, -0.15 + sin(uTime * 0.17) * 0.08, 0.01) * 0.65;
          caustic += line(centered, -0.58, 0.19 + cos(uTime * 0.19) * 0.1, 0.012) * 0.8;

          float glassEdge = smoothstep(0.42, 0.06, abs(centered.x + centered.y * 0.35));
          float vignette = smoothstep(0.94, 0.18, length(centered * vec2(1.05, 1.6)));
          float pointerGlow = smoothstep(0.85, 0.0, distance(centered, uPointer * vec2(0.5, -0.35)));

          vec3 rainbow = spectrum(uv.x * 0.32 + uv.y * 0.24 + wave * 0.035 + uTime * 0.035);
          vec3 icy = vec3(0.48, 0.9, 1.0);
          vec3 rose = vec3(1.0, 0.34, 0.56);
          vec3 color = rainbow * caustic * 1.35;
          color += mix(icy, rose, uv.x) * glassEdge * 0.12;
          color += spectrum(uTime * 0.035 + length(centered)) * pointerGlow * 0.13;

          float alpha = (caustic * 0.52 + glassEdge * 0.2 + pointerGlow * 0.16) * vignette;
          gl_FragColor = vec4(color, alpha);
        }
      `,
    });

    const prismMesh = new THREE.Mesh(new THREE.PlaneGeometry(8.8, 5.2, 1, 1), prismMaterial);
    prismMesh.position.set(0.9, 0.08, -0.7);
    root.add(prismMesh);

    const prismShape = new THREE.Group();
    const glassMaterial = new THREE.MeshBasicMaterial({
      color: 0xdffbff,
      transparent: true,
      opacity: 0.16,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const glassEdgeMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.38,
      blending: THREE.AdditiveBlending,
    });
    const triangleGeometry = new THREE.CircleGeometry(1.65, 3);
    const triangle = new THREE.Mesh(triangleGeometry, glassMaterial);
    triangle.scale.set(1.35, 1.35, 1);
    triangle.rotation.z = Math.PI * 0.5;
    prismShape.add(triangle);

    const edgeGeometry = new THREE.EdgesGeometry(triangleGeometry);
    const edge = new THREE.LineSegments(edgeGeometry, glassEdgeMaterial);
    edge.scale.copy(triangle.scale);
    edge.rotation.copy(triangle.rotation);
    prismShape.add(edge);
    prismShape.position.set(2.05, -0.1, -0.1);
    prismShape.rotation.set(0.1, -0.26, -0.08);
    root.add(prismShape);

    const makeBeam = (index: number, color: number, y: number, z: number) => {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-4.7, y - 0.08, z),
        new THREE.Vector3(-0.4, y, z - 0.05),
        new THREE.Vector3(1.8, y + index * 0.045, z - 0.08),
        new THREE.Vector3(4.8, y + index * 0.18, z - 0.18),
      ]);
      const material = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.42,
        blending: THREE.AdditiveBlending,
      });
      const line = new THREE.Line(geometry, material);
      root.add(line);
      return line;
    };

    const beams = [
      makeBeam(-2, 0x5eead4, -0.38, 0.25),
      makeBeam(-1, 0x93c5fd, -0.24, 0.2),
      makeBeam(0, 0xffffff, -0.1, 0.16),
      makeBeam(1, 0xfacc15, 0.04, 0.12),
      makeBeam(2, 0xfb7185, 0.18, 0.08),
    ];

    const particleCount = 42;
    const positions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const palette = [
      new THREE.Color(0xffffff),
      new THREE.Color(0x5eead4),
      new THREE.Color(0x93c5fd),
      new THREE.Color(0xfacc15),
      new THREE.Color(0xfb7185),
    ];
    for (let i = 0; i < particleCount; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4.8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3.2;
      const color = palette[i % palette.length];
      particleColors[i * 3] = color.r;
      particleColors[i * 3 + 1] = color.g;
      particleColors[i * 3 + 2] = color.b;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.026,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
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
      prismUniforms.uResolution.value.set(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();

    const clock = new THREE.Clock();
    const renderFrame = () => {
      const elapsed = clock.getElapsedTime();
      const motionScale = prefersReducedMotion ? 0.18 : 1;

      prismUniforms.uTime.value = elapsed * motionScale;
      prismUniforms.uPointer.value.lerp(pointer, 0.055);

      root.rotation.y += ((pointer.x * 0.11 - 0.22) - root.rotation.y) * 0.04;
      root.rotation.x += ((-pointer.y * 0.055 - 0.06) - root.rotation.x) * 0.04;
      prismShape.rotation.y = -0.26 + Math.sin(elapsed * 0.25) * 0.035 * motionScale;
      prismShape.rotation.z = -0.08 + Math.cos(elapsed * 0.18) * 0.025 * motionScale;
      beams.forEach((beam, index) => {
        beam.position.y = Math.sin(elapsed * 0.32 + index * 0.9) * 0.025 * motionScale;
        const material = beam.material as THREE.LineBasicMaterial;
        material.opacity = 0.3 + Math.sin(elapsed * 0.4 + index) * 0.08 + index * 0.018;
      });
      particles.rotation.y = elapsed * 0.025 * motionScale;
      particles.position.y = Math.sin(elapsed * 0.18) * 0.08 * motionScale;

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
      const hero = host.closest<HTMLElement>('.hero-shell');
      const services = document.querySelector<HTMLElement>('#services');

      if (!hero || !services) {
        start();
        return;
      }

      const viewportHeight = window.innerHeight;
      const heroRect = hero.getBoundingClientRect();
      const serviceRect = services.getBoundingClientRect();
      const bridgeProgress = Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--hero-prism-bridge-progress'),
      ) || 0;
      const bridgeIsVisible = document.body.classList.contains('is-prism-bridge-active')
        && bridgeProgress < 0.94;
      const heroIsVisible = heroRect.bottom > -viewportHeight * 0.12
        && heroRect.top < viewportHeight * 1.05
        && serviceRect.top > viewportHeight * 0.04;

      if (bridgeIsVisible || heroIsVisible) {
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
      window.removeEventListener('scroll', requestVisibilityUpdate);
      window.removeEventListener('resize', requestVisibilityUpdate);
      resizeObserver.disconnect();

      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.Line || object instanceof THREE.LineSegments) {
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
