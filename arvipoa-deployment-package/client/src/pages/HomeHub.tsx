import { useState, useEffect } from "react";
import PlacesServices from "../components/PlacesServices";
import MediaHub from "../components/MediaHub";
import InteractiveMap from "../components/InteractiveMap";
import WeatherClock from "../components/WeatherClock";
import WaterLevelWidget from "../components/WaterLevelWidget";
import PersonalizedDashboard from "../components/PersonalizedDashboard";
import GamifiedAchievements from "../components/GamifiedAchievements";
import VoiceAssistant from "../components/VoiceAssistant";
import AIHelpBubbles from "../components/AIHelpBubbles";
import AuctionHolder from "../components/AuctionHolder";
import AIInteraction from "../components/AIInteraction";
import TrackerButtons from "../components/TrackerButtons";
import BlogScroller from "../components/BlogScroller";
import Footer from "../components/Footer";

export default function HomeHub() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c1c1a] via-[#1a2e2a] to-[#2d4a42] text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-16 w-24 h-24 bg-blue-500/10 rounded-full blur-lg animate-bounce delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-green-500/10 rounded-full blur-lg animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-1/3 w-20 h-20 bg-purple-500/10 rounded-full blur-md animate-bounce delay-3000"></div>
      </div>

      {/* Header Section */}
      <header className="relative py-12 px-4 text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#D4AF37] bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#B8860B] bg-clip-text text-transparent animate-gradient">
            Welcome to ARVIPOA HomeHub
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in-up delay-300">
            Africa's Smart Land & Property Registry
          </p>
        </div>
        
        {/* Live Date & Time */}
        <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 max-w-md mx-auto mb-8 border border-[#D4AF37]/20 animate-fade-in-up delay-500 hover:bg-black/40 transition-all duration-300 hover:scale-105">
          <div className="text-3xl font-mono text-[#D4AF37] mb-2 tabular-nums">
            {time.toLocaleTimeString()}
          </div>
          <div className="text-sm text-gray-300">
            {time.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>
      </header>

      {/* Weather & Water Level Widgets */}
      <section className="px-4 mb-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          <WeatherClock />
          <WaterLevelWidget />
        </div>
      </section>

      {/* Personalized Dashboard */}
      <PersonalizedDashboard />

      {/* AI Interactive Assistant */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-[#D4AF37]">AI Property Assistant</h2>
          <AIInteraction />
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-[#D4AF37]">Ghana Property Hotspots</h2>
          <InteractiveMap />
        </div>
      </section>

      {/* Quick Actions Grid */}
      <section className="py-10 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-[#D4AF37]">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Register Property", icon: "🏠", desc: "Secure your property with blockchain technology" },
              { title: "Virtual Tour", icon: "🔍", desc: "Explore properties with immersive 3D tours" },
              { title: "Smart Boundaries", icon: "📍", desc: "Install intelligent boundary pillars" },
              { title: "River Protection", icon: "🌊", desc: "Monitor and protect water resources" },
              { title: "Document Vault", icon: "📄", desc: "Secure digital document storage" },
              { title: "Community Forum", icon: "💬", desc: "Connect with property owners" },
              { title: "Analytics Hub", icon: "📊", desc: "View property market insights" },
              { title: "Support Center", icon: "🛠️", desc: "Get expert assistance 24/7" }
            ].map((action, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all duration-300 hover:scale-105 cursor-pointer border border-gray-600">
                <div className="text-3xl mb-3">{action.icon}</div>
                <h3 className="text-lg font-semibold text-[#D4AF37] mb-2">{action.title}</h3>
                <p className="text-sm text-gray-300">{action.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gamified Achievements */}
      <GamifiedAchievements />

      {/* Insights & Tutorials Section */}
      <BlogScroller />

      {/* Places & Services Section */}
      <PlacesServices />

      {/* Smart Actions Section */}
      <TrackerButtons />

      {/* Property Auction Section */}
      <AuctionHolder />

      {/* Media Hub Section */}
      <MediaHub />

      {/* Voice Assistant & AI Help */}
      <VoiceAssistant />
      <AIHelpBubbles />

      {/* Footer */}
      <Footer />
    </div>
  );
}