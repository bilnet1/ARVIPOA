import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Home, 
  Ruler, 
  FileText, 
  Globe, 
  Zap, 
  Droplets, 
  Navigation,
  Mountain,
  User,
  Calendar,
  Shield,
  CheckCircle,
  AlertCircle,
  Upload,
  Eye,
  EyeOff
} from "lucide-react";
import { insertPropertyRegistrationSchema, insertLandRegistrationSchema } from "@shared/schema";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../lib/queryClient";
import { useToast } from "../hooks/use-toast";

// Combined schema for land registration
const landRegistrationFormSchema = insertPropertyRegistrationSchema.extend({
  landSize: z.string().min(1, "Land size is required"),
  landUnit: z.enum(["acres", "hectares", "square_meters"]),
  landUse: z.enum(["residential", "commercial", "agricultural", "industrial", "mixed"]),
  landTitle: z.enum(["freehold", "leasehold", "customary", "statutory"]).optional(),
  titleNumber: z.string().optional(),
  surveyPlan: z.string().optional(),
  coordinates: z.string().optional(),
  boundary: z.string().optional(),
  soilType: z.string().optional(),
  topography: z.enum(["flat", "hilly", "mountainous", "coastal", "valley"]).optional(),
  waterAccess: z.boolean().default(false),
  roadAccess: z.boolean().default(false),
  electricityAccess: z.boolean().default(false),
  nearestLandmark: z.string().optional(),
  previousOwner: z.string().optional(),
  acquisitionMethod: z.enum(["purchase", "inheritance", "gift", "allocation", "lease"]).optional(),
});

type LandRegistrationForm = z.infer<typeof landRegistrationFormSchema>;

