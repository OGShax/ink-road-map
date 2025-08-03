import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { JobCard } from "@/components/JobCard";
import { JobPostingForm } from "@/components/JobPostingForm";
import { JobDetailsPage } from "@/components/JobDetailsPage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Plus, Search, Filter, Users, TrendingUp, DollarSign, Clock, MapPin, X, Briefcase, Palette, Code, BarChart3, Camera, ChevronDown, ChevronUp, HelpCircle, Star, Share2, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import proConnectLogo from "@/assets/proconnect-logo.png";
import teamCollaboration from "@/assets/team-collaboration.jpg";
import remoteWork from "@/assets/remote-work.jpg";
import creativeProcess from "@/assets/creative-process.jpg";
import { Footer } from './Footer';
import { VerifiedBadge } from './VerifiedBadge';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const mockJobs = [
  {
    id: "1",
    title: "Professional Hair Styling & Color Treatment",
    description: "Experienced hair stylist needed for wedding preparation. Includes bridal party of 6 people. Must have experience with formal updos, hair extensions, and color touch-ups.",
    budget: 850,
    location: "New York, NY",
    category: "Hair Studio",
    deadline: "2024-02-15",
    postedAt: "2024-01-15",
    status: "open",
    bidCount: 12
  },
  {
    id: "2",
    title: "Custom Tattoo Design & Application",
    description: "Looking for skilled tattoo artist to create and apply a custom sleeve design. Traditional Japanese style preferred. Must provide portfolio of similar work.",
    budget: 1200,
    location: "San Francisco, CA",
    category: "Tattoo Studio",
    deadline: "2024-02-20",
    postedAt: "2024-01-18",
    status: "in_progress",
    bidCount: 8,
    winnerBid: {
      providerId: "p2",
      providerName: "Ink & Steel Tattoos",
      amount: 1100,
      acceptedAt: "2024-01-20",
      estimatedCompletion: "2024-02-18"
    }
  },
  {
    id: "3",
    title: "Deep Tissue Massage Therapy",
    description: "Need licensed massage therapist for weekly sessions. Must specialize in deep tissue and sports massage. Location flexible - can travel to client.",
    budget: 300,
    location: "Los Angeles, CA",
    category: "Massage Therapy",
    deadline: "2024-03-01",
    postedAt: "2024-01-20",
    status: "open",
    bidCount: 15
  },
  {
    id: "4",
    title: "Acrylic Nail Art & Manicure",
    description: "Professional nail technician needed for special event preparation. Includes nail art, French manicure, and pedicure services for 8 people.",
    budget: 480,
    location: "Miami, FL",
    category: "Nail Tech",
    deadline: "2024-02-10",
    postedAt: "2024-01-12",
    status: "completed",
    bidCount: 23,
    winnerBid: {
      providerId: "p4",
      providerName: "Elite Nail Artistry",
      amount: 450,
      acceptedAt: "2024-01-14",
      completedAt: "2024-02-08"
    }
  },
  {
    id: "5",
    title: "Classic Barber Services & Beard Styling",
    description: "Traditional barber needed for men's grooming service. Hot towel shaves, beard trimming, and classic cuts. Must have traditional barber tools and experience.",
    budget: 180,
    location: "Chicago, IL",
    category: "Barber Shop",
    deadline: "2024-02-25",
    postedAt: "2024-01-22",
    status: "open",
    bidCount: 9
  },
  {
    id: "6",
    title: "Kitchen Renovation & Tiling",
    description: "Experienced construction worker needed for complete kitchen renovation. Includes demolition, tiling, plumbing assistance, and installation work.",
    budget: 3500,
    location: "Seattle, WA",
    category: "Construction",
    deadline: "2024-02-08",
    postedAt: "2024-01-25",
    status: "open",
    bidCount: 6
  }
];

const popularProviders = [
  {
    id: "p1",
    name: "Sophia's Hair Studio",
    category: "Hair Studio",
    rating: 4.9,
    reviewCount: 127,
    specialties: ["Bridal", "Color", "Extensions"],
    location: "New York, NY",
    image: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=400&h=400&fit=crop",
    verified: true
  },
  {
    id: "p2", 
    name: "Ink & Steel Tattoos",
    category: "Tattoo Studio",
    rating: 4.8,
    reviewCount: 89,
    specialties: ["Traditional", "Realism", "Custom"],
    location: "San Francisco, CA",
    image: "https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=400&h=400&fit=crop",
    verified: false
  },
  {
    id: "p3",
    name: "Zen Massage Therapy",
    category: "Massage Therapy", 
    rating: 5.0,
    reviewCount: 156,
    specialties: ["Deep Tissue", "Sports", "Relaxation"],
    location: "Los Angeles, CA",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=400&fit=crop",
    verified: true
  },
  {
    id: "p4",
    name: "Elite Nail Artistry",
    category: "Nail Tech",
    rating: 4.7,
    reviewCount: 203,
    specialties: ["Nail Art", "Acrylics", "Gel"],
    location: "Miami, FL",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop",
    verified: false
  }
];

