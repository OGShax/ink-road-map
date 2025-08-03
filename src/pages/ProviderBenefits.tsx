import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, DollarSign, Users, Calendar, Star, TrendingUp, Shield, Smartphone, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProviderBenefits() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-4xl font-bold">Provider Benefits</h1>
            <p className="text-muted-foreground mt-2">Grow your business with ProConnect's powerful platform</p>
          </div>
        </div>

        {/* Hero Section */}
        <section className="mb-12">
          <Card className="bg-gradient-to-r from-primary to-primary-foreground text-white">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-4">Join 12,847+ Successful Providers</CardTitle>
              <CardDescription className="text-white/90 text-lg">
                Increase your income, expand your client base, and build your reputation with ProConnect
              </CardDescription>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">40%</div>
                  <div className="text-sm text-white/80">Average Income Increase</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm text-white/80">New Clients Monthly</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">4.8★</div>
                  <div className="text-sm text-white/80">Provider Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm text-white/80">Platform Support</div>
                </div>
              </div>
            </CardHeader>
          </Card>
        </section>

        {/* Core Benefits */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-primary">Core Benefits</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Increase Your Income</CardTitle>
                <CardDescription>
                  Access a steady stream of high-quality clients and premium service requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Higher booking rates than competitors</li>
                  <li>• Premium service category access</li>
                  <li>• Flexible pricing control</li>
                  <li>• Fast, secure payments</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Expand Your Client Base</CardTitle>
                <CardDescription>
                  Connect with thousands of customers actively seeking your services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Nationwide customer reach</li>
                  <li>• Targeted service matching</li>
                  <li>• Repeat client opportunities</li>
                  <li>• Referral system rewards</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Build Your Reputation</CardTitle>
                <CardDescription>
                  Showcase your work and build credibility through our review and portfolio system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Professional profile showcase</li>
                  <li>• Client review and rating system</li>
                  <li>• Portfolio and gallery features</li>
                  <li>• Verification badges</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Business Tools */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">Business Management Tools</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>Smart Scheduling System</CardTitle>
                <CardDescription>
                  Manage your appointments and availability with our intelligent booking system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Automated booking confirmations</li>
                  <li>• Calendar sync integration</li>
                  <li>• Appointment reminders</li>
                  <li>• Availability management</li>
                  <li>• Cancellation protection</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Analytics & Insights</CardTitle>
                <CardDescription>
                  Track your performance and grow your business with detailed analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Booking and revenue tracking</li>
                  <li>• Customer behavior insights</li>
                  <li>• Performance benchmarking</li>
                  <li>• Growth recommendations</li>
                  <li>• Financial reporting</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="h-6 w-6 text-teal-600" />
                </div>
                <CardTitle>Mobile-First Platform</CardTitle>
                <CardDescription>
                  Manage your business on-the-go with our mobile-optimized platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Responsive web design</li>
                  <li>• Real-time notifications</li>
                  <li>• Mobile payment processing</li>
                  <li>• GPS location services</li>
                  <li>• Offline capability</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle>Security & Protection</CardTitle>
                <CardDescription>
                  Enjoy peace of mind with our comprehensive security and insurance coverage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Payment protection guarantee</li>
                  <li>• Dispute resolution support</li>
                  <li>• Background check verification</li>
                  <li>• Insurance coverage options</li>
                  <li>• Legal support resources</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">Pricing Plans</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic</CardTitle>
                <div className="text-3xl font-bold">Free</div>
                <CardDescription>Perfect for getting started</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm mb-6">
                  <li>• Basic profile listing</li>
                  <li>• 5% transaction fee</li>
                  <li>• Standard customer support</li>
                  <li>• Basic analytics</li>
                </ul>
                <Button variant="outline" className="w-full" onClick={() => navigate('/become-provider')}>
                  Get Started
                </Button>
              </CardContent>
            </Card>

            <Card className="border-primary relative">
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary">Popular</Badge>
              <CardHeader>
                <CardTitle>Pro</CardTitle>
                <div className="text-3xl font-bold">$29<span className="text-base font-normal">/month</span></div>
                <CardDescription>Best for growing businesses</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm mb-6">
                  <li>• Enhanced profile features</li>
                  <li>• 3% transaction fee</li>
                  <li>• Priority customer support</li>
                  <li>• Advanced analytics</li>
                  <li>• Marketing tools</li>
                </ul>
                <Button className="w-full" onClick={() => navigate('/pro-subscription')}>
                  Start Pro Trial
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <div className="text-3xl font-bold">$99<span className="text-base font-normal">/month</span></div>
                <CardDescription>For established businesses</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm mb-6">
                  <li>• Premium profile placement</li>
                  <li>• 2% transaction fee</li>
                  <li>• Dedicated account manager</li>
                  <li>• Full analytics suite</li>
                  <li>• Custom integrations</li>
                </ul>
                <Button variant="outline" className="w-full" onClick={() => navigate('/pro-subscription')}>
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Success Stories */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">Success Stories</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold">SM</span>
                  </div>
                  <div>
                    <CardTitle>Sarah Martinez</CardTitle>
                    <CardDescription>Hair Stylist, Los Angeles</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm italic mb-4">
                  "ProConnect helped me double my client base in just 6 months. The platform's tools make it so easy to manage my business and connect with new clients."
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    +120% income increase
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    4.9 rating
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold">MJ</span>
                  </div>
                  <div>
                    <CardTitle>Mike Johnson</CardTitle>
                    <CardDescription>Contractor, Chicago</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm italic mb-4">
                  "The verification system gives clients confidence in my work, and the payment protection means I always get paid on time. Best decision for my business."
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-blue-500" />
                    200+ new clients
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-purple-500" />
                    90% repeat bookings
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section>
          <Card className="bg-gradient-to-r from-primary to-primary-foreground text-white">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Ready to Grow Your Business?</CardTitle>
              <CardDescription className="text-white/90">
                Join thousands of successful providers on ProConnect today
              </CardDescription>
              <div className="flex gap-4 justify-center pt-4">
                <Button variant="secondary" onClick={() => navigate('/become-provider')}>
                  Become a Provider
                </Button>
                <Button variant="outline" onClick={() => navigate('/pro-subscription')}>
                  View Pricing
                </Button>
              </div>
            </CardHeader>
          </Card>
        </section>
      </div>
    </div>
  );
}