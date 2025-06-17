import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PmbUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  relationship: string;
}

export default function PmbRegistrationForm() {
  const [formData, setFormData] = useState<{
    pmbNumber: string;
    permitNumber: string;
    dateOfIssue: string;
    expiryDate: string;
    users: PmbUser[];
  }>({
    pmbNumber: '',
    permitNumber: '',
    dateOfIssue: '',
    expiryDate: '',
    users: []
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addUser = () => {
    const newUser: PmbUser = {
      id: Date.now().toString(),
      name: '',
      email: '',
      phone: '',
      relationship: ''
    };
    setFormData(prev => ({
      ...prev,
      users: [...prev.users, newUser]
    }));
  };

  const removeUser = (userId: string) => {
    setFormData(prev => ({
      ...prev,
      users: prev.users.filter(user => user.id !== userId)
    }));
  };

  const updateUser = (userId: string, field: keyof PmbUser, value: string) => {
    setFormData(prev => ({
      ...prev,
      users: prev.users.map(user => 
        user.id === userId ? { ...user, [field]: value } : user
      )
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('PMB registration data:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center space-x-3">
            <Mail className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">PMB Registration</h1>
          </div>
          <p className="text-gray-600 mt-2">Register Private Mail Bag services with ARVIPOA</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <CardTitle className="flex items-center space-x-2">
              <Mail className="w-6 h-6" />
              <span>PMB Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* PMB Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="pmbNumber">PMB Number</Label>
                  <Input
                    id="pmbNumber"
                    value={formData.pmbNumber}
                    onChange={(e) => handleInputChange('pmbNumber', e.target.value)}
                    placeholder="Enter PMB number"
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="permitNumber">Permit Number</Label>
                  <Input
                    id="permitNumber"
                    value={formData.permitNumber}
                    onChange={(e) => handleInputChange('permitNumber', e.target.value)}
                    placeholder="Enter permit number"
                    className="mt-1"
                    required
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="dateOfIssue">Date of Issue</Label>
                  <Input
                    id="dateOfIssue"
                    type="date"
                    value={formData.dateOfIssue}
                    onChange={(e) => handleInputChange('dateOfIssue', e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
              </div>

              {/* Users Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">PMB Users</h3>
                  <Button type="button" onClick={addUser} className="flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Add User</span>
                  </Button>
                </div>

                {formData.users.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No users added yet. Click "Add User" to begin.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {formData.users.map((user, index) => (
                      <Card key={user.id} className="border-2 border-gray-200">
                        <CardHeader className="bg-gray-50 py-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900">User {index + 1}</h4>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeUser(user.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor={`user-name-${user.id}`}>Full Name</Label>
                              <Input
                                id={`user-name-${user.id}`}
                                value={user.name}
                                onChange={(e) => updateUser(user.id, 'name', e.target.value)}
                                placeholder="Enter full name"
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label htmlFor={`user-email-${user.id}`}>Email Address</Label>
                              <Input
                                id={`user-email-${user.id}`}
                                type="email"
                                value={user.email}
                                onChange={(e) => updateUser(user.id, 'email', e.target.value)}
                                placeholder="Enter email address"
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label htmlFor={`user-phone-${user.id}`}>Phone Number</Label>
                              <Input
                                id={`user-phone-${user.id}`}
                                value={user.phone}
                                onChange={(e) => updateUser(user.id, 'phone', e.target.value)}
                                placeholder="Enter phone number"
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label htmlFor={`user-relationship-${user.id}`}>Relationship to PMB</Label>
                              <Input
                                id={`user-relationship-${user.id}`}
                                value={user.relationship}
                                onChange={(e) => updateUser(user.id, 'relationship', e.target.value)}
                                placeholder="e.g., Owner, Authorized User, Family Member"
                                className="mt-1"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-6">
                <Button type="button" variant="outline" asChild>
                  <Link to="/">Cancel</Link>
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Register PMB
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}