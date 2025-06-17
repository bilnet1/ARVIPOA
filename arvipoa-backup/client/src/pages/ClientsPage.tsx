import { motion } from "framer-motion";
import { Building2, Factory, Home, Landmark, Ship, Plane, CheckCircle, Star, Quote } from "lucide-react";

export default function ClientsPage() {
  const clientCategories = [
    {
      title: "Residential Properties",
      description: "Homeowners and residential complexes using ARVIPOA smart security solutions",
      icon: Home,
      color: "blue",
      stats: { count: "15,000+", satisfaction: "98%" },
      features: ["Smart Pillar Systems", "Property Registration", "Mobile Monitoring", "Community Integration"]
    },
    {
      title: "Commercial Enterprises",
      description: "Businesses and corporate facilities protected by our comprehensive security platform",
      icon: Building2,
      color: "green",
      stats: { count: "3,500+", satisfaction: "99%" },
      features: ["Advanced Analytics", "Multi-site Management", "Custom Integration", "24/7 Support"]
    },
    {
      title: "Industrial Facilities",
      description: "Manufacturing plants and industrial complexes with critical infrastructure protection",
      icon: Factory,
      color: "orange",
      stats: { count: "800+", satisfaction: "97%" },
      features: ["Hazard Detection", "Perimeter Security", "Environmental Monitoring", "Emergency Response"]
    },
    {
      title: "Government Agencies",
      description: "Public institutions and government facilities requiring enhanced security measures",
      icon: Landmark,
      color: "purple",
      stats: { count: "250+", satisfaction: "100%" },
      features: ["Classified Operations", "Border Security", "Public Safety", "Compliance Reporting"]
    },
    {
      title: "Maritime Operations",
      description: "Ports, harbors, and marine facilities utilizing River Defense Barricade systems",
      icon: Ship,
      color: "cyan",
      stats: { count: "120+", satisfaction: "96%" },
      features: ["Waterway Monitoring", "Access Control", "Vessel Tracking", "Aquatic Security"]
    },
    {
      title: "Aviation Security",
      description: "Airports and aviation facilities with ARVIPOA Air Support integration",
      icon: Plane,
      color: "red",
      stats: { count: "85+", satisfaction: "99%" },
      features: ["Aerial Surveillance", "Runway Monitoring", "Drone Integration", "Airport Perimeter"]
    }
  ];

  const testimonials = [
    {
      name: "Michael Thompson",
      role: "Security Director",
      company: "GlobalTech Industries",
      content: "ARVIPOA's Smart Pillar system has revolutionized our facility security. The AI-powered monitoring and real-time alerts have prevented multiple security incidents.",
      rating: 5
    },
    {
      name: "Sarah Chen",
      role: "Port Authority Manager",
      company: "Atlantic Harbor Authority",
      content: "The River Defense Barricade system has enhanced our waterway security beyond expectations. The facial recognition and automated access control are game-changers.",
      rating: 5
    },
    {
      name: "David Rodriguez",
      role: "Residential Complex Manager",
      company: "Premium Living Communities",
      content: "Our residents feel safer than ever with ARVIPOA's comprehensive security solutions. The mobile app integration makes monitoring effortless.",
      rating: 5
    }
  ];

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
              ARVIPOA Client Success Stories
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover how organizations worldwide trust ARVIPOA to protect their most valuable assets. 
              From residential communities to critical infrastructure, we deliver unparalleled security solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overall Stats */}
      <section className="py-16 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-blue-400 mb-2">20,000+</div>
              <p className="text-gray-400">Active Clients</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-green-400 mb-2">98.5%</div>
              <p className="text-gray-400">Satisfaction Rate</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-purple-400 mb-2">150+</div>
              <p className="text-gray-400">Countries Served</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-yellow-400 mb-2">99.9%</div>
              <p className="text-gray-400">System Uptime</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Client Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold text-white text-center mb-16"
          >
            Our Diverse Client Portfolio
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clientCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all"
              >
                <category.icon className={`w-10 h-10 text-${category.color}-400 mb-4`} />
                <h3 className="text-xl font-bold text-white mb-3">{category.title}</h3>
                <p className="text-gray-300 mb-4">{category.description}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">{category.stats.count}</div>
                    <div className="text-xs text-gray-400">Clients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-400">{category.stats.satisfaction}</div>
                    <div className="text-xs text-gray-400">Satisfaction</div>
                  </div>
                </div>

                <div className="space-y-2">
                  {category.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-400">
                      <CheckCircle className="w-3 h-3 text-green-400" />
                      {feature}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold text-white text-center mb-16"
          >
            What Our Clients Say
          </motion.h2>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              >
                <Quote className="w-8 h-8 text-blue-400 mb-4" />
                <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                <div>
                  <div className="font-bold text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                  <div className="text-sm text-blue-400">{testimonial.company}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Join Our Growing Client Community
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Experience the security solutions trusted by organizations worldwide
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
              Request Consultation
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}