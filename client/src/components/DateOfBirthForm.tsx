import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, FileText, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import CountrySelect from "./CountrySelect";
import PhoneInput from "./PhoneInput";

const ghanaRegions = [
  "Greater Accra", "Ashanti", "Western", "Central", "Volta", "Eastern",
  "Northern", "Upper East", "Upper West", "Brong-Ahafo", "Western North",
  "Ahafo", "Bono", "Bono East", "Oti", "Savannah", "North East"
];

const districtsByRegion: Record<string, string[]> = {
  "Greater Accra": [
    "Accra Metropolitan", "Tema Metropolitan", "Ga East Municipal", "Ga West Municipal",
    "Ga Central Municipal", "Ga South Municipal", "Ledzokuku Municipal", "Krowor Municipal",
    "Adentan Municipal", "Ashaiman Municipal", "La Nkwantanang Madina Municipal",
    "La Dade Kotopon Municipal", "Ablekuma North Municipal", "Ablekuma Central Municipal",
    "Ablekuma West Municipal", "Okaikwei North Municipal"
  ],
  "Ashanti": [
    "Kumasi Metropolitan", "Obuasi Municipal", "Ejisu Municipal", "Asante Akim North Municipal",
    "Asante Akim South Municipal", "Atwima Nwabiagya Municipal", "Atwima Kwanwoma",
    "Atwima Mponua", "Afigya Kwabre South", "Afigya Kwabre North", "Bosomtwe",
    "Ahafo Ano North Municipal", "Ahafo Ano South West", "Adansi North", "Adansi South"
  ],
  "Western": [
    "Sekondi-Takoradi Metropolitan", "Shama", "Ahanta West Municipal", "Nzema East Municipal",
    "Ellembelle", "Jomoro", "Wassa East", "Wassa Amenfi West Municipal", "Wassa Amenfi Central Municipal",
    "Wassa Amenfi East Municipal", "Mpohor", "Tarkwa-Nsuaem Municipal", "Prestea Huni Valley Municipal"
  ],
  "Central": [
    "Cape Coast Metropolitan", "Elmina", "Komenda Edina Eguafo Abirem Municipal",
    "Abura Asebu Kwamankese", "Mfantsiman Municipal", "Awutu Senya East Municipal",
    "Awutu Senya West", "Effutu Municipal", "Gomoa East", "Gomoa Central",
    "Gomoa West", "Assin North Municipal", "Assin Central Municipal", "Assin South",
    "Ajumako Enyan Esiam", "Twifo Atti Mokwa", "Twifo Hemang Lower Denkyira",
    "Upper Denkyira East Municipal", "Upper Denkyira West"
  ],
  "Volta": [
    "Ho Municipal", "Hohoe Municipal", "Keta Municipal", "Ketu North Municipal",
    "Ketu South Municipal", "Akatsi North", "Akatsi South", "Central Tongu",
    "North Tongu", "South Tongu", "Adaklu", "Agotime Ziope", "Ve Golokwati",
    "Afadzato South", "Biakoye", "Jasikan", "Kadjebi", "Krachi East Municipal",
    "Krachi Nchumuru", "Krachi West", "Nkwanta North", "Nkwanta South Municipal"
  ],
  "Eastern": [
    "New Juaben Municipal", "Koforidua", "Akuapem North Municipal", "Akuapem South",
    "Yilo Krobo Municipal", "Lower Manya Krobo Municipal", "Upper Manya Krobo",
    "Asuogyaman", "West Akim Municipal", "East Akim Municipal", "Atiwa East",
    "Atiwa West", "Kwahu East", "Kwahu West Municipal", "Kwahu South",
    "Kwahu Afram Plains North", "Kwahu Afram Plains South", "Fanteakwa North",
    "Fanteakwa South", "Denkyembour", "Birim North", "Birim Central Municipal",
    "Birim South", "Akyemansa", "Asene Manso Akroso", "Upper West Akim"
  ],
  "Northern": [
    "Tamale Metropolitan", "Sagnarigu Municipal", "Gushegu Municipal", "Karaga",
    "Kumbungu", "Nanton", "Savelugu Municipal", "Tolon", "Zabzugu", "Tatale Sanguli",
    "Yendi Municipal", "Mion", "Nanumba North Municipal", "Nanumba South"
  ],
  "Upper East": [
    "Bolgatanga Municipal", "Talensi", "Nabdam", "Bongo", "Kassena Nankana West",
    "Kassena Nankana Municipal", "Builsa North Municipal", "Builsa South",
    "Binduri", "Bawku Municipal", "Bawku West", "Garu", "Tempane", "Pusiga"
  ],
  "Upper West": [
    "Wa Municipal", "Wa East", "Wa West", "Nadowli Kaleo", "Daffiama Bussie Issa",
    "Sissala East Municipal", "Sissala West", "Jirapa Municipal", "Lambussie Karni",
    "Lawra Municipal", "Nandom Municipal"
  ],
  "Brong-Ahafo": [
    "Sunyani Municipal", "Techiman Municipal", "Berekum Municipal", "Dormaa Municipal",
    "Nkoranza Municipal", "Kintampo Municipal", "Wenchi Municipal", "Atebubu Amantin Municipal",
    "Banda", "Tain", "Asutifi North", "Asutifi South", "Asunafo North Municipal",
    "Asunafo South", "Jaman North", "Jaman South Municipal"
  ],
  "Western North": [
    "Sefwi Wiawso Municipal", "Bibiani Anhwiaso Bekwai Municipal", "Bodi", "Juaboso",
    "Bia East", "Bia West", "Akontombra", "Suaman"
  ],
  "Ahafo": [
    "Goaso Municipal", "Bechem", "Kenyase No. 1", "Kukuom", "Mim", "Sankore",
    "Techiman North", "Tano North Municipal", "Asutifi North", "Asutifi South"
  ],
  "Bono": [
    "Sunyani Municipal", "Dormaa Municipal", "Berekum Municipal", "Wenchi Municipal",
    "Techiman Municipal", "Kintampo Municipal", "Nkoranza Municipal", "Atebubu Amantin Municipal"
  ],
  "Bono East": [
    "Techiman Municipal", "Kintampo Municipal", "Nkoranza Municipal", "Atebubu Amantin Municipal",
    "Pru East", "Pru West", "Sene East", "Sene West", "Kintampo North Municipal",
    "Kintampo South", "Banda"
  ],
  "Oti": [
    "Dambai", "Kete Krachi", "Nkwanta South Municipal", "Krachi East Municipal",
    "Krachi West", "Krachi Nchumuru", "Nkwanta North", "Biakoye"
  ],
  "Savannah": [
    "Damongo", "Bole Municipal", "Sawla Tuna Kalba", "West Gonja Municipal",
    "East Gonja Municipal", "North Gonja", "Central Gonja"
  ],
  "North East": [
    "Nalerigu", "Gambaga", "Walewale", "Chereponi", "East Mamprusi Municipal",
    "West Mamprusi Municipal", "Mamprugu Moagduri", "Yunyoo Nasuan"
  ]
};

