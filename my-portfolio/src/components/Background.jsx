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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
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
        u_mouse: { value: new THREE.Vector2(-10, -10) },
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
        uniform vec2 u_mouse;
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

        // Influence map around mouse
        float influence(vec2 p, vec2 m, float radius) {
          float d = length(p - m);
          return smoothstep(radius, 0.0, d);
        }

        void main() {
          vec2 uv = vUv;
          vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
          vec2 p = (uv - 0.5) * aspect * 1.6;
          float t = u_time * 0.25;

          // mouse in normalized -1..1 coords
          vec2 mouseN = (u_mouse / u_resolution) - 0.5;
          mouseN *= aspect;

          // base noise fields
          float q = fbm(p + vec2(0.0, -t * 0.3));
          float r = fbm(p * 1.6 + q + vec2(t * 0.2));
          float v = fbm(p + r);

          // add a stronger blob where the mouse is
          float mInfluence = influence(p, mouseN, 0.6);
          v += mInfluence * 0.8;

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

          // mouse highlight: add color splash near mouse
          float mouseSplash = influence(p, mouseN, 0.4);
          color += (1.0 - u_theme) * vec3(0.12, 0.3, 0.9) * mouseSplash * 0.6;
          color += u_theme * vec3(0.8, 0.1, 0.9) * mouseSplash * 0.45;

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

    const mouse = new THREE.Vector2(-10000, -10000);
    const mouseTarget = new THREE.Vector2(-10000, -10000);
    let lastMove = 0;

    function onPointerMove(e) {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseTarget.set(x, y);
      lastMove = performance.now();
    }

    function onTouch(e) {
      if (e.touches && e.touches.length) {
        const t = e.touches[0];
        onPointerMove(t);
      }
    }

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("touchmove", onTouch, { passive: true });

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
      const now = (performance.now() - start) / 1000;
      material.uniforms.u_time.value = now;

  mouse.lerp(mouseTarget, 0.12);
  // DOM mouse Y = 0 at top; shader vUv Y = 0 at bottom.
  // Flip the Y coordinate so moving the mouse up moves the effect up.
  material.uniforms.u_mouse.value.set(mouse.x, window.innerHeight - mouse.y);

      if (performance.now() - lastMove > 2000) {
        mouseTarget.lerp(new THREE.Vector2(-10000, -10000), 0.02);
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(render);
    }

    if (!prefersReducedMotion) render();
    else {
      material.uniforms.u_time.value = 0.0;
      renderer.render(scene, camera);
    }

    function onResize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      material.uniforms.u_resolution.value.set(w, h);
    }

    window.addEventListener("resize", onResize);

    return () => {
      document.body.classList.remove("has-liquid-bg");
      document.body.style.background = prevBodyBg;
      document.body.style.backgroundColor = prevBodyBgColor;
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchmove", onTouch);
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
