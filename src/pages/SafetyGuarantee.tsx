import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield, CheckCircle, Lock, UserCheck, AlertTriangle, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SafetyGuarantee() {
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
            <h1 className="text-4xl font-bold">Safety & Guarantee</h1>
            <p className="text-muted-foreground mt-2">Your safety and satisfaction are our top priorities</p>
          </div>
        </div>

        {/* Safety Measures */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-primary">Safety Measures</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <UserCheck className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Provider Verification</CardTitle>
                <CardDescription>
                  All service providers undergo comprehensive background checks, license verification, and skill assessments before joining our platform.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Professional license verification
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Criminal background screening
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Identity verification
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Insurance coverage verification
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Secure Platform</CardTitle>
                <CardDescription>
                  Our platform uses bank-level security encryption and secure payment processing to protect your personal and financial information.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    256-bit SSL encryption
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    PCI DSS compliant payments
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Secure data storage
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Regular security audits
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Money-Back Guarantee */}
        <section className="mb-12">
          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <Shield className="h-6 w-6" />
                ProConnect Guarantee
              </CardTitle>
              <CardDescription className="text-green-600">
                We stand behind every service on our platform with our comprehensive guarantee
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-lg border border-green-200">
                  <div className="text-2xl font-bold text-green-600 mb-2">100%</div>
                  <div className="text-sm text-green-700">Satisfaction Guarantee</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-green-200">
                  <div className="text-2xl font-bold text-green-600 mb-2">24/7</div>
                  <div className="text-sm text-green-700">Customer Support</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-green-200">
                  <div className="text-2xl font-bold text-green-600 mb-2">48hr</div>
                  <div className="text-sm text-green-700">Response Time</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* What's Covered */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">What's Covered</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">✓ Covered Situations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <strong>Service Quality Issues:</strong> Work doesn't meet agreed standards or expectations
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <strong>No-Show Providers:</strong> Provider fails to show up for scheduled appointment
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <strong>Incomplete Work:</strong> Service is started but not completed as agreed
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <strong>Safety Violations:</strong> Provider doesn't follow safety protocols
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">✗ Not Covered</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <strong>Change of Mind:</strong> Customer decides they no longer want the service
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <strong>Natural Disasters:</strong> Services cancelled due to weather or natural events
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <strong>Unrealistic Expectations:</strong> Requests beyond what was originally agreed
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <strong>Third-Party Issues:</strong> Problems caused by factors outside provider's control
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Claim Process */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">How to File a Claim</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardHeader>
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mb-2">1</div>
                <CardTitle className="text-lg">Report Issue</CardTitle>
                <CardDescription>
                  Contact our support team within 48 hours of the service completion
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mb-2">2</div>
                <CardTitle className="text-lg">Provide Details</CardTitle>
                <CardDescription>
                  Submit photos, documentation, and detailed description of the issue
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mb-2">3</div>
                <CardTitle className="text-lg">Investigation</CardTitle>
                <CardDescription>
                  Our team reviews the claim and contacts both parties to gather information
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mb-2">4</div>
                <CardTitle className="text-lg">Resolution</CardTitle>
                <CardDescription>
                  We provide a resolution within 5 business days, including refunds when applicable
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Contact Support */}
        <section>
          <Card className="bg-gradient-to-r from-primary to-primary-foreground text-white">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Need Help or Have Concerns?</CardTitle>
              <CardDescription className="text-white/90">
                Our customer support team is available 24/7 to assist you
              </CardDescription>
              <div className="flex gap-4 justify-center pt-4">
                <Button variant="secondary" onClick={() => navigate('/support')}>
                  Contact Support
                </Button>
                <Button variant="outline" onClick={() => window.open('tel:+18007762666')}>
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
              </div>
            </CardHeader>
          </Card>
        </section>
      </div>
    </div>
  );
}