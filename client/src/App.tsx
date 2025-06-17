import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { createPortal } from "react-dom";
import { Menu, X, ChevronDown, User, Building } from "lucide-react";
import FunctionalHome from "./pages/FunctionalHome";
import About from "./pages/about";
import Services from "./pages/services";
import Register from "./pages/register";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProfileDetails from "./pages/ProfileDetails";
import SmartCardService from "./pages/SmartCardServiceClean";
import SmartPillarDashboard from "./pages/SmartPillarDashboard";
import SmartPillarAdmin from "./pages/SmartPillarAdmin";
import ProfileDevices from "./pages/ProfileDevices";
import Dashboard from "./pages/Dashboard";
import PropertyMonitoring from "./pages/PropertyMonitoring";
import PropertyRegistration from "./pages/PropertyRegistration";
import Admin from "./pages/admin";
import HomeHub from "./pages/HomeHub";
import Terms from "./pages/terms";
import PropertyLaw from "./pages/property-law";
import PrivacyPolicy from "./pages/privacy-policy";
import PropertyOwnersTerms from "./pages/property-owners-terms";
import BuyersTenantsTerms from "./pages/buyers-tenants-terms";
import CookiePolicy from "./pages/cookie-policy";
import EULA from "./pages/eula";
import LegalHub from "./pages/legal-hub";
import DateOfBirthForm from "./components/DateOfBirthForm";
import OrganizationProfile from "./pages/OrganizationProfile";
import CCTVIntruderDashboard from "./components/CCTVIntruderDashboard";
import IdCertificateHub from "./pages/IdCertificateHub";
import RiverDefenseBarricadeDashboard from "./pages/RiverDefenseBarricadeDashboard";
import MyDevicesLimitedView from "./pages/MyDevicesLimitedView";
import LandRegistration from "./pages/LandRegistration";
import AirSupportCommand from "./pages/AirSupportCommand";
import AdminOpsCenter from "./pages/AdminOpsCenter";
import SmartMapOverlay from "./components/SmartMapOverlay";
import SmartPillarCommandCenter from "./pages/SmartPillarCommandCenter";
import HealthIntelligence from "./pages/HealthIntelligence";
import PractitionerLogin from "./pages/PractitionerLogin";
import PharmacyMarketplace from "./pages/PharmacyMarketplace";
import TelehealthDashboard from "./pages/TelehealthDashboard";
import PhysiqueStatus from "./pages/PhysiqueStatus";
import { PropertyRegistrationPortal, LandRegistrationForm, FirearmRegistrationForm } from "./pages/WorkingPropertyRegistration";
import VehicleRegistration from "./pages/VehicleRegistration";
import EnhancedProfile from "./pages/EnhancedProfile";
import RiverDefenseBarricade from "./pages/RiverDefenseBarricade";
import SmartPillar from "./pages/SmartPillar";
import IDEIST from "./pages/IDEIST";
import Blog from "./pages/Blog";
import BlogPage from "./pages/BlogPage";
import MembersPage from "./pages/MembersPage";
import PartnersPage from "./pages/PartnersPage";
import ClientsPage from "./pages/ClientsPage";
import AffiliatesPage from "./pages/AffiliatesPage";
import ArmsRegistrationForm from "./pages/ArmsRegistrationForm";
import ElectronicsRegistrationForm from "./pages/ElectronicsRegistrationForm";
import PmbRegistrationForm from "./pages/PmbRegistrationForm";
import TreeRegistrationForm from "./pages/TreeRegistrationForm";
import AnimalRegistrationForm from "./pages/AnimalRegistrationForm";
import SlaughteringRegistrationForm from "./pages/SlaughteringRegistrationForm";
import VehicleRegistrationForm from "./pages/VehicleRegistrationForm";
import WorkingLandRegistration from "./pages/WorkingLandRegistration";
import RegistrationHub from "./pages/RegistrationHub";
import EnhancedRegistrationHub from "./pages/EnhancedRegistrationHub";
import MobilePropertyDashboard from "./pages/MobilePropertyDashboard";
import AutoRegistrationModule from "./pages/AutoRegistrationModule";
import ArmsRegistrationModule from "./pages/ArmsRegistrationModule";
import LivestockRegistrationModule from "./pages/LivestockRegistrationModule";
import PmbRegistrationModule from "./pages/PmbRegistrationModule";
import DomainRegistrationModule from "./pages/DomainRegistrationModule";
import PrivateMailBoxEmailCenter from "./pages/PrivateMailBoxEmailCenter";
import LandRegistrationFormEnhanced from "./pages/LandRegistrationFormEnhanced";
import BuildingRegistrationFormFixed from "./pages/BuildingRegistrationFormFixed";
import LifestyleProfileModule from "./pages/LifestyleProfileModule";
import AddInhabitantModule from "./pages/AddInhabitantModule";
import AddTenantModule from "./pages/AddTenantModule";
import PropertyRulesModule from "./pages/PropertyRulesModule";
import VisaApplicationModule from "./pages/VisaApplicationModule";
import UserProfileDashboard from "./pages/UserProfileDashboard";
import NavigationDashboard from "./pages/NavigationDashboard";
import PropertyRegistrationHub from "./pages/PropertyRegistrationHub";
import WorkingApp from "./pages/WorkingApp";
import SimpleHomepage from "./pages/SimpleHomepage";
import TestHomepage from "./pages/TestHomepage";
import CleanArmsRegistration from "./pages/CleanArmsRegistration";
import ElectronicsRegistration from "./pages/ElectronicsRegistration";
import PmbRegistration from "./pages/PmbRegistration";
import TreeRegistration from "./pages/TreeRegistration";
import AnimalRegistration from "./pages/AnimalRegistration";
import VetOfficerLogin from "./pages/VetOfficerLogin";
import AnimalMarketplace from "./pages/AnimalMarketplace";
import SlaughteringRegistration from "./pages/SlaughteringRegistration";
import SlaughterHouseLogin from "./pages/SlaughterHouseLogin";
import PropertyAdvertisementPage from "./pages/PropertyAdvertisementPage";
import PropertyListingAdvert from "./pages/PropertyListingAdvert";
import ARVIPOASmartCard from "./pages/ARVIPOASmartCard";
import GeneralMarketModal from "./pages/GeneralMarketModal";
import NewsPortal from "./pages/NewsPortal";
import CommunitySocialHub from "./pages/CommunitySocialHub";
import ARVICINEVideoPlatform from "./pages/ARVICINEVideoPlatform";
import ARVIMEDIA from "./pages/ARVIMEDIA";
import VideoUpload from "./pages/VideoUpload";
import VirtualPropertyTour from "./pages/VirtualPropertyTour";
import PeopleBusinesses from "./pages/PeopleBusinesses";
import ForeignBirdPaymentPane from "./pages/ForeignBirdPaymentPane";
import RBFSPlatform from "./pages/RBFSPlatform";
import NewHeader from "./components/NewHeader";
import arvipoaLogo from "./assets/images/arvipoa-logo.png";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };



  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <NewHeader />
        <div className="hidden bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3 group animate-fade-in-left z-60">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-full blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                <img 
                  src={arvipoaLogo} 
                  alt="ARVIPOA" 
                  className="relative h-12 w-auto hover-lift"
                  onError={(e) => {
                    console.log('Logo failed to load:', arvipoaLogo);
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent hover:scale-105 transition-transform">ARVIPOA</h1>
            </Link>
            
            {/* Desktop Navigation Menu */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Main Navigation Links */}
              <nav className="flex items-center space-x-6">
                <Link className="text-gray-700 hover:text-[#D4AF37] transition-colors duration-300 font-medium" to="/about">
                  About
                </Link>
                <Link className="text-gray-700 hover:text-[#D4AF37] transition-colors duration-300 font-medium" to="/services">
                  Services
                </Link>
                
                {/* Property Registration Button */}
                <Link 
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  to="/property-registration"
                >
                  Register Property
                </Link>

                {/* Services Dropdown */}
                <div className="relative dropdown-container">
                  <button 
                    onClick={toggleDropdown}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-[#D4AF37] transition-all duration-200 rounded-lg"
                  >
                    <span className="font-medium">Services</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </nav>

              {/* User Profile Section */}
              <div className="flex items-center space-x-4">
                {/* User Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-2 p-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#FFD700] hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <ChevronDown className={`w-4 h-4 text-white transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-56 bg-white shadow-2xl rounded-xl border border-gray-100 py-2 z-[9999]">
                      <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-[#D4AF37]/10 to-[#FFD700]/10">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">User Profile</p>
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-xs text-gray-600">Online</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="py-2">
                        <Link
                          className="flex items-center px-4 py-3 text-gray-700 hover:text-[#D4AF37] hover:bg-gradient-to-r hover:from-[#D4AF37]/10 hover:to-[#FFD700]/10 transition-all duration-300"
                          to="/enhanced-profile"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <User className="w-4 h-4 mr-3" />
                          Profile
                        </Link>
                        <Link
                          className="flex items-center px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-300"
                          to="/property-registration"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <span className="w-4 h-4 mr-3">🏢</span>
                          Property Register
                        </Link>
                        <Link
                          className="flex items-center px-4 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300"
                          to="/video-upload"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <span className="w-4 h-4 mr-3">🎥</span>
                          Video Upload
                        </Link>
                        <button
                          className="flex items-center w-full px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-300"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <X className="w-4 h-4 mr-3" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                <Link className="text-gray-700 hover:text-[#D4AF37] transition-colors duration-300 font-medium" to="/login">
                  Login
                </Link>
                <Link
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  to="/signup"
                >
                  Sign Up
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-3 rounded-xl text-gray-700 hover:text-[#D4AF37] hover:bg-gradient-to-r hover:from-[#D4AF37]/10 hover:to-[#FFD700]/10 transition-all duration-300 group animate-fade-in-right"
              aria-label="Toggle menu"
            >
              <div className="relative">
                {isMenuOpen ? (
                  <X className="w-6 h-6 transform rotate-180 transition-transform duration-300" />
                ) : (
                  <Menu className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                )}
              </div>
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden fixed top-16 left-0 right-0 bg-white/95 backdrop-blur-md shadow-2xl border-t border-gray-200/50 z-[9999] animate-fade-in-down max-h-[calc(100vh-4rem)] overflow-y-auto">
              <nav className="px-4 py-6 space-y-2">
                {[
                  { to: "/about", label: "About" },
                  { to: "/services", label: "Services" },
                  { to: "/register", label: "Register" },
                  { to: "/login", label: "Login" },
                  { to: "/signup", label: "Sign Up" },
                  { to: "/profile", label: "Profile" },
                  { to: "/organization", label: "Organization" },
                  { to: "/dashboard", label: "Dashboard" },
                  { to: "/land-registration", label: "Register Land" },
                  { to: "/monitoring", label: "Monitoring" },
                  { to: "/id-certificate-hub", label: "ID Certificate Hub" },
                  { to: "/cctv-monitoring", label: "CCTV & Intrusion" },
                  { to: "/river-defense-barricade", label: "River Defense Barricade" },
                  { to: "/ideist", label: "IDEIST Energy Solutions" },
                  { to: "/air-support", label: "Air Support" },
                  { to: "/air-pilot", label: "AI Pilot Control" },
                  { to: "/my-devices", label: "My Devices" },
                  { to: "/ops-center", label: "Operations Center" },
                  { to: "/live-map", label: "Live Map" },
                  { to: "/command-center", label: "Command Center" },
                  { to: "/health-intelligence", label: "Health Intelligence" },
                  { to: "/practitioner-login", label: "Practitioner Login" },
                  { to: "/pharmacy-marketplace", label: "Pharmacy Marketplace" },
                  { to: "/telehealth-dashboard", label: "Telehealth Dashboard" },
                  { to: "/physique-status", label: "AI Physique Analysis" },
                  { to: "/property-registration", label: "Property Registration" },
                  { to: "/land-registration", label: "Land Registration" },
                  { to: "/vehicle-registration", label: "Vehicle Registration" },
                  { to: "/arms-registration", label: "Arms Registration" },
                  { to: "/electronics-registration", label: "Electronics Registration" },
                  { to: "/pmb-registration", label: "PMB Registration" },
                  { to: "/tree-registration", label: "Tree/Plantation Registration" },
                  { to: "/animal-registration", label: "Animal Registration" },
                  { to: "/slaughtering-registration", label: "Slaughtering Registration" },
                  { to: "/vet-officer-login", label: "Vet Officer Login" },
                  { to: "/slaughter-house-login", label: "Slaughter House Login" },
                  { to: "/animal-marketplace", label: "Animal Marketplace" },
                  { to: "/arvimedia", label: "ARVIMEDIA Streaming" },
                  { to: "/arvicine", label: "ARVICINE Cinema" },
                  { to: "/blog", label: "Blog & News" },
                  { to: "/legal-hub", label: "Legal Hub" },
                  { to: "/admin", label: "Admin" }
                ].map((item, index) => (
                  <Link 
                    key={item.to}
                    className="block text-gray-700 hover:text-[#D4AF37] hover:bg-gradient-to-r hover:from-[#D4AF37]/10 hover:to-[#FFD700]/10 px-4 py-3 rounded-xl transition-all duration-300 font-medium group animate-slide-in-blur"
                    to={item.to}
                    onClick={closeMenu}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="relative">
                      {item.label}
                      <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] group-hover:w-full transition-all duration-300"></div>
                    </span>
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>

        <Routes>
          <Route path="/" element={<SimpleHomepage key="homepage-refresh" />} />
          <Route path="/homehub" element={<HomeHub />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile-details" element={<ProfileDetails />} />
          <Route path="/enhanced-profile" element={<EnhancedProfile />} />
          <Route path="/smart-card" element={<SmartCardService />} />
          <Route path="/smart-card-service" element={<SmartCardService />} />
          <Route path="/smart-pillar" element={<SmartPillarDashboard />} />
          <Route path="/smart-pillar-admin" element={<SmartPillarAdmin />} />
          <Route path="/ideist" element={<IDEIST />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/profile/devices" element={<ProfileDevices />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/property-registration" element={<PropertyRegistration />} />
          <Route path="/monitoring" element={<PropertyMonitoring />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/property-law" element={<PropertyLaw />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/property-owners-terms" element={<PropertyOwnersTerms />} />
          <Route path="/buyers-tenants-terms" element={<BuyersTenantsTerms />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/eula" element={<EULA />} />
          <Route path="/legal-hub" element={<LegalHub />} />
          <Route path="/date-of-birth" element={<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8"><DateOfBirthForm /></div>} />
          <Route path="/organization" element={<OrganizationProfile />} />
          <Route path="/cctv-monitoring" element={<CCTVIntruderDashboard />} />
          <Route path="/id-certificate-hub" element={<IdCertificateHub />} />
          <Route path="/river-dashboard" element={<RiverDefenseBarricadeDashboard />} />
          <Route path="/my-devices" element={<MyDevicesLimitedView />} />
          <Route path="/air-support" element={<AirSupportCommand />} />
          <Route path="/air-pilot" element={<AirSupportCommand />} />
          <Route path="/ops-center" element={<AdminOpsCenter />} />
          <Route path="/live-map" element={<div className="min-h-screen bg-gray-50"><SmartMapOverlay /></div>} />
          <Route path="/command-center" element={<SmartPillarCommandCenter />} />
          <Route path="/health-intelligence" element={<HealthIntelligence />} />
          <Route path="/practitioner-login" element={<PractitionerLogin />} />
          <Route path="/pharmacy-marketplace" element={<PharmacyMarketplace />} />
          <Route path="/telehealth-dashboard" element={<TelehealthDashboard />} />
          <Route path="/physique-status" element={<PhysiqueStatus />} />
          <Route path="/property-registration" element={<PropertyRegistrationHub />} />
          <Route path="/enhanced-registration" element={<EnhancedRegistrationHub />} />
          <Route path="/registration-hub" element={<EnhancedRegistrationHub />} />
          <Route path="/mobile-property" element={<MobilePropertyDashboard />} />
          <Route path="/auto-registration" element={<AutoRegistrationModule />} />
          <Route path="/arms-registration" element={<ArmsRegistrationModule />} />
          <Route path="/livestock-registration" element={<LivestockRegistrationModule />} />
          <Route path="/pmb-registration-module" element={<PmbRegistrationModule />} />
          <Route path="/domain-registration-module" element={<DomainRegistrationModule />} />
          <Route path="/pmb-email-center" element={<PrivateMailBoxEmailCenter />} />
          <Route path="/land-registration-enhanced" element={<LandRegistrationFormEnhanced />} />
          <Route path="/building-registration" element={<BuildingRegistrationFormFixed />} />
          <Route path="/lifestyle-profile" element={<LifestyleProfileModule />} />
          <Route path="/user-dashboard" element={<UserProfileDashboard />} />
          <Route path="/add-inhabitant" element={<AddInhabitantModule />} />
          <Route path="/add-tenant" element={<AddTenantModule />} />
          <Route path="/property-rules" element={<PropertyRulesModule />} />
          <Route path="/visa-application" element={<VisaApplicationModule />} />
          <Route path="/navigation" element={<NavigationDashboard />} />
          <Route path="/modern-homepage" element={<SimpleHomepage />} />
          <Route path="/working-land-form" element={<LandRegistrationForm />} />
          <Route path="/working-firearm-form" element={<FirearmRegistrationForm />} />
          <Route path="/vehicle-registration" element={<VehicleRegistrationForm />} />
          <Route path="/land-registration" element={<WorkingLandRegistration />} />
          <Route path="/arms-registration" element={<ArmsRegistrationForm />} />
          <Route path="/electronics-registration" element={<ElectronicsRegistrationForm />} />
          <Route path="/pmb-registration" element={<PmbRegistrationForm />} />
          <Route path="/tree-registration" element={<TreeRegistrationForm />} />
          <Route path="/animal-registration" element={<AnimalRegistrationForm />} />
          <Route path="/slaughtering-registration" element={<SlaughteringRegistrationForm />} />
          <Route path="/river-defense-barricade" element={<RiverDefenseBarricade />} />
          <Route path="/smart-pillar" element={<SmartPillar />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/affiliates" element={<AffiliatesPage />} />
          <Route path="/vet-officer-login" element={<VetOfficerLogin />} />
          <Route path="/slaughter-house-login" element={<SlaughterHouseLogin />} />
          <Route path="/animal-marketplace" element={<AnimalMarketplace />} />
          <Route path="/profile" element={<EnhancedProfile />} />
          <Route path="/enhanced-profile" element={<EnhancedProfile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/test-working" element={<WorkingApp />} />
          <Route path="/property-advertisements" element={<PropertyAdvertisementPage />} />
          <Route path="/property-listing" element={<PropertyListingAdvert />} />
          <Route path="/property-listing-advert" element={<PropertyListingAdvert />} />
          <Route path="/smart-card" element={<ARVIPOASmartCard />} />
          <Route path="/news-portal" element={<NewsPortal />} />
          <Route path="/community-social" element={<CommunitySocialHub />} />
          <Route path="/arvicine" element={<ARVICINEVideoPlatform />} />
          <Route path="/arvimedia" element={<ARVIMEDIA />} />
          <Route path="/video-upload" element={<VideoUpload />} />
          <Route path="/virtual-tour" element={<VirtualPropertyTour />} />
          <Route path="/people-businesses" element={<PeopleBusinesses />} />
          <Route path="/foreign-bird-payment" element={<ForeignBirdPaymentPane />} />
          <Route path="/rbfs-platform" element={<RBFSPlatform />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;