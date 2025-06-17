import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target } from 'lucide-react';

export default function TestArmsRegistration() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="bg-white shadow-lg">
          <CardHeader className="bg-gradient-to-r from-red-600 to-orange-600 text-white">
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-6 h-6" />
              <span>Arms Registration Form - TEST VERSION</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Arms Registration Form is Loading</h2>
              <p className="text-gray-600">This test confirms the routing is working.</p>
              <Button className="bg-red-600 hover:bg-red-700">
                Test Button - Arms Registration
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}