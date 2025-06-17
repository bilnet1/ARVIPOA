import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Camera, Video, Upload, Heart, Shield, Phone } from 'lucide-react';

const petTypes = [
  'Dog', 'Cat', 'Bird', 'Fish', 'Rabbit', 'Hamster', 'Guinea Pig', 'Reptile',
  'Cattle', 'Goat', 'Sheep', 'Pig', 'Chicken', 'Duck', 'Turkey', 'Horse'
];

const animalColors = ['BLACK', 'BROWN', 'WHITE', 'GREY', 'GREEN', 'YELLOW'];

const imagePositions = [
  { id: 'face', label: 'Face Capture', icon: '😺' },
  { id: 'front', label: 'Front', icon: '⬆️' },
  { id: 'back', label: 'Back', icon: '⬇️' },
  { id: 'right', label: 'Right Side', icon: '➡️' },
  { id: 'left', label: 'Left Side', icon: '⬅️' },
  { id: 'top', label: 'Top Down', icon: '🔽' }
];

export default function AnimalRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Pet',
    petType: '',
    petTypeOther: '',
    animalClass: 'Domestic',
    age: '',
    uses: 'Pet',
    colourCategory: 'ONE COLOUR',
    primaryColour: '',
    spottedColour: '',
    vaccineType: '',
    vaccineIssueDate: '',
    vaccineExpiryDate: '',
    animalSmartId: '',
    smartIdIssueDate: '',
    smartIdExpiryDate: '',
    issuingVetPhone: '',
    otpCode: '',
    isVetVerified: false
  });

  const [capturedImages, setCapturedImages] = useState<{[key: string]: string}>({});
  const [isRecording, setIsRecording] = useState(false);

  const generateSmartId = () => {
    const smartId = 'ANIMAL-' + Date.now().toString().slice(-8);
    setFormData({ ...formData, animalSmartId: smartId });
  };

  const captureImage = (position: string) => {
    console.log(`Capturing ${position} image...`);
    // In real implementation, this would open camera
    setCapturedImages(prev => ({ ...prev, [position]: `captured-${position}-${Date.now()}` }));
  };

  const startVideoRecording = () => {
    setIsRecording(!isRecording);
    console.log(isRecording ? 'Stopping video recording...' : 'Starting face and body video recording...');
  };

  const sendOTP = () => {
    console.log('Sending OTP to vet phone:', formData.issuingVetPhone);
  };

  const verifyOTP = () => {
    if (formData.otpCode) {
      setFormData({ ...formData, isVetVerified: true });
      console.log('OTP verified successfully');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Animal Registration Data:', { formData, capturedImages });
  };

  React.useEffect(() => {
    if (!formData.animalSmartId) {
      generateSmartId();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-white shadow-lg">
          <CardHeader className="bg-gradient-to-r from-pink-600 to-purple-600 text-white">
            <CardTitle className="flex items-center space-x-2">
              <Heart className="w-6 h-6" />
              <span>Animal/Pet Registration Form</span>
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Animal Registration Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="w-5 h-5" />
              <span>Add Animal/Pet Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter animal/pet name"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Categories</Label>
                  <div className="flex space-x-4 mt-2">
                    {['Domestic', 'Commercial', 'Pet', 'Mixed'].map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`category-${category}`}
                          name="category"
                          value={category}
                          checked={formData.category === category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        />
                        <Label htmlFor={`category-${category}`} className="text-sm">{category}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="petType">Types of Pets/Livestock</Label>
                  <Select value={formData.petType} onValueChange={(value) => setFormData({ ...formData, petType: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose pet type" />
                    </SelectTrigger>
                    <SelectContent>
                      {petTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                      <SelectItem value="Others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.petType === 'Others' && (
                  <div>
                    <Label htmlFor="petTypeOther">Others - Please Specify</Label>
                    <Input
                      id="petTypeOther"
                      value={formData.petTypeOther}
                      onChange={(e) => setFormData({ ...formData, petTypeOther: e.target.value })}
                      placeholder="Specify pet type"
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="animalClass">Class</Label>
                  <div className="flex space-x-4 mt-2">
                    {['Domestic', 'Wild', 'Crossbreed', 'All'].map((animalClass) => (
                      <div key={animalClass} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`class-${animalClass}`}
                          name="animalClass"
                          value={animalClass}
                          checked={formData.animalClass === animalClass}
                          onChange={(e) => setFormData({ ...formData, animalClass: e.target.value })}
                        />
                        <Label htmlFor={`class-${animalClass}`} className="text-sm">{animalClass}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    type="date"
                    id="age"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="uses">Uses</Label>
                  <div className="flex space-x-4 mt-2">
                    {['Domestic', 'Commercial', 'Pet', 'Mixed'].map((use) => (
                      <div key={use} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`uses-${use}`}
                          name="uses"
                          value={use}
                          checked={formData.uses === use}
                          onChange={(e) => setFormData({ ...formData, uses: e.target.value })}
                        />
                        <Label htmlFor={`uses-${use}`} className="text-sm">{use}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Color Information */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold">Colour Category</Label>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="mixedColour"
                      name="colourCategory"
                      value="MIXED COLOUR"
                      checked={formData.colourCategory === 'MIXED COLOUR'}
                      onChange={(e) => setFormData({ ...formData, colourCategory: e.target.value })}
                    />
                    <Label htmlFor="mixedColour">Mixed Colour</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="oneColour"
                      name="colourCategory"
                      value="ONE COLOUR"
                      checked={formData.colourCategory === 'ONE COLOUR'}
                      onChange={(e) => setFormData({ ...formData, colourCategory: e.target.value })}
                    />
                    <Label htmlFor="oneColour">One Colour</Label>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                  {animalColors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setFormData({ ...formData, primaryColour: color })}
                      className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                        formData.primaryColour === color 
                          ? 'border-purple-500 bg-purple-100 text-purple-700' 
                          : 'border-gray-300 bg-white hover:border-gray-400'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>

                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="spotless"
                      name="spotPattern"
                      value="SPOTLESS"
                      onChange={() => setFormData({ ...formData, spottedColour: '' })}
                    />
                    <Label htmlFor="spotless">Spotless</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="spotted"
                      name="spotPattern"
                      value="SPOTTED"
                    />
                    <Label htmlFor="spotted">Spotted with Colour:</Label>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                  {animalColors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setFormData({ ...formData, spottedColour: color })}
                      className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                        formData.spottedColour === color 
                          ? 'border-pink-500 bg-pink-100 text-pink-700' 
                          : 'border-gray-300 bg-white hover:border-gray-400'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Image Capture Section */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold">Add Images</Label>
                
                {/* Face Capture Video Recording */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <Label className="font-medium">Face Capture (Video Recording)</Label>
                    <Button
                      type="button"
                      onClick={startVideoRecording}
                      className={`flex items-center space-x-2 ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                      <Video className="w-4 h-4" />
                      <span>{isRecording ? 'Stop Recording' : 'Start Recording'}</span>
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600">
                    Record face and entire body of the animal for identification purposes
                  </p>
                  {isRecording && (
                    <div className="mt-2 p-2 bg-red-100 rounded text-red-700 text-sm">
                      🔴 Recording in progress... Capture face and body movements
                    </div>
                  )}
                </div>

                {/* Position-based Image Capture */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {imagePositions.map((position) => (
                    <div key={position.id} className="border rounded-lg p-4 text-center">
                      <div className="text-2xl mb-2">{position.icon}</div>
                      <Label className="text-sm font-medium mb-2 block">{position.label}</Label>
                      {capturedImages[position.id] ? (
                        <Badge variant="secondary" className="mb-2">Captured</Badge>
                      ) : (
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => captureImage(position.id)}
                          className="flex items-center space-x-1 mx-auto"
                        >
                          <Camera className="w-3 h-3" />
                          <span>Capture</span>
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Vaccination Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="vaccineType">Vaccine Type</Label>
                  <Input
                    id="vaccineType"
                    value={formData.vaccineType}
                    onChange={(e) => setFormData({ ...formData, vaccineType: e.target.value })}
                    placeholder="Enter vaccine type"
                  />
                </div>

                <div>
                  <Label htmlFor="vaccineIssueDate">Vaccine Issue Date</Label>
                  <Input
                    type="date"
                    id="vaccineIssueDate"
                    value={formData.vaccineIssueDate}
                    onChange={(e) => setFormData({ ...formData, vaccineIssueDate: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="vaccineExpiryDate">Vaccine Expiry Date</Label>
                  <Input
                    type="date"
                    id="vaccineExpiryDate"
                    value={formData.vaccineExpiryDate}
                    onChange={(e) => setFormData({ ...formData, vaccineExpiryDate: e.target.value })}
                  />
                </div>
              </div>

              {/* Animal Smart ID */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="animalSmartId">Animal Smart ID No.</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="animalSmartId"
                        value={formData.animalSmartId}
                        onChange={(e) => setFormData({ ...formData, animalSmartId: e.target.value })}
                        placeholder="Auto-generated ID"
                        readOnly
                      />
                      <Button type="button" onClick={generateSmartId} variant="outline" size="sm">
                        Generate
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="smartIdIssueDate">Smart ID Issue Date</Label>
                    <Input
                      type="date"
                      id="smartIdIssueDate"
                      value={formData.smartIdIssueDate}
                      onChange={(e) => setFormData({ ...formData, smartIdIssueDate: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="smartIdExpiryDate">Smart ID Expiry Date</Label>
                    <Input
                      type="date"
                      id="smartIdExpiryDate"
                      value={formData.smartIdExpiryDate}
                      onChange={(e) => setFormData({ ...formData, smartIdExpiryDate: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Vet Verification */}
              <div className="bg-green-50 p-4 rounded-lg">
                <Label className="text-lg font-semibold mb-4 block">Issuing Vet Verification</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="issuingVetPhone">Issuing Vet Phone</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="issuingVetPhone"
                        value={formData.issuingVetPhone}
                        onChange={(e) => setFormData({ ...formData, issuingVetPhone: e.target.value })}
                        placeholder="Enter vet phone number"
                      />
                      <Button type="button" onClick={sendOTP} variant="outline" className="flex items-center space-x-1">
                        <Phone className="w-4 h-4" />
                        <span>Send OTP</span>
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="otpCode">Enter OTP for Verification</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="otpCode"
                        value={formData.otpCode}
                        onChange={(e) => setFormData({ ...formData, otpCode: e.target.value })}
                        placeholder="Enter OTP"
                      />
                      <Button type="button" onClick={verifyOTP} variant="outline">
                        Verify
                      </Button>
                    </div>
                  </div>
                </div>

                {formData.isVetVerified && (
                  <div className="mt-4 p-2 bg-green-100 rounded text-green-700 text-sm flex items-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <span>Vet verification successful</span>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-center space-x-4 pt-6">
                <Button type="submit" size="lg" className="px-8">
                  Register Animal/Pet
                </Button>
                <Button type="button" size="lg" variant="outline" className="px-8">
                  Save as Draft
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}