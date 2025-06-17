import { motion } from "framer-motion";
import { Building, Handshake, Globe, Zap, Shield, Users, CheckCircle, ArrowRight } from "lucide-react";

export default function PartnersPage() {
  const partnerTypes = [
    {
      title: "Technology Partners",
      description: "Leading technology companies integrating ARVIPOA solutions into their platforms",
      icon: Zap,
      color: "blue",
      partners: [
        "Google Cloud Platform",
        "Microsoft Azure",
        "Amazon Web Services",
        "Firebase Technologies",
        "IoT Device Manufacturers"
      ]
    },
    {
      title: "Security Partners",
      description: "Professional security firms and law enforcement agencies utilizing our systems",
      icon: Shield,
      color: "red",
      partners: [
        "Private Security Companies",
        "Law Enforcement Agencies",
        "Maritime Security Firms",
        "Border Control Authorities",
        "Critical Infrastructure Operators"
      ]
    },
    {
      title: "Distribution Partners",
      description: "Authorized dealers and distributors bringing ARVIPOA solutions to global markets",
      icon: Globe,
      color: "green",
      partners: [
        "Regional Distributors",
        "System Integrators",
        "Installation Specialists",
        "Maintenance Providers",
        "Training Organizations"
      ]
    }
  ];

  const partnerBenefits = [
    {
      title: "Revenue Opportunities",
      description: "Access to lucrative markets with high-margin security technology solutions",
      icon: Building
    },
    {
      title: "Technical Support",
      description: "Comprehensive training, certification programs, and ongoing technical assistance",
      icon: Users
    },
    {
      title: "Market Exclusivity",
      description: "Protected territories and exclusive distribution rights in designated regions",
      icon: Shield
    },
    {
      title: "Co-Marketing Support",
      description: "Joint marketing initiatives, trade show participation, and promotional materials",
      icon: Handshake
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-blue-900 to-gray-900">
      {/* Header Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-blue-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold text-white mb-6">
              ARVIPOA Partnership Network
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join our global network of technology, security, and distribution partners. 
              Together, we're revolutionizing property protection and digital asset management worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold text-white text-center mb-16"
          >
            Partnership Categories
          </motion.h2>

          <div className="grid lg:grid-cols-3 gap-8">
            {partnerTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:border-white/40 transition-all"
              >
                <type.icon className={`w-12 h-12 text-${type.color}-400 mb-6`} />
                <h3 className="text-2xl font-bold text-white mb-4">{type.title}</h3>
                <p className="text-gray-300 mb-6">{type.description}</p>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-white mb-3">Partner Examples:</h4>
                  {type.partners.map((partner, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-gray-400">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      {partner}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Benefits */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold text-white text-center mb-16"
          >
            Partnership Benefits
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {partnerBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              >
                <benefit.icon className="w-8 h-8 text-green-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Process */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold text-white text-center mb-16"
          >
            How to Become a Partner
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Application", desc: "Submit partnership application with business details" },
              { step: "2", title: "Evaluation", desc: "Our team reviews your application and capabilities" },
              { step: "3", title: "Agreement", desc: "Finalize partnership terms and sign agreements" },
              { step: "4", title: "Launch", desc: "Begin selling ARVIPOA solutions in your market" }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
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
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Partner with ARVIPOA?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Join our growing network of partners and bring cutting-edge security technology to your market
            </p>
            <button className="bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors flex items-center gap-2 mx-auto">
              Apply for Partnership
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}