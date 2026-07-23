"use client";

import { useEffect, useRef } from "react";

export default function Background3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const cursor = cursorRef.current;
    if (!canvas || !cursor) return;

    let disposed = false;
    let cleanup = () => {};

    const loadScene = () => void import("three").then((THREE) => {
      if (disposed) return;
      const mobile = window.innerWidth < 768;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1 : 1.25));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);

      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x05030c, 0.025);
      const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
      camera.position.set(0, 0, 9);

      const makeGlowMaterial = (color: number, size: number, opacity = 1) =>
        new THREE.ShaderMaterial({
          uniforms: {
            uColor: { value: new THREE.Color(color) },
            uSize: { value: size * renderer.getPixelRatio() },
            uOpacity: { value: opacity },
            uTime: { value: 0 },
          },
          vertexShader: `
            uniform float uSize;
            uniform float uTime;
            attribute float aScale;
            varying float vAlpha;
            void main() {
              vec3 p = position;
              p.y += sin(uTime * .11 + position.x * .34) * .05;
              vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
              gl_PointSize = uSize * aScale * (28.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
              vAlpha = .45 + aScale * .45;
            }
          `,
          fragmentShader: `
            uniform vec3 uColor;
            uniform float uOpacity;
            varying float vAlpha;
            void main() {
              float d = distance(gl_PointCoord, vec2(.5));
              float glow = 1.0 - smoothstep(.05, .5, d);
              float core = 1.0 - smoothstep(0.0, .12, d);
              gl_FragColor = vec4(uColor + core * .55, glow * vAlpha * uOpacity);
            }
          `,
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });

      const makePoints = (count: number, spread: number, color: number, size: number, layer: number) => {
        const positions = new Float32Array(count * 3);
        const scales = new Float32Array(count);
        for (let i = 0; i < count; i++) {
          positions[i * 3] = (Math.random() - 0.5) * spread;
          positions[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.62;
          positions[i * 3 + 2] = -Math.random() * 42 + 5 - layer * 5;
          scales[i] = 0.25 + Math.random() * 0.85;
        }
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
        const material = makeGlowMaterial(color, size, 0.9);
        const points = new THREE.Points(geometry, material);
        scene.add(points);
        return { points, geometry, material };
      };

      const starsA = makePoints(mobile ? 120 : 440, 54, 0xc5bdff, 8, 0);
      const starsB = makePoints(mobile ? 60 : 190, 42, 0x67e8f9, 6, 1);

      const nebulaCount = mobile ? 90 : 280;
      const nebulaPositions = new Float32Array(nebulaCount * 3);
      const nebulaScales = new Float32Array(nebulaCount);
      for (let i = 0; i < nebulaCount; i++) {
        const radius = Math.pow(Math.random(), 0.72) * 7.5;
        const angle = Math.random() * Math.PI * 2;
        nebulaPositions[i * 3] = 8.5 + Math.cos(angle) * radius * 0.6 + Math.random();
        nebulaPositions[i * 3 + 1] = 1 + Math.sin(angle) * radius;
        nebulaPositions[i * 3 + 2] = -6 - Math.random() * 10 + radius * 0.25;
        nebulaScales[i] = 0.25 + Math.random() * 1.15;
      }
      const nebulaGeometry = new THREE.BufferGeometry();
      nebulaGeometry.setAttribute("position", new THREE.BufferAttribute(nebulaPositions, 3));
      nebulaGeometry.setAttribute("aScale", new THREE.BufferAttribute(nebulaScales, 1));
      const nebulaMaterial = makeGlowMaterial(0x7c3aed, 15, 0.18);
      const nebula = new THREE.Points(nebulaGeometry, nebulaMaterial);
      scene.add(nebula);

      const planeGeometry = new THREE.PlaneGeometry(40, 28, mobile ? 18 : 36, mobile ? 12 : 24);
      const basePositions = Float32Array.from(planeGeometry.attributes.position.array as ArrayLike<number>);
      const planeMaterial = new THREE.MeshBasicMaterial({
        color: 0x7c3aed,
        wireframe: true,
        transparent: true,
        opacity: mobile ? 0.06 : 0.11,
        blending: THREE.AdditiveBlending,
      });
      const terrain = new THREE.Mesh(planeGeometry, planeMaterial);
      terrain.rotation.x = -Math.PI / 2.08;
      terrain.position.set(0, -7.2, -9);
      scene.add(terrain);

      let targetX = 0;
      let targetY = 0;
      let currentX = 0;
      let currentY = 0;
      let raf = 0;
      let lastFrame = 0;
      const clock = new THREE.Clock();

      const onPointerMove = (event: PointerEvent) => {
        targetX = (event.clientX / window.innerWidth - 0.5) * 2;
        targetY = (event.clientY / window.innerHeight - 0.5) * 2;
        cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
        const target = event.target as HTMLElement;
        const isCanvasZone = Boolean(target.closest(".canvas-zone"));
        const isInteractive = Boolean(target.closest("a,button,input,textarea,.glass-card,.project-card"));
        document.body.classList.toggle("canvas-cursor-active", isCanvasZone && !isInteractive && !mobile);
        cursor.classList.toggle("is-visible", isCanvasZone && !isInteractive && !mobile);
      };

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 1 : 1.25));
        renderer.setSize(window.innerWidth, window.innerHeight);
        if (reduced) renderer.render(scene, camera);
      };

      const render = (now = 0) => {
        if (document.hidden || (!reduced && now - lastFrame < 32)) {
          raf = requestAnimationFrame(render);
          return;
        }
        lastFrame = now;
        const t = clock.getElapsedTime();
        currentX += (targetX - currentX) * 0.035;
        currentY += (targetY - currentY) * 0.035;
        if (!reduced) {
          camera.position.x = currentX * 0.84;
          camera.position.y = -currentY * 0.5;
          starsA.points.position.x = -currentX * 0.56;
          starsA.points.position.y = currentY * 0.26;
          starsB.points.position.x = currentX * 0.78;
          starsB.points.position.y = -currentY * 0.35;
          starsA.points.rotation.y = t * 0.0025 + currentX * 0.031;
          starsB.points.rotation.y = -t * 0.0018 + currentX * 0.024;
          nebula.rotation.z = t * 0.006;
          nebula.position.x = currentX * 0.96;
          nebula.position.y = -currentY * 0.54;
          terrain.position.x = currentX * 0.38;
          terrain.rotation.z = currentX * 0.022;
          const position = planeGeometry.attributes.position;
          for (let i = 0; i < position.count; i++) {
            const x = basePositions[i * 3];
            const y = basePositions[i * 3 + 1];
            position.setZ(i, Math.sin(x * 0.42 + t * 0.38) * 0.62 + Math.cos(y * 0.34 + t * 0.25) * 0.46);
          }
          position.needsUpdate = true;
        }
        (starsA.material.uniforms.uTime as { value: number }).value = t;
        (starsB.material.uniforms.uTime as { value: number }).value = t;
        (nebulaMaterial.uniforms.uTime as { value: number }).value = t;
        camera.lookAt(currentX * 0.105, -currentY * 0.07, -8);
        renderer.render(scene, camera);
        if (!reduced) raf = requestAnimationFrame(render);
      };

      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("resize", onResize, { passive: true });
      render();

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("resize", onResize);
        document.body.classList.remove("canvas-cursor-active");
        [starsA.geometry, starsB.geometry, nebulaGeometry, planeGeometry].forEach((g) => g.dispose());
        [starsA.material, starsB.material, nebulaMaterial, planeMaterial].forEach((m) => m.dispose());
        renderer.dispose();
      };
    });

    let idleId: number | undefined;
    let loadTimer: ReturnType<typeof globalThis.setTimeout> | undefined;
    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (handle: number) => void;
    };
    if (idleWindow.requestIdleCallback) {
      idleId = idleWindow.requestIdleCallback(loadScene, { timeout: 1200 });
    } else {
      loadTimer = globalThis.setTimeout(loadScene, 250);
    }

    return () => {
      disposed = true;
      if (idleId !== undefined) idleWindow.cancelIdleCallback?.(idleId);
      if (loadTimer !== undefined) globalThis.clearTimeout(loadTimer);
      cleanup();
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="space-canvas" aria-hidden="true" />
      <div ref={cursorRef} className="space-cursor" aria-hidden="true"><span /></div>
    </>
  );
}
