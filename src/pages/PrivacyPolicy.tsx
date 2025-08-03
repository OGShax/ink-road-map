import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield, Eye, Lock, UserCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PrivacyPolicy() {
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
            <h1 className="text-4xl font-bold">Privacy Policy</h1>
            <p className="text-muted-foreground mt-2">Last updated: January 1, 2024</p>
          </div>
        </div>

        {/* Introduction */}
        <section className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                Your Privacy Matters
              </CardTitle>
              <CardDescription>
                At ProConnect, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our platform.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>

        {/* Information We Collect */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <UserCheck className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Name and contact information (email, phone, address)</li>
                  <li>• Account credentials and profile information</li>
                  <li>• Payment and billing information</li>
                  <li>• Identity verification documents</li>
                  <li>• Professional licenses and certifications</li>
                  <li>• Photos and portfolio content</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Usage Information</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Platform usage and activity data</li>
                  <li>• Device information and IP addresses</li>
                  <li>• Location data (when permitted)</li>
                  <li>• Communication and messaging history</li>
                  <li>• Search queries and preferences</li>
                  <li>• Performance and analytics data</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How We Use Your Information */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Service Provision</CardTitle>
                <CardDescription>
                  We use your information to provide, maintain, and improve our platform services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  <li>• Creating and managing your account</li>
                  <li>• Matching customers with service providers</li>
                  <li>• Processing payments and transactions</li>
                  <li>• Facilitating communication between users</li>
                  <li>• Providing customer support</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Safety and Security</CardTitle>
                <CardDescription>
                  We use your information to maintain platform safety and prevent fraud
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  <li>• Verifying identity and professional credentials</li>
                  <li>• Conducting background checks</li>
                  <li>• Detecting and preventing fraudulent activity</li>
                  <li>• Enforcing terms of service and community guidelines</li>
                  <li>• Investigating disputes and complaints</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Communication and Marketing</CardTitle>
                <CardDescription>
                  We may use your information to communicate with you about our services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  <li>• Sending service-related notifications</li>
                  <li>• Providing updates about your bookings</li>
                  <li>• Sharing promotional offers (with consent)</li>
                  <li>• Conducting surveys and feedback requests</li>
                  <li>• Sending important policy or service changes</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Information Sharing */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Information Sharing and Disclosure</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">With Other Users</h4>
                  <p className="text-sm text-muted-foreground">
                    We share necessary information between customers and service providers to facilitate bookings, including contact information, location, and service details.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">With Service Providers</h4>
                  <p className="text-sm text-muted-foreground">
                    We work with trusted third-party service providers for payment processing, background checks, verification services, and platform analytics.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Legal Requirements</h4>
                  <p className="text-sm text-muted-foreground">
                    We may disclose information when required by law, legal process, or to protect the rights, property, or safety of ProConnect, our users, or others.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Business Transfers</h4>
                  <p className="text-sm text-muted-foreground">
                    In the event of a merger, acquisition, or sale of assets, user information may be transferred as part of the business transaction.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Data Security */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle>Security Measures</CardTitle>
              <CardDescription>
                We implement industry-standard security measures to protect your personal information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Technical Safeguards</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• 256-bit SSL encryption</li>
                    <li>• Secure data storage and transmission</li>
                    <li>• Regular security audits and testing</li>
                    <li>• Access controls and authentication</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Operational Safeguards</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Employee training and background checks</li>
                    <li>• Limited access to personal information</li>
                    <li>• Regular monitoring and incident response</li>
                    <li>• Secure disposal of personal information</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Your Rights */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Privacy Rights</h2>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Access and Control</CardTitle>
                <CardDescription>You have the right to access, update, and control your personal information</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                  <li>• <strong>Correction:</strong> Update or correct inaccurate personal information</li>
                  <li>• <strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
                  <li>• <strong>Portability:</strong> Request your personal information in a portable format</li>
                  <li>• <strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>California Privacy Rights (CCPA)</CardTitle>
                <CardDescription>Additional rights for California residents under the California Consumer Privacy Act</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Right to know what personal information is collected</li>
                  <li>• Right to know if personal information is sold or disclosed</li>
                  <li>• Right to opt-out of the sale of personal information</li>
                  <li>• Right to equal service and price (non-discrimination)</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Data Retention */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm mb-4">
                We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements.
              </p>
              <div className="space-y-2 text-sm">
                <div><strong>Account Information:</strong> Retained while your account is active</div>
                <div><strong>Transaction Records:</strong> Retained for 7 years for tax and legal compliance</div>
                <div><strong>Communication Logs:</strong> Retained for 2 years for customer service purposes</div>
                <div><strong>Marketing Data:</strong> Retained until you opt-out or request deletion</div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Children's Privacy */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm">
                ProConnect is not intended for use by children under the age of 18. We do not knowingly collect personal information from children under 18. If we become aware that we have collected personal information from a child under 18, we will take steps to delete such information.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Updates to Policy */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Updates to This Policy</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm mb-4">
                We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by:
              </p>
              <ul className="space-y-1 text-sm ml-4">
                <li>• Posting the updated policy on our website</li>
                <li>• Sending an email notification to registered users</li>
                <li>• Displaying a prominent notice on our platform</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Contact Information */}
        <section className="mb-8">
          <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
              <CardDescription>
                If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div><strong>Email:</strong> privacy@proconnect.com</div>
                <div><strong>Phone:</strong> 1-800-PRO-CONN (1-800-776-2666)</div>
                <div><strong>Mail:</strong> ProConnect LLC, Privacy Department, 123 Business Ave, Suite 100, Business City, BC 12345</div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button onClick={() => navigate('/support')}>
                  Contact Support
                </Button>
                <Button variant="outline" onClick={() => window.open('mailto:privacy@proconnect.com')}>
                  Email Privacy Team
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}