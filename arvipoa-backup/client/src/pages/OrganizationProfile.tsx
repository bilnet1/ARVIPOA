import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Users, 
  Package, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  FileText, 
  Plus, 
  Edit3, 
  Trash2,
  Check,
  Clock,
  AlertCircle,
  Upload,
  Eye,
  Shield,
  Target,
  TrendingUp,
  Settings,
  CreditCard,
  Heart,
  Send
} from 'lucide-react';
import PhoneInput from '../components/PhoneInput';

interface WorkingDay {
  day: string;
  isSelected: boolean;
  startTime: string;
  endTime: string;
}

interface OrganizationData {
  id?: number;
  companyName: string;
  companyCategory: string;
  companyActivities: string[];
  companyEmail: string;
  companyWebsite: string;
  companyPhone: string;
  companyRegNo: string;
  companyType: string;
  tin: string;
  workingDays: WorkingDay[];
  certificateType: string;
  certificateIssuer: string;
  certificatePlaceOfIssue: string;
  deliveryMethod: string;
  smartCardType?: string;
  numberOfCards?: number;
  cardFeatures?: string;
  cardDeliveryAddress?: string;
  cardRequirements?: string;
  isNew: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  urlVerified: boolean;
  bankName: string;
  bankAddress: string;
  accountName: string;
  accountNumber: string;
  swiftCode: string;
  accountOfficerName: string;
  accountOfficerPhone: string;
  accountOfficerEmail: string;
  religion: string;
  denomination: string;
  customDenomination: string;
  rbfBranchName: string;
  rbfBranchId: string;
  rbfRequestSent: boolean;
}

interface Representative {
  id?: number;
  idNumber: string;
  position: string;
  allocatedShares: string;
  phone: string;
  email: string;
  isPrimary: boolean;
  isVerified: boolean;
}

