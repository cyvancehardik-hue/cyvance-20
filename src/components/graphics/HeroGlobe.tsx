import { Canvas, useFrame } from '@react-three/fiber';
import { Line, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useMemo, useRef } from 'react';

function Globe() {
  const group = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    group.current.rotation.y += delta * 0.08;
  });

  const arcs = useMemo(() => {
    const points: Array<[number, number]> = [
      [-74, 40], // NYC
      [2.35, 48.85], // Paris
      [139.7, 35.6], // Tokyo
      [77.2, 28.6], // Delhi
      [-0.12, 51.5], // London
      [151.2, -33.8], // Sydney
      [-58.4, -34.6], // Buenos Aires
      [103.8, 1.3], // Singapore
    ];
    const pairs: Array<[THREE.Vector3, THREE.Vector3]> = [];
    for (let i = 0; i < points.length; i += 2) {
      const a = points[i];
      const b = points[(i + 1) % points.length];
      pairs.push([latLngToVec(a[1], a[0]), latLngToVec(b[1], b[0])]);
    }
    return pairs;
  }, []);

  const lines = useMemo(() => {
    return arcs.map(([start, end]) => curveBetween(start, end));
  }, [arcs]);

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[1.4, 48, 48]} />
        <meshBasicMaterial color={hslColor('--neon-blue')} wireframe transparent opacity={0.35} />
      </mesh>

      {/* Network arcs */}
      {lines.map((pts, i) => (
        <Line
          key={i}
          points={pts}
          color={hslColor('--cyber-purple')}
          linewidth={1}
          dashed={false}
          transparent
          opacity={0.85}
        />
      ))}

      {/* Atmosphere glow */}
      <mesh>
        <sphereGeometry args={[1.45, 32, 32]} />
        <meshBasicMaterial color={hslColor('--neon-blue')} transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

function Stars() {
  const count = 400;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={positions.length / 3} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.015} color={hslColor('--neon-cyan')} transparent opacity={0.65} />
    </points>
  );
}

function latLngToVec(lat: number, lng: number, radius = 1.4) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function curveBetween(start: THREE.Vector3, end: THREE.Vector3) {
  const mid = start.clone().add(end).multiplyScalar(0.5);
  const midLength = mid.length();
  mid.normalize();
  mid.multiplyScalar(midLength + 0.6); // raise for arc
  const curve = new THREE.CatmullRomCurve3([start, mid, end]);
  return curve.getPoints(64);
}

function getHSL(name: string): [number, number, number] {
  const root = document.documentElement;
  const v = getComputedStyle(root).getPropertyValue(name).trim() || '200 100% 60%';
  const [hStr, sStr, lStr] = v.split(/\s+/);
  const h = parseFloat(hStr);
  const s = parseFloat(sStr);
  const l = parseFloat(lStr);
  return [isNaN(h) ? 200 : h, isNaN(s) ? 100 : s, isNaN(l) ? 60 : l];
}

function hslColor(name: string): THREE.Color {
  const [h, s, l] = getHSL(name);
  const c = new THREE.Color();
  c.setHSL(h / 360, s / 100, l / 100);
  return c;
}

const HeroGlobe = () => {
  return (
    <div
      className="relative w-full h-[52vh] md:h-[68vh] lg:h-[74vh] interactive-gradient"
      onMouseMove={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        el.style.setProperty('--mx', `${x}%`);
        el.style.setProperty('--my', `${y}%`);
      }}
    >
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 3, 3]} intensity={0.6} />
        <Stars />
        <Globe />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
      </Canvas>
    </div>
  );
};

export default HeroGlobe;
