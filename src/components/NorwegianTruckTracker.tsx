import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Clock, Calendar, Navigation, Route } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Location {
  id: string;
  name: string;
  address: string;
  coordinates: { x: number; y: number };
  status: 'current' | 'upcoming' | 'completed';
  arrivalTime?: string;
  duration?: string;
  date: string;
}

const norwegianLocations: Location[] = [
  {
    id: '1',
    name: 'Bergen',
    address: 'Bryggen, Bergen',
    coordinates: { x: 22, y: 68 }, // More accurate western coast position
    status: 'completed',
    date: 'Jan 15'
  },
  {
    id: '2',
    name: 'Stavanger',
    address: 'Old Town, Stavanger',
    coordinates: { x: 26, y: 78 }, // Southwest coast
    status: 'current',
    arrivalTime: 'Now',
    duration: '3 days',
    date: 'Jan 18-20'
  },
  {
    id: '3',
    name: 'Oslo',
    address: 'Karl Johans gate, Oslo',
    coordinates: { x: 52, y: 75 }, // Eastern location near Oslofjord
    status: 'upcoming',
    arrivalTime: '2:00 PM',
    duration: '4 days',
    date: 'Jan 21-24'
  },
  {
    id: '4',
    name: 'Trondheim',
    address: 'Bakklandet, Trondheim',
    coordinates: { x: 48, y: 50 }, // Central Norway
    status: 'upcoming',
    arrivalTime: '10:00 AM',
    duration: '3 days',
    date: 'Jan 25-27'
  },
  {
    id: '5',
    name: 'Tromsø',
    address: 'Northern Lights City',
    coordinates: { x: 62, y: 20 }, // Northern Norway
    status: 'upcoming',
    arrivalTime: '1:00 PM',
    duration: '5 days',
    date: 'Jan 28-Feb 2'
  }
];

// Create road path between two points with curves
const createRoadPath = (start: { x: number; y: number }, end: { x: number; y: number }) => {
  const midX = (start.x + end.x) / 2;
  const midY = (start.y + end.y) / 2;
  
  // Add some curvature to make it look like a real road
  const controlX = midX + (Math.random() - 0.5) * 20;
  const controlY = midY + (Math.random() - 0.5) * 15;
  
  return `M ${start.x} ${start.y} Q ${controlX} ${controlY} ${end.x} ${end.y}`;
};

// Generate points along SVG path for truck animation
const getPointsOnPath = (pathElement: SVGPathElement, numPoints: number = 100) => {
  const points = [];
  const pathLength = pathElement.getTotalLength();
  
  for (let i = 0; i <= numPoints; i++) {
    const distance = (i / numPoints) * pathLength;
    const point = pathElement.getPointAtLength(distance);
    points.push({ x: point.x, y: point.y });
  }
  
  return points;
};

