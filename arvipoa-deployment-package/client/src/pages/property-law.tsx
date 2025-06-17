import { BookOpen, Gavel, MapPin, Users, Building, Waves } from "lucide-react";

export default function PropertyLaw() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Gavel className="h-12 w-12 text-green-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Ghana Property Control Law</h1>
          </div>
          <p className="text-lg text-gray-600">
            Legal Framework for Property Registration and Management
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Updated in accordance with Ghana's Land Act 2020 and related legislation
          </p>
        </div>

        {/* Quick Navigation */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Navigation</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <a href="#land-act" className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition">
              <BookOpen className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-sm font-medium text-green-800">Land Act 2020</span>
            </a>
            <a href="#registration" className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
              <MapPin className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-800">Registration Process</span>
            </a>
            <a href="#customary" className="flex items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition">
              <Users className="h-5 w-5 text-purple-600 mr-2" />
              <span className="text-sm font-medium text-purple-800">Customary Land</span>
            </a>
            <a href="#development" className="flex items-center p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition">
              <Building className="h-5 w-5 text-orange-600 mr-2" />
              <span className="text-sm font-medium text-orange-800">Development Control</span>
            </a>
            <a href="#water-rights" className="flex items-center p-3 bg-cyan-50 rounded-lg hover:bg-cyan-100 transition">
              <Waves className="h-5 w-5 text-cyan-600 mr-2" />
              <span className="text-sm font-medium text-cyan-800">Water Rights</span>
            </a>
          </div>
        </div>

        <div className="space-y-8">
          {/* Land Act 2020 */}
          <section id="land-act" className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <BookOpen className="h-8 w-8 text-green-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Ghana Land Act 2020 (Act 1036)</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Key Provisions</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-gray-800">Land Ownership Categories</h4>
                    <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 mt-2">
                      <li>Public Land (vested in the President for the people of Ghana)</li>
                      <li>Customary Land (owned by traditional authorities)</li>
                      <li>Private Land (owned by individuals or entities)</li>
                    </ul>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-gray-800">Registration Requirements</h4>
                    <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 mt-2">
                      <li>All land transactions must be registered</li>
                      <li>Proper documentation and survey required</li>
                      <li>Compliance with local planning schemes</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Important Changes in Act 1036</h4>
                <p className="text-yellow-700 text-sm">
                  The Land Act 2020 introduced significant reforms including enhanced registration procedures, 
                  stronger protection for customary land rights, and improved coordination between traditional 
                  authorities and government agencies in land administration.
                </p>
              </div>
            </div>
          </section>

          {/* Registration Process */}
          <section id="registration" className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <MapPin className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Property Registration Process</h2>
            </div>

            <div className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="bg-green-50 rounded-lg p-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <h3 className="font-bold text-green-800 mb-2">Documentation</h3>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Site plan and survey</li>
                      <li>• Title deed or allocation note</li>
                      <li>• Development permit</li>
                      <li>• Environmental clearance</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <h3 className="font-bold text-blue-800 mb-2">Verification</h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Lands Commission review</li>
                      <li>• Search and investigation</li>
                      <li>• Public notice (if required)</li>
                      <li>• Traditional authority consent</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <h3 className="font-bold text-purple-800 mb-2">Registration</h3>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• Certificate issuance</li>
                      <li>• Registration fees payment</li>
                      <li>• Digital record creation</li>
                      <li>• Legal protection activated</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Required Documentation Checklist</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">For New Acquisitions:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>✓ Duly executed deed or conveyance</li>
                      <li>✓ Site plan prepared by licensed surveyor</li>
                      <li>✓ Allocation note from appropriate authority</li>
                      <li>✓ Building permit (for developed properties)</li>
                      <li>✓ Environmental permit (where applicable)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Supporting Documents:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>✓ Valid identification of parties</li>
                      <li>✓ Consent from spouse (if married)</li>
                      <li>✓ Power of attorney (if applicable)</li>
                      <li>✓ Certificate of customary ownership</li>
                      <li>✓ Local government endorsement</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Customary Land Rights */}
          <section id="customary" className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Users className="h-8 w-8 text-purple-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Customary Land Rights</h2>
            </div>

            <div className="space-y-6">
              <div className="bg-purple-50 border-l-4 border-purple-500 p-6">
                <h3 className="text-lg font-bold text-purple-800 mb-3">Traditional Authority Role</h3>
                <p className="text-purple-700 mb-4">
                  Customary land in Ghana is held in trust by traditional authorities (chiefs, family heads, earth priests) 
                  for their communities. These authorities have the power to allocate customary land for various uses while 
                  ensuring compliance with customary laws and community interests.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-purple-800 mb-2">Authority Powers:</h4>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• Grant interests in customary land</li>
                      <li>• Determine land use priorities</li>
                      <li>• Resolve boundary disputes</li>
                      <li>• Collect applicable fees and levies</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-800 mb-2">Community Benefits:</h4>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• Revenue sharing for development</li>
                      <li>• Employment opportunities</li>
                      <li>• Infrastructure development</li>
                      <li>• Cultural preservation</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Customary Land Documentation</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-green-600 text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Customary Land Certificate</h4>
                      <p className="text-sm text-gray-600">Official documentation of customary ownership issued by traditional authorities</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-green-600 text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Consent Documentation</h4>
                      <p className="text-sm text-gray-600">Written consent from family heads or traditional authorities for land transactions</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-green-600 text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Community Acknowledgment</h4>
                      <p className="text-sm text-gray-600">Recognition by the community of land rights and intended use</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Development Control */}
          <section id="development" className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Building className="h-8 w-8 text-orange-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Development Control Laws</h2>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-orange-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-orange-800 mb-3">Planning Permission Requirements</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">•</span>
                      <span>Building permit from Metropolitan/Municipal/District Assembly</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">•</span>
                      <span>Compliance with local planning schemes and zoning</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">•</span>
                      <span>Environmental impact assessment (for major developments)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-600 mr-2">•</span>
                      <span>Fire service clearance for commercial buildings</span>
                    </li>
                  </ul>
                </div>

                <div className="border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-blue-800 mb-3">Building Standards Compliance</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Ghana Building Code adherence</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Setback requirements and height restrictions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Accessibility standards for public buildings</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Structural engineering certification</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-red-800 mb-3">Development Violations and Penalties</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-red-700 mb-2">Common Violations:</h4>
                    <ul className="text-sm text-red-600 space-y-1">
                      <li>• Building without proper permits</li>
                      <li>• Exceeding approved building heights</li>
                      <li>• Violating setback requirements</li>
                      <li>• Unauthorized change of land use</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-700 mb-2">Potential Penalties:</h4>
                    <ul className="text-sm text-red-600 space-y-1">
                      <li>• Stop work orders</li>
                      <li>• Fines and monetary penalties</li>
                      <li>• Demolition orders</li>
                      <li>• Legal prosecution</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Water Rights and Environmental Protection */}
          <section id="water-rights" className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Waves className="h-8 w-8 text-cyan-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Water Rights and Environmental Protection</h2>
            </div>

            <div className="space-y-6">
              <div className="bg-cyan-50 border-l-4 border-cyan-500 p-6">
                <h3 className="text-lg font-bold text-cyan-800 mb-3">Water Resources Management</h3>
                <p className="text-cyan-700 mb-4">
                  Ghana's Water Resources Commission Act 522 governs the use, development, conservation, 
                  management, and protection of water resources. Properties near water bodies are subject 
                  to special regulations and buffer zone requirements.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-cyan-800 mb-2">Buffer Zone Requirements:</h4>
                    <ul className="text-sm text-cyan-700 space-y-1">
                      <li>• 100m buffer for rivers and streams</li>
                      <li>• 200m buffer for lakes and reservoirs</li>
                      <li>• 50m buffer for wetlands</li>
                      <li>• Special protection for coastal areas</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-cyan-800 mb-2">Required Permits:</h4>
                    <ul className="text-sm text-cyan-700 space-y-1">
                      <li>• Water use permits for abstraction</li>
                      <li>• Discharge permits for effluent</li>
                      <li>• Environmental clearance certificate</li>
                      <li>• Riparian rights documentation</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">ARVIPOA Smart Infrastructure Compliance</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">Smart Boundary Pillars:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Comply with local building codes</li>
                      <li>• Environmental impact assessment</li>
                      <li>• Telecommunications license for connectivity</li>
                      <li>• Data protection compliance</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-2">River Barricade Systems:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Water Resources Commission approval</li>
                      <li>• Environmental Protection Agency clearance</li>
                      <li>• Community consultation requirements</li>
                      <li>• Monitoring and maintenance protocols</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Legal Assistance */}
          <section className="bg-green-600 text-white rounded-lg p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Need Legal Assistance?</h2>
              <p className="text-green-100 mb-6 max-w-2xl mx-auto">
                ARVIPOA works with qualified legal professionals to ensure your property registration 
                complies with all applicable Ghana laws and regulations.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-green-700 rounded-lg p-4">
                  <h3 className="font-bold mb-2">Legal Consultation</h3>
                  <p className="text-sm text-green-200">Expert guidance on property law compliance</p>
                </div>
                <div className="bg-green-700 rounded-lg p-4">
                  <h3 className="font-bold mb-2">Documentation Review</h3>
                  <p className="text-sm text-green-200">Professional review of legal documents</p>
                </div>
                <div className="bg-green-700 rounded-lg p-4">
                  <h3 className="font-bold mb-2">Dispute Resolution</h3>
                  <p className="text-sm text-green-200">Mediation and legal support services</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}