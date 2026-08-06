import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";

/**
 * Interactive 3D Globe with NASA Blue Marble texture.
 *
 * Features:
 *  - NASA Blue Marble earth texture with bump mapping
 *  - Auto-rotates continuously
 *  - Mouse-follow tilt interaction
 *  - Exposes Three.js objects via `onReady` for GSAP scroll animations
 */

// ─── component ──────────────────────────────────────────────────────────────

export default function Globe({ onReady, className = "" }) {
  const containerRef = useRef(null);
  const cleanupRef = useRef(null);

  const init = useCallback(
    (container) => {
      if (!container) return;

      // ── sizes ──
      const width = container.clientWidth;
      const height = container.clientHeight;

      // ── renderer ──
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // ── scene & camera ──
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.z = 5.5;

      // ── globe group ──
      const globeGroup = new THREE.Group();
      scene.add(globeGroup);

      // ── textured earth sphere ──
      const RADIUS = 1.8;
      const textureLoader = new THREE.TextureLoader();

      const earthGeometry = new THREE.SphereGeometry(RADIUS, 96, 96);
      const earthMaterial = new THREE.MeshPhongMaterial({
        shininess: 25,
        transparent: false,
      });

      // Load the Blue Marble texture
      textureLoader.load("/earth-blue-marble.jpg", (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        earthMaterial.map = texture;
        earthMaterial.needsUpdate = true;
      });

      // Load bump/topology map for terrain depth
      textureLoader.load("/earth-topology.png", (bumpTexture) => {
        earthMaterial.bumpMap = bumpTexture;
        earthMaterial.bumpScale = 0.04;
        earthMaterial.needsUpdate = true;
      });

      const earth = new THREE.Mesh(earthGeometry, earthMaterial);
      globeGroup.add(earth);



      // ── lighting ──
      const ambient = new THREE.AmbientLight(0xbbbbbb, 1.2);
      scene.add(ambient);
      const directional = new THREE.DirectionalLight(0xffffff, 2.0);
      directional.position.set(5, 3, 5);
      scene.add(directional);
      const backLight = new THREE.DirectionalLight(0x4488ff, 0.3);
      backLight.position.set(-5, -2, -5);
      scene.add(backLight);

      // ── mouse-follow tilt state ──
      const baseTiltX = 0.25; // default slight tilt
      const autoRotateSpeed = 0.002;
      const tiltStrength = 0.3; // how much the globe tilts toward cursor
      let targetTiltX = baseTiltX;
      let targetTiltY = 0;
      let currentTiltX = baseTiltX;
      let currentTiltY = 0;
      const lerpFactor = 0.04; // smooth interpolation speed

      const onMouseMove = (e) => {
        // Normalise mouse position to -1..1 relative to viewport center
        const nx = (e.clientX / window.innerWidth) * 2 - 1;
        const ny = (e.clientY / window.innerHeight) * 2 - 1;

        // Tilt toward cursor: X tilt follows vertical mouse, Y offset follows horizontal
        targetTiltX = baseTiltX + ny * tiltStrength;
        targetTiltY = nx * tiltStrength;
      };

      const onMouseLeave = () => {
        // Return to neutral when cursor leaves
        targetTiltX = baseTiltX;
        targetTiltY = 0;
      };

      window.addEventListener("mousemove", onMouseMove);
      container.addEventListener("mouseleave", onMouseLeave);

      // ── animation loop ──
      let frameId;
      const animate = () => {
        frameId = requestAnimationFrame(animate);

        // Continuous Y auto-rotation
        globeGroup.rotation.y += autoRotateSpeed;

        // Smoothly lerp current tilt toward target
        currentTiltX += (targetTiltX - currentTiltX) * lerpFactor;
        currentTiltY += (targetTiltY - currentTiltY) * lerpFactor;

        globeGroup.rotation.x = currentTiltX;
        // Apply the horizontal tilt as a slight additional Y rotation offset
        // stored separately so it doesn't fight auto-rotate
        globeGroup.position.x = currentTiltY * 0.15;
        globeGroup.position.y = -(currentTiltX - baseTiltX) * 0.15;

        renderer.render(scene, camera);
      };
      animate();

      // ── resize handler ──
      const onResize = () => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

      // ── expose objects for GSAP ScrollTrigger in parent ──
      if (onReady) {
        onReady({ scene, camera, renderer, globeGroup });
      }

      // ── cleanup ──
      cleanupRef.current = () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("mousemove", onMouseMove);
        container.removeEventListener("mouseleave", onMouseLeave);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      };
    },
    [onReady]
  );

  useEffect(() => {
    const container = containerRef.current;
    init(container);
    return () => {
      if (cleanupRef.current) cleanupRef.current();
    };
  }, [init]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "auto",
      }}
    />
  );
}
