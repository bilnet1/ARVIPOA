import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Rabbit, Upload, ArrowLeft, Video, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AnimalRegistrationForm() {
  const [formData, setFormData] = useState<{
    name: string;
    category: string;
    petType: string;
    otherPetType: string;
    animalClass: string;
    age: string;
    uses: string;
    colourCategory: string;
    primaryColour: string;
    secondaryColour: string;
    spotted: boolean;
    spottedColour: string;
    animalImages: {
      face: File | null;
      front: File | null;
      back: File | null;
      rightSide: File | null;
      leftSide: File | null;
      topDown: File | null;
    };
    vaccineType: string;
    vaccineIssueDate: string;
    vaccineExpiryDate: string;
    animalSmartId: string;
    smartIdIssueDate: string;
    smartIdExpiryDate: string;
    vetPhone: string;
    otpSent: boolean;
    otpCode: string;
  }>({
    name: '',
    category: '',
    petType: '',
    otherPetType: '',
    animalClass: '',
    age: '',
    uses: '',
    colourCategory: 'ONE COLOUR',
    primaryColour: '',
    secondaryColour: '',
    spotted: false,
    spottedColour: '',
    animalImages: {
      face: null,
      front: null,
      back: null,
      rightSide: null,
      leftSide: null,
      topDown: null,
    },
    vaccineType: '',
    vaccineIssueDate: '',
    vaccineExpiryDate: '',
    animalSmartId: '',
    smartIdIssueDate: '',
    smartIdExpiryDate: '',
    vetPhone: '',
    otpSent: false,
    otpCode: ''
  });

  const categories = ['Domestic', 'Commercial', 'Pet', 'Mixed'];
  const petTypes = ['Dog', 'Cat', 'Cow', 'Goat', 'Sheep', 'Pig', 'Chicken', 'Horse', 'Rabbit', 'Fish', 'Bird', 'Others'];
  const animalClasses = ['Domestic', 'Wild', 'Crossbreed', 'All'];
  const colours = ['BLACK', 'BROWN', 'WHITE', 'GREY', 'GREEN', 'YELLOW'];
  const imageTypes = ['face', 'front', 'back', 'rightSide', 'leftSide', 'topDown'] as const;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (imageType: keyof typeof formData.animalImages, file: File) => {
    setFormData(prev => ({
      ...prev,
      animalImages: {
        ...prev.animalImages,
        [imageType]: file
      }
    }));
  };

  const generateSmartId = () => {
    const smartId = `ANM-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    setFormData(prev => ({ ...prev, animalSmartId: smartId }));
  };

  const sendOTP = () => {
    if (formData.vetPhone) {
      // Simulate OTP sending
      setFormData(prev => ({ ...prev, otpSent: true }));
      console.log('OTP sent to:', formData.vetPhone);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Animal registration data:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-orange-600 hover:text-orange-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center space-x-3">
            <Rabbit className="w-8 h-8 text-orange-600" />
            <h1 className="text-3xl font-bold text-gray-900">Animal/Pet Registration</h1>
          </div>
          <p className="text-gray-600 mt-2">Register animals and pets with ARVIPOA monitoring system</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-orange-600 to-orange-700 text-white">
            <CardTitle className="flex items-center space-x-2">
              <Rabbit className="w-6 h-6" />
              <span>Add Animal/Pet</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter animal/pet name"
                  className="mt-1"
                  required
                />
              </div>

              {/* Categories */}
              <div>
                <Label htmlFor="category">Categories</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Types of Pets/Livestock */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="petType">Types of Pets/Livestock</Label>
                  <Select value={formData.petType} onValueChange={(value) => handleInputChange('petType', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Choose pet type" />
                    </SelectTrigger>
                    <SelectContent>
                      {petTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {formData.petType === 'Others' && (
                  <div>
                    <Label htmlFor="otherPetType">Others - Please Specify</Label>
                    <Input
                      id="otherPetType"
                      value={formData.otherPetType}
                      onChange={(e) => handleInputChange('otherPetType', e.target.value)}
                      placeholder="Specify pet type"
                      className="mt-1"
                    />
                  </div>
                )}
              </div>

              {/* Class */}
              <div>
                <Label htmlFor="animalClass">Class</Label>
                <Select value={formData.animalClass} onValueChange={(value) => handleInputChange('animalClass', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select animal class" />
                  </SelectTrigger>
                  <SelectContent>
                    {animalClasses.map((animalClass) => (
                      <SelectItem key={animalClass} value={animalClass}>{animalClass}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Age */}
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="date"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="mt-1"
                />
              </div>

              {/* Uses */}
              <div>
                <Label htmlFor="uses">Uses</Label>
                <Select value={formData.uses} onValueChange={(value) => handleInputChange('uses', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select use category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((use) => (
                      <SelectItem key={use} value={use}>{use}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Colour Category */}
              <div>
                <Label>Colour Category</Label>
                <div className="mt-2 space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="oneColour"
                        name="colourCategory"
                        value="ONE COLOUR"
                        checked={formData.colourCategory === 'ONE COLOUR'}
                        onChange={(e) => handleInputChange('colourCategory', e.target.value)}
                      />
                      <Label htmlFor="oneColour">One Colour</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="mixedColour"
                        name="colourCategory"
                        value="MIXED COLOUR"
                        checked={formData.colourCategory === 'MIXED COLOUR'}
                        onChange={(e) => handleInputChange('colourCategory', e.target.value)}
                      />
                      <Label htmlFor="mixedColour">Mixed Colour</Label>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="primaryColour">Primary Colour</Label>
                      <Select value={formData.primaryColour} onValueChange={(value) => handleInputChange('primaryColour', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select colour" />
                        </SelectTrigger>
                        <SelectContent>
                          {colours.map((colour) => (
                            <SelectItem key={colour} value={colour}>{colour}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {formData.colourCategory === 'MIXED COLOUR' && (
                      <div>
                        <Label htmlFor="secondaryColour">Secondary Colour</Label>
                        <Select value={formData.secondaryColour} onValueChange={(value) => handleInputChange('secondaryColour', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select colour" />
                          </SelectTrigger>
                          <SelectContent>
                            {colours.map((colour) => (
                              <SelectItem key={colour} value={colour}>{colour}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>

                  {/* Spotted Pattern */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="spotted"
                        checked={formData.spotted}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, spotted: checked as boolean }))}
                      />
                      <Label htmlFor="spotted">Spotted</Label>
                    </div>
                    {formData.spotted && (
                      <div>
                        <Label htmlFor="spottedColour">Spotted with Colour</Label>
                        <Select value={formData.spottedColour} onValueChange={(value) => handleInputChange('spottedColour', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select spot colour" />
                          </SelectTrigger>
                          <SelectContent>
                            {colours.map((colour) => (
                              <SelectItem key={colour} value={colour}>{colour}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Add Images */}
              <div>
                <Label>Add Images</Label>
                <div className="mt-2 space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                    <Video className="w-6 h-6 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-900">Face Capture</p>
                      <p className="text-sm text-blue-700">Open video recorder to record face and entire body</p>
                    </div>
                    <Button type="button" variant="outline" className="bg-blue-600 text-white hover:bg-blue-700">
                      Record Video
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {imageTypes.map((type) => (
                      <div key={type}>
                        <Label htmlFor={`image-${type}`} className="capitalize">
                          {type.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </Label>
                        <Input
                          id={`image-${type}`}
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(type, file);
                          }}
                          className="mt-1"
                        />
                        {formData.animalImages[type] && (
                          <p className="text-sm text-green-600 mt-1">
                            {formData.animalImages[type]?.name}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Vaccine Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Vaccine Information</h3>
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
                    <Label htmlFor="vaccineIssueDate">Date of Issue</Label>
                    <Input
                      id="vaccineIssueDate"
                      type="date"
                      value={formData.vaccineIssueDate}
                      onChange={(e) => handleInputChange('vaccineIssueDate', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="vaccineExpiryDate">Expiry Date</Label>
                    <Input
                      id="vaccineExpiryDate"
                      type="date"
                      value={formData.vaccineExpiryDate}
                      onChange={(e) => handleInputChange('vaccineExpiryDate', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Animal Smart ID */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Animal Smart ID</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="animalSmartId">Animal Smart ID No.</Label>
                    <div className="flex space-x-2 mt-1">
                      <Input
                        id="animalSmartId"
                        value={formData.animalSmartId}
                        onChange={(e) => handleInputChange('animalSmartId', e.target.value)}
                        placeholder="Auto generated ID"
                        className="flex-1"
                        readOnly
                      />
                      <Button type="button" onClick={generateSmartId} variant="outline">
                        Generate
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="smartIdIssueDate">Date of Issue</Label>
                    <Input
                      id="smartIdIssueDate"
                      type="date"
                      value={formData.smartIdIssueDate}
                      onChange={(e) => handleInputChange('smartIdIssueDate', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="smartIdExpiryDate">Expiry Date</Label>
                    <Input
                      id="smartIdExpiryDate"
                      type="date"
                      value={formData.smartIdExpiryDate}
                      onChange={(e) => handleInputChange('smartIdExpiryDate', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Issuing Vet Verification */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Issuing Vet Verification</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="vetPhone">Issuing Vet Phone</Label>
                    <div className="flex space-x-2 mt-1">
                      <Input
                        id="vetPhone"
                        value={formData.vetPhone}
                        onChange={(e) => handleInputChange('vetPhone', e.target.value)}
                        placeholder="Enter vet phone number"
                        className="flex-1"
                      />
                      <Button type="button" onClick={sendOTP} variant="outline" className="flex items-center space-x-1">
                        <Phone className="w-4 h-4" />
                        <span>Send OTP</span>
                      </Button>
                    </div>
                  </div>
                  {formData.otpSent && (
                    <div>
                      <Label htmlFor="otpCode">Enter OTP for Verification</Label>
                      <Input
                        id="otpCode"
                        value={formData.otpCode}
                        onChange={(e) => handleInputChange('otpCode', e.target.value)}
                        placeholder="Enter OTP code"
                        className="mt-1"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-6">
                <Button type="button" variant="outline" asChild>
                  <Link to="/">Cancel</Link>
                </Button>
                <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
                  Register Animal
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}