import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { heroStore, timeline } from './heroStore';
import { aquaEraTexture, flowTexture, panelTexture, ribBump, ribTexture, zempureTexture } from './decals';

/**
 * Aqua Era Zempure (Core Series), modelled from the front product photograph:
 * charcoal rear shell and base, a finely ribbed smoked tank on top edged in chrome, a brushed
 * band reading AQUA ERA, a framed black push tap with chrome nozzle, the "core SERIES · ZEMPURE®"
 * badge and a Power · Full · Alert control strip. Finishes: Charcoal Black (smoked tank) and Pearl White (frosted tank). Proportions follow the photo (W 1 : H 1.35).
 * It is a procedural, illustrative model — not a manufacturer CAD file.
 */

// Purifier-local units: width 1, height 1.35, bottom on the podium.
export const BOTTOM = -0.675;
const TOP = 0.675;
const FRONT = 0.28; // front face of the lower body and tank
const TANK_BOTTOM = -0.19;
const BAND_Y = -0.243;
const TAP_X = 0;
const NOZZLE_Y = -0.3;
const GLASS_Z = 0.375;
const GLASS_H = 0.2;
const GLASS_BOTTOM = BOTTOM + 0.004;
const WATER_MAX = 0.175;
export const GLASS_WORLD = new THREE.Vector3(TAP_X, GLASS_BOTTOM + GLASS_H / 2, GLASS_Z);

const CARTRIDGES = [
  { x: -0.3, color: '#ebe4d3' }, // sediment
  { x: -0.1, color: '#34373e' }, // activated carbon
  { x: 0.1, color: '#e3edf5' }, // RO membrane
  { x: 0.3, color: '#c4825a' }, // mineral / taste (where applicable)
];

