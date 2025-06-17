import { useState, useEffect } from "react";
import { ChevronDown, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Country {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
}

const countries: Country[] = [
  { name: "Ghana", code: "GH", dialCode: "+233", flag: "🇬🇭" },
  { name: "Nigeria", code: "NG", dialCode: "+234", flag: "🇳🇬" },
  { name: "United States", code: "US", dialCode: "+1", flag: "🇺🇸" },
  { name: "United Kingdom", code: "GB", dialCode: "+44", flag: "🇬🇧" },
  { name: "Canada", code: "CA", dialCode: "+1", flag: "🇨🇦" },
  { name: "Kenya", code: "KE", dialCode: "+254", flag: "🇰🇪" },
  { name: "South Africa", code: "ZA", dialCode: "+27", flag: "🇿🇦" },
  { name: "Uganda", code: "UG", dialCode: "+256", flag: "🇺🇬" },
  { name: "Tanzania", code: "TZ", dialCode: "+255", flag: "🇹🇿" },
  { name: "Rwanda", code: "RW", dialCode: "+250", flag: "🇷🇼" },
  { name: "Ivory Coast", code: "CI", dialCode: "+225", flag: "🇨🇮" },
  { name: "Senegal", code: "SN", dialCode: "+221", flag: "🇸🇳" },
  { name: "Burkina Faso", code: "BF", dialCode: "+226", flag: "🇧🇫" },
  { name: "Mali", code: "ML", dialCode: "+223", flag: "🇲🇱" },
  { name: "Togo", code: "TG", dialCode: "+228", flag: "🇹🇬" },
  { name: "Benin", code: "BJ", dialCode: "+229", flag: "🇧🇯" },
  { name: "Guinea", code: "GN", dialCode: "+224", flag: "🇬🇳" },
  { name: "Sierra Leone", code: "SL", dialCode: "+232", flag: "🇸🇱" },
  { name: "Liberia", code: "LR", dialCode: "+231", flag: "🇱🇷" },
  { name: "Gambia", code: "GM", dialCode: "+220", flag: "🇬🇲" },
  { name: "France", code: "FR", dialCode: "+33", flag: "🇫🇷" },
  { name: "Germany", code: "DE", dialCode: "+49", flag: "🇩🇪" },
  { name: "Italy", code: "IT", dialCode: "+39", flag: "🇮🇹" },
  { name: "Spain", code: "ES", dialCode: "+34", flag: "🇪🇸" },
  { name: "Netherlands", code: "NL", dialCode: "+31", flag: "🇳🇱" },
  { name: "China", code: "CN", dialCode: "+86", flag: "🇨🇳" },
  { name: "India", code: "IN", dialCode: "+91", flag: "🇮🇳" },
  { name: "Japan", code: "JP", dialCode: "+81", flag: "🇯🇵" },
  { name: "Australia", code: "AU", dialCode: "+61", flag: "🇦🇺" },
  { name: "Brazil", code: "BR", dialCode: "+55", flag: "🇧🇷" }
];

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  label?: string;
  name?: string;
  className?: string;
}

export default function PhoneInput({
  value,
  onChange,
  placeholder = "Enter phone number",
  required = false,
  error,
  label,
  name,
  className = ""
}: PhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Initialize phone number from value prop
  useEffect(() => {
    if (value) {
      // Find country based on dial code in the value
      let foundCountry = countries[0];
      let cleanNumber = value;

      for (const country of countries) {
        if (value.startsWith(country.dialCode)) {
          foundCountry = country;
          cleanNumber = value.substring(country.dialCode.length);
          break;
        }
      }

      setSelectedCountry(foundCountry);
      setPhoneNumber(cleanNumber);
    }
  }, [value]);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
    setSearchTerm("");
    onChange(country.dialCode + phoneNumber);
  };

  const handlePhoneNumberChange = (newNumber: string) => {
    // Remove any non-numeric characters except spaces and hyphens
    const cleanNumber = newNumber.replace(/[^\d\s-]/g, "");
    setPhoneNumber(cleanNumber);
    onChange(selectedCountry.dialCode + cleanNumber);
  };

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.dialCode.includes(searchTerm) ||
    country.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Element;
    if (!target.closest('.phone-input-container')) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <Label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      
      <div className="phone-input-container relative">
        <div className="flex">
          {/* Country Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center gap-2 px-3 py-3 border border-r-0 rounded-l-lg bg-gray-50 hover:bg-gray-100 transition-colors ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <span className="text-lg">{selectedCountry.flag}</span>
              <span className="text-sm font-medium text-gray-700">{selectedCountry.dialCode}</span>
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Country Dropdown */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-64 overflow-hidden">
                {/* Search */}
                <div className="p-2 border-b">
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search countries..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Country List */}
                <div className="max-h-48 overflow-y-auto">
                  {filteredCountries.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => handleCountrySelect(country)}
                      className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-lg">{country.flag}</span>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">{country.name}</div>
                        <div className="text-xs text-gray-500">{country.dialCode}</div>
                      </div>
                      <span className="text-xs text-gray-400">{country.code}</span>
                    </button>
                  ))}
                  
                  {filteredCountries.length === 0 && (
                    <div className="px-3 py-4 text-center text-gray-500 text-sm">
                      No countries found
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Phone Number Input */}
          <Input
            id={name}
            type="tel"
            value={phoneNumber}
            onChange={(e) => handlePhoneNumberChange(e.target.value)}
            placeholder={placeholder}
            className={`rounded-l-none border-l-0 h-12 ${error ? 'border-red-500' : ''}`}
          />
        </div>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
        
        <div className="text-xs text-gray-500 mt-1">
          Format: {selectedCountry.dialCode} followed by local number
        </div>
      </div>
    </div>
  );
}