const AnimatedTruck: React.FC<{
  locations: Location[];
  currentLocationIndex: number;
}> = ({ locations, currentLocationIndex }) => {
  const [truckPosition, setTruckPosition] = useState({ x: 0, y: 0, rotation: 0 });
  const [routeProgress, setRouteProgress] = useState(0);
  const pathRef = useRef<SVGPathElement>(null);
  const [routePoints, setRoutePoints] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    if (pathRef.current && currentLocationIndex < locations.length - 1) {
      const points = getPointsOnPath(pathRef.current, 200);
      setRoutePoints(points);
      setRouteProgress(0);
    }
  }, [currentLocationIndex, locations]);

  useEffect(() => {
    if (routePoints.length === 0) return;

    const animateInterval = setInterval(() => {
      setRouteProgress(prev => {
        const newProgress = prev + 0.005; // Adjust speed here
        if (newProgress >= 1) {
          return 0; // Reset animation
        }
        return newProgress;
      });
    }, 50);

    return () => clearInterval(animateInterval);
  }, [routePoints]);

  useEffect(() => {
    if (routePoints.length > 0) {
      const currentIndex = Math.floor(routeProgress * (routePoints.length - 1));
      const nextIndex = Math.min(currentIndex + 1, routePoints.length - 1);
      
      const currentPoint = routePoints[currentIndex];
      const nextPoint = routePoints[nextIndex];
      
      if (currentPoint && nextPoint) {
        // Calculate rotation based on movement direction
        const dx = nextPoint.x - currentPoint.x;
        const dy = nextPoint.y - currentPoint.y;
        const rotation = Math.atan2(dy, dx) * (180 / Math.PI);
        
        setTruckPosition({
          x: currentPoint.x,
          y: currentPoint.y,
          rotation: rotation
        });
      }
    }
  }, [routeProgress, routePoints]);

  const currentLocation = locations[currentLocationIndex];
  const nextLocation = locations[currentLocationIndex + 1];

  if (!currentLocation || !nextLocation) {
    // Position truck at current location
    const currentLoc = locations.find(loc => loc.status === 'current');
    if (currentLoc) {
      return (
        <g transform={`translate(${currentLoc.coordinates.x}, ${currentLoc.coordinates.y})`}>
          <circle r="3" fill="#ec4899" opacity="0.3" className="animate-pulse" />
          <g transform="scale(0.8)">
            <rect x="-6" y="-3" width="12" height="6" fill="#ec4899" rx="1" />
            <rect x="-8" y="-2" width="6" height="4" fill="#0ea5e9" rx="1" />
            <circle cx="-4" cy="2" r="1.5" fill="#1f2937" />
            <circle cx="4" cy="2" r="1.5" fill="#1f2937" />
            <circle cx="-4" cy="-2" r="1.5" fill="#1f2937" />
            <circle cx="4" cy="-2" r="1.5" fill="#1f2937" />
          </g>
        </g>
      );
    }
    return null;
  }

  const roadPath = createRoadPath(currentLocation.coordinates, nextLocation.coordinates);

  return (
    <g>
      {/* Hidden path for animation calculation */}
      <path
        ref={pathRef}
        d={roadPath}
        fill="none"
        stroke="transparent"
        strokeWidth="0"
      />
      
      {/* Animated truck */}
      <g transform={`translate(${truckPosition.x}, ${truckPosition.y}) rotate(${truckPosition.rotation})`}>
        {/* Truck glow */}
        <circle r="4" fill="#ec4899" opacity="0.2" className="animate-pulse" />
        
        {/* Truck body */}
        <g transform="scale(0.8)">
          <rect x="-6" y="-3" width="12" height="6" fill="#ec4899" rx="1" />
          <rect x="-8" y="-2" width="6" height="4" fill="#0ea5e9" rx="1" />
          
          {/* Wheels */}
          <circle cx="-4" cy="2" r="1.5" fill="#1f2937" />
          <circle cx="4" cy="2" r="1.5" fill="#1f2937" />
          <circle cx="-4" cy="-2" r="1.5" fill="#1f2937" />
          <circle cx="4" cy="-2" r="1.5" fill="#1f2937" />
          
          {/* Headlights */}
          <circle cx="6" cy="-1" r="0.5" fill="#fbbf24" opacity="0.8" />
          <circle cx="6" cy="1" r="0.5" fill="#fbbf24" opacity="0.8" />
        </g>
      </g>
    </g>
  );
};

