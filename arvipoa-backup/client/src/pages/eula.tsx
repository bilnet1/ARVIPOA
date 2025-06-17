import { Smartphone, Download, Shield, Users, FileText, Settings, AlertTriangle, Scale } from "lucide-react";

export default function EULA() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Smartphone className="h-16 w-16 text-blue-600 mr-4 animate-pulse" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                <Download className="w-3 h-3 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              End User License Agreement
            </h1>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <p className="text-2xl font-semibold text-gray-800 mb-2">
              ARVIPOA Mobile Application License
            </p>
            <p className="text-lg text-gray-600 mb-4">Terms for iOS and Android Applications</p>
            <p className="text-sm text-gray-500">Last Updated: December 27, 2024</p>
          </div>
        </div>

        {/* Platform Support */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Smartphone className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">iOS</h3>
              <p className="text-gray-600 text-sm">Apple App Store</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Smartphone className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">Android</h3>
              <p className="text-gray-600 text-sm">Google Play Store</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">Secure</h3>
              <p className="text-gray-600 text-sm">Licensed Software</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">Multi-User</h3>
              <p className="text-gray-600 text-sm">Family Sharing</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          
          {/* License Agreement Introduction */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <FileText className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">License Agreement</h2>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
              <p className="text-gray-700 text-lg mb-6">
                ARVIPOA is licensed to You (End-User) by <strong>Akosombo River View Land and Island Property Owners Association LBG</strong>, 
                based in Ghana ('Licensor'), for use only under the terms of this License Agreement.
              </p>
              
              <div className="bg-white rounded-lg p-6 border-l-4 border-blue-500">
                <h3 className="text-lg font-bold text-blue-800 mb-3">Important Notice</h3>
                <p className="text-sm text-gray-700">
                  By downloading the Licensed Application from Apple's App Store or Google's Play Store, and any update thereto, 
                  You indicate that You agree to be bound by all terms and conditions of this License Agreement.
                </p>
              </div>
            </div>
          </section>

          {/* The Application */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Smartphone className="h-8 w-8 text-green-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">1. The Application</h2>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-green-800 mb-4">ARVIPOA Licensed Application</h3>
              <p className="text-gray-700 mb-6">
                ARVIPOA ('Licensed Application') is an app designed to connect property owners, buyers, and tenants through 
                an innovative and secure digital platform, offering a seamless experience for property sales, rentals, and management.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Key Features:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Drone-assisted property inspections</li>
                    <li>• Augmented reality tools</li>
                    <li>• Smart utility systems</li>
                    <li>• Transparent property transactions</li>
                    <li>• Digital property management</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Technology Integration:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Real-time property verification</li>
                    <li>• Secure document storage</li>
                    <li>• AI-powered property analysis</li>
                    <li>• Digital address systems</li>
                    <li>• Smart infrastructure monitoring</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Scope of License */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Scale className="h-8 w-8 text-purple-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">2. Scope of License</h2>
            </div>

            <div className="space-y-6">
              <div className="bg-purple-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-purple-800 mb-4">2.1 License Grant</h3>
                <p className="text-gray-700 mb-4">
                  You are given a non-transferable, non-exclusive, non-sublicensable license to install and use the Licensed Application 
                  on any devices that You own or control, as permitted by the Usage Rules.
                </p>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-2">Permitted Use:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Install on owned or controlled devices</li>
                    <li>• Access via Family Sharing (where applicable)</li>
                    <li>• Volume purchasing for organizations</li>
                    <li>• Backup copies for personal use</li>
                  </ul>
                </div>
              </div>

              <div className="bg-red-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-red-800 mb-4">2.2 Prohibited Activities</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-medium text-red-800 mb-2">You may not:</h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• Share or redistribute the application</li>
                      <li>• Reverse engineer or decompile</li>
                      <li>• Create derivative works</li>
                      <li>• Remove intellectual property notices</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-medium text-red-800 mb-2">Consequences:</h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• License termination</li>
                      <li>• Legal prosecution</li>
                      <li>• Damage claims</li>
                      <li>• Account suspension</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Technical Requirements */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Settings className="h-8 w-8 text-cyan-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">3. Technical Requirements</h2>
            </div>

            <div className="bg-cyan-50 rounded-xl p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-cyan-800 mb-4">3.1 Device Compatibility</h3>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-2">Supported Platforms:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• iOS devices (iPhone, iPad)</li>
                      <li>• Android devices (smartphones, tablets)</li>
                      <li>• Mac OS (where applicable)</li>
                      <li>• Minimum OS version requirements</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-cyan-800 mb-4">3.2 System Requirements</h3>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-2">Your Responsibility:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Confirm device compatibility</li>
                      <li>• Meet technical specifications</li>
                      <li>• Maintain updated firmware</li>
                      <li>• Ensure adequate storage space</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Maintenance and Support */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Users className="h-8 w-8 text-green-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">4. Maintenance and Support</h2>
            </div>

            <div className="bg-green-50 rounded-xl p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-4">
                  <h3 className="text-lg font-bold text-green-800 mb-3">4.1 ARVIPOA Responsibility</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• Sole responsibility for maintenance and support services</li>
                    <li>• Application updates and bug fixes</li>
                    <li>• Customer service and technical support</li>
                    <li>• Contact via App Store or Play Store listings</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h3 className="text-lg font-bold text-blue-800 mb-3">4.2 App Store Services</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• No obligation to furnish maintenance</li>
                    <li>• ARVIPOA handles all support requests</li>
                    <li>• Contact support@arvipoa.org for assistance</li>
                    <li>• Platform-specific support policies apply</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Use of Data */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Shield className="h-8 w-8 text-orange-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">5. Use of Data</h2>
            </div>

            <div className="bg-orange-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-orange-800 mb-4">Data Access and Privacy</h3>
              <p className="text-gray-700 mb-6">
                You acknowledge that the Licensor will be able to access and adjust Your downloaded Licensed Application content 
                and Your personal information, subject to Your legal agreements with the Licensor and our privacy policy.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Data Collection:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Technical data and related information</li>
                    <li>• Device, system, and application data</li>
                    <li>• Usage patterns and preferences</li>
                    <li>• Property-related documentation</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Data Usage:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Product support and maintenance</li>
                    <li>• Software updates and improvements</li>
                    <li>• Service provision and enhancement</li>
                    <li>• Anonymized form for analytics</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Liability and Warranty */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <AlertTriangle className="h-8 w-8 text-red-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">7. Liability and Warranty</h2>
            </div>

            <div className="space-y-6">
              <div className="bg-red-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-red-800 mb-4">7.1 Limitation of Liability</h3>
                <p className="text-gray-700 mb-4">
                  The Licensor's responsibility in case of violation of obligations and tort shall be limited to intent and gross negligence. 
                  Liability is limited to foreseeable, contractually typical damages.
                </p>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-red-700">
                    <strong>Important:</strong> The limitation mentioned above does not apply to injuries to life, limb, or health.
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-blue-800 mb-4">8.1 Warranty Provisions</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-medium text-green-800 mb-2">We Warrant:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Application free of malware at download</li>
                      <li>• Functions as described in documentation</li>
                      <li>• 30-day defect reporting period</li>
                      <li>• Remedy through repair or replacement</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-medium text-red-800 mb-2">No Warranty For:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Unauthorized modifications</li>
                      <li>• Inappropriate hardware/software use</li>
                      <li>• Factors outside our influence</li>
                      <li>• Third-party compatibility issues</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact and Termination */}
          <section className="bg-gray-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information and Termination</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h4 className="font-bold text-gray-800 mb-3">10. Contact Information</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Support Email:</strong> support@arvipoa.org</p>
                  <p><strong>Address:</strong> GES Madina Office, Presec, Accra Central</p>
                  <p><strong>P.O. Box:</strong> CT3797, GM-006-0328</p>
                  <p><strong>Region:</strong> Greater Accra Region, Ghana</p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h4 className="font-bold text-gray-800 mb-3">11. Termination</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>License Validity:</strong> Until terminated by ARVIPOA or You</p>
                  <p><strong>Automatic Termination:</strong> If You fail to adhere to license terms</p>
                  <p><strong>Upon Termination:</strong> Stop all use and destroy all copies</p>
                  <p><strong>Effect:</strong> Rights under license terminate immediately</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}