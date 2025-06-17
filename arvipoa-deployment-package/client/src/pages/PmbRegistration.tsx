import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Users, MailIcon } from 'lucide-react';

interface PmbUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export default function PmbRegistration() {
  const [formData, setFormData] = useState({
    pmbNumber: '',
    permitNumber: '',
    issueDate: '',
    expiryDate: ''
  });

  const [pmbUsers, setPmbUsers] = useState<PmbUser[]>([]);

  const addUser = () => {
    const newUser: PmbUser = {
      id: Date.now().toString(),
      name: '',
      email: '',
      phone: '',
      address: ''
    };
    setPmbUsers([...pmbUsers, newUser]);
  };

  const updateUser = (id: string, field: string, value: string) => {
    setPmbUsers(prev => 
      prev.map(user => 
        user.id === id ? { ...user, [field]: value } : user
      )
    );
  };

  const removeUser = (id: string) => {
    setPmbUsers(prev => prev.filter(user => user.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('PMB Registration Data:', { formData, pmbUsers });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-white shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <CardTitle className="flex items-center space-x-2">
              <MailIcon className="w-6 h-6" />
              <span>PMB Registration Form</span>
            </CardTitle>
          </CardHeader>
        </Card>

        {/* PMB Registration Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MailIcon className="w-5 h-5" />
              <span>PMB Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pmbNumber">PMB Number</Label>
                  <Input
                    id="pmbNumber"
                    value={formData.pmbNumber}
                    onChange={(e) => setFormData({ ...formData, pmbNumber: e.target.value })}
                    placeholder="Enter PMB number"
                  />
                </div>

                <div>
                  <Label htmlFor="permitNumber">Permit Number</Label>
                  <Input
                    id="permitNumber"
                    value={formData.permitNumber}
                    onChange={(e) => setFormData({ ...formData, permitNumber: e.target.value })}
                    placeholder="Enter permit number"
                  />
                </div>

                <div>
                  <Label htmlFor="issueDate">Date of Issue</Label>
                  <Input
                    type="date"
                    id="issueDate"
                    value={formData.issueDate}
                    onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    type="date"
                    id="expiryDate"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  />
                </div>
              </div>

              {/* PMB Users Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-lg font-semibold">Add Users to This Property</Label>
                  <Button type="button" onClick={addUser} className="flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Add User</span>
                  </Button>
                </div>

                {pmbUsers.map((user, index) => (
                  <Card key={user.id} className="border-l-4 border-purple-500">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center justify-between">
                        <span className="flex items-center space-x-2">
                          <Users className="w-5 h-5" />
                          <span>User {index + 1}</span>
                        </span>
                        <Button 
                          type="button" 
                          variant="destructive" 
                          size="sm"
                          onClick={() => removeUser(user.id)}
                        >
                          Remove
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`name-${user.id}`}>Full Name</Label>
                          <Input
                            id={`name-${user.id}`}
                            value={user.name}
                            onChange={(e) => updateUser(user.id, 'name', e.target.value)}
                            placeholder="Enter full name"
                          />
                        </div>

                        <div>
                          <Label htmlFor={`email-${user.id}`}>Email Address</Label>
                          <Input
                            type="email"
                            id={`email-${user.id}`}
                            value={user.email}
                            onChange={(e) => updateUser(user.id, 'email', e.target.value)}
                            placeholder="Enter email address"
                          />
                        </div>

                        <div>
                          <Label htmlFor={`phone-${user.id}`}>Phone Number</Label>
                          <Input
                            id={`phone-${user.id}`}
                            value={user.phone}
                            onChange={(e) => updateUser(user.id, 'phone', e.target.value)}
                            placeholder="Enter phone number"
                          />
                        </div>

                        <div>
                          <Label htmlFor={`address-${user.id}`}>Address</Label>
                          <Input
                            id={`address-${user.id}`}
                            value={user.address}
                            onChange={(e) => updateUser(user.id, 'address', e.target.value)}
                            placeholder="Enter address"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {pmbUsers.length === 0 && (
                  <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <Users className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600">No users added yet. Click "Add User" to start.</p>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-center space-x-4 pt-6">
                <Button type="submit" size="lg" className="px-8">
                  Register PMB
                </Button>
                <Button type="button" size="lg" variant="outline" className="px-8">
                  Save as Draft
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}