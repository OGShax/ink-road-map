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
    coordinates: { x: 20, y: 65 },
    status: 'completed',
    date: 'Jan 15'
  },
  {
    id: '2',
    name: 'Stavanger',
    address: 'Old Town, Stavanger',
    coordinates: { x: 25, y: 80 },
    status: 'current',
    arrivalTime: 'Now',
    duration: '3 days',
    date: 'Jan 18-20'
  },
  {
    id: '3',
    name: 'Oslo',
    address: 'Karl Johans gate, Oslo',
    coordinates: { x: 55, y: 70 },
    status: 'upcoming',
    arrivalTime: '2:00 PM',
    duration: '4 days',
    date: 'Jan 21-24'
  },
  {
    id: '4',
    name: 'Trondheim',
    address: 'Bakklandet, Trondheim',
    coordinates: { x: 50, y: 45 },
    status: 'upcoming',
    arrivalTime: '10:00 AM',
    duration: '3 days',
    date: 'Jan 25-27'
  },
  {
    id: '5',
    name: 'Tromsø',
    address: 'Northern Lights City',
    coordinates: { x: 65, y: 15 },
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
        <linearGradient id="norwayGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#059669" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#047857" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="waterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      
      {/* Water/Ocean background */}
      <rect width="100" height="100" fill="url(#waterGradient)" />
      
      {/* Norway landmass (simplified outline) */}
      <path
        d="M15 10 
           L25 8 L35 12 L45 10 L55 15 L65 12 L75 18 L80 25 
           L85 35 L80 45 L75 55 L70 65 L65 70 L60 75 L55 78 
           L50 82 L45 85 L40 88 L35 90 L30 88 L25 85 L20 82 
           L18 78 L15 75 L12 70 L10 65 L8 60 L10 55 L12 50 
           L15 45 L12 40 L10 35 L8 30 L10 25 L12 20 L15 15 Z"
        fill="url(#norwayGradient)"
        stroke="#047857"
        strokeWidth="0.5"
      />
      
      {/* Fjords and coastal details */}
      <path
        d="M15 30 Q20 28 25 30 Q30 32 35 30"
        fill="none"
        stroke="#0284c7"
        strokeWidth="1"
        opacity="0.6"
      />
      <path
        d="M40 25 Q45 23 50 25 Q55 27 60 25"
        fill="none"
        stroke="#0284c7"
        strokeWidth="1"
        opacity="0.6"
      />
      
      {/* Mountain ranges */}
      <circle cx="30" cy="40" r="2" fill="#94a3b8" opacity="0.7" />
      <circle cx="45" cy="35" r="3" fill="#94a3b8" opacity="0.7" />
      <circle cx="60" cy="30" r="2.5" fill="#94a3b8" opacity="0.7" />
      <circle cx="35" cy="55" r="2" fill="#94a3b8" opacity="0.7" />
      
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
              stroke="#374151"
              strokeWidth="2"
              opacity="0.3"
              strokeDasharray="none"
            />
            {/* Route line */}
            <path
              d={roadPath}
              fill="none"
              stroke={getRouteColor()}
              strokeWidth="1.5"
              opacity="0.8"
              strokeDasharray="3,2"
              className="route-line"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;-10"
                dur="2s"
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
          {/* Marker background */}
          <circle
            r="3"
            fill={getStatusColor(location.status)}
            opacity="0.3"
            className={location.status === 'current' ? 'animate-pulse' : ''}
          />
          
          {/* Marker icon */}
          <circle
            r="2"
            fill={getStatusColor(location.status)}
            stroke="white"
            strokeWidth="0.5"
          />
          
          {/* Location label */}
          <text
            x="0"
            y="-4"
            textAnchor="middle"
            className="text-[3px] font-bold fill-current"
            style={{ fill: getStatusColor(location.status) }}
          >
            {location.name}
          </text>
          
          {/* Selection indicator */}
          {selectedLocation?.id === location.id && (
            <circle
              r="4"
              fill="none"
              stroke="#ec4899"
              strokeWidth="0.5"
              opacity="0.8"
              className="animate-pulse"
            />
          )}
        </g>
      ))}

      {/* Animated truck */}
      <AnimatedTruck 
        locations={locations} 
        currentLocationIndex={currentLocationIndex}
      />
      
      {/* Compass */}
      <g transform="translate(85, 15)">
        <circle r="3" fill="rgba(0,0,0,0.1)" />
        <text x="0" y="-1" textAnchor="middle" className="text-[2px] font-bold" fill="#374151">N</text>
        <text x="0" y="2" textAnchor="middle" className="text-[1.5px]" fill="#6b7280">↑</text>
      </g>
      
      {/* Scale indicator */}
      <g transform="translate(10, 90)">
        <line x1="0" y1="0" x2="10" y2="0" stroke="#374151" strokeWidth="0.5" />
        <text x="5" y="3" textAnchor="middle" className="text-[2px]" fill="#6b7280">100km</text>
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