export default function LandRegistration() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSensitiveInfo, setShowSensitiveInfo] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<LandRegistrationForm>({
    resolver: zodResolver(landRegistrationFormSchema),
    defaultValues: {
      propertyType: "Land",
      urgency: "standard",
      services: [],
      waterAccess: false,
      roadAccess: false,
      electricityAccess: false,
      ownerId: "current-user", // This should come from auth context
    },
  });

  const registerLandMutation = useMutation({
    mutationFn: async (data: LandRegistrationForm) => {
      // First register the property
      const propertyData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        propertyType: data.propertyType,
        propertyAddress: data.propertyAddress,
        digitalAddress: data.digitalAddress,
        propertyValue: data.propertyValue,
        purchaseDate: data.purchaseDate,
        services: data.services,
        urgency: data.urgency,
        additionalNotes: data.additionalNotes,
        ownerId: data.ownerId,
      };

      const propertyResponse = await apiRequest("/api/property-registrations", "POST", propertyData);

      // Then register the land-specific details
      const landData = {
        propertyId: propertyResponse.id,
        landSize: data.landSize,
        landUnit: data.landUnit,
        landUse: data.landUse,
        landTitle: data.landTitle,
        titleNumber: data.titleNumber,
        surveyPlan: data.surveyPlan,
        coordinates: data.coordinates,
        boundary: data.boundary,
        soilType: data.soilType,
        topography: data.topography,
        waterAccess: data.waterAccess,
        roadAccess: data.roadAccess,
        electricityAccess: data.electricityAccess,
        nearestLandmark: data.nearestLandmark,
        previousOwner: data.previousOwner,
        acquisitionMethod: data.acquisitionMethod,
      };

      return await apiRequest("/api/land-registrations", "POST", landData);
    },
    onSuccess: () => {
      toast({
        title: "Land Registration Successful",
        description: "Your land has been registered successfully. You will receive a confirmation email shortly.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/property-registrations"] });
      form.reset();
      setCurrentStep(1);
    },
    onError: (error: any) => {
      toast({
        title: "Registration Failed",
        description: error.message || "There was an error registering your land. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LandRegistrationForm) => {
    registerLandMutation.mutate(data);
  };

  const nextStep = () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    form.trigger(fieldsToValidate).then((isValid) => {
      if (isValid) {
        setCurrentStep(prev => Math.min(prev + 1, 4));
      }
    });
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const getFieldsForStep = (step: number): (keyof LandRegistrationForm)[] => {
    switch (step) {
      case 1: return ["firstName", "lastName", "email", "phone"];
      case 2: return ["propertyAddress", "digitalAddress", "landSize", "landUnit", "landUse"];
      case 3: return ["propertyValue", "services"];
      case 4: return [];
      default: return [];
    }
  };

  const steps = [
    { number: 1, title: "Owner Information", icon: User },
    { number: 2, title: "Land Details", icon: MapPin },
    { number: 3, title: "Valuation & Services", icon: FileText },
    { number: 4, title: "Additional Information", icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#002b1d] via-gray-900 to-black text-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
            Land Registration
          </h1>
          <p className="text-gray-300 text-lg">
            Register your land property with ARVIPOA's secure platform
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                    isActive 
                      ? 'bg-[#D4AF37] border-[#D4AF37] text-black' 
                      : isCompleted 
                        ? 'bg-green-600 border-green-600 text-white'
                        : 'bg-gray-700 border-gray-600 text-gray-300'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <IconComponent className="w-6 h-6" />
                    )}
                  </div>
                  <div className="ml-3 text-sm">
                    <div className={`font-semibold ${isActive ? 'text-[#D4AF37]' : 'text-gray-300'}`}>
                      {step.title}
                    </div>
                    <div className="text-gray-500">Step {step.number}</div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-px mx-4 ${
                      isCompleted ? 'bg-green-600' : 'bg-gray-600'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20"
        >
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Step 1: Owner Information */}
            {currentStep === 1 && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-semibold text-[#D4AF37] mb-6 flex items-center gap-3">
                  <User className="w-6 h-6" />
                  Owner Information
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name *</label>
                    <input
                      {...form.register("firstName")}
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                      placeholder="Enter your first name"
                    />
                    {form.formState.errors.firstName && (
                      <p className="text-red-400 text-sm mt-1">{form.formState.errors.firstName.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name *</label>
                    <input
                      {...form.register("lastName")}
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                      placeholder="Enter your last name"
                    />
                    {form.formState.errors.lastName && (
                      <p className="text-red-400 text-sm mt-1">{form.formState.errors.lastName.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address *</label>
                    <input
                      {...form.register("email")}
                      type="email"
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                      placeholder="your.email@example.com"
                    />
                    {form.formState.errors.email && (
                      <p className="text-red-400 text-sm mt-1">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number *</label>
                    <input
                      {...form.register("phone")}
                      type="tel"
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                      placeholder="+233 XX XXX XXXX"
                    />
                    {form.formState.errors.phone && (
                      <p className="text-red-400 text-sm mt-1">{form.formState.errors.phone.message}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Land Details */}
            {currentStep === 2 && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-semibold text-[#D4AF37] mb-6 flex items-center gap-3">
                  <MapPin className="w-6 h-6" />
                  Land Details
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Property Address *</label>
                    <textarea
                      {...form.register("propertyAddress")}
                      rows={3}
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                      placeholder="Enter the complete address of your land"
                    />
                    {form.formState.errors.propertyAddress && (
                      <p className="text-red-400 text-sm mt-1">{form.formState.errors.propertyAddress.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Digital Address</label>
                    <input
                      {...form.register("digitalAddress")}
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                      placeholder="e.g., GA-123-4567"
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Land Size *</label>
                      <input
                        {...form.register("landSize")}
                        type="number"
                        step="0.01"
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                        placeholder="e.g., 2.5"
                      />
                      {form.formState.errors.landSize && (
                        <p className="text-red-400 text-sm mt-1">{form.formState.errors.landSize.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Unit *</label>
                      <select
                        {...form.register("landUnit")}
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                      >
                        <option value="" className="bg-gray-800">Select unit</option>
                        <option value="acres" className="bg-gray-800">Acres</option>
                        <option value="hectares" className="bg-gray-800">Hectares</option>
                        <option value="square_meters" className="bg-gray-800">Square Meters</option>
                      </select>
                      {form.formState.errors.landUnit && (
                        <p className="text-red-400 text-sm mt-1">{form.formState.errors.landUnit.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Land Use *</label>
                    <select
                      {...form.register("landUse")}
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                    >
                      <option value="" className="bg-gray-800">Select land use</option>
                      <option value="residential" className="bg-gray-800">Residential</option>
                      <option value="commercial" className="bg-gray-800">Commercial</option>
                      <option value="agricultural" className="bg-gray-800">Agricultural</option>
                      <option value="industrial" className="bg-gray-800">Industrial</option>
                      <option value="mixed" className="bg-gray-800">Mixed Use</option>
                    </select>
                    {form.formState.errors.landUse && (
                      <p className="text-red-400 text-sm mt-1">{form.formState.errors.landUse.message}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Valuation & Services */}
            {currentStep === 3 && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-semibold text-[#D4AF37] mb-6 flex items-center gap-3">
                  <FileText className="w-6 h-6" />
                  Valuation & Services
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Property Value (GHS) *</label>
                    <input
                      {...form.register("propertyValue", { valueAsNumber: true })}
                      type="number"
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                      placeholder="e.g., 50000"
                    />
                    {form.formState.errors.propertyValue && (
                      <p className="text-red-400 text-sm mt-1">{form.formState.errors.propertyValue.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Purchase Date</label>
                    <input
                      {...form.register("purchaseDate")}
                      type="date"
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Services Required *</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        "Property Registration",
                        "Smart Pillar Installation", 
                        "Digital Address Assignment",
                        "Property Verification",
                        "Legal Documentation",
                        "Survey Services"
                      ].map((service) => (
                        <label key={service} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            value={service}
                            {...form.register("services")}
                            className="w-4 h-4 text-[#D4AF37] bg-white/10 border-white/20 rounded focus:ring-[#D4AF37]"
                          />
                          <span className="text-sm">{service}</span>
                        </label>
                      ))}
                    </div>
                    {form.formState.errors.services && (
                      <p className="text-red-400 text-sm mt-1">{form.formState.errors.services.message}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Additional Information */}
            {currentStep === 4 && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-semibold text-[#D4AF37] mb-6 flex items-center gap-3">
                  <Shield className="w-6 h-6" />
                  Additional Information
                </h3>
                
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Land Title Type</label>
                      <select
                        {...form.register("landTitle")}
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                      >
                        <option value="" className="bg-gray-800">Select title type</option>
                        <option value="freehold" className="bg-gray-800">Freehold</option>
                        <option value="leasehold" className="bg-gray-800">Leasehold</option>
                        <option value="customary" className="bg-gray-800">Customary</option>
                        <option value="statutory" className="bg-gray-800">Statutory</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Title Number</label>
                      <input
                        {...form.register("titleNumber")}
                        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                        placeholder="Enter title number if available"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">GPS Coordinates</label>
                    <input
                      {...form.register("coordinates")}
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                      placeholder="e.g., 5.6037, -0.1870"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Access & Utilities</label>
                    <div className="grid grid-cols-3 gap-4">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          {...form.register("waterAccess")}
                          className="w-4 h-4 text-[#D4AF37] bg-white/10 border-white/20 rounded focus:ring-[#D4AF37]"
                        />
                        <Droplets className="w-4 h-4 text-blue-400" />
                        <span className="text-sm">Water Access</span>
                      </label>
                      
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          {...form.register("roadAccess")}
                          className="w-4 h-4 text-[#D4AF37] bg-white/10 border-white/20 rounded focus:ring-[#D4AF37]"
                        />
                        <Road className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">Road Access</span>
                      </label>
                      
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          {...form.register("electricityAccess")}
                          className="w-4 h-4 text-[#D4AF37] bg-white/10 border-white/20 rounded focus:ring-[#D4AF37]"
                        />
                        <Zap className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm">Electricity</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Additional Notes</label>
                    <textarea
                      {...form.register("additionalNotes")}
                      rows={4}
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                      placeholder="Any additional information about your land..."
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 disabled:text-gray-500 text-white rounded-lg transition-colors"
              >
                Previous
              </button>
              
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold rounded-lg transition-colors"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={registerLandMutation.isPending}
                  className="px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
                >
                  {registerLandMutation.isPending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Registering...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Register Land
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}