const categories = [
  { value: "Hair Studio", label: "Hair Studio", icon: Users, color: "text-pink-500" },
  { value: "Tattoo Studio", label: "Tattoo Studio", icon: Palette, color: "text-purple-500" },
  { value: "Massage Therapy", label: "Massage Therapy", icon: Users, color: "text-green-500" },
  { value: "Nail Tech", label: "Nail Tech", icon: Camera, color: "text-orange-500" },
  { value: "Barber Shop", label: "Barber Shop", icon: Users, color: "text-blue-500" },
  { value: "Construction", label: "Construction", icon: Briefcase, color: "text-indigo-500" },
  { value: "Beauty Services", label: "Beauty Services", icon: Palette, color: "text-rose-500" },
  { value: "Home Services", label: "Home Services", icon: BarChart3, color: "text-teal-500" }
];

const popularLocations = [
  "New York, NY",
  "San Francisco, CA", 
  "Los Angeles, CA",
  "Chicago, IL",
  "Miami, FL",
  "Seattle, WA",
  "Austin, TX",
  "Remote"
];

const stats = [
  { title: "Active Jobs", value: "1,247", icon: TrendingUp, change: "+12%" },
  { title: "Total Freelancers", value: "5,832", icon: Users, change: "+5%" },
  { title: "Jobs Completed", value: "892", icon: Clock, change: "+18%" },
  { title: "Total Payments", value: "$2.4M", icon: DollarSign, change: "+22%" }
];

