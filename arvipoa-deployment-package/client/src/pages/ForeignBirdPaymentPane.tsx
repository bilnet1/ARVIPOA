import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  DollarSign, 
  Euro, 
  PoundSterling, 
  Calculator, 
  Upload, 
  Mic, 
  Video, 
  Lock, 
  Shield, 
  Eye, 
  EyeOff,
  Send,
  Clock,
  FileText,
  ChevronDown,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Currency {
  code: string;
  symbol: string;
  denominations: number[];
  front: string;
  back: string;
}

const currencies: Currency[] = [
  {
    code: 'USD',
    symbol: '$',
    denominations: [1, 5, 10, 20, 50, 100],
    front: 'https://via.placeholder.com/150x70/1a4b3a/ffffff?text=USD+Front',
    back: 'https://via.placeholder.com/150x70/2d5a47/ffffff?text=USD+Back'
  },
  {
    code: 'EUR',
    symbol: '€',
    denominations: [5, 10, 20, 50, 100, 200, 500],
    front: 'https://via.placeholder.com/150x70/1e3a8a/ffffff?text=EUR+Front',
    back: 'https://via.placeholder.com/150x70/3b82f6/ffffff?text=EUR+Back'
  },
  {
    code: 'GBP',
    symbol: '£',
    denominations: [5, 10, 20, 50],
    front: 'https://via.placeholder.com/150x70/7c2d12/ffffff?text=GBP+Front',
    back: 'https://via.placeholder.com/150x70/dc2626/ffffff?text=GBP+Back'
  },
  {
    code: 'GHS',
    symbol: '₵',
    denominations: [1, 2, 5, 10, 20, 50, 100, 200],
    front: 'https://via.placeholder.com/150x70/059669/ffffff?text=GHS+Front',
    back: 'https://via.placeholder.com/150x70/10b981/ffffff?text=GHS+Back'
  }
];

const transactionTypes = {
  'DONATION & SAFETY': [
    'Save the water bodies', 'Offering', 'Tithe', 'First Fruit', 'Scholarship', 
    'Prisons', 'Aged donation', 'Orphanage', 'Surgery', 'Partnership due', 
    'Zongo Empowerment', 'Youth Empowerment', 'Climate Concern', 'School Feeding', 
    'Confidential Drugs Purchase', 'Wishdorm', 'Mifection', 'Building Project', 'Departmental Dues'
  ],
  'NORMAL TRANSACTION': [
    'Family Upkeep', 'Hospital bill', 'Surgery', 'Market Money', 'Christmas Money', 
    'Snacks & Drinks', 'Easter Money', 'Sallah Money', 'Pocket Money', 'School Fees', 
    'Grocery and provisions', 'Feeding', 'Medicine', 'Car purchase', 'Marriage Fee'
  ],
  'GOVERNMENT SERVICES': [
    'License Application', 'License renewal', 'Driver\'s License', 'Weapon License', 
    'Customs Duty', 'Police Report', 'Assembly payment', 'Birth Certificate', 
    'Marriage Certificate', 'Death Certificate', 'Passport Payment', 'Immigration Service fee', 
    'TV license', 'Vehicle Registration', 'Road Worthy', 'Insurance'
  ],
  'GOODS & SERVICES': [
    'Electricity Bill', 'Water Bill', 'Gas Bill', 'Medical Bill', 'Rent', 
    'Hiring', 'Airtime', 'Data', 'Diesel', 'Petrol', 'Car Repair', 
    'Mortgage', 'Lease', 'Electronic Product', 'Consultancy Fee'
  ],
  'FOREX & EXCHANGE': [
    'Currency Exchange', 'International Transfer', 'Remittance', 'Foreign Investment'
  ],
  'INVESTMENT & LOAN': [
    'Loan Disbursement', 'Loan Repayment', 'Investment Contribution', 'Stock Purchase', 
    'Bond Investment', 'Mutual Funds'
  ],
  'FAMILY VALUES & RBF': [
    'Wedding Gift', 'Birthday Gift', 'Naming Gift', 'Valentine Gift', 
    'Marriage Anniversary', 'Sorry Gift', 'Love Gift', 'New Year Gift', 
    'Funeral Gift', 'Contribution', 'Support', 'Appreciation Gift'
  ]
};

