import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  Building2, 
  Home, 
  MapPin, 
  Plus, 
  Upload,
  Camera,
  Save, 
  Eye, 
  Send, 
  ChevronDown,
  ChevronUp,
  Settings,
  Shield,
  Users,
  Calendar,
  Zap,
  Droplets,
  Wifi,
  Flame,
  Video,
  CheckCircle,
  CreditCard,
  FileText,
  Trash2,
  Edit
} from 'lucide-react';

export default function BuildingRegistrationFormFixed() {
  const [formData, setFormData] = useState<any>({});
  const [openSections, setOpenSections] = useState({
    property: true,
    permit: false,
    plan: false,
    rooms: false,
    utilities: false,
    security: false
  });
  const [rooms, setRooms] = useState<any[]>([]);
  const [currentRoom, setCurrentRoom] = useState<any>({});
  const [showRoomForm, setShowRoomForm] = useState(false);

  const registeredLands = [
    { id: 1, address: "GA-123-4567, East Legon, Accra", digitalAddress: "GA-123-4567", landSize: "2 acres" },
    { id: 2, address: "AS-789-0123, Bantama, Kumasi", digitalAddress: "AS-789-0123", landSize: "1.5 acres" },
    { id: 3, address: "WR-456-7890, Takoradi", digitalAddress: "WR-456-7890", landSize: "3 acres" }
  ];

  const buildingTypes = ['Residential', 'Commercial', 'Mixed Use', 'Industrial', 'Institutional'];
  const floors = ['Ground Floor', '1st Floor', '2nd Floor', '3rd Floor', '4th Floor', '5th Floor', 'Basement', 'Rooftop'];
  
  const roomTypes = [
    'Bedroom', 'Kitchen', 'Dining Room', 'Toilet', 'Bathroom', 'Garage', 'Garden', 'Store Room', 
    'Balcony', 'Living Room', 'Guest Room', 'Master Bedroom', 'Veranda', 'Porch', 'Compound', 
    'Car Park', 'Gate', 'Swimming Pool', 'Study Room', 'Cinema Room', 'Office', 'Security Post', 
    'Laundry Room', 'Workshop', 'Theater', 'Basement', 'Bar', 'Secret Room', 'Waiting Room', 
    'Gym', 'Classroom', 'Smoking Room', 'Lab', 'Lawn Tennis', 'Others'
  ];

  const colorOptions = ['White', 'Yellow', 'Cream', 'Red', 'Blue', 'Brown', 'Black', 'Grey', 'Pink', 'Purple', 'Green'];
  const floorTypes = ['None', 'Concrete', 'Tiles', 'Wooden', 'Grass', 'Astroturf', 'Stones', 'Metal', 'Rug', 'Plastic'];
  const roomPurposes = ['Bedroom', 'Kitchen', 'Office', 'Rental', 'Worship Room', 'Storage', 'Entertainment', 'Study', 'Guest', 'Commercial'];

  const facilities = [
    { id: 'electricity', name: 'Electricity', icon: Zap },
    { id: 'water', name: 'Water Supply', icon: Droplets },
    { id: 'internet', name: 'Internet', icon: Wifi },
    { id: 'cctv', name: 'CCTV', icon: Video },
    { id: 'gas', name: 'Gas Line', icon: Flame },
    { id: 'sprinkler', name: 'Fire Sprinkler', icon: Shield },
    { id: 'smart', name: 'Smart Devices', icon: Settings }
  ];

  const roomRules = [
    'No Smoking', 'No Pets', 'For Couples Only', 'No Children', 'Quiet Hours', 'No Visitors After 10PM', 
    'No Cooking', 'No Alcohol', 'Professional Use Only', 'Maximum 2 Occupants'
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const generateRoomDigitalAddress = () => {
    if (formData.selectedLand && currentRoom.roomName) {
      const landAddress = registeredLands.find(land => land.id === parseInt(formData.selectedLand))?.digitalAddress;
      const roomCode = `R${rooms.length + 1}`;
      const digitalAddress = `${landAddress}-${roomCode}`;
      setCurrentRoom((prev: any) => ({ ...prev, digitalAddress }));
    }
  };

  const addRoom = () => {
    if (currentRoom.roomName) {
      const newRoom = {
        ...currentRoom,
        id: Date.now(),
        facilities: currentRoom.facilities || [],
        rules: currentRoom.rules || [],
        users: currentRoom.users || []
      };
      setRooms(prev => [...prev, newRoom]);
      setCurrentRoom({});
      setShowRoomForm(false);
    }
  };

  const submitForm = () => {
    console.log('Building Registration Data:', { ...formData, rooms });
    alert('Building registered successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            <Building2 className="w-10 h-10 inline-block mr-3 text-green-400" />
            ARVIPOA Building Registration
          </h1>
          <p className="text-gray-300">Add buildings to your registered land with comprehensive room and facility management</p>
        </div>

        {/* Property Selection */}
        <Card className="bg-slate-800/50 border-green-500/30">
          <Collapsible open={openSections.property} onOpenChange={() => toggleSection('property')}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-slate-700/30 transition-colors">
                <CardTitle className="text-green-400 flex items-center justify-between">
                  <div className="flex items-center">
                    <MapPin className="w-6 h-6 mr-2" />
                    Property Selection
                  </div>
                  {openSections.property ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label className="text-white">Select Registered Land</Label>
                    <Select value={formData.selectedLand} onValueChange={(value) => handleInputChange('selectedLand', value)}>
                      <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                        <SelectValue placeholder="Choose from your registered lands" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60 overflow-y-auto z-[100] bg-slate-800 border-slate-600">
                        {registeredLands.map((land) => (
                          <SelectItem key={land.id} value={land.id.toString()} className="text-white hover:bg-slate-700">
                            <div>
                              <p className="font-medium">{land.address}</p>
                              <p className="text-sm text-gray-400">Digital Address: {land.digitalAddress} | Size: {land.landSize}</p>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Building Permit */}
        <Card className="bg-slate-800/50 border-blue-500/30">
          <Collapsible open={openSections.permit} onOpenChange={() => toggleSection('permit')}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-slate-700/30 transition-colors">
                <CardTitle className="text-blue-400 flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="w-6 h-6 mr-2" />
                    Building Permit
                  </div>
                  {openSections.permit ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-white">Building Permit Number</Label>
                      <Input 
                        value={formData.permitNumber || ''}
                        onChange={(e) => handleInputChange('permitNumber', e.target.value)}
                        placeholder="Enter permit number"
                        className="bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-white">Permit Status</Label>
                      <Select value={formData.permitStatus} onValueChange={(value) => handleInputChange('permitStatus', value)}>
                        <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-600">
                          <SelectItem value="existing" className="text-white">I have existing permit</SelectItem>
                          <SelectItem value="apply" className="text-white">Apply for new permit</SelectItem>
                          <SelectItem value="renew" className="text-white">Renew existing permit</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {formData.permitStatus === 'existing' && (
                    <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-400 text-sm">Upload permit document</p>
                      <Button variant="outline" className="mt-2" size="sm">
                        Choose File
                      </Button>
                    </div>
                  )}

                  {(formData.permitStatus === 'apply' || formData.permitStatus === 'renew') && (
                    <div className="bg-slate-700/30 p-4 rounded-lg">
                      <Button className="bg-blue-600 hover:bg-blue-700 w-full">
                        <CreditCard className="w-4 h-4 mr-2" />
                        {formData.permitStatus === 'apply' ? 'Apply & Pay for Building Permit' : 'Renew & Pay for Building Permit'}
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Building Plan Details */}
        <Card className="bg-slate-800/50 border-purple-500/30">
          <Collapsible open={openSections.plan} onOpenChange={() => toggleSection('plan')}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-slate-700/30 transition-colors">
                <CardTitle className="text-purple-400 flex items-center justify-between">
                  <div className="flex items-center">
                    <Building2 className="w-6 h-6 mr-2" />
                    Building Plan Details
                  </div>
                  {openSections.plan ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-white">Building Name/Tag</Label>
                      <Input 
                        value={formData.buildingName || ''}
                        onChange={(e) => handleInputChange('buildingName', e.target.value)}
                        placeholder="Enter building name"
                        className="bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-white">Building Type</Label>
                      <Select value={formData.buildingType} onValueChange={(value) => handleInputChange('buildingType', value)}>
                        <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-600">
                          {buildingTypes.map((type) => (
                            <SelectItem key={type} value={type} className="text-white">{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-white">Number of Floors</Label>
                      <Input 
                        type="number"
                        value={formData.floors || ''}
                        onChange={(e) => handleInputChange('floors', e.target.value)}
                        placeholder="Enter number of floors"
                        className="bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-white">Total Rooms/Spaces</Label>
                      <Input 
                        type="number"
                        value={formData.totalRooms || ''}
                        onChange={(e) => handleInputChange('totalRooms', e.target.value)}
                        placeholder="Enter total rooms"
                        className="bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-white">Building Status</Label>
                      <Select value={formData.buildingStatus} onValueChange={(value) => handleInputChange('buildingStatus', value)}>
                        <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-600">
                          <SelectItem value="completed-finished" className="text-white">Completed with finishes</SelectItem>
                          <SelectItem value="completed-unfinished" className="text-white">Completed without finishes</SelectItem>
                          <SelectItem value="uncompleted" className="text-white">Uncompleted</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-white">Exterior Color Scheme</Label>
                      <Select value={formData.exteriorColor} onValueChange={(value) => handleInputChange('exteriorColor', value)}>
                        <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                          <SelectValue placeholder="Select color" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-600">
                          {colorOptions.map((color) => (
                            <SelectItem key={color} value={color} className="text-white">{color}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-white">Interior Color Scheme</Label>
                      <Select value={formData.interiorColor} onValueChange={(value) => handleInputChange('interiorColor', value)}>
                        <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                          <SelectValue placeholder="Select color" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-600">
                          {colorOptions.map((color) => (
                            <SelectItem key={color} value={color} className="text-white">{color}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Rooms & Spaces */}
        <Card className="bg-slate-800/50 border-orange-500/30">
          <Collapsible open={openSections.rooms} onOpenChange={() => toggleSection('rooms')}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-slate-700/30 transition-colors">
                <CardTitle className="text-orange-400 flex items-center justify-between">
                  <div className="flex items-center">
                    <Home className="w-6 h-6 mr-2" />
                    Rooms & Spaces ({rooms.length})
                  </div>
                  {openSections.rooms ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <div className="space-y-6">
                  <Button 
                    onClick={() => setShowRoomForm(true)}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Room/Space
                  </Button>

                  {/* Enhanced Room Form */}
                  {showRoomForm && (
                    <Card className="border-orange-500/50 bg-slate-700/50">
                      <CardHeader>
                        <CardTitle className="text-orange-400">Add New Room/Space</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <Label className="text-white">Room Name/Type</Label>
                            <Select value={currentRoom.roomName} onValueChange={(value) => setCurrentRoom((prev: any) => ({ ...prev, roomName: value }))}>
                              <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                                <SelectValue placeholder="Select room type" />
                              </SelectTrigger>
                              <SelectContent className="bg-slate-800 border-slate-600">
                                {roomTypes.map((type) => (
                                  <SelectItem key={type} value={type} className="text-white">{type}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-white">Floor/Storey Location</Label>
                            <Select value={currentRoom.floor} onValueChange={(value) => setCurrentRoom((prev: any) => ({ ...prev, floor: value }))}>
                              <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                                <SelectValue placeholder="Select floor" />
                              </SelectTrigger>
                              <SelectContent className="bg-slate-800 border-slate-600">
                                {floors.map((floor) => (
                                  <SelectItem key={floor} value={floor} className="text-white">{floor}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <Label className="text-white">Digital Address (SDA)</Label>
                            <div className="flex space-x-2">
                              <Input 
                                value={currentRoom.digitalAddress || ''}
                                onChange={(e) => setCurrentRoom((prev: any) => ({ ...prev, digitalAddress: e.target.value }))}
                                placeholder="Auto-generated SDA"
                                className="bg-slate-700/50 border-slate-600 text-white"
                                readOnly
                              />
                              <Button 
                                variant="outline" 
                                onClick={generateRoomDigitalAddress}
                                className="text-orange-400 border-orange-400"
                              >
                                Generate
                              </Button>
                            </div>
                          </div>
                          <div>
                            <Label className="text-white">Length (ft)</Label>
                            <Input 
                              value={currentRoom.length || ''}
                              onChange={(e) => setCurrentRoom((prev: any) => ({ ...prev, length: e.target.value }))}
                              placeholder="Enter length"
                              className="bg-slate-700/50 border-slate-600 text-white"
                            />
                          </div>
                          <div>
                            <Label className="text-white">Width (ft)</Label>
                            <Input 
                              value={currentRoom.width || ''}
                              onChange={(e) => setCurrentRoom((prev: any) => ({ ...prev, width: e.target.value }))}
                              placeholder="Enter width"
                              className="bg-slate-700/50 border-slate-600 text-white"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <Label className="text-white">Floor Type</Label>
                            <Select value={currentRoom.floorType} onValueChange={(value) => setCurrentRoom((prev: any) => ({ ...prev, floorType: value }))}>
                              <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                                <SelectValue placeholder="Select floor type" />
                              </SelectTrigger>
                              <SelectContent className="bg-slate-800 border-slate-600">
                                {floorTypes.map((type) => (
                                  <SelectItem key={type} value={type} className="text-white">{type}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-white">Interior Color</Label>
                            <Select value={currentRoom.color} onValueChange={(value) => setCurrentRoom((prev: any) => ({ ...prev, color: value }))}>
                              <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                                <SelectValue placeholder="Select color" />
                              </SelectTrigger>
                              <SelectContent className="bg-slate-800 border-slate-600">
                                {colorOptions.map((color) => (
                                  <SelectItem key={color} value={color} className="text-white">{color}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-white">Room Purpose</Label>
                            <Select value={currentRoom.purpose} onValueChange={(value) => setCurrentRoom((prev: any) => ({ ...prev, purpose: value }))}>
                              <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                                <SelectValue placeholder="Select purpose" />
                              </SelectTrigger>
                              <SelectContent className="bg-slate-800 border-slate-600">
                                {roomPurposes.map((purpose) => (
                                  <SelectItem key={purpose} value={purpose} className="text-white">{purpose}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-4 mb-4">
                          <div>
                            <Label className="text-white">Room Facilities</Label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                              {facilities.map((facility) => (
                                <div key={facility.id} className="flex items-center space-x-2">
                                  <input 
                                    type="checkbox"
                                    id={`facility-${facility.id}`}
                                    checked={currentRoom.facilities?.includes(facility.id) || false}
                                    onChange={(e) => {
                                      const facilitiesArray = currentRoom.facilities || [];
                                      if (e.target.checked) {
                                        setCurrentRoom((prev: any) => ({ ...prev, facilities: [...facilitiesArray, facility.id] }));
                                      } else {
                                        setCurrentRoom((prev: any) => ({ ...prev, facilities: facilitiesArray.filter((f: string) => f !== facility.id) }));
                                      }
                                    }}
                                    className="w-3 h-3"
                                  />
                                  <Label htmlFor={`facility-${facility.id}`} className="text-white text-sm">{facility.name}</Label>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <Label className="text-white">Room Rules</Label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                              {roomRules.map((rule) => (
                                <div key={rule} className="flex items-center space-x-2">
                                  <input 
                                    type="checkbox"
                                    id={`rule-${rule}`}
                                    checked={currentRoom.rules?.includes(rule) || false}
                                    onChange={(e) => {
                                      const rulesArray = currentRoom.rules || [];
                                      if (e.target.checked) {
                                        setCurrentRoom((prev: any) => ({ ...prev, rules: [...rulesArray, rule] }));
                                      } else {
                                        setCurrentRoom((prev: any) => ({ ...prev, rules: rulesArray.filter((r: string) => r !== rule) }));
                                      }
                                    }}
                                    className="w-3 h-3"
                                  />
                                  <Label htmlFor={`rule-${rule}`} className="text-white text-xs">{rule}</Label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex space-x-4 mt-6">
                          <Button onClick={addRoom} className="bg-green-600 hover:bg-green-700">
                            <Save className="w-4 h-4 mr-2" />
                            Save Room
                          </Button>
                          <Button variant="outline" onClick={() => setShowRoomForm(false)}>
                            Cancel
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Rooms List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {rooms.map((room) => (
                      <Card key={room.id} className="bg-slate-700/30 border-orange-500/30">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-white font-medium">{room.roomName}</h4>
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="sm" className="text-orange-400">
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-400">
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-gray-400 text-sm">{room.floor} | {room.purpose}</p>
                          <p className="text-gray-400 text-xs">SDA: {room.digitalAddress}</p>
                          {room.length && room.width && (
                            <p className="text-gray-400 text-xs">Size: {room.length} x {room.width} ft</p>
                          )}
                          {room.facilities && room.facilities.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {room.facilities.map((facilityId: string) => {
                                const facility = facilities.find(f => f.id === facilityId);
                                return facility ? (
                                  <Badge key={facilityId} variant="secondary" className="text-xs">
                                    {facility.name}
                                  </Badge>
                                ) : null;
                              })}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Submit Section */}
        <Card className="bg-slate-800/90 border-green-500/50">
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-bold text-green-400 mb-4">Ready to Register Building?</h2>
            <p className="text-white mb-6">
              Please review all sections before submitting your building registration.
              Once submitted, you will receive a confirmation and building ID.
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" className="text-green-400 border-green-400 hover:bg-green-400/10">
                <Eye className="w-4 h-4 mr-2" />
                Preview Registration
              </Button>
              <Button onClick={submitForm} className="bg-green-600 hover:bg-green-700 text-white">
                <Send className="w-4 h-4 mr-2" />
                Register Building
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}