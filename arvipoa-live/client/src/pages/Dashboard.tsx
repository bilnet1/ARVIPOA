import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { 
  Home, 
  MapPin, 
  Calendar, 
  Bell, 
  TrendingUp, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  Camera,
  Users,
  Activity
} from "lucide-react";

interface PropertyData {
  id: string;
  title: string;
  location: string;
  type: "Land" | "House" | "Commercial" | "Industrial";
  status: "Active" | "Pending" | "Verified" | "Under Review";
  value: number;
  registrationDate: string;
  documents: number;
  verificationScore: number;
}

interface NotificationData {
  id: string;
  type: "info" | "warning" | "success" | "error";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState("overview");
  const navigate = useNavigate();

  const [properties] = useState<PropertyData[]>([
    {
      id: "1",
      title: "Riverside Plot - Akosombo",
      location: "Akosombo River View, Eastern Region",
      type: "Land",
      status: "Verified",
      value: 45000,
      registrationDate: "2024-01-15",
      documents: 4,
      verificationScore: 95
    },
    {
      id: "2",
      title: "Commercial Building - Accra",
      location: "East Legon, Greater Accra",
      type: "Commercial",
      status: "Pending",
      value: 180000,
      registrationDate: "2024-02-03",
      documents: 6,
      verificationScore: 72
    },
    {
      id: "3",
      title: "Residential House - Tema",
      location: "Community 25, Tema",
      type: "House",
      status: "Under Review",
      value: 95000,
      registrationDate: "2024-02-20",
      documents: 3,
      verificationScore: 58
    }
  ]);

  const [notifications] = useState<NotificationData[]>([
    {
      id: "1",
      type: "success",
      title: "Property Verification Complete",
      message: "Your Akosombo Riverside Plot has been successfully verified and registered.",
      timestamp: "2024-02-25T10:30:00Z",
      read: false
    },
    {
      id: "2",
      type: "warning",
      title: "Document Upload Required",
      message: "Additional documents needed for your Commercial Building registration.",
      timestamp: "2024-02-24T14:15:00Z",
      read: false
    },
    {
      id: "3",
      type: "info",
      title: "Smart Pillar Installation Scheduled",
      message: "IoT monitoring system installation scheduled for next week.",
      timestamp: "2024-02-23T09:00:00Z",
      read: true
    },
    {
      id: "4",
      type: "error",
      title: "Verification Issue Detected",
      message: "Discrepancy found in land survey documents. Please review and resubmit.",
      timestamp: "2024-02-22T16:45:00Z",
      read: true
    }
  ]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (!currentUser) {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Verified":
        return "bg-green-100 text-green-800 border-green-200";
      case "Active":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Under Review":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case "error":
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <Bell className="w-5 h-5 text-blue-500" />;
    }
  };

