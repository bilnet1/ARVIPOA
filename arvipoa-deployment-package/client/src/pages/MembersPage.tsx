import { motion } from "framer-motion";
import { Users, Award, Shield, Star, CheckCircle, Crown, ArrowRight } from "lucide-react";

export default function MembersPage() {
  const memberTiers = [
    {
      name: "Standard Member",
      icon: Users,
      color: "blue",
      price: "Free",
      features: [
        "Property registration access",
        "Basic security monitoring",
        "Community forum participation",
        "Mobile app access",
        "Email support"
      ]
    },
    {
      name: "Premium Member",
      icon: Star,
      color: "purple",
      price: "$29/month",
      popular: true,
      features: [
        "All Standard features",
        "Advanced security analytics",
        "Priority customer support",
        "Smart Pillar integration",
        "ARVIMEDIA streaming access",
        "Property management tools"
      ]
    },
    {
      name: "Elite Member",
      icon: Crown,
      color: "gold",
      price: "$99/month",
      features: [
        "All Premium features",
        "River Defense Barricade access",
        "Dedicated account manager",
        "Custom security solutions",
        "API access for developers",
        "White-label solutions"
      ]
    }
  ];

  const memberBenefits = [
    {
      title: "Comprehensive Security",
      description: "Access to ARVIPOA's full suite of security technologies including Smart Pillars and River Defense Barricades",
      icon: Shield
    },
    {
      title: "Property Protection",
      description: "Advanced property monitoring, registration, and management tools with AI-powered analytics",
      icon: CheckCircle
    },
    {
      title: "Community Network",
      description: "Connect with property owners, security professionals, and technology enthusiasts worldwide",
      icon: Users
    },
    {
      title: "Premium Support",
      description: "24/7 technical support, training resources, and dedicated customer success management",
      icon: Award
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900">
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
              ARVIPOA Membership Program
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join our exclusive community of property owners, security professionals, and technology innovators. 
              Access cutting-edge security solutions and comprehensive property management tools.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold text-white text-center mb-16"
          >
            Choose Your Membership Level
          </motion.h2>

          <div className="grid lg:grid-cols-3 gap-8">
            {memberTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white/10 backdrop-blur-sm rounded-xl p-8 border ${
                  tier.popular 
                    ? 'border-purple-500 ring-2 ring-purple-500/50' 
                    : 'border-white/20'
                } hover:border-white/40 transition-all group`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <tier.icon className={`w-12 h-12 mx-auto mb-4 text-${tier.color === 'gold' ? 'yellow' : tier.color}-400`} />
                  <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                  <div className="text-3xl font-bold text-white mb-2">{tier.price}</div>
                  {tier.price !== "Free" && <p className="text-gray-400">per month</p>}
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 rounded-lg font-bold transition-all ${
                  tier.popular
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}>
                  {tier.price === "Free" ? "Join Free" : "Subscribe Now"}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Member Benefits */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold text-white text-center mb-16"
          >
            Membership Benefits
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {memberBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              >
                <benefit.icon className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Join the ARVIPOA Community?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Start with our free membership and upgrade anytime to access premium features
            </p>
            <button className="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors flex items-center gap-2 mx-auto">
              Get Started Today
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}