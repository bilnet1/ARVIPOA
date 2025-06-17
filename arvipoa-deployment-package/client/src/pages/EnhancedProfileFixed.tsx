import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Wallet, Heart, Scale, Plus, Shield, Eye, EyeOff, 
  Calendar, FileText, Bell, Lock, Fingerprint, Camera,
  UserPlus, CreditCard, GraduationCap, Stethoscope, Briefcase, Building, ExternalLink, Activity,
  User, MapPin, Globe, QrCode, Phone, Check, AlertCircle
} from 'lucide-react';
import { Link } from 'wouter';
import CountrySelect from '../components/CountrySelect';
import DateOfBirthForm from '../components/DateOfBirthForm';

interface SocialConnection {
  id: string;
  name: string;
  relationshipType: 'family' | 'friend' | 'neighbor' | 'rbf_group';
  relationshipLabel: string;
  status: 'pending' | 'accepted' | 'blocked';
  avatar?: string;
}

interface WalletItem {
  id: string;
  title: string;
  type: 'id_card' | 'bank_card' | 'certificate' | 'license' | 'crypto_key' | 'password' | 'pin' | 'transcript';
  category: 'personal' | 'financial' | 'educational' | 'medical' | 'legal';
  isSecured: boolean;
  biometricLocked: boolean;
  lastAccessed?: Date;
}

interface MedicalAppointment {
  id: string;
  providerName: string;
  providerType: 'doctor' | 'hospital' | 'pharmacy' | 'clinic';
  appointmentType: 'consultation' | 'checkup' | 'surgery' | 'prescription';
  appointmentDate: Date;
  status: 'scheduled' | 'completed' | 'cancelled';
  location: string;
  calendarEventId?: string;
}

