import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  PenTool, 
  Save, 
  RotateCcw, 
  Download, 
  Upload,
  CheckCircle,
  FileSignature
} from 'lucide-react';

interface DigitalSignatureProps {
  title?: string;
  onSaveSignature?: (signatureData: string) => void;
  isReadOnly?: boolean;
  existingSignature?: string;
  signerName?: string;
}

export default function DigitalSignature({ 
  title = "Digital Signature",
  onSaveSignature,
  isReadOnly = false,
  existingSignature,
  signerName = ""
}: DigitalSignatureProps) {
  const [isDrawing, setIsDrawing] = useState(false);
  const [isSigned, setIsSigned] = useState(!!existingSignature);
  const [signatureName, setSignatureName] = useState(signerName);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (isReadOnly || isSigned) return;
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#1e40af';
        ctx.beginPath();
        ctx.moveTo(event.clientX - rect.left, event.clientY - rect.top);
      }
    }
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || isReadOnly || isSigned) return;
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

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    setIsSigned(false);
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (canvas && signatureName.trim()) {
      const signatureData = canvas.toDataURL();
      const signatureInfo = {
        signature: signatureData,
        name: signatureName,
        timestamp: new Date().toISOString(),
        title: title
      };
      
      onSaveSignature?.(JSON.stringify(signatureInfo));
      setIsSigned(true);
    }
  };

  const downloadSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.download = `signature_${signatureName}_${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <Card className={`border-2 ${isSigned ? 'border-green-200 bg-green-50' : 'border-blue-200'} dark:border-opacity-50`}>
      <CardHeader className={`${isSigned ? 'bg-green-100 dark:bg-green-900/20' : 'bg-blue-50 dark:bg-blue-900/20'}`}>
        <CardTitle className={`text-lg font-bold flex items-center gap-2 ${isSigned ? 'text-green-800 dark:text-green-200' : 'text-blue-800 dark:text-blue-200'}`}>
          {isSigned ? (
            <CheckCircle className="h-5 w-5" />
          ) : (
            <FileSignature className="h-5 w-5" />
          )}
          {title}
          {isSigned && (
            <span className="text-sm font-normal ml-2 text-green-600">
              ✓ Signed
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {/* Signer Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Full Name
          </label>
          <Input
            value={signatureName}
            onChange={(e) => setSignatureName(e.target.value)}
            placeholder="Enter your full name"
            disabled={isReadOnly || isSigned}
          />
        </div>

        {/* Signature Canvas */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Signature
          </label>
          <div className="relative">
            <canvas
              ref={canvasRef}
              width={500}
              height={150}
              className={`w-full border-2 rounded ${
                isSigned 
                  ? 'border-green-300 bg-green-50' 
                  : 'border-gray-300 bg-white cursor-crosshair'
              } ${isReadOnly || isSigned ? 'cursor-not-allowed' : ''}`}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />
            {!isSigned && !isReadOnly && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-gray-400 text-sm">Sign here</span>
              </div>
            )}
            {isSigned && (
              <div className="absolute top-2 right-2">
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                  Signed by {signatureName}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Timestamp */}
        {isSigned && (
          <div className="text-xs text-gray-500 bg-gray-50 dark:bg-gray-800 p-2 rounded">
            Signed on: {new Date().toLocaleString()}
          </div>
        )}

        {/* Action Buttons */}
        {!isReadOnly && (
          <div className="flex gap-2 justify-end">
            {!isSigned ? (
              <>
                <Button
                  onClick={clearSignature}
                  variant="outline"
                  size="sm"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                <Button
                  onClick={saveSignature}
                  disabled={!signatureName.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Signature
                </Button>
              </>
            ) : (
              <Button
                onClick={downloadSignature}
                variant="outline"
                size="sm"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            )}
          </div>
        )}

        {/* Legal Notice */}
        <div className="text-xs text-gray-500 bg-gray-50 dark:bg-gray-800 p-3 rounded border-l-4 border-blue-400">
          <strong>Legal Notice:</strong> By signing this document electronically, you acknowledge that your electronic signature has the same legal effect as a handwritten signature.
        </div>
      </CardContent>
    </Card>
  );
}