const NorwayMap: React.FC<{
  locations: Location[];
  selectedLocation: Location | null;
  onLocationSelect: (location: Location) => void;
}> = ({ locations, selectedLocation, onLocationSelect }) => {
  const currentLocationIndex = locations.findIndex(loc => loc.status === 'current');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current': return '#ec4899';
      case 'upcoming': return '#0ea5e9';
      case 'completed': return '#22c55e';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'current': return '🚚';
      case 'upcoming': return '📍';
      case 'completed': return '✅';
      default: return '📍';
    }
  };

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Norway coastline and landmass */}
      <defs>
        <linearGradient id="norwayLand" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#16a34a" stopOpacity="0.4" />
          <stop offset="30%" stopColor="#22c55e" stopOpacity="0.3" />
          <stop offset="70%" stopColor="#059669" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#047857" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#64748b" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#475569" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="waterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#0284c7" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0369a1" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="fjordGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0284c7" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#0369a1" stopOpacity="0.8" />
        </linearGradient>
        <radialGradient id="islandGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#047857" stopOpacity="0.6" />
        </radialGradient>
      </defs>
      
      {/* North Sea and Norwegian Sea background */}
      <rect width="100" height="100" fill="url(#waterGradient)" />
      
      {/* Norway mainland - much more realistic coastline */}
      <path
        d="M20 95 
           L18 92 L16 88 L15 85 L14 82 L15 78 L17 75 
           L19 72 L21 68 L20 65 L18 62 L17 58 L19 55 
           L21 52 L23 48 L25 45 L27 42 L26 38 L24 35 
           L23 32 L25 28 L27 25 L29 22 L32 19 L35 17 
           L38 15 L41 13 L44 12 L47 11 L50 10 L53 9 
           L56 8 L59 7 L62 6 L65 5 L68 4 L71 3 L74 2 
           L77 3 L80 4 L82 6 L84 8 L85 11 L86 14 
           L87 17 L88 20 L89 23 L90 26 L91 29 L92 32 
           L93 35 L94 38 L95 41 L94 44 L93 47 L92 50 
           L91 53 L90 56 L89 59 L88 62 L87 65 L86 68 
           L85 71 L84 74 L83 77 L82 80 L81 83 L80 86 
           L78 89 L76 92 L74 94 L71 95 L68 96 L65 95 
           L62 94 L59 93 L56 92 L53 91 L50 90 L47 89 
           L44 88 L41 87 L38 86 L35 85 L32 84 L29 85 
           L26 86 L23 88 L20 90 L18 92 L20 95 Z"
        fill="url(#norwayLand)"
        stroke="#047857"
        strokeWidth="0.3"
      />
      
      {/* Lofoten Islands */}
      <ellipse cx="58" cy="25" rx="3" ry="1.5" fill="url(#islandGradient)" stroke="#047857" strokeWidth="0.2" />
      <ellipse cx="61" cy="24" rx="2" ry="1" fill="url(#islandGradient)" stroke="#047857" strokeWidth="0.2" />
      <ellipse cx="64" cy="23" rx="2.5" ry="1.2" fill="url(#islandGradient)" stroke="#047857" strokeWidth="0.2" />
      
      {/* Svalbard (far north) */}
      <ellipse cx="70" cy="2" rx="4" ry="2" fill="url(#islandGradient)" stroke="#047857" strokeWidth="0.2" />
      
      {/* Western fjords - detailed */}
      <path
        d="M20 65 Q18 63 19 61 Q21 59 20 57 Q18 55 19 53"
        fill="none"
        stroke="url(#fjordGradient)"
        strokeWidth="0.8"
      />
      <path
        d="M22 72 Q20 70 21 68 Q23 66 22 64"
        fill="none"
        stroke="url(#fjordGradient)"
        strokeWidth="0.6"
      />
      <path
        d="M25 45 Q23 43 24 41 Q26 39 25 37"
        fill="none"
        stroke="url(#fjordGradient)"
        strokeWidth="0.7"
      />
      
      {/* Geirangerfjord */}
      <path
        d="M26 58 Q24 56 25 54 Q27 52 26 50"
        fill="none"
        stroke="url(#fjordGradient)"
        strokeWidth="0.8"
      />
      
      {/* Nærøyfjord */}
      <path
        d="M23 62 Q21 60 22 58 Q24 56 23 54"
        fill="none"
        stroke="url(#fjordGradient)"
        strokeWidth="0.7"
      />
      
      {/* Oslofjord */}
      <path
        d="M52 75 Q50 73 51 71 Q53 69 52 67"
        fill="none"
        stroke="url(#fjordGradient)"
        strokeWidth="1"
      />
      
      {/* Norwegian mountain ranges */}
      
      {/* Jotunheimen (highest peaks) */}
      <ellipse cx="42" cy="62" rx="3" ry="2" fill="url(#mountainGradient)" opacity="0.8" />
      <circle cx="43" cy="61" r="1.5" fill="#64748b" opacity="0.9" />
      <circle cx="41" cy="63" r="1.2" fill="#64748b" opacity="0.9" />
      
      {/* Rondane */}
      <ellipse cx="48" cy="58" rx="2.5" ry="1.8" fill="url(#mountainGradient)" opacity="0.7" />
      <circle cx="49" cy="57" r="1" fill="#64748b" opacity="0.8" />
      
      {/* Dovre Mountains */}
      <ellipse cx="45" cy="52" rx="2" ry="1.5" fill="url(#mountainGradient)" opacity="0.7" />
      
      {/* Scandinavian Mountains (western spine) */}
      <ellipse cx="35" cy="45" rx="4" ry="8" fill="url(#mountainGradient)" opacity="0.6" />
      <ellipse cx="38" cy="40" rx="2" ry="3" fill="#64748b" opacity="0.7" />
      <ellipse cx="32" cy="50" rx="2.5" ry="4" fill="#64748b" opacity="0.6" />
      
      {/* Lyngen Alps (northern) */}
      <ellipse cx="62" cy="22" rx="2" ry="1.5" fill="url(#mountainGradient)" opacity="0.8" />
      <circle cx="63" cy="21" r="0.8" fill="#64748b" opacity="0.9" />
      
      {/* Major highways */}
      <path
        d="M26 78 Q35 75 45 72 Q55 69 65 66"
        fill="none"
        stroke="#374151"
        strokeWidth="0.3"
        opacity="0.4"
        strokeDasharray="1,1"
      />
      <path
        d="M52 75 Q50 65 48 55 Q46 45 44 35"
        fill="none"
        stroke="#374151"
        strokeWidth="0.3"
        opacity="0.4"
        strokeDasharray="1,1"
      />
      
      {/* Route lines between locations */}
      {locations.slice(0, -1).map((location, index) => {
        const nextLocation = locations[index + 1];
        const roadPath = createRoadPath(location.coordinates, nextLocation.coordinates);
        
        const getRouteColor = () => {
          if (location.status === 'completed' && nextLocation.status === 'current') {
            return '#ec4899'; // Current route
          } else if (location.status === 'current' && nextLocation.status === 'upcoming') {
            return '#0ea5e9'; // Next route
          } else if (nextLocation.status === 'upcoming') {
            return '#6b7280'; // Future routes
          }
          return '#22c55e'; // Completed routes
        };
        
        return (
          <g key={`route-${location.id}-${nextLocation.id}`}>
            {/* Road background */}
            <path
              d={roadPath}
              fill="none"
              stroke="#1f2937"
              strokeWidth="2.5"
              opacity="0.4"
              strokeDasharray="none"
            />
            {/* Route line */}
            <path
              d={roadPath}
              fill="none"
              stroke={getRouteColor()}
              strokeWidth="2"
              opacity="0.9"
              strokeDasharray="4,2"
              className="route-line"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;-12"
                dur="3s"
                repeatCount="indefinite"
              />
            </path>
          </g>
        );
      })}

      {/* Location markers */}
      {locations.map((location) => (
        <g
          key={location.id}
          transform={`translate(${location.coordinates.x}, ${location.coordinates.y})`}
          className="cursor-pointer location-marker"
          onClick={() => onLocationSelect(location)}
        >
          {/* Marker background glow */}
          <circle
            r="4"
            fill={getStatusColor(location.status)}
            opacity="0.2"
            className={location.status === 'current' ? 'animate-pulse' : ''}
          />
          
          {/* Marker icon */}
          <circle
            r="2.5"
            fill={getStatusColor(location.status)}
            stroke="white"
            strokeWidth="0.8"
          />
          
          {/* Inner marker dot */}
          <circle
            r="1"
            fill="white"
            opacity="0.9"
          />
          
          {/* Location label */}
          <text
            x="0"
            y="-6"
            textAnchor="middle"
            className="text-[3px] font-bold fill-current"
            style={{ fill: getStatusColor(location.status) }}
          >
            {location.name}
          </text>
          
          {/* Selection indicator */}
          {selectedLocation?.id === location.id && (
            <>
              <circle
                r="5"
                fill="none"
                stroke="#ec4899"
                strokeWidth="0.8"
                opacity="0.8"
                className="animate-pulse"
              />
              <circle
                r="6.5"
                fill="none"
                stroke="#ec4899"
                strokeWidth="0.4"
                opacity="0.4"
                className="animate-pulse"
              />
            </>
          )}
        </g>
      ))}

      {/* Animated truck */}
      <AnimatedTruck 
        locations={locations} 
        currentLocationIndex={currentLocationIndex}
      />
      
      {/* Compass rose */}
      <g transform="translate(85, 15)">
        <circle r="4" fill="rgba(0,0,0,0.1)" stroke="#374151" strokeWidth="0.3" />
        <path d="M0,-3 L1,0 L0,3 L-1,0 Z" fill="#374151" />
        <text x="0" y="-6" textAnchor="middle" className="text-[2.5px] font-bold" fill="#374151">N</text>
        <text x="5" y="1" textAnchor="middle" className="text-[1.5px]" fill="#6b7280">Ø</text>
        <text x="0" y="8" textAnchor="middle" className="text-[1.5px]" fill="#6b7280">S</text>
        <text x="-5" y="1" textAnchor="middle" className="text-[1.5px]" fill="#6b7280">V</text>
      </g>
      
      {/* Scale indicator */}
      <g transform="translate(8, 88)">
        <rect x="0" y="0" width="15" height="4" fill="rgba(255,255,255,0.8)" stroke="#374151" strokeWidth="0.2" rx="1" />
        <line x1="2" y1="1" x2="7" y2="1" stroke="#374151" strokeWidth="0.5" />
        <line x1="7" y1="1" x2="13" y2="1" stroke="#6b7280" strokeWidth="0.5" />
        <text x="7.5" y="3" textAnchor="middle" className="text-[1.8px] font-medium" fill="#374151">200km</text>
        <text x="2" y="0.5" textAnchor="start" className="text-[1px]" fill="#6b7280">0</text>
        <text x="13" y="0.5" textAnchor="end" className="text-[1px]" fill="#6b7280">400</text>
      </g>
      
      {/* Legend */}
      <g transform="translate(8, 12)">
        <rect x="0" y="0" width="20" height="12" fill="rgba(255,255,255,0.9)" stroke="#374151" strokeWidth="0.2" rx="1" />
        <text x="1" y="2.5" className="text-[1.5px] font-bold" fill="#374151">Terreng</text>
        
        <circle cx="2" cy="4.5" r="0.8" fill="#22c55e" opacity="0.6" />
        <text x="4" y="5" className="text-[1.2px]" fill="#374151">Land</text>
        
        <circle cx="2" cy="6.5" r="0.8" fill="#64748b" opacity="0.8" />
        <text x="4" y="7" className="text-[1.2px]" fill="#374151">Fjell</text>
        
        <rect x="1.5" y="8" width="1" height="0.5" fill="#0284c7" opacity="0.7" />
        <text x="4" y="8.5" className="text-[1.2px]" fill="#374151">Fjord</text>
        
        <circle cx="2" cy="10.5" r="0.5" fill="#ec4899" />
        <text x="4" y="11" className="text-[1.2px]" fill="#374151">Reise</text>
      </g>
    </svg>
  );
};

