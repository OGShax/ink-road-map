import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { MapPin, Clock, DollarSign, User, MessageSquare, Star, Calendar, AlertCircle, Timer, Camera, Send, Share2, Copy, Facebook, Twitter, Linkedin, CheckCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { VerifiedBadge } from "./VerifiedBadge";

interface WinnerBid {
  providerId: string;
  providerName: string;
  amount: number;
  acceptedAt: string;
  estimatedCompletion?: string;
  completedAt?: string;
}

interface Job {
  id: string;
  title: string;
  description: string;
  category: string;
  address: string;
  paymentType: 'fixed' | 'hourly';
  fixedPrice?: number;
  hourlyRate?: number;
  approximateHours?: number;
  budgetMax?: number;
  urgencyLevel: string;
  materialsProvided: boolean;
  biddingEndDate: string;
  status: string;
  imageUrls: string[];
  createdAt: string;
  winnerBid?: WinnerBid;
}

interface Bid {
  id: string;
  bidderName: string;
  bidderAvatar?: string;
  bidderRating: number;
  amount: number;
  estimatedHours?: number;
  hourlyRate?: number;
  depositOption: string;
  depositAmount: number;
  proposal: string;
  submittedAt: string;
}

interface QAItem {
  id: string;
  userName: string;
  userAvatar?: string;
  question?: string;
  answer?: string;
  createdAt: string;
  isAnswer: boolean;
}

const mockJob: Job = {
  id: "2", // Using job 2 which has winnerBid in JobBoard
  title: "Custom Tattoo Design & Application",
  description: "Looking for skilled tattoo artist to create and apply a custom sleeve design. Traditional Japanese style preferred. Must provide portfolio of similar work.",
  category: "Tattoo Studio",
  address: "San Francisco, CA",
  paymentType: "fixed",
  fixedPrice: 1200,
  budgetMax: 1500,
  urgencyLevel: "within_week",
  materialsProvided: false,
  biddingEndDate: "2024-02-20T18:00:00Z",
  status: "in_progress",
  imageUrls: [
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1585821569331-f071db2abd8d?w=800&h=600&fit=crop"
  ],
  createdAt: "2024-01-18T10:00:00Z",
  winnerBid: {
    providerId: "p2",
    providerName: "Ink & Steel Tattoos",
    amount: 1100,
    acceptedAt: "2024-01-20",
    estimatedCompletion: "2024-02-18"
  }
};

const mockBids: Bid[] = [
  {
    id: "1",
    bidderName: "Alex Johnson",
    bidderRating: 4.9,
    amount: 4800,
    depositOption: "25_percent",
    depositAmount: 1200,
    proposal: "I have 5+ years of experience in React and Node.js development. I can deliver this project within 3 weeks with full responsive design and modern UI/UX. My approach includes thorough testing and documentation.",
    submittedAt: "2024-01-16T09:30:00Z"
  },
  {
    id: "2",
    bidderName: "Sarah Chen",
    bidderRating: 4.8,
    amount: 5200,
    depositOption: "custom",
    depositAmount: 1000,
    proposal: "Experienced full-stack developer with expertise in e-commerce solutions. I'll use the latest technologies and ensure mobile-first design. Includes 3 months free maintenance.",
    submittedAt: "2024-01-16T14:15:00Z"
  }
];

const mockQA: QAItem[] = [
  {
    id: "1",
    userName: "Mike Wilson",
    question: "Do you need integration with any specific payment gateways like Stripe or PayPal?",
    createdAt: "2024-01-16T08:00:00Z",
    isAnswer: false
  },
  {
    id: "2",
    userName: "Job Owner",
    answer: "Yes, we need Stripe integration primarily, and PayPal as a secondary option.",
    createdAt: "2024-01-16T10:30:00Z",
    isAnswer: true
  },
  {
    id: "3",
    userName: "Lisa Garcia",
    question: "What's the expected traffic volume for the website? This will help with hosting recommendations.",
    createdAt: "2024-01-16T16:20:00Z",
    isAnswer: false
  }
];

export const JobDetailsPage = ({ jobId, onBack }: { jobId: string; onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'bids' | 'qa'>('overview');
  const [isFollowing, setIsFollowing] = useState(false);
  const [showBidForm, setShowBidForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [timeLeft, setTimeLeft] = useState("");
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [bidData, setBidData] = useState({
    amount: "",
    estimatedHours: "",
    hourlyRate: "",
    depositOption: "25_percent",
    customDepositPercentage: "",
    proposal: "",
    paymentType: "fixed", // 'fixed' or 'hourly'
    includeMva: false
  });
  const { toast } = useToast();

  // Generate shareable URL
  const shareUrl = `${window.location.origin}/job/${jobId}`;
  const shareTitle = `Check out this job: ${mockJob.title}`;
  const shareDescription = mockJob.description.slice(0, 150) + "...";

  // Countdown timer for bidding deadline
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const deadline = new Date(mockJob.biddingEndDate).getTime();
      const distance = deadline - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (days > 0) {
          setTimeLeft(`${days}d ${hours}h ${minutes}m`);
        } else if (hours > 0) {
          setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        } else {
          setTimeLeft(`${minutes}m ${seconds}s`);
        }
      } else {
        setTimeLeft("Bidding Closed");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast({
      title: isFollowing ? "Unfollowed" : "Following",
      description: isFollowing 
        ? "You will no longer receive notifications for this job."
        : "You'll receive notifications about new bids and updates.",
    });
  };

  const handleSubmitBid = () => {
    toast({
      title: "Bid Submitted",
      description: "Your bid has been submitted successfully!",
    });
    setShowBidForm(false);
  };

  const handleSubmitQuestion = () => {
    if (newQuestion.trim()) {
      toast({
        title: "Question Posted",
        description: "Your question has been posted successfully!",
      });
      setNewQuestion("");
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'asap': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'within_week': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'flexible': return 'bg-green-500/20 text-green-300 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link Copied!",
        description: "The job link has been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually.",
        variant: "destructive",
      });
    }
  };

  const handleSocialShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(shareTitle);
    const encodedDescription = encodeURIComponent(shareDescription);
    
    let shareLink = '';
    
    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
        break;
      default:
        return;
    }
    
    window.open(shareLink, '_blank', 'width=600,height=400');
    setShowShareDialog(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={onBack}>
            ← Back to Jobs
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">{mockJob.title}</h1>
            <div className="flex items-center gap-4 mt-2 text-muted-foreground">
              <Badge variant="secondary">{mockJob.category}</Badge>
              <div className="flex items-center gap-1">
                <MapPin size={16} />
                <span>{mockJob.address}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>Posted {new Date(mockJob.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Share2 size={16} />
                  Share
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Share this job</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-muted/50">
                    <h4 className="font-semibold text-sm mb-1">{mockJob.title}</h4>
                    <p className="text-xs text-muted-foreground">{shareDescription}</p>
                    <p className="text-xs text-primary mt-2">{shareUrl}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      variant="outline" 
                      onClick={() => handleSocialShare('facebook')}
                      className="flex items-center gap-2 h-12"
                    >
                      <Facebook size={18} className="text-blue-600" />
                      Facebook
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleSocialShare('twitter')}
                      className="flex items-center gap-2 h-12"
                    >
                      <Twitter size={18} className="text-blue-400" />
                      Twitter
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleSocialShare('linkedin')}
                      className="flex items-center gap-2 h-12"
                    >
                      <Linkedin size={18} className="text-blue-700" />
                      LinkedIn
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleSocialShare('whatsapp')}
                      className="flex items-center gap-2 h-12"
                    >
                      <MessageSquare size={18} className="text-green-600" />
                      WhatsApp
                    </Button>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="secondary" 
                      onClick={handleCopyLink}
                      className="flex-1 flex items-center gap-2"
                    >
                      <Copy size={16} />
                      Copy Link
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              variant={isFollowing ? "default" : "outline"}
              onClick={handleFollow}
              className="flex items-center gap-2"
            >
              <Star size={16} className={isFollowing ? "fill-current" : ""} />
              {isFollowing ? "Following" : "Follow"}
            </Button>
            {!mockJob.winnerBid && (
              <Button onClick={() => setShowBidForm(true)} className="gradient-primary">
                Place Bid
              </Button>
            )}
          </div>
        </div>

        {/* Conditional Countdown Timer or Winner Information */}
        {!mockJob.winnerBid ? (
          <Card className="mb-6 border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-red-500/10">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center gap-4">
                <Timer className="text-orange-500" size={24} />
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Bidding ends in</p>
                  <p className="text-2xl font-bold text-orange-500">{timeLeft}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Total Bids</p>
                  <p className="text-2xl font-bold text-primary">{mockBids.length}</p>
                </div>
              </div>
              
              {/* Enhanced Place Bid Button */}
              <div className="flex justify-center mt-6 pt-4 border-t border-orange-500/20">
                <Button 
                  onClick={() => setShowBidForm(true)} 
                  size="lg"
                  className="gradient-primary hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl animate-pulse hover:animate-none px-8 py-3 text-lg font-semibold relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <DollarSign size={20} className="animate-bounce" />
                    PLACE BID NOW
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : mockJob.winnerBid && (
          <Card className="mb-6 border-green-500/20 bg-gradient-to-r from-green-500/10 to-blue-500/10">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center gap-6 mb-6">
                <CheckCircle className="text-green-500" size={32} />
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Project Status</p>
                  <p className="text-2xl font-bold text-primary capitalize">{mockJob.status.replace('_', ' ')}</p>
                </div>
              </div>
              
              <div className="space-y-4 p-4 bg-card rounded-lg border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="font-semibold text-lg">Project Awarded</span>
                  </div>
                  <VerifiedBadge size="sm" variant="glow" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Selected Provider:</span>
                    </div>
                    <p className="font-semibold text-primary">{mockJob.winnerBid.providerName}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Winning Bid:</span>
                    </div>
                    <p className="font-semibold text-green-600 text-lg">${mockJob.winnerBid.amount.toLocaleString()}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Accepted On:</span>
                    </div>
                    <p className="font-medium">{new Date(mockJob.winnerBid.acceptedAt).toLocaleDateString()}</p>
                  </div>
                  
                  {mockJob.status === 'in_progress' && mockJob.winnerBid.estimatedCompletion && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Est. Completion:</span>
                      </div>
                      <p className="font-medium text-blue-600">{new Date(mockJob.winnerBid.estimatedCompletion).toLocaleDateString()}</p>
                    </div>
                  )}
                  
                  {mockJob.status === 'completed' && mockJob.winnerBid.completedAt && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-muted-foreground">Completed On:</span>
                      </div>
                      <p className="font-medium text-green-600">{new Date(mockJob.winnerBid.completedAt).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Job Images & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera size={20} />
                Project Images
              </CardTitle>
            </CardHeader>
            <CardContent>
              {mockJob.imageUrls.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-2 gap-2">
                    {mockJob.imageUrls.slice(0, 3).map((url, index) => (
                      <AspectRatio key={index} ratio={index === 0 ? 16/12 : 16/9} className={index === 0 ? "col-span-2" : ""}>
                        <img
                          src={url}
                          alt={`Project image ${index + 1}`}
                          className="rounded-lg object-cover w-full h-full hover:scale-105 transition-transform cursor-pointer"
                        />
                      </AspectRatio>
                    ))}
                  </div>
                  {mockJob.imageUrls.length > 3 && (
                    <p className="text-sm text-muted-foreground text-center">
                      +{mockJob.imageUrls.length - 3} more images
                    </p>
                  )}
                </div>
              ) : (
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Camera size={48} className="mx-auto mb-2 opacity-50" />
                    <p>No images provided</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Job Details */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  Job Details
                  <Badge className={getUrgencyColor(mockJob.urgencyLevel)}>
                    {mockJob.urgencyLevel.replace('_', ' ').toUpperCase()}
                  </Badge>
                </CardTitle>
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end">
                    <DollarSign size={20} />
                    <span className="text-2xl font-bold text-primary">
                      ${mockJob.fixedPrice?.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {mockJob.paymentType === 'fixed' ? 'Fixed Price' : 'Per Hour'}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed mb-6">{mockJob.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Budget Range</p>
                    <p className="font-semibold">${mockJob.budgetMax?.toLocaleString()} max</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Materials</p>
                    <p className="font-semibold">
                      {mockJob.materialsProvided ? 'Provided' : 'Not Provided'}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Bids Received</p>
                    <p className="font-semibold">{mockBids.length} bids</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Followers</p>
                    <p className="font-semibold">12 following</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6">
          <Button
            variant={activeTab === 'overview' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </Button>
          <Button
            variant={activeTab === 'bids' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('bids')}
            className="flex items-center gap-2"
          >
            Bids ({mockBids.length})
          </Button>
          <Button
            variant={activeTab === 'qa' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('qa')}
            className="flex items-center gap-2"
          >
            <MessageSquare size={16} />
            Q&A ({mockQA.length})
          </Button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <Card>
            <CardHeader>
              <CardTitle>Project Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 text-lg">What needs to be done:</h4>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Paint living room (approx. 400 sq ft) - walls and ceiling</li>
                    <li>Paint kitchen (approx. 300 sq ft) - walls only</li>
                    <li>Prep work including light sanding and hole filling</li>
                    <li>Remove switch plates and outlet covers</li>
                    <li>Protect floors and furniture with drop cloths</li>
                    <li>Clean up after job completion</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-lg">Paint Preferences:</h4>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Living room: Warm neutral color (beige/cream family)</li>
                    <li>Kitchen: Light, fresh color (white or very light gray)</li>
                    <li>High-quality paint preferred (Sherwin Williams or Benjamin Moore)</li>
                    <li>Eggshell or satin finish for durability</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-lg">Requirements:</h4>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Licensed and insured painter</li>
                    <li>Minimum 3 years of residential painting experience</li>
                    <li>References from recent customers</li>
                    <li>Must provide own tools and equipment</li>
                    <li>Available to start within 1-2 weeks</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'bids' && (
          <div className="space-y-4">
            {mockBids.map((bid) => (
              <Card key={bid.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={bid.bidderAvatar} />
                        <AvatarFallback>{bid.bidderName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{bid.bidderName}</h4>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-muted-foreground">{bid.bidderRating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">${bid.amount.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">
                        Deposit: ${bid.depositAmount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground mb-4">{bid.proposal}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Submitted {new Date(bid.submittedAt).toLocaleDateString()}</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View Profile</Button>
                      <Button size="sm">Accept Bid</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'qa' && (
          <div className="space-y-4">
            {/* Q&A List */}
            <div className="space-y-4">
              {mockQA.map((item) => (
                <Card key={item.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={item.userAvatar} />
                        <AvatarFallback>{item.userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold">{item.userName}</span>
                          <Badge variant={item.isAnswer ? "default" : "secondary"}>
                            {item.isAnswer ? "Answer" : "Question"}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-foreground">
                          {item.question || item.answer}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Question Buttons */}
            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="text-lg">Quick Questions</CardTitle>
                <p className="text-sm text-muted-foreground">Click any question to ask it quickly</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[
                    "What type of paint do you recommend?",
                    "How long will this project take?",
                    "Do you provide a warranty?",
                    "Can you work around my schedule?",
                    "Do you have references I can contact?",
                    "What's included in the preparation work?"
                  ].map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="justify-start text-left h-auto p-3 hover:bg-primary/5"
                      onClick={() => setNewQuestion(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Ask Question Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare size={20} />
                  Ask a Question
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Get clarification before placing your bid
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Ask a specific question about this painting project..."
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      {newQuestion.length}/500 characters
                    </p>
                    <Button 
                      onClick={handleSubmitQuestion} 
                      disabled={!newQuestion.trim() || newQuestion.length > 500}
                      className="flex items-center gap-2"
                    >
                      <Send size={16} />
                      Post Question
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Bid Form Modal */}
        {showBidForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Place Your Bid</CardTitle>
              </CardHeader>
               <CardContent className="space-y-6">
                {/* Payment Type Selection */}
                <div>
                  <Label>Payment Type</Label>
                  <Select
                    value={bidData.paymentType}
                    onValueChange={(value) => setBidData(prev => ({...prev, paymentType: value}))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed">Fixed Project Price</SelectItem>
                      <SelectItem value="hourly">Hourly Rate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Amount/Rate Input */}
                {bidData.paymentType === 'fixed' ? (
                  <div>
                    <Label htmlFor="bidAmount">Total Project Amount</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                      <Input
                        id="bidAmount"
                        type="number"
                        placeholder="0.00"
                        className="pl-10"
                        value={bidData.amount}
                        onChange={(e) => setBidData(prev => ({...prev, amount: e.target.value}))}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="hourlyRate">Hourly Rate</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                        <Input
                          id="hourlyRate"
                          type="number"
                          placeholder="0.00"
                          className="pl-10"
                          value={bidData.hourlyRate}
                          onChange={(e) => setBidData(prev => ({...prev, hourlyRate: e.target.value}))}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="estimatedHours">Estimated Hours</Label>
                      <Input
                        id="estimatedHours"
                        type="number"
                        placeholder="40"
                        value={bidData.estimatedHours}
                        onChange={(e) => setBidData(prev => ({...prev, estimatedHours: e.target.value}))}
                      />
                    </div>
                  </div>
                )}

                {/* MVA Option */}
                <div className="flex items-center space-x-2">
                  <Switch
                    id="includeMva"
                    checked={bidData.includeMva}
                    onCheckedChange={(checked) => setBidData(prev => ({...prev, includeMva: checked}))}
                  />
                  <Label htmlFor="includeMva" className="text-sm font-medium">
                    Include MVA (Norwegian VAT - 25%)
                  </Label>
                </div>

                {/* Deposit Requirement */}
                <div>
                  <Label>Deposit Requirement</Label>
                  <Select
                    value={bidData.depositOption}
                    onValueChange={(value) => setBidData(prev => ({...prev, depositOption: value}))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="25_percent">25% Deposit Required</SelectItem>
                      <SelectItem value="custom">Custom Deposit Percentage</SelectItem>
                      <SelectItem value="no_deposit">No Deposit Required</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    Deposit helps secure the project and shows commitment from both parties
                  </p>
                </div>

                {bidData.depositOption === 'custom' && (
                  <div>
                    <Label htmlFor="customDeposit">Custom Deposit Percentage</Label>
                    <Input
                      id="customDeposit"
                      type="number"
                      placeholder="50"
                      min="10"
                      max="75"
                      value={bidData.customDepositPercentage}
                      onChange={(e) => setBidData(prev => ({...prev, customDepositPercentage: e.target.value}))}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Recommended range: 10-75%
                    </p>
                  </div>
                )}

                {/* Total Summary */}
                {(bidData.amount || (bidData.hourlyRate && bidData.estimatedHours)) && (
                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    <h4 className="font-semibold">Bid Summary</h4>
                    {bidData.paymentType === 'fixed' ? (
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span>Project Amount:</span>
                          <span>${Number(bidData.amount || 0).toLocaleString()}</span>
                        </div>
                        {bidData.includeMva && (
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>+ MVA (25%):</span>
                            <span>${(Number(bidData.amount || 0) * 0.25).toLocaleString()}</span>
                          </div>
                        )}
                        <div className="flex justify-between font-semibold border-t pt-1">
                          <span>Total Amount:</span>
                          <span>${(Number(bidData.amount || 0) * (bidData.includeMva ? 1.25 : 1)).toLocaleString()}</span>
                        </div>
                        {bidData.depositOption === '25_percent' && (
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Required Deposit (25%):</span>
                            <span>${(Number(bidData.amount || 0) * (bidData.includeMva ? 1.25 : 1) * 0.25).toLocaleString()}</span>
                          </div>
                        )}
                        {bidData.depositOption === 'custom' && bidData.customDepositPercentage && (
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Required Deposit ({bidData.customDepositPercentage}%):</span>
                            <span>${(Number(bidData.amount || 0) * (bidData.includeMva ? 1.25 : 1) * (Number(bidData.customDepositPercentage) / 100)).toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span>Hourly Rate:</span>
                          <span>${Number(bidData.hourlyRate || 0).toLocaleString()}/hour</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Estimated Hours:</span>
                          <span>{bidData.estimatedHours} hours</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Estimated Total:</span>
                          <span>${(Number(bidData.hourlyRate || 0) * Number(bidData.estimatedHours || 0)).toLocaleString()}</span>
                        </div>
                        {bidData.includeMva && (
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>+ MVA (25%):</span>
                            <span>${(Number(bidData.hourlyRate || 0) * Number(bidData.estimatedHours || 0) * 0.25).toLocaleString()}</span>
                          </div>
                        )}
                        <div className="flex justify-between font-semibold border-t pt-1">
                          <span>Total Estimated:</span>
                          <span>${(Number(bidData.hourlyRate || 0) * Number(bidData.estimatedHours || 0) * (bidData.includeMva ? 1.25 : 1)).toLocaleString()}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div>
                  <Label htmlFor="proposal">Proposal</Label>
                  <Textarea
                    id="proposal"
                    placeholder="Describe your approach, experience, and why you're the best fit for this project..."
                    rows={6}
                    value={bidData.proposal}
                    onChange={(e) => setBidData(prev => ({...prev, proposal: e.target.value}))}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setShowBidForm(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmitBid}>
                  Submit Bid
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};