import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { JobCard } from "@/components/JobCard";
import { JobPostingForm } from "@/components/JobPostingForm";
import { JobDetailsPage } from "@/components/JobDetailsPage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, Users, TrendingUp, DollarSign, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockJobs = [
  {
    id: "1",
    title: "Modern Web Application Development",
    description: "Looking for an experienced developer to create a responsive web application with React and Node.js. The project includes user authentication, payment integration, and real-time features.",
    budget: 5000,
    location: "Remote",
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
    location: "New York, NY",
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
    location: "San Francisco, CA",
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
  }
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
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
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
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Custom Job Marketplace
            </h1>
            <p className="text-muted-foreground mt-2">
              Find the perfect project or hire talented professionals
            </p>
          </div>
          <Button onClick={handlePostJob} className="flex items-center gap-2 bg-gradient-to-r from-primary to-accent">
            <Plus size={20} />
            Post a Job
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow">
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

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="Search jobs by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Web Development">Web Development</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Mobile Development">Mobile Development</SelectItem>
              <SelectItem value="Data Science">Data Science</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Active Filters */}
        {(categoryFilter !== "all" || statusFilter !== "all" || searchTerm) && (
          <div className="flex flex-wrap gap-2 mb-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter size={16} />
              <span>Active filters:</span>
            </div>
            {searchTerm && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => setSearchTerm("")}>
                Search: "{searchTerm}" ×
              </Badge>
            )}
            {categoryFilter !== "all" && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => setCategoryFilter("all")}>
                Category: {categoryFilter} ×
              </Badge>
            )}
            {statusFilter !== "all" && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => setStatusFilter("all")}>
                Status: {statusFilter} ×
              </Badge>
            )}
          </div>
        )}

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
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No jobs found matching your criteria.</p>
            <Button variant="outline" onClick={() => {
              setSearchTerm("");
              setCategoryFilter("all");
              setStatusFilter("all");
            }} className="mt-4">
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};