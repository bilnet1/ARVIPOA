import { Link } from "react-router-dom";
import { Scale, Shield, Users, Home, Cookie, Smartphone, FileText, Eye, Building, Gavel } from "lucide-react";

export default function LegalHub() {
  const legalDocuments = [
    {
      title: "Terms of Use",
      description: "Comprehensive terms governing your use of ARVIPOA services including smart infrastructure and AI features",
      icon: Scale,
      path: "/terms",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50 hover:bg-green-100",
      borderColor: "border-green-200"
    },
    {
      title: "Privacy Policy",
      description: "How we collect, use, and protect your personal information across all ARVIPOA platforms",
      icon: Shield,
      path: "/privacy-policy",
      color: "from-blue-500 to-indigo-500",
      bgColor: "bg-blue-50 hover:bg-blue-100",
      borderColor: "border-blue-200"
    },
    {
      title: "Property Owners Terms",
      description: "Specific terms for property owners including drone inspections, smart cards, and river security",
      icon: Building,
      path: "/property-owners-terms",
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50 hover:bg-emerald-100",
      borderColor: "border-emerald-200"
    },
    {
      title: "Buyers & Tenants Terms",
      description: "Terms for property buyers and tenants including daily rent schemes and dispute resolution",
      icon: Users,
      path: "/buyers-tenants-terms",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50 hover:bg-purple-100",
      borderColor: "border-purple-200"
    },
    {
      title: "Ghana Property Law",
      description: "Comprehensive guide to Ghana's Land Act 2020, registration processes, and legal compliance",
      icon: Gavel,
      path: "/property-law",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50 hover:bg-orange-100",
      borderColor: "border-orange-200"
    },
    {
      title: "Cookie Policy",
      description: "How we use cookies and tracking technologies to enhance your experience on our platform",
      icon: Cookie,
      path: "/cookie-policy",
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50 hover:bg-amber-100",
      borderColor: "border-amber-200"
    },
    {
      title: "Mobile App License (EULA)",
      description: "End User License Agreement for iOS and Android applications with technical requirements",
      icon: Smartphone,
      path: "/eula",
      color: "from-cyan-500 to-blue-500",
      bgColor: "bg-cyan-50 hover:bg-cyan-100",
      borderColor: "border-cyan-200"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <FileText className="h-20 w-20 text-blue-600 mr-4 animate-pulse" />
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                <Scale className="w-4 h-4 text-white" />
              </div>
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Legal Hub
            </h1>
          </div>
          <div className="bg-white rounded-3xl shadow-2xl p-10 mb-12">
            <p className="text-3xl font-semibold text-gray-800 mb-4">
              Comprehensive Legal Documentation
            </p>
            <p className="text-xl text-gray-600 mb-6">
              Akosombo River View Land and Island Property Owners Association LBG
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                <span>Transparent Policies</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span>Data Protection</span>
              </div>
              <div className="flex items-center gap-2">
                <Gavel className="w-5 h-5" />
                <span>Legal Compliance</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Documents Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {legalDocuments.map((doc, index) => {
            const IconComponent = doc.icon;
            return (
              <Link 
                key={index}
                to={doc.path}
                className={`${doc.bgColor} rounded-2xl p-8 border-2 ${doc.borderColor} transition-all duration-300 hover:scale-105 hover:shadow-xl group`}
              >
                <div className="flex items-start mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${doc.color} flex items-center justify-center mr-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-gray-900">
                      {doc.title}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {doc.description}
                </p>
                <div className="flex items-center text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  <span>View Document</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick Access Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Quick Access by Category</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <Building className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">Property Owners</h3>
              <div className="space-y-2">
                <Link to="/property-owners-terms" className="block text-sm text-blue-600 hover:text-blue-800">Property Owners Terms</Link>
                <Link to="/property-law" className="block text-sm text-blue-600 hover:text-blue-800">Ghana Property Law</Link>
                <Link to="/terms" className="block text-sm text-blue-600 hover:text-blue-800">General Terms of Use</Link>
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">Buyers & Tenants</h3>
              <div className="space-y-2">
                <Link to="/buyers-tenants-terms" className="block text-sm text-blue-600 hover:text-blue-800">Buyers & Tenants Terms</Link>
                <Link to="/privacy-policy" className="block text-sm text-blue-600 hover:text-blue-800">Privacy Policy</Link>
                <Link to="/eula" className="block text-sm text-blue-600 hover:text-blue-800">Mobile App License</Link>
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">Privacy & Data</h3>
              <div className="space-y-2">
                <Link to="/privacy-policy" className="block text-sm text-blue-600 hover:text-blue-800">Privacy Policy</Link>
                <Link to="/cookie-policy" className="block text-sm text-blue-600 hover:text-blue-800">Cookie Policy</Link>
                <Link to="/terms" className="block text-sm text-blue-600 hover:text-blue-800">Data Usage Terms</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Contact and Support */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-10 text-white text-center">
          <h2 className="text-3xl font-bold mb-6">Need Legal Assistance?</h2>
          <p className="text-xl mb-8 text-indigo-100">
            Our legal team is here to help you understand your rights and obligations under ARVIPOA's terms and Ghana property law.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <Scale className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Legal Consultation</h3>
              <p className="text-sm text-indigo-200">Expert guidance on property law compliance and contract interpretation</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <FileText className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Document Review</h3>
              <p className="text-sm text-indigo-200">Professional review of legal documents and property agreements</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <Users className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Dispute Resolution</h3>
              <p className="text-sm text-indigo-200">Mediation services and legal support for property disputes</p>
            </div>
          </div>
          <div className="mt-8 bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <h4 className="font-bold mb-4">Contact Information</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>Email:</strong> support@arvipoa.org</p>
                <p><strong>Address:</strong> GES Madina Office, Presec, Accra Central</p>
              </div>
              <div>
                <p><strong>WhatsApp:</strong> +233548411284</p>
                <p><strong>P.O. Box:</strong> CT3797, GM-006-0328, Ghana</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}