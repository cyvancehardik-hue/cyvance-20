import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

// Particle Network Component
function ParticleNetwork() {
  const pointsRef = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);

  const particleCount = 80;
  const connectionDistance = 150;

  const { positions, connections } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const connections: number[] = [];

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 800;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 400;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
    }

    // Create connections between nearby particles
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (distance < connectionDistance) {
          connections.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          );
        }
      }
    }

    return { positions, connections: new Float32Array(connections) };
  }, []);

  useFrame((state) => {
    if (pointsRef.current && linesRef.current) {
      const time = state.clock.elapsedTime;
      
      // Gentle rotation and floating movement
      pointsRef.current.rotation.y = time * 0.02;
      pointsRef.current.rotation.x = Math.sin(time * 0.01) * 0.1;
      linesRef.current.rotation.y = time * 0.02;
      linesRef.current.rotation.x = Math.sin(time * 0.01) * 0.1;

      // Animate particle positions
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += Math.sin(time * 0.5 + i) * 0.1;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            count={particleCount}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={3}
          color="#00aaff"
          transparent
          opacity={0.8}
          sizeAttenuation={false}
        />
      </points>

      {/* Connection Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={connections}
            count={connections.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#a855f7"
          transparent
          opacity={0.3}
        />
      </lineSegments>
    </group>
  );
}

// Floating Data Packets
function FloatingPackets() {
  const groupRef = useRef<THREE.Group>(null!);

  const packets = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 600,
        (Math.random() - 0.5) * 300,
        (Math.random() - 0.5) * 100
      ] as [number, number, number],
      speed: 0.5 + Math.random() * 1,
      rotationSpeed: Math.random() * 0.02
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      
      groupRef.current.children.forEach((child, i) => {
        const packet = packets[i];
        child.position.x += Math.sin(time * packet.speed + i) * 0.2;
        child.position.y += Math.cos(time * packet.speed + i) * 0.15;
        child.rotation.x += packet.rotationSpeed;
        child.rotation.y += packet.rotationSpeed * 0.7;
        child.rotation.z += packet.rotationSpeed * 0.5;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {packets.map((packet, i) => (
        <mesh key={packet.id} position={packet.position}>
          <boxGeometry args={[4, 4, 4]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? "#00aaff" : "#a855f7"}
            transparent
            opacity={0.6}
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
}

// Main Background Component
export const CyberBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 300], fov: 60 }}
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1
        }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} />
        
        <ParticleNetwork />
        <FloatingPackets />
      </Canvas>
    </div>
  );
};