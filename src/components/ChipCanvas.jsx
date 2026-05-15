import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ChipCanvas({ mousePos }) {
  const mountRef = useRef(null);
  const sceneRef = useRef({});

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth;
    const H = mount.clientHeight;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    mount.appendChild(renderer.domElement);

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
    camera.position.set(0, 0, 5);

    // Group to rotate
    const group = new THREE.Group();
    scene.add(group);

    // ─── Chip body ───
    const chipGeo = new THREE.BoxGeometry(2.4, 2.4, 0.25, 4, 4, 1);
    const chipMat = new THREE.MeshStandardMaterial({
      color: 0x061420,
      metalness: 0.6,
      roughness: 0.3,
      emissive: 0x001122,
    });
    const chip = new THREE.Mesh(chipGeo, chipMat);
    group.add(chip);

    // ─── Top layer (die surface) ───
    const dieGeo = new THREE.BoxGeometry(1.8, 1.8, 0.05);
    const dieMat = new THREE.MeshStandardMaterial({
      color: 0x0a2040,
      metalness: 0.4,
      roughness: 0.5,
      emissive: 0x003366,
      emissiveIntensity: 0.3,
    });
    const die = new THREE.Mesh(dieGeo, dieMat);
    die.position.z = 0.15;
    group.add(die);

    // ─── Circuit lines on die (emissive stripes) ───
    const tracePositions = [
      [-0.6, 0], [0, 0], [0.6, 0],
      [0, -0.6], [0, 0.6],
    ];
    tracePositions.forEach(([x, y]) => {
      const tGeo = new THREE.BoxGeometry(0.04, 1.4, 0.02);
      const tMat = new THREE.MeshStandardMaterial({
        color: 0x00f5ff, emissive: 0x00f5ff, emissiveIntensity: 0.8,
        metalness: 1, roughness: 0.1,
      });
      const trace = new THREE.Mesh(tGeo, tMat);
      trace.position.set(x, y, 0.18);
      group.add(trace);

      const hGeo = new THREE.BoxGeometry(1.4, 0.04, 0.02);
      const hTrace = new THREE.Mesh(hGeo, tMat.clone());
      hTrace.position.set(x * 0.5, y * 0.5, 0.18);
      group.add(hTrace);
    });

    // ─── Chip pads (bond wires on perimeter) ───
    const padPositions = [];
    const padCount = 6;
    for (let i = 0; i < padCount; i++) {
      const t = (i / padCount) - 0.08;
      padPositions.push({ x: -1.35, y: -0.9 + t * 3, side: 'left' });
      padPositions.push({ x: 1.35, y: -0.9 + t * 3, side: 'right' });
      padPositions.push({ x: -0.9 + t * 3, y: -1.35, side: 'bottom' });
      padPositions.push({ x: -0.9 + t * 3, y: 1.35, side: 'top' });
    }
    padPositions.forEach(({ x, y }) => {
      const padGeo = new THREE.BoxGeometry(0.08, 0.18, 0.06);
      const padMat = new THREE.MeshStandardMaterial({
        color: 0xffaa00, metalness: 0.9, roughness: 0.1,
        emissive: 0xff8800, emissiveIntensity: 0.4,
      });
      const pad = new THREE.Mesh(padGeo, padMat);
      pad.position.set(x, y, 0.15);
      if (Math.abs(x) > Math.abs(y)) pad.rotation.z = Math.PI / 2;
      group.add(pad);
    });

    // ─── Center core glow ───
    const coreGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x00f5ff, emissive: 0x00f5ff, emissiveIntensity: 2,
      transparent: true, opacity: 0.9,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.position.z = 0.2;
    group.add(core);

    // ─── Ring orbits ───
    const ringColors = [0x00f5ff, 0x7b2fff, 0x00ff88];
    ringColors.forEach((color, i) => {
      const rGeo = new THREE.TorusGeometry(0.8 + i * 0.35, 0.008, 8, 80);
      const rMat = new THREE.MeshStandardMaterial({
        color, emissive: color, emissiveIntensity: 0.6, transparent: true, opacity: 0.7,
      });
      const ring = new THREE.Mesh(rGeo, rMat);
      ring.rotation.x = Math.PI / 2 - i * 0.3;
      ring.rotation.y = i * 0.6;
      ring.userData.rotSpeed = { x: 0.003 * (i % 2 === 0 ? 1 : -1), y: 0.005 * (i % 2 === 0 ? -1 : 1) };
      group.add(ring);
      sceneRef.current[`ring${i}`] = ring;
    });

    // ─── Orbiting signal nodes ───
    const orbitNodes = [];
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2;
      const radius = 1.6;
      const nGeo = new THREE.SphereGeometry(0.06, 8, 8);
      const nMat = new THREE.MeshStandardMaterial({
        color: 0x00f5ff, emissive: 0x00f5ff, emissiveIntensity: 2,
      });
      const node = new THREE.Mesh(nGeo, nMat);
      node.userData = { angle, radius, speed: 0.008 + i * 0.002, yOff: (i - 2) * 0.3 };
      group.add(node);
      orbitNodes.push(node);
    }

    // ─── Lighting ───
    scene.add(new THREE.AmbientLight(0x112233, 1));
    const ptLight1 = new THREE.PointLight(0x00f5ff, 3, 8);
    ptLight1.position.set(2, 2, 3);
    scene.add(ptLight1);
    const ptLight2 = new THREE.PointLight(0x7b2fff, 2, 6);
    ptLight2.position.set(-2, -1, 2);
    scene.add(ptLight2);
    const ptLight3 = new THREE.PointLight(0x00ff88, 1.5, 5);
    ptLight3.position.set(0, -3, 1);
    scene.add(ptLight3);

    sceneRef.current = { renderer, scene, camera, group, orbitNodes, ptLight1, chip, core };

    // ─── Animate ───
    let t = 0;
    const animate = () => {
      t += 0.01;
      const { group, orbitNodes, ptLight1, core } = sceneRef.current;

      group.rotation.y = t * 0.3 + (mousePos?.x || 0) * 0.3;
      group.rotation.x = Math.sin(t * 0.2) * 0.1 + (mousePos?.y || 0) * 0.2;

      orbitNodes.forEach(n => {
        n.userData.angle += n.userData.speed;
        const a = n.userData.angle;
        const r = n.userData.radius;
        n.position.set(Math.cos(a) * r, n.userData.yOff * 0.3, Math.sin(a) * r);
        n.material.emissiveIntensity = 1.5 + Math.sin(t * 3 + a) * 0.5;
      });

      // Ring rotation
      [0, 1, 2].forEach(i => {
        const ring = sceneRef.current[`ring${i}`];
        if (ring) {
          ring.rotation.x += ring.userData.rotSpeed.x;
          ring.rotation.z += ring.userData.rotSpeed.y;
        }
      });

      // Core pulse
      if (core) {
        core.material.emissiveIntensity = 1.5 + Math.sin(t * 4) * 0.5;
        core.scale.setScalar(1 + Math.sin(t * 3) * 0.1);
      }

      ptLight1.intensity = 2 + Math.sin(t * 2) * 0.5;

      renderer.render(scene, camera);
      sceneRef.current.raf = requestAnimationFrame(animate);
    };
    animate();

    // Resize
    const onResize = () => {
      const W2 = mount.clientWidth;
      const H2 = mount.clientHeight;
      camera.aspect = W2 / H2;
      camera.updateProjectionMatrix();
      renderer.setSize(W2, H2);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(sceneRef.current.raf);
      window.removeEventListener('resize', onResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}
