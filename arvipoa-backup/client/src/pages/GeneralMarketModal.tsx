import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Star, 
  Filter, 
  Search, 
  Grid, 
  List,
  TrendingUp,
  Package,
  Truck,
  Shield,
  X,
  Plus,
  Minus,
  Eye,
  MessageCircle
} from 'lucide-react';

interface MarketProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  seller: string;
  sellerRating: number;
  inStock: boolean;
  stockCount: number;
  description: string;
  features: string[];
  shipping: {
    cost: number;
    estimatedDays: number;
    free: boolean;
  };
  verified: boolean;
  featured: boolean;
  discount?: number;
}

interface GeneralMarketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GeneralMarketModal({ isOpen, onClose }: GeneralMarketModalProps) {
  const [products, setProducts] = useState<MarketProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProduct, setSelectedProduct] = useState<MarketProduct | null>(null);
  const [cartItems, setCartItems] = useState<{[key: string]: number}>({});

  const categories = [
    'All', 'Electronics', 'Fashion', 'Home & Garden', 'Sports', 
    'Books', 'Health & Beauty', 'Automotive', 'Food & Beverages'
  ];

  useEffect(() => {
    // Mock product data - would come from marketplace API
    const mockProducts: MarketProduct[] = [
      {
        id: '1',
        name: 'Premium Wireless Headphones',
        category: 'Electronics',
        price: 89.99,
        originalPrice: 129.99,
        rating: 4.5,
        reviews: 234,
        image: '/api/placeholder/300/300',
        seller: 'TechStore Ghana',
        sellerRating: 4.8,
        inStock: true,
        stockCount: 15,
        description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
        features: ['Noise Cancellation', '30-hour Battery', 'Bluetooth 5.0', 'Quick Charge'],
        shipping: { cost: 0, estimatedDays: 2, free: true },
        verified: true,
        featured: true,
        discount: 31
      },
      {
        id: '2',
        name: 'Organic Shea Butter - 250ml',
        category: 'Health & Beauty',
        price: 25.00,
        rating: 4.8,
        reviews: 156,
        image: '/api/placeholder/300/300',
        seller: 'Natural Ghana',
        sellerRating: 4.9,
        inStock: true,
        stockCount: 45,
        description: 'Pure organic shea butter from Northern Ghana. Perfect for skin and hair care.',
        features: ['100% Organic', 'Locally Sourced', 'No Chemicals', 'Fair Trade'],
        shipping: { cost: 5.00, estimatedDays: 3, free: false },
        verified: true,
        featured: false
      },
      {
        id: '3',
        name: 'Traditional Kente Cloth',
        category: 'Fashion',
        price: 150.00,
        originalPrice: 200.00,
        rating: 4.9,
        reviews: 89,
        image: '/api/placeholder/300/300',
        seller: 'Ashanti Textiles',
        sellerRating: 4.7,
        inStock: true,
        stockCount: 8,
        description: 'Authentic handwoven Kente cloth from master weavers in Bonwire.',
        features: ['Handwoven', 'Authentic Design', 'Premium Cotton', 'Cultural Heritage'],
        shipping: { cost: 10.00, estimatedDays: 5, free: false },
        verified: true,
        featured: true,
        discount: 25
      },
      {
        id: '4',
        name: 'Smart Home Security Camera',
        category: 'Electronics',
        price: 75.00,
        rating: 4.3,
        reviews: 298,
        image: '/api/placeholder/300/300',
        seller: 'SecureHome GH',
        sellerRating: 4.6,
        inStock: true,
        stockCount: 22,
        description: 'WiFi-enabled security camera with night vision and mobile app control.',
        features: ['HD Video', 'Night Vision', 'Mobile App', 'Motion Detection'],
        shipping: { cost: 0, estimatedDays: 1, free: true },
        verified: true,
        featured: false
      }
    ];
    
    setProducts(mockProducts);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           product.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'featured': return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      default: return 0;
    }
  });

  const addToCart = (productId: string) => {
    setCartItems(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) {
        newCart[productId]--;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce((sum, count) => sum + count, 0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 rounded-xl max-w-7xl w-full h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-yellow-500 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white">ARVIPOA General Market</h2>
            <p className="text-orange-100">Your trusted marketplace for quality products</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Button className="bg-white text-orange-600 hover:bg-orange-50">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Cart ({getTotalCartItems()})
              </Button>
            </div>
            <Button 
              variant="outline" 
              onClick={onClose}
              className="border-white text-white hover:bg-white hover:text-orange-600"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="flex h-full">
          {/* Sidebar Filters */}
          <div className="w-64 bg-slate-800 p-4 border-r border-slate-700 overflow-y-auto">
            <div className="space-y-6">
              {/* Categories */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category.toLowerCase())}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.toLowerCase()
                          ? 'bg-orange-600 text-white'
                          : 'text-gray-300 hover:bg-slate-700'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Options */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {/* Featured Sellers */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Top Sellers</h3>
                <div className="space-y-2">
                  {['TechStore Ghana', 'Natural Ghana', 'Ashanti Textiles'].map((seller) => (
                    <div key={seller} className="flex items-center space-x-2 p-2 bg-slate-700/50 rounded-lg">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{seller[0]}</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-white text-sm font-medium">{seller}</div>
                        <div className="flex items-center">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-gray-400 text-xs ml-1">4.8</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Search and Controls */}
            <div className="p-4 bg-slate-800 border-b border-slate-700">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    onClick={() => setViewMode('grid')}
                    className={viewMode === 'grid' ? 'bg-orange-600' : 'border-gray-600 text-gray-300'}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    onClick={() => setViewMode('list')}
                    className={viewMode === 'list' ? 'bg-orange-600' : 'border-gray-600 text-gray-300'}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Display */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className={`grid gap-4 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1'
              }`}>
                {sortedProducts.map((product) => (
                  <Card key={product.id} className="bg-slate-800 border-slate-700 overflow-hidden hover:border-orange-500/50 transition-colors">
                    <div className="relative">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-48 object-cover cursor-pointer"
                        onClick={() => setSelectedProduct(product)}
                        onError={(e) => {
                          e.currentTarget.src = '/api/placeholder/300/200';
                        }}
                      />
                      {product.discount && (
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-red-600 text-white">-{product.discount}%</Badge>
                        </div>
                      )}
                      {product.featured && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-yellow-500 text-black">Featured</Badge>
                        </div>
                      )}
                      <div className="absolute bottom-2 right-2 flex space-x-1">
                        <button className="p-1 bg-black/50 rounded-full hover:bg-black/70">
                          <Heart className="w-4 h-4 text-white" />
                        </button>
                        <button className="p-1 bg-black/50 rounded-full hover:bg-black/70">
                          <Share2 className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <div className="mb-2">
                        <span className="text-xs text-gray-400 uppercase">{product.category}</span>
                      </div>
                      
                      <h3 className="text-white font-semibold mb-2 line-clamp-2 cursor-pointer hover:text-orange-400"
                          onClick={() => setSelectedProduct(product)}>
                        {product.name}
                      </h3>

                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-500'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-gray-400 text-xs ml-2">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>

                      <div className="mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-white">
                            ${product.price.toFixed(2)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        {product.shipping.free && (
                          <div className="text-xs text-green-400">Free Shipping</div>
                        )}
                      </div>

                      <div className="text-xs text-gray-400 mb-3">
                        Sold by: {product.seller}
                        {product.verified && <Shield className="w-3 h-3 inline ml-1 text-green-400" />}
                      </div>

                      <div className="flex items-center justify-between">
                        {cartItems[product.id] ? (
                          <div className="flex items-center space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => removeFromCart(product.id)}
                              className="border-gray-600 text-gray-300 p-1 h-8 w-8"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="text-white font-semibold">{cartItems[product.id]}</span>
                            <Button 
                              size="sm"
                              onClick={() => addToCart(product.id)}
                              className="bg-orange-600 hover:bg-orange-700 p-1 h-8 w-8"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        ) : (
                          <Button 
                            size="sm"
                            onClick={() => addToCart(product.id)}
                            disabled={!product.inStock}
                            className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600"
                          >
                            <ShoppingCart className="w-4 h-4 mr-1" />
                            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setSelectedProduct(product)}
                          className="border-gray-600 text-gray-300"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Detail Modal */}
        {selectedProduct && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-4">
            <div className="bg-slate-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">{selectedProduct.name}</h2>
                  <Button 
                    variant="outline"
                    onClick={() => setSelectedProduct(null)}
                    className="border-gray-600 text-gray-300"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <img 
                      src={selectedProduct.image} 
                      alt={selectedProduct.name}
                      className="w-full h-64 object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.src = '/api/placeholder/400/300';
                      }}
                    />
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold text-white mb-2">Product Features</h3>
                      <div className="space-y-1">
                        {selectedProduct.features.map((feature, index) => (
                          <div key={index} className="text-gray-300 text-sm">• {feature}</div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-2xl font-bold text-white">
                          ${selectedProduct.price.toFixed(2)}
                        </span>
                        {selectedProduct.originalPrice && (
                          <span className="text-lg text-gray-500 line-through">
                            ${selectedProduct.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      {selectedProduct.shipping.free ? (
                        <div className="text-green-400 font-semibold">Free Shipping</div>
                      ) : (
                        <div className="text-gray-400">Shipping: ${selectedProduct.shipping.cost}</div>
                      )}
                    </div>

                    <div className="bg-slate-700/50 p-4 rounded-lg">
                      <h3 className="text-white font-semibold mb-2">Seller Information</h3>
                      <div className="space-y-1">
                        <div className="text-gray-300">{selectedProduct.seller}</div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span className="text-gray-300">{selectedProduct.sellerRating}</span>
                          {selectedProduct.verified && (
                            <Shield className="w-4 h-4 text-green-400 ml-2" />
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-gray-300 mb-4">{selectedProduct.description}</p>
                      <div className="text-sm text-gray-400">
                        Stock: {selectedProduct.stockCount} available
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button 
                        className="flex-1 bg-orange-600 hover:bg-orange-700"
                        onClick={() => addToCart(selectedProduct.id)}
                        disabled={!selectedProduct.inStock}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button 
                        variant="outline"
                        className="border-gray-600 text-gray-300"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Contact Seller
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}