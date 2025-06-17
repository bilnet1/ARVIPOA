import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Upload,
  Camera,
  FileText,
  Shield,
  Plus,
  Edit,
  Save,
  Video,
  CreditCard,
  Award,
  User,
  Calendar,
  MapPin,
  Eye,
  Trash2
} from 'lucide-react';

interface IdDocument {
  id: string;
  name: string;
  idType: string;
  idNumber: string;
  issuer: string;
  countryOfIssue: string;
  issuingDate: string;
  expiryDate: string;
  frontImage?: string;
  backImage?: string;
  selfieWithCard?: string;
  verificationVideo?: string;
  customIdType?: string;
}

export default function IdCertificateHub() {
  const [documents, setDocuments] = useState<IdDocument[]>([]);
  const [currentDoc, setCurrentDoc] = useState<IdDocument>({
    id: '',
    name: '',
    idType: '',
    idNumber: '',
    issuer: '',
    countryOfIssue: '',
    issuingDate: '',
    expiryDate: '',
    customIdType: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationReason, setApplicationReason] = useState('');
  const [customReason, setCustomReason] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const idTypes = [
    'Ghana Card', 'Passport', 'Diplomatic Passport', 'NIN (Nigerians)',
    "Voter's ID", 'Church ID', 'Mosque ID', 'RBF ID', 'Birth Certificate',
    'Driving License', 'E License', 'Transcript', 'Certificate of Purchase',
    'Political Party ID', 'Society ID', 'Health Card', 'Marriage Certificate',
    'Work ID', 'Bank Card', 'SSNIT', 'Other Valid ID'
  ];

  const countries = [
    'Ghana', 'Nigeria', 'United States', 'United Kingdom', 'Canada', 'South Africa',
    'Kenya', 'Uganda', 'Tanzania', 'Rwanda', 'Botswana', 'Zambia', 'Zimbabwe',
    'Cameroon', 'Senegal', 'Mali', 'Burkina Faso', 'Ivory Coast', 'Togo', 'Benin'
  ];

  const applicationReasons = [
    'Lost/Stolen Document',
    'Expired Document',
    'First Time Application',
    'Renewal',
    'Damaged Document',
    'Name Change',
    'Other'
  ];

  const handleInputChange = (field: keyof IdDocument, value: string) => {
    setCurrentDoc(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (type: 'front' | 'back' | 'selfie') => {
    fileInputRef.current?.click();
    // Implementation for file upload would go here
  };

  const openCamera = async (type: 'front' | 'back' | 'selfie') => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      alert('Camera access denied. Please use file upload instead.');
    }
  };

  const capturePhoto = (type: 'front' | 'back' | 'selfie') => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context?.drawImage(video, 0, 0);
      
      const imageData = canvas.toDataURL('image/jpeg');
      
      setCurrentDoc(prev => ({
        ...prev,
        [type === 'front' ? 'frontImage' : type === 'back' ? 'backImage' : 'selfieWithCard']: imageData
      }));

      // Stop video stream
      const stream = video.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
    }
  };

  const saveDocument = () => {
    if (!currentDoc.name || !currentDoc.idType || !currentDoc.idNumber) {
      alert('Please fill in all required fields');
      return;
    }

    const docToSave = {
      ...currentDoc,
      id: currentDoc.id || Date.now().toString()
    };

    if (isEditing) {
      setDocuments(prev => prev.map(doc => doc.id === docToSave.id ? docToSave : doc));
    } else {
      setDocuments(prev => [...prev, docToSave]);
    }

    resetForm();
  };

  const resetForm = () => {
    setCurrentDoc({
      id: '',
      name: '',
      idType: '',
      idNumber: '',
      issuer: '',
      countryOfIssue: '',
      issuingDate: '',
      expiryDate: '',
      customIdType: ''
    });
    setIsEditing(false);
  };

  const editDocument = (doc: IdDocument) => {
    setCurrentDoc(doc);
    setIsEditing(true);
  };

  const deleteDocument = (id: string) => {
    if (confirm('Are you sure you want to delete this document?')) {
      setDocuments(prev => prev.filter(doc => doc.id !== id));
    }
  };

  const submitApplication = () => {
    if (!currentDoc.idType || !applicationReason) {
      alert('Please select ID type and reason for application');
      return;
    }
    
    alert(`Application submitted for ${currentDoc.idType}. You will be contacted by the issuer.`);
    setShowApplicationForm(false);
    resetForm();
    setApplicationReason('');
    setCustomReason('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-green-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent mb-4">
            ID AND CERTIFICATE HUB
          </h1>
          <p className="text-gray-300 text-lg">
            Store, manage, and apply for various forms of identification and certificates
          </p>
        </motion.div>

        {/* Add New Document Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 mb-8 border border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-yellow-400 flex items-center gap-2">
              <Plus className="w-6 h-6" />
              ADD ID+ (More ID Fields can be added)
            </h2>
            <button
              onClick={() => setShowApplicationForm(!showApplicationForm)}
              className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
            >
              Apply for New ID
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Document Name */}
            <div>
              <label className="block text-gray-300 font-medium mb-2">Document Name *</label>
              <input
                type="text"
                value={currentDoc.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:border-yellow-400 focus:outline-none"
                placeholder="Enter document name"
              />
            </div>

            {/* ID Type */}
            <div>
              <label className="block text-gray-300 font-medium mb-2">ID TYPE *</label>
              <select
                value={currentDoc.idType}
                onChange={(e) => handleInputChange('idType', e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:border-yellow-400 focus:outline-none"
              >
                <option value="">Select ID Type</option>
                {idTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
                <option value="Other">Other (Please specify)</option>
              </select>
            </div>

            {/* Custom ID Type */}
            {currentDoc.idType === 'Other' && (
              <div className="md:col-span-2">
                <label className="block text-gray-300 font-medium mb-2">Specify Other ID Type</label>
                <input
                  type="text"
                  value={currentDoc.customIdType}
                  onChange={(e) => handleInputChange('customIdType', e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:border-yellow-400 focus:outline-none"
                  placeholder="Please specify the ID type"
                />
              </div>
            )}

            {/* ID Number */}
            <div>
              <label className="block text-gray-300 font-medium mb-2">ID NO. *</label>
              <input
                type="text"
                value={currentDoc.idNumber}
                onChange={(e) => handleInputChange('idNumber', e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:border-yellow-400 focus:outline-none"
                placeholder="Enter ID number"
              />
            </div>

            {/* Issuer */}
            <div>
              <label className="block text-gray-300 font-medium mb-2">ID ISSUER *</label>
              <input
                type="text"
                value={currentDoc.issuer}
                onChange={(e) => handleInputChange('issuer', e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:border-yellow-400 focus:outline-none"
                placeholder="Enter issuing authority"
              />
            </div>

            {/* Country of Issue */}
            <div>
              <label className="block text-gray-300 font-medium mb-2">COUNTRY OF ISSUE *</label>
              <select
                value={currentDoc.countryOfIssue}
                onChange={(e) => handleInputChange('countryOfIssue', e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:border-yellow-400 focus:outline-none"
              >
                <option value="">Select country</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            {/* Issuing Date */}
            <div>
              <label className="block text-gray-300 font-medium mb-2">ID ISSUING DATE *</label>
              <input
                type="date"
                value={currentDoc.issuingDate}
                onChange={(e) => handleInputChange('issuingDate', e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:border-yellow-400 focus:outline-none"
              />
            </div>

            {/* Expiry Date */}
            <div>
              <label className="block text-gray-300 font-medium mb-2">ID EXPIRY DATE *</label>
              <input
                type="date"
                value={currentDoc.expiryDate}
                onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:border-yellow-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-yellow-400 mb-4">ID IMAGE ATTACHMENT</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Front of Card */}
              <div className="bg-gray-700/50 rounded-xl p-4">
                <h4 className="text-green-400 font-medium mb-3">FRONT OF CARD</h4>
                <div className="space-y-3">
                  <button
                    onClick={() => openCamera('front')}
                    className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Camera className="w-5 h-5" />
                    Click to snap live image
                  </button>
                  <button
                    onClick={() => handleImageUpload('front')}
                    className="w-full p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Upload className="w-5 h-5" />
                    Attach from files
                  </button>
                </div>
              </div>

              {/* Back of Card */}
              <div className="bg-gray-700/50 rounded-xl p-4">
                <h4 className="text-green-400 font-medium mb-3">BACK OF CARD</h4>
                <div className="space-y-3">
                  <button
                    onClick={() => openCamera('back')}
                    className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Camera className="w-5 h-5" />
                    Click to snap live image
                  </button>
                  <button
                    onClick={() => handleImageUpload('back')}
                    className="w-full p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Upload className="w-5 h-5" />
                    Attach from files
                  </button>
                </div>
              </div>
            </div>

            {/* Selfie with Card */}
            <div className="mt-6 bg-gray-700/50 rounded-xl p-4">
              <h4 className="text-green-400 font-medium mb-3">SELFIE WITH CARD</h4>
              <button
                onClick={() => openCamera('selfie')}
                className="w-full p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
              >
                <Camera className="w-5 h-5" />
                Click to open camera to snap live image of you holding ID to your chest
              </button>
            </div>

            {/* Strong Protection Section */}
            <div className="mt-6 bg-red-900/20 border border-red-500 rounded-xl p-4">
              <h4 className="text-red-400 font-bold mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Strong Protection of your ID & Certs
              </h4>
              <div className="space-y-3">
                <button
                  className="w-full p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Video className="w-5 h-5" />
                  Record yourself holding the FRONT of the card
                </button>
                <button
                  className="w-full p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Video className="w-5 h-5" />
                  Record yourself holding the BACK of the card
                </button>
              </div>
            </div>
          </div>

          {/* Save/Edit Button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={saveDocument}
              className="px-6 py-3 bg-yellow-600 text-white rounded-xl hover:bg-yellow-700 transition-colors flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              {isEditing ? 'UPDATE' : 'SAVE'}
            </button>
          </div>
        </motion.div>

        {/* Application Form */}
        {showApplicationForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-800/30 backdrop-blur-md rounded-2xl p-6 mb-8 border border-green-600"
          >
            <h3 className="text-2xl font-bold text-green-400 mb-4">
              Apply for ID/Certificate
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 font-medium mb-2">ID TYPE to Apply For</label>
                <select
                  value={currentDoc.idType}
                  onChange={(e) => handleInputChange('idType', e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:border-green-400 focus:outline-none"
                >
                  <option value="">Select ID Type</option>
                  {idTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-2">Reason for Application</label>
                <select
                  value={applicationReason}
                  onChange={(e) => setApplicationReason(e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:border-green-400 focus:outline-none"
                >
                  <option value="">Choose reason</option>
                  {applicationReasons.map(reason => (
                    <option key={reason} value={reason}>{reason}</option>
                  ))}
                </select>
              </div>

              {applicationReason === 'Other' && (
                <div className="md:col-span-2">
                  <label className="block text-gray-300 font-medium mb-2">State Other Reasons</label>
                  <input
                    type="text"
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:border-green-400 focus:outline-none"
                    placeholder="Please specify your reason"
                  />
                </div>
              )}

              <div>
                <label className="block text-gray-300 font-medium mb-2">Upload Picture</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleImageUpload('front')}
                    className="flex-1 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Upload Picture
                  </button>
                  <button
                    onClick={() => openCamera('front')}
                    className="flex-1 p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Take New Picture
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-2">Issuer</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentDoc.issuer}
                    onChange={(e) => handleInputChange('issuer', e.target.value)}
                    className="flex-1 p-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:border-green-400 focus:outline-none"
                    placeholder="Enter issuer name"
                  />
                  <button
                    onClick={submitApplication}
                    className="px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
                  >
                    Send Request
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Stored Documents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center gap-2">
            <FileText className="w-6 h-6" />
            Stored Documents ({documents.length})
          </h2>

          {documents.length === 0 ? (
            <div className="text-center py-12">
              <CreditCard className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No documents stored yet</p>
              <p className="text-gray-500">Add your first ID or certificate above</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documents.map((doc) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gray-700/50 rounded-xl p-4 border border-gray-600 hover:border-yellow-400 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-400" />
                      <h3 className="font-bold text-white truncate">{doc.name}</h3>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => editDocument(doc)}
                        className="p-1 text-blue-400 hover:text-blue-300"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteDocument(doc.id)}
                        className="p-1 text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Type:</span>
                      <span className="text-white">{doc.idType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Number:</span>
                      <span className="text-white">{doc.idNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Issuer:</span>
                      <span className="text-white truncate">{doc.issuer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Expires:</span>
                      <span className="text-white">{doc.expiryDate}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    {doc.frontImage && (
                      <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                        <Eye className="w-4 h-4 text-white" />
                      </div>
                    )}
                    {doc.backImage && (
                      <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                        <Eye className="w-4 h-4 text-white" />
                      </div>
                    )}
                    {doc.selfieWithCard && (
                      <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Hidden Elements */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            // Handle file upload
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (event) => {
                // Handle the uploaded image
                console.log('File uploaded:', event.target?.result);
              };
              reader.readAsDataURL(file);
            }
          }}
        />
        
        <video
          ref={videoRef}
          className="hidden"
          autoPlay
          muted
        />
        
        <canvas
          ref={canvasRef}
          className="hidden"
        />
      </div>
    </div>
  );
}