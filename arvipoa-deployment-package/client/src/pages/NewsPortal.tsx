import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, 
  MapPin, 
  Clock, 
  Eye, 
  MessageCircle, 
  Share2, 
  TrendingUp,
  Filter,
  Search,
  Calendar,
  User,
  ExternalLink,
  BookOpen,
  Zap,
  AlertTriangle
} from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from "@/components/Footer";

// Import mockup design images
import mockup1 from "@assets/ChatGPT Image Jun 5, 2025, 09_40_46 PM.png";
import mockup2 from "@assets/ChatGPT Image Jun 5, 2025, 09_46_11 PM.png";
import mockup3 from "@assets/ChatGPT Image Jun 5, 2025, 09_55_53 PM.png";
import mockup4 from "@assets/ChatGPT Image Jun 5, 2025, 10_02_49 PM.png";
import mockup5 from "@assets/ChatGPT Image Jun 5, 2025, 10_13_46 PM.png";
import mockup6 from "@assets/ChatGPT Image Jun 5, 2025, 10_24_36 PM.png";
import mockup7 from "@assets/ChatGPT Image Jun 5, 2025, 10_33_12 PM.png";
import mockup8 from "@assets/ChatGPT Image Jun 5, 2025, 10_38_43 PM.png";
import mockup9 from "@assets/ChatGPT Image Jun 5, 2025, 10_41_09 PM.png";
import mockup10 from "@assets/ChatGPT Image Jun 5, 2025, 10_45_46 PM.png";
import mockup11 from "@assets/ChatGPT Image Jun 5, 2025, 11_11_57 PM.png";
import mockup12 from "@assets/ChatGPT Image Jun 6, 2025, 01_03_19 PM.png";
import mockup13 from "@assets/ChatGPT Image Jun 6, 2025, 01_08_23 PM.png";
import mockup14 from "@assets/ChatGPT Image Jun 6, 2025, 01_26_55 PM.png";
import mockup15 from "@assets/ChatGPT Image Jun 6, 2025, 01_57_07 PM.png";
import mockup16 from "@assets/ChatGPT Image Jun 6, 2025, 11_38_27 AM.png";
import mockup17 from "@assets/ChatGPT Image Jun 6, 2025, 11_48_21 AM.png";
import mockup18 from "@assets/ChatGPT Image Jun 6, 2025, 11_54_25 AM.png";
import mockup19 from "@assets/ChatGPT Image Jun 6, 2025, 12_24_21 PM.png";
import mockup20 from "@assets/ChatGPT Image Jun 6, 2025, 12_59_44 PM.png";

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'local' | 'national' | 'international';
  author: string;
  publishedAt: string;
  readTime: number;
  views: number;
  comments: number;
  image: string;
  tags: string[];
  priority: 'breaking' | 'featured' | 'normal';
  verified: boolean;
}

