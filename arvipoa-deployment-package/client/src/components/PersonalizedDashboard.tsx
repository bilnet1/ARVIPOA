import { useState, useEffect } from "react";
import { TrendingUp, Users, MapPin, Clock, Award, Bell } from "lucide-react";

interface DashboardWidget {
  id: string;
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: string;
}

export default function PersonalizedDashboard() {
  const [widgets, setWidgets] = useState<DashboardWidget[]>([
    {
      id: "properties",
      title: "Your Properties",
      value: "12",
      change: "+2 this month",
      icon: <MapPin className="h-6 w-6" />,
      color: "text-blue-400"
    },
    {
      id: "value",
      title: "Portfolio Value",
      value: "₵2.4M",
      change: "+8.2% this quarter",
      icon: <TrendingUp className="h-6 w-6" />,
      color: "text-green-400"
    },
    {
      id: "community",
      title: "Community Score",
      value: "94%",
      change: "+5 points",
      icon: <Users className="h-6 w-6" />,
      color: "text-[#D4AF37]"
    },
    {
      id: "activity",
      title: "Recent Activity",
      value: "7",
      change: "actions today",
      icon: <Clock className="h-6 w-6" />,
      color: "text-purple-400"
    }
  ]);

  const [notifications] = useState([
    "Property verification completed for Land #A204",
    "New community member joined near your Tema property",
    "Smart Pillar maintenance scheduled for next week"
  ]);

  return (
    <section className="bg-[#001b14] text-white px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-[#D4AF37]">Your Dashboard</h2>
          <div className="flex items-center gap-2 text-gray-300">
            <Bell className="h-5 w-5" />
            <span className="text-sm">{notifications.length} updates</span>
          </div>
        </div>

        {/* Quick Insights Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {widgets.map((widget) => (
            <div key={widget.id} className="bg-[#002818] rounded-lg p-6 border border-gray-700 hover:border-[#D4AF37]/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={widget.color}>
                  {widget.icon}
                </div>
                <Award className="h-4 w-4 text-gray-500" />
              </div>
              <h3 className="text-gray-400 text-sm font-medium mb-2">{widget.title}</h3>
              <p className="text-2xl font-bold text-white mb-1">{widget.value}</p>
              <p className="text-xs text-green-400">{widget.change}</p>
            </div>
          ))}
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-[#002818] rounded-lg p-6 border border-gray-700">
          <h3 className="text-[#D4AF37] font-bold text-lg mb-4">Recent Notifications</h3>
          <div className="space-y-3">
            {notifications.map((notification, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-[#001b14] rounded-lg">
                <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                <p className="text-gray-300 text-sm">{notification}</p>
                <span className="text-xs text-gray-500 ml-auto">2h ago</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}