import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Clock, 
  Phone, 
  MessageCircle, 
  Verified,
  Calendar,
  Users,
  Award,
  Image as ImageIcon,
  Shield,
  Heart,
  Share2
} from "lucide-react";

const mockProvider = {
  id: "p1",
  name: "Sophia's Hair Studio",
  category: "Hair Studio",
  rating: 4.9,
  reviewCount: 127,
  specialties: ["Bridal", "Color", "Extensions", "Cuts"],
  location: "123 Beauty Ave, New York, NY 10001",
  image: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=400&h=400&fit=crop",
  coverImage: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=400&fit=crop",
  verified: true,
  bio: "Professional hair stylist with 8+ years of experience. Specializing in bridal hair, color treatments, and extensions. Creating beautiful looks that make you feel confident and radiant.",
  followers: 2400,
  following: 180,
  totalJobs: 156,
  workingHours: {
    monday: "9:00 AM - 7:00 PM",
    tuesday: "9:00 AM - 7:00 PM", 
    wednesday: "9:00 AM - 7:00 PM",
    thursday: "9:00 AM - 8:00 PM",
    friday: "9:00 AM - 8:00 PM",
    saturday: "8:00 AM - 6:00 PM",
    sunday: "Closed"
  },
  phone: "+1 (555) 123-4567",
  email: "sophia@hairstudio.com",
  policies: [
    "24-hour cancellation policy",
    "Payment due at time of service",
    "Late arrivals may result in shortened service",
    "No refunds on completed services"
  ],
  services: [
    { name: "Haircut & Style", price: "$85", duration: "60 min" },
    { name: "Color Treatment", price: "$120-180", duration: "120 min" },
    { name: "Hair Extensions", price: "$200-350", duration: "180 min" },
    { name: "Bridal Package", price: "$250", duration: "120 min" },
    { name: "Blowout", price: "$45", duration: "45 min" },
    { name: "Deep Conditioning", price: "$35", duration: "30 min" }
  ],
  staff: [
    {
      name: "Sophia Martinez",
      role: "Owner & Lead Stylist",
      experience: "8 years",
      specialties: ["Bridal", "Color"],
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c3db?w=150&h=150&fit=crop"
    },
    {
      name: "Emily Chen",
      role: "Senior Stylist",
      experience: "5 years", 
      specialties: ["Extensions", "Cuts"],
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
    },
    {
      name: "Marcus Johnson",
      role: "Color Specialist",
      experience: "6 years",
      specialties: ["Color", "Highlights"],
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
    }
  ],
  portfolio: [
    { id: 1, image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300&h=300&fit=crop", category: "Bridal" },
    { id: 2, image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=300&fit=crop", category: "Color" },
    { id: 3, image: "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=300&h=300&fit=crop", category: "Extensions" },
    { id: 4, image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=300&h=300&fit=crop", category: "Cuts" },
    { id: 5, image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=300&h=300&fit=crop", category: "Bridal" },
    { id: 6, image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=300&h=300&fit=crop", category: "Color" }
  ],
  reviews: [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      date: "2 days ago",
      comment: "Absolutely amazing! Sophia did my bridal hair and it was perfect. She listened to exactly what I wanted and exceeded my expectations.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c3db?w=50&h=50&fit=crop"
    },
    {
      id: 2,
      name: "Maria Rodriguez", 
      rating: 5,
      date: "1 week ago",
      comment: "Best hair color I've ever had! Emily is incredibly talented and the whole team is so welcoming.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop"
    },
    {
      id: 3,
      name: "Jessica Chen",
      rating: 4,
      date: "2 weeks ago", 
      comment: "Great experience overall. The studio is clean and professional. Will definitely be back!",
      avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=50&h=50&fit=crop"
    }
  ]
};

export const ProviderProfile = () => {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("services");
  const [isFollowing, setIsFollowing] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleContact = (type: 'phone' | 'chat') => {
    if (type === 'phone') {
      window.open(`tel:${mockProvider.phone}`);
    } else {
      // Handle chat functionality
      console.log('Open chat with provider');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Back Button */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={handleBack} className="flex items-center gap-2">
              <ArrowLeft size={20} />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Share2 size={16} />
              </Button>
              <Button variant="ghost" size="sm">
                <Heart size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <img 
          src={mockProvider.coverImage} 
          alt="Studio cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="container mx-auto px-4 -mt-16 relative z-10">
        {/* Profile Info */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Profile Picture */}
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-background shadow-lg">
                  <AvatarImage src={mockProvider.image} alt={mockProvider.name} />
                  <AvatarFallback>{mockProvider.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                {mockProvider.verified && (
                  <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white rounded-full p-2">
                    <Verified size={16} fill="currentColor" />
                  </div>
                )}
              </div>

              {/* Profile Details */}
              <div className="flex-1 space-y-3">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">{mockProvider.name}</h1>
                  <p className="text-muted-foreground">{mockProvider.category}</p>
                </div>

                <p className="text-sm leading-relaxed">{mockProvider.bio}</p>

                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-500 fill-current" />
                    <span className="font-medium">{mockProvider.rating}</span>
                    <span className="text-muted-foreground">({mockProvider.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={16} className="text-muted-foreground" />
                    <span className="text-muted-foreground">New York, NY</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-8 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-lg">{mockProvider.followers}</div>
                    <div className="text-muted-foreground">followers</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg">{mockProvider.following}</div>
                    <div className="text-muted-foreground">following</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg">{mockProvider.totalJobs}</div>
                    <div className="text-muted-foreground">jobs completed</div>
                  </div>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-2">
                  {mockProvider.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 w-full md:w-auto">
                <Button 
                  onClick={() => setIsFollowing(!isFollowing)}
                  variant={isFollowing ? "outline" : "default"}
                  className="w-full md:w-32"
                >
                  {isFollowing ? "Following" : "Follow"}
                </Button>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => handleContact('chat')}
                    variant="outline" 
                    size="sm"
                    className="flex-1 md:flex-none"
                  >
                    <MessageCircle size={16} className="mr-2" />
                    Chat
                  </Button>
                  <Button 
                    onClick={() => handleContact('phone')}
                    variant="outline" 
                    size="sm"
                    className="flex-1 md:flex-none"
                  >
                    <Phone size={16} className="mr-2" />
                    Call
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Instagram-style Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Award size={16} />
              <span className="hidden sm:inline">Services</span>
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center gap-2">
              <MapPin size={16} />
              <span className="hidden sm:inline">About</span>
            </TabsTrigger>
            <TabsTrigger value="staff" className="flex items-center gap-2">
              <Users size={16} />
              <span className="hidden sm:inline">Staff</span>
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="flex items-center gap-2">
              <ImageIcon size={16} />
              <span className="hidden sm:inline">Portfolio</span>
            </TabsTrigger>
          </TabsList>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Our Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockProvider.services.map((service, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium">{service.name}</h4>
                        <p className="text-sm text-muted-foreground">{service.duration}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">{service.price}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">About Us</h3>
              <p className="text-muted-foreground leading-relaxed">{mockProvider.bio}</p>
            </div>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <MapPin size={16} />
                  Location & Hours
                </h4>
                <div className="space-y-2">
                  <p className="text-sm">{mockProvider.location}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    {Object.entries(mockProvider.workingHours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between">
                        <span className="capitalize font-medium">{day}:</span>
                        <span className="text-muted-foreground">{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Shield size={16} />
                  Policies
                </h4>
                <ul className="space-y-1 text-sm">
                  {mockProvider.policies.map((policy, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      {policy}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Staff Tab */}
          <TabsContent value="staff" className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Meet Our Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockProvider.staff.map((member, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 text-center">
                    <Avatar className="w-20 h-20 mx-auto mb-3">
                      <AvatarImage src={member.image} alt={member.name} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <h4 className="font-medium">{member.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{member.role}</p>
                    <p className="text-xs text-muted-foreground mb-3">{member.experience} experience</p>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {member.specialties.map((specialty) => (
                        <Badge key={specialty} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Portfolio</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {mockProvider.portfolio.map((item) => (
                <div key={item.id} className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer">
                  <img 
                    src={item.image} 
                    alt={`Portfolio ${item.id}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Badge variant="secondary" className="text-xs">
                      {item.category}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Reviews Section */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Reviews</h3>
              <div className="flex items-center gap-2">
                <Star size={20} className="text-yellow-500 fill-current" />
                <span className="font-medium">{mockProvider.rating}</span>
                <span className="text-muted-foreground">({mockProvider.reviewCount} reviews)</span>
              </div>
            </div>
            <div className="space-y-4">
              {mockProvider.reviews.map((review) => (
                <div key={review.id} className="flex gap-3 p-4 bg-muted/50 rounded-lg">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={review.avatar} alt={review.name} />
                    <AvatarFallback>{review.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{review.name}</span>
                      <div className="flex items-center">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} size={12} className="text-yellow-500 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};