export const JobBoard = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<'board' | 'posting' | 'details'>('board');
  const [selectedJobId, setSelectedJobId] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [kmRange, setKmRange] = useState([50]);
  const [showTips, setShowTips] = useState(false);

  // Handle deep linking to job details
  useEffect(() => {
    if (jobId) {
      setSelectedJobId(jobId);
      setCurrentView('details');
    }
  }, [jobId]);

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || job.category === categoryFilter;
    const matchesLocation = locationFilter === "all" || job.location === locationFilter;
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesLocation && matchesStatus;
  });

  const handleViewJob = (id: string) => {
    setSelectedJobId(id);
    setCurrentView('details');
  };

  const handleBid = (id: string) => {
    setSelectedJobId(id);
    setCurrentView('details');
  };

  const handlePostJob = () => {
    setCurrentView('posting');
  };

  const handleBackToBoard = () => {
    setCurrentView('board');
    setSelectedJobId("");
    navigate('/');
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setCategoryFilter("all");
    setLocationFilter("all");
    setStatusFilter("all");
  };

  if (currentView === 'posting') {
    return <JobPostingForm onClose={handleBackToBoard} />;
  }

  if (currentView === 'details' && selectedJobId) {
    return <JobDetailsPage jobId={selectedJobId} onBack={handleBackToBoard} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <img src={proConnectLogo} alt="ProConnect" className="w-12 h-12" />
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ProConnect
              </h1>
              <p className="text-muted-foreground mt-1">
                Where professionals connect and opportunities unfold
              </p>
            </div>
          </div>
          <Button onClick={handlePostJob} className="flex items-center gap-2 bg-gradient-to-r from-primary to-accent hover:scale-105 transition-transform">
            <Plus size={20} />
            Post a Job
          </Button>
        </div>

        {/* Demo Job Status Examples */}
        <Card className="mb-8 border-blue-500/20 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              Demo: Different Job Statuses
            </CardTitle>
            <p className="text-sm text-muted-foreground">Click these buttons to see how jobs appear in different states</p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                onClick={() => handleViewJob("1")}
                className="flex items-center gap-2 hover:bg-green-500/10 border-green-500/30"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Open Job (Hair Styling)
              </Button>
              <Button
                variant="outline"
                onClick={() => handleViewJob("2")}
                className="flex items-center gap-2 hover:bg-blue-500/10 border-blue-500/30"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                In Progress (Tattoo)
              </Button>
              <Button
                variant="outline"
                onClick={() => handleViewJob("3")}
                className="flex items-center gap-2 hover:bg-green-500/10 border-green-500/30"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Open Job (Massage)
              </Button>
              <Button
                variant="outline"
                onClick={() => handleViewJob("4")}
                className="flex items-center gap-2 hover:bg-purple-500/10 border-purple-500/30"
              >
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                Completed (Nails)
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-green-500 font-medium">
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Interactive Professional Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="group cursor-pointer hover:shadow-xl transition-all duration-500 overflow-hidden">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={teamCollaboration} 
                alt="Team Collaboration" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-semibold text-lg">Connect & Collaborate</h3>
                <p className="text-sm opacity-90">Join thousands of professionals</p>
              </div>
            </div>
          </Card>
          <Card className="group cursor-pointer hover:shadow-xl transition-all duration-500 overflow-hidden">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={remoteWork} 
                alt="Remote Work" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-semibold text-lg">Work Anywhere</h3>
                <p className="text-sm opacity-90">Remote opportunities await</p>
              </div>
            </div>
          </Card>
          <Card className="group cursor-pointer hover:shadow-xl transition-all duration-500 overflow-hidden">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={creativeProcess} 
                alt="Creative Process" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-semibold text-lg">Create & Innovate</h3>
                <p className="text-sm opacity-90">Bring your ideas to life</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Compact Search and Filters */}
        <Card className="mb-6 shadow-md bg-gradient-to-r from-primary/5 to-accent/5">
          <CardContent className="pt-6">
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  placeholder="Search jobs by title, description, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-11 text-base"
                />
              </div>

              {/* Compact Filter Row */}
              <div className="flex flex-wrap gap-3">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-auto min-w-[140px] h-9 bg-background">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border shadow-lg z-50">
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        <div className="flex items-center gap-2">
                          <category.icon size={14} className={category.color} />
                          {category.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="w-auto min-w-[140px] h-9 bg-background">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border shadow-lg z-50">
                    <SelectItem value="all">All Locations</SelectItem>
                    {popularLocations.map((location) => (
                      <SelectItem key={location} value={location}>
                        <div className="flex items-center gap-2">
                          <MapPin size={14} className="text-muted-foreground" />
                          {location}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-auto min-w-[120px] h-9 bg-background">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border shadow-lg z-50">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>

                {/* Compact Distance Filter */}
                <div className="flex items-center gap-2 bg-background border rounded-md px-3 py-1">
                  <MapPin size={14} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Within:</span>
                  <input 
                    type="range" 
                    min="5" 
                    max="200" 
                    step="5" 
                    value={kmRange[0]} 
                    onChange={(e) => setKmRange([parseInt(e.target.value)])}
                    className="w-16 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-sm font-medium min-w-[35px]">{kmRange[0]}km</span>
                </div>

                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={clearAllFilters}
                  className="h-9 flex items-center gap-2 hover:bg-destructive hover:text-destructive-foreground transition-colors"
                >
                  <X size={14} />
                  Clear
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips Section */}
        {showTips && (
          <Card className="mb-6 border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Star size={20} className="text-primary" />
                  Tips for Using ProConnect
                </h3>
                <Button variant="ghost" size="sm" onClick={() => setShowTips(false)}>
                  <X size={16} />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Perfect Your Profile</p>
                      <p className="text-muted-foreground">Complete profiles get 3x more responses</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Bid Strategically</p>
                      <p className="text-muted-foreground">Research market rates before bidding</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Share Quality Work</p>
                      <p className="text-muted-foreground">Use the share button to showcase projects</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Stay Active</p>
                      <p className="text-muted-foreground">Regular activity improves your visibility</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="outline" className="flex items-center gap-2">
                  <Share2 size={14} />
                  Share ProConnect
                </Button>
                <Button size="sm" variant="outline" className="flex items-center gap-2">
                  <MessageCircle size={14} />
                  Join Community
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Compact Category Filters */}
        <Card className="mb-6 shadow-md">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Filter size={20} />
                Quick Categories
              </h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button
                variant={categoryFilter === "all" ? "default" : "outline"}
                onClick={() => setCategoryFilter("all")}
                size="sm"
                className="h-8 text-xs"
              >
                All
              </Button>
              {categories.slice(0, 6).map((category) => (
                <Button
                  key={category.value}
                  variant={categoryFilter === category.value ? "default" : "outline"}
                  onClick={() => setCategoryFilter(category.value)}
                  size="sm"
                  className="h-8 text-xs flex items-center gap-1"
                >
                  <category.icon size={14} className={category.color} />
                  {category.label}
                </Button>
              ))}
              {categories.length > 6 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAllCategories(!showAllCategories)}
                  className="h-8 text-xs text-muted-foreground"
                >
                  {showAllCategories ? "Less" : `+${categories.length - 6} more`}
                </Button>
              )}
            </div>
            
            {showAllCategories && (
              <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t">
                {categories.slice(6).map((category) => (
                  <Button
                    key={category.value}
                    variant={categoryFilter === category.value ? "default" : "outline"}
                    onClick={() => setCategoryFilter(category.value)}
                    size="sm"
                    className="h-8 text-xs flex items-center gap-1"
                  >
                    <category.icon size={14} className={category.color} />
                    {category.label}
                  </Button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Active Filters */}
        {(categoryFilter !== "all" || locationFilter !== "all" || statusFilter !== "all" || searchTerm) && (
          <div className="flex flex-wrap gap-2 mb-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter size={16} />
              <span>Active:</span>
            </div>
            {searchTerm && (
              <Badge variant="secondary" className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors" onClick={() => setSearchTerm("")}>
                "{searchTerm}" <X size={12} className="ml-1" />
              </Badge>
            )}
            {categoryFilter !== "all" && (
              <Badge variant="secondary" className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors" onClick={() => setCategoryFilter("all")}>
                {categoryFilter} <X size={12} className="ml-1" />
              </Badge>
            )}
            {locationFilter !== "all" && (
              <Badge variant="secondary" className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors" onClick={() => setLocationFilter("all")}>
                {locationFilter} <X size={12} className="ml-1" />
              </Badge>
            )}
            {statusFilter !== "all" && (
              <Badge variant="secondary" className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors" onClick={() => setStatusFilter("all")}>
                {statusFilter} <X size={12} className="ml-1" />
              </Badge>
            )}
          </div>
        )}

        {/* Popular Providers Section */}
        <Card className="mb-8 shadow-md">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Star size={20} className="text-primary" />
                Popular Providers in Your Area
              </h3>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {popularProviders.map((provider) => (
                <Card 
                  key={provider.id} 
                  className="group hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                  onClick={() => navigate(`/provider/${provider.id}`)}
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="relative">
                        <img 
                          src={provider.image} 
                          alt={provider.name}
                          className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/20"
                        />
                         {provider.verified && (
                           <div className="absolute -bottom-1 -right-1">
                             <VerifiedBadge size="sm" showText={false} variant="glow" />
                           </div>
                         )}
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-semibold text-sm">{provider.name}</h4>
                        <p className="text-xs text-muted-foreground">{provider.category}</p>
                        <div className="flex items-center gap-1 justify-center">
                          <Star size={12} className="text-yellow-500 fill-current" />
                          <span className="text-xs font-medium">{provider.rating}</span>
                          <span className="text-xs text-muted-foreground">({provider.reviewCount})</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {provider.specialties.slice(0, 2).map((specialty) => (
                          <Badge key={specialty} variant="secondary" className="text-xs px-2 py-0">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin size={10} />
                        {provider.location}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {filteredJobs.length === 0 ? "No jobs found" : `${filteredJobs.length} job${filteredJobs.length !== 1 ? 's' : ''} found`}
          </h2>
          {filteredJobs.length > 0 && (
            <Select defaultValue="newest">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-background border shadow-lg z-50">
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="budget-high">Highest Budget</SelectItem>
                <SelectItem value="budget-low">Lowest Budget</SelectItem>
                <SelectItem value="deadline">Deadline</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Job Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              {...job}
              onViewJob={handleViewJob}
              onBid={handleBid}
            />
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="max-w-md mx-auto">
                <Search size={64} className="mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
                <p className="text-muted-foreground mb-6">
                  We couldn't find any jobs matching your criteria. Try adjusting your filters or search terms.
                </p>
                <Button onClick={clearAllFilters} variant="outline">
                  Clear All Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Custom Job Request Section */}
        <Card className="mt-12 mb-8 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-primary/20">
          <CardContent className="pt-8 pb-8 text-center">
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary/20 rounded-full">
                  <Search size={32} className="text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold">Can't find your provider or service?</h3>
              <p className="text-muted-foreground text-lg">
                Don't worry! Create a custom job request and let qualified providers find you instead.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-6">
                <Button 
                  onClick={handlePostJob}
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl px-8 py-3"
                >
                  <Plus size={20} className="mr-2" />
                  Create Custom Job Request
                </Button>
                <div className="text-sm text-muted-foreground">
                  ✨ Get responses in 24 hours
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 text-sm">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>Free to post</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span>Verified providers</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  <span>Secure payments</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};