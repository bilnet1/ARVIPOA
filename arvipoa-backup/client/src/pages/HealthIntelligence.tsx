import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Video, Phone, MapPin, ShoppingCart, Heart, Activity, Eye, Ear, Brain, Shield, Weight, AlertTriangle, Clock, User, Stethoscope, Camera } from 'lucide-react';
import { format } from 'date-fns';
import GoogleMap from '@/components/GoogleMap';
import PractitionerAdviceBox from '@/components/PractitionerAdviceBox';
import DigitalSignature from '@/components/DigitalSignature';

interface HealthMetric {
  id: string;
  name: string;
  currentLevel: string;
  lastResult: string;
  unit: string;
  normalRange: string;
  icon: any;
  status: 'normal' | 'warning' | 'critical';
}

interface Practitioner {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  availability: string;
  price: number;
  image: string;
  location: string;
}

interface DeliveryOrder {
  id: string;
  medication: string;
  pharmacy: string;
  deliveryAddress: string;
  estimatedTime: string;
  deliveryPerson: string;
  status: 'preparing' | 'in_transit' | 'delivered';
  coordinates: { lat: number; lng: number };
}

export default function HealthIntelligence() {
  const [activeTab, setActiveTab] = useState('health-status');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [selectedPractitioner, setSelectedPractitioner] = useState<Practitioner | null>(null);
  const [deliveryOrders, setDeliveryOrders] = useState<DeliveryOrder[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const [healthMetrics, setHealthMetrics] = useState<HealthMetric[]>([
    {
      id: 'bp',
      name: 'Blood Pressure',
      currentLevel: '120/80',
      lastResult: '118/82',
      unit: 'mmHg',
      normalRange: '90/60 - 140/90',
      icon: Heart,
      status: 'normal'
    },
    {
      id: 'sugar',
      name: 'Blood Sugar',
      currentLevel: '95',
      lastResult: '98',
      unit: 'mg/dL',
      normalRange: '70-100',
      icon: Activity,
      status: 'normal'
    },
    {
      id: 'pulse',
      name: 'Pulse Rate',
      currentLevel: '72',
      lastResult: '75',
      unit: 'bpm',
      normalRange: '60-100',
      icon: Activity,
      status: 'normal'
    },
    {
      id: 'vision',
      name: 'Vision',
      currentLevel: '20/20',
      lastResult: '20/25',
      unit: '',
      normalRange: '20/20',
      icon: Eye,
      status: 'normal'
    },
    {
      id: 'hearing',
      name: 'Hearing',
      currentLevel: 'Normal',
      lastResult: 'Normal',
      unit: 'dB',
      normalRange: '0-25 dB',
      icon: Ear,
      status: 'normal'
    },
    {
      id: 'psychological',
      name: 'Psychological',
      currentLevel: 'Stable',
      lastResult: 'Good',
      unit: '',
      normalRange: 'Stable',
      icon: Brain,
      status: 'normal'
    },
    {
      id: 'weight',
      name: 'Weight',
      currentLevel: '70',
      lastResult: '68',
      unit: 'kg',
      normalRange: '55-75',
      icon: Weight,
      status: 'normal'
    }
  ]);

  const [practitioners] = useState<Practitioner[]>([
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'General Medicine',
      rating: 4.9,
      availability: 'Available Now',
      price: 150,
      image: '/api/placeholder/64/64',
      location: 'Accra Medical Center'
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Cardiology',
      rating: 4.8,
      availability: 'Available in 30 min',
      price: 200,
      image: '/api/placeholder/64/64',
      location: 'Heart Institute Ghana'
    },
    {
      id: '3',
      name: 'Dr. Aisha Mensah',
      specialty: 'Dentistry',
      rating: 4.9,
      availability: 'Available Now',
      price: 120,
      image: '/api/placeholder/64/64',
      location: 'Dental Care Plus'
    },
    {
      id: '4',
      name: 'Dr. James Wilson',
      specialty: 'Optometry',
      rating: 4.7,
      availability: 'Available in 1 hour',
      price: 100,
      image: '/api/placeholder/64/64',
      location: 'Vision Care Center'
    },
    {
      id: '5',
      name: 'Dr. Grace Asante',
      specialty: 'Psychology',
      rating: 4.8,
      availability: 'Available Now',
      price: 180,
      image: '/api/placeholder/64/64',
      location: 'Mental Health Clinic'
    },
    {
      id: '6',
      name: 'PharmD. Robert Taylor',
      specialty: 'Pharmacy',
      rating: 4.6,
      availability: 'Available Now',
      price: 50,
      image: '/api/placeholder/64/64',
      location: 'HealthCare Pharmacy'
    }
  ]);

  const startVideoCall = async (practitioner: Practitioner) => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      setStream(mediaStream);
      setSelectedPractitioner(practitioner);
      setIsVideoCallActive(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  const endVideoCall = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsVideoCallActive(false);
    setSelectedPractitioner(null);
  };

  const updateHealthMetric = (id: string, newValue: string) => {
    setHealthMetrics(prev => prev.map(metric => 
      metric.id === id 
        ? { ...metric, lastResult: metric.currentLevel, currentLevel: newValue }
        : metric
    ));
  };

  const scheduleAppointment = (practitionerId: string, date: Date) => {
    const practitioner = practitioners.find(p => p.id === practitionerId);
    if (practitioner) {
      alert(`Appointment scheduled with ${practitioner.name} on ${format(date, 'PPP')} at 2:00 PM`);
    }
  };

  const mockDeliveryData: DeliveryOrder[] = [
    {
      id: '1',
      medication: 'Paracetamol 500mg x20',
      pharmacy: 'HealthCare Pharmacy',
      deliveryAddress: 'East Legon, Accra',
      estimatedTime: '25 minutes',
      deliveryPerson: 'Kwame Asante',
      status: 'in_transit',
      coordinates: { lat: 5.6508, lng: -0.1467 }
    },
    {
      id: '2',
      medication: 'Vitamin D3 x30',
      pharmacy: 'Pharmacy Plus',
      deliveryAddress: 'Tema, Greater Accra',
      estimatedTime: '40 minutes',
      deliveryPerson: 'Grace Osei',
      status: 'preparing',
      coordinates: { lat: 5.6698, lng: -0.0177 }
    }
  ];

  useEffect(() => {
    setDeliveryOrders(mockDeliveryData);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            ARVIPOA Health Intelligence
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Comprehensive health monitoring and practitioner network
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="health-status">Health Status</TabsTrigger>
            <TabsTrigger value="practitioners">Practitioners</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="delivery">Delivery Tracking</TabsTrigger>
            <TabsTrigger value="video-call">Video Consultation</TabsTrigger>
            <TabsTrigger value="practitioner-advice">Practitioner's Advice</TabsTrigger>
            <TabsTrigger value="digital-signature">Digital Signature</TabsTrigger>
          </TabsList>

          <TabsContent value="health-status" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Health Intelligence Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Basic Info */}
                  <Card className="col-span-full">
                    <CardHeader>
                      <CardTitle>Basic Health Information</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bloodGroup">Blood Group</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select blood group" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="A+">A+</SelectItem>
                            <SelectItem value="A-">A-</SelectItem>
                            <SelectItem value="B+">B+</SelectItem>
                            <SelectItem value="B-">B-</SelectItem>
                            <SelectItem value="AB+">AB+</SelectItem>
                            <SelectItem value="AB-">AB-</SelectItem>
                            <SelectItem value="O+">O+</SelectItem>
                            <SelectItem value="O-">O-</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="genotype">Genotype</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select genotype" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="AA">AA</SelectItem>
                            <SelectItem value="AS">AS</SelectItem>
                            <SelectItem value="SS">SS</SelectItem>
                            <SelectItem value="AC">AC</SelectItem>
                            <SelectItem value="SC">SC</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2 col-span-2">
                        <Label htmlFor="healthCert">Health Certificate</Label>
                        <div className="flex gap-2">
                          <Input placeholder="Upload or link health certificate" />
                          <Button variant="outline">
                            <Camera className="h-4 w-4 mr-2" />
                            Upload
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Health Metrics */}
                  {healthMetrics.map((metric) => {
                    const IconComponent = metric.icon;
                    return (
                      <Card key={metric.id} className="relative">
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <IconComponent className="h-4 w-4" />
                              {metric.name}
                            </div>
                            <Badge variant={
                              metric.status === 'normal' ? 'default' : 
                              metric.status === 'warning' ? 'secondary' : 'destructive'
                            }>
                              {metric.status}
                            </Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label className="text-xs">Current Level</Label>
                            <div className="flex gap-2">
                              <Input
                                value={metric.currentLevel}
                                onChange={(e) => updateHealthMetric(metric.id, e.target.value)}
                                className="text-lg font-semibold"
                              />
                              <span className="text-sm text-gray-500 self-center">
                                {metric.unit}
                              </span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label className="text-xs">Last Result</Label>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {metric.lastResult} {metric.unit}
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label className="text-xs">Normal Range</Label>
                            <div className="text-sm text-green-600 dark:text-green-400">
                              {metric.normalRange}
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label className="text-xs">Next Appointment</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-start text-left font-normal">
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {selectedDate ? format(selectedDate, "PPP") : "Schedule appointment"}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={selectedDate}
                                  onSelect={setSelectedDate}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1">
                              <Video className="h-4 w-4 mr-1" />
                              Video Call
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1">
                              <Phone className="h-4 w-4 mr-1" />
                              Call
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="practitioners" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Available Health Practitioners</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {practitioners.map((practitioner) => (
                    <Card key={practitioner.id} className="relative">
                      <CardHeader className="pb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                            <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <CardTitle className="text-sm">{practitioner.name}</CardTitle>
                            <p className="text-xs text-gray-500">{practitioner.specialty}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-1">
                            <div className="text-yellow-400">★</div>
                            <span className="text-sm">{practitioner.rating}</span>
                          </div>
                          <Badge variant="secondary">{practitioner.availability}</Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Consultation Fee:</span>
                            <span className="font-semibold">₵{practitioner.price}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <MapPin className="h-4 w-4" />
                            {practitioner.location}
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="flex-1"
                            onClick={() => startVideoCall(practitioner)}
                          >
                            <Video className="h-4 w-4 mr-1" />
                            Video Call
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Phone className="h-4 w-4 mr-1" />
                            Audio Call
                          </Button>
                        </div>
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => selectedDate && scheduleAppointment(practitioner.id, selectedDate)}
                        >
                          <Clock className="h-4 w-4 mr-2" />
                          Schedule Appointment
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="marketplace" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Health & Wellness Marketplace
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Pharmacy Section */}
                  <Card className="col-span-full">
                    <CardHeader>
                      <CardTitle>Pharmacy Network</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                          { name: 'HealthCare Pharmacy', location: 'East Legon', rating: 4.8, delivery: '30 min' },
                          { name: 'Pharmacy Plus', location: 'Tema', rating: 4.6, delivery: '45 min' },
                          { name: 'MediCore Pharmacy', location: 'Kumasi', rating: 4.9, delivery: '25 min' },
                          { name: 'WellCare Drugs', location: 'Takoradi', rating: 4.7, delivery: '35 min' }
                        ].map((pharmacy, index) => (
                          <Card key={index}>
                            <CardContent className="p-4">
                              <h4 className="font-semibold text-sm">{pharmacy.name}</h4>
                              <p className="text-xs text-gray-500 mb-2">{pharmacy.location}</p>
                              <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-1">
                                  <div className="text-yellow-400 text-xs">★</div>
                                  <span className="text-xs">{pharmacy.rating}</span>
                                </div>
                                <span className="text-xs text-green-600">{pharmacy.delivery}</span>
                              </div>
                              <Button size="sm" className="w-full">
                                <ShoppingCart className="h-3 w-3 mr-1" />
                                Order Now
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Health Products */}
                  <Card className="col-span-full">
                    <CardHeader>
                      <CardTitle>Featured Health Products</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                          { name: 'Multivitamin Complex', price: 45, category: 'Supplements' },
                          { name: 'Blood Pressure Monitor', price: 120, category: 'Devices' },
                          { name: 'Omega-3 Fish Oil', price: 35, category: 'Supplements' },
                          { name: 'Digital Thermometer', price: 25, category: 'Devices' }
                        ].map((product, index) => (
                          <Card key={index}>
                            <CardContent className="p-4">
                              <div className="w-full h-24 bg-gray-100 dark:bg-gray-800 rounded mb-3"></div>
                              <h4 className="font-semibold text-sm mb-1">{product.name}</h4>
                              <p className="text-xs text-gray-500 mb-2">{product.category}</p>
                              <div className="flex justify-between items-center">
                                <span className="font-bold text-green-600">₵{product.price}</span>
                                <Button size="sm">Add to Cart</Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="delivery" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Real-Time Delivery Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Delivery List */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Active Deliveries</h3>
                    {deliveryOrders.map((order) => (
                      <Card key={order.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-semibold">{order.medication}</h4>
                              <p className="text-sm text-gray-500">{order.pharmacy}</p>
                            </div>
                            <Badge variant={
                              order.status === 'delivered' ? 'default' :
                              order.status === 'in_transit' ? 'secondary' : 'outline'
                            }>
                              {order.status.replace('_', ' ')}
                            </Badge>
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              <span>{order.deliveryAddress}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>ETA: {order.estimatedTime}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4" />
                              <span>Delivery by: {order.deliveryPerson}</span>
                            </div>
                          </div>
                          
                          <div className="flex gap-2 mt-3">
                            <Button size="sm" variant="outline" className="flex-1">
                              <Phone className="h-4 w-4 mr-1" />
                              Call Delivery
                            </Button>
                            <Button size="sm" className="flex-1">
                              <Video className="h-4 w-4 mr-1" />
                              Live Video
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  {/* Live Map */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Live Tracking Map</h3>
                    <div className="relative">
                      <GoogleMap
                        height="400px"
                        center={{ lat: 5.6037, lng: -0.1870 }}
                        zoom={12}
                        markers={deliveryOrders.map(order => ({
                          id: order.id,
                          position: order.coordinates,
                          title: `${order.deliveryPerson} - ${order.medication}`,
                          type: 'alert',
                          status: order.status === 'in_transit' ? 'online' : 'offline',
                          info: {
                            location: order.deliveryAddress,
                            owner: order.deliveryPerson,
                            lastUpdate: 'Just now',
                            alerts: [`Delivering ${order.medication}`]
                          }
                        }))}
                      />
                      
                      {/* Live Video Overlay */}
                      <div className="absolute top-4 right-4 w-48 h-36 bg-black rounded-lg overflow-hidden border-2 border-white shadow-lg">
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                          <div className="text-center text-white">
                            <Camera className="h-8 w-8 mx-auto mb-2" />
                            <p className="text-xs">Delivery Person Live View</p>
                            <Button size="sm" className="mt-2" variant="secondary">
                              Connect Video
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="video-call" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Video Consultation Platform
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isVideoCallActive ? (
                  <div className="space-y-4">
                    <div className="relative">
                      <video
                        ref={videoRef}
                        autoPlay
                        muted
                        className="w-full h-96 bg-black rounded-lg"
                      />
                      
                      {/* Doctor's Video Window */}
                      <div className="absolute top-4 right-4 w-48 h-36 bg-gray-800 rounded-lg border-2 border-white">
                        <div className="w-full h-full flex items-center justify-center text-white">
                          <div className="text-center">
                            <User className="h-8 w-8 mx-auto mb-2" />
                            <p className="text-sm">{selectedPractitioner?.name}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Control Panel */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
                        <Button variant="outline" size="sm">
                          <Camera className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={endVideoCall}>
                          End Call
                        </Button>
                      </div>
                    </div>
                    
                    {/* Call Info */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Active Consultation</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Connected with {selectedPractitioner?.name} - {selectedPractitioner?.specialty}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Session Duration: 00:05:23
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Video className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold mb-2">Ready for Video Consultation</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Select a practitioner from the Practitioners tab to start a video call
                    </p>
                    <Button onClick={() => setActiveTab('practitioners')}>
                      Browse Practitioners
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Practitioner's Advice Tab */}
          <TabsContent value="practitioner-advice" className="space-y-6">
            <PractitionerAdviceBox 
              patientName="John Doe" 
              onSaveAdvice={(advice) => {
                console.log('Practitioner advice saved:', advice);
                // Here you would typically save to your backend
              }}
            />
          </TabsContent>

          {/* Digital Signature Tab */}
          <TabsContent value="digital-signature" className="space-y-6">
            <DigitalSignature 
              title="Patient Health Records - Digital Signature"
              signerName="John Doe"
              onSaveSignature={(signatureData) => {
                console.log('Digital signature saved:', signatureData);
                // Here you would typically save to your backend
              }}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}