import { motion } from "framer-motion";
import { Calendar, User, Eye, Play, ArrowRight, Tag } from "lucide-react";
import Footer from "@/components/ui/Footer";

// IDEIST Evolution Images
const ideistTransponder = "/attached_assets/ChatGPT Image Jun 12, 2025, 03_04_59 AM_1749745349111.png";
const ideistPowerPort = "/attached_assets/ChatGPT Image Jun 12, 2025, 10_42_02 AM_1749745723350.png";

const blogPosts = [
  {
    id: 1,
    title: "IDEIST: The Evolution of Smart Energy - Intelligent Digital Electricity Transponder",
    excerpt: "Revolutionary power line monitoring system with advanced transponder technology that eliminates energy theft and optimizes electricity distribution across West Africa.",
    author: "IDEIST Team",
    date: "June 12, 2025",
    readTime: "10 min read",
    category: "Energy Innovation",
    image: ideistTransponder,
    featured: true
  },
  {
    id: 2,
    title: "IDEIST Power Output Port: Next-Generation Electricity Distribution",
    excerpt: "Advanced power management system featuring motion detection, intelligent output ports, and real-time monitoring for comprehensive energy theft prevention.",
    author: "Energy Systems",
    date: "June 12, 2025",
    readTime: "8 min read",
    category: "Smart Grid",
    image: ideistPowerPort,
    featured: true
  },
  {
    id: 3,
    title: "ARVIPOA Smart Pillar: Revolutionary Property Security Technology",
    excerpt: "Discover how our Smart Pillar system is transforming property protection with AI-powered surveillance, environmental monitoring, and autonomous threat detection.",
    author: "ARVIPOA Team",
    date: "June 11, 2025",
    readTime: "8 min read",
    category: "Technology",
    image: "/attached_assets/ARVIPOA SMART BOUNDARY PILLAR ON THE GROUND RENAMED_1749668129927.png",
    featured: false,
    videoUrl: "https://drive.google.com/file/d/1EvuCC2vX-f2BEdihegOhURVVPDDtAtfj/preview"
  },
  {
    id: 4,
    title: "Smart Boundary Pillar: Multi-Modal Threat Detection",
    excerpt: "Learn about our advanced pillar system featuring delivery box integration, help detection, music monitoring, and gas purchase capabilities.",
    author: "Security Team",
    date: "June 10, 2025",
    readTime: "6 min read",
    category: "Security",
    image: "/attached_assets/ARVIPOA SMB DELIVERY BOX_1749668234275.png",
    featured: false
  },
  {
    id: 5,
    title: "Environmental Monitoring: Gas and Smoke Detection",
    excerpt: "Explore how our Smart Pillars provide comprehensive environmental protection with real-time gas leak detection and smoke monitoring.",
    author: "Environmental Team",
    date: "June 9, 2025",
    readTime: "5 min read",
    category: "Environment",
    image: "/attached_assets/ARVIPOA SMB GAS PURCHASE_1749668331156.png",
    featured: false
  },
  {
    id: 6,
    title: "AI-Powered Audio Recognition: Help Detection System",
    excerpt: "Understand how our Smart Pillars use advanced AI to detect distress calls and emergency situations in real-time.",
    author: "AI Development",
    date: "June 8, 2025",
    readTime: "7 min read",
    category: "AI Technology",
    image: "/attached_assets/ARVIPOA SMB DETECTS HELP NOISE_1749668304091.png",
    featured: false
  }
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold text-white mb-6">
              ARVIPOA Blog
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Stay updated with the latest innovations, insights, and developments in smart property security technology
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post with Video */}
      <section className="py-16 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold text-white mb-4 text-center">Featured Story</h2>
            <p className="text-gray-300 text-center">Latest insights and innovations from ARVIPOA</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Video Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="relative w-full h-0 pb-[56.25%] rounded-xl overflow-hidden shadow-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-1">
                <iframe
                  className="absolute top-1 left-1 w-[calc(100%-8px)] h-[calc(100%-8px)] rounded-lg"
                  src="https://drive.google.com/file/d/1EvuCC2vX-f2BEdihegOhURVVPDDtAtfj/preview"
                  title="ARVIPOA Smart Pillar Commercial Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              
              <div className="flex items-center gap-4 text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  <span>Commercial Video</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>Featured Content</span>
                </div>
              </div>
            </motion.div>

            {/* Content Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium">
                    Technology
                  </span>
                  <span className="text-gray-400 text-sm">Featured</span>
                </div>
                
                <h3 className="text-3xl font-bold text-white">
                  ARVIPOA Smart Pillar: Revolutionary Property Security Technology
                </h3>
                
                <p className="text-gray-300 text-lg leading-relaxed">
                  Discover how our Smart Pillar system is transforming property protection with AI-powered surveillance, 
                  environmental monitoring, and autonomous threat detection. This commercial video showcases the cutting-edge 
                  technology that makes ARVIPOA the leader in smart security solutions.
                </p>
                
                <div className="flex items-center gap-6 text-gray-400 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>ARVIPOA Team</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>June 11, 2025</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>8 min read</span>
                  </div>
                </div>
                
                <motion.button
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Read Full Article
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Latest Articles</h2>
            <p className="text-gray-300">Explore our comprehensive coverage of smart security innovations</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-sm border border-white/20 rounded-full text-white text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-300 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-gray-400 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">{post.readTime}</span>
                    <motion.button
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-400 hover:bg-blue-500/30 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-white">Stay Updated</h2>
            <p className="text-gray-300 text-lg">
              Subscribe to our newsletter for the latest updates on smart security technology and ARVIPOA innovations
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-black/40 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50"
              />
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}