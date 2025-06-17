import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Building2, Car, Target, Zap, TreePine, Rabbit, Home } from 'lucide-react';

export default function SimplePropertyPortal() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <Card className="mb-6">
          <CardHeader className="bg-blue-600 text-white">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-6 h-6" />
                Property Registration Portal
              </CardTitle>
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
                className="text-white border-white hover:bg-white hover:text-blue-600"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover:shadow-lg transition-shadow">
            <Link to="/simple-land">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Land Registration</h3>
                <p className="text-sm text-gray-600 mb-4">Register land with Ghana GPS</p>
                <Button className="w-full">Register Now</Button>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <Link to="/simple-property">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Property Registration</h3>
                <p className="text-sm text-gray-600 mb-4">Register buildings and structures</p>
                <Button className="w-full">Register Now</Button>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <Link to="/simple-vehicle">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-4">
                  <Car className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Vehicle Registration</h3>
                <p className="text-sm text-gray-600 mb-4">Register cars and vehicles</p>
                <Button className="w-full">Register Now</Button>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <Link to="/simple-firearm">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Firearm Registration</h3>
                <p className="text-sm text-gray-600 mb-4">Register firearms and weapons</p>
                <Button className="w-full">Register Now</Button>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <Link to="/simple-electronics">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Electronics Registration</h3>
                <p className="text-sm text-gray-600 mb-4">Register electronic devices</p>
                <Button className="w-full">Register Now</Button>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <Link to="/simple-tree">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mb-4">
                  <TreePine className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Tree/Plantation Registration</h3>
                <p className="text-sm text-gray-600 mb-4">Register trees and plantations</p>
                <Button className="w-full">Register Now</Button>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <Link to="/simple-animal">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-4">
                  <Rabbit className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Animal Registration</h3>
                <p className="text-sm text-gray-600 mb-4">Register animals and livestock</p>
                <Button className="w-full">Register Now</Button>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <Link to="/simple-pmb">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center mb-4">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">PMB Registration</h3>
                <p className="text-sm text-gray-600 mb-4">Register Private Mail Bag</p>
                <Button className="w-full">Register Now</Button>
              </CardContent>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}