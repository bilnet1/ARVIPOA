import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Beef, ArrowLeft, Phone, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SlaughteringRegistrationForm() {
  const [formData, setFormData] = useState<{
    owner: string;
    ownerPhone: string;
    ownerId: string;
    digitalAddress: string;
    vaccination: string;
    vaccineType: string;
    administrationDate: string;
    administrationTime: string;
    administrationCentre: string;
    animalId: string;
    slaughterDateTime: string;
    slaughterHouseAddress: string;
    slaughterer: string;
    reasonForSlaughtering: string;
    meatAcquired: string;
    expiryDate: string;
    ownerOtpSent: boolean;
    ownerOtpCode: string;
    idOtpSent: boolean;
    idOtpCode: string;
  }>({
    owner: '',
    ownerPhone: '',
    ownerId: '',
    digitalAddress: '',
    vaccination: '',
    vaccineType: '',
    administrationDate: '',
    administrationTime: '',
    administrationCentre: '',
    animalId: '',
    slaughterDateTime: '',
    slaughterHouseAddress: '',
    slaughterer: '',
    reasonForSlaughtering: '',
    meatAcquired: '',
    expiryDate: '',
    ownerOtpSent: false,
    ownerOtpCode: '',
    idOtpSent: false,
    idOtpCode: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateAnimalId = () => {
    const animalId = `SLT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    setFormData(prev => ({ ...prev, animalId }));
  };

  const sendOwnerOTP = () => {
    if (formData.ownerPhone) {
      setFormData(prev => ({ ...prev, ownerOtpSent: true }));
      console.log('OTP sent to owner phone:', formData.ownerPhone);
    }
  };

  const sendIdOTP = () => {
    if (formData.ownerId) {
      setFormData(prev => ({ ...prev, idOtpSent: true }));
      console.log('OTP sent for ID verification:', formData.ownerId);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Slaughtering registration data:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-red-600 hover:text-red-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center space-x-3">
            <Beef className="w-8 h-8 text-red-600" />
            <h1 className="text-3xl font-bold text-gray-900">Slaughtering Registration</h1>
          </div>
          <p className="text-gray-600 mt-2">Register animal slaughtering activities with ARVIPOA</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white">
            <CardTitle className="flex items-center space-x-2">
              <Beef className="w-6 h-6" />
              <span>Add Slaughtering Record</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Owner Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Owner Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="owner">Owner</Label>
                    <Input
                      id="owner"
                      value={formData.owner}
                      onChange={(e) => handleInputChange('owner', e.target.value)}
                      placeholder="Enter owner's name"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="ownerPhone">Owner's Phone</Label>
                    <div className="flex space-x-2 mt-1">
                      <Input
                        id="ownerPhone"
                        value={formData.ownerPhone}
                        onChange={(e) => handleInputChange('ownerPhone', e.target.value)}
                        placeholder="Enter phone number"
                        className="flex-1"
                      />
                      <Button type="button" onClick={sendOwnerOTP} variant="outline" size="sm">
                        <Phone className="w-4 h-4 mr-1" />
                        Send OTP
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">OTP will be sent here for owner to confirm</p>
                    {formData.ownerOtpSent && (
                      <Input
                        value={formData.ownerOtpCode}
                        onChange={(e) => handleInputChange('ownerOtpCode', e.target.value)}
                        placeholder="Enter OTP code"
                        className="mt-2"
                      />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="ownerId">Owner's ID</Label>
                    <div className="flex space-x-2 mt-1">
                      <Input
                        id="ownerId"
                        value={formData.ownerId}
                        onChange={(e) => handleInputChange('ownerId', e.target.value)}
                        placeholder="Enter ID number"
                        className="flex-1"
                      />
                      <Button type="button" onClick={sendIdOTP} variant="outline" size="sm">
                        Verify OTP
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">OTP will be sent here for owner to confirm</p>
                    {formData.idOtpSent && (
                      <Input
                        value={formData.idOtpCode}
                        onChange={(e) => handleInputChange('idOtpCode', e.target.value)}
                        placeholder="Enter verification OTP"
                        className="mt-2"
                      />
                    )}
                  </div>
                  <div>
                    <Label htmlFor="digitalAddress">Digital Address</Label>
                    <div className="relative mt-1">
                      <Input
                        id="digitalAddress"
                        value={formData.digitalAddress}
                        onChange={(e) => handleInputChange('digitalAddress', e.target.value)}
                        placeholder="Enter digital address"
                        className="pl-10"
                      />
                      <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Vaccination Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Vaccination Information</h3>
                <div>
                  <Label>Vaccination</Label>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="vaccinationYes"
                        name="vaccination"
                        value="Yes"
                        checked={formData.vaccination === 'Yes'}
                        onChange={(e) => handleInputChange('vaccination', e.target.value)}
                      />
                      <Label htmlFor="vaccinationYes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="vaccinationNo"
                        name="vaccination"
                        value="No"
                        checked={formData.vaccination === 'No'}
                        onChange={(e) => handleInputChange('vaccination', e.target.value)}
                      />
                      <Label htmlFor="vaccinationNo">No</Label>
                    </div>
                  </div>
                </div>

                {formData.vaccination === 'Yes' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="vaccineType">Vaccine Type</Label>
                      <Input
                        id="vaccineType"
                        value={formData.vaccineType}
                        onChange={(e) => handleInputChange('vaccineType', e.target.value)}
                        placeholder="Enter vaccine type"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="administrationDate">Administration Date</Label>
                      <Input
                        id="administrationDate"
                        type="date"
                        value={formData.administrationDate}
                        onChange={(e) => handleInputChange('administrationDate', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="administrationTime">Time</Label>
                      <div className="relative mt-1">
                        <Input
                          id="administrationTime"
                          type="time"
                          value={formData.administrationTime}
                          onChange={(e) => handleInputChange('administrationTime', e.target.value)}
                          className="pl-10"
                        />
                        <Clock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      </div>
                    </div>
                  </div>
                )}

                {formData.vaccination === 'Yes' && (
                  <div>
                    <Label htmlFor="administrationCentre">Administration Centre</Label>
                    <Input
                      id="administrationCentre"
                      value={formData.administrationCentre}
                      onChange={(e) => handleInputChange('administrationCentre', e.target.value)}
                      placeholder="Enter administration centre"
                      className="mt-1"
                    />
                  </div>
                )}
              </div>

              {/* Animal and Slaughter Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Animal & Slaughter Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="animalId">Animal ID</Label>
                    <div className="flex space-x-2 mt-1">
                      <Input
                        id="animalId"
                        value={formData.animalId}
                        onChange={(e) => handleInputChange('animalId', e.target.value)}
                        placeholder="Auto generated"
                        className="flex-1"
                        readOnly
                      />
                      <Button type="button" onClick={generateAnimalId} variant="outline">
                        Generate
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="slaughterDateTime">Date/Time Slaughtered</Label>
                    <Input
                      id="slaughterDateTime"
                      type="datetime-local"
                      value={formData.slaughterDateTime}
                      onChange={(e) => handleInputChange('slaughterDateTime', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="slaughterHouseAddress">Slaughter House Address</Label>
                    <div className="relative mt-1">
                      <Input
                        id="slaughterHouseAddress"
                        value={formData.slaughterHouseAddress}
                        onChange={(e) => handleInputChange('slaughterHouseAddress', e.target.value)}
                        placeholder="Enter slaughter house address"
                        className="pl-10"
                      />
                      <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Google Map location with OTP verification</p>
                  </div>
                  <div>
                    <Label htmlFor="slaughterer">Slaughterer</Label>
                    <Input
                      id="slaughterer"
                      value={formData.slaughterer}
                      onChange={(e) => handleInputChange('slaughterer', e.target.value)}
                      placeholder="Enter slaughterer's name"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Reason for Slaughtering */}
              <div>
                <Label htmlFor="reasonForSlaughtering">Reason for Slaughtering</Label>
                <Textarea
                  id="reasonForSlaughtering"
                  value={formData.reasonForSlaughtering}
                  onChange={(e) => handleInputChange('reasonForSlaughtering', e.target.value)}
                  placeholder="Enter reason for slaughtering"
                  className="mt-1"
                  rows={3}
                />
              </div>

              {/* Meat Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Meat Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="meatAcquired">Meat Acquired (KG)</Label>
                    <div className="relative mt-1">
                      <Input
                        id="meatAcquired"
                        type="number"
                        step="0.1"
                        value={formData.meatAcquired}
                        onChange={(e) => handleInputChange('meatAcquired', e.target.value)}
                        placeholder="Enter weight in KG"
                        className="pr-12"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">KG</span>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      type="date"
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-6">
                <Button type="button" variant="outline" asChild>
                  <Link to="/">Cancel</Link>
                </Button>
                <Button type="submit" className="bg-red-600 hover:bg-red-700">
                  Register Slaughtering
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}