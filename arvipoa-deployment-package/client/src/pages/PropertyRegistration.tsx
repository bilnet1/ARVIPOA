import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Building, 
  Car, 
  Smartphone, 
  TreePine, 
  Shield, 
  Globe, 
  Lightbulb, 
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  FileText,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import PhoneInput from "../components/PhoneInput";

interface PropertyFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  propertyType: string;
  propertyAddress: string;
  digitalAddress: string;
  pmbDetails: string;
  propertyValue: number;
  purchaseDate: string;
  services: string[];
  urgency: "standard" | "expedited" | "rush";
  additionalNotes: string;
  propertyLicense: string;
}

interface ValidationErrors {
  [key: string]: string;
}

const propertyTypes = [
  { value: "Land", label: "Land", icon: MapPin, description: "Residential, commercial, or agricultural land" },
  { value: "Building/House", label: "Building/House", icon: Building, description: "Residential homes, apartments, commercial buildings" },
  { value: "Auto/bike/Aircraft/Marine", label: "Auto/bike/Aircraft/Marine", icon: Car, description: "Vehicles, boats, aircraft, motorcycles" },
  { value: "Electronic & Smart Devices", label: "Electronic & Smart Devices", icon: Smartphone, description: "Computers, phones, IoT devices, electronics" },
  { value: "Livestock/Pets/Animal", label: "Livestock/Pets/Animal", icon: TreePine, description: "Animals, pets, livestock, breeding stock" },
  { value: "Tree/Plant", label: "Tree/Plant", icon: TreePine, description: "Trees, plants, agricultural crops" },
  { value: "Arms", label: "Arms", icon: Shield, description: "Licensed firearms and security equipment" },
  { value: "Domain Name", label: "Domain Name", icon: Globe, description: "Internet domain names and web properties" },
  { value: "Intellectual Property", label: "Intellectual Property", icon: Lightbulb, description: "Patents, trademarks, copyrights, designs" },
  { value: "PMB", label: "PMB (Private Mail Box)", icon: Mail, description: "Private mail box services and addresses" }
];

const services = [
  "Property Registration",
  "Title Verification",
  "Ownership Transfer",
  "Legal Documentation",
  "Insurance Registration",
  "Tax Registration",
  "Lease Agreement",
  "Property Valuation",
  "Due Diligence",
  "Compliance Check"
];

