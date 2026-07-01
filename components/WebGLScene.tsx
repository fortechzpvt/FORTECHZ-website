"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

interface WebGLSceneProps {
  scrollProgress: number;
}

/**
 * Vanilla Three.js scene — zero three/examples/jsm imports.
 * Uses only the core `three` package to guarantee bundle evaluation succeeds.
 * Pointer drag replaces OrbitControls; multi-point lighting replaces env map.
 */
export default function WebGLScene({ scrollProgress }: WebGLSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(scrollProgress);

  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Guard: if anything in Three.js setup throws, log silently and bail —
    // the rest of the page must not be affected by WebGL failures.
    let cleanup: (() => void) | undefined;
    try {

    // ── Renderer ─────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    Object.assign(renderer.domElement.style, {
      position: "absolute",
      inset: "0",
      width: "100%",
      height: "100%",
    });
    container.appendChild(renderer.domElement);

    // ── Scene + Camera ────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    // ── Studio Lighting (black & white) ──────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    const key = new THREE.DirectionalLight(0xffffff, 4.5);
    key.position.set(6, 9, 5);
    key.castShadow = true;
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xcccccc, 1.2);
    fill.position.set(-8, -4, -5);
    scene.add(fill);

    const rim = new THREE.PointLight(0xffffff, 3.0);
    rim.position.set(-5, 5, -7);
    scene.add(rim);

    const kick = new THREE.PointLight(0xaaaaaa, 1.5);
    kick.position.set(0, -4, 3);
    scene.add(kick);

    const top = new THREE.PointLight(0xffffff, 1.8);
    top.position.set(0, 8, 0);
    scene.add(top);

    // ── Materials (black & white) ─────────────────────────────────────────────
    const porcelainMat = new THREE.MeshPhysicalMaterial({
      color: 0xb8d8ff,
      roughness: 0.06,
      metalness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
    });

    const chromeMat = new THREE.MeshPhysicalMaterial({
      color: 0x111111,
      roughness: 0.02,
      metalness: 1.0,
    });

    const chromeThinMat = new THREE.MeshPhysicalMaterial({
      color: 0x444444,
      roughness: 0.01,
      metalness: 0.95,
    });

    // ── Scene Objects ─────────────────────────────────────────────────────────
    const group = new THREE.Group();
    scene.add(group);

    const knotGeo = new THREE.TorusKnotGeometry(1, 0.28, 300, 48, 2, 3);
    const knot = new THREE.Mesh(knotGeo, porcelainMat);
    knot.castShadow = true;
    group.add(knot);

    const r1Geo = new THREE.TorusGeometry(1.95, 0.02, 20, 300);
    const ring1 = new THREE.Mesh(r1Geo, chromeMat);
    ring1.rotation.x = Math.PI / 4;
    group.add(ring1);

    const r2Geo = new THREE.TorusGeometry(2.25, 0.013, 20, 300);
    const ring2 = new THREE.Mesh(r2Geo, chromeThinMat);
    ring2.rotation.set(0, Math.PI / 6, Math.PI / 3.5);
    group.add(ring2);

    const r3Geo = new THREE.TorusGeometry(2.55, 0.009, 20, 300);
    const ring3 = new THREE.Mesh(r3Geo, chromeThinMat);
    ring3.rotation.set(Math.PI / 2.5, Math.PI / 5, 0);
    group.add(ring3);

    // ── Pointer Drag Rotation (replaces OrbitControls) ────────────────────────
    const MAX_AZIMUTH = Math.PI / 4.5;
    let isDragging = false;
    let prevX = 0;
    let azimuthOffset = 0;
    let azimuthVelocity = 0;

    function onPointerDown(e: PointerEvent) {
      isDragging = true;
      prevX = e.clientX;
      azimuthVelocity = 0;
      renderer.domElement.setPointerCapture(e.pointerId);
    }
    function onPointerMove(e: PointerEvent) {
      if (!isDragging) return;
      const dx = (e.clientX - prevX) * 0.007;
      azimuthVelocity = dx;
      azimuthOffset = Math.max(-MAX_AZIMUTH, Math.min(MAX_AZIMUTH, azimuthOffset + dx));
      prevX = e.clientX;
    }
    function onPointerUp() {
      isDragging = false;
    }

    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerup", onPointerUp);
    renderer.domElement.addEventListener("pointerleave", onPointerUp);

    // ── Animation Loop ────────────────────────────────────────────────────────
    let rafId: number;
    const clock = new THREE.Clock();

    function animate() {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Inertia damping when not dragging
      if (!isDragging && Math.abs(azimuthVelocity) > 0.0001) {
        azimuthOffset = Math.max(-MAX_AZIMUTH, Math.min(MAX_AZIMUTH, azimuthOffset + azimuthVelocity));
        azimuthVelocity *= 0.94;
      }

      group.rotation.x = scrollRef.current * 0.3;
      group.rotation.y = t * 0.055 + azimuthOffset;
      group.position.x = 1.5;
      group.position.y = Math.sin(t * 1.4) * 0.15;

      ring1.rotation.y = t * 0.45;
      ring2.rotation.x = -t * 0.3;
      ring3.rotation.z = t * 0.2;

      renderer.render(scene, camera);
    }

    animate();

    // ── Responsive Resize ─────────────────────────────────────────────────────
    const ro = new ResizeObserver(() => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    ro.observe(container);

    // ── Cleanup ───────────────────────────────────────────────────────────────
    cleanup = () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerup", onPointerUp);
      renderer.domElement.removeEventListener("pointerleave", onPointerUp);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      [porcelainMat, chromeMat, chromeThinMat].forEach((m) => m.dispose());
      [knotGeo, r1Geo, r2Geo, r3Geo].forEach((g) => g.dispose());
    };

    } catch (err) {
      console.warn("[WebGLScene] Three.js initialisation failed:", err);
    }

    return () => cleanup?.();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div ref={containerRef} style={{ position: "relative", width: "100%", height: "100%" }} />;
}
