import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Text, Html } from '@react-three/drei';
import * as THREE from 'three';

interface Location {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  status: 'current' | 'upcoming' | 'completed';
  arrivalTime?: string;
  duration?: string;
  date: string;
}

interface TruckPosition {
  position: THREE.Vector3;
  rotation: THREE.Euler;
}

const locations: Location[] = [
  {
    id: '1',
    name: 'Venice Beach',
    address: 'Venice Beach Boardwalk, CA',
    lat: 33.9850,
    lng: -118.4695,
    status: 'completed',
    date: 'Jan 15'
  },
  {
    id: '2',
    name: 'Santa Monica Pier',
    address: 'Santa Monica, CA',
    lat: 34.0089,
    lng: -118.4973,
    status: 'current',
    arrivalTime: 'Now',
    duration: '3 days',
    date: 'Jan 18-20'
  },
  {
    id: '3',
    name: 'Hollywood Walk of Fame',
    address: 'Hollywood Blvd, CA',
    lat: 34.1015,
    lng: -118.3405,
    status: 'upcoming',
    arrivalTime: '2:00 PM',
    duration: '2 days',
    date: 'Jan 21-22'
  },
  {
    id: '4',
    name: 'Beverly Hills',
    address: 'Beverly Hills, CA',
    lat: 34.0736,
    lng: -118.4004,
    status: 'upcoming',
    arrivalTime: '10:00 AM',
    duration: '4 days',
    date: 'Jan 23-26'
  },
  {
    id: '5',
    name: 'Long Beach',
    address: 'Long Beach, CA',
    lat: 33.7701,
    lng: -118.1937,
    status: 'upcoming',
    arrivalTime: '1:00 PM',
    duration: '2 days',
    date: 'Jan 27-28'
  }
];

// Convert lat/lng to 3D coordinates on sphere
const latLngToVector3 = (lat: number, lng: number, radius: number = 2): THREE.Vector3 => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  
  return new THREE.Vector3(x, y, z);
};

// Create route between two points on sphere
const createRoute = (start: THREE.Vector3, end: THREE.Vector3, segments: number = 50): THREE.Vector3[] => {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    // Spherical interpolation for curved route
    const point = new THREE.Vector3().lerpVectors(start, end, t);
    point.normalize().multiplyScalar(2.1); // Slightly above surface
    points.push(point);
  }
  return points;
};

