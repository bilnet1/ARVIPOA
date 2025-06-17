import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Camera, Upload, TreePine, MapPin } from 'lucide-react';

export default function TreeRegistration() {
  const [formData, setFormData] = useState({
    treeType: '',
    treeName: '',
    plantedAge: '',
    plantedDate: '',
    treeSmartTagId: '',
    treeLocationDigitalAddress: '',
    currentImages: []
  });

  const [ageOption, setAgeOption] = useState<'unknown' | 'date'>('unknown');
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedImages([...uploadedImages, ...files]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Tree Registration Data:', { 
      ...formData, 
      currentImages: uploadedImages 
    });
  };

  const generateDigitalAddress = () => {
    window.open('https://www.ghanapostgps.com/map/', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-white shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
            <CardTitle className="flex items-center space-x-2">
              <TreePine className="w-6 h-6" />
              <span>Tree/Plantation Registration Form</span>
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Tree Registration Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TreePine className="w-5 h-5" />
              <span>Tree Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="treeType">Tree Type</Label>
                  <Input
                    id="treeType"
                    value={formData.treeType}
                    onChange={(e) => setFormData({ ...formData, treeType: e.target.value })}
                    placeholder="Enter tree type (e.g., Oak, Pine, Mahogany)"
                  />
                </div>

                <div>
                  <Label htmlFor="treeName">Tree Name</Label>
                  <Input
                    id="treeName"
                    value={formData.treeName}
                    onChange={(e) => setFormData({ ...formData, treeName: e.target.value })}
                    placeholder="Enter tree name or identifier"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label>Planted/Age Information</Label>
                  <div className="space-y-3 mt-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="ageUnknown"
                        name="ageOption"
                        checked={ageOption === 'unknown'}
                        onChange={() => {
                          setAgeOption('unknown');
                          setFormData({ ...formData, plantedDate: '', plantedAge: "I DON'T KNOW" });
                        }}
                      />
                      <Label htmlFor="ageUnknown">I Don't Know</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="ageDate"
                        name="ageOption"
                        checked={ageOption === 'date'}
                        onChange={() => {
                          setAgeOption('date');
                          setFormData({ ...formData, plantedAge: '' });
                        }}
                      />
                      <Label htmlFor="ageDate">I know the planting date</Label>
                    </div>

                    {ageOption === 'date' && (
                      <div className="mt-3">
                        <Label htmlFor="plantedDate">Planted Date</Label>
                        <Input
                          type="date"
                          id="plantedDate"
                          value={formData.plantedDate}
                          onChange={(e) => setFormData({ ...formData, plantedDate: e.target.value })}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="treeSmartTagId">Tree Smart Tag ID</Label>
                  <Input
                    id="treeSmartTagId"
                    value={formData.treeSmartTagId}
                    onChange={(e) => setFormData({ ...formData, treeSmartTagId: e.target.value })}
                    placeholder="Enter smart tag ID"
                  />
                </div>

                <div>
                  <Label htmlFor="treeLocationDigitalAddress">Tree Location Digital Address</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="treeLocationDigitalAddress"
                      value={formData.treeLocationDigitalAddress}
                      onChange={(e) => setFormData({ ...formData, treeLocationDigitalAddress: e.target.value })}
                      placeholder="Enter digital address"
                    />
                    <Button type="button" onClick={generateDigitalAddress} variant="outline" size="sm">
                      <MapPin className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Current Images Section */}
              <div className="space-y-4">
                <Label>Add Current Images of Tree</Label>
                <div className="flex space-x-4">
                  <Button type="button" variant="outline" className="flex items-center space-x-2">
                    <Camera className="w-4 h-4" />
                    <span>Take Photo</span>
                  </Button>
                  <Button type="button" variant="outline" className="flex items-center space-x-2">
                    <Upload className="w-4 h-4" />
                    <span>Upload Images</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </Button>
                </div>

                {uploadedImages.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">
                      Uploaded Images ({uploadedImages.length}):
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {uploadedImages.map((file, index) => (
                        <div key={index} className="p-2 bg-gray-100 rounded-lg text-center">
                          <div className="w-full h-20 bg-gray-200 rounded mb-2 flex items-center justify-center">
                            <Camera className="w-6 h-6 text-gray-400" />
                          </div>
                          <p className="text-xs text-gray-600 truncate">{file.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {uploadedImages.length === 0 && (
                  <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <TreePine className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600">No images uploaded yet. Add photos to document the tree.</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4 pt-6">
                <Button type="submit" size="lg" className="px-8 bg-green-600 hover:bg-green-700">
                  Save Tree Registration
                </Button>
                <Button type="button" size="lg" variant="outline" className="px-8">
                  Edit Details
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Information Card */}
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <TreePine className="w-6 h-6 text-green-600 mt-1" />
              <div>
                <h4 className="font-medium text-green-800 mb-2">Tree Registration Benefits</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Track tree growth and health over time</li>
                  <li>• Digital mapping for easy location identification</li>
                  <li>• Smart tag integration for quick access</li>
                  <li>• Environmental impact monitoring</li>
                  <li>• Property value enhancement documentation</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}