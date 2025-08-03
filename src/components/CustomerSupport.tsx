import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateTicketDialog } from "./support/CreateTicketDialog";
import { TicketDetailDialog } from "./support/TicketDetailDialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, MessageSquare, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { format } from "date-fns";

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  created_at: string;
  updated_at: string;
}

export function CustomerSupport() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTickets(data || []);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      toast({
        title: "Error",
        description: "Failed to load tickets",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTicketCreated = () => {
    fetchTickets();
    setCreateDialogOpen(false);
    toast({
      title: "Success",
      description: "Support ticket created successfully",
    });
  };

  const handleTicketClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setDetailDialogOpen(true);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <AlertCircle className="h-4 w-4" />;
      case 'in_progress':
        return <Clock className="h-4 w-4" />;
      case 'resolved':
      case 'closed':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'in_progress':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'resolved':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'closed':
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
      default:
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'high':
        return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'urgent':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const filterTicketsByStatus = (status?: string) => {
    if (!status) return tickets;
    return tickets.filter(ticket => ticket.status === status);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading support tickets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Customer Support</h1>
          <p className="text-muted-foreground">Manage your support tickets and get help</p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Ticket
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All ({tickets.length})</TabsTrigger>
          <TabsTrigger value="open">Open ({filterTicketsByStatus('open').length})</TabsTrigger>
          <TabsTrigger value="in_progress">In Progress ({filterTicketsByStatus('in_progress').length})</TabsTrigger>
          <TabsTrigger value="resolved">Resolved ({filterTicketsByStatus('resolved').length})</TabsTrigger>
          <TabsTrigger value="closed">Closed ({filterTicketsByStatus('closed').length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <TicketList tickets={tickets} onTicketClick={handleTicketClick} getStatusIcon={getStatusIcon} getStatusColor={getStatusColor} getPriorityColor={getPriorityColor} />
        </TabsContent>
        
        <TabsContent value="open">
          <TicketList tickets={filterTicketsByStatus('open')} onTicketClick={handleTicketClick} getStatusIcon={getStatusIcon} getStatusColor={getStatusColor} getPriorityColor={getPriorityColor} />
        </TabsContent>
        
        <TabsContent value="in_progress">
          <TicketList tickets={filterTicketsByStatus('in_progress')} onTicketClick={handleTicketClick} getStatusIcon={getStatusIcon} getStatusColor={getStatusColor} getPriorityColor={getPriorityColor} />
        </TabsContent>
        
        <TabsContent value="resolved">
          <TicketList tickets={filterTicketsByStatus('resolved')} onTicketClick={handleTicketClick} getStatusIcon={getStatusIcon} getStatusColor={getStatusColor} getPriorityColor={getPriorityColor} />
        </TabsContent>
        
        <TabsContent value="closed">
          <TicketList tickets={filterTicketsByStatus('closed')} onTicketClick={handleTicketClick} getStatusIcon={getStatusIcon} getStatusColor={getStatusColor} getPriorityColor={getPriorityColor} />
        </TabsContent>
      </Tabs>

      <CreateTicketDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onTicketCreated={handleTicketCreated}
      />

      {selectedTicket && (
        <TicketDetailDialog
          open={detailDialogOpen}
          onOpenChange={setDetailDialogOpen}
          ticket={selectedTicket}
          onTicketUpdated={fetchTickets}
        />
      )}
    </div>
  );
}

interface TicketListProps {
  tickets: Ticket[];
  onTicketClick: (ticket: Ticket) => void;
  getStatusIcon: (status: string) => JSX.Element;
  getStatusColor: (status: string) => string;
  getPriorityColor: (priority: string) => string;
}

function TicketList({ tickets, onTicketClick, getStatusIcon, getStatusColor, getPriorityColor }: TicketListProps) {
  if (tickets.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No tickets found</h3>
          <p className="text-muted-foreground text-center">No support tickets match the current filter.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4">
      {tickets.map((ticket) => (
        <Card key={ticket.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onTicketClick(ticket)}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg">{ticket.title}</CardTitle>
                <CardDescription className="mt-1">
                  {ticket.description.length > 100 
                    ? `${ticket.description.substring(0, 100)}...` 
                    : ticket.description
                  }
                </CardDescription>
              </div>
              <div className="flex flex-col gap-2 ml-4">
                <Badge className={getStatusColor(ticket.status)}>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(ticket.status)}
                    {ticket.status.replace('_', ' ')}
                  </div>
                </Badge>
                <Badge className={getPriorityColor(ticket.priority)}>
                  {ticket.priority}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Category: {ticket.category}</span>
              <span>Created: {format(new Date(ticket.created_at), 'MMM dd, yyyy')}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}