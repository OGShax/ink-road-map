import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Video, Users, Calculator, FileText, Smartphone, TrendingUp, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ResourcesTools() {
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
            <h1 className="text-4xl font-bold">Resources & Tools</h1>
            <p className="text-muted-foreground mt-2">Everything you need to succeed as a ProConnect provider</p>
          </div>
        </div>

        {/* Featured Resources */}
        <section className="mb-12">
          <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">Provider Success Hub</CardTitle>
              <CardDescription className="text-lg">
                Access comprehensive tools, training, and resources designed to help you grow your business
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white rounded-lg border">
                  <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="font-semibold">Training Guides</div>
                  <div className="text-sm text-muted-foreground">50+ resources</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border">
                  <Video className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="font-semibold">Video Tutorials</div>
                  <div className="text-sm text-muted-foreground">100+ hours</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border">
                  <Calculator className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="font-semibold">Business Tools</div>
                  <div className="text-sm text-muted-foreground">15+ calculators</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border">
                  <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="font-semibold">Community</div>
                  <div className="text-sm text-muted-foreground">12k+ members</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Business Tools */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-primary">Business Tools</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Calculator className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Pricing Calculator</CardTitle>
                <CardDescription>
                  Calculate optimal pricing for your services based on market data and costs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm mb-4">
                  <li>• Cost analysis tools</li>
                  <li>• Market rate comparisons</li>
                  <li>• Profit margin calculator</li>
                  <li>• Service package builder</li>
                </ul>
                <Button variant="outline" className="w-full">
                  <Calculator className="h-4 w-4 mr-2" />
                  Use Calculator
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Contract Templates</CardTitle>
                <CardDescription>
                  Professional contract templates customized for different service types
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm mb-4">
                  <li>• Service agreements</li>
                  <li>• Terms and conditions</li>
                  <li>• Liability waivers</li>
                  <li>• Cancellation policies</li>
                </ul>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Templates
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Business Analytics</CardTitle>
                <CardDescription>
                  Track your performance and identify growth opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm mb-4">
                  <li>• Revenue tracking</li>
                  <li>• Customer insights</li>
                  <li>• Booking patterns</li>
                  <li>• Growth metrics</li>
                </ul>
                <Button variant="outline" className="w-full">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Learning Resources */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">Learning Resources</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>ProConnect Academy</CardTitle>
                <CardDescription>
                  Comprehensive training courses to master the platform and grow your business
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Getting Started Guide</span>
                      <Badge variant="secondary">Free</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Complete setup and optimization guide</p>
                  </div>
                  <div className="border rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Customer Service Excellence</span>
                      <Badge variant="secondary">Free</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Build lasting customer relationships</p>
                  </div>
                  <div className="border rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Marketing Your Services</span>
                      <Badge>Pro</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Advanced marketing strategies</p>
                  </div>
                </div>
                <Button className="w-full mt-4" onClick={() => navigate('/study-center')}>
                  Access Academy
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Video className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Video Library</CardTitle>
                <CardDescription>
                  Step-by-step video tutorials covering all aspects of the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Profile Optimization</span>
                      <span className="text-sm text-muted-foreground">12 min</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Create a compelling profile that converts</p>
                  </div>
                  <div className="border rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Managing Bookings</span>
                      <span className="text-sm text-muted-foreground">8 min</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Efficiently handle appointments and scheduling</p>
                  </div>
                  <div className="border rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Handling Difficult Customers</span>
                      <span className="text-sm text-muted-foreground">15 min</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Professional conflict resolution techniques</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <Video className="h-4 w-4 mr-2" />
                  Watch Videos
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Mobile App */}
        <section className="mb-12">
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Smartphone className="h-6 w-6" />
                ProConnect Mobile App
              </CardTitle>
              <CardDescription className="text-blue-600">
                Manage your business on-the-go with our powerful mobile application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Key Features:</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Real-time booking notifications</li>
                    <li>• GPS navigation to appointments</li>
                    <li>• Mobile payment processing</li>
                    <li>• Customer communication tools</li>
                    <li>• Schedule management</li>
                    <li>• Earnings tracking</li>
                  </ul>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="space-y-3">
                    <Button className="w-full bg-black hover:bg-gray-800">
                      <Download className="h-4 w-4 mr-2" />
                      Download for iOS
                    </Button>
                    <Button variant="outline" className="w-full border-blue-300">
                      <Download className="h-4 w-4 mr-2" />
                      Download for Android
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Community Resources */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">Community & Support</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle>Provider Community</CardTitle>
                <CardDescription>
                  Connect with other providers, share experiences, and learn from experts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm mb-4">
                  <li>• Discussion forums</li>
                  <li>• Networking events</li>
                  <li>• Mentorship programs</li>
                  <li>• Success stories</li>
                </ul>
                <Button variant="outline" className="w-full">
                  Join Community
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Video className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Live Webinars</CardTitle>
                <CardDescription>
                  Weekly live sessions covering business tips, platform updates, and Q&A
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm mb-4">
                  <div className="font-medium">Upcoming:</div>
                  <div>• "Pricing Strategies" - Wed 2 PM EST</div>
                  <div>• "Customer Retention" - Fri 1 PM EST</div>
                  <div>• "Tax Tips for Providers" - Mon 3 PM EST</div>
                </div>
                <Button variant="outline" className="w-full">
                  Register for Webinar
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-yellow-600" />
                </div>
                <CardTitle>Knowledge Base</CardTitle>
                <CardDescription>
                  Comprehensive documentation, FAQs, and troubleshooting guides
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm mb-4">
                  <li>• Platform tutorials</li>
                  <li>• Billing and payments</li>
                  <li>• Account management</li>
                  <li>• Technical support</li>
                </ul>
                <Button variant="outline" className="w-full">
                  Browse Articles
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Quick Links */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">Quick Links</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-16 flex flex-col gap-1">
              <FileText className="h-5 w-5" />
              <span className="text-sm">Tax Forms</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col gap-1">
              <Calculator className="h-5 w-5" />
              <span className="text-sm">Expense Tracker</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col gap-1">
              <Users className="h-5 w-5" />
              <span className="text-sm">Referral Program</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col gap-1">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm">Market Insights</span>
            </Button>
          </div>
        </section>

        {/* Call to Action */}
        <section>
          <Card className="bg-gradient-to-r from-primary to-primary-foreground text-white">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Need Additional Support?</CardTitle>
              <CardDescription className="text-white/90">
                Our provider success team is here to help you maximize your potential
              </CardDescription>
              <div className="flex gap-4 justify-center pt-4">
                <Button variant="secondary" onClick={() => navigate('/support')}>
                  Contact Support
                </Button>
                <Button variant="outline" onClick={() => navigate('/study-center')}>
                  Visit Study Center
                </Button>
              </div>
            </CardHeader>
          </Card>
        </section>
      </div>
    </div>
  );
}