import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Search, 
  Settings, 
  User, 
  Home,
  TrendingUp,
  Bookmark,
  Download,
  Cast,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
  Maximize,
  Star,
  Clock,
  Eye,
  ThumbsUp,
  Share2,
  Plus,
  Filter,
  Grid3X3,
  List,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Info,
  MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface StreamingPlatform {
  id: string;
  name: string;
  logo: string;
  color: string;
  bgGradient: string;
  featured: boolean;
}

interface Content {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  rating: number;
  year: number;
  genre: string[];
  type: 'movie' | 'series' | 'documentary' | 'live';
  platform: string;
  trending: boolean;
  featured: boolean;
  quality: string[];
  subtitles: string[];
  cast: string[];
}

const streamingPlatforms: StreamingPlatform[] = [
  {
    id: 'netflix',
    name: 'Netflix',
    logo: 'N',
    color: '#E50914',
    bgGradient: 'from-red-600 to-red-800',
    featured: true
  },
  {
    id: 'prime',
    name: 'Prime Video',
    logo: 'P',
    color: '#00A8E1',
    bgGradient: 'from-blue-500 to-blue-700',
    featured: true
  },
  {
    id: 'youtube',
    name: 'YouTube',
    logo: 'Y',
    color: '#FF0000',
    bgGradient: 'from-red-500 to-red-700',
    featured: true
  },
  {
    id: 'dstv',
    name: 'DSTV',
    logo: 'D',
    color: '#FF6B00',
    bgGradient: 'from-orange-500 to-orange-700',
    featured: true
  },
  {
    id: 'showmax',
    name: 'ShowMax',
    logo: 'S',
    color: '#D4142A',
    bgGradient: 'from-pink-600 to-red-700',
    featured: true
  },
  {
    id: 'apple',
    name: 'Apple TV+',
    logo: 'A',
    color: '#000000',
    bgGradient: 'from-gray-800 to-black',
    featured: true
  },
  {
    id: 'disney',
    name: 'Disney+',
    logo: 'D+',
    color: '#113CCF',
    bgGradient: 'from-blue-600 to-blue-800',
    featured: false
  },
  {
    id: 'hbo',
    name: 'HBO Max',
    logo: 'HBO',
    color: '#9B00FF',
    bgGradient: 'from-purple-600 to-purple-800',
    featured: false
  },
  {
    id: 'hulu',
    name: 'Hulu',
    logo: 'H',
    color: '#1CE783',
    bgGradient: 'from-green-500 to-green-700',
    featured: false
  },
  {
    id: 'paramount',
    name: 'Paramount+',
    logo: 'P+',
    color: '#0064FF',
    bgGradient: 'from-blue-500 to-blue-700',
    featured: false
  },
  {
    id: 'peacock',
    name: 'Peacock',
    logo: 'PC',
    color: '#FF6C00',
    bgGradient: 'from-orange-500 to-orange-700',
    featured: false
  },
  {
    id: 'starz',
    name: 'Starz',
    logo: 'ST',
    color: '#000000',
    bgGradient: 'from-gray-800 to-black',
    featured: false
  },
  {
    id: 'discovery',
    name: 'Discovery+',
    logo: 'DC',
    color: '#0077B6',
    bgGradient: 'from-blue-600 to-blue-800',
    featured: false
  },
  {
    id: 'crunchyroll',
    name: 'Crunchyroll',
    logo: 'CR',
    color: '#FF6500',
    bgGradient: 'from-orange-500 to-orange-700',
    featured: false
  },
  {
    id: 'tubi',
    name: 'Tubi',
    logo: 'T',
    color: '#FA541C',
    bgGradient: 'from-orange-500 to-red-600',
    featured: false
  }
];

