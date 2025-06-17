import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Heart, 
  Plane,
  Settings,
  FileText,
  Edit,
  Plus,
  Eye,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Shield,
  CreditCard,
  Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function UserProfileDashboard() {
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+233 24 123 4567',
    address: 'GA-123-4567, East Legon, Accra',
    profileCompletion: 75,
    lifestyleCompleted: false,
    visaApplications: 2,
    lastLogin: '2024-06-06'
  });

  const profileSections = [
    {
      id: 'lifestyle',
      title: 'Add Lifestyle',
      description: 'Complete your lifestyle preferences and habits',
      icon: Heart,
      color: 'pink',
      route: '/lifestyle-profile',
      completed: userProfile.lifestyleCompleted,
      priority: 'high'
    },
    {
      id: 'visa',
      title: 'Visa Applications',
      description: 'Manage guest visa applications and invitations',
      icon: Plane,
      color: 'cyan',
      route: '/visa-application',
      completed: userProfile.visaApplications > 0,
      priority: 'medium'
    },
    {
      id: 'documents',
      title: 'Personal Documents',
      description: 'Upload and manage identification documents',
      icon: FileText,
      color: 'blue',
      route: '/documents',
      completed: false,
      priority: 'medium'
    },
    {
      id: 'security',
      title: 'Security Settings',
      description: 'Two-factor authentication and password settings',
      icon: Shield,
      color: 'green',
      route: '/security',
      completed: true,
      priority: 'low'
    },
    {
      id: 'billing',
      title: 'Billing & Payments',
      description: 'Payment methods and billing history',
      icon: CreditCard,
      color: 'yellow',
      route: '/billing',
      completed: false,
      priority: 'low'
    },
    {
      id: 'preferences',
      title: 'Account Preferences',
      description: 'Language, notifications, and privacy settings',
      icon: Settings,
      color: 'purple',
      route: '/preferences',
      completed: true,
      priority: 'low'
    }
  ];

  const propertyManagementLinks = [
    {
      title: 'Property Registration',
      description: 'Register new properties and land',
      icon: MapPin,
      route: '/enhanced-registration'
    },
    {
      title: 'Add Inhabitants',
      description: 'Manage property inhabitants and members',
      icon: User,
      route: '/add-inhabitant'
    },
    {
      title: 'Add Tenants',
      description: 'Tenant applications and rental management',
      icon: User,
      route: '/add-tenant'
    },
    {
      title: 'Property Rules',
      description: 'Set rules and regulations for properties',
      icon: Shield,
      route: '/property-rules'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            <User className="w-10 h-10 inline-block mr-3 text-blue-400" />
            User Profile Dashboard
          </h1>
          <p className="text-gray-300">Manage your personal profile and account settings</p>
        </div>

        {/* Profile Overview */}
        <Card className="bg-slate-800/50 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-blue-400 flex items-center">
              <User className="w-6 h-6 mr-2" />
              Profile Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-semibold">{userProfile.name}</h3>
                <p className="text-gray-400 text-sm">{userProfile.email}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-gray-300">
                  <Phone className="w-4 h-4 mr-2" />
                  <span className="text-sm">{userProfile.phone}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="text-sm">{userProfile.email}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">{userProfile.address}</span>
                </div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{userProfile.profileCompletion}%</div>
                <p className="text-gray-400 text-sm">Profile Complete</p>
                <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                  <div 
                    className="bg-green-400 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${userProfile.profileCompletion}%` }}
                  ></div>
                </div>
              </div>

              <div className="text-center">
                <Button className="bg-blue-600 hover:bg-blue-700 w-full">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Sections */}
        <Card className="bg-slate-800/50 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-400 flex items-center">
              <Settings className="w-6 h-6 mr-2" />
              Profile Sections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {profileSections.map((section) => {
                const Icon = section.icon;
                return (
                  <Link key={section.id} to={section.route}>
                    <Card className={`group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-${section.color}-900/20 to-${section.color}-800/30 border-${section.color}-500/30 hover:border-${section.color}-400/60`}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <Icon className={`w-8 h-8 text-${section.color}-400 group-hover:scale-110 transition-transform`} />
                          <div className="flex space-x-1">
                            {section.completed && (
                              <Badge variant="default" className="bg-green-600 text-white">
                                Complete
                              </Badge>
                            )}
                            {section.priority === 'high' && (
                              <Badge variant="destructive" className="bg-red-600">
                                Priority
                              </Badge>
                            )}
                          </div>
                        </div>
                        <h3 className={`text-lg font-bold text-${section.color}-400 mb-2`}>
                          {section.title}
                        </h3>
                        <p className="text-gray-300 text-sm mb-4">
                          {section.description}
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className={`w-full text-${section.color}-400 border-${section.color}-400 hover:bg-${section.color}-400/10`}
                        >
                          {section.completed ? (
                            <>
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4 mr-2" />
                              Add
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Access to Property Management */}
        <Card className="bg-slate-800/50 border-green-500/30">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center">
              <MapPin className="w-6 h-6 mr-2" />
              Property Management Quick Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {propertyManagementLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link key={link.title} to={link.route}>
                    <Card className="group cursor-pointer transform transition-all duration-300 hover:scale-105 bg-slate-700/30 border-slate-600 hover:border-green-400/60">
                      <CardContent className="p-4 text-center">
                        <Icon className="w-6 h-6 text-green-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                        <h4 className="text-white font-medium text-sm mb-1">{link.title}</h4>
                        <p className="text-gray-400 text-xs">{link.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-slate-800/50 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-cyan-400 flex items-center">
              <Calendar className="w-6 h-6 mr-2" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  <span className="text-white text-sm">Profile updated successfully</span>
                </div>
                <span className="text-gray-400 text-xs">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  <span className="text-white text-sm">New property registered</span>
                </div>
                <span className="text-gray-400 text-xs">1 day ago</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                  <span className="text-white text-sm">Visa application submitted</span>
                </div>
                <span className="text-gray-400 text-xs">3 days ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}