import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Upload, 
  Play, 
  X, 
  Video, 
  File, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  Camera,
  FileVideo,
  ExternalLink,
  Info,
  Shield
} from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from "@/components/Footer";

interface VideoUpload {
  id: string;
  file?: File;
  title: string;
  description: string;
  category: string;
  thumbnail?: string;
  uploadProgress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  url?: string;
  isGoogleDrive?: boolean;
  googleDriveUrl?: string;
  size?: number;
}

export default function VideoUpload() {
  const [uploads, setUploads] = useState<VideoUpload[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [useGoogleDrive, setUseGoogleDrive] = useState(false);
  const [googleDriveUrl, setGoogleDriveUrl] = useState('');
  const [driveVideoTitle, setDriveVideoTitle] = useState('');
  const [driveVideoDescription, setDriveVideoDescription] = useState('');
  const [driveVideoCategory, setDriveVideoCategory] = useState('general');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const videoFiles = files.filter(file => file.type.startsWith('video/'));
    
    videoFiles.forEach(file => {
      const newUpload: VideoUpload = {
        id: Math.random().toString(36).substr(2, 9),
        file,
        title: file.name.replace(/\.[^/.]+$/, ""),
        description: '',
        category: 'general',
        uploadProgress: 0,
        status: 'pending'
      };

      setUploads(prev => [...prev, newUpload]);
      
      // Generate thumbnail
      generateVideoThumbnail(file, newUpload.id);
    });
  };

  const generateVideoThumbnail = (file: File, uploadId: string) => {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    video.addEventListener('loadeddata', () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      video.currentTime = 1; // Seek to 1 second for thumbnail
    });

    video.addEventListener('seeked', () => {
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const thumbnail = canvas.toDataURL('image/jpeg', 0.7);
        
        setUploads(prev => prev.map(upload => 
          upload.id === uploadId 
            ? { ...upload, thumbnail }
            : upload
        ));
      }
    });

    video.src = URL.createObjectURL(file);
  };

  const updateUpload = (id: string, updates: Partial<VideoUpload>) => {
    setUploads(prev => prev.map(upload => 
      upload.id === id ? { ...upload, ...updates } : upload
    ));
  };

  const removeUpload = (id: string) => {
    setUploads(prev => prev.filter(upload => upload.id !== id));
  };

  const handleUpload = async (id: string) => {
    const upload = uploads.find(u => u.id === id);
    if (!upload) return;

    updateUpload(id, { status: 'uploading', uploadProgress: 0 });

    try {
      const formData = new FormData();
      
      // Handle Google Drive URLs
      if (upload.isGoogleDrive && upload.googleDriveUrl) {
        formData.append('useGoogleDrive', 'true');
        formData.append('googleDriveUrl', upload.googleDriveUrl);
      } else if (upload.file) {
        formData.append('video', upload.file);
      } else {
        updateUpload(id, { status: 'error', uploadProgress: 0 });
        return;
      }
      
      formData.append('title', upload.title);
      formData.append('description', upload.description);
      formData.append('category', upload.category);

      const xhr = new XMLHttpRequest();

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          updateUpload(id, { uploadProgress: progress });
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          updateUpload(id, {
            status: 'completed',
            uploadProgress: 100,
            url: response.video.url
          });
        } else {
          updateUpload(id, { status: 'error', uploadProgress: 0 });
        }
      };

      xhr.onerror = () => {
        updateUpload(id, { status: 'error', uploadProgress: 0 });
      };

      xhr.open('POST', '/api/upload-video');
      xhr.send(formData);

    } catch (error) {
      console.error('Upload error:', error);
      updateUpload(id, { status: 'error', uploadProgress: 0 });
    }
  };

  const startUpload = (id: string) => {
    handleUpload(id);
  };

  const addGoogleDriveVideo = () => {
    if (!googleDriveUrl.trim()) return;

    const newUpload: VideoUpload = {
      id: Math.random().toString(36).substr(2, 9),
      title: driveVideoTitle || 'Google Drive Video',
      description: driveVideoDescription,
      category: driveVideoCategory,
      uploadProgress: 0,
      status: 'pending',
      isGoogleDrive: true,
      googleDriveUrl: googleDriveUrl.trim(),
      thumbnail: 'https://via.placeholder.com/320x180?text=Google+Drive+Video'
    };

    setUploads(prev => [...prev, newUpload]);
    
    // Clear form
    setGoogleDriveUrl('');
    setDriveVideoTitle('');
    setDriveVideoDescription('');
    setDriveVideoCategory('general');
  };

  // Add demonstration video from user's link
  const addDemoVideo = () => {
    const demoUpload: VideoUpload = {
      id: 'demo-video-' + Date.now(),
      title: 'Demo Large Video File',
      description: 'Testing large file streaming from Google Drive',
      category: 'general',
      uploadProgress: 0,
      status: 'pending',
      isGoogleDrive: true,
      googleDriveUrl: 'https://drive.google.com/file/d/1LhxUCBiHarszUrdUIC70mAAiK6LRyVwA/view?usp=sharing',
      thumbnail: 'https://via.placeholder.com/320x180?text=Demo+Large+Video'
    };

    setUploads(prev => [...prev, demoUpload]);
  };

  // Add ARVIPOA Smart Police Barrier demo
  const addPoliceBarrierDemo = () => {
    const barrierUpload: VideoUpload = {
      id: 'police-barrier-' + Date.now(),
      title: 'ARVIPOA Smart Police Barrier',
      description: 'Automated barrier system with AI-powered vehicle detection and license plate recognition',
      category: 'security',
      uploadProgress: 0,
      status: 'pending',
      isGoogleDrive: true,
      googleDriveUrl: 'https://drive.google.com/file/d/1JLrA0q560TT9n9dTRrt7jpnws57-uPpj/view?usp=sharing',
      thumbnail: 'https://via.placeholder.com/320x180?text=Smart+Police+Barrier'
    };

    setUploads(prev => [...prev, barrierUpload]);
  };

  const categories = [
    'General',
    'Property Tours',
    'News & Updates',
    'Educational',
    'Community Events',
    'Promotional',
    'Training'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Video Upload Center</h1>
          <p className="text-gray-300 text-lg">Upload videos for ARVIPOA platform content</p>
        </div>

        {/* Upload Method Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-1 border border-white/20">
            <button
              onClick={() => setUseGoogleDrive(false)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                !useGoogleDrive 
                  ? 'bg-[#D4AF37] text-black shadow-lg' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Upload className="w-4 h-4 inline mr-2" />
              Upload Files
            </button>
            <button
              onClick={() => setUseGoogleDrive(true)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                useGoogleDrive 
                  ? 'bg-green-600 text-white shadow-lg' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <ExternalLink className="w-4 h-4 inline mr-2" />
              Google Drive
            </button>
          </div>
        </div>

        {!useGoogleDrive ? (
          /* File Upload Area */
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
            <CardContent className="p-8">
              <div
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                  dragActive 
                    ? 'border-[#D4AF37] bg-[#D4AF37]/10' 
                    : 'border-gray-500 hover:border-[#D4AF37]/50'
                }`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Drop video files here or click to browse
                </h3>
                <p className="text-gray-400 mb-2">
                  Supports MP4, AVI, MOV, WMV files up to 10GB each
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  For larger files, use Google Drive option above
                </p>
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-[#D4AF37] hover:bg-[#B8860B] text-black"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Select Videos
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Google Drive URL Input */
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="text-center">
                  <ExternalLink className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Link Google Drive Video
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Perfect for large files that stream smoothly without uploading
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Google Drive Share URL *
                    </label>
                    <input
                      type="url"
                      value={googleDriveUrl}
                      onChange={(e) => setGoogleDriveUrl(e.target.value)}
                      placeholder="https://drive.google.com/file/d/1LhxUCBiHarszUrdUIC70mAAiK6LRyVwA/view?usp=sharing"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Example: https://drive.google.com/file/d/1LhxUCBiHarszUrdUIC70mAAiK6LRyVwA/view?usp=sharing
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Video Title *
                    </label>
                    <input
                      type="text"
                      value={driveVideoTitle}
                      onChange={(e) => setDriveVideoTitle(e.target.value)}
                      placeholder="Enter video title"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      value={driveVideoCategory}
                      onChange={(e) => setDriveVideoCategory(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      {categories.map(category => (
                        <option key={category} value={category.toLowerCase()} className="bg-gray-800">
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      value={driveVideoDescription}
                      onChange={(e) => setDriveVideoDescription(e.target.value)}
                      placeholder="Video description (optional)"
                      rows={3}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    />
                  </div>
                </div>

                <div className="text-center space-x-4">
                  <Button
                    onClick={addGoogleDriveVideo}
                    disabled={!googleDriveUrl.trim() || !driveVideoTitle.trim()}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-8 py-3"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Add Google Drive Video
                  </Button>
                  <Button
                    onClick={addDemoVideo}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Test Demo Video
                  </Button>
                  <Button
                    onClick={addPoliceBarrierDemo}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Police Barrier Demo
                  </Button>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex items-start">
                    <Info className="w-5 h-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                    <div className="text-sm text-blue-300">
                      <p className="font-semibold mb-1">How to share Google Drive videos:</p>
                      <ol className="list-decimal list-inside space-y-1 text-xs">
                        <li>Right-click your video in Google Drive</li>
                        <li>Select "Share" → "Get link"</li>
                        <li>Set permissions to "Anyone with the link can view"</li>
                        <li>Copy and paste the URL above</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Upload Queue */}
        {uploads.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white mb-4">Upload Queue ({uploads.length})</h2>
            
            {uploads.map((upload) => (
              <motion.div
                key={upload.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Video Preview */}
                  <div className="lg:col-span-1">
                    <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden relative">
                      {upload.thumbnail ? (
                        <img 
                          src={upload.thumbnail} 
                          alt="Video thumbnail"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FileVideo className="w-12 h-12 text-gray-500" />
                        </div>
                      )}
                      <div className="absolute bottom-2 right-2">
                        <Badge className="bg-black/70 text-white text-xs">
                          {upload.isGoogleDrive 
                            ? 'Google Drive' 
                            : upload.file 
                              ? `${(upload.file.size / (1024 * 1024)).toFixed(1)} MB`
                              : 'Unknown size'
                          }
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Video Details */}
                  <div className="lg:col-span-2 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Video Title
                      </label>
                      <Input
                        value={upload.title}
                        onChange={(e) => updateUpload(upload.id, { title: e.target.value })}
                        placeholder="Enter video title"
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Description
                      </label>
                      <Textarea
                        value={upload.description}
                        onChange={(e) => updateUpload(upload.id, { description: e.target.value })}
                        placeholder="Enter video description"
                        className="bg-white/10 border-white/20 text-white"
                        rows={3}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Category
                      </label>
                      <select
                        value={upload.category}
                        onChange={(e) => updateUpload(upload.id, { category: e.target.value })}
                        className="w-full p-2 bg-white/10 border border-white/20 rounded-md text-white"
                      >
                        {categories.map(category => (
                          <option key={category} value={category.toLowerCase()}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Upload Controls */}
                  <div className="lg:col-span-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        {upload.status === 'pending' && (
                          <Badge className="bg-gray-600">Pending</Badge>
                        )}
                        {upload.status === 'uploading' && (
                          <Badge className="bg-blue-600">
                            <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                            Uploading
                          </Badge>
                        )}
                        {upload.status === 'completed' && (
                          <Badge className="bg-green-600">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Completed
                          </Badge>
                        )}
                        {upload.status === 'error' && (
                          <Badge className="bg-red-600">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Error
                          </Badge>
                        )}
                      </div>

                      {upload.status === 'uploading' && (
                        <div className="space-y-2">
                          <Progress value={upload.uploadProgress} className="w-full" />
                          <p className="text-xs text-gray-400">
                            {Math.round(upload.uploadProgress)}% uploaded
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 mt-4">
                      {upload.status === 'pending' && (
                        <Button
                          onClick={() => startUpload(upload.id)}
                          className="flex-1 bg-[#D4AF37] hover:bg-[#B8860B] text-black"
                          disabled={!upload.title.trim()}
                        >
                          <Upload className="w-4 h-4 mr-1" />
                          Upload
                        </Button>
                      )}
                      
                      <Button
                        onClick={() => removeUpload(upload.id)}
                        variant="outline"
                        className="border-red-500 text-red-400 hover:bg-red-500/10"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Instructions */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mt-8">
          <CardHeader>
            <CardTitle className="text-white">Upload Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 space-y-2">
            <p>• Supported formats: MP4, AVI, MOV, WMV</p>
            <p>• Maximum file size: 2GB per video</p>
            <p>• Recommended resolution: 1080p or higher</p>
            <p>• Add descriptive titles and descriptions for better organization</p>
            <p>• Videos will be automatically processed and optimized for streaming</p>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}