export const NorwegianTruckTracker = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current': return 'primary';
      case 'upcoming': return 'secondary';
      case 'completed': return 'tertiary';
      default: return 'muted';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'current': return '🚚';
      case 'upcoming': return '📍';
      case 'completed': return '✅';
      default: return '📍';
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-rainbow opacity-20"></div>
        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-4 glow-text">
              Ink på Veien 🇳🇴
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Følg tatoveringsbilens reise gjennom Norge
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{currentTime.toLocaleTimeString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{currentTime.toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Interactive Norwegian Map */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Container */}
          <div className="lg:col-span-2">
            <Card className="relative overflow-hidden truck-glow">
              <div className="aspect-[4/3] relative bg-gradient-to-br from-background to-card border-2 border-primary/20 rounded-lg p-4">
                <NorwayMap
                  locations={norwegianLocations}
                  selectedLocation={selectedLocation}
                  onLocationSelect={setSelectedLocation}
                />
                
                {/* Map Info */}
                <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm text-card-foreground px-3 py-2 rounded-lg text-xs border border-border">
                  <div className="flex items-center gap-2 mb-1">
                    <Route className="w-3 h-3 text-primary" />
                    <span className="font-semibold">Norge Tatoveringsbil Reise</span>
                  </div>
                  <div className="space-y-1 text-muted-foreground">
                    <div>• Klikk på markører for detaljer</div>
                    <div>• Bilens animerte bevegelse</div>
                    <div>• Sanntids posisjon</div>
                  </div>
                </div>
                
                {/* Live Status */}
                <div className="absolute bottom-4 right-4 bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-2 rounded-lg text-xs border border-primary-glow">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg animate-bounce">🚚</span>
                    <span className="font-semibold">Status: På vei</span>
                  </div>
                  <div className="text-primary-glow">
                    Kjører mot neste destinasjon
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Location Details Sidebar */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-glow">Norge Reise</h2>
              <div className="space-y-4">
                {norwegianLocations.map((location) => (
                  <Card
                    key={location.id}
                    className={`p-4 cursor-pointer transition-all duration-300 hover:scale-105 ${
                      selectedLocation?.id === location.id ? 'ring-2 ring-primary' : ''
                    } ${location.status === 'current' ? 'truck-glow' : ''}`}
                    onClick={() => setSelectedLocation(location)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getStatusIcon(location.status)}</span>
                        <h3 className="font-semibold">{location.name}</h3>
                      </div>
                      <Badge variant={getStatusColor(location.status) as any}>
                        {location.status}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{location.address}</p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{location.date}</span>
                      </div>
                      
                      {location.arrivalTime && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-secondary" />
                          <span>Ankomst: {location.arrivalTime}</span>
                        </div>
                      )}
                      
                      {location.duration && (
                        <div className="flex items-center gap-2">
                          <Navigation className="w-4 h-4 text-tertiary" />
                          <span>Opphold: {location.duration}</span>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Journey Stats */}
            <Card className="p-6 gradient-primary text-primary-foreground">
              <h3 className="font-bold text-lg mb-4">🎯 Reise Statistikk</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Totale stopp:</span>
                  <span className="font-bold">{norwegianLocations.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fullført:</span>
                  <span className="font-bold">{norwegianLocations.filter(l => l.status === 'completed').length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Kommende:</span>
                  <span className="font-bold">{norwegianLocations.filter(l => l.status === 'upcoming').length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tatovørartister:</span>
                  <span className="font-bold">3</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-12">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground">
            🎨 Følg vår tatovering eventyr gjennom Norge • Book time når vi er i ditt område!
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Badge variant="outline" className="floating-animation">Live Oppdateringer</Badge>
            <Badge variant="outline" className="floating-animation" style={{ animationDelay: '0.5s' }}>
              Sanntids Sporing
            </Badge>
            <Badge variant="outline" className="floating-animation" style={{ animationDelay: '1s' }}>
              Profesjonelle Artister
            </Badge>
          </div>
        </div>
      </footer>
    </div>
  );
};