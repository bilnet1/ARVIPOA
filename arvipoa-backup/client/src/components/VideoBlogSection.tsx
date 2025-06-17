import { useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, ExternalLink, Clock, Eye } from "lucide-react";

interface VideoAd {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  views: number;
  category: "Property" | "Technology" | "Legal" | "Finance" | "General";
  sponsor?: string;
  ctaText?: string;
  ctaUrl?: string;
}

// ARVIPOA official video content
const videoAds: VideoAd[] = [
  {
    id: "1",
    title: "The Smart Future of Property Protection - ARVIPOA Gen4",
    description: "Welcome to ARVIPOA – Africa's leading smart property protection platform. Discover the future of property management.",
    thumbnail: "/assets/Gen4 1 Opening The Smart Future of Property ProtectionWelcome to ARVIPOA – Africa' a-2, 2106650483.png",
    videoUrl: "/assets/Gen-3 Alpha Turbo 3093952672, Gen4  Scene 1 Openin, M 5.mp4",
    duration: "5:00",
    views: 25420,
    category: "Property",
    sponsor: "ARVIPOA",
    ctaText: "Start Registration",
    ctaUrl: "/property-registration"
  },
  {
    id: "2",
    title: "ARVIPOA Gen-4 Turbo Platform Demo",
    description: "Experience the next generation of property management with ARVIPOA's advanced AI-powered platform.",
    thumbnail: "/assets/Gen4 1 Opening The Smart Future of Property ProtectionWelcome to ARVIPOA – Africa' a-2, 2106650483.png",
    videoUrl: "/assets/Gen-4 Turbo  4006709044.mp4",
    duration: "3:45",
    views: 18950,
    category: "Technology",
    sponsor: "ARVIPOA",
    ctaText: "Explore Platform",
    ctaUrl: "/dashboard"
  },
  {
    id: "3",
    title: "Smart Pillar Technology Overview",
    description: "Learn how ARVIPOA's Smart Pillars provide comprehensive property protection and monitoring.",
    thumbnail: "/assets/Gen4 1 Opening The Smart Future of Property ProtectionWelcome to ARVIPOA – Africa' a-2, 2106650483.png",
    videoUrl: "/assets/Gen-3 Alpha Turbo 3093952672, Gen4  Scene 1 Openin, M 5.mp4",
    duration: "4:20",
    views: 16100,
    category: "Technology",
    ctaText: "View Monitoring",
    ctaUrl: "/monitoring"
  },
  {
    id: "4",
    title: "ARVIPOA Property Investment Solutions",
    description: "Discover how ARVIPOA revolutionizes property investment with cutting-edge technology and security.",
    thumbnail: "/assets/Gen4 1 Opening The Smart Future of Property ProtectionWelcome to ARVIPOA – Africa' a-2, 2106650483.png",
    videoUrl: "/assets/Gen-4 Turbo  4006709044.mp4",
    duration: "5:45",
    views: 22300,
    category: "Finance",
    ctaText: "Get Started",
    ctaUrl: "/services"
  },
  {
    id: "5",
    title: "ARVIPOA Platform Introduction",
    description: "Complete overview of ARVIPOA's comprehensive property management ecosystem and features.",
    thumbnail: "/assets/Gen4 1 Opening The Smart Future of Property ProtectionWelcome to ARVIPOA – Africa' a-2, 2106650483.png",
    videoUrl: "/assets/Gen-3 Alpha Turbo 3093952672, Gen4  Scene 1 Openin, M 5.mp4",
    duration: "3:50",
    views: 28700,
    category: "General",
    sponsor: "ARVIPOA",
    ctaText: "Join Now",
    ctaUrl: "/signup"
  }
];

export default function VideoBlogSection() {
  const [currentVideo, setCurrentVideo] = useState<VideoAd>(videoAds[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate videos every 30 seconds if not playing
  useEffect(() => {
    if (!isPlaying) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % videoAds.length);
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  useEffect(() => {
    setCurrentVideo(videoAds[currentIndex]);
  }, [currentIndex]);

  const handleVideoSelect = (video: VideoAd, index: number) => {
    setCurrentVideo(video);
    setCurrentIndex(index);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Property": return "bg-[#D4AF37] text-white";
      case "Technology": return "bg-blue-500 text-white";
      case "Legal": return "bg-purple-500 text-white";
      case "Finance": return "bg-green-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="p-4 bg-white border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Featured Content</h2>
        <p className="text-sm text-gray-600">Discover property insights while you sign in</p>
      </div>

      {/* Main Video Player */}
      <div className="flex-1 p-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Video Container */}
          <div className="relative bg-black aspect-video">
            {isPlaying ? (
              <video
                className="w-full h-full object-cover"
                controls
                autoPlay
                muted={isMuted}
                onEnded={() => setIsPlaying(false)}
              >
                <source src={currentVideo.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <>
                <img
                  src={currentVideo.thumbnail}
                  alt={currentVideo.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Video Overlay */}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <button
                    onClick={togglePlay}
                    className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <Play className="w-8 h-8 text-gray-900 ml-1" />
                  </button>
                </div>
              </>
            )}

            {/* Video Controls */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
                <span className="text-white text-sm bg-black/50 px-2 py-1 rounded">
                  {currentVideo.duration}
                </span>
              </div>

              <div className="flex items-center gap-2 text-white text-sm">
                <Eye className="w-4 h-4" />
                <span>{currentVideo.views.toLocaleString()} views</span>
              </div>
            </div>

            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(currentVideo.category)}`}>
                {currentVideo.category}
              </span>
            </div>
          </div>

          {/* Video Info */}
          <div className="p-4">
            <h3 className="font-bold text-gray-900 mb-2">{currentVideo.title}</h3>
            <p className="text-gray-600 text-sm mb-3">{currentVideo.description}</p>
            
            {currentVideo.sponsor && (
              <p className="text-xs text-gray-500 mb-3">Sponsored by {currentVideo.sponsor}</p>
            )}

            {currentVideo.ctaText && currentVideo.ctaUrl && (
              <a
                href={currentVideo.ctaUrl}
                className="inline-flex items-center gap-2 bg-[#D4AF37] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#B8941F] transition-colors"
              >
                {currentVideo.ctaText}
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Video Playlist */}
        <div className="mt-4">
          <h4 className="font-medium text-gray-900 mb-3">More Videos</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {videoAds.map((video, index) => (
              <div
                key={video.id}
                onClick={() => handleVideoSelect(video, index)}
                className={`flex gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                  currentVideo.id === video.id 
                    ? 'bg-[#D4AF37]/10 border border-[#D4AF37]/20' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-20 h-12 object-cover rounded"
                  />
                  <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-medium text-sm text-gray-900 truncate">{video.title}</h5>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{video.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-1.5 py-0.5 rounded text-xs ${getCategoryColor(video.category)}`}>
                      {video.category}
                    </span>
                    <span className="text-xs text-gray-500">{video.views.toLocaleString()} views</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 bg-white border-t border-gray-200 text-center">
        <p className="text-xs text-gray-500">
          Powered by ARVIPOA Media • <a href="/legal-hub" className="text-[#D4AF37] hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}