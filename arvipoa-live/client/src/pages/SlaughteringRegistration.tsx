import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Beef, 
  Shield, 
  Clock, 
  MapPin, 
  Phone, 
  Calendar, 
  User, 
  FileCheck,
  Camera,
  QrCode,
  Scale,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface SlaughteringData {
  owner: string;
  ownerPhone: string;
  ownerId: string;
  digitalAddress: string;
  vaccination: 'yes' | 'no';
  vaccineType: string;
  administrationDate: string;
  administrationTime: string;
  administrationCentre: string;
  animalId: string;
  slaughterDateTime: string;
  slaughterHouseAddress: string;
  slaughterer: string;
  reasonForSlaughtering: string;
  meatAcquiredKg: string;
  expiryDate: string;
}

export default function SlaughteringRegistration() {
  const [slaughteringData, setSlaughteringData] = useState<SlaughteringData>({
    owner: '',
    ownerPhone: '',
    ownerId: '',
    digitalAddress: '',
    vaccination: 'no',
    vaccineType: '',
    administrationDate: '',
    administrationTime: '',
    administrationCentre: '',
    animalId: '',
    slaughterDateTime: '',
    slaughterHouseAddress: '',
    slaughterer: '',
    reasonForSlaughtering: '',
    meatAcquiredKg: '',
    expiryDate: ''
  });

  const [verificationStatus, setVerificationStatus] = useState({
    ownerPhone: false,
    ownerId: false,
    slaughterHouse: false
  });

  const [showOtpInputs, setShowOtpInputs] = useState({
    ownerPhone: false,
    ownerId: false,
    slaughterHouse: false
  });

  const reasonsForSlaughtering = [
    'Commercial processing',
    'Food consumption',
    'Medical necessity',
    'Age/health issues',
    'Emergency slaughter',
    'Religious ceremony',
    'Other'
  ];

  const ghanaRegions = [
    'Greater Accra', 'Ashanti', 'Western', 'Central', 'Volta', 'Eastern', 
    'Northern', 'Upper East', 'Upper West', 'Brong-Ahafo'
  ];

  const handleInputChange = (field: keyof SlaughteringData, value: string) => {
    setSlaughteringData(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-generate animal ID when other fields are filled
    if (field === 'owner' || field === 'ownerPhone') {
      generateAnimalId();
    }
  };

  const generateAnimalId = () => {
    const timestamp = Date.now().toString().slice(-6);
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const animalId = `SL${timestamp}${randomNum}`;
    setSlaughteringData(prev => ({
      ...prev,
      animalId
    }));
  };

  const handleSendOtp = (type: 'ownerPhone' | 'ownerId' | 'slaughterHouse') => {
    console.log(`Sending OTP for ${type}`);
    setShowOtpInputs(prev => ({
      ...prev,
      [type]: true
    }));
  };

  const handleVerifyOtp = (type: 'ownerPhone' | 'ownerId' | 'slaughterHouse', otp: string) => {
    console.log(`Verifying OTP for ${type}: ${otp}`);
    if (otp.length === 6) {
      setVerificationStatus(prev => ({
        ...prev,
        [type]: true
      }));
      setShowOtpInputs(prev => ({
        ...prev,
        [type]: false
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Slaughtering registration data:', slaughteringData);
    // Process registration
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-red-600 to-orange-600 text-white">
            <CardTitle className="flex items-center space-x-2">
              <Beef className="w-6 h-6" />
              <span>Animal Slaughtering Registration</span>
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Main Form */}
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Owner Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Owner Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="owner">Owner *</Label>
                      <Input
                        id="owner"
                        placeholder="Click here to enter text"
                        value={slaughteringData.owner}
                        onChange={(e) => handleInputChange('owner', e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="ownerPhone">Owner's Phone *</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="ownerPhone"
                          placeholder="Click here to enter text"
                          value={slaughteringData.ownerPhone}
                          onChange={(e) => handleInputChange('ownerPhone', e.target.value)}
                          required
                        />
                        <Button 
                          type="button" 
                          onClick={() => handleSendOtp('ownerPhone')}
                          disabled={!slaughteringData.ownerPhone || verificationStatus.ownerPhone}
                          size="sm"
                        >
                          {verificationStatus.ownerPhone ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            'Send OTP'
                          )}
                        </Button>
                      </div>
                      {showOtpInputs.ownerPhone && (
                        <div className="mt-2 flex space-x-2">
                          <Input
                            placeholder="Enter 6-digit OTP"
                            maxLength={6}
                            onChange={(e) => {
                              if (e.target.value.length === 6) {
                                handleVerifyOtp('ownerPhone', e.target.value);
                              }
                            }}
                          />
                        </div>
                      )}
                      <p className="text-sm text-gray-600 mt-1">Verify OTP will be sent here for owner to confirm</p>
                    </div>

                    <div>
                      <Label htmlFor="ownerId">Owner's ID *</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="ownerId"
                          placeholder="Click here to enter text"
                          value={slaughteringData.ownerId}
                          onChange={(e) => handleInputChange('ownerId', e.target.value)}
                          required
                        />
                        <Button 
                          type="button" 
                          onClick={() => handleSendOtp('ownerId')}
                          disabled={!slaughteringData.ownerId || verificationStatus.ownerId}
                          size="sm"
                        >
                          {verificationStatus.ownerId ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            'Verify'
                          )}
                        </Button>
                      </div>
                      {showOtpInputs.ownerId && (
                        <div className="mt-2 flex space-x-2">
                          <Input
                            placeholder="Enter verification code"
                            maxLength={6}
                            onChange={(e) => {
                              if (e.target.value.length === 6) {
                                handleVerifyOtp('ownerId', e.target.value);
                              }
                            }}
                          />
                        </div>
                      )}
                      <p className="text-sm text-gray-600 mt-1">Verify OTP will be sent here for owner to confirm</p>
                    </div>

                    <div>
                      <Label htmlFor="digitalAddress">Digital Address *</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="digitalAddress"
                          placeholder="Click here to enter text"
                          value={slaughteringData.digitalAddress}
                          onChange={(e) => handleInputChange('digitalAddress', e.target.value)}
                          required
                        />
                        <Button type="button" size="sm" variant="outline">
                          <MapPin className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Vaccination Information */}
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Vaccination Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Vaccination Status *</Label>
                      <div className="flex space-x-4 mt-2">
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="vaccination"
                            value="yes"
                            checked={slaughteringData.vaccination === 'yes'}
                            onChange={(e) => handleInputChange('vaccination', e.target.value as 'yes' | 'no')}
                          />
                          <span>Yes</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="vaccination"
                            value="no"
                            checked={slaughteringData.vaccination === 'no'}
                            onChange={(e) => handleInputChange('vaccination', e.target.value as 'yes' | 'no')}
                          />
                          <span>No</span>
                        </label>
                      </div>
                    </div>

                    {slaughteringData.vaccination === 'yes' && (
                      <>
                        <div>
                          <Label htmlFor="vaccineType">Vaccine Type</Label>
                          <Input
                            id="vaccineType"
                            placeholder="Click here to enter text"
                            value={slaughteringData.vaccineType}
                            onChange={(e) => handleInputChange('vaccineType', e.target.value)}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="administrationDate">Administration Date</Label>
                            <Input
                              id="administrationDate"
                              type="date"
                              value={slaughteringData.administrationDate}
                              onChange={(e) => handleInputChange('administrationDate', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="administrationTime">Time</Label>
                            <Input
                              id="administrationTime"
                              type="time"
                              value={slaughteringData.administrationTime}
                              onChange={(e) => handleInputChange('administrationTime', e.target.value)}
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="administrationCentre">Administration Centre</Label>
                          <Input
                            id="administrationCentre"
                            placeholder="Click here to enter text"
                            value={slaughteringData.administrationCentre}
                            onChange={(e) => handleInputChange('administrationCentre', e.target.value)}
                          />
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Animal and Slaughter Information */}
              <Card className="border-orange-200">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Beef className="w-5 h-5" />
                    Slaughter Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="animalId">Animal ID (Auto Generated)</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="animalId"
                          value={slaughteringData.animalId}
                          readOnly
                          className="bg-gray-50"
                        />
                        <Button type="button" size="sm" variant="outline">
                          <QrCode className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="slaughterDateTime">Date/Time Slaughtered *</Label>
                      <Input
                        id="slaughterDateTime"
                        type="datetime-local"
                        value={slaughteringData.slaughterDateTime}
                        onChange={(e) => handleInputChange('slaughterDateTime', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="slaughterHouseAddress">Slaughter House Address *</Label>
                    <div className="flex space-x-2">
                      <Textarea
                        id="slaughterHouseAddress"
                        placeholder="Click here to enter text"
                        value={slaughteringData.slaughterHouseAddress}
                        onChange={(e) => handleInputChange('slaughterHouseAddress', e.target.value)}
                        required
                      />
                      <div className="flex flex-col space-y-2">
                        <Button type="button" size="sm" variant="outline">
                          <MapPin className="w-4 h-4" />
                        </Button>
                        <Button 
                          type="button" 
                          onClick={() => handleSendOtp('slaughterHouse')}
                          disabled={!slaughteringData.slaughterHouseAddress || verificationStatus.slaughterHouse}
                          size="sm"
                        >
                          {verificationStatus.slaughterHouse ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            'OTP'
                          )}
                        </Button>
                      </div>
                    </div>
                    {showOtpInputs.slaughterHouse && (
                      <div className="mt-2 flex space-x-2">
                        <Input
                          placeholder="Enter slaughter house verification OTP"
                          maxLength={6}
                          onChange={(e) => {
                            if (e.target.value.length === 6) {
                              handleVerifyOtp('slaughterHouse', e.target.value);
                            }
                          }}
                        />
                      </div>
                    )}
                    <p className="text-sm text-gray-600 mt-1">Google Map (OTP)</p>
                  </div>

                  <div>
                    <Label htmlFor="slaughterer">Slaughterer *</Label>
                    <Input
                      id="slaughterer"
                      placeholder="Click here to enter text"
                      value={slaughteringData.slaughterer}
                      onChange={(e) => handleInputChange('slaughterer', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="reasonForSlaughtering">Reason for Slaughtering *</Label>
                    <Select 
                      value={slaughteringData.reasonForSlaughtering} 
                      onValueChange={(value) => handleInputChange('reasonForSlaughtering', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select reason" />
                      </SelectTrigger>
                      <SelectContent>
                        {reasonsForSlaughtering.map((reason) => (
                          <SelectItem key={reason} value={reason}>{reason}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="meatAcquiredKg">Meat Acquired (KG) *</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="meatAcquiredKg"
                          type="number"
                          step="0.1"
                          placeholder="Click here to enter text"
                          value={slaughteringData.meatAcquiredKg}
                          onChange={(e) => handleInputChange('meatAcquiredKg', e.target.value)}
                          required
                        />
                        <Button type="button" size="sm" variant="outline">
                          <Scale className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="expiryDate">Expiry Date *</Label>
                      <Input
                        id="expiryDate"
                        type="date"
                        value={slaughteringData.expiryDate}
                        onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex justify-between">
                <div className="flex space-x-2">
                  <Button type="button" variant="outline">
                    <Camera className="w-4 h-4 mr-2" />
                    Capture Images
                  </Button>
                  <Button type="button" variant="outline">
                    <FileCheck className="w-4 h-4 mr-2" />
                    Scan Documents
                  </Button>
                </div>
                
                <div className="flex space-x-2">
                  <Button type="button" variant="outline">
                    Save Draft
                  </Button>
                  <Button type="submit" className="bg-red-600 hover:bg-red-700">
                    <Beef className="w-4 h-4 mr-2" />
                    Register Slaughter
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Verification Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Verification Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                {verificationStatus.ownerPhone ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                )}
                <span>Owner Phone Verified</span>
              </div>
              <div className="flex items-center space-x-2">
                {verificationStatus.ownerId ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                )}
                <span>Owner ID Verified</span>
              </div>
              <div className="flex items-center space-x-2">
                {verificationStatus.slaughterHouse ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                )}
                <span>Slaughter House Verified</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}