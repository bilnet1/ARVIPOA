import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Send, Coins, Globe, Receipt, Eye, EyeOff, Upload, Video, Mic, Shield, Lock, ArrowLeftRight, Calculator, ChevronDown } from 'lucide-react';

// Import Foreign Bird Logo
import foreignBirdLogo from '@assets/FOREIGNBIRD FRESH LOGO_1749378514044.png';

// Import all currency images
import cedi1Front from '@assets/1 CEDI FOREIGN BIRD FRONT_1749482172063.png';
import cedi1Back from '@assets/1 CEDI FOREIGN BIRD BACK_1749482172056.png';
import cedi2Front from '@assets/2 CEDI FOREIGN BIRD FRONT_1749482172064.png';
import cedi2Back from '@assets/2 CEDI FOREIGN BIRD BACK_1749482172064.png';
import cedi5Front from '@assets/5 CEDI FOREIGN BIRD FRONT_1749482172065.png';
import cedi5Back from '@assets/5 CEDI FOREIGN BIRD BACK_1749482172065.png';
import cedi10Front from '@assets/10 CEDI FOREIGN BIRD FRONT_1749482172066.png';
import cedi10Back from '@assets/10 CEDI FOREIGN BIRD BACK_1749482172066.png';
import cedi20Front from '@assets/20 CEDI FOREIGN BIRD FRONT_1749482172068.png';
import cedi20Back from '@assets/20 CEDI FOREIGN BIRD BACK_1749482172067.png';
import cedi50Front from '@assets/50 CEDI FOREIGN BIRD FRONT_1749482172069.png';
import cedi50Back from '@assets/50 CEDI FOREIGN BIRD BACK_1749482172068.png';
import cedi100Front from '@assets/100 CEDI FOREIGN BIRD FRONT_1749482172071.png';
import cedi100Back from '@assets/100 CEDI FOREIGN BIRD BACK_1749482172070.png';
import cedi200Front from '@assets/200 CEDI FOREIGN BIRD FRONT_1749482172072.png';
import cedi200Back from '@assets/200 CEDI FOREIGN BIRD BACK_1749482172071.png';
import cedi500Front from '@assets/500 CEDI FOREIGN BIRD FRONT_1749482172073.png';
import cedi500Back from '@assets/500 CEDI FOREIGN BIRD BACK_1749482172073.png';

// USD Foreign Bird Currency Images
import usd1Front from '@assets/1 dolar 1FRONT-01_1749504099239.png';
import usd1Back from '@assets/1 dolar 1 BACK-01_1749504099238.png';
import usd2Front from '@assets/2 dolar 1 FRONT-01_1749504227393.png';
import usd2Back from '@assets/2 dolar 1-01BACK_1749504227392.png';
import usd5Front from '@assets/5 dolar 1-01 FRONT_1749514372393.png';
import usd5Back from '@assets/5 dolar 1-01 BACK_1749514372396.png';
import usd10Front from '@assets/10 dolar 1-01FRONT_1749514413704.png';
import usd10Back from '@assets/10 dolar 1-01BACK_1749514413701.png';
import usd50Front from '@assets/50 dolar 1-01FRONT_1749514622581.png';
import usd50Back from '@assets/50 dolar 1-01BACK_1749514622584.png';
import usd100Front from '@assets/100 dolar 1-01 FRONT_1749514534884.png';
import usd100Back from '@assets/100 dolar 1-01BACK_1749514534885.png';

