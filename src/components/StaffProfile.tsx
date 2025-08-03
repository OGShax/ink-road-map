import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Verified,
  Calendar,
  Award,
  Heart,
  Share2,
  Image as ImageIcon
} from "lucide-react";

const mockStaffData = {
  "sophia-martinez": {
    id: "sophia-martinez",
    name: "Sophia Martinez",
    role: "Owner & Lead Stylist",
    experience: "8 years",
    specialties: ["Bridal", "Color", "Extensions"],
    rating: 4.9,
    reviewCount: 89,
    completedJobs: 156,
    favoritedBy: 234,
    bio: "Master stylist specializing in bridal and color work. Trained in advanced color techniques and bridal styling. I'm passionate about creating looks that make my clients feel confident and beautiful on their special day.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b332c3db?w=400&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=800&h=400&fit=crop",
    verified: true,
    phone: "+1 (555) 123-4567",
    email: "sophia@hairstudio.com",
    workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    availableServices: [
      { name: "Bridal Hair Package", price: "$250", duration: "120 min" },
      { name: "Full Color Treatment", price: "$120", duration: "120 min" },
      { name: "Women's Haircut & Style", price: "$85", duration: "60 min" },
      { name: "Hair Extensions", price: "$200-350", duration: "180 min" }
    ],
    portfolio: [
      { id: 1, image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300&h=300&fit=crop", category: "Bridal" },
      { id: 2, image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=300&fit=crop", category: "Color" },
      { id: 3, image: "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=300&h=300&fit=crop", category: "Extensions" },
      { id: 4, image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=300&h=300&fit=crop", category: "Bridal" }
    ],
    reviews: [
      {
        id: 1,
        name: "Sarah Johnson",
        rating: 5,
        date: "2 days ago",
        comment: "Sophia is absolutely amazing! She did my bridal hair and it was perfect. Professional, talented, and so easy to work with.",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c3db?w=50&h=50&fit=crop"
      },
      {
        id: 2,
        name: "Emma Wilson",
        rating: 5,
        date: "1 week ago",
        comment: "Best color treatment I've ever had! Sophia really knows her craft and the results were stunning.",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop"
      }
    ]
  }
};

export const StaffProfile = () => {
  const { staffId } = useParams();
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);

  const staffMember = mockStaffData[staffId as keyof typeof mockStaffData];

  if (!staffMember) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Staff Member Not Found</h2>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    );
  }

  const handleBack = () => {
    navigate(-1);
  };

  const handleContact = (type: 'phone' | 'chat') => {
    if (type === 'phone') {
      window.open(`tel:${staffMember.phone}`);
    } else {
      console.log('Open chat with staff member');
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
              Back to Studio
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
          src={staffMember.coverImage} 
          alt="Staff cover"
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
                  <AvatarImage src={staffMember.image} alt={staffMember.name} />
                  <AvatarFallback>{staffMember.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                {staffMember.verified && (
                  <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white rounded-full p-2">
                    <Verified size={16} fill="currentColor" />
                  </div>
                )}
              </div>

              {/* Profile Details */}
              <div className="flex-1 space-y-3">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">{staffMember.name}</h1>
                  <p className="text-muted-foreground">{staffMember.role}</p>
                  <p className="text-sm text-muted-foreground">{staffMember.experience} experience</p>
                </div>

                <p className="text-sm leading-relaxed">{staffMember.bio}</p>

                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-500 fill-current" />
                    <span className="font-medium">{staffMember.rating}</span>
                    <span className="text-muted-foreground">({staffMember.reviewCount} reviews)</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-8 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-lg">{staffMember.favoritedBy}</div>
                    <div className="text-muted-foreground">favorites</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg">{staffMember.completedJobs}</div>
                    <div className="text-muted-foreground">jobs completed</div>
                  </div>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-2">
                  {staffMember.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>

                {/* Working Days */}
                <div className="flex items-center gap-2 text-sm">
                  <Calendar size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground">Available: {staffMember.workingDays.join(', ')}</span>
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
                <Button size="sm" className="flex items-center gap-2">
                  <Calendar size={16} />
                  Book with {staffMember.name.split(' ')[0]}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Services */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Award size={20} />
              My Services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {staffMember.availableServices.map((service, index) => (
                <div key={index} className="group flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors cursor-pointer border">
                  <div className="flex-1">
                    <h4 className="font-medium group-hover:text-primary transition-colors">{service.name}</h4>
                    <p className="text-sm text-muted-foreground">{service.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">{service.price}</p>
                    <Button size="sm" variant="outline" className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Book
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Portfolio */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <ImageIcon size={20} />
              My Work
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {staffMember.portfolio.map((item) => (
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
          </CardContent>
        </Card>

        {/* Reviews */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Client Reviews</h3>
              <div className="flex items-center gap-2">
                <Star size={20} className="text-yellow-500 fill-current" />
                <span className="font-medium">{staffMember.rating}</span>
                <span className="text-muted-foreground">({staffMember.reviewCount} reviews)</span>
              </div>
            </div>
            <div className="space-y-4">
              {staffMember.reviews.map((review) => (
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