  const totalValue = properties.reduce((sum, property) => sum + property.value, 0);
  const verifiedProperties = properties.filter(p => p.status === "Verified").length;
  const unreadNotifications = notifications.filter(n => !n.read).length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-20 w-24 h-24 bg-[#D4AF37]/5 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-60 right-32 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/3 w-28 h-28 bg-green-500/5 rounded-full blur-xl animate-float delay-2000"></div>
      </div>

      {/* Header */}
      <div className="relative bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="animate-fade-in-left">
              <h1 className="text-4xl font-bold text-gradient-gold mb-2">Property Dashboard</h1>
              <p className="text-gray-600 text-lg">Manage your ARVIPOA property portfolio with advanced analytics</p>
            </div>
            <div className="flex items-center space-x-6 animate-fade-in-right">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-full blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
                <div className="relative bg-white rounded-full p-3 hover-lift">
                  <Bell className="w-6 h-6 text-gray-600 group-hover:text-[#D4AF37] transition-colors" />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse-glow font-medium">
                      {unreadNotifications}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[#D4AF37]">{totalValue.toLocaleString()}</div>
                <div className="text-sm text-gray-500">Portfolio Value (₵)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex space-x-8">
            {[
              { id: "overview", label: "Overview", icon: Activity },
              { id: "properties", label: "Properties", icon: Home },
              { id: "notifications", label: "Notifications", icon: Bell },
              { id: "analytics", label: "Analytics", icon: TrendingUp }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveView(tab.id)}
                  className={`flex items-center py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeView === tab.id
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <IconComponent className="w-5 h-5 mr-2" />
                  {tab.label}
                  {tab.id === "notifications" && unreadNotifications > 0 && (
                    <span className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeView === "overview" && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="group relative animate-fade-in-up delay-100">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative glass-effect rounded-2xl p-6 hover-lift">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-2">Total Properties</p>
                      <p className="text-3xl font-bold text-gray-900">{properties.length}</p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-xl animate-float">
                      <Home className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-blue-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                    Registered properties
                  </div>
                </div>
              </div>

              <div className="group relative animate-fade-in-up delay-200">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative glass-effect rounded-2xl p-6 hover-lift">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-2">Verified Properties</p>
                      <p className="text-3xl font-bold text-gray-900">{verifiedProperties}</p>
                    </div>
                    <div className="p-3 bg-green-100 rounded-xl animate-float delay-1000">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    Fully verified
                  </div>
                </div>
              </div>

              <div className="group relative animate-fade-in-up delay-300">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative glass-effect rounded-2xl p-6 hover-lift">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-2">Portfolio Value</p>
                      <p className="text-3xl font-bold text-gradient-gold">₵{totalValue.toLocaleString()}</p>
                    </div>
                    <div className="p-3 bg-yellow-100 rounded-xl animate-float delay-2000">
                      <DollarSign className="w-8 h-8 text-[#D4AF37]" />
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-[#D4AF37]">
                    <div className="w-2 h-2 bg-[#D4AF37] rounded-full mr-2 animate-pulse"></div>
                    Total estimated value
                  </div>
                </div>
              </div>

              <div className="group relative animate-fade-in-up delay-400">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative glass-effect rounded-2xl p-6 hover-lift">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-2">Active Alerts</p>
                      <p className="text-3xl font-bold text-gray-900">{unreadNotifications}</p>
                    </div>
                    <div className="p-3 bg-red-100 rounded-xl animate-float delay-3000">
                      <Bell className="w-8 h-8 text-red-600" />
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-red-600">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                    Require attention
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Properties */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Properties</h2>
              <div className="space-y-4">
                {properties.slice(0, 3).map((property) => (
                  <div key={property.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Home className="w-6 h-6 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{property.title}</h3>
                        <p className="text-sm text-gray-500 flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {property.location}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(property.status)}`}>
                        {property.status}
                      </span>
                      <p className="text-sm text-gray-500 mt-1">₵{property.value.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeView === "properties" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Property Portfolio</h2>
              <button 
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                onClick={() => navigate('/registration-hub')}
              >
                Register New Property
              </button>
            </div>

            <div className="grid gap-6">
              {properties.map((property) => (
                <div key={property.id} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-4">
                        <h3 className="text-xl font-bold text-gray-900">{property.title}</h3>
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(property.status)}`}>
                          {property.status}
                        </span>
                      </div>
                      
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Location</p>
                          <p className="text-sm text-gray-900 flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {property.location}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Property Type</p>
                          <p className="text-sm text-gray-900">{property.type}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Estimated Value</p>
                          <p className="text-sm text-gray-900">₵{property.value.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Registration Date</p>
                          <p className="text-sm text-gray-900 flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(property.registrationDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="flex items-center">
                          <FileText className="w-5 h-5 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-600">{property.documents} documents</span>
                        </div>
                        <div className="flex items-center">
                          <Shield className="w-5 h-5 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-600">{property.verificationScore}% verified</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                        <Camera className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                        <FileText className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeView === "notifications" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
            
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className={`bg-white rounded-xl shadow-sm p-6 ${!notification.read ? 'ring-2 ring-blue-200' : ''}`}>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">{notification.title}</h3>
                        <span className="text-sm text-gray-500">
                          {new Date(notification.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-600">{notification.message}</p>
                      {!notification.read && (
                        <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-2">
                          New
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeView === "analytics" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Property Analytics</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Property Types Distribution</h3>
                <div className="space-y-3">
                  {["Land", "House", "Commercial", "Industrial"].map((type) => {
                    const count = properties.filter(p => p.type === type).length;
                    const percentage = properties.length > 0 ? (count / properties.length) * 100 : 0;
                    return (
                      <div key={type} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{type}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{count}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Verification Status</h3>
                <div className="space-y-3">
                  {["Verified", "Pending", "Under Review", "Active"].map((status) => {
                    const count = properties.filter(p => p.status === status).length;
                    const percentage = properties.length > 0 ? (count / properties.length) * 100 : 0;
                    return (
                      <div key={status} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{status}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{count}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}