export default function ForeignBirdPaymentPane() {
  const [selectedTransactionType, setSelectedTransactionType] = useState('');
  const [selectedReference, setSelectedReference] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [customAmount, setCustomAmount] = useState('');
  const [showKeypad, setShowKeypad] = useState(false);
  const [encryptedMode, setEncryptedMode] = useState(false);
  const [escrowMode, setEscrowMode] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showFront, setShowFront] = useState(true);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [voiceNote, setVoiceNote] = useState<string>('');
  const [videoNote, setVideoNote] = useState<string>('');
  const [referenceNote, setReferenceNote] = useState('');
  const [recipientDetails, setRecipientDetails] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % currencies.length);
      setShowFront(!showFront);
    }, 3000);
    return () => clearInterval(interval);
  }, [showFront]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setAttachments([...attachments, ...Array.from(event.target.files)]);
    }
  };

  const processPayment = () => {
    const paymentData = {
      transactionType: selectedTransactionType,
      reference: selectedReference,
      currency: selectedCurrency.code,
      amount: customAmount || selectedAmount,
      encrypted: encryptedMode,
      escrow: escrowMode,
      recipient: recipientDetails,
      note: referenceNote,
      attachments: attachments.length,
      voiceNote: !!voiceNote,
      videoNote: !!videoNote,
      scheduledDate: scheduleDate
    };
    
    console.log('Processing payment:', paymentData);
    // Integration with ARVIPOA payment system would go here
  };

  return (
    <div className="min-h-screen p-4" style={{ background: 'linear-gradient(135deg, #0a1a1a 0%, #1a2f2f 100%)' }}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-yellow-400/50 shadow-2xl">
              <img 
                src="/assets/foreignbird-logo.png" 
                alt="Foreign Bird Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">FOREIGNBIRD</h1>
              <p className="text-gray-400">Multi-Currency Payment Platform</p>
            </div>
          </div>
          <div className="text-cyan-400 bg-cyan-900/30 px-4 py-2 rounded-full border border-cyan-500/30 inline-block">
            ARVIPOA Connected • Secure Transactions
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Left Panel - Currency Display */}
          <Card className="bg-gray-800/50 backdrop-blur-sm border-cyan-500/30">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-cyan-300 mb-6 text-center">Currency Exchange</h2>
              
              {/* Currency Carousel */}
              <div className="relative h-64 mb-6 overflow-hidden rounded-xl bg-gradient-to-r from-cyan-600/20 to-teal-600/20 border border-cyan-500/30">
                <motion.div
                  key={`${currentSlide}-${showFront}`}
                  initial={{ rotateY: -90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <img
                    src={showFront ? currencies[currentSlide].front : currencies[currentSlide].back}
                    alt={`${currencies[currentSlide].code} ${showFront ? 'Front' : 'Back'}`}
                    className="w-48 h-24 object-cover rounded-lg shadow-2xl border-2 border-cyan-400/40"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-lg"></div>
                </motion.div>
                
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <span className="text-cyan-300 font-bold text-lg">
                    {currencies[currentSlide].code} - {showFront ? 'Front' : 'Back'}
                  </span>
                </div>
              </div>

              {/* Currency Selection */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {currencies.map((currency) => (
                  <Button
                    key={currency.code}
                    variant={selectedCurrency.code === currency.code ? "default" : "outline"}
                    onClick={() => setSelectedCurrency(currency)}
                    className={`flex items-center gap-2 ${
                      selectedCurrency.code === currency.code 
                        ? 'bg-cyan-600 hover:bg-cyan-700 text-white border-cyan-400' 
                        : 'bg-gray-700/50 hover:bg-gray-600/50 text-cyan-300 border-cyan-500/30'
                    }`}
                  >
                    <span>{currency.symbol}</span>
                    <span>{currency.code}</span>
                  </Button>
                ))}
              </div>

              {/* Amount Selection */}
              <div className="space-y-4">
                <h3 className="text-cyan-300 font-semibold">Select Amount</h3>
                <div className="grid grid-cols-3 gap-2">
                  {selectedCurrency.denominations.map((amount) => (
                    <Button
                      key={amount}
                      variant={selectedAmount === amount ? "default" : "outline"}
                      onClick={() => {
                        setSelectedAmount(amount);
                        setCustomAmount('');
                      }}
                      className={`text-sm ${
                        selectedAmount === amount 
                          ? 'bg-cyan-600 hover:bg-cyan-700 text-white border-cyan-400' 
                          : 'bg-gray-700/50 hover:bg-gray-600/50 text-cyan-300 border-cyan-500/30'
                      }`}
                    >
                      {selectedCurrency.symbol}{amount}
                    </Button>
                  ))}
                </div>

                {/* Custom Amount Input */}
                <div className="flex gap-2">
                  <Input
                    placeholder={`Enter custom amount (${selectedCurrency.symbol})`}
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(0);
                    }}
                    className="bg-gray-800/50 border-cyan-500/30 text-cyan-300 placeholder-gray-400"
                  />
                  <Button 
                    onClick={() => setShowKeypad(!showKeypad)}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white border-cyan-400"
                  >
                    <Calculator className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Panel - Transaction Details */}
          <Card className="bg-gray-800/50 backdrop-blur-sm border-cyan-500/30">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-cyan-300 mb-6">Transaction Details</h2>
              
              {/* Transaction Type Selection */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-cyan-300 font-semibold mb-2 block">Transaction Type</label>
                  <select
                    value={selectedTransactionType}
                    onChange={(e) => {
                      setSelectedTransactionType(e.target.value);
                      setSelectedReference('');
                    }}
                    className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-cyan-300"
                  >
                    <option value="">Select Transaction Type</option>
                    {Object.keys(transactionTypes).map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {selectedTransactionType && (
                  <div>
                    <label className="text-cyan-300 font-semibold mb-2 block">Transaction Reference</label>
                    <select
                      value={selectedReference}
                      onChange={(e) => setSelectedReference(e.target.value)}
                      className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-cyan-300"
                    >
                      <option value="">Select Reference</option>
                      {transactionTypes[selectedTransactionType as keyof typeof transactionTypes].map((ref) => (
                        <option key={ref} value={ref}>{ref}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Recipient Details */}
              <div className="mb-4">
                <label className="text-cyan-300 font-semibold mb-2 block">Recipient Details</label>
                <Input
                  placeholder="Enter recipient information"
                  value={recipientDetails}
                  onChange={(e) => setRecipientDetails(e.target.value)}
                  className="bg-gray-800/50 border-cyan-500/30 text-cyan-300 placeholder-gray-400"
                />
              </div>

              {/* Reference Note */}
              <div className="mb-4">
                <label className="text-white font-semibold mb-2 block">Reference Note</label>
                <Textarea
                  placeholder="Enter transaction reference or note"
                  value={referenceNote}
                  onChange={(e) => setReferenceNote(e.target.value)}
                  className="bg-black/50 border-gray-600 text-white"
                  rows={3}
                />
              </div>

              {/* Attachments */}
              <div className="mb-4">
                <label className="text-white font-semibold mb-2 block">Attachments</label>
                <div className="flex gap-2">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button variant="outline" className="cursor-pointer">
                      <Upload className="w-4 h-4 mr-2" />
                      Files
                    </Button>
                  </label>
                  <Button variant="outline">
                    <Mic className="w-4 h-4 mr-2" />
                    Voice
                  </Button>
                  <Button variant="outline">
                    <Video className="w-4 h-4 mr-2" />
                    Video
                  </Button>
                </div>
                {attachments.length > 0 && (
                  <div className="mt-2 text-sm text-gray-300">
                    {attachments.length} file(s) selected
                  </div>
                )}
              </div>

              {/* Payment Options */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-white">Encrypted Payment</span>
                  <Button
                    variant={encryptedMode ? "default" : "outline"}
                    size="sm"
                    onClick={() => setEncryptedMode(!encryptedMode)}
                  >
                    {encryptedMode ? <Lock className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-white">Escrow Payment</span>
                  <Button
                    variant={escrowMode ? "default" : "outline"}
                    size="sm"
                    onClick={() => setEscrowMode(!escrowMode)}
                  >
                    <Clock className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Schedule Date for Escrow */}
              {escrowMode && (
                <div className="mb-4">
                  <label className="text-white font-semibold mb-2 block">Schedule Date</label>
                  <Input
                    type="datetime-local"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="bg-black/50 border-gray-600 text-white"
                  />
                </div>
              )}

              {/* Process Payment Button */}
              <Button
                onClick={processPayment}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3"
                disabled={!selectedTransactionType || !selectedReference || (!customAmount && !selectedAmount)}
              >
                <Send className="w-4 h-4 mr-2" />
                Process Payment
              </Button>

              {/* Transaction Summary */}
              <div className="mt-4 p-4 bg-black/30 rounded-lg border border-gray-600">
                <h4 className="text-white font-semibold mb-2">Transaction Summary</h4>
                <div className="text-sm text-gray-300 space-y-1">
                  <div>Amount: {selectedCurrency.symbol}{customAmount || selectedAmount}</div>
                  <div>Type: {selectedTransactionType}</div>
                  <div>Reference: {selectedReference}</div>
                  {encryptedMode && <div className="text-yellow-400">⚡ Encrypted Payment</div>}
                  {escrowMode && <div className="text-blue-400">🔒 Escrow Payment</div>}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}