const Globe: React.FC = () => {
  const globeRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += 0.001;
    }
  });

  // Create simple Earth-like texture using gradients
  const createEarthTexture = (): THREE.Texture => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    // Ocean blue background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#1e40af');
    gradient.addColorStop(0.3, '#3b82f6');
    gradient.addColorStop(0.7, '#0ea5e9');
    gradient.addColorStop(1, '#1e40af');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add some land masses (simplified)
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    // North America (simplified)
    ctx.ellipse(200, 150, 80, 60, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Europe/Africa
    ctx.beginPath();
    ctx.ellipse(500, 200, 40, 80, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Asia
    ctx.beginPath();
    ctx.ellipse(700, 180, 70, 50, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Australia
    ctx.beginPath();
    ctx.ellipse(800, 350, 30, 20, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  };

  const earthTexture = createEarthTexture();

  return (
    <group>
      {/* Main Globe */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial 
          map={earthTexture}
          shininess={100}
          specular={new THREE.Color(0x222222)}
        />
      </mesh>
      
      {/* Atmosphere */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[2.05, 64, 64]} />
        <meshBasicMaterial 
          color={0x87ceeb}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

const LocationMarker: React.FC<{ 
  location: Location; 
  onClick: () => void;
  isSelected: boolean;
}> = ({ location, onClick, isSelected }) => {
  const markerRef = useRef<THREE.Group>(null);
  const position = latLngToVector3(location.lat, location.lng, 2.1);
  
  useFrame((state) => {
    if (markerRef.current) {
      markerRef.current.lookAt(0, 0, 0);
      markerRef.current.rotateY(Math.PI);
      
      // Pulsing animation for current location
      if (location.status === 'current') {
        markerRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.2);
      }
    }
  });

  const getMarkerColor = () => {
    switch (location.status) {
      case 'current': return '#ec4899'; // Primary pink
      case 'upcoming': return '#0ea5e9'; // Secondary blue
      case 'completed': return '#22c55e'; // Tertiary green
      default: return '#6b7280';
    }
  };

  return (
    <group ref={markerRef} position={position} onClick={onClick}>
      <mesh>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color={getMarkerColor()} />
      </mesh>
      
      {/* Marker pin */}
      <mesh position={[0, -0.1, 0]}>
        <coneGeometry args={[0.03, 0.1, 8]} />
        <meshBasicMaterial color={getMarkerColor()} />
      </mesh>
      
      {/* Label */}
      <Html position={[0, 0.15, 0]} center>
        <div className={`px-2 py-1 rounded text-xs whitespace-nowrap pointer-events-none ${
          isSelected ? 'bg-primary text-primary-foreground' : 'bg-card text-card-foreground border border-border'
        }`}>
          {location.name}
        </div>
      </Html>
      
      {/* Glow effect for current location */}
      {location.status === 'current' && (
        <mesh>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshBasicMaterial 
            color={getMarkerColor()}
            transparent
            opacity={0.3}
            side={THREE.BackSide}
          />
        </mesh>
      )}
    </group>
  );
};

const TruckModel: React.FC<{ 
  position: THREE.Vector3;
  rotation: THREE.Euler;
}> = ({ position, rotation }) => {
  const truckRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (truckRef.current) {
      truckRef.current.position.copy(position);
      truckRef.current.rotation.copy(rotation);
      truckRef.current.lookAt(0, 0, 0);
      truckRef.current.rotateY(Math.PI);
    }
  });

  return (
    <group ref={truckRef}>
      {/* Truck body */}
      <mesh>
        <boxGeometry args={[0.08, 0.04, 0.12]} />
        <meshPhongMaterial color="#ec4899" />
      </mesh>
      
      {/* Truck cab */}
      <mesh position={[0, 0.02, 0.04]}>
        <boxGeometry args={[0.06, 0.03, 0.06]} />
        <meshPhongMaterial color="#0ea5e9" />
      </mesh>
      
      {/* Wheels */}
      <mesh position={[-0.03, -0.025, 0.03]}>
        <cylinderGeometry args={[0.01, 0.01, 0.02]} />
        <meshPhongMaterial color="#1f2937" />
      </mesh>
      <mesh position={[0.03, -0.025, 0.03]}>
        <cylinderGeometry args={[0.01, 0.01, 0.02]} />
        <meshPhongMaterial color="#1f2937" />
      </mesh>
      <mesh position={[-0.03, -0.025, -0.03]}>
        <cylinderGeometry args={[0.01, 0.01, 0.02]} />
        <meshPhongMaterial color="#1f2937" />
      </mesh>
      <mesh position={[0.03, -0.025, -0.03]}>
        <cylinderGeometry args={[0.01, 0.01, 0.02]} />
        <meshPhongMaterial color="#1f2937" />
      </mesh>
      
      {/* Glow effect */}
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial 
          color="#ec4899"
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

const RouteLines: React.FC<{ locations: Location[] }> = ({ locations }) => {
  return (
    <group>
      {locations.slice(0, -1).map((location, index) => {
        const nextLocation = locations[index + 1];
        const startPos = latLngToVector3(location.lat, location.lng, 2.05);
        const endPos = latLngToVector3(nextLocation.lat, nextLocation.lng, 2.05);
        const route = createRoute(startPos, endPos);
        
        const curve = new THREE.CatmullRomCurve3(route);
        const points = curve.getPoints(50);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        
        const getRouteColor = () => {
          if (location.status === 'completed' && nextLocation.status === 'current') {
            return '#ec4899'; // Primary pink for current route
          } else if (location.status === 'current' && nextLocation.status === 'upcoming') {
            return '#0ea5e9'; // Secondary blue for upcoming route
          } else if (nextLocation.status === 'upcoming') {
            return '#6b7280'; // Muted for future routes
          }
          return '#22c55e'; // Tertiary green for completed routes
        };
        
        return (
          <primitive 
            key={`route-${location.id}-${nextLocation.id}`}
            object={
              (() => {
                const material = new THREE.LineBasicMaterial({ 
                  color: getRouteColor(),
                  transparent: true,
                  opacity: 0.8
                });
                return new THREE.Line(geometry, material);
              })()
            }
          />
        );
      })}
    </group>
  );
};

const AnimatedTruck: React.FC<{ locations: Location[] }> = ({ locations }) => {
  const [truckPosition, setTruckPosition] = useState<TruckPosition>({
    position: new THREE.Vector3(),
    rotation: new THREE.Euler()
  });
  const [currentRouteIndex, setCurrentRouteIndex] = useState(0);
  const [routeProgress, setRouteProgress] = useState(0);

  useEffect(() => {
    const currentLocationIndex = locations.findIndex(loc => loc.status === 'current');
    if (currentLocationIndex === -1) return;

    const animate = () => {
      // Find the route the truck should be on
      let startIndex = currentLocationIndex;
      let endIndex = currentLocationIndex;
      
      // If there's a next location, animate towards it
      if (currentLocationIndex < locations.length - 1) {
        endIndex = currentLocationIndex + 1;
      }
      
      const startLocation = locations[startIndex];
      const endLocation = locations[endIndex];
      
      const startPos = latLngToVector3(startLocation.lat, startLocation.lng, 2.1);
      const endPos = latLngToVector3(endLocation.lat, endLocation.lng, 2.1);
      
      // Create route and animate along it
      const route = createRoute(startPos, endPos, 100);
      
      // Animate progress
      setRouteProgress(prev => {
        const newProgress = prev + 0.005; // Adjust speed here
        if (newProgress >= 1) {
          return 0; // Reset for continuous animation
        }
        return newProgress;
      });
      
      const currentPointIndex = Math.floor(routeProgress * (route.length - 1));
      const nextPointIndex = Math.min(currentPointIndex + 1, route.length - 1);
      const localProgress = (routeProgress * (route.length - 1)) % 1;
      
      const currentPoint = route[currentPointIndex];
      const nextPoint = route[nextPointIndex];
      const interpolatedPosition = new THREE.Vector3().lerpVectors(currentPoint, nextPoint, localProgress);
      
      // Calculate rotation to face movement direction
      const direction = new THREE.Vector3().subVectors(nextPoint, currentPoint).normalize();
      const rotation = new THREE.Euler().setFromVector3(direction);
      
      setTruckPosition({
        position: interpolatedPosition,
        rotation: rotation
      });
    };

    const animationInterval = setInterval(animate, 50);
    return () => clearInterval(animationInterval);
  }, [locations, routeProgress]);

  return <TruckModel position={truckPosition.position} rotation={truckPosition.rotation} />;
};

export const Globe3D: React.FC<{
  selectedLocation: Location | null;
  onLocationSelect: (location: Location) => void;
}> = ({ selectedLocation, onLocationSelect }) => {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        {/* Lighting */}
        <ambientLight intensity={0.4} color="#ffffff" />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1}
          color="#ffffff"
          castShadow
        />
        <pointLight position={[-10, -10, -5]} intensity={0.3} color="#ec4899" />
        
        {/* Globe */}
        <Globe />
        
        {/* Location markers */}
        {locations.map((location) => (
          <LocationMarker
            key={location.id}
            location={location}
            onClick={() => onLocationSelect(location)}
            isSelected={selectedLocation?.id === location.id}
          />
        ))}
        
        {/* Route lines */}
        <RouteLines locations={locations} />
        
        {/* Animated truck */}
        <AnimatedTruck locations={locations} />
        
        {/* Controls */}
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={10}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
};