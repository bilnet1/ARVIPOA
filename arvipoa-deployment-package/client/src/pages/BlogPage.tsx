import { motion } from "framer-motion";
import { Calendar, User, Eye, ArrowRight, Trophy, Zap, Shield, Waves } from "lucide-react";
import { Link } from "wouter";
import rdb10 from "@assets/RDB 10.png";
import smartPillarEnhanced from "@assets/smart pillar enhanced with icons.png";
import smartPillarInstallation from "@assets/smart pillar installation.png";
import smartPillarEVCharging from "@assets/SMART PILLAR EV CHARGING.png";
import smartPillarSolarCharging from "@assets/SMART PILLAR SOLAR CHARGING.png";
import smartPillarWaterSprinkling from "@assets/SMART PILLAR WATER SPRINKLING OUT.png";
import smartBoundaryGunshotDetection from "@assets/SMART BOUNDARY PILLAR gunshot detection.png";
import smartBoundaryWaterLeakage from "@assets/SMART BOUNDARY PILLAR water leakage detection.png";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: "arvipoa-achievements-2025",
    title: "ARVIPOA's Revolutionary Achievements: Transforming Security Technology in 2025",
    excerpt: "Discover how ARVIPOA has pioneered breakthrough innovations in smart security systems, from AI-powered barriers to comprehensive IoT monitoring solutions.",
    content: "ARVIPOA has achieved remarkable milestones in security technology development...",
    image: smartPillarEnhanced,
    category: "Company Milestones",
    date: "2025-06-07",
    author: "ARVIPOA Innovation Team",
    readTime: "8 min read",
    featured: true
  },
  {
    id: "river-defense-barricade-breakthrough",
    title: "River Defense Barricade: Pioneering Aquatic Security Solutions",
    excerpt: "Our groundbreaking River Defense Barricade system represents a major leap forward in waterway protection and access control technology.",
    content: "The ARVIPOA River Defense Barricade has revolutionized aquatic security...",
    image: rdb10,
    category: "Innovation Showcase",
    date: "2025-06-05",
    author: "Marine Security Division",
    readTime: "6 min read",
    featured: true
  },
  {
    id: "smart-pillar-deployment-success",
    title: "Smart Pillar System: Redefining Boundary Monitoring with AI",
    excerpt: "The successful deployment of our Smart Pillar technology marks a new era in intelligent property protection and environmental monitoring.",
    content: "Our Smart Pillar system has transformed how properties are monitored and protected...",
    image: smartPillarInstallation,
    category: "Technology Advancement",
    date: "2025-06-03",
    author: "AI Development Team",
    readTime: "7 min read",
    featured: true
  },
  {
    id: "smart-pillar-ev-charging-innovation",
    title: "Smart Pillar EV Charging: Sustainable Security Revolution",
    excerpt: "ARVIPOA introduces revolutionary Smart Pillar EV Charging Station, combining electric vehicle infrastructure with comprehensive security monitoring in a single sustainable solution.",
    content: "The Smart Pillar EV Charging Station represents the future of sustainable security technology...",
    image: smartPillarEVCharging,
    category: "Sustainability Innovation",
    date: "2025-06-07",
    author: "Sustainable Technology Division",
    readTime: "6 min read",
    featured: true
  },
  {
    id: "smart-pillar-solar-power-breakthrough",
    title: "Smart Pillar Solar Charging: Autonomous Renewable Energy Security",
    excerpt: "Revolutionary solar-powered Smart Pillar system achieves complete energy independence, delivering 24/7 security monitoring with zero carbon footprint through advanced photovoltaic integration.",
    content: "The Smart Pillar Solar Charging System marks a breakthrough in sustainable security technology...",
    image: smartPillarSolarCharging,
    category: "Renewable Energy Innovation",
    date: "2025-06-07",
    author: "Renewable Energy Division",
    readTime: "5 min read",
    featured: true
  },
  {
    id: "smart-pillar-water-management-system",
    title: "Smart Pillar Water Management: Intelligent Irrigation & Fire Suppression",
    excerpt: "Advanced water distribution technology integrates smart irrigation and automated fire suppression into the Smart Pillar ecosystem, providing comprehensive environmental protection and property maintenance.",
    content: "The Smart Pillar Water Management System represents a complete environmental control solution...",
    image: smartPillarWaterSprinkling,
    category: "Environmental Technology",
    date: "2025-06-07",
    author: "Environmental Systems Division",
    readTime: "4 min read",
    featured: true
  },
  {
    id: "smart-boundary-gunshot-detection",
    title: "Smart Boundary Pillar Gunshot Detection: Advanced Security Protocol Activation",
    excerpt: "Revolutionary acoustic signature recognition technology instantly detects unauthorized firearms discharge, providing immediate alerts to property owners and security authorities for rapid response coordination.",
    content: "The Smart Boundary Pillar Gunshot Detection System represents a breakthrough in real-time security monitoring. Using advanced audio analysis and machine learning algorithms, the system can instantly identify gunshot signatures from unlicensed weapons and activate emergency protocols. Upon detection, the system immediately notifies authorities, property owners, and security teams while providing precise location data for rapid response. This technology has proven instrumental in preventing security breaches and ensuring immediate response to potential threats across ARVIPOA-protected properties.",
    image: smartBoundaryGunshotDetection,
    category: "Security Innovation",
    date: "2025-06-07",
    author: "Security Systems Division",
    readTime: "6 min read",
    featured: true
  },
  {
    id: "smart-boundary-water-leakage-detection",
    title: "Smart Boundary Pillar Water Leakage Detection: Intelligent Utility Conservation",
    excerpt: "Advanced sensor network monitors utility water flow systems, instantly detecting pipeline disruptions and automatically preventing water wastage through intelligent shutdown protocols and damage prevention measures.",
    content: "The Smart Boundary Pillar Water Leakage Detection System revolutionizes utility management through continuous monitoring of water transmission networks. The system employs sophisticated flow sensors and pressure monitoring to detect even minor pipeline disruptions or leakages instantly. Upon detecting anomalies, the system automatically shuts down water flow to the affected section, preventing wastage and property damage while simultaneously alerting maintenance teams with precise location data. This intelligent conservation technology has significantly reduced water waste across ARVIPOA properties while maintaining optimal resource distribution and preventing costly infrastructure damage.",
    image: smartBoundaryWaterLeakage,
    category: "Utility Management",
    date: "2025-06-07",
    author: "Infrastructure Technology Division",
    readTime: "5 min read",
    featured: true
  },
  {
    id: "arvimedia-streaming-platform",
    title: "ARVIMEDIA: Bringing Free Premium Streaming to ARVIPOA Community",
    excerpt: "ARVIPOA's entertainment division delivers Netflix-quality streaming services as part of our comprehensive member benefits package.",
    content: "ARVIMEDIA represents our commitment to providing holistic services to our community...",
    image: "https://via.placeholder.com/600x400?text=ARVIMEDIA+Streaming",
    category: "Service Enhancement",
    date: "2025-06-01",
    author: "Media Services Team",
    readTime: "5 min read"
  },
  {
    id: "google-drive-integration-success",
    title: "Unlimited Video Storage: Google Drive Integration Breakthrough",
    excerpt: "ARVIPOA's seamless integration with Google Drive eliminates file size limitations, enabling unlimited video streaming and storage capabilities.",
    content: "Our video platform now supports unlimited file sizes through Google Drive integration...",
    image: "https://via.placeholder.com/600x400?text=Google+Drive+Integration",
    category: "Technical Innovation",
    date: "2025-05-30",
    author: "Platform Development Team",
    readTime: "4 min read"
  }
];