interface LegalCase {
  id: string;
  caseNumber: string;
  caseTitle: string;
  lawyerName: string;
  caseType: 'civil' | 'criminal' | 'corporate' | 'family' | 'property';
  status: 'active' | 'pending' | 'closed' | 'settled';
  nextHearingDate?: Date;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export default function EnhancedProfileFixed() {
  const [activeTab, setActiveTab] = useState<'social' | 'wallet' | 'personal' | 'date_birth' | 'education' | 'work_school' | 'medical' | 'legal'>('social');
  const [biometricAuthenticated, setBiometricAuthenticated] = useState(false);
  const [workSchoolCategory, setWorkSchoolCategory] = useState("student");
  const [employmentData, setEmploymentData] = useState({
    // Employed fields
    jobTitle: "",
    company: "",
    workAddress: "",
    workPhone: "",
    supervisor: "",
    startDate: "",
    
    // Student fields
    institution: "",
    course: "",
    studentId: "",
    yearOfStudy: "",
    expectedGraduation: "",
    
    // Work & School fields
    partTimeJob: "",
    partTimeCompany: "",
    
    // Apprenticeship fields
    apprenticeshipType: "",
    masterCraftsman: "",
    apprenticeshipLocation: "",
    apprenticeshipDuration: ""
  });
  
  const [educationEntries, setEducationEntries] = useState([
    {
      id: 1,
      institutionName: "",
      location: "",
      startDate: "",
      endDate: "",
      occurrence: "completed",
      otherReason: "",
      course: "",
      certification: "",
      certificateNumber: "",
      isVerified: false,
      attachments: {
        certificate: null,
        transcript: null,
        award: null
      }
    }
  ]);
  
  // Personal Profile Data
  const [currentAddress, setCurrentAddress] = useState({
    houseNumber: "",
    digitalAddress: "",
    region: "",
    district: "",
    town: "",
    locality: "",
    streetName: "",
    digitalAddressQR: "",
    ownsProperty: false,
    propertyOwnerPhone: "",
    verificationOTP: ""
  });
  
  const [personalInfo, setPersonalInfo] = useState({
    nationality: "",
    secondNationality: ""
  });
  
  const [languages, setLanguages] = useState([
    {
      id: 1,
      language: "",
      spokenStatus: "",
      readWriteLevel: "",
      isVerified: false
    }
  ]);
  
  const [occupations, setOccupations] = useState([
    {
      id: 1,
      businessName: "",
      sector: "",
      tinRegLic: "",
      position: "",
      workId: "",
      workAddress: "",
      workType: "",
      startDate: "",
      endDate: "",
      reasonForLeaving: "",
      jobSecurityCategory: "",
      jobSecurityTill: "",
      notes: "",
      isVerified: false,
      isCurrent: true,
      attachments: []
    }
  ]);
  
  // Ghana Regional Data
  const ghanaRegions = [
    "EASTERN REGION", "AHAFO REGION", "ASHANTI REGION", "BONO REGION", 
    "BONO EAST REGION", "CENTRAL REGION", "GREATER ACCRA REGION", 
    "NORTH EAST REGION", "NORTHERN REGION", "OTI REGION", 
    "SAVANNAH REGION", "UPPER EAST REGION", "UPPER WEST REGION", 
    "VOLTA REGION", "WESTERN REGION", "WESTERN NORTH REGION"
  ];
  
  const districtsByRegion: Record<string, string[]> = {
    "AHAFO REGION": [
      "Asunafo North Municipal", "Asunafo South", "Asutifi North", 
      "Asutifi South", "Tano North Municipal", "Tano South Municipal"
    ],
    "ASHANTI REGION": [
      "Adansi Asokwa", "Adansi North", "Adansi South", "Afigya Kwabre North",
      "Afigya Kwabre South", "Ahafo Ano North Municipal", "Ahafo Ano South East",
      "Ahafo Ano South West", "Akrofuom", "Amansie Central", "Amansie West",
      "Amansie South", "Asante Akim Central Municipal", "Asante Akim North",
      "Asante Akim South Municipal", "Asokore Mampong", "Asokwa Municipal",
      "Atwima Kwanwoma", "Atwima Mponua", "Atwima Nwabiagya Municipal",
      "Atwima Nwabiagya North", "Bekwai Municipal", "Bosome Freho",
      "Bosomtwe", "Ejisu Municipal", "Ejura Sekyedumase Municipal",
      "Juaben Municipal", "Kumasi Metropolitan", "Kwabre East Municipal",
      "Kwadaso Municipal", "Mampong Municipal", "Obuasi East Municipal",
      "Obuasi Municipal", "Offinso Municipal", "Offinso North",
      "Oforikrom Municipal", "Old Tafo Municipal", "Sekyere Afram Plains",
      "Sekyere Central", "Sekyere East", "Sekyere Kumawu", "Sekyere South",
      "Suame Municipal"
    ],
    "BONO REGION": [
      "Banda", "Berekum East Municipal", "Berekum West", "Dormaa Central Municipal",
      "Dormaa East District", "Dormaa West", "Jaman North", "Jaman South Municipal",
      "Sunyani Municipal", "Sunyani West", "Tain", "Wenchi Municipal"
    ],
    "BONO EAST REGION": [
      "Atebubu-Amantin Municipal", "Kintampo North Municipal", "Kintampo South",
      "Nkoranza North", "Nkoranza South Municipal", "Pru East", "Pru West",
      "Sene East", "Sene West", "Techiman Municipal", "Techiman North"
    ],
    "CENTRAL REGION": [
      "Abura Asebu Kwamankese", "Agona East", "Agona West Municipal",
      "Ajumako Enyan Essiam", "Asikuma Odoben Brakwa", "Assin Central Municipal",
      "Assin North", "Assin South", "Awutu Senya East Municipal",
      "Awutu Senya West", "Cape Coast Metropolitan", "Effutu Municipal",
      "Ekumfi", "Gomoa East", "Gomoa Central", "Gomoa West",
      "Komenda-Edina-Eguafo-Abirem Municipal", "Mfantsiman Municipal",
      "Twifo Atti Morkwa", "Twifo/Heman/Lower Denkyira",
      "Upper Denkyira East Municipal", "Upper Denkyira West"
    ]
  };
  
  const languageOptions = [
    "English", "Spanish", "Dutch", "French", "Twi", "Ewe", "Ga", "Ga Dangme", 
    "Hausa", "Dagomba", "Yoruba", "Igbo"
  ];
  const [socialConnections, setSocialConnections] = useState<SocialConnection[]>([
    {
      id: '1',
      name: 'John Doe',
      relationshipType: 'family',
      relationshipLabel: 'Brother',
      status: 'accepted'
    }
  ]);
  const [walletItems, setWalletItems] = useState<WalletItem[]>([
    {
      id: '1',
      title: 'Ghana Card',
      type: 'id_card',
      category: 'personal',
      isSecured: true,
      biometricLocked: true
    },
    {
      id: '2',
      title: 'University Certificate',
      type: 'certificate',
      category: 'educational',
      isSecured: true,
      biometricLocked: true
    }
  ]);
  const [medicalAppointments, setMedicalAppointments] = useState<MedicalAppointment[]>([
    {
      id: '1',
      providerName: 'Dr. Sarah Johnson',
      providerType: 'doctor',
      appointmentType: 'consultation',
      appointmentDate: new Date('2024-06-10T10:00:00'),
      status: 'scheduled',
      location: 'Korle Bu Teaching Hospital'
    }
  ]);
  const [legalCases, setLegalCases] = useState<LegalCase[]>([
    {
      id: '1',
      caseNumber: 'CV-2024-001',
      caseTitle: 'Property Dispute Resolution',
      lawyerName: 'Kwame Legal Associates',
      caseType: 'property',
      status: 'active',
      priority: 'medium',
      nextHearingDate: new Date('2024-06-15T09:00:00')
    }
  ]);

  // Biometric authentication simulation
  const handleBiometricAuth = async () => {
    try {
      if (navigator.credentials && 'create' in navigator.credentials) {
        setBiometricAuthenticated(true);
      } else {
        const pin = prompt('Enter your security PIN:');
        if (pin) {
          setBiometricAuthenticated(true);
        }
      }
    } catch (error) {
      console.error('Biometric authentication failed:', error);
    }
  };

  const handleEmploymentDataChange = (field: string, value: string) => {
    setEmploymentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addEducationEntry = () => {
    const newEntry = {
      id: Date.now(),
      institutionName: "",
      location: "",
      startDate: "",
      endDate: "",
      occurrence: "completed",
      otherReason: "",
      course: "",
      certification: "",
      certificateNumber: "",
      isVerified: false,
      attachments: {
        certificate: null,
        transcript: null,
        award: null
      }
    };
    setEducationEntries([...educationEntries, newEntry]);
  };

  const removeEducationEntry = (id: number) => {
    setEducationEntries(educationEntries.filter(entry => entry.id !== id));
  };

  const updateEducationEntry = (id: number, field: string, value: string) => {
    setEducationEntries(educationEntries.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  const sendVerificationToSchool = (id: number) => {
    console.log('Sending verification request to school for entry:', id);
    // Implementation would send verification link to institution
  };

  // Personal Profile Helper Functions
  const updateCurrentAddress = (field: string, value: string | boolean) => {
    setCurrentAddress(prev => ({ ...prev, [field]: value }));
  };

  const addLanguage = () => {
    const newLanguage = {
      id: Date.now(),
      language: "",
      spokenStatus: "",
      readWriteLevel: "",
      isVerified: false
    };
    setLanguages([...languages, newLanguage]);
  };

  const updateLanguage = (id: number, field: string, value: string) => {
    setLanguages(languages.map(lang => 
      lang.id === id ? { ...lang, [field]: value } : lang
    ));
  };

  const removeLanguage = (id: number) => {
    setLanguages(languages.filter(lang => lang.id !== id));
  };

  const addOccupation = () => {
    const newOccupation = {
      id: Date.now(),
      businessName: "",
      sector: "",
      tinRegLic: "",
      position: "",
      workId: "",
      workAddress: "",
      workType: "",
      startDate: "",
      endDate: "",
      reasonForLeaving: "",
      jobSecurityCategory: "",
      jobSecurityTill: "",
      notes: "",
      isVerified: false,
      isCurrent: true,
      attachments: []
    };
    setOccupations([...occupations, newOccupation]);
  };

  const updateOccupation = (id: number, field: string, value: string | boolean) => {
    setOccupations(occupations.map(occ => 
      occ.id === id ? { ...occ, [field]: value } : occ
    ));
  };

  const removeOccupation = (id: number) => {
    setOccupations(occupations.filter(occ => occ.id !== id));
  };

  const sendPropertyOwnerInvite = () => {
    console.log('Sending invite to property owner:', currentAddress.propertyOwnerPhone);
    // Implementation would send SMS/email invitation with OTP
  };

  const takeLanguageTest = (languageId: number, testType: string) => {
    console.log(`Taking ${testType} test for language ID:`, languageId);
    // Implementation would integrate with AI language testing service
  };

  const sendOccupationVerification = (occupationId: number) => {
    console.log('Sending CV verification request for occupation ID:', occupationId);
    // Implementation would send verification request to company
  };

  const tabs = [
    { id: 'social', label: 'Social Connections', icon: <Users className="w-5 h-5" />, count: socialConnections.length },
    { id: 'wallet', label: 'Secure Wallet', icon: <Wallet className="w-5 h-5" />, count: walletItems.length },
    { id: 'personal', label: 'Personal Info', icon: <User className="w-5 h-5" />, count: 1 },
    { id: 'date_birth', label: 'Date of Birth', icon: <Calendar className="w-5 h-5" />, count: 1 },
    { id: 'education', label: 'Education', icon: <GraduationCap className="w-5 h-5" />, count: educationEntries.length },
    { id: 'work_school', label: 'Work & School', icon: <Briefcase className="w-5 h-5" />, count: 1 },
    { id: 'medical', label: 'Medical', icon: <Heart className="w-5 h-5" />, count: medicalAppointments.length },
    { id: 'legal', label: 'Legal', icon: <Scale className="w-5 h-5" />, count: legalCases.length }
  ];

  const connectionTypes = [
    { value: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦', examples: ['Father', 'Mother', 'Brother', 'Sister', 'Child'] },
    { value: 'friend', label: 'Friends', icon: '👥', examples: ['Best Friend', 'Colleague', 'Neighbor Friend'] },
    { value: 'neighbor', label: 'Neighbors', icon: '🏘️', examples: ['Next Door', 'Same Street', 'Community Member'] },
    { value: 'rbf_group', label: 'RBF Groups', icon: '🤝', examples: ['Study Group', 'Work Team', 'Social Club'] }
  ];

  const walletCategories = [
    { value: 'personal', label: 'Personal Documents', icon: <FileText className="w-5 h-5" />, types: ['id_card', 'license'] },
    { value: 'financial', label: 'Financial', icon: <CreditCard className="w-5 h-5" />, types: ['bank_card', 'crypto_key'] },
    { value: 'educational', label: 'Education', icon: <GraduationCap className="w-5 h-5" />, types: ['certificate', 'transcript'] },
    { value: 'medical', label: 'Medical', icon: <Stethoscope className="w-5 h-5" />, types: ['medical_card'] },
    { value: 'legal', label: 'Legal', icon: <Briefcase className="w-5 h-5" />, types: ['legal_document'] }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">Enhanced Profile</h1>
              <p className="text-gray-300">Manage your social connections, secure documents, medical appointments, and legal matters</p>
            </div>
            <div className="flex gap-3">
              <Link to="/smart-pillar-admin">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-4 py-3 rounded-lg flex items-center gap-2 transition-all shadow-lg"
                >
                  <Activity className="w-5 h-5" />
                  Smart Pillar
                  <ExternalLink className="w-4 h-4" />
                </motion.button>
              </Link>
              <Link to="/smart-card-service">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold px-4 py-3 rounded-lg flex items-center gap-2 transition-all shadow-lg"
                >
                  <CreditCard className="w-5 h-5" />
                  Get Smart Card
                  <ExternalLink className="w-4 h-4" />
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white/10 backdrop-blur-sm rounded-xl p-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-3 px-6 py-3 rounded-lg transition-colors ${
                activeTab === tab.id 
                  ? 'bg-white/20 text-white shadow-lg' 
                  : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-medium">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Social Connections Tab */}
        {activeTab === 'social' && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Social Connections</h2>
              <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                <UserPlus className="w-4 h-4" />
                Add Connection
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {connectionTypes.map((type) => (
                <div key={type.value} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{type.icon}</div>
                    <h3 className="text-xl font-semibold">{type.label}</h3>
                    <p className="text-gray-300 text-sm">
                      {socialConnections.filter(c => c.relationshipType === type.value).length} connections
                    </p>
                  </div>
                  <div className="space-y-2">
                    {type.examples.map((example) => (
                      <div key={example} className="text-sm text-gray-400 bg-white/5 rounded px-2 py-1">
                        {example}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Secure Wallet Tab */}
        {activeTab === 'wallet' && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <Shield className="w-6 h-6 text-green-400" />
                  Secure Wallet
                </h2>
                <p className="text-gray-300">Protected with biometric authentication</p>
              </div>
              
              {!biometricAuthenticated ? (
                <button
                  onClick={handleBiometricAuth}
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Fingerprint className="w-5 h-5" />
                  Authenticate
                </button>
              ) : (
                <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                  <Plus className="w-4 h-4" />
                  Add Item
                </button>
              )}
            </div>

            {!biometricAuthenticated ? (
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-12 text-center border border-white/20">
                <Lock className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Wallet Locked</h3>
                <p className="text-gray-300 mb-6">Use biometric authentication or PIN to access your secure documents</p>
                <div className="flex justify-center gap-4">
                  <button 
                    onClick={handleBiometricAuth}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <Fingerprint className="w-4 h-4" />
                    Fingerprint
                  </button>
                  <button 
                    onClick={handleBiometricAuth}
                    className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <Camera className="w-4 h-4" />
                    Face ID
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {walletCategories.map((category) => (
                  <div key={category.value} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="flex items-center gap-3 mb-4">
                      {category.icon}
                      <h3 className="text-lg font-semibold">{category.label}</h3>
                    </div>
                    <div className="space-y-2">
                      {walletItems.filter(item => item.category === category.value).map((item) => (
                        <div key={item.id} className="bg-white/5 rounded-lg p-3 flex items-center justify-between">
                          <span className="text-sm">{item.title}</span>
                          {item.biometricLocked && <Lock className="w-3 h-3 text-yellow-400" />}
                        </div>
                      ))}
                      <button className="w-full bg-white/5 hover:bg-white/10 rounded-lg p-3 text-sm text-center transition-colors">
                        Add {category.label.toLowerCase()}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Medical Tab */}
        {activeTab === 'medical' && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Heart className="w-6 h-6 text-red-400" />
                Medical Appointments & Records
              </h2>
              <div className="flex gap-2">
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Schedule Appointment
                </button>
                <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  Set Reminder
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold mb-4">Upcoming Appointments</h3>
                <div className="space-y-4">
                  {medicalAppointments.filter(apt => apt.status === 'scheduled').map((appointment) => (
                    <div key={appointment.id} className="bg-white/5 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{appointment.providerName}</h4>
                        <span className="text-xs bg-blue-500 px-2 py-1 rounded">{appointment.providerType}</span>
                      </div>
                      <p className="text-sm text-gray-300 mb-1">{appointment.appointmentType}</p>
                      <p className="text-sm text-gray-400">{appointment.appointmentDate.toLocaleDateString()}</p>
                      <p className="text-sm text-gray-400">{appointment.location}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold mb-4">Recent Records</h3>
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Medical Records</h4>
                    <p className="text-sm text-gray-300 mb-2">Encrypted and secure storage for all medical documents</p>
                    <button className="text-blue-400 hover:text-blue-300 text-sm">View Records</button>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Google Calendar Integration</h4>
                    <p className="text-sm text-gray-300 mb-2">Automatic reminders and calendar sync</p>
                    <button className="text-green-400 hover:text-green-300 text-sm">Sync Calendar</button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Personal Info Tab */}
        {activeTab === 'personal' && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {/* Basic Personal Information */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
              <h3 className="text-2xl font-bold text-green-400 mb-6 flex items-center gap-3">
                <User className="w-6 h-6" />
                Basic Information
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white text-sm mb-2">Nationality *</label>
                  <CountrySelect
                    value={personalInfo.nationality}
                    onChange={(value) => setPersonalInfo(prev => ({ ...prev, nationality: value }))}
                    placeholder="Select your nationality"
                    required={true}
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm mb-2">Second Nationality (Optional)</label>
                  <CountrySelect
                    value={personalInfo.secondNationality}
                    onChange={(value) => setPersonalInfo(prev => ({ ...prev, secondNationality: value }))}
                    placeholder="Select second nationality"
                    showDualOption={true}
                  />
                </div>
              </div>
            </div>

            {/* Current Address Section */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-blue-400 mb-6 flex items-center gap-3">
                <MapPin className="w-6 h-6" />
                Current Address (Ghana Only)
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <input
                  type="text"
                  placeholder="House Number"
                  value={currentAddress.houseNumber}
                  onChange={(e) => updateCurrentAddress('houseNumber', e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400"
                />
                
                <input
                  type="text"
                  placeholder="Digital Address"
                  value={currentAddress.digitalAddress}
                  onChange={(e) => updateCurrentAddress('digitalAddress', e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400"
                />
                
                <select
                  value={currentAddress.region}
                  onChange={(e) => updateCurrentAddress('region', e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
                >
                  <option value="">Select Region</option>
                  {ghanaRegions.map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
                
                <select
                  value={currentAddress.district}
                  onChange={(e) => updateCurrentAddress('district', e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
                  disabled={!currentAddress.region}
                >
                  <option value="">Select District/Municipal</option>
                  {currentAddress.region && districtsByRegion[currentAddress.region]?.map((district) => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
                
                <input
                  type="text"
                  placeholder="Town"
                  value={currentAddress.town}
                  onChange={(e) => updateCurrentAddress('town', e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400"
                />
                
                <input
                  type="text"
                  placeholder="Locality"
                  value={currentAddress.locality}
                  onChange={(e) => updateCurrentAddress('locality', e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400"
                />
              </div>
              
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Street Name *"
                  value={currentAddress.streetName}
                  onChange={(e) => updateCurrentAddress('streetName', e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400"
                />
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2">
                  <QrCode className="w-4 h-4" />
                  Scan Digital Address QR
                </button>
                <button className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg">
                  Save Address
                </button>
              </div>
              
              {/* Property Ownership */}
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-white mb-4">Do you own this property?</h4>
                <div className="flex gap-4 mb-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="ownsProperty"
                      checked={currentAddress.ownsProperty === true}
                      onChange={() => updateCurrentAddress('ownsProperty', true)}
                      className="text-green-500"
                    />
                    <span className="text-white">Yes</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="ownsProperty"
                      checked={currentAddress.ownsProperty === false}
                      onChange={() => updateCurrentAddress('ownsProperty', false)}
                      className="text-red-500"
                    />
                    <span className="text-white">No</span>
                  </label>
                </div>
                
                {currentAddress.ownsProperty === true && (
                  <div className="bg-green-500/20 p-3 rounded-lg">
                    <p className="text-green-400 text-sm">
                      You can proceed to register this property on the platform.
                    </p>
                  </div>
                )}
                
                {currentAddress.ownsProperty === false && (
                  <div className="space-y-4">
                    <p className="text-yellow-400 text-sm">
                      Invite the property owner to verify your address
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="tel"
                        placeholder="Property Owner's Phone"
                        value={currentAddress.propertyOwnerPhone}
                        onChange={(e) => updateCurrentAddress('propertyOwnerPhone', e.target.value)}
                        className="flex-1 p-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400"
                      />
                      <button
                        onClick={sendPropertyOwnerInvite}
                        className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg"
                      >
                        Send Invite
                      </button>
                    </div>
                    {currentAddress.propertyOwnerPhone && (
                      <input
                        type="text"
                        placeholder="Enter OTP from invitation"
                        value={currentAddress.verificationOTP}
                        onChange={(e) => updateCurrentAddress('verificationOTP', e.target.value)}
                        className="w-full p-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400"
                      />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Languages Section */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-purple-400 flex items-center gap-3">
                  <Globe className="w-6 h-6" />
                  Languages Spoken
                </h3>
                <button
                  onClick={addLanguage}
                  className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Language
                </button>
              </div>
              
              <div className="space-y-4">
                {languages.map((lang, index) => (
                  <div key={lang.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-white">Language #{index + 1}</h4>
                      <div className="flex items-center gap-2">
                        {lang.isVerified && (
                          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            Verified
                          </span>
                        )}
                        {languages.length > 1 && (
                          <button
                            onClick={() => removeLanguage(lang.id)}
                            className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <select
                        value={lang.language}
                        onChange={(e) => updateLanguage(lang.id, 'language', e.target.value)}
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
                      >
                        <option value="">Select Language</option>
                        {languageOptions.map((language) => (
                          <option key={language} value={language}>{language}</option>
                        ))}
                        <option value="other">Others (Please specify)</option>
                      </select>
                      
                      <select
                        value={lang.spokenStatus}
                        onChange={(e) => updateLanguage(lang.id, 'spokenStatus', e.target.value)}
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
                      >
                        <option value="">Spoken Level</option>
                        <option value="excellent">Excellent</option>
                        <option value="fluent">Fluent</option>
                        <option value="average">Average</option>
                        <option value="not_too_good">Not too good</option>
                      </select>
                      
                      <select
                        value={lang.readWriteLevel}
                        onChange={(e) => updateLanguage(lang.id, 'readWriteLevel', e.target.value)}
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
                      >
                        <option value="">Read & Write Level</option>
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="basic">Basic</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                    
                    {lang.language === 'other' && (
                      <input
                        type="text"
                        placeholder="Please specify the language"
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 mb-4"
                      />
                    )}
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => takeLanguageTest(lang.id, 'spoken')}
                        className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded text-sm"
                      >
                        Take Spoken Test
                      </button>
                      <button
                        onClick={() => takeLanguageTest(lang.id, 'readwrite')}
                        className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded text-sm"
                      >
                        Take Read & Write Test
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Occupation Section */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-yellow-400 flex items-center gap-3">
                  <Briefcase className="w-6 h-6" />
                  Occupation Details
                </h3>
                <button
                  onClick={addOccupation}
                  className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Occupation
                </button>
              </div>
              
              <div className="space-y-6">
                {occupations.map((occ, index) => (
                  <div key={occ.id} className="bg-white/5 rounded-lg p-6 border border-white/10">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-white flex items-center gap-2">
                        {occ.isCurrent ? 'Current Occupation' : `Previous Occupation #${index + 1}`}
                        {occ.isVerified && (
                          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            Verified
                          </span>
                        )}
                      </h4>
                      {occupations.length > 1 && (
                        <button
                          onClick={() => removeOccupation(occ.id)}
                          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <input
                        type="text"
                        placeholder="Business/Institution Name"
                        value={occ.businessName}
                        onChange={(e) => updateOccupation(occ.id, 'businessName', e.target.value)}
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400"
                      />
                      
                      <select
                        value={occ.sector}
                        onChange={(e) => updateOccupation(occ.id, 'sector', e.target.value)}
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
                      >
                        <option value="">Select Sector</option>
                        <option value="government">Government</option>
                        <option value="private">Private</option>
                        <option value="both">Both</option>
                        <option value="ngo">NGO</option>
                      </select>
                      
                      <input
                        type="text"
                        placeholder="TIN/Reg/Lic. No."
                        value={occ.tinRegLic}
                        onChange={(e) => updateOccupation(occ.id, 'tinRegLic', e.target.value)}
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400"
                      />
                      
                      <input
                        type="text"
                        placeholder="Position"
                        value={occ.position}
                        onChange={(e) => updateOccupation(occ.id, 'position', e.target.value)}
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400"
                      />
                      
                      <input
                        type="text"
                        placeholder="Work ID No."
                        value={occ.workId}
                        onChange={(e) => updateOccupation(occ.id, 'workId', e.target.value)}
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400"
                      />
                      
                      <select
                        value={occ.workType}
                        onChange={(e) => updateOccupation(occ.id, 'workType', e.target.value)}
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
                      >
                        <option value="">Select Work Type</option>
                        <option value="full_time">Full Time</option>
                        <option value="part_time">Part Time</option>
                        <option value="contract">Contract</option>
                        <option value="freelance">Freelance</option>
                        <option value="internship">Internship</option>
                        <option value="volunteer">Volunteer</option>
                      </select>
                    </div>
                    
                    <div className="mb-4">
                      <textarea
                        placeholder="Work Address"
                        value={occ.workAddress}
                        onChange={(e) => updateOccupation(occ.id, 'workAddress', e.target.value)}
                        rows={2}
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 resize-none"
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-white text-sm mb-2">Start Date</label>
                        <input
                          type="date"
                          value={occ.startDate}
                          onChange={(e) => updateOccupation(occ.id, 'startDate', e.target.value)}
                          className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-white text-sm mb-2">End Date</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="date"
                            value={occ.endDate}
                            onChange={(e) => updateOccupation(occ.id, 'endDate', e.target.value)}
                            disabled={occ.isCurrent}
                            className="flex-1 p-3 rounded-lg bg-white/10 border border-white/20 text-white disabled:opacity-50"
                          />
                          <label className="flex items-center gap-2 text-white text-sm">
                            <input
                              type="checkbox"
                              checked={occ.isCurrent}
                              onChange={(e) => updateOccupation(occ.id, 'isCurrent', e.target.checked)}
                              className="text-green-500"
                            />
                            Current
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <textarea
                        placeholder="Little note about this occupation"
                        value={occ.notes}
                        onChange={(e) => updateOccupation(occ.id, 'notes', e.target.value)}
                        rows={3}
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 resize-none"
                      />
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                      <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Attach Awards/Certificate
                      </button>
                      <button
                        onClick={() => sendOccupationVerification(occ.id)}
                        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm"
                      >
                        Send CV Request to Company
                      </button>
                    </div>
                    
                    {!occ.isVerified && (
                      <div className="mt-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3">
                        <p className="text-yellow-400 text-sm flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          Your page will only be updated when the company accepts your request
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Date of Birth Tab */}
        {activeTab === 'date_birth' && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <DateOfBirthForm />
          </motion.div>
        )}

        {/* Education Tab */}
        {activeTab === 'education' && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <GraduationCap className="w-6 h-6 text-purple-400" />
                Education - CV Builder
              </h2>
              <button 
                onClick={addEducationEntry}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add More Education
              </button>
            </div>

            <div className="space-y-6">
              {educationEntries.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-purple-400">
                      Education Entry #{index + 1}
                    </h3>
                    <div className="flex items-center gap-2">
                      {entry.isVerified ? (
                        <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          Verified
                        </span>
                      ) : (
                        <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm">
                          Pending Verification
                        </span>
                      )}
                      {educationEntries.length > 1 && (
                        <button
                          onClick={() => removeEducationEntry(entry.id)}
                          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {/* Institution Name */}
                    <input
                      type="text"
                      placeholder="Institution Name"
                      value={entry.institutionName}
                      onChange={(e) => updateEducationEntry(entry.id, 'institutionName', e.target.value)}
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400"
                    />

                    {/* Location */}
                    <input
                      type="text"
                      placeholder="Location"
                      value={entry.location}
                      onChange={(e) => updateEducationEntry(entry.id, 'location', e.target.value)}
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400"
                    />

                    {/* Start Date */}
                    <div>
                      <label className="block text-white text-sm mb-2">Start Date</label>
                      <input
                        type="date"
                        value={entry.startDate}
                        onChange={(e) => updateEducationEntry(entry.id, 'startDate', e.target.value)}
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
                      />
                    </div>

                    {/* Occurrence */}
                    <div>
                      <label className="block text-white text-sm mb-2">Occurrence</label>
                      <select
                        value={entry.occurrence}
                        onChange={(e) => updateEducationEntry(entry.id, 'occurrence', e.target.value)}
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
                      >
                        <option value="completed">Completed</option>
                        <option value="couldnt_complete">Couldn't Complete</option>
                        <option value="transferred">Transferred</option>
                        <option value="expelled">Expelled</option>
                        <option value="rusticated">Rusticated</option>
                        <option value="other">Other Reasons</option>
                      </select>
                    </div>

                    {/* End/Occurrence Date */}
                    <div>
                      <label className="block text-white text-sm mb-2">
                        {entry.occurrence === 'completed' ? 'End Date' : 'Occurrence Date'}
                      </label>
                      <input
                        type="date"
                        value={entry.endDate}
                        onChange={(e) => updateEducationEntry(entry.id, 'endDate', e.target.value)}
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
                      />
                    </div>

                    {/* Other Reason (conditional) */}
                    {entry.occurrence === 'other' && (
                      <div>
                        <label className="block text-white text-sm mb-2">State Other Reasons</label>
                        <input
                          type="text"
                          placeholder="State other reasons for not able to complete"
                          value={entry.otherReason}
                          onChange={(e) => updateEducationEntry(entry.id, 'otherReason', e.target.value)}
                          className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400"
                        />
                      </div>
                    )}

                    {/* Course/Program */}
                    <div>
                      <label className="block text-white text-sm mb-2">Course/Program Offered</label>
                      <select
                        value={entry.course}
                        onChange={(e) => updateEducationEntry(entry.id, 'course', e.target.value)}
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
                      >
                        <option value="">Choose a course</option>
                        <option value="computer_science">Computer Science</option>
                        <option value="business_administration">Business Administration</option>
                        <option value="engineering">Engineering</option>
                        <option value="medicine">Medicine</option>
                        <option value="law">Law</option>
                        <option value="education">Education</option>
                        <option value="arts">Arts</option>
                        <option value="science">Science</option>
                        <option value="agriculture">Agriculture</option>
                        <option value="economics">Economics</option>
                        <option value="psychology">Psychology</option>
                        <option value="nursing">Nursing</option>
                        <option value="pharmacy">Pharmacy</option>
                        <option value="architecture">Architecture</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Certification */}
                    <div>
                      <label className="block text-white text-sm mb-2">Certification</label>
                      <select
                        value={entry.certification}
                        onChange={(e) => updateEducationEntry(entry.id, 'certification', e.target.value)}
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
                      >
                        <option value="">Choose certification</option>
                        <option value="certificate">Certificate</option>
                        <option value="diploma">Diploma</option>
                        <option value="higher_diploma">Higher Diploma</option>
                        <option value="bachelor_degree">Bachelor's Degree</option>
                        <option value="master_degree">Master's Degree</option>
                        <option value="phd">PhD</option>
                        <option value="professional_cert">Professional Certificate</option>
                        <option value="associate_degree">Associate Degree</option>
                        <option value="post_graduate_diploma">Post Graduate Diploma</option>
                      </select>
                    </div>

                    {/* Certificate Number */}
                    <div className="md:col-span-2">
                      <label className="block text-white text-sm mb-2">Certificate Number</label>
                      <input
                        type="text"
                        placeholder="Enter certificate number"
                        value={entry.certificateNumber}
                        onChange={(e) => updateEducationEntry(entry.id, 'certificateNumber', e.target.value)}
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400"
                      />
                    </div>
                  </div>

                  {/* File Attachments */}
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Attach Certificate
                      </h4>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                      />
                    </div>

                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Attach Transcript
                      </h4>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-green-600 file:text-white hover:file:bg-green-700"
                      />
                    </div>

                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Attach Award
                      </h4>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                      />
                    </div>
                  </div>

                  {/* Verification Section */}
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                    <h4 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Institution Verification
                    </h4>
                    <p className="text-sm text-gray-300 mb-4">
                      Your added education within Ghana will remain unverified until the institution verifies from their portal.
                    </p>
                    <button
                      onClick={() => sendVerificationToSchool(entry.id)}
                      className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg text-white text-sm transition-colors"
                    >
                      Send Confirmation Link to School Page
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CV Preview Section */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-purple-400 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                CV Preview - Education Section
              </h3>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-bold text-white mb-3">EDUCATION</h4>
                {educationEntries.filter(entry => entry.institutionName).map((entry, index) => (
                  <div key={entry.id} className="mb-4 pb-4 border-b border-white/10 last:border-b-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h5 className="font-semibold text-white">{entry.institutionName}</h5>
                        <p className="text-sm text-gray-300">{entry.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-300">
                          {entry.startDate} - {entry.endDate || 'Present'}
                        </p>
                        {entry.isVerified && (
                          <span className="text-xs text-green-400 flex items-center gap-1">
                            <Shield className="w-3 h-3" />
                            Verified
                          </span>
                        )}
                      </div>
                    </div>
                    {entry.course && (
                      <p className="text-sm text-gray-400 mb-1">
                        <strong>Course:</strong> {entry.course.replace('_', ' ').toUpperCase()}
                      </p>
                    )}
                    {entry.certification && (
                      <p className="text-sm text-gray-400 mb-1">
                        <strong>Certification:</strong> {entry.certification.replace('_', ' ').toUpperCase()}
                      </p>
                    )}
                    {entry.certificateNumber && (
                      <p className="text-sm text-gray-400">
                        <strong>Certificate #:</strong> {entry.certificateNumber}
                      </p>
                    )}
                    <p className="text-sm text-gray-400">
                      <strong>Status:</strong> {entry.occurrence.replace('_', ' ').toUpperCase()}
                    </p>
                  </div>
                ))}
                {educationEntries.filter(entry => entry.institutionName).length === 0 && (
                  <p className="text-gray-400 text-sm italic">No education entries added yet</p>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Work & School Tab */}
        {activeTab === 'work_school' && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-blue-400" />
                Current Work & School Category
              </h2>
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                <Plus className="w-4 h-4" />
                Update Status
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h4 className="text-lg font-semibold mb-4 text-white">Select Your Current Status</h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                {[
                  { id: 'employed', label: 'Employed', icon: <Briefcase className="w-4 h-4" /> },
                  { id: 'unemployed', label: 'Unemployed', icon: <Users className="w-4 h-4" /> },
                  { id: 'student', label: 'Student', icon: <GraduationCap className="w-4 h-4" /> },
                  { id: 'work_school', label: 'Work & School', icon: <Building className="w-4 h-4" /> },
                  { id: 'apprenticeship', label: 'Apprenticeship', icon: <Users className="w-4 h-4" /> }
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setWorkSchoolCategory(option.id)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all ${
                      workSchoolCategory === option.id
                        ? 'bg-yellow-500 text-black border-yellow-400'
                        : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                    }`}
                  >
                    {option.icon}
                    <span className="text-xs font-medium">{option.label}</span>
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                      workSchoolCategory === option.id 
                        ? 'border-black bg-black' 
                        : 'border-white/40'
                    }`}>
                      {workSchoolCategory === option.id && (
                        <span className="text-white text-xs">✓</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Dynamic Forms Based on Selection */}
              <motion.div
                key={workSchoolCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white/5 rounded-xl p-6 border border-white/10"
              >
                {/* Employed Form */}
                {workSchoolCategory === 'employed' && (
                  <div className="space-y-4">
                    <h5 className="text-lg font-semibold text-yellow-400 mb-4">Employment Details</h5>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Job Title"
                        value={employmentData.jobTitle}
                        onChange={(e) => handleEmploymentDataChange('jobTitle', e.target.value)}
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400"
                      />
                      <input
                        type="text"
                        placeholder="Company Name"
                        value={employmentData.company}
                        onChange={(e) => handleEmploymentDataChange('company', e.target.value)}
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400"
                      />
                      <input
                        type="text"
                        placeholder="Work Address"
                        value={employmentData.workAddress}
                        onChange={(e) => handleEmploymentDataChange('workAddress', e.target.value)}
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400"
                      />
                      <input
                        type="tel"
                        placeholder="Work Phone"
                        value={employmentData.workPhone}
                        onChange={(e) => handleEmploymentDataChange('workPhone', e.target.value)}
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400"
                      />
                      <input
                        type="text"
                        placeholder="Supervisor/Manager"
                        value={employmentData.supervisor}
                        onChange={(e) => handleEmploymentDataChange('supervisor', e.target.value)}
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400"
                      />
                      <input
                        type="date"
                        placeholder="Start Date"
                        value={employmentData.startDate}
                        onChange={(e) => handleEmploymentDataChange('startDate', e.target.value)}
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
                      />
                    </div>
                  </div>
                )}

                {/* Student Form */}
                {workSchoolCategory === 'student' && (
                  <div className="space-y-4">
                    <h5 className="text-lg font-semibold text-yellow-400 mb-4">Student Information</h5>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Institution/School Name"
                        value={employmentData.institution}
                        onChange={(e) => handleEmploymentDataChange('institution', e.target.value)}
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400"
                      />
                      <input
                        type="text"
                        placeholder="Course/Program"
                        value={employmentData.course}
                        onChange={(e) => handleEmploymentDataChange('course', e.target.value)}
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400"
                      />
                      <input
                        type="text"
                        placeholder="Student ID"
                        value={employmentData.studentId}
                        onChange={(e) => handleEmploymentDataChange('studentId', e.target.value)}
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400"
                      />
                      <select
                        value={employmentData.yearOfStudy}
                        onChange={(e) => handleEmploymentDataChange('yearOfStudy', e.target.value)}
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
                      >
                        <option value="">Year of Study</option>
                        <option value="1">Year 1</option>
                        <option value="2">Year 2</option>
                        <option value="3">Year 3</option>
                        <option value="4">Year 4</option>
                        <option value="5">Year 5+</option>
                      </select>
                      <input
                        type="date"
                        placeholder="Expected Graduation"
                        value={employmentData.expectedGraduation}
                        onChange={(e) => handleEmploymentDataChange('expectedGraduation', e.target.value)}
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
                      />
                    </div>
                  </div>
                )}

                {/* Work & School Form */}
                {workSchoolCategory === 'work_school' && (
                  <div className="space-y-4">
                    <h5 className="text-lg font-semibold text-yellow-400 mb-4">Work & School Details</h5>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Institution/School Name"
                        value={employmentData.institution}
                        onChange={(e) => handleEmploymentDataChange('institution', e.target.value)}
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400"
                      />
                      <input
                        type="text"
                        placeholder="Course/Program"
                        value={employmentData.course}
                        onChange={(e) => handleEmploymentDataChange('course', e.target.value)}
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400"
                      />
                      <input
                        type="text"
                        placeholder="Part-time Job Title"
                        value={employmentData.partTimeJob}
                        onChange={(e) => handleEmploymentDataChange('partTimeJob', e.target.value)}
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400"
                      />
                      <input
                        type="text"
                        placeholder="Part-time Company"
                        value={employmentData.partTimeCompany}
                        onChange={(e) => handleEmploymentDataChange('partTimeCompany', e.target.value)}
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400"
                      />
                    </div>
                  </div>
                )}

                {/* Apprenticeship Form */}
                {workSchoolCategory === 'apprenticeship' && (
                  <div className="space-y-4">
                    <h5 className="text-lg font-semibold text-yellow-400 mb-4">Apprenticeship Details</h5>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Apprenticeship Type/Trade"
                        value={employmentData.apprenticeshipType}
                        onChange={(e) => handleEmploymentDataChange('apprenticeshipType', e.target.value)}
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400"
                      />
                      <input
                        type="text"
                        placeholder="Master Craftsman/Supervisor"
                        value={employmentData.masterCraftsman}
                        onChange={(e) => handleEmploymentDataChange('masterCraftsman', e.target.value)}
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400"
                      />
                      <input
                        type="text"
                        placeholder="Apprenticeship Location"
                        value={employmentData.apprenticeshipLocation}
                        onChange={(e) => handleEmploymentDataChange('apprenticeshipLocation', e.target.value)}
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400"
                      />
                      <select
                        value={employmentData.apprenticeshipDuration}
                        onChange={(e) => handleEmploymentDataChange('apprenticeshipDuration', e.target.value)}
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
                      >
                        <option value="">Apprenticeship Duration</option>
                        <option value="6months">6 Months</option>
                        <option value="1year">1 Year</option>
                        <option value="2years">2 Years</option>
                        <option value="3years">3 Years</option>
                        <option value="4years">4+ Years</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Unemployed Form */}
                {workSchoolCategory === 'unemployed' && (
                  <div className="space-y-4">
                    <h5 className="text-lg font-semibold text-yellow-400 mb-4">Current Status</h5>
                    <div className="bg-blue-500/20 p-4 rounded-lg">
                      <p className="text-blue-300 text-sm">
                        You've selected unemployed status. Your profile will reflect this information and can be updated when your employment status changes.
                      </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <select className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white">
                        <option value="">Seeking Employment Type</option>
                        <option value="full-time">Full-time Employment</option>
                        <option value="part-time">Part-time Employment</option>
                        <option value="freelance">Freelance/Contract</option>
                        <option value="not-seeking">Not Currently Seeking</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Preferred Industry (Optional)"
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400"
                      />
                    </div>
                  </div>
                )}

                {/* Save Button */}
                <div className="mt-6 flex justify-end">
                  <button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg text-white font-semibold transition-colors">
                    Save Work & School Information
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Legal Tab */}
        {activeTab === 'legal' && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Scale className="w-6 h-6 text-yellow-400" />
                Legal Cases & Appointments
              </h2>
              <div className="flex gap-2">
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Schedule Meeting
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  View Documents
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold mb-4">Active Cases</h3>
                <div className="space-y-4">
                  {legalCases.filter(caseItem => caseItem.status === 'active').map((caseItem) => (
                    <div key={caseItem.id} className="bg-white/5 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{caseItem.caseTitle}</h4>
                        <span className={`text-xs px-2 py-1 rounded ${
                          caseItem.priority === 'urgent' ? 'bg-red-500' :
                          caseItem.priority === 'high' ? 'bg-orange-500' :
                          caseItem.priority === 'medium' ? 'bg-yellow-500' : 'bg-gray-500'
                        }`}>
                          {caseItem.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-300 mb-1">Case #{caseItem.caseNumber}</p>
                      <p className="text-sm text-gray-400">Lawyer: {caseItem.lawyerName}</p>
                      <p className="text-sm text-gray-400">Type: {caseItem.caseType}</p>
                      {caseItem.nextHearingDate && (
                        <p className="text-sm text-blue-400 mt-2">
                          Next hearing: {caseItem.nextHearingDate.toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold mb-4">Court Calendar</h3>
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Integration Features</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Real-time Google Calendar sync</li>
                      <li>• Automated court reminders</li>
                      <li>• Document deadline tracking</li>
                      <li>• Lawyer communication portal</li>
                    </ul>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Security Features</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• End-to-end encryption</li>
                      <li>• Biometric document access</li>
                      <li>• Confidential file storage</li>
                      <li>• Audit trail logging</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}