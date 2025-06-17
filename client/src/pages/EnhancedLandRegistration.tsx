import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Camera, 
  Upload, 
  QrCode, 
  FileText, 
  Users, 
  Calendar,
  CheckCircle,
  AlertCircle,
  Target,
  Palette,
  Map,
  Satellite,
  Building,
  TreePine,
  User,
  Phone,
  Mail,
  FileCheck,
  DollarSign,
  Clock,
  Shield
} from 'lucide-react';

interface PropertyColor {
  id: string;
  name: string;
  hex: string;
  category: string;
}

interface SitePlanCoordinate {
  id: string;
  x: number;
  y: number;
  label: string;
  type: 'boundary' | 'structure' | 'landmark' | 'utility';
}

interface PartyRepresentation {
  id: string;
  role: 'seller' | 'buyer' | 'agent' | 'witness' | 'solicitor';
  capacity: 'individual' | 'organization' | 'stool' | 'community' | 'clan' | 'family';
  position: 'head' | 'subordinate' | 'nextOfKin' | 'representative' | 'consultant' | 'facilitator';
  title: string;
  titleNumerals: string;
  name: string;
  phone: string;
  email: string;
  isLiving: boolean;
  isVerified: boolean;
}

const propertyColors: PropertyColor[] = [
  { id: '1', name: 'White', hex: '#FFFFFF', category: 'neutral' },
  { id: '2', name: 'Cream', hex: '#F5F5DC', category: 'neutral' },
  { id: '3', name: 'Beige', hex: '#F5F5DC', category: 'neutral' },
  { id: '4', name: 'Light Gray', hex: '#D3D3D3', category: 'neutral' },
  { id: '5', name: 'Gray', hex: '#808080', category: 'neutral' },
  { id: '6', name: 'Charcoal', hex: '#36454F', category: 'neutral' },
  { id: '7', name: 'Black', hex: '#000000', category: 'neutral' },
  { id: '8', name: 'Red', hex: '#FF0000', category: 'warm' },
  { id: '9', name: 'Maroon', hex: '#800000', category: 'warm' },
  { id: '10', name: 'Orange', hex: '#FFA500', category: 'warm' },
  { id: '11', name: 'Yellow', hex: '#FFFF00', category: 'warm' },
  { id: '12', name: 'Gold', hex: '#FFD700', category: 'warm' },
  { id: '13', name: 'Blue', hex: '#0000FF', category: 'cool' },
  { id: '14', name: 'Navy Blue', hex: '#000080', category: 'cool' },
  { id: '15', name: 'Light Blue', hex: '#ADD8E6', category: 'cool' },
  { id: '16', name: 'Green', hex: '#008000', category: 'natural' },
  { id: '17', name: 'Forest Green', hex: '#228B22', category: 'natural' },
  { id: '18', name: 'Brown', hex: '#A52A2A', category: 'natural' },
  { id: '19', name: 'Tan', hex: '#D2B48C', category: 'natural' },
  { id: '20', name: 'Purple', hex: '#800080', category: 'vibrant' },
  { id: '21', name: 'Pink', hex: '#FFC0CB', category: 'vibrant' },
  { id: '22', name: 'Turquoise', hex: '#40E0D0', category: 'vibrant' }
];

const ghanaRegions = [
  'Greater Accra', 'Ashanti', 'Western', 'Central', 'Volta', 'Eastern', 
  'Northern', 'Upper East', 'Upper West', 'Brong-Ahafo', 'Western North',
  'Ahafo', 'Bono East', 'Oti', 'North East', 'Savannah'
];

const titleOptions = [
  'Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.', 'Eng.', 'Arch.', 'Hon.', 'Chief', 'Nana'
];

const servicePackages = [
  { id: 'basic', name: 'Basic', duration: '12 months', fee: 500.00 },
  { id: 'standard', name: 'Standard', duration: '6 months', fee: 2500.00 },
  { id: 'fasttrack', name: 'Fast Track', duration: '3 months', fee: 2500.00 },
  { id: 'gold', name: 'Gold', duration: '1 month', fee: 10000.00 },
  { id: 'prestige', name: 'Prestige', duration: 'Contact for ETC', fee: 0 }
];

