import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Users, Award, BookOpen, CreditCard, MessageCircle, Shield, HelpCircle } from 'lucide-react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

export const Footer = () => {
  const navigate = useNavigate();

  const handleLinkClick = (path: string) => {
    navigate(path);
  };

  const handleSocialClick = (platform: string) => {
    const links = {
      facebook: 'https://facebook.com/proconnect',
      instagram: 'https://instagram.com/proconnect',
      twitter: 'https://twitter.com/proconnect'
    };
    window.open(links[platform as keyof typeof links], '_blank');
  };

  const handleContactClick = (type: string) => {
    if (type === 'email') {
      window.open('mailto:support@proconnect.com');
    } else if (type === 'phone') {
      window.open('tel:+18007762666');
    }
  };

  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">ProConnect</h3>
            <p className="text-muted-foreground text-sm">
              Connecting you with verified professionals in hair, tattoo, massage, nails, barbering, and construction services across the nation.
            </p>
            <div className="flex space-x-3">
              <Facebook 
                className="w-5 h-5 text-muted-foreground hover:text-blue-600 cursor-pointer transition-colors" 
                onClick={() => handleSocialClick('facebook')}
              />
              <Instagram 
                className="w-5 h-5 text-muted-foreground hover:text-pink-600 cursor-pointer transition-colors" 
                onClick={() => handleSocialClick('instagram')}
              />
              <Twitter 
                className="w-5 h-5 text-muted-foreground hover:text-blue-400 cursor-pointer transition-colors" 
                onClick={() => handleSocialClick('twitter')}
              />
            </div>
          </div>

          {/* For Customers */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">For Customers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => handleLinkClick('/')} 
                  className="text-muted-foreground hover:text-primary transition-colors text-left"
                >
                  Browse Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('/how-it-works')} 
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                  <HelpCircle className="w-4 h-4" />
                  How It Works
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('/safety-guarantee')} 
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                  <Shield className="w-4 h-4" />
                  Safety & Guarantee
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('/support')} 
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                  <MessageCircle className="w-4 h-4" />
                  Customer Support
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('/study-center')} 
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                  <BookOpen className="w-4 h-4" />
                  Study Center
                </button>
              </li>
            </ul>
          </div>

          {/* For Providers */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">For Providers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => handleLinkClick('/become-provider')} 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Become a Provider
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('/provider-benefits')} 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Provider Benefits
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('/get-verified')} 
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                  <Award className="w-4 h-4" />
                  Get Verified
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('/pro-subscription')} 
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                  <CreditCard className="w-4 h-4" />
                  Pro Subscription
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('/resources-tools')} 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Resources & Tools
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Contact & Legal</h3>
            <div className="space-y-2 text-sm">
              <button 
                onClick={() => handleContactClick('email')} 
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                support@proconnect.com
              </button>
              <button 
                onClick={() => handleContactClick('phone')} 
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                1-800-PRO-CONN
              </button>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                Available Nationwide
              </div>
            </div>
            <ul className="space-y-1 text-sm">
              <li>
                <button 
                  onClick={() => handleLinkClick('/privacy-policy')} 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('/terms-of-service')} 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('/cookie-policy')} 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Cookie Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Statistics */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-primary">12,847</div>
              <div className="text-sm text-muted-foreground">Verified Providers</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-primary">89,432</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-primary">156,789</div>
              <div className="text-sm text-muted-foreground">Services Completed</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-primary">4.8★</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2024 ProConnect LLC. All rights reserved. | Made with ❤️ for professionals
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Badge variant="glow" className="text-xs">
              <Users className="w-3 h-3 mr-1" />
              Trusted Platform
            </Badge>
            <Badge variant="neon" className="text-xs">
              <Award className="w-3 h-3 mr-1" />
              BBB Accredited
            </Badge>
          </div>
        </div>
      </div>
    </footer>
  );
};