import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, 
  X, 
  DollarSign, 
  Lock, 
  Send, 
  Minimize2, 
  Maximize2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface FloatingPaymentPanelProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function FloatingPaymentPanel({ isVisible, onClose }: FloatingPaymentPanelProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [quickAmount, setQuickAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [reference, setReference] = useState('');
  const [encryptedMode, setEncryptedMode] = useState(false);

  const quickAmounts = [50, 100, 200, 500, 1000];
  const quickReferences = [
    'Tithe', 'Offering', 'Donation', 'Bill Payment', 'Transfer'
  ];

  const processQuickPayment = async () => {
    try {
      const response = await fetch('/api/foreign-bird/process-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transactionType: 'NORMAL TRANSACTION',
          reference: reference || 'Quick Payment',
          currency: 'GHS',
          amount: quickAmount,
          encrypted: encryptedMode,
          escrow: false,
          recipient: recipient,
          note: 'Quick payment via floating panel'
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert(`Payment successful! Transaction ID: ${result.transaction.id}`);
        setQuickAmount('');
        setRecipient('');
        setReference('');
      } else {
        alert('Payment failed: ' + result.message);
      }
    } catch (error) {
      alert('Payment error: ' + (error as Error).message);
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 50, y: 50 }}
        animate={{ 
          opacity: 1, 
          scale: isMinimized ? 0.6 : 1,
          x: 0, 
          y: 0 
        }}
        exit={{ opacity: 0, scale: 0.5, x: 100, y: 100 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed bottom-6 right-6 z-[9999]"
        style={{ width: isMinimized ? '200px' : '400px' }}
      >
        <Card className="bg-black/90 backdrop-blur-md border-2 border-blue-500/50 shadow-2xl">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-400" />
                Foreign Bird Payment
              </CardTitle>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-gray-400 hover:text-white p-1"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onClose}
                  className="text-gray-400 hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          {!isMinimized && (
            <CardContent className="space-y-4">
              {/* Quick Amount Selection */}
              <div>
                <label className="text-white text-sm font-semibold mb-2 block">Quick Amount (GHS)</label>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {quickAmounts.map((amount) => (
                    <Button
                      key={amount}
                      size="sm"
                      variant={quickAmount === amount.toString() ? "default" : "outline"}
                      onClick={() => setQuickAmount(amount.toString())}
                      className="text-xs"
                    >
                      ₵{amount}
                    </Button>
                  ))}
                </div>
                <Input
                  placeholder="Custom amount"
                  value={quickAmount}
                  onChange={(e) => setQuickAmount(e.target.value)}
                  className="bg-black/50 border-gray-600 text-white"
                />
              </div>

              {/* Recipient */}
              <div>
                <label className="text-white text-sm font-semibold mb-2 block">Recipient</label>
                <Input
                  placeholder="Enter recipient"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="bg-black/50 border-gray-600 text-white"
                />
              </div>

              {/* Quick Reference */}
              <div>
                <label className="text-white text-sm font-semibold mb-2 block">Reference</label>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  {quickReferences.map((ref) => (
                    <Button
                      key={ref}
                      size="sm"
                      variant={reference === ref ? "default" : "outline"}
                      onClick={() => setReference(ref)}
                      className="text-xs"
                    >
                      {ref}
                    </Button>
                  ))}
                </div>
                <Input
                  placeholder="Custom reference"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  className="bg-black/50 border-gray-600 text-white"
                />
              </div>

              {/* Encryption Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-white text-sm">Encrypted Payment</span>
                <Button
                  size="sm"
                  variant={encryptedMode ? "default" : "outline"}
                  onClick={() => setEncryptedMode(!encryptedMode)}
                >
                  <Lock className="w-4 h-4" />
                </Button>
              </div>

              {/* Process Payment Button */}
              <Button
                onClick={processQuickPayment}
                disabled={!quickAmount || !recipient}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Send className="w-4 h-4 mr-2" />
                Send ₵{quickAmount || '0'}
              </Button>

              {/* Full Payment System Link */}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => window.open('/foreign-bird-payment', '_blank')}
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Open Full Payment System
              </Button>
            </CardContent>
          )}

          {isMinimized && (
            <CardContent className="py-2 text-center">
              <div className="text-white text-sm">Quick Pay</div>
              <div className="text-blue-400 text-xs">Click to expand</div>
            </CardContent>
          )}
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}