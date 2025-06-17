import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Shield, QrCode, Smartphone, Home, MapPin, Check, Clock, User, Phone, Mail } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import PhoneInput from '../components/PhoneInput';

export default function SmartCardServiceClean() {
  const [delivery, setDelivery] = useState("home");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    address: '',
    nationalId: '',
    emergencyContact: '',
    emergencyPhone: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.nationalId.trim()) newErrors.nationalId = 'National ID is required';
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone validation (basic)
    const phoneRegex = /^[0-9+\-\s()]+$/;
    if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Generate application ID
      const newApplicationId = `ARVP-${Date.now()}`;
      
      // Prepare application data
      const applicationData = {
        ...formData,
        applicationId: newApplicationId,
        deliveryMethod: delivery,
        status: 'pending',
        submittedAt: serverTimestamp(),
        cardType: 'smart_card',
        processingFee: 50.00,
        deliveryFee: delivery === 'home' ? 15.00 : 0,
        totalAmount: delivery === 'home' ? 65.00 : 50.00
      };

      // Save to Firestore
      await addDoc(collection(db, 'smartCardApplications'), applicationData);
      
      setApplicationId(newApplicationId);
      setShowConfirmation(true);
      
      // Simulate sending notification (stub for future Firebase function)
      console.log('Application submitted:', applicationData);
      
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('There was an error submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800 text-white dark:text-gray-100">
      {/* Header Section */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex justify-center items-center gap-4 mb-6">
              <CreditCard className="w-12 h-12 text-yellow-400" />
              <h1 className="text-5xl font-bold">ARVIPOA Smart Card</h1>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A secure digital card that stores all your registered properties in one place – land, buildings, vehicles, domains, pets, intellectual property, and more.
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Features Section */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                <h3 className="text-2xl font-semibold mb-6 text-yellow-400 flex items-center gap-3">
                  <Shield className="w-6 h-6" />
                  Card Features
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Stores multiple property types securely</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>QR code verification system</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Physical & digital copy options</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Biometric & OTP access support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Tamper-proof identity binding</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Real-time property status updates</span>
                  </div>
                </div>
              </div>

              {/* Additional Benefits */}
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                <h3 className="text-xl font-semibold mb-4 text-blue-400 flex items-center gap-3">
                  <Smartphone className="w-5 h-5" />
                  Smart Features
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <QrCode className="w-4 h-4 text-yellow-400" />
                    <span>Instant Verification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-400" />
                    <span>Encrypted Storage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-blue-400" />
                    <span>Mobile Compatible</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-purple-400" />
                    <span>NFC Enabled</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Application Section */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20"
            >
              <h3 className="text-2xl font-semibold mb-6 text-yellow-400">Preview & Apply</h3>
              
              {/* Card Preview */}
              <div className="relative bg-gradient-to-r from-yellow-400 to-yellow-600 text-black rounded-xl p-6 mb-6 shadow-2xl overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-black/20 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/20 rounded-full translate-y-12 -translate-x-12"></div>
                </div>
                
                {/* Card Header */}
                <div className="relative flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-bold">ARVIPOA SMART CARD</h4>
                    <p className="text-sm opacity-80">Digital Property Verification</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <QrCode className="w-8 h-8 mb-1" />
                    <span className="text-xs">Scan Me</span>
                  </div>
                </div>

                {/* Photo Placeholder */}
                <div className="flex justify-between items-center mb-4">
                  <div className="w-16 h-20 bg-black/20 rounded border-2 border-black/30 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-8 h-8 bg-black/40 rounded-full mx-auto mb-1 flex items-center justify-center">
                        <span className="text-xs text-white">👤</span>
                      </div>
                      <span className="text-xs opacity-70">Photo</span>
                    </div>
                  </div>
                  
                  {/* Card Details */}
                  <div className="flex-1 ml-4 space-y-1 text-sm">
                    <p><strong>Name:</strong> John Doe</p>
                    <p><strong>ID:</strong> ARVP-2024-00984</p>
                    <p><strong>Properties:</strong> 3 Registered</p>
                    <p><strong>Issued:</strong> 12 June 2025</p>
                  </div>
                </div>

                {/* Property Icons */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex gap-2">
                    <div className="w-6 h-6 bg-black/20 rounded flex items-center justify-center" title="Land">
                      🏞️
                    </div>
                    <div className="w-6 h-6 bg-black/20 rounded flex items-center justify-center" title="Vehicle">
                      🚗
                    </div>
                    <div className="w-6 h-6 bg-black/20 rounded flex items-center justify-center" title="Digital Asset">
                      💎
                    </div>
                  </div>
                  <div className="text-xs opacity-70">
                    Land (Kasoa) • Vehicle (Toyota) • NFT
                  </div>
                </div>

                {/* Card Footer */}
                <div className="relative flex justify-between items-center">
                  <div className="text-xs opacity-70">
                    Valid Until: 12/2030
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-5 bg-black/20 rounded flex items-center justify-center">
                      <div className="w-4 h-3 bg-yellow-200 rounded-sm"></div>
                    </div>
                    <span className="text-xs opacity-70">NFC</span>
                  </div>
                </div>
              </div>

              {/* Application Form */}
              <AnimatePresence mode="wait">
                {!showConfirmation ? (
                  <motion.div 
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-yellow-400 mb-4 flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Personal Information
                      </h4>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <input
                            type="text"
                            placeholder="Full Name *"
                            value={formData.fullName}
                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                            className={`w-full p-3 rounded-lg bg-white/10 border text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 outline-none transition-colors ${
                              errors.fullName ? 'border-red-500' : 'border-white/20'
                            }`}
                          />
                          {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>}
                        </div>
                        
                        <div>
                          <input
                            type="text"
                            placeholder="National ID/Ghana Card Number *"
                            value={formData.nationalId}
                            onChange={(e) => handleInputChange('nationalId', e.target.value)}
                            className={`w-full p-3 rounded-lg bg-white/10 border text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 outline-none transition-colors ${
                              errors.nationalId ? 'border-red-500' : 'border-white/20'
                            }`}
                          />
                          {errors.nationalId && <p className="text-red-400 text-sm mt-1">{errors.nationalId}</p>}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <PhoneInput
                            value={formData.phoneNumber}
                            onChange={(value) => handleInputChange('phoneNumber', value)}
                            placeholder="Phone Number *"
                            required={true}
                            error={errors.phoneNumber}
                            name="phoneNumber"
                            className="smart-card-phone-input"
                          />
                        </div>
                        
                        <div>
                          <input
                            type="email"
                            placeholder="Email Address *"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className={`w-full p-3 rounded-lg bg-white/10 border text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 outline-none transition-colors ${
                              errors.email ? 'border-red-500' : 'border-white/20'
                            }`}
                          />
                          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                        </div>
                      </div>

                      <div>
                        <textarea
                          placeholder="Full Address *"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          rows={3}
                          className={`w-full p-3 rounded-lg bg-white/10 border text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 outline-none transition-colors resize-none ${
                            errors.address ? 'border-red-500' : 'border-white/20'
                          }`}
                        />
                        {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address}</p>}
                      </div>
                    </div>

                    {/* Emergency Contact */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-blue-400 mb-4 flex items-center gap-2">
                        <Phone className="w-5 h-5" />
                        Emergency Contact (Optional)
                      </h4>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Emergency Contact Name"
                          value={formData.emergencyContact}
                          onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                          className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 outline-none transition-colors"
                        />
                        
                        <PhoneInput
                          value={formData.emergencyPhone}
                          onChange={(value) => handleInputChange('emergencyPhone', value)}
                          placeholder="Emergency Contact Phone"
                          name="emergencyPhone"
                          className="smart-card-phone-input"
                        />
                      </div>
                    </div>

                    {/* Delivery Method */}
                    <div>
                      <label className="block text-white mb-3 font-medium">Delivery Method:</label>
                      <select 
                        value={delivery} 
                        onChange={e => setDelivery(e.target.value)} 
                        className="w-full p-4 rounded-xl text-black bg-white border-0 focus:ring-2 focus:ring-yellow-400 outline-none dark:bg-gray-800 dark:text-white"
                      >
                        <option value="home">🏠 Home Delivery (3-5 business days)</option>
                        <option value="pickup">🏢 Pickup at Office (Same day)</option>
                        <option value="express">⚡ Express Delivery (24 hours)</option>
                      </select>
                    </div>

                    {/* Delivery Info */}
                    <AnimatePresence>
                      {delivery === 'home' && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-blue-500/20 dark:bg-blue-500/10 p-4 rounded-xl border border-blue-500/30"
                        >
                          <div className="flex items-center gap-2 text-blue-300 dark:text-blue-400">
                            <Home className="w-4 h-4" />
                            <span className="text-sm">Delivery fee: GHS 15.00</span>
                          </div>
                        </motion.div>
                      )}

                      {delivery === 'pickup' && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-green-500/20 dark:bg-green-500/10 p-4 rounded-xl border border-green-500/30"
                        >
                          <div className="flex items-center gap-2 text-green-300 dark:text-green-400">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">Pickup Location: ARVIPOA Office, Madina</span>
                          </div>
                        </motion.div>
                      )}

                      {delivery === 'express' && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-purple-500/20 dark:bg-purple-500/10 p-4 rounded-xl border border-purple-500/30"
                        >
                          <div className="flex items-center gap-2 text-purple-300 dark:text-purple-400">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">Express fee: GHS 25.00 (Total: GHS 75.00)</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Cost Summary */}
                    <div className="bg-white/5 dark:bg-white/5 p-4 rounded-xl border border-white/10">
                      <h4 className="font-semibold text-white mb-3">Cost Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-gray-300">
                          <span>Card Processing Fee:</span>
                          <span>GHS 50.00</span>
                        </div>
                        <div className="flex justify-between text-gray-300">
                          <span>Delivery Fee:</span>
                          <span>
                            {delivery === 'pickup' ? 'FREE' : 
                             delivery === 'express' ? 'GHS 25.00' : 'GHS 15.00'}
                          </span>
                        </div>
                        <div className="border-t border-white/20 pt-2 flex justify-between font-semibold text-white">
                          <span>Total Amount:</span>
                          <span>
                            GHS {delivery === 'pickup' ? '50.00' : 
                                 delivery === 'express' ? '75.00' : '65.00'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 disabled:from-gray-500 disabled:to-gray-600 text-black font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                          Processing...
                        </>
                      ) : (
                        'Submit Application'
                      )}
                    </motion.button>

                    <div className="text-center text-sm text-gray-400 dark:text-gray-500">
                      <p>Processing time: 1-2 business days</p>
                      <p className="text-xs mt-1">* Required fields</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="confirmation"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-center space-y-6"
                  >
                    <div className="bg-green-500/20 dark:bg-green-500/10 border border-green-500/30 rounded-xl p-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                      >
                        <Check className="w-8 h-8 text-white" />
                      </motion.div>
                      
                      <h3 className="text-2xl font-bold text-green-400 dark:text-green-300 mb-4">
                        Application Received!
                      </h3>
                      
                      <div className="space-y-3 text-white">
                        <p className="text-lg">
                          Your Smart Card application has been successfully submitted.
                        </p>
                        <div className="bg-white/10 dark:bg-white/5 rounded-lg p-4">
                          <p className="font-semibold">Application ID:</p>
                          <p className="text-yellow-400 dark:text-yellow-300 font-mono text-lg">{applicationId}</p>
                        </div>
                        <p className="text-sm text-gray-300 dark:text-gray-400">
                          You'll be notified via email and SMS when your card is ready for {delivery === 'pickup' ? 'pickup' : 'delivery'}.
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="bg-white/10 dark:bg-white/5 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-400 dark:text-blue-300 mb-2">What's Next?</h4>
                        <ul className="space-y-1 text-gray-300 dark:text-gray-400">
                          <li>• Application review (1-2 business days)</li>
                          <li>• Card production (2-3 business days)</li>
                          <li>• {delivery === 'pickup' ? 'Pickup notification' : 'Delivery scheduling'}</li>
                        </ul>
                      </div>
                      
                      <div className="bg-white/10 dark:bg-white/5 rounded-lg p-4">
                        <h4 className="font-semibold text-purple-400 dark:text-purple-300 mb-2">Need Help?</h4>
                        <ul className="space-y-1 text-gray-300 dark:text-gray-400">
                          <li>• Call: +233 XX XXX XXXX</li>
                          <li>• Email: support@arvipoa.com</li>
                          <li>• Live chat: Available 24/7</li>
                        </ul>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setShowConfirmation(false);
                        setFormData({
                          fullName: '',
                          phoneNumber: '',
                          email: '',
                          address: '',
                          nationalId: '',
                          emergencyContact: '',
                          emergencyPhone: ''
                        });
                        setApplicationId('');
                      }}
                      className="bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-colors"
                    >
                      Submit Another Application
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Security Notice */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 bg-red-500/10 border border-red-500/30 p-6 rounded-xl"
          >
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-lg font-semibold text-red-400 mb-2">Security Notice</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Your ARVIPOA Smart Card contains sensitive property information. Keep it secure and report any loss immediately. 
                  The card uses advanced encryption and biometric binding to prevent unauthorized access. Never share your card details 
                  or verification codes with unauthorized persons.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}