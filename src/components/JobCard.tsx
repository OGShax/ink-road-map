import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, DollarSign, Clock, CheckCircle, User } from "lucide-react";
import { VerifiedBadge } from "./VerifiedBadge";

interface WinnerBid {
  providerId: string;
  providerName: string;
  amount: number;
  acceptedAt: string;
  estimatedCompletion?: string;
  completedAt?: string;
}

interface JobCardProps {
  id: string;
  title: string;
  description: string;
  budget: number;
  location: string;
  category: string;
  deadline: string;
  postedAt: string;
  status: string;
  bidCount: number;
  winnerBid?: WinnerBid;
  onViewJob: (id: string) => void;
  onBid: (id: string) => void;
}

export const JobCard = ({
  id,
  title,
  description,
  budget,
  location,
  category,
  deadline,
  postedAt,
  status,
  bidCount,
  winnerBid,
  onViewJob,
  onBid,
}: JobCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
      case 'active': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'bidding_closed': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'in_progress': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'completed': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'cancelled': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <Card className="group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 border-border/50 bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
          <Badge className={`${getStatusColor(status)} capitalize`}>
            {status.replace('_', ' ')}
          </Badge>
        </div>
        <Badge variant="secondary" className="w-fit">
          {category}
        </Badge>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {description}
        </p>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <DollarSign size={16} />
            <span className="text-primary font-semibold">${budget.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={16} />
            <span>{location}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span>Due: {new Date(deadline).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>Posted: {new Date(postedAt).toLocaleDateString()}</span>
          </div>
        </div>
        
        {(status === 'open' || status === 'active') && (
          <div className="text-sm text-muted-foreground">
            <span className="text-primary font-semibold">{bidCount}</span> bids received
          </div>
        )}

        {(status === 'in_progress' || status === 'completed') && winnerBid && (
          <div className="space-y-2 p-3 bg-muted/50 rounded-lg border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">Awarded to</span>
              </div>
              <VerifiedBadge size="sm" showText={false} variant="minimal" />
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-semibold">{winnerBid.providerName}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Winning bid:</span>
              <span className="text-primary font-semibold">${winnerBid.amount.toLocaleString()}</span>
            </div>
            {status === 'completed' && winnerBid.completedAt && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Completed:</span>
                <span className="text-green-600 font-medium">{new Date(winnerBid.completedAt).toLocaleDateString()}</span>
              </div>
            )}
            {status === 'in_progress' && winnerBid.estimatedCompletion && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Est. completion:</span>
                <span className="text-blue-600 font-medium">{new Date(winnerBid.estimatedCompletion).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex gap-2">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => onViewJob(id)}
        >
          View Details
        </Button>
        {(status === 'open' || status === 'active') && (
          <Button 
            className="flex-1"
            onClick={() => onBid(id)}
          >
            Place Bid
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};