export default function PropertyRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PropertyFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    propertyType: "",
    propertyAddress: "",
    digitalAddress: "",
    pmbDetails: "",
    propertyValue: 0,
    purchaseDate: "",
    services: [],
    urgency: "standard",
    additionalNotes: "",
    propertyLicense: "",
  });
  
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "propertyValue" ? parseFloat(value) || 0 : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleServiceChange = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Required fields validation
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone', 
      'propertyType', 'propertyAddress', 'propertyValue'
    ];

    requiredFields.forEach(field => {
      if (!formData[field as keyof PropertyFormData] || 
          (field === 'propertyValue' && formData.propertyValue <= 0)) {
        newErrors[field] = `${field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} is required`;
      }
    });

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    if (formData.phone && formData.phone.length < 10) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Services validation
    if (formData.services.length === 0) {
      newErrors.services = "Please select at least one service";
    }

    // PMB validation
    if (formData.propertyType === "PMB" && !formData.pmbDetails.trim()) {
      newErrors.pmbDetails = "PMB details are required for PMB property type";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const referenceNumber = `PR-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 999999)).padStart(6, '0')}`;
      
      setSubmitMessage(`Property registration submitted successfully! Reference Number: ${referenceNumber}`);
      
      // Reset form after successful submission
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
      
    } catch (error) {
      setSubmitMessage("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedPropertyType = propertyTypes.find(type => type.value === formData.propertyType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Property Registration</h1>
              <p className="text-gray-600">Register your property with ARVIPOA</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Personal Information */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center mb-6">
              <Building className="w-6 h-6 text-[#D4AF37] mr-3" />
              <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full p-3 border-2 rounded-xl focus:outline-none transition-colors ${
                    errors.firstName ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#D4AF37]'
                  }`}
                  placeholder="Enter your first name"
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full p-3 border-2 rounded-xl focus:outline-none transition-colors ${
                    errors.lastName ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#D4AF37]'
                  }`}
                  placeholder="Enter your last name"
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full p-3 border-2 rounded-xl focus:outline-none transition-colors ${
                    errors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#D4AF37]'
                  }`}
                  placeholder="Enter your email address"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <PhoneInput
                  value={formData.phone}
                  onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
                  placeholder="Enter your phone number"
                  label="Phone Number"
                  required={true}
                  error={errors.phone}
                  name="phone"
                />
              </div>
            </div>
          </div>

          {/* Property Information */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center mb-6">
              <MapPin className="w-6 h-6 text-[#D4AF37] mr-3" />
              <h2 className="text-xl font-bold text-gray-900">Property Information</h2>
            </div>
            
            {/* Property Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-4">Property Type *</label>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {propertyTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <div
                      key={type.value}
                      className={`border-2 rounded-xl p-4 cursor-pointer transition-all hover:shadow-md ${
                        formData.propertyType === type.value
                          ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, propertyType: type.value }))}
                    >
                      <div className="flex items-center mb-2">
                        <Icon className={`w-5 h-5 mr-2 ${
                          formData.propertyType === type.value ? 'text-[#D4AF37]' : 'text-gray-500'
                        }`} />
                        <span className="font-medium">{type.label}</span>
                      </div>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </div>
                  );
                })}
              </div>
              {errors.propertyType && <p className="text-red-500 text-sm mt-2">{errors.propertyType}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Address *</label>
                <input
                  type="text"
                  name="propertyAddress"
                  value={formData.propertyAddress}
                  onChange={handleInputChange}
                  className={`w-full p-3 border-2 rounded-xl focus:outline-none transition-colors ${
                    errors.propertyAddress ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#D4AF37]'
                  }`}
                  placeholder="Enter the complete property address"
                />
                {errors.propertyAddress && <p className="text-red-500 text-sm mt-1">{errors.propertyAddress}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Digital Address</label>
                <input
                  type="text"
                  name="digitalAddress"
                  value={formData.digitalAddress}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                  placeholder="e.g., GR-123-4567"
                />
                <p className="text-gray-500 text-sm mt-1">Ghana Post GPS digital address</p>
              </div>

              {formData.propertyType === "PMB" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">PMB Details *</label>
                  <input
                    type="text"
                    name="pmbDetails"
                    value={formData.pmbDetails}
                    onChange={handleInputChange}
                    className={`w-full p-3 border-2 rounded-xl focus:outline-none transition-colors ${
                      errors.pmbDetails ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#D4AF37]'
                    }`}
                    placeholder="e.g., PMB 1234"
                  />
                  {errors.pmbDetails && <p className="text-red-500 text-sm mt-1">{errors.pmbDetails}</p>}
                  <p className="text-gray-500 text-sm mt-1">Private Mail Box number and provider</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Value (GHS) *</label>
                <input
                  type="number"
                  name="propertyValue"
                  value={formData.propertyValue || ""}
                  onChange={handleInputChange}
                  className={`w-full p-3 border-2 rounded-xl focus:outline-none transition-colors ${
                    errors.propertyValue ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#D4AF37]'
                  }`}
                  placeholder="Enter property value"
                  min="0"
                  step="0.01"
                />
                {errors.propertyValue && <p className="text-red-500 text-sm mt-1">{errors.propertyValue}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Purchase Date</label>
                <input
                  type="date"
                  name="purchaseDate"
                  value={formData.purchaseDate}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property License</label>
                <input
                  type="text"
                  name="propertyLicense"
                  value={formData.propertyLicense}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                  placeholder="Enter license number if applicable"
                />
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center mb-6">
              <FileText className="w-6 h-6 text-[#D4AF37] mr-3" />
              <h2 className="text-xl font-bold text-gray-900">Required Services *</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {services.map((service) => (
                <label
                  key={service}
                  className="flex items-center p-3 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-gray-300 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={formData.services.includes(service)}
                    onChange={() => handleServiceChange(service)}
                    className="w-4 h-4 text-[#D4AF37] border-gray-300 rounded focus:ring-[#D4AF37]"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-700">{service}</span>
                </label>
              ))}
            </div>
            {errors.services && <p className="text-red-500 text-sm mt-2">{errors.services}</p>}
          </div>

          {/* Processing Options */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center mb-6">
              <Calendar className="w-6 h-6 text-[#D4AF37] mr-3" />
              <h2 className="text-xl font-bold text-gray-900">Processing Options</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {[
                { value: "standard", label: "Standard", time: "5-7 business days", price: "Standard rate" },
                { value: "expedited", label: "Expedited", time: "2-3 business days", price: "+50% surcharge" },
                { value: "rush", label: "Rush", time: "24-48 hours", price: "+100% surcharge" }
              ].map((option) => (
                <label
                  key={option.value}
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                    formData.urgency === option.value
                      ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="urgency"
                    value={option.value}
                    checked={formData.urgency === option.value}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <div className="font-medium text-gray-900">{option.label}</div>
                    <div className="text-sm text-gray-600 mt-1">{option.time}</div>
                    <div className="text-sm text-[#D4AF37] mt-1">{option.price}</div>
                  </div>
                </label>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
              <textarea
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleInputChange}
                rows={4}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                placeholder="Any additional information or special requirements..."
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#D4AF37] text-white px-8 py-4 rounded-xl font-medium hover:bg-[#B8941F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing Registration...
                </>
              ) : (
                <>
                  <Building className="w-5 h-5" />
                  Submit Property Registration
                </>
              )}
            </button>
          </div>

          {/* Submit Message */}
          {submitMessage && (
            <div className={`mt-4 p-4 rounded-xl text-center ${
              submitMessage.includes("successfully") 
                ? "bg-green-50 text-green-700 border border-green-200" 
                : "bg-red-50 text-red-700 border border-red-200"
            }`}>
              <div className="flex items-center justify-center gap-2">
                {submitMessage.includes("successfully") ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
                {submitMessage}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}