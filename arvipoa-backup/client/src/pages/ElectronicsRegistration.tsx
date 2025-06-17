import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Camera, Upload, QrCode, Smartphone, Monitor } from 'lucide-react';

const gadgetTypes = [
  'Smartphone', 'Laptop', 'Desktop Computer', 'Tablet', 'Smart TV', 'Camera', 
  'Audio System', 'Gaming Console', 'Smart Watch', 'Drone', 'Robot', 'IoT Device'
];

const manufacturers = [
  'Apple', 'Samsung', 'Huawei', 'Xiaomi', 'Sony', 'LG', 'Dell', 'HP', 
  'Lenovo', 'Asus', 'Canon', 'Nikon', 'Bose', 'JBL', 'Nintendo', 'PlayStation'
];

const colors = [
  'Black', 'White', 'Silver', 'Gold', 'Blue', 'Red', 'Green', 'Pink', 
  'Purple', 'Orange', 'Yellow', 'Gray', 'Brown'
];

const imeiTypes = ['IMEI', 'Serial Number', 'Model Number', 'Product Code'];

export default function ElectronicsRegistration() {
  const [formData, setFormData] = useState({
    gadgetType: '',
    gadgetTypeOther: '',
    name: '',
    manufacturer: '',
    manufacturerOther: '',
    model: '',
    dateOfManufacture: '',
    expiryDate: '',
    imeiSerialNumber: '',
    imeiType: '',
    voltageDetails: '',
    colourScheme: 'ONE COLOUR',
    primaryColor: '',
    secondaryColor: '',
    valueCost: '',
    receiptNo: '',
    propertySmartId: '',
    purchasedDate: '',
    expiryDatePurchase: '',
    condition: 'NEWLY PURCHASED',
    placeOfIssue: '',
    digitalAddress: '',
    purpose: 'Personal Use'
  });

  const [hasQrCode, setHasQrCode] = useState(false);
  const [attachedImages, setAttachedImages] = useState<File[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachedImages([...attachedImages, ...files]);
  };

  const handleQrScan = () => {
    console.log('Opening camera for QR code scanning...');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Electronics Registration Data:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-white shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardTitle className="flex items-center space-x-2">
              <Smartphone className="w-6 h-6" />
              <span>Electronics Property Registration Form</span>
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Electronics Registration Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Monitor className="w-5 h-5" />
              <span>Add Gadget Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="gadgetType">Gadget Type</Label>
                  <Select value={formData.gadgetType} onValueChange={(value) => setFormData({ ...formData, gadgetType: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose gadget type" />
                    </SelectTrigger>
                    <SelectContent>
                      {gadgetTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                      <SelectItem value="OTHER">OTHER</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.gadgetType === 'OTHER' && (
                  <div>
                    <Label htmlFor="gadgetTypeOther">Other - Please Specify</Label>
                    <Input
                      id="gadgetTypeOther"
                      value={formData.gadgetTypeOther}
                      onChange={(e) => setFormData({ ...formData, gadgetTypeOther: e.target.value })}
                      placeholder="Specify gadget type"
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter gadget name"
                  />
                </div>

                <div>
                  <Label htmlFor="manufacturer">Manufacturer/Make</Label>
                  <Select value={formData.manufacturer} onValueChange={(value) => setFormData({ ...formData, manufacturer: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose manufacturer" />
                    </SelectTrigger>
                    <SelectContent>
                      {manufacturers.map((manufacturer) => (
                        <SelectItem key={manufacturer} value={manufacturer}>{manufacturer}</SelectItem>
                      ))}
                      <SelectItem value="OTHERS">OTHERS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.manufacturer === 'OTHERS' && (
                  <div>
                    <Label htmlFor="manufacturerOther">Others - Please Specify</Label>
                    <Input
                      id="manufacturerOther"
                      value={formData.manufacturerOther}
                      onChange={(e) => setFormData({ ...formData, manufacturerOther: e.target.value })}
                      placeholder="Specify manufacturer"
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="model">Model</Label>
                  <Input
                    id="model"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    placeholder="Enter model"
                  />
                </div>

                <div>
                  <Label htmlFor="dateOfManufacture">Date of Manufacture</Label>
                  <Input
                    type="date"
                    id="dateOfManufacture"
                    value={formData.dateOfManufacture}
                    onChange={(e) => setFormData({ ...formData, dateOfManufacture: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    type="date"
                    id="expiryDate"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="imeiType">IMEI/Serial Number Type</Label>
                  <Select value={formData.imeiType} onValueChange={(value) => setFormData({ ...formData, imeiType: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose type" />
                    </SelectTrigger>
                    <SelectContent>
                      {imeiTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="imeiSerialNumber">IMEI/Serial Number</Label>
                  <Input
                    id="imeiSerialNumber"
                    value={formData.imeiSerialNumber}
                    onChange={(e) => setFormData({ ...formData, imeiSerialNumber: e.target.value })}
                    placeholder="Enter IMEI/Serial number"
                  />
                </div>

                <div>
                  <Label htmlFor="voltageDetails">Voltage Details</Label>
                  <Input
                    id="voltageDetails"
                    value={formData.voltageDetails}
                    onChange={(e) => setFormData({ ...formData, voltageDetails: e.target.value })}
                    placeholder="Enter voltage details"
                  />
                </div>
              </div>

              {/* QR Code Scanning */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={hasQrCode}
                    onCheckedChange={setHasQrCode}
                  />
                  <Label>This gadget has a QR code</Label>
                </div>
                
                {hasQrCode && (
                  <Button type="button" onClick={handleQrScan} variant="outline" className="flex items-center space-x-2">
                    <QrCode className="w-4 h-4" />
                    <span>Open Camera to Scan QR Code</span>
                  </Button>
                )}
              </div>

              {/* Image Attachment */}
              <div className="space-y-4">
                <Label>Attach Image of Gadget</Label>
                <div className="flex space-x-4">
                  <Button type="button" variant="outline" className="flex items-center space-x-2">
                    <Camera className="w-4 h-4" />
                    <span>Take Photo</span>
                  </Button>
                  <Button type="button" variant="outline" className="flex items-center space-x-2">
                    <Upload className="w-4 h-4" />
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </Button>
                </div>
                {attachedImages.length > 0 && (
                  <div className="text-sm text-gray-600">
                    Attached: {attachedImages.map(file => file.name).join(', ')}
                  </div>
                )}
              </div>

              {/* Color Scheme */}
              <div className="space-y-4">
                <Label>Colour Scheme</Label>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="oneColour"
                      name="colourScheme"
                      value="ONE COLOUR"
                      checked={formData.colourScheme === 'ONE COLOUR'}
                      onChange={(e) => setFormData({ ...formData, colourScheme: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, colourScheme: e.target.value })}
                    />
                    <Label htmlFor="mixed">Mixed</Label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <Select value={formData.primaryColor} onValueChange={(value) => setFormData({ ...formData, primaryColor: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose primary color" />
                      </SelectTrigger>
                      <SelectContent>
                        {colors.map((color) => (
                          <SelectItem key={color} value={color}>{color}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.colourScheme === 'MIXED' && (
                    <div>
                      <Label htmlFor="secondaryColor">Secondary Color</Label>
                      <Select value={formData.secondaryColor} onValueChange={(value) => setFormData({ ...formData, secondaryColor: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose secondary color" />
                        </SelectTrigger>
                        <SelectContent>
                          {colors.map((color) => (
                            <SelectItem key={color} value={color}>{color}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </div>

              {/* Purchase Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="valueCost">Value/Cost During Purchase</Label>
                  <Input
                    id="valueCost"
                    value={formData.valueCost}
                    onChange={(e) => setFormData({ ...formData, valueCost: e.target.value })}
                    placeholder="Enter purchase cost"
                  />
                </div>

                <div>
                  <Label htmlFor="receiptNo">Receipt No.</Label>
                  <Input
                    id="receiptNo"
                    value={formData.receiptNo}
                    onChange={(e) => setFormData({ ...formData, receiptNo: e.target.value })}
                    placeholder="Enter receipt number"
                  />
                </div>

                <div>
                  <Label htmlFor="propertySmartId">Property Smart ID Number</Label>
                  <Input
                    id="propertySmartId"
                    value={formData.propertySmartId}
                    onChange={(e) => setFormData({ ...formData, propertySmartId: e.target.value })}
                    placeholder="Enter property smart ID"
                  />
                </div>

                <div>
                  <Label htmlFor="purchasedDate">Purchased Date</Label>
                  <Input
                    type="date"
                    id="purchasedDate"
                    value={formData.purchasedDate}
                    onChange={(e) => setFormData({ ...formData, purchasedDate: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="expiryDatePurchase">Expiry Date</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="dontKnow"
                        name="expiryOption"
                        value="I DON'T KNOW"
                        onChange={() => setFormData({ ...formData, expiryDatePurchase: "I DON'T KNOW" })}
                      />
                      <Label htmlFor="dontKnow">I Don't Know</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="notYet"
                        name="expiryOption"
                        value="NOT YET"
                        onChange={() => setFormData({ ...formData, expiryDatePurchase: "NOT YET" })}
                      />
                      <Label htmlFor="notYet">Not Yet</Label>
                    </div>
                    <Input
                      type="date"
                      value={formData.expiryDatePurchase}
                      onChange={(e) => setFormData({ ...formData, expiryDatePurchase: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="condition">Condition</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="newlyPurchased"
                        name="condition"
                        value="NEWLY PURCHASED"
                        checked={formData.condition === 'NEWLY PURCHASED'}
                        onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                      />
                      <Label htmlFor="newlyPurchased">Newly Purchased</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="used"
                        name="condition"
                        value="USED"
                        checked={formData.condition === 'USED'}
                        onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                      />
                      <Label htmlFor="used">Used</Label>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="placeOfIssue">Place of Issue</Label>
                  <Input
                    id="placeOfIssue"
                    value={formData.placeOfIssue}
                    onChange={(e) => setFormData({ ...formData, placeOfIssue: e.target.value })}
                    placeholder="Enter place of issue"
                  />
                </div>

                <div>
                  <Label htmlFor="digitalAddress">Digital Address</Label>
                  <Input
                    id="digitalAddress"
                    value={formData.digitalAddress}
                    onChange={(e) => setFormData({ ...formData, digitalAddress: e.target.value })}
                    placeholder="Enter digital address"
                  />
                </div>
              </div>

              {/* Purpose Selection */}
              <div className="space-y-4">
                <Label>Purpose</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Personal Use */}
                  <div className="space-y-2">
                    <h4 className="font-medium">Personal Use</h4>
                    {['Personal Use', 'Self protection', 'Caretaking', 'Will', 'Collateral'].map((purpose) => (
                      <div key={purpose} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={purpose}
                          name="purpose"
                          value={purpose}
                          checked={formData.purpose === purpose}
                          onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                        />
                        <Label htmlFor={purpose}>{purpose}</Label>
                      </div>
                    ))}
                  </div>

                  {/* Commercial */}
                  <div className="space-y-2">
                    <h4 className="font-medium">Commercial</h4>
                    {['Rent', 'Sell', 'Lease', 'Self & property protection', 'Mortgage', 'Auction', 'Caretaking', 'Collateral'].map((purpose) => (
                      <div key={purpose} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`commercial-${purpose}`}
                          name="purpose"
                          value={purpose}
                          checked={formData.purpose === purpose}
                          onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                        />
                        <Label htmlFor={`commercial-${purpose}`}>{purpose}</Label>
                      </div>
                    ))}
                  </div>

                  {/* Mixed Use */}
                  <div className="space-y-2">
                    <h4 className="font-medium">Mixed Use</h4>
                    {['Personal use', 'Rent', 'Sell', 'Lease', 'Mortgage', 'Auction', 'Caretaking', 'Will', 'Collateral', 'Transfer', 'Gift'].map((purpose) => (
                      <div key={purpose} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`mixed-${purpose}`}
                          name="purpose"
                          value={purpose}
                          checked={formData.purpose === purpose}
                          onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                        />
                        <Label htmlFor={`mixed-${purpose}`}>{purpose}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center space-x-4 pt-6">
                <Button type="submit" size="lg" className="px-8">
                  Register Electronics
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