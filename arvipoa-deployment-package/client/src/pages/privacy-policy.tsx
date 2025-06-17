import { Shield, Eye, Lock, Database, Globe, UserCheck, AlertCircle } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Shield className="h-16 w-16 text-blue-600 mr-4 animate-pulse" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                <Lock className="w-3 h-3 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <p className="text-2xl font-semibold text-gray-800 mb-2">
              Akosombo River View Land and Island Property Owners Association LBG
            </p>
            <p className="text-lg text-gray-600 mb-4">Your Privacy, Our Priority</p>
            <p className="text-sm text-gray-500">Last Updated: December 27, 2024</p>
          </div>
        </div>

        {/* Privacy Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
            <Eye className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">Transparent Collection</h3>
            <p className="text-gray-600 text-sm">Clear disclosure of what information we collect and why</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
            <Database className="w-10 h-10 text-green-600 mb-4" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">Secure Storage</h3>
            <p className="text-gray-600 text-sm">Industry-standard encryption and security measures</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
            <UserCheck className="w-10 h-10 text-purple-600 mb-4" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">Your Rights</h3>
            <p className="text-gray-600 text-sm">Control over your personal information and data</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Summary */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
            <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
              <AlertCircle className="w-6 h-6 mr-2" />
              Summary of Key Points
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-blue-700">
              <div>
                <h4 className="font-semibold mb-2">What personal information do we process?</h4>
                <p>We collect personal information based on how you interact with our Services, including registration details, property documents, and usage data.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">How do we process your information?</h4>
                <p>We process information to provide, improve, and administer our Services, communicate with you, and ensure security and legal compliance.</p>
              </div>
            </div>
          </div>

          {/* Information Collection */}
          <section className="mb-10">
            <div className="flex items-center mb-6">
              <Database className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">1. What Information Do We Collect?</h2>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Personal Information You Provide</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Basic Information:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Name and contact details</li>
                    <li>• Phone number and email address</li>
                    <li>• Mailing and billing addresses</li>
                    <li>• Username and secure passwords</li>
                    <li>• Job title and professional affiliations</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Property-Related Data:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Site plans and building plans</li>
                    <li>• Property documents and permits</li>
                    <li>• Utility meter numbers</li>
                    <li>• Property rate receipts</li>
                    <li>• Government identification</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h4 className="font-bold text-yellow-800 mb-3 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                Sensitive Information Processing
              </h4>
              <p className="text-yellow-700 text-sm mb-3">
                With your consent or as permitted by law, we process sensitive information including:
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
                <div>
                  <strong>Government Identifiers:</strong> National ID and passport details for identity verification
                </div>
                <div>
                  <strong>Financial Data:</strong> Bank account information for secure payment processing
                </div>
              </div>
            </div>
          </section>

          {/* Data Processing */}
          <section className="mb-10">
            <div className="flex items-center mb-6">
              <Globe className="h-8 w-8 text-green-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">2. How Do We Process Your Information?</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-green-50 rounded-lg p-6">
                <h4 className="font-bold text-green-800 mb-3">Service Provision</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Property registration</li>
                  <li>• Transaction facilitation</li>
                  <li>• Account management</li>
                  <li>• Customer support</li>
                </ul>
              </div>
              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="font-bold text-blue-800 mb-3">Communication</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Service notifications</li>
                  <li>• Transaction confirmations</li>
                  <li>• Marketing communications</li>
                  <li>• Support responses</li>
                </ul>
              </div>
              <div className="bg-purple-50 rounded-lg p-6">
                <h4 className="font-bold text-purple-800 mb-3">Security & Compliance</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Fraud prevention</li>
                  <li>• Legal compliance</li>
                  <li>• Identity verification</li>
                  <li>• Risk assessment</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section className="mb-10">
            <div className="flex items-center mb-6">
              <Lock className="h-8 w-8 text-purple-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">3. How Do We Keep Your Information Safe?</h2>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6">
              <p className="text-gray-700 mb-6">
                We implement robust organizational and technical security measures to protect your personal information. 
                However, no electronic transmission or storage system can be guaranteed 100% secure.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-gray-800 mb-3">Technical Safeguards:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• End-to-end encryption</li>
                    <li>• Secure payment processing via Swipe</li>
                    <li>• Regular security audits</li>
                    <li>• Access control systems</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-3">Organizational Measures:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Staff privacy training</li>
                    <li>• Data minimization policies</li>
                    <li>• Incident response procedures</li>
                    <li>• Regular compliance reviews</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section className="mb-10">
            <div className="flex items-center mb-6">
              <UserCheck className="h-8 w-8 text-orange-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">4. What Are Your Privacy Rights?</h2>
            </div>

            <div className="bg-orange-50 rounded-xl p-6">
              <p className="text-gray-700 mb-6">
                Depending on your location, you may have specific rights regarding your personal information:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-orange-600 text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Access Your Data</h4>
                      <p className="text-sm text-gray-600">Request copies of your personal information</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-orange-600 text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Correct Inaccuracies</h4>
                      <p className="text-sm text-gray-600">Update or correct your personal information</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-orange-600 text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Delete Your Data</h4>
                      <p className="text-sm text-gray-600">Request deletion of your personal information</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-orange-600 text-sm font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Opt-Out</h4>
                      <p className="text-sm text-gray-600">Withdraw consent for processing</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-gray-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us About This Privacy Notice</h2>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-gray-800 mb-3">ARVIPOA Customer Service</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Address:</strong> GES Madina Office, Presec, Accra Central</p>
                    <p><strong>P.O. Box:</strong> CT3797, GM-006-0328</p>
                    <p><strong>Region:</strong> Greater Accra Region, Ghana</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-3">Contact Details</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Email:</strong> support@arvipoa.org</p>
                    <p><strong>Website:</strong> https://www.arvipoa.org</p>
                    <p><strong>WhatsApp:</strong> +233548411284</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}