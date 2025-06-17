import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";

interface Country {
  name: string;
  flag: string;
}

interface CountrySelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  name?: string;
  showDualOption?: boolean;
}

const countries: Country[] = [
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

export default function CountrySelect({ 
  value, 
  onChange, 
  placeholder = "Select nationality", 
  required = false, 
  error, 
  name,
  showDualOption = false 
}: CountrySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedCountries = showDualOption 
    ? [{ name: "Dual/Multiple", flag: "🌍" }, ...filteredCountries]
    : filteredCountries;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setIsOpen(true);
        setHighlightedIndex(0);
      } else if (e.key.length === 1) {
        // Start typing to search
        setSearchTerm(e.key);
        setIsOpen(true);
        setHighlightedIndex(0);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < displayedCountries.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : displayedCountries.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < displayedCountries.length) {
          handleSelect(displayedCountries[highlightedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSearchTerm("");
        setHighlightedIndex(-1);
        inputRef.current?.blur();
        break;
      default:
        if (e.key.length === 1) {
          setSearchTerm(prev => prev + e.key);
          setHighlightedIndex(0);
        } else if (e.key === "Backspace") {
          setSearchTerm(prev => prev.slice(0, -1));
          setHighlightedIndex(0);
        }
        break;
    }
  };

  const handleSelect = (country: Country) => {
    onChange(country.name);
    setIsOpen(false);
    setSearchTerm("");
    setHighlightedIndex(-1);
  };

  const getDisplayValue = () => {
    if (!value) return "";
    if (value === "Dual/Multiple") return "🌍 Dual/Multiple Nationality";
    const country = countries.find(c => c.name === value);
    return country ? `${country.flag} ${country.name}` : value;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className={`w-full p-3 border-2 rounded-xl cursor-pointer flex items-center justify-between transition-colors ${
          error ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#D4AF37]'
        } ${isOpen ? 'border-[#D4AF37]' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        ref={inputRef}
      >
        <span className={value ? "text-gray-900" : "text-gray-500"}>
          {getDisplayValue() || placeholder}
        </span>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-hidden">
          {/* Search input */}
          <div className="p-3 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setHighlightedIndex(0);
                }}
                placeholder="Type to search countries..."
                className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37]"
                autoFocus
              />
            </div>
          </div>

          {/* Options list */}
          <div className="max-h-48 overflow-y-auto">
            {displayedCountries.length === 0 ? (
              <div className="p-3 text-gray-500 text-center">
                No countries found matching "{searchTerm}"
              </div>
            ) : (
              displayedCountries.map((country, index) => (
                <div
                  key={country.name}
                  className={`p-3 cursor-pointer flex items-center hover:bg-gray-50 transition-colors ${
                    index === highlightedIndex ? 'bg-blue-50 text-blue-700' : ''
                  } ${value === country.name ? 'bg-[#D4AF37]/10 text-[#D4AF37] font-medium' : ''}`}
                  onClick={() => handleSelect(country)}
                >
                  <span className="text-lg mr-3">{country.flag}</span>
                  <span>{country.name}</span>
                  {country.name === "Dual/Multiple" && (
                    <span className="ml-auto text-sm text-gray-500">Multiple citizenships</span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}