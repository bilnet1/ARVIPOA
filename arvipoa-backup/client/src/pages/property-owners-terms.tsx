import { Home, CreditCard, Shield, Camera, Waves, MapPin, Users, Building2, Zap, Eye } from "lucide-react";

export default function PropertyOwnersTerms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Home className="h-16 w-16 text-green-600 mr-4 animate-pulse" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                <Users className="w-3 h-3 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Property Owners Terms
            </h1>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <p className="text-2xl font-semibold text-gray-800 mb-2">
              Comprehensive Terms and Conditions for Property Owners
            </p>
            <p className="text-lg text-gray-600 mb-4">ARVIPOA Platform Services</p>
            <p className="text-sm text-gray-500">Last Updated: December 27, 2024</p>
          </div>
        </div>

        {/* Services Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105">
            <Camera className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">Drone Inspections</h3>
            <p className="text-gray-600 text-sm">Advanced aerial surveys with RTK GPS precision</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105">
            <CreditCard className="w-10 h-10 text-green-600 mb-4" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">Smart Cards</h3>
            <p className="text-gray-600 text-sm">Secure property management and verification</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105">
            <Waves className="w-10 h-10 text-cyan-600 mb-4" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">River Security</h3>
            <p className="text-gray-600 text-sm">Smart barricades and monitoring systems</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105">
            <MapPin className="w-10 h-10 text-purple-600 mb-4" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">Digital Addressing</h3>
            <p className="text-gray-600 text-sm">MUDA and SUDA location systems</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          
          {/* Eligibility Section */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Shield className="h-8 w-8 text-green-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">1. Eligibility and Account Registration</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-800 mb-4">1.1 Eligibility Requirements</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 mt-1">•</span>
                    <span>Must be at least 18 years old</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 mt-1">•</span>
                    <span>Legal authorization to list properties</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 mt-1">•</span>
                    <span>Hold all necessary property rights</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 mt-1">•</span>
                    <span>Compliance with local and international property laws</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-4">1.2 Account Registration Process</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-blue-600 text-sm font-bold">1</span>
                    </div>
                    <div>
                      <p className="text-gray-700">Create account through web interface</p>
                      <p className="text-sm text-gray-500">Access to listing and management tools</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-blue-600 text-sm font-bold">2</span>
                    </div>
                    <div>
                      <p className="text-gray-700">Provide accurate information</p>
                      <p className="text-sm text-gray-500">Name, email, phone, property details</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-blue-600 text-sm font-bold">3</span>
                    </div>
                    <div>
                      <p className="text-gray-700">Secure account management</p>
                      <p className="text-sm text-gray-500">Confidential username and password</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-6">
              <h4 className="font-bold text-yellow-800 mb-2">Security Notice</h4>
              <p className="text-yellow-700 text-sm">
                While our system is highly secured, we advise account owners to take precaution. 
                Notify us immediately at <strong>support@arvipoa.org</strong> if you suspect unauthorized access.
              </p>
            </div>
          </section>

          {/* Property Listing Requirements */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Building2 className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">2. Property Listing Requirements</h2>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">2.1 Mandatory Documentation</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                    <h4 className="font-semibold text-gray-800 mb-2">Property Documents</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Site Plan - Detailed property layout and boundaries</li>
                      <li>• Building Plan - Architectural blueprints and structural plans</li>
                      <li>• Indentures - Legal ownership or transfer agreements</li>
                      <li>• Permits - Government-issued property permits</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                    <h4 className="font-semibold text-gray-800 mb-2">Utility Documentation</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Property Rate Receipt - Proof of rate payments</li>
                      <li>• Electricity Meter Number - Utility registration verification</li>
                      <li>• Water Meter Number - Water utility registration proof</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-6">
                  <h4 className="font-semibold text-gray-800 mb-4">Document Upload Process</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-green-600 text-sm font-bold">✓</span>
                      </div>
                      <span className="text-sm text-gray-700">Scan or photograph all required documents</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-green-600 text-sm font-bold">✓</span>
                      </div>
                      <span className="text-sm text-gray-700">Upload through secure platform interface</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-green-600 text-sm font-bold">✓</span>
                      </div>
                      <span className="text-sm text-gray-700">Await verification and approval</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h4 className="font-bold text-red-800 mb-3">Important Notice</h4>
              <p className="text-red-700 text-sm">
                ARVIPOA reserves the right to suspend or remove listings that are found to be misleading, 
                inaccurate, fraudulent, or otherwise non-compliant with these Terms.
              </p>
            </div>
          </section>

          {/* Property Verification */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Eye className="h-8 w-8 text-purple-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">2.3 Property Verification Process</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
                <Camera className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-800 mb-3">Drone-Assisted Inspections</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Modern DJI Enterprise drones equipped with Real-Time Kinematic (RTK) and GPS systems 
                  survey property boundaries, providing aerial and 360-degree photographs.
                </p>
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-xs text-blue-700">Advanced surveying technology for precise boundary mapping</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
                <Zap className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-800 mb-3">Augmented Reality Glasses</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Inspectors use MR VIEW AR glasses to capture detailed interior and exterior footage, 
                  providing comprehensive property documentation.
                </p>
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-xs text-green-700">Immersive technology for detailed property analysis</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-500">
                <MapPin className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-800 mb-3">Digital Address System</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Every property is assigned a Main Unique Digital Address (MUDA) and 
                  Sub Unique Digital Address (SUDA) for detailed location identification.
                </p>
                <div className="bg-purple-50 rounded-lg p-3">
                  <p className="text-xs text-purple-700">Prevents fraudulent practices with unique addressing</p>
                </div>
              </div>
            </div>
          </section>

          {/* Smart Card Registration */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <CreditCard className="h-8 w-8 text-emerald-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">4. Property Registration and Smart Card Issuance</h2>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-emerald-800 mb-4">4.1 Property Smart Card Features</h3>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h4 className="font-semibold text-gray-800 mb-2">Secure Storage</h4>
                      <p className="text-sm text-gray-600">
                        Encrypted storage of all property information including physical and virtual addresses, 
                        land, houses, intellectual properties, and assets.
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h4 className="font-semibold text-gray-800 mb-2">Quick Access</h4>
                      <p className="text-sm text-gray-600">
                        Instant access to property details, transfer of ownership, or verification processes 
                        through secure card authentication.
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-emerald-800 mb-4">4.2 Supported Property Categories</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                      <Home className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                      <p className="text-xs font-medium text-gray-700">Land & Houses</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                      <MapPin className="w-6 h-6 text-green-600 mx-auto mb-2" />
                      <p className="text-xs font-medium text-gray-700">Virtual Properties</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                      <Shield className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                      <p className="text-xs font-medium text-gray-700">Intellectual Properties</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                      <Zap className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                      <p className="text-xs font-medium text-gray-700">Electronic Devices</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* River Security Features */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Waves className="h-8 w-8 text-cyan-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">5. River Security and Navigation Features</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6">
                <Camera className="w-10 h-10 text-cyan-600 mb-4" />
                <h3 className="text-lg font-bold text-cyan-800 mb-3">Underwater Cameras</h3>
                <ul className="text-sm text-cyan-700 space-y-2">
                  <li>• Monitor activities beneath property owners' boats</li>
                  <li>• Deter illegal activities on rivers</li>
                  <li>• Enhance safety of river navigation</li>
                  <li>• Secure footage storage and access</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                <Zap className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-lg font-bold text-blue-800 mb-3">Smart Pillars</h3>
                <ul className="text-sm text-blue-700 space-y-2">
                  <li>• LED lights and warning signals</li>
                  <li>• Sensors for vessel detection</li>
                  <li>• Real-time alerts for safety</li>
                  <li>• Mark hazardous rocky zones</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                <Shield className="w-10 h-10 text-green-600 mb-4" />
                <h3 className="text-lg font-bold text-green-800 mb-3">Smart River Defense Barricade</h3>
                <ul className="text-sm text-green-700 space-y-2">
                  <li>• Biometric sensors with facial recognition</li>
                  <li>• Thermal imaging cameras (front and rear)</li>
                  <li>• Clean water supply from river treatment</li>
                  <li>• Solar-powered continuous operation</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-gray-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h4 className="font-bold text-gray-800 mb-3">Main Office</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Address:</strong> GES Madina Office, Presec, Accra Central</p>
                  <p><strong>P.O. Box:</strong> CT3797, GM-006-0328</p>
                  <p><strong>Region:</strong> Greater Accra Region, Ghana</p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h4 className="font-bold text-gray-800 mb-3">Contact Details</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Email:</strong> support@arvipoa.org</p>
                  <p><strong>WhatsApp:</strong> +233548411284</p>
                  <p><strong>Akosombo Office:</strong> H/NO. M30/1 AKOSOMBO</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}