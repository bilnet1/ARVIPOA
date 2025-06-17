import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
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
  Filter
} from 'lucide-react';

interface AnimalRecord {
  id: string;
  name: string;
  type: string;
  owner: string;
  registrationDate: string;
  status: 'pending' | 'approved' | 'rejected';
  vaccineStatus: 'current' | 'expired' | 'pending';
}

export default function VetOfficerLogin() {
  const [loginData, setLoginData] = useState({
    licenseNumber: '',
    vetId: '',
    phone: '',
    email: '',
    password: '',
    region: '',
    district: ''
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Sample animal records for demonstration
  const [animalRecords] = useState<AnimalRecord[]>([
    {
      id: 'ANIMAL-12345678',
      name: 'Buddy',
      type: 'Dog',
      owner: 'John Doe',
      registrationDate: '2024-01-15',
      status: 'pending',
      vaccineStatus: 'current'
    },
    {
      id: 'ANIMAL-87654321',
      name: 'Whiskers',
      type: 'Cat',
      owner: 'Jane Smith',
      registrationDate: '2024-01-10',
      status: 'approved',
      vaccineStatus: 'expired'
    },
    {
      id: 'ANIMAL-11223344',
      name: 'Bessie',
      type: 'Cattle',
      owner: 'Farm Co Ltd',
      registrationDate: '2024-01-08',
      status: 'pending',
      vaccineStatus: 'pending'
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
    if (loginData.licenseNumber && loginData.vetId && loginData.password) {
      setIsLoggedIn(true);
      console.log('Vet officer logged in:', loginData);
    }
  };

  const handleRecordAction = (animalId: string, action: 'approve' | 'reject' | 'edit') => {
    console.log(`${action} record for animal:`, animalId);
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      current: 'bg-green-100 text-green-800',
      expired: 'bg-red-100 text-red-800'
    };
    return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800';
  };

  const filteredRecords = animalRecords.filter(record => {
    const matchesSearch = record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || record.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="max-w-md mx-auto mt-20">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-6 h-6" />
                <span>Veterinary Officer Login</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="licenseNumber">Veterinary License Number</Label>
                  <Input
                    id="licenseNumber"
                    value={loginData.licenseNumber}
                    onChange={(e) => setLoginData({ ...loginData, licenseNumber: e.target.value })}
                    placeholder="Enter license number"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="vetId">Vet Officer ID</Label>
                  <Input
                    id="vetId"
                    value={loginData.vetId}
                    onChange={(e) => setLoginData({ ...loginData, vetId: e.target.value })}
                    placeholder="Enter vet officer ID"
                    required
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
                  Login as Vet Officer
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Shield className="w-6 h-6" />
                <div>
                  <CardTitle>Veterinary Officer Dashboard</CardTitle>
                  <p className="text-green-100">Welcome, Dr. {loginData.licenseNumber}</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setIsLoggedIn(false)}
                className="text-white border-white hover:bg-white hover:text-green-600"
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
            <TabsTrigger value="pending">Pending Reviews</TabsTrigger>
            <TabsTrigger value="approved">Approved Animals</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <AlertCircle className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
                      <p className="text-2xl font-bold">
                        {animalRecords.filter(r => r.status === 'pending').length}
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
                      <p className="text-sm font-medium text-gray-600">Approved</p>
                      <p className="text-2xl font-bold">
                        {animalRecords.filter(r => r.status === 'approved').length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <AlertCircle className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Vaccine Expired</p>
                      <p className="text-2xl font-bold">
                        {animalRecords.filter(r => r.vaccineStatus === 'expired').length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FileCheck className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Records</p>
                      <p className="text-2xl font-bold">{animalRecords.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Animal Registrations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {animalRecords.slice(0, 3).map((record) => (
                    <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          🐾
                        </div>
                        <div>
                          <p className="font-medium">{record.name} ({record.type})</p>
                          <p className="text-sm text-gray-600">Owner: {record.owner}</p>
                          <p className="text-sm text-gray-600">ID: {record.id}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusBadge(record.status)}>
                          {record.status}
                        </Badge>
                        <Badge className={getStatusBadge(record.vaccineStatus)}>
                          Vaccine: {record.vaccineStatus}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Animal Registrations</CardTitle>
                <div className="flex space-x-4">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <Input
                      placeholder="Search animals..."
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
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredRecords.filter(r => r.status === 'pending').map((record) => (
                    <div key={record.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl">
                            🐾
                          </div>
                          <div>
                            <p className="font-medium text-lg">{record.name}</p>
                            <p className="text-gray-600">Type: {record.type}</p>
                            <p className="text-gray-600">Owner: {record.owner}</p>
                            <p className="text-gray-600">Registration Date: {record.registrationDate}</p>
                            <p className="text-gray-600">ID: {record.id}</p>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Button 
                            size="sm" 
                            onClick={() => handleRecordAction(record.id, 'approve')}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleRecordAction(record.id, 'reject')}
                          >
                            <AlertCircle className="w-4 h-4 mr-2" />
                            Reject
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleRecordAction(record.id, 'edit')}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Review
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approved" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Approved Animal Registrations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredRecords.filter(r => r.status === 'approved').map((record) => (
                    <div key={record.id} className="p-4 border rounded-lg bg-green-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center text-xl">
                            ✓
                          </div>
                          <div>
                            <p className="font-medium text-lg">{record.name}</p>
                            <p className="text-gray-600">Type: {record.type}</p>
                            <p className="text-gray-600">Owner: {record.owner}</p>
                            <p className="text-gray-600">ID: {record.id}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusBadge(record.vaccineStatus)}>
                            Vaccine: {record.vaccineStatus}
                          </Badge>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Veterinary Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 border rounded-lg">
                    <h3 className="font-medium mb-4">Monthly Registration Summary</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Dogs:</span>
                        <span className="font-medium">45</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cats:</span>
                        <span className="font-medium">32</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Livestock:</span>
                        <span className="font-medium">28</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Others:</span>
                        <span className="font-medium">15</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border rounded-lg">
                    <h3 className="font-medium mb-4">Vaccination Status</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Up to date:</span>
                        <span className="font-medium text-green-600">89</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Expired:</span>
                        <span className="font-medium text-red-600">21</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pending:</span>
                        <span className="font-medium text-yellow-600">10</span>
                      </div>
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