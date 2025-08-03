import { CreditCard, Users, TrendingUp, Award, Star, Zap, Crown, Target } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export const MonetizationDashboard = () => {
  const subscriptionPlans = [
    {
      name: "Basic",
      price: "$19",
      period: "/month",
      features: [
        "List your services",
        "Basic profile",
        "Customer messaging",
        "5% platform fee",
        "Standard support"
      ],
      popular: false,
      color: "border-border"
    },
    {
      name: "Professional",
      price: "$49",
      period: "/month",
      features: [
        "Everything in Basic",
        "Verified badge",
        "Featured listings",
        "3% platform fee",
        "Priority support",
        "Advanced analytics",
        "Online booking system"
      ],
      popular: true,
      color: "border-primary"
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "/month",
      features: [
        "Everything in Professional",
        "Top search placement",
        "1% platform fee",
        "White-label solutions",
        "Dedicated account manager",
        "API access",
        "Custom integrations"
      ],
      popular: false,
      color: "border-accent"
    }
  ];

  const additionalServices = [
    {
      title: "Featured Listings",
      price: "$25/week",
      description: "Get your services featured at the top of search results",
      icon: <Star className="w-6 h-6" />
    },
    {
      title: "Instant Booking",
      price: "$15/month",
      description: "Enable instant booking for your services",
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: "Premium Analytics",
      price: "$20/month",
      description: "Advanced insights and customer analytics",
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      title: "Verification Badge",
      price: "$50 one-time",
      description: "Get verified with background check and credentials review",
      icon: <Award className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Grow Your Business</h1>
          <p className="text-xl mb-8 opacity-90">Choose the plan that's right for your professional services</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <Users className="w-4 h-4 mr-2" />
              50K+ Active Customers
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <TrendingUp className="w-4 h-4 mr-2" />
              Average 40% Revenue Increase
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <Crown className="w-4 h-4 mr-2" />
              Industry Leading Platform
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="subscriptions" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="subscriptions">Subscription Plans</TabsTrigger>
            <TabsTrigger value="addons">Add-on Services</TabsTrigger>
            <TabsTrigger value="commission">Commission Model</TabsTrigger>
          </TabsList>

          <TabsContent value="subscriptions" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
              <p className="text-muted-foreground">Start free, upgrade when you're ready to grow</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subscriptionPlans.map((plan, index) => (
                <Card key={index} className={`relative ${plan.color} ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge variant="glow" className="px-4 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="text-4xl font-bold text-primary">
                      {plan.price}
                      <span className="text-lg text-muted-foreground">{plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"} size="lg">
                      {plan.name === "Basic" ? "Start Free Trial" : "Upgrade Now"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="addons" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Boost Your Visibility</h2>
              <p className="text-muted-foreground">Add powerful features to attract more customers</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {additionalServices.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        {service.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                        <div className="text-lg font-semibold text-primary">{service.price}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <Button className="w-full" variant="outline">
                      Add to Plan
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="commission" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Commission Structure</h2>
              <p className="text-muted-foreground">Transparent pricing that grows with your business</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div className="space-y-4">
                    <div className="text-3xl font-bold text-primary">5%</div>
                    <h3 className="text-xl font-semibold">Basic Plan</h3>
                    <p className="text-muted-foreground">Commission on completed jobs</p>
                  </div>
                  <div className="space-y-4">
                    <div className="text-3xl font-bold text-primary">3%</div>
                    <h3 className="text-xl font-semibold">Professional Plan</h3>
                    <p className="text-muted-foreground">Reduced commission rate</p>
                  </div>
                  <div className="space-y-4">
                    <div className="text-3xl font-bold text-primary">1%</div>
                    <h3 className="text-xl font-semibold">Enterprise Plan</h3>
                    <p className="text-muted-foreground">Lowest commission rate</p>
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    How it works:
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Commission is only charged on successfully completed jobs</li>
                    <li>• Payment is processed securely through our platform</li>
                    <li>• You receive payment within 24 hours of job completion</li>
                    <li>• No hidden fees or monthly minimums</li>
                  </ul>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};