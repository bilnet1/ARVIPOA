import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DigitalSignature from '@/components/DigitalSignature';
import { FileSignature, UserCheck, Shield, Award, FileText, Clipboard } from 'lucide-react';

interface PersonalProfileSignatureProps {
  userName: string;
  profileType: 'patient' | 'practitioner' | 'organization' | 'property_owner';
}

export default function PersonalProfileSignature({ 
  userName, 
  profileType 
}: PersonalProfileSignatureProps) {
  const [signatures, setSignatures] = useState<Record<string, string>>({});

  const handleSaveSignature = (documentType: string, signatureData: string) => {
    setSignatures(prev => ({
      ...prev,
      [documentType]: signatureData
    }));
    console.log(`Signature saved for ${documentType}:`, signatureData);
  };

  const getDocumentTypes = () => {
    switch (profileType) {
      case 'patient':
        return [
          { type: 'medical_consent', title: 'Medical Consent Form', icon: FileText },
          { type: 'treatment_authorization', title: 'Treatment Authorization', icon: UserCheck },
          { type: 'privacy_acknowledgment', title: 'Privacy Policy Acknowledgment', icon: Shield },
          { type: 'insurance_claim', title: 'Insurance Claim Form', icon: Clipboard },
          { type: 'discharge_summary', title: 'Discharge Summary Acknowledgment', icon: Award }
        ];
      case 'practitioner':
        return [
          { type: 'professional_certification', title: 'Professional Certification', icon: Award },
          { type: 'prescription_authority', title: 'Prescription Authority', icon: FileText },
          { type: 'consultation_report', title: 'Consultation Reports', icon: Clipboard },
          { type: 'medical_record', title: 'Medical Record Verification', icon: UserCheck },
          { type: 'compliance_agreement', title: 'Compliance Agreement', icon: Shield }
        ];
      case 'organization':
        return [
          { type: 'organization_verification', title: 'Organization Verification', icon: Shield },
          { type: 'service_agreement', title: 'Service Agreement', icon: FileText },
          { type: 'compliance_certificate', title: 'Compliance Certificate', icon: Award },
          { type: 'staff_authorization', title: 'Staff Authorization', icon: UserCheck },
          { type: 'quality_assurance', title: 'Quality Assurance Form', icon: Clipboard }
        ];
      case 'property_owner':
        return [
          { type: 'property_verification', title: 'Property Verification', icon: Shield },
          { type: 'tenant_agreement', title: 'Tenant Agreement', icon: FileText },
          { type: 'maintenance_authorization', title: 'Maintenance Authorization', icon: Clipboard },
          { type: 'ownership_certificate', title: 'Ownership Certificate', icon: Award },
          { type: 'inspection_report', title: 'Inspection Report Approval', icon: UserCheck }
        ];
      default:
        return [];
    }
  };

  const documentTypes = getDocumentTypes();

  return (
    <Card className="border-2 border-blue-200 dark:border-blue-700">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <CardTitle className="text-xl font-bold text-blue-800 dark:text-blue-200 flex items-center gap-2">
          <FileSignature className="h-6 w-6" />
          Digital Signature Management
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">Active Documents</TabsTrigger>
            <TabsTrigger value="signed">Signed Documents</TabsTrigger>
            <TabsTrigger value="pending">Pending Signature</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            <div className="space-y-6">
              {documentTypes.map((doc, index) => {
                const IconComponent = doc.icon;
                return (
                  <div key={doc.type} className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-lg">
                      <IconComponent className="h-5 w-5 text-blue-600" />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {doc.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {profileType === 'patient' && 'Medical document requiring patient signature'}
                          {profileType === 'practitioner' && 'Professional document requiring practitioner verification'}
                          {profileType === 'organization' && 'Organizational document requiring authorized signature'}
                          {profileType === 'property_owner' && 'Property-related document requiring owner signature'}
                        </p>
                      </div>
                    </div>
                    <DigitalSignature
                      title={doc.title}
                      signerName={userName}
                      onSaveSignature={(signatureData) => handleSaveSignature(doc.type, signatureData)}
                      existingSignature={signatures[doc.type]}
                    />
                  </div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="signed" className="space-y-4">
            <div className="space-y-4">
              {Object.entries(signatures).length > 0 ? (
                Object.entries(signatures).map(([docType, signature]) => {
                  const docInfo = documentTypes.find(d => d.type === docType);
                  const IconComponent = docInfo?.icon || FileText;
                  return (
                    <Card key={docType} className="border-green-200 bg-green-50 dark:border-green-700 dark:bg-green-900/20">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <IconComponent className="h-5 w-5 text-green-600" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-green-800 dark:text-green-200">
                              {docInfo?.title || docType}
                            </h4>
                            <p className="text-sm text-green-600 dark:text-green-300">
                              Signed successfully
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-green-600">
                              {new Date().toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <div className="text-center py-8">
                  <FileSignature className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    No Signed Documents
                  </h3>
                  <p className="text-gray-500 dark:text-gray-500">
                    Documents you sign will appear here
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            <div className="space-y-4">
              {documentTypes.filter(doc => !signatures[doc.type]).map((doc) => {
                const IconComponent = doc.icon;
                return (
                  <Card key={doc.type} className="border-orange-200 bg-orange-50 dark:border-orange-700 dark:bg-orange-900/20">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <IconComponent className="h-5 w-5 text-orange-600" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-orange-800 dark:text-orange-200">
                            {doc.title}
                          </h4>
                          <p className="text-sm text-orange-600 dark:text-orange-300">
                            Awaiting your signature
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-orange-600">
                            Pending
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>

        {/* Signature Statistics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-blue-200 bg-blue-50 dark:border-blue-700 dark:bg-blue-900/20">
            <CardContent className="p-4 text-center">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200">
                Total Documents
              </h4>
              <p className="text-2xl font-bold text-blue-600">
                {documentTypes.length}
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-green-200 bg-green-50 dark:border-green-700 dark:bg-green-900/20">
            <CardContent className="p-4 text-center">
              <h4 className="font-semibold text-green-800 dark:text-green-200">
                Signed
              </h4>
              <p className="text-2xl font-bold text-green-600">
                {Object.keys(signatures).length}
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-orange-200 bg-orange-50 dark:border-orange-700 dark:bg-orange-900/20">
            <CardContent className="p-4 text-center">
              <h4 className="font-semibold text-orange-800 dark:text-orange-200">
                Pending
              </h4>
              <p className="text-2xl font-bold text-orange-600">
                {documentTypes.length - Object.keys(signatures).length}
              </p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}