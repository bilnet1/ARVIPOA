import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Mail, 
  Send, 
  Inbox as InboxIcon, 
  Plus, 
  Paperclip, 
  MapPin, 
  Package, 
  Trash2, 
  Star, 
  Reply, 
  Forward, 
  Search,
  Settings,
  User,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  Filter,
  MoreVertical,
  Download,
  Archive
} from 'lucide-react';
import pmbEmailMockupPath from '@assets/ChatGPT Image Jun 6, 2025, 01_26_55 PM.png';

export default function PrivateMailBoxEmailCenter() {
  const [activeTab, setActiveTab] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState<any>(null);
  const [composeData, setComposeData] = useState({
    from: 'janedoe@gmail.com',
    to: '',
    subject: '',
    message: '',
    attachment: null
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const [emailAccounts] = useState([
    { 
      id: 1, 
      email: 'janedoe@gmail.com', 
      provider: 'Gmail', 
      status: 'active',
      unreadCount: 5,
      isDefault: true
    },
    { 
      id: 2, 
      email: 'john.doe@company.com', 
      provider: 'Outlook', 
      status: 'active',
      unreadCount: 2,
      isDefault: false
    },
    { 
      id: 3, 
      email: 'contact@mybusiness.com', 
      provider: 'Custom Domain', 
      status: 'active',
      unreadCount: 0,
      isDefault: false
    }
  ]);

  const [inboxEmails] = useState([
    {
      id: 1,
      from: 'ARVIPOA Support',
      fromEmail: 'support@arvipoa.com',
      to: 'janedoe@gmail.com',
      subject: 'Your PMB Registration Confirmation',
      preview: 'Congratulations! Your Private Mail Box has been successfully registered and activated...',
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

  const [outboxEmails] = useState([
    {
      id: 1,
      from: 'janedoe@gmail.com',
      to: 'support@arvipoa.com',
      subject: 'Thank you for PMB setup',
      preview: 'Thank you for the excellent service in setting up my Private Mail Box...',
      timestamp: '2025-06-06 11:00',
      status: 'sent',
      hasAttachment: false
    },
    {
      id: 2,
      from: 'john.doe@company.com',
      to: 'team@company.com',
      subject: 'Weekly Project Update',
      preview: 'Please find the weekly project status update and upcoming milestones...',
      timestamp: '2025-06-05 17:30',
      status: 'sent',
      hasAttachment: true
    }
  ]);

  const [physicalPackages] = useState([
    {
      id: 1,
      trackingNumber: 'GP789456',
      sender: 'Business Partner Ltd',
      size: 'Medium',
      deliveryDate: '2025-06-06',
      status: 'delivered',
      location: 'PMB-001-ACC',
      collectionDeadline: '2025-07-06'
    },
    {
      id: 2,
      trackingNumber: 'GP654321',
      sender: 'Online Store Ghana',
      size: 'Small',
      deliveryDate: '2025-06-04',
      status: 'collected',
      location: 'PMB-001-ACC',
      collectionDate: '2025-06-05'
    }
  ]);

  const filteredEmails = inboxEmails.filter(email => {
    const matchesSearch = email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         email.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         email.preview.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' ||
                         (selectedFilter === 'unread' && email.status === 'unread') ||
                         (selectedFilter === 'starred' && email.starred) ||
                         (selectedFilter === 'attachments' && email.hasAttachment);
    
    return matchesSearch && matchesFilter;
  });

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
    setActiveTab('email-view');
  };

  const handleReply = (email: any) => {
    setComposeData({
      from: email.to,
      to: email.fromEmail,
      subject: `Re: ${email.subject}`,
      message: `\n\n--- Original Message ---\nFrom: ${email.from} <${email.fromEmail}>\nTo: ${email.to}\nSubject: ${email.subject}\nDate: ${email.timestamp}\n\n${email.content}`,
      attachment: null
    });
    setActiveTab('compose');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'normal': return 'text-blue-400';
      case 'low': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-500';
      case 'collected': return 'bg-blue-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative mb-6">
            <img 
              src={pmbEmailMockupPath} 
              alt="Private Mail Box Email Center" 
              className="w-full max-w-lg mx-auto rounded-lg shadow-2xl border border-blue-500/30"
            />
            <div className="absolute inset-0 bg-blue-500/10 rounded-lg"></div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Private Mail Box Email Center
          </h1>
          <p className="text-gray-300 text-lg">
            Unified Email Management & Package Tracking Hub
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
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
                    onClick={() => setActiveTab('inbox')}
                  >
                    <InboxIcon className="w-4 h-4 mr-2" />
                    Inbox
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full text-green-400 border-green-400 hover:bg-green-400/10"
                    onClick={() => setActiveTab('outbox')}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Outbox
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full text-purple-400 border-purple-400 hover:bg-purple-400/10"
                    onClick={() => setActiveTab('compose')}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Compose
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full text-yellow-400 border-yellow-400 hover:bg-yellow-400/10"
                    onClick={() => setActiveTab('packages')}
                  >
                    <Package className="w-4 h-4 mr-2" />
                    Physical Packages
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Hub */}
            <Card className="bg-slate-800/50 border-cyan-500/30">
              <CardHeader>
                <CardTitle className="text-cyan-400 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Delivery Hub
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-16 h-16 bg-cyan-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-white font-medium">PMB-001-ACC</p>
                  <p className="text-gray-400 text-sm">Accra Central Post Office</p>
                  <Button variant="outline" className="mt-3 text-cyan-400 border-cyan-400" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    Track Location
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 mb-6">
                <TabsTrigger value="inbox" className="data-[state=active]:bg-blue-600">
                  Inbox
                </TabsTrigger>
                <TabsTrigger value="outbox" className="data-[state=active]:bg-blue-600">
                  Outbox
                </TabsTrigger>
                <TabsTrigger value="compose" className="data-[state=active]:bg-blue-600">
                  Compose
                </TabsTrigger>
                <TabsTrigger value="packages" className="data-[state=active]:bg-blue-600">
                  Packages
                </TabsTrigger>
                <TabsTrigger value="email-view" className="data-[state=active]:bg-blue-600">
                  Email View
                </TabsTrigger>
              </TabsList>

              {/* Inbox Tab */}
              <TabsContent value="inbox">
                <Card className="bg-slate-800/50 border-blue-500/30">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-blue-400 flex items-center">
                        <InboxIcon className="w-6 h-6 mr-2" />
                        Inbox ({filteredEmails.length})
                      </CardTitle>
                      <div className="flex items-center space-x-2">
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
              </TabsContent>

              {/* Outbox Tab */}
              <TabsContent value="outbox">
                <Card className="bg-slate-800/50 border-green-500/30">
                  <CardHeader>
                    <CardTitle className="text-green-400 flex items-center">
                      <Send className="w-6 h-6 mr-2" />
                      Outbox ({outboxEmails.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {outboxEmails.map((email) => (
                        <div key={email.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="text-gray-300 font-medium">To: {email.to}</span>
                                {email.hasAttachment && (
                                  <Paperclip className="w-4 h-4 text-gray-400" />
                                )}
                                <Badge className="bg-green-500 text-white text-xs">SENT</Badge>
                              </div>
                              <h4 className="text-white font-medium mb-1">{email.subject}</h4>
                              <p className="text-gray-400 text-sm">{email.preview}</p>
                              <div className="flex items-center justify-between mt-2">
                                <p className="text-gray-500 text-xs">{email.timestamp}</p>
                                <p className="text-gray-500 text-xs">From: {email.from}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Compose Tab */}
              <TabsContent value="compose">
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
                        <Textarea
                          id="message"
                          value={composeData.message}
                          onChange={(e) => handleComposeChange('message', e.target.value)}
                          placeholder="Type your message here..."
                          className="bg-slate-700/50 border-slate-600 text-white min-h-[200px]"
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
              </TabsContent>

              {/* Packages Tab */}
              <TabsContent value="packages">
                <Card className="bg-slate-800/50 border-yellow-500/30">
                  <CardHeader>
                    <CardTitle className="text-yellow-400 flex items-center">
                      <Package className="w-6 h-6 mr-2" />
                      Physical Packages ({physicalPackages.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {physicalPackages.map((pkg) => (
                        <div key={pkg.id} className="p-4 bg-slate-700/50 rounded-lg border border-slate-600/50">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h4 className="text-white font-medium">Tracking: {pkg.trackingNumber}</h4>
                                <Badge className={`${getStatusColor(pkg.status)} text-white`}>
                                  {pkg.status.toUpperCase()}
                                </Badge>
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <p className="text-gray-400">Sender: <span className="text-white">{pkg.sender}</span></p>
                                  <p className="text-gray-400">Size: <span className="text-white">{pkg.size}</span></p>
                                  <p className="text-gray-400">Location: <span className="text-white">{pkg.location}</span></p>
                                </div>
                                <div>
                                  <p className="text-gray-400">Delivery: <span className="text-white">{pkg.deliveryDate}</span></p>
                                  {pkg.status === 'delivered' && (
                                    <p className="text-gray-400">Collect by: <span className="text-yellow-400">{pkg.collectionDeadline}</span></p>
                                  )}
                                  {pkg.status === 'collected' && (
                                    <p className="text-gray-400">Collected: <span className="text-green-400">{pkg.collectionDate}</span></p>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" className="text-blue-400 border-blue-400">
                                <Eye className="w-4 h-4 mr-1" />
                                Track
                              </Button>
                              {pkg.status === 'delivered' && (
                                <Button variant="outline" size="sm" className="text-green-400 border-green-400">
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Collect
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Email View Tab */}
              <TabsContent value="email-view">
                {selectedEmail && (
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
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}