import { Link } from "wouter";
import { 
  Home, 
  Users, 
  Briefcase, 
  MessageCircle, 
  Globe, 
  Shield, 
  Mail, 
  MapPin,
  ChevronDown,
  ChevronUp,
  Scale,
  Handshake
} from "lucide-react";
import { useState } from "react";
import { SiFacebook, SiX, SiLinkedin, SiTiktok, SiYoutube } from "react-icons/si";
import { RiWhatsappFill } from "react-icons/ri";

export default function Footer() {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <footer className="border-t border-white/20 py-16 mt-16 bg-gradient-to-b from-transparent to-black/20">
      <div className="container mx-auto px-4">
        {/* ARVIPOA Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">ARVIPOA</h3>
            <p className="text-gray-400 text-sm">Property Protection</p>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          {/* HOME */}
          <div>
            <div 
              className="flex items-center justify-between cursor-pointer mb-4"
              onClick={() => toggleSection('home')}
            >
              <h4 className="text-white font-semibold flex items-center gap-2">
                <Home className="w-4 h-4 text-blue-400" />
                HOME
              </h4>
              {openSections.home ? 
                <ChevronUp className="w-4 h-4 text-gray-400" /> : 
                <ChevronDown className="w-4 h-4 text-gray-400" />
              }
            </div>
            <div className={`space-y-3 transition-all duration-300 ${openSections.home ? 'block' : 'hidden'}`}>
              <Link to="/" className="block text-gray-300 hover:text-blue-400 transition-colors">Homepage</Link>
              <Link to="/about" className="block text-gray-300 hover:text-blue-400 transition-colors">About Us</Link>
            </div>
          </div>

          {/* SERVICES */}
          <div>
            <div 
              className="flex items-center justify-between cursor-pointer mb-4"
              onClick={() => toggleSection('services')}
            >
              <h4 className="text-white font-semibold flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-green-400" />
                SERVICES
              </h4>
              {openSections.services ? 
                <ChevronUp className="w-4 h-4 text-gray-400" /> : 
                <ChevronDown className="w-4 h-4 text-gray-400" />
              }
            </div>
            <div className={`space-y-3 transition-all duration-300 ${openSections.services ? 'block' : 'hidden'}`}>
              <Link to="/services" className="block text-gray-300 hover:text-green-400 transition-colors">All Services</Link>
              <Link to="/property-registration" className="block text-gray-300 hover:text-green-400 transition-colors">Property Registration</Link>
              <Link to="/river-defense-barricade" className="block text-gray-300 hover:text-green-400 transition-colors">River Defense Barricade</Link>
              <Link to="/smart-pillar" className="block text-gray-300 hover:text-green-400 transition-colors">Smart Pillar System</Link>
              <Link to="/health-intelligence" className="block text-gray-300 hover:text-green-400 transition-colors">Health Intelligence</Link>
              <Link to="/pmb-email-center" className="block text-gray-300 hover:text-green-400 transition-colors">Private Mailbox</Link>
              <Link to="/live-map" className="block text-gray-300 hover:text-green-400 transition-colors">Live Monitoring</Link>
            </div>
          </div>

          {/* LEGAL */}
          <div>
            <div 
              className="flex items-center justify-between cursor-pointer mb-4"
              onClick={() => toggleSection('legal')}
            >
              <h4 className="text-white font-semibold flex items-center gap-2">
                <Scale className="w-4 h-4 text-yellow-400" />
                LEGAL
              </h4>
              {openSections.legal ? 
                <ChevronUp className="w-4 h-4 text-gray-400" /> : 
                <ChevronDown className="w-4 h-4 text-gray-400" />
              }
            </div>
            <div className={`space-y-3 transition-all duration-300 ${openSections.legal ? 'block' : 'hidden'}`}>
              <Link to="/privacy-policy" className="block text-gray-300 hover:text-yellow-400 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="block text-gray-300 hover:text-yellow-400 transition-colors">Terms of Use</Link>
              <Link to="/property-owners-terms" className="block text-gray-300 hover:text-yellow-400 transition-colors">Property Owners Terms</Link>
              <Link to="/buyers-tenants-terms" className="block text-gray-300 hover:text-yellow-400 transition-colors">Buyers & Tenants Terms</Link>
              <Link to="/cookie-policy" className="block text-gray-300 hover:text-yellow-400 transition-colors">Cookie Policy</Link>
              <Link to="/eula" className="block text-gray-300 hover:text-yellow-400 transition-colors">EULA</Link>
              <Link to="/legal-hub" className="block text-gray-300 hover:text-yellow-400 transition-colors">Legal Hub</Link>
              <Link to="/property-law" className="block text-gray-300 hover:text-yellow-400 transition-colors">Property Law</Link>
            </div>
          </div>

          {/* PARTNERSHIPS */}
          <div>
            <div 
              className="flex items-center justify-between cursor-pointer mb-4"
              onClick={() => toggleSection('partnerships')}
            >
              <h4 className="text-white font-semibold flex items-center gap-2">
                <Handshake className="w-4 h-4 text-purple-400" />
                PARTNERSHIPS
              </h4>
              {openSections.partnerships ? 
                <ChevronUp className="w-4 h-4 text-gray-400" /> : 
                <ChevronDown className="w-4 h-4 text-gray-400" />
              }
            </div>
            <div className={`space-y-3 transition-all duration-300 ${openSections.partnerships ? 'block' : 'hidden'}`}>
              <Link to="/members" className="block text-gray-300 hover:text-purple-400 transition-colors">Members</Link>
              <Link to="/partners" className="block text-gray-300 hover:text-purple-400 transition-colors">Partners</Link>
              <Link to="/clients" className="block text-gray-300 hover:text-purple-400 transition-colors">Clients</Link>
              <Link to="/affiliates" className="block text-gray-300 hover:text-purple-400 transition-colors">Affiliates</Link>
              <div className="pt-2 border-t border-white/10 mt-4">
                <p className="text-gray-400 text-sm mb-2">Business Relations:</p>
                <Link to="/become-partner" className="block text-gray-300 hover:text-purple-400 transition-colors text-sm">Become a Partner</Link>
                <Link to="/join-program" className="block text-gray-300 hover:text-purple-400 transition-colors text-sm">Join Our Program</Link>
                <Link to="/business-inquiries" className="block text-gray-300 hover:text-purple-400 transition-colors text-sm">Business Inquiries</Link>
              </div>
            </div>
          </div>

          {/* PLATFORM */}
          <div>
            <div 
              className="flex items-center justify-between cursor-pointer mb-4"
              onClick={() => toggleSection('platform')}
            >
              <h4 className="text-white font-semibold flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-400" />
                PLATFORM
              </h4>
              {openSections.platform ? 
                <ChevronUp className="w-4 h-4 text-gray-400" /> : 
                <ChevronDown className="w-4 h-4 text-gray-400" />
              }
            </div>
            <div className={`space-y-3 transition-all duration-300 ${openSections.platform ? 'block' : 'hidden'}`}>
              <Link to="/property-advertisements" className="block text-gray-300 hover:text-blue-400 transition-colors">Property Listings</Link>
              <Link to="/news-portal" className="block text-gray-300 hover:text-blue-400 transition-colors">News Portal</Link>
              <Link to="/community-social" className="block text-gray-300 hover:text-blue-400 transition-colors">Community Hub</Link>
              <Link to="/arvicine" className="block text-gray-300 hover:text-blue-400 transition-colors">ARVICINE Videos</Link>
              <Link to="/command-center" className="block text-gray-300 hover:text-blue-400 transition-colors">Smart Pillar</Link>
              <Link to="/blog" className="block text-gray-300 hover:text-blue-400 transition-colors">Innovation Blog</Link>
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <div 
              className="flex items-center justify-between cursor-pointer mb-4"
              onClick={() => toggleSection('contact')}
            >
              <h4 className="text-white font-semibold flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-purple-400" />
                CONTACT
              </h4>
              {openSections.contact ? 
                <ChevronUp className="w-4 h-4 text-gray-400" /> : 
                <ChevronDown className="w-4 h-4 text-gray-400" />
              }
            </div>
            <div className={`space-y-3 transition-all duration-300 ${openSections.contact ? 'block' : 'hidden'}`}>
              <Link to="/contact" className="block text-gray-300 hover:text-purple-400 transition-colors">Contact Us</Link>
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="w-4 h-4 text-purple-400" />
                <span className="text-sm">support@arvipoa.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-4 h-4 text-purple-400" />
                <span className="text-sm">Accra, Ghana</span>
              </div>
            </div>
          </div>

          {/* CONNECT */}
          <div>
            <div 
              className="flex items-center justify-between cursor-pointer mb-4"
              onClick={() => toggleSection('connect')}
            >
              <h4 className="text-white font-semibold flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-400" />
                CONNECT
              </h4>
              {openSections.connect ? 
                <ChevronUp className="w-4 h-4 text-gray-400" /> : 
                <ChevronDown className="w-4 h-4 text-gray-400" />
              }
            </div>
            <div className={`space-y-3 transition-all duration-300 ${openSections.connect ? 'block' : 'hidden'}`}>
              <div className="flex gap-3 flex-wrap">
                <a href="#" className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <SiFacebook className="w-4 h-4 text-white" />
                </a>
                <a href="#" className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors">
                  <RiWhatsappFill className="w-4 h-4 text-white" />
                </a>
                <a href="#" className="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <SiX className="w-4 h-4 text-white" />
                </a>
                <a href="#" className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center hover:bg-blue-900 transition-colors">
                  <SiLinkedin className="w-4 h-4 text-white" />
                </a>
                <a href="#" className="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <SiTiktok className="w-4 h-4 text-white" />
                </a>
                <a href="#" className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                  <SiYoutube className="w-4 h-4 text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-400">&copy; 2024 ARVIPOA. All rights reserved. | Property Protection & Management Platform</p>
        </div>
      </div>
    </footer>
  );
}