const currencies = {
  GHS: {
    name: 'Ghanaian Cedi',
    symbol: 'GH₵',
    denominations: [
      { value: 1, front: cedi1Front, back: cedi1Back, color: '#ef4444' },
      { value: 2, front: cedi2Front, back: cedi2Back, color: '#f97316' },
      { value: 5, front: cedi5Front, back: cedi5Back, color: '#3b82f6' },
      { value: 10, front: cedi10Front, back: cedi10Back, color: '#10b981' },
      { value: 20, front: cedi20Front, back: cedi20Back, color: '#8b5cf6' },
      { value: 50, front: cedi50Front, back: cedi50Back, color: '#f59e0b' },
      { value: 100, front: cedi100Front, back: cedi100Back, color: '#06b6d4' },
      { value: 200, front: cedi200Front, back: cedi200Back, color: '#ec4899' },
      { value: 500, front: cedi500Front, back: cedi500Back, color: '#22c55e' },
    ]
  },
  USD: { name: 'US Dollar', symbol: '$', denominations: [
    { value: 1, front: usd1Front, back: usd1Back, color: '#10b981' },
    { value: 2, front: usd2Front, back: usd2Back, color: '#3b82f6' },
    { value: 5, front: usd5Front, back: usd5Back, color: '#8b5cf6' },
    { value: 10, front: usd10Front, back: usd10Back, color: '#f97316' },
    { value: 20, front: null, back: null, color: '#10b981' },
    { value: 50, front: usd50Front, back: usd50Back, color: '#8b5cf6' },
    { value: 100, front: usd100Front, back: usd100Back, color: '#06b6d4' },
  ]},
  EUR: { name: 'Euro', symbol: '€', denominations: [
    { value: 5, front: null, back: null, color: '#6b7280' },
    { value: 10, front: null, back: null, color: '#ef4444' },
    { value: 20, front: null, back: null, color: '#3b82f6' },
    { value: 50, front: null, back: null, color: '#f97316' },
    { value: 100, front: null, back: null, color: '#10b981' },
    { value: 200, front: null, back: null, color: '#f59e0b' },
  ]},
  GBP: { name: 'British Pound', symbol: '£', denominations: [
    { value: 5, front: null, back: null, color: '#3b82f6' },
    { value: 10, front: null, back: null, color: '#f97316' },
    { value: 20, front: null, back: null, color: '#8b5cf6' },
    { value: 50, front: null, back: null, color: '#ef4444' },
  ]},
  NGN: { name: 'Nigerian Naira', symbol: '₦', denominations: [
    { value: 5, front: null, back: null, color: '#10b981' },
    { value: 10, front: null, back: null, color: '#3b82f6' },
    { value: 20, front: null, back: null, color: '#8b5cf6' },
    { value: 50, front: null, back: null, color: '#f97316' },
    { value: 100, front: null, back: null, color: '#ef4444' },
    { value: 200, front: null, back: null, color: '#f59e0b' },
    { value: 500, front: null, back: null, color: '#06b6d4' },
    { value: 1000, front: null, back: null, color: '#ec4899' },
  ]},
  CAD: { name: 'Canadian Dollar', symbol: 'C$', denominations: [
    { value: 5, front: null, back: null, color: '#3b82f6' },
    { value: 10, front: null, back: null, color: '#8b5cf6' },
    { value: 20, front: null, back: null, color: '#10b981' },
    { value: 50, front: null, back: null, color: '#ef4444' },
    { value: 100, front: null, back: null, color: '#f59e0b' },
  ]},
  AUD: { name: 'Australian Dollar', symbol: 'A$', denominations: [
    { value: 5, front: null, back: null, color: '#ec4899' },
    { value: 10, front: null, back: null, color: '#3b82f6' },
    { value: 20, front: null, back: null, color: '#ef4444' },
    { value: 50, front: null, back: null, color: '#f59e0b' },
    { value: 100, front: null, back: null, color: '#10b981' },
  ]},
  JPY: { name: 'Japanese Yen', symbol: '¥', denominations: [
    { value: 1000, front: null, back: null, color: '#3b82f6' },
    { value: 2000, front: null, back: null, color: '#10b981' },
    { value: 5000, front: null, back: null, color: '#8b5cf6' },
    { value: 10000, front: null, back: null, color: '#f59e0b' },
  ]},
  CNY: { name: 'Chinese Yuan', symbol: '¥', denominations: [
    { value: 1, front: null, back: null, color: '#10b981' },
    { value: 5, front: null, back: null, color: '#f59e0b' },
    { value: 10, front: null, back: null, color: '#3b82f6' },
    { value: 20, front: null, back: null, color: '#ef4444' },
    { value: 50, front: null, back: null, color: '#10b981' },
    { value: 100, front: null, back: null, color: '#ef4444' },
  ]},
};

