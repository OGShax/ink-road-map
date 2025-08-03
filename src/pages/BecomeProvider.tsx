import { ArrowLeft, CheckCircle, Users, DollarSign, Clock, Shield, Star, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

export const BecomeProvider = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: DollarSign,
      title: "Competitive Earnings",
      description: "Set your own rates and keep 85-95% of your earnings. Top providers earn $75,000+ annually."
    },
    {
      icon: Users,
      title: "Ready Customer Base",
      description: "Access thousands of customers actively seeking your services in your area."
    },
    {
      icon: Clock,
      title: "Flexible Schedule",
      description: "Work when you want, where you want. You control your availability completely."
    },
    {
      icon: Shield,
      title: "Insurance Protection",
      description: "Comprehensive liability coverage and payment protection for all verified providers."
    },
    {
      icon: Star,
      title: "Professional Growth",
      description: "Build your reputation with verified reviews and showcase your expertise."
    },
    {
      icon: TrendingUp,
      title: "Business Tools",
      description: "Access professional tools for scheduling, payments, customer management, and marketing."
    }
  ];

  const requirements = [
    "Valid professional license or certification in your field",
    "Minimum 2 years of professional experience",
    "Clean background check and insurance verification",
    "Professional portfolio or work samples",
    "Reliable transportation and professional equipment",
    "Commitment to quality service and customer satisfaction"
  ];

  const process = [
    {
      step: "1",
      title: "Apply Online",
      description: "Complete our comprehensive application with your credentials and experience."
    },
    {
      step: "2", 
      title: "Verification",
      description: "We verify your licenses, insurance, background, and professional references."
    },
    {
      step: "3",
      title: "Profile Setup",
      description: "Create your professional profile with portfolio, rates, and service areas."
    },
    {
      step: "4",
      title: "Start Earning",
      description: "Get matched with customers and start building your business on our platform."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <div className="max-w-3xl">
            <Badge variant="glow" className="mb-4">
              Join 12,000+ Professionals
            </Badge>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Become a ProConnect Provider
            </h1>
            <p className="text-xl text-muted-foreground">
              Join the premier platform for professional service providers. Grow your business, 
              reach more customers, and build your reputation with verified professionals.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Benefits Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose ProConnect?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide everything you need to succeed as an independent professional service provider.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <benefit.icon className="w-8 h-8 text-primary mb-2" />
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Application Process */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Simple Application Process</h2>
            <p className="text-lg text-muted-foreground">
              Get started in just 4 easy steps. Most applications are approved within 3-5 business days.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {step.step}
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{step.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Requirements */}
        <section>
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Provider Requirements</CardTitle>
                <CardDescription>
                  To ensure quality and safety, all providers must meet these professional standards:
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {requirements.map((requirement, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{requirement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Get Started?</CardTitle>
              <CardDescription className="text-lg">
                Join thousands of professionals who are growing their business with ProConnect.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button size="lg" className="text-lg px-8">
                Apply Now
              </Button>
              <p className="text-sm text-muted-foreground">
                Questions? Contact our provider support team at{' '}
                <a href="mailto:providers@proconnect.com" className="text-primary hover:underline">
                  providers@proconnect.com
                </a>
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};