export default function PurifierModel({ lowPower }: { lowPower: boolean }) {
  const group = useRef<THREE.Group>(null);
  const tapRef = useRef<THREE.Group>(null);
  const stream = useRef<THREE.Mesh>(null);
  const water = useRef<THREE.Mesh>(null);
  const waterTop = useRef<THREE.Mesh>(null);
  const tankWater = useRef<THREE.Mesh>(null);
  const cartGlow = useRef<(THREE.MeshStandardMaterial | null)[]>([]);
  const cartHalo = useRef<(THREE.MeshBasicMaterial | null)[]>([]);
  const icons = useRef<(THREE.MeshBasicMaterial | null)[]>([]);
  const bubbles = useRef<THREE.InstancedMesh>(null);
  const splash = useRef<THREE.InstancedMesh>(null);
  const badgeMat = useRef<THREE.MeshBasicMaterial>(null);
  const smoothP = useRef(heroStore.progress);
  const activeUntil = useRef(0);

  const textures = useMemo(
    () => ({ era: aquaEraTexture(), badge: zempureTexture(), panel: panelTexture(), ribs: ribTexture(), ribsLight: ribTexture(true), bump: ribBump(), flow: flowTexture() }),
    [],
  );

  // Satin charcoal body (rear shell + base) — becomes translucent for the x-ray stage.
  const shell = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#2c2e33',
        roughness: 0.52,
        metalness: 0.05,
        clearcoat: 0.35,
        clearcoatRoughness: 0.45,
        sheen: 0.4,
        sheenColor: new THREE.Color('#8a93a6'),
        sheenRoughness: 0.5,
        transparent: true,
      }),
    [],
  );
  // Smoked, finely ribbed tank.
  const tankFront = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        map: textures.ribs,
        bumpMap: textures.bump,
        bumpScale: 1.2,
        roughness: 0.22,
        metalness: 0.1,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
        envMapIntensity: 1.6,
        transparent: true,
        opacity: 0.94,
      }),
    [textures],
  );
  const tankBody = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color: '#23262b', roughness: 0.18, clearcoat: 1, transparent: true, opacity: 0.82, depthWrite: false }),
    [],
  );
  const chrome = useMemo(() => new THREE.MeshStandardMaterial({ color: '#f4f6f9', metalness: 0.9, roughness: 0.16, envMapIntensity: 2.6 }), []);
  const brushed = useMemo(() => new THREE.MeshStandardMaterial({ color: '#d9dce1', metalness: 0.7, roughness: 0.3, envMapIntensity: 2.2 }), []);
  const black = useMemo(() => new THREE.MeshPhysicalMaterial({ color: '#101114', roughness: 0.3, clearcoat: 0.8 }), []);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const targets = useMemo(() => ({ shell: new THREE.Color(), tank: new THREE.Color(), ink: new THREE.Color() }), []);
  const bubbleCount = lowPower ? 10 : 22;
  const seeds = useMemo(
    () => Array.from({ length: 24 }, (_, i) => ({ a: (i * 2.399) % (Math.PI * 2), r: 0.012 + ((i * 7) % 10) * 0.003, o: (i * 0.137) % 1, s: 0.7 + ((i * 3) % 5) * 0.12 })),
    [],
  );

  useEffect(
    () => () => {
      [shell, tankFront, tankBody, chrome, brushed, black].forEach((m) => m.dispose());
      Object.values(textures).forEach((t) => t.dispose());
    },
    [shell, tankFront, tankBody, chrome, brushed, black, textures],
  );

  useFrame((state, dt) => {
    const p = heroStore.progress;
    smoothP.current = THREE.MathUtils.damp(smoothP.current, p, 5, Math.min(dt, 0.05));
    if (Math.abs(smoothP.current - p) < 0.0004) smoothP.current = p;
    const t = timeline(smoothP.current);
    const now = state.clock.elapsedTime;

    // finish: Charcoal Black (smoked tank) ↔ Pearl White (frosted tank), eased
    const pearl = heroStore.finish === 'pearl-white';
    targets.shell.set(pearl ? '#e9ebed' : '#2c2e33');
    targets.tank.set(pearl ? '#c3c9d0' : '#23262b');
    targets.ink.set(pearl ? '#2a2d33' : '#ffffff');
    const k = 1 - Math.exp(-Math.min(dt, 0.05) * 8);
    shell.color.lerp(targets.shell, k);
    tankBody.color.lerp(targets.tank, k);
    badgeMat.current?.color.lerp(targets.ink, k);
    const wantMap = pearl ? textures.ribsLight : textures.ribs;
    if (tankFront.map !== wantMap) {
      tankFront.map = wantMap;
      tankFront.needsUpdate = true;
    }
    const finishSettled = Math.abs(shell.color.r - targets.shell.r) + Math.abs(shell.color.g - targets.shell.g) + Math.abs(shell.color.b - targets.shell.b) < 0.004;

    // 1. rotate to face the visitor
    if (group.current) group.current.rotation.y = THREE.MathUtils.lerp(-0.6, 0, t.turn);

    // 2. translucent shell & tank
    shell.opacity = 1 - 0.8 * t.xray;
    shell.depthWrite = shell.opacity > 0.97;
    tankFront.opacity = 0.94 - 0.7 * t.xray;
    tankBody.opacity = 0.82 - 0.62 * t.xray;

    // 3. cartridges illuminate in sequence
    t.cartridges.forEach((v, i) => {
      const lit = v * t.xray;
      const m = cartGlow.current[i];
      if (m) m.emissiveIntensity = lit * 1.4;
      const h = cartHalo.current[i];
      if (h) h.opacity = lit * 0.3;
    });

    // 4 + 9. tap pressed / released
    if (tapRef.current) tapRef.current.position.z = -0.016 * t.tap;

    // 6. glass fills; the tank level drops slightly
    const level = Math.max(0.0001, t.fill * WATER_MAX);
    if (water.current) {
      water.current.scale.y = level;
      water.current.position.y = GLASS_BOTTOM + 0.006 + level / 2;
      water.current.visible = t.fill > 0.004;
    }
    if (waterTop.current) {
      waterTop.current.position.y = GLASS_BOTTOM + 0.006 + level;
      waterTop.current.visible = t.fill > 0.004;
      waterTop.current.scale.setScalar(0.88 + 0.12 * (level / WATER_MAX));
    }
    if (tankWater.current) {
      const s = 1 - 0.15 * t.fill;
      tankWater.current.scale.y = s;
      tankWater.current.position.y = TANK_BOTTOM + 0.02 + 0.26 * s;
    }

    // 5. water stream from the nozzle to the water surface
    const surface = GLASS_BOTTOM + 0.006 + level;
    const length = (NOZZLE_Y - surface) * t.stream;
    if (stream.current) {
      stream.current.visible = t.stream > 0.01;
      stream.current.scale.set(1 + Math.sin(now * 30) * 0.04, Math.max(0.0001, length), 1);
      stream.current.position.y = NOZZLE_Y - length / 2;
      textures.flow.offset.y = (now * 2.4) % 1;
    }

    // bubbles rising in the glass
    if (bubbles.current) {
      for (let i = 0; i < bubbleCount; i++) {
        const s = seeds[i];
        const rise = (now * (0.05 + s.s * 0.03) + s.o) % 1;
        dummy.position.set(TAP_X + Math.cos(s.a + rise * 2) * s.r, GLASS_BOTTOM + 0.012 + rise * level * 0.92, GLASS_Z + Math.sin(s.a) * s.r);
        dummy.scale.setScalar(0.0036 * s.s * (t.fill > 0.06 ? 1 : 0) * (0.6 + rise * 0.6));
        dummy.updateMatrix();
        bubbles.current.setMatrixAt(i, dummy.matrix);
      }
      bubbles.current.instanceMatrix.needsUpdate = true;
    }

    // subtle splash where the stream meets the water
    if (splash.current) {
      const n = splash.current.count;
      for (let i = 0; i < n; i++) {
        const ph = (now * 1.8 + i / n) % 1;
        const a = (i / n) * Math.PI * 2;
        dummy.position.set(TAP_X + Math.cos(a) * ph * 0.034, surface + Math.sin(Math.PI * ph) * 0.024, GLASS_Z + Math.sin(a) * ph * 0.034);
        dummy.scale.setScalar(0.005 * t.stream * (1 - ph));
        dummy.updateMatrix();
        splash.current.setMatrixAt(i, dummy.matrix);
      }
      splash.current.instanceMatrix.needsUpdate = true;
    }

    // control strip glow: Power always on, Full in the final state, Alert off
    const [power, full, alert] = icons.current;
    if (power) power.opacity = 0.55;
    if (alert) alert.opacity = 0.04; // Alert stays off — nothing is wrong
    if (full) full.opacity = 0.08 + 0.85 * t.ready;

    // demand-driven rendering: only request frames while something moves
    if (t.stream > 0.01) activeUntil.current = now + 2.5;
    if (smoothP.current !== p || now < activeUntil.current || !finishSettled) state.invalidate();
  });

  return (
    <group ref={group} rotation={[0, -0.6, 0]}>
      {/* rear shell (visible at the sides) and lower body */}
      <RoundedBox args={[1, 1.28, 0.4]} radius={0.045} smoothness={5} position={[0, (BOTTOM + 0.605) / 2, -0.1]} material={shell} castShadow />
      <RoundedBox args={[1, 0.39, 0.58]} radius={0.05} smoothness={5} position={[0, BOTTOM + 0.195, -0.01]} material={shell} castShadow />

      {/* smoked ribbed tank with lid and chrome side edges */}
      <RoundedBox args={[0.94, 0.86, 0.4]} radius={0.022} smoothness={4} position={[0, (TOP + TANK_BOTTOM) / 2 - 0.005, 0.078]} material={tankBody} />
      <mesh position={[0, (TOP + TANK_BOTTOM) / 2 - 0.01, FRONT + 0.001]} material={tankFront}>
        <planeGeometry args={[0.91, 0.83]} />
      </mesh>
      <mesh ref={tankWater} position={[0, 0.1, 0.07]}>
        <boxGeometry args={[0.86, 0.52, 0.34]} />
        <meshStandardMaterial color="#7fc2dc" transparent opacity={0.16} roughness={0.1} depthWrite={false} />
      </mesh>
      <RoundedBox args={[0.95, 0.024, 0.41]} radius={0.01} smoothness={3} position={[0, TOP - 0.008, 0.078]} material={black} />
      {[-0.466, 0.466].map((x) => (
        <mesh key={x} position={[x, (TOP + TANK_BOTTOM) / 2 - 0.01, FRONT - 0.002]} material={chrome}>
          <boxGeometry args={[0.012, 0.84, 0.014]} />
        </mesh>
      ))}

      {/* brushed AQUA ERA band wrapping the tank base */}
      <RoundedBox args={[0.945, 0.104, 0.42]} radius={0.012} smoothness={3} position={[0, BAND_Y, 0.075]} material={brushed} />
      <mesh position={[-0.33, BAND_Y, FRONT + 0.008]}>
        <planeGeometry args={[0.2, 0.0625]} />
        <meshBasicMaterial map={textures.era} transparent depthWrite={false} />
      </mesh>

      {/* chrome tap frame, black push tap, chrome nozzle, drip slot */}
      <mesh position={[TAP_X, -0.262, FRONT + 0.004]}>
        <planeGeometry args={[0.13, 0.34]} />
        <meshStandardMaterial color="#0c0d10" roughness={0.4} />
      </mesh>
      {(
        [
          [TAP_X - 0.07, -0.262, 0.016, 0.36],
          [TAP_X + 0.07, -0.262, 0.016, 0.36],
          [TAP_X, -0.088, 0.156, 0.016],
          [TAP_X, -0.436, 0.156, 0.016],
        ] as const
      ).map(([x, y, w, h], i) => (
        <RoundedBox key={i} args={[w, h, 0.03]} radius={0.006} smoothness={2} position={[x, y, FRONT + 0.016]} material={chrome} />
      ))}
      <group ref={tapRef}>
        <RoundedBox args={[0.1, 0.15, 0.085]} radius={0.012} smoothness={3} position={[TAP_X, -0.18, FRONT + 0.05]} material={black} />
        <mesh position={[TAP_X, NOZZLE_Y + 0.022, GLASS_Z - 0.01]} material={chrome}>
          <cylinderGeometry args={[0.022, 0.022, 0.05, 32]} />
        </mesh>
        <mesh position={[TAP_X, NOZZLE_Y - 0.004, GLASS_Z - 0.01]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.012, 24]} />
          <meshBasicMaterial color="#050506" />
        </mesh>
      </group>
      <mesh position={[TAP_X, -0.41, FRONT + 0.02]} material={black}>
        <boxGeometry args={[0.11, 0.022, 0.04]} />
      </mesh>

      {/* core SERIES · ZEMPURE® badge */}
      <mesh position={[0.24, -0.468, FRONT + 0.002]}>
        <planeGeometry args={[0.44, 0.129]} />
        <meshBasicMaterial ref={badgeMat} map={textures.badge} transparent depthWrite={false} />
      </mesh>

      {/* Power · Full · Alert control strip with glowing icons */}
      <RoundedBox args={[0.77, 0.1, 0.012]} radius={0.005} smoothness={2} position={[0, -0.574, FRONT + 0.004]} material={black} />
      <mesh position={[0, -0.574, FRONT + 0.011]}>
        <planeGeometry args={[0.76, 0.095]} />
        <meshBasicMaterial map={textures.panel} transparent depthWrite={false} />
      </mesh>
      {(
        [
          [-0.298, '#9fd8ff'],
          [-0.207, '#5ef0a0'],
          [-0.119, '#ffb547'],
        ] as const
      ).map(([x, c], i) => (
        <mesh key={i} position={[x, -0.565, FRONT + 0.013]}>
          <circleGeometry args={[0.022, 24]} />
          <meshBasicMaterial ref={(m) => void (icons.current[i] = m)} color={c} transparent opacity={0.2} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
        </mesh>
      ))}

      {/* subtle light streaks along the tank's chrome edges and lid */}
      <mesh position={[0, TOP + 0.005, FRONT - 0.01]}>
        <planeGeometry args={[0.9, 0.004]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.5} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {/* four illustrative cartridges, revealed when the shell turns translucent */}
      {CARTRIDGES.map((c, i) => (
        <group key={i} position={[c.x, 0.06, -0.12]}>
          <mesh>
            <cylinderGeometry args={[0.055, 0.055, 0.62, 32]} />
            <meshStandardMaterial ref={(m) => void (cartGlow.current[i] = m)} color={c.color} emissive="#7fd3f0" emissiveIntensity={0} roughness={0.4} />
          </mesh>
          {[0.31, -0.31].map((y) => (
            <mesh key={y} position={[0, y, 0]}>
              <cylinderGeometry args={[0.06, 0.06, 0.03, 32]} />
              <meshStandardMaterial color="#e9eef5" roughness={0.3} />
            </mesh>
          ))}
          <mesh>
            <cylinderGeometry args={[0.08, 0.08, 0.66, 32, 1, true]} />
            <meshBasicMaterial ref={(m) => void (cartHalo.current[i] = m)} color="#a9dce7" transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}

      {/* water stream */}
      <mesh ref={stream} position={[TAP_X, NOZZLE_Y, GLASS_Z - 0.01]} visible={false}>
        <cylinderGeometry args={[0.009, 0.011, 1, 16, 1, true]} />
        <meshStandardMaterial color="#d6f2ff" emissive="#7fc8e6" emissiveIntensity={0.35} alphaMap={textures.flow} transparent opacity={0.88} roughness={0.05} depthWrite={false} />
      </mesh>

      {/* glass, standing on the podium under the tap */}
      <group position={[TAP_X, 0, GLASS_Z]}>
        <mesh position={[0, GLASS_BOTTOM + GLASS_H / 2, 0]}>
          <cylinderGeometry args={[0.058, 0.05, GLASS_H, 48, 1, true]} />
          <meshPhysicalMaterial color="#ffffff" transparent opacity={0.22} roughness={0.03} clearcoat={1} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
        <mesh position={[0, GLASS_BOTTOM + 0.004, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.01, 48]} />
          <meshPhysicalMaterial color="#e8f6fb" transparent opacity={0.5} roughness={0.05} />
        </mesh>
        <mesh position={[0, GLASS_BOTTOM + GLASS_H, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.058, 0.002, 8, 48]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.65} />
        </mesh>
      </group>
      <mesh ref={water} position={[TAP_X, GLASS_BOTTOM, GLASS_Z]} visible={false}>
        <cylinderGeometry args={[0.054, 0.048, 1, 48]} />
        <meshStandardMaterial color="#9fdcf2" transparent opacity={0.55} roughness={0.05} emissive="#3d8fb8" emissiveIntensity={0.15} depthWrite={false} />
      </mesh>
      <mesh ref={waterTop} position={[TAP_X, GLASS_BOTTOM, GLASS_Z]} rotation={[-Math.PI / 2, 0, 0]} visible={false}>
        <circleGeometry args={[0.055, 48]} />
        <meshStandardMaterial color="#e9fbff" transparent opacity={0.75} roughness={0.02} depthWrite={false} />
      </mesh>
      <instancedMesh ref={bubbles} args={[undefined, undefined, bubbleCount]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
      </instancedMesh>
      <instancedMesh ref={splash} args={[undefined, undefined, lowPower ? 6 : 12]}>
        <sphereGeometry args={[1, 6, 6]} />
        <meshBasicMaterial color="#e6f8ff" transparent opacity={0.85} />
      </instancedMesh>
    </group>
  );
}