const countries = [
  { code: 'GH', name: 'Ghana', currency: 'GHS', flag: '🇬🇭' },
  { code: 'US', name: 'United States', currency: 'USD', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', currency: 'GBP', flag: '🇬🇧' },
  { code: 'DE', name: 'Germany', currency: 'EUR', flag: '🇩🇪' },
  { code: 'FR', name: 'France', currency: 'EUR', flag: '🇫🇷' },
  { code: 'NG', name: 'Nigeria', currency: 'NGN', flag: '🇳🇬' },
  { code: 'ZA', name: 'South Africa', currency: 'ZAR', flag: '🇿🇦' },
  { code: 'KE', name: 'Kenya', currency: 'KES', flag: '🇰🇪' },
  { code: 'CA', name: 'Canada', currency: 'CAD', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', currency: 'AUD', flag: '🇦🇺' },
  { code: 'JP', name: 'Japan', currency: 'JPY', flag: '🇯🇵' },
  { code: 'CN', name: 'China', currency: 'CNY', flag: '🇨🇳' },
  { code: 'IN', name: 'India', currency: 'INR', flag: '🇮🇳' },
  { code: 'BR', name: 'Brazil', currency: 'BRL', flag: '🇧🇷' },
  { code: 'RU', name: 'Russia', currency: 'RUB', flag: '🇷🇺' },
  { code: 'CH', name: 'Switzerland', currency: 'CHF', flag: '🇨🇭' },
  { code: 'SE', name: 'Sweden', currency: 'SEK', flag: '🇸🇪' },
  { code: 'NO', name: 'Norway', currency: 'NOK', flag: '🇳🇴' },
  { code: 'DK', name: 'Denmark', currency: 'DKK', flag: '🇩🇰' },
  { code: 'EG', name: 'Egypt', currency: 'EGP', flag: '🇪🇬' },
  { code: 'MA', name: 'Morocco', currency: 'MAD', flag: '🇲🇦' },
  { code: 'TN', name: 'Tunisia', currency: 'TND', flag: '🇹🇳' },
  { code: 'ET', name: 'Ethiopia', currency: 'ETB', flag: '🇪🇹' },
  { code: 'UG', name: 'Uganda', currency: 'UGX', flag: '🇺🇬' },
  { code: 'TZ', name: 'Tanzania', currency: 'TZS', flag: '🇹🇿' },
];

const CurrencyFlipCard = ({ denomination, isSelected, onSelect }: { denomination: any, isSelected: boolean, onSelect: () => void }) => {
  const [showFront, setShowFront] = useState(true);

  useEffect(() => {
    if (!denomination.front || !denomination.back) return;

    const interval = setInterval(() => {
      setShowFront(prev => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, [denomination]);

  if (!denomination.front || !denomination.back) {
    return (
      <motion.div 
        className={`w-full h-32 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center border-2 cursor-pointer transition-all ${
          isSelected ? 'border-red-500 scale-105' : 'border-gray-600 hover:border-gray-500'
        }`}
        onClick={onSelect}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="text-center">
          <span className="text-gray-400 text-sm">No image</span>
          <p className="text-white font-semibold">{denomination.value}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className={`relative w-full h-32 perspective-1000 cursor-pointer border-2 rounded-lg overflow-hidden transition-all ${
        isSelected ? 'border-red-500 scale-105' : 'border-blue-500 hover:border-blue-400'
      }`}
      onClick={onSelect}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{ borderColor: isSelected ? '#ef4444' : denomination.color }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={showFront ? 'front' : 'back'}
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: -90, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={showFront ? denomination.front : denomination.back}
            alt={`${denomination.value} note ${showFront ? 'front' : 'back'}`}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>
      {isSelected && (
        <div className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full"></div>
      )}
    </motion.div>
  );
};

const NumberPad = ({ onNumberClick, onClear, onBackspace }: { 
  onNumberClick: (num: string) => void, 
  onClear: () => void, 
  onBackspace: () => void 
}) => {
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
  
  return (
    <div className="grid grid-cols-3 gap-2 p-4 bg-gray-800 rounded-lg">
      {numbers.map((num) => (
        <Button
          key={num}
          variant="outline"
          className="h-12 border-gray-600 text-white hover:bg-gray-700"
          onClick={() => onNumberClick(num)}
        >
          {num}
        </Button>
      ))}
      <Button
        variant="outline"
        className="h-12 border-gray-600 text-white hover:bg-gray-700"
        onClick={onClear}
      >
        Clear
      </Button>
      <Button
        variant="outline"
        className="h-12 border-gray-600 text-white hover:bg-gray-700"
        onClick={onBackspace}
      >
        ⌫
      </Button>
    </div>
  );
};

// Transaction reference data structure
const transactionReferences = {
  'DONATION, SAFETY & GIFT': [
    'Save the water bodies', 'Offering', 'Tithe', 'First Fruit', 'Scholarship', 'Prisons', 'Aged donation', 'Orphanage', 'Surgery', 'Partnership due', 'Zongo Empowerment', 'Youth Empowerment', 'Climate Concern', 'School Feeding', 'Confidential Drugs Purchase', 'Wisdom', 'Affection', 'Building Project', 'Departmental Dues'
  ],
  'GIFT': [
    'Wedding Gift', 'Birthday Gift', 'Naming Gift', 'Valentine Gift', 'Marriage Anniversary', 'Sorry Gift', 'Love Gift', 'New Year Gift', 'Funeral Gift', 'Contribution', 'Support', 'Appreciation Gift', 'Airtime & Data Gift'
  ],
  'DUES & CONTRIBUTION': [
    'Membership Dues', 'Funeral dues', 'Old School Dues', 'Departmental Dues', 'Gym Membership', 'Classroom Dues', 'Farewell Dues', 'Cultural Group Dues', 'Family contribution', 'Investment Contribution'
  ],
  'GOVERNMENT SERVICES': [
    'License Application', 'License renewal', 'Driver\'s License', 'Weapon License', 'Customs Duty', 'Police Report', 'Assembly payment', 'Birth Certificate', 'Marriage Certificate', 'Death Certificate', 'Passport Payment', 'Immigration Service fee', 'TV license', 'Driving License', 'Vehicle Registration', 'Road Worthy', 'Insurance', 'Government Bond', 'Social Security', 'NHIS Levy', 'COVID Levy', 'E-Services Levy', 'Copyright', 'Patent', 'Trademark', 'RGD Services', 'Penalty', 'Vehicle Toll', 'Auction payment', 'Surety/Bail', 'Fine', 'Parking Fee'
  ],
  'GOODS & SERVICES': [
    'Electricity Bill', 'Water Bill', 'Gas Bill', 'Medical Bill', 'Rent', 'Hiring', 'Airtime', 'Data', 'Diesel', 'Petrol', 'Car Repair', 'Mortgage', 'Lease', 'Loan Disbursement', 'Loan Repayment', 'Contribution', 'Investment', 'Apps purchase', 'Dues', 'Security fee', 'Hotel Bill', 'Ticket', 'Legal Fee', 'Electronic Product', 'Sanitation', 'Oil & Gas', 'Filling Fee', 'Consultancy Fee', 'Shipping Fee', 'Air ticket', 'Food & drink', 'Tobacco', 'Clothes and shoes', 'Computers & gadgets', 'Debt part Payment', 'Debt full payment', 'Building materials', 'Auto Services'
  ],
  'MEDICAL BILL': [
    'Surgery', 'Medicine', 'Child Labour', 'Laboratory', 'Consultation', 'Dental', 'Eye', 'Gynecology', 'Psychiatry', 'Yellow Fever', 'Oxygen', 'Medicine'
  ],
  'LEGAL & JUDICIAL': [
    'Lawyer Fee', 'Affidavit', 'Notary', 'Consultation'
  ],
  'PERSONAL AND NORMAL': [
    'Family Upkeep', 'Hospital bill', 'Surgery', 'Market Money', 'Christmas Money', 'Snacks & Drinks', 'Easter Money', 'Sallah Money', 'Pocket Money', 'School Fees', 'Grocery and provisions', 'Feeding', 'Medicine', 'Kwasiabuo', 'Car purchase', 'Akwasidan', 'Marriage Fee', 'Knocking fee'
  ],
  'FOREX & EXCHANGE': [
    'Currency Exchange', 'International Transfer', 'Foreign Investment', 'Trade Settlement', 'Remittance'
  ],
  'INVESTMENT & LOAN': [
    'Investment Portfolio', 'Loan Application', 'Loan Repayment', 'Stock Purchase', 'Bond Investment', 'Mutual Funds'
  ],
  'FAMILY VALUES & RBF': [
    'Religious Building Support', 'Faith Services', 'Community Development', 'Cultural Activities', 'Traditional Ceremonies'
  ]
};

export default function ForeignBirdPaymentPane() {
  const [selectedCurrency, setSelectedCurrency] = useState('GHS');
  const [selectedCountry, setSelectedCountry] = useState('GH');
  const [recipient, setRecipient] = useState('');
  const [showEncryption, setShowEncryption] = useState(false);
  const [selectedDenominations, setSelectedDenominations] = useState<number[]>([]);
  const [exchangeFrom, setExchangeFrom] = useState('GHS');
  const [exchangeTo, setExchangeTo] = useState('USD');
  const [exchangeAmount, setExchangeAmount] = useState('');
  const [showKeypad, setShowKeypad] = useState(false);
  const [selectedTransactionType, setSelectedTransactionType] = useState('');
  const [selectedTransactionReference, setSelectedTransactionReference] = useState('');
  const [transactionReferenceId, setTransactionReferenceId] = useState('');

  const currentCurrency = currencies[selectedCurrency as keyof typeof currencies];

  const handleDenominationSelect = (index: number) => {
    setSelectedDenominations(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleNumberPadClick = (num: string) => {
    setExchangeAmount(prev => prev + num);
  };

  const handleClear = () => {
    setExchangeAmount('');
  };

  const handleBackspace = () => {
    setExchangeAmount(prev => prev.slice(0, -1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      {/* Header with Foreign Bird Logo */}
      <div className="bg-gradient-to-r from-yellow-600 to-yellow-400 p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-4">
          <img src={foreignBirdLogo} alt="Foreign Bird Logo" className="h-16 w-auto" />
          <div className="text-center">
            <h1 className="text-3xl font-bold text-black">
              Official Bank of Ghana Foreign Bird Series
            </h1>
            <p className="text-black/80 mt-2">
              Secure International Currency Exchange & Transfer
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Control Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Currency Icons List */}
          <Card className="bg-black/20 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Coins className="w-5 h-5 text-yellow-400" />
                <h3 className="text-lg font-semibold">Select Currency</h3>
              </div>
              <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                  <SelectValue placeholder="Choose currency" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {Object.entries(currencies).map(([code, currency]) => (
                    <SelectItem key={code} value={code} className="text-white hover:bg-gray-700">
                      {currency.symbol} {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Countries Dropdown */}
          <Card className="bg-black/20 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-semibold">Select Country</h3>
              </div>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                  <SelectValue placeholder="Choose country" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code} className="text-white hover:bg-gray-700">
                      {country.flag} {country.name} ({country.currency})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Recipient Section */}
          <Card className="bg-black/20 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Receipt className="w-5 h-5 text-green-400" />
                <h3 className="text-lg font-semibold">Recipient Info</h3>
              </div>
              <Input
                placeholder="Enter recipient details"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              />
            </CardContent>
          </Card>
        </div>

        {/* Currency Display Pane with Modal */}
        <Card className="bg-black/20 border-gray-700">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-yellow-400 mb-2">
                {currentCurrency.name} ({currentCurrency.symbol})
              </h2>
              <p className="text-gray-300">Available Denominations - Click to Select Multiple</p>
            </div>

            {/* Currency Icons at Top */}
            <div className="flex justify-center gap-2 mb-6">
              {Object.entries(currencies).map(([code, currency]) => (
                <div
                  key={code}
                  className={`w-12 h-8 rounded flex items-center justify-center text-xs font-bold transition-all ${
                    selectedCurrency === code
                      ? 'bg-red-500 text-white scale-110'
                      : 'bg-blue-500 text-white hover:bg-blue-400'
                  }`}
                >
                  {currency.symbol}
                </div>
              ))}
            </div>

            {/* Currency Grid Modal Style - 3 per row */}
            <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
              {currentCurrency.denominations.slice(0, 9).map((denom, index) => (
                <CurrencyFlipCard
                  key={index}
                  denomination={denom}
                  isSelected={selectedDenominations.includes(index)}
                  onSelect={() => handleDenominationSelect(index)}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Foreign Exchange Section */}
        <Card className="bg-black/20 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <ArrowLeftRight className="w-5 h-5 text-purple-400" />
              <h3 className="text-xl font-semibold text-purple-400">Foreign Exchange</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">Exchange From</label>
                <Select value={exchangeFrom} onValueChange={setExchangeFrom}>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue placeholder="From currency" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    {Object.entries(currencies).map(([code, currency]) => (
                      <SelectItem key={code} value={code} className="text-white hover:bg-gray-700">
                        {currency.symbol} {currency.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Exchange To</label>
                <Select value={exchangeTo} onValueChange={setExchangeTo}>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue placeholder="To currency" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    {Object.entries(currencies).map(([code, currency]) => (
                      <SelectItem key={code} value={code} className="text-white hover:bg-gray-700">
                        {currency.symbol} {currency.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Exchange Amount</label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Enter amount"
                    value={exchangeAmount}
                    onChange={(e) => setExchangeAmount(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 pr-10"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-8 w-8 p-0"
                    onClick={() => setShowKeypad(!showKeypad)}
                  >
                    <Calculator className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Collapsible Keypad */}
            <Collapsible open={showKeypad} onOpenChange={setShowKeypad}>
              <CollapsibleContent>
                <div className="mt-4">
                  <NumberPad
                    onNumberClick={handleNumberPadClick}
                    onClear={handleClear}
                    onBackspace={handleBackspace}
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>

        {/* File Attachments & Escrow Features */}
        <Card className="bg-black/20 border-gray-700">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-blue-400">Attachments & Escrow</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button
                variant="outline"
                className="border-gray-600 text-white hover:bg-gray-700 h-20 flex flex-col items-center gap-2"
              >
                <Upload className="w-6 h-6" />
                <span className="text-sm">Upload Files</span>
              </Button>
              <Button
                variant="outline"
                className="border-gray-600 text-white hover:bg-gray-700 h-20 flex flex-col items-center gap-2"
              >
                <Video className="w-6 h-6" />
                <span className="text-sm">Video Record</span>
              </Button>
              <Button
                variant="outline"
                className="border-gray-600 text-white hover:bg-gray-700 h-20 flex flex-col items-center gap-2"
              >
                <Mic className="w-6 h-6" />
                <span className="text-sm">Audio Record</span>
              </Button>
              <Button
                variant="outline"
                className="border-gray-600 text-white hover:bg-gray-700 h-20 flex flex-col items-center gap-2"
              >
                <Shield className="w-6 h-6" />
                <span className="text-sm">Escrow Protection</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Encrypt Payment Section */}
        <Card className="bg-black/20 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-purple-400">Encrypt my payment/donation</h3>
              <Button
                variant="outline"
                onClick={() => setShowEncryption(!showEncryption)}
                className="border-gray-600 text-white hover:bg-gray-700"
              >
                {showEncryption ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                {showEncryption ? 'Hide' : 'Show'} Encryption
              </Button>
            </div>

            <AnimatePresence>
              {showEncryption && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-gray-800 p-6 rounded-lg border border-gray-600"
                >
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Exchange:</span>
                      <span className="ml-2 text-white">
                        {currencies[exchangeFrom as keyof typeof currencies]?.symbol} → {currencies[exchangeTo as keyof typeof currencies]?.symbol}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Amount:</span>
                      <span className="ml-2 text-white">{exchangeAmount || '0'}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Selected Notes:</span>
                      <span className="ml-2 text-white">{selectedDenominations.length} notes</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Encryption:</span>
                      <span className="ml-2 text-green-400">AES-256 Enabled</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-4">
                    <Lock className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm">End-to-end encrypted payment processing</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Transaction Type & Reference Section */}
        <Card className="bg-black/20 border-gray-700">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-green-400">Transaction Type & Reference</h3>
            
            {/* Transaction Type Selection */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-3 text-yellow-400">Transaction Type</h4>
              <Select value={selectedTransactionType} onValueChange={setSelectedTransactionType}>
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                  <SelectValue placeholder="Select transaction type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {[
                    'DONATION, SAFETY & GIFT',
                    'NORMAL TRANSACTION', 
                    'GOVERNMENT SERVICES',
                    'GOODS & SERVICES',
                    'FOREX & EXCHANGE',
                    'INVESTMENT & LOAN',
                    'FAMILY VALUES & RBF'
                  ].map((type) => (
                    <SelectItem key={type} value={type} className="text-white hover:bg-gray-700">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Transaction Reference Selection */}
            {selectedTransactionType && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-3 text-blue-400">Transaction Reference</h4>
                <Select value={selectedTransactionReference} onValueChange={setSelectedTransactionReference}>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue placeholder="Select specific transaction reference" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600 max-h-60 overflow-y-auto">
                    {transactionReferences[selectedTransactionType as keyof typeof transactionReferences]?.map((reference) => (
                      <SelectItem key={reference} value={reference} className="text-white hover:bg-gray-700">
                        {reference}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Transaction Reference ID Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-yellow-400">Transaction Reference ID</label>
              <Input
                value={transactionReferenceId}
                onChange={(e) => setTransactionReferenceId(e.target.value)}
                placeholder="Enter transaction ID (e.g., vehicle details for auto services)"
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              />
              <p className="text-xs text-gray-400 mt-1">Transaction ID can be entered here for instance if auto services are being paid for, the vehicle details will be entered in here.</p>
            </div>

            {/* System References */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-600">
              <div>
                <h4 className="text-lg font-semibold mb-3 text-yellow-400">System Reference</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Reference ID:</span>
                    <span className="text-white font-mono">FB-{Date.now().toString().slice(-8)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Session ID:</span>
                    <span className="text-white font-mono">SES-{Math.random().toString(36).substring(2, 8).toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Timestamp:</span>
                    <span className="text-white">{new Date().toISOString().replace('T', ' ').slice(0, 19)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Rate Valid Until:</span>
                    <span className="text-white">{new Date(Date.now() + 15*60*1000).toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-3 text-blue-400">Transaction Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Processing Fee:</span>
                    <span className="text-white">2.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Exchange Rate:</span>
                    <span className="text-white">Live Market Rate</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Settlement Time:</span>
                    <span className="text-white">Instant - 24 Hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Security Level:</span>
                    <span className="text-green-400">Bank Grade</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg border border-blue-500/30">
              <h4 className="text-lg font-semibold mb-2 text-purple-400">Important Notes</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• All transactions are secured with end-to-end encryption</li>
                <li>• Foreign Bird Series authentication ensures note authenticity</li>
                <li>• Exchange rates are updated every 30 seconds</li>
                <li>• Escrow protection available for high-value transactions</li>
                <li>• Customer support available 24/7 via multiple channels</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Process Payment Button */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500 text-black font-bold px-12 py-4 rounded-xl text-lg shadow-lg shadow-yellow-500/20"
          >
            <Send className="w-5 h-5 mr-2" />
            Process Payment
          </Button>
        </div>
      </div>
    </div>
  );
}