import { Check, Shield, Brain, Zap, Globe, Users, Building, Leaf, Lightbulb, Rocket, Award, Target, Calendar, MapPin, Play } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import arvipoaLogo from "@/assets/images/arvipoa-logo.png";
import AboutTimeline from "../components/AboutTimeline";

// Animated Counter Component
interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

const AnimatedCounter = ({ value, suffix = "", duration = 2 }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef(null);
  const isInView = useInView(counterRef, { once: true });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      let startTime: number | null = null;
      const animate = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        
        setCount(Math.floor(progress * value));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, value, duration, hasAnimated]);

  return (
    <span ref={counterRef}>
      {count.toLocaleString()}{suffix}
    </span>
  );
};

export default function About() {
  const headerControls = useAnimation();
  const featuresControls = useAnimation();
  const missionControls = useAnimation();
  const timelineControls = useAnimation();
  const impactControls = useAnimation();
  const mapControls = useAnimation();
  const videoControls = useAnimation();
  
  const headerRef = useRef(null);
  const featuresRef = useRef(null);
  const missionRef = useRef(null);
  const timelineRef = useRef(null);
  const impactRef = useRef(null);
  const mapRef = useRef(null);
  const videoRef = useRef(null);
  
  const headerInView = useInView(headerRef, { once: true });
  const featuresInView = useInView(featuresRef, { once: true });
  const missionInView = useInView(missionRef, { once: true });
  const timelineInView = useInView(timelineRef, { once: true });
  const impactInView = useInView(impactRef, { once: true });
  const mapInView = useInView(mapRef, { once: true });
  const videoInView = useInView(videoRef, { once: true });

  useEffect(() => {
    if (headerInView) {
      headerControls.start("visible");
    }
  }, [headerControls, headerInView]);

  useEffect(() => {
    if (featuresInView) {
      featuresControls.start("visible");
    }
  }, [featuresControls, featuresInView]);

  useEffect(() => {
    if (missionInView) {
      missionControls.start("visible");
    }
  }, [missionControls, missionInView]);

  useEffect(() => {
    if (timelineInView) {
      timelineControls.start("visible");
    }
  }, [timelineControls, timelineInView]);

  useEffect(() => {
    if (impactInView) {
      impactControls.start("visible");
    }
  }, [impactControls, impactInView]);

  useEffect(() => {
    if (mapInView) {
      mapControls.start("visible");
    }
  }, [mapControls, mapInView]);

  useEffect(() => {
    if (videoInView) {
      videoControls.start("visible");
    }
  }, [videoControls, videoInView]);

  const timelineEvents = [
    {
      year: "2019",
      title: "The Vision Begins",
      description: "ARVIPOA was conceptualized with the mission to revolutionize property technology through smart infrastructure and AI-powered solutions.",
      icon: Lightbulb,
      color: "from-yellow-400 to-orange-500"
    },
    {
      year: "2020",
      title: "Foundation & Research",
      description: "Company officially founded with extensive research into IoT integration, blockchain security, and smart city infrastructure development.",
      icon: Building,
      color: "from-blue-400 to-cyan-500"
    },
    {
      year: "2021",
      title: "Smart Pillar Innovation",
      description: "First smart pillar prototypes developed, featuring real-time monitoring, environmental sensors, and integrated security systems.",
      icon: Zap,
      color: "from-green-400 to-emerald-500"
    },
    {
      year: "2022",
      title: "AI Integration Launch",
      description: "Advanced AI algorithms deployed for property analysis, risk assessment, and predictive market analytics across Ghana and West Africa.",
      icon: Brain,
      color: "from-purple-400 to-pink-500"
    },
    {
      year: "2023",
      title: "Platform Expansion",
      description: "Full-scale platform launch with comprehensive property management, user authentication, and smart infrastructure network integration.",
      icon: Rocket,
      color: "from-red-400 to-rose-500"
    },
    {
      year: "2024",
      title: "Global Recognition",
      description: "ARVIPOA recognized as leading PropTech innovator, expanding services across multiple African markets with sustainable smart city solutions.",
      icon: Award,
      color: "from-indigo-400 to-blue-500"
    }
  ];

  const features = [
    {
      title: "AI-Powered Property Analysis",
      description: "Advanced artificial intelligence for property valuation, risk assessment, and market analysis.",
      icon: Brain,
    },
    {
      title: "Smart Infrastructure Network",
      description: "Integrated smart pillars and river defense systems with IoT connectivity and real-time monitoring.",
      icon: Zap,
    },
    {
      title: "Blockchain Security",
      description: "Immutable property records using distributed ledger technology for maximum security.",
      icon: Shield,
    },
    {
      title: "Ghana Legal Compliance",
      description: "Full compliance with Ghana's Land Act 2020 and property registration requirements.",
      icon: Building,
    },
  ];

  const achievements = [
    { number: "500+", label: "Properties Registered", icon: Building },
    { number: "98%", label: "Client Satisfaction", icon: Users },
    { number: "24/7", label: "Smart Monitoring", icon: Globe },
    { number: "100%", label: "Eco-Friendly Tech", icon: Leaf },
  ];

  const headerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const slideFromLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const delayedFadeIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 1.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-green-900 to-black">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-900 via-gray-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-800/20 to-yellow-600/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            ref={headerRef}
            initial="hidden"
            animate={headerControls}
            variants={headerVariants}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-8">
              <motion.img 
                src={arvipoaLogo} 
                alt="ARVIPOA Logo" 
                className="h-20 w-auto mr-6"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
              <div>
                <motion.h1 
                  className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  ARVIPOA
                </motion.h1>
                <motion.p 
                  className="text-xl text-yellow-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  Akosombo River View Land and Island Property Owners Association LBG
                </motion.p>
              </div>
            </div>
            <motion.p 
              className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              Africa's most advanced smart property management platform, combining AI technology, 
              IoT infrastructure, and blockchain security for comprehensive land and property protection.
            </motion.p>
          </motion.div>

          {/* Achievements Grid */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <motion.div 
                  key={index} 
                  className="text-center"
                  variants={slideFromLeft}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <IconComponent className="w-8 h-8 text-gray-900" />
                  </motion.div>
                  <div className="text-3xl font-bold text-yellow-400 mb-2">{achievement.number}</div>
                  <div className="text-gray-300">{achievement.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-gray-900 via-green-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="lg:text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-base text-yellow-400 font-semibold tracking-wide uppercase">Technology & Innovation</h2>
            <p className="mt-2 text-4xl leading-10 font-bold tracking-tight bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
              Revolutionizing Property Management with Smart Technology
            </p>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-300">
              Our cutting-edge platform integrates artificial intelligence, IoT sensors, and blockchain technology 
              to provide unprecedented security and efficiency in property registration and management.
            </p>
          </motion.div>

          {/* Core Features Grid */}
          <motion.div 
            ref={featuresRef}
            className="grid md:grid-cols-2 gap-12 mb-16"
            initial="hidden"
            animate={featuresControls}
            variants={staggerContainer}
          >
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div 
                  key={index} 
                  className="flex items-start"
                  variants={slideFromLeft}
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex-shrink-0">
                    <motion.div 
                      className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-r from-yellow-500 to-green-500 text-gray-900 mr-6 shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <IconComponent className="h-8 w-8" />
                    </motion.div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-yellow-400 mb-3">{feature.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Company Information */}
          <motion.div 
            className="bg-gradient-to-br from-gray-800 to-green-900 rounded-3xl p-12 mb-16 shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <h3 className="text-3xl font-bold text-yellow-400 mb-6">About Our Organization</h3>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  ARVIPOA (Akosombo River View Land and Island Property Owners Association LBG) is a pioneering 
                  property technology company founded to address the complex challenges of land registration 
                  and property management in Ghana and across Africa.
                </p>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  Our innovative approach combines traditional property law expertise with cutting-edge technology, 
                  including AI-powered analysis, IoT infrastructure, and blockchain security to create the most 
                  comprehensive property management ecosystem on the continent.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-yellow-400 mb-2">Founded</h4>
                    <p className="text-gray-300">2023</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-yellow-400 mb-2">Location</h4>
                    <p className="text-gray-300">Accra, Ghana</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-yellow-400 mb-2">Registration</h4>
                    <p className="text-gray-300">GM-006-0328</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-yellow-400 mb-2">P.O. Box</h4>
                    <p className="text-gray-300">CT3797</p>
                  </div>
                </div>
              </motion.div>
              <motion.div 
                className="bg-gradient-to-br from-green-600 to-yellow-600 rounded-2xl p-8 text-white shadow-lg"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                whileHover={{ scale: 1.02 }}
              >
                <h4 className="text-2xl font-bold mb-6 text-gray-900">Contact Information</h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-semibold mb-1 text-gray-900">Email</h5>
                    <p className="text-gray-800">support@arvipoa.org</p>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-1 text-gray-900">WhatsApp</h5>
                    <p className="text-gray-800">+233548411284</p>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-1 text-gray-900">Office Address</h5>
                    <p className="text-gray-800">GES Madina Office, Presec<br />Accra Central, Ghana</p>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-1 text-gray-900">Service Hours</h5>
                    <p className="text-gray-800">24/7 Smart Monitoring<br />Business Hours: 8 AM - 6 PM GMT</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Mission Statement */}
          <motion.div 
            ref={missionRef}
            className="mt-16 bg-gradient-to-r from-green-800 to-gray-800 rounded-lg p-8 shadow-xl"
            initial="hidden"
            animate={missionControls}
            variants={delayedFadeIn}
          >
            <div className="text-center">
              <motion.h3 
                className="text-2xl font-bold text-yellow-400 mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Our Mission
              </motion.h3>
              <motion.p 
                className="text-lg text-gray-300 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                To simplify property registration through smart tools, AI assistance, and secure infrastructure — helping you protect and track assets with clarity and confidence.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Timeline Component */}
      <AboutTimeline />

      {/* Founding Story Timeline Section */}
      <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-green-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-base text-yellow-400 font-semibold tracking-wide uppercase mb-4">Our Journey</h2>
            <p className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-green-400 to-yellow-400 bg-clip-text text-transparent mb-6">
              Founding Story Timeline
            </p>
            <p className="max-w-3xl mx-auto text-xl text-gray-300">
              Discover the milestones that shaped ARVIPOA into West Africa's leading PropTech innovator
            </p>
          </motion.div>

          {/* Timeline Container */}
          <motion.div 
            ref={timelineRef}
            className="relative"
            initial="hidden"
            animate={timelineControls}
            variants={staggerContainer}
          >
            {/* Timeline Line */}
            <motion.div 
              className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-yellow-400 via-green-400 to-yellow-400 rounded-full shadow-lg"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.5 }}
              style={{ originY: 0 }}
            />

            {/* Timeline Events */}
            <div className="space-y-16">
              {timelineEvents.map((event, index) => {
                const IconComponent = event.icon;
                const isEven = index % 2 === 0;
                
                return (
                  <motion.div 
                    key={index}
                    className={`relative flex items-center ${isEven ? 'justify-start' : 'justify-end'}`}
                    variants={{
                      hidden: { opacity: 0, x: isEven ? -100 : 100 },
                      visible: { 
                        opacity: 1, 
                        x: 0,
                        transition: { 
                          duration: 0.8, 
                          delay: index * 0.2,
                          type: "spring",
                          stiffness: 100
                        }
                      }
                    }}
                  >
                    {/* Timeline Node */}
                    <motion.div 
                      className="absolute left-1/2 transform -translate-x-1/2 z-10"
                      whileInView={{ scale: [0, 1.2, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                    >
                      <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${event.color} flex items-center justify-center shadow-2xl border-4 border-gray-900`}>
                        <IconComponent className="w-10 h-10 text-white" />
                      </div>
                      
                      {/* Glowing Effect */}
                      <motion.div 
                        className={`absolute inset-0 w-20 h-20 rounded-full bg-gradient-to-r ${event.color} opacity-20 blur-xl`}
                        animate={{ 
                          scale: [1, 1.5, 1],
                          opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity,
                          delay: index * 0.3
                        }}
                      />
                    </motion.div>

                    {/* Content Card */}
                    <motion.div 
                      className={`w-full max-w-md ${isEven ? 'mr-auto pr-16' : 'ml-auto pl-16'}`}
                      whileHover={{ scale: 1.05, y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-gray-700/50">
                        {/* Year Badge */}
                        <motion.div 
                          className={`absolute ${isEven ? '-right-4' : '-left-4'} top-6 bg-gradient-to-r ${event.color} text-white font-bold text-lg px-4 py-2 rounded-xl shadow-lg`}
                          whileInView={{ rotateY: [0, 360] }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                        >
                          {event.year}
                        </motion.div>

                        {/* Content */}
                        <div className={`${isEven ? 'text-left' : 'text-right'}`}>
                          <motion.h3 
                            className="text-2xl font-bold text-yellow-400 mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 + 0.3 }}
                          >
                            {event.title}
                          </motion.h3>
                          <motion.p 
                            className="text-gray-300 leading-relaxed text-lg"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 + 0.4 }}
                          >
                            {event.description}
                          </motion.p>
                        </div>

                        {/* Decorative Elements */}
                        <motion.div 
                          className={`absolute ${isEven ? 'right-0' : 'left-0'} bottom-0 w-32 h-32 bg-gradient-to-r ${event.color} opacity-10 rounded-full blur-2xl`}
                          animate={{ 
                            scale: [1, 1.2, 1],
                            rotate: [0, 180, 360]
                          }}
                          transition={{ 
                            duration: 8, 
                            repeat: Infinity,
                            delay: index * 0.5
                          }}
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* Future Vision */}
            <motion.div 
              className="relative flex items-center justify-center mt-20"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1 }}
            >
              <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                <motion.div 
                  className="w-24 h-24 rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-green-400 flex items-center justify-center shadow-2xl border-4 border-gray-900"
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity }
                  }}
                >
                  <Target className="w-12 h-12 text-white" />
                </motion.div>
                
                {/* Enhanced Glowing Effect */}
                <motion.div 
                  className="absolute inset-0 w-24 h-24 rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-green-400 opacity-30 blur-xl"
                  animate={{ 
                    scale: [1, 2, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity
                  }}
                />
              </div>

              <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-md rounded-2xl p-10 shadow-2xl border border-gray-700/50 max-w-2xl">
                <div className="text-center">
                  <motion.h3 
                    className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    The Future Continues
                  </motion.h3>
                  <motion.p 
                    className="text-gray-300 text-xl leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 }}
                  >
                    Our journey is far from over. With continued innovation in AI, IoT, and sustainable technology, 
                    ARVIPOA is building the future of smart property management across Africa and beyond.
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Smart Timeline Section */}
      <section className="py-16 bg-gradient-to-r from-green-900 via-gray-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h3 
            className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Our Smart Registration Philosophy
          </motion.h3>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              { num: "1", title: "Discover", desc: "Locate, assess, and map out properties using AI tools and mobile inputs.", color: "from-green-500 to-green-600" },
              { num: "2", title: "Secure", desc: "Confirm authenticity, purpose, and ensure privacy via encrypted uploads.", color: "from-yellow-500 to-yellow-600" },
              { num: "3", title: "Track", desc: "Monitor status, activities, or disputes with auto-alerts and smart visuals.", color: "from-green-600 to-yellow-500" }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="text-center"
                variants={slideFromLeft}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className={`w-20 h-20 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-2xl font-bold text-gray-900">{item.num}</span>
                </motion.div>
                <h4 className="text-lg font-semibold text-yellow-400 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ARVIPOA Identity & Impact Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-green-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            ref={impactRef}
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={impactControls}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
            }}
          >
            <h2 className="text-base text-yellow-400 font-semibold tracking-wide uppercase mb-4">Our Impact</h2>
            <p className="text-4xl leading-10 font-bold tracking-tight bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
              ARVIPOA Identity & Impact
            </p>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-300">
              Transforming property management across Ghana with cutting-edge technology and innovative solutions.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            animate={impactControls}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.3
                }
              }
            }}
          >
            {[
              {
                value: 2547,
                suffix: "+",
                label: "Verified Properties",
                icon: Building,
                gradient: "from-green-500 to-emerald-600"
              },
              {
                value: 156,
                suffix: "",
                label: "Smart Pillars Active",
                icon: Shield,
                gradient: "from-yellow-500 to-amber-600"
              },
              {
                value: 28,
                suffix: "",
                label: "Communities Covered",
                icon: Users,
                gradient: "from-green-600 to-teal-600"
              },
              {
                value: 9842,
                suffix: "+",
                label: "Alerts Managed",
                icon: Zap,
                gradient: "from-yellow-600 to-orange-600"
              }
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  className="relative group"
                  variants={{
                    hidden: { opacity: 0, y: 50, scale: 0.8 },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      transition: { 
                        duration: 0.6,
                        type: "spring",
                        stiffness: 100
                      }
                    }
                  }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/80 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-gray-700/50 overflow-hidden">
                    {/* Background gradient effect */}
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, 0]
                      }}
                      transition={{ 
                        duration: 6, 
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    />
                    
                    {/* Icon */}
                    <motion.div 
                      className={`w-16 h-16 bg-gradient-to-r ${stat.gradient} rounded-xl flex items-center justify-center mb-6 mx-auto shadow-lg`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>

                    {/* Counter */}
                    <div className="text-center">
                      <motion.div 
                        className="text-4xl font-bold text-white mb-2"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.5, type: "spring", stiffness: 200 }}
                      >
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2.5} />
                      </motion.div>
                      <p className="text-gray-300 font-medium">{stat.label}</p>
                    </div>

                    {/* Decorative elements */}
                    <motion.div 
                      className={`absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r ${stat.gradient} opacity-20 rounded-full blur-xl`}
                      animate={{ 
                        scale: [0.8, 1.2, 0.8],
                        opacity: [0.2, 0.4, 0.2]
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Coverage Map Section */}
      <section className="py-20 bg-gradient-to-br from-green-900 via-gray-900 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            ref={mapRef}
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={mapControls}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
            }}
          >
            <h2 className="text-base text-yellow-400 font-semibold tracking-wide uppercase mb-4">Our Reach</h2>
            <p className="text-4xl leading-10 font-bold tracking-tight bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
              Coverage Across Ghana
            </p>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-300">
              Expanding our smart property management solutions to communities nationwide.
            </p>
          </motion.div>

          <motion.div 
            className="grid lg:grid-cols-2 gap-12 items-center"
            initial="hidden"
            animate={mapControls}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.3,
                  delayChildren: 0.2
                }
              }
            }}
          >
            {/* Map Visualization */}
            <motion.div 
              className="relative"
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
              }}
            >
              <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-gray-700/50">
                {/* Ghana Map Placeholder */}
                <div className="relative h-96 bg-gradient-to-br from-green-500/20 to-yellow-500/20 rounded-2xl flex items-center justify-center overflow-hidden">
                  {/* Map outline representation */}
                  <div className="relative w-full h-full">
                    <svg viewBox="0 0 400 300" className="w-full h-full text-green-400">
                      <path 
                        d="M100 80 L300 80 L320 120 L300 180 L280 220 L200 240 L120 220 L80 180 L90 120 Z" 
                        fill="currentColor" 
                        fillOpacity="0.3" 
                        stroke="currentColor" 
                        strokeWidth="2"
                      />
                    </svg>
                    
                    {/* Active regions markers */}
                    {[
                      { x: "25%", y: "30%", region: "Northern" },
                      { x: "35%", y: "45%", region: "Ashanti" },
                      { x: "60%", y: "55%", region: "Greater Accra" },
                      { x: "40%", y: "65%", region: "Central" },
                      { x: "70%", y: "40%", region: "Eastern" }
                    ].map((marker, index) => (
                      <motion.div
                        key={index}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2"
                        style={{ left: marker.x, top: marker.y }}
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 + 1 }}
                        whileHover={{ scale: 1.3 }}
                      >
                        <div className="relative">
                          <motion.div 
                            className="w-4 h-4 bg-yellow-400 rounded-full shadow-lg"
                            animate={{ 
                              scale: [1, 1.3, 1],
                              opacity: [1, 0.7, 1]
                            }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity,
                              delay: index * 0.3
                            }}
                          />
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-yellow-400 text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
                            {marker.region}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Animated pulse effect */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-yellow-400/20 rounded-2xl"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      opacity: [0.3, 0.1, 0.3]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Coverage Stats */}
            <motion.div 
              className="space-y-8"
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
              }}
            >
              <div>
                <h3 className="text-3xl font-bold text-yellow-400 mb-6">Regional Coverage</h3>
                <p className="text-lg text-gray-300 mb-8">
                  Our smart property management system is actively deployed across multiple regions in Ghana, 
                  with continuous expansion to serve more communities.
                </p>
              </div>

              {[
                { region: "Greater Accra", properties: "1,247", pillars: "45", status: "Active" },
                { region: "Ashanti", properties: "892", pillars: "32", status: "Active" },
                { region: "Eastern", properties: "623", pillars: "28", status: "Expanding" },
                { region: "Central", properties: "387", pillars: "19", status: "Planning" }
              ].map((area, index) => (
                <motion.div 
                  key={index}
                  className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700/50"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  whileHover={{ x: 10 }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-white mb-1">{area.region}</h4>
                      <p className="text-sm text-gray-400">{area.properties} properties • {area.pillars} pillars</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-green-400" />
                      <span className={`text-sm px-3 py-1 rounded-full ${
                        area.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                        area.status === 'Expanding' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {area.status}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Embedded Video Section */}
      <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            ref={videoRef}
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={videoControls}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
            }}
          >
            <h2 className="text-base text-yellow-400 font-semibold tracking-wide uppercase mb-4">Watch Our Story</h2>
            <p className="text-4xl leading-10 font-bold tracking-tight bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
              Why ARVIPOA Matters
            </p>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-300">
              Discover how we're revolutionizing property registration and smart safety infrastructure across Ghana.
            </p>
          </motion.div>

          <motion.div 
            className="max-w-5xl mx-auto"
            initial="hidden"
            animate={videoControls}
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { 
                opacity: 1, 
                scale: 1, 
                transition: { duration: 0.8, delay: 0.3 } 
              }
            }}
          >
            <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-gray-700/50">
              {/* Video Container */}
              <motion.div 
                className="relative aspect-video bg-gradient-to-br from-green-900/50 to-gray-900/50 rounded-2xl overflow-hidden group cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Video Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-yellow-500/20 flex items-center justify-center">
                  <motion.div 
                    className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-green-400 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <Play className="w-10 h-10 text-gray-900 ml-1" fill="currentColor" />
                  </motion.div>
                </div>

                {/* Video overlay text */}
                <div className="absolute inset-0 bg-black/40 flex items-end p-8">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">ARVIPOA: Transforming Property Management</h3>
                    <p className="text-gray-200">Experience the future of smart property registration and security</p>
                  </div>
                </div>

                {/* Iframe for actual video - placeholder for now */}
                <iframe
                  className="absolute inset-0 w-full h-full opacity-0 hover:opacity-100 transition-opacity duration-300"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&mute=1"
                  title="ARVIPOA Property Management Demo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </motion.div>

              {/* Video Caption */}
              <motion.div 
                className="mt-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-lg text-gray-300 leading-relaxed">
                  "See how we're transforming property registration and smart safety infrastructure 
                  through innovative technology, community engagement, and sustainable development practices."
                </p>
                <div className="mt-6 flex justify-center space-x-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">50K+</div>
                    <div className="text-sm text-gray-400">Video Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">98%</div>
                    <div className="text-sm text-gray-400">Satisfaction Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">25+</div>
                    <div className="text-sm text-gray-400">Awards Won</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
