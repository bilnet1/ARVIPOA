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
  Shield, 
  Settings, 
  DollarSign,
  Upload,
  Users,
  Save, 
  Eye, 
  Send, 
  ChevronDown,
  ChevronUp,
  Home,
  Building,
  CreditCard,
  FileText,
  Mic,
  Clock,
  CheckCircle,
  Edit,
  Trash2,
  AlertTriangle,
  UserCheck,
  Heart,
  Cigarette,
  Wine
} from 'lucide-react';

interface PropertyRules {
  id: string;
  propertyId: string;
  spacePurpose: string[];
  customPurpose?: string;
  paymentPlan: {
    rentMode: string;
    duration: number;
    currency: string;
    amount: string;
    paymentMode: string[];
  };
  occupantRules: {
    allowedTypes: string[];
    sexMode: string[];
    maritalStatus: string[];
    nationalities: string[];
    tribes: string[];
    ageGroups: string[];
    workCategories: string[];
    jobSecurity: string[];
    expectedIncomeRange: {
      currency: string;
      amount: string;
    };
  };
  petsLivestock: {
    allowed: boolean;
    maxNumber?: number;
    categories: string[];
    types: string[];
  };
  lifestyle: {
    smokingAllowed: boolean;
    smokingTypes: string[];
    alcoholPolicy: string[];
    dueDiligence: string[];
  };
  visitors: {
    allowed: boolean;
    frequency: string;
    maxTimes?: number;
  };
  utilities: {
    responsibleParty: string;
    cleaning: string;
    arvipoaCleaning: boolean;
  };
  bylaws: {
    textAgreement: string;
    attachedFiles: File[];
    audioFiles: File[];
  };
  visibleToTenants: boolean;
  createdAt: string;
}

