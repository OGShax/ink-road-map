import { ArrowLeft, Check, Star, Zap, Crown, TrendingUp, Users, Calendar, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

export const ProSubscription = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Basic",
      price: "Free",
      period: "Forever",
      description: "Perfect for getting started",
      icon: Star,
      features: [
        "Create professional profile",
        "Receive customer inquiries",
        "Basic messaging system",
        "Standard verification badge",
        "Mobile app access",
        "85% commission rate"
      ],
      cta: "Get Started Free",
      popular: false
    },
    {
      name: "Pro",
      price: "$29",
      period: "/month",
      description: "Most popular for growing professionals",
      icon: Zap,
      features: [
        "Everything in Basic",
        "Priority in search results",
        "Advanced analytics dashboard",
        "Custom portfolio gallery",
        "Automated scheduling tools",
        "90% commission rate",
        "Premium customer support",
        "Social media integration"
      ],
      cta: "Start Pro Trial",
      popular: true
    },
    {
      name: "Elite",
      price: "$79",
      period: "/month",
      description: "For established professionals",
      icon: Crown,
      features: [
        "Everything in Pro",
        "Featured provider status",
        "Custom branding options",
        "Advanced marketing tools",
        "Dedicated account manager",
        "95% commission rate",
        "VIP customer support",
        "Early access to new features",
        "Professional photography credit"
      ],
      cta: "Go Elite",
      popular: false
    }
  ];

  const additionalFeatures = [
    {
      icon: TrendingUp,
      title: "Business Analytics",
      description: "Track your performance, earnings, and customer satisfaction with detailed insights."
    },
    {
      icon: Users,
      title: "Customer Management",
      description: "Advanced CRM tools to manage relationships and follow up with past clients."
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Automated booking system that syncs with your calendar and availability."
    },
    {
      icon: CreditCard,
      title: "Payment Processing",
      description: "Secure, fast payments with multiple options for your customers."
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
            <Badge variant="neon" className="mb-4">
              Professional Plans
            </Badge>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Pro Subscription Plans
            </h1>
            <p className="text-xl text-muted-foreground">
              Choose the plan that fits your business goals. Upgrade or downgrade anytime.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Pricing Plans */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Choose Your Plan</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Start free and upgrade as your business grows. All plans include our core features.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative h-full ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2" variant="glow">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center">
                  <plan.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-foreground">
                    {plan.price}
                    <span className="text-base font-normal text-muted-foreground">{plan.period}</span>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Additional Features */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Powerful Features for Your Business</h2>
            <p className="text-lg text-muted-foreground">
              All Pro and Elite plans include advanced tools to help you succeed.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => (
              <Card key={index} className="text-center h-full">
                <CardHeader>
                  <feature.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I change plans anytime?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, 
                    and we'll prorate any billing adjustments.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What happens if I cancel?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    You can cancel anytime without penalty. Your account will revert to the Basic plan, 
                    and you'll retain access to all your data and customer connections.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How does commission work?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Commission rates vary by plan: Basic (85%), Pro (90%), Elite (95%). 
                    This is the percentage you keep from each transaction, with no hidden fees.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Upgrade Your Business?</CardTitle>
              <CardDescription className="text-lg">
                Start your 14-day free trial of Pro today. No credit card required.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button size="lg" className="text-lg px-8">
                Start Free Trial
              </Button>
              <p className="text-sm text-muted-foreground">
                Need help choosing? Contact our team at{' '}
                <a href="mailto:billing@proconnect.com" className="text-primary hover:underline">
                  billing@proconnect.com
                </a>
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};