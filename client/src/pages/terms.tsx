import { Shield, FileText, AlertTriangle, Scale, Users, Building, MapPin, Clock, Award, Zap } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-green-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Scale className="h-16 w-16 text-green-600 mr-4 animate-pulse" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <FileText className="w-3 h-3 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Terms of Use
            </h1>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <p className="text-2xl font-semibold text-gray-800 mb-2">
              Akosombo River View Land and Island Property Owners Association LBG
            </p>
            <p className="text-lg text-gray-600 mb-4">ARVIPOA Property Management Platform</p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Last Updated: December 27, 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Ghana Registration</span>
              </div>
            </div>
          </div>
          
          {/* Service Features */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg p-4 shadow-lg hover:shadow-xl transition-all">
              <Building className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700">Property Registration</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-lg hover:shadow-xl transition-all">
              <Zap className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700">Smart Infrastructure</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-lg hover:shadow-xl transition-all">
              <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700">Digital Verification</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-lg hover:shadow-xl transition-all">
              <Users className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700">Community Services</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          
          {/* Introduction */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <FileText className="h-6 w-6 text-green-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">1. Introduction</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Welcome to ARVIPOA (Advanced Real Estate Verification and Intelligent Property Operations Authority). 
              By accessing or using our platform, you agree to be bound by these Terms of Use and all applicable 
              laws and regulations. If you do not agree with any of these terms, you are prohibited from using this platform.
            </p>
          </section>

          {/* Service Description */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Service Description</h2>
            <div className="space-y-4">
              <p className="text-gray-700">ARVIPOA provides the following services:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Property registration and verification services</li>
                <li>Smart boundary pillar installation and monitoring</li>
                <li>River barricade systems for flood protection</li>
                <li>Digital document storage and verification</li>
                <li>AI-powered property analysis and consultation</li>
                <li>Virtual address assignment and GPS encoding</li>
                <li>Legal compliance guidance for Ghana property law</li>
              </ul>
            </div>
          </section>

          {/* User Responsibilities */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-green-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">3. User Responsibilities</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p><strong>3.1 Accurate Information:</strong> You must provide accurate, complete, and up-to-date information during registration and property submission processes.</p>
              
              <p><strong>3.2 Legal Compliance:</strong> You are responsible for ensuring that your property registration complies with all applicable Ghana laws, including but not limited to the Land Act 2020, Registration of Land Act, and local municipal regulations.</p>
              
              <p><strong>3.3 Documentation:</strong> You must possess valid legal documents for any property you register, including proper title deeds, survey plans, and necessary permits.</p>
              
              <p><strong>3.4 Payment Obligations:</strong> All service fees must be paid according to the agreed terms before services are rendered.</p>
            </div>
          </section>

          {/* Ghana Property Law Compliance */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Ghana Property Law Compliance</h2>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
              <div className="flex">
                <AlertTriangle className="h-5 w-5 text-green-400 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm text-green-700">
                    <strong>Legal Notice:</strong> All property registrations through ARVIPOA must comply with Ghana's legal framework.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 text-gray-700">
              <p><strong>4.1 Land Act 2020 Compliance:</strong> All registrations must conform to Ghana's Land Act 2020, including proper vesting procedures and customary land rights recognition.</p>
              
              <p><strong>4.2 Lands Commission Coordination:</strong> ARVIPOA works in coordination with the Ghana Lands Commission to ensure all registrations are properly documented and legally recognized.</p>
              
              <p><strong>4.3 Survey Requirements:</strong> Properties must have valid survey plans prepared by licensed surveyors and approved by the Survey and Mapping Division.</p>
              
              <p><strong>4.4 Environmental Compliance:</strong> Properties near water bodies, forests, or environmentally sensitive areas must comply with EPA regulations and water resource management policies.</p>
            </div>
          </section>

          {/* Smart Infrastructure Terms */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Smart Infrastructure Services</h2>
            <div className="space-y-4 text-gray-700">
              <p><strong>5.1 Smart Boundary Pillars:</strong> Installation of smart pillars requires property owner consent and compliance with local building codes. Monitoring data is subject to privacy protections.</p>
              
              <p><strong>5.2 River Barricade Systems:</strong> Installation requires permits from relevant water resource authorities and environmental impact assessments where applicable.</p>
              
              <p><strong>5.3 Maintenance Responsibilities:</strong> Property owners are responsible for basic maintenance of installed smart infrastructure according to provided guidelines.</p>
            </div>
          </section>

          {/* Privacy and Data Protection */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Privacy and Data Protection</h2>
            <div className="space-y-4 text-gray-700">
              <p><strong>6.1 Data Collection:</strong> We collect property information, personal identification, GPS coordinates, and documentation necessary for registration services.</p>
              
              <p><strong>6.2 Data Security:</strong> All data is encrypted and stored securely in compliance with international data protection standards and Ghana's Data Protection Act 2012.</p>
              
              <p><strong>6.3 Data Sharing:</strong> Property data may be shared with Ghana Lands Commission, relevant government agencies, and authorized legal representatives as required by law.</p>
              
              <p><strong>6.4 AI Processing:</strong> Property analysis using AI systems is conducted securely with data anonymization where possible.</p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
            <div className="space-y-4 text-gray-700">
              <p><strong>7.1 Service Limitations:</strong> ARVIPOA provides registration and verification services but does not guarantee successful completion of all legal processes, which may depend on government agencies and third parties.</p>
              
              <p><strong>7.2 Technical Infrastructure:</strong> While we maintain high standards for smart infrastructure, we are not liable for damages caused by environmental factors, vandalism, or force majeure events.</p>
              
              <p><strong>7.3 Legal Advice:</strong> AI-powered guidance and consultation do not constitute formal legal advice. Users should consult qualified legal professionals for complex matters.</p>
            </div>
          </section>

          {/* Dispute Resolution */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Dispute Resolution</h2>
            <div className="space-y-4 text-gray-700">
              <p><strong>8.1 Mediation:</strong> Disputes will first be addressed through mediation processes in accordance with Ghana's Alternative Dispute Resolution Act.</p>
              
              <p><strong>8.2 Jurisdiction:</strong> These terms are governed by Ghana law, and any legal proceedings will be conducted in Ghana's courts.</p>
              
              <p><strong>8.3 Property Disputes:</strong> Land disputes involving registered properties will follow established Ghana Lands Commission procedures and customary law where applicable.</p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Information</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-2"><strong>ARVIPOA Customer Service</strong></p>
              <p className="text-gray-600">Address: Beside GES Madina Office, Presec Accra Central</p>
              <p className="text-gray-600">GPS Address: GM0060328</p>
              <p className="text-gray-600">Phone: +233 303 981 600</p>
              <p className="text-gray-600">Email: legal@arvipoa.org</p>
              <p className="text-gray-600">Website: www.arvipoa.org</p>
            </div>
          </section>

          {/* Agreement Acceptance */}
          <section className="border-t pt-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-2">Agreement Acceptance</h3>
              <p className="text-blue-800 text-sm">
                By using ARVIPOA services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use. 
                These terms may be updated periodically, and continued use of our services constitutes acceptance of any changes.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}