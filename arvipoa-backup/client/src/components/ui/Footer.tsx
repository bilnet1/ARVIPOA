import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { 
  Home, 
  Building, 
  Gavel, 
  Heart, 
  Globe, 
  Phone, 
  Users, 
  ChevronDown, 
  ChevronUp, 
  Mail, 
  MapPin, 
  Facebook, 
  MessageCircle, 
  X, 
  Linkedin, 
  Instagram, 
  Youtube 
} from "lucide-react";
import { Button } from "./button";

export default function Footer() {
  const [expandedFooterSection, setExpandedFooterSection] = useState<string | null>(null);

  const toggleFooterSection = (section: string) => {
    setExpandedFooterSection(expandedFooterSection === section ? null : section);
  };

  return (
    <footer className="bg-black/40 backdrop-blur-md border-t border-white/10 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Logo and Tagline */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <img 
              src="/attached_assets/arvipoa upgraded logo.png"
              alt="ARVIPOA Logo"
              className="w-16 h-16 rounded-lg"
            />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">ARVIPOA</h3>
          <p className="text-gray-300 text-sm">Property Protection</p>
        </div>

        {/* Collapsible Footer Sections */}
        <div className="space-y-4">
          {/* HOME Section */}
          <div className="border-b border-white/20 pb-4">
            <button
              onClick={() => toggleFooterSection('home')}
              className="flex items-center justify-between w-full text-left"
            >
              <div className="flex items-center gap-2">
                <Home className="w-5 h-5 text-blue-400" />
                <span className="text-blue-400 font-semibold">HOME</span>
              </div>
              {expandedFooterSection === 'home' ? 
                <ChevronUp className="w-5 h-5 text-blue-400" /> : 
                <ChevronDown className="w-5 h-5 text-blue-400" />
              }
            </button>
            <AnimatePresence>
              {expandedFooterSection === 'home' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 ml-7 space-y-2 text-sm text-gray-300"
                >
                  <Link to="/" className="block hover:text-blue-400">Homepage</Link>
                  <Link to="/about" className="block hover:text-blue-400">About Us</Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* SERVICES Section */}
          <div className="border-b border-white/20 pb-4">
            <button
              onClick={() => toggleFooterSection('services')}
              className="flex items-center justify-between w-full text-left"
            >
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-semibold">SERVICES</span>
              </div>
              {expandedFooterSection === 'services' ? 
                <ChevronUp className="w-5 h-5 text-green-400" /> : 
                <ChevronDown className="w-5 h-5 text-green-400" />
              }
            </button>
            <AnimatePresence>
              {expandedFooterSection === 'services' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 ml-7 space-y-2 text-sm text-gray-300"
                >
                  <Link to="/services" className="block hover:text-green-400">All Services</Link>
                  <Link to="/property-registration" className="block hover:text-green-400">Property Registration</Link>
                  <Link to="/river-defense-barricade" className="block hover:text-green-400">River Defense Barricade</Link>
                  <Link to="/smart-pillar" className="block hover:text-green-400">Smart Pillar System</Link>
                  <Link to="/health-intelligence" className="block hover:text-green-400">Health Intelligence</Link>
                  <Link to="/pmb-email-center" className="block hover:text-green-400">Private Mailbox</Link>
                  <Link to="/monitoring" className="block hover:text-green-400">Live Monitoring</Link>
                  <Link to="/smart-card" className="block hover:text-green-400">Smart Card</Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* LEGAL Section */}
          <div className="border-b border-white/20 pb-4">
            <button
              onClick={() => toggleFooterSection('legal')}
              className="flex items-center justify-between w-full text-left"
            >
              <div className="flex items-center gap-2">
                <Gavel className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-400 font-semibold">LEGAL</span>
              </div>
              {expandedFooterSection === 'legal' ? 
                <ChevronUp className="w-5 h-5 text-yellow-400" /> : 
                <ChevronDown className="w-5 h-5 text-yellow-400" />
              }
            </button>
            <AnimatePresence>
              {expandedFooterSection === 'legal' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 ml-7 space-y-2 text-sm text-gray-300"
                >
                  <Link to="/privacy-policy" className="block hover:text-yellow-400">Privacy Policy</Link>
                  <Link to="/terms" className="block hover:text-yellow-400">Terms of Use</Link>
                  <Link to="/property-owners-terms" className="block hover:text-yellow-400">Property Owners Terms</Link>
                  <Link to="/buyers-tenants-terms" className="block hover:text-yellow-400">Buyers & Tenants Terms</Link>
                  <Link to="/cookie-policy" className="block hover:text-yellow-400">Cookie Policy</Link>
                  <Link to="/eula" className="block hover:text-yellow-400">EULA</Link>
                  <Link to="/legal-hub" className="block hover:text-yellow-400">Legal Hub</Link>
                  <Link to="/property-law" className="block hover:text-yellow-400">Property Law</Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* PARTNERSHIPS Section */}
          <div className="border-b border-white/20 pb-4">
            <button
              onClick={() => toggleFooterSection('partnerships')}
              className="flex items-center justify-between w-full text-left"
            >
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-purple-400" />
                <span className="text-purple-400 font-semibold">PARTNERSHIPS</span>
              </div>
              {expandedFooterSection === 'partnerships' ? 
                <ChevronUp className="w-5 h-5 text-purple-400" /> : 
                <ChevronDown className="w-5 h-5 text-purple-400" />
              }
            </button>
            <AnimatePresence>
              {expandedFooterSection === 'partnerships' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 ml-7 space-y-2 text-sm text-gray-300"
                >
                  <Link to="/members" className="block hover:text-purple-400">Members</Link>
                  <Link to="/partners" className="block hover:text-purple-400">Partners</Link>
                  <Link to="/clients" className="block hover:text-purple-400">Clients</Link>
                  <Link to="/affiliates" className="block hover:text-purple-400">Affiliates</Link>
                  <div className="text-purple-300 text-xs mt-2">Business Relations</div>
                  <div className="text-purple-300 text-xs">Become a Partner</div>
                  <div className="text-purple-300 text-xs">Success Program</div>
                  <div className="text-purple-300 text-xs">Business Program</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* PLATFORM Section */}
          <div className="border-b border-white/20 pb-4">
            <button
              onClick={() => toggleFooterSection('platform')}
              className="flex items-center justify-between w-full text-left"
            >
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-cyan-400" />
                <span className="text-cyan-400 font-semibold">PLATFORM</span>
              </div>
              {expandedFooterSection === 'platform' ? 
                <ChevronUp className="w-5 h-5 text-cyan-400" /> : 
                <ChevronDown className="w-5 h-5 text-cyan-400" />
              }
            </button>
            <AnimatePresence>
              {expandedFooterSection === 'platform' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 ml-7 space-y-2 text-sm text-gray-300"
                >
                  <Link to="/property-advertisements" className="block hover:text-cyan-400">Property Listings</Link>
                  <Link to="/property-listing" className="block hover:text-cyan-400">Property Listing Adverts</Link>
                  <Link to="/news-portal" className="block hover:text-cyan-400">News Portal</Link>
                  <Link to="/community-social" className="block hover:text-cyan-400">Community Hub</Link>
                  <Link to="/arvicine" className="block hover:text-cyan-400">ARVICINE Videos</Link>
                  <Link to="/smart-pillar" className="block hover:text-cyan-400">Smart Pillar</Link>
                  <Link to="/blog" className="block hover:text-cyan-400">Innovation Blog</Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CONTACT Section */}
          <div className="border-b border-white/20 pb-4">
            <button
              onClick={() => toggleFooterSection('contact')}
              className="flex items-center justify-between w-full text-left"
            >
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-red-400" />
                <span className="text-red-400 font-semibold">CONTACT</span>
              </div>
              {expandedFooterSection === 'contact' ? 
                <ChevronUp className="w-5 h-5 text-red-400" /> : 
                <ChevronDown className="w-5 h-5 text-red-400" />
              }
            </button>
            <AnimatePresence>
              {expandedFooterSection === 'contact' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 ml-7 space-y-2 text-sm text-gray-300"
                >
                  <div className="text-gray-300">Contact Us</div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>support@arvipoa.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>Accra, Ghana</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CONNECT Section */}
          <div className="pb-4">
            <button
              onClick={() => toggleFooterSection('connect')}
              className="flex items-center justify-between w-full text-left"
            >
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-orange-400" />
                <span className="text-orange-400 font-semibold">CONNECT</span>
              </div>
              {expandedFooterSection === 'connect' ? 
                <ChevronUp className="w-5 h-5 text-orange-400" /> : 
                <ChevronDown className="w-5 h-5 text-orange-400" />
              }
            </button>
            <AnimatePresence>
              {expandedFooterSection === 'connect' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 ml-7"
                >
                  <div className="flex space-x-3">
                    <Button size="sm" variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500/10">
                      <Facebook className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/10">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-500 text-gray-400 hover:bg-gray-500/10">
                      <X className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="border-blue-600 text-blue-400 hover:bg-blue-600/10">
                      <Linkedin className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10">
                      <Instagram className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/10">
                      <Youtube className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center py-8 border-t border-white/10 mt-8">
          <p className="text-gray-400 text-sm">© 2024 ARVIPOA. All rights reserved. | Property Protection & Management Platform</p>
        </div>
      </div>
    </footer>
  );
}