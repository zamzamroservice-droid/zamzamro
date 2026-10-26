import { useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, Lightformer, PerformanceMonitor } from '@react-three/drei';
import * as THREE from 'three';
import PurifierModel, { BOTTOM, GLASS_WORLD } from './PurifierModel';
import { heroStore, timeline } from './heroStore';

/** Frames the purifier for the current viewport and moves gently toward the glass during the pour. */
function CameraRig({ mobile }: { mobile: boolean }) {
  // `mobile` here means the stacked layout: copy above, product below.
  const { camera, size, invalidate } = useThree();
  const smoothP = useMemo(() => ({ v: heroStore.progress }), []);
  const look = useMemo(() => new THREE.Vector3(), []);
  const base = useMemo(() => new THREE.Vector3(), []);
  const near = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    heroStore.invalidate = invalidate;
    // Make sure the first frames are drawn once the scene, environment and fonts are ready.
    const timers = [0, 120, 400, 1200].map((ms) => setTimeout(invalidate, ms));
    document.fonts?.ready.then(() => invalidate());
    return () => {
      timers.forEach(clearTimeout);
      heroStore.invalidate = () => {};
    };
  }, [invalidate]);

  useFrame((_, dt) => {
    const cam = camera as THREE.PerspectiveCamera;
    const aspect = size.width / size.height;
    smoothP.v = THREE.MathUtils.damp(smoothP.v, heroStore.progress, 5, Math.min(dt, 0.05));
    const t = timeline(smoothP.v);
    const tanHalf = Math.tan(THREE.MathUtils.degToRad(cam.fov / 2));

    // Distance that keeps the whole machine + podium in view (mobile leaves the top for text).
    const needH = mobile ? Math.max(1.55 / aspect, 3.5) : Math.max(2.35, 1.9 / aspect);
    const dist = needH / (2 * tanHalf);
    base.set(mobile ? 0 : -0.95 * Math.min(1.25, aspect / 1.6), mobile ? 0.62 : 0.02, 0);

    // Dolly toward the glass. On mobile it stays wide so the machine is never cropped.
    near.copy(GLASS_WORLD);
    near.x += mobile ? 0 : -0.32;
    near.y += 0.06;
    const k = mobile ? 0.6 : 1;
    look.copy(base).lerp(near, t.dolly * k);
    const d = THREE.MathUtils.lerp(dist, dist * (mobile ? 0.72 : 0.6), t.dolly);
    cam.position.set(look.x + 0.05, look.y + d * 0.13, d);
    cam.lookAt(look);
  });
  return null;
}

function Podium() {
  return (
    <group position={[0, BOTTOM, 0]}>
      <mesh position={[0, -0.06, 0]} receiveShadow>
        <cylinderGeometry args={[0.82, 0.86, 0.12, 96]} />
        <meshPhysicalMaterial color="#f5f2ec" roughness={0.32} clearcoat={0.5} clearcoatRoughness={0.25} />
      </mesh>
      <mesh position={[0, 0.001, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.82, 0.006, 12, 120]} />
        <meshStandardMaterial color="#c6ad7c" metalness={1} roughness={0.25} />
      </mesh>
      <mesh position={[0, -0.12, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.86, 0.004, 12, 120]} />
        <meshStandardMaterial color="#a68a55" metalness={1} roughness={0.3} />
      </mesh>
      <ContactShadows position={[0, 0.002, 0]} scale={2.2} blur={2.4} far={1.2} opacity={0.5} resolution={512} color="#141838" />
    </group>
  );
}

interface Props {
  mobile: boolean;
  stacked: boolean;
  active: boolean;
  onReady: () => void;
}

export default function PurifierCanvas({ mobile, stacked, active, onReady }: Props) {
  const [dpr, setDpr] = useState(() => Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2));
  const lowPower = mobile || (navigator.hardwareConcurrency ?? 8) <= 4;

  useEffect(() => {
    if (active) heroStore.invalidate();
  }, [active]);

  return (
    <Canvas
      frameloop={active ? 'demand' : 'never'}
      dpr={dpr}
      camera={{ fov: 30, near: 0.1, far: 50, position: [0, 0.4, 5] }}
      gl={{ antialias: !lowPower || dpr < 1.5, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
        requestAnimationFrame(onReady);
      }}
      aria-hidden
      style={{ position: 'absolute', inset: 0 }}
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[2.5, 4, 3]} intensity={1.6} />
      <directionalLight position={[-3, 1.5, -2]} intensity={0.9} color="#a9dce7" />
      {/* soft rim light so the charcoal silhouette separates from the water background */}
      <directionalLight position={[0, 2, -4]} intensity={1.4} color="#e6f6f8" />
      {/* Procedural studio environment — no external HDR download. Strips create the edge highlights. */}
      <Environment resolution={lowPower ? 64 : 128} frames={1}>
        <Lightformer form="rect" intensity={2.2} position={[0, 4, 2]} scale={[6, 2, 1]} />
        <Lightformer form="rect" intensity={1.6} position={[-4, 1, 1]} rotation-y={Math.PI / 2} scale={[0.3, 5, 1]} />
        <Lightformer form="rect" intensity={1.2} position={[4, 0.5, 1]} rotation-y={-Math.PI / 2} scale={[0.3, 4, 1]} />
        <Lightformer form="ring" intensity={0.8} color="#a9dce7" position={[0, 1, -4]} scale={3} />
        <Lightformer form="rect" intensity={1.4} position={[0, 0.2, 4]} scale={[3, 0.25, 1]} />
      </Environment>
      <CameraRig mobile={stacked} />
      <PurifierModel lowPower={lowPower} />
      <Podium />
    </Canvas>
  );
}
