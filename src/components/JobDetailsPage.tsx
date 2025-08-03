import { useState } from "react";
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
import { MapPin, Clock, DollarSign, User, MessageSquare, Star, Calendar, AlertCircle } from "lucide-react";
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
  title: "Modern E-commerce Website Development",
  description: "Looking for an experienced developer to create a responsive e-commerce website with React and Node.js. The project includes user authentication, payment integration, shopping cart functionality, admin dashboard, and inventory management system.",
  category: "Web Development",
  address: "Remote",
  paymentType: "fixed",
  fixedPrice: 5000,
  budgetMax: 6000,
  urgencyLevel: "within_week",
  materialsProvided: false,
  biddingEndDate: "2024-02-15T23:59:59Z",
  status: "active",
  imageUrls: [],
  createdAt: "2024-01-15T10:00:00Z"
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
  const [bidData, setBidData] = useState({
    amount: "",
    estimatedHours: "",
    hourlyRate: "",
    depositOption: "25_percent",
    customDepositPercentage: "",
    proposal: ""
  });
  const { toast } = useToast();

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
            <Button onClick={() => setShowBidForm(true)}>
              Place Bid
            </Button>
          </div>
        </div>

        {/* Job Info Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                Job Details
                <Badge className={getUrgencyColor(mockJob.urgencyLevel)}>
                  {mockJob.urgencyLevel.replace('_', ' ').toUpperCase()}
                </Badge>
              </CardTitle>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <DollarSign size={16} />
                  <span className="text-primary font-semibold">
                    ${mockJob.fixedPrice?.toLocaleString()}
                  </span>
                  {mockJob.paymentType === 'fixed' ? ' Fixed' : ' /hour'}
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>Bidding ends {new Date(mockJob.biddingEndDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed">{mockJob.description}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t">
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
              <div>
                <p className="text-sm text-muted-foreground">Bids Received</p>
                <p className="font-semibold">{mockBids.length} bids</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Followers</p>
                <p className="font-semibold">12 following</p>
              </div>
            </div>
          </CardContent>
        </Card>

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
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Key Features Required:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>User authentication and authorization</li>
                    <li>Shopping cart and checkout functionality</li>
                    <li>Payment gateway integration (Stripe/PayPal)</li>
                    <li>Admin dashboard for product management</li>
                    <li>Inventory management system</li>
                    <li>Mobile responsive design</li>
                    <li>SEO optimization</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Technical Requirements:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>React.js for frontend</li>
                    <li>Node.js for backend</li>
                    <li>PostgreSQL or MongoDB for database</li>
                    <li>RESTful API design</li>
                    <li>Modern CSS framework (Tailwind preferred)</li>
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

            {/* Ask Question Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare size={20} />
                  Ask a Question
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Ask a question about this project..."
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    rows={3}
                  />
                  <Button onClick={handleSubmitQuestion} disabled={!newQuestion.trim()}>
                    Post Question
                  </Button>
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