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
  Plane, 
  User, 
  Building,
  Upload,
  CreditCard,
  Save, 
  Eye, 
  Send, 
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  Shield,
  Calendar,
  FileText,
  CheckCircle,
  Edit,
  Trash2,
  MapPin,
  Users
} from 'lucide-react';

interface VisaApplication {
  id: string;
  guestType: 'individual' | 'company_rep';
  companyDetails?: {
    name: string;
    address: string;
    phone: string;
    email: string;
    capacity: string;
    phoneOtp?: string;
    emailOtp?: string;
    phoneVerified: boolean;
    emailVerified: boolean;
  };
  personalDetails: {
    surname: string;
    otherNames: string;
    sex: string;
    nationality: string;
    phone: string;
    email: string;
    pmb?: string;
  };
  passportDetails: {
    number: string;
    issueDate: string;
    expiryDate: string;
    placeOfIssue: string;
  };
  hostDetails: {
    useSameAddress: boolean;
    customAddress?: string;
    ownerAware: boolean;
    otpSent: boolean;
  };
  invitationDetails: {
    onBehalfOfCompany: boolean;
    companyName?: string;
    reason: string;
    proofAttached: boolean;
  };
  accommodationDetails: {
    whoBearsAccommodation: 'me' | 'guest';
    whenArrangement: string;
    upkeepResponsible: 'me' | 'other';
    upkeeperDetails?: string;
    upkeeperOtp?: string;
  };
  paymentDetails: {
    whoPaysFees: 'me' | 'guest';
    paymentMethod: string;
    paymentCode?: string;
    paymentLinkSent: boolean;
  };
  status: 'draft' | 'submitted' | 'processing' | 'approved' | 'rejected';
  createdAt: string;
}

