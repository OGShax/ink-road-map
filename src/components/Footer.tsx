import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Users, Award, BookOpen, CreditCard } from 'lucide-react';
import { Badge } from './ui/badge';

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">ProConnect</h3>
            <p className="text-muted-foreground text-sm">
              Connecting you with verified professionals in hair, tattoo, massage, nails, barbering, and construction services.
            </p>
            <div className="flex space-x-3">
              <Facebook className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          {/* For Customers */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">For Customers</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/browse-services" className="text-muted-foreground hover:text-primary transition-colors">Browse Services</a></li>
              <li><a href="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors">How It Works</a></li>
              <li><a href="/safety-guarantee" className="text-muted-foreground hover:text-primary transition-colors">Safety & Guarantee</a></li>
              <li><a href="/customer-support" className="text-muted-foreground hover:text-primary transition-colors">Customer Support</a></li>
              <li><a href="/study-center" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                Study Center
              </a></li>
            </ul>
          </div>

          {/* For Providers */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">For Providers</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/become-provider" className="text-muted-foreground hover:text-primary transition-colors">Become a Provider</a></li>
              <li><a href="/provider-benefits" className="text-muted-foreground hover:text-primary transition-colors">Provider Benefits</a></li>
              <li><a href="/verification-process" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                <Award className="w-4 h-4" />
                Get Verified
              </a></li>
              <li><a href="/pro-subscription" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                <CreditCard className="w-4 h-4" />
                Pro Subscription
              </a></li>
              <li><a href="/provider-resources" className="text-muted-foreground hover:text-primary transition-colors">Resources & Tools</a></li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Contact & Legal</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                support@proconnect.com
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                1-800-PROCONNECT
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                Available Nationwide
              </div>
            </div>
            <ul className="space-y-1 text-sm">
              <li><a href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="/terms-of-service" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="/cookie-policy" className="text-muted-foreground hover:text-primary transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Statistics */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-primary">50K+</div>
              <div className="text-sm text-muted-foreground">Verified Providers</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-primary">200K+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-primary">1M+</div>
              <div className="text-sm text-muted-foreground">Services Completed</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-primary">4.9★</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2024 ProConnect. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Badge variant="glow" className="text-xs">
              <Users className="w-3 h-3 mr-1" />
              Trusted Platform
            </Badge>
            <Badge variant="neon" className="text-xs">
              <Award className="w-3 h-3 mr-1" />
              Verified Providers
            </Badge>
          </div>
        </div>
      </div>
    </footer>
  );
};