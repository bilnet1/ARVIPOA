import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { Search, Download, Trash2, Loader2, Star, TrendingUp, Info } from "lucide-react";

interface Submission {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  propertyType: string;
  location: string;
  timestamp: any;
  status?: "Pending" | "Approved" | "Rejected";
}

interface PropertyRecommendation {
  type: string;
  reason: string;
  score: number;
}

// Onboarding Tour Component
const OnboardingTour = ({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) => {
  const [step, setStep] = useState(0);
  
  const tourSteps = [
    { title: "Welcome to ARVIPOA Admin", description: "Manage property registrations with powerful tools", target: "dashboard-title" },
    { title: "Search & Filter", description: "Use these controls to find specific registrations", target: "search-controls" },
    { title: "Status Management", description: "Update registration status directly in the table", target: "status-column" },
    { title: "Export Data", description: "Download all data as CSV for reporting", target: "export-button" }
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-[#002818] p-6 rounded-lg max-w-md mx-4 border border-[#D4AF37]">
        <h3 className="text-[#D4AF37] font-bold text-lg mb-2">{tourSteps[step].title}</h3>
        <p className="text-white mb-4">{tourSteps[step].description}</p>
        <div className="flex justify-between">
          <button 
            onClick={() => step > 0 ? setStep(step - 1) : onClose()}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            {step === 0 ? "Skip" : "Previous"}
          </button>
          <span className="text-gray-300 self-center">{step + 1} of {tourSteps.length}</span>
          <button 
            onClick={() => step < tourSteps.length - 1 ? setStep(step + 1) : onClose()}
            className="px-4 py-2 bg-[#D4AF37] text-black rounded hover:bg-yellow-500"
          >
            {step === tourSteps.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Admin() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<Submission[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [propertyTypeFilter, setPropertyTypeFilter] = useState<string>("All");
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [showTour, setShowTour] = useState(false);
  const [recommendations, setRecommendations] = useState<PropertyRecommendation[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Sound effects
  const playSound = (type: 'success' | 'delete' | 'update') => {
    if (!soundEnabled) return;
    const audio = new Audio();
    audio.volume = 0.3;
    switch (type) {
      case 'success':
        audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmAYBz+Y4/LJcSEELITO8tiJOQcZar';
        break;
      case 'delete':
        audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmAYBz+Y4/LJcSEELITO8tiJOQcZaq';
        break;
      case 'update':
        audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmAYBz+Y4/LJcSEELITO8tiJOQcZaq';
        break;
    }
    audio.play().catch(() => {}); // Ignore errors
  };

  // Check if first visit for onboarding
  useEffect(() => {
    const hasVisited = localStorage.getItem('arvipoa_admin_visited');
    if (!hasVisited) {
      setShowTour(true);
      localStorage.setItem('arvipoa_admin_visited', 'true');
    }
  }, []);

  // Generate AI-powered recommendations
  const generateRecommendations = (submissions: Submission[]) => {
    if (submissions.length === 0) return [];
    
    const propertyTypes = submissions.reduce((acc, sub) => {
      acc[sub.propertyType] = (acc[sub.propertyType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const locations = submissions.reduce((acc, sub) => {
      acc[sub.location] = (acc[sub.location] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const recs: PropertyRecommendation[] = [];
    
    // Most popular property type
    const topProperty = Object.entries(propertyTypes).sort(([,a], [,b]) => b - a)[0];
    if (topProperty) {
      recs.push({
        type: `Focus on ${topProperty[0]}`,
        reason: `${topProperty[1]} registrations (${Math.round(topProperty[1]/submissions.length*100)}% of total)`,
        score: Math.min(95, Math.round(topProperty[1]/submissions.length*100))
      });
    }

    // Location insights
    const topLocation = Object.entries(locations).sort(([,a], [,b]) => b - a)[0];
    if (topLocation) {
      recs.push({
        type: `Expand in ${topLocation[0]}`,
        reason: `High demand area with ${topLocation[1]} registrations`,
        score: Math.min(90, 70 + Math.round(topLocation[1]/submissions.length*20))
      });
    }

    return recs;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "registrations"));
        const data: Submission[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          status: "Pending",
          ...doc.data(),
        })) as Submission[];
        setSubmissions(data);
        setFilteredSubmissions(data);
        setRecommendations(generateRecommendations(data));
        playSound('success');
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to load registrations. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter submissions based on search and filters
  useEffect(() => {
    let filtered = submissions.filter(submission => {
      const matchesSearch = 
        submission.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.phone.includes(searchTerm) ||
        submission.propertyType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "All" || submission.status === statusFilter;
      const matchesPropertyType = propertyTypeFilter === "All" || submission.propertyType === propertyTypeFilter;
      
      return matchesSearch && matchesStatus && matchesPropertyType;
    });
    
    setFilteredSubmissions(filtered);
  }, [submissions, searchTerm, statusFilter, propertyTypeFilter]);

  const updateStatus = async (id: string, newStatus: "Pending" | "Approved" | "Rejected") => {
    try {
      await updateDoc(doc(db, "registrations", id), { status: newStatus });
      setSubmissions(prev => prev.map(sub => 
        sub.id === id ? { ...sub, status: newStatus } : sub
      ));
      playSound('update');
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Please try again.");
    }
  };

  const deleteSubmission = async (id: string, name: string) => {
    const confirmed = window.confirm(`Are you sure you want to delete the registration for "${name}"? This action cannot be undone.`);
    
    if (!confirmed) return;
    
    try {
      setDeleting(id);
      await deleteDoc(doc(db, "registrations", id));
      setSubmissions(prev => prev.filter(sub => sub.id !== id));
      playSound('delete');
    } catch (error) {
      console.error("Error deleting submission:", error);
      alert("Failed to delete registration. Please try again.");
    } finally {
      setDeleting(null);
    }
  };

  // Property health score calculation
  const calculateHealthScore = (submission: Submission): number => {
    let score = 70; // Base score
    
    // Status bonus
    if (submission.status === "Approved") score += 20;
    else if (submission.status === "Rejected") score -= 30;
    
    // Recent registration bonus
    if (submission.timestamp?.toDate) {
      const days = Math.floor((Date.now() - submission.timestamp.toDate()) / (1000 * 60 * 60 * 24));
      if (days < 7) score += 10;
      else if (days < 30) score += 5;
    }
    
    // Property type popularity bonus
    const typeCount = submissions.filter(s => s.propertyType === submission.propertyType).length;
    if (typeCount > submissions.length * 0.3) score += 10;
    
    return Math.max(0, Math.min(100, score));
  };

  const exportToCSV = () => {
    const headers = ["Name", "Email", "Phone", "Property Type", "Location", "Status", "Health Score", "Date", "ID"];
    const csvContent = [
      headers.join(","),
      ...filteredSubmissions.map(sub => [
        `"${sub.fullName}"`,
        `"${sub.email}"`,
        `"${sub.phone}"`,
        `"${sub.propertyType}"`,
        `"${sub.location}"`,
        `"${sub.status || 'Pending'}"`,
        `"${calculateHealthScore(sub)}"`,
        `"${sub.timestamp?.toDate?.().toLocaleString?.() || 'N/A'}"`,
        `"${sub.id}"`
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `arvipoa_registrations_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    playSound('success');
  };

  if (loading) {
    return (
      <section className="bg-[#001b14] text-white min-h-screen py-10 px-4 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-[#D4AF37] mx-auto mb-4" />
          <p className="text-xl text-gray-300">Loading registrations...</p>
          <div className="mt-4 flex space-x-2 justify-center">
            <div className="w-3 h-3 bg-[#D4AF37] rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-[#D4AF37] rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-3 h-3 bg-[#D4AF37] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#001b14] text-white min-h-screen py-10 px-4">
      <OnboardingTour isVisible={showTour} onClose={() => setShowTour(false)} />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6" id="dashboard-title">
          <h2 className="text-3xl font-bold text-[#D4AF37]">Admin Dashboard</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`px-3 py-2 rounded-lg transition-colors ${soundEnabled ? 'bg-[#D4AF37] text-black' : 'bg-gray-600 text-white'}`}
              title="Toggle sound effects"
            >
              🔊
            </button>
            <button
              onClick={() => setShowTour(true)}
              className="px-3 py-2 bg-[#D4AF37] text-black rounded-lg hover:bg-yellow-500 transition-colors"
              title="Start tour"
            >
              <Info className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* AI Recommendations Panel */}
        {recommendations.length > 0 && (
          <div className="bg-gradient-to-r from-[#002818] to-[#014322] rounded-lg p-6 mb-6 border border-[#D4AF37]/20">
            <h3 className="text-[#D4AF37] font-bold text-lg mb-4 flex items-center gap-2">
              <Star className="h-5 w-5" />
              AI-Powered Insights
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="bg-[#001b14] p-4 rounded-lg border border-gray-600">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-white">{rec.type}</h4>
                    <span className="text-[#D4AF37] font-bold">{rec.score}%</span>
                  </div>
                  <p className="text-gray-300 text-sm">{rec.reason}</p>
                  <div className="mt-2 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-[#D4AF37] to-yellow-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${rec.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Search and Filter Controls */}
        <div className="bg-[#002818] rounded-lg p-6 mb-6 space-y-4" id="search-controls">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, phone, property type, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#001b14] border border-gray-600 rounded-lg text-white focus:border-[#D4AF37] focus:outline-none transition-colors"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-[#001b14] border border-gray-600 rounded-lg text-white focus:border-[#D4AF37] focus:outline-none transition-colors"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
            
            <select
              value={propertyTypeFilter}
              onChange={(e) => setPropertyTypeFilter(e.target.value)}
              className="px-4 py-2 bg-[#001b14] border border-gray-600 rounded-lg text-white focus:border-[#D4AF37] focus:outline-none transition-colors"
            >
              <option value="All">All Property Types</option>
              <option value="Land">Land</option>
              <option value="House">House</option>
              <option value="Shop">Shop</option>
              <option value="Warehouse">Warehouse</option>
              <option value="River Access">River Access</option>
            </select>
            
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 bg-[#D4AF37] hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105"
              id="export-button"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-4 flex justify-between items-center">
          <p className="text-gray-300">
            Showing {filteredSubmissions.length} of {submissions.length} registrations
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <TrendingUp className="h-4 w-4" />
            <span>Live data from Firebase</span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-[#002818] rounded-lg shadow">
          <table className="min-w-full table-auto border-collapse text-sm">
            <thead>
              <tr className="bg-[#014322] text-left">
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Phone</th>
                <th className="px-4 py-3 font-semibold">Property Type</th>
                <th className="px-4 py-3 font-semibold">Location</th>
                <th className="px-4 py-3 font-semibold" id="status-column">Status</th>
                <th className="px-4 py-3 font-semibold">Health Score</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubmissions.map((submission) => {
                const healthScore = calculateHealthScore(submission);
                return (
                  <tr key={submission.id} className="border-t border-[#01391a] hover:bg-[#01321a] transition-all duration-200">
                    <td className="px-4 py-3 font-medium">{submission.fullName}</td>
                    <td className="px-4 py-3">{submission.email}</td>
                    <td className="px-4 py-3">{submission.phone}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-[#D4AF37]/20 text-[#D4AF37] rounded-full text-xs">
                        {submission.propertyType}
                      </span>
                    </td>
                    <td className="px-4 py-3">{submission.location}</td>
                    <td className="px-4 py-3">
                      <select
                        value={submission.status || "Pending"}
                        onChange={(e) => updateStatus(submission.id, e.target.value as "Pending" | "Approved" | "Rejected")}
                        className={`px-3 py-1 rounded-full text-xs font-medium border-0 focus:outline-none cursor-pointer transition-all duration-200 hover:scale-105 ${
                          submission.status === "Approved" ? "bg-green-600 text-white" :
                          submission.status === "Rejected" ? "bg-red-600 text-white" :
                          "bg-yellow-600 text-black"
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-1000 ${
                              healthScore >= 80 ? 'bg-green-500' :
                              healthScore >= 60 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${healthScore}%` }}
                          ></div>
                        </div>
                        <span className={`text-xs font-bold ${
                          healthScore >= 80 ? 'text-green-400' :
                          healthScore >= 60 ? 'text-yellow-400' :
                          'text-red-400'
                        }`}>
                          {healthScore}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      {submission.timestamp?.toDate?.().toLocaleDateString?.() || "N/A"}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => deleteSubmission(submission.id, submission.fullName)}
                        disabled={deleting === submission.id}
                        className="flex items-center gap-1 bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105 disabled:cursor-not-allowed"
                        title="Delete registration"
                      >
                        {deleting === submission.id ? (
                          <>
                            <Loader2 className="h-3 w-3 animate-spin" />
                            Deleting...
                          </>
                        ) : (
                          <>
                            <Trash2 className="h-3 w-3" />
                            Delete
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
          {filteredSubmissions.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p className="text-lg">No registrations found</p>
                <p className="text-sm">Try adjusting your search or filter criteria</p>
              </div>
            </div>
          )}
        </div>

        {/* Statistics Footer */}
        {submissions.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-[#002818] p-4 rounded-lg border border-gray-600">
              <h4 className="text-[#D4AF37] font-semibold">Total Registrations</h4>
              <p className="text-2xl font-bold text-white">{submissions.length}</p>
            </div>
            <div className="bg-[#002818] p-4 rounded-lg border border-gray-600">
              <h4 className="text-green-400 font-semibold">Approved</h4>
              <p className="text-2xl font-bold text-white">
                {submissions.filter(s => s.status === "Approved").length}
              </p>
            </div>
            <div className="bg-[#002818] p-4 rounded-lg border border-gray-600">
              <h4 className="text-yellow-400 font-semibold">Pending</h4>
              <p className="text-2xl font-bold text-white">
                {submissions.filter(s => s.status === "Pending" || !s.status).length}
              </p>
            </div>
            <div className="bg-[#002818] p-4 rounded-lg border border-gray-600">
              <h4 className="text-red-400 font-semibold">Rejected</h4>
              <p className="text-2xl font-bold text-white">
                {submissions.filter(s => s.status === "Rejected").length}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}