export default function VisaApplicationModule() {
  const [formData, setFormData] = useState<Partial<VisaApplication>>({
    guestType: 'individual',
    personalDetails: {
      surname: '',
      otherNames: '',
      sex: '',
      nationality: '',
      phone: '',
      email: ''
    },
    passportDetails: {
      number: '',
      issueDate: '',
      expiryDate: '',
      placeOfIssue: ''
    },
    hostDetails: {
      useSameAddress: true,
      ownerAware: false,
      otpSent: false
    },
    invitationDetails: {
      onBehalfOfCompany: false,
      reason: '',
      proofAttached: false
    },
    accommodationDetails: {
      whoBearsAccommodation: 'me',
      whenArrangement: 'upon_arrival',
      upkeepResponsible: 'me'
    },
    paymentDetails: {
      whoPaysFees: 'me',
      paymentMethod: 'momo',
      paymentLinkSent: false
    },
    status: 'draft'
  });

  const [applications, setApplications] = useState<VisaApplication[]>([]);
  const [openSections, setOpenSections] = useState({
    guest: true,
    personal: false,
    passport: false,
    host: false,
    invitation: false,
    accommodation: false,
    payment: false
  });

  const companyCapacities = [
    'CEO', 'Managing Director', 'Director', 'Manager', 'Representative', 
    'Employee', 'Consultant', 'Partner', 'Agent', 'Other'
  ];

  const countries = [
    'Ghana', 'Nigeria', 'South Africa', 'Kenya', 'Egypt', 'Morocco', 'Tunisia',
    'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France',
    'Italy', 'Spain', 'Netherlands', 'Belgium', 'Switzerland', 'Sweden', 'Norway',
    'Denmark', 'China', 'Japan', 'India', 'Brazil', 'Mexico', 'Other'
  ];

  const invitationReasons = [
    'Business Meeting', 'Conference', 'Tourism', 'Family Visit', 'Medical Treatment',
    'Education', 'Training', 'Investment', 'Trade', 'Cultural Exchange', 'Other'
  ];

  const paymentMethods = ['Mobile Money', 'Bank Transfer', 'Cheque', 'Card'];

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (section: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const sendOTP = async (type: 'phone' | 'email', target: string) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`Sending ${type} OTP:`, otp, 'to', target);
    alert(`OTP sent to ${target}: ${otp}`);
    return otp;
  };

  const verifyCompanyOTP = async (type: 'phone' | 'email', enteredOtp: string) => {
    // Simulate OTP verification
    if (enteredOtp.length === 6) {
      if (type === 'phone') {
        handleNestedChange('companyDetails', 'phoneVerified', true);
      } else {
        handleNestedChange('companyDetails', 'emailVerified', true);
      }
      alert(`${type} verified successfully!`);
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  const submitApplication = () => {
    if (!formData.personalDetails?.surname || !formData.personalDetails?.nationality) {
      alert('Please fill required fields');
      return;
    }

    const newApplication: VisaApplication = {
      id: Date.now().toString(),
      ...formData,
      status: 'submitted',
      createdAt: new Date().toISOString()
    } as VisaApplication;

    setApplications(prev => [...prev, newApplication]);
    console.log('Saving Visa Application to Firestore:', newApplication);
    alert('Visa application submitted successfully!');
    
    // Reset form
    setFormData({
      guestType: 'individual',
      personalDetails: { surname: '', otherNames: '', sex: '', nationality: '', phone: '', email: '' },
      passportDetails: { number: '', issueDate: '', expiryDate: '', placeOfIssue: '' },
      hostDetails: { useSameAddress: true, ownerAware: false, otpSent: false },
      invitationDetails: { onBehalfOfCompany: false, reason: '', proofAttached: false },
      accommodationDetails: { whoBearsAccommodation: 'me', whenArrangement: 'upon_arrival', upkeepResponsible: 'me' },
      paymentDetails: { whoPaysFees: 'me', paymentMethod: 'momo', paymentLinkSent: false },
      status: 'draft'
    });
  };

  const generateVisa = (id: string) => {
    setApplications(prev => prev.map(app => 
      app.id === id ? { ...app, status: 'approved' as const } : app
    ));
    alert('Visa generated successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            <Plane className="w-10 h-10 inline-block mr-3 text-cyan-400" />
            ARVIPOA Visa Application
          </h1>
          <p className="text-gray-300">Apply for guest visas and manage international visitors</p>
        </div>

        {/* Current Applications */}
        <Card className="bg-slate-800/50 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-cyan-400 flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="w-6 h-6 mr-2" />
                Visa Applications ({applications.length})
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {applications.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No visa applications yet</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {applications.map((app) => (
                  <Card key={app.id} className="bg-slate-700/30 border-slate-600">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-white font-medium">
                          {app.personalDetails.surname} {app.personalDetails.otherNames}
                        </h4>
                        <Badge 
                          variant={app.status === 'approved' ? 'default' : app.status === 'submitted' ? 'secondary' : 'destructive'}
                          className={
                            app.status === 'approved' ? 'bg-green-600' : 
                            app.status === 'submitted' ? 'bg-blue-600' : 'bg-yellow-600'
                          }
                        >
                          {app.status}
                        </Badge>
                      </div>
                      <p className="text-gray-400 text-sm">{app.personalDetails.nationality}</p>
                      <p className="text-gray-400 text-xs">Reason: {app.invitationDetails.reason}</p>
                      <p className="text-gray-400 text-xs">Guest Type: {app.guestType}</p>
                      
                      <div className="flex space-x-2 mt-3">
                        <Button variant="ghost" size="sm" className="text-blue-400">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-green-400"
                          onClick={() => generateVisa(app.id)}
                          disabled={app.status !== 'submitted'}
                        >
                          <CheckCircle className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-400">
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

        {/* New Application Form */}
        <Card className="bg-slate-800/50 border-green-500/30">
          <CardHeader>
            <CardTitle className="text-green-400">New Visa Application</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">

              {/* Guest Type */}
              <Card className="bg-slate-700/30 border-slate-600">
                <Collapsible open={openSections.guest} onOpenChange={() => toggleSection('guest')}>
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-slate-600/30 transition-colors">
                      <CardTitle className="text-white flex items-center justify-between text-lg">
                        <div className="flex items-center">
                          <Users className="w-5 h-5 mr-2" />
                          Guest Details
                        </div>
                        {openSections.guest ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </CardTitle>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-white">Guest Type</Label>
                          <Select value={formData.guestType} onValueChange={(value) => handleInputChange('guestType', value)}>
                            <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                              <SelectValue placeholder="Select guest type" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-600">
                              <SelectItem value="individual" className="text-white">Individual</SelectItem>
                              <SelectItem value="company_rep" className="text-white">Company Representative</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {formData.guestType === 'company_rep' && (
                          <div className="space-y-4 border-t border-slate-600 pt-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label className="text-white">Representing Capacity</Label>
                                <Select 
                                  value={formData.companyDetails?.capacity} 
                                  onValueChange={(value) => handleNestedChange('companyDetails', 'capacity', value)}
                                >
                                  <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                                    <SelectValue placeholder="Select capacity" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-slate-800 border-slate-600">
                                    {companyCapacities.map((capacity) => (
                                      <SelectItem key={capacity} value={capacity} className="text-white">{capacity}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label className="text-white">Company Name</Label>
                                <Input 
                                  value={formData.companyDetails?.name || ''}
                                  onChange={(e) => handleNestedChange('companyDetails', 'name', e.target.value)}
                                  placeholder="Enter company name"
                                  className="bg-slate-700/50 border-slate-600 text-white"
                                />
                              </div>
                            </div>

                            <div>
                              <Label className="text-white">Company Address</Label>
                              <Input 
                                value={formData.companyDetails?.address || ''}
                                onChange={(e) => handleNestedChange('companyDetails', 'address', e.target.value)}
                                placeholder="Enter company address"
                                className="bg-slate-700/50 border-slate-600 text-white"
                              />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label className="text-white">Company Phone</Label>
                                <div className="flex space-x-2">
                                  <Input 
                                    value={formData.companyDetails?.phone || ''}
                                    onChange={(e) => handleNestedChange('companyDetails', 'phone', e.target.value)}
                                    placeholder="Enter company phone"
                                    className="bg-slate-700/50 border-slate-600 text-white"
                                  />
                                  <Button 
                                    variant="outline" 
                                    onClick={() => sendOTP('phone', formData.companyDetails?.phone || '')}
                                    className="text-blue-400 border-blue-400"
                                  >
                                    Send OTP
                                  </Button>
                                </div>
                                {formData.companyDetails?.phoneVerified && (
                                  <div className="flex items-center text-green-400 text-sm mt-1">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Phone verified
                                  </div>
                                )}
                              </div>
                              <div>
                                <Label className="text-white">Company Email</Label>
                                <div className="flex space-x-2">
                                  <Input 
                                    value={formData.companyDetails?.email || ''}
                                    onChange={(e) => handleNestedChange('companyDetails', 'email', e.target.value)}
                                    placeholder="Enter company email"
                                    className="bg-slate-700/50 border-slate-600 text-white"
                                  />
                                  <Button 
                                    variant="outline" 
                                    onClick={() => sendOTP('email', formData.companyDetails?.email || '')}
                                    className="text-blue-400 border-blue-400"
                                  >
                                    Send OTP
                                  </Button>
                                </div>
                                {formData.companyDetails?.emailVerified && (
                                  <div className="flex items-center text-green-400 text-sm mt-1">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Email verified
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>

              {/* Personal Details */}
              <Card className="bg-slate-700/30 border-slate-600">
                <Collapsible open={openSections.personal} onOpenChange={() => toggleSection('personal')}>
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-slate-600/30 transition-colors">
                      <CardTitle className="text-white flex items-center justify-between text-lg">
                        <div className="flex items-center">
                          <User className="w-5 h-5 mr-2" />
                          Personal Details
                        </div>
                        {openSections.personal ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </CardTitle>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-white">Surname *</Label>
                          <Input 
                            value={formData.personalDetails?.surname || ''}
                            onChange={(e) => handleNestedChange('personalDetails', 'surname', e.target.value)}
                            placeholder="Enter surname"
                            className="bg-slate-700/50 border-slate-600 text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-white">Other Names</Label>
                          <Input 
                            value={formData.personalDetails?.otherNames || ''}
                            onChange={(e) => handleNestedChange('personalDetails', 'otherNames', e.target.value)}
                            placeholder="Enter other names"
                            className="bg-slate-700/50 border-slate-600 text-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div>
                          <Label className="text-white">Sex</Label>
                          <Select 
                            value={formData.personalDetails?.sex} 
                            onValueChange={(value) => handleNestedChange('personalDetails', 'sex', value)}
                          >
                            <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                              <SelectValue placeholder="Select sex" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-600">
                              <SelectItem value="male" className="text-white">Male</SelectItem>
                              <SelectItem value="female" className="text-white">Female</SelectItem>
                              <SelectItem value="other" className="text-white">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-white">Nationality *</Label>
                          <Select 
                            value={formData.personalDetails?.nationality} 
                            onValueChange={(value) => handleNestedChange('personalDetails', 'nationality', value)}
                          >
                            <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                              <SelectValue placeholder="Select nationality" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-600 max-h-60 overflow-y-auto">
                              {countries.map((country) => (
                                <SelectItem key={country} value={country} className="text-white">{country}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-white">PMB (Optional)</Label>
                          <Input 
                            value={formData.personalDetails?.pmb || ''}
                            onChange={(e) => handleNestedChange('personalDetails', 'pmb', e.target.value)}
                            placeholder="Enter PMB"
                            className="bg-slate-700/50 border-slate-600 text-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <Label className="text-white">Phone</Label>
                          <Input 
                            value={formData.personalDetails?.phone || ''}
                            onChange={(e) => handleNestedChange('personalDetails', 'phone', e.target.value)}
                            placeholder="Enter phone number"
                            className="bg-slate-700/50 border-slate-600 text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-white">Email</Label>
                          <Input 
                            value={formData.personalDetails?.email || ''}
                            onChange={(e) => handleNestedChange('personalDetails', 'email', e.target.value)}
                            placeholder="Enter email address"
                            className="bg-slate-700/50 border-slate-600 text-white"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>

              {/* Passport Details */}
              <Card className="bg-slate-700/30 border-slate-600">
                <Collapsible open={openSections.passport} onOpenChange={() => toggleSection('passport')}>
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-slate-600/30 transition-colors">
                      <CardTitle className="text-white flex items-center justify-between text-lg">
                        <div className="flex items-center">
                          <FileText className="w-5 h-5 mr-2" />
                          Passport Details
                        </div>
                        {openSections.passport ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </CardTitle>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-white">Passport Number</Label>
                          <Input 
                            value={formData.passportDetails?.number || ''}
                            onChange={(e) => handleNestedChange('passportDetails', 'number', e.target.value)}
                            placeholder="Enter passport number"
                            className="bg-slate-700/50 border-slate-600 text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-white">Place of Issue</Label>
                          <Select 
                            value={formData.passportDetails?.placeOfIssue} 
                            onValueChange={(value) => handleNestedChange('passportDetails', 'placeOfIssue', value)}
                          >
                            <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-600 max-h-60 overflow-y-auto">
                              {countries.map((country) => (
                                <SelectItem key={country} value={country} className="text-white">{country}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <Label className="text-white">Issue Date</Label>
                          <Input 
                            type="date"
                            value={formData.passportDetails?.issueDate || ''}
                            onChange={(e) => handleNestedChange('passportDetails', 'issueDate', e.target.value)}
                            className="bg-slate-700/50 border-slate-600 text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-white">Expiry Date</Label>
                          <Input 
                            type="date"
                            value={formData.passportDetails?.expiryDate || ''}
                            onChange={(e) => handleNestedChange('passportDetails', 'expiryDate', e.target.value)}
                            className="bg-slate-700/50 border-slate-600 text-white"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>

              {/* Invitation Details */}
              <Card className="bg-slate-700/30 border-slate-600">
                <Collapsible open={openSections.invitation} onOpenChange={() => toggleSection('invitation')}>
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-slate-600/30 transition-colors">
                      <CardTitle className="text-white flex items-center justify-between text-lg">
                        <div className="flex items-center">
                          <Send className="w-5 h-5 mr-2" />
                          Invitation Details
                        </div>
                        {openSections.invitation ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </CardTitle>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-white">Reason for Invitation</Label>
                          <Select 
                            value={formData.invitationDetails?.reason} 
                            onValueChange={(value) => handleNestedChange('invitationDetails', 'reason', value)}
                          >
                            <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                              <SelectValue placeholder="Select reason" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-600">
                              {invitationReasons.map((reason) => (
                                <SelectItem key={reason} value={reason} className="text-white">{reason}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-400 text-sm">Upload proof of invitation</p>
                          <Button variant="outline" className="mt-2" size="sm">
                            <Upload className="w-4 h-4 mr-2" />
                            Choose File
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>

              {/* Payment Details */}
              <Card className="bg-slate-700/30 border-slate-600">
                <Collapsible open={openSections.payment} onOpenChange={() => toggleSection('payment')}>
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-slate-600/30 transition-colors">
                      <CardTitle className="text-white flex items-center justify-between text-lg">
                        <div className="flex items-center">
                          <CreditCard className="w-5 h-5 mr-2" />
                          Payment Details
                        </div>
                        {openSections.payment ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </CardTitle>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-white">Who pays for visa?</Label>
                            <Select 
                              value={formData.paymentDetails?.whoPaysFees} 
                              onValueChange={(value) => handleNestedChange('paymentDetails', 'whoPaysFees', value)}
                            >
                              <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                                <SelectValue placeholder="Select payer" />
                              </SelectTrigger>
                              <SelectContent className="bg-slate-800 border-slate-600">
                                <SelectItem value="me" className="text-white">I will pay</SelectItem>
                                <SelectItem value="guest" className="text-white">Guest will pay</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-white">Payment Method</Label>
                            <Select 
                              value={formData.paymentDetails?.paymentMethod} 
                              onValueChange={(value) => handleNestedChange('paymentDetails', 'paymentMethod', value)}
                            >
                              <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                                <SelectValue placeholder="Select method" />
                              </SelectTrigger>
                              <SelectContent className="bg-slate-800 border-slate-600">
                                {paymentMethods.map((method) => (
                                  <SelectItem key={method} value={method.toLowerCase()} className="text-white">{method}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="bg-slate-600/30 p-4 rounded-lg">
                          <p className="text-gray-300 text-sm mb-3">
                            Click to make payment or send payment link to guest
                          </p>
                          <div className="flex space-x-2">
                            <Button className="bg-green-600 hover:bg-green-700">
                              <CreditCard className="w-4 h-4 mr-2" />
                              Make Payment
                            </Button>
                            <Button variant="outline" className="text-blue-400 border-blue-400">
                              <Send className="w-4 h-4 mr-2" />
                              Send Payment Link
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>

              {/* Submit Button */}
              <div className="flex space-x-4 mt-6">
                <Button onClick={submitApplication} className="bg-cyan-600 hover:bg-cyan-700">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Application
                </Button>
                <Button variant="outline" className="text-cyan-400 border-cyan-400">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview Application
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}