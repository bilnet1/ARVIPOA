import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Smartphone, Upload, ArrowLeft, QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ElectronicsRegistrationForm() {
  const [formData, setFormData] = useState<{
    gadgetType: string;
    otherGadgetType: string;
    name: string;
    manufacturer: string;
    otherManufacturer: string;
    model: string;
    dateOfManufacture: string;
    expiryDate: string;
    imeiSerialNumber: string;
    voltageDetails: string;
    qrCode: string;
    gadgetImage: File | null;
    colourScheme: string;
    primaryColour: string;
    secondaryColour: string;
    valueCost: string;
    receiptNo: string;
    propertySmartId: string;
    purchasedDate: string;
    expiryKnown: string;
    condition: string;
    placeOfIssue: string;
    digitalAddress: string;
    purpose: string[];
    specificPurpose: string;
  }>({
    gadgetType: '',
    otherGadgetType: '',
    name: '',
    manufacturer: '',
    otherManufacturer: '',
    model: '',
    dateOfManufacture: '',
    expiryDate: '',
    imeiSerialNumber: '',
    voltageDetails: '',
    qrCode: '',
    gadgetImage: null,
    colourScheme: 'ONE COLOUR',
    primaryColour: '',
    secondaryColour: '',
    valueCost: '',
    receiptNo: '',
    propertySmartId: '',
    purchasedDate: '',
    expiryKnown: '',
    condition: '',
    placeOfIssue: '',
    digitalAddress: '',
    purpose: [],
    specificPurpose: ''
  });

  const gadgetTypes = [
    'Smartphone', 'Laptop', 'Tablet', 'Smart Watch', 'Camera', 'Television', 
    'Radio', 'Gaming Console', 'Printer', 'Router', 'Speaker', 'Headphones', 'Other'
  ];

  const manufacturers = [
    'Apple', 'Samsung', 'Sony', 'LG', 'HP', 'Dell', 'Lenovo', 'Microsoft', 
    'Nintendo', 'Canon', 'Nikon', 'Bose', 'Others'
  ];

  const colours = [
    'Black', 'White', 'Silver', 'Gold', 'Blue', 'Red', 'Green', 'Pink', 
    'Purple', 'Orange', 'Yellow', 'Brown', 'Gray'
  ];

  const purposeOptions = {
    personal: ['Personal Use', 'Self protection', 'Caretaking', 'Will', 'Collateral'],
    commercial: ['Rent', 'Sell', 'Lease', 'Self & property protection', 'Mortgage', 'Auction', 'Caretaking', 'Collateral'],
    mixed: ['Personal use', 'Rent', 'Sell', 'Lease', 'Mortgage', 'Auction', 'Caretaking', 'Will', 'Collateral', 'Transfer Gift']
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePurposeChange = (purpose: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      purpose: checked 
        ? [...prev.purpose, purpose]
        : prev.purpose.filter(p => p !== purpose)
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, gadgetImage: file }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Electronics registration data:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center space-x-3">
            <Smartphone className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Electronics Property Registration</h1>
          </div>
          <p className="text-gray-600 mt-2">Register electronic devices and gadgets with ARVIPOA</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <CardTitle className="flex items-center space-x-2">
              <Smartphone className="w-6 h-6" />
              <span>Add Gadget Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Gadget Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="gadgetType">Gadget Type</Label>
                  <Select value={formData.gadgetType} onValueChange={(value) => handleInputChange('gadgetType', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Choose gadget type" />
                    </SelectTrigger>
                    <SelectContent>
                      {gadgetTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {formData.gadgetType === 'Other' && (
                  <div>
                    <Label htmlFor="otherGadgetType">Other - Please Specify</Label>
                    <Input
                      id="otherGadgetType"
                      value={formData.otherGadgetType}
                      onChange={(e) => handleInputChange('otherGadgetType', e.target.value)}
                      placeholder="Specify gadget type"
                      className="mt-1"
                    />
                  </div>
                )}
              </div>

              {/* Name */}
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter gadget name"
                  className="mt-1"
                />
              </div>

              {/* Manufacturer */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="manufacturer">Manufacturer/Make</Label>
                  <Select value={formData.manufacturer} onValueChange={(value) => handleInputChange('manufacturer', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Choose manufacturer" />
                    </SelectTrigger>
                    <SelectContent>
                      {manufacturers.map((manufacturer) => (
                        <SelectItem key={manufacturer} value={manufacturer}>{manufacturer}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {formData.manufacturer === 'Others' && (
                  <div>
                    <Label htmlFor="otherManufacturer">Others - Please Specify</Label>
                    <Input
                      id="otherManufacturer"
                      value={formData.otherManufacturer}
                      onChange={(e) => handleInputChange('otherManufacturer', e.target.value)}
                      placeholder="Specify manufacturer"
                      className="mt-1"
                    />
                  </div>
                )}
              </div>

              {/* Model */}
              <div>
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  value={formData.model}
                  onChange={(e) => handleInputChange('model', e.target.value)}
                  placeholder="Enter model"
                  className="mt-1"
                />
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="dateOfManufacture">Date of Manufacture</Label>
                  <Input
                    id="dateOfManufacture"
                    type="date"
                    value={formData.dateOfManufacture}
                    onChange={(e) => handleInputChange('dateOfManufacture', e.target.value)}
                    className="mt-1"
                  />
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

              {/* IMEI and Voltage */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="imeiSerialNumber">IMEI/Serial Number</Label>
                  <Input
                    id="imeiSerialNumber"
                    value={formData.imeiSerialNumber}
                    onChange={(e) => handleInputChange('imeiSerialNumber', e.target.value)}
                    placeholder="Enter IMEI or serial number"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="voltageDetails">Voltage Details</Label>
                  <Input
                    id="voltageDetails"
                    value={formData.voltageDetails}
                    onChange={(e) => handleInputChange('voltageDetails', e.target.value)}
                    placeholder="Enter voltage details"
                    className="mt-1"
                  />
                </div>
              </div>

              {/* QR Code Scanner */}
              <div>
                <Label>QR Code Scanner</Label>
                <Button type="button" variant="outline" className="mt-1 flex items-center space-x-2">
                  <QrCode className="w-4 h-4" />
                  <span>Open Camera to Scan QR Code</span>
                </Button>
              </div>

              {/* Colour Scheme */}
              <div>
                <Label>Colour Scheme</Label>
                <div className="mt-2 space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="oneColour"
                        name="colourScheme"
                        value="ONE COLOUR"
                        checked={formData.colourScheme === 'ONE COLOUR'}
                        onChange={(e) => handleInputChange('colourScheme', e.target.value)}
                      />
                      <Label htmlFor="oneColour">One Colour</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="mixed"
                        name="colourScheme"
                        value="MIXED"
                        checked={formData.colourScheme === 'MIXED'}
                        onChange={(e) => handleInputChange('colourScheme', e.target.value)}
                      />
                      <Label htmlFor="mixed">Mixed</Label>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="primaryColour">Primary Colour</Label>
                      <Select value={formData.primaryColour} onValueChange={(value) => handleInputChange('primaryColour', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Choose primary colour" />
                        </SelectTrigger>
                        <SelectContent>
                          {colours.map((colour) => (
                            <SelectItem key={colour} value={colour}>{colour}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {formData.colourScheme === 'MIXED' && (
                      <div>
                        <Label htmlFor="secondaryColour">Secondary Colour</Label>
                        <Select value={formData.secondaryColour} onValueChange={(value) => handleInputChange('secondaryColour', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Choose secondary colour" />
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

              {/* Value and Receipt */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="valueCost">Value/Cost During Purchase</Label>
                  <Input
                    id="valueCost"
                    value={formData.valueCost}
                    onChange={(e) => handleInputChange('valueCost', e.target.value)}
                    placeholder="Enter purchase cost"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="receiptNo">Receipt Number</Label>
                  <Input
                    id="receiptNo"
                    value={formData.receiptNo}
                    onChange={(e) => handleInputChange('receiptNo', e.target.value)}
                    placeholder="Enter receipt number"
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Smart ID and Purchase Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="propertySmartId">Property Smart ID Number</Label>
                  <Input
                    id="propertySmartId"
                    value={formData.propertySmartId}
                    onChange={(e) => handleInputChange('propertySmartId', e.target.value)}
                    placeholder="Enter property smart ID"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="purchasedDate">Purchased Date</Label>
                  <Input
                    id="purchasedDate"
                    type="date"
                    value={formData.purchasedDate}
                    onChange={(e) => handleInputChange('purchasedDate', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Purpose Selection */}
              <div>
                <Label>Purpose</Label>
                <div className="mt-2 space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Personal</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {purposeOptions.personal.map((purpose) => (
                        <div key={purpose} className="flex items-center space-x-2">
                          <Checkbox
                            id={`personal-${purpose}`}
                            checked={formData.purpose.includes(purpose)}
                            onCheckedChange={(checked) => handlePurposeChange(purpose, checked as boolean)}
                          />
                          <Label htmlFor={`personal-${purpose}`} className="text-sm">{purpose}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Commercial</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {purposeOptions.commercial.map((purpose) => (
                        <div key={purpose} className="flex items-center space-x-2">
                          <Checkbox
                            id={`commercial-${purpose}`}
                            checked={formData.purpose.includes(purpose)}
                            onCheckedChange={(checked) => handlePurposeChange(purpose, checked as boolean)}
                          />
                          <Label htmlFor={`commercial-${purpose}`} className="text-sm">{purpose}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Mixed Use</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {purposeOptions.mixed.map((purpose) => (
                        <div key={purpose} className="flex items-center space-x-2">
                          <Checkbox
                            id={`mixed-${purpose}`}
                            checked={formData.purpose.includes(purpose)}
                            onCheckedChange={(checked) => handlePurposeChange(purpose, checked as boolean)}
                          />
                          <Label htmlFor={`mixed-${purpose}`} className="text-sm">{purpose}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Specific Purpose */}
              <div>
                <Label htmlFor="specificPurpose">Specify Purpose</Label>
                <Textarea
                  id="specificPurpose"
                  value={formData.specificPurpose}
                  onChange={(e) => handleInputChange('specificPurpose', e.target.value)}
                  placeholder="Specify additional purpose details"
                  className="mt-1"
                />
              </div>

              {/* Image Upload */}
              <div>
                <Label htmlFor="gadgetImage">Attach Image of Gadget</Label>
                <div className="mt-1 flex items-center space-x-4">
                  <Input
                    id="gadgetImage"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="flex-1"
                  />
                  <Button type="button" variant="outline" className="flex items-center space-x-2">
                    <Upload className="w-4 h-4" />
                    <span>Upload</span>
                  </Button>
                </div>
                {formData.gadgetImage && (
                  <p className="text-sm text-green-600 mt-2">
                    File selected: {formData.gadgetImage.name}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-6">
                <Button type="button" variant="outline" asChild>
                  <Link to="/">Cancel</Link>
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Register Electronics
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}