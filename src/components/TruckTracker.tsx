import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Calendar, Navigation } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import tattooTruckImage from '@/assets/tattoo-truck.png';

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

const locations: Location[] = [
  {
    id: '1',
    name: 'Venice Beach',
    address: 'Venice Beach Boardwalk, CA',
    coordinates: { x: 15, y: 75 },
    status: 'completed',
    date: 'Jan 15'
  },
  {
    id: '2',
    name: 'Santa Monica Pier',
    address: 'Santa Monica, CA',
    coordinates: { x: 25, y: 70 },
    status: 'current',
    arrivalTime: 'Now',
    duration: '3 days',
    date: 'Jan 18-20'
  },
  {
    id: '3',
    name: 'Hollywood Walk of Fame',
    address: 'Hollywood Blvd, CA',
    coordinates: { x: 35, y: 65 },
    status: 'upcoming',
    arrivalTime: '2:00 PM',
    duration: '2 days',
    date: 'Jan 21-22'
  },
  {
    id: '4',
    name: 'Sunset Strip',
    address: 'West Hollywood, CA',
    coordinates: { x: 50, y: 60 },
    status: 'upcoming',
    arrivalTime: '10:00 AM',
    duration: '4 days',
    date: 'Jan 23-26'
  },
  {
    id: '5',
    name: 'Long Beach',
    address: 'Long Beach, CA',
    coordinates: { x: 70, y: 80 },
    status: 'upcoming',
    arrivalTime: '1:00 PM',
    duration: '2 days',
    date: 'Jan 27-28'
  }
];

export const TruckTracker = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current':
        return 'primary';
      case 'upcoming':
        return 'secondary';
      case 'completed':
        return 'tertiary';
      default:
        return 'muted';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'current':
        return '🚚';
      case 'upcoming':
        return '📍';
      case 'completed':
        return '✅';
      default:
        return '📍';
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
              Ink on Wheels
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Follow our tattoo truck's adventure across the city
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

      {/* Interactive Map */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Container */}
          <div className="lg:col-span-2">
            <Card className="relative overflow-hidden truck-glow">
              <div className="aspect-[4/3] relative bg-gradient-to-br from-background to-card border-2 border-primary/20 rounded-lg">
                {/* Map Background */}
                <div className="absolute inset-0 opacity-10">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg"></div>
                </div>
                
                {/* Street Grid */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                  <defs>
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.1" opacity="0.3"/>
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#grid)" />
                  
                  {/* Route Lines */}
                  {locations.slice(0, -1).map((location, index) => {
                    const nextLocation = locations[index + 1];
                    return (
                      <line
                        key={`route-${location.id}`}
                        x1={location.coordinates.x}
                        y1={location.coordinates.y}
                        x2={nextLocation.coordinates.x}
                        y2={nextLocation.coordinates.y}
                        stroke="url(#gradient)"
                        strokeWidth="0.5"
                        strokeDasharray="2,1"
                        className="route-line"
                      />
                    );
                  })}
                  
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" />
                      <stop offset="50%" stopColor="hsl(var(--secondary))" />
                      <stop offset="100%" stopColor="hsl(var(--tertiary))" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Location Markers */}
                {locations.map((location) => (
                  <div
                    key={location.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    style={{
                      left: `${location.coordinates.x}%`,
                      top: `${location.coordinates.y}%`,
                    }}
                    onClick={() => setSelectedLocation(location)}
                  >
                    <div
                      className={`location-marker w-8 h-8 rounded-full flex items-center justify-center text-lg border-2 ${
                        location.status === 'current'
                          ? 'bg-primary text-primary-foreground border-primary-glow animate-glow-pulse'
                          : location.status === 'upcoming'
                          ? 'bg-secondary text-secondary-foreground border-secondary-glow'
                          : 'bg-tertiary text-tertiary-foreground border-tertiary-glow'
                      }`}
                    >
                      {getStatusIcon(location.status)}
                    </div>
                    
                    {/* Location Label */}
                    <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                      <div className="bg-card text-card-foreground px-2 py-1 rounded text-xs border border-border shadow-lg">
                        {location.name}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Truck Image */}
                <div className="absolute bottom-4 right-4 truck-bounce">
                  <img
                    src={tattooTruckImage}
                    alt="Tattoo Truck"
                    className="w-24 h-12 object-contain drop-shadow-lg"
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Location Details Sidebar */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-glow">Current Journey</h2>
              <div className="space-y-4">
                {locations.map((location) => (
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
                          <span>Arrives: {location.arrivalTime}</span>
                        </div>
                      )}
                      
                      {location.duration && (
                        <div className="flex items-center gap-2">
                          <Navigation className="w-4 h-4 text-tertiary" />
                          <span>Staying: {location.duration}</span>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Live Stats */}
            <Card className="p-6 gradient-primary text-primary-foreground">
              <h3 className="font-bold text-lg mb-4">🎯 Journey Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Total Stops:</span>
                  <span className="font-bold">{locations.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Completed:</span>
                  <span className="font-bold">{locations.filter(l => l.status === 'completed').length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Upcoming:</span>
                  <span className="font-bold">{locations.filter(l => l.status === 'upcoming').length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Artists Ready:</span>
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
            🎨 Follow our ink adventure • Book your appointment when we're in your area!
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Badge variant="outline" className="floating-animation">Live Updates</Badge>
            <Badge variant="outline" className="floating-animation" style={{ animationDelay: '0.5s' }}>
              Real-time Tracking
            </Badge>
            <Badge variant="outline" className="floating-animation" style={{ animationDelay: '1s' }}>
              Professional Artists
            </Badge>
          </div>
        </div>
      </footer>
    </div>
  );
};