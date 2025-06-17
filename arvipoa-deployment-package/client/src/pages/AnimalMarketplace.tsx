import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Heart, 
  Search, 
  Filter, 
  MapPin, 
  Phone, 
  Mail, 
  Star,
  Eye,
  MessageCircle,
  Share2,
  Plus,
  DollarSign,
  Calendar,
  User,
  Shield,
  Camera,
  Upload
} from 'lucide-react';

interface AnimalListing {
  id: string;
  name: string;
  type: string;
  breed: string;
  age: string;
  price: number;
  currency: string;
  seller: {
    name: string;
    phone: string;
    email: string;
    location: string;
    rating: number;
    verified: boolean;
  };
  description: string;
  images: string[];
  vaccinated: boolean;
  registered: boolean;
  category: 'pets' | 'livestock' | 'breeding';
  status: 'available' | 'sold' | 'reserved';
  postedDate: string;
  features: string[];
}

export default function AnimalMarketplace() {
  const [activeTab, setActiveTab] = useState('browse');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [showAddListing, setShowAddListing] = useState(false);

  const [newListing, setNewListing] = useState({
    name: '',
    type: '',
    breed: '',
    age: '',
    price: '',
    currency: 'GHS',
    description: '',
    category: 'pets',
    vaccinated: false,
    registered: false,
    features: [],
    images: []
  });

  // Sample animal listings
  const [animalListings] = useState<AnimalListing[]>([
    {
      id: 'AL001',
      name: 'Golden Retriever Puppy',
      type: 'Dog',
      breed: 'Golden Retriever',
      age: '3 months',
      price: 2500,
      currency: 'GHS',
      seller: {
        name: 'Sarah Johnson',
        phone: '+233244123456',
        email: 'sarah@example.com',
        location: 'East Legon, Accra',
        rating: 4.8,
        verified: true
      },
      description: 'Beautiful, healthy Golden Retriever puppy. Well-socialized, loves children. First vaccinations completed.',
      images: ['puppy1.jpg', 'puppy2.jpg'],
      vaccinated: true,
      registered: true,
      category: 'pets',
      status: 'available',
      postedDate: '2024-01-15',
      features: ['Vaccinated', 'Registered', 'Microchipped', 'Health Certificate']
    },
    {
      id: 'AL002',
      name: 'Holstein Dairy Cow',
      type: 'Cattle',
      breed: 'Holstein',
      age: '2 years',
      price: 8500,
      currency: 'GHS',
      seller: {
        name: 'Kofi Farms Ltd',
        phone: '+233201987654',
        email: 'info@kofifarms.com',
        location: 'Kumasi, Ashanti',
        rating: 4.9,
        verified: true
      },
      description: 'Healthy dairy cow, excellent milk production. All health records available. Ready for breeding.',
      images: ['cow1.jpg'],
      vaccinated: true,
      registered: true,
      category: 'livestock',
      status: 'available',
      postedDate: '2024-01-12',
      features: ['Health Records', 'High Milk Production', 'Breeding Ready', 'Vaccinated']
    },
    {
      id: 'AL003',
      name: 'Persian Cat',
      type: 'Cat',
      breed: 'Persian',
      age: '1 year',
      price: 1800,
      currency: 'GHS',
      seller: {
        name: 'Pet Paradise',
        phone: '+233277555123',
        email: 'contact@petparadise.com',
        location: 'Tema, Greater Accra',
        rating: 4.6,
        verified: true
      },
      description: 'Beautiful Persian cat with long silky fur. Very gentle and well-trained. Perfect for families.',
      images: ['cat1.jpg', 'cat2.jpg'],
      vaccinated: true,
      registered: false,
      category: 'pets',
      status: 'available',
      postedDate: '2024-01-10',
      features: ['Vaccinated', 'Litter Trained', 'Good with Kids']
    }
  ]);

  const animalTypes = ['Dog', 'Cat', 'Cattle', 'Goat', 'Sheep', 'Pig', 'Chicken', 'Horse', 'Rabbit', 'Bird'];
  const currencies = ['GHS', 'USD', 'EUR'];

  const filteredListings = animalListings.filter(listing => {
    const matchesSearch = listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || listing.category === filterCategory;
    const matchesType = filterType === 'all' || listing.type === filterType;
    const matchesPrice = (!priceRange.min || listing.price >= parseInt(priceRange.min)) &&
                        (!priceRange.max || listing.price <= parseInt(priceRange.max));
    return matchesSearch && matchesCategory && matchesType && matchesPrice;
  });

  const handleAddFeature = (feature: string) => {
    if (feature && !newListing.features.includes(feature)) {
      setNewListing({
        ...newListing,
        features: [...newListing.features, feature]
      });
    }
  };

  const handleSubmitListing = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New animal listing:', newListing);
    setShowAddListing(false);
    // Reset form
    setNewListing({
      name: '',
      type: '',
      breed: '',
      age: '',
      price: '',
      currency: 'GHS',
      description: '',
      category: 'pets',
      vaccinated: false,
      registered: false,
      features: [],
      images: []
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-orange-600 to-pink-600 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Heart className="w-6 h-6" />
                <CardTitle>Animal & Pet Marketplace</CardTitle>
              </div>
              <Button 
                onClick={() => setShowAddListing(true)}
                className="bg-white text-orange-600 hover:bg-gray-100"
              >
                <Plus className="w-4 h-4 mr-2" />
                List Animal
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Add Listing Modal */}
        {showAddListing && (
          <Card className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>List Your Animal</CardTitle>
                  <Button variant="outline" onClick={() => setShowAddListing(false)}>
                    ✕
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitListing} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="listingName">Animal Name</Label>
                      <Input
                        id="listingName"
                        value={newListing.name}
                        onChange={(e) => setNewListing({ ...newListing, name: e.target.value })}
                        placeholder="Enter animal name"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="listingType">Type</Label>
                      <Select value={newListing.type} onValueChange={(value) => setNewListing({ ...newListing, type: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select animal type" />
                        </SelectTrigger>
                        <SelectContent>
                          {animalTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="listingBreed">Breed</Label>
                      <Input
                        id="listingBreed"
                        value={newListing.breed}
                        onChange={(e) => setNewListing({ ...newListing, breed: e.target.value })}
                        placeholder="Enter breed"
                      />
                    </div>

                    <div>
                      <Label htmlFor="listingAge">Age</Label>
                      <Input
                        id="listingAge"
                        value={newListing.age}
                        onChange={(e) => setNewListing({ ...newListing, age: e.target.value })}
                        placeholder="e.g., 6 months, 2 years"
                      />
                    </div>

                    <div>
                      <Label htmlFor="listingPrice">Price</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="listingPrice"
                          type="number"
                          value={newListing.price}
                          onChange={(e) => setNewListing({ ...newListing, price: e.target.value })}
                          placeholder="Enter price"
                          required
                        />
                        <Select value={newListing.currency} onValueChange={(value) => setNewListing({ ...newListing, currency: value })}>
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {currencies.map((currency) => (
                              <SelectItem key={currency} value={currency}>{currency}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="listingCategory">Category</Label>
                      <Select value={newListing.category} onValueChange={(value) => setNewListing({ ...newListing, category: value as any })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pets">Pets</SelectItem>
                          <SelectItem value="livestock">Livestock</SelectItem>
                          <SelectItem value="breeding">Breeding</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="listingDescription">Description</Label>
                    <textarea
                      id="listingDescription"
                      value={newListing.description}
                      onChange={(e) => setNewListing({ ...newListing, description: e.target.value })}
                      placeholder="Describe your animal..."
                      className="w-full p-2 border rounded-md"
                      rows={4}
                    />
                  </div>

                  <div className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="vaccinated"
                        checked={newListing.vaccinated}
                        onChange={(e) => setNewListing({ ...newListing, vaccinated: e.target.checked })}
                      />
                      <Label htmlFor="vaccinated">Vaccinated</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="registered"
                        checked={newListing.registered}
                        onChange={(e) => setNewListing({ ...newListing, registered: e.target.checked })}
                      />
                      <Label htmlFor="registered">Registered</Label>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button type="button" variant="outline" className="flex items-center space-x-2">
                      <Camera className="w-4 h-4" />
                      <span>Take Photos</span>
                    </Button>
                    <Button type="button" variant="outline" className="flex items-center space-x-2">
                      <Upload className="w-4 h-4" />
                      <span>Upload Images</span>
                    </Button>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setShowAddListing(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      List Animal
                    </Button>
                  </div>
                </form>
              </CardContent>
            </div>
          </Card>
        )}

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="browse">Browse Animals</TabsTrigger>
            <TabsTrigger value="pets">Pets</TabsTrigger>
            <TabsTrigger value="livestock">Livestock</TabsTrigger>
            <TabsTrigger value="breeding">Breeding</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-4">
            {/* Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <Input
                      placeholder="Search animals..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="pets">Pets</SelectItem>
                      <SelectItem value="livestock">Livestock</SelectItem>
                      <SelectItem value="breeding">Breeding</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Animal Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {animalTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Input
                    placeholder="Min Price"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                  />

                  <Input
                    placeholder="Max Price"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Animal Listings */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.map((listing) => (
                <Card key={listing.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
                      <span className="text-4xl">🐾</span>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-lg">{listing.name}</h3>
                        <Badge className={listing.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {listing.status}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 mb-2">{listing.breed} • {listing.age}</p>
                      <p className="text-2xl font-bold text-orange-600 mb-2">
                        {listing.currency} {listing.price.toLocaleString()}
                      </p>
                      
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {listing.description}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {listing.features.slice(0, 3).map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{listing.seller.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>{listing.seller.rating}</span>
                          {listing.seller.verified && (
                            <Shield className="w-3 h-3 text-green-600" />
                          )}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Category-specific tabs */}
          {['pets', 'livestock', 'breeding'].map((category) => (
            <TabsContent key={category} value={category} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings.filter(listing => listing.category === category).map((listing) => (
                  <Card key={listing.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
                        <span className="text-4xl">🐾</span>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-lg">{listing.name}</h3>
                          <Badge className="bg-green-100 text-green-800">
                            {listing.status}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-600 mb-2">{listing.breed} • {listing.age}</p>
                        <p className="text-2xl font-bold text-orange-600 mb-2">
                          {listing.currency} {listing.price.toLocaleString()}
                        </p>
                        
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {listing.description}
                        </p>

                        <div className="flex space-x-2">
                          <Button size="sm" className="flex-1">Contact Seller</Button>
                          <Button size="sm" variant="outline">
                            <Heart className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}