export default function ARVIMEDIA() {
  const [selectedPlatform, setSelectedPlatform] = useState<StreamingPlatform | null>(null);
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(100);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [showControls, setShowControls] = useState(false);

  const arvimediaContent: Content[] = [
    {
      id: '1',
      title: 'ARVIPOA: The Smart Future of Property Protection',
      description: 'Discover how ARVIPOA revolutionizes property management with cutting-edge Smart Pillar technology and comprehensive security solutions.',
      thumbnail: '/assets/Gen4 1 Opening The Smart Future of Property ProtectionWelcome to ARVIPOA – Africa\' a-2, 2106650483.png',
      duration: '5:00',
      rating: 4.9,
      year: 2025,
      genre: ['Technology', 'Documentary', 'Innovation'],
      type: 'documentary',
      platform: 'netflix',
      trending: true,
      featured: true,
      quality: ['4K', '1080p', '720p'],
      subtitles: ['English', 'Twi', 'Hausa', 'French'],
      cast: ['ARVIPOA Team', 'Property Experts']
    },
    {
      id: '2',
      title: 'Gen-4 Turbo Platform Demo',
      description: 'Experience the next generation of property management with ARVIPOA\'s advanced AI-powered platform.',
      thumbnail: '/assets/Gen4 1 Opening The Smart Future of Property ProtectionWelcome to ARVIPOA – Africa\' a-2, 2106650483.png',
      duration: '3:45',
      rating: 4.8,
      year: 2025,
      genre: ['Technology', 'Tutorial'],
      type: 'documentary',
      platform: 'prime',
      trending: true,
      featured: true,
      quality: ['4K', '1080p'],
      subtitles: ['English', 'Twi'],
      cast: ['Tech Specialists']
    },
    {
      id: '3',
      title: 'Smart Pillar Technology Explained',
      description: 'Deep dive into IoT monitoring, environmental controls, and security features of ARVIPOA Smart Pillars.',
      thumbnail: '/assets/Gen4 1 Opening The Smart Future of Property ProtectionWelcome to ARVIPOA – Africa\' a-2, 2106650483.png',
      duration: '4:20',
      rating: 4.7,
      year: 2025,
      genre: ['Technology', 'Education'],
      type: 'series',
      platform: 'youtube',
      trending: false,
      featured: false,
      quality: ['1080p', '720p'],
      subtitles: ['English', 'French'],
      cast: ['Engineering Team']
    }
  ];

  const [content, setContent] = useState<Content[]>(arvimediaContent);

  const featuredContent = content.filter(c => c.featured)[0];
  const trendingContent = content.filter(c => c.trending);

  const genres = ['all', 'Technology', 'Documentary', 'Innovation', 'Tutorial', 'Education'];

  const filteredContent = content.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || item.genre.includes(selectedGenre);
    const matchesPlatform = !selectedPlatform || item.platform === selectedPlatform.id;
    return matchesSearch && matchesGenre && matchesPlatform;
  });

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Home Screen - Platform Selection
  if (!selectedPlatform) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 p-8"
        >
          <div className="text-center mb-12">
            <h1 className="text-8xl font-bold bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-400 bg-clip-text text-transparent mb-4">
              ARVIMEDIA
            </h1>
            <div className="mb-6">
              <p className="text-2xl text-gray-300 font-light mb-2">FREE ON</p>
              <div className="bg-gradient-to-r from-green-600 to-cyan-600 text-white px-8 py-3 rounded-full text-xl font-bold inline-block shadow-2xl border border-green-400/50">
                🎉 FREE FOR ARVIPOA MEMBERS 🎉
              </div>
            </div>
          </div>

          {/* Streaming Platform Icons - Oval Style */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto">
              {streamingPlatforms.map((platform, index) => (
                <motion.div
                  key={platform.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedPlatform(platform)}
                  className="cursor-pointer group"
                >
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl border-2 border-cyan-400/50 backdrop-blur-sm transition-all duration-300 group-hover:border-cyan-300"
                    style={{ 
                      background: `linear-gradient(135deg, ${platform.color}15, ${platform.color}25)`,
                      boxShadow: `0 8px 32px ${platform.color}40`
                    }}
                  >
                    <span 
                      className="font-bold text-lg"
                      style={{ color: platform.color }}
                    >
                      {platform.logo}
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 text-center mt-2 group-hover:text-white transition-colors">
                    {platform.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Netflix-Style Video Player */}
          <div className="mb-12 max-w-7xl mx-auto">
            <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl border border-cyan-500/30">
              {/* Video Container */}
              <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-black">
                <video
                  className="w-full h-full object-cover"
                  poster="/assets/Gen4 1 Opening The Smart Future of Property ProtectionWelcome to ARVIPOA – Africa' a-2, 2106650483.png"
                  controls={false}
                  autoPlay
                  muted
                  loop
                >
                  <source src="/assets/Gen-3 Alpha Turbo 3093952672, Gen4  Scene 1 Openin, M 5.mp4" type="video/mp4" />
                  <source src="/assets/Gen-4 Turbo  4006709044.mp4" type="video/mp4" />
                </video>
                
                {/* Video Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Video Info */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="text-4xl font-bold text-white mb-2">ARVIPOA: The Smart Future</h2>
                  <p className="text-gray-300 text-lg mb-4 max-w-2xl">
                    Experience revolutionary property management with cutting-edge Smart Pillar technology
                  </p>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center gap-4 mb-4">
                    <Button className="bg-white text-black hover:bg-gray-200 font-semibold px-8 py-3">
                      <Play className="w-5 h-5 mr-2" />
                      Watch Now
                    </Button>
                    <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3">
                      <Plus className="w-5 h-5 mr-2" />
                      My List
                    </Button>
                  </div>
                  
                  {/* Interactive Icons */}
                  <div className="flex items-center gap-6">
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                    >
                      <ThumbsUp className="w-5 h-5" />
                      <span className="text-sm">Like</span>
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                    >
                      <div className="w-5 h-5 flex items-center justify-center">💬</div>
                      <span className="text-sm">Comment</span>
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                    >
                      <Star className="w-5 h-5" />
                      <span className="text-sm">Rate</span>
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                    >
                      <Share2 className="w-5 h-5" />
                      <span className="text-sm">Share</span>
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                    >
                      <Download className="w-5 h-5" />
                      <span className="text-sm">Download</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable Content Cards */}
          <div className="mb-12 max-w-7xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6">Trending on ARVIMEDIA</h3>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {arvimediaContent.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  onClick={() => setSelectedContent(item)}
                  className="flex-shrink-0 w-64 cursor-pointer group"
                >
                  <div className="relative rounded-xl overflow-hidden bg-gray-800 shadow-xl">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-36 object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = '/api/placeholder/300/200';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-3 left-3 right-3">
                        <h4 className="font-semibold text-white text-sm mb-1">{item.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-300">
                          <Star className="w-3 h-3 text-yellow-400" />
                          <span>{item.rating}</span>
                          <span>•</span>
                          <span>{item.duration}</span>
                        </div>
                      </div>
                    </div>
                    {item.trending && (
                      <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                        Trending
                      </div>
                    )}
                  </div>
                  <div className="mt-3 px-2">
                    <h4 className="font-semibold text-white text-sm mb-1 line-clamp-1">{item.title}</h4>
                    <p className="text-gray-400 text-xs line-clamp-2">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile App Download Section */}
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">Take ARVIMEDIA Everywhere</h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Download our mobile app for the ultimate streaming experience. Watch anywhere, anytime.
            </p>
            <div className="flex justify-center gap-6">
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-3 shadow-xl border border-white/20"
              >
                <div className="w-8 h-8 bg-white text-black rounded-lg flex items-center justify-center text-sm font-bold">
                  📱
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-300">Download on the</p>
                  <p className="font-semibold">App Store</p>
                </div>
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-3 shadow-xl border border-white/20"
              >
                <div className="w-8 h-8 bg-green-500 text-white rounded-lg flex items-center justify-center text-sm font-bold">
                  🤖
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-300">Get it on</p>
                  <p className="font-semibold">Google Play</p>
                </div>
              </motion.a>
            </div>
            <p className="text-cyan-400 text-sm mt-4 font-semibold">
              Explore more on the app • Download for free
            </p>
          </div>

          {/* Subtitle Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center"
          >
            <h3 className="text-3xl font-light text-gray-300 mb-8">
              Subtitles in local Ghanaian languages
            </h3>
            <div className="flex justify-center gap-4 text-lg text-gray-400">
              <span>English</span> • <span>Twi</span> • <span>Hausa</span> • <span>Ewe</span> • <span>French</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // Platform Interface
  return (
    <div className="min-h-screen bg-black text-white">
      {/* TV-Style Header */}
      <div className="bg-gradient-to-r from-gray-900 to-black p-4 border-b border-gray-800">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedPlatform(null)}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-3">
              <span className={`text-3xl`}>{selectedPlatform.logo}</span>
              <h1 className="text-2xl font-bold">{selectedPlatform.name}</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <User className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Button variant="ghost" className="text-cyan-400 hover:bg-cyan-400/10">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <TrendingUp className="w-4 h-4 mr-2" />
                Trending
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <Bookmark className="w-4 h-4 mr-2" />
                My List
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <Download className="w-4 h-4 mr-2" />
                Downloads
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                {genres.map(genre => (
                  <option key={genre} value={genre}>
                    {genre === 'all' ? 'All Genres' : genre}
                  </option>
                ))}
              </select>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('grid')}
                className="hover:bg-white/10"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('list')}
                className="hover:bg-white/10"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Hero Section */}
      {featuredContent && !selectedContent && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative h-96 overflow-hidden"
        >
          <img
            src={featuredContent.thumbnail}
            alt={featuredContent.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = '/api/placeholder/1920/1080';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-8 w-full">
              <div className="max-w-2xl">
                <h2 className="text-5xl font-bold mb-4">{featuredContent.title}</h2>
                <p className="text-xl text-gray-300 mb-6 line-clamp-3">{featuredContent.description}</p>
                <div className="flex items-center gap-4 mb-6">
                  <Badge className="bg-yellow-500 text-black">
                    <Star className="w-3 h-3 mr-1" />
                    {featuredContent.rating}
                  </Badge>
                  <span className="text-gray-300">{featuredContent.year}</span>
                  <span className="text-gray-300">{featuredContent.duration}</span>
                  <Badge className="bg-green-600">4K</Badge>
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    onClick={() => setSelectedContent(featuredContent)}
                    className="bg-white text-black hover:bg-gray-200 font-semibold px-8 py-3 text-lg"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Watch Now
                  </Button>
                  <Button variant="secondary" className="bg-gray-700/80 hover:bg-gray-600 px-8 py-3 text-lg">
                    <Plus className="w-5 h-5 mr-2" />
                    My List
                  </Button>
                  <Button variant="ghost" className="hover:bg-white/10 px-8 py-3 text-lg">
                    <Info className="w-5 h-5 mr-2" />
                    More Info
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Content Grid/List */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {!selectedContent && (
          <>
            {/* Trending Section */}
            {trendingContent.length > 0 && (
              <section className="mb-12">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-3 text-cyan-400" />
                  Trending Now
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {trendingContent.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      onClick={() => setSelectedContent(item)}
                      className="cursor-pointer group"
                    >
                      <div className="relative rounded-lg overflow-hidden bg-gray-800">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full aspect-video object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.src = '/api/placeholder/300/200';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                          <div className="flex items-center gap-2 text-xs text-gray-300">
                            <Star className="w-3 h-3 text-yellow-400" />
                            <span>{item.rating}</span>
                            <span>•</span>
                            <span>{item.duration}</span>
                          </div>
                        </div>
                        {item.trending && (
                          <Badge className="absolute top-2 left-2 bg-red-600 text-white text-xs">
                            Trending
                          </Badge>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* All Content */}
            <section>
              <h3 className="text-2xl font-bold mb-6">
                {selectedGenre === 'all' ? 'All Content' : selectedGenre}
              </h3>
              <div className={`grid gap-6 ${viewMode === 'grid' 
                ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' 
                : 'grid-cols-1'}`}>
                {filteredContent.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: viewMode === 'grid' ? 1.05 : 1.02 }}
                    onClick={() => setSelectedContent(item)}
                    className={`cursor-pointer group ${viewMode === 'list' ? 'flex gap-4' : ''}`}
                  >
                    <div className={`relative rounded-lg overflow-hidden bg-gray-800 ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full aspect-video object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = '/api/placeholder/300/200';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Play className="w-12 h-12 text-white" />
                      </div>
                    </div>
                    <div className={`${viewMode === 'list' ? 'flex-1' : 'mt-3'}`}>
                      <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                      {viewMode === 'list' && (
                        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{item.description}</p>
                      )}
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400" />
                          <span>{item.rating}</span>
                        </div>
                        <span>•</span>
                        <span>{item.year}</span>
                        <span>•</span>
                        <span>{item.duration}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {item.genre.slice(0, 3).map(genre => (
                          <Badge key={genre} variant="secondary" className="text-xs">
                            {genre}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* Video Player */}
        {selectedContent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div
              className="relative bg-black rounded-lg overflow-hidden"
              onMouseEnter={() => setShowControls(true)}
              onMouseLeave={() => setShowControls(false)}
            >
              {/* Video Container */}
              <div className="relative aspect-video">
                {isPlaying ? (
                  <video
                    className="w-full h-full object-cover"
                    controls={false}
                    autoPlay
                    muted={isMuted}
                    onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                    onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                  >
                    <source src={`/assets/Gen-3 Alpha Turbo 3093952672, Gen4  Scene 1 Openin, M 5.mp4`} type="video/mp4" />
                    <source src={`/assets/Gen-4 Turbo  4006709044.mp4`} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={selectedContent.thumbnail}
                    alt={selectedContent.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/api/placeholder/1920/1080';
                    }}
                  />
                )}

                {/* Play Overlay */}
                {!isPlaying && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Button
                      onClick={() => setIsPlaying(true)}
                      className="bg-white/90 hover:bg-white text-black rounded-full p-4"
                    >
                      <Play className="w-8 h-8" />
                    </Button>
                  </div>
                )}

                {/* Video Controls */}
                <AnimatePresence>
                  {(showControls || !isPlaying) && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"
                    >
                      {/* Top Controls */}
                      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                        <Button
                          variant="ghost"
                          onClick={() => setSelectedContent(null)}
                          className="text-white hover:bg-white/20"
                        >
                          <ArrowLeft className="w-5 h-5 mr-2" />
                          Back
                        </Button>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                            <Cast className="w-5 h-5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                            <Settings className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>

                      {/* Bottom Controls */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="bg-gray-600 h-1 rounded-full overflow-hidden">
                            <div 
                              className="bg-cyan-400 h-full transition-all duration-300"
                              style={{ width: `${(currentTime / duration) * 100}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setIsPlaying(!isPlaying)}
                              className="text-white hover:bg-white/20"
                            >
                              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                            </Button>
                            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                              <SkipBack className="w-5 h-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                              <SkipForward className="w-5 h-5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setIsMuted(!isMuted)}
                              className="text-white hover:bg-white/20"
                            >
                              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                            </Button>
                            <span className="text-white text-sm">
                              {formatTime(Math.floor(currentTime))} / {formatTime(Math.floor(duration))}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <select className="bg-black/50 text-white text-sm rounded px-2 py-1 border border-gray-600">
                              <option>Auto (English)</option>
                              {selectedContent.subtitles.map(lang => (
                                <option key={lang} value={lang}>{lang}</option>
                              ))}
                            </select>
                            <select className="bg-black/50 text-white text-sm rounded px-2 py-1 border border-gray-600">
                              {selectedContent.quality.map(quality => (
                                <option key={quality} value={quality}>{quality}</option>
                              ))}
                            </select>
                            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                              <Maximize className="w-5 h-5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Video Info */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h1 className="text-3xl font-bold mb-4">{selectedContent.title}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <Badge className="bg-yellow-500 text-black">
                    <Star className="w-3 h-3 mr-1" />
                    {selectedContent.rating}
                  </Badge>
                  <span className="text-gray-400">{selectedContent.year}</span>
                  <span className="text-gray-400">{selectedContent.duration}</span>
                  <Badge className="bg-green-600">4K</Badge>
                  <Badge variant="outline">{selectedContent.type}</Badge>
                </div>
                <p className="text-gray-300 text-lg mb-6">{selectedContent.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedContent.genre.map(genre => (
                    <Badge key={genre} variant="secondary">
                      {genre}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <Button className="bg-cyan-600 hover:bg-cyan-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add to My List
                  </Button>
                  <Button variant="outline">
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    Like
                  </Button>
                  <Button variant="outline">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Cast & Crew</h3>
                <div className="space-y-2 text-gray-300">
                  {selectedContent.cast.map((person, index) => (
                    <div key={index}>{person}</div>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-4">Available Subtitles</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedContent.subtitles.map(lang => (
                    <Badge key={lang} variant="outline">{lang}</Badge>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-4">Quality Options</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedContent.quality.map(quality => (
                    <Badge key={quality} className="bg-green-600">{quality}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}