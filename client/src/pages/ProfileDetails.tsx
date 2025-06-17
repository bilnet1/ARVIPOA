import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  User as UserIcon, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Calendar,
  Camera,
  CheckCircle,
  AlertCircle,
  Save,
  CreditCard,
  Heart,
  Send,
  Users,
  UserCheck
} from "lucide-react";
import CountrySelect from "../components/CountrySelect";
import PhoneInput from "../components/PhoneInput";

interface ProfileData {
  surname: string;
  firstName: string;
  otherNames: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  secondNationality?: string;
  address: string;
  digitalAddress: string;
  city: string;
  region: string;
  postalCode: string;
  occupation: string;
  employer: string;
  idNumber: string;
  idType: string;
  emergencyContact: string;
  emergencyPhone: string;
  profilePhoto?: string;
  isNonIdHolder: boolean;
  guarantorName: string;
  guarantorPhone: string;
  guarantorInviteSent: boolean;
  guarantorAccepted: boolean;
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

  tribe: string;
  customTribe: string;
  homeTown: string;
  witnessName: string;
  witnessInviteSent: boolean;
  profileBoosted: boolean;
  profileVerified: boolean;
  nextOfKinName: string;
  nextOfKinPhone: string;
  nextOfKinEmail: string;
  nextOfKinRelationship: string;
  nextOfKinCustomRelationship: string;
  nextOfKinAddress: string;
  // RBF (Religion, Belief & Faith) fields
  rbfReligion: string;
  rbfDenomination: string;
  rbfCustomDenomination: string;
  rbfBranch: string;
  rbfBranchId: string;
  rbfRequestSent: boolean;
  // Physique Status fields
  hairColor: string;
  customHairColor: string;
  eyeColor: string;
  customEyeColor: string;
  height: string;
  customHeight: string;
  weight: string;
  weightUnit: string;
  voiceRecording: string;
  hasDisability: boolean;
  disabilityType: string;
  customDisabilityType: string;
  
  // Marital Status fields
  maritalStatus: string;
  partnerName: string;
  marriedSince: string;
  marriageCertificate: string;
  partnerVerificationSent: boolean;
  partnerVerificationAccepted: boolean;
  isPartnerAlive: string;
  maritalWitnessPhone: string;
  maritalWitnessOtp: string;
  maritalWitnessOtpSent: boolean;
  separatedSince: string;
  separationReason: string;
  customSeparationReason: string;
  separationVoiceRecording: string;
  separationEvidence: string;
  divorcedSince: string;
  divorceReason: string;
  customDivorceReason: string;
  divorceCertificate: string;
  divorceVoiceRecording: string;
  divorceEvidence: string;
  knockingPartner: string;
  cohabitationSince: string;
  cohabitationPartner: string;
  
  // Enhanced marital status fields
  widowedSince: string;
  widowCertificate: string;
  latePartnerName: string;
  engagedSince: string;
  engagementPartner: string;
  engagementRing: string;
  partnerOccupation: string;
  partnerAge: string;
  partnerNationality: string;
  marriageLocation: string;
  marriageType: string;
  numberOfChildren: string;
  childrenDetails: string;
  previousMarriages: string;
  familyApproval: string;
  religiousApproval: string;
  maritalCounseling: boolean;
  legalAgreements: string;
  jointAssets: string;
  partnerContactInfo: string;
}

interface ValidationErrors {
  [key: string]: string;
}

