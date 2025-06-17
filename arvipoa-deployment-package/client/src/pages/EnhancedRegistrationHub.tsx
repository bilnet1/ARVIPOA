import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Target, Car, Rabbit, Beef, TreePine, Smartphone, Mail, Globe,
  Upload, Phone, MapPin, Clock, ArrowLeft, Building2, Shield, Wifi, Lock,
  QrCode, Fingerprint, Eye, AlertTriangle, Heart
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EnhancedManagementHub() {
  const [selectedForm, setSelectedForm] = useState<string>('');
  const [formData, setFormData] = useState<any>({});
  const [showTreeAnalysis, setShowTreeAnalysis] = useState(false);

  const managementTypes = [
    { id: 'land', name: 'Land/Property Management', icon: MapPin, color: 'green', route: '/land-registration-enhanced' },
    { id: 'building', name: 'Building Management', icon: Building2, color: 'blue', route: '/building-registration' },
    { id: 'arms', name: 'Arms/Firearms Management', icon: Target, color: 'red', route: '/arms-registration' },
    { id: 'vehicle', name: 'Vehicle/Machine Management', icon: Car, color: 'blue', route: '/auto-registration' },
    { id: 'mobile', name: 'Mobile Phone Protection', icon: Smartphone, color: 'purple', route: '/mobile-property' },
    { id: 'animal', name: 'Animal/Pet Management', icon: Rabbit, color: 'orange', route: '/animal-registration' },
    { id: 'livestock', name: 'Livestock Management', icon: Beef, color: 'green', route: '/livestock-registration' },
    { id: 'slaughtering', name: 'Slaughtering Management', icon: Beef, color: 'red', route: '/slaughtering-registration' },
    { id: 'tree', name: 'Tree/Plantation Management', icon: TreePine, color: 'green', route: '/tree-registration' },
    { id: 'electronics', name: 'Electronics Management', icon: Smartphone, color: 'purple', route: '/electronics-registration' },
    { id: 'pmb', name: 'Private Mail Box Management', icon: Mail, color: 'indigo', route: '/pmb-registration-module' },
    { id: 'domain', name: 'Domain Management + AI Design', icon: Globe, color: 'purple', route: '/domain-registration-module' }
  ];

  const armsManufacturers = [
    'Beretta', 'Glock', 'Smith & Wesson', 'Sig Sauer', 'Heckler & Koch', 'Colt', 'Ruger',
    'Walther', 'FN Herstal', 'Remington', 'Winchester', 'Browning', 'Mossberg', 'Benelli',
    'CZ', 'Steyr', 'Tikka', 'Sako', 'Mauser', 'Anschutz', 'Accuracy International',
    'Barrett', 'Desert Eagle', 'Kimber', 'Springfield Armory', 'Taurus', 'Canik',
    'IWI', 'Daniel Defense', 'BCM', 'LWRC', 'POF-USA', 'Noveske', 'LaRue Tactical'
  ];

  const treeTypes = [
    'Coconut Palm', 'Oil Palm', 'Mango', 'Avocado', 'Citrus (Orange)', 'Citrus (Lemon)',
    'Citrus (Lime)', 'Cashew', 'Cocoa', 'Coffee', 'Banana', 'Plantain', 'Papaya',
    'Breadfruit', 'Jackfruit', 'Mahogany', 'Teak', 'Cedar', 'Iroko', 'Ebony',
    'Bamboo', 'Eucalyptus', 'Pine', 'Rubber Tree', 'Shea Butter Tree', 'Moringa',
    'Baobab', 'Acacia', 'Neem', 'Kapok'
  ];

  const vehicleMakes = [
    'Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Nissan',
    'Hyundai', 'Kia', 'Chevrolet', 'Mazda', 'Subaru', 'Lexus', 'Infiniti', 'Acura',
    'Volvo', 'Jaguar', 'Land Rover', 'Porsche', 'Ferrari', 'Lamborghini', 'Bentley',
    'Rolls-Royce', 'Aston Martin', 'McLaren', 'Bugatti', 'Maserati', 'Alfa Romeo',
    'Fiat', 'Peugeot', 'Citroen', 'Renault', 'Skoda', 'SEAT', 'Mitsubishi', 'Suzuki',
    'Isuzu', 'Daihatsu', 'Tesla', 'BYD', 'Geely', 'Great Wall', 'Chery', 'JAC'
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registration submitted:', { type: selectedForm, data: formData });
    alert(`${selectedForm.toUpperCase()} registration submitted successfully!`);
  };

  const generateSmartTag = () => {
    const tag = `ARV-${selectedForm.toUpperCase()}-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    handleInputChange('smartTag', tag);
  };

  const renderLandForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="region">Region</Label>
          <Select value={formData.region || ''} onValueChange={(value) => handleInputChange('region', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="greater-accra">Greater Accra</SelectItem>
              <SelectItem value="ashanti">Ashanti</SelectItem>
              <SelectItem value="central">Central</SelectItem>
              <SelectItem value="eastern">Eastern</SelectItem>
              <SelectItem value="northern">Northern</SelectItem>
              <SelectItem value="upper-east">Upper East</SelectItem>
              <SelectItem value="upper-west">Upper West</SelectItem>
              <SelectItem value="western">Western</SelectItem>
              <SelectItem value="volta">Volta</SelectItem>
              <SelectItem value="brong-ahafo">Brong Ahafo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="district">District</Label>
          <Input
            id="district"
            value={formData.district || ''}
            onChange={(e) => handleInputChange('district', e.target.value)}
            placeholder="Enter district"
            className="mt-1"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="gpsAddress">Ghana GPS Address</Label>
          <Input
            id="gpsAddress"
            value={formData.gpsAddress || ''}
            onChange={(e) => handleInputChange('gpsAddress', e.target.value)}
            placeholder="e.g., GA-123-4567"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="landSize">Land Size (Acres)</Label>
          <Input
            id="landSize"
            type="number"
            step="0.1"
            value={formData.landSize || ''}
            onChange={(e) => handleInputChange('landSize', e.target.value)}
            placeholder="Enter land size"
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="titleType">Title Type</Label>
        <Select value={formData.titleType || ''} onValueChange={(value) => handleInputChange('titleType', value)}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select title type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="freehold">Freehold</SelectItem>
            <SelectItem value="leasehold">Leasehold</SelectItem>
            <SelectItem value="stool-land">Stool Land</SelectItem>
            <SelectItem value="family-land">Family Land</SelectItem>
            <SelectItem value="government-land">Government Land</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderBuildingForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="buildingType">Building Type</Label>
          <Select value={formData.buildingType || ''} onValueChange={(value) => handleInputChange('buildingType', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select building type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="residential">Residential</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="industrial">Industrial</SelectItem>
              <SelectItem value="institutional">Institutional</SelectItem>
              <SelectItem value="mixed-use">Mixed Use</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="floors">Number of Floors</Label>
          <Input
            id="floors"
            type="number"
            value={formData.floors || ''}
            onChange={(e) => handleInputChange('floors', e.target.value)}
            placeholder="Enter number of floors"
            className="mt-1"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="buildingArea">Building Area (sq ft)</Label>
          <Input
            id="buildingArea"
            type="number"
            value={formData.buildingArea || ''}
            onChange={(e) => handleInputChange('buildingArea', e.target.value)}
            placeholder="Enter building area"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="yearBuilt">Year Built</Label>
          <Input
            id="yearBuilt"
            type="number"
            value={formData.yearBuilt || ''}
            onChange={(e) => handleInputChange('yearBuilt', e.target.value)}
            placeholder="Enter year built"
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="buildingAddress">Building Address</Label>
        <Textarea
          id="buildingAddress"
          value={formData.buildingAddress || ''}
          onChange={(e) => handleInputChange('buildingAddress', e.target.value)}
          placeholder="Enter complete building address"
          className="mt-1"
          rows={3}
        />
      </div>
    </div>
  );

  const renderMobileForm = () => (
    <div className="space-y-6">
      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
        <div className="flex items-center space-x-2 mb-2">
          <Shield className="w-5 h-5 text-purple-600" />
          <h3 className="font-medium text-purple-900">ARVIPOA Mobile Phone Protection System</h3>
        </div>
        <p className="text-sm text-purple-700">
          Register your mobile phone as a digital asset with theft protection, tracking, and ownership verification.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="phoneBrand">Phone Brand</Label>
          <Select value={formData.phoneBrand || ''} onValueChange={(value) => handleInputChange('phoneBrand', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select brand" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="samsung">Samsung</SelectItem>
              <SelectItem value="huawei">Huawei</SelectItem>
              <SelectItem value="xiaomi">Xiaomi</SelectItem>
              <SelectItem value="oppo">OPPO</SelectItem>
              <SelectItem value="vivo">Vivo</SelectItem>
              <SelectItem value="oneplus">OnePlus</SelectItem>
              <SelectItem value="google">Google</SelectItem>
              <SelectItem value="sony">Sony</SelectItem>
              <SelectItem value="lg">LG</SelectItem>
              <SelectItem value="motorola">Motorola</SelectItem>
              <SelectItem value="nokia">Nokia</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="phoneModel">Phone Model</Label>
          <Input
            id="phoneModel"
            value={formData.phoneModel || ''}
            onChange={(e) => handleInputChange('phoneModel', e.target.value)}
            placeholder="e.g., iPhone 15 Pro, Galaxy S24"
            className="mt-1"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="imei">IMEI Number</Label>
          <div className="relative mt-1">
            <Input
              id="imei"
              value={formData.imei || ''}
              onChange={(e) => handleInputChange('imei', e.target.value)}
              placeholder="Enter 15-digit IMEI"
              className="pr-10"
              maxLength={15}
            />
            <Fingerprint className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
          </div>
          <p className="text-xs text-gray-500 mt-1">Dial *#06# to find your IMEI</p>
        </div>
        <div>
          <Label htmlFor="serialNumber">Serial Number</Label>
          <Input
            id="serialNumber"
            value={formData.serialNumber || ''}
            onChange={(e) => handleInputChange('serialNumber', e.target.value)}
            placeholder="Enter device serial number"
            className="mt-1"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="purchaseDate">Purchase Date</Label>
          <Input
            id="purchaseDate"
            type="date"
            value={formData.purchaseDate || ''}
            onChange={(e) => handleInputChange('purchaseDate', e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="purchasePrice">Purchase Price (₵)</Label>
          <Input
            id="purchasePrice"
            type="number"
            value={formData.purchasePrice || ''}
            onChange={(e) => handleInputChange('purchasePrice', e.target.value)}
            placeholder="Enter purchase price"
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="smartTag">ARVIPOA Smart Tag</Label>
        <div className="flex space-x-2 mt-1">
          <Input
            id="smartTag"
            value={formData.smartTag || ''}
            onChange={(e) => handleInputChange('smartTag', e.target.value)}
            placeholder="Auto-generated smart tag"
            className="flex-1"
            readOnly
          />
          <Button type="button" onClick={generateSmartTag} variant="outline">
            <QrCode className="w-4 h-4 mr-1" />
            Generate
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Security Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="theftProtection"
              checked={formData.theftProtection || false}
              onCheckedChange={(checked) => handleInputChange('theftProtection', checked)}
            />
            <Label htmlFor="theftProtection" className="text-sm">Enable Theft Protection</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="locationTracking"
              checked={formData.locationTracking || false}
              onCheckedChange={(checked) => handleInputChange('locationTracking', checked)}
            />
            <Label htmlFor="locationTracking" className="text-sm">Enable Location Tracking</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="marketplaceLock"
              checked={formData.marketplaceLock || false}
              onCheckedChange={(checked) => handleInputChange('marketplaceLock', checked)}
            />
            <Label htmlFor="marketplaceLock" className="text-sm">Marketplace Protection</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remoteDisable"
              checked={formData.remoteDisable || false}
              onCheckedChange={(checked) => handleInputChange('remoteDisable', checked)}
            />
            <Label htmlFor="remoteDisable" className="text-sm">Remote Disable Feature</Label>
          </div>
        </div>
      </div>

      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
        <div className="flex items-center space-x-2 mb-2">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <h4 className="font-medium text-red-900">Emergency Controls</h4>
        </div>
        <div className="space-y-2">
          <Button variant="outline" className="w-full text-red-600 border-red-300 hover:bg-red-50">
            <Lock className="w-4 h-4 mr-2" />
            Report as Stolen (Immediate Lock)
          </Button>
          <Button variant="outline" className="w-full text-orange-600 border-orange-300 hover:bg-orange-50">
            <Eye className="w-4 h-4 mr-2" />
            Track Last Known Location
          </Button>
        </div>
      </div>
    </div>
  );

  const renderEnhancedVehicleForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="transportMode">Transport Mode</Label>
          <Select value={formData.transportMode || ''} onValueChange={(value) => handleInputChange('transportMode', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select transport mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="land">Land</SelectItem>
              <SelectItem value="air">Air</SelectItem>
              <SelectItem value="water">Water</SelectItem>
              <SelectItem value="rail">Rail</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="vehicleType">Vehicle Type</Label>
          <Select value={formData.vehicleType || ''} onValueChange={(value) => handleInputChange('vehicleType', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select vehicle type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="car">Car</SelectItem>
              <SelectItem value="motorcycle">Motorcycle</SelectItem>
              <SelectItem value="truck">Truck</SelectItem>
              <SelectItem value="bus">Bus</SelectItem>
              <SelectItem value="trailer">Trailer</SelectItem>
              <SelectItem value="helicopter">Helicopter</SelectItem>
              <SelectItem value="boat">Boat</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="vehicleMake">Vehicle Make</Label>
          <Select value={formData.vehicleMake || ''} onValueChange={(value) => handleInputChange('vehicleMake', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select make" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {vehicleMakes.map((make) => (
                <SelectItem key={make} value={make.toLowerCase()}>{make}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="vehicleModel">Vehicle Model</Label>
          <Input
            id="vehicleModel"
            value={formData.vehicleModel || ''}
            onChange={(e) => handleInputChange('vehicleModel', e.target.value)}
            placeholder="Enter model"
            className="mt-1"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Label htmlFor="yearManufactured">Year Manufactured</Label>
          <Input
            id="yearManufactured"
            type="number"
            value={formData.yearManufactured || ''}
            onChange={(e) => handleInputChange('yearManufactured', e.target.value)}
            placeholder="Enter year"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="engineNumber">Engine Number</Label>
          <Input
            id="engineNumber"
            value={formData.engineNumber || ''}
            onChange={(e) => handleInputChange('engineNumber', e.target.value)}
            placeholder="Enter engine number"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="chassisNumber">Chassis Number</Label>
          <Input
            id="chassisNumber"
            value={formData.chassisNumber || ''}
            onChange={(e) => handleInputChange('chassisNumber', e.target.value)}
            placeholder="Enter chassis number"
            className="mt-1"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="registrationNumber">Registration Number</Label>
          <Input
            id="registrationNumber"
            value={formData.registrationNumber || ''}
            onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
            placeholder="Enter registration number"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="color">Vehicle Color</Label>
          <Input
            id="color"
            value={formData.color || ''}
            onChange={(e) => handleInputChange('color', e.target.value)}
            placeholder="Enter vehicle color"
            className="mt-1"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="fuelType">Fuel Type</Label>
          <Select value={formData.fuelType || ''} onValueChange={(value) => handleInputChange('fuelType', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select fuel type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="petrol">Petrol</SelectItem>
              <SelectItem value="diesel">Diesel</SelectItem>
              <SelectItem value="electric">Electric</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
              <SelectItem value="lpg">LPG</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="seatingCapacity">Seating Capacity</Label>
          <Input
            id="seatingCapacity"
            type="number"
            value={formData.seatingCapacity || ''}
            onChange={(e) => handleInputChange('seatingCapacity', e.target.value)}
            placeholder="Enter seating capacity"
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );

  const renderEnhancedArmsForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="weaponType">Weapon Type</Label>
          <Select value={formData.weaponType || ''} onValueChange={(value) => handleInputChange('weaponType', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select weapon type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pistol">Pistol</SelectItem>
              <SelectItem value="rifle">Rifle</SelectItem>
              <SelectItem value="shotgun">Shotgun</SelectItem>
              <SelectItem value="revolver">Revolver</SelectItem>
              <SelectItem value="assault-rifle">Assault Rifle</SelectItem>
              <SelectItem value="sniper-rifle">Sniper Rifle</SelectItem>
              <SelectItem value="carbine">Carbine</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="manufacturer">Manufacturer</Label>
          <Select value={formData.manufacturer || ''} onValueChange={(value) => handleInputChange('manufacturer', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select manufacturer" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {armsManufacturers.map((manufacturer) => (
                <SelectItem key={manufacturer} value={manufacturer.toLowerCase()}>{manufacturer}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Label htmlFor="serialNumber">Serial Number</Label>
          <Input
            id="serialNumber"
            value={formData.serialNumber || ''}
            onChange={(e) => handleInputChange('serialNumber', e.target.value)}
            placeholder="Enter serial number"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="caliber">Caliber</Label>
          <Input
            id="caliber"
            value={formData.caliber || ''}
            onChange={(e) => handleInputChange('caliber', e.target.value)}
            placeholder="e.g., 9mm, .45 ACP"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="barrelLength">Barrel Length (inches)</Label>
          <Input
            id="barrelLength"
            type="number"
            step="0.1"
            value={formData.barrelLength || ''}
            onChange={(e) => handleInputChange('barrelLength', e.target.value)}
            placeholder="Enter barrel length"
            className="mt-1"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="licenseNumber">License Number</Label>
          <Input
            id="licenseNumber"
            value={formData.licenseNumber || ''}
            onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
            placeholder="Enter license number"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="licenseExpiry">License Expiry Date</Label>
          <Input
            id="licenseExpiry"
            type="date"
            value={formData.licenseExpiry || ''}
            onChange={(e) => handleInputChange('licenseExpiry', e.target.value)}
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="purposeOfOwnership">Purpose of Ownership</Label>
        <Select value={formData.purposeOfOwnership || ''} onValueChange={(value) => handleInputChange('purposeOfOwnership', value)}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select purpose" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sport">Sport/Target Shooting</SelectItem>
            <SelectItem value="hunting">Hunting</SelectItem>
            <SelectItem value="security">Security/Protection</SelectItem>
            <SelectItem value="collection">Collection</SelectItem>
            <SelectItem value="law-enforcement">Law Enforcement</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderEnhancedTreeForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="treeType">Tree Type</Label>
          <Select value={formData.treeType || ''} onValueChange={(value) => handleInputChange('treeType', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select tree type" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {treeTypes.map((tree) => (
                <SelectItem key={tree} value={tree.toLowerCase()}>{tree}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            type="number"
            value={formData.quantity || ''}
            onChange={(e) => handleInputChange('quantity', e.target.value)}
            placeholder="Number of trees"
            className="mt-1"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location || ''}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="Enter GPS coordinates or address"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="plantingDate">Planting Date</Label>
          <div className="flex space-x-2 mt-1">
            <Input
              id="plantingDate"
              type="date"
              value={formData.plantingDate || ''}
              onChange={(e) => handleInputChange('plantingDate', e.target.value)}
              className="flex-1"
            />
            <Button 
              type="button" 
              onClick={() => setShowTreeAnalysis(!showTreeAnalysis)}
              variant="outline"
              className="bg-green-50 border-green-300 text-green-700 hover:bg-green-100"
            >
              Tree Analysis
            </Button>
          </div>
        </div>
      </div>

      {showTreeAnalysis && (
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <h3 className="text-lg font-semibold text-green-900 mb-4">Tree Analysis & Market Intelligence</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="soilType">Soil Type</Label>
              <Select value={formData.soilType || ''} onValueChange={(value) => handleInputChange('soilType', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clay">Clay</SelectItem>
                  <SelectItem value="sandy">Sandy</SelectItem>
                  <SelectItem value="loamy">Loamy</SelectItem>
                  <SelectItem value="silt">Silt</SelectItem>
                  <SelectItem value="peaty">Peaty</SelectItem>
                  <SelectItem value="chalky">Chalky</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="fertilizerType">Fertilizer Type</Label>
              <Select value={formData.fertilizerType || ''} onValueChange={(value) => handleInputChange('fertilizerType', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select fertilizer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="organic">Organic</SelectItem>
                  <SelectItem value="npk">NPK</SelectItem>
                  <SelectItem value="compost">Compost</SelectItem>
                  <SelectItem value="manure">Manure</SelectItem>
                  <SelectItem value="phosphate">Phosphate</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="treatmentType">Treatment Type</Label>
              <Select value={formData.treatmentType || ''} onValueChange={(value) => handleInputChange('treatmentType', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select treatment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pesticide">Pesticide</SelectItem>
                  <SelectItem value="fungicide">Fungicide</SelectItem>
                  <SelectItem value="herbicide">Herbicide</SelectItem>
                  <SelectItem value="insecticide">Insecticide</SelectItem>
                  <SelectItem value="organic-spray">Organic Spray</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="estimatedGrowth">Estimated Growth Time</Label>
              <Input
                id="estimatedGrowth"
                value={formData.estimatedGrowth || ''}
                onChange={(e) => handleInputChange('estimatedGrowth', e.target.value)}
                placeholder="e.g., 3-5 years to maturity"
                className="mt-1"
              />
            </div>
          </div>
          <div className="mt-4">
            <Label htmlFor="treeImportance">Importance of This Tree</Label>
            <Textarea
              id="treeImportance"
              value={formData.treeImportance || ''}
              onChange={(e) => handleInputChange('treeImportance', e.target.value)}
              placeholder="Environmental benefits, economic value, cultural significance..."
              className="mt-1"
              rows={3}
            />
          </div>
          <div className="mt-4">
            <Label htmlFor="marketOpportunity">Market Opportunity</Label>
            <Textarea
              id="marketOpportunity"
              value={formData.marketOpportunity || ''}
              onChange={(e) => handleInputChange('marketOpportunity', e.target.value)}
              placeholder="Commercial potential, export opportunities, local demand..."
              className="mt-1"
              rows={3}
            />
          </div>
        </div>
      )}

      <div>
        <Label htmlFor="farmSize">Farm/Plantation Size (Acres)</Label>
        <Input
          id="farmSize"
          type="number"
          step="0.1"
          value={formData.farmSize || ''}
          onChange={(e) => handleInputChange('farmSize', e.target.value)}
          placeholder="Enter total farm size"
          className="mt-1"
        />
      </div>
    </div>
  );

  const renderAnimalForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="animalName">Animal Name</Label>
          <Input
            id="animalName"
            value={formData.animalName || ''}
            onChange={(e) => handleInputChange('animalName', e.target.value)}
            placeholder="Enter animal name"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="animalType">Animal Type</Label>
          <Select value={formData.animalType || ''} onValueChange={(value) => handleInputChange('animalType', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select animal type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dog">Dog</SelectItem>
              <SelectItem value="cat">Cat</SelectItem>
              <SelectItem value="cow">Cow</SelectItem>
              <SelectItem value="goat">Goat</SelectItem>
              <SelectItem value="sheep">Sheep</SelectItem>
              <SelectItem value="pig">Pig</SelectItem>
              <SelectItem value="chicken">Chicken</SelectItem>
              <SelectItem value="horse">Horse</SelectItem>
              <SelectItem value="rabbit">Rabbit</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="age">Date of Birth</Label>
          <Input
            id="age"
            type="date"
            value={formData.age || ''}
            onChange={(e) => handleInputChange('age', e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="vaccineType">Vaccine Type</Label>
          <Input
            id="vaccineType"
            value={formData.vaccineType || ''}
            onChange={(e) => handleInputChange('vaccineType', e.target.value)}
            placeholder="Enter vaccine type"
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="breed">Breed</Label>
        <Input
          id="breed"
          value={formData.breed || ''}
          onChange={(e) => handleInputChange('breed', e.target.value)}
          placeholder="Enter animal breed"
          className="mt-1"
        />
      </div>
    </div>
  );

  const renderElectronicsForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="deviceType">Device Type</Label>
          <Select value={formData.deviceType || ''} onValueChange={(value) => handleInputChange('deviceType', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select device type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="laptop">Laptop</SelectItem>
              <SelectItem value="tablet">Tablet</SelectItem>
              <SelectItem value="camera">Camera</SelectItem>
              <SelectItem value="drone">Drone</SelectItem>
              <SelectItem value="gaming-console">Gaming Console</SelectItem>
              <SelectItem value="smartwatch">Smartwatch</SelectItem>
              <SelectItem value="headphones">Headphones</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="brand">Brand</Label>
          <Input
            id="brand"
            value={formData.brand || ''}
            onChange={(e) => handleInputChange('brand', e.target.value)}
            placeholder="Enter brand"
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="serialNumber">Serial Number</Label>
        <Input
          id="serialNumber"
          value={formData.serialNumber || ''}
          onChange={(e) => handleInputChange('serialNumber', e.target.value)}
          placeholder="Enter serial number"
          className="mt-1"
        />
      </div>
    </div>
  );

  const renderPmbForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="pmbNumber">PMB Number</Label>
          <Input
            id="pmbNumber"
            value={formData.pmbNumber || ''}
            onChange={(e) => handleInputChange('pmbNumber', e.target.value)}
            placeholder="Enter PMB number"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location || ''}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="Enter location"
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="contactPerson">Contact Person</Label>
        <Input
          id="contactPerson"
          value={formData.contactPerson || ''}
          onChange={(e) => handleInputChange('contactPerson', e.target.value)}
          placeholder="Enter contact person name"
          className="mt-1"
        />
      </div>
    </div>
  );

  const renderSlaughteringForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            id="ownerName"
            value={formData.ownerName || ''}
            onChange={(e) => handleInputChange('ownerName', e.target.value)}
            placeholder="Enter owner name"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="slaughterDate">Slaughter Date</Label>
          <Input
            id="slaughterDate"
            type="datetime-local"
            value={formData.slaughterDate || ''}
            onChange={(e) => handleInputChange('slaughterDate', e.target.value)}
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="slaughterHouse">Slaughter House</Label>
        <Input
          id="slaughterHouse"
          value={formData.slaughterHouse || ''}
          onChange={(e) => handleInputChange('slaughterHouse', e.target.value)}
          placeholder="Enter slaughter house address"
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="meatWeight">Meat Weight (KG)</Label>
        <Input
          id="meatWeight"
          type="number"
          value={formData.meatWeight || ''}
          onChange={(e) => handleInputChange('meatWeight', e.target.value)}
          placeholder="Enter weight in KG"
          className="mt-1"
        />
      </div>
    </div>
  );

  const renderSelectedForm = () => {
    switch (selectedForm) {
      case 'land': return renderLandForm();
      case 'building': return renderBuildingForm();
      case 'mobile': return renderMobileForm();
      case 'arms': return renderEnhancedArmsForm();
      case 'vehicle': return renderEnhancedVehicleForm();
      case 'tree': return renderEnhancedTreeForm();
      case 'animal': return renderAnimalForm();
      case 'electronics': return renderElectronicsForm();
      case 'pmb': return renderPmbForm();
      case 'slaughtering': return renderSlaughteringForm();
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">ARVIPOA Management Hub</h1>
          <p className="text-gray-600 mt-2">Complete property management portal for all ARVIPOA services including mobile phone protection</p>
        </div>

        {!selectedForm ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {managementTypes.map((type) => {
              const Icon = type.icon;
              return (
                <Card 
                  key={type.id} 
                  className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-200"
                  onClick={() => {
                    if (type.route) {
                      window.location.href = type.route;
                    } else {
                      setSelectedForm(type.id);
                    }
                  }}
                >
                  <CardHeader className={`bg-gradient-to-r from-${type.color}-500 to-${type.color}-600 text-white`}>
                    <CardTitle className="flex items-center space-x-2">
                      <Icon className="w-6 h-6" />
                      <span className="text-lg">{type.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-gray-600">
                      {type.id === 'mobile' ? 
                        'Protect your mobile phone with ARVIPOA\'s theft protection and tracking system' :
                        type.id === 'lifestyle' ?
                        'Add your lifestyle preferences, habits, and personal interests to your profile' :
                        `Register your ${type.name.toLowerCase()} with ARVIPOA monitoring system`
                      }
                    </p>
                    <Button className={`mt-4 w-full bg-${type.color}-600 hover:bg-${type.color}-700`}>
                      Start Registration
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <CardTitle className="flex items-center justify-between">
                <span>{managementTypes.find(t => t.id === selectedForm)?.name}</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-blue-600 border-white hover:bg-white/10"
                  onClick={() => {
                    setSelectedForm('');
                    setFormData({});
                    setShowTreeAnalysis(false);
                  }}
                >
                  Change Form
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {renderSelectedForm()}
                
                <div className="flex justify-end space-x-4 pt-6 border-t">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setSelectedForm('');
                      setFormData({});
                      setShowTreeAnalysis(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Submit Registration
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}