import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import DigitalSignature from '@/components/DigitalSignature';
import { 
  Camera, 
  Mic, 
  Video, 
  Upload, 
  Eye, 
  Palette, 
  Ruler, 
  Weight, 
  Volume2, 
  Accessibility, 
  Scan, 
  Brain, 
  Activity, 
  Shield, 
  Sparkles, 
  Zap, 
  Star, 
  Target, 
  Search,
  RotateCcw,
  Download,
  Share,
  Settings,
  User,
  Users,
  FileImage,
  Waves,
  Gauge,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';

interface PhysiqueData {
  hairColor: string;
  hairCustom: string;
  eyeColor: string;
  eyeCustom: string;
  height: string;
  heightCustom: string;
  weight: string;
  weightUnit: 'kg' | 'pounds';
  disability: boolean;
  disabilityType: string[];
  voiceRecording: Blob | null;
  photos: File[];
  fullSelfVideo: Blob | null;
  bodyMeasurements: any;
  aiAnalysis: any;
}

export default function PhysiqueStatus() {
  const [activeTab, setActiveTab] = useState('basic-info');
  const [physiqueData, setPhysiqueData] = useState<PhysiqueData>({
    hairColor: '',
    hairCustom: '',
    eyeColor: '',
    eyeCustom: '',
    height: '',
    heightCustom: '',
    weight: '',
    weightUnit: 'kg',
    disability: false,
    disabilityType: [],
    voiceRecording: null,
    photos: [],
    fullSelfVideo: null,
    bodyMeasurements: null,
    aiAnalysis: null
  });

  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [isRecordingVideo, setIsRecordingVideo] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isEyeScanning, setIsEyeScanning] = useState(false);
  const [aiProcessing, setAiProcessing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRecorderRef = useRef<MediaRecorder | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // AI-powered Eye Examination
  const startEyeExamination = async () => {
    setIsEyeScanning(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          facingMode: 'user'
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      // Simulate AI eye analysis
      const analyzeEyes = () => {
        setAnalysisProgress(0);
        const interval = setInterval(() => {
          setAnalysisProgress(prev => {
            if (prev >= 100) {
              clearInterval(interval);
              setIsEyeScanning(false);
              stream.getTracks().forEach(track => track.stop());
              
              // Simulate AI results
              setPhysiqueData(prev => ({
                ...prev,
                aiAnalysis: {
                  ...prev.aiAnalysis,
                  eyeHealth: {
                    overallHealth: 'Excellent',
                    pupilResponse: 'Normal',
                    scleraCondition: 'Healthy white',
                    refractivError: 'None detected',
                    recommendations: ['Regular eye checkups', 'Blue light protection']
                  }
                }
              }));
              return 100;
            }
            return prev + 10;
          });
        }, 200);
      };

      setTimeout(analyzeEyes, 1000);
    } catch (error) {
      console.error('Error accessing camera for eye examination:', error);
      setIsEyeScanning(false);
    }
  };

  // Advanced Voice Analysis
  const startVoiceRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 48000
        }
      });
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      audioRecorderRef.current = mediaRecorder;
      
      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setPhysiqueData(prev => ({ ...prev, voiceRecording: blob }));
        
        // Simulate AI voice analysis
        setTimeout(() => {
          setPhysiqueData(prev => ({
            ...prev,
            aiAnalysis: {
              ...prev.aiAnalysis,
              voiceAnalysis: {
                tone: 'Confident',
                clarity: 95,
                pitch: 'Medium-Low',
                emotionalState: 'Calm and Positive',
                voiceprint: 'Unique pattern recorded',
                healthIndicators: 'Normal vocal cord function'
              }
            }
          }));
        }, 2000);
        
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecordingVoice(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopVoiceRecording = () => {
    if (audioRecorderRef.current && isRecordingVoice) {
      audioRecorderRef.current.stop();
      setIsRecordingVoice(false);
    }
  };

  // 3D Body Mapping and Full Self Identifier
  const startFullSelfIdentifier = async () => {
    setIsRecordingVideo(true);
    setAiProcessing(true);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          facingMode: 'user'
        },
        audio: true
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        setPhysiqueData(prev => ({ ...prev, fullSelfVideo: blob }));
        
        // Simulate AI 3D body analysis
        setTimeout(() => {
          setPhysiqueData(prev => ({
            ...prev,
            aiAnalysis: {
              ...prev.aiAnalysis,
              bodyAnalysis: {
                bodyType: 'Athletic Build',
                postureScore: 85,
                bodyComposition: 'Healthy muscle-to-fat ratio',
                measurements: {
                  shoulderWidth: '45cm',
                  chestCircumference: '102cm',
                  waistCircumference: '82cm',
                  hipCircumference: '95cm'
                },
                styleRecommendations: [
                  'Fitted clothing complements your build',
                  'Bold colors enhance your complexion',
                  'Structured jackets work well'
                ],
                healthInsights: [
                  'Good posture alignment',
                  'Active lifestyle indicated',
                  'Balanced proportions'
                ]
              }
            }
          }));
          setAiProcessing(false);
        }, 5000);
        
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      
      // Auto-stop after 15 seconds
      setTimeout(() => {
        if (mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
          setIsRecordingVideo(false);
        }
      }, 15000);
      
    } catch (error) {
      console.error('Error accessing camera for full self identifier:', error);
      setIsRecordingVideo(false);
      setAiProcessing(false);
    }
  };

  // AI Wardrobe and Style Analysis
  const analyzeStyleProfile = () => {
    setAiProcessing(true);
    
    // Simulate advanced AI processing
    setTimeout(() => {
      setPhysiqueData(prev => ({
        ...prev,
        aiAnalysis: {
          ...prev.aiAnalysis,
          styleProfile: {
            colorPalette: ['Navy Blue', 'Charcoal Gray', 'Forest Green', 'Burgundy'],
            bodyShapeAnalysis: 'Inverted Triangle',
            optimalFits: ['Tailored', 'Slim Fit', 'Athletic Cut'],
            accessoryRecommendations: [
              'Classic watch with metal band',
              'Structured leather shoes',
              'Minimalist jewelry'
            ],
            seasonalRecommendations: {
              spring: 'Light cotton shirts, chinos',
              summer: 'Linen blends, polo shirts',
              fall: 'Layered looks, blazers',
              winter: 'Wool coats, cashmere scarves'
            }
          }
        }
      }));
      setAiProcessing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            AI-Powered Physique Analysis
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Advanced biometric assessment with cutting-edge AI technology
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
            <TabsTrigger value="ai-scanning">AI Scanning</TabsTrigger>
            <TabsTrigger value="body-mapping">Body Mapping</TabsTrigger>
            <TabsTrigger value="style-analysis">Style AI</TabsTrigger>
            <TabsTrigger value="health-insights">Health Insights</TabsTrigger>
            <TabsTrigger value="digital-profile">Digital Profile</TabsTrigger>
          </TabsList>

          {/* Basic Information */}
          <TabsContent value="basic-info" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Physical Characteristics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Hair Color */}
                  <div className="space-y-2">
                    <Label>Hair Color</Label>
                    <div className="flex gap-2">
                      <Select value={physiqueData.hairColor} onValueChange={(value) => 
                        setPhysiqueData(prev => ({ ...prev, hairColor: value }))
                      }>
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Select hair color" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="brown">Brown</SelectItem>
                          <SelectItem value="black">Black</SelectItem>
                          <SelectItem value="grey">Grey</SelectItem>
                          <SelectItem value="blonde">Blonde</SelectItem>
                          <SelectItem value="red">Red</SelectItem>
                          <SelectItem value="bald">Bald</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="icon">
                        <Palette className="h-4 w-4" />
                      </Button>
                    </div>
                    {physiqueData.hairColor === 'other' && (
                      <Input
                        placeholder="Specify hair color"
                        value={physiqueData.hairCustom}
                        onChange={(e) => setPhysiqueData(prev => ({ ...prev, hairCustom: e.target.value }))}
                      />
                    )}
                  </div>

                  {/* Eye Color with AI Examination */}
                  <div className="space-y-2">
                    <Label>Eye Color & Health</Label>
                    <div className="flex gap-2">
                      <Select value={physiqueData.eyeColor} onValueChange={(value) => 
                        setPhysiqueData(prev => ({ ...prev, eyeColor: value }))
                      }>
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Select eye color" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="brown">Brown</SelectItem>
                          <SelectItem value="blue">Blue</SelectItem>
                          <SelectItem value="green">Green</SelectItem>
                          <SelectItem value="hazel">Hazel</SelectItem>
                          <SelectItem value="gray">Gray</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button 
                        variant="outline" 
                        onClick={startEyeExamination}
                        disabled={isEyeScanning}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        {isEyeScanning ? 'Scanning...' : 'AI Eye Exam'}
                      </Button>
                    </div>
                    {isEyeScanning && (
                      <div className="space-y-2">
                        <Progress value={analysisProgress} className="w-full" />
                        <p className="text-sm text-blue-600">AI analyzing eye health...</p>
                      </div>
                    )}
                  </div>

                  {/* Height with Smart Detection */}
                  <div className="space-y-2">
                    <Label>Height</Label>
                    <div className="flex gap-2">
                      <Select value={physiqueData.height} onValueChange={(value) => 
                        setPhysiqueData(prev => ({ ...prev, height: value }))
                      }>
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Select height range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="short">Short (&lt; 160cm)</SelectItem>
                          <SelectItem value="average">Average (160-180cm)</SelectItem>
                          <SelectItem value="tall">Tall (&gt; 180cm)</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="icon">
                        <Ruler className="h-4 w-4" />
                      </Button>
                    </div>
                    {physiqueData.height === 'custom' && (
                      <Input
                        placeholder="Enter exact height (cm)"
                        value={physiqueData.heightCustom}
                        onChange={(e) => setPhysiqueData(prev => ({ ...prev, heightCustom: e.target.value }))}
                      />
                    )}
                  </div>

                  {/* Weight with Smart Tracking */}
                  <div className="space-y-2">
                    <Label>Weight</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter weight"
                        value={physiqueData.weight}
                        onChange={(e) => setPhysiqueData(prev => ({ ...prev, weight: e.target.value }))}
                        className="flex-1"
                      />
                      <Select value={physiqueData.weightUnit} onValueChange={(value: 'kg' | 'pounds') => 
                        setPhysiqueData(prev => ({ ...prev, weightUnit: value }))
                      }>
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kg">kg</SelectItem>
                          <SelectItem value="pounds">lbs</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="icon">
                        <Weight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Voice Recording with AI Analysis */}
                <div className="space-y-4">
                  <Label>Voice Profile & Analysis</Label>
                  <div className="flex items-center gap-4">
                    {!isRecordingVoice ? (
                      <Button onClick={startVoiceRecording} className="flex-1">
                        <Mic className="h-4 w-4 mr-2" />
                        Record Voice Sample: "Hello, my name is..."
                      </Button>
                    ) : (
                      <Button onClick={stopVoiceRecording} variant="destructive" className="flex-1">
                        <Volume2 className="h-4 w-4 mr-2" />
                        Stop Recording
                      </Button>
                    )}
                    <Button variant="outline">
                      <Waves className="h-4 w-4 mr-2" />
                      Voice Analysis
                    </Button>
                  </div>
                  {physiqueData.voiceRecording && (
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <audio controls className="w-full">
                        <source src={URL.createObjectURL(physiqueData.voiceRecording)} />
                      </audio>
                    </div>
                  )}
                </div>

                {/* Accessibility Assessment */}
                <div className="space-y-4">
                  <Label>Accessibility & Special Needs</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={physiqueData.disability}
                        onChange={(e) => setPhysiqueData(prev => ({ ...prev, disability: e.target.checked }))}
                      />
                      <Label>I have accessibility requirements</Label>
                    </div>
                    {physiqueData.disability && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {[
                          'Visual Impairment',
                          'Hearing Impairment',
                          'Autism Spectrum',
                          'Cerebral Palsy',
                          'Mobility',
                          'Cognitive',
                          'Speech',
                          'Other'
                        ].map((type) => (
                          <div key={type} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={physiqueData.disabilityType.includes(type)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setPhysiqueData(prev => ({
                                    ...prev,
                                    disabilityType: [...prev.disabilityType, type]
                                  }));
                                } else {
                                  setPhysiqueData(prev => ({
                                    ...prev,
                                    disabilityType: prev.disabilityType.filter(t => t !== type)
                                  }));
                                }
                              }}
                            />
                            <Label className="text-sm">{type}</Label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Scanning */}
          <TabsContent value="ai-scanning" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scan className="h-5 w-5" />
                  Advanced AI Biometric Scanning
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Camera Interface */}
                <div className="relative">
                  <video
                    ref={videoRef}
                    className="w-full h-96 bg-black rounded-lg"
                    style={{ display: isCameraActive || isEyeScanning || isRecordingVideo ? 'block' : 'none' }}
                  />
                  {!isCameraActive && !isEyeScanning && !isRecordingVideo && (
                    <div className="w-full h-96 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Camera className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                        <p className="text-gray-600 dark:text-gray-400">Camera interface ready</p>
                      </div>
                    </div>
                  )}
                  
                  {(isEyeScanning || isRecordingVideo) && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p>
                          {isEyeScanning && 'AI analyzing eye health...'}
                          {isRecordingVideo && 'Recording full body analysis...'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Scanning Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    onClick={startEyeExamination}
                    disabled={isEyeScanning}
                    className="h-24 flex flex-col items-center justify-center"
                  >
                    <Eye className="h-8 w-8 mb-2" />
                    <span>AI Eye Examination</span>
                  </Button>
                  
                  <Button 
                    onClick={startFullSelfIdentifier}
                    disabled={isRecordingVideo}
                    className="h-24 flex flex-col items-center justify-center"
                  >
                    <Video className="h-8 w-8 mb-2" />
                    <span>360° Body Scan</span>
                  </Button>
                  
                  <Button 
                    onClick={() => fileInputRef.current?.click()}
                    className="h-24 flex flex-col items-center justify-center"
                    variant="outline"
                  >
                    <Upload className="h-8 w-8 mb-2" />
                    <span>Upload Photos</span>
                  </Button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    setPhysiqueData(prev => ({ ...prev, photos: [...prev.photos, ...files] }));
                  }}
                />

                {/* Uploaded Photos */}
                {physiqueData.photos.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Uploaded Photos</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {physiqueData.photos.map((photo, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(photo)}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <Button
                            size="sm"
                            variant="destructive"
                            className="absolute top-2 right-2"
                            onClick={() => {
                              setPhysiqueData(prev => ({
                                ...prev,
                                photos: prev.photos.filter((_, i) => i !== index)
                              }));
                            }}
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* AI Processing Indicator */}
                {aiProcessing && (
                  <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="animate-spin h-6 w-6 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-blue-800 dark:text-blue-200">
                          AI Analysis in Progress
                        </h4>
                        <p className="text-sm text-blue-600 dark:text-blue-300">
                          Advanced algorithms processing your biometric data...
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Body Mapping */}
          <TabsContent value="body-mapping" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  3D Body Mapping & Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {physiqueData.aiAnalysis?.bodyAnalysis ? (
                  <div className="space-y-6">
                    {/* Body Analysis Results */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="border-green-200 bg-green-50 dark:border-green-700 dark:bg-green-900/20">
                        <CardHeader>
                          <CardTitle className="text-lg text-green-800 dark:text-green-200">
                            Body Composition
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span>Body Type:</span>
                              <Badge variant="secondary">{physiqueData.aiAnalysis.bodyAnalysis.bodyType}</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span>Posture Score:</span>
                              <span className="font-semibold">{physiqueData.aiAnalysis.bodyAnalysis.postureScore}/100</span>
                            </div>
                            <Progress value={physiqueData.aiAnalysis.bodyAnalysis.postureScore} className="w-full" />
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-blue-200 bg-blue-50 dark:border-blue-700 dark:bg-blue-900/20">
                        <CardHeader>
                          <CardTitle className="text-lg text-blue-800 dark:text-blue-200">
                            Measurements
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {Object.entries(physiqueData.aiAnalysis.bodyAnalysis.measurements).map(([key, value]) => (
                              <div key={key} className="flex justify-between">
                                <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                                <span className="font-semibold">{value}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Health Insights */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5" />
                          Health Insights
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {physiqueData.aiAnalysis.bodyAnalysis.healthInsights.map((insight, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                              <CheckCircle className="h-5 w-5 text-green-600" />
                              <span>{insight}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Activity className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold mb-2">3D Body Analysis Required</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Complete the AI scanning process to view detailed body mapping results
                    </p>
                    <Button onClick={() => setActiveTab('ai-scanning')}>
                      Start Body Scan
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Style Analysis */}
          <TabsContent value="style-analysis" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  AI Style & Wardrobe Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {!physiqueData.aiAnalysis?.styleProfile ? (
                  <div className="text-center py-12">
                    <Sparkles className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold mb-2">AI Style Analysis</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Let our AI analyze your body type and create personalized style recommendations
                    </p>
                    <Button onClick={analyzeStyleProfile} disabled={aiProcessing}>
                      {aiProcessing ? 'Analyzing...' : 'Generate Style Profile'}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Color Palette */}
                    <Card className="border-purple-200 bg-purple-50 dark:border-purple-700 dark:bg-purple-900/20">
                      <CardHeader>
                        <CardTitle className="text-lg text-purple-800 dark:text-purple-200">
                          Your Optimal Color Palette
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-4">
                          {physiqueData.aiAnalysis.styleProfile.colorPalette.map((color, index) => (
                            <div key={index} className="text-center">
                              <div 
                                className="w-16 h-16 rounded-lg border-2 border-white shadow-lg mb-2"
                                style={{ backgroundColor: color.toLowerCase().replace(/\s+/g, '') }}
                              />
                              <p className="text-sm font-medium">{color}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Style Recommendations */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Optimal Fits</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {physiqueData.aiAnalysis.styleProfile.optimalFits.map((fit, index) => (
                              <Badge key={index} variant="outline" className="mr-2">
                                {fit}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Accessories</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {physiqueData.aiAnalysis.styleProfile.accessoryRecommendations.map((accessory, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <Star className="h-4 w-4 text-yellow-500" />
                                <span className="text-sm">{accessory}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Seasonal Recommendations */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Seasonal Style Guide</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          {Object.entries(physiqueData.aiAnalysis.styleProfile.seasonalRecommendations).map(([season, recommendation]) => (
                            <div key={season} className="p-4 border rounded-lg">
                              <h4 className="font-semibold capitalize mb-2">{season}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{recommendation}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Health Insights */}
          <TabsContent value="health-insights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Comprehensive Health Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Eye Health Results */}
                {physiqueData.aiAnalysis?.eyeHealth && (
                  <Card className="border-green-200 bg-green-50 dark:border-green-700 dark:bg-green-900/20">
                    <CardHeader>
                      <CardTitle className="text-lg text-green-800 dark:text-green-200 flex items-center gap-2">
                        <Eye className="h-5 w-5" />
                        Eye Health Assessment
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          {Object.entries(physiqueData.aiAnalysis.eyeHealth).slice(0, -1).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                              <Badge variant="secondary">{value}</Badge>
                            </div>
                          ))}
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Recommendations:</h4>
                          <ul className="space-y-1">
                            {physiqueData.aiAnalysis.eyeHealth.recommendations.map((rec, index) => (
                              <li key={index} className="text-sm flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Voice Analysis Results */}
                {physiqueData.aiAnalysis?.voiceAnalysis && (
                  <Card className="border-blue-200 bg-blue-50 dark:border-blue-700 dark:bg-blue-900/20">
                    <CardHeader>
                      <CardTitle className="text-lg text-blue-800 dark:text-blue-200 flex items-center gap-2">
                        <Volume2 className="h-5 w-5" />
                        Voice Profile Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(physiqueData.aiAnalysis.voiceAnalysis).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                            <span className="font-semibold">
                              {typeof value === 'number' ? `${value}%` : value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Overall Health Score */}
                <Card className="border-purple-200 bg-purple-50 dark:border-purple-700 dark:bg-purple-900/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-purple-800 dark:text-purple-200">
                      Overall Wellness Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-purple-600 mb-2">92/100</div>
                      <p className="text-purple-700 dark:text-purple-300">Excellent Health Profile</p>
                      <Progress value={92} className="mt-4" />
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Digital Profile */}
          <TabsContent value="digital-profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileImage className="h-5 w-5" />
                  Digital Identity & Signature
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Digital Signature */}
                <DigitalSignature
                  title="Physique Status Verification"
                  signerName="User Name"
                  onSaveSignature={(signatureData) => {
                    console.log('Physique status signature saved:', signatureData);
                  }}
                />

                {/* Profile Summary */}
                <Card className="border-blue-200 bg-blue-50 dark:border-blue-700 dark:bg-blue-900/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-800 dark:text-blue-200">
                      Digital Profile Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold">Physical Characteristics</h4>
                        <p className="text-sm">Hair: {physiqueData.hairColor || 'Not specified'}</p>
                        <p className="text-sm">Eyes: {physiqueData.eyeColor || 'Not specified'}</p>
                        <p className="text-sm">Height: {physiqueData.height || 'Not specified'}</p>
                        <p className="text-sm">Weight: {physiqueData.weight ? `${physiqueData.weight} ${physiqueData.weightUnit}` : 'Not specified'}</p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold">AI Analysis Status</h4>
                        <div className="flex items-center gap-2">
                          {physiqueData.aiAnalysis?.eyeHealth ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-orange-600" />
                          )}
                          <span className="text-sm">Eye Health Scan</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {physiqueData.aiAnalysis?.voiceAnalysis ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-orange-600" />
                          )}
                          <span className="text-sm">Voice Profile</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {physiqueData.aiAnalysis?.bodyAnalysis ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-orange-600" />
                          )}
                          <span className="text-sm">Body Mapping</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Export Options */}
                <div className="flex gap-4">
                  <Button className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Export Profile
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share className="h-4 w-4 mr-2" />
                    Share Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}