export default function ProfileDetails() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    surname: "",
    firstName: "",
    otherNames: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    nationality: "",
    secondNationality: "",
    address: "",
    digitalAddress: "",
    city: "",
    region: "",
    postalCode: "",
    occupation: "",
    employer: "",
    idNumber: "",
    idType: "passport",
    emergencyContact: "",
    emergencyPhone: "",
    isNonIdHolder: false,
    guarantorName: "",
    guarantorPhone: "",
    guarantorInviteSent: false,
    guarantorAccepted: false,
    bankName: "",
    bankAddress: "",
    accountName: "",
    accountNumber: "",
    swiftCode: "",
    accountOfficerName: "",
    accountOfficerPhone: "",
    accountOfficerEmail: "",
    religion: "",
    denomination: "",
    customDenomination: "",

    rbfBranchId: "",
    rbfRequestSent: false,
    tribe: "",
    customTribe: "",
    homeTown: "",
    witnessName: "",
    witnessInviteSent: false,
    profileBoosted: false,
    profileVerified: false,
    nextOfKinName: "",
    nextOfKinPhone: "",
    nextOfKinEmail: "",
    nextOfKinRelationship: "",
    nextOfKinCustomRelationship: "",
    nextOfKinAddress: "",
    // RBF (Religion, Belief & Faith) fields
    rbfReligion: "",
    rbfDenomination: "",
    rbfCustomDenomination: "",
    rbfBranch: "",
    // Physique Status fields
    hairColor: "",
    customHairColor: "",
    eyeColor: "",
    customEyeColor: "",
    height: "",
    customHeight: "",
    weight: "",
    weightUnit: "kg",
    voiceRecording: "",
    hasDisability: false,
    disabilityType: "",
    customDisabilityType: "",
    
    // Marital Status defaults
    maritalStatus: "",
    partnerName: "",
    marriedSince: "",
    marriageCertificate: "",
    partnerVerificationSent: false,
    partnerVerificationAccepted: false,
    isPartnerAlive: "I don't want to say",
    maritalWitnessPhone: "",
    maritalWitnessOtp: "",
    maritalWitnessOtpSent: false,
    separatedSince: "",
    separationReason: "",
    customSeparationReason: "",
    separationVoiceRecording: "",
    separationEvidence: "",
    divorcedSince: "",
    divorceReason: "",
    customDivorceReason: "",
    divorceCertificate: "",
    divorceVoiceRecording: "",
    divorceEvidence: "",
    knockingPartner: "",
    cohabitationSince: "",
    cohabitationPartner: "",
    
    // Enhanced marital status defaults
    widowedSince: "",
    widowCertificate: "",
    latePartnerName: "",
    engagedSince: "",
    engagementPartner: "",
    engagementRing: "",
    partnerOccupation: "",
    partnerAge: "",
    partnerNationality: "",
    marriageLocation: "",
    marriageType: "",
    numberOfChildren: "",
    childrenDetails: "",
    previousMarriages: "",
    familyApproval: "",
    religiousApproval: "",
    maritalCounseling: false,
    legalAgreements: "",
    jointAssets: "",
    partnerContactInfo: "",
  });

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

  const tribes = [
    "EWE", "HAUSA", "GA", "GA DANMGE", "AKAN", "FANTE", "DAGOMBA", "Others"
  ];

  const relationships = [
    "Parent", "Spouse", "Child", "Sibling", "Daughter", "Son", "Mother", "Father", 
    "Sister", "Brother", "Grandmother", "Grandfather", "Aunt", "Uncle", "Cousin", 
    "Friend", "Guardian", "Others"
  ];

  const countries = [
    { name: "Afghan", flag: "🇦🇫" },
    { name: "Albanian", flag: "🇦🇱" },
    { name: "Algerian", flag: "🇩🇿" },
    { name: "American", flag: "🇺🇸" },
    { name: "Andorran", flag: "🇦🇩" },
    { name: "Angolan", flag: "🇦🇴" },
    { name: "Argentine", flag: "🇦🇷" },
    { name: "Armenian", flag: "🇦🇲" },
    { name: "Australian", flag: "🇦🇺" },
    { name: "Austrian", flag: "🇦🇹" },
    { name: "Azerbaijani", flag: "🇦🇿" },
    { name: "Bahamian", flag: "🇧🇸" },
    { name: "Bahraini", flag: "🇧🇭" },
    { name: "Bangladeshi", flag: "🇧🇩" },
    { name: "Barbadian", flag: "🇧🇧" },
    { name: "Belarusian", flag: "🇧🇾" },
    { name: "Belgian", flag: "🇧🇪" },
    { name: "Belizean", flag: "🇧🇿" },
    { name: "Beninese", flag: "🇧🇯" },
    { name: "Bhutanese", flag: "🇧🇹" },
    { name: "Bolivian", flag: "🇧🇴" },
    { name: "Bosnian", flag: "🇧🇦" },
    { name: "Brazilian", flag: "🇧🇷" },
    { name: "British", flag: "🇬🇧" },
    { name: "Bruneian", flag: "🇧🇳" },
    { name: "Bulgarian", flag: "🇧🇬" },
    { name: "Burkinabé", flag: "🇧🇫" },
    { name: "Burmese", flag: "🇲🇲" },
    { name: "Burundian", flag: "🇧🇮" },
    { name: "Cambodian", flag: "🇰🇭" },
    { name: "Cameroonian", flag: "🇨🇲" },
    { name: "Canadian", flag: "🇨🇦" },
    { name: "Cape Verdean", flag: "🇨🇻" },
    { name: "Central African", flag: "🇨🇫" },
    { name: "Chadian", flag: "🇹🇩" },
    { name: "Chilean", flag: "🇨🇱" },
    { name: "Chinese", flag: "🇨🇳" },
    { name: "Colombian", flag: "🇨🇴" },
    { name: "Comoran", flag: "🇰🇲" },
    { name: "Congolese", flag: "🇨🇬" },
    { name: "Costa Rican", flag: "🇨🇷" },
    { name: "Croatian", flag: "🇭🇷" },
    { name: "Cuban", flag: "🇨🇺" },
    { name: "Cypriot", flag: "🇨🇾" },
    { name: "Czech", flag: "🇨🇿" },
    { name: "Danish", flag: "🇩🇰" },
    { name: "Dutch", flag: "🇳🇱" },
    { name: "Ecuadorean", flag: "🇪🇨" },
    { name: "Egyptian", flag: "🇪🇬" },
    { name: "Estonian", flag: "🇪🇪" },
    { name: "Ethiopian", flag: "🇪🇹" },
    { name: "Fijian", flag: "🇫🇯" },
    { name: "Filipino", flag: "🇵🇭" },
    { name: "Finnish", flag: "🇫🇮" },
    { name: "French", flag: "🇫🇷" },
    { name: "Gabonese", flag: "🇬🇦" },
    { name: "Gambian", flag: "🇬🇲" },
    { name: "Georgian", flag: "🇬🇪" },
    { name: "German", flag: "🇩🇪" },
    { name: "Ghanaian", flag: "🇬🇭" },
    { name: "Greek", flag: "🇬🇷" },
    { name: "Grenadian", flag: "🇬🇩" },
    { name: "Guatemalan", flag: "🇬🇹" },
    { name: "Guinean", flag: "🇬🇳" },
    { name: "Guyanese", flag: "🇬🇾" },
    { name: "Haitian", flag: "🇭🇹" },
    { name: "Honduran", flag: "🇭🇳" },
    { name: "Hungarian", flag: "🇭🇺" },
    { name: "Icelander", flag: "🇮🇸" },
    { name: "Indian", flag: "🇮🇳" },
    { name: "Indonesian", flag: "🇮🇩" },
    { name: "Iranian", flag: "🇮🇷" },
    { name: "Iraqi", flag: "🇮🇶" },
    { name: "Irish", flag: "🇮🇪" },
    { name: "Israeli", flag: "🇮🇱" },
    { name: "Italian", flag: "🇮🇹" },
    { name: "Ivorian", flag: "🇨🇮" },
    { name: "Jamaican", flag: "🇯🇲" },
    { name: "Japanese", flag: "🇯🇵" },
    { name: "Jordanian", flag: "🇯🇴" },
    { name: "Kazakhstani", flag: "🇰🇿" },
    { name: "Kenyan", flag: "🇰🇪" },
    { name: "Kuwaiti", flag: "🇰🇼" },
    { name: "Laotian", flag: "🇱🇦" },
    { name: "Latvian", flag: "🇱🇻" },
    { name: "Lebanese", flag: "🇱🇧" },
    { name: "Liberian", flag: "🇱🇷" },
    { name: "Libyan", flag: "🇱🇾" },
    { name: "Lithuanian", flag: "🇱🇹" },
    { name: "Luxembourgish", flag: "🇱🇺" },
    { name: "Malagasy", flag: "🇲🇬" },
    { name: "Malawian", flag: "🇲🇼" },
    { name: "Malaysian", flag: "🇲🇾" },
    { name: "Maldivan", flag: "🇲🇻" },
    { name: "Malian", flag: "🇲🇱" },
    { name: "Maltese", flag: "🇲🇹" },
    { name: "Mauritanian", flag: "🇲🇷" },
    { name: "Mauritian", flag: "🇲🇺" },
    { name: "Mexican", flag: "🇲🇽" },
    { name: "Moldovan", flag: "🇲🇩" },
    { name: "Mongolian", flag: "🇲🇳" },
    { name: "Montenegrin", flag: "🇲🇪" },
    { name: "Moroccan", flag: "🇲🇦" },
    { name: "Mozambican", flag: "🇲🇿" },
    { name: "Namibian", flag: "🇳🇦" },
    { name: "Nepalese", flag: "🇳🇵" },
    { name: "New Zealander", flag: "🇳🇿" },
    { name: "Nicaraguan", flag: "🇳🇮" },
    { name: "Nigerian", flag: "🇳🇬" },
    { name: "Nigerien", flag: "🇳🇪" },
    { name: "North Korean", flag: "🇰🇵" },
    { name: "Norwegian", flag: "🇳🇴" },
    { name: "Omani", flag: "🇴🇲" },
    { name: "Pakistani", flag: "🇵🇰" },
    { name: "Palestinian", flag: "🇵🇸" },
    { name: "Panamanian", flag: "🇵🇦" },
    { name: "Paraguayan", flag: "🇵🇾" },
    { name: "Peruvian", flag: "🇵🇪" },
    { name: "Polish", flag: "🇵🇱" },
    { name: "Portuguese", flag: "🇵🇹" },
    { name: "Qatari", flag: "🇶🇦" },
    { name: "Romanian", flag: "🇷🇴" },
    { name: "Russian", flag: "🇷🇺" },
    { name: "Rwandan", flag: "🇷🇼" },
    { name: "Saudi", flag: "🇸🇦" },
    { name: "Senegalese", flag: "🇸🇳" },
    { name: "Serbian", flag: "🇷🇸" },
    { name: "Sierra Leonean", flag: "🇸🇱" },
    { name: "Singaporean", flag: "🇸🇬" },
    { name: "Slovakian", flag: "🇸🇰" },
    { name: "Slovenian", flag: "🇸🇮" },
    { name: "Somali", flag: "🇸🇴" },
    { name: "South African", flag: "🇿🇦" },
    { name: "South Korean", flag: "🇰🇷" },
    { name: "Spanish", flag: "🇪🇸" },
    { name: "Sri Lankan", flag: "🇱🇰" },
    { name: "Sudanese", flag: "🇸🇩" },
    { name: "Swazi", flag: "🇸🇿" },
    { name: "Swedish", flag: "🇸🇪" },
    { name: "Swiss", flag: "🇨🇭" },
    { name: "Syrian", flag: "🇸🇾" },
    { name: "Taiwanese", flag: "🇹🇼" },
    { name: "Tanzanian", flag: "🇹🇿" },
    { name: "Thai", flag: "🇹🇭" },
    { name: "Togolese", flag: "🇹🇬" },
    { name: "Tunisian", flag: "🇹🇳" },
    { name: "Turkish", flag: "🇹🇷" },
    { name: "Ugandan", flag: "🇺🇬" },
    { name: "Ukrainian", flag: "🇺🇦" },
    { name: "Uruguayan", flag: "🇺🇾" },
    { name: "Venezuelan", flag: "🇻🇪" },
    { name: "Vietnamese", flag: "🇻🇳" },
    { name: "Yemenite", flag: "🇾🇪" },
    { name: "Zambian", flag: "🇿🇲" },
    { name: "Zimbabwean", flag: "🇿🇼" }
  ];
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        navigate("/login");
        return;
      }
      
      // Load existing profile data
      try {
        const docRef = doc(db, "profiles", currentUser.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data() as ProfileData;
          setProfileData(prev => ({
            ...prev,
            ...data,
            email: currentUser.email || "",
          }));
        } else {
          // Set initial email from auth
          setProfileData(prev => ({
            ...prev,
            email: currentUser.email || "",
          }));
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  // Debug logging to check if form state is working
  console.log("ProfileData state:", profileData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Required fields validation
    const requiredFields = [
      'surname', 'firstName', 'phone', 'dateOfBirth', 
      'nationality', 'address', 'city', 'region', 'idNumber'
    ];

    requiredFields.forEach(field => {
      const value = profileData[field as keyof ProfileData];
      if (!value || (typeof value === 'string' && !value.trim())) {
        newErrors[field] = `${field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} is required`;
      }
    });

    // Validate guarantor fields if Non ID Holder is selected
    if (profileData.isNonIdHolder) {
      if (!profileData.guarantorName?.trim()) {
        newErrors.guarantorName = "Guarantor's name is required for Non ID Holder";
      }
      if (!profileData.guarantorPhone?.trim()) {
        newErrors.guarantorPhone = "Guarantor's phone is required for Non ID Holder";
      }
    }

    // Validate second nationality if dual/multiple is selected
    if (profileData.nationality === "Dual/Multiple" && !profileData.secondNationality?.trim()) {
      newErrors.secondNationality = "Second nationality is required for dual/multiple citizenship";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (profileData.email && !emailRegex.test(profileData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    if (profileData.phone && !phoneRegex.test(profileData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Date of birth validation (must be 18+)
    if (profileData.dateOfBirth) {
      const birthDate = new Date(profileData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 18) {
        newErrors.dateOfBirth = "You must be at least 18 years old";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateCompletionPercentage = (): number => {
    const totalFields = Object.keys(profileData).length;
    const completedFields = Object.values(profileData).filter(value => 
      value && value.toString().trim() !== ""
    ).length;
    return Math.round((completedFields / totalFields) * 100);
  };

  const getVerificationStatus = (): "not_started" | "pending" | "completed" => {
    const completion = calculateCompletionPercentage();
    if (completion === 0) return "not_started";
    if (completion < 100) return "pending";
    return "completed";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");

    if (!validateForm()) {
      return;
    }

    if (!user) return;

    setSaving(true);
    try {
      const docRef = doc(db, "profiles", user.uid);
      const dataToSave = {
        ...profileData,
        updatedAt: new Date().toISOString(),
        completionPercentage: calculateCompletionPercentage(),
        verificationStatus: getVerificationStatus()
      };
      
      await setDoc(docRef, dataToSave, { merge: true });
      setSuccessMessage("Profile updated successfully!");
      
      // Redirect back to profile page after 2 seconds
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (error) {
      console.error("Error saving profile:", error);
      setErrors({ submit: "Failed to save profile. Please try again." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#D4AF37]"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const completionPercentage = calculateCompletionPercentage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-20 w-24 h-24 bg-[#D4AF37]/5 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-60 right-32 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/3 w-28 h-28 bg-green-500/5 rounded-full blur-xl animate-float delay-2000"></div>
      </div>

      {/* Header */}
      <div className="relative bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 animate-fade-in-left">
              <button
                onClick={() => navigate("/profile")}
                className="group p-2 rounded-xl text-gray-600 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300"
              >
                <ArrowLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gradient-gold">Complete Your Profile</h1>
                <p className="text-gray-600 mt-1">Provide your personal information for verification</p>
              </div>
            </div>
            
            <div className="text-right animate-fade-in-right">
              <div className="flex items-center space-x-2 mb-2">
                <div className="text-2xl font-bold text-[#D4AF37]">{completionPercentage}%</div>
                {completionPercentage === 100 ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-yellow-600" />
                )}
              </div>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {successMessage && (
          <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-xl text-green-700 animate-fade-in-up">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              {successMessage}
            </div>
          </div>
        )}

        {errors.submit && (
          <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-xl text-red-700 animate-fade-in-up">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              {errors.submit}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="glass-effect rounded-2xl p-6 animate-fade-in-up delay-100">
            <div className="flex items-center mb-6">
              <UserIcon className="w-6 h-6 text-[#D4AF37] mr-3" />
              <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Surname *</label>
                <input
                  type="text"
                  name="surname"
                  value={profileData.surname}
                  onChange={handleInputChange}
                  className={`w-full p-3 border-2 rounded-xl focus:outline-none transition-colors ${
                    errors.surname ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#D4AF37]'
                  }`}
                  placeholder="Enter your surname/family name"
                />
                {errors.surname && <p className="text-red-500 text-sm mt-1">{errors.surname}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleInputChange}
                  className={`w-full p-3 border-2 rounded-xl focus:outline-none transition-colors ${
                    errors.firstName ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#D4AF37]'
                  }`}
                  placeholder="Enter your first name"
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Other Names</label>
                <input
                  type="text"
                  name="otherNames"
                  value={profileData.otherNames}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                  placeholder="Enter your middle names or other names (optional)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors bg-gray-50"
                  placeholder="Enter your email"
                  disabled
                />
                <p className="text-gray-500 text-sm mt-1">Email is managed through your account settings</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  className={`w-full p-3 border-2 rounded-xl focus:outline-none transition-colors ${
                    errors.phone ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#D4AF37]'
                  }`}
                  placeholder="+233 XX XXX XXXX"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={profileData.dateOfBirth}
                  onChange={handleInputChange}
                  className={`w-full p-3 border-2 rounded-xl focus:outline-none transition-colors ${
                    errors.dateOfBirth ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#D4AF37]'
                  }`}
                />
                {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nationality *</label>
                <CountrySelect
                  value={profileData.nationality}
                  onChange={(value: string) => handleInputChange({ target: { name: 'nationality', value } } as React.ChangeEvent<HTMLInputElement>)}
                  placeholder="Select your nationality"
                  required
                  error={errors.nationality}
                  name="nationality"
                  showDualOption={true}
                />
              </div>

              {/* Second Nationality field (shows when Dual/Multiple is selected) */}
              {profileData.nationality === "Dual/Multiple" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Second Nationality *</label>
                  <CountrySelect
                    value={profileData.secondNationality || ""}
                    onChange={(value: string) => handleInputChange({ target: { name: 'secondNationality', value } } as React.ChangeEvent<HTMLInputElement>)}
                    placeholder="Select second nationality"
                    required
                    error={errors.secondNationality}
                    name="secondNationality"
                    showDualOption={false}
                  />
                  <p className="text-gray-500 text-sm mt-1">For dual/multiple citizenship holders</p>
                </div>
              )}
            </div>
          </div>

          {/* TRIBE Section */}
          <div className="glass-effect rounded-2xl p-6 animate-fade-in-up delay-175">
            <div className="flex items-center mb-6">
              <Users className="w-6 h-6 text-[#D4AF37] mr-3" />
              <h2 className="text-xl font-bold text-gray-900">TRIBE</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Tribe</label>
                <select
                  name="tribe"
                  value={profileData.tribe}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                >
                  <option value="">Select Tribe</option>
                  {tribes.map(tribe => (
                    <option key={tribe} value={tribe}>{tribe}</option>
                  ))}
                </select>
              </div>

              {/* Custom Tribe Input */}
              {profileData.tribe === 'Others' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Specify Tribe</label>
                  <input
                    type="text"
                    name="customTribe"
                    value={profileData.customTribe}
                    onChange={handleInputChange}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                    placeholder="Please specify your tribe"
                  />
                </div>
              )}

              {/* Tribe Checkboxes Display */}
              {profileData.tribe && (
                <div className="md:col-span-2">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <h4 className="font-medium text-blue-900 mb-2">Available Tribes:</h4>
                    <div className="grid grid-cols-3 gap-2 text-xs text-blue-700">
                      {['EWE', 'HAUSA', 'GA', 'GA DANMGE', 'AKAN', 'FANTE', 'DAGOMBA'].map(tribe => (
                        <label key={tribe} className="flex items-center space-x-1">
                          <input 
                            type="checkbox" 
                            checked={profileData.tribe === tribe}
                            readOnly
                            className="w-3 h-3"
                          />
                          <span>{tribe}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* HOME TOWN Section */}
          <div className="glass-effect rounded-2xl p-6 animate-fade-in-up delay-187">
            <div className="flex items-center mb-6">
              <MapPin className="w-6 h-6 text-[#D4AF37] mr-3" />
              <h2 className="text-xl font-bold text-gray-900">HOME TOWN</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Home Town</label>
                <input
                  type="text"
                  name="homeTown"
                  value={profileData.homeTown}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                  placeholder="Enter your home town"
                />
                <p className="text-gray-500 text-sm mt-1">If you are not sure please kindly provide witness details below</p>
              </div>

              {/* Witness Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Witness Name</label>
                <input
                  type="text"
                  name="witnessName"
                  value={profileData.witnessName}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                  placeholder="Enter witness name"
                />
              </div>

              <div>
                <PhoneInput
                  value={profileData.witnessPhone}
                  onChange={(value) => setProfileData(prev => ({ ...prev, witnessPhone: value }))}
                  placeholder="Witness phone"
                  label="Witness Phone"
                  name="witnessPhone"
                />
              </div>

              {/* Send Invitation to Witness */}
              <div className="md:col-span-2">
                <button
                  type="button"
                  onClick={() => {
                    if (profileData.witnessName && profileData.witnessPhone) {
                      setProfileData(prev => ({ ...prev, witnessInviteSent: true }));
                      const otp = Math.floor(100000 + Math.random() * 900000).toString();
                      setProfileData(prev => ({ ...prev, witnessOtp: otp }));
                      alert(`Invitation and OTP sent to ${profileData.witnessName} at ${profileData.witnessPhone}. OTP: ${otp}`);
                    } else {
                      alert("Please enter witness name and phone number before sending invitation.");
                    }
                  }}
                  disabled={!profileData.witnessName || !profileData.witnessPhone || profileData.witnessInviteSent}
                  className={`w-full px-6 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 ${
                    profileData.witnessInviteSent
                      ? 'bg-green-100 text-green-700 cursor-not-allowed'
                      : profileData.witnessName && profileData.witnessPhone
                      ? 'bg-[#D4AF37] text-white hover:bg-[#B8860B]'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-5 h-5" />
                  {profileData.witnessInviteSent ? 'Invitation Sent' : 'Send invitation request and OTP to witness'}
                </button>
              </div>

              {/* OTP Input */}
              {profileData.witnessInviteSent && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">OTP Verification</label>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                      maxLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setProfileData(prev => ({ ...prev, profileVerified: true, profileBoosted: true }));
                        alert("Profile verified and boosted successfully!");
                      }}
                      className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
                    >
                      Verify
                    </button>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">Enter the OTP sent to your witness</p>
                </div>
              )}
            </div>

            {/* Profile Boosting Information */}
            <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl">
              <h4 className="font-medium text-green-900 mb-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Learn more about Profile Boosting
              </h4>
              <div className="text-sm text-green-800 space-y-2">
                <p>
                  Profile boosting is a level of registration that gives your profile leverage when subscribing to services on our platform or outside our platform.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="p-3 bg-white rounded-lg border border-green-200">
                    <h5 className="font-medium text-green-900 mb-1">Normal Profile</h5>
                    <p className="text-xs text-green-700">When all fields are filled, you get a green ticked profile with basic access to services.</p>
                    <div className="flex items-center mt-2">
                      <div className={`w-3 h-3 rounded-full mr-2 ${profileData.profileBoosted ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span className="text-xs">{profileData.profileBoosted ? 'Achieved' : 'Pending'}</span>
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-blue-200">
                    <h5 className="font-medium text-blue-900 mb-1">Verified Profile</h5>
                    <p className="text-xs text-blue-700">When a witness/guarantor is invited and verifies your profile with OTP, you get enhanced access and credibility.</p>
                    <div className="flex items-center mt-2">
                      <div className={`w-3 h-3 rounded-full mr-2 ${profileData.profileVerified ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                      <span className="text-xs">{profileData.profileVerified ? 'Verified' : 'Pending'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="glass-effect rounded-2xl p-6 animate-fade-in-up delay-200">
            <div className="flex items-center mb-6">
              <MapPin className="w-6 h-6 text-[#D4AF37] mr-3" />
              <h2 className="text-xl font-bold text-gray-900">Address Information</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Street Address *</label>
                <input
                  type="text"
                  name="address"
                  value={profileData.address}
                  onChange={handleInputChange}
                  className={`w-full p-3 border-2 rounded-xl focus:outline-none transition-colors ${
                    errors.address ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#D4AF37]'
                  }`}
                  placeholder="Enter your street address"
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Digital Address</label>
                <input
                  type="text"
                  name="digitalAddress"
                  value={profileData.digitalAddress}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                  placeholder="Enter your digital address (e.g., GR-123-4567)"
                />
                <p className="text-gray-500 text-sm mt-1">Ghana Post GPS digital address or similar location code</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                <input
                  type="text"
                  name="city"
                  value={profileData.city}
                  onChange={handleInputChange}
                  className={`w-full p-3 border-2 rounded-xl focus:outline-none transition-colors ${
                    errors.city ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#D4AF37]'
                  }`}
                  placeholder="e.g., Accra"
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Region/State *</label>
                <input
                  type="text"
                  name="region"
                  value={profileData.region}
                  onChange={handleInputChange}
                  className={`w-full p-3 border-2 rounded-xl focus:outline-none transition-colors ${
                    errors.region ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#D4AF37]'
                  }`}
                  placeholder="e.g., Greater Accra"
                />
                {errors.region && <p className="text-red-500 text-sm mt-1">{errors.region}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  value={profileData.postalCode}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                  placeholder="Enter postal code"
                />
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="glass-effect rounded-2xl p-6 animate-fade-in-up delay-300">
            <div className="flex items-center mb-6">
              <Building className="w-6 h-6 text-[#D4AF37] mr-3" />
              <h2 className="text-xl font-bold text-gray-900">Professional Information</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Occupation</label>
                <input
                  type="text"
                  name="occupation"
                  value={profileData.occupation}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                  placeholder="e.g., Software Engineer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Employer</label>
                <input
                  type="text"
                  name="employer"
                  value={profileData.employer}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                  placeholder="Company name"
                />
              </div>
            </div>
          </div>

          {/* Identification */}
          <div className="glass-effect rounded-2xl p-6 animate-fade-in-up delay-400">
            <div className="flex items-center mb-6">
              <Calendar className="w-6 h-6 text-[#D4AF37] mr-3" />
              <h2 className="text-xl font-bold text-gray-900">Identification</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ID Type</label>
                <select
                  name="idType"
                  value={profileData.idType}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                >
                  <option value="passport">Passport</option>
                  <option value="national_id">National ID Card</option>
                  <option value="drivers_license">Driver's License</option>
                  <option value="voter_id">Voter ID Card</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ID Number *</label>
                <input
                  type="text"
                  name="idNumber"
                  value={profileData.idNumber}
                  onChange={handleInputChange}
                  className={`w-full p-3 border-2 rounded-xl focus:outline-none transition-colors ${
                    errors.idNumber ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#D4AF37]'
                  }`}
                  placeholder="Enter ID number"
                />
                {errors.idNumber && <p className="text-red-500 text-sm mt-1">{errors.idNumber}</p>}
              </div>

              {/* Non ID Holder Checkbox */}
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mt-4">
                  <input
                    type="checkbox"
                    id="isNonIdHolder"
                    name="isNonIdHolder"
                    checked={profileData.isNonIdHolder}
                    onChange={(e) => setProfileData(prev => ({ ...prev, isNonIdHolder: e.target.checked }))}
                    className="w-4 h-4 text-[#D4AF37] border-gray-300 rounded focus:ring-[#D4AF37]"
                  />
                  <label htmlFor="isNonIdHolder" className="text-sm font-medium text-gray-700">
                    Non ID Holder ☒
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Non ID Holder Guarantor Section */}
          {profileData.isNonIdHolder && (
            <div className="glass-effect rounded-2xl p-6 animate-fade-in-up delay-450 border-l-4 border-[#D4AF37]">
              <div className="flex items-center mb-6">
                <UserIcon className="w-6 h-6 text-[#D4AF37] mr-3" />
                <h2 className="text-xl font-bold text-gray-900">NON ID HOLDER GUARANTOR'S DETAILS</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">GUARANTOR'S NAME *</label>
                  <input
                    type="text"
                    name="guarantorName"
                    value={profileData.guarantorName}
                    onChange={handleInputChange}
                    className={`w-full p-3 border-2 rounded-xl focus:outline-none transition-colors ${
                      errors.guarantorName ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#D4AF37]'
                    }`}
                    placeholder="Enter guarantor's full name"
                  />
                  {errors.guarantorName && <p className="text-red-500 text-sm mt-1">{errors.guarantorName}</p>}
                </div>

                <div>
                  <PhoneInput
                    value={profileData.guarantorPhone}
                    onChange={(value) => setProfileData(prev => ({ ...prev, guarantorPhone: value }))}
                    placeholder="GUARANTOR'S PHONE"
                    label="GUARANTOR'S PHONE *"
                    name="guarantorPhone"
                    error={errors.guarantorPhone}
                  />
                </div>
              </div>

              {/* Send Invite Button */}
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => {
                    if (profileData.guarantorName && profileData.guarantorPhone) {
                      setProfileData(prev => ({ ...prev, guarantorInviteSent: true }));
                      // Here you would implement the actual invite sending logic
                      alert(`Invite sent to ${profileData.guarantorName} at ${profileData.guarantorPhone}`);
                    } else {
                      alert("Please enter both guarantor's name and phone number before sending invite.");
                    }
                  }}
                  disabled={!profileData.guarantorName || !profileData.guarantorPhone || profileData.guarantorInviteSent}
                  className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                    profileData.guarantorInviteSent
                      ? 'bg-green-100 text-green-700 cursor-not-allowed'
                      : profileData.guarantorName && profileData.guarantorPhone
                      ? 'bg-[#D4AF37] text-white hover:bg-[#B8860B]'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {profileData.guarantorInviteSent ? 'Invite Sent' : 'Send invite to Guarantor'}
                </button>
              </div>

              {/* Guarantor Status */}
              {profileData.guarantorInviteSent && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                    <p className="text-sm text-yellow-800">
                      {profileData.guarantorAccepted 
                        ? "Guarantor has accepted your request" 
                        : "Except guarantor accepts your request to guarantee you on this request"
                      }
                    </p>
                  </div>
                  {profileData.guarantorAccepted && (
                    <div className="mt-2 flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      <p className="text-sm text-green-800 font-medium">Guarantor verification complete</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Emergency Contact */}
          <div className="glass-effect rounded-2xl p-6 animate-fade-in-up delay-500">
            <div className="flex items-center mb-6">
              <Phone className="w-6 h-6 text-[#D4AF37] mr-3" />
              <h2 className="text-xl font-bold text-gray-900">Emergency Contact</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name</label>
                <input
                  type="text"
                  name="emergencyContact"
                  value={profileData.emergencyContact}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                  placeholder="Full name of emergency contact"
                />
              </div>

              <div>
                <PhoneInput
                  value={profileData.emergencyPhone}
                  onChange={(value) => setProfileData(prev => ({ ...prev, emergencyPhone: value }))}
                  placeholder="Emergency contact phone"
                  label="Contact Phone"
                  name="emergencyPhone"
                />
              </div>
            </div>
          </div>

          {/* Next of Kin Section */}
          <div className="glass-effect rounded-2xl p-6 animate-fade-in-up delay-525">
            <div className="flex items-center mb-6">
              <Users className="w-6 h-6 text-[#D4AF37] mr-3" />
              <h2 className="text-xl font-bold text-gray-900">ADD NEXT OF KIN</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">NAME</label>
                <input
                  type="text"
                  name="nextOfKinName"
                  value={profileData.nextOfKinName}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                  placeholder="Enter next of kin's full name"
                />
              </div>

              <div>
                <PhoneInput
                  value={profileData.nextOfKinPhone}
                  onChange={(value) => setProfileData(prev => ({ ...prev, nextOfKinPhone: value }))}
                  placeholder="Phone number"
                  label="Phone"
                  name="nextOfKinPhone"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
                <input
                  type="email"
                  name="nextOfKinEmail"
                  value={profileData.nextOfKinEmail}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
                <select
                  name="nextOfKinRelationship"
                  value={profileData.nextOfKinRelationship}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                >
                  <option value="">Select relationship</option>
                  {relationships.map(relationship => (
                    <option key={relationship} value={relationship}>{relationship}</option>
                  ))}
                </select>
              </div>

              {/* Custom Relationship Input */}
              {profileData.nextOfKinRelationship === 'Others' && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Others Please Specify</label>
                  <input
                    type="text"
                    name="nextOfKinCustomRelationship"
                    value={profileData.nextOfKinCustomRelationship}
                    onChange={handleInputChange}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                    placeholder="Please specify the relationship"
                  />
                </div>
              )}

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea
                  name="nextOfKinAddress"
                  value={profileData.nextOfKinAddress}
                  onChange={(e) => setProfileData(prev => ({ ...prev, nextOfKinAddress: e.target.value }))}
                  rows={3}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors resize-none"
                  placeholder="Enter complete address of next of kin"
                />
              </div>
            </div>
          </div>

          {/* Banking Details */}
          <div className="glass-effect rounded-2xl p-6 animate-fade-in-up delay-550">
            <div className="flex items-center mb-6">
              <CreditCard className="w-6 h-6 text-[#D4AF37] mr-3" />
              <h2 className="text-xl font-bold text-gray-900">Banking Details</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                <input
                  type="text"
                  name="bankName"
                  value={profileData.bankName}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                  placeholder="Enter bank name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Name</label>
                <input
                  type="text"
                  name="accountName"
                  value={profileData.accountName}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                  placeholder="Enter account holder name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                <input
                  type="text"
                  name="accountNumber"
                  value={profileData.accountNumber}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                  placeholder="Enter account number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SWIFT Code</label>
                <input
                  type="text"
                  name="swiftCode"
                  value={profileData.swiftCode}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                  placeholder="Enter SWIFT/BIC code"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Bank Address</label>
                <input
                  type="text"
                  name="bankAddress"
                  value={profileData.bankAddress}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                  placeholder="Enter bank branch address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Officer's Name</label>
                <input
                  type="text"
                  name="accountOfficerName"
                  value={profileData.accountOfficerName}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                  placeholder="Enter account officer name"
                />
              </div>

              <div>
                <PhoneInput
                  value={profileData.accountOfficerPhone}
                  onChange={(value) => setProfileData(prev => ({ ...prev, accountOfficerPhone: value }))}
                  placeholder="Account officer phone"
                  label="Account Officer's Phone"
                  name="accountOfficerPhone"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Officer's Email</label>
                <input
                  type="email"
                  name="accountOfficerEmail"
                  value={profileData.accountOfficerEmail}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                  placeholder="Enter account officer email"
                />
              </div>
            </div>
          </div>

          {/* Religion, Belief & Faith (RBF) */}
          <div className="glass-effect rounded-2xl p-6 animate-fade-in-up delay-575">
            <div className="flex items-center mb-6">
              <Heart className="w-6 h-6 text-[#D4AF37] mr-3" />
              <h2 className="text-xl font-bold text-gray-900">Religion, Belief & Faith (RBF)</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Religion *</label>
                <select
                  name="religion"
                  value={profileData.religion}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                >
                  <option value="">Select Religion</option>
                  {religions.map(religion => (
                    <option key={religion} value={religion}>{religion}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select RBF Denomination</label>
                <select
                  name="denomination"
                  value={profileData.denomination}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                  disabled={!profileData.religion}
                >
                  <option value="">Select Denomination</option>
                  {profileData.religion && (denominations[profileData.religion] || denominations.default).map(denom => (
                    <option key={denom} value={denom}>{denom}</option>
                  ))}
                </select>
              </div>

              {/* Custom Denomination Input */}
              {profileData.denomination === 'Others' && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Specify Denomination</label>
                  <input
                    type="text"
                    name="customDenomination"
                    value={profileData.customDenomination}
                    onChange={handleInputChange}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                    placeholder="Enter your denomination if not listed above"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">RBF Branch Name</label>
                <input
                  type="text"
                  name="rbfBranch"
                  value={profileData.rbfBranch}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                  placeholder="Enter branch name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Branch ID No.</label>
                <input
                  type="text"
                  name="rbfBranchId"
                  value={profileData.rbfBranchId}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                  placeholder="Enter branch ID number"
                />
              </div>
            </div>

            {/* RBF Actions */}
            <div className="mt-6 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => {
                    if (profileData.religion && profileData.rbfBranch) {
                      setProfileData(prev => ({ ...prev, rbfRequestSent: true }));
                      alert(`Request sent to ${profileData.rbfBranch}. Your page will only be updated when your request is accepted.`);
                    } else {
                      alert("Please select religion and enter branch name before sending request.");
                    }
                  }}
                  disabled={!profileData.religion || !profileData.rbfBranch || profileData.rbfRequestSent}
                  className={`flex-1 px-6 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 ${
                    profileData.rbfRequestSent
                      ? 'bg-green-100 text-green-700 cursor-not-allowed'
                      : profileData.religion && profileData.rbfBranch
                      ? 'bg-[#D4AF37] text-white hover:bg-[#B8860B]'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-5 h-5" />
                  {profileData.rbfRequestSent ? 'Request Sent to RBF' : 'Send request to your RBF'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    // Navigate to RBF registration page
                    window.open('/rbf-registration', '_blank');
                  }}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Building className="w-5 h-5" />
                  Register RBF (Less than a minute)
                </button>
              </div>

              {/* RBF Status */}
              {profileData.rbfRequestSent && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                    <p className="text-sm text-yellow-800">
                      Please note that your page will only be updated when your request is accepted by {profileData.rbfBranch || 'your RBF'}.
                    </p>
                  </div>
                </div>
              )}

              {/* Denomination Display */}
              {profileData.religion && profileData.denomination && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <h4 className="font-medium text-blue-900 mb-2">Selected RBF Information:</h4>
                  <div className="text-sm text-blue-800 space-y-1">
                    <p><strong>Religion:</strong> {profileData.religion}</p>
                    <p><strong>Denomination:</strong> {profileData.denomination === 'Others' ? profileData.customDenomination : profileData.denomination}</p>
                    {profileData.rbfBranch && <p><strong>Branch:</strong> {profileData.rbfBranch}</p>}
                    {profileData.rbfBranchId && <p><strong>Branch ID:</strong> {profileData.rbfBranchId}</p>}
                  </div>
                  
                  {/* Denomination Checkboxes for Christianity */}
                  {profileData.religion === 'Christianity' && (
                    <div className="mt-3 pt-3 border-t border-blue-200">
                      <p className="text-sm font-medium text-blue-900 mb-2">Available Christian Denominations:</p>
                      <div className="grid grid-cols-2 gap-2 text-xs text-blue-700">
                        {['Charismatic', 'Pentecostal', 'Catholic', 'Orthodox'].map(denom => (
                          <label key={denom} className="flex items-center space-x-1">
                            <input 
                              type="checkbox" 
                              checked={profileData.denomination === denom}
                              readOnly
                              className="w-3 h-3"
                            />
                            <span>{denom}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Physique Status */}
          <div className="glass-effect rounded-2xl p-6 animate-fade-in-up delay-600">
            <div className="flex items-center mb-6">
              <UserIcon className="w-6 h-6 text-[#D4AF37] mr-3" />
              <h2 className="text-xl font-bold text-gray-900">Physique Status</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Hair Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hair Color</label>
                <select
                  name="hairColor"
                  value={profileData.hairColor}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                >
                  <option value="">Select Hair Color</option>
                  {['Black', 'Brown', 'Blonde', 'Red', 'Gray', 'White', 'Auburn', 'Others'].map(color => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              </div>

              {/* Custom Hair Color */}
              {profileData.hairColor === 'Others' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Specify Hair Color</label>
                  <input
                    type="text"
                    name="customHairColor"
                    value={profileData.customHairColor}
                    onChange={handleInputChange}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                    placeholder="Enter your hair color"
                  />
                </div>
              )}

              {/* Eye Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Eye Color</label>
                <select
                  name="eyeColor"
                  value={profileData.eyeColor}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                >
                  <option value="">Select Eye Color</option>
                  {['Brown', 'Blue', 'Green', 'Hazel', 'Gray', 'Amber', 'Black', 'Others'].map(color => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              </div>

              {/* Custom Eye Color */}
              {profileData.eyeColor === 'Others' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Specify Eye Color</label>
                  <input
                    type="text"
                    name="customEyeColor"
                    value={profileData.customEyeColor}
                    onChange={handleInputChange}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                    placeholder="Enter your eye color"
                  />
                </div>
              )}

              {/* Height */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
                <select
                  name="height"
                  value={profileData.height}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                >
                  <option value="">Select Height Range</option>
                  {['Below 5ft', '5ft - 5.5ft', '5.5ft - 6ft', '6ft - 6.5ft', 'Above 6.5ft', 'Others'].map(height => (
                    <option key={height} value={height}>{height}</option>
                  ))}
                </select>
              </div>

              {/* Custom Height */}
              {profileData.height === 'Others' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Specify Height</label>
                  <input
                    type="text"
                    name="customHeight"
                    value={profileData.customHeight}
                    onChange={handleInputChange}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                    placeholder="Enter your height"
                  />
                </div>
              )}

              {/* Weight */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    name="weight"
                    value={profileData.weight}
                    onChange={handleInputChange}
                    className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                    placeholder="Enter weight"
                  />
                  <select
                    name="weightUnit"
                    value={profileData.weightUnit}
                    onChange={handleInputChange}
                    className="w-20 p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                  >
                    <option value="kg">kg</option>
                    <option value="lbs">lbs</option>
                  </select>
                </div>
              </div>

              {/* Voice Recording */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Voice Recording</label>
                <div className="flex gap-2">
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setProfileData(prev => ({ ...prev, voiceRecording: file.name }));
                      }
                    }}
                    className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    className="px-4 py-3 bg-[#D4AF37] text-white rounded-xl hover:bg-[#B8860B] transition-colors"
                  >
                    Record
                  </button>
                </div>
                {profileData.voiceRecording && (
                  <p className="text-sm text-gray-600 mt-2">Recorded: {profileData.voiceRecording}</p>
                )}
              </div>

              {/* Disability Status */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Do you have any disability?</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasDisability"
                      value="true"
                      checked={profileData.hasDisability === true}
                      onChange={(e) => setProfileData(prev => ({ ...prev, hasDisability: e.target.value === 'true' }))}
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasDisability"
                      value="false"
                      checked={profileData.hasDisability === false}
                      onChange={(e) => setProfileData(prev => ({ ...prev, hasDisability: e.target.value === 'true' }))}
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              </div>

              {/* Disability Type */}
              {profileData.hasDisability && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type of Disability</label>
                    <select
                      name="disabilityType"
                      value={profileData.disabilityType}
                      onChange={handleInputChange}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                    >
                      <option value="">Select Disability Type</option>
                      {['Physical', 'Visual', 'Hearing', 'Cognitive', 'Mental Health', 'Learning', 'Others'].map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  {/* Custom Disability Type */}
                  {profileData.disabilityType === 'Others' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Specify Disability Type</label>
                      <input
                        type="text"
                        name="customDisabilityType"
                        value={profileData.customDisabilityType}
                        onChange={handleInputChange}
                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                        placeholder="Enter disability type"
                      />
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Physique Summary */}
            {(profileData.hairColor || profileData.eyeColor || profileData.height || profileData.weight) && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                <h4 className="font-medium text-green-900 mb-2">Physique Summary:</h4>
                <div className="text-sm text-green-800 space-y-1">
                  {profileData.hairColor && (
                    <p><strong>Hair:</strong> {profileData.hairColor === 'Others' ? profileData.customHairColor : profileData.hairColor}</p>
                  )}
                  {profileData.eyeColor && (
                    <p><strong>Eyes:</strong> {profileData.eyeColor === 'Others' ? profileData.customEyeColor : profileData.eyeColor}</p>
                  )}
                  {profileData.height && (
                    <p><strong>Height:</strong> {profileData.height === 'Others' ? profileData.customHeight : profileData.height}</p>
                  )}
                  {profileData.weight && (
                    <p><strong>Weight:</strong> {profileData.weight} {profileData.weightUnit}</p>
                  )}
                  {profileData.hasDisability && profileData.disabilityType && (
                    <p><strong>Disability:</strong> {profileData.disabilityType === 'Others' ? profileData.customDisabilityType : profileData.disabilityType}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Marital Status */}
          <div className="glass-effect rounded-2xl p-6 animate-fade-in-up delay-700">
            <div className="flex items-center mb-6">
              <Heart className="w-6 h-6 text-[#D4AF37] mr-3" />
              <h2 className="text-xl font-bold text-gray-900">Marital Status</h2>
            </div>
            
            <div className="space-y-6">
              {/* Marital Status Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Select your marital status:</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['Single', 'Married', 'Engaged', 'Separated', 'Divorced', 'Widowed', 'Knocking', 'Co-habitation', "I don't want to say"].map(status => (
                    <label key={status} className="flex items-center p-3 border-2 border-gray-200 rounded-xl hover:border-[#D4AF37] cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="maritalStatus"
                        value={status}
                        checked={profileData.maritalStatus === status}
                        onChange={handleInputChange}
                        className="mr-3 text-[#D4AF37]"
                      />
                      <span className="text-sm font-medium">{status}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Enhanced Partner Information for Married/Engaged */}
              {(profileData.maritalStatus === 'Married' || profileData.maritalStatus === 'Engaged') && (
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 space-y-4">
                  <h3 className="font-medium text-purple-900">Additional Partner Information</h3>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Partner Occupation</label>
                      <input
                        type="text"
                        name="partnerOccupation"
                        value={profileData.partnerOccupation}
                        onChange={handleInputChange}
                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                        placeholder="Enter partner's occupation"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Partner Age</label>
                      <input
                        type="number"
                        name="partnerAge"
                        value={profileData.partnerAge}
                        onChange={handleInputChange}
                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                        placeholder="Enter partner's age"
                        min="18"
                        max="100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Partner Nationality</label>
                      <CountrySelect
                        value={profileData.partnerNationality}
                        onChange={(value) => setProfileData(prev => ({ ...prev, partnerNationality: value }))}
                        placeholder="Select partner's nationality"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Marriage/Engagement Location</label>
                      <input
                        type="text"
                        name="marriageLocation"
                        value={profileData.marriageLocation}
                        onChange={handleInputChange}
                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                        placeholder="Enter location"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Marriage Type</label>
                      <select
                        name="marriageType"
                        value={profileData.marriageType}
                        onChange={handleInputChange}
                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                      >
                        <option value="">Select Type</option>
                        <option value="Civil">Civil</option>
                        <option value="Religious">Religious</option>
                        <option value="Traditional">Traditional</option>
                        <option value="Court">Court</option>
                        <option value="Mixed">Mixed</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Number of Children</label>
                      <select
                        name="numberOfChildren"
                        value={profileData.numberOfChildren}
                        onChange={handleInputChange}
                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                      >
                        <option value="">Select</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5+">5+</option>
                      </select>
                    </div>
                  </div>

                  {/* Children Details */}
                  {profileData.numberOfChildren && profileData.numberOfChildren !== "0" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Children Details (Names, Ages)</label>
                      <textarea
                        name="childrenDetails"
                        value={profileData.childrenDetails}
                        onChange={(e) => setProfileData(prev => ({ ...prev, childrenDetails: e.target.value }))}
                        rows={3}
                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors resize-none"
                        placeholder="Enter children details (names, ages, etc.)"
                      />
                    </div>
                  )}

                  {/* Family and Religious Approval */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Family Approval</label>
                      <select
                        name="familyApproval"
                        value={profileData.familyApproval}
                        onChange={handleInputChange}
                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                      >
                        <option value="">Select</option>
                        <option value="Fully Approved">Fully Approved</option>
                        <option value="Partially Approved">Partially Approved</option>
                        <option value="Not Approved">Not Approved</option>
                        <option value="Pending">Pending</option>
                        <option value="Not Applicable">Not Applicable</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Religious Approval</label>
                      <select
                        name="religiousApproval"
                        value={profileData.religiousApproval}
                        onChange={handleInputChange}
                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                      >
                        <option value="">Select</option>
                        <option value="Fully Approved">Fully Approved</option>
                        <option value="Partially Approved">Partially Approved</option>
                        <option value="Not Approved">Not Approved</option>
                        <option value="Pending">Pending</option>
                        <option value="Not Applicable">Not Applicable</option>
                      </select>
                    </div>
                  </div>

                  {/* Marital Counseling */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Have you attended marital counseling?</label>
                    <div className="flex gap-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="maritalCounseling"
                          value="true"
                          checked={profileData.maritalCounseling === true}
                          onChange={(e) => setProfileData(prev => ({ ...prev, maritalCounseling: e.target.value === 'true' }))}
                          className="mr-2 text-[#D4AF37]"
                        />
                        Yes
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="maritalCounseling"
                          value="false"
                          checked={profileData.maritalCounseling === false}
                          onChange={(e) => setProfileData(prev => ({ ...prev, maritalCounseling: e.target.value === 'true' }))}
                          className="mr-2 text-[#D4AF37]"
                        />
                        No
                      </label>
                    </div>
                  </div>

                  {/* Legal Agreements and Assets */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Legal Agreements</label>
                      <select
                        name="legalAgreements"
                        value={profileData.legalAgreements}
                        onChange={handleInputChange}
                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                      >
                        <option value="">Select</option>
                        <option value="Prenuptial Agreement">Prenuptial Agreement</option>
                        <option value="Postnuptial Agreement">Postnuptial Agreement</option>
                        <option value="Separation Agreement">Separation Agreement</option>
                        <option value="None">None</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Joint Assets</label>
                      <select
                        name="jointAssets"
                        value={profileData.jointAssets}
                        onChange={handleInputChange}
                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                      >
                        <option value="">Select</option>
                        <option value="Property">Property</option>
                        <option value="Bank Accounts">Bank Accounts</option>
                        <option value="Investments">Investments</option>
                        <option value="Business">Business</option>
                        <option value="Multiple">Multiple</option>
                        <option value="None">None</option>
                      </select>
                    </div>
                  </div>

                  {/* Partner Contact Information */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Partner Contact Information</label>
                    <input
                      type="text"
                      name="partnerContactInfo"
                      value={profileData.partnerContactInfo}
                      onChange={handleInputChange}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                      placeholder="Enter partner's phone or email"
                    />
                  </div>

                  {/* Previous Marriages */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Previous Marriages</label>
                    <select
                      name="previousMarriages"
                      value={profileData.previousMarriages}
                      onChange={handleInputChange}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                    >
                      <option value="">Select</option>
                      <option value="None">None</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4+">4+</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Married Status Details */}
              {profileData.maritalStatus === 'Married' && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 space-y-4">
                  <h3 className="font-medium text-blue-900">Marriage Details</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Partner Name</label>
                      <input
                        type="text"
                        name="partnerName"
                        value={profileData.partnerName}
                        onChange={handleInputChange}
                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                        placeholder="Enter partner's name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Married Since</label>
                      <input
                        type="date"
                        name="marriedSince"
                        value={profileData.marriedSince}
                        onChange={handleInputChange}
                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Marriage Certificate</label>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setProfileData(prev => ({ ...prev, marriageCertificate: file.name }));
                          }
                        }}
                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                      />
                      {profileData.marriageCertificate && (
                        <p className="text-sm text-gray-600 mt-1">Uploaded: {profileData.marriageCertificate}</p>
                      )}
                    </div>

                    <div>
                      <button
                        type="button"
                        onClick={() => {
                          if (profileData.partnerName) {
                            setProfileData(prev => ({ ...prev, partnerVerificationSent: true }));
                            alert(`Verification request sent to ${profileData.partnerName}. Your page will be updated when partner accepts your request.`);
                          } else {
                            alert("Please enter partner's name first.");
                          }
                        }}
                        disabled={!profileData.partnerName || profileData.partnerVerificationSent}
                        className={`w-full px-4 py-3 rounded-xl font-medium transition-colors ${
                          profileData.partnerVerificationSent
                            ? 'bg-green-100 text-green-700 cursor-not-allowed'
                            : profileData.partnerName
                            ? 'bg-[#D4AF37] text-white hover:bg-[#B8860B]'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {profileData.partnerVerificationSent ? 'Request Sent' : 'Send Request to Partner'}
                      </button>
                    </div>
                  </div>

                  {/* Partner Alive Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Is Partner alive?</label>
                    <div className="flex gap-4">
                      {['Yes', 'No', "I don't want to say", "I don't know"].map(option => (
                        <label key={option} className="flex items-center">
                          <input
                            type="radio"
                            name="isPartnerAlive"
                            value={option}
                            checked={profileData.isPartnerAlive === option}
                            onChange={handleInputChange}
                            className="mr-2 text-[#D4AF37]"
                          />
                          <span className="text-sm">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Witness Phone for Proof */}
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Witness Phone for Proof</label>
                      <input
                        type="tel"
                        name="maritalWitnessPhone"
                        value={profileData.maritalWitnessPhone}
                        onChange={handleInputChange}
                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                        placeholder="Enter witness phone"
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => {
                          if (profileData.maritalWitnessPhone) {
                            setProfileData(prev => ({ ...prev, maritalWitnessOtpSent: true }));
                            alert("OTP sent to witness phone number.");
                          } else {
                            alert("Please enter witness phone number first.");
                          }
                        }}
                        disabled={!profileData.maritalWitnessPhone || profileData.maritalWitnessOtpSent}
                        className={`px-4 py-3 rounded-xl font-medium transition-colors ${
                          profileData.maritalWitnessOtpSent
                            ? 'bg-green-100 text-green-700 cursor-not-allowed'
                            : profileData.maritalWitnessPhone
                            ? 'bg-[#D4AF37] text-white hover:bg-[#B8860B]'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        Send OTP
                      </button>
                    </div>
                  </div>

                  {/* OTP Input */}
                  {profileData.maritalWitnessOtpSent && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Enter OTP</label>
                      <input
                        type="text"
                        name="maritalWitnessOtp"
                        value={profileData.maritalWitnessOtp}
                        onChange={handleInputChange}
                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                        placeholder="Enter OTP received by witness"
                        maxLength={6}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Engaged Status Details */}
              {profileData.maritalStatus === 'Engaged' && (
                <div className="bg-pink-50 border border-pink-200 rounded-xl p-6 space-y-4">
                  <h3 className="font-medium text-pink-900">Engagement Details</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Engaged Since</label>
                      <input
                        type="date"
                        name="engagedSince"
                        value={profileData.engagedSince}
                        onChange={handleInputChange}
                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Engagement Partner</label>
                      <input
                        type="text"
                        name="engagementPartner"
                        value={profileData.engagementPartner}
                        onChange={handleInputChange}
                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                        placeholder="Enter partner's name"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Engagement Ring/Gift</label>
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setProfileData(prev => ({ ...prev, engagementRing: file.name }));
                          }
                        }}
                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                      />
                      {profileData.engagementRing && (
                        <p className="text-sm text-gray-600 mt-1">Uploaded: {profileData.engagementRing}</p>
                      )}
                    </div>
                  </div>

                  {/* Partner Verification */}
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        if (profileData.engagementPartner) {
                          setProfileData(prev => ({ ...prev, partnerVerificationSent: true }));
                          alert(`Engagement verification request sent to ${profileData.engagementPartner}.`);
                        } else {
                          alert("Please enter partner's name first.");
                        }
                      }}
                      disabled={!profileData.engagementPartner || profileData.partnerVerificationSent}
                      className={`w-full px-4 py-3 rounded-xl font-medium transition-colors ${
                        profileData.partnerVerificationSent
                          ? 'bg-green-100 text-green-700 cursor-not-allowed'
                          : profileData.engagementPartner
                          ? 'bg-[#D4AF37] text-white hover:bg-[#B8860B]'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {profileData.partnerVerificationSent ? 'Verification Sent' : 'Send Engagement Verification'}
                    </button>
                  </div>

                  {/* Partner Alive Status and Witness */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Is Partner alive?</label>
                    <div className="flex gap-4 mb-4">
                      {['Yes', 'No', "I don't want to say", "I don't know"].map(option => (
                        <label key={option} className="flex items-center">
                          <input
                            type="radio"
                            name="isPartnerAlive"
                            value={option}
                            checked={profileData.isPartnerAlive === option}
                            onChange={handleInputChange}
                            className="mr-2 text-[#D4AF37]"
                          />
                          <span className="text-sm">{option}</span>
                        </label>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <input
                        type="tel"
                        name="maritalWitnessPhone"
                        value={profileData.maritalWitnessPhone}
                        onChange={handleInputChange}
                        className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                        placeholder="Witness Phone for Proof"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (profileData.maritalWitnessPhone) {
                            setProfileData(prev => ({ ...prev, maritalWitnessOtpSent: true }));
                            alert("OTP sent to witness phone number.");
                          }
                        }}
                        className="px-4 py-3 bg-[#D4AF37] text-white rounded-xl hover:bg-[#B8860B] transition-colors"
                      >
                        Send OTP
                      </button>
                      {profileData.maritalWitnessOtpSent && (
                        <input
                          type="text"
                          name="maritalWitnessOtp"
                          value={profileData.maritalWitnessOtp}
                          onChange={handleInputChange}
                          className="w-32 p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                          placeholder="Enter OTP"
                          maxLength={6}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Widowed Status Details */}
              {profileData.maritalStatus === 'Widowed' && (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-4">
                  <h3 className="font-medium text-gray-900">Widowed Details</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Widowed Since</label>
                      <input
                        type="date"
                        name="widowedSince"
                        value={profileData.widowedSince}
                        onChange={handleInputChange}
                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Late Partner's Name</label>
                      <input
                        type="text"
                        name="latePartnerName"
                        value={profileData.latePartnerName}
                        onChange={handleInputChange}
                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                        placeholder="Enter late partner's name"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Death Certificate</label>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setProfileData(prev => ({ ...prev, widowCertificate: file.name }));
                          }
                        }}
                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                      />
                      {profileData.widowCertificate && (
                        <p className="text-sm text-gray-600 mt-1">Uploaded: {profileData.widowCertificate}</p>
                      )}
                    </div>
                  </div>

                  {/* Witness Phone and OTP */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Witness Verification</label>
                    <div className="flex gap-4">
                      <input
                        type="tel"
                        name="maritalWitnessPhone"
                        value={profileData.maritalWitnessPhone}
                        onChange={handleInputChange}
                        className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                        placeholder="Witness Phone for Proof"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (profileData.maritalWitnessPhone) {
                            setProfileData(prev => ({ ...prev, maritalWitnessOtpSent: true }));
                            alert("OTP sent to witness phone number.");
                          }
                        }}
                        className="px-4 py-3 bg-[#D4AF37] text-white rounded-xl hover:bg-[#B8860B] transition-colors"
                      >
                        Send OTP
                      </button>
                      {profileData.maritalWitnessOtpSent && (
                        <input
                          type="text"
                          name="maritalWitnessOtp"
                          value={profileData.maritalWitnessOtp}
                          onChange={handleInputChange}
                          className="w-32 p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                          placeholder="Enter OTP"
                          maxLength={6}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Separated Status Details */}
              {profileData.maritalStatus === 'Separated' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 space-y-4">
                  <h3 className="font-medium text-yellow-900">Separation Details</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Separated Since</label>
                      <input
                        type="date"
                        name="separatedSince"
                        value={profileData.separatedSince}
                        onChange={handleInputChange}
                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Partner Name</label>
                      <input
                        type="text"
                        name="partnerName"
                        value={profileData.partnerName}
                        onChange={handleInputChange}
                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                        placeholder="Enter partner's name"
                      />
                    </div>
                  </div>

                  {/* Separation Reason */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Separation Reason</label>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      {['Partner Cheating', 'Partner abusive', 'Partner not supportive', "I don't want to say"].map(reason => (
                        <label key={reason} className="flex items-center">
                          <input
                            type="radio"
                            name="separationReason"
                            value={reason}
                            checked={profileData.separationReason === reason}
                            onChange={handleInputChange}
                            className="mr-2 text-[#D4AF37]"
                          />
                          <span className="text-sm">{reason}</span>
                        </label>
                      ))}
                    </div>
                    
                    {/* Custom Reason */}
                    <div className="mb-3">
                      <input
                        type="text"
                        name="customSeparationReason"
                        value={profileData.customSeparationReason}
                        onChange={handleInputChange}
                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                        placeholder="Write reason here..."
                      />
                    </div>

                    {/* Voice Recording */}
                    <div className="flex gap-4 mb-3">
                      <input
                        type="file"
                        accept="audio/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setProfileData(prev => ({ ...prev, separationVoiceRecording: file.name }));
                          }
                        }}
                        className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                      />
                      <button
                        type="button"
                        className="px-4 py-3 bg-[#D4AF37] text-white rounded-xl hover:bg-[#B8860B] transition-colors"
                      >
                        Record Voice
                      </button>
                    </div>

                    {/* Evidence Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Attach Evidence</label>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png,.mp4,.mp3"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setProfileData(prev => ({ ...prev, separationEvidence: file.name }));
                          }
                        }}
                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Partner Alive Status and Witness */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Is Partner alive?</label>
                    <div className="flex gap-4 mb-4">
                      {['Yes', 'No', "I don't want to say", "I don't know"].map(option => (
                        <label key={option} className="flex items-center">
                          <input
                            type="radio"
                            name="isPartnerAlive"
                            value={option}
                            checked={profileData.isPartnerAlive === option}
                            onChange={handleInputChange}
                            className="mr-2 text-[#D4AF37]"
                          />
                          <span className="text-sm">{option}</span>
                        </label>
                      ))}
                    </div>

                    {/* Witness Phone and OTP */}
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <input
                          type="tel"
                          name="maritalWitnessPhone"
                          value={profileData.maritalWitnessPhone}
                          onChange={handleInputChange}
                          className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                          placeholder="Witness Phone for Proof"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          if (profileData.maritalWitnessPhone) {
                            setProfileData(prev => ({ ...prev, maritalWitnessOtpSent: true }));
                            alert("OTP sent to witness phone number.");
                          }
                        }}
                        className="px-4 py-3 bg-[#D4AF37] text-white rounded-xl hover:bg-[#B8860B] transition-colors"
                      >
                        Send OTP
                      </button>
                      {profileData.maritalWitnessOtpSent && (
                        <input
                          type="text"
                          name="maritalWitnessOtp"
                          value={profileData.maritalWitnessOtp}
                          onChange={handleInputChange}
                          className="w-32 p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                          placeholder="Enter OTP"
                          maxLength={6}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Divorced Status Details */}
              {profileData.maritalStatus === 'Divorced' && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 space-y-4">
                  <h3 className="font-medium text-red-900">Divorce Details</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Divorced Since</label>
                      <input
                        type="date"
                        name="divorcedSince"
                        value={profileData.divorcedSince}
                        onChange={handleInputChange}
                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Partner Name</label>
                      <input
                        type="text"
                        name="partnerName"
                        value={profileData.partnerName}
                        onChange={handleInputChange}
                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                        placeholder="Enter partner's name"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Divorce Certificate</label>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setProfileData(prev => ({ ...prev, divorceCertificate: file.name }));
                          }
                        }}
                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Divorce Reason */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Divorce Reason</label>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      {['Partner Cheating', 'Partner abusive', 'Partner not supportive', "I don't want to say"].map(reason => (
                        <label key={reason} className="flex items-center">
                          <input
                            type="radio"
                            name="divorceReason"
                            value={reason}
                            checked={profileData.divorceReason === reason}
                            onChange={handleInputChange}
                            className="mr-2 text-[#D4AF37]"
                          />
                          <span className="text-sm">{reason}</span>
                        </label>
                      ))}
                    </div>
                    
                    <input
                      type="text"
                      name="customDivorceReason"
                      value={profileData.customDivorceReason}
                      onChange={handleInputChange}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors mb-3"
                      placeholder="Write reason here..."
                    />

                    {/* Voice Recording and Evidence */}
                    <div className="flex gap-4 mb-3">
                      <input
                        type="file"
                        accept="audio/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setProfileData(prev => ({ ...prev, divorceVoiceRecording: file.name }));
                          }
                        }}
                        className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                      />
                      <button
                        type="button"
                        className="px-4 py-3 bg-[#D4AF37] text-white rounded-xl hover:bg-[#B8860B] transition-colors"
                      >
                        Record Voice
                      </button>
                    </div>

                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,.mp4,.mp3"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setProfileData(prev => ({ ...prev, divorceEvidence: file.name }));
                        }
                      }}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                      placeholder="Attach evidence"
                    />
                  </div>

                  {/* Partner Alive Status and Witness */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Is Partner alive?</label>
                    <div className="flex gap-4 mb-4">
                      {['Yes', 'No', "I don't want to say", "I don't know"].map(option => (
                        <label key={option} className="flex items-center">
                          <input
                            type="radio"
                            name="isPartnerAlive"
                            value={option}
                            checked={profileData.isPartnerAlive === option}
                            onChange={handleInputChange}
                            className="mr-2 text-[#D4AF37]"
                          />
                          <span className="text-sm">{option}</span>
                        </label>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <input
                        type="tel"
                        name="maritalWitnessPhone"
                        value={profileData.maritalWitnessPhone}
                        onChange={handleInputChange}
                        className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                        placeholder="Witness Proof Phone"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (profileData.maritalWitnessPhone) {
                            setProfileData(prev => ({ ...prev, maritalWitnessOtpSent: true }));
                            alert("OTP sent to witness phone number.");
                          }
                        }}
                        className="px-4 py-3 bg-[#D4AF37] text-white rounded-xl hover:bg-[#B8860B] transition-colors"
                      >
                        Send OTP
                      </button>
                      {profileData.maritalWitnessOtpSent && (
                        <input
                          type="text"
                          name="maritalWitnessOtp"
                          value={profileData.maritalWitnessOtp}
                          onChange={handleInputChange}
                          className="w-32 p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                          placeholder="Enter OTP"
                          maxLength={6}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Knocking Status Details */}
              {profileData.maritalStatus === 'Knocking' && (
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 space-y-4">
                  <h3 className="font-medium text-purple-900">Knocking Details</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">With who</label>
                    <input
                      type="text"
                      name="knockingPartner"
                      value={profileData.knockingPartner}
                      onChange={handleInputChange}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                      placeholder="Enter partner's name"
                    />
                  </div>

                  {/* Partner Alive Status and Witness */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Is Partner alive?</label>
                    <div className="flex gap-4 mb-4">
                      {['Yes', 'No', "I don't want to say", "I don't know"].map(option => (
                        <label key={option} className="flex items-center">
                          <input
                            type="radio"
                            name="isPartnerAlive"
                            value={option}
                            checked={profileData.isPartnerAlive === option}
                            onChange={handleInputChange}
                            className="mr-2 text-[#D4AF37]"
                          />
                          <span className="text-sm">{option}</span>
                        </label>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <input
                        type="tel"
                        name="maritalWitnessPhone"
                        value={profileData.maritalWitnessPhone}
                        onChange={handleInputChange}
                        className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                        placeholder="Witness Proof Phone"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (profileData.maritalWitnessPhone) {
                            setProfileData(prev => ({ ...prev, maritalWitnessOtpSent: true }));
                            alert("OTP sent to witness phone number.");
                          }
                        }}
                        className="px-4 py-3 bg-[#D4AF37] text-white rounded-xl hover:bg-[#B8860B] transition-colors"
                      >
                        Send OTP
                      </button>
                      {profileData.maritalWitnessOtpSent && (
                        <input
                          type="text"
                          name="maritalWitnessOtp"
                          value={profileData.maritalWitnessOtp}
                          onChange={handleInputChange}
                          className="w-32 p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                          placeholder="Enter OTP"
                          maxLength={6}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Co-habitation Status Details */}
              {profileData.maritalStatus === 'Co-habitation' && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 space-y-4">
                  <h3 className="font-medium text-green-900">Co-habitation Details</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Since</label>
                      <input
                        type="date"
                        name="cohabitationSince"
                        value={profileData.cohabitationSince}
                        onChange={handleInputChange}
                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">With who</label>
                      <input
                        type="text"
                        name="cohabitationPartner"
                        value={profileData.cohabitationPartner}
                        onChange={handleInputChange}
                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                        placeholder="Enter partner's name"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (profileData.cohabitationPartner) {
                            setProfileData(prev => ({ ...prev, partnerVerificationSent: true }));
                            alert(`Invitation request sent to ${profileData.cohabitationPartner}.`);
                          } else {
                            alert("Please enter partner's name first.");
                          }
                        }}
                        disabled={!profileData.cohabitationPartner || profileData.partnerVerificationSent}
                        className={`w-full px-4 py-3 rounded-xl font-medium transition-colors ${
                          profileData.partnerVerificationSent
                            ? 'bg-green-100 text-green-700 cursor-not-allowed'
                            : profileData.cohabitationPartner
                            ? 'bg-[#D4AF37] text-white hover:bg-[#B8860B]'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {profileData.partnerVerificationSent ? 'Invitation Sent' : 'Send Invitation Request'}
                      </button>
                    </div>
                  </div>

                  {/* Partner Alive Status and Witness */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Is Partner alive?</label>
                    <div className="flex gap-4 mb-4">
                      {['Yes', 'No', "I don't want to say", "I don't know"].map(option => (
                        <label key={option} className="flex items-center">
                          <input
                            type="radio"
                            name="isPartnerAlive"
                            value={option}
                            checked={profileData.isPartnerAlive === option}
                            onChange={handleInputChange}
                            className="mr-2 text-[#D4AF37]"
                          />
                          <span className="text-sm">{option}</span>
                        </label>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <input
                        type="tel"
                        name="maritalWitnessPhone"
                        value={profileData.maritalWitnessPhone}
                        onChange={handleInputChange}
                        className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                        placeholder="Witness Proof Phone"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (profileData.maritalWitnessPhone) {
                            setProfileData(prev => ({ ...prev, maritalWitnessOtpSent: true }));
                            alert("OTP sent to witness phone number.");
                          }
                        }}
                        className="px-4 py-3 bg-[#D4AF37] text-white rounded-xl hover:bg-[#B8860B] transition-colors"
                      >
                        Send OTP
                      </button>
                      {profileData.maritalWitnessOtpSent && (
                        <input
                          type="text"
                          name="maritalWitnessOtp"
                          value={profileData.maritalWitnessOtp}
                          onChange={handleInputChange}
                          className="w-32 p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                          placeholder="Enter OTP"
                          maxLength={6}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Marital Status Summary */}
              {profileData.maritalStatus && profileData.maritalStatus !== "I don't want to say" && (
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                  <h4 className="font-medium text-gray-900 mb-2">Marital Status Summary:</h4>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p><strong>Status:</strong> {profileData.maritalStatus}</p>
                    {profileData.partnerName && <p><strong>Partner:</strong> {profileData.partnerName}</p>}
                    {profileData.marriedSince && <p><strong>Since:</strong> {profileData.marriedSince}</p>}
                    {profileData.separatedSince && <p><strong>Separated Since:</strong> {profileData.separatedSince}</p>}
                    {profileData.divorcedSince && <p><strong>Divorced Since:</strong> {profileData.divorcedSince}</p>}
                    {profileData.cohabitationSince && <p><strong>Co-habitation Since:</strong> {profileData.cohabitationSince}</p>}
                    <p><strong>Partner Status:</strong> {profileData.isPartnerAlive}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 animate-fade-in-up delay-600">
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="group relative px-8 py-3 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-white rounded-xl hover:from-[#B8860B] hover:to-[#D4AF37] disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all duration-300 hover-lift"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative flex items-center">
                <Save className="w-5 h-5 mr-2" />
                {saving ? "Saving..." : "Save Profile"}
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}