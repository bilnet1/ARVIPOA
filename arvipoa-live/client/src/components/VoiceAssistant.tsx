import { useState, useEffect } from "react";
import { Mic, MicOff, Volume2, Search } from "lucide-react";

export default function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSupported(true);
    }
  }, []);

  const startListening = () => {
    if (!isSupported) {
      setResponse("Voice recognition is not supported in your browser.");
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript("");
      setResponse("");
    };

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      setTranscript(spokenText);
      processVoiceCommand(spokenText);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      setResponse(`Voice recognition error: ${event.error}`);
    };

    recognition.start();
  };

  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes("search") || lowerCommand.includes("find")) {
      setResponse(`Searching for properties related to: "${command}"`);
    } else if (lowerCommand.includes("register") || lowerCommand.includes("add property")) {
      setResponse("Redirecting to property registration form...");
      setTimeout(() => window.location.href = "/register", 1000);
    } else if (lowerCommand.includes("admin") || lowerCommand.includes("dashboard")) {
      setResponse("Opening admin dashboard...");
      setTimeout(() => window.location.href = "/admin", 1000);
    } else if (lowerCommand.includes("services")) {
      setResponse("Showing ARVIPOA services...");
      setTimeout(() => window.location.href = "/services", 1000);
    } else if (lowerCommand.includes("help")) {
      setResponse("Available commands: 'search properties', 'register property', 'open admin', 'show services', or 'help'");
    } else {
      setResponse(`I heard: "${command}". Try saying 'help' to see available commands.`);
    }
  };

  const speakResponse = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-[#002818] border border-[#D4AF37] rounded-lg p-4 shadow-lg max-w-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[#D4AF37] font-bold text-sm">Voice Assistant</h3>
          <div className="flex gap-2">
            <button
              onClick={() => response && speakResponse(response)}
              className="p-1 text-gray-400 hover:text-[#D4AF37] transition-colors"
              title="Speak response"
            >
              <Volume2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mb-3">
          <button
            onClick={startListening}
            disabled={isListening}
            className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
              isListening 
                ? 'bg-red-600 text-white animate-pulse' 
                : 'bg-[#D4AF37] text-black hover:bg-yellow-500'
            }`}
          >
            {isListening ? (
              <>
                <MicOff className="h-5 w-5" />
                Listening...
              </>
            ) : (
              <>
                <Mic className="h-5 w-5" />
                Speak Command
              </>
            )}
          </button>
        </div>

        {transcript && (
          <div className="mb-2 p-2 bg-[#001b14] rounded text-sm">
            <p className="text-gray-300">You said: "{transcript}"</p>
          </div>
        )}

        {response && (
          <div className="p-2 bg-[#001b14] rounded text-sm">
            <p className="text-green-400">{response}</p>
          </div>
        )}

        {!isSupported && (
          <div className="p-2 bg-red-900/20 rounded text-sm">
            <p className="text-red-400">Voice commands not supported in this browser</p>
          </div>
        )}

        <div className="mt-3 text-xs text-gray-500">
          <p>Try: "search properties", "register property", "help"</p>
        </div>
      </div>
    </div>
  );
}