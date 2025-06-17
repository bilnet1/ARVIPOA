import { useState, useEffect } from "react";
import { HelpCircle, X, Lightbulb, ArrowRight } from "lucide-react";

interface HelpTip {
  id: string;
  title: string;
  content: string;
  context: string;
  priority: "low" | "medium" | "high";
}

export default function AIHelpBubbles() {
  const [currentTip, setCurrentTip] = useState<HelpTip | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState<string[]>(() => {
    // Load dismissed tips from localStorage
    const saved = localStorage.getItem('arvipoa-dismissed-tips');
    return saved ? JSON.parse(saved) : [];
  });

  const helpTips: HelpTip[] = [
    {
      id: "welcome",
      title: "Welcome to ARVIPOA!",
      content: "Your smart property protection platform. Start by registering your first property for enhanced security.",
      context: "general",
      priority: "high"
    },
    {
      id: "voice-commands",
      title: "Voice Commands Available",
      content: "Use voice commands to navigate faster. Try saying 'register property' or 'search properties'.",
      context: "voice",
      priority: "medium"
    },
    {
      id: "map-interaction",
      title: "Interactive Map Tips",
      content: "Click on any property marker to view details. Green markers show available properties, gold shows registered ones.",
      context: "map",
      priority: "medium"
    },
    {
      id: "achievements",
      title: "Earn Achievement Points",
      content: "Complete property registrations and community activities to unlock rewards and build your reputation.",
      context: "gamification",
      priority: "low"
    },
    {
      id: "smart-protection",
      title: "Smart Pillar Benefits",
      content: "Install Smart Pillars for 24/7 property monitoring, automatic alerts, and enhanced security coverage.",
      context: "security",
      priority: "high"
    }
  ];

  useEffect(() => {
    // Only run on initial load to prevent constant re-triggering
    const currentPath = window.location.pathname;
    let contextualTips = helpTips.filter(tip => !dismissed.includes(tip.id));
    
    if (currentPath === "/homehub") {
      contextualTips = contextualTips.filter(tip => tip.context === "general" || tip.context === "voice");
    } else if (currentPath === "/admin") {
      contextualTips = contextualTips.filter(tip => tip.context === "map" || tip.context === "gamification");
    }

    // Only show tip if not already visible and there are tips to show
    if (contextualTips.length > 0 && !isVisible && !currentTip) {
      const highPriorityTips = contextualTips.filter(tip => tip.priority === "high");
      const tipToShow = highPriorityTips.length > 0 ? highPriorityTips[0] : contextualTips[0];
      
      const timeoutId = setTimeout(() => {
        setCurrentTip(tipToShow);
        setIsVisible(true);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, []); // Empty dependency array to run only once on mount

  const dismissTip = (tipId: string) => {
    const newDismissed = [...dismissed, tipId];
    setDismissed(newDismissed);
    // Save to localStorage
    localStorage.setItem('arvipoa-dismissed-tips', JSON.stringify(newDismissed));
    setIsVisible(false);
    setCurrentTip(null);
  };

  const showNextTip = () => {
    if (currentTip) {
      dismissTip(currentTip.id);
    }
  };

  if (!isVisible || !currentTip) return null;

  return (
    <div className="fixed bottom-20 left-6 z-40 max-w-sm">
      <div className="bg-[#002818] border border-[#D4AF37] rounded-lg p-4 shadow-lg animate-bounce">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-[#D4AF37]" />
            <h4 className="font-bold text-[#D4AF37] text-sm">{currentTip.title}</h4>
          </div>
          <button
            onClick={() => dismissTip(currentTip.id)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        <p className="text-gray-300 text-sm mb-4">{currentTip.content}</p>
        
        <div className="flex justify-between items-center">
          <button
            onClick={() => dismissTip(currentTip.id)}
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            Don't show again
          </button>
          <button
            onClick={showNextTip}
            className="flex items-center gap-1 bg-[#D4AF37] text-black px-3 py-1 rounded text-xs font-medium hover:bg-yellow-500 transition-colors"
          >
            Got it
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
      
      {/* Help Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-6 left-6 bg-[#D4AF37] text-black p-3 rounded-full shadow-lg hover:bg-yellow-500 transition-all duration-200 hover:scale-110"
        title="AI Assistant Help"
      >
        <HelpCircle className="h-6 w-6" />
      </button>
    </div>
  );
}