export default function NewsPortal() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'local' | 'national' | 'international'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  useEffect(() => {
    // Mock news data - would come from news API
    const mockArticles: NewsArticle[] = [
      {
        id: '1',
        title: 'Ghana Launches Digital Property Registration System',
        summary: 'Government introduces blockchain-based property registration to improve transparency and reduce fraud.',
        content: 'The Government of Ghana has officially launched a new digital property registration system powered by blockchain technology. This revolutionary system aims to eliminate property fraud and improve transparency in real estate transactions across the country.',
        category: 'national',
        author: 'John Mensah',
        publishedAt: '2025-01-06T08:00:00Z',
        readTime: 5,
        views: 2456,
        comments: 34,
        image: '/api/placeholder/600/300',
        tags: ['Technology', 'Government', 'Real Estate'],
        priority: 'breaking',
        verified: true
      },
      {
        id: '2',
        title: 'Accra Property Prices Rise 15% in Q4 2024',
        summary: 'Real estate market shows strong growth with residential properties leading the surge.',
        content: 'Property prices in Greater Accra have experienced a significant 15% increase in the fourth quarter of 2024, according to the latest Ghana Real Estate Market Report.',
        category: 'local',
        author: 'Sarah Osei',
        publishedAt: '2025-01-05T14:30:00Z',
        readTime: 4,
        views: 1823,
        comments: 28,
        image: '/api/placeholder/600/300',
        tags: ['Real Estate', 'Economy', 'Accra'],
        priority: 'featured',
        verified: true
      },
      {
        id: '3',
        title: 'Africa Leads Global Smart City Development',
        summary: 'Continental initiatives in smart infrastructure attract international investment.',
        content: 'African nations are at the forefront of smart city development, with Ghana, Nigeria, and Kenya leading innovative urban planning projects.',
        category: 'international',
        author: 'Dr. Kwame Asante',
        publishedAt: '2025-01-04T16:45:00Z',
        readTime: 7,
        views: 3421,
        comments: 67,
        image: '/api/placeholder/600/300',
        tags: ['Smart Cities', 'Africa', 'Technology'],
        priority: 'featured',
        verified: true
      },
      {
        id: '4',
        title: 'New Security Measures for Residential Areas',
        summary: 'Local authorities implement enhanced security protocols following community feedback.',
        content: 'Enhanced security measures including smart surveillance systems and community patrol programs are being rolled out across residential areas in Greater Accra.',
        category: 'local',
        author: 'Ama Darko',
        publishedAt: '2025-01-04T10:15:00Z',
        readTime: 3,
        views: 987,
        comments: 15,
        image: '/api/placeholder/600/300',
        tags: ['Security', 'Community', 'Safety'],
        priority: 'normal',
        verified: true
      }
    ];
    
    setArticles(mockArticles);
  }, []);

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const breakingNews = articles.filter(article => article.priority === 'breaking');
  const featuredNews = articles.filter(article => article.priority === 'featured');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-blue-500/30 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-400 mb-2 flex items-center">
            <BookOpen className="w-8 h-8 mr-3" />
            ARVIPOA News Portal
          </h1>
          <p className="text-gray-300">Stay informed with the latest news and updates</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Breaking News Banner */}
        {breakingNews.length > 0 && (
          <div className="mb-8">
            <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-xl p-6 mb-4">
              <div className="flex items-center mb-4">
                <div className="bg-white text-red-600 px-3 py-1 rounded-full font-bold text-sm mr-3 animate-pulse">
                  BREAKING
                </div>
                <h2 className="text-xl font-bold text-white">Latest Breaking News</h2>
              </div>
              {breakingNews.map((article) => (
                <div key={article.id} className="cursor-pointer" onClick={() => setSelectedArticle(article)}>
                  <h3 className="text-xl font-semibold text-white hover:text-orange-200 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-orange-100 mt-2">{article.summary}</p>
                  <div className="flex items-center mt-3 text-orange-200 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="mr-4">{formatDate(article.publishedAt)}</span>
                    <User className="w-4 h-4 mr-1" />
                    <span>{article.author}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search and Filter */}
        <Card className="bg-slate-800/50 border-blue-500/30 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search news articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex space-x-2">
                {[
                  { key: 'all', label: 'All News', icon: Globe },
                  { key: 'local', label: 'Local', icon: MapPin },
                  { key: 'national', label: 'National', icon: Globe },
                  { key: 'international', label: 'International', icon: Globe }
                ].map(({ key, label, icon: Icon }) => (
                  <Button
                    key={key}
                    variant={selectedCategory === key ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(key as any)}
                    className={`flex items-center ${
                      selectedCategory === key 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'border-gray-600 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {label}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Featured Articles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">Latest Articles</h2>
            
            {filteredArticles.map((article) => (
              <Card key={article.id} className="bg-slate-800/50 border-slate-700 overflow-hidden hover:border-blue-500/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedArticle(article)}>
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-48 md:h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/api/placeholder/400/200';
                      }}
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-center mb-3">
                      <Badge className={`mr-2 ${
                        article.category === 'local' ? 'bg-green-600' :
                        article.category === 'national' ? 'bg-blue-600' :
                        'bg-purple-600'
                      }`}>
                        {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                      </Badge>
                      {article.priority === 'featured' && (
                        <Badge className="bg-yellow-500 text-black mr-2">Featured</Badge>
                      )}
                      {article.verified && (
                        <Badge className="bg-green-500 text-white">Verified</Badge>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 hover:text-blue-400 transition-colors">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-4 line-clamp-3">{article.summary}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {article.author}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {formatDate(article.publishedAt)}
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-1" />
                        {article.readTime} min read
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {article.views}
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {article.comments}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      {article.tags.map((tag, index) => (
                        <span key={index} className="bg-slate-700 text-gray-300 px-2 py-1 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <Card className="bg-slate-800/50 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Trending Topics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    'Digital Property Registration',
                    'Smart City Development',
                    'Real Estate Investment',
                    'Property Security Systems',
                    'Urban Planning Ghana'
                  ].map((topic, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-slate-700/30 rounded-lg cursor-pointer hover:bg-slate-700/50">
                      <span className="text-gray-300">{topic}</span>
                      <div className="flex items-center text-gray-400 text-sm">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {Math.floor(Math.random() * 100) + 50}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-slate-800/50 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-400">News Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Today's Articles</span>
                    <span className="text-white font-bold">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Total Views</span>
                    <span className="text-white font-bold">45.2K</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Active Readers</span>
                    <span className="text-white font-bold">1.2K</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Breaking News</span>
                    <span className="text-red-400 font-bold">{breakingNews.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* News Categories */}
            <Card className="bg-slate-800/50 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-400">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { name: 'Property & Real Estate', count: 45 },
                    { name: 'Technology', count: 32 },
                    { name: 'Government & Policy', count: 28 },
                    { name: 'Security & Safety', count: 19 },
                    { name: 'Business & Economy', count: 15 }
                  ].map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-2 hover:bg-slate-700/30 rounded cursor-pointer">
                      <span className="text-gray-300">{category.name}</span>
                      <Badge className="bg-purple-600 text-white">{category.count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Article Detail Modal */}
        {selectedArticle && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <Badge className={`${
                      selectedArticle.category === 'local' ? 'bg-green-600' :
                      selectedArticle.category === 'national' ? 'bg-blue-600' :
                      'bg-purple-600'
                    }`}>
                      {selectedArticle.category.charAt(0).toUpperCase() + selectedArticle.category.slice(1)}
                    </Badge>
                    {selectedArticle.priority === 'breaking' && (
                      <Badge className="bg-red-600 text-white animate-pulse">Breaking</Badge>
                    )}
                  </div>
                  <Button 
                    variant="outline"
                    onClick={() => setSelectedArticle(null)}
                    className="border-gray-600 text-gray-300"
                  >
                    Close
                  </Button>
                </div>

                <h1 className="text-3xl font-bold text-white mb-4">{selectedArticle.title}</h1>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {selectedArticle.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(selectedArticle.publishedAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {selectedArticle.readTime} min read
                  </div>
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {selectedArticle.views} views
                  </div>
                </div>

                <img 
                  src={selectedArticle.image} 
                  alt={selectedArticle.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                  onError={(e) => {
                    e.currentTarget.src = '/api/placeholder/800/400';
                  }}
                />

                <div className="prose prose-invert max-w-none">
                  <p className="text-xl text-gray-300 mb-6 font-medium">{selectedArticle.summary}</p>
                  <div className="text-gray-300 leading-relaxed whitespace-pre-line">{selectedArticle.content}</div>
                </div>

                <div className="flex flex-wrap gap-2 mt-6 mb-6">
                  {selectedArticle.tags.map((tag, index) => (
                    <Badge key={index} className="bg-blue-600 text-white">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-700">
                  <div className="flex items-center space-x-4">
                    <Button variant="outline" className="border-gray-600 text-gray-300">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Comments ({selectedArticle.comments})
                    </Button>
                    <Button variant="outline" className="border-gray-600 text-gray-300">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Read Full Article
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* News Interface Design Showcase */}
      <section className="bg-gradient-to-br from-slate-900 to-purple-900 text-white py-16 px-4 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#D4AF37] mb-4">News Portal Interface Designs</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Advanced news management system mockups featuring content curation, 
              editorial workflows, and reader engagement interfaces for comprehensive news delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { image: mockup1, title: "News Article Editor", description: "Rich content creation interface" },
              { image: mockup2, title: "Editorial Dashboard", description: "Content management and approval workflow" },
              { image: mockup3, title: "News Category Manager", description: "Topic organization and tagging system" },
              { image: mockup4, title: "Breaking News Alert System", description: "Real-time news notification portal" },
              { image: mockup5, title: "Reader Analytics Dashboard", description: "Audience engagement tracking" },
              { image: mockup6, title: "Comment Moderation Interface", description: "Community management tools" },
              { image: mockup7, title: "News Search & Filter", description: "Advanced content discovery system" },
              { image: mockup8, title: "Mobile News Reader", description: "Responsive reading experience" },
              { image: mockup9, title: "Journalist Profile Portal", description: "Writer management and verification" },
              { image: mockup10, title: "News Subscription Hub", description: "Reader preference management" },
              { image: mockup11, title: "Video News Player", description: "Multimedia content delivery system" },
              { image: mockup12, title: "News Archive Browser", description: "Historical content organization" },
              { image: mockup13, title: "Social Media Integration", description: "Cross-platform content sharing" },
              { image: mockup14, title: "News Source Verification", description: "Fact-checking and credibility system" },
              { image: mockup15, title: "Live News Feed", description: "Real-time content streaming interface" },
              { image: mockup16, title: "Advertisement Manager", description: "Revenue optimization dashboard" },
              { image: mockup17, title: "Newsletter Builder", description: "Email campaign creation tool" },
              { image: mockup18, title: "Press Release Portal", description: "Official announcement management" },
              { image: mockup19, title: "News Performance Analytics", description: "Content performance metrics" },
              { image: mockup20, title: "Multi-language News Hub", description: "Localization management system" }
            ].map((design, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:border-[#D4AF37]/50 transition-all duration-300"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={design.image}
                    alt={design.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-[#D4AF37] mb-1">{design.title}</h3>
                  <p className="text-gray-300 text-xs">{design.description}</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-[#D4AF37]/20 to-purple-600/20 rounded-xl p-8 border border-[#D4AF37]/30"
            >
              <h3 className="text-2xl font-bold text-[#D4AF37] mb-4">
                Advanced News Portal Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                  <span>AI-Powered Content Curation</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                  <span>Real-time Breaking News Alerts</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                  <span>Multimedia Content Support</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                  <span>Advanced Analytics Dashboard</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                  <span>Multi-language Support</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                  <span>Social Media Integration</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}