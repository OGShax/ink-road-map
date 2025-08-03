import { ArrowLeft, Scale, FileText, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

export const TermsOfService = () => {
  const navigate = useNavigate();

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
            <Badge variant="outline" className="mb-4">
              Legal Document
            </Badge>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-muted-foreground">
              Last updated: January 1, 2024
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-8">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="w-5 h-5" />
                Agreement to Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                Welcome to ProConnect ("we," "our," or "us"). These Terms of Service ("Terms") 
                govern your use of our website and mobile application (collectively, the "Service") 
                operated by ProConnect LLC.
              </p>
              <p>
                By accessing or using our Service, you agree to be bound by these Terms. 
                If you disagree with any part of these terms, then you may not access the Service.
              </p>
            </CardContent>
          </Card>

          {/* Service Description */}
          <Card>
            <CardHeader>
              <CardTitle>Service Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                ProConnect is a platform that connects customers with verified professional service 
                providers in various industries including hair services, tattoo artistry, massage therapy, 
                nail services, barbering, and construction services.
              </p>
              <p>
                We provide a marketplace where:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Customers can search for and book services from verified professionals</li>
                <li>Service providers can create profiles, showcase their work, and connect with customers</li>
                <li>Secure payment processing and communication tools are provided</li>
                <li>Quality assurance through verification and review systems</li>
              </ul>
            </CardContent>
          </Card>

          {/* User Accounts */}
          <Card>
            <CardHeader>
              <CardTitle>User Accounts and Registration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h4 className="font-semibold">Account Creation</h4>
              <p>
                To use certain features of the Service, you must register for an account. 
                You agree to provide accurate, current, and complete information during registration.
              </p>
              
              <h4 className="font-semibold">Account Security</h4>
              <p>
                You are responsible for safeguarding your account credentials and for all activities 
                that occur under your account. You must notify us immediately of any unauthorized use.
              </p>
              
              <h4 className="font-semibold">Provider Verification</h4>
              <p>
                Service providers must complete our verification process, including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Valid professional licenses and certifications</li>
                <li>Background checks and insurance verification</li>
                <li>Portfolio and experience documentation</li>
                <li>Ongoing compliance with professional standards</li>
              </ul>
            </CardContent>
          </Card>

          {/* Payment Terms */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h4 className="font-semibold">Customer Payments</h4>
              <p>
                Customers agree to pay for all services booked through the platform. 
                Payment is processed securely through our payment partners.
              </p>
              
              <h4 className="font-semibold">Provider Commissions</h4>
              <p>
                Service providers agree to pay platform fees as outlined in their subscription plan:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Basic Plan: 15% platform fee (85% to provider)</li>
                <li>Pro Plan: 10% platform fee (90% to provider)</li>
                <li>Elite Plan: 5% platform fee (95% to provider)</li>
              </ul>
              
              <h4 className="font-semibold">Refunds and Cancellations</h4>
              <p>
                Refund policies are governed by our separate Refund Policy. 
                Cancellation terms may vary by service provider and are clearly stated at booking.
              </p>
            </CardContent>
          </Card>

          {/* Prohibited Uses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Prohibited Uses
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>You may not use the Service:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>For any unlawful purpose or to solicit others to perform illegal acts</li>
                <li>To violate any international, federal, provincial, or state regulations or laws</li>
                <li>To transmit or procure the sending of advertising or promotional material without our consent</li>
                <li>To impersonate or attempt to impersonate the company, employees, or other users</li>
                <li>To upload or transmit viruses or any other type of malicious code</li>
                <li>To circumvent or disable any security features of the Service</li>
                <li>To engage in any form of harassment, abuse, or discrimination</li>
              </ul>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card>
            <CardHeader>
              <CardTitle>Intellectual Property Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h4 className="font-semibold">Platform Content</h4>
              <p>
                The Service and its original content, features, and functionality are and will remain 
                the exclusive property of ProConnect LLC and its licensors.
              </p>
              
              <h4 className="font-semibold">User Content</h4>
              <p>
                You retain ownership of content you upload. By posting content, you grant us a 
                non-exclusive, worldwide, royalty-free license to use, display, and distribute 
                your content on the platform.
              </p>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card>
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                ProConnect acts as a platform connecting customers with independent service providers. 
                We are not responsible for the quality, safety, or legality of services provided by 
                third-party professionals.
              </p>
              <p>
                In no event shall ProConnect LLC be liable for any indirect, incidental, special, 
                consequential, or punitive damages arising out of or relating to your use of the Service.
              </p>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card>
            <CardHeader>
              <CardTitle>Termination</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                We may terminate or suspend your account immediately, without prior notice, 
                for conduct that we believe violates these Terms or is harmful to other users, 
                us, or third parties.
              </p>
              <p>
                You may terminate your account at any time by contacting our support team.
              </p>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card>
            <CardHeader>
              <CardTitle>Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                We reserve the right to modify these Terms at any time. We will notify users 
                of significant changes via email or through the platform.
              </p>
              <p>
                Your continued use of the Service after changes constitutes acceptance of the new Terms.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="mt-4 space-y-2">
                <p><strong>Email:</strong> legal@proconnect.com</p>
                <p><strong>Phone:</strong> 1-800-PRO-CONN (1-800-776-2666)</p>
                <p><strong>Address:</strong> ProConnect LLC, 123 Business Ave, Suite 100, City, State 12345</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};