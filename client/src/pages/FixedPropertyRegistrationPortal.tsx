import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Building2, Car, Zap, TreePine, Target, Rabbit, Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const registrationOptions = [
  {
    id: 'land',
    title: 'Land Registration',
    description: 'Register land properties with Ghana GPS integration',
    icon: MapPin,
    route: '/land-registration',
    color: 'from-green-600 to-green-700',
    bgColor: 'bg-green-50',
    textColor: 'text-green-600'
  },
  {
    id: 'property',
    title: 'Property Registration',
    description: 'Register buildings and structures',
    icon: Building2,
    route: '/property-registration-form',
    color: 'from-blue-600 to-blue-700',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600'
  },
  {
    id: 'vehicle',
    title: 'Vehicle Registration',
    description: 'Register cars, motorcycles, and other vehicles',
    icon: Car,
    route: '/vehicle-registration',
    color: 'from-purple-600 to-purple-700',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-600'
  },
  {
    id: 'arms',
    title: 'Firearm Registration',
    description: 'Register firearms and weapons',
    icon: Target,
    route: '/arms-registration',
    color: 'from-red-600 to-red-700',
    bgColor: 'bg-red-50',
    textColor: 'text-red-600'
  },
  {
    id: 'electronics',
    title: 'Electronics Registration',
    description: 'Register electronic devices and equipment',
    icon: Zap,
    route: '/electronics-registration',
    color: 'from-yellow-600 to-yellow-700',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-600'
  },
  {
    id: 'tree',
    title: 'Tree/Plantation Registration',
    description: 'Register trees and plantation properties',
    icon: TreePine,
    route: '/tree-registration',
    color: 'from-emerald-600 to-emerald-700',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-600'
  },
  {
    id: 'animal',
    title: 'Animal Registration',
    description: 'Register animals, pets, and livestock',
    icon: Rabbit,
    route: '/animal-registration',
    color: 'from-orange-600 to-orange-700',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-600'
  },
  {
    id: 'pmb',
    title: 'PMB Registration',
    description: 'Register Private Mail Bag addresses',
    icon: Home,
    route: '/pmb-registration',
    color: 'from-indigo-600 to-indigo-700',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-600'
  }
];

export default function FixedPropertyRegistrationPortal() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-white">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2 text-2xl">
                <Building2 className="w-8 h-8" />
                <span>Property Registration Portal</span>
              </CardTitle>
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
                className="text-white border-white hover:bg-white hover:text-[#D4AF37]"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Registration Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {registrationOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <Card
                key={option.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                  hoveredCard === option.id ? 'ring-2 ring-blue-300' : ''
                }`}
                onMouseEnter={() => setHoveredCard(option.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <Link to={option.route}>
                  <CardContent className="p-6 text-center space-y-4">
                    <div className={`mx-auto w-16 h-16 ${option.bgColor} rounded-full flex items-center justify-center`}>
                      <IconComponent className={`w-8 h-8 ${option.textColor}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">{option.title}</h3>
                    <p className="text-sm text-gray-600">{option.description}</p>
                    <Button 
                      className={`w-full bg-gradient-to-r ${option.color} text-white hover:shadow-md`}
                    >
                      Register Now
                    </Button>
                  </CardContent>
                </Link>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/slaughter-house-login" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Building2 className="w-4 h-4 mr-2" />
                  Slaughter House Login
                </Button>
              </Link>
              <Link to="/vet-officer-login" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Target className="w-4 h-4 mr-2" />
                  Veterinary Officer Login
                </Button>
              </Link>
              <Link to="/animal-marketplace" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Rabbit className="w-4 h-4 mr-2" />
                  Animal Marketplace
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}