export default function BlogPage() {
  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold text-white mb-6">
              ARVIPOA Innovation Hub
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover our latest achievements, technological breakthroughs, and milestone accomplishments 
              in revolutionizing security, property management, and digital services
            </p>
          </motion.div>
        </div>
      </section>

      {/* Achievement Statistics */}
      <section className="py-16 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">25+</h3>
              <p className="text-gray-400">Major Innovations</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">100%</h3>
              <p className="text-gray-400">AI-Powered Solutions</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">500+</h3>
              <p className="text-gray-400">Properties Protected</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Waves className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">50+</h3>
              <p className="text-gray-400">Waterways Secured</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold text-white text-center mb-16"
          >
            Featured Achievements & Milestones
          </motion.h2>

          <div className="grid lg:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20 hover:border-white/40 transition-all group"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Eye className="w-4 h-4" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <button className="mt-4 text-blue-400 hover:text-blue-300 font-medium flex items-center gap-2 group">
                    Read More 
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Regular Blog Posts */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold text-white text-center mb-16"
          >
            Latest Updates & Insights
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {regularPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20 hover:border-white/40 transition-all group"
              >
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <div className="aspect-square md:aspect-auto md:h-full overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-400 mb-4 text-sm line-clamp-2">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-gray-500">
                        <User className="w-3 h-3" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <Eye className="w-3 h-3" />
                        {post.readTime}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Experience ARVIPOA's Innovation Firsthand
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of satisfied customers who have transformed their security with our cutting-edge technology
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/river-defense-barricade">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                  Explore River Defense Barricade
                </button>
              </Link>
              <Link href="/smart-pillar">
                <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition-colors">
                  Discover Smart Pillar System
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}