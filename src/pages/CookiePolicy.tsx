import { ArrowLeft, Cookie, Settings, Shield, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

export const CookiePolicy = () => {
  const navigate = useNavigate();

  const cookieTypes = [
    {
      type: "Essential Cookies",
      description: "Required for the website to function properly",
      examples: ["User authentication", "Shopping cart functionality", "Security features"],
      duration: "Session/Persistent",
      canOptOut: false
    },
    {
      type: "Performance Cookies",
      description: "Help us understand how visitors interact with our website",
      examples: ["Google Analytics", "Page load times", "Error tracking"],
      duration: "Up to 2 years",
      canOptOut: true
    },
    {
      type: "Functional Cookies",
      description: "Enable enhanced functionality and personalization",
      examples: ["Language preferences", "Location settings", "Customized content"],
      duration: "Up to 1 year",
      canOptOut: true
    },
    {
      type: "Marketing Cookies",
      description: "Used to deliver relevant advertisements",
      examples: ["Ad targeting", "Social media integration", "Campaign tracking"],
      duration: "Up to 2 years",
      canOptOut: true
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
            <Badge variant="outline" className="mb-4">
              <Cookie className="w-4 h-4 mr-1" />
              Cookie Policy
            </Badge>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Cookie Policy
            </h1>
            <p className="text-xl text-muted-foreground">
              How ProConnect uses cookies and similar technologies
            </p>
            <p className="text-sm text-muted-foreground mt-2">
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
                <Cookie className="w-5 h-5" />
                What Are Cookies?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Cookies are small text files that are placed on your device when you visit our website. 
                They help us provide you with a better experience by remembering your preferences and 
                understanding how you use our service.
              </p>
              <p>
                We use cookies and similar technologies (such as web beacons and pixels) to collect 
                information about your browsing activities and to provide personalized content and advertisements.
              </p>
            </CardContent>
          </Card>

          {/* Types of Cookies */}
          <Card>
            <CardHeader>
              <CardTitle>Types of Cookies We Use</CardTitle>
              <CardDescription>
                We use different types of cookies for various purposes on our platform.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {cookieTypes.map((cookie, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-lg">{cookie.type}</h4>
                      <Badge variant={cookie.canOptOut ? "secondary" : "destructive"}>
                        {cookie.canOptOut ? "Optional" : "Essential"}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground mb-3">{cookie.description}</p>
                    
                    <div className="space-y-2">
                      <div>
                        <span className="font-medium">Examples: </span>
                        {cookie.examples.join(", ")}
                      </div>
                      <div>
                        <span className="font-medium">Duration: </span>
                        {cookie.duration}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Third-Party Cookies */}
          <Card>
            <CardHeader>
              <CardTitle>Third-Party Cookies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                We work with trusted third-party partners who may also set cookies on our website. 
                These include:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Google Analytics</h4>
                  <p className="text-sm text-muted-foreground">
                    Helps us understand website usage and improve user experience.
                  </p>
                </div>
                
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Payment Processors</h4>
                  <p className="text-sm text-muted-foreground">
                    Stripe and other payment partners use cookies for secure transactions.
                  </p>
                </div>
                
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Social Media</h4>
                  <p className="text-sm text-muted-foreground">
                    Facebook, Instagram, and Twitter cookies for social sharing features.
                  </p>
                </div>
                
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Customer Support</h4>
                  <p className="text-sm text-muted-foreground">
                    Intercom and similar tools for providing customer support.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Managing Cookies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Managing Your Cookie Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h4 className="font-semibold">Cookie Consent Banner</h4>
              <p>
                When you first visit our website, you'll see a cookie consent banner where you can 
                choose which types of cookies to accept.
              </p>
              
              <h4 className="font-semibold">Browser Settings</h4>
              <p>
                You can also manage cookies through your browser settings:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Chrome:</strong> Settings &gt; Privacy and security &gt; Cookies and other site data</li>
                <li><strong>Firefox:</strong> Preferences &gt; Privacy &gt; Cookies and Site Data</li>
                <li><strong>Safari:</strong> Preferences &gt; Privacy &gt; Manage Website Data</li>
                <li><strong>Edge:</strong> Settings &gt; Cookies and site permissions &gt; Cookies and site data</li>
              </ul>
              
              <h4 className="font-semibold">Opt-Out Tools</h4>
              <p>
                You can opt out of interest-based advertising by visiting:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Network Advertising Initiative: <a href="http://www.networkadvertising.org/choices/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">www.networkadvertising.org/choices/</a></li>
                <li>Digital Advertising Alliance: <a href="http://www.aboutads.info/choices/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">www.aboutads.info/choices/</a></li>
              </ul>
            </CardContent>
          </Card>

          {/* Impact of Disabling Cookies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Impact of Disabling Cookies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                While you can disable cookies, please note that this may affect your experience on our website:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You may need to re-enter information more frequently</li>
                <li>Some features may not work as expected</li>
                <li>Personalized content and recommendations may not be available</li>
                <li>You may see less relevant advertisements</li>
              </ul>
              <p>
                Essential cookies cannot be disabled as they are necessary for the basic functionality 
                of our website, including security and authentication features.
              </p>
            </CardContent>
          </Card>

          {/* Updates to Policy */}
          <Card>
            <CardHeader>
              <CardTitle>Updates to This Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                We may update this Cookie Policy from time to time to reflect changes in our practices 
                or for other operational, legal, or regulatory reasons.
              </p>
              <p>
                We will notify you of any material changes by posting the updated policy on our website 
                and updating the "Last updated" date.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                If you have any questions about our use of cookies or this Cookie Policy, please contact us:
              </p>
              <div className="mt-4 space-y-2">
                <p><strong>Email:</strong> privacy@proconnect.com</p>
                <p><strong>Phone:</strong> 1-800-PRO-CONN (1-800-776-2666)</p>
                <p><strong>Address:</strong> ProConnect LLC, 123 Business Ave, Suite 100, City, State 12345</p>
              </div>
            </CardContent>
          </Card>

          {/* Cookie Preferences Button */}
          <div className="text-center pt-8">
            <Button size="lg" variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Manage Cookie Preferences
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              Click here to review and update your cookie preferences
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};