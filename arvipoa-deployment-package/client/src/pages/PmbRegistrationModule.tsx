import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  MapPin, 
  Shield, 
  Users, 
  MessageSquare, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Package,
  Send,
  Inbox,
  Search,
  Settings,
  Lock,
  Eye,
  Bell,
  X,
  Plus,
  Paperclip,
  Star,
  Reply,
  Forward,
  Trash2,
  Filter,
  Download,
  User
} from 'lucide-react';
import pmbMockupPath from '@assets/ChatGPT Image Jun 6, 2025, 01_03_19 PM.png';

export default function PmbRegistrationModule() {
  const [activeTab, setActiveTab] = useState('overview');
  const [formData, setFormData] = useState({
    mailboxNumber: '',
    uniqueId: '',
    address: '',
    usageType: '',
    ownerName: '',
    contactNumber: '',
    alternateContact: '',
    securityPin: '',
    accessLevel: 'standard'
  });

  const [registeredPmbs] = useState([
    {
      id: 1,
      mailboxNumber: 'PMB-001-ACC',
      uniqueId: 'ARV-PMB-2025-M1N2O3P4',
      address: 'Accra Central Post Office, Accra',
      usageType: 'Business',
      status: 'active',
      owner: 'John Doe Enterprises',
      registrationDate: '2025-01-15',
      securityLevel: 'Enhanced',
      messageCount: 12,
      lastAccess: '2025-06-06'
    },
    {
      id: 2,
      mailboxNumber: 'PMB-045-KUM',
      uniqueId: 'ARV-PMB-2025-Q5R6S7T8',
      address: 'Kumasi Main Post Office, Kumasi',
      usageType: 'Personal',
      status: 'pending',
      owner: 'Jane Smith',
      registrationDate: '2025-02-01',
      securityLevel: 'Standard',
      messageCount: 3,
      lastAccess: '2025-06-05'
    }
  ]);

  const [messages] = useState([
    {
      id: 1,
      from: 'ARVIPOA System',
      fromEmail: 'support@arvipoa.com',
      to: 'janedoe@gmail.com',
      subject: 'PMB Registration Confirmation',
      preview: 'Your Private Mail Box registration has been approved...',
      content: 'Dear Jane,\n\nCongratulations! Your Private Mail Box PMB-001-ACC has been successfully registered and activated. You can now start receiving mail and packages at your secure private address.\n\nYour PMB Details:\n- Mailbox Number: PMB-001-ACC\n- Address: Accra Central Post Office\n- Security Level: Enhanced\n- PIN: ****\n\nNext Steps:\n1. Set up your notification preferences\n2. Configure mail forwarding if needed\n3. Download the ARVIPOA mobile app for real-time updates\n\nThank you for choosing ARVIPOA Private Mail Box services.\n\nBest regards,\nARVIPOA Support Team',
      timestamp: '2025-06-06 10:30',
      status: 'unread',
      priority: 'high',
      starred: false,
      hasAttachment: true,
      account: 'janedoe@gmail.com'
    },
    {
      id: 2,
      from: 'Ghana Post Office',
      fromEmail: 'notifications@ghanapost.com',
      to: 'janedoe@gmail.com',
      subject: 'Package Delivery Notification - Tracking #GP789456',
      preview: 'A package has been delivered to your PMB. Please collect it within 30 days...',
      content: 'Dear Customer,\n\nA package has been delivered to your Private Mail Box PMB-001-ACC.\n\nPackage Details:\n- Tracking Number: GP789456\n- Sender: Business Partner Ltd\n- Size: Medium\n- Delivery Date: June 6, 2025\n- Collection Deadline: July 6, 2025\n\nTo collect your package:\n1. Visit Accra Central Post Office\n2. Present your ID and PMB PIN\n3. Sign the collection receipt\n\nOffice Hours: Monday-Friday 8AM-5PM, Saturday 8AM-2PM\n\nRegards,\nGhana Post Office',
      timestamp: '2025-06-06 09:15',
      status: 'read',
      priority: 'normal',
      starred: true,
      hasAttachment: false,
      account: 'janedoe@gmail.com'
    },
    {
      id: 3,
      from: 'Business Partner Ltd',
      fromEmail: 'contracts@businesspartner.com',
      to: 'john.doe@company.com',
      subject: 'Contract Documents for Review',
      preview: 'Please find attached the contract documents for the upcoming project. Review required by...',
      content: 'Dear John,\n\nI hope this email finds you well. Please find attached the contract documents for the upcoming digital transformation project.\n\nDocuments included:\n- Master Service Agreement\n- Statement of Work\n- Technical Specifications\n- Payment Terms\n\nPlease review and provide your feedback by June 10, 2025. If you have any questions or need clarifications, feel free to reach out.\n\nLooking forward to working together.\n\nBest regards,\nSarah Johnson\nBusiness Development Manager\nBusiness Partner Ltd',
      timestamp: '2025-06-05 16:45',
      status: 'read',
      priority: 'high',
      starred: false,
      hasAttachment: true,
      account: 'john.doe@company.com'
    },
    {
      id: 4,
      from: 'Monthly Newsletter',
      fromEmail: 'newsletter@techinsights.com',
      to: 'contact@mybusiness.com',
      subject: 'Tech Insights Weekly - AI Developments in Africa',
      preview: 'This week: AI startups in Ghana, fintech innovations, and upcoming tech conferences...',
      content: 'Tech Insights Weekly\n\nThis Week in African Tech:\n\n1. AI Startups Flourishing in Ghana\n- New funding rounds for local AI companies\n- Government support initiatives\n- Skills development programs\n\n2. Fintech Innovations\n- Mobile money integration advances\n- Blockchain adoption in banking\n- Digital payment solutions\n\n3. Upcoming Events\n- Africa Tech Summit 2025\n- Ghana Innovation Week\n- AI & Development Conference\n\nStay informed, stay ahead.\n\nTech Insights Team',
      timestamp: '2025-06-05 08:00',
      status: 'unread',
      priority: 'low',
      starred: false,
      hasAttachment: false,
      account: 'contact@mybusiness.com'
    }
  ]);

  const [emailAccounts] = useState([
    { 
      id: 1, 
      email: 'janedoe@gmail.com', 
      provider: 'Gmail', 
      status: 'active',
      unreadCount: 2,
      isDefault: true
    },
    { 
      id: 2, 
      email: 'john.doe@company.com', 
      provider: 'Outlook', 
      status: 'active',
      unreadCount: 1,
      isDefault: false
    },
    { 
      id: 3, 
      email: 'contact@mybusiness.com', 
      provider: 'Custom Domain', 
      status: 'active',
      unreadCount: 1,
      isDefault: false
    }
  ]);

  const [selectedEmail, setSelectedEmail] = useState<any>(null);
  const [messengerView, setMessengerView] = useState('inbox');
  const [composeData, setComposeData] = useState({
    from: 'janedoe@gmail.com',
    to: '',
    subject: '',
    message: '',
    attachment: null
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const usageTypes = [
    'Personal', 'Business', 'Corporate', 'Government', 'NGO', 'Educational Institution'
  ];

  const securityLevels = [
    'Standard', 'Enhanced', 'Premium', 'Enterprise'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'suspended': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'normal': return 'text-blue-400';
      case 'low': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const filteredEmails = messages.filter(email => {
    const matchesSearch = email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         email.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         email.preview.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' ||
                         (selectedFilter === 'unread' && email.status === 'unread') ||
                         (selectedFilter === 'starred' && email.starred) ||
                         (selectedFilter === 'attachments' && email.hasAttachment);
    
    return matchesSearch && matchesFilter;
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleComposeChange = (field: string, value: string) => {
    setComposeData(prev => ({ ...prev, [field]: value }));
  };

  const handleSendEmail = () => {
    console.log('Sending email:', composeData);
    alert(`Email sent successfully!\n\nFrom: ${composeData.from}\nTo: ${composeData.to}\nSubject: ${composeData.subject}`);
    setComposeData({
      from: composeData.from,
      to: '',
      subject: '',
      message: '',
      attachment: null
    });
  };

  const handleEmailSelect = (email: any) => {
    setSelectedEmail(email);
    setMessengerView('email-view');
  };

  const handleReply = (email: any) => {
    setComposeData({
      from: email.to,
      to: email.fromEmail,
      subject: `Re: ${email.subject}`,
      message: `\n\n--- Original Message ---\nFrom: ${email.from} <${email.fromEmail}>\nTo: ${email.to}\nSubject: ${email.subject}\nDate: ${email.timestamp}\n\n${email.content}`,
      attachment: null
    });
    setMessengerView('compose');
  };

  const handleSubmit = () => {
    console.log('PMB Registration Data:', formData);
    alert('PMB registration submitted successfully! Your application will be processed within 24-48 hours.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative mb-6">
            <img 
              src={pmbMockupPath} 
              alt="PMB Registration Mockup" 
              className="w-full max-w-md mx-auto rounded-lg shadow-2xl border border-blue-500/30"
            />
            <div className="absolute inset-0 bg-blue-500/10 rounded-lg"></div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Private Mail Box Registration
          </h1>
          <p className="text-gray-300 text-lg">
            Secure, Private, and Professional Mail Management with PMB Messenger
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 mb-6">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">
              Overview
            </TabsTrigger>
            <TabsTrigger value="register" className="data-[state=active]:bg-blue-600">
              Register PMB
            </TabsTrigger>
            <TabsTrigger value="management" className="data-[state=active]:bg-blue-600">
              Management
            </TabsTrigger>
            <TabsTrigger value="messenger" className="data-[state=active]:bg-blue-600">
              PMB Messenger
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-blue-600">
              Security
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <Card className="bg-slate-800/50 border-blue-500/30">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-white">{registeredPmbs.length}</p>
                      <p className="text-gray-400">Registered PMBs</p>
                    </div>
                    <Mail className="w-8 h-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-green-500/30">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-white">
                        {registeredPmbs.filter(pmb => pmb.status === 'active').length}
                      </p>
                      <p className="text-gray-400">Active PMBs</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-purple-500/30">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-white">
                        {registeredPmbs.reduce((sum, pmb) => sum + pmb.messageCount, 0)}
                      </p>
                      <p className="text-gray-400">Total Messages</p>
                    </div>
                    <MessageSquare className="w-8 h-8 text-purple-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Registered PMBs */}
            <Card className="bg-slate-800/50 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-blue-400 flex items-center">
                  <Package className="w-6 h-6 mr-2" />
                  Your Registered PMBs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {registeredPmbs.map((pmb) => (
                    <div key={pmb.id} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/50">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-white font-semibold">{pmb.mailboxNumber}</h3>
                            <Badge className={`${getStatusColor(pmb.status)} text-white`}>
                              {pmb.status}
                            </Badge>
                          </div>
                          <p className="text-gray-300 text-sm">ID: {pmb.uniqueId}</p>
                          <p className="text-gray-400 text-sm">{pmb.address}</p>
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="text-gray-400">Type: {pmb.usageType}</span>
                            <span className="text-gray-400">Security: {pmb.securityLevel}</span>
                            <span className="text-blue-400">{pmb.messageCount} messages</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-blue-400 border-blue-400 hover:bg-blue-400/10"
                            onClick={() => alert(`PMB Details:\n\nMailbox: ${pmb.mailboxNumber}\nUnique ID: ${pmb.uniqueId}\nOwner: ${pmb.owner}\nAddress: ${pmb.address}\nType: ${pmb.usageType}\nSecurity Level: ${pmb.securityLevel}\nRegistration Date: ${pmb.registrationDate}\nLast Access: ${pmb.lastAccess}\nMessages: ${pmb.messageCount}\nStatus: ${pmb.status.toUpperCase()}\n\nPMB Services:\n- Mail Forwarding: Active\n- Package Notification: Enabled\n- Digital Scan Service: Premium\n- PMB Messenger: Active\n- Security Features: PIN Protection, 2FA\n- Access Control: Enhanced`)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-green-400 border-green-400 hover:bg-green-400/10"
                          >
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Messages
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Register PMB Tab */}
          <TabsContent value="register">
            <Card className="bg-slate-800/50 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-blue-400 flex items-center">
                  <Mail className="w-6 h-6 mr-2" />
                  Register New Private Mail Box
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="mailboxNumber" className="text-white">Preferred Mailbox Number</Label>
                      <Input
                        id="mailboxNumber"
                        value={formData.mailboxNumber}
                        onChange={(e) => handleInputChange('mailboxNumber', e.target.value)}
                        placeholder="e.g., PMB-123-ACC"
                        className="bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="address" className="text-white">Post Office Address</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="Enter post office location"
                        className="bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="usageType" className="text-white">Usage Type</Label>
                      <Select value={formData.usageType} onValueChange={(value) => handleInputChange('usageType', value)}>
                        <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                          <SelectValue placeholder="Select usage type" />
                        </SelectTrigger>
                        <SelectContent>
                          {usageTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="ownerName" className="text-white">Owner/Organization Name</Label>
                      <Input
                        id="ownerName"
                        value={formData.ownerName}
                        onChange={(e) => handleInputChange('ownerName', e.target.value)}
                        placeholder="Enter owner or organization name"
                        className="bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="contactNumber" className="text-white">Primary Contact Number</Label>
                      <Input
                        id="contactNumber"
                        value={formData.contactNumber}
                        onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                        placeholder="Enter phone number"
                        className="bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="alternateContact" className="text-white">Alternate Contact</Label>
                      <Input
                        id="alternateContact"
                        value={formData.alternateContact}
                        onChange={(e) => handleInputChange('alternateContact', e.target.value)}
                        placeholder="Enter alternate contact"
                        className="bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="accessLevel" className="text-white">Security Level</Label>
                      <Select value={formData.accessLevel} onValueChange={(value) => handleInputChange('accessLevel', value)}>
                        <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                          <SelectValue placeholder="Select security level" />
                        </SelectTrigger>
                        <SelectContent>
                          {securityLevels.map((level) => (
                            <SelectItem key={level} value={level.toLowerCase()}>{level}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="securityPin" className="text-white">Security PIN (4-6 digits)</Label>
                      <Input
                        id="securityPin"
                        type="password"
                        value={formData.securityPin}
                        onChange={(e) => handleInputChange('securityPin', e.target.value)}
                        placeholder="Enter security PIN"
                        className="bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Button 
                    onClick={handleSubmit}
                    className="bg-blue-600 hover:bg-blue-700 text-white w-full"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Register PMB
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Management Tab */}
          <TabsContent value="management">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* PMB Services */}
              <Card className="bg-slate-800/50 border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-blue-400 flex items-center">
                    <Settings className="w-6 h-6 mr-2" />
                    PMB Services
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded">
                      <span className="text-white">Mail Forwarding</span>
                      <Badge className="bg-green-500 text-white">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded">
                      <span className="text-white">Package Notification</span>
                      <Badge className="bg-green-500 text-white">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded">
                      <span className="text-white">Digital Scan Service</span>
                      <Badge className="bg-blue-500 text-white">Premium</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded">
                      <span className="text-white">PMB Messenger</span>
                      <Badge className="bg-purple-500 text-white">Active</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Usage Statistics */}
              <Card className="bg-slate-800/50 border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center">
                    <MapPin className="w-6 h-6 mr-2" />
                    Usage Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-300">This Month's Mail</span>
                      <span className="text-white font-semibold">24 items</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Package Deliveries</span>
                      <span className="text-white font-semibold">8 packages</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Digital Scans</span>
                      <span className="text-white font-semibold">15 scans</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Messenger Messages</span>
                      <span className="text-white font-semibold">32 messages</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* PMB Messenger Tab */}
          <TabsContent value="messenger">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Sidebar - Email Accounts & Quick Actions */}
              <div className="lg:col-span-1 space-y-4">
                {/* Email Accounts */}
                <Card className="bg-slate-800/50 border-blue-500/30">
                  <CardHeader>
                    <CardTitle className="text-blue-400 flex items-center justify-between">
                      <span className="flex items-center">
                        <User className="w-5 h-5 mr-2" />
                        Email Accounts
                      </span>
                      <Button size="sm" variant="outline" className="text-green-400 border-green-400">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {emailAccounts.map((account) => (
                        <div key={account.id} className="p-3 bg-slate-700/50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-white text-sm font-medium">{account.email}</p>
                              <p className="text-gray-400 text-xs">{account.provider}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              {account.unreadCount > 0 && (
                                <Badge className="bg-red-500 text-white text-xs">
                                  {account.unreadCount}
                                </Badge>
                              )}
                              {account.isDefault && (
                                <Badge className="bg-green-500 text-white text-xs">
                                  Default
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="bg-slate-800/50 border-purple-500/30">
                  <CardHeader>
                    <CardTitle className="text-purple-400">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button 
                        variant="outline" 
                        className="w-full text-blue-400 border-blue-400 hover:bg-blue-400/10"
                        onClick={() => setMessengerView('inbox')}
                      >
                        <Inbox className="w-4 h-4 mr-2" />
                        Inbox ({filteredEmails.filter(e => e.status === 'unread').length})
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full text-green-400 border-green-400 hover:bg-green-400/10"
                        onClick={() => setMessengerView('outbox')}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Outbox
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full text-purple-400 border-purple-400 hover:bg-purple-400/10"
                        onClick={() => setMessengerView('compose')}
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Compose
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full text-yellow-400 border-yellow-400 hover:bg-yellow-400/10"
                      >
                        <Package className="w-4 h-4 mr-2" />
                        Physical Packages
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content Area */}
              <div className="lg:col-span-3">
                {/* Inbox View */}
                {messengerView === 'inbox' && (
                  <Card className="bg-slate-800/50 border-blue-500/30">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-blue-400 flex items-center">
                          <Inbox className="w-6 h-6 mr-2" />
                          Inbox ({filteredEmails.length})
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                          <Input
                            placeholder="Search emails..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-slate-700/50 border-slate-600 text-white w-48"
                          />
                          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                            <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All</SelectItem>
                              <SelectItem value="unread">Unread</SelectItem>
                              <SelectItem value="starred">Starred</SelectItem>
                              <SelectItem value="attachments">With Attachments</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {filteredEmails.map((email) => (
                          <div 
                            key={email.id} 
                            className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                              email.status === 'unread' 
                                ? 'bg-slate-700/50 border-blue-500/50 hover:border-blue-500' 
                                : 'bg-slate-700/30 border-slate-600/50 hover:border-slate-500'
                            }`}
                            onClick={() => handleEmailSelect(email)}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className={`font-medium ${email.status === 'unread' ? 'text-white' : 'text-gray-300'}`}>
                                    {email.from}
                                  </span>
                                  {email.status === 'unread' && (
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  )}
                                  {email.starred && (
                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                  )}
                                  {email.hasAttachment && (
                                    <Paperclip className="w-4 h-4 text-gray-400" />
                                  )}
                                  <span className={`text-xs ${getPriorityColor(email.priority)}`}>
                                    {email.priority.toUpperCase()}
                                  </span>
                                </div>
                                <h4 className={`font-medium mb-1 ${email.status === 'unread' ? 'text-white' : 'text-gray-200'}`}>
                                  {email.subject}
                                </h4>
                                <p className="text-gray-400 text-sm">{email.preview}</p>
                                <div className="flex items-center justify-between mt-2">
                                  <p className="text-gray-500 text-xs">{email.timestamp}</p>
                                  <p className="text-gray-500 text-xs">{email.account}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Compose View */}
                {messengerView === 'compose' && (
                  <Card className="bg-slate-800/50 border-purple-500/30">
                    <CardHeader>
                      <CardTitle className="text-purple-400 flex items-center">
                        <Mail className="w-6 h-6 mr-2" />
                        Compose Message
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="from" className="text-white">From</Label>
                          <Select value={composeData.from} onValueChange={(value) => handleComposeChange('from', value)}>
                            <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {emailAccounts.map((account) => (
                                <SelectItem key={account.id} value={account.email}>
                                  {account.email}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="to" className="text-white">To</Label>
                          <Input
                            id="to"
                            value={composeData.to}
                            onChange={(e) => handleComposeChange('to', e.target.value)}
                            placeholder="Enter recipient email address"
                            className="bg-slate-700/50 border-slate-600 text-white"
                          />
                        </div>

                        <div>
                          <Label htmlFor="subject" className="text-white">Subject</Label>
                          <Input
                            id="subject"
                            value={composeData.subject}
                            onChange={(e) => handleComposeChange('subject', e.target.value)}
                            placeholder="Enter email subject"
                            className="bg-slate-700/50 border-slate-600 text-white"
                          />
                        </div>

                        <div>
                          <Label htmlFor="message" className="text-white">Message</Label>
                          <textarea
                            id="message"
                            value={composeData.message}
                            onChange={(e) => handleComposeChange('message', e.target.value)}
                            placeholder="Type your message here..."
                            className="w-full min-h-[200px] p-3 bg-slate-700/50 border border-slate-600 text-white rounded-md"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <Button variant="outline" className="text-gray-400 border-gray-400">
                            <Paperclip className="w-4 h-4 mr-2" />
                            Attachment
                          </Button>
                          <Button 
                            onClick={handleSendEmail}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            disabled={!composeData.to || !composeData.subject}
                          >
                            <Send className="w-4 h-4 mr-2" />
                            Send
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Email View */}
                {messengerView === 'email-view' && selectedEmail && (
                  <Card className="bg-slate-800/50 border-blue-500/30">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-blue-400">{selectedEmail.subject}</CardTitle>
                          <div className="flex items-center space-x-2 mt-2">
                            <span className="text-gray-300">From: {selectedEmail.from}</span>
                            <span className="text-gray-400">({selectedEmail.fromEmail})</span>
                            <span className="text-gray-500 text-sm">{selectedEmail.timestamp}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-blue-400 border-blue-400"
                            onClick={() => handleReply(selectedEmail)}
                          >
                            <Reply className="w-4 h-4 mr-1" />
                            Reply
                          </Button>
                          <Button variant="outline" size="sm" className="text-green-400 border-green-400">
                            <Forward className="w-4 h-4 mr-1" />
                            Forward
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-400 border-red-400">
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-slate-700/30 rounded-lg p-4">
                        <pre className="text-gray-300 whitespace-pre-wrap font-sans">
                          {selectedEmail.content}
                        </pre>
                      </div>
                      {selectedEmail.hasAttachment && (
                        <div className="mt-4 p-3 bg-slate-700/50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Paperclip className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-300">Attachment: document.pdf</span>
                            </div>
                            <Button variant="outline" size="sm" className="text-blue-400 border-blue-400">
                              <Download className="w-4 h-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Outbox View */}
                {messengerView === 'outbox' && (
                  <Card className="bg-slate-800/50 border-green-500/30">
                    <CardHeader>
                      <CardTitle className="text-green-400 flex items-center">
                        <Send className="w-6 h-6 mr-2" />
                        Outbox
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="text-gray-300 font-medium">To: support@arvipoa.com</span>
                                <Badge className="bg-green-500 text-white text-xs">SENT</Badge>
                              </div>
                              <h4 className="text-white font-medium mb-1">Thank you for PMB setup</h4>
                              <p className="text-gray-400 text-sm">Thank you for the excellent service in setting up my Private Mail Box...</p>
                              <div className="flex items-center justify-between mt-2">
                                <p className="text-gray-500 text-xs">2025-06-06 11:00</p>
                                <p className="text-gray-500 text-xs">From: janedoe@gmail.com</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Security Settings */}
              <Card className="bg-slate-800/50 border-red-500/30">
                <CardHeader>
                  <CardTitle className="text-red-400 flex items-center">
                    <Shield className="w-6 h-6 mr-2" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-700/50 rounded-lg">
                      <h4 className="text-white font-medium mb-2">Access Control</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-300">PIN Protection</span>
                          <Badge className="bg-green-500 text-white">Enabled</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Biometric Lock</span>
                          <Badge className="bg-blue-500 text-white">Optional</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Two-Factor Auth</span>
                          <Badge className="bg-green-500 text-white">Active</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button variant="outline" className="w-full text-red-400 border-red-400 hover:bg-red-400/10">
                        <Lock className="w-4 h-4 mr-2" />
                        Change Security PIN
                      </Button>
                      <Button variant="outline" className="w-full text-yellow-400 border-yellow-400 hover:bg-yellow-400/10">
                        <Settings className="w-4 h-4 mr-2" />
                        Access Permissions
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Activity Log */}
              <Card className="bg-slate-800/50 border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center">
                    <Clock className="w-6 h-6 mr-2" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 p-3 bg-slate-700/30 rounded">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                      <div>
                        <p className="text-white text-sm">Mail accessed via PMB Messenger</p>
                        <p className="text-gray-400 text-xs">Today, 10:30 AM</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-slate-700/30 rounded">
                      <Package className="w-5 h-5 text-blue-400 mt-0.5" />
                      <div>
                        <p className="text-white text-sm">Package delivery notification sent</p>
                        <p className="text-gray-400 text-xs">Yesterday, 3:45 PM</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-slate-700/30 rounded">
                      <Lock className="w-5 h-5 text-yellow-400 mt-0.5" />
                      <div>
                        <p className="text-white text-sm">Security PIN updated</p>
                        <p className="text-gray-400 text-xs">2 days ago, 11:20 AM</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}