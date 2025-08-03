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
import { MapPin, Clock, DollarSign, User, MessageSquare, Star, Calendar, AlertCircle, Timer, Camera, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  id: "1",
  title: "Interior House Painting - Living Room & Kitchen",
  description: "Need professional painting services for my 1200 sq ft living room and kitchen. Walls are in good condition, just need a fresh coat of paint. I have specific color preferences and would like advice on paint selection. Looking for someone with experience in residential painting and attention to detail.",
  category: "Home Improvement",
  address: "Downtown Seattle, WA",
  paymentType: "fixed",
  fixedPrice: 2800,
  budgetMax: 3200,
  urgencyLevel: "within_week",
  materialsProvided: false,
  biddingEndDate: "2025-08-10T18:00:00Z",
  status: "active",
  imageUrls: [
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1585821569331-f071db2abd8d?w=800&h=600&fit=crop"
  ],
  createdAt: "2025-08-01T10:00:00Z"
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
  const [bidData, setBidData] = useState({
    amount: "",
    estimatedHours: "",
    hourlyRate: "",
    depositOption: "25_percent",
    customDepositPercentage: "",
    proposal: ""
  });
  const { toast } = useToast();

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
            <Button
              variant={isFollowing ? "default" : "outline"}
              onClick={handleFollow}
              className="flex items-center gap-2"
            >
              <Star size={16} className={isFollowing ? "fill-current" : ""} />
              {isFollowing ? "Following" : "Follow"}
            </Button>
            <Button onClick={() => setShowBidForm(true)} className="gradient-primary">
              Place Bid
            </Button>
          </div>
        </div>

        {/* Countdown Timer */}
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
          </CardContent>
        </Card>

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
                <div>
                  <Label htmlFor="bidAmount">Bid Amount</Label>
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

                <div>
                  <Label>Deposit Option</Label>
                  <Select
                    value={bidData.depositOption}
                    onValueChange={(value) => setBidData(prev => ({...prev, depositOption: value}))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="25_percent">25% Deposit</SelectItem>
                      <SelectItem value="custom">Custom Percentage</SelectItem>
                      <SelectItem value="full_payment">Full Payment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {bidData.depositOption === 'custom' && (
                  <div>
                    <Label htmlFor="customDeposit">Custom Deposit Percentage</Label>
                    <Input
                      id="customDeposit"
                      type="number"
                      placeholder="50"
                      value={bidData.customDepositPercentage}
                      onChange={(e) => setBidData(prev => ({...prev, customDepositPercentage: e.target.value}))}
                    />
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