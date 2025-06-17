import { motion } from "framer-motion";
import { DollarSign, TrendingUp, Users, Award, Target, CheckCircle, ArrowRight, Calculator } from "lucide-react";

export default function AffiliatesPage() {
  const commissionTiers = [
    {
      level: "Bronze Affiliate",
      sales: "$0 - $10,000",
      commission: "5%",
      color: "orange",
      perks: ["Monthly payments", "Marketing materials", "Basic analytics"]
    },
    {
      level: "Silver Affiliate",
      sales: "$10,001 - $50,000",
      commission: "8%",
      color: "gray",
      perks: ["Bi-weekly payments", "Premium materials", "Advanced tracking", "Dedicated support"]
    },
    {
      level: "Gold Affiliate",
      sales: "$50,001 - $100,000",
      commission: "12%",
      color: "yellow",
      perks: ["Weekly payments", "Custom campaigns", "Priority support", "Performance bonuses"]
    },
    {
      level: "Platinum Affiliate",
      sales: "$100,001+",
      commission: "15%",
      color: "purple",
      perks: ["Daily payments", "Exclusive campaigns", "Account manager", "Revenue sharing"]
    }
  ];

  const earningOpportunities = [
    {
      product: "Smart Pillar System",
      price: "$2,500",
      commission: "$375",
      description: "AI-powered boundary monitoring solution"
    },
    {
      product: "River Defense Barricade",
      price: "$15,000",
      commission: "$2,250",
      description: "Advanced aquatic security platform"
    },
    {
      product: "Property Registration",
      price: "$299",
      commission: "$45",
      description: "Comprehensive property documentation"
    },
    {
      product: "Premium Membership",
      price: "$348/year",
      commission: "$52",
      description: "Annual subscription with recurring commissions"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-gray-900">
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
              ARVIPOA Affiliate Program
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Earn substantial commissions promoting cutting-edge security technology. 
              Join our affiliate network and monetize your audience with premium ARVIPOA solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <DollarSign className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Up to 15%</h3>
              <p className="text-gray-400">Commission Rate</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <TrendingUp className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">$2,250</h3>
              <p className="text-gray-400">Max Commission Per Sale</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <Users className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">30 Days</h3>
              <p className="text-gray-400">Cookie Duration</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Real-time</h3>
              <p className="text-gray-400">Tracking & Analytics</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Commission Tiers */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold text-white text-center mb-16"
          >
            Commission Structure
          </motion.h2>

          <div className="grid lg:grid-cols-4 gap-6">
            {commissionTiers.map((tier, index) => (
              <motion.div
                key={tier.level}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all text-center"
              >
                <div className={`w-16 h-16 bg-${tier.color}-500 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-white font-bold text-lg">{tier.commission}</span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{tier.level}</h3>
                <p className="text-gray-400 mb-4">{tier.sales}</p>
                
                <ul className="space-y-2 text-sm">
                  {tier.perks.map((perk, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-3 h-3 text-green-400" />
                      {perk}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Earning Opportunities */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold text-white text-center mb-16"
          >
            Earning Opportunities
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {earningOpportunities.map((opportunity, index) => (
              <motion.div
                key={opportunity.product}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{opportunity.product}</h3>
                    <p className="text-gray-400 text-sm">{opportunity.description}</p>
                  </div>
                  <Calculator className="w-6 h-6 text-blue-400" />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-400">Product Price</div>
                    <div className="text-lg font-bold text-white">{opportunity.price}</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500" />
                  <div className="text-right">
                    <div className="text-sm text-gray-400">Your Commission</div>
                    <div className="text-lg font-bold text-green-400">{opportunity.commission}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold text-white text-center mb-16"
          >
            How It Works
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Sign Up", desc: "Join our affiliate program and get approved" },
              { step: "2", title: "Promote", desc: "Share your unique affiliate links and content" },
              { step: "3", title: "Track", desc: "Monitor your referrals and earnings in real-time" },
              { step: "4", title: "Earn", desc: "Receive commissions on every successful sale" }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
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
              Start Earning with ARVIPOA Today
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Join thousands of affiliates earning substantial commissions with our premium security solutions
            </p>
            <button className="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors flex items-center gap-2 mx-auto">
              Join Affiliate Program
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}