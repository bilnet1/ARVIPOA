import { UserCheck, Home, Shield, Clock, AlertTriangle, CreditCard, Eye, MessageSquare } from "lucide-react";

export default function BuyersTenantsTerms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <UserCheck className="h-16 w-16 text-purple-600 mr-4 animate-pulse" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                <Home className="w-3 h-3 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Buyers & Tenants Terms
            </h1>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <p className="text-2xl font-semibold text-gray-800 mb-2">
              Terms and Conditions for Property Buyers and Tenants
            </p>
            <p className="text-lg text-gray-600 mb-4">ARVIPOA Platform Services</p>
            <p className="text-sm text-gray-500">Last Updated: December 27, 2024</p>
          </div>
        </div>

        {/* Platform Access */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105">
            <Home className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">Property Listings</h3>
            <p className="text-gray-600 text-sm">Access to verified property information</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105">
            <Eye className="w-10 h-10 text-green-600 mb-4" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">Virtual Tours</h3>
            <p className="text-gray-600 text-sm">AR glasses and drone-assisted inspections</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105">
            <Clock className="w-10 h-10 text-purple-600 mb-4" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">Daily Rent Scheme</h3>
            <p className="text-gray-600 text-sm">Flexible pay-as-you-go rental options</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105">
            <MessageSquare className="w-10 h-10 text-orange-600 mb-4" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">Dispute Resolution</h3>
            <p className="text-gray-600 text-sm">Online arbitration and mediation services</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          
          {/* Eligibility Section */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <UserCheck className="h-8 w-8 text-purple-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">1. Eligibility and Account Registration</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-purple-800 mb-4">1.1 Eligibility Requirements</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2 mt-1">•</span>
                    <span>Must be at least 18 years old</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2 mt-1">•</span>
                    <span>Legal authorization to enter property agreements</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2 mt-1">•</span>
                    <span>Accurate information provision during registration</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2 mt-1">•</span>
                    <span>Compliance with Terms and applicable laws</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-4">1.2 Multi-Platform Access</h3>
                <p className="text-gray-700 mb-4">Create accounts through multiple ARVIPOA platforms:</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white rounded p-2 text-center">
                    <span className="text-blue-600 font-medium">www.togetherforever.com</span>
                  </div>
                  <div className="bg-white rounded p-2 text-center">
                    <span className="text-blue-600 font-medium">www.mifection.com</span>
                  </div>
                  <div className="bg-white rounded p-2 text-center">
                    <span className="text-blue-600 font-medium">www.sweeftservices.com</span>
                  </div>
                  <div className="bg-white rounded p-2 text-center">
                    <span className="text-blue-600 font-medium">www.foreignbird.com</span>
                  </div>
                  <div className="bg-white rounded p-2 text-center">
                    <span className="text-blue-600 font-medium">www.wishdorm.com</span>
                  </div>
                  <div className="bg-white rounded p-2 text-center">
                    <span className="text-blue-600 font-medium">Main Platform</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-6">
              <h4 className="font-bold text-green-800 mb-2">Security Assurance</h4>
              <p className="text-green-700 text-sm">
                Our system is highly encrypted and safe with user information never shared with third parties. 
                The system is analytically designed for unified processes with minimal human intervention to protect sensitive data.
              </p>
            </div>
          </section>

          {/* Property Listings Access */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Home className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">2. Access to Property Listings</h2>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-8">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-800 mb-3">2.1 Listing Details</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• Comprehensive property descriptions</li>
                    <li>• High-quality photographs and videos</li>
                    <li>• Accurate pricing information</li>
                    <li>• Digital address verification</li>
                    <li>• Utility connection details</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-green-800 mb-3">2.2 Accuracy Guarantee</h3>
                  <p className="text-sm text-gray-700 mb-3">
                    ARVIPOA verifies property details using advanced technologies and guarantees 100% accuracy 
                    of all property information provided by property owners.
                  </p>
                  <div className="bg-green-50 rounded p-3">
                    <p className="text-xs text-green-700">
                      Independent verification encouraged for additional assurance
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-purple-800 mb-3">2.3 Inspection Services</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• Virtual property inspections</li>
                    <li>• Physical property tours</li>
                    <li>• Drone footage reviews</li>
                    <li>• AR glasses enhanced experience</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* User Obligations */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Shield className="h-8 w-8 text-red-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">3. Tenant and Buyer Obligations</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-red-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-800 mb-4">3.1 Legal Compliance</h3>
                  <p className="text-red-700 text-sm">
                    Buyers and tenants must adhere to all applicable local laws and regulations 
                    regarding property transactions and rental agreements.
                  </p>
                </div>

                <div className="bg-orange-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-orange-800 mb-4">3.2 Accurate Information</h3>
                  <p className="text-orange-700 text-sm">
                    Responsibility for providing accurate information during account registration, 
                    inquiries, and transaction processes. False information may result in account suspension.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-blue-800 mb-4">3.3 Professional Interactions</h3>
                  <p className="text-blue-700 text-sm">
                    Maintain respectful communication with property owners, ARVIPOA agents, and platform users. 
                    All interactions must occur within the ARVIPOA platform for security.
                  </p>
                </div>

                <div className="bg-green-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-800 mb-4">3.4 Timely Payments</h3>
                  <p className="text-green-700 text-sm">
                    Required to make payments promptly as agreed with property owners. 
                    Payment terms outlined in purchase agreements or rental contracts.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Daily Rent Scheme */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Clock className="h-8 w-8 text-emerald-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">4. Additional Services</h2>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-emerald-800 mb-4">4.1 Daily Rent Scheme</h3>
                  <p className="text-gray-700 mb-4">
                    Pay-as-you-go rental model allowing daily payments for flexible rental arrangements, 
                    catering to tenants with financial constraints.
                  </p>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Smart Technology Integration:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• IDEIST (Intelligent Digital Electricity and Internet Services Transponder)</li>
                      <li>• Smart Pillar monitoring systems</li>
                      <li>• River Defense Barricade integration</li>
                      <li>• Biometric locks and smart switches</li>
                      <li>• Intelligent Property and Utility Management Systems (INPUMS)</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-teal-800 mb-4">4.2 Dispute Resolution</h3>
                  <p className="text-gray-700 mb-4">
                    Structured arbitration process for resolving disputes between buyers/tenants and property owners 
                    through our online Arbitration Center.
                  </p>
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-4">
                      <h5 className="font-medium text-gray-800">Video Conferencing Mediation</h5>
                      <p className="text-xs text-gray-600">Professional mediators facilitate dispute resolution</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <h5 className="font-medium text-gray-800">Evidence Collection</h5>
                      <p className="text-xs text-gray-600">CCTV and drone footage used during arbitration</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Prohibited Activities */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <AlertTriangle className="h-8 w-8 text-red-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">5. Prohibited Activities</h2>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-xl p-8">
              <p className="text-red-800 font-semibold mb-6">Buyers and tenants are strictly prohibited from:</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 border-l-4 border-red-500">
                    <h4 className="font-semibold text-red-800 mb-2">Fraudulent Activities</h4>
                    <p className="text-sm text-red-700">
                      Using the platform to engage in fraudulent or illegal property transactions
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border-l-4 border-orange-500">
                    <h4 className="font-semibold text-orange-800 mb-2">False Content</h4>
                    <p className="text-sm text-orange-700">
                      Uploading false or defamatory content in reviews or communication with property owners
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-800 mb-2">Platform Circumvention</h4>
                    <p className="text-sm text-purple-700">
                      Circumventing ARVIPOA's processes or conducting unauthorized transactions outside the platform
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-800 mb-2">Security Tampering</h4>
                    <p className="text-sm text-blue-700">
                      Tampering with property security features, such as biometric locks or surveillance systems
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Governing Law */}
          <section className="bg-gray-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Governing Law and Contact Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h4 className="font-bold text-gray-800 mb-3">Legal Jurisdiction</h4>
                <p className="text-sm text-gray-600 mb-4">
                  These Terms are governed by the laws of Ghana. Any disputes arising under these Terms 
                  will be resolved in any court of competent jurisdictions in any part of the country.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h4 className="font-bold text-gray-800 mb-3">Contact Information</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Address:</strong> GES Madina Office, Presec, Accra Central</p>
                  <p><strong>Akosombo Office:</strong> H/No.M30/1, Akosombo</p>
                  <p><strong>Email:</strong> support@arvipoa.org</p>
                  <p><strong>WhatsApp:</strong> +233548411284</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}