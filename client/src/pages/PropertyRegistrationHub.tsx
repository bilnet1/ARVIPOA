import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Building2,
  MapPin,
  Users,
  Home,
  Shield,
  Heart,
  Plane,
  ArrowLeft,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function PropertyRegistrationHub() {
  const navigate = useNavigate();
  const [completionStatus, setCompletionStatus] = useState({
    landRegistration: 'completed',
    buildingRegistration: 'in-progress', 
    inhabitants: 'pending',
    tenants: 'pending',
    rules: 'pending',
    visa: 'pending'
  });

  const propertyModules = [
    {
      id: 'land-registration',
      title: 'Land Registration',
      description: 'Register new land properties with Ghana GPS integration and boundary mapping',
      icon: MapPin,
      color: 'green',
      route: '/land-registration-enhanced',
      status: completionStatus.landRegistration,
      priority: 'high',
      estimatedTime: '15-20 mins'
    },
    {
      id: 'building-registration',
      title: 'Building Registration',
      description: 'Add buildings to registered lands with comprehensive room management',
      icon: Building2,
      color: 'orange',
      route: '/building-registration',
      status: completionStatus.buildingRegistration,
      priority: 'high',
      estimatedTime: '10-15 mins'
    },
    {
      id: 'add-inhabitants',
      title: 'Add Inhabitants',
      description: 'Register property inhabitants, family members, and authorized users',
      icon: Users,
      color: 'blue',
      route: '/add-inhabitant',
      status: completionStatus.inhabitants,
      priority: 'medium',
      estimatedTime: '5-10 mins'
    },
    {
      id: 'add-tenants',
      title: 'Add Tenants',
      description: 'Manage tenant applications, rental agreements, and payments',
      icon: Home,
      color: 'purple',
      route: '/add-tenant',
      status: completionStatus.tenants,
      priority: 'medium',
      estimatedTime: '8-12 mins'
    },
    {
      id: 'property-rules',
      title: 'Property Rules',
      description: 'Set comprehensive rules, regulations, and usage policies',
      icon: Shield,
      color: 'red',
      route: '/property-rules',
      status: completionStatus.rules,
      priority: 'medium',
      estimatedTime: '10-15 mins'
    },

    {
      id: 'visa-application',
      title: 'Visa Applications',
      description: 'Manage guest visa applications and visitor invitations',
      icon: Plane,
      color: 'cyan',
      route: '/visa-application',
      status: completionStatus.visa,
      priority: 'low',
      estimatedTime: '15-20 mins'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'pending':
        return <AlertTriangle className="w-5 h-5 text-gray-400" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-600 text-white">Complete</Badge>;
      case 'in-progress':
        return <Badge className="bg-yellow-600 text-white">In Progress</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-gray-600 text-white">Pending</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const completedCount = Object.values(completionStatus).filter(status => status === 'completed').length;
  const totalModules = propertyModules.length;
  const completionPercentage = Math.round((completedCount / totalModules) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <Card className="bg-slate-800/50 border-blue-500/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white flex items-center">
                  <Building2 className="w-8 h-8 mr-3 text-blue-400" />
                  Property Management Hub
                </h1>
                <p className="text-gray-300 mt-2">Complete property management and protection portal</p>
              </div>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/navigation')}
                  className="text-blue-400 border-blue-400 hover:bg-blue-400/10"
                >
                  All Forms
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/')}
                  className="text-gray-400 border-gray-400 hover:bg-gray-400/10"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Progress Overview */}
        <Card className="bg-slate-800/50 border-green-500/30">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center">
              <CheckCircle className="w-6 h-6 mr-2" />
              Registration Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">{completionPercentage}%</div>
                <p className="text-gray-400 text-sm">Overall Complete</p>
                <div className="w-full bg-slate-700 rounded-full h-3 mt-2">
                  <div 
                    className="bg-green-400 h-3 rounded-full transition-all duration-500" 
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{completedCount}</div>
                <p className="text-gray-400 text-sm">Completed</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {Object.values(completionStatus).filter(status => status === 'in-progress').length}
                </div>
                <p className="text-gray-400 text-sm">In Progress</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-400">
                  {Object.values(completionStatus).filter(status => status === 'pending').length}
                </div>
                <p className="text-gray-400 text-sm">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Registration Modules */}
        <Card className="bg-slate-800/50 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-400 flex items-center">
              <Building2 className="w-6 h-6 mr-2" />
              Property Management Modules
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {propertyModules.map((module) => {
                const Icon = module.icon;
                return (
                  <Card 
                    key={module.id} 
                    className={`group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-${module.color}-900/20 to-${module.color}-800/30 border-${module.color}-500/30 hover:border-${module.color}-400/60`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Icon className={`w-8 h-8 text-${module.color}-400 group-hover:scale-110 transition-transform`} />
                          <div>
                            <h3 className={`text-lg font-bold text-${module.color}-400`}>
                              {module.title}
                            </h3>
                            <p className="text-gray-400 text-xs">{module.estimatedTime}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(module.status)}
                          {module.priority === 'high' && (
                            <Badge variant="destructive" className="bg-red-600 text-xs">
                              Priority
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-gray-300 text-sm mb-4">
                        {module.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        {getStatusBadge(module.status)}
                        <Link to={module.route}>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className={`text-${module.color}-400 border-${module.color}-400 hover:bg-${module.color}-400/10`}
                          >
                            {module.status === 'completed' ? 'Review' : 
                             module.status === 'in-progress' ? 'Continue' : 'Start'}
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-slate-800/50 border-yellow-500/30">
          <CardHeader>
            <CardTitle className="text-yellow-400 flex items-center">
              <Shield className="w-6 h-6 mr-2" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/land-registration-enhanced">
                <Button className="w-full bg-green-600 hover:bg-green-700 h-12">
                  <MapPin className="w-5 h-5 mr-2" />
                  Start Land Registration
                </Button>
              </Link>
              <Link to="/building-registration">
                <Button className="w-full bg-orange-600 hover:bg-orange-700 h-12">
                  <Building2 className="w-5 h-5 mr-2" />
                  Add Building
                </Button>
              </Link>
              <Link to="/navigation">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 h-12">
                  <Shield className="w-5 h-5 mr-2" />
                  View All Forms
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Help & Support */}
        <Card className="bg-slate-800/50 border-gray-500/30">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                Need help? Contact ARVIPOA support or visit our documentation center
              </p>
              <div className="flex justify-center space-x-4 mt-3">
                <Button variant="outline" size="sm" className="text-gray-400 border-gray-400">
                  Help Center
                </Button>
                <Button variant="outline" size="sm" className="text-gray-400 border-gray-400">
                  Contact Support
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}