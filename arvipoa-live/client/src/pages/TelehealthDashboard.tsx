import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { 
  Activity, 
  Users, 
  Clock, 
  TrendingUp, 
  Heart, 
  Brain, 
  Eye, 
  Stethoscope, 
  Video, 
  Phone, 
  MessageCircle, 
  FileText, 
  Calendar, 
  Star, 
  Shield, 
  Camera, 
  Mic, 
  MicOff, 
  VideoOff, 
  Share, 
  Settings, 
  Maximize, 
  Minimize, 
  BarChart3, 
  PieChart, 
  LineChart, 
  AlertTriangle, 
  CheckCircle, 
  Target, 
  Award, 
  User, 
  DollarSign, 
  UserCheck, 
  UserPlus, 
  Timer, 
  Clipboard, 
  Download, 
  Upload, 
  Pill,
  Send
} from 'lucide-react';

interface PerformanceMetrics {
  totalConsultations: number;
  averageRating: number;
  responseTime: number;
  patientSatisfaction: number;
  consultationDuration: number;
  monthlyEarnings: number;
  activePatients: number;
  completionRate: number;
  consultationsToday: number;
  consultationsThisWeek: number;
  consultationsThisMonth: number;
}

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  condition: string;
  lastVisit: string;
  nextAppointment: string;
  priority: 'low' | 'medium' | 'high';
  status: 'waiting' | 'in_consultation' | 'completed';
  vitals: {
    heartRate: number;
    bloodPressure: string;
    temperature: number;
    oxygenSaturation: number;
  };
}

interface ConsultationRoom {
  id: string;
  patientId: string;
  patientName: string;
  startTime: string;
  duration: number;
  type: 'video' | 'audio' | 'chat';
  status: 'active' | 'waiting' | 'ended';
  specialty: string;
  notes: string;
  prescription: string;
  followUpRequired: boolean;
}