export default function PropertyRulesModule() {
  const [formData, setFormData] = useState<Partial<PropertyRules>>({
    spacePurpose: [],
    paymentPlan: {
      rentMode: 'Monthly',
      currency: 'GH¢',
      paymentMode: []
    },
    occupantRules: {
      allowedTypes: [],
      sexMode: [],
      maritalStatus: [],
      nationalities: [],
      tribes: [],
      ageGroups: [],
      workCategories: [],
      jobSecurity: []
    },
    petsLivestock: {
      allowed: false,
      categories: [],
      types: []
    },
    lifestyle: {
      smokingAllowed: false,
      smokingTypes: [],
      alcoholPolicy: [],
      dueDiligence: []
    },
    visitors: {
      allowed: false
    },
    utilities: {
      responsibleParty: 'Property Owner',
      cleaning: 'Property Owner',
      arvipoaCleaning: false
    },
    bylaws: {
      textAgreement: '',
      attachedFiles: [],
      audioFiles: []
    },
    visibleToTenants: true
  });

  const [openSections, setOpenSections] = useState({
    purpose: true,
    payment: false,
    occupant: false,
    pets: false,
    lifestyle: false,
    visitors: false,
    utilities: false,
    bylaws: false
  });

  const spacePurposes = [
    'Personal Use', 'Caretaking', 'Will', 'Collateral', 'Rent', 'Sell', 'Lease', 
    'Mortgage', 'Auction', 'Mixed Use'
  ];

  const currencies = ['GH¢', 'USD', 'GBP', 'Euro', 'Naira'];
  const rentModes = ['Hourly', 'Daily', 'Weekly', 'Monthly', 'Annually'];
  const paymentModes = ['Mobile Money', 'Bank Transfer', 'Cheque', 'Cash', 'Card'];

  const occupantTypes = ['Individual', 'Private Company', 'Government Institution', 'Government Worker', 'NGO', 'NGO Worker'];
  const sexModes = ['All', 'Male', 'Female', 'Mixed', 'Others'];
  const maritalStatuses = ['Single', 'Married', 'Divorced', 'Widowed', 'Separated', 'Cohabitants'];
  const ageGroups = ['1-10 years', '10-20 years', '20-30 years', '30-50 years', '50-80 years', '80+ years'];
  const workCategories = ['Government Worker', 'Private', 'Public', 'NGO Worker', 'Businessman', 'Unemployed', 'Religious Teacher'];

  const ghanaTribes = ['Akan', 'Ewe', 'Ga', 'Fante', 'Hausa', 'Dagbani', 'Gonja', 'Mamprusi', 'Others'];
  const petTypes = ['Dog', 'Cat', 'Cattle', 'Pig', 'Goat', 'Sheep', 'Bird', 'Fish'];
  const smokingTypes = ['Cigarette', 'Tobacco', 'Electronic', 'Marijuana', 'Others'];
  const alcoholPolicies = ['Heavy Drinker', 'Mild Drinker', 'None'];
  const dueDiligenceTypes = ['Ex-convict', 'In Ongoing Investigation', 'Defendant', 'Complainant'];

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

  const handleArrayToggle = (section: string, field: string, value: string) => {
    setFormData((prev) => {
      const currentArray = (prev[section as keyof typeof prev] as any)?.[field] || [];
      const newArray = currentArray.includes(value)
        ? currentArray.filter((item: string) => item !== value)
        : [...currentArray, value];
      
      return {
        ...prev,
        [section]: {
          ...prev[section as keyof typeof prev],
          [field]: newArray
        }
      };
    });
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const saveRules = () => {
    const rules: PropertyRules = {
      id: Date.now().toString(),
      propertyId: 'current-property-id',
      ...formData,
      createdAt: new Date().toISOString()
    } as PropertyRules;

    console.log('Saving Property Rules to Firestore:', rules);
    alert('Property rules saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            <Shield className="w-10 h-10 inline-block mr-3 text-purple-400" />
            ARVIPOA Property Rules & Regulations
          </h1>
          <p className="text-gray-300">Set comprehensive rules and regulations for your property</p>
        </div>

        {/* Space Purpose */}
        <Card className="bg-slate-800/50 border-purple-500/30">
          <Collapsible open={openSections.purpose} onOpenChange={() => toggleSection('purpose')}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-slate-700/30 transition-colors">
                <CardTitle className="text-purple-400 flex items-center justify-between">
                  <div className="flex items-center">
                    <Building className="w-6 h-6 mr-2" />
                    Space Purpose
                  </div>
                  {openSections.purpose ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label className="text-white">Property Usage (Select all that apply)</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                      {spacePurposes.map((purpose) => (
                        <div key={purpose} className="flex items-center space-x-2">
                          <input 
                            type="checkbox"
                            id={`purpose-${purpose}`}
                            checked={formData.spacePurpose?.includes(purpose) || false}
                            onChange={(e) => {
                              const purposes = formData.spacePurpose || [];
                              if (e.target.checked) {
                                handleInputChange('spacePurpose', [...purposes, purpose]);
                              } else {
                                handleInputChange('spacePurpose', purposes.filter(p => p !== purpose));
                              }
                            }}
                            className="w-3 h-3"
                          />
                          <Label htmlFor={`purpose-${purpose}`} className="text-white text-sm">{purpose}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-white">Custom Purpose (if applicable)</Label>
                    <Input 
                      value={formData.customPurpose || ''}
                      onChange={(e) => handleInputChange('customPurpose', e.target.value)}
                      placeholder="Specify custom purpose"
                      className="bg-slate-700/50 border-slate-600 text-white"
                    />
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Payment Plan */}
        <Card className="bg-slate-800/50 border-green-500/30">
          <Collapsible open={openSections.payment} onOpenChange={() => toggleSection('payment')}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-slate-700/30 transition-colors">
                <CardTitle className="text-green-400 flex items-center justify-between">
                  <div className="flex items-center">
                    <DollarSign className="w-6 h-6 mr-2" />
                    Payment Plan
                  </div>
                  {openSections.payment ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-white">Rent Mode</Label>
                      <Select 
                        value={formData.paymentPlan?.rentMode} 
                        onValueChange={(value) => handleNestedChange('paymentPlan', 'rentMode', value)}
                      >
                        <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                          <SelectValue placeholder="Select rent mode" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-600">
                          {rentModes.map((mode) => (
                            <SelectItem key={mode} value={mode} className="text-white">{mode}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-white">Currency</Label>
                      <Select 
                        value={formData.paymentPlan?.currency} 
                        onValueChange={(value) => handleNestedChange('paymentPlan', 'currency', value)}
                      >
                        <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-600">
                          {currencies.map((currency) => (
                            <SelectItem key={currency} value={currency} className="text-white">{currency}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-white">Rent Amount</Label>
                      <Input 
                        type="number"
                        value={formData.paymentPlan?.amount || ''}
                        onChange={(e) => handleNestedChange('paymentPlan', 'amount', e.target.value)}
                        placeholder="Enter amount"
                        className="bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-white">Payment Methods (Select all that apply)</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                      {paymentModes.map((mode) => (
                        <div key={mode} className="flex items-center space-x-2">
                          <input 
                            type="checkbox"
                            id={`payment-${mode}`}
                            checked={formData.paymentPlan?.paymentMode?.includes(mode) || false}
                            onChange={(e) => {
                              const modes = formData.paymentPlan?.paymentMode || [];
                              if (e.target.checked) {
                                handleNestedChange('paymentPlan', 'paymentMode', [...modes, mode]);
                              } else {
                                handleNestedChange('paymentPlan', 'paymentMode', modes.filter(m => m !== mode));
                              }
                            }}
                            className="w-3 h-3"
                          />
                          <Label htmlFor={`payment-${mode}`} className="text-white text-sm">{mode}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Occupant Rules */}
        <Card className="bg-slate-800/50 border-blue-500/30">
          <Collapsible open={openSections.occupant} onOpenChange={() => toggleSection('occupant')}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-slate-700/30 transition-colors">
                <CardTitle className="text-blue-400 flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="w-6 h-6 mr-2" />
                    Occupant Rules
                  </div>
                  {openSections.occupant ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <Label className="text-white">Allowed Occupant Types</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                      {occupantTypes.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <input 
                            type="checkbox"
                            id={`occupant-${type}`}
                            checked={formData.occupantRules?.allowedTypes?.includes(type) || false}
                            onChange={() => handleArrayToggle('occupantRules', 'allowedTypes', type)}
                            className="w-3 h-3"
                          />
                          <Label htmlFor={`occupant-${type}`} className="text-white text-sm">{type}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-white">Gender Requirements</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                      {sexModes.map((sex) => (
                        <div key={sex} className="flex items-center space-x-2">
                          <input 
                            type="checkbox"
                            id={`sex-${sex}`}
                            checked={formData.occupantRules?.sexMode?.includes(sex) || false}
                            onChange={() => handleArrayToggle('occupantRules', 'sexMode', sex)}
                            className="w-3 h-3"
                          />
                          <Label htmlFor={`sex-${sex}`} className="text-white text-sm">{sex}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-white">Marital Status</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                      {maritalStatuses.map((status) => (
                        <div key={status} className="flex items-center space-x-2">
                          <input 
                            type="checkbox"
                            id={`marital-${status}`}
                            checked={formData.occupantRules?.maritalStatus?.includes(status) || false}
                            onChange={() => handleArrayToggle('occupantRules', 'maritalStatus', status)}
                            className="w-3 h-3"
                          />
                          <Label htmlFor={`marital-${status}`} className="text-white text-sm">{status}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-white">Age Groups Allowed</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                      {ageGroups.map((age) => (
                        <div key={age} className="flex items-center space-x-2">
                          <input 
                            type="checkbox"
                            id={`age-${age}`}
                            checked={formData.occupantRules?.ageGroups?.includes(age) || false}
                            onChange={() => handleArrayToggle('occupantRules', 'ageGroups', age)}
                            className="w-3 h-3"
                          />
                          <Label htmlFor={`age-${age}`} className="text-white text-sm">{age}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-white">Expected Income Currency</Label>
                      <Select 
                        value={formData.occupantRules?.expectedIncomeRange?.currency} 
                        onValueChange={(value) => {
                          const currentRange = formData.occupantRules?.expectedIncomeRange || {};
                          handleNestedChange('occupantRules', 'expectedIncomeRange', { ...currentRange, currency: value });
                        }}
                      >
                        <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-600">
                          {currencies.map((currency) => (
                            <SelectItem key={currency} value={currency} className="text-white">{currency}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-white">Minimum Expected Income</Label>
                      <Input 
                        type="number"
                        value={formData.occupantRules?.expectedIncomeRange?.amount || ''}
                        onChange={(e) => {
                          const currentRange = formData.occupantRules?.expectedIncomeRange || {};
                          handleNestedChange('occupantRules', 'expectedIncomeRange', { ...currentRange, amount: e.target.value });
                        }}
                        placeholder="Enter minimum amount"
                        className="bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Pets & Livestock */}
        <Card className="bg-slate-800/50 border-orange-500/30">
          <Collapsible open={openSections.pets} onOpenChange={() => toggleSection('pets')}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-slate-700/30 transition-colors">
                <CardTitle className="text-orange-400 flex items-center justify-between">
                  <div className="flex items-center">
                    <Heart className="w-6 h-6 mr-2" />
                    Pets & Livestock
                  </div>
                  {openSections.pets ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label className="text-white">Allow Pets/Livestock?</Label>
                    <Select 
                      value={formData.petsLivestock?.allowed ? 'yes' : 'no'} 
                      onValueChange={(value) => handleNestedChange('petsLivestock', 'allowed', value === 'yes')}
                    >
                      <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                        <SelectValue placeholder="Select answer" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        <SelectItem value="yes" className="text-white">Yes</SelectItem>
                        <SelectItem value="no" className="text-white">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.petsLivestock?.allowed && (
                    <div className="space-y-4">
                      <div>
                        <Label className="text-white">Maximum Number of Pets</Label>
                        <Input 
                          type="number"
                          value={formData.petsLivestock?.maxNumber || ''}
                          onChange={(e) => handleNestedChange('petsLivestock', 'maxNumber', parseInt(e.target.value))}
                          placeholder="Enter maximum number"
                          className="bg-slate-700/50 border-slate-600 text-white"
                        />
                      </div>

                      <div>
                        <Label className="text-white">Allowed Pet Types</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                          {petTypes.map((type) => (
                            <div key={type} className="flex items-center space-x-2">
                              <input 
                                type="checkbox"
                                id={`pet-${type}`}
                                checked={formData.petsLivestock?.types?.includes(type) || false}
                                onChange={() => handleArrayToggle('petsLivestock', 'types', type)}
                                className="w-3 h-3"
                              />
                              <Label htmlFor={`pet-${type}`} className="text-white text-sm">{type}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Lifestyle Rules */}
        <Card className="bg-slate-800/50 border-red-500/30">
          <Collapsible open={openSections.lifestyle} onOpenChange={() => toggleSection('lifestyle')}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-slate-700/30 transition-colors">
                <CardTitle className="text-red-400 flex items-center justify-between">
                  <div className="flex items-center">
                    <Cigarette className="w-6 h-6 mr-2" />
                    Lifestyle Rules
                  </div>
                  {openSections.lifestyle ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label className="text-white">Smoking Allowed?</Label>
                    <Select 
                      value={formData.lifestyle?.smokingAllowed ? 'yes' : 'no'} 
                      onValueChange={(value) => handleNestedChange('lifestyle', 'smokingAllowed', value === 'yes')}
                    >
                      <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                        <SelectValue placeholder="Select answer" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        <SelectItem value="yes" className="text-white">Yes</SelectItem>
                        <SelectItem value="no" className="text-white">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.lifestyle?.smokingAllowed && (
                    <div>
                      <Label className="text-white">Allowed Smoking Types</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                        {smokingTypes.map((type) => (
                          <div key={type} className="flex items-center space-x-2">
                            <input 
                              type="checkbox"
                              id={`smoking-${type}`}
                              checked={formData.lifestyle?.smokingTypes?.includes(type) || false}
                              onChange={() => handleArrayToggle('lifestyle', 'smokingTypes', type)}
                              className="w-3 h-3"
                            />
                            <Label htmlFor={`smoking-${type}`} className="text-white text-sm">{type}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <Label className="text-white">Alcohol Policy</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                      {alcoholPolicies.map((policy) => (
                        <div key={policy} className="flex items-center space-x-2">
                          <input 
                            type="checkbox"
                            id={`alcohol-${policy}`}
                            checked={formData.lifestyle?.alcoholPolicy?.includes(policy) || false}
                            onChange={() => handleArrayToggle('lifestyle', 'alcoholPolicy', policy)}
                            className="w-3 h-3"
                          />
                          <Label htmlFor={`alcohol-${policy}`} className="text-white text-sm">{policy}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-white">Due Diligence Restrictions</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      {dueDiligenceTypes.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <input 
                            type="checkbox"
                            id={`diligence-${type}`}
                            checked={formData.lifestyle?.dueDiligence?.includes(type) || false}
                            onChange={() => handleArrayToggle('lifestyle', 'dueDiligence', type)}
                            className="w-3 h-3"
                          />
                          <Label htmlFor={`diligence-${type}`} className="text-white text-sm">{type}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Bylaws & Agreement */}
        <Card className="bg-slate-800/50 border-cyan-500/30">
          <Collapsible open={openSections.bylaws} onOpenChange={() => toggleSection('bylaws')}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-slate-700/30 transition-colors">
                <CardTitle className="text-cyan-400 flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="w-6 h-6 mr-2" />
                    Bylaws & Agreement
                  </div>
                  {openSections.bylaws ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label className="text-white">Property Agreement (Text)</Label>
                    <Textarea 
                      value={formData.bylaws?.textAgreement || ''}
                      onChange={(e) => handleNestedChange('bylaws', 'textAgreement', e.target.value)}
                      placeholder="Enter your property agreement and bylaws here..."
                      className="bg-slate-700/50 border-slate-600 text-white min-h-[120px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-400 text-sm">Attach Agreement Files</p>
                      <Button variant="outline" className="mt-2" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Choose Files
                      </Button>
                    </div>

                    <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center">
                      <Mic className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-400 text-sm">Record Audio Agreement</p>
                      <Button variant="outline" className="mt-2" size="sm">
                        <Mic className="w-4 h-4 mr-2" />
                        Record Audio
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox"
                      id="visible-to-tenants"
                      checked={formData.visibleToTenants || false}
                      onChange={(e) => handleInputChange('visibleToTenants', e.target.checked)}
                      className="w-4 h-4"
                    />
                    <Label htmlFor="visible-to-tenants" className="text-white">
                      Make rules visible to potential tenants
                    </Label>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Save Button */}
        <Card className="bg-slate-800/90 border-purple-500/50">
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-bold text-purple-400 mb-4">Save Property Rules</h2>
            <p className="text-white mb-6">
              These rules will be applied to your property and used to match potential tenants. 
              Rules can be updated anytime from your property dashboard.
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" className="text-purple-400 border-purple-400 hover:bg-purple-400/10">
                <Eye className="w-4 h-4 mr-2" />
                Preview Rules
              </Button>
              <Button onClick={saveRules} className="bg-purple-600 hover:bg-purple-700 text-white">
                <Save className="w-4 h-4 mr-2" />
                Save Rules
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}