export default function EnhancedLandRegistration() {
  const [formData, setFormData] = useState({
    // Property Address
    address: '',
    houseNumber: '',
    locality: '',
    town: '',
    municipal: '',
    region: '',
    digitalAddress: '',
    longitude: '',
    latitude: '',
    pmbNumber: '',
    sitePlanNumber: '',
    landSize: '',
    
    // Site Plan Details
    planFor: '',
    scale: '',
    area: '',
    planLocality: '',
    planDistrict: '',
    planRegion: '',
    surveyorName: '',
    surveyorLicense: '',
    surveyorPhone: '',
    approvalDate: '',
    
    // Smart Pillars
    pillar1Number: '',
    pillar1DigitalAddress: '',
    
    // Indenture Details
    term: '',
    startPeriod: '',
    endPeriod: '',
    agreementText: '',
    
    // Title/Concurrence/Yellow Card
    titleNumber: '',
    applicationStatus: '',
    applicationDate: '',
    readyDate: '',
    selectedPackage: '',
    paymentCode: '',
    
    // Future Use
    futureUse: '',
    
    // Property Colors
    primaryColor: '',
    secondaryColor: '',
    accentColor: ''
  });

  const [partyRepresentations, setPartyRepresentations] = useState<PartyRepresentation[]>([]);
  const [sitePlanCoordinates, setSitePlanCoordinates] = useState<SitePlanCoordinate[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [mapView, setMapView] = useState<'map' | 'terrain' | 'satellite'>('map');
  const [showSitePlanMockup, setShowSitePlanMockup] = useState(false);

  const generateDigitalAddress = () => {
    window.open('https://www.ghanapostgps.com/map/', '_blank');
  };

  const addPartyRepresentation = () => {
    const newParty: PartyRepresentation = {
      id: Date.now().toString(),
      role: 'seller',
      capacity: 'individual',
      position: 'head',
      title: '',
      titleNumerals: '',
      name: '',
      phone: '',
      email: '',
      isLiving: true,
      isVerified: false
    };
    setPartyRepresentations([...partyRepresentations, newParty]);
  };

  const updatePartyRepresentation = (id: string, field: string, value: any) => {
    setPartyRepresentations(prev => 
      prev.map(party => 
        party.id === id ? { ...party, [field]: value } : party
      )
    );
  };

  const sendOTP = (partyId: string) => {
    // OTP sending logic
    console.log('Sending OTP to party:', partyId);
  };

  const verifyOTP = (partyId: string, otp: string) => {
    // OTP verification logic
    updatePartyRepresentation(partyId, 'isVerified', true);
  };

  const SitePlanMockup = () => (
    <div className="bg-white border-2 border-gray-300 rounded-lg p-4 h-96 relative overflow-hidden">
      <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded shadow text-xs font-semibold">
        PLAN OF LAND
      </div>
      
      {/* Boundary Lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
        {/* Property Boundary */}
        <polygon
          points="50,50 350,50 350,250 50,250"
          fill="none"
          stroke="#000"
          strokeWidth="2"
          className="cursor-pointer hover:stroke-blue-500"
          onClick={() => console.log('Boundary clicked')}
        />
        
        {/* Building Structure */}
        <rect
          x="100"
          y="100"
          width="200"
          height="100"
          fill="rgba(0,0,255,0.1)"
          stroke="#0000FF"
          strokeWidth="1"
          className="cursor-pointer hover:fill-blue-200"
          onClick={() => console.log('Building clicked')}
        />
        
        {/* Coordinate Points */}
        {sitePlanCoordinates.map((coord) => (
          <circle
            key={coord.id}
            cx={coord.x}
            cy={coord.y}
            r="4"
            fill="#FF0000"
            className="cursor-pointer hover:fill-red-700"
            onClick={() => console.log('Coordinate clicked:', coord)}
          />
        ))}
        
        {/* Measurements */}
        <text x="200" y="40" textAnchor="middle" className="text-xs">100 feet</text>
        <text x="30" y="150" textAnchor="middle" className="text-xs" transform="rotate(-90, 30, 150)">100 feet</text>
      </svg>
      
      {/* Interactive Elements */}
      <div className="absolute bottom-2 right-2 flex space-x-2">
        <Button size="sm" variant="outline" onClick={() => setMapView('map')}>
          <Map className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="outline" onClick={() => setMapView('terrain')}>
          <TreePine className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="outline" onClick={() => setMapView('satellite')}>
          <Satellite className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );

  const ColorPicker = ({ label, value, onChange }: { label: string; value: string; onChange: (color: string) => void }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="grid grid-cols-6 gap-2">
        {propertyColors.map((color) => (
          <button
            key={color.id}
            type="button"
            className={`w-8 h-8 rounded-full border-2 hover:scale-110 transition-transform ${
              value === color.hex ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'
            }`}
            style={{ backgroundColor: color.hex }}
            onClick={() => onChange(color.hex)}
            title={color.name}
          />
        ))}
      </div>
      {value && (
        <div className="flex items-center space-x-2 mt-2">
          <div 
            className="w-4 h-4 rounded border" 
            style={{ backgroundColor: value }}
          />
          <span className="text-sm text-gray-600">
            {propertyColors.find(c => c.hex === value)?.name || 'Custom Color'}
          </span>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-white shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
            <CardTitle className="flex items-center space-x-2">
              <Building className="w-6 h-6" />
              <span>Enhanced Land Property Registration</span>
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Property Address Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span>Land Property/Asset Address</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="Enter property address"
                />
              </div>
              
              <div>
                <Label htmlFor="houseNumber">House Number *</Label>
                <Input
                  id="houseNumber"
                  value={formData.houseNumber}
                  onChange={(e) => setFormData({...formData, houseNumber: e.target.value})}
                  placeholder="Enter house number"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="locality">Locality *</Label>
                <Input
                  id="locality"
                  value={formData.locality}
                  onChange={(e) => setFormData({...formData, locality: e.target.value})}
                  placeholder="Enter locality"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="town">Town *</Label>
                <Input
                  id="town"
                  value={formData.town}
                  onChange={(e) => setFormData({...formData, town: e.target.value})}
                  placeholder="Enter town"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="municipal">Municipal/District *</Label>
                <Input
                  id="municipal"
                  value={formData.municipal}
                  onChange={(e) => setFormData({...formData, municipal: e.target.value})}
                  placeholder="Enter municipal/district"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="region">Region *</Label>
                <Select value={formData.region} onValueChange={(value) => setFormData({...formData, region: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose region" />
                  </SelectTrigger>
                  <SelectContent>
                    {ghanaRegions.map((region) => (
                      <SelectItem key={region} value={region}>{region}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="digitalAddress">Digital Address *</Label>
                <div className="flex space-x-2">
                  <Input
                    id="digitalAddress"
                    value={formData.digitalAddress}
                    onChange={(e) => setFormData({...formData, digitalAddress: e.target.value})}
                    placeholder="Enter digital address"
                    required
                  />
                  <Button type="button" onClick={generateDigitalAddress} variant="outline">
                    Generate
                  </Button>
                </div>
              </div>
              
              <div>
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  value={formData.longitude}
                  onChange={(e) => setFormData({...formData, longitude: e.target.value})}
                  placeholder="Auto-filled from digital address"
                />
              </div>
              
              <div>
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  value={formData.latitude}
                  onChange={(e) => setFormData({...formData, latitude: e.target.value})}
                  placeholder="Auto-filled from digital address"
                />
              </div>
              
              <div>
                <Label htmlFor="pmbNumber">P.O. Box/PMB Number</Label>
                <Input
                  id="pmbNumber"
                  value={formData.pmbNumber}
                  onChange={(e) => setFormData({...formData, pmbNumber: e.target.value})}
                  placeholder="Enter PMB number"
                />
              </div>
              
              <div>
                <Label htmlFor="sitePlanNumber">Site Plan Number</Label>
                <Input
                  id="sitePlanNumber"
                  value={formData.sitePlanNumber}
                  onChange={(e) => setFormData({...formData, sitePlanNumber: e.target.value})}
                  placeholder="Enter site plan number"
                />
              </div>
              
              <div>
                <Label htmlFor="landSize">Land Size</Label>
                <Input
                  id="landSize"
                  value={formData.landSize}
                  onChange={(e) => setFormData({...formData, landSize: e.target.value})}
                  placeholder="e.g., 100 feet by 100 feet"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Property Color Representation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Palette className="w-5 h-5" />
              <span>Property Color Representation</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ColorPicker 
                label="Primary Color" 
                value={formData.primaryColor} 
                onChange={(color) => setFormData({...formData, primaryColor: color})} 
              />
              <ColorPicker 
                label="Secondary Color" 
                value={formData.secondaryColor} 
                onChange={(color) => setFormData({...formData, secondaryColor: color})} 
              />
              <ColorPicker 
                label="Accent Color" 
                value={formData.accentColor} 
                onChange={(color) => setFormData({...formData, accentColor: color})} 
              />
            </div>
            
            {/* Color Preview */}
            {(formData.primaryColor || formData.secondaryColor || formData.accentColor) && (
              <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                <h4 className="font-medium mb-2">Color Preview:</h4>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div 
                      className="w-16 h-16 rounded-lg border shadow-sm mx-auto mb-2"
                      style={{ backgroundColor: formData.primaryColor || '#f3f4f6' }}
                    />
                    <span className="text-xs text-gray-600">Primary</span>
                  </div>
                  <div className="text-center">
                    <div 
                      className="w-16 h-16 rounded-lg border shadow-sm mx-auto mb-2"
                      style={{ backgroundColor: formData.secondaryColor || '#f3f4f6' }}
                    />
                    <span className="text-xs text-gray-600">Secondary</span>
                  </div>
                  <div className="text-center">
                    <div 
                      className="w-16 h-16 rounded-lg border shadow-sm mx-auto mb-2"
                      style={{ backgroundColor: formData.accentColor || '#f3f4f6' }}
                    />
                    <span className="text-xs text-gray-600">Accent</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Site Plan Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <QrCode className="w-5 h-5" />
              <span>Site Plan & Mockup</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex items-center space-x-2">
                    <QrCode className="w-4 h-4" />
                    <span>Scan Site Plan QR</span>
                  </Button>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <Camera className="w-4 h-4" />
                    <span>Snap Site Plan</span>
                  </Button>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <Upload className="w-4 h-4" />
                    <span>Attach Site Plan</span>
                  </Button>
                </div>
                
                <Button 
                  onClick={() => setShowSitePlanMockup(!showSitePlanMockup)}
                  className="w-full"
                  variant={showSitePlanMockup ? "secondary" : "default"}
                >
                  {showSitePlanMockup ? 'Hide Site Plan Mockup' : 'Show Site Plan Mockup'}
                </Button>
              </div>
              
              {showSitePlanMockup && (
                <div>
                  <SitePlanMockup />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Plan of Land Details */}
        <Card>
          <CardHeader>
            <CardTitle>Plan of Land Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="planFor">For</Label>
                <Input
                  id="planFor"
                  value={formData.planFor}
                  onChange={(e) => setFormData({...formData, planFor: e.target.value})}
                  placeholder="Plan prepared for"
                />
              </div>
              
              <div>
                <Label htmlFor="scale">Scale</Label>
                <Input
                  id="scale"
                  value={formData.scale}
                  onChange={(e) => setFormData({...formData, scale: e.target.value})}
                  placeholder="Plan scale"
                />
              </div>
              
              <div>
                <Label htmlFor="area">Area</Label>
                <Input
                  id="area"
                  value={formData.area}
                  onChange={(e) => setFormData({...formData, area: e.target.value})}
                  placeholder="Total area"
                />
              </div>
              
              <div>
                <Label htmlFor="planLocality">Locality</Label>
                <Input
                  id="planLocality"
                  value={formData.planLocality}
                  onChange={(e) => setFormData({...formData, planLocality: e.target.value})}
                  placeholder="Plan locality"
                />
              </div>
              
              <div>
                <Label htmlFor="planDistrict">District/Metro/Municipal</Label>
                <Input
                  id="planDistrict"
                  value={formData.planDistrict}
                  onChange={(e) => setFormData({...formData, planDistrict: e.target.value})}
                  placeholder="Plan district"
                />
              </div>
              
              <div>
                <Label htmlFor="planRegion">Region</Label>
                <Select value={formData.planRegion} onValueChange={(value) => setFormData({...formData, planRegion: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose region" />
                  </SelectTrigger>
                  <SelectContent>
                    {ghanaRegions.map((region) => (
                      <SelectItem key={region} value={region}>{region}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="surveyorName">Licensed Surveyor Name</Label>
                <Input
                  id="surveyorName"
                  value={formData.surveyorName}
                  onChange={(e) => setFormData({...formData, surveyorName: e.target.value})}
                  placeholder="I, [Name] Licensed surveyor hereby certify..."
                />
              </div>
              
              <div>
                <Label htmlFor="surveyorLicense">Lic. Surveyor's Number</Label>
                <Input
                  id="surveyorLicense"
                  value={formData.surveyorLicense}
                  onChange={(e) => setFormData({...formData, surveyorLicense: e.target.value})}
                  placeholder="License number"
                />
              </div>
              
              <div>
                <Label htmlFor="surveyorPhone">Regional Surveyor Phone</Label>
                <Input
                  id="surveyorPhone"
                  value={formData.surveyorPhone}
                  onChange={(e) => setFormData({...formData, surveyorPhone: e.target.value})}
                  placeholder="Phone number"
                />
              </div>
              
              <div>
                <Label htmlFor="approvalDate">Approval Date</Label>
                <Input
                  type="date"
                  id="approvalDate"
                  value={formData.approvalDate}
                  onChange={(e) => setFormData({...formData, approvalDate: e.target.value})}
                />
              </div>
            </div>
            
            <div className="flex space-x-4 pt-4">
              <Button variant="outline" className="flex items-center space-x-2">
                <Upload className="w-4 h-4" />
                <span>Upload Signature</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <FileCheck className="w-4 h-4" />
                <span>Digital Sign</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Smart Pillars Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>Add Smart Pillars+</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pillar1Number">Pillar Number 1</Label>
                <Input
                  id="pillar1Number"
                  value={formData.pillar1Number}
                  onChange={(e) => setFormData({...formData, pillar1Number: e.target.value})}
                  placeholder="Enter pillar number"
                />
              </div>
              
              <div>
                <Label htmlFor="pillar1DigitalAddress">Pillar 1 Digital Address</Label>
                <div className="flex space-x-2">
                  <Input
                    id="pillar1DigitalAddress"
                    value={formData.pillar1DigitalAddress}
                    onChange={(e) => setFormData({...formData, pillar1DigitalAddress: e.target.value})}
                    placeholder="Enter pillar digital address"
                  />
                  <Button type="button" onClick={generateDigitalAddress} variant="outline" size="sm">
                    Generate
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" className="flex items-center space-x-2">
                <Camera className="w-4 h-4" />
                <span>Take Pillar Photos (2)</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Upload className="w-4 h-4" />
                <span>Attach Images</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Party Representation Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Contract/Indenture/Agreement - Party Representation</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button onClick={addPartyRepresentation} className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Add Party Representation</span>
            </Button>
            
            {partyRepresentations.map((party, index) => (
              <Card key={party.id} className="border-l-4 border-blue-500">
                <CardHeader>
                  <CardTitle className="text-lg">Party "{String.fromCharCode(65 + index)}" - {party.role}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Representing as</Label>
                      <Select 
                        value={party.role} 
                        onValueChange={(value: any) => updatePartyRepresentation(party.id, 'role', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="seller">Seller/Lessor</SelectItem>
                          <SelectItem value="buyer">Buyer/Lessee</SelectItem>
                          <SelectItem value="agent">Agent</SelectItem>
                          <SelectItem value="witness">Witness</SelectItem>
                          <SelectItem value="solicitor">Solicitor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label>Representing as/for</Label>
                      <Select 
                        value={party.capacity} 
                        onValueChange={(value: any) => updatePartyRepresentation(party.id, 'capacity', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="individual">Individual</SelectItem>
                          <SelectItem value="organization">Organization</SelectItem>
                          <SelectItem value="stool">Stool</SelectItem>
                          <SelectItem value="community">Community</SelectItem>
                          <SelectItem value="clan">Clan</SelectItem>
                          <SelectItem value="family">Family</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label>In a capacity as</Label>
                      <Select 
                        value={party.position} 
                        onValueChange={(value: any) => updatePartyRepresentation(party.id, 'position', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="head">Head</SelectItem>
                          <SelectItem value="subordinate">Subordinate</SelectItem>
                          <SelectItem value="nextOfKin">Next of Kin</SelectItem>
                          <SelectItem value="representative">Representative</SelectItem>
                          <SelectItem value="consultant">Consultant</SelectItem>
                          <SelectItem value="facilitator">Facilitator</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label>Title</Label>
                      <Select 
                        value={party.title} 
                        onValueChange={(value) => updatePartyRepresentation(party.id, 'title', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose title" />
                        </SelectTrigger>
                        <SelectContent>
                          {titleOptions.map((title) => (
                            <SelectItem key={title} value={title}>{title}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label>Title Numerals</Label>
                      <Input
                        value={party.titleNumerals}
                        onChange={(e) => updatePartyRepresentation(party.id, 'titleNumerals', e.target.value)}
                        placeholder="e.g., I, II, III"
                      />
                    </div>
                    
                    <div>
                      <Label>Name</Label>
                      <Input
                        value={party.name}
                        onChange={(e) => updatePartyRepresentation(party.id, 'name', e.target.value)}
                        placeholder="Full name"
                      />
                    </div>
                    
                    <div>
                      <Label>Phone</Label>
                      <Input
                        value={party.phone}
                        onChange={(e) => updatePartyRepresentation(party.id, 'phone', e.target.value)}
                        placeholder="Phone number"
                      />
                    </div>
                    
                    <div>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={party.email}
                        onChange={(e) => updatePartyRepresentation(party.id, 'email', e.target.value)}
                        placeholder="Email address"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={party.isLiving}
                        onCheckedChange={(checked) => updatePartyRepresentation(party.id, 'isLiving', checked)}
                      />
                      <Label>Is this person living?</Label>
                    </div>
                    
                    {party.isVerified ? (
                      <Badge variant="secondary" className="flex items-center space-x-1">
                        <CheckCircle className="w-3 h-3" />
                        <span>Verified</span>
                      </Badge>
                    ) : (
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          onClick={() => sendOTP(party.id)}
                          className="flex items-center space-x-1"
                        >
                          <Phone className="w-3 h-3" />
                          <span>Send OTP</span>
                        </Button>
                        <Input
                          placeholder="Enter OTP"
                          className="w-24"
                          onBlur={(e) => {
                            if (e.target.value) {
                              verifyOTP(party.id, e.target.value);
                            }
                          }}
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Indenture Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Indenture Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="term">Term (Number of years)</Label>
                <Input
                  id="term"
                  type="number"
                  value={formData.term}
                  onChange={(e) => setFormData({...formData, term: e.target.value})}
                  placeholder="Enter number of years"
                />
              </div>
              
              <div>
                <Label htmlFor="startPeriod">Start Period</Label>
                <Input
                  type="date"
                  id="startPeriod"
                  value={formData.startPeriod}
                  onChange={(e) => setFormData({...formData, startPeriod: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="endPeriod">End Period</Label>
                <Input
                  type="date"
                  id="endPeriod"
                  value={formData.endPeriod}
                  onChange={(e) => setFormData({...formData, endPeriod: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="agreementText">Agreement Text</Label>
              <Textarea
                id="agreementText"
                value={formData.agreementText}
                onChange={(e) => setFormData({...formData, agreementText: e.target.value})}
                placeholder="Enter agreement details"
                rows={6}
              />
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" className="flex items-center space-x-2">
                <Upload className="w-4 h-4" />
                <span>Add Files</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Camera className="w-4 h-4" />
                <span>Add Images</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Title/Concurrence/Yellow Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Title/Concurrence/Yellow Card</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="titleNumber">Number</Label>
                <div className="flex space-x-2">
                  <Input
                    id="titleNumber"
                    value={formData.titleNumber}
                    onChange={(e) => setFormData({...formData, titleNumber: e.target.value})}
                    placeholder="Enter number"
                  />
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div>
                <Label>Application Status</Label>
                <div className="space-y-2">
                  {[
                    "I don't have yet",
                    "I haven't applied yet", 
                    "I don't need yet",
                    "I will apply later"
                  ].map((status) => (
                    <div key={status} className="flex items-center space-x-2">
                      <Checkbox
                        checked={formData.applicationStatus === status}
                        onCheckedChange={(checked) => {
                          if (checked) setFormData({...formData, applicationStatus: status});
                        }}
                      />
                      <Label className="text-sm">{status}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="applicationDate">Application Date</Label>
                <Input
                  type="date"
                  id="applicationDate"
                  value={formData.applicationDate}
                  onChange={(e) => setFormData({...formData, applicationDate: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="readyDate">Ready Date</Label>
                <Input
                  type="date"
                  id="readyDate"
                  value={formData.readyDate}
                  onChange={(e) => setFormData({...formData, readyDate: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <Label>Service Packages</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                {servicePackages.map((pkg) => (
                  <Card 
                    key={pkg.id} 
                    className={`cursor-pointer border-2 transition-all ${
                      formData.selectedPackage === pkg.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setFormData({...formData, selectedPackage: pkg.id})}
                  >
                    <CardContent className="p-4">
                      <div className="text-center">
                        <h4 className="font-semibold text-lg">{pkg.name}</h4>
                        <p className="text-sm text-gray-600 flex items-center justify-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{pkg.duration}</span>
                        </p>
                        <p className="text-lg font-bold text-green-600 flex items-center justify-center space-x-1">
                          <DollarSign className="w-4 h-4" />
                          <span>{pkg.fee > 0 ? `GH¢${pkg.fee.toLocaleString()}` : 'Contact'}</span>
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-4">
              <Button className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4" />
                <span>Apply for New Title</span>
              </Button>
              <div className="flex-1">
                <Label htmlFor="paymentCode">Payment Code</Label>
                <Input
                  id="paymentCode"
                  value={formData.paymentCode}
                  onChange={(e) => setFormData({...formData, paymentCode: e.target.value})}
                  placeholder="Enter payment code"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Future Use */}
        <Card>
          <CardHeader>
            <CardTitle>What do you want to do with this just registered land?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {[
                'Add a House/building facility',
                'Agricultural project',
                'Personal Use',
                'Nothing for now',
                'Sell',
                'Lease',
                'Mortgage',
                'Rent',
                'Collateral',
                'Gift',
                'Will',
                'Caretaking'
              ].map((option) => (
                <Button
                  key={option}
                  variant={formData.futureUse === option ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFormData({...formData, futureUse: option})}
                  className="text-center h-auto p-3"
                >
                  {option}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Submit Section */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-center space-x-4">
              <Button size="lg" className="px-8">
                Submit Land Registration
              </Button>
              <Button size="lg" variant="outline" className="px-8">
                Save as Draft
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}