import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Shield, CheckCircle, Award, FileText, Camera, Clock, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function GetVerified() {
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
            <h1 className="text-4xl font-bold">Get Verified</h1>
            <p className="text-muted-foreground mt-2">Build trust with customers through our comprehensive verification process</p>
          </div>
        </div>

        {/* Why Get Verified */}
        <section className="mb-12">
          <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Shield className="h-6 w-6 text-primary" />
                Why Get Verified?
              </CardTitle>
              <CardDescription className="text-lg">
                Verified providers earn more trust, get more bookings, and command higher prices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white rounded-lg border">
                  <div className="text-2xl font-bold text-primary mb-2">3x</div>
                  <div className="text-sm">More Bookings</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border">
                  <div className="text-2xl font-bold text-primary mb-2">40%</div>
                  <div className="text-sm">Higher Rates</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border">
                  <div className="text-2xl font-bold text-primary mb-2">95%</div>
                  <div className="text-sm">Customer Trust</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border">
                  <div className="text-2xl font-bold text-primary mb-2">4.8★</div>
                  <div className="text-sm">Avg Rating</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Verification Levels */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-primary">Verification Levels</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary">Basic</Badge>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <CardTitle>Identity Verified</CardTitle>
                <CardDescription>
                  Confirm your identity with government-issued ID
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm mb-4">
                  <li>• Government ID verification</li>
                  <li>• Address confirmation</li>
                  <li>• Phone number verification</li>
                  <li>• Email verification</li>
                </ul>
                <div className="text-sm text-muted-foreground">
                  Processing time: 24 hours
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary">
              <CardHeader>
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="bg-primary">Professional</Badge>
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>Professional Verified</CardTitle>
                <CardDescription>
                  Verify your professional credentials and licenses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm mb-4">
                  <li>• License verification</li>
                  <li>• Certification checks</li>
                  <li>• Professional references</li>
                  <li>• Background screening</li>
                  <li>• Insurance verification</li>
                </ul>
                <div className="text-sm text-muted-foreground">
                  Processing time: 3-5 business days
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline" className="border-yellow-500 text-yellow-600">Premium</Badge>
                  <Star className="h-5 w-5 text-yellow-500" />
                </div>
                <CardTitle>Elite Verified</CardTitle>
                <CardDescription>
                  Highest level of verification with skill assessment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm mb-4">
                  <li>• Skill assessment test</li>
                  <li>• Portfolio review</li>
                  <li>• Video interview</li>
                  <li>• Client reference calls</li>
                  <li>• Ongoing performance monitoring</li>
                </ul>
                <div className="text-sm text-muted-foreground">
                  Processing time: 7-10 business days
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Verification Process */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">Verification Process</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mb-2">1</div>
                <CardTitle className="text-lg">Submit Documents</CardTitle>
                <CardDescription>
                  Upload required documents and credentials
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Camera className="h-6 w-6 text-primary" />
                </div>
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mb-2">2</div>
                <CardTitle className="text-lg">Identity Verification</CardTitle>
                <CardDescription>
                  Complete live photo verification and ID check
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mb-2">3</div>
                <CardTitle className="text-lg">Background Check</CardTitle>
                <CardDescription>
                  Professional background and reference verification
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mb-2">4</div>
                <CardTitle className="text-lg">Get Verified</CardTitle>
                <CardDescription>
                  Receive your verification badge and start earning more
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Required Documents */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">Required Documents</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Identity Documents</CardTitle>
                <CardDescription>For all verification levels</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Government-issued photo ID (Driver's License, Passport)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Proof of address (Utility bill, Bank statement)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Social Security Number (US) or Tax ID
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Professional Documents</CardTitle>
                <CardDescription>For Professional & Elite verification</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Professional license or certification
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Business license (if applicable)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Insurance certificate
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Professional references (3 minimum)
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Pricing */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">Verification Pricing</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Verification</CardTitle>
                <div className="text-3xl font-bold text-green-600">Free</div>
                <CardDescription>Identity verification only</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => navigate('/become-provider')}>
                  Start Basic Verification
                </Button>
              </CardContent>
            </Card>

            <Card className="border-primary">
              <CardHeader>
                <CardTitle>Professional Verification</CardTitle>
                <div className="text-3xl font-bold">$49</div>
                <CardDescription>One-time fee, lifetime verification</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => navigate('/become-provider')}>
                  Get Professional Verified
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Elite Verification</CardTitle>
                <div className="text-3xl font-bold">$99</div>
                <CardDescription>Premium verification with skill assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" onClick={() => navigate('/become-provider')}>
                  Apply for Elite Status
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How long does verification take?</CardTitle>
                <CardDescription>
                  Basic verification typically takes 24 hours, Professional verification takes 3-5 business days, and Elite verification takes 7-10 business days.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What if my verification is rejected?</CardTitle>
                <CardDescription>
                  If your verification is rejected, we'll provide specific feedback on what needs to be corrected. You can resubmit your application with the required changes at no additional cost.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is verification mandatory?</CardTitle>
                <CardDescription>
                  Basic identity verification is required for all providers. Professional and Elite verification are optional but highly recommended for increased bookings and customer trust.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I work while my verification is pending?</CardTitle>
                <CardDescription>
                  Yes, you can start taking bookings with basic identity verification. Professional and Elite verifications will be added to your profile once approved.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section>
          <Card className="bg-gradient-to-r from-primary to-primary-foreground text-white">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Ready to Get Verified?</CardTitle>
              <CardDescription className="text-white/90">
                Join thousands of verified professionals and start earning more today
              </CardDescription>
              <div className="flex gap-4 justify-center pt-4">
                <Button variant="secondary" onClick={() => navigate('/become-provider')}>
                  Start Verification
                </Button>
                <Button variant="outline" onClick={() => navigate('/support')}>
                  Contact Support
                </Button>
              </div>
            </CardHeader>
          </Card>
        </section>
      </div>
    </div>
  );
}