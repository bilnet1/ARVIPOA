import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  ThumbsUp, 
  ThumbsDown, 
  MessageCircle, 
  Share2, 
  Bookmark,
  Star,
  Clock,
  Eye,
  Users,
  Filter,
  Search,
  Grid,
  List,
  TrendingUp,
  Award,
  Calendar,
  User,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  Download,
  Flag
} from 'lucide-react';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  uploadDate: string;
  views: number;
  likes: number;
  dislikes: number;
  comments: number;
  creator: {
    name: string;
    avatar: string;
    verified: boolean;
    subscribers: number;
  };
  category: string;
  tags: string[];
  rating: number;
  quality: string[];
  featured: boolean;
  trending: boolean;
  premium: boolean;
}

interface Comment {
  id: string;
  author: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: number;
}

export default function ARVICINEVideoPlatform() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('trending');
  const [comments, setComments] = useState<Comment[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const categories = [
    'All', 'Property Tours', 'Investment Tips', 'Market Analysis', 
    'Security Features', 'Community Stories', 'Educational', 'Documentary'
  ];

  useEffect(() => {
    // ARVIPOA official video content
    const arvipioaVideos: Video[] = [
      {
        id: '1',
        title: 'The Smart Future of Property Protection - ARVIPOA Gen4',
        description: 'Welcome to ARVIPOA – Africa\'s leading smart property protection platform. Discover the future of property management with cutting-edge technology.',
        thumbnail: '/assets/Gen4 1 Opening The Smart Future of Property ProtectionWelcome to ARVIPOA – Africa\' a-2, 2106650483.png',
        duration: '5:00',
        uploadDate: '2025-01-05',
        views: 125000,
        likes: 5420,
        dislikes: 89,
        comments: 1567,
        creator: {
          name: 'ARVIPOA Official',
          avatar: '/assets/arvipoa upgraded logo.png',
          verified: true,
          subscribers: 289000
        },
        category: 'Property Tours',
        tags: ['arvipoa', 'gen4', 'property protection', 'smart technology'],
        rating: 4.9,
        quality: ['720p', '1080p', '4K'],
        featured: true,
        trending: true,
        premium: false
      },
      {
        id: '2',
        title: 'ARVIPOA Gen-4 Turbo Platform Demo',
        description: 'Experience the next generation of property management with ARVIPOA\'s advanced AI-powered platform featuring comprehensive monitoring and control.',
        thumbnail: '/assets/Gen4 1 Opening The Smart Future of Property ProtectionWelcome to ARVIPOA – Africa\' a-2, 2106650483.png',
        duration: '3:45',
        uploadDate: '2025-01-04',
        views: 167000,
        likes: 4100,
        dislikes: 45,
        comments: 834,
        creator: {
          name: 'ARVIPOA Official',
          avatar: '/assets/arvipoa upgraded logo.png',
          verified: true,
          subscribers: 289000
        },
        category: 'Security Features',
        tags: ['arvipoa', 'gen4 turbo', 'platform demo', 'AI technology'],
        rating: 4.8,
        quality: ['1080p', '4K'],
        featured: true,
        trending: true,
        premium: false
      },
      {
        id: '3',
        title: 'Smart Pillar Technology Overview',
        description: 'Learn how ARVIPOA\'s Smart Pillars provide comprehensive property protection with IoT monitoring, environmental controls, and security features.',
        thumbnail: '/assets/Gen4 1 Opening The Smart Future of Property ProtectionWelcome to ARVIPOA – Africa\' a-2, 2106650483.png',
        duration: '4:20',
        uploadDate: '2025-01-03',
        views: 189000,
        likes: 6800,
        dislikes: 32,
        comments: 2445,
        creator: {
          name: 'ARVIPOA Official',
          avatar: '/assets/arvipoa upgraded logo.png',
          verified: true,
          subscribers: 289000
        },
        category: 'Security Features',
        tags: ['smart pillar', 'iot', 'monitoring', 'property security'],
        rating: 4.9,
        quality: ['720p', '1080p', '4K'],
        featured: true,
        trending: false,
        premium: false
      },
      {
        id: '4',
        title: 'ARVIPOA Property Investment Solutions',
        description: 'Discover how ARVIPOA revolutionizes property investment with cutting-edge technology, comprehensive analytics, and secure transaction systems.',
        thumbnail: '/assets/Gen4 1 Opening The Smart Future of Property ProtectionWelcome to ARVIPOA – Africa\' a-2, 2106650483.png',
        duration: '5:45',
        uploadDate: '2025-01-02',
        views: 154000,
        likes: 3650,
        dislikes: 78,
        comments: 1189,
        creator: {
          name: 'ARVIPOA Official',
          avatar: '/assets/arvipoa upgraded logo.png',
          verified: true,
          subscribers: 289000
        },
        category: 'Investment Tips',
        tags: ['investment', 'analytics', 'secure transactions', 'property management'],
        rating: 4.7,
        quality: ['720p', '1080p'],
        featured: false,
        trending: true,
        premium: false
      },
      {
        id: '5',
        title: 'ARVIPOA Platform Introduction',
        description: 'Complete overview of ARVIPOA\'s comprehensive property management ecosystem featuring Smart Pillars, Foreign Bird payments, and RBFS integration.',
        thumbnail: '/assets/Gen4 1 Opening The Smart Future of Property ProtectionWelcome to ARVIPOA – Africa\' a-2, 2106650483.png',
        duration: '3:50',
        uploadDate: '2025-01-01',
        views: 232000,
        likes: 7200,
        dislikes: 15,
        comments: 3098,
        creator: {
          name: 'ARVIPOA Official',
          avatar: '/assets/arvipoa upgraded logo.png',
          verified: true,
          subscribers: 289000
        },
        category: 'Educational',
        tags: ['arvipoa', 'platform', 'ecosystem', 'comprehensive'],
        rating: 4.9,
        quality: ['720p', '1080p', '4K'],
        featured: false,
        trending: true,
        premium: false
      }
    ];

    setVideos(arvipioaVideos);
    setSelectedVideo(arvipioaVideos[0]);

    const mockComments: Comment[] = [
      {
        id: '1',
        author: 'John Mensah',
        authorAvatar: '/api/placeholder/30/30',
        content: 'This is incredibly helpful! I\'ve been looking for comprehensive investment advice for the Ghanaian market.',
        timestamp: '2 hours ago',
        likes: 34,
        replies: 5
      },
      {
        id: '2',
        author: 'Sarah Osei',
        authorAvatar: '/api/placeholder/30/30',
        content: 'The virtual tour quality is amazing! When will you be covering properties in Tema?',
        timestamp: '4 hours ago',
        likes: 28,
        replies: 3
      },
      {
        id: '3',
        author: 'Kwame Asante',
        authorAvatar: '/api/placeholder/30/30',
        content: 'ARVIPOA\'s smart pillar technology is revolutionary. Already planning to install one on my property.',
        timestamp: '6 hours ago',
        likes: 45,
        replies: 8
      }
    ];

    setVideos(arvipioaVideos);
    setComments(mockComments);
  }, []);

  const filteredVideos = videos.filter(video => {
    const matchesCategory = selectedCategory === 'all' || 
                           video.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const sortedVideos = [...filteredVideos].sort((a, b) => {
    switch (sortBy) {
      case 'trending': return (b.trending ? 1 : 0) - (a.trending ? 1 : 0);
      case 'views': return b.views - a.views;
      case 'rating': return b.rating - a.rating;
      case 'recent': return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
      default: return 0;
    }
  });

  const handleLike = (videoId: string) => {
    setVideos(vids => 
      vids.map(vid => 
        vid.id === videoId 
          ? { ...vid, likes: vid.likes + 1 }
          : vid
      )
    );
  };

  const handleDislike = (videoId: string) => {
    setVideos(vids => 
      vids.map(vid => 
        vid.id === videoId 
          ? { ...vid, dislikes: vid.dislikes + 1 }
          : vid
      )
    );
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black text-white">
      {/* Header */}
      <div className="bg-black/50 border-b border-red-500/30 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-red-400 mb-2 flex items-center">
            <Play className="w-10 h-10 mr-3 fill-current" />
            ARVICINE
          </h1>
          <p className="text-gray-300">Premium video content for property professionals and enthusiasts</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Featured Video Banner */}
        {videos.filter(v => v.featured).length > 0 && (
          <div className="mb-8">
            <Card className="bg-gradient-to-r from-red-600/20 to-black/50 border-red-500/30 overflow-hidden">
              <div className="relative">
                <img 
                  src={videos.filter(v => v.featured)[0].thumbnail} 
                  alt="Featured video"
                  className="w-full h-96 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/api/placeholder/1200/400';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center mb-4">
                    <Badge className="bg-red-600 text-white mr-3">Featured</Badge>
                    {videos.filter(v => v.featured)[0].premium && (
                      <Badge className="bg-yellow-500 text-black mr-3">Premium</Badge>
                    )}
                    <Badge className="bg-black/50 text-white">
                      <Clock className="w-3 h-3 mr-1" />
                      {videos.filter(v => v.featured)[0].duration}
                    </Badge>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-3">
                    {videos.filter(v => v.featured)[0].title}
                  </h2>
                  <p className="text-gray-200 mb-4 max-w-2xl">
                    {videos.filter(v => v.featured)[0].description}
                  </p>
                  <div className="flex items-center space-x-4">
                    <Button 
                      className="bg-red-600 hover:bg-red-700 text-white px-8 py-3"
                      onClick={() => setSelectedVideo(videos.filter(v => v.featured)[0])}
                    >
                      <Play className="w-5 h-5 mr-2 fill-current" />
                      Watch Now
                    </Button>
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                      <Bookmark className="w-4 h-4 mr-2" />
                      Add to Watchlist
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Search and Filters */}
        <Card className="bg-black/50 border-gray-700 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search videos, creators, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white"
                >
                  {categories.map(category => (
                    <option key={category} value={category.toLowerCase()}>
                      {category}
                    </option>
                  ))}
                </select>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white"
                >
                  <option value="trending">Trending</option>
                  <option value="views">Most Viewed</option>
                  <option value="rating">Highest Rated</option>
                  <option value="recent">Most Recent</option>
                </select>

                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-red-600' : 'border-gray-600 text-gray-300'}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-red-600' : 'border-gray-600 text-gray-300'}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Videos Grid/List */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            : 'grid-cols-1'
        }`}>
          {sortedVideos.map((video) => (
            <Card key={video.id} className="bg-black/50 border-gray-700 overflow-hidden hover:border-red-500/50 transition-colors group cursor-pointer"
                  onClick={() => setSelectedVideo(video)}>
              <div className="relative">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                  onError={(e) => {
                    e.currentTarget.src = '/api/placeholder/400/225';
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button className="bg-red-600 hover:bg-red-700 rounded-full p-3">
                      <Play className="w-6 h-6 fill-current" />
                    </Button>
                  </div>
                </div>
                
                {/* Overlays */}
                <div className="absolute top-2 left-2 flex space-x-1">
                  {video.trending && (
                    <Badge className="bg-red-600 text-white text-xs">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Trending
                    </Badge>
                  )}
                  {video.premium && (
                    <Badge className="bg-yellow-500 text-black text-xs">Premium</Badge>
                  )}
                </div>
                
                <div className="absolute bottom-2 right-2">
                  <Badge className="bg-black/70 text-white text-xs">
                    {video.duration}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <img 
                    src={video.creator.avatar} 
                    alt={video.creator.name}
                    className="w-8 h-8 rounded-full"
                    onError={(e) => {
                      e.currentTarget.src = '/api/placeholder/40/40';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white line-clamp-2 mb-1 group-hover:text-red-400 transition-colors">
                      {video.title}
                    </h3>
                    
                    <div className="flex items-center text-gray-400 text-sm mb-2">
                      <span>{video.creator.name}</span>
                      {video.creator.verified && (
                        <Badge className="ml-1 bg-blue-600 text-white text-xs p-0 w-4 h-4 flex items-center justify-center">
                          ✓
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-4 text-gray-400 text-sm">
                      <span className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        {formatNumber(video.views)}
                      </span>
                      <span className="flex items-center">
                        <ThumbsUp className="w-3 h-3 mr-1" />
                        {formatNumber(video.likes)}
                      </span>
                      <span>{formatDate(video.uploadDate)}</span>
                    </div>

                    <div className="flex items-center mt-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3 h-3 ${i < Math.floor(video.rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-gray-400 text-xs ml-2">{video.rating}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Video Player Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50">
            <div className="w-full h-full max-w-7xl p-4 flex flex-col">
              {/* Video Player */}
              <div className="flex-1 bg-black rounded-lg overflow-hidden mb-4">
                <div className="relative aspect-video">
                  <img 
                    src={selectedVideo.thumbnail} 
                    alt={selectedVideo.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/api/placeholder/1200/675';
                    }}
                  />
                  
                  {/* Video Controls Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                    <div className="absolute bottom-4 left-4 right-4">
                      {/* Progress Bar */}
                      <div className="w-full bg-gray-600 h-1 rounded-full mb-4">
                        <div className="bg-red-600 h-1 rounded-full" style={{width: '35%'}}></div>
                      </div>
                      
                      {/* Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Button 
                            className="bg-transparent hover:bg-black/50 p-2"
                            onClick={() => setIsPlaying(!isPlaying)}
                          >
                            {isPlaying ? 
                              <Pause className="w-6 h-6 text-white" /> : 
                              <Play className="w-6 h-6 text-white fill-current" />
                            }
                          </Button>
                          <Button 
                            className="bg-transparent hover:bg-black/50 p-2"
                            onClick={() => setIsMuted(!isMuted)}
                          >
                            {isMuted ? 
                              <VolumeX className="w-5 h-5 text-white" /> : 
                              <Volume2 className="w-5 h-5 text-white" />
                            }
                          </Button>
                          <span className="text-white text-sm">15:32 / {selectedVideo.duration}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <select className="bg-black/50 border border-gray-600 rounded px-2 py-1 text-white text-sm">
                            {selectedVideo.quality.map(quality => (
                              <option key={quality} value={quality}>{quality}</option>
                            ))}
                          </select>
                          <Button className="bg-transparent hover:bg-black/50 p-2">
                            <Settings className="w-5 h-5 text-white" />
                          </Button>
                          <Button className="bg-transparent hover:bg-black/50 p-2">
                            <Maximize className="w-5 h-5 text-white" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Info and Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Video Info */}
                <div className="lg:col-span-2">
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold text-white">{selectedVideo.title}</h1>
                    <Button 
                      variant="outline"
                      onClick={() => setSelectedVideo(null)}
                      className="border-gray-600 text-gray-300"
                    >
                      Close
                    </Button>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={selectedVideo.creator.avatar} 
                        alt={selectedVideo.creator.name}
                        className="w-12 h-12 rounded-full"
                        onError={(e) => {
                          e.currentTarget.src = '/api/placeholder/40/40';
                        }}
                      />
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-semibold text-white">{selectedVideo.creator.name}</h3>
                          {selectedVideo.creator.verified && (
                            <Badge className="ml-2 bg-blue-600 text-white">Verified</Badge>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm">
                          {formatNumber(selectedVideo.creator.subscribers)} subscribers
                        </p>
                      </div>
                    </div>
                    <Button className="bg-red-600 hover:bg-red-700">Subscribe</Button>
                  </div>

                  <div className="flex items-center space-x-6 mb-6">
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline"
                        onClick={() => handleLike(selectedVideo.id)}
                        className="border-gray-600 text-gray-300"
                      >
                        <ThumbsUp className="w-4 h-4 mr-2" />
                        {formatNumber(selectedVideo.likes)}
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => handleDislike(selectedVideo.id)}
                        className="border-gray-600 text-gray-300"
                      >
                        <ThumbsDown className="w-4 h-4 mr-2" />
                        {formatNumber(selectedVideo.dislikes)}
                      </Button>
                    </div>
                    
                    <Button variant="outline" className="border-gray-600 text-gray-300">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                    
                    <Button variant="outline" className="border-gray-600 text-gray-300">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    
                    <Button variant="outline" className="border-gray-600 text-gray-300">
                      <Flag className="w-4 h-4 mr-2" />
                      Report
                    </Button>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
                    <div className="flex items-center space-x-4 mb-2 text-sm text-gray-400">
                      <span>{formatNumber(selectedVideo.views)} views</span>
                      <span>{formatDate(selectedVideo.uploadDate)}</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        {selectedVideo.rating}
                      </div>
                    </div>
                    <p className="text-gray-300">{selectedVideo.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-3">
                      {selectedVideo.tags.map((tag, index) => (
                        <Badge key={index} className="bg-gray-700 text-gray-300">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Comments Section */}
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Comments ({selectedVideo.comments})
                    </h3>
                    
                    <div className="flex space-x-3 mb-6">
                      <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-purple-500 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        className="flex-1 p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
                      />
                      <Button className="bg-red-600 hover:bg-red-700">
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {comments.map((comment) => (
                        <div key={comment.id} className="flex space-x-3">
                          <img 
                            src={comment.authorAvatar} 
                            alt={comment.author}
                            className="w-8 h-8 rounded-full"
                            onError={(e) => {
                              e.currentTarget.src = '/api/placeholder/30/30';
                            }}
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-semibold text-white text-sm">{comment.author}</span>
                              <span className="text-gray-400 text-xs">{comment.timestamp}</span>
                            </div>
                            <p className="text-gray-300 text-sm mb-2">{comment.content}</p>
                            <div className="flex items-center space-x-4 text-xs text-gray-400">
                              <button className="hover:text-red-400">
                                <ThumbsUp className="w-3 h-3 inline mr-1" />
                                {comment.likes}
                              </button>
                              <button className="hover:text-blue-400">Reply</button>
                              {comment.replies > 0 && (
                                <span>{comment.replies} replies</span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar - Related Videos */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Up Next</h3>
                  <div className="space-y-3">
                    {videos.filter(v => v.id !== selectedVideo.id).slice(0, 5).map((video) => (
                      <div key={video.id} className="flex space-x-3 cursor-pointer hover:bg-gray-800/50 rounded-lg p-2"
                           onClick={() => setSelectedVideo(video)}>
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="w-20 h-12 object-cover rounded"
                          onError={(e) => {
                            e.currentTarget.src = '/api/placeholder/160/90';
                          }}
                        />
                        <div className="flex-1">
                          <h4 className="text-white text-sm font-medium line-clamp-2 mb-1">
                            {video.title}
                          </h4>
                          <p className="text-gray-400 text-xs">{video.creator.name}</p>
                          <div className="flex items-center space-x-2 text-gray-400 text-xs">
                            <span>{formatNumber(video.views)} views</span>
                            <span>•</span>
                            <span>{formatDate(video.uploadDate)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}