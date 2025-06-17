import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, 
  UserCheck, 
  Phone, 
  Mail, 
  MapPin, 
  FileCheck, 
  AlertCircle,
  CheckCircle,
  Eye,
  Edit,
  Search,
  Filter,
  Beef,
  Scale,
  Calendar,
  Clock,
  Shield
} from 'lucide-react';

interface SlaughterRecord {
  id: string;
  animalId: string;
  ownerName: string;
  slaughterDate: string;
  slaughterTime: string;
  meatAcquiredKg: number;
  expiryDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  vaccinated: boolean;
  reason: string;
}

export default function SlaughterHouseLogin() {
  const [loginData, setLoginData] = useState({
    businessLicense: '',
    slaughterHouseId: '',
    operatorName: '',
    phone: '',
    email: '',
    password: '',
    region: '',
    district: '',
    address: ''
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Sample slaughter records for demonstration
  const [slaughterRecords] = useState<SlaughterRecord[]>([
    {
      id: 'SL-001234',
      animalId: 'SL174914001234',
      ownerName: 'John Farmer',
      slaughterDate: '2024-01-15',
      slaughterTime: '09:30',
      meatAcquiredKg: 180.5,
      expiryDate: '2024-01-22',
      status: 'approved',
      vaccinated: true,
      reason: 'Commercial processing'
    },
    {
      id: 'SL-001235',
      animalId: 'SL174914001235',
      ownerName: 'Mary Johnson',
      slaughterDate: '2024-01-16',
      slaughterTime: '11:15',
      meatAcquiredKg: 95.2,
      expiryDate: '2024-01-23',
      status: 'pending',
      vaccinated: true,
      reason: 'Food consumption'
    },
    {
      id: 'SL-001236',
      animalId: 'SL174914001236',
      ownerName: 'Ahmed Hassan',
      slaughterDate: '2024-01-17',
      slaughterTime: '14:45',
      meatAcquiredKg: 220.8,
      expiryDate: '2024-01-24',
      status: 'approved',
      vaccinated: false,
      reason: 'Religious ceremony'
    }
  ]);

  const ghanaRegions = [
    'Greater Accra', 'Ashanti', 'Western', 'Central', 'Volta', 'Eastern', 
    'Northern', 'Upper East', 'Upper West', 'Brong-Ahafo', 'Western North',
    'Ahafo', 'Bono East', 'Oti', 'North East', 'Savannah'
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login validation
    if (loginData.businessLicense && loginData.slaughterHouseId && loginData.password) {
      setIsLoggedIn(true);
      console.log('Slaughter house operator logged in:', loginData);
    }
  };

  const handleRecordAction = (recordId: string, action: 'approve' | 'reject' | 'edit') => {
    console.log(`${action} record for slaughter:`, recordId);
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      expired: 'bg-gray-100 text-gray-800'
    };
    return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800';
  };

  const filteredRecords = slaughterRecords.filter(record => {
    const matchesSearch = record.animalId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || record.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 p-4">
        <div className="max-w-md mx-auto mt-20">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-red-600 to-orange-600 text-white">
              <CardTitle className="flex items-center space-x-2">
                <Building2 className="w-6 h-6" />
                <span>Slaughter House Login</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="businessLicense">Business License Number</Label>
                  <Input
                    id="businessLicense"
                    value={loginData.businessLicense}
                    onChange={(e) => setLoginData({ ...loginData, businessLicense: e.target.value })}
                    placeholder="Enter business license number"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="slaughterHouseId">Slaughter House ID</Label>
                  <Input
                    id="slaughterHouseId"
                    value={loginData.slaughterHouseId}
                    onChange={(e) => setLoginData({ ...loginData, slaughterHouseId: e.target.value })}
                    placeholder="Enter slaughter house ID"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="operatorName">Operator Name</Label>
                  <Input
                    id="operatorName"
                    value={loginData.operatorName}
                    onChange={(e) => setLoginData({ ...loginData, operatorName: e.target.value })}
                    placeholder="Enter operator name"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={loginData.phone}
                    onChange={(e) => setLoginData({ ...loginData, phone: e.target.value })}
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    type="email"
                    id="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <Label htmlFor="region">Region</Label>
                  <Select value={loginData.region} onValueChange={(value) => setLoginData({ ...loginData, region: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      {ghanaRegions.map((region) => (
                        <SelectItem key={region} value={region}>{region}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="district">District</Label>
                  <Input
                    id="district"
                    value={loginData.district}
                    onChange={(e) => setLoginData({ ...loginData, district: e.target.value })}
                    placeholder="Enter district"
                  />
                </div>

                <div>
                  <Label htmlFor="address">Facility Address</Label>
                  <Input
                    id="address"
                    value={loginData.address}
                    onChange={(e) => setLoginData({ ...loginData, address: e.target.value })}
                    placeholder="Enter facility address"
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    placeholder="Enter password"
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  <UserCheck className="w-4 h-4 mr-2" />
                  Login to Slaughter House System
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-red-600 to-orange-600 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Building2 className="w-6 h-6" />
                <div>
                  <CardTitle>Slaughter House Management System</CardTitle>
                  <p className="text-red-100">Welcome, {loginData.operatorName || loginData.slaughterHouseId}</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setIsLoggedIn(false)}
                className="text-white border-white hover:bg-white hover:text-red-600"
              >
                Logout
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="slaughter-records">Slaughter Records</TabsTrigger>
            <TabsTrigger value="inventory">Meat Inventory</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <Beef className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Today's Slaughters</p>
                      <p className="text-2xl font-bold">
                        {slaughterRecords.filter(r => r.slaughterDate === new Date().toISOString().split('T')[0]).length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Approved Records</p>
                      <p className="text-2xl font-bold">
                        {slaughterRecords.filter(r => r.status === 'approved').length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <AlertCircle className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Pending</p>
                      <p className="text-2xl font-bold">
                        {slaughterRecords.filter(r => r.status === 'pending').length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Scale className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Meat (KG)</p>
                      <p className="text-2xl font-bold">
                        {slaughterRecords.reduce((sum, r) => sum + r.meatAcquiredKg, 0).toFixed(1)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Slaughter Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {slaughterRecords.slice(0, 3).map((record) => (
                    <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-red-200 rounded-full flex items-center justify-center">
                          🥩
                        </div>
                        <div>
                          <p className="font-medium">Animal ID: {record.animalId}</p>
                          <p className="text-sm text-gray-600">Owner: {record.ownerName}</p>
                          <p className="text-sm text-gray-600">Date: {record.slaughterDate} at {record.slaughterTime}</p>
                          <p className="text-sm text-gray-600">Meat: {record.meatAcquiredKg} KG</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusBadge(record.status)}>
                          {record.status}
                        </Badge>
                        {record.vaccinated && (
                          <Badge className="bg-green-100 text-green-800">
                            <Shield className="w-3 h-3 mr-1" />
                            Vaccinated
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="slaughter-records" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Slaughter Records Management</CardTitle>
                <div className="flex space-x-4">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <Input
                      placeholder="Search records..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredRecords.map((record) => (
                    <div key={record.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-red-200 rounded-full flex items-center justify-center text-xl">
                            🥩
                          </div>
                          <div>
                            <p className="font-medium text-lg">Record ID: {record.id}</p>
                            <p className="text-gray-600">Animal ID: {record.animalId}</p>
                            <p className="text-gray-600">Owner: {record.ownerName}</p>
                            <p className="text-gray-600">Slaughter Date: {record.slaughterDate} at {record.slaughterTime}</p>
                            <p className="text-gray-600">Meat Acquired: {record.meatAcquiredKg} KG</p>
                            <p className="text-gray-600">Expires: {record.expiryDate}</p>
                            <p className="text-gray-600">Reason: {record.reason}</p>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Badge className={getStatusBadge(record.status)}>
                            {record.status}
                          </Badge>
                          {record.vaccinated && (
                            <Badge className="bg-green-100 text-green-800">
                              <Shield className="w-3 h-3 mr-1" />
                              Vaccinated
                            </Badge>
                          )}
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleRecordAction(record.id, 'edit')}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleRecordAction(record.id, 'edit')}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Meat Inventory Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 border rounded-lg">
                    <h3 className="font-medium mb-4">Current Inventory</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Beef:</span>
                        <span className="font-medium">245.5 KG</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Mutton:</span>
                        <span className="font-medium">89.2 KG</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Goat:</span>
                        <span className="font-medium">67.8 KG</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Others:</span>
                        <span className="font-medium">34.1 KG</span>
                      </div>
                      <hr className="my-2" />
                      <div className="flex justify-between font-bold">
                        <span>Total:</span>
                        <span>436.6 KG</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border rounded-lg">
                    <h3 className="font-medium mb-4">Expiring Soon</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Record SL-001234:</span>
                        <Badge className="bg-yellow-100 text-yellow-800">2 days left</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Record SL-001235:</span>
                        <Badge className="bg-yellow-100 text-yellow-800">3 days left</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Record SL-001236:</span>
                        <Badge className="bg-green-100 text-green-800">5 days left</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Compliance & Safety Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 border rounded-lg">
                    <h3 className="font-medium mb-4">Health & Safety Compliance</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Vaccination Records:</span>
                        <Badge className="bg-green-100 text-green-800">
                          {slaughterRecords.filter(r => r.vaccinated).length}/{slaughterRecords.length}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Temperature Monitoring:</span>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Hygiene Standards:</span>
                        <Badge className="bg-green-100 text-green-800">Compliant</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Waste Management:</span>
                        <Badge className="bg-green-100 text-green-800">Compliant</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border rounded-lg">
                    <h3 className="font-medium mb-4">Regulatory Reports</h3>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <FileCheck className="w-4 h-4 mr-2" />
                        Monthly Compliance Report
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <FileCheck className="w-4 h-4 mr-2" />
                        Vaccination Summary
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <FileCheck className="w-4 h-4 mr-2" />
                        Meat Quality Report
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <FileCheck className="w-4 h-4 mr-2" />
                        Waste Management Log
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}