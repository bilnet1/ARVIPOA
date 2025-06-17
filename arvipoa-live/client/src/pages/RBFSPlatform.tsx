import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Church, 
  Users, 
  Calendar, 
  DollarSign, 
  Video, 
  MessageCircle, 
  Phone,
  CreditCard,
  MapPin,
  Upload,
  Settings,
  Star,
  Heart,
  Gift,
  ShoppingCart,
  Bell,
  Lock,
  Eye,
  FileText,
  Camera
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ReligiousOrganization {
  id: string;
  name: string;
  type: 'church' | 'mosque' | 'temple' | 'other';
  address: string;
  logo: string;
  established: string;
  members: number;
  branches: Branch[];
  services: Service[];
  donations: Donation[];
}

interface Branch {
  id: string;
  name: string;
  address: string;
  pastor: string;
  members: number;
}

interface Service {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'regular' | 'special' | 'live';
  description: string;
}

interface Donation {
  id: string;
  amount: number;
  currency: string;
  type: string;
  donor: string;
  encrypted: boolean;
  date: string;
}

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  membershipCard: string;
  contributions: number;
}

export default function RBFSPlatform() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedOrgType, setSelectedOrgType] = useState<'church' | 'mosque' | 'temple' | 'other'>('church');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLiveStreaming, setIsLiveStreaming] = useState(false);
  const [newOrganization, setNewOrganization] = useState({
    name: '',
    type: 'church',
    address: '',
    pastor: '',
    description: '',
    logo: null as File | null
  });

  const [organizations] = useState<ReligiousOrganization[]>([
    {
      id: '1',
      name: 'Grace Baptist Church',
      type: 'church',
      address: 'Accra, Ghana - verified via ARVIPOA',
      logo: 'https://via.placeholder.com/100x100?text=GBC',
      established: '1995',
      members: 1250,
      branches: [
        { id: '1', name: 'Main Branch', address: 'Accra Central', pastor: 'Rev. John Doe', members: 800 },
        { id: '2', name: 'Tema Branch', address: 'Tema Community 5', pastor: 'Rev. Jane Smith', members: 450 }
      ],
      services: [
        { id: '1', title: 'Sunday Service', date: '2025-06-08', time: '09:00', type: 'regular', description: 'Weekly worship service' },
        { id: '2', title: 'Prayer Meeting', date: '2025-06-10', time: '18:00', type: 'regular', description: 'Midweek prayers' }
      ],
      donations: [
        { id: '1', amount: 500, currency: 'GHS', type: 'Tithe', donor: 'Anonymous', encrypted: true, date: '2025-06-07' },
        { id: '2', amount: 200, currency: 'GHS', type: 'Offering', donor: 'John Member', encrypted: false, date: '2025-06-07' }
      ]
    }
  ]);

  const handleRegisterOrganization = () => {
    console.log('Registering organization:', newOrganization);
    // Integration with ARVIPOA property verification
    setIsRegistering(false);
  };

  const startLiveStream = () => {
    setIsLiveStreaming(true);
    console.log('Starting live stream...');
    // Integration with video streaming service
  };

  const sendDonation = (amount: number, type: string, encrypted: boolean) => {
    console.log('Processing donation:', { amount, type, encrypted });
    // Integration with Foreign Bird payment system
  };

  const generateMembershipCard = (member: Member) => {
    console.log('Generating membership card for:', member.name);
    // Integration with ARVIPOA smart card system
  };

  return (
    <div className="min-h-screen p-4" style={{ background: 'linear-gradient(135deg, #0a1a1a 0%, #1a2f2f 100%)' }}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full flex items-center justify-center border border-cyan-300/50">
              <Church className="w-8 h-8 text-gray-900" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold text-cyan-300">CHRIST EMBASSY</h1>
              <p className="text-gray-400">Religious Beliefs and Faith System</p>
            </div>
            <div className="text-right text-cyan-400 text-sm font-semibold">
              ARVIPOA
            </div>
          </div>
          
          {/* Day Navigation */}
          <div className="flex justify-center gap-2 mb-6">
            {['SUNDAY', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SU'].map((day, index) => (
              <Button
                key={day}
                variant={index === 0 ? 'default' : 'outline'}
                className={`px-6 py-2 rounded-full ${
                  index === 0 
                    ? 'bg-cyan-600 hover:bg-cyan-700 text-white border-cyan-400' 
                    : 'bg-gray-700/50 hover:bg-gray-600/50 text-cyan-300 border-cyan-500/30'
                }`}
              >
                {day}
              </Button>
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-4">
            <Button 
              variant={selectedOrgType === 'church' ? 'default' : 'outline'}
              onClick={() => setSelectedOrgType('church')}
              className={`${
                selectedOrgType === 'church'
                  ? 'bg-cyan-600 hover:bg-cyan-700 text-white border-cyan-400'
                  : 'bg-gray-700/50 hover:bg-gray-600/50 text-cyan-300 border-cyan-500/30'
              }`}
            >
              ChurchID.org
            </Button>
            <Button 
              variant={selectedOrgType === 'mosque' ? 'default' : 'outline'}
              onClick={() => setSelectedOrgType('mosque')}
              className={`${
                selectedOrgType === 'mosque'
                  ? 'bg-cyan-600 hover:bg-cyan-700 text-white border-cyan-400'
                  : 'bg-gray-700/50 hover:bg-gray-600/50 text-cyan-300 border-cyan-500/30'
              }`}
            >
              MosqueID.org
            </Button>
            <Button 
              variant={selectedOrgType === 'temple' ? 'default' : 'outline'}
              onClick={() => setSelectedOrgType('temple')}
              className={`${
                selectedOrgType === 'temple'
                  ? 'bg-cyan-600 hover:bg-cyan-700 text-white border-cyan-400'
                  : 'bg-gray-700/50 hover:bg-gray-600/50 text-cyan-300 border-cyan-500/30'
              }`}
            >
              TempleID.org
            </Button>
          </div>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30">
            <TabsTrigger value="overview" className="text-cyan-300 data-[state=active]:bg-cyan-600 data-[state=active]:text-white">Overview</TabsTrigger>
            <TabsTrigger value="register" className="text-cyan-300 data-[state=active]:bg-cyan-600 data-[state=active]:text-white">Register Org</TabsTrigger>
            <TabsTrigger value="services" className="text-cyan-300 data-[state=active]:bg-cyan-600 data-[state=active]:text-white">Services</TabsTrigger>
            <TabsTrigger value="members" className="text-cyan-300 data-[state=active]:bg-cyan-600 data-[state=active]:text-white">Members</TabsTrigger>
            <TabsTrigger value="donations" className="text-cyan-300 data-[state=active]:bg-cyan-600 data-[state=active]:text-white">Donations</TabsTrigger>
            <TabsTrigger value="marketplace" className="text-cyan-300 data-[state=active]:bg-cyan-600 data-[state=active]:text-white">Marketplace</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {organizations.map((org) => (
                <Card key={org.id} className="bg-gray-800/50 backdrop-blur-sm border-cyan-500/30">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <img src={org.logo} alt={org.name} className="w-16 h-16 rounded-full border border-cyan-400/50" />
                      <div>
                        <CardTitle className="text-cyan-300">{org.name}</CardTitle>
                        <p className="text-gray-400 text-sm">{org.type}</p>
                        <p className="text-cyan-400 text-xs flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {org.address}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-cyan-500/20 rounded-lg p-3 border border-cyan-400/30">
                        <Users className="w-6 h-6 text-cyan-400 mx-auto mb-1" />
                        <div className="text-cyan-300 font-semibold">{org.members}</div>
                        <div className="text-gray-400 text-xs">Members</div>
                      </div>
                      <div className="bg-teal-500/20 rounded-lg p-3 border border-teal-400/30">
                        <Church className="w-6 h-6 text-teal-400 mx-auto mb-1" />
                        <div className="text-teal-300 font-semibold">{org.branches.length}</div>
                        <div className="text-gray-400 text-xs">Branches</div>
                      </div>
                    </div>
                    
                    {/* Live Stream and Encrypted Donation */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-lg p-4 border border-yellow-500/30">
                        <Video className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                        <h4 className="text-yellow-300 font-semibold text-center mb-2">CHRIST EMBASSY</h4>
                        <Button size="sm" className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
                          <Video className="w-4 h-4 mr-2" />
                          Watch Live
                        </Button>
                      </div>
                      
                      <div className="bg-gradient-to-r from-cyan-600/20 to-teal-600/20 rounded-lg p-4 border border-cyan-500/30">
                        <Lock className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                        <h4 className="text-cyan-300 font-semibold text-center mb-2">ENCRYPTED DONATION</h4>
                        <Button size="sm" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white">
                          <Gift className="w-4 h-4 mr-2" />
                          Donate Now
                        </Button>
                      </div>
                    </div>

                    {/* Membership Actions */}
                    <div className="space-y-2">
                      <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white border border-cyan-400">
                        JOIN AS MEMBER
                      </Button>
                      <Button variant="outline" className="w-full bg-gray-700/50 hover:bg-gray-600/50 text-cyan-300 border-cyan-500/30">
                        DONATE ANONYMOUSLY
                        <span className="text-xs text-gray-400 block">
                          (even RBF Church ID BLW cannot see your identity during donation) only God does
                        </span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Member Profile Card and Quick Actions */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* ARVIPOA Smart Card */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border-cyan-500/30">
                <CardHeader>
                  <CardTitle className="text-cyan-300">ARVIPOA Smart Card</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl p-6 border border-cyan-400/50">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-cyan-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">JD</span>
                      </div>
                      <div>
                        <h3 className="text-cyan-300 font-bold">JOHN DOE</h3>
                        <p className="text-gray-400 text-sm">(BLWCHURCHID)</p>
                      </div>
                    </div>
                    <div className="text-cyan-400 text-xs">
                      ARVIPOA SMART
                    </div>
                    <div className="text-gray-400 text-xs mt-2">
                      Member since 2023 • Verified Address
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Summary */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border-cyan-500/30">
                <CardHeader>
                  <CardTitle className="text-cyan-300">Stats / History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Total Donations</span>
                      <span className="text-cyan-300 font-bold">¢700</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">This Month</span>
                      <span className="text-cyan-300">¢150 GHS</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <Button 
                        className="bg-cyan-600 hover:bg-cyan-700 text-white border border-cyan-400"
                        onClick={() => sendDonation(100, 'Tithe', true)}
                      >
                        Donate / Pay
                      </Button>
                      <Button 
                        variant="outline" 
                        className="bg-gray-700/50 hover:bg-gray-600/50 text-cyan-300 border-cyan-500/30"
                      >
                        Reverse Selection
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Register Organization Tab */}
          <TabsContent value="register" className="space-y-6">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-cyan-500/30">
              <CardHeader>
                <CardTitle className="text-cyan-300">Register Religious Organization</CardTitle>
                <p className="text-gray-400">All organizations must have verified property addresses via ARVIPOA</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-cyan-300 font-semibold mb-2 block">Organization Name</label>
                    <Input
                      placeholder="Enter organization name"
                      value={newOrganization.name}
                      onChange={(e) => setNewOrganization({...newOrganization, name: e.target.value})}
                      className="bg-gray-800/50 border-cyan-500/30 text-cyan-300 placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="text-cyan-300 font-semibold mb-2 block">Organization Type</label>
                    <select
                      value={newOrganization.type}
                      onChange={(e) => setNewOrganization({...newOrganization, type: e.target.value})}
                      className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-cyan-300"
                    >
                      <option value="church">Church</option>
                      <option value="mosque">Mosque</option>
                      <option value="temple">Temple</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-cyan-300 font-semibold mb-2 block">ARVIPOA Verified Address</label>
                  <Input
                    placeholder="Enter registered property address"
                    value={newOrganization.address}
                    onChange={(e) => setNewOrganization({...newOrganization, address: e.target.value})}
                    className="bg-gray-800/50 border-cyan-500/30 text-cyan-300 placeholder-gray-400"
                  />
                  <p className="text-cyan-400 text-sm mt-1">Address will be verified against ARVIPOA property database</p>
                </div>

                <div>
                  <label className="text-white font-semibold mb-2 block">Pastor/Leader Name</label>
                  <Input
                    placeholder="Enter leader name"
                    value={newOrganization.pastor}
                    onChange={(e) => setNewOrganization({...newOrganization, pastor: e.target.value})}
                    className="bg-black/50 border-gray-600 text-white"
                  />
                </div>

                <div>
                  <label className="text-white font-semibold mb-2 block">Description</label>
                  <Textarea
                    placeholder="Enter organization description"
                    value={newOrganization.description}
                    onChange={(e) => setNewOrganization({...newOrganization, description: e.target.value})}
                    className="bg-black/50 border-gray-600 text-white"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="text-white font-semibold mb-2 block">Logo Upload</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setNewOrganization({...newOrganization, logo: e.target.files?.[0] || null})}
                      className="hidden"
                      id="logo-upload"
                    />
                    <label htmlFor="logo-upload">
                      <Button variant="outline" className="cursor-pointer">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Logo
                      </Button>
                    </label>
                    {newOrganization.logo && (
                      <span className="text-green-400 text-sm">Logo selected</span>
                    )}
                  </div>
                </div>

                <Button 
                  onClick={handleRegisterOrganization}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Register Organization
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              
              {/* Live Streaming */}
              <Card className="bg-black/40 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Video className="w-5 h-5" />
                    Live Streaming Services
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isLiveStreaming ? (
                    <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 text-center">
                      <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Video className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-white font-semibold">LIVE NOW</div>
                      <div className="text-gray-300 text-sm">Broadcasting to 45 viewers</div>
                      <Button 
                        onClick={() => setIsLiveStreaming(false)}
                        variant="outline" 
                        className="mt-3"
                      >
                        End Stream
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      onClick={startLiveStream}
                      className="w-full h-20 bg-red-600 hover:bg-red-700"
                    >
                      <Video className="w-6 h-6 mr-2" />
                      Start Live Service
                    </Button>
                  )}
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" size="sm">
                      <Camera className="w-4 h-4 mr-2" />
                      Record
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Scheduled Services */}
              <Card className="bg-black/40 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Scheduled Services
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {organizations[0].services.map((service) => (
                      <div key={service.id} className="bg-white/5 rounded-lg p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="text-white font-semibold">{service.title}</div>
                            <div className="text-gray-400 text-sm">{service.description}</div>
                            <div className="text-blue-400 text-sm">{service.date} at {service.time}</div>
                          </div>
                          <Button size="sm" variant="outline">
                            <Bell className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule New Service
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members" className="space-y-6">
            <Card className="bg-black/40 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Member Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <Button className="h-20 flex-col bg-green-600 hover:bg-green-700">
                    <Users className="w-6 h-6 mb-2" />
                    Add Member
                  </Button>
                  <Button className="h-20 flex-col bg-blue-600 hover:bg-blue-700">
                    <CreditCard className="w-6 h-6 mb-2" />
                    Generate Card
                  </Button>
                  <Button className="h-20 flex-col bg-purple-600 hover:bg-purple-700">
                    <MessageCircle className="w-6 h-6 mb-2" />
                    Send Message
                  </Button>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-3">Recent Members</h3>
                  <div className="space-y-2">
                    {[
                      { name: 'John Doe', joined: '2025-06-01', contributions: 'GHS 1,200' },
                      { name: 'Jane Smith', joined: '2025-05-28', contributions: 'GHS 800' },
                      { name: 'David Wilson', joined: '2025-05-25', contributions: 'GHS 950' }
                    ].map((member, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-black/20 rounded">
                        <div>
                          <div className="text-white font-medium">{member.name}</div>
                          <div className="text-gray-400 text-sm">Joined: {member.joined}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-green-400 font-medium">{member.contributions}</div>
                          <Button size="sm" variant="outline">
                            <CreditCard className="w-3 h-3 mr-1" />
                            Card
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Donations Tab */}
          <TabsContent value="donations" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              
              {/* Donation Interface */}
              <Card className="bg-black/40 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Send Donation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-white font-semibold mb-2 block">Donation Type</label>
                    <select className="w-full p-3 bg-black/50 border border-gray-600 rounded-lg text-white">
                      <option>Tithe</option>
                      <option>Offering</option>
                      <option>First Fruit</option>
                      <option>Building Project</option>
                      <option>Special Offering</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-white font-semibold mb-2 block">Amount</label>
                    <Input
                      placeholder="Enter amount"
                      className="bg-black/50 border-gray-600 text-white"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-white">Encrypted Donation</span>
                    <Button variant="outline" size="sm">
                      <Lock className="w-4 h-4" />
                    </Button>
                  </div>

                  <Button 
                    onClick={() => sendDonation(100, 'Tithe', false)}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600"
                  >
                    Send via Foreign Bird Payment
                  </Button>
                </CardContent>
              </Card>

              {/* Donation History */}
              <Card className="bg-black/40 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Recent Donations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {organizations[0].donations.map((donation) => (
                      <div key={donation.id} className="bg-white/5 rounded-lg p-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-white font-semibold">
                              {donation.currency} {donation.amount}
                            </div>
                            <div className="text-gray-400 text-sm">{donation.type}</div>
                            <div className="text-gray-500 text-xs">{donation.date}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-gray-300 text-sm">{donation.donor}</div>
                            {donation.encrypted && (
                              <div className="text-yellow-400 text-xs flex items-center gap-1">
                                <Lock className="w-3 h-3" />
                                Encrypted
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Marketplace Tab */}
          <TabsContent value="marketplace" className="space-y-6">
            <Card className="bg-black/40 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Religious Items Marketplace
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { name: 'Holy Books', price: 'GHS 25', image: '📖' },
                    { name: 'Prayer Mats', price: 'GHS 45', image: '🕌' },
                    { name: 'Candles', price: 'GHS 15', image: '🕯️' },
                    { name: 'Religious Art', price: 'GHS 80', image: '🖼️' },
                    { name: 'Audio CDs', price: 'GHS 20', image: '💿' },
                    { name: 'Jewelry', price: 'GHS 60', image: '📿' }
                  ].map((item, index) => (
                    <Card key={index} className="bg-white/5 border-gray-600">
                      <CardContent className="p-4 text-center">
                        <div className="text-4xl mb-3">{item.image}</div>
                        <div className="text-white font-semibold">{item.name}</div>
                        <div className="text-green-400 font-bold">{item.price}</div>
                        <Button size="sm" className="mt-2 w-full">
                          Add to Cart
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}