interface Staff {
  id?: number;
  workerId: string;
  workerCategory: string;
  position: string;
  workIdNumber: string;
  allocatedShares: string;
  workType: string;
  phone: string;
  email: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

interface Product {
  id?: number;
  category: string;
  name: string;
  description: string;
  price: string;
  currency: string;
  customCurrency?: string;
  attachedFiles: string[];
  bannerDesign: string;
}

interface Activity {
  id?: number;
  workerId: string;
  activityDate: string;
  timeFrom: string;
  timeTo: string;
  status: string;
  activityDetails: string;
  proofAttachment?: string;
  isOvertime: boolean;
}

export default function OrganizationProfile() {
  const [currentTab, setCurrentTab] = useState('registration');
  const [isNew, setIsNew] = useState(true);
  const [organizationData, setOrganizationData] = useState<OrganizationData>({
    companyName: '',
    companyCategory: 'Private',
    companyActivities: [],
    companyEmail: '',
    companyWebsite: '',
    companyPhone: '',
    companyRegNo: '',
    companyType: '',
    tin: '',
    workingDays: [
      { day: 'Monday', isSelected: false, startTime: '09:00', endTime: '17:00' },
      { day: 'Tuesday', isSelected: false, startTime: '09:00', endTime: '17:00' },
      { day: 'Wednesday', isSelected: false, startTime: '09:00', endTime: '17:00' },
      { day: 'Thursday', isSelected: false, startTime: '09:00', endTime: '17:00' },
      { day: 'Friday', isSelected: false, startTime: '09:00', endTime: '17:00' },
      { day: 'Saturday', isSelected: false, startTime: '09:00', endTime: '13:00' },
      { day: 'Sunday', isSelected: false, startTime: '09:00', endTime: '13:00' },
    ],
    certificateType: '',
    certificateIssuer: '',
    certificatePlaceOfIssue: '',
    deliveryMethod: 'Office',
    isNew: true,
    emailVerified: false,
    phoneVerified: false,
    urlVerified: false,
    bankName: '',
    bankAddress: '',
    accountName: '',
    accountNumber: '',
    swiftCode: '',
    accountOfficerName: '',
    accountOfficerPhone: '',
    accountOfficerEmail: '',
    religion: '',
    denomination: '',
    customDenomination: '',
    rbfBranchName: '',
    rbfBranchId: '',
    rbfRequestSent: false,
  });

  const [representatives, setRepresentatives] = useState<Representative[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [otpCodes, setOtpCodes] = useState<{[key: string]: string}>({});

  const companyCategories = ['Government', 'Private', 'Public', 'NGO', 'Freelancer', 'Entrepreneur'];
  const companyActivities = ['Construction', 'Petty Trading', 'Manufacturing', 'Services', 'Technology', 'Agriculture'];
  const workingDaysOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const positions = ['Director', 'Secretary', 'Manager', 'Supervisor', 'Employee', 'Contractor'];
  const workTypes = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'];
  const currencies = ['GHS', 'USD', 'GBP', 'EURO', 'Others'];

  const religions = [
    "Christianity", "Islam", "African traditional religions", "Secular", "Non-religious",
    "Agnostic", "Atheist", "Hinduism", "Buddhism", "Chinese traditional religion",
    "Ethnic religions", "Eckanker", "Sikhism", "Spiritism", "Judaism", "Baháʼí",
    "Jainism", "Shinto", "Cao Dai", "Zoroastrianism", "Tenrikyo", "Animism",
    "Neo-Paganism", "Unitarian Universalism", "Rastafari", "None"
  ];

  const denominations: { [key: string]: string[] } = {
    Christianity: ["Charismatic", "Pentecostal", "Catholic", "Orthodox", "Protestant", "Anglican", "Baptist", "Methodist", "Presbyterian", "Lutheran", "Others"],
    Islam: ["Sunni", "Shia", "Sufi", "Others"],
    Judaism: ["Orthodox", "Conservative", "Reform", "Reconstructionist", "Others"],
    Buddhism: ["Theravada", "Mahayana", "Vajrayana", "Zen", "Others"],
    Hinduism: ["Vaishnavism", "Shaivism", "Shaktism", "Smartism", "Others"],
    default: ["Others"]
  };

  const handleInputChange = (field: keyof OrganizationData, value: any) => {
    setOrganizationData(prev => ({ ...prev, [field]: value }));
  };

  const handleActivityToggle = (activity: string) => {
    setOrganizationData(prev => ({
      ...prev,
      companyActivities: prev.companyActivities.includes(activity)
        ? prev.companyActivities.filter(a => a !== activity)
        : [...prev.companyActivities, activity]
    }));
  };

  const handleWorkingDayToggle = (dayIndex: number) => {
    setOrganizationData(prev => ({
      ...prev,
      workingDays: prev.workingDays.map((workingDay, index) =>
        index === dayIndex
          ? { ...workingDay, isSelected: !workingDay.isSelected }
          : workingDay
      )
    }));
  };

  const handleWorkingDayTimeChange = (dayIndex: number, timeType: 'startTime' | 'endTime', value: string) => {
    setOrganizationData(prev => ({
      ...prev,
      workingDays: prev.workingDays.map((workingDay, index) =>
        index === dayIndex
          ? { ...workingDay, [timeType]: value }
          : workingDay
      )
    }));
  };

  const sendOTP = async (type: 'email' | 'phone') => {
    // Implementation for OTP sending
    console.log(`Sending OTP to ${type}`);
  };

  const verifyOTP = async (type: 'email' | 'phone', code: string) => {
    // Implementation for OTP verification
    console.log(`Verifying ${type} OTP: ${code}`);
  };

  const addRepresentative = () => {
    const newRep: Representative = {
      idNumber: '',
      position: '',
      allocatedShares: 'None',
      phone: '',
      email: '',
      isPrimary: representatives.length === 0,
      isVerified: false,
    };
    setRepresentatives([...representatives, newRep]);
  };

  const addStaff = () => {
    const newStaff: Staff = {
      workerId: '',
      workerCategory: 'Individual',
      position: '',
      workIdNumber: '',
      allocatedShares: 'None',
      workType: 'Full-time',
      phone: '',
      email: '',
      startDate: '',
      endDate: '',
      isActive: true,
    };
    setStaff([...staff, newStaff]);
  };

  const addProduct = () => {
    const newProduct: Product = {
      category: '',
      name: '',
      description: '',
      price: '',
      currency: 'GHS',
      attachedFiles: [],
      bannerDesign: '',
    };
    setProducts([...products, newProduct]);
  };

  const addActivity = () => {
    const newActivity: Activity = {
      workerId: '',
      activityDate: new Date().toISOString().split('T')[0],
      timeFrom: '09:00',
      timeTo: '17:00',
      status: 'Active',
      activityDetails: '',
      isOvertime: false,
    };
    setActivities([...activities, newActivity]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Building2 className="w-8 h-8 text-[#D4AF37]" />
              <div>
                <h1 className="text-3xl font-bold text-gradient-gold">Organization Profile</h1>
                <p className="text-gray-600 mt-1">Manage your company information and operations</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'registration', label: 'Company Registration', icon: Building2 },
              { id: 'representatives', label: 'Representatives', icon: Users },
              { id: 'staff', label: 'Staff & Workers', icon: Users },
              { id: 'products', label: 'Products & Services', icon: Package },
              { id: 'activities', label: 'Activity Tracker', icon: Calendar },
              { id: 'roster', label: 'Work Roster', icon: Clock },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                  currentTab === tab.id
                    ? 'border-[#D4AF37] text-[#D4AF37]'
                    : 'border-transparent text-gray-600 hover:text-[#D4AF37]'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {currentTab === 'registration' && (
            <motion.div
              key="registration"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Registration Type Selection */}
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Registration Type</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setIsNew(true)}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      isNew
                        ? 'border-[#D4AF37] bg-[#D4AF37]/5 text-[#D4AF37]'
                        : 'border-gray-200 hover:border-[#D4AF37]/50'
                    }`}
                  >
                    <div className="text-center">
                      <Plus className="w-8 h-8 mx-auto mb-2" />
                      <h3 className="font-bold text-lg">NEW</h3>
                      <p className="text-sm opacity-75">Fresh registration for new companies</p>
                    </div>
                  </button>
                  <button
                    onClick={() => setIsNew(false)}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      !isNew
                        ? 'border-[#D4AF37] bg-[#D4AF37]/5 text-[#D4AF37]'
                        : 'border-gray-200 hover:border-[#D4AF37]/50'
                    }`}
                  >
                    <div className="text-center">
                      <FileText className="w-8 h-8 mx-auto mb-2" />
                      <h3 className="font-bold text-lg">EXISTING</h3>
                      <p className="text-sm opacity-75">Already registered companies</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Company Basic Information */}
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Company Information</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      value={organizationData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                      placeholder="Enter company name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Category *
                    </label>
                    <select
                      value={organizationData.companyCategory}
                      onChange={(e) => handleInputChange('companyCategory', e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                    >
                      {companyCategories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Activities *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {companyActivities.map(activity => (
                        <button
                          key={activity}
                          type="button"
                          onClick={() => handleActivityToggle(activity)}
                          className={`p-2 rounded-lg border transition-all text-sm ${
                            organizationData.companyActivities.includes(activity)
                              ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]'
                              : 'border-gray-200 hover:border-[#D4AF37]/50'
                          }`}
                        >
                          {activity}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Email * 
                      {organizationData.emailVerified && (
                        <Check className="inline w-4 h-4 text-green-500 ml-1" />
                      )}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        value={organizationData.companyEmail}
                        onChange={(e) => handleInputChange('companyEmail', e.target.value)}
                        className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                        placeholder="company@example.com"
                      />
                      <button
                        type="button"
                        onClick={() => sendOTP('email')}
                        className="px-4 py-2 bg-[#D4AF37] text-white rounded-xl hover:bg-[#B8860B] transition-colors text-sm"
                      >
                        Send OTP
                      </button>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otpCodes.email || ''}
                        onChange={(e) => setOtpCodes(prev => ({...prev, email: e.target.value}))}
                        className="flex-1 p-2 border border-gray-200 rounded-lg text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => verifyOTP('email', otpCodes.email || '')}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                      >
                        Verify
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Website
                      {organizationData.urlVerified && (
                        <Check className="inline w-4 h-4 text-green-500 ml-1" />
                      )}
                    </label>
                    <input
                      type="url"
                      value={organizationData.companyWebsite}
                      onChange={(e) => handleInputChange('companyWebsite', e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                      placeholder="https://www.company.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Phone *
                      {organizationData.phoneVerified && (
                        <Check className="inline w-4 h-4 text-green-500 ml-1" />
                      )}
                    </label>
                    <PhoneInput
                      value={organizationData.companyPhone}
                      onChange={(value) => handleInputChange('companyPhone', value)}
                      placeholder="Company phone number"
                      required={true}
                      name="companyPhone"
                    />
                    <div className="flex gap-2 mt-2">
                      <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otpCodes.phone || ''}
                        onChange={(e) => setOtpCodes(prev => ({...prev, phone: e.target.value}))}
                        className="flex-1 p-2 border border-gray-200 rounded-lg text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => sendOTP('phone')}
                        className="px-4 py-2 bg-[#D4AF37] text-white rounded-lg hover:bg-[#B8860B] transition-colors text-sm"
                      >
                        Send OTP
                      </button>
                      <button
                        type="button"
                        onClick={() => verifyOTP('phone', otpCodes.phone || '')}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                      >
                        Verify
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Registration No. *
                    </label>
                    <input
                      type="text"
                      value={organizationData.companyRegNo}
                      onChange={(e) => handleInputChange('companyRegNo', e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                      placeholder="Enter registration number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Type *
                    </label>
                    <input
                      type="text"
                      value={organizationData.companyType}
                      onChange={(e) => handleInputChange('companyType', e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                      placeholder="e.g., Limited Liability Company"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      TIN *
                    </label>
                    <input
                      type="text"
                      value={organizationData.tin}
                      onChange={(e) => handleInputChange('tin', e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                      placeholder="Tax Identification Number"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Working Days & Hours *
                    </label>
                    <div className="space-y-3">
                      {organizationData.workingDays.map((workingDay, index) => (
                        <div key={workingDay.day} className="flex items-center gap-4 p-3 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id={`day-${index}`}
                              checked={workingDay.isSelected}
                              onChange={() => handleWorkingDayToggle(index)}
                              className="w-4 h-4 text-[#D4AF37] border-gray-300 rounded focus:ring-[#D4AF37]"
                            />
                            <label htmlFor={`day-${index}`} className="text-sm font-medium text-gray-700 min-w-[80px]">
                              {workingDay.day}
                            </label>
                          </div>
                          
                          {workingDay.isSelected && (
                            <div className="flex items-center gap-2 flex-1">
                              <div className="flex items-center gap-2">
                                <label className="text-xs text-gray-500">Start:</label>
                                <input
                                  type="time"
                                  value={workingDay.startTime}
                                  onChange={(e) => handleWorkingDayTimeChange(index, 'startTime', e.target.value)}
                                  className="px-2 py-1 border border-gray-300 rounded text-sm focus:border-[#D4AF37] focus:outline-none"
                                />
                              </div>
                              <span className="text-gray-400">-</span>
                              <div className="flex items-center gap-2">
                                <label className="text-xs text-gray-500">End:</label>
                                <input
                                  type="time"
                                  value={workingDay.endTime}
                                  onChange={(e) => handleWorkingDayTimeChange(index, 'endTime', e.target.value)}
                                  className="px-2 py-1 border border-gray-300 rounded text-sm focus:border-[#D4AF37] focus:outline-none"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Delivery Method *
                    </label>
                    <select
                      value={organizationData.deliveryMethod}
                      onChange={(e) => handleInputChange('deliveryMethod', e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                    >
                      <option value="Office">Office Pickup</option>
                      <option value="Delivery">Home/Office Delivery</option>
                      <option value="Digital">Digital Delivery</option>
                    </select>
                  </div>

                  {/* ARVIPOA Smart ID Section */}
                  <div className="md:col-span-2">
                    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl border border-blue-200">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-600 rounded-lg">
                          <CreditCard className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">ARVIPOA Smart ID Application</h3>
                          <p className="text-sm text-gray-600">Apply for organization smart ID services with secure digital authentication</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Smart ID Type *
                          </label>
                          <select
                            value={organizationData.smartCardType || 'Business'}
                            onChange={(e) => handleInputChange('smartCardType', e.target.value)}
                            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                          >
                            <option value="Business">Business Smart ID</option>
                            <option value="Corporate">Corporate Smart ID</option>
                            <option value="Enterprise">Enterprise Smart ID</option>
                            <option value="Premium">Premium Business Smart ID</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Number of Smart IDs *
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="100"
                            value={organizationData.numberOfCards || 1}
                            onChange={(e) => handleInputChange('numberOfCards', parseInt(e.target.value))}
                            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                            placeholder="Number of Smart IDs needed"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Smart ID Features *
                          </label>
                          <select
                            value={organizationData.cardFeatures || 'Standard'}
                            onChange={(e) => handleInputChange('cardFeatures', e.target.value)}
                            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                          >
                            <option value="Standard">Standard Features</option>
                            <option value="Enhanced">Enhanced Security</option>
                            <option value="Premium">Premium Features</option>
                            <option value="Custom">Custom Features</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Delivery Address *
                          </label>
                          <input
                            type="text"
                            value={organizationData.cardDeliveryAddress || ''}
                            onChange={(e) => handleInputChange('cardDeliveryAddress', e.target.value)}
                            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                            placeholder="Enter delivery address"
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Special Requirements
                        </label>
                        <textarea
                          value={organizationData.cardRequirements || ''}
                          onChange={(e) => handleInputChange('cardRequirements', e.target.value)}
                          className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                          rows={3}
                          placeholder="Any special requirements or customizations..."
                        />
                      </div>

                      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <h4 className="font-medium text-blue-900 mb-2">ARVIPOA Smart ID Benefits for Organizations:</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Secure employee access control</li>
                          <li>• Digital payment capabilities</li>
                          <li>• Multi-factor authentication</li>
                          <li>• Integration with ARVIPOA systems</li>
                          <li>• Bulk management dashboard</li>
                          <li>• Property access authorization</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Banking Details Section */}
                  <div className="md:col-span-2">
                    <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl border border-green-200">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-green-600 rounded-lg">
                          <CreditCard className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Banking Details</h3>
                          <p className="text-sm text-gray-600">Organization banking information for transactions and payments</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bank Name
                          </label>
                          <input
                            type="text"
                            value={organizationData.bankName}
                            onChange={(e) => handleInputChange('bankName', e.target.value)}
                            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                            placeholder="Enter bank name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Account Name
                          </label>
                          <input
                            type="text"
                            value={organizationData.accountName}
                            onChange={(e) => handleInputChange('accountName', e.target.value)}
                            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                            placeholder="Enter account holder name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Account Number
                          </label>
                          <input
                            type="text"
                            value={organizationData.accountNumber}
                            onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                            placeholder="Enter account number"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            SWIFT Code
                          </label>
                          <input
                            type="text"
                            value={organizationData.swiftCode}
                            onChange={(e) => handleInputChange('swiftCode', e.target.value)}
                            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                            placeholder="Enter SWIFT/BIC code"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bank Address
                          </label>
                          <input
                            type="text"
                            value={organizationData.bankAddress}
                            onChange={(e) => handleInputChange('bankAddress', e.target.value)}
                            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                            placeholder="Enter bank branch address"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Account Officer's Name
                          </label>
                          <input
                            type="text"
                            value={organizationData.accountOfficerName}
                            onChange={(e) => handleInputChange('accountOfficerName', e.target.value)}
                            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                            placeholder="Enter account officer name"
                          />
                        </div>

                        <div>
                          <PhoneInput
                            value={organizationData.accountOfficerPhone}
                            onChange={(value) => handleInputChange('accountOfficerPhone', value)}
                            placeholder="Account officer phone"
                            label="Account Officer's Phone"
                            name="accountOfficerPhone"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Account Officer's Email
                          </label>
                          <input
                            type="email"
                            value={organizationData.accountOfficerEmail}
                            onChange={(e) => handleInputChange('accountOfficerEmail', e.target.value)}
                            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                            placeholder="Enter account officer email"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentTab === 'representatives' && (
            <motion.div
              key="representatives"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Company Representatives</h2>
                  <button
                    onClick={addRepresentative}
                    className="flex items-center space-x-2 px-4 py-2 bg-[#D4AF37] text-white rounded-xl hover:bg-[#B8860B] transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add Representative</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {representatives.map((rep, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-xl">
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            ID Number *
                          </label>
                          <input
                            type="text"
                            value={rep.idNumber}
                            onChange={(e) => {
                              const newReps = [...representatives];
                              newReps[index].idNumber = e.target.value;
                              setRepresentatives(newReps);
                            }}
                            className="w-full p-2 border border-gray-200 rounded-lg"
                            placeholder="Enter ID number"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Position *
                          </label>
                          <select
                            value={rep.position}
                            onChange={(e) => {
                              const newReps = [...representatives];
                              newReps[index].position = e.target.value;
                              setRepresentatives(newReps);
                            }}
                            className="w-full p-2 border border-gray-200 rounded-lg"
                          >
                            <option value="">Select position</option>
                            {positions.map(pos => (
                              <option key={pos} value={pos}>{pos}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Allocated Shares
                          </label>
                          <input
                            type="text"
                            value={rep.allocatedShares}
                            onChange={(e) => {
                              const newReps = [...representatives];
                              newReps[index].allocatedShares = e.target.value;
                              setRepresentatives(newReps);
                            }}
                            className="w-full p-2 border border-gray-200 rounded-lg"
                            placeholder="None"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone *
                          </label>
                          <PhoneInput
                            value={rep.phone}
                            onChange={(value) => {
                              const newReps = [...representatives];
                              newReps[index].phone = value;
                              setRepresentatives(newReps);
                            }}
                            placeholder="Representative phone"
                            name={`rep-phone-${index}`}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email *
                          </label>
                          <input
                            type="email"
                            value={rep.email}
                            onChange={(e) => {
                              const newReps = [...representatives];
                              newReps[index].email = e.target.value;
                              setRepresentatives(newReps);
                            }}
                            className="w-full p-2 border border-gray-200 rounded-lg"
                            placeholder="representative@email.com"
                          />
                        </div>

                        <div className="flex items-end">
                          <button
                            type="button"
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                          >
                            <Send className="w-4 h-4 inline mr-1" />
                            Send Invitation
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                        <div className="flex items-center space-x-4">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={rep.isPrimary}
                              onChange={(e) => {
                                const newReps = [...representatives];
                                newReps[index].isPrimary = e.target.checked;
                                setRepresentatives(newReps);
                              }}
                              className="rounded border-gray-300"
                            />
                            <span className="ml-2 text-sm">Primary Representative</span>
                          </label>
                          {rep.isVerified && (
                            <span className="flex items-center text-green-600 text-sm">
                              <Check className="w-4 h-4 mr-1" />
                              Verified
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const newReps = representatives.filter((_, i) => i !== index);
                            setRepresentatives(newReps);
                          }}
                          className="text-red-600 hover:text-red-800 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {currentTab === 'staff' && (
            <motion.div
              key="staff"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Staff & Workers</h2>
                  <button
                    onClick={addStaff}
                    className="flex items-center space-x-2 px-4 py-2 bg-[#D4AF37] text-white rounded-xl hover:bg-[#B8860B] transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add Staff</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {staff.map((member, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-xl">
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Worker Category *
                          </label>
                          <select
                            value={member.workerCategory}
                            onChange={(e) => {
                              const newStaff = [...staff];
                              newStaff[index].workerCategory = e.target.value;
                              setStaff(newStaff);
                            }}
                            className="w-full p-2 border border-gray-200 rounded-lg"
                          >
                            <option value="Individual">Individual</option>
                            <option value="Organization">Organization</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Position *
                          </label>
                          <select
                            value={member.position}
                            onChange={(e) => {
                              const newStaff = [...staff];
                              newStaff[index].position = e.target.value;
                              setStaff(newStaff);
                            }}
                            className="w-full p-2 border border-gray-200 rounded-lg"
                          >
                            <option value="">Select position</option>
                            {positions.map(pos => (
                              <option key={pos} value={pos}>{pos}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Work ID Number *
                          </label>
                          <input
                            type="text"
                            value={member.workIdNumber}
                            onChange={(e) => {
                              const newStaff = [...staff];
                              newStaff[index].workIdNumber = e.target.value;
                              setStaff(newStaff);
                            }}
                            className="w-full p-2 border border-gray-200 rounded-lg"
                            placeholder="Enter work ID"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Work Type *
                          </label>
                          <select
                            value={member.workType}
                            onChange={(e) => {
                              const newStaff = [...staff];
                              newStaff[index].workType = e.target.value;
                              setStaff(newStaff);
                            }}
                            className="w-full p-2 border border-gray-200 rounded-lg"
                          >
                            {workTypes.map(type => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Start Date *
                          </label>
                          <input
                            type="date"
                            value={member.startDate}
                            onChange={(e) => {
                              const newStaff = [...staff];
                              newStaff[index].startDate = e.target.value;
                              setStaff(newStaff);
                            }}
                            className="w-full p-2 border border-gray-200 rounded-lg"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            End Date
                          </label>
                          <input
                            type="date"
                            value={member.endDate}
                            onChange={(e) => {
                              const newStaff = [...staff];
                              newStaff[index].endDate = e.target.value;
                              setStaff(newStaff);
                            }}
                            className="w-full p-2 border border-gray-200 rounded-lg"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Contact Information
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            <PhoneInput
                              value={member.phone}
                              onChange={(value) => {
                                const newStaff = [...staff];
                                newStaff[index].phone = value;
                                setStaff(newStaff);
                              }}
                              placeholder="Phone"
                              name={`staff-phone-${index}`}
                            />
                            <input
                              type="email"
                              value={member.email}
                              onChange={(e) => {
                                const newStaff = [...staff];
                                newStaff[index].email = e.target.value;
                                setStaff(newStaff);
                              }}
                              className="p-2 border border-gray-200 rounded-lg"
                              placeholder="Email"
                            />
                          </div>
                        </div>

                        <div className="flex items-end">
                          <button
                            type="button"
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                          >
                            <Send className="w-4 h-4 inline mr-1" />
                            Send Invitation
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                        <div className="flex items-center space-x-4">
                          <span className={`px-2 py-1 rounded text-xs ${
                            member.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {member.isActive ? 'Active' : 'Inactive'}
                          </span>
                          <span className="flex items-center text-blue-600 text-sm">
                            <Clock className="w-4 h-4 mr-1" />
                            Pending Verification
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const newStaff = staff.filter((_, i) => i !== index);
                            setStaff(newStaff);
                          }}
                          className="text-red-600 hover:text-red-800 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {currentTab === 'products' && (
            <motion.div
              key="products"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Products & Services</h2>
                  <button
                    onClick={addProduct}
                    className="flex items-center space-x-2 px-4 py-2 bg-[#D4AF37] text-white rounded-xl hover:bg-[#B8860B] transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add Product/Service</span>
                  </button>
                </div>

                <div className="grid gap-6">
                  {products.map((product, index) => (
                    <div key={index} className="p-6 border border-gray-200 rounded-xl">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category *
                          </label>
                          <input
                            type="text"
                            value={product.category}
                            onChange={(e) => {
                              const newProducts = [...products];
                              newProducts[index].category = e.target.value;
                              setProducts(newProducts);
                            }}
                            className="w-full p-3 border border-gray-200 rounded-lg"
                            placeholder="Product/Service category"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name *
                          </label>
                          <input
                            type="text"
                            value={product.name}
                            onChange={(e) => {
                              const newProducts = [...products];
                              newProducts[index].name = e.target.value;
                              setProducts(newProducts);
                            }}
                            className="w-full p-3 border border-gray-200 rounded-lg"
                            placeholder="Product/Service name"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description *
                          </label>
                          <textarea
                            value={product.description}
                            onChange={(e) => {
                              const newProducts = [...products];
                              newProducts[index].description = e.target.value;
                              setProducts(newProducts);
                            }}
                            rows={3}
                            className="w-full p-3 border border-gray-200 rounded-lg"
                            placeholder="Describe your product or service"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Price *
                          </label>
                          <input
                            type="text"
                            value={product.price}
                            onChange={(e) => {
                              const newProducts = [...products];
                              newProducts[index].price = e.target.value;
                              setProducts(newProducts);
                            }}
                            className="w-full p-3 border border-gray-200 rounded-lg"
                            placeholder="0.00"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Currency *
                          </label>
                          <div className="flex gap-2">
                            <select
                              value={product.currency}
                              onChange={(e) => {
                                const newProducts = [...products];
                                newProducts[index].currency = e.target.value;
                                setProducts(newProducts);
                              }}
                              className="flex-1 p-3 border border-gray-200 rounded-lg"
                            >
                              {currencies.map(curr => (
                                <option key={curr} value={curr}>{curr}</option>
                              ))}
                            </select>
                            {product.currency === 'Others' && (
                              <input
                                type="text"
                                value={product.customCurrency || ''}
                                onChange={(e) => {
                                  const newProducts = [...products];
                                  newProducts[index].customCurrency = e.target.value;
                                  setProducts(newProducts);
                                }}
                                className="w-24 p-3 border border-gray-200 rounded-lg"
                                placeholder="Currency"
                              />
                            )}
                          </div>
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Attach Files
                          </label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-500">Click to upload or drag and drop</p>
                            <p className="text-xs text-gray-400">PNG, JPG, PDF up to 10MB</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end mt-4">
                        <button
                          type="button"
                          onClick={() => {
                            const newProducts = products.filter((_, i) => i !== index);
                            setProducts(newProducts);
                          }}
                          className="text-red-600 hover:text-red-800 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {currentTab === 'activities' && (
            <motion.div
              key="activities"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Activity Tracker</h2>
                  <button
                    onClick={addActivity}
                    className="flex items-center space-x-2 px-4 py-2 bg-[#D4AF37] text-white rounded-xl hover:bg-[#B8860B] transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add Activity</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-xl">
                      <div className="grid md:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Worker ID *
                          </label>
                          <input
                            type="text"
                            value={activity.workerId}
                            onChange={(e) => {
                              const newActivities = [...activities];
                              newActivities[index].workerId = e.target.value;
                              setActivities(newActivities);
                            }}
                            className="w-full p-2 border border-gray-200 rounded-lg"
                            placeholder="Worker ID"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date *
                          </label>
                          <input
                            type="date"
                            value={activity.activityDate}
                            onChange={(e) => {
                              const newActivities = [...activities];
                              newActivities[index].activityDate = e.target.value;
                              setActivities(newActivities);
                            }}
                            className="w-full p-2 border border-gray-200 rounded-lg"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Time From *
                          </label>
                          <input
                            type="time"
                            value={activity.timeFrom}
                            onChange={(e) => {
                              const newActivities = [...activities];
                              newActivities[index].timeFrom = e.target.value;
                              setActivities(newActivities);
                            }}
                            className="w-full p-2 border border-gray-200 rounded-lg"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Time To *
                          </label>
                          <input
                            type="time"
                            value={activity.timeTo}
                            onChange={(e) => {
                              const newActivities = [...activities];
                              newActivities[index].timeTo = e.target.value;
                              setActivities(newActivities);
                            }}
                            className="w-full p-2 border border-gray-200 rounded-lg"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Status *
                          </label>
                          <select
                            value={activity.status}
                            onChange={(e) => {
                              const newActivities = [...activities];
                              newActivities[index].status = e.target.value;
                              setActivities(newActivities);
                            }}
                            className="w-full p-2 border border-gray-200 rounded-lg"
                          >
                            <option value="Active">Active</option>
                            <option value="Off-duty">Off-duty</option>
                            <option value="Leave">Leave</option>
                          </select>
                        </div>

                        <div className="md:col-span-3">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Activity Details *
                          </label>
                          <textarea
                            value={activity.activityDetails}
                            onChange={(e) => {
                              const newActivities = [...activities];
                              newActivities[index].activityDetails = e.target.value;
                              setActivities(newActivities);
                            }}
                            rows={2}
                            className="w-full p-2 border border-gray-200 rounded-lg"
                            placeholder="Enter activity details"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={activity.isOvertime}
                            onChange={(e) => {
                              const newActivities = [...activities];
                              newActivities[index].isOvertime = e.target.checked;
                              setActivities(newActivities);
                            }}
                            className="rounded border-gray-300"
                          />
                          <span className="ml-2 text-sm">Overtime</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            const newActivities = activities.filter((_, i) => i !== index);
                            setActivities(newActivities);
                          }}
                          className="text-red-600 hover:text-red-800 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {currentTab === 'roster' && (
            <motion.div
              key="roster"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Work Roster</h2>
                <p className="text-gray-600 mb-6">
                  Enhanced working roster for workers with SMS and In-App reminders
                </p>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                    <span className="text-yellow-800 font-medium">
                      Roster management with automated reminders coming soon
                    </span>
                  </div>
                </div>

                {/* Calendar view placeholder */}
                <div className="border border-gray-200 rounded-lg p-8 text-center">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Work Schedule Calendar</h3>
                  <p className="text-gray-600">
                    Interactive calendar for scheduling workers and sending automated reminders
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Save Button */}
        <div className="flex justify-end space-x-4 mt-8">
          <button
            type="button"
            className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="group relative px-8 py-3 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-white rounded-xl hover:from-[#B8860B] hover:to-[#D4AF37] font-medium transition-all duration-300 hover-lift"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative flex items-center">
              <Building2 className="w-5 h-5 mr-2" />
              Save Organization Profile
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}