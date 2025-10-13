import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import "../css/background.css";

export default function Background() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;
    document.body.classList.add("has-liquid-bg");
    const prevBodyBg = document.body.style.background;
    const prevBodyBgColor = document.body.style.backgroundColor;
    document.body.style.background = "transparent";
    document.body.style.backgroundColor = "transparent";

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  // Limit pixel ratio to avoid excessive GPU work on hi-dpi devices
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = "fixed";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.zIndex = "-1";
    renderer.domElement.style.pointerEvents = "none";
    document.body.appendChild(renderer.domElement);
    const app = document.querySelector(".app-container");
    if (app) app.style.position = app.style.position || "relative";
    if (app) app.style.zIndex = "2";

    const scene = new THREE.Scene();

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const geometry = new THREE.PlaneGeometry(2, 2);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0.0 },
        u_resolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        u_theme: { value: 1.0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        uniform float u_time;
        uniform vec2 u_resolution;
        uniform float u_theme;
        varying vec2 vUv;

        // Simple hash-based noise
        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }

        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
            mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
            u.y
          );
        }

        float fbm(vec2 p) {
          float v = 0.0;
          float a = 0.5;
          for (int i = 0; i < 5; i++) {
            v += a * noise(p);
            p *= 2.0;
            a *= 0.5;
          }
          return v;
        }



        void main() {
          vec2 uv = vUv;
          vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
          vec2 p = (uv - 0.5) * aspect * 1.6;
          float t = u_time * 0.25;

          // base noise fields
          float q = fbm(p + vec2(0.0, -t * 0.3));
          float r = fbm(p * 1.6 + q + vec2(t * 0.2));
          float v = fbm(p + r);

          // palettes for dark vs light
          vec3 darkA = vec3(0.05, 0.02, 0.15);
          vec3 darkB = vec3(0.45, 0.08, 0.85);
          vec3 darkC = vec3(0.02, 0.75, 0.85);

          vec3 lightA = vec3(0.95, 0.95, 0.98);
          vec3 lightB = vec3(0.85, 0.75, 0.95);
          vec3 lightC = vec3(0.75, 0.9, 0.95);

          vec3 colA = mix(lightA, darkA, u_theme);
          vec3 colB = mix(lightB, darkB, u_theme);
          vec3 colC = mix(lightC, darkC, u_theme);

          float mix1 = smoothstep(0.15, 0.7, v);
          vec3 color = mix(colA, colB, mix1);
          color = mix(color, colC, smoothstep(0.35, 0.9, r));



          // subtle vignetting
          float vig = smoothstep(0.9, 0.2, length(uv - 0.5));
          color *= mix(1.0, 0.7, vig);

          gl_FragColor = vec4(color, 0.95);
        }
      `,
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

  let frameId;
  const start = performance.now();
  // Cap the target frame rate to reduce CPU/GPU usage (e.g. 30 FPS)
  const TARGET_FPS = 30;
  const FRAME_INTERVAL = 1000 / TARGET_FPS;
  let lastFrameTime = performance.now();

    // Mouse-follow removed to reduce CPU/GPU load (was causing lag)

    function updateThemeUniform() {
      const isDark =
        document.documentElement.getAttribute("data-theme") === "dark";
      material.uniforms.u_theme.value = isDark ? 1.0 : 0.0;
    }
    updateThemeUniform();
    const themeObserver = new MutationObserver(updateThemeUniform);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    function render() {
      const nowMs = performance.now();
      const elapsed = nowMs - lastFrameTime;
      if (elapsed < FRAME_INTERVAL) {
        // skip this frame to cap FPS
        frameId = requestAnimationFrame(render);
        return;
      }
      lastFrameTime = nowMs;

      const now = (nowMs - start) / 1000;
      material.uniforms.u_time.value = now;

      // No mouse interactions — purely time-based animation

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(render);
    }

    if (!prefersReducedMotion) render();
    else {
      material.uniforms.u_time.value = 0.0;
      renderer.render(scene, camera);
    }

    // Debounce resize handler to avoid thrashing during resizes
    let resizeTimeout = null;
    function onResize() {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        renderer.setSize(w, h);
        material.uniforms.u_resolution.value.set(w, h);
        resizeTimeout = null;
      }, 150);
    }

    window.addEventListener("resize", onResize);

    return () => {
      document.body.classList.remove("has-liquid-bg");
      document.body.style.background = prevBodyBg;
      document.body.style.backgroundColor = prevBodyBgColor;
  window.removeEventListener("resize", onResize);
      themeObserver.disconnect();
      if (frameId) cancelAnimationFrame(frameId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement && document.body.contains(renderer.domElement))
        document.body.removeChild(renderer.domElement);
      const app = document.querySelector(".app-container");
      if (app) app.style.zIndex = "";
    };
  }, []);

  return <div ref={mountRef} className="liquid-bg" aria-hidden="true" />;
}
