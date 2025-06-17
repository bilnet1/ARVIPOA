import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Video, 
  MessageCircle, 
  Heart, 
  Share2, 
  Send,
  Camera,
  Mic,
  MicOff,
  VideoOff,
  MoreHorizontal,
  Bell,
  Settings,
  Search,
  Plus,
  Clock,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Flag,
  User
} from 'lucide-react';

interface LiveStream {
  id: string;
  title: string;
  streamer: string;
  streamerAvatar: string;
  viewers: number;
  duration: string;
  category: string;
  thumbnail: string;
  isLive: boolean;
  likes: number;
  dislikes: number;
}

interface CommunityPost {
  id: string;
  author: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  media?: {
    type: 'image' | 'video';
    url: string;
  };
  verified: boolean;
}

interface Comment {
  id: string;
  author: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
  likes: number;
}

export default function CommunitySocialHub() {
  const [activeTab, setActiveTab] = useState<'feed' | 'live' | 'gist'>('feed');
  const [liveStreams, setLiveStreams] = useState<LiveStream[]>([]);
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null);
  const [postContent, setPostContent] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    // Mock live streams data
    const mockStreams: LiveStream[] = [
      {
        id: '1',
        title: 'Property Investment Tips for Beginners',
        streamer: 'Dr. Sarah Mensah',
        streamerAvatar: '/api/placeholder/40/40',
        viewers: 234,
        duration: '45:32',
        category: 'Education',
        thumbnail: '/api/placeholder/320/180',
        isLive: true,
        likes: 89,
        dislikes: 3
      },
      {
        id: '2',
        title: 'Live Tour: Modern Homes in East Legon',
        streamer: 'RealEstate Ghana',
        streamerAvatar: '/api/placeholder/40/40',
        viewers: 156,
        duration: '23:15',
        category: 'Real Estate',
        thumbnail: '/api/placeholder/320/180',
        isLive: true,
        likes: 67,
        dislikes: 1
      },
      {
        id: '3',
        title: 'Community Q&A: Property Security',
        streamer: 'Security Expert GH',
        streamerAvatar: '/api/placeholder/40/40',
        viewers: 89,
        duration: '12:45',
        category: 'Security',
        thumbnail: '/api/placeholder/320/180',
        isLive: true,
        likes: 45,
        dislikes: 0
      }
    ];

    // Mock community posts
    const mockPosts: CommunityPost[] = [
      {
        id: '1',
        author: 'Kwame Asante',
        authorAvatar: '/api/placeholder/40/40',
        content: 'Just registered my property with ARVIPOA! The process was incredibly smooth and the smart pillar installation is happening next week. Excited about the enhanced security features! 🏠🔒',
        timestamp: '2 hours ago',
        likes: 24,
        comments: 8,
        shares: 3,
        media: {
          type: 'image',
          url: '/api/placeholder/500/300'
        },
        verified: true
      },
      {
        id: '2',
        author: 'Ama Osei',
        authorAvatar: '/api/placeholder/40/40',
        content: 'Hosting a property viewing this Saturday at 2 PM in Airport Residential. Modern 3-bedroom apartment with all amenities. DM for details! #PropertyForRent #AccraRealEstate',
        timestamp: '4 hours ago',
        likes: 45,
        comments: 12,
        shares: 7,
        verified: false
      },
      {
        id: '3',
        author: 'Property Expert GH',
        authorAvatar: '/api/placeholder/40/40',
        content: 'Market update: Property prices in Greater Accra have shown steady growth this quarter. Key factors include improved infrastructure and increased foreign investment. What are your thoughts on the current market trends?',
        timestamp: '6 hours ago',
        likes: 78,
        comments: 23,
        shares: 15,
        media: {
          type: 'video',
          url: '/api/placeholder/500/300'
        },
        verified: true
      }
    ];

    // Mock comments
    const mockComments: Comment[] = [
      {
        id: '1',
        author: 'John Smith',
        authorAvatar: '/api/placeholder/30/30',
        content: 'This is really helpful! Thanks for sharing your experience.',
        timestamp: '1 hour ago',
        likes: 5
      },
      {
        id: '2',
        author: 'Grace Mensah',
        authorAvatar: '/api/placeholder/30/30',
        content: 'I\'m considering ARVIPOA for my property too. How long did the whole process take?',
        timestamp: '45 minutes ago',
        likes: 3
      }
    ];

    setLiveStreams(mockStreams);
    setCommunityPosts(mockPosts);
    setComments(mockComments);
  }, []);

  const handleLike = (postId: string) => {
    setCommunityPosts(posts => 
      posts.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes + 1 }
          : post
      )
    );
  };

  const handleShare = (postId: string) => {
    setCommunityPosts(posts => 
      posts.map(post => 
        post.id === postId 
          ? { ...post, shares: post.shares + 1 }
          : post
      )
    );
  };

  const createPost = () => {
    if (postContent.trim()) {
      const newPost: CommunityPost = {
        id: Date.now().toString(),
        author: 'You',
        authorAvatar: '/api/placeholder/40/40',
        content: postContent,
        timestamp: 'Just now',
        likes: 0,
        comments: 0,
        shares: 0,
        verified: false
      };
      setCommunityPosts([newPost, ...communityPosts]);
      setPostContent('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 text-white">
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-purple-500/30 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-purple-400 mb-2 flex items-center">
            <Users className="w-8 h-8 mr-3" />
            ARVIPOA Community Hub
          </h1>
          <p className="text-gray-300">Connect, share, and engage with your community</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-slate-800/50 p-1 rounded-xl">
          {[
            { key: 'feed', label: 'Community Feed', icon: MessageCircle },
            { key: 'live', label: 'Live Streams', icon: Video },
            { key: 'gist', label: 'Quick Gist', icon: Bell }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`flex-1 flex items-center justify-center py-3 px-6 rounded-lg transition-colors ${
                activeTab === key
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Icon className="w-5 h-5 mr-2" />
              {label}
            </button>
          ))}
        </div>

        {/* Community Feed */}
        {activeTab === 'feed' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Feed */}
            <div className="lg:col-span-2 space-y-6">
              {/* Create Post */}
              <Card className="bg-slate-800/50 border-purple-500/30">
                <CardContent className="p-6">
                  <div className="flex space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <textarea
                        placeholder="Share something with your community..."
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        className="w-full p-4 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 resize-none"
                        rows={3}
                      />
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex space-x-2">
                          <Button variant="outline" className="border-gray-600 text-gray-300">
                            <Camera className="w-4 h-4 mr-2" />
                            Photo
                          </Button>
                          <Button variant="outline" className="border-gray-600 text-gray-300">
                            <Video className="w-4 h-4 mr-2" />
                            Video
                          </Button>
                        </div>
                        <Button 
                          onClick={createPost}
                          disabled={!postContent.trim()}
                          className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Post
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Posts Feed */}
              {communityPosts.map((post) => (
                <Card key={post.id} className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={post.authorAvatar} 
                          alt={post.author}
                          className="w-12 h-12 rounded-full"
                          onError={(e) => {
                            e.currentTarget.src = '/api/placeholder/40/40';
                          }}
                        />
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-semibold text-white">{post.author}</h3>
                            {post.verified && (
                              <Badge className="ml-2 bg-blue-600 text-white text-xs">Verified</Badge>
                            )}
                          </div>
                          <p className="text-gray-400 text-sm">{post.timestamp}</p>
                        </div>
                      </div>
                      <Button variant="outline" className="border-gray-600 text-gray-300 p-2">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>

                    <p className="text-gray-300 mb-4 leading-relaxed">{post.content}</p>

                    {post.media && (
                      <div className="mb-4 rounded-lg overflow-hidden">
                        {post.media.type === 'image' ? (
                          <img 
                            src={post.media.url} 
                            alt="Post media"
                            className="w-full h-64 object-cover cursor-pointer"
                            onClick={() => setSelectedPost(post)}
                            onError={(e) => {
                              e.currentTarget.src = '/api/placeholder/500/300';
                            }}
                          />
                        ) : (
                          <div className="relative">
                            <img 
                              src={post.media.url} 
                              alt="Video thumbnail"
                              className="w-full h-64 object-cover"
                              onError={(e) => {
                                e.currentTarget.src = '/api/placeholder/500/300';
                              }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                              <Button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm">
                                <Video className="w-8 h-8" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                      <div className="flex space-x-6">
                        <button 
                          onClick={() => handleLike(post.id)}
                          className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <Heart className="w-5 h-5" />
                          <span>{post.likes}</span>
                        </button>
                        <button 
                          onClick={() => setSelectedPost(post)}
                          className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors"
                        >
                          <MessageCircle className="w-5 h-5" />
                          <span>{post.comments}</span>
                        </button>
                        <button 
                          onClick={() => handleShare(post.id)}
                          className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-colors"
                        >
                          <Share2 className="w-5 h-5" />
                          <span>{post.shares}</span>
                        </button>
                      </div>
                      <Button variant="outline" className="border-gray-600 text-gray-300 text-sm">
                        <Flag className="w-4 h-4 mr-1" />
                        Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Online Friends */}
              <Card className="bg-slate-800/50 border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Online Now ({23})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      'Sarah Mensah', 'Kwame Asante', 'Ama Osei', 'John Smith', 'Grace Darko'
                    ].map((name, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">{name[0]}</span>
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-slate-800 rounded-full"></div>
                        </div>
                        <span className="text-gray-300 text-sm">{name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Trending Topics */}
              <Card className="bg-slate-800/50 border-yellow-500/30">
                <CardHeader>
                  <CardTitle className="text-yellow-400">Trending in Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      '#PropertySecurity',
                      '#RealEstateGhana',
                      '#SmartHomes',
                      '#PropertyInvestment',
                      '#CommunityUpdates'
                    ].map((hashtag, index) => (
                      <div key={index} className="p-2 bg-slate-700/30 rounded-lg cursor-pointer hover:bg-slate-700/50">
                        <span className="text-yellow-400 font-medium">{hashtag}</span>
                        <div className="text-gray-400 text-xs mt-1">
                          {Math.floor(Math.random() * 500) + 50} posts
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Live Streams */}
        {activeTab === 'live' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Live Streams</h2>
              <Button className="bg-red-600 hover:bg-red-700">
                <Video className="w-4 h-4 mr-2" />
                Go Live
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveStreams.map((stream) => (
                <Card key={stream.id} className="bg-slate-800/50 border-red-500/30 overflow-hidden">
                  <div className="relative">
                    <img 
                      src={stream.thumbnail} 
                      alt={stream.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/api/placeholder/320/180';
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-red-600 text-white animate-pulse">
                        🔴 LIVE
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-black/70 text-white">
                        <Eye className="w-3 h-3 mr-1" />
                        {stream.viewers}
                      </Badge>
                    </div>
                    <div className="absolute bottom-3 right-3">
                      <Badge className="bg-black/70 text-white">
                        <Clock className="w-3 h-3 mr-1" />
                        {stream.duration}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <h3 className="font-semibold text-white mb-2 line-clamp-2">{stream.title}</h3>
                    
                    <div className="flex items-center space-x-3 mb-3">
                      <img 
                        src={stream.streamerAvatar} 
                        alt={stream.streamer}
                        className="w-8 h-8 rounded-full"
                        onError={(e) => {
                          e.currentTarget.src = '/api/placeholder/40/40';
                        }}
                      />
                      <div className="flex-1">
                        <div className="text-gray-300 text-sm">{stream.streamer}</div>
                        <div className="text-gray-500 text-xs">{stream.category}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span className="flex items-center">
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          {stream.likes}
                        </span>
                        <span className="flex items-center">
                          <ThumbsDown className="w-4 h-4 mr-1" />
                          {stream.dislikes}
                        </span>
                      </div>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        Watch
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Quick Gist (WhatsApp-style updates) */}
        {activeTab === 'gist' && (
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-4">Community Gist</h2>
              <Card className="bg-slate-800/50 border-blue-500/30">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center cursor-pointer">
                      <Plus className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Add to your gist</h3>
                      <p className="text-gray-400 text-sm">Share a quick update with your community</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              {[
                {
                  name: 'Property Updates GH',
                  avatar: '/api/placeholder/60/60',
                  time: '2h ago',
                  hasStory: true,
                  stories: ['New property listings in Tema', 'Market analysis update']
                },
                {
                  name: 'Security Alerts',
                  avatar: '/api/placeholder/60/60',
                  time: '4h ago',
                  hasStory: true,
                  stories: ['Community patrol schedule', 'Safety tips for property owners']
                },
                {
                  name: 'ARVIPOA News',
                  avatar: '/api/placeholder/60/60',
                  time: '6h ago',
                  hasStory: true,
                  stories: ['Platform updates', 'New features announced']
                }
              ].map((gist, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className={`w-16 h-16 rounded-full p-1 ${gist.hasStory ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-600'}`}>
                          <img 
                            src={gist.avatar} 
                            alt={gist.name}
                            className="w-full h-full rounded-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = '/api/placeholder/60/60';
                            }}
                          />
                        </div>
                        {gist.hasStory && (
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-slate-800 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">{gist.stories.length}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold">{gist.name}</h3>
                        <p className="text-gray-400 text-sm">{gist.time}</p>
                        {gist.stories.length > 0 && (
                          <div className="mt-2">
                            <p className="text-gray-300 text-sm">{gist.stories[0]}</p>
                            {gist.stories.length > 1 && (
                              <p className="text-gray-500 text-xs">+{gist.stories.length - 1} more updates</p>
                            )}
                          </div>
                        )}
                      </div>
                      <Button variant="outline" className="border-gray-600 text-gray-300">
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Post Detail Modal */}
        {selectedPost && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Post Details</h2>
                  <Button 
                    variant="outline"
                    onClick={() => setSelectedPost(null)}
                    className="border-gray-600 text-gray-300"
                  >
                    Close
                  </Button>
                </div>

                {/* Original Post */}
                <div className="mb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <img 
                      src={selectedPost.authorAvatar} 
                      alt={selectedPost.author}
                      className="w-12 h-12 rounded-full"
                      onError={(e) => {
                        e.currentTarget.src = '/api/placeholder/40/40';
                      }}
                    />
                    <div>
                      <h3 className="font-semibold text-white">{selectedPost.author}</h3>
                      <p className="text-gray-400 text-sm">{selectedPost.timestamp}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">{selectedPost.content}</p>
                  {selectedPost.media && (
                    <img 
                      src={selectedPost.media.url} 
                      alt="Post media"
                      className="w-full rounded-lg mb-4"
                      onError={(e) => {
                        e.currentTarget.src = '/api/placeholder/500/300';
                      }}
                    />
                  )}
                </div>

                {/* Comments Section */}
                <div className="border-t border-gray-700 pt-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Comments</h3>
                  
                  {/* Add Comment */}
                  <div className="flex space-x-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Write a comment..."
                        className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400"
                      />
                    </div>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Comments List */}
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
                          <div className="bg-slate-700/50 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-semibold text-white text-sm">{comment.author}</span>
                              <span className="text-gray-400 text-xs">{comment.timestamp}</span>
                            </div>
                            <p className="text-gray-300 text-sm">{comment.content}</p>
                          </div>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                            <button className="hover:text-red-400">
                              <Heart className="w-3 h-3 inline mr-1" />
                              {comment.likes}
                            </button>
                            <button className="hover:text-blue-400">Reply</button>
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