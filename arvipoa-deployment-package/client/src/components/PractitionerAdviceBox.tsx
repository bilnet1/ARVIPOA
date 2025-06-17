import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { 
  Video, 
  Mic, 
  MicOff, 
  VideoOff, 
  Paperclip, 
  Save, 
  Send,
  Trash2,
  Play,
  Pause,
  Download,
  Upload,
  Pen,
  RotateCcw
} from 'lucide-react';

interface PractitionerAdviceBoxProps {
  patientName?: string;
  onSaveAdvice?: (advice: any) => void;
  isReadOnly?: boolean;
}

export default function PractitionerAdviceBox({ 
  patientName = "Patient", 
  onSaveAdvice,
  isReadOnly = false 
}: PractitionerAdviceBoxProps) {
  const [adviceText, setAdviceText] = useState('');
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [isRecordingVideo, setIsRecordingVideo] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRecorderRef = useRef<MediaRecorder | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startAudioRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      audioRecorderRef.current = mediaRecorder;
      
      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecordingAudio(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopAudioRecording = () => {
    if (audioRecorderRef.current && isRecordingAudio) {
      audioRecorderRef.current.stop();
      setIsRecordingAudio(false);
    }
  };

  const startVideoRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
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
        setVideoBlob(blob);
        stream.getTracks().forEach(track => track.stop());
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
      };
      
      mediaRecorder.start();
      setIsRecordingVideo(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopVideoRecording = () => {
    if (mediaRecorderRef.current && isRecordingVideo) {
      mediaRecorderRef.current.stop();
      setIsRecordingVideo(false);
    }
  };

  const handleFileAttachment = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (isReadOnly) return;
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(event.clientX - rect.left, event.clientY - rect.top);
      }
    }
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || isReadOnly) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineTo(event.clientX - rect.left, event.clientY - rect.top);
        ctx.stroke();
      }
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const saveAdvice = () => {
    const canvas = canvasRef.current;
    const markerBoardData = canvas?.toDataURL();
    
    const adviceData = {
      text: adviceText,
      audioBlob,
      videoBlob,
      attachments,
      markerBoardData,
      timestamp: new Date().toISOString(),
      patientName
    };
    
    onSaveAdvice?.(adviceData);
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-blue-200 dark:border-blue-700">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <CardTitle className="text-xl font-bold text-blue-800 dark:text-blue-200 flex items-center gap-2">
            <Pen className="h-6 w-6" />
            Practitioner's Advice - {patientName}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Text Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Diagnosis & Recommendations
            </label>
            <Textarea
              value={adviceText}
              onChange={(e) => setAdviceText(e.target.value)}
              placeholder="Write your professional advice, diagnosis, treatment recommendations..."
              className="min-h-32 resize-none"
              disabled={isReadOnly}
            />
          </div>

          {/* Media Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Audio Recording */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Voice Recording
              </label>
              <div className="flex gap-2">
                {!isRecordingAudio ? (
                  <Button
                    onClick={startAudioRecording}
                    variant="outline"
                    className="flex-1"
                    disabled={isReadOnly}
                  >
                    <Mic className="h-4 w-4 mr-2" />
                    Record
                  </Button>
                ) : (
                  <Button
                    onClick={stopAudioRecording}
                    variant="destructive"
                    className="flex-1"
                  >
                    <MicOff className="h-4 w-4 mr-2" />
                    Stop
                  </Button>
                )}
              </div>
              {audioBlob && (
                <audio controls className="w-full">
                  <source src={URL.createObjectURL(audioBlob)} type="audio/wav" />
                </audio>
              )}
            </div>

            {/* Video Recording */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Video Recording
              </label>
              <div className="flex gap-2">
                {!isRecordingVideo ? (
                  <Button
                    onClick={startVideoRecording}
                    variant="outline"
                    className="flex-1"
                    disabled={isReadOnly}
                  >
                    <Video className="h-4 w-4 mr-2" />
                    Record
                  </Button>
                ) : (
                  <Button
                    onClick={stopVideoRecording}
                    variant="destructive"
                    className="flex-1"
                  >
                    <VideoOff className="h-4 w-4 mr-2" />
                    Stop
                  </Button>
                )}
              </div>
              {isRecordingVideo && (
                <video ref={videoRef} className="w-full h-32 rounded border" muted />
              )}
              {videoBlob && (
                <video controls className="w-full h-32 rounded border">
                  <source src={URL.createObjectURL(videoBlob)} type="video/webm" />
                </video>
              )}
            </div>

            {/* File Attachments */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Attachments
              </label>
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="w-full"
                disabled={isReadOnly}
              >
                <Paperclip className="h-4 w-4 mr-2" />
                Attach Files
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={handleFileAttachment}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
              />
              {attachments.length > 0 && (
                <div className="space-y-1">
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <span className="text-sm truncate">{file.name}</span>
                      {!isReadOnly && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeAttachment(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Interactive Marker Board */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Interactive Marker Board
              </label>
              {!isReadOnly && (
                <Button
                  onClick={clearCanvas}
                  variant="outline"
                  size="sm"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              )}
            </div>
            <canvas
              ref={canvasRef}
              width={600}
              height={300}
              className="w-full border-2 border-gray-300 dark:border-gray-600 rounded cursor-crosshair bg-white"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />
          </div>

          {/* Action Buttons */}
          {!isReadOnly && (
            <div className="flex gap-4 justify-end">
              <Button
                onClick={saveAdvice}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Advice
              </Button>
              <Button
                onClick={saveAdvice}
                className="bg-green-600 hover:bg-green-700"
              >
                <Send className="h-4 w-4 mr-2" />
                Send to Patient
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}