const townsByDistrict: Record<string, string[]> = {
  // Greater Accra Region
  "Accra Metropolitan": ["Accra", "Osu", "Labadi", "Dansoman", "Kaneshie", "Asylum Down", "Airport", "Adabraka", "Ring Road", "Dzorwulu"],
  "Tema Metropolitan": ["Tema", "Sakumono", "Michel Camp", "Ashaiman Road", "Community 1", "Community 2", "Community 3", "Community 4", "Community 5"],
  "Ga East Municipal": ["Abokobi", "Dome", "Taifa", "Brekuso", "Amrahia", "Pantang", "Madina", "Adenta", "Frafraha"],
  "Ga West Municipal": ["Amasaman", "Pokuase", "Ofankor", "Ablekuma", "Anyaa", "Sowutuom", "Santa Maria"],
  "Ga Central Municipal": ["Sowutuom", "Ablekuma", "Odorkor", "Kaneshie", "Russia", "Abossey Okai"],
  "Ga South Municipal": ["Weija", "Gbawe", "Mallam", "Tetegu", "Bortianor", "Kokrobite"],
  "Ledzokuku Municipal": ["Teshie", "Nungua", "Krowor", "Baatsona", "Spintex"],
  "Krowor Municipal": ["Nungua", "Teshie", "Baatsona", "Lashibi", "Klagon"],
  "Adentan Municipal": ["Adenta", "Frafraha", "Ashiyie", "Gbentanaa", "Amrahia"],
  "Ashaiman Municipal": ["Ashaiman", "Tulaku", "Lebanon", "Valco Flats", "Zenu"],
  
  // Ashanti Region
  "Kumasi Metropolitan": ["Kumasi", "Bantama", "Suame", "Asokwa", "Oforikrom", "Kwadaso", "Adum", "Kejetia", "Nhyiaeso"],
  "Obuasi Municipal": ["Obuasi", "Tutuka", "Akrofuom", "Nhyiaeso", "Sanso", "Bediem", "Adansi"],
  "Ejisu Municipal": ["Ejisu", "Juaben", "Bonwire", "Besease", "Kramang"],
  "Asante Akim North Municipal": ["Agogo", "Hwidiem", "Dompem", "Wioso", "Akyem Tafo"],
  "Asante Akim South Municipal": ["Juaso", "Obogu", "Bompata", "Twedie", "Asante Akim"],
  
  // Western Region
  "Sekondi-Takoradi Metropolitan": ["Sekondi", "Takoradi", "Essikado", "Ketan", "Kojokrom", "New Takoradi", "Effiakuma"],
  "Tarkwa-Nsuaem Municipal": ["Tarkwa", "Nsuaem", "Akoon", "Nsuta", "Bogoso", "Huni Valley"],
  "Shama": ["Shama", "Beposo", "Daboase", "Inchaban", "Essipon"],
  "Ahanta West Municipal": ["Agona", "Busua", "Dixcove", "Cape Three Points", "Apowa"],
  
  // Central Region
  "Cape Coast Metropolitan": ["Cape Coast", "Elmina", "Pedu", "Abura", "University of Cape Coast"],
  "Komenda Edina Eguafo Abirem Municipal": ["Komenda", "Elmina", "Eguafo", "Abirem", "Kissi"],
  "Mfantsiman Municipal": ["Saltpond", "Anomabo", "Mankessim", "Yamoransa", "Abandze"],
  "Awutu Senya East Municipal": ["Kasoa", "Budumburam", "Ofaakor", "Bawjiase", "Obom"],
  
  // Volta Region
  "Ho Municipal": ["Ho", "Kpedze", "Sokode", "Takla", "Klefe"],
  "Hohoe Municipal": ["Hohoe", "Gbledi", "Alavanyo", "Likpe", "Santrokofi"],
  "Keta Municipal": ["Keta", "Anloga", "Dzita", "Vodza", "Tegbi"],
  "Ketu North Municipal": ["Dzodze", "Penyi", "Weta", "Afife", "Agbozume"],
  
  // Eastern Region
  "New Juaben Municipal": ["Koforidua", "Effiduase", "Asokore", "Oyoko", "Suhum"],
  "Akuapem North Municipal": ["Akropong", "Aburi", "Larteh", "Mamfe", "Tutu"],
  "Yilo Krobo Municipal": ["Somanya", "Odumase Krobo", "Kpong", "Atimpoku", "Akorley"],
  
  // Northern Region
  "Tamale Metropolitan": ["Tamale", "Gumbihini", "Kalpohin", "Dakpema Palace", "Vittin"],
  "Sagnarigu Municipal": ["Sagnarigu", "Dungu", "Voggu", "Kalinka", "Zogbeli"],
  "Yendi Municipal": ["Yendi", "Bimbagu", "Sunson", "Gbungbaliga", "Zakpalsi"],
  
  // Upper East Region
  "Bolgatanga Municipal": ["Bolgatanga", "Tongo", "Sherigu", "Yorogo", "Gambibgo"],
  "Bawku Municipal": ["Bawku", "Zebilla", "Pusiga", "Garu", "Tempane"],
  "Kassena Nankana Municipal": ["Navrongo", "Kayoro", "Chiana", "Sirigu", "Paga"],
  
  // Upper West Region
  "Wa Municipal": ["Wa", "Kperisi", "Sing", "Busa", "Charia"],
  "Jirapa Municipal": ["Jirapa", "Hain", "Tuggo", "Yaga", "Puffein"],
  "Lawra Municipal": ["Lawra", "Nandom", "Hamile", "Babile", "Eremon"],
  
  // Default towns for districts not specifically listed
  "Default": ["Main Town", "Market Area", "Central District", "New Town", "Old Town", "Commercial Area", "Residential Area"]
};

