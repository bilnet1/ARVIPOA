import { AlertTriangle, Cpu, Map, Radio, ShieldCheck, Zap } from "lucide-react";
import smartPillarImage from "@/assets/images/smart-pillar.png";

export default function SmartFlow() {
  const steps = [
    {
      icon: <ShieldCheck className="h-8 w-8 text-[#D4AF37]" />,
      title: "Smart Pillar Activation",
      desc: "Pillar sensors detect motion, gunshots, or fire triggers in protected zones.",
    },
    {
      icon: <Cpu className="h-8 w-8 text-[#D4AF37]" />,
      title: "AI Signal Processing",
      desc: "AI verifies the threat using pattern recognition and real-time data.",
    },
    {
      icon: <Radio className="h-8 w-8 text-[#D4AF37]" />,
      title: "Instant Alert Dispatch",
      desc: "Notifications sent to MDA, Admin, and local authorities with GPS data.",
    },
    {
      icon: <Zap className="h-8 w-8 text-[#D4AF37]" />,
      title: "Community or Drone Response",
      desc: "Local teams or automated drones are triggered for rapid response.",
    },
    {
      icon: <Map className="h-8 w-8 text-[#D4AF37]" />,
      title: "Live Map + Logs Update",
      desc: "All activity is logged and synced to the central monitoring dashboard.",
    },
  ];

  return (
    <section className="py-20 text-white" style={{ background: "linear-gradient(to bottom, #002b1d, #000)" }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#D4AF37] mb-6">How ARVIPOA Works</h2>
          <p className="text-gray-300 mb-12">
            Our civic-tech system uses smart sensors, AI, and local enforcement to protect land and river spaces in real time.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="order-2 lg:order-1">
            <img 
              src={smartPillarImage} 
              alt="ARVIPOA Smart Pillar - Advanced boundary protection system with sensors and AI technology"
              className="w-full h-auto rounded-lg shadow-2xl"
            />
            <div className="mt-4 text-center">
              <h3 className="text-xl font-semibold text-[#D4AF37] mb-2">ARVIPOA Smart Pillar</h3>
              <p className="text-sm text-gray-300">
                Advanced boundary protection system equipped with motion sensors, AI processing, and real-time communication capabilities
              </p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="grid gap-6">
              {steps.map((step, index) => (
                <div key={index} className="bg-[#001d14] p-6 rounded-lg shadow hover:shadow-lg transition flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">{step.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#D4AF37] mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-300">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
