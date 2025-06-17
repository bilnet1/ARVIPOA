import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  Users, 
  UserPlus, 
  Upload,
  Camera,
  Save, 
  Eye, 
  Send, 
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  Calendar,
  FileText,
  Shield,
  AlertTriangle,
  CheckCircle,
  Edit,
  Trash2,
  MessageSquare
} from 'lucide-react';

interface Inhabitant {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  relationship: string;
  proofType: string;
  proofDocument?: File;
  inviteReason: string;
  duration: string;
  startDate: string;
  endDate: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  dateOfBirth?: string;
  placeOfBirth?: string;
  fatherName?: string;
  motherName?: string;
  birthCertNumber?: string;
  witnessRelationship?: string;
  otpCode?: string;
}

export default function AddInhabitantModule() {
  const [formData, setFormData] = useState<Partial<Inhabitant>>({});
  const [inhabitants, setInhabitants] = useState<Inhabitant[]>([]);
  const [openSections, setOpenSections] = useState({
    basic: true,
    proof: false,
    verification: false,
    duration: false,
    personal: false
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const relationships = [
    'Son', 'Daughter', 'Spouse', 'Parent', 'Sibling', 'Grandparent', 'Grandchild',
    'Uncle', 'Aunt', 'Cousin', 'Friend', 'Guest', 'Worker', 'Caretaker', 'Business Partner', 'Other'
  ];

  const proofTypes = [
    'Birth Certificate', 'Marriage Certificate', 'Immigration Certificate', 
    'Appointment Letter', 'Application Letter', 'ID Card', 'Passport', 'Other'
  ];

  const inviteReasons = [
    'Accommodation', 'Cohabitation', 'Business Purposes', 'Assistance', 
    'Caretaking', 'Guarding', 'Family Visit', 'Work Assignment', 'Other'
  ];

  const durationTypes = [
    'Permanent', 'Temporary', '1 Week', '1 Month', '3 Months', '6 Months', 
    '1 Year', '2 Years', 'Custom Duration'
  ];

  const ghanaRegions = [
    'Greater Accra', 'Ashanti', 'Central', 'Eastern', 'Northern', 'Upper East',
    'Upper West', 'Western', 'Volta', 'Brong Ahafo', 'Western North', 
    'Ahafo', 'Bono East', 'North East', 'Savannah', 'Oti'
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const sendVerificationOTP = async () => {
    if (!formData.phone && !formData.email) {
      alert('Please provide phone number or email for verification');
      return;
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setFormData(prev => ({ ...prev, otpCode: otp }));

    // Simulate sending OTP
    console.log('Sending OTP:', otp, 'to', formData.phone || formData.email);
    alert(`Verification OTP sent to ${formData.phone || formData.email}`);
  };

  const verifyOTP = (enteredOTP: string) => {
    if (enteredOTP === formData.otpCode) {
      setFormData(prev => ({ ...prev, verificationStatus: 'verified' }));
      alert('Verification successful!');
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  const addInhabitant = () => {
    if (!formData.fullName || !formData.relationship) {
      alert('Please fill required fields');
      return;
    }

    const newInhabitant: Inhabitant = {
      id: Date.now().toString(),
      fullName: formData.fullName || '',
      phone: formData.phone || '',
      email: formData.email || '',
      relationship: formData.relationship || '',
      proofType: formData.proofType || '',
      inviteReason: formData.inviteReason || '',
      duration: formData.duration || '',
      startDate: formData.startDate || '',
      endDate: formData.endDate || '',
      verificationStatus: formData.verificationStatus || 'pending',
      dateOfBirth: formData.dateOfBirth,
      placeOfBirth: formData.placeOfBirth,
      fatherName: formData.fatherName,
      motherName: formData.motherName,
      birthCertNumber: formData.birthCertNumber,
      witnessRelationship: formData.witnessRelationship
    };

    setInhabitants(prev => [...prev, newInhabitant]);
    setFormData({});
    setShowAddForm(false);
    
    // Save to Firestore (simulated)
    console.log('Saving to Firestore:', newInhabitant);
    alert('Inhabitant added successfully!');
  };

  const removeInhabitant = (id: string) => {
    setInhabitants(prev => prev.filter(inhabitant => inhabitant.id !== id));
  };

  const suspendInhabitant = (id: string) => {
    setInhabitants(prev => prev.map(inhabitant => 
      inhabitant.id === id 
        ? { ...inhabitant, verificationStatus: 'rejected' as const }
        : inhabitant
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            <Users className="w-10 h-10 inline-block mr-3 text-blue-400" />
            ARVIPOA Inhabitant Management
          </h1>
          <p className="text-gray-300">Add and manage inhabitants, members, and users for your property</p>
        </div>

        {/* Current Inhabitants List */}
        <Card className="bg-slate-800/50 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-blue-400 flex items-center justify-between">
              <div className="flex items-center">
                <Users className="w-6 h-6 mr-2" />
                Registered Inhabitants ({inhabitants.length})
              </div>
              <Button 
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add Inhabitant
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {inhabitants.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No inhabitants registered yet</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {inhabitants.map((inhabitant) => (
                  <Card key={inhabitant.id} className="bg-slate-700/30 border-slate-600">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-white font-medium">{inhabitant.fullName}</h4>
                        <Badge 
                          variant={inhabitant.verificationStatus === 'verified' ? 'default' : 'destructive'}
                          className={inhabitant.verificationStatus === 'verified' ? 'bg-green-600' : 'bg-red-600'}
                        >
                          {inhabitant.verificationStatus}
                        </Badge>
                      </div>
                      <p className="text-gray-400 text-sm">{inhabitant.relationship}</p>
                      <p className="text-gray-400 text-xs">{inhabitant.phone} | {inhabitant.email}</p>
                      <p className="text-gray-400 text-xs">Reason: {inhabitant.inviteReason}</p>
                      <p className="text-gray-400 text-xs">Duration: {inhabitant.duration}</p>
                      
                      <div className="flex space-x-2 mt-3">
                        <Button variant="ghost" size="sm" className="text-blue-400">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-yellow-400">
                          <MessageSquare className="w-3 h-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-orange-400"
                          onClick={() => suspendInhabitant(inhabitant.id)}
                        >
                          <Shield className="w-3 h-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-400"
                          onClick={() => removeInhabitant(inhabitant.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add Inhabitant Form */}
        {showAddForm && (
          <Card className="bg-slate-800/50 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-400">Add New Inhabitant</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">

                {/* Basic Details */}
                <Card className="bg-slate-700/30 border-slate-600">
                  <Collapsible open={openSections.basic} onOpenChange={() => toggleSection('basic')}>
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-slate-600/30 transition-colors">
                        <CardTitle className="text-white flex items-center justify-between text-lg">
                          <div className="flex items-center">
                            <UserPlus className="w-5 h-5 mr-2" />
                            Basic Details
                          </div>
                          {openSections.basic ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </CardTitle>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label className="text-white">Full Name *</Label>
                            <Input 
                              value={formData.fullName || ''}
                              onChange={(e) => handleInputChange('fullName', e.target.value)}
                              placeholder="Enter full name"
                              className="bg-slate-700/50 border-slate-600 text-white"
                            />
                          </div>
                          <div>
                            <Label className="text-white">Phone Number</Label>
                            <Input 
                              value={formData.phone || ''}
                              onChange={(e) => handleInputChange('phone', e.target.value)}
                              placeholder="Enter phone number"
                              className="bg-slate-700/50 border-slate-600 text-white"
                            />
                          </div>
                          <div>
                            <Label className="text-white">Email Address</Label>
                            <Input 
                              value={formData.email || ''}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              placeholder="Enter email address"
                              className="bg-slate-700/50 border-slate-600 text-white"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div>
                            <Label className="text-white">Relationship *</Label>
                            <Select value={formData.relationship} onValueChange={(value) => handleInputChange('relationship', value)}>
                              <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                                <SelectValue placeholder="Select relationship" />
                              </SelectTrigger>
                              <SelectContent className="bg-slate-800 border-slate-600">
                                {relationships.map((rel) => (
                                  <SelectItem key={rel} value={rel} className="text-white">{rel}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          {formData.relationship === 'Other' && (
                            <div>
                              <Label className="text-white">Specify Relationship</Label>
                              <Input 
                                value={formData.customRelationship || ''}
                                onChange={(e) => handleInputChange('customRelationship', e.target.value)}
                                placeholder="Please specify relationship"
                                className="bg-slate-700/50 border-slate-600 text-white"
                              />
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>

                {/* Proof of Relationship */}
                <Card className="bg-slate-700/30 border-slate-600">
                  <Collapsible open={openSections.proof} onOpenChange={() => toggleSection('proof')}>
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-slate-600/30 transition-colors">
                        <CardTitle className="text-white flex items-center justify-between text-lg">
                          <div className="flex items-center">
                            <FileText className="w-5 h-5 mr-2" />
                            Proof of Relationship
                          </div>
                          {openSections.proof ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </CardTitle>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-white">Proof Type</Label>
                            <Select value={formData.proofType} onValueChange={(value) => handleInputChange('proofType', value)}>
                              <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                                <SelectValue placeholder="Select proof type" />
                              </SelectTrigger>
                              <SelectContent className="bg-slate-800 border-slate-600">
                                {proofTypes.map((type) => (
                                  <SelectItem key={type} value={type} className="text-white">{type}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center">
                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-400 text-sm">Upload proof document or take photo</p>
                            <div className="flex justify-center space-x-2 mt-2">
                              <Button variant="outline" size="sm">
                                <Upload className="w-4 h-4 mr-2" />
                                Choose File
                              </Button>
                              <Button variant="outline" size="sm">
                                <Camera className="w-4 h-4 mr-2" />
                                Take Photo
                              </Button>
                            </div>
                          </div>

                          {(formData.proofType === 'Appointment Letter' || formData.proofType === 'Application Letter') && (
                            <div>
                              <Label className="text-white">Organization Name</Label>
                              <Input 
                                value={formData.organizationName || ''}
                                onChange={(e) => handleInputChange('organizationName', e.target.value)}
                                placeholder="Enter organization name"
                                className="bg-slate-700/50 border-slate-600 text-white"
                              />
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>

                {/* Verification */}
                <Card className="bg-slate-700/30 border-slate-600">
                  <Collapsible open={openSections.verification} onOpenChange={() => toggleSection('verification')}>
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-slate-600/30 transition-colors">
                        <CardTitle className="text-white flex items-center justify-between text-lg">
                          <div className="flex items-center">
                            <Shield className="w-5 h-5 mr-2" />
                            Verification
                          </div>
                          {openSections.verification ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </CardTitle>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="bg-slate-600/30 p-4 rounded-lg">
                            <p className="text-gray-300 text-sm mb-3">
                              Verification code and email will be sent to the provided contact information for the inhabitant to verify their invitation.
                            </p>
                            <Button 
                              onClick={sendVerificationOTP}
                              className="bg-blue-600 hover:bg-blue-700"
                              disabled={!formData.phone && !formData.email}
                            >
                              <Send className="w-4 h-4 mr-2" />
                              Send Verification OTP
                            </Button>
                          </div>

                          {formData.otpCode && (
                            <div>
                              <Label className="text-white">Enter OTP Code</Label>
                              <div className="flex space-x-2">
                                <Input 
                                  placeholder="Enter 6-digit OTP"
                                  className="bg-slate-700/50 border-slate-600 text-white"
                                  onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                      verifyOTP(e.currentTarget.value);
                                    }
                                  }}
                                />
                                <Button 
                                  variant="outline" 
                                  onClick={(e) => {
                                    const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                                    verifyOTP(input.value);
                                  }}
                                  className="text-green-400 border-green-400"
                                >
                                  Verify
                                </Button>
                              </div>
                            </div>
                          )}

                          {formData.verificationStatus === 'verified' && (
                            <div className="flex items-center text-green-400">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Verification successful!
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>

                {/* Duration & Purpose */}
                <Card className="bg-slate-700/30 border-slate-600">
                  <Collapsible open={openSections.duration} onOpenChange={() => toggleSection('duration')}>
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-slate-600/30 transition-colors">
                        <CardTitle className="text-white flex items-center justify-between text-lg">
                          <div className="flex items-center">
                            <Calendar className="w-5 h-5 mr-2" />
                            Duration & Purpose
                          </div>
                          {openSections.duration ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </CardTitle>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-white">Reason for Invitation</Label>
                            <Select value={formData.inviteReason} onValueChange={(value) => handleInputChange('inviteReason', value)}>
                              <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                                <SelectValue placeholder="Select reason" />
                              </SelectTrigger>
                              <SelectContent className="bg-slate-800 border-slate-600">
                                {inviteReasons.map((reason) => (
                                  <SelectItem key={reason} value={reason} className="text-white">{reason}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label className="text-white">Duration Type</Label>
                            <Select value={formData.duration} onValueChange={(value) => handleInputChange('duration', value)}>
                              <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                                <SelectValue placeholder="Select duration" />
                              </SelectTrigger>
                              <SelectContent className="bg-slate-800 border-slate-600">
                                {durationTypes.map((duration) => (
                                  <SelectItem key={duration} value={duration} className="text-white">{duration}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label className="text-white">Start Date</Label>
                              <Input 
                                type="date"
                                value={formData.startDate || ''}
                                onChange={(e) => handleInputChange('startDate', e.target.value)}
                                className="bg-slate-700/50 border-slate-600 text-white"
                              />
                            </div>
                            <div>
                              <Label className="text-white">End Date (if applicable)</Label>
                              <Input 
                                type="date"
                                value={formData.endDate || ''}
                                onChange={(e) => handleInputChange('endDate', e.target.value)}
                                className="bg-slate-700/50 border-slate-600 text-white"
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>

                {/* Personal Details (Optional) */}
                <Card className="bg-slate-700/30 border-slate-600">
                  <Collapsible open={openSections.personal} onOpenChange={() => toggleSection('personal')}>
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-slate-600/30 transition-colors">
                        <CardTitle className="text-white flex items-center justify-between text-lg">
                          <div className="flex items-center">
                            <Users className="w-5 h-5 mr-2" />
                            Personal Details (Optional)
                          </div>
                          {openSections.personal ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </CardTitle>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label className="text-white">Date of Birth</Label>
                              <Input 
                                type="date"
                                value={formData.dateOfBirth || ''}
                                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                                className="bg-slate-700/50 border-slate-600 text-white"
                              />
                            </div>
                            <div>
                              <Label className="text-white">Place of Birth</Label>
                              <Input 
                                value={formData.placeOfBirth || ''}
                                onChange={(e) => handleInputChange('placeOfBirth', e.target.value)}
                                placeholder="Enter place of birth"
                                className="bg-slate-700/50 border-slate-600 text-white"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label className="text-white">Father's Name</Label>
                              <Input 
                                value={formData.fatherName || ''}
                                onChange={(e) => handleInputChange('fatherName', e.target.value)}
                                placeholder="Enter father's name"
                                className="bg-slate-700/50 border-slate-600 text-white"
                              />
                            </div>
                            <div>
                              <Label className="text-white">Mother's Name</Label>
                              <Input 
                                value={formData.motherName || ''}
                                onChange={(e) => handleInputChange('motherName', e.target.value)}
                                placeholder="Enter mother's name"
                                className="bg-slate-700/50 border-slate-600 text-white"
                              />
                            </div>
                          </div>

                          <div>
                            <Label className="text-white">Birth Certificate Number</Label>
                            <Input 
                              value={formData.birthCertNumber || ''}
                              onChange={(e) => handleInputChange('birthCertNumber', e.target.value)}
                              placeholder="Enter birth certificate number"
                              className="bg-slate-700/50 border-slate-600 text-white"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>

                {/* Action Buttons */}
                <div className="flex space-x-4 mt-6">
                  <Button onClick={addInhabitant} className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    Add Inhabitant
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}