const witnessRelationships = [
  "Father", "Mother", "Sibling", "Spouse", "Daughter", "Son", 
  "Aunt", "Uncle", "Cousin", "Friend", "Colleague", "Neighbor", "Other"
];

const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia",
  "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium",
  "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei",
  "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde",
  "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", 
  "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica",
  "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia",
  "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany",
  "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras",
  "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
  "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos",
  "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania",
  "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco",
  "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua",
  "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau",
  "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines",
  "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles",
  "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa",
  "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland",
  "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga",
  "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine",
  "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu",
  "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

export default function DateOfBirthForm() {
  const [formData, setFormData] = useState({
    dateOfBirth: "",
    placeOfBirth: "",
    isGhanaian: true,
    ghanaRegion: "",
    ghanaDistrict: "",
    ghanaTown: "",
    ghanaLocality: "",
    foreignCountry: "",
    foreignCity: "",
    fatherName: "",
    fatherAlive: "",
    motherName: "",
    motherAlive: "",
    birthCertNumber: "",
    witnessRelationship: "",
    witnessOtherRelation: "",
    witnessPhone: "",
    witnessEmail: "",
    otp: ""
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      // Reset dependent fields when region changes
      if (field === "ghanaRegion") {
        newData.ghanaDistrict = "";
        newData.ghanaTown = "";
      }
      
      // Reset town when district changes
      if (field === "ghanaDistrict") {
        newData.ghanaTown = "";
      }
      
      return newData;
    });
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const sendDeclarationRequest = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.witnessRelationship) {
      newErrors.witnessRelationship = "Please select witness relationship";
    }
    if (!formData.witnessPhone && !formData.witnessEmail) {
      newErrors.witnessContact = "Please provide either phone number or email";
    }
    if (formData.witnessPhone && !/^\+?[\d\s-()]+$/.test(formData.witnessPhone)) {
      newErrors.witnessPhone = "Please enter a valid phone number";
    }
    if (formData.witnessEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.witnessEmail)) {
      newErrors.witnessEmail = "Please enter a valid email address";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(prev => ({ ...prev, ...newErrors }));
      return;
    }
    
    setOtpSent(true);
  };

  const verifyOtp = () => {
    if (!formData.otp) {
      setErrors(prev => ({ ...prev, otp: "Please enter OTP" }));
      return;
    }
    setIsVerified(true);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.placeOfBirth) newErrors.placeOfBirth = "Place of birth is required";
    if (!formData.fatherName) newErrors.fatherName = "Father's name is required";
    if (!formData.motherName) newErrors.motherName = "Mother's name is required";
    if (!formData.fatherAlive) newErrors.fatherAlive = "Please indicate if father is alive";
    if (!formData.motherAlive) newErrors.motherAlive = "Please indicate if mother is alive";

    if (formData.isGhanaian) {
      if (!formData.ghanaRegion) newErrors.ghanaRegion = "Region is required";
      if (!formData.ghanaDistrict) newErrors.ghanaDistrict = "District is required";
      if (!formData.ghanaTown) newErrors.ghanaTown = "Town is required";
    } else {
      if (!formData.foreignCountry) newErrors.foreignCountry = "Country is required";
      if (!formData.foreignCity) newErrors.foreignCity = "City is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Date of Birth form submitted:", formData);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6"
    >
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="text-center border-b bg-gradient-to-r from-[#D4AF37]/10 to-[#FFD700]/10">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-full">
              <Calendar className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">Date of Birth Information</CardTitle>
          <CardDescription className="text-gray-600">
            Complete your birth information and verification details
          </CardDescription>
        </CardHeader>

        <CardContent className="p-8 space-y-8">
          {/* Basic Birth Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-700">
                Date of Birth *
              </Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                className={`h-12 ${errors.dateOfBirth ? 'border-red-500' : ''}`}
              />
              {errors.dateOfBirth && (
                <p className="text-sm text-red-500">{errors.dateOfBirth}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="placeOfBirth" className="text-sm font-medium text-gray-700">
                Place of Birth *
              </Label>
              <Input
                id="placeOfBirth"
                value={formData.placeOfBirth}
                onChange={(e) => handleInputChange("placeOfBirth", e.target.value)}
                className={`h-12 ${errors.placeOfBirth ? 'border-red-500' : ''}`}
                placeholder="Enter place of birth"
              />
              {errors.placeOfBirth && (
                <p className="text-sm text-red-500">{errors.placeOfBirth}</p>
              )}
            </div>
          </div>

          {/* Nationality Selection */}
          <div className="space-y-4">
            <Label className="text-sm font-medium text-gray-700">Nationality</Label>
            <div className="flex gap-4">
              <Button
                type="button"
                variant={formData.isGhanaian ? "default" : "outline"}
                onClick={() => handleInputChange("isGhanaian", "true")}
                className="flex-1"
              >
                Ghanaian
              </Button>
              <Button
                type="button"
                variant={!formData.isGhanaian ? "default" : "outline"}
                onClick={() => handleInputChange("isGhanaian", "false")}
                className="flex-1"
              >
                Foreigner
              </Button>
            </div>
          </div>

          {/* Location Details */}
          {formData.isGhanaian ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#D4AF37]" />
                Ghana Location Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ghanaRegion" className="text-sm font-medium text-gray-700">
                    Region *
                  </Label>
                  <Select
                    value={formData.ghanaRegion}
                    onValueChange={(value) => handleInputChange("ghanaRegion", value)}
                  >
                    <SelectTrigger className={`h-12 ${errors.ghanaRegion ? 'border-red-500' : ''}`}>
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      {ghanaRegions.map((region) => (
                        <SelectItem key={region} value={region}>
                          {region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.ghanaRegion && (
                    <p className="text-sm text-red-500">{errors.ghanaRegion}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ghanaDistrict" className="text-sm font-medium text-gray-700">
                    Metro/Municipal/District *
                  </Label>
                  <Select
                    value={formData.ghanaDistrict}
                    onValueChange={(value) => handleInputChange("ghanaDistrict", value)}
                    disabled={!formData.ghanaRegion}
                  >
                    <SelectTrigger className={`h-12 ${errors.ghanaDistrict ? 'border-red-500' : ''}`}>
                      <SelectValue placeholder={formData.ghanaRegion ? "Select district" : "Select region first"} />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.ghanaRegion && districtsByRegion[formData.ghanaRegion]?.map((district) => (
                        <SelectItem key={district} value={district}>
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.ghanaDistrict && (
                    <p className="text-sm text-red-500">{errors.ghanaDistrict}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ghanaTown" className="text-sm font-medium text-gray-700">
                    Town *
                  </Label>
                  <Select
                    value={formData.ghanaTown}
                    onValueChange={(value) => handleInputChange("ghanaTown", value)}
                    disabled={!formData.ghanaDistrict}
                  >
                    <SelectTrigger className={`h-12 ${errors.ghanaTown ? 'border-red-500' : ''}`}>
                      <SelectValue placeholder={formData.ghanaDistrict ? "Select town" : "Select district first"} />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.ghanaDistrict && (
                        townsByDistrict[formData.ghanaDistrict] || townsByDistrict["Default"]
                      )?.map((town) => (
                        <SelectItem key={town} value={town}>
                          {town}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.ghanaTown && (
                    <p className="text-sm text-red-500">{errors.ghanaTown}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ghanaLocality" className="text-sm font-medium text-gray-700">
                    Locality
                  </Label>
                  <Input
                    id="ghanaLocality"
                    value={formData.ghanaLocality}
                    onChange={(e) => handleInputChange("ghanaLocality", e.target.value)}
                    className="h-12"
                    placeholder="Enter locality"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#D4AF37]" />
                Foreign Location Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="foreignCountry" className="text-sm font-medium text-gray-700">
                    Country *
                  </Label>
                  <Select
                    value={formData.foreignCountry}
                    onValueChange={(value) => handleInputChange("foreignCountry", value)}
                  >
                    <SelectTrigger className={`h-12 ${errors.foreignCountry ? 'border-red-500' : ''}`}>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.foreignCountry && (
                    <p className="text-sm text-red-500">{errors.foreignCountry}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="foreignCity" className="text-sm font-medium text-gray-700">
                    City *
                  </Label>
                  <Input
                    id="foreignCity"
                    value={formData.foreignCity}
                    onChange={(e) => handleInputChange("foreignCity", e.target.value)}
                    className={`h-12 ${errors.foreignCity ? 'border-red-500' : ''}`}
                    placeholder="Enter city"
                  />
                  {errors.foreignCity && (
                    <p className="text-sm text-red-500">{errors.foreignCity}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Parents Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Users className="w-5 h-5 text-[#D4AF37]" />
              Parents Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fatherName" className="text-sm font-medium text-gray-700">
                    Father's Name *
                  </Label>
                  <Input
                    id="fatherName"
                    value={formData.fatherName}
                    onChange={(e) => handleInputChange("fatherName", e.target.value)}
                    className={`h-12 ${errors.fatherName ? 'border-red-500' : ''}`}
                    placeholder="Enter father's name"
                  />
                  {errors.fatherName && (
                    <p className="text-sm text-red-500">{errors.fatherName}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Father Alive *</Label>
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant={formData.fatherAlive === "yes" ? "default" : "outline"}
                      onClick={() => handleInputChange("fatherAlive", "yes")}
                      className="flex-1"
                    >
                      Yes
                    </Button>
                    <Button
                      type="button"
                      variant={formData.fatherAlive === "no" ? "default" : "outline"}
                      onClick={() => handleInputChange("fatherAlive", "no")}
                      className="flex-1"
                    >
                      No
                    </Button>
                  </div>
                  {errors.fatherAlive && (
                    <p className="text-sm text-red-500">{errors.fatherAlive}</p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="motherName" className="text-sm font-medium text-gray-700">
                    Mother's Name *
                  </Label>
                  <Input
                    id="motherName"
                    value={formData.motherName}
                    onChange={(e) => handleInputChange("motherName", e.target.value)}
                    className={`h-12 ${errors.motherName ? 'border-red-500' : ''}`}
                    placeholder="Enter mother's name"
                  />
                  {errors.motherName && (
                    <p className="text-sm text-red-500">{errors.motherName}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Mother Alive *</Label>
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant={formData.motherAlive === "yes" ? "default" : "outline"}
                      onClick={() => handleInputChange("motherAlive", "yes")}
                      className="flex-1"
                    >
                      Yes
                    </Button>
                    <Button
                      type="button"
                      variant={formData.motherAlive === "no" ? "default" : "outline"}
                      onClick={() => handleInputChange("motherAlive", "no")}
                      className="flex-1"
                    >
                      No
                    </Button>
                  </div>
                  {errors.motherAlive && (
                    <p className="text-sm text-red-500">{errors.motherAlive}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Birth Certificate Verification */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#D4AF37]" />
              Date of Birth Verification
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="birthCertNumber" className="text-sm font-medium text-gray-700">
                  Birth Certificate Number
                </Label>
                <Input
                  id="birthCertNumber"
                  value={formData.birthCertNumber}
                  onChange={(e) => handleInputChange("birthCertNumber", e.target.value)}
                  className="h-12"
                  placeholder="Enter birth certificate number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthCert" className="text-sm font-medium text-gray-700">
                  Upload Birth Certificate
                </Label>
                <Input
                  id="birthCert"
                  type="file"
                  onChange={handleFileUpload}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="h-12"
                />
                {uploadedFile && (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <Check className="w-4 h-4" />
                    File uploaded: {uploadedFile.name}
                  </div>
                )}
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Upload birth certificate or send a declaration request to a witness to fully verify this portion of your profile
                </AlertDescription>
              </Alert>
            </div>
          </div>

          {/* Witness Verification */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Witness Verification</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="witnessRelationship" className="text-sm font-medium text-gray-700">
                  Witness Relationship
                </Label>
                <Select
                  value={formData.witnessRelationship}
                  onValueChange={(value) => handleInputChange("witnessRelationship", value)}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    {witnessRelationships.map((relationship) => (
                      <SelectItem key={relationship} value={relationship.toLowerCase()}>
                        {relationship}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.witness && (
                  <p className="text-sm text-red-500">{errors.witness}</p>
                )}
              </div>

              {formData.witnessRelationship === "other" && (
                <div className="space-y-2">
                  <Label htmlFor="witnessOtherRelation" className="text-sm font-medium text-gray-700">
                    Please Specify Relationship
                  </Label>
                  <Input
                    id="witnessOtherRelation"
                    value={formData.witnessOtherRelation}
                    onChange={(e) => handleInputChange("witnessOtherRelation", e.target.value)}
                    className="h-12"
                    placeholder="Specify relationship"
                  />
                </div>
              )}

              {/* Witness Contact Information */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800">Witness Contact Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <PhoneInput
                      value={formData.witnessPhone}
                      onChange={(value) => handleInputChange("witnessPhone", value)}
                      placeholder="Enter witness phone number"
                      label="Witness Phone Number"
                      error={errors.witnessPhone}
                      name="witnessPhone"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="witnessEmail" className="text-sm font-medium text-gray-700">
                      Witness Email Address
                    </Label>
                    <Input
                      id="witnessEmail"
                      type="email"
                      value={formData.witnessEmail}
                      onChange={(e) => handleInputChange("witnessEmail", e.target.value)}
                      className={`h-12 ${errors.witnessEmail ? 'border-red-500' : ''}`}
                      placeholder="Enter witness email address"
                    />
                    {errors.witnessEmail && (
                      <p className="text-sm text-red-500">{errors.witnessEmail}</p>
                    )}
                  </div>
                </div>
                
                {errors.witnessContact && (
                  <p className="text-sm text-red-500">{errors.witnessContact}</p>
                )}
                
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Please provide at least one contact method (phone or email) for the witness. 
                    The witness will receive an OTP code to verify this birth certificate information.
                  </p>
                </div>
              </div>

              <Button
                onClick={sendDeclarationRequest}
                disabled={!formData.witnessRelationship || otpSent}
                className="w-full"
              >
                {otpSent ? "Declaration Request Sent" : "Send Declaration Request to Witness"}
              </Button>

              {otpSent && (
                <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Message to witness: Please you have been invited by account owner to witness this document portion. 
                      This message is accompanied with an OTP, please kindly provide this OTP to be entered on this page.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="flex gap-4">
                    <div className="flex-1 space-y-2">
                      <Label htmlFor="otp" className="text-sm font-medium text-gray-700">
                        Enter OTP from Witness
                      </Label>
                      <Input
                        id="otp"
                        value={formData.otp}
                        onChange={(e) => handleInputChange("otp", e.target.value)}
                        className={`h-12 ${errors.otp ? 'border-red-500' : ''}`}
                        placeholder="Enter OTP"
                      />
                      {errors.otp && (
                        <p className="text-sm text-red-500">{errors.otp}</p>
                      )}
                    </div>
                    <Button
                      onClick={verifyOtp}
                      disabled={!formData.otp || isVerified}
                      className="mt-7"
                    >
                      {isVerified ? "Verified" : "Verify OTP"}
                    </Button>
                  </div>

                  {isVerified && (
                    <div className="flex items-center gap-2 text-green-600">
                      <Check className="w-4 h-4" />
                      <span className="text-sm font-medium">Witness verification completed</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="bg-gray-50 border-t p-6">
          <Button
            onClick={handleSubmit}
            className="w-full h-12 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] hover:from-[#B8941F] hover:to-[#E6C200] text-white font-semibold text-lg"
          >
            Submit Date of Birth Information
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}