import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Car, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function VehicleRegistrationForm() {
  const [formData, setFormData] = useState<{
    transportMode: string;
    vehicleType: string;
    otherVehicleType: string;
    vehicleMake: string;
    otherVehicleMake: string;
    vehicleModel: string;
    otherVehicleModel: string;
  }>({
    transportMode: '',
    vehicleType: '',
    otherVehicleType: '',
    vehicleMake: '',
    otherVehicleMake: '',
    vehicleModel: '',
    otherVehicleModel: ''
  });

  const transportModes = ['LAND', 'AIR', 'WATER', 'RAIL'];

  const vehicleTypes = {
    LAND: ['Car', 'Motorcycle', 'Tipper', 'Truck', 'Transporter/Trailer', 'Others'],
    AIR: ['Helicopter', 'Drone/UAV', 'Jet', 'Others'],
    WATER: ['Vessel', 'Tugboat', 'Submarine', 'Speedboat', 'Skijet', 'Underwater Drone'],
    RAIL: ['Train', 'Locomotive', 'Rail Car', 'Others']
  };

  const vehicleMakes = [
    '9ff', 'Abarth', 'AC', 'ACM', 'Acura', 'Aiways', 'Aixam', 'Alba Mobility', 'Alfa Romeo',
    'Alpina', 'Alpine', 'Amphicar', 'Angelelli Automobili', 'Ariel Motor', 'Artega', 'Aspark',
    'Aspid', 'Aston Martin', 'Audi', 'Aurus', 'Austin', 'Austin-Healey', 'Autobianchi', 'BAIC',
    'Bedford', 'Bellier', 'Bentley', 'BMW', 'Boldmen', 'Bolloré', 'Borgward', 'Brilliance',
    'Bristol', 'Brute', 'Bugatti', 'Buick', 'BYD', 'Cadillac', 'Carver', 'Casalini', 'Caterham',
    'Cenntro', 'Changhe', 'Chatenet', 'Chery', 'Chevrolet', 'Chrysler', 'Cirelli', 'Citroen',
    'CityEL', 'Corvette', 'CUPRA', 'Dacia', 'Daewoo', 'DAF', 'Daihatsu', 'Daimler', 'Dallara',
    'Dangel', 'De la Chapelle', 'De Tomaso', 'Delorean', 'Devinci Cars', 'DFSK', 'Dodge',
    'Donkervoort', 'DR Automobiles', 'DS Automobiles', 'Dutton', 'e.GO', 'Econelo', 'Edran',
    'Elaris', 'Embuggy', 'EMC', 'Estrima', 'Evetta', 'EVO', 'Ferrari', 'Fiat', 'FISKER', 'Ford',
    'Forthing', 'Foton', 'Gac Gonow', 'Galloper', 'Gappy', 'GAZ', 'GEM', 'GEMBALLA', 'Genesis',
    'Giana', 'Gillet', 'Giotti Victoria', 'GMC', 'Goupil', 'Great Wall', 'Grecav', 'GTA', 'GWM',
    'Haima', 'Hamann', 'Haval', 'Hiphi', 'Holden', 'Honda', 'Hongqi', 'Hummer', 'Hurtan',
    'Hyundai', 'ICH-X', 'Ineos', 'Infiniti', 'Innocenti', 'Iso Rivolta', 'Isuzu', 'Iveco', 'IZH',
    'JAC', 'Jaguar', 'Jeep', 'Jensen', 'Karma', 'KG Mobility', 'Kia', 'Koenigsegg', 'KTM',
    'Lada', 'Lamborghini', 'Lancia', 'Land Rover', 'LDV', 'LEVC', 'Lexus', 'Lifan', 'Ligier',
    'Lincoln', 'Linzda', 'Lorinser', 'Lotus', 'Lucid', 'Lynk & Co', 'M-Ero', 'Mahindra', 'MAN',
    'Mansory', 'Martin', 'Martin Motors', 'Maserati', 'Matra', 'Maxus', 'Maybach', 'Mazda',
    'McLaren', 'Mega', 'Melex', 'Mercedes-Benz', 'Mercury', 'MG', 'Micro', 'Microcar', 'Militem',
    'Minari', 'Minauto', 'MINI', 'Mitsubishi', 'Mitsuoka', 'Morgan', 'Moskvich', 'MP Lafer',
    'MPM Motors', 'NIO', 'Nissan', 'NSU', 'Oldsmobile', 'Oldtimer', 'Omoda', 'Opel', 'Ora',
    'Pagani', 'Panther Westwinds', 'Peugeot', 'PGO', 'Piaggio', 'Plymouth', 'Polestar', 'Pontiac',
    'Porsche', 'Proton', 'Puch', 'RAM', 'Regis', 'Reliant', 'Renault', 'Rolls-Royce', 'Rover',
    'Ruf', 'Saab', 'Santana', 'SEAT', 'Segway', 'Selvo', 'Seres', 'Sevic', 'SGS', 'Shelby',
    'Shuanghuan', 'Silence', 'Singer', 'Skoda', 'Skywell', 'smart', 'SpeedArt', 'Sportequipe',
    'Spyker', 'SsangYong', 'Stormborn', 'StreetScooter', 'Studebaker', 'Subaru', 'Suzuki',
    'Talbot', 'Tasso', 'Tata', 'Tazzari EV', 'TECHART', 'Tesla', 'Togg', 'Town Life', 'TOYOTA',
    'Trabant', 'Triumph', 'TVR', 'UAZ', 'Vanden Plas', 'Vanderhall', 'VAZ', 'VEM', 'VinFast',
    'Volkswagen', 'Volvo', 'Voyah', 'Wartburg', 'Weltmeister', 'Wenckstern', 'Westfield', 'Wey',
    'Wiesmann', 'XBus', 'XEV', 'Xpeng', 'Zastava', 'Zaz', 'Zeekr', 'Zhidou', 'Zotye', 'Others'
  ];

  const vehicleModels = {
    'Toyota': ['Corolla', 'Camry', 'Prius', 'RAV4', 'Highlander', 'Tacoma', 'Tundra', 'Sienna', 'Others'],
    'BMW': ['1 Series', '2 Series', '3 Series', '4 Series', '5 Series', '6 Series', '7 Series', '8 Series', 'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'Z4', 'i3', 'i4', 'i7', 'i8', 'iX', 'Others'],
    'Mercedes-Benz': ['A-Class', 'B-Class', 'C-Class', 'E-Class', 'S-Class', 'GLA', 'GLB', 'GLC', 'GLE', 'GLS', 'G-Class', 'CLA', 'CLS', 'SL', 'AMG GT', 'EQA', 'EQB', 'EQC', 'EQE', 'EQS', 'Others'],
    'Audi': ['A1', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q2', 'Q3', 'Q4 e-tron', 'Q5', 'Q7', 'Q8', 'TT', 'R8', 'e-tron', 'Others'],
    'Ford': ['Fiesta', 'Focus', 'Mondeo', 'Mustang', 'Explorer', 'F-150', 'Transit', 'Ranger', 'EcoSport', 'Edge', 'Bronco', 'Escape', 'Expedition', 'Others'],
    'Honda': ['Civic', 'Accord', 'CR-V', 'HR-V', 'Pilot', 'Odyssey', 'Fit', 'Ridgeline', 'Passport', 'Insight', 'Others'],
    'Others': ['Please Specify']
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Vehicle registration data:', formData);
  };

  const getCurrentVehicleTypes = () => {
    return formData.transportMode ? vehicleTypes[formData.transportMode as keyof typeof vehicleTypes] || [] : [];
  };

  const getCurrentVehicleModels = () => {
    return formData.vehicleMake ? vehicleModels[formData.vehicleMake as keyof typeof vehicleModels] || ['Others'] : [];
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
            <Car className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Vehicle/Machine Registration</h1>
          </div>
          <p className="text-gray-600 mt-2">Register vehicles and machines with ARVIPOA transport system</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <CardTitle className="flex items-center space-x-2">
              <Car className="w-6 h-6" />
              <span>Add Vehicle/Machine Registration</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Transport Mode */}
              <div>
                <Label htmlFor="transportMode">Transport Mode</Label>
                <Select value={formData.transportMode} onValueChange={(value) => {
                  handleInputChange('transportMode', value);
                  handleInputChange('vehicleType', ''); // Reset vehicle type when transport mode changes
                }}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select transport mode" />
                  </SelectTrigger>
                  <SelectContent>
                    {transportModes.map((mode) => (
                      <SelectItem key={mode} value={mode}>{mode}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Vehicle/Machine Type */}
              {formData.transportMode && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="vehicleType">Vehicle/Machine Type</Label>
                    <Select value={formData.vehicleType} onValueChange={(value) => handleInputChange('vehicleType', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select vehicle type" />
                      </SelectTrigger>
                      <SelectContent>
                        {getCurrentVehicleTypes().map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {formData.vehicleType === 'Others' && (
                    <div>
                      <Label htmlFor="otherVehicleType">Others - Please Specify</Label>
                      <Input
                        id="otherVehicleType"
                        value={formData.otherVehicleType}
                        onChange={(e) => handleInputChange('otherVehicleType', e.target.value)}
                        placeholder="Specify vehicle type"
                        className="mt-1"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Vehicle/Machine Make */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="vehicleMake">Vehicle/Machine Make</Label>
                  <Select value={formData.vehicleMake} onValueChange={(value) => {
                    handleInputChange('vehicleMake', value);
                    handleInputChange('vehicleModel', ''); // Reset model when make changes
                  }}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select vehicle make" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {vehicleMakes.map((make) => (
                        <SelectItem key={make} value={make}>{make}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500 mt-1">
                    Choose from comprehensive list of manufacturers
                  </p>
                </div>
                {formData.vehicleMake === 'Others' && (
                  <div>
                    <Label htmlFor="otherVehicleMake">Others - Please Specify</Label>
                    <Input
                      id="otherVehicleMake"
                      value={formData.otherVehicleMake}
                      onChange={(e) => handleInputChange('otherVehicleMake', e.target.value)}
                      placeholder="Specify vehicle make"
                      className="mt-1"
                    />
                  </div>
                )}
              </div>

              {/* Vehicle/Machine Model */}
              {formData.vehicleMake && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="vehicleModel">Vehicle/Machine Model</Label>
                    <Select value={formData.vehicleModel} onValueChange={(value) => handleInputChange('vehicleModel', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select vehicle model" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {getCurrentVehicleModels().map((model) => (
                          <SelectItem key={model} value={model}>{model}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-gray-500 mt-1">
                      Models available for selected make
                    </p>
                  </div>
                  {(formData.vehicleModel === 'Others' || formData.vehicleModel === 'Please Specify') && (
                    <div>
                      <Label htmlFor="otherVehicleModel">Please Specify Model</Label>
                      <Input
                        id="otherVehicleModel"
                        value={formData.otherVehicleModel}
                        onChange={(e) => handleInputChange('otherVehicleModel', e.target.value)}
                        placeholder="Specify vehicle model"
                        className="mt-1"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Information Display */}
              {formData.transportMode && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">Registration Summary</h3>
                  <div className="text-sm text-blue-800 space-y-1">
                    <p><span className="font-medium">Transport Mode:</span> {formData.transportMode}</p>
                    {formData.vehicleType && (
                      <p><span className="font-medium">Vehicle Type:</span> {formData.vehicleType === 'Others' ? formData.otherVehicleType : formData.vehicleType}</p>
                    )}
                    {formData.vehicleMake && (
                      <p><span className="font-medium">Make:</span> {formData.vehicleMake === 'Others' ? formData.otherVehicleMake : formData.vehicleMake}</p>
                    )}
                    {formData.vehicleModel && (
                      <p><span className="font-medium">Model:</span> {(formData.vehicleModel === 'Others' || formData.vehicleModel === 'Please Specify') ? formData.otherVehicleModel : formData.vehicleModel}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-6">
                <Button type="button" variant="outline" asChild>
                  <Link to="/">Cancel</Link>
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Register Vehicle
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}