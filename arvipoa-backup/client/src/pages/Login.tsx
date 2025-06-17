import { useState } from "react";
import { 
  signInWithEmailAndPassword,
  signInWithPopup, 
  GoogleAuthProvider, 
  FacebookAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Phone, Eye, EyeOff, ArrowLeft } from "lucide-react";
import VideoBlogSection from "../components/VideoBlogSection";
import PhoneInput from "../components/PhoneInput";

export default function Login() {
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [formData, setFormData] = useState({ 
    email: "", 
    phone: "", 
    password: "", 
    otp: "" 
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationId, setVerificationId] = useState("");
  const [recaptchaVerifier, setRecaptchaVerifier] = useState<RecaptchaVerifier | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const setupRecaptcha = () => {
    if (!recaptchaVerifier) {
      const verifier = new RecaptchaVerifier(auth, 'recaptcha-container-login', {
        'size': 'invisible',
        'callback': () => {
          // reCAPTCHA solved
        }
      });
      setRecaptchaVerifier(verifier);
      return verifier;
    }
    return recaptchaVerifier;
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const verifier = setupRecaptcha();
      const confirmationResult = await signInWithPhoneNumber(auth, formData.phone, verifier);
      setVerificationId(confirmationResult.verificationId);
      setStep('otp');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOTPVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const credential = PhoneAuthProvider.credential(verificationId, formData.otp);
      await signInWithCredential(auth, credential);
      navigate("/");
    } catch (err: any) {
      setError("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    setLoading(true);
    setError("");

    try {
      let authProvider;
      if (provider === 'google') {
        authProvider = new GoogleAuthProvider();
      } else {
        authProvider = new FacebookAuthProvider();
      }
      
      await signInWithPopup(auth, authProvider);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStep('form');
    setFormData({ email: "", phone: "", password: "", otp: "" });
    setError("");
    setVerificationId("");
  };

  if (step === 'otp') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#002b1d] to-black px-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
          <button 
            onClick={resetForm}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-green-800">Verify Your Phone</h2>
            <p className="text-gray-600 mt-2">Enter the 6-digit code sent to {formData.phone}</p>
          </div>

          <form onSubmit={handleOTPVerification} className="space-y-6">
            <input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              placeholder="Enter 6-digit code"
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none text-center text-2xl tracking-widest"
              maxLength={6}
              required
            />
            
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            
            <button 
              type="submit" 
              disabled={loading || formData.otp.length !== 6}
              className="w-full bg-green-700 text-white py-4 rounded-xl hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
              {loading ? "Verifying..." : "Verify Code"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 relative">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-xl animate-float"></div>
          <div className="absolute top-40 right-16 w-24 h-24 bg-blue-400/10 rounded-full blur-lg animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-green-400/10 rounded-full blur-lg animate-float delay-2000"></div>
          <div className="absolute bottom-40 right-1/3 w-20 h-20 bg-purple-400/10 rounded-full blur-md animate-pulse delay-3000"></div>
        </div>

        <div className="relative glass-effect p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/20 animate-scale-in">
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="relative inline-block mb-4">
            <div className="absolute -inset-3 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-full blur-lg opacity-30 animate-glow"></div>
            <h2 className="relative text-4xl font-bold text-white">Welcome Back</h2>
          </div>
          <h3 className="text-xl font-semibold text-gradient-gold mb-2">Sign in to ARVIPOA</h3>
          <p className="text-gray-300">Access your smart property platform</p>
        </div>

        {/* Auth Method Toggle */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          <button
            onClick={() => setAuthMethod('email')}
            className={`flex-1 flex items-center justify-center py-3 px-4 rounded-lg transition-colors ${
              authMethod === 'email' 
                ? 'bg-white text-green-700 shadow-sm' 
                : 'text-gray-600'
            }`}
          >
            <Mail className="w-4 h-4 mr-2" />
            Email
          </button>
          <button
            onClick={() => setAuthMethod('phone')}
            className={`flex-1 flex items-center justify-center py-3 px-4 rounded-lg transition-colors ${
              authMethod === 'phone' 
                ? 'bg-white text-green-700 shadow-sm' 
                : 'text-gray-600'
            }`}
          >
            <Phone className="w-4 h-4 mr-2" />
            Phone
          </button>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={() => handleSocialLogin('google')}
            disabled={loading}
            className="w-full flex items-center justify-center py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-colors disabled:opacity-50"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <button
            onClick={() => handleSocialLogin('facebook')}
            disabled={loading}
            className="w-full flex items-center justify-center py-3 px-4 bg-[#1877F2] text-white rounded-xl hover:bg-[#166FE5] transition-colors disabled:opacity-50"
          >
            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Continue with Facebook
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">Or sign in with {authMethod}</span>
          </div>
        </div>

        {/* Email/Phone Form */}
        <form onSubmit={authMethod === 'email' ? handleEmailLogin : handlePhoneAuth} className="space-y-4">
          {authMethod === 'email' ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
              required
            />
          ) : (
            <PhoneInput
              value={formData.phone}
              onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
              placeholder="Phone number"
              required={true}
              name="phone"
            />
          )}

          {authMethod === 'email' && (
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-green-700 text-white py-4 rounded-xl hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            {loading ? "Please wait..." : (
              authMethod === 'email' 
                ? "Sign In"
                : "Send Verification Code"
            )}
          </button>
        </form>

        {authMethod === 'email' && (
          <div className="text-center mt-4">
            <Link to="/forgot-password" className="text-green-700 hover:text-green-800 text-sm">
              Forgot your password?
            </Link>
          </div>
        )}

        {/* Toggle to Signup */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don't have an account? 
            <Link to="/signup" className="text-green-700 hover:text-green-800 font-semibold ml-1">
              Sign up
            </Link>
          </p>
        </div>

        <div id="recaptcha-container-login"></div>
        </div>
      </div>

      {/* Right Side - Video Blog Section */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-2/5">
        <VideoBlogSection />
      </div>
    </div>
  );
}