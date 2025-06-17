import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { 
  User as UserIcon, 
  Shield, 
  Home, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  LogOut,
  Edit,
  Camera,
  Settings,
  Eye,
  Flame,
  Waves,
  Music,
  Droplet,
  Lock,
  Video,
  Monitor
} from "lucide-react";

interface VerificationSection {
  id: string;
  title: string;
  description: string;
  status: "completed" | "pending" | "not_started";
  icon: React.ComponentType<any>;
  fields: { label: string; value: string; required: boolean }[];
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [isVerifiedLandowner, setIsVerifiedLandowner] = useState(true); // Check user verification status
  const [hasDevices, setHasDevices] = useState(true); // Check if user has registered devices
  const navigate = useNavigate();

  const [verificationSections, setVerificationSections] = useState<VerificationSection[]>([
    {
      id: "personal_info",
      title: "Personal Information",
      description: "Basic personal details for account verification",
      status: "not_started",
      icon: UserIcon,
      fields: [
        { label: "Full Name", value: "", required: true },
        { label: "Date of Birth", value: "", required: true },
        { label: "National ID", value: "", required: true },
        { label: "Phone Number", value: "", required: true }
      ]
    },
    {
      id: "property_purpose",
      title: "Property Purpose",
      description: "Intended use and purpose for property registration",
      status: "pending",
      icon: Home,
      fields: [
        { label: "Property Type", value: "Residential", required: true },
        { label: "Intended Use", value: "", required: true },
        { label: "Location Preference", value: "", required: false },
        { label: "Budget Range", value: "", required: false }
      ]
    },
    {
      id: "identity_verification",
      title: "Identity Verification",
      description: "Document verification for secure access",
      status: "completed",
      icon: Shield,
      fields: [
        { label: "Government ID", value: "Verified", required: true },
        { label: "Address Proof", value: "Pending", required: true },
        { label: "Biometric Data", value: "Completed", required: true }
      ]
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

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-50 border-green-200 text-green-800";
      case "pending":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      case "not_started":
        return "bg-red-50 border-red-200 text-red-800";
      default:
        return "bg-gray-50 border-gray-200 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case "not_started":
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Verified";
      case "pending":
        return "In Progress";
      case "not_started":
        return "Not Started";
      default:
        return "Unknown";
    }
  };

  const completedSections = verificationSections.filter(s => s.status === "completed").length;
  const progressPercentage = (completedSections / verificationSections.length) * 100;

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <UserIcon className="w-8 h-8 text-white" />
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {user.displayName || user.email?.split('@')[0] || "User"}
                </h1>
                <p className="text-gray-600 flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  {user.email}
                </p>
                {user.phoneNumber && (
                  <p className="text-gray-600 flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    {user.phoneNumber}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center px-4 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex space-x-8">
            {[
              { id: "overview", label: "Overview", icon: UserIcon },
              { id: "verification", label: "Verification", icon: Shield },
              { id: "settings", label: "Settings", icon: Settings }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <IconComponent className="w-5 h-5 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Progress Overview */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Verification Progress</h2>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                <span className="text-sm font-medium text-green-600">{completedSections}/{verificationSections.length} sections completed</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">{Math.round(progressPercentage)}% complete</p>
            </div>

            {/* Account Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Account Information</h2>
                <div className="flex space-x-3">
                  <Link 
                    to="/profile-details"
                    className="group relative px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-white rounded-xl hover:from-[#B8860B] hover:to-[#D4AF37] font-medium transition-all duration-300 hover-lift"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                    <div className="relative flex items-center">
                      <Edit className="w-4 h-4 mr-2" />
                      Complete Info
                    </div>
                  </Link>
                  <button className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </button>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-900">{user.email}</span>
                      {user.emailVerified && <CheckCircle className="w-5 h-5 text-green-500 ml-2" />}
                    </div>
                  </div>
                  {user.phoneNumber && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 text-gray-400 mr-3" />
                        <span className="text-gray-900">{user.phoneNumber}</span>
                        <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Account Created</label>
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-900">
                        {user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : "Unknown"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Sign In</label>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-900">
                        {user.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleDateString() : "Unknown"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "verification" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Verification Status</h2>
              
              {verificationSections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <div key={section.id} className={`border-2 rounded-xl p-6 mb-6 ${getStatusColor(section.status)}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-4">
                          <IconComponent className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{section.title}</h3>
                          <p className="text-sm opacity-75">{section.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {getStatusIcon(section.status)}
                        <span className="ml-2 font-medium">{getStatusText(section.status)}</span>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      {section.fields.map((field, index) => (
                        <div key={index} className="bg-white bg-opacity-50 rounded-lg p-3">
                          <label className="block text-sm font-medium mb-1">
                            {field.label}
                            {field.required && <span className="text-red-500 ml-1">*</span>}
                          </label>
                          <span className="text-sm text-gray-700">{field.value || "Not provided"}</span>
                        </div>
                      ))}
                    </div>
                    
                    {section.status !== "completed" && (
                      <div className="mt-4 pt-4 border-t border-white border-opacity-30">
                        <button className="bg-white text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                          {section.status === "not_started" ? "Start Verification" : "Continue Verification"}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h2>
            <div className="space-y-6">
              <div className="border-b pb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Privacy & Security</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-900">Two-Factor Authentication</label>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      Enable
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-900">Email Notifications</label>
                      <p className="text-sm text-gray-500">Receive updates about your property registrations</p>
                    </div>
                    <input type="checkbox" className="w-4 h-4 text-green-600" defaultChecked />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Danger Zone</h3>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
