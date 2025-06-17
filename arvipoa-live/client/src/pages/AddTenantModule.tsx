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
  Home, 
  UserCheck, 
  DollarSign,
  Upload,
  Calendar,
  Save, 
  Eye, 
  Send, 
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  CreditCard,
  FileText,
  Shield,
  Clock,
  CheckCircle,
  Edit,
  Trash2,
  Building,
  Users
} from 'lucide-react';

interface Tenant {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  occupation: string;
  incomeAmount: string;
  incomeCurrency: string;
  incomeFrequency: string;
  isOnLoan: boolean;
  loanAmount?: string;
  loanInterest?: string;
  loanPeriodStart?: string;
  loanPeriodEnd?: string;
  workSchedule: any;
  rentDuration: string;
  rentStartDate: string;
  rentEndDate: string;
  agreementUploaded: boolean;
  paymentIntegration: boolean;
  roomAssignment?: string;
  status: 'pending' | 'approved' | 'rejected';
}

export default function AddTenantModule() {
  const [formData, setFormData] = useState<Partial<Tenant>>({});
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [openSections, setOpenSections] = useState({
    personal: true,
    income: false,
    loan: false,
    schedule: false,
    rental: false,
    agreement: false
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const currencies = ['GH¢', 'USD', 'GBP', 'Euro', 'Naira'];
  const incomeFrequencies = ['Hourly', 'Daily', 'Weekly', 'Monthly', 'Annually'];
  const rentDurations = ['1 Month', '3 Months', '6 Months', '1 Year', '2 Years', 'Custom'];
  const workCategories = ['Government Worker', 'Private', 'Public', 'NGO Worker', 'Businessman', 'Unemployed', 'Religious Teacher'];
  
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const timeSlots = Array.from({length: 24}, (_, i) => `${i.toString().padStart(2, '0')}:00`);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const addTenant = () => {
    if (!formData.fullName || !formData.incomeAmount) {
      alert('Please fill required fields');
      return;
    }

    const newTenant: Tenant = {
      id: Date.now().toString(),
      fullName: formData.fullName || '',
      phone: formData.phone || '',
      email: formData.email || '',
      occupation: formData.occupation || '',
      incomeAmount: formData.incomeAmount || '',
      incomeCurrency: formData.incomeCurrency || 'GH¢',
      incomeFrequency: formData.incomeFrequency || 'Monthly',
      isOnLoan: formData.isOnLoan || false,
      loanAmount: formData.loanAmount,
      loanInterest: formData.loanInterest,
      loanPeriodStart: formData.loanPeriodStart,
      loanPeriodEnd: formData.loanPeriodEnd,
      workSchedule: formData.workSchedule || {},
      rentDuration: formData.rentDuration || '',
      rentStartDate: formData.rentStartDate || '',
      rentEndDate: formData.rentEndDate || '',
      agreementUploaded: formData.agreementUploaded || false,
      paymentIntegration: formData.paymentIntegration || false,
      roomAssignment: formData.roomAssignment,
      status: 'pending'
    };

    setTenants(prev => [...prev, newTenant]);
    setFormData({});
    setShowAddForm(false);
    
    console.log('Saving to Firestore:', newTenant);
    alert('Tenant application submitted successfully!');
  };

  const removeTenant = (id: string) => {
    setTenants(prev => prev.filter(tenant => tenant.id !== id));
  };

  const approveTenant = (id: string) => {
    setTenants(prev => prev.map(tenant => 
      tenant.id === id ? { ...tenant, status: 'approved' as const } : tenant
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            <Home className="w-10 h-10 inline-block mr-3 text-orange-400" />
            ARVIPOA Tenant Management
          </h1>
          <p className="text-gray-300">Add and manage property tenants with comprehensive rental agreements</p>
        </div>

        {/* Current Tenants List */}
        <Card className="bg-slate-800/50 border-orange-500/30">
          <CardHeader>
            <CardTitle className="text-orange-400 flex items-center justify-between">
              <div className="flex items-center">
                <Users className="w-6 h-6 mr-2" />
                Registered Tenants ({tenants.length})
              </div>
              <Button 
                onClick={() => setShowAddForm(true)}
                className="bg-orange-600 hover:bg-orange-700"
              >
                <UserCheck className="w-4 h-4 mr-2" />
                Add Tenant
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {tenants.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No tenants registered yet</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tenants.map((tenant) => (
                  <Card key={tenant.id} className="bg-slate-700/30 border-slate-600">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-white font-medium">{tenant.fullName}</h4>
                        <Badge 
                          variant={tenant.status === 'approved' ? 'default' : tenant.status === 'pending' ? 'secondary' : 'destructive'}
                          className={
                            tenant.status === 'approved' ? 'bg-green-600' : 
                            tenant.status === 'pending' ? 'bg-yellow-600' : 'bg-red-600'
                          }
                        >
                          {tenant.status}
                        </Badge>
                      </div>
                      <p className="text-gray-400 text-sm">{tenant.occupation}</p>
                      <p className="text-gray-400 text-xs">{tenant.phone} | {tenant.email}</p>
                      <p className="text-gray-400 text-xs">Income: {tenant.incomeCurrency}{tenant.incomeAmount} / {tenant.incomeFrequency}</p>
                      <p className="text-gray-400 text-xs">Duration: {tenant.rentDuration}</p>
                      
                      <div className="flex space-x-2 mt-3">
                        <Button variant="ghost" size="sm" className="text-blue-400">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-green-400"
                          onClick={() => approveTenant(tenant.id)}
                        >
                          <CheckCircle className="w-3 h-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-400"
                          onClick={() => removeTenant(tenant.id)}
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

        {/* Add Tenant Form */}
        {showAddForm && (
          <Card className="bg-slate-800/50 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-400">Add New Tenant</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">

                {/* Personal Details */}
                <Card className="bg-slate-700/30 border-slate-600">
                  <Collapsible open={openSections.personal} onOpenChange={() => toggleSection('personal')}>
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-slate-600/30 transition-colors">
                        <CardTitle className="text-white flex items-center justify-between text-lg">
                          <div className="flex items-center">
                            <UserCheck className="w-5 h-5 mr-2" />
                            Personal Details
                          </div>
                          {openSections.personal ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
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
                            <Label className="text-white">Occupation</Label>
                            <Select value={formData.occupation} onValueChange={(value) => handleInputChange('occupation', value)}>
                              <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                                <SelectValue placeholder="Select occupation" />
                              </SelectTrigger>
                              <SelectContent className="bg-slate-800 border-slate-600">
                                {workCategories.map((cat) => (
                                  <SelectItem key={cat} value={cat} className="text-white">{cat}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>

                {/* Income Information */}
                <Card className="bg-slate-700/30 border-slate-600">
                  <Collapsible open={openSections.income} onOpenChange={() => toggleSection('income')}>
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-slate-600/30 transition-colors">
                        <CardTitle className="text-white flex items-center justify-between text-lg">
                          <div className="flex items-center">
                            <DollarSign className="w-5 h-5 mr-2" />
                            Income Information
                          </div>
                          {openSections.income ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </CardTitle>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <Label className="text-white">Income Frequency *</Label>
                              <Select value={formData.incomeFrequency} onValueChange={(value) => handleInputChange('incomeFrequency', value)}>
                                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                                  <SelectValue placeholder="Select frequency" />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-800 border-slate-600">
                                  {incomeFrequencies.map((freq) => (
                                    <SelectItem key={freq} value={freq} className="text-white">{freq}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label className="text-white">Currency</Label>
                              <Select value={formData.incomeCurrency} onValueChange={(value) => handleInputChange('incomeCurrency', value)}>
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
                              <Label className="text-white">Amount *</Label>
                              <Input 
                                type="number"
                                value={formData.incomeAmount || ''}
                                onChange={(e) => handleInputChange('incomeAmount', e.target.value)}
                                placeholder="Enter amount"
                                className="bg-slate-700/50 border-slate-600 text-white"
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>

                {/* Loan Information */}
                <Card className="bg-slate-700/30 border-slate-600">
                  <Collapsible open={openSections.loan} onOpenChange={() => toggleSection('loan')}>
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-slate-600/30 transition-colors">
                        <CardTitle className="text-white flex items-center justify-between text-lg">
                          <div className="flex items-center">
                            <CreditCard className="w-5 h-5 mr-2" />
                            Loan Information
                          </div>
                          {openSections.loan ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </CardTitle>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-white">Are you on a loan?</Label>
                            <Select value={formData.isOnLoan ? 'yes' : 'no'} onValueChange={(value) => handleInputChange('isOnLoan', value === 'yes')}>
                              <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                                <SelectValue placeholder="Select answer" />
                              </SelectTrigger>
                              <SelectContent className="bg-slate-800 border-slate-600">
                                <SelectItem value="yes" className="text-white">Yes</SelectItem>
                                <SelectItem value="no" className="text-white">No</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {formData.isOnLoan && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-white">Loan Amount</Label>
                                  <Input 
                                    type="number"
                                    value={formData.loanAmount || ''}
                                    onChange={(e) => handleInputChange('loanAmount', e.target.value)}
                                    placeholder="Enter loan amount"
                                    className="bg-slate-700/50 border-slate-600 text-white"
                                  />
                                </div>
                                <div>
                                  <Label className="text-white">Interest Rate (%)</Label>
                                  <Input 
                                    type="number"
                                    value={formData.loanInterest || ''}
                                    onChange={(e) => handleInputChange('loanInterest', e.target.value)}
                                    placeholder="Enter interest rate"
                                    className="bg-slate-700/50 border-slate-600 text-white"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-white">Loan Start Date</Label>
                                  <Input 
                                    type="date"
                                    value={formData.loanPeriodStart || ''}
                                    onChange={(e) => handleInputChange('loanPeriodStart', e.target.value)}
                                    className="bg-slate-700/50 border-slate-600 text-white"
                                  />
                                </div>
                                <div>
                                  <Label className="text-white">Loan End Date</Label>
                                  <Input 
                                    type="date"
                                    value={formData.loanPeriodEnd || ''}
                                    onChange={(e) => handleInputChange('loanPeriodEnd', e.target.value)}
                                    className="bg-slate-700/50 border-slate-600 text-white"
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>

                {/* Rental Details */}
                <Card className="bg-slate-700/30 border-slate-600">
                  <Collapsible open={openSections.rental} onOpenChange={() => toggleSection('rental')}>
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-slate-600/30 transition-colors">
                        <CardTitle className="text-white flex items-center justify-between text-lg">
                          <div className="flex items-center">
                            <Calendar className="w-5 h-5 mr-2" />
                            Rental Details
                          </div>
                          {openSections.rental ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </CardTitle>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-white">Rent Duration</Label>
                            <Select value={formData.rentDuration} onValueChange={(value) => handleInputChange('rentDuration', value)}>
                              <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                                <SelectValue placeholder="Select duration" />
                              </SelectTrigger>
                              <SelectContent className="bg-slate-800 border-slate-600">
                                {rentDurations.map((duration) => (
                                  <SelectItem key={duration} value={duration} className="text-white">{duration}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label className="text-white">Rent Start Date</Label>
                              <Input 
                                type="date"
                                value={formData.rentStartDate || ''}
                                onChange={(e) => handleInputChange('rentStartDate', e.target.value)}
                                className="bg-slate-700/50 border-slate-600 text-white"
                              />
                            </div>
                            <div>
                              <Label className="text-white">Rent End Date</Label>
                              <Input 
                                type="date"
                                value={formData.rentEndDate || ''}
                                onChange={(e) => handleInputChange('rentEndDate', e.target.value)}
                                className="bg-slate-700/50 border-slate-600 text-white"
                              />
                            </div>
                          </div>

                          <div>
                            <Label className="text-white">Room/Space Assignment</Label>
                            <Input 
                              value={formData.roomAssignment || ''}
                              onChange={(e) => handleInputChange('roomAssignment', e.target.value)}
                              placeholder="Enter room or space assignment"
                              className="bg-slate-700/50 border-slate-600 text-white"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>

                {/* Agreement & Documents */}
                <Card className="bg-slate-700/30 border-slate-600">
                  <Collapsible open={openSections.agreement} onOpenChange={() => toggleSection('agreement')}>
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-slate-600/30 transition-colors">
                        <CardTitle className="text-white flex items-center justify-between text-lg">
                          <div className="flex items-center">
                            <FileText className="w-5 h-5 mr-2" />
                            Agreement & Documents
                          </div>
                          {openSections.agreement ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </CardTitle>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center">
                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-400 text-sm">Upload rental agreement and documents</p>
                            <Button variant="outline" className="mt-2" size="sm">
                              <Upload className="w-4 h-4 mr-2" />
                              Choose Files
                            </Button>
                          </div>

                          <div className="flex items-center space-x-2">
                            <input 
                              type="checkbox"
                              id="payment-integration"
                              checked={formData.paymentIntegration || false}
                              onChange={(e) => handleInputChange('paymentIntegration', e.target.checked)}
                              className="w-4 h-4"
                            />
                            <Label htmlFor="payment-integration" className="text-white">
                              Enable payment integration for this tenant
                            </Label>
                          </div>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>

                {/* Action Buttons */}
                <div className="flex space-x-4 mt-6">
                  <Button onClick={addTenant} className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    Add Tenant
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