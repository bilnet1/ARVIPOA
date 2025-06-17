import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  referenceNumber: string;
}

export default function SuccessModal({ isOpen, onClose, referenceNumber }: SuccessModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <DialogTitle className="text-center text-lg font-medium text-gray-900">
            Registration Submitted Successfully!
          </DialogTitle>
        </DialogHeader>
        <div className="text-center space-y-4">
          <p className="text-sm text-gray-500">
            Thank you for submitting your property registration. Our team will review your application and contact you within 24 hours.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">
              <strong>Reference Number:</strong>
            </p>
            <p className="font-mono text-lg font-medium text-gray-900">{referenceNumber}</p>
          </div>
          <Button onClick={onClose} className="w-full bg-primary-600 hover:bg-primary-700 text-white">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
