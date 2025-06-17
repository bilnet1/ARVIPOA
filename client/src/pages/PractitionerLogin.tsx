import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Stethoscope, Eye, Heart, Brain, Pill, User, Lock, Calendar, Phone, Video, MapPin, Clock, Bell, Trophy } from 'lucide-react';
import { useLocation } from 'wouter';
import PractitionerBadges from '@/components/PractitionerBadges';
import PractitionerAdviceBox from '@/components/PractitionerAdviceBox';
import DigitalSignature from '@/components/DigitalSignature';
import { defaultPractitionerBadges, calculateBadgeStats } from '@/lib/practitionerBadges';

interface PractitionerProfile {
  id: string;
  name: string;
  specialty: string;
  license: string;
  verified: boolean;
  rating: number;
  totalConsultations: number;
  activePatients: number;
  earnings: number;
}

const specialtyIcons = {
  'General Medicine': Stethoscope,
  'Cardiology': Heart,
  'Dentistry': User,
  'Optometry': Eye,
  'Psychology': Brain,
  'Pharmacy': Pill
};

export default function PractitionerLogin() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState('login');
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    specialty: ''
  });
  const [registrationForm, setRegistrationForm] = useState({
    name: '',
    email: '',
    password: '',
    specialty: '',
    license: '',
    phone: '',
    location: '',
    experience: ''
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [practitioner, setPractitioner] = useState<PractitionerProfile | null>(null);
  const [practitionerBadges, setPractitionerBadges] = useState(defaultPractitionerBadges);
  const badgeStats = calculateBadgeStats(practitionerBadges);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate login authentication
    const mockPractitioner: PractitionerProfile = {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: loginForm.specialty || 'General Medicine',
      license: 'MD-2024-001',
      verified: true,
      rating: 4.9,
      totalConsultations: 1247,
      activePatients: 68,
      earnings: 15600
    };
    
    setPractitioner(mockPractitioner);
    setIsLoggedIn(true);
  };

  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate registration process
    alert('Registration submitted for review. You will receive verification within 24-48 hours.');
    setActiveTab('login');
  };

  const handleConsultationRequest = (patientId: string) => {
    alert(`Consultation request accepted for Patient ${patientId}`);
  };

  if (isLoggedIn && practitioner) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Practitioner Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Welcome back, {practitioner.name}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="flex items-center gap-2">
                {practitioner.verified && <div className="w-2 h-2 bg-green-500 rounded-full" />}
                Verified Practitioner
              </Badge>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsLoggedIn(false);
                  setPractitioner(null);
                }}
              >
                Logout
              </Button>
            </div>
          </div>

          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid w-full grid-cols-8">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="patients">Patients</TabsTrigger>
              <TabsTrigger value="consultations">Consultations</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
              <TabsTrigger value="badges">Badges</TabsTrigger>
              <TabsTrigger value="advice">Patient Advice</TabsTrigger>
              <TabsTrigger value="signature">Digital Signature</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Total Consultations
                        </p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {practitioner.totalConsultations}
                        </p>
                      </div>
                      <Stethoscope className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Active Patients
                        </p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {practitioner.activePatients}
                        </p>
                      </div>
                      <User className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Rating
                        </p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {practitioner.rating}★
                        </p>
                      </div>
                      <Heart className="h-8 w-8 text-red-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Monthly Earnings
                        </p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          ₵{practitioner.earnings}
                        </p>
                      </div>
                      <Pill className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activities */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Pending Consultation Requests
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { id: 'P001', name: 'John Mensah', condition: 'Blood pressure check', time: '2 hours ago', urgent: false },
                        { id: 'P002', name: 'Grace Asante', condition: 'Chest pain consultation', time: '45 minutes ago', urgent: true },
                        { id: 'P003', name: 'Kwame Osei', condition: 'Routine checkup', time: '30 minutes ago', urgent: false }
                      ].map((request) => (
                        <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{request.name}</h4>
                              {request.urgent && (
                                <Badge variant="destructive" className="text-xs">Urgent</Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{request.condition}</p>
                            <p className="text-xs text-gray-500">{request.time}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => handleConsultationRequest(request.id)}>
                              <Video className="h-4 w-4 mr-1" />
                              Accept
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Today's Schedule
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { time: '09:00 AM', patient: 'Mary Addo', type: 'Video Consultation', status: 'completed' },
                        { time: '10:30 AM', patient: 'Peter Tetteh', type: 'In-Person Visit', status: 'ongoing' },
                        { time: '02:00 PM', patient: 'Sarah Wilson', type: 'Video Consultation', status: 'upcoming' },
                        { time: '04:00 PM', patient: 'Michael Asante', type: 'Phone Consultation', status: 'upcoming' }
                      ].map((appointment, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-sm">{appointment.time}</span>
                              <Badge variant={
                                appointment.status === 'completed' ? 'default' :
                                appointment.status === 'ongoing' ? 'secondary' : 'outline'
                              }>
                                {appointment.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{appointment.patient}</p>
                            <p className="text-xs text-gray-500">{appointment.type}</p>
                          </div>
                          {appointment.status === 'upcoming' && (
                            <Button size="sm" variant="outline">
                              <Video className="h-4 w-4 mr-1" />
                              Join
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="patients" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Patient Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Patient search and filters would go here */}
                    <div className="flex gap-4">
                      <Input placeholder="Search patients..." className="flex-1" />
                      <Button>Search</Button>
                    </div>
                    
                    {/* Patient list */}
                    <div className="space-y-4">
                      {[
                        { id: 'P001', name: 'John Mensah', age: 45, lastVisit: '2024-01-15', condition: 'Hypertension' },
                        { id: 'P002', name: 'Grace Asante', age: 32, lastVisit: '2024-01-10', condition: 'Diabetes' },
                        { id: 'P003', name: 'Kwame Osei', age: 28, lastVisit: '2024-01-08', condition: 'Regular Checkup' }
                      ].map((patient) => (
                        <Card key={patient.id}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-semibold">{patient.name}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Age: {patient.age} | Last Visit: {patient.lastVisit}
                                </p>
                                <p className="text-sm text-gray-500">{patient.condition}</p>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  View Records
                                </Button>
                                <Button size="sm">
                                  <Video className="h-4 w-4 mr-1" />
                                  Consult
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="consultations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Consultation History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { id: 'C001', patient: 'John Mensah', date: '2024-01-15', type: 'Video', duration: '30 min', fee: 150 },
                      { id: 'C002', patient: 'Grace Asante', date: '2024-01-14', type: 'Phone', duration: '20 min', fee: 100 },
                      { id: 'C003', patient: 'Kwame Osei', date: '2024-01-13', type: 'In-Person', duration: '45 min', fee: 200 }
                    ].map((consultation) => (
                      <Card key={consultation.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold">{consultation.patient}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {consultation.date} | {consultation.type} | {consultation.duration}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-green-600">₵{consultation.fee}</p>
                              <Button size="sm" variant="outline">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Schedule Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Set Availability</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Start Time</Label>
                            <Input type="time" defaultValue="09:00" />
                          </div>
                          <div>
                            <Label>End Time</Label>
                            <Input type="time" defaultValue="17:00" />
                          </div>
                        </div>
                        <div>
                          <Label>Available Days</Label>
                          <div className="flex gap-2 mt-2">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                              <Button key={day} variant="outline" size="sm">
                                {day}
                              </Button>
                            ))}
                          </div>
                        </div>
                        <Button>Update Availability</Button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Upcoming Appointments</h3>
                      <div className="space-y-3">
                        {[
                          { time: '2:00 PM', patient: 'Sarah Wilson', type: 'Video' },
                          { time: '4:00 PM', patient: 'Michael Asante', type: 'Phone' },
                          { time: '5:30 PM', patient: 'Emma Darko', type: 'Video' }
                        ].map((appointment, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded">
                            <div>
                              <p className="font-semibold">{appointment.time}</p>
                              <p className="text-sm text-gray-600">{appointment.patient}</p>
                              <p className="text-xs text-gray-500">{appointment.type}</p>
                            </div>
                            <Button size="sm" variant="outline">
                              Reschedule
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="earnings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Earnings Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">This Month</h3>
                        <p className="text-2xl font-bold text-green-600">₵{practitioner.earnings}</p>
                        <p className="text-sm text-gray-500">+12% from last month</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">This Week</h3>
                        <p className="text-2xl font-bold text-blue-600">₵3,850</p>
                        <p className="text-sm text-gray-500">+8% from last week</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">Average per Session</h3>
                        <p className="text-2xl font-bold text-purple-600">₵175</p>
                        <p className="text-sm text-gray-500">Based on last 30 days</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
                    <div className="space-y-3">
                      {[
                        { date: '2024-01-15', patient: 'John Mensah', amount: 150, type: 'Video Consultation' },
                        { date: '2024-01-14', patient: 'Grace Asante', amount: 100, type: 'Phone Consultation' },
                        { date: '2024-01-13', patient: 'Kwame Osei', amount: 200, type: 'In-Person Visit' }
                      ].map((transaction, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded">
                          <div>
                            <p className="font-semibold">{transaction.patient}</p>
                            <p className="text-sm text-gray-600">{transaction.date} | {transaction.type}</p>
                          </div>
                          <p className="font-semibold text-green-600">₵{transaction.amount}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="badges" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-600" />
                    Professional Achievements & Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <PractitionerBadges
                    practitionerId={practitioner.id}
                    badges={practitionerBadges}
                    stats={badgeStats}
                    showOnlyEarned={false}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advice" className="space-y-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Patient Consultation Reports</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { patientName: 'John Mensah', condition: 'Hypertension Follow-up', date: '2024-01-15' },
                        { patientName: 'Grace Asante', condition: 'Diabetes Management', date: '2024-01-14' },
                        { patientName: 'Kwame Osei', condition: 'Routine Checkup', date: '2024-01-13' }
                      ].map((patient, index) => (
                        <div key={index} className="mb-8">
                          <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <h4 className="font-semibold text-blue-800 dark:text-blue-200">
                              {patient.patientName} - {patient.condition}
                            </h4>
                            <p className="text-sm text-blue-600 dark:text-blue-300">
                              Consultation Date: {patient.date}
                            </p>
                          </div>
                          <PractitionerAdviceBox 
                            patientName={patient.patientName}
                            onSaveAdvice={(advice) => {
                              console.log(`Advice saved for ${patient.patientName}:`, advice);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="signature" className="space-y-6">
              <div className="space-y-6">
                <DigitalSignature 
                  title="Practitioner Professional Certification"
                  signerName={practitioner.name}
                  onSaveSignature={(signatureData) => {
                    console.log('Practitioner signature saved:', signatureData);
                  }}
                />
                
                <Card>
                  <CardHeader>
                    <CardTitle>Prescription & Medical Report Signatures</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {[
                      { documentType: 'Prescription for John Mensah', date: '2024-01-15' },
                      { documentType: 'Medical Report for Grace Asante', date: '2024-01-14' },
                      { documentType: 'Consultation Summary for Kwame Osei', date: '2024-01-13' }
                    ].map((doc, index) => (
                      <div key={index} className="mb-6">
                        <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded">
                          <h4 className="font-medium">{doc.documentType}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Date: {doc.date}</p>
                        </div>
                        <DigitalSignature 
                          title={doc.documentType}
                          signerName={practitioner.name}
                          onSaveSignature={(signatureData) => {
                            console.log(`Signature for ${doc.documentType}:`, signatureData);
                          }}
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">ARVIPOA Health Practitioners</CardTitle>
          <p className="text-gray-600 dark:text-gray-400">Access your professional dashboard</p>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="practitioner@example.com"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="specialty">Specialty</Label>
                  <Select value={loginForm.specialty} onValueChange={(value) => setLoginForm(prev => ({ ...prev, specialty: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General Medicine">General Medicine</SelectItem>
                      <SelectItem value="Cardiology">Cardiology</SelectItem>
                      <SelectItem value="Dentistry">Dentistry</SelectItem>
                      <SelectItem value="Optometry">Optometry</SelectItem>
                      <SelectItem value="Psychology">Psychology</SelectItem>
                      <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                      <SelectItem value="Nutrition">Nutrition</SelectItem>
                      <SelectItem value="Physiotherapy">Physiotherapy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button type="submit" className="w-full">
                  <Lock className="h-4 w-4 mr-2" />
                  Login to Dashboard
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegistration} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Dr. John Doe"
                      value={registrationForm.name}
                      onChange={(e) => setRegistrationForm(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reg-email">Email</Label>
                    <Input
                      id="reg-email"
                      type="email"
                      placeholder="doctor@example.com"
                      value={registrationForm.email}
                      onChange={(e) => setRegistrationForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reg-specialty">Medical Specialty</Label>
                  <Select value={registrationForm.specialty} onValueChange={(value) => setRegistrationForm(prev => ({ ...prev, specialty: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General Medicine">General Medicine</SelectItem>
                      <SelectItem value="Cardiology">Cardiology</SelectItem>
                      <SelectItem value="Dentistry">Dentistry</SelectItem>
                      <SelectItem value="Optometry">Optometry</SelectItem>
                      <SelectItem value="Psychology">Psychology</SelectItem>
                      <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                      <SelectItem value="Nutrition">Nutrition</SelectItem>
                      <SelectItem value="Physiotherapy">Physiotherapy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="license">License Number</Label>
                    <Input
                      id="license"
                      placeholder="MD-2024-001"
                      value={registrationForm.license}
                      onChange={(e) => setRegistrationForm(prev => ({ ...prev, license: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="+233 XX XXX XXXX"
                      value={registrationForm.phone}
                      onChange={(e) => setRegistrationForm(prev => ({ ...prev, phone: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Practice Location</Label>
                  <Input
                    id="location"
                    placeholder="Accra, Ghana"
                    value={registrationForm.location}
                    onChange={(e) => setRegistrationForm(prev => ({ ...prev, location: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input
                    id="experience"
                    type="number"
                    placeholder="5"
                    value={registrationForm.experience}
                    onChange={(e) => setRegistrationForm(prev => ({ ...prev, experience: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reg-password">Password</Label>
                  <Input
                    id="reg-password"
                    type="password"
                    value={registrationForm.password}
                    onChange={(e) => setRegistrationForm(prev => ({ ...prev, password: e.target.value }))}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  <User className="h-4 w-4 mr-2" />
                  Register as Practitioner
                </Button>
                
                <p className="text-xs text-gray-500 text-center">
                  Registration requires verification of medical credentials
                </p>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}