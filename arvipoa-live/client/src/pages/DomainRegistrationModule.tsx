import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Globe, 
  Shield, 
  Database, 
  Smartphone, 
  Palette, 
  Code, 
  Search, 
  CheckCircle,
  AlertTriangle,
  Monitor,
  Lock,
  FileText,
  Zap,
  Eye,
  Settings,
  Bot,
  Cpu,
  Lightbulb,
  Rocket,
  ShieldCheck,
  Building,
  Map
} from 'lucide-react';
import domainMockupPath from '@assets/ChatGPT Image Jun 6, 2025, 01_08_23 PM.png';

export default function DomainRegistrationModule() {
  const [activeTab, setActiveTab] = useState('overview');
  const [domainSearch, setDomainSearch] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    domainName: '',
    domainType: '',
    purposeOfUsage: '',
    registrantName: '',
    organization: '',
    email: '',
    phone: '',
    address: '',
    registrationPeriod: '1',
    privacyProtection: true,
    autoRenewal: true
  });

  const [registeredDomains] = useState([
    {
      id: 1,
      domainName: 'mybusiness.com',
      status: 'active',
      registrationDate: '2025-01-15',
      expiryDate: '2026-01-15',
      registrant: 'John Doe Enterprises',
      type: 'Business',
      sslStatus: 'active',
      dnsStatus: 'configured',
      aiDesignStatus: 'completed'
    },
    {
      id: 2,
      domainName: 'techstartup.io',
      status: 'pending',
      registrationDate: '2025-02-01',
      expiryDate: '2026-02-01',
      registrant: 'Tech Startup Ltd',
      type: 'Technology',
      sslStatus: 'pending',
      dnsStatus: 'pending',
      aiDesignStatus: 'in-progress'
    }
  ]);

  const [aiDesignProjects] = useState([
    {
      id: 1,
      projectName: 'Corporate Website',
      domainName: 'mybusiness.com',
      status: 'completed',
      designType: 'Business Professional',
      mobileOptimized: true,
      aiFeatures: ['Smart Navigation', 'Auto Content Generation', 'SEO Optimization'],
      completionDate: '2025-06-01'
    },
    {
      id: 2,
      projectName: 'E-commerce Platform',
      domainName: 'techstartup.io',
      status: 'in-progress',
      designType: 'Modern E-commerce',
      mobileOptimized: true,
      aiFeatures: ['Product Recommendations', 'Chat Bot', 'Analytics Dashboard'],
      completionDate: 'Estimated: 2025-06-15'
    }
  ]);

  const domainTypes = [
    '.com', '.net', '.org', '.io', '.co', '.biz', '.info', '.tech', '.online', '.store'
  ];

  const purposeOptions = [
    'Business Website', 'E-commerce', 'Blog/Personal', 'Portfolio', 'Educational',
    'Non-profit', 'Government', 'Technology Startup', 'Marketing Landing Page'
  ];

  const registrationPeriods = [
    { value: '1', label: '1 Year' },
    { value: '2', label: '2 Years' },
    { value: '5', label: '5 Years' },
    { value: '10', label: '10 Years' }
  ];

  const aiDesignTemplates = [
    { id: 1, name: 'Business Professional', category: 'Corporate', features: ['Clean Design', 'Contact Forms', 'Service Pages'] },
    { id: 2, name: 'E-commerce Modern', category: 'Shopping', features: ['Product Catalog', 'Shopping Cart', 'Payment Integration'] },
    { id: 3, name: 'Creative Portfolio', category: 'Creative', features: ['Gallery', 'Project Showcase', 'Contact Portfolio'] },
    { id: 4, name: 'Tech Startup', category: 'Technology', features: ['Landing Page', 'Feature Highlights', 'Pricing Tables'] }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'expired': return 'bg-red-500';
      case 'completed': return 'bg-blue-500';
      case 'in-progress': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const handleDomainSearch = () => {
    if (!domainSearch.trim()) return;
    
    // Simulate domain search results
    const mockResults = [
      { domain: `${domainSearch}.com`, available: true, price: '$12.99/year' },
      { domain: `${domainSearch}.net`, available: false, price: 'Unavailable' },
      { domain: `${domainSearch}.org`, available: true, price: '$14.99/year' },
      { domain: `${domainSearch}.io`, available: true, price: '$39.99/year' }
    ];
    
    setSearchResults(mockResults);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('Domain Registration Data:', formData);
    alert('Domain registration initiated! ARVIPOA AI Website design assistant will contact you within 24 hours to begin your website creation.');
  };

  const startAiDesign = (domainName: string) => {
    alert(`ARVIPOA AI Website & Mobile App Design Assistant activated for ${domainName}! Our AI will analyze your business requirements and create a customized design proposal.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative mb-6">
            <img 
              src={domainMockupPath} 
              alt="Domain Registration Mockup" 
              className="w-full max-w-md mx-auto rounded-lg shadow-2xl border border-purple-500/30"
            />
            <div className="absolute inset-0 bg-purple-500/10 rounded-lg"></div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Domain Registration & AI Design
          </h1>
          <p className="text-gray-300 text-lg">
            Register Domains with ARVIPOA AI Website & Mobile App Design Assistant
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6 bg-slate-800/50 mb-6">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">
              Overview
            </TabsTrigger>
            <TabsTrigger value="search" className="data-[state=active]:bg-purple-600">
              Domain Search
            </TabsTrigger>
            <TabsTrigger value="register" className="data-[state=active]:bg-purple-600">
              Register
            </TabsTrigger>
            <TabsTrigger value="ai-design" className="data-[state=active]:bg-purple-600">
              AI Design
            </TabsTrigger>
            <TabsTrigger value="management" className="data-[state=active]:bg-purple-600">
              Management
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-purple-600">
              Security
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <Card className="bg-slate-800/50 border-purple-500/30">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-white">{registeredDomains.length}</p>
                      <p className="text-gray-400">Registered Domains</p>
                    </div>
                    <Globe className="w-8 h-8 text-purple-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-green-500/30">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-white">
                        {registeredDomains.filter(d => d.status === 'active').length}
                      </p>
                      <p className="text-gray-400">Active Domains</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-blue-500/30">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-white">{aiDesignProjects.length}</p>
                      <p className="text-gray-400">AI Design Projects</p>
                    </div>
                    <Bot className="w-8 h-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-yellow-500/30">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-white">
                        {registeredDomains.filter(d => d.sslStatus === 'active').length}
                      </p>
                      <p className="text-gray-400">SSL Protected</p>
                    </div>
                    <Shield className="w-8 h-8 text-yellow-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Registered Domains */}
            <Card className="bg-slate-800/50 border-purple-500/30 mb-6">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center">
                  <Globe className="w-6 h-6 mr-2" />
                  Your Registered Domains
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {registeredDomains.map((domain) => (
                    <div key={domain.id} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/50">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-white font-semibold text-lg">{domain.domainName}</h3>
                            <Badge className={`${getStatusColor(domain.status)} text-white`}>
                              {domain.status}
                            </Badge>
                          </div>
                          <p className="text-gray-300">Type: {domain.type}</p>
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="text-gray-400">Expires: {domain.expiryDate}</span>
                            <span className={`${domain.sslStatus === 'active' ? 'text-green-400' : 'text-yellow-400'}`}>
                              SSL: {domain.sslStatus}
                            </span>
                            <span className={`${domain.aiDesignStatus === 'completed' ? 'text-blue-400' : 'text-purple-400'}`}>
                              AI Design: {domain.aiDesignStatus}
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-blue-400 border-blue-400 hover:bg-blue-400/10"
                            onClick={() => alert(`Domain Details:\n\nDomain: ${domain.domainName}\nType: ${domain.type}\nRegistrant: ${domain.registrant}\nRegistration Date: ${domain.registrationDate}\nExpiry Date: ${domain.expiryDate}\nStatus: ${domain.status.toUpperCase()}\nSSL Status: ${domain.sslStatus}\nDNS Status: ${domain.dnsStatus}\nAI Design Status: ${domain.aiDesignStatus}\n\nDomain Services:\n- WHOIS Privacy Protection: Enabled\n- SSL Certificate: Active\n- Domain Lock: Enabled\n- DNSSEC: Active\n- Auto-Renewal: Enabled\n- AI Website Design: ${domain.aiDesignStatus}\n- Mobile Optimization: Included\n\nSecurity Features:\n- Domain Lock Protection\n- 2FA Authentication\n- Privacy Protection\n- DNSSEC Validation\n- Spam Protection: Enabled`)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-purple-400 border-purple-400 hover:bg-purple-400/10"
                            onClick={() => startAiDesign(domain.domainName)}
                          >
                            <Bot className="w-4 h-4 mr-1" />
                            AI Design
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Design Projects */}
            <Card className="bg-slate-800/50 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-blue-400 flex items-center">
                  <Bot className="w-6 h-6 mr-2" />
                  ARVIPOA AI Design Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiDesignProjects.map((project) => (
                    <div key={project.id} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/50">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-white font-semibold">{project.projectName}</h3>
                            <Badge className={`${getStatusColor(project.status)} text-white`}>
                              {project.status}
                            </Badge>
                          </div>
                          <p className="text-gray-300">Domain: {project.domainName}</p>
                          <p className="text-gray-400 text-sm">Design: {project.designType}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {project.aiFeatures.map((feature, index) => (
                              <Badge key={index} variant="outline" className="text-blue-400 border-blue-400">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-gray-500 text-sm">{project.completionDate}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {project.mobileOptimized && (
                            <Smartphone className="w-5 h-5 text-green-400" />
                          )}
                          <Button variant="outline" size="sm" className="text-blue-400 border-blue-400">
                            <Eye className="w-4 h-4 mr-1" />
                            Preview
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Domain Search Tab */}
          <TabsContent value="search">
            <Card className="bg-slate-800/50 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center">
                  <Search className="w-6 h-6 mr-2" />
                  Domain Availability Search
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4 mb-6">
                  <Input
                    placeholder="Enter domain name (without extension)"
                    value={domainSearch}
                    onChange={(e) => setDomainSearch(e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-white flex-1"
                  />
                  <Button 
                    onClick={handleDomainSearch}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>

                {searchResults.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-white font-semibold mb-4">Search Results:</h3>
                    {searchResults.map((result, index) => (
                      <div key={index} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-white font-medium">{result.domain}</span>
                            <Badge className={result.available ? 'bg-green-500' : 'bg-red-500'}>
                              {result.available ? 'Available' : 'Taken'}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className="text-gray-300">{result.price}</span>
                            {result.available && (
                              <Button 
                                size="sm" 
                                className="bg-purple-600 hover:bg-purple-700"
                                onClick={() => handleInputChange('domainName', result.domain)}
                              >
                                Select
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Register Tab */}
          <TabsContent value="register">
            <Card className="bg-slate-800/50 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center">
                  <Globe className="w-6 h-6 mr-2" />
                  Register New Domain
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="domainName" className="text-white">Domain Name</Label>
                      <Input
                        id="domainName"
                        value={formData.domainName}
                        onChange={(e) => handleInputChange('domainName', e.target.value)}
                        placeholder="e.g., mybusiness.com"
                        className="bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="purposeOfUsage" className="text-white">Purpose of Usage</Label>
                      <Select value={formData.purposeOfUsage} onValueChange={(value) => handleInputChange('purposeOfUsage', value)}>
                        <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                          <SelectValue placeholder="Select purpose" />
                        </SelectTrigger>
                        <SelectContent>
                          {purposeOptions.map((purpose) => (
                            <SelectItem key={purpose} value={purpose}>{purpose}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="registrantName" className="text-white">Registrant Name</Label>
                      <Input
                        id="registrantName"
                        value={formData.registrantName}
                        onChange={(e) => handleInputChange('registrantName', e.target.value)}
                        placeholder="Enter full name"
                        className="bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="organization" className="text-white">Organization (Optional)</Label>
                      <Input
                        id="organization"
                        value={formData.organization}
                        onChange={(e) => handleInputChange('organization', e.target.value)}
                        placeholder="Enter organization name"
                        className="bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="registrationPeriod" className="text-white">Registration Period</Label>
                      <Select value={formData.registrationPeriod} onValueChange={(value) => handleInputChange('registrationPeriod', value)}>
                        <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                          <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                          {registrationPeriods.map((period) => (
                            <SelectItem key={period.value} value={period.value}>{period.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="text-white">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter email address"
                        className="bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-white">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="Enter phone number"
                        className="bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="address" className="text-white">Address</Label>
                      <Textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="Enter complete address"
                        className="bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="privacyProtection"
                          checked={formData.privacyProtection}
                          onChange={(e) => handleInputChange('privacyProtection', e.target.checked)}
                          className="rounded border-slate-600"
                        />
                        <Label htmlFor="privacyProtection" className="text-white">Enable Privacy Protection</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="autoRenewal"
                          checked={formData.autoRenewal}
                          onChange={(e) => handleInputChange('autoRenewal', e.target.checked)}
                          className="rounded border-slate-600"
                        />
                        <Label htmlFor="autoRenewal" className="text-white">Enable Auto-Renewal</Label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Button 
                    onClick={handleSubmit}
                    className="bg-purple-600 hover:bg-purple-700 text-white w-full"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Register Domain + Start AI Design
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Design Tab */}
          <TabsContent value="ai-design">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* AI Design Assistant */}
              <Card className="bg-slate-800/50 border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-blue-400 flex items-center">
                    <Bot className="w-6 h-6 mr-2" />
                    ARVIPOA AI Website & Mobile App Design Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-900/30 rounded-lg">
                      <h4 className="text-blue-400 font-semibold mb-2">AI Design Features</h4>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center space-x-2">
                          <Lightbulb className="w-4 h-4 text-yellow-400" />
                          <span className="text-gray-300">Smart Templates</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-green-400" />
                          <span className="text-gray-300">Auto Content</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Rocket className="w-4 h-4 text-purple-400" />
                          <span className="text-gray-300">Fast Deploy</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <ShieldCheck className="w-4 h-4 text-blue-400" />
                          <span className="text-gray-300">SEO Optimized</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Cpu className="w-4 h-4 text-red-400" />
                          <span className="text-gray-300">AI Analytics</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Map className="w-4 h-4 text-green-400" />
                          <span className="text-gray-300">User Journey</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Button variant="outline" className="w-full text-blue-400 border-blue-400 hover:bg-blue-400/10">
                        <Bot className="w-4 h-4 mr-2" />
                        Start AI Design Consultation
                      </Button>
                      <Button variant="outline" className="w-full text-purple-400 border-purple-400 hover:bg-purple-400/10">
                        <Smartphone className="w-4 h-4 mr-2" />
                        Mobile App Design
                      </Button>
                      <Button variant="outline" className="w-full text-green-400 border-green-400 hover:bg-green-400/10">
                        <Palette className="w-4 h-4 mr-2" />
                        Brand Identity Generator
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Design Templates */}
              <Card className="bg-slate-800/50 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-purple-400 flex items-center">
                    <Palette className="w-6 h-6 mr-2" />
                    AI Design Templates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {aiDesignTemplates.map((template) => (
                      <div key={template.id} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/50 hover:border-purple-500/50 transition-colors cursor-pointer">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-white font-medium">{template.name}</h4>
                            <p className="text-gray-400 text-sm">{template.category}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {template.features.map((feature, index) => (
                                <Badge key={index} variant="outline" className="text-purple-400 border-purple-400 text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <Button size="sm" variant="outline" className="text-purple-400 border-purple-400">
                            <Eye className="w-4 h-4 mr-1" />
                            Preview
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Design Process */}
            <Card className="bg-slate-800/50 border-green-500/30 mt-6">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center">
                  <Building className="w-6 h-6 mr-2" />
                  AI Design Process
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <h4 className="text-white font-medium mb-1">Analysis</h4>
                    <p className="text-gray-400 text-sm">AI analyzes your business and requirements</p>
                  </div>
                  <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <h4 className="text-white font-medium mb-1">Design</h4>
                    <p className="text-gray-400 text-sm">Creates custom website and mobile designs</p>
                  </div>
                  <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <h4 className="text-white font-medium mb-1">Content</h4>
                    <p className="text-gray-400 text-sm">Generates optimized content and copy</p>
                  </div>
                  <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                    <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-white font-bold">4</span>
                    </div>
                    <h4 className="text-white font-medium mb-1">Deploy</h4>
                    <p className="text-gray-400 text-sm">Launches your complete digital presence</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Management Tab */}
          <TabsContent value="management">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Domain Services */}
              <Card className="bg-slate-800/50 border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-blue-400 flex items-center">
                    <Settings className="w-6 h-6 mr-2" />
                    Domain Services
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded">
                      <div className="flex items-center space-x-2">
                        <Database className="w-5 h-5 text-blue-400" />
                        <span className="text-white">WHOIS Lookup</span>
                      </div>
                      <Button size="sm" variant="outline" className="text-blue-400 border-blue-400">
                        Search
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded">
                      <div className="flex items-center space-x-2">
                        <Shield className="w-5 h-5 text-green-400" />
                        <span className="text-white">SSL Certificate</span>
                      </div>
                      <Badge className="bg-green-500 text-white">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded">
                      <div className="flex items-center space-x-2">
                        <Globe className="w-5 h-5 text-purple-400" />
                        <span className="text-white">Domain Transfer</span>
                      </div>
                      <Button size="sm" variant="outline" className="text-purple-400 border-purple-400">
                        Transfer
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-5 h-5 text-yellow-400" />
                        <span className="text-white">Spam Protection</span>
                      </div>
                      <Badge className="bg-yellow-500 text-white">Enabled</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Analytics */}
              <Card className="bg-slate-800/50 border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center">
                    <Monitor className="w-6 h-6 mr-2" />
                    Domain Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Monthly Visitors</span>
                      <span className="text-white font-semibold">12,450</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Page Views</span>
                      <span className="text-white font-semibold">28,934</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Bounce Rate</span>
                      <span className="text-white font-semibold">23.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">AI Optimization Score</span>
                      <span className="text-green-400 font-semibold">94/100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Mobile Performance</span>
                      <span className="text-blue-400 font-semibold">98/100</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Security Features */}
              <Card className="bg-slate-800/50 border-red-500/30">
                <CardHeader>
                  <CardTitle className="text-red-400 flex items-center">
                    <Shield className="w-6 h-6 mr-2" />
                    Domain Security
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-700/50 rounded-lg">
                      <h4 className="text-white font-medium mb-2">Security Features</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Domain Lock</span>
                          <Badge className="bg-green-500 text-white">Enabled</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">DNSSEC</span>
                          <Badge className="bg-green-500 text-white">Active</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Privacy Protection</span>
                          <Badge className="bg-blue-500 text-white">Enabled</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">2FA Protection</span>
                          <Badge className="bg-green-500 text-white">Active</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button variant="outline" className="w-full text-red-400 border-red-400 hover:bg-red-400/10">
                        <Lock className="w-4 h-4 mr-2" />
                        Security Settings
                      </Button>
                      <Button variant="outline" className="w-full text-yellow-400 border-yellow-400 hover:bg-yellow-400/10">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Security Audit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Security Log */}
              <Card className="bg-slate-800/50 border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center">
                    <FileText className="w-6 h-6 mr-2" />
                    Security Log
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 p-3 bg-slate-700/30 rounded">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                      <div>
                        <p className="text-white text-sm">SSL certificate renewed automatically</p>
                        <p className="text-gray-400 text-xs">Today, 02:30 AM</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-slate-700/30 rounded">
                      <Shield className="w-5 h-5 text-blue-400 mt-0.5" />
                      <div>
                        <p className="text-white text-sm">DNSSEC validation successful</p>
                        <p className="text-gray-400 text-xs">Yesterday, 11:45 PM</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-slate-700/30 rounded">
                      <Lock className="w-5 h-5 text-yellow-400 mt-0.5" />
                      <div>
                        <p className="text-white text-sm">Domain lock status verified</p>
                        <p className="text-gray-400 text-xs">2 days ago, 4:20 PM</p>
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