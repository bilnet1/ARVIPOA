import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Camera, Upload, Target, Shield } from 'lucide-react';

const armColors = ['BLACK', 'BLUE', 'BROWN', 'RED', 'WHITE', 'GREY'];

export default function ArmsRegistration() {
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    manufacturer: '',
    serialNumber: '',
    barrel: '',
    boreCallibre: '',
    buttNumber: '',
    licenseNo: '',
    issueDate: '',
    expiryDate: '',
    placeOfIssue: '',
    regionalNo: '',
    colour: '',
    iwomsId: '',
    productImage: null as File | null
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData({ ...formData, productImage: file });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Arms Registration Data:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-white shadow-lg">
          <CardHeader className="bg-gradient-to-r from-red-600 to-orange-600 text-white">
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-6 h-6" />
              <span>Arms Registration Form</span>
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Arms Registration Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Arms Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Input
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    placeholder="Enter arms type"
                  />
                </div>

                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter arms name"
                  />
                </div>

                <div>
                  <Label htmlFor="manufacturer">Manufacturer</Label>
                  <Input
                    id="manufacturer"
                    value={formData.manufacturer}
                    onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                    placeholder="Enter manufacturer"
                  />
                </div>

                <div>
                  <Label htmlFor="serialNumber">Serial Number</Label>
                  <Input
                    id="serialNumber"
                    value={formData.serialNumber}
                    onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                    placeholder="Enter serial number"
                  />
                </div>

                <div>
                  <Label htmlFor="barrel">Barrel</Label>
                  <Input
                    id="barrel"
                    value={formData.barrel}
                    onChange={(e) => setFormData({ ...formData, barrel: e.target.value })}
                    placeholder="Enter barrel details"
                  />
                </div>

                <div>
                  <Label htmlFor="boreCallibre">Bore/Calibre</Label>
                  <Input
                    id="boreCallibre"
                    value={formData.boreCallibre}
                    onChange={(e) => setFormData({ ...formData, boreCallibre: e.target.value })}
                    placeholder="Enter bore/calibre"
                  />
                </div>

                <div>
                  <Label htmlFor="buttNumber">Butt Number</Label>
                  <Input
                    id="buttNumber"
                    value={formData.buttNumber}
                    onChange={(e) => setFormData({ ...formData, buttNumber: e.target.value })}
                    placeholder="Enter butt number"
                  />
                </div>

                <div>
                  <Label htmlFor="licenseNo">License No.</Label>
                  <Input
                    id="licenseNo"
                    value={formData.licenseNo}
                    onChange={(e) => setFormData({ ...formData, licenseNo: e.target.value })}
                    placeholder="Enter license number"
                  />
                </div>

                <div>
                  <Label htmlFor="issueDate">Issue Date</Label>
                  <Input
                    type="date"
                    id="issueDate"
                    value={formData.issueDate}
                    onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
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
                  <Label htmlFor="placeOfIssue">Place of Issue</Label>
                  <Input
                    id="placeOfIssue"
                    value={formData.placeOfIssue}
                    onChange={(e) => setFormData({ ...formData, placeOfIssue: e.target.value })}
                    placeholder="Enter place of issue"
                  />
                </div>

                <div>
                  <Label htmlFor="regionalNo">Regional No.</Label>
                  <Input
                    id="regionalNo"
                    value={formData.regionalNo}
                    onChange={(e) => setFormData({ ...formData, regionalNo: e.target.value })}
                    placeholder="Enter regional number"
                  />
                </div>

                <div>
                  <Label htmlFor="colour">Colour</Label>
                  <Select value={formData.colour} onValueChange={(value) => setFormData({ ...formData, colour: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose colour" />
                    </SelectTrigger>
                    <SelectContent>
                      {armColors.map((color) => (
                        <SelectItem key={color} value={color}>{color}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="iwomsId">IWOMS ID</Label>
                  <Input
                    id="iwomsId"
                    value={formData.iwomsId}
                    onChange={(e) => setFormData({ ...formData, iwomsId: e.target.value })}
                    placeholder="Enter IWOMS ID"
                  />
                </div>
              </div>

              {/* Product Image Attachment */}
              <div className="space-y-4">
                <Label>Product Image Attachment</Label>
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
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </Button>
                </div>
                {formData.productImage && (
                  <p className="text-sm text-gray-600">
                    Selected: {formData.productImage.name}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-center space-x-4 pt-6">
                <Button type="submit" size="lg" className="px-8">
                  Register Arms
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