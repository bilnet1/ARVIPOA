import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../lib/queryClient";

interface AIResponse {
  response: string;
}

interface PropertyAnalysis {
  propertyType: string;
  estimatedValue: number;
  marketTrends: string;
  riskAssessment: string;
  recommendations: string[];
  legalStatus: string;
}

export default function AIInteraction() {
  const [currentPrompt, setCurrentPrompt] = useState(0);
  const [question, setQuestion] = useState("");
  const [conversation, setConversation] = useState<Array<{type: 'user' | 'ai', message: string}>>([]);
  const [showChat, setShowChat] = useState(false);
  
  const prompts = [
    "Ask me about property registration in Ghana",
    "How can smart pillars protect your boundaries?",
    "Need help with land documentation?",
    "Want to know about river barricade systems?",
    "Questions about digital property verification?"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrompt((prev) => (prev + 1) % prompts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const askAIMutation = useMutation({
    mutationFn: async (question: string) => {
      const response = await apiRequest("/api/ai-assistant", {
        method: "POST",
        body: JSON.stringify({ question, context: "ARVIPOA property platform" }),
        headers: { "Content-Type": "application/json" }
      });
      return response as AIResponse;
    },
    onSuccess: (data) => {
      setConversation(prev => [...prev, 
        { type: 'user', message: question },
        { type: 'ai', message: data.response }
      ]);
      setQuestion("");
    }
  });

  const analyzePropertyMutation = useMutation({
    mutationFn: async (location: string) => {
      const response = await apiRequest("/api/analyze-property", {
        method: "POST",
        body: JSON.stringify({ 
          location, 
          propertyType: "Residential", 
          size: "Standard plot",
          description: "Property analysis request from HomeHub"
        }),
        headers: { "Content-Type": "application/json" }
      });
      return response as PropertyAnalysis;
    },
    onSuccess: (data) => {
      setConversation(prev => [...prev, {
        type: 'ai',
        message: `Property Analysis for your location:
        
Market Value: GHS ${data.estimatedValue?.toLocaleString() || 'Assessment pending'}
Market Trends: ${data.marketTrends}
Risk Assessment: ${data.riskAssessment}
Legal Status: ${data.legalStatus}

Recommendations:
${data.recommendations?.map((rec: string) => `• ${rec}`).join('\n') || '• Professional consultation recommended'}`
      }]);
    }
  });

  const handleAskAI = () => {
    if (question.trim()) {
      askAIMutation.mutate(question);
    }
  };

  const handleQuickAction = (action: string) => {
    setShowChat(true);
    if (action === "Property Values") {
      analyzePropertyMutation.mutate("Accra, Ghana");
    } else {
      askAIMutation.mutate(`Tell me about ${action.toLowerCase()} in Ghana property management`);
    }
  };

  if (showChat) {
    return (
      <section className="bg-[#0f1f1d] py-10 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center">
                  <span className="text-xl">🤖</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">ARVIPOA AI Assistant</h3>
                  <p className="text-sm text-gray-400">Powered by advanced property intelligence</p>
                </div>
              </div>
              <button 
                onClick={() => setShowChat(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="bg-gray-700 rounded-lg p-4 mb-4 max-h-60 overflow-y-auto">
              {conversation.length === 0 ? (
                <p className="text-gray-300">Ask me anything about property registration, legal requirements, or ARVIPOA services in Ghana.</p>
              ) : (
                conversation.map((msg, index) => (
                  <div key={index} className={`mb-3 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-block p-3 rounded-lg max-w-[80%] ${
                      msg.type === 'user' 
                        ? 'bg-[#D4AF37] text-black ml-auto' 
                        : 'bg-gray-600 text-white'
                    }`}>
                      <pre className="whitespace-pre-wrap text-sm font-sans">{msg.message}</pre>
                    </div>
                  </div>
                ))
              )}
              {(askAIMutation.isPending || analyzePropertyMutation.isPending) && (
                <div className="text-left">
                  <div className="inline-block p-3 rounded-lg bg-gray-600 text-white">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin w-4 h-4 border-2 border-[#D4AF37] border-t-transparent rounded-full"></div>
                      <span>Analyzing...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAskAI()}
                placeholder="Ask your property question..."
                className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                disabled={askAIMutation.isPending || analyzePropertyMutation.isPending}
              />
              <button 
                onClick={handleAskAI}
                disabled={askAIMutation.isPending || analyzePropertyMutation.isPending || !question.trim()}
                className="bg-[#D4AF37] text-black px-6 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Ask AI
              </button>
            </div>
            
            <div className="mt-4 flex gap-2 flex-wrap">
              <button 
                onClick={() => handleQuickAction("Property Values")}
                disabled={askAIMutation.isPending || analyzePropertyMutation.isPending}
                className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm hover:bg-gray-600 transition-colors disabled:opacity-50"
              >
                Property Values
              </button>
              <button 
                onClick={() => handleQuickAction("Legal Help")}
                disabled={askAIMutation.isPending || analyzePropertyMutation.isPending}
                className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm hover:bg-gray-600 transition-colors disabled:opacity-50"
              >
                Legal Help
              </button>
              <button 
                onClick={() => handleQuickAction("Registration Process")}
                disabled={askAIMutation.isPending || analyzePropertyMutation.isPending}
                className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm hover:bg-gray-600 transition-colors disabled:opacity-50"
              >
                Registration Process
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#0f1f1d] py-10 text-white text-center">
      <h2 className="text-lg mb-2 text-[#D4AF37] font-semibold">Smart Assistant</h2>

      <button 
        onClick={() => setShowChat(true)}
        className="bg-gradient-to-r from-green-700 via-green-600 to-[#D4AF37] text-black px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-all duration-300"
      >
        🤖 {prompts[currentPrompt]}
      </button>

      <p className="mt-4 text-sm text-gray-400">Interact with our AI to get suggestions and shortcuts</p>
    </section>
  );
}
