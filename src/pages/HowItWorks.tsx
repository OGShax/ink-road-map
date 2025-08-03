import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Search, MessageSquare, Calendar, Star, Shield, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HowItWorks() {
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
            <h1 className="text-4xl font-bold">How ProConnect Works</h1>
            <p className="text-muted-foreground mt-2">Your simple guide to finding and booking professional services</p>
          </div>
        </div>

        {/* For Customers */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-primary">For Customers</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>1. Search & Browse</CardTitle>
                <CardDescription>
                  Find professionals in your area by service type, location, or specific needs. Filter by ratings, price, and availability.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>2. Connect & Compare</CardTitle>
                <CardDescription>
                  View detailed profiles, portfolios, and reviews. Message providers directly to discuss your project and get quotes.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>3. Book & Pay</CardTitle>
                <CardDescription>
                  Schedule your appointment and pay securely through our platform. Your payment is protected until the work is completed.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Customer Protection
              </CardTitle>
              <CardDescription>
                All payments are held securely until you're satisfied with the work. Our dispute resolution team ensures fair outcomes for any issues.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>

        {/* For Providers */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-primary">For Service Providers</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>1. Create Your Profile</CardTitle>
                <CardDescription>
                  Build a comprehensive profile showcasing your skills, experience, and portfolio. Get verified to build trust with customers.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>2. Connect with Clients</CardTitle>
                <CardDescription>
                  Receive job requests from customers in your area. Communicate directly through our platform to discuss project details.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>3. Complete & Get Paid</CardTitle>
                <CardDescription>
                  Deliver quality work and get paid promptly. Build your reputation through customer reviews and grow your business.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Process Details */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">Detailed Process</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Service Categories</CardTitle>
                <CardDescription>
                  ProConnect specializes in personal care and construction services including hair styling, barbering, nail care, massage therapy, tattoo artistry, and home improvement projects.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Verification Process</CardTitle>
                <CardDescription>
                  All providers undergo a comprehensive verification process including license verification, background checks, and skill assessments to ensure quality and safety.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Secure Payments</CardTitle>
                <CardDescription>
                  We use industry-standard encryption and secure payment processing. Funds are held in escrow until work is completed to your satisfaction.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quality Guarantee</CardTitle>
                <CardDescription>
                  If you're not satisfied with the service, our customer support team will work to resolve the issue or provide appropriate compensation.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <Card className="bg-gradient-to-r from-primary to-primary-foreground text-white">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Get Started?</CardTitle>
              <CardDescription className="text-white/90">
                Join thousands of satisfied customers and providers on ProConnect
              </CardDescription>
              <div className="flex gap-4 justify-center pt-4">
                <Button variant="secondary" onClick={() => navigate('/')}>
                  Find Services
                </Button>
                <Button variant="outline" onClick={() => navigate('/become-provider')}>
                  Become a Provider
                </Button>
              </div>
            </CardHeader>
          </Card>
        </section>
      </div>
    </div>
  );
}