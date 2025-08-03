import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { JobCard } from "@/components/JobCard";
import { JobPostingForm } from "@/components/JobPostingForm";
import { JobDetailsPage } from "@/components/JobDetailsPage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, Users, TrendingUp, DollarSign, Clock, MapPin, X, Briefcase, Palette, Code, BarChart3, Camera } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import proConnectLogo from "@/assets/proconnect-logo.png";

const mockJobs = [
  {
    id: "1",
    title: "Modern Web Application Development",
    description: "Looking for an experienced developer to create a responsive web application with React and Node.js. The project includes user authentication, payment integration, and real-time features.",
    budget: 5000,
    location: "New York, NY",
    category: "Web Development",
    deadline: "2024-02-15",
    postedAt: "2024-01-15",
    status: "open",
    bidCount: 12
  },
  {
    id: "2",
    title: "Mobile App UI/UX Design",
    description: "Need a creative designer to design a modern mobile app interface for a fitness tracking application. Must include wireframes, prototypes, and final designs.",
    budget: 3500,
    location: "San Francisco, CA",
    category: "Design",
    deadline: "2024-02-20",
    postedAt: "2024-01-18",
    status: "in_progress",
    bidCount: 8
  },
  {
    id: "3",
    title: "E-commerce Platform Development",
    description: "Build a complete e-commerce solution with inventory management, payment processing, and admin dashboard. Must support multiple vendors and mobile responsive.",
    budget: 8500,
    location: "Los Angeles, CA",
    category: "Web Development",
    deadline: "2024-03-01",
    postedAt: "2024-01-20",
    status: "open",
    bidCount: 15
  },
  {
    id: "4",
    title: "Brand Identity & Logo Design",
    description: "Create a complete brand identity package for a tech startup including logo, color palette, typography, and brand guidelines.",
    budget: 2500,
    location: "Remote",
    category: "Design",
    deadline: "2024-02-10",
    postedAt: "2024-01-12",
    status: "completed",
    bidCount: 23
  },
  {
    id: "5",
    title: "Data Analytics Dashboard",
    description: "Develop a comprehensive data analytics dashboard with real-time visualizations, KPI tracking, and automated reporting features.",
    budget: 6200,
    location: "Chicago, IL",
    category: "Data Science",
    deadline: "2024-02-25",
    postedAt: "2024-01-22",
    status: "open",
    bidCount: 9
  },
  {
    id: "6",
    title: "Marketing Campaign Photography",
    description: "Professional photographer needed for a 2-day marketing campaign shoot. Experience with product photography and lifestyle shots required.",
    budget: 1800,
    location: "Miami, FL",
    category: "Photography",
    deadline: "2024-02-08",
    postedAt: "2024-01-25",
    status: "open",
    bidCount: 6
  }
];

const categories = [
  { value: "Web Development", label: "Web Development", icon: Code, color: "text-blue-500" },
  { value: "Design", label: "Design", icon: Palette, color: "text-purple-500" },
  { value: "Data Science", label: "Data Science", icon: BarChart3, color: "text-green-500" },
  { value: "Photography", label: "Photography", icon: Camera, color: "text-orange-500" },
  { value: "Marketing", label: "Marketing", icon: TrendingUp, color: "text-pink-500" },
  { value: "Business", label: "Business", icon: Briefcase, color: "text-indigo-500" }
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

        {/* Quick Category Filters */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Filter size={20} />
            Browse by Category
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={categoryFilter === category.value ? "default" : "outline"}
                onClick={() => setCategoryFilter(category.value)}
                className="flex items-center gap-2 h-auto py-3 px-4 justify-start hover:scale-105 transition-all"
              >
                <category.icon size={18} className={category.color} />
                <span className="text-xs font-medium">{category.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Search and Advanced Filters */}
        <Card className="mb-8 shadow-md">
          <CardContent className="pt-6">
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  placeholder="Search jobs by title, description, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>

              {/* Filter Row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="h-12 bg-background">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border shadow-lg z-50">
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        <div className="flex items-center gap-2">
                          <category.icon size={16} className={category.color} />
                          {category.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="h-12 bg-background">
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border shadow-lg z-50">
                    <SelectItem value="all">All Locations</SelectItem>
                    {popularLocations.map((location) => (
                      <SelectItem key={location} value={location}>
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-muted-foreground" />
                          {location}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="h-12 bg-background">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border shadow-lg z-50">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>

                <Button 
                  variant="outline" 
                  onClick={clearAllFilters}
                  className="h-12 flex items-center gap-2 hover:bg-destructive hover:text-destructive-foreground transition-colors"
                >
                  <X size={16} />
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Filters */}
        {(categoryFilter !== "all" || locationFilter !== "all" || statusFilter !== "all" || searchTerm) && (
          <div className="flex flex-wrap gap-2 mb-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter size={16} />
              <span>Active filters:</span>
            </div>
            {searchTerm && (
              <Badge variant="secondary" className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors" onClick={() => setSearchTerm("")}>
                Search: "{searchTerm}" <X size={12} className="ml-1" />
              </Badge>
            )}
            {categoryFilter !== "all" && (
              <Badge variant="secondary" className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors" onClick={() => setCategoryFilter("all")}>
                Category: {categoryFilter} <X size={12} className="ml-1" />
              </Badge>
            )}
            {locationFilter !== "all" && (
              <Badge variant="secondary" className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors" onClick={() => setLocationFilter("all")}>
                Location: {locationFilter} <X size={12} className="ml-1" />
              </Badge>
            )}
            {statusFilter !== "all" && (
              <Badge variant="secondary" className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors" onClick={() => setStatusFilter("all")}>
                Status: {statusFilter} <X size={12} className="ml-1" />
              </Badge>
            )}
          </div>
        )}

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
      </div>
    </div>
  );
};