export default function TelehealthDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isInConsultation, setIsInConsultation] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<ConsultationRoom | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [consultationNotes, setConsultationNotes] = useState('');
  const [prescription, setPrescription] = useState('');

  const [performanceMetrics] = useState<PerformanceMetrics>({
    totalConsultations: 1247,
    averageRating: 4.9,
    responseTime: 3.2,
    patientSatisfaction: 96,
    consultationDuration: 18.5,
    monthlyEarnings: 15600,
    activePatients: 68,
    completionRate: 98,
    consultationsToday: 12,
    consultationsThisWeek: 54,
    consultationsThisMonth: 187
  });

  const [waitingPatients] = useState<Patient[]>([
    {
      id: 'P001',
      name: 'Sarah Johnson',
      age: 34,
      gender: 'Female',
      condition: 'Hypertension Follow-up',
      lastVisit: '2024-01-15',
      nextAppointment: '2024-02-15',
      priority: 'medium',
      status: 'waiting',
      vitals: {
        heartRate: 78,
        bloodPressure: '125/80',
        temperature: 36.8,
        oxygenSaturation: 98
      }
    },
    {
      id: 'P002',
      name: 'Michael Chen',
      age: 45,
      gender: 'Male',
      condition: 'Chest Pain Assessment',
      lastVisit: '2024-01-10',
      nextAppointment: '2024-01-22',
      priority: 'high',
      status: 'waiting',
      vitals: {
        heartRate: 92,
        bloodPressure: '140/90',
        temperature: 37.1,
        oxygenSaturation: 96
      }
    },
    {
      id: 'P003',
      name: 'Grace Asante',
      age: 28,
      gender: 'Female',
      condition: 'Routine Checkup',
      lastVisit: '2024-01-08',
      nextAppointment: '2024-01-22',
      priority: 'low',
      status: 'waiting',
      vitals: {
        heartRate: 72,
        bloodPressure: '118/75',
        temperature: 36.6,
        oxygenSaturation: 99
      }
    }
  ]);

  const [consultationHistory] = useState([
    {
      id: 'C001',
      patient: 'Emma Wilson',
      date: '2024-01-21',
      duration: '22 minutes',
      type: 'Video',
      condition: 'Diabetes Management',
      satisfaction: 5,
      followUp: true
    },
    {
      id: 'C002',
      patient: 'James Osei',
      date: '2024-01-21',
      duration: '15 minutes',
      type: 'Audio',
      condition: 'Medication Review',
      satisfaction: 5,
      followUp: false
    },
    {
      id: 'C003',
      patient: 'Ama Darko',
      date: '2024-01-20',
      duration: '30 minutes',
      type: 'Video',
      condition: 'Mental Health Support',
      satisfaction: 4,
      followUp: true
    }
  ]);

  const startConsultation = async (patient: Patient) => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      setStream(mediaStream);
      setCurrentRoom({
        id: `room_${Date.now()}`,
        patientId: patient.id,
        patientName: patient.name,
        startTime: new Date().toISOString(),
        duration: 0,
        type: 'video',
        status: 'active',
        specialty: 'General Medicine',
        notes: '',
        prescription: '',
        followUpRequired: false
      });
      setIsInConsultation(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error starting consultation:', error);
      alert('Unable to access camera/microphone. Please check permissions.');
    }
  };

  const endConsultation = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsInConsultation(false);
    setCurrentRoom(null);
    setConsultationNotes('');
    setPrescription('');
  };

  const toggleCamera = () => {
    if (stream) {
      stream.getVideoTracks().forEach(track => {
        track.enabled = !isCameraOn;
      });
      setIsCameraOn(!isCameraOn);
    }
  };

  const toggleMicrophone = () => {
    if (stream) {
      stream.getAudioTracks().forEach(track => {
        track.enabled = !isMicOn;
      });
      setIsMicOn(!isMicOn);
    }
  };

  const shareScreen = async () => {
    try {
      if (!isScreenSharing) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true
        });
        setIsScreenSharing(true);
        
        screenStream.getVideoTracks()[0].addEventListener('ended', () => {
          setIsScreenSharing(false);
        });
      }
    } catch (error) {
      console.error('Error sharing screen:', error);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getVitalStatus = (vital: string, value: number | string, normalRange: [number, number]) => {
    if (typeof value === 'number') {
      return value >= normalRange[0] && value <= normalRange[1] ? 'normal' : 'abnormal';
    }
    return 'normal';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Telehealth Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Professional healthcare delivery platform with real-time monitoring
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="patients">Patient Queue</TabsTrigger>
            <TabsTrigger value="consultation">Consultation Room</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Performance Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Total Consultations
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {performanceMetrics.totalConsultations}
                      </p>
                      <p className="text-sm text-green-600">+12% this month</p>
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
                        Average Rating
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {performanceMetrics.averageRating}⭐
                      </p>
                      <p className="text-sm text-green-600">Excellent feedback</p>
                    </div>
                    <Star className="h-8 w-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Response Time
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {performanceMetrics.responseTime}m
                      </p>
                      <p className="text-sm text-green-600">Target: &lt;5m</p>
                    </div>
                    <Timer className="h-8 w-8 text-green-600" />
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
                        ₵{performanceMetrics.monthlyEarnings}
                      </p>
                      <p className="text-sm text-green-600">+8% vs last month</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Today's Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Today's Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Consultations Completed</span>
                      <span className="font-semibold">{performanceMetrics.consultationsToday}</span>
                    </div>
                    <Progress value={(performanceMetrics.consultationsToday / 15) * 100} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span>Patient Satisfaction</span>
                      <span className="font-semibold">{performanceMetrics.patientSatisfaction}%</span>
                    </div>
                    <Progress value={performanceMetrics.patientSatisfaction} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span>Completion Rate</span>
                      <span className="font-semibold">{performanceMetrics.completionRate}%</span>
                    </div>
                    <Progress value={performanceMetrics.completionRate} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Patient Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Active Patients</span>
                      <span className="font-semibold">{performanceMetrics.activePatients}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span>Waiting in Queue</span>
                      <span className="font-semibold">{waitingPatients.length}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span>High Priority Cases</span>
                      <span className="font-semibold text-red-600">
                        {waitingPatients.filter(p => p.priority === 'high').length}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span>Avg. Consultation Time</span>
                      <span className="font-semibold">{performanceMetrics.consultationDuration}m</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Consultations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Consultations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {consultationHistory.slice(0, 5).map((consultation) => (
                    <div key={consultation.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{consultation.patient}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {consultation.condition}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <span className="text-sm">{consultation.satisfaction}</span>
                        </div>
                        <p className="text-sm text-gray-500">{consultation.duration}</p>
                        <Badge variant="outline">{consultation.type}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patients" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Patient Queue Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {waitingPatients.map((patient) => (
                    <Card key={patient.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          {/* Patient Info */}
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-semibold">{patient.name}</h3>
                              <Badge className={getPriorityColor(patient.priority)}>
                                {patient.priority.toUpperCase()}
                              </Badge>
                            </div>
                            
                            <div className="space-y-2 text-sm">
                              <p><span className="font-medium">Age:</span> {patient.age}</p>
                              <p><span className="font-medium">Gender:</span> {patient.gender}</p>
                              <p><span className="font-medium">Condition:</span> {patient.condition}</p>
                              <p><span className="font-medium">Last Visit:</span> {patient.lastVisit}</p>
                            </div>
                          </div>
                          
                          {/* Vitals */}
                          <div className="space-y-4">
                            <h4 className="font-semibold text-gray-700 dark:text-gray-300">Vital Signs</h4>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div className="flex justify-between">
                                <span>Heart Rate:</span>
                                <span className={`font-medium ${getVitalStatus('hr', patient.vitals.heartRate, [60, 100]) === 'normal' ? 'text-green-600' : 'text-red-600'}`}>
                                  {patient.vitals.heartRate} bpm
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Blood Pressure:</span>
                                <span className="font-medium">{patient.vitals.bloodPressure}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Temperature:</span>
                                <span className={`font-medium ${getVitalStatus('temp', patient.vitals.temperature, [36.1, 37.2]) === 'normal' ? 'text-green-600' : 'text-red-600'}`}>
                                  {patient.vitals.temperature}°C
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Oxygen Sat:</span>
                                <span className={`font-medium ${getVitalStatus('ox', patient.vitals.oxygenSaturation, [95, 100]) === 'normal' ? 'text-green-600' : 'text-red-600'}`}>
                                  {patient.vitals.oxygenSaturation}%
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Actions */}
                          <div className="space-y-3">
                            <Button 
                              className="w-full"
                              onClick={() => startConsultation(patient)}
                            >
                              <Video className="h-4 w-4 mr-2" />
                              Start Video Consultation
                            </Button>
                            <Button variant="outline" className="w-full">
                              <Phone className="h-4 w-4 mr-2" />
                              Audio Call
                            </Button>
                            <Button variant="outline" className="w-full">
                              <MessageCircle className="h-4 w-4 mr-2" />
                              Send Message
                            </Button>
                            <Button variant="outline" className="w-full">
                              <FileText className="h-4 w-4 mr-2" />
                              View Records
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

          <TabsContent value="consultation" className="space-y-6">
            {isInConsultation && currentRoom ? (
              <div className="space-y-6">
                {/* Video Call Interface */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Video className="h-5 w-5" />
                        Live Consultation with {currentRoom.patientName}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4" />
                        <span>Duration: 00:05:23</span>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <video
                        ref={videoRef}
                        autoPlay
                        muted
                        className="w-full h-96 bg-black rounded-lg"
                      />
                      
                      {/* Patient Video Window */}
                      <div className="absolute top-4 right-4 w-48 h-36 bg-gray-800 rounded-lg border-2 border-white">
                        <div className="w-full h-full flex items-center justify-center text-white">
                          <div className="text-center">
                            <User className="h-8 w-8 mx-auto mb-2" />
                            <p className="text-sm">{currentRoom.patientName}</p>
                            <p className="text-xs">Patient</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Control Panel */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={toggleCamera}
                          className={!isCameraOn ? 'bg-red-500 text-white' : ''}
                        >
                          {isCameraOn ? <Camera className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={toggleMicrophone}
                          className={!isMicOn ? 'bg-red-500 text-white' : ''}
                        >
                          {isMicOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={shareScreen}
                          className={isScreenSharing ? 'bg-blue-500 text-white' : ''}
                        >
                          <Share className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={endConsultation}>
                          End Consultation
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Consultation Tools */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Consultation Notes
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        placeholder="Record consultation findings, observations, and recommendations..."
                        value={consultationNotes}
                        onChange={(e) => setConsultationNotes(e.target.value)}
                        className="min-h-[200px]"
                      />
                      
                      <div className="flex gap-2 mt-4">
                        <Button size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Save Notes
                        </Button>
                        <Button size="sm" variant="outline">
                          <Upload className="h-4 w-4 mr-2" />
                          Voice to Text
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Pill className="h-5 w-5" />
                        Digital Prescription
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        placeholder="Enter prescription details, medications, dosages, and instructions..."
                        value={prescription}
                        onChange={(e) => setPrescription(e.target.value)}
                        className="min-h-[200px]"
                      />
                      
                      <div className="flex gap-2 mt-4">
                        <Button size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          Generate Prescription
                        </Button>
                        <Button size="sm" variant="outline">
                          <Send className="h-4 w-4 mr-2" />
                          Send to Pharmacy
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Button variant="outline" className="h-20 flex-col">
                        <Calendar className="h-6 w-6 mb-2" />
                        Schedule Follow-up
                      </Button>
                      <Button variant="outline" className="h-20 flex-col">
                        <FileText className="h-6 w-6 mb-2" />
                        Lab Orders
                      </Button>
                      <Button variant="outline" className="h-20 flex-col">
                        <Camera className="h-6 w-6 mb-2" />
                        Take Photo
                      </Button>
                      <Button variant="outline" className="h-20 flex-col">
                        <Share className="h-6 w-6 mb-2" />
                        Share Screen
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Video className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold mb-2">Interactive Health Service Room</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Start a consultation from the Patient Queue to access the interactive consultation room
                  </p>
                  <Button onClick={() => setActiveTab('patients')}>
                    View Patient Queue
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Performance Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Weekly Performance */}
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-4">Weekly Performance</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Consultations</span>
                          <span className="font-semibold">{performanceMetrics.consultationsThisWeek}</span>
                        </div>
                        <Progress value={(performanceMetrics.consultationsThisWeek / 60) * 100} />
                        
                        <div className="flex justify-between">
                          <span>Patient Satisfaction</span>
                          <span className="font-semibold">{performanceMetrics.patientSatisfaction}%</span>
                        </div>
                        <Progress value={performanceMetrics.patientSatisfaction} />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Monthly Trends */}
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-4">Monthly Trends</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Total Revenue</span>
                          <span className="font-semibold text-green-600">₵{performanceMetrics.monthlyEarnings}</span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span>New Patients</span>
                          <span className="font-semibold">23</span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span>Returning Patients</span>
                          <span className="font-semibold">{performanceMetrics.activePatients - 23}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quality Metrics */}
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-4">Quality Metrics</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Avg Response Time</span>
                          <span className="font-semibold">{performanceMetrics.responseTime}m</span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span>Completion Rate</span>
                          <span className="font-semibold">{performanceMetrics.completionRate}%</span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span>Follow-up Rate</span>
                          <span className="font-semibold">85%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Consultation Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold">Video Settings</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <Label>Camera Quality</Label>
                          <Select defaultValue="hd">
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sd">SD (480p)</SelectItem>
                              <SelectItem value="hd">HD (720p)</SelectItem>
                              <SelectItem value="fhd">Full HD (1080p)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <Label>Audio Quality</Label>
                          <Select defaultValue="high">
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold">Consultation Preferences</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <Label>Default Session Duration</Label>
                          <Select defaultValue="20">
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="15">15 minutes</SelectItem>
                              <SelectItem value="20">20 minutes</SelectItem>
                              <SelectItem value="30">30 minutes</SelectItem>
                              <SelectItem value="45">45 minutes</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <Label>Auto-save Notes</Label>
                          <Button variant="outline" size="sm">Enabled</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}