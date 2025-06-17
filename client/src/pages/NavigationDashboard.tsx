import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Heart, 
  Plane,
  Building2,
  Home,
  Users,
  Shield,
  MapPin,
  Target,
  Car,
  Smartphone,
  Mail,
  Globe,
  FileText,
  Search,
  Grid,
  List,
  Star,
  Bookmark,
  Settings,
  Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NavigationDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<string[]>(['lifestyle-profile', 'building-registration']);

  const allModules = [
    // User Profile & Personal
    {
      id: 'user-dashboard',
      title: 'User Profile Dashboard',
      description: 'Manage your personal profile and account settings',
      icon: User,
      color: 'blue',
      route: '/user-dashboard',
      category: 'Personal',
      priority: 'high'
    },
    {
      id: 'lifestyle-profile',
      title: 'Add Lifestyle',
      description: 'Complete your lifestyle preferences, habits, and interests',
      icon: Heart,
      color: 'pink',
      route: '/lifestyle-profile',
      category: 'Personal',
      priority: 'high'
    },
    {
      id: 'visa-application',
      title: 'Visa Applications',
      description: 'Manage guest visa applications and invitations',
      icon: Plane,
      color: 'cyan',
      route: '/visa-application',
      category: 'Personal',
      priority: 'medium'
    },

    // Property Management
    {
      id: 'enhanced-registration',
      title: 'Registration Hub',
      description: 'Complete registration portal for all ARVIPOA services',
      icon: Grid,
      color: 'purple',
      route: '/enhanced-registration',
      category: 'Property',
      priority: 'high'
    },
    {
      id: 'land-registration',
      title: 'Land Registration',
      description: 'Register new land properties with Ghana GPS integration',
      icon: MapPin,
      color: 'green',
      route: '/land-registration-enhanced',
      category: 'Property',
      priority: 'high'
    },
    {
      id: 'building-registration',
      title: 'Building Registration',
      description: 'Add buildings to registered lands with room management',
      icon: Building2,
      color: 'orange',
      route: '/building-registration',
      category: 'Property',
      priority: 'high'
    },
    {
      id: 'add-inhabitant',
      title: 'Add Inhabitants',
      description: 'Manage property inhabitants, members, and users',
      icon: Users,
      color: 'blue',
      route: '/add-inhabitant',
      category: 'Property',
      priority: 'medium'
    },
    {
      id: 'add-tenant',
      title: 'Add Tenants',
      description: 'Tenant applications and rental management',
      icon: Home,
      color: 'orange',
      route: '/add-tenant',
      category: 'Property',
      priority: 'medium'
    },
    {
      id: 'property-rules',
      title: 'Property Rules',
      description: 'Set comprehensive rules and regulations for properties',
      icon: Shield,
      color: 'purple',
      route: '/property-rules',
      category: 'Property',
      priority: 'medium'
    },

    // Asset Registration
    {
      id: 'arms-registration',
      title: 'Arms Registration',
      description: 'Register firearms and weapons with security tracking',
      icon: Target,
      color: 'red',
      route: '/arms-registration',
      category: 'Assets',
      priority: 'medium'
    },
    {
      id: 'auto-registration',
      title: 'Vehicle Registration',
      description: 'Register vehicles and machinery with tracking',
      icon: Car,
      color: 'blue',
      route: '/auto-registration',
      category: 'Assets',
      priority: 'medium'
    },
    {
      id: 'mobile-property',
      title: 'Mobile Protection',
      description: 'Protect mobile phones with theft protection and tracking',
      icon: Smartphone,
      color: 'purple',
      route: '/mobile-property',
      category: 'Assets',
      priority: 'medium'
    },

    // Communication & Services
    {
      id: 'pmb-registration',
      title: 'PMB Registration',
      description: 'Private Mail Box registration and management',
      icon: Mail,
      color: 'indigo',
      route: '/pmb-registration-module',
      category: 'Services',
      priority: 'low'
    },
    {
      id: 'domain-registration',
      title: 'Domain Registration',
      description: 'Domain registration with AI-powered design',
      icon: Globe,
      color: 'purple',
      route: '/domain-registration-module',
      category: 'Services',
      priority: 'low'
    }
  ];

  const categories = ['All', 'Personal', 'Property', 'Assets', 'Services'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredModules = allModules.filter(module => {
    const matchesSearch = module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || module.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (moduleId: string) => {
    setFavorites(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const favoriteModules = allModules.filter(module => favorites.includes(module.id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            <Grid className="w-10 h-10 inline-block mr-3 text-purple-400" />
            ARVIPOA Navigation Dashboard
          </h1>
          <p className="text-gray-300">Easy access to all ARVIPOA forms and services</p>
        </div>

        {/* Search and Filters */}
        <Card className="bg-slate-800/50 border-purple-500/30">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search forms and services..."
                  className="pl-10 bg-slate-700/50 border-slate-600 text-white"
                />
              </div>
              
              <div className="flex gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? 'bg-purple-600' : 'text-purple-400 border-purple-400'}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-blue-600' : 'text-blue-400 border-blue-400'}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-blue-600' : 'text-blue-400 border-blue-400'}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Favorites Section */}
        {favorites.length > 0 && (
          <Card className="bg-slate-800/50 border-yellow-500/30">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center">
                <Star className="w-6 h-6 mr-2" />
                Favorites ({favorites.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {favoriteModules.map((module) => {
                  const Icon = module.icon;
                  return (
                    <Link key={module.id} to={module.route}>
                      <Card className="group cursor-pointer transform transition-all duration-300 hover:scale-105 bg-slate-700/30 border-slate-600 hover:border-yellow-400/60">
                        <CardContent className="p-4 text-center">
                          <Icon className="w-6 h-6 text-yellow-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                          <h4 className="text-white font-medium text-sm mb-1">{module.title}</h4>
                          <p className="text-gray-400 text-xs">{module.description}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Modules Grid/List */}
        <Card className="bg-slate-800/50 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-blue-400 flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="w-6 h-6 mr-2" />
                All Modules ({filteredModules.length})
              </div>
              <Badge variant="secondary" className="bg-blue-600/20 text-blue-300">
                {selectedCategory}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredModules.map((module) => {
                  const Icon = module.icon;
                  const isFavorite = favorites.includes(module.id);
                  return (
                    <Card 
                      key={module.id} 
                      className={`group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-${module.color}-900/20 to-${module.color}-800/30 border-${module.color}-500/30 hover:border-${module.color}-400/60`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <Icon className={`w-8 h-8 text-${module.color}-400 group-hover:scale-110 transition-transform`} />
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.preventDefault();
                                toggleFavorite(module.id);
                              }}
                              className="p-1"
                            >
                              <Star 
                                className={`w-4 h-4 ${isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} 
                              />
                            </Button>
                            {module.priority === 'high' && (
                              <Badge variant="destructive" className="bg-red-600 text-xs">
                                Priority
                              </Badge>
                            )}
                          </div>
                        </div>
                        <h3 className={`text-lg font-bold text-${module.color}-400 mb-2`}>
                          {module.title}
                        </h3>
                        <p className="text-gray-300 text-sm mb-4">
                          {module.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="text-xs">
                            {module.category}
                          </Badge>
                          <Link to={module.route}>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className={`text-${module.color}-400 border-${module.color}-400 hover:bg-${module.color}-400/10`}
                            >
                              Open
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredModules.map((module) => {
                  const Icon = module.icon;
                  const isFavorite = favorites.includes(module.id);
                  return (
                    <Card 
                      key={module.id} 
                      className="bg-slate-700/30 border-slate-600 hover:border-gray-400/60 transition-colors"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Icon className={`w-6 h-6 text-${module.color}-400`} />
                            <div>
                              <h3 className="text-white font-medium">{module.title}</h3>
                              <p className="text-gray-400 text-sm">{module.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className="text-xs">
                              {module.category}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleFavorite(module.id)}
                              className="p-2"
                            >
                              <Star 
                                className={`w-4 h-4 ${isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} 
                              />
                            </Button>
                            <Link to={module.route}>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className={`text-${module.color}-400 border-${module.color}-400`}
                              >
                                Open
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}

            {filteredModules.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-white text-lg font-medium mb-2">No modules found</h3>
                <p className="text-gray-400">Try adjusting your search or category filter</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="bg-slate-800/50 border-green-500/30">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center">
              <Calendar className="w-6 h-6 mr-2" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{allModules.length}</div>
                <p className="text-gray-400 text-sm">Total Modules</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{allModules.filter(m => m.category === 'Property').length}</div>
                <p className="text-gray-400 text-sm">Property Forms</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{allModules.filter(m => m.category === 'Personal').length}</div>
                <p className="text-gray-400 text-sm">Personal Forms</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{favorites.length}</div>
                <p className="text-gray-400 text-sm">Favorites</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}