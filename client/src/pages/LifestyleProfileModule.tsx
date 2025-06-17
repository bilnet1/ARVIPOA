import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  User, 
  Heart, 
  MapPin, 
  Plus, 
  Upload,
  Camera,
  Save, 
  Eye, 
  Send, 
  ChevronDown,
  ChevronUp,
  Settings,
  Shield,
  Users,
  Calendar,
  Plane,
  Wine,
  Cigarette,
  Dumbbell,
  Music,
  BookOpen,
  Coffee,
  Star,
  Mic,
  FileText,
  MapPin as Location,
  Clock,
  CheckCircle,
  X,
  Edit,
  Trash2,
  Camera as Photo
} from 'lucide-react';

export default function LifestyleProfileModule() {
  const [formData, setFormData] = useState<any>({});
  const [openSections, setOpenSections] = useState({
    habits: true,
    fitness: false,
    dietary: false,
    politics: false,
    interests: false,
    travel: false,
    social: false,
    entertainment: false,
    professional: false
  });
  const [travelExperiences, setTravelExperiences] = useState<any[]>([]);
  const [futureTravels, setFutureTravels] = useState<any[]>([]);
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [likes, setLikes] = useState<string[]>([]);
  const [dislikes, setDislikes] = useState<string[]>([]);

  const frequencyOptions = ['Never', 'Occasionally', 'Daily', 'Weekly', 'Monthly', 'Annually'];
  const fitnessTypes = ['Gym', 'Running', 'Swimming', 'Cycling', 'Yoga', 'Martial Arts', 'Dancing', 'Sports', 'Walking', 'Home Workouts'];
  const dietaryTypes = ['Vegetarian', 'Vegan', 'Pescatarian', 'Keto', 'Paleo', 'Mediterranean', 'Low Carb', 'Gluten Free', 'Halal', 'Kosher'];
  const travelReasons = ['Business', 'Tourism', 'Family Visit', 'Education', 'Medical', 'Religious', 'Adventure', 'Honeymoon', 'Conference'];
  const entertainmentTypes = ['Movies', 'Music', 'Gaming', 'Reading', 'Art', 'Theater', 'Concerts', 'Sports Events', 'Comedy Shows'];
  const socialMediaPlatforms = ['Facebook', 'Instagram', 'Twitter', 'LinkedIn', 'TikTok', 'YouTube', 'WhatsApp', 'Telegram', 'Snapchat'];
  const musicGenres = ['Pop', 'Rock', 'Hip Hop', 'R&B', 'Jazz', 'Classical', 'Country', 'Electronic', 'Reggae', 'Gospel', 'Afrobeats'];
  const sportTypes = ['Football', 'Basketball', 'Tennis', 'Cricket', 'Rugby', 'Baseball', 'Boxing', 'Swimming', 'Athletics', 'Golf'];

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const addHobby = (hobby: string) => {
    if (hobby && !hobbies.includes(hobby)) {
      setHobbies(prev => [...prev, hobby]);
    }
  };

  const addLike = (like: string) => {
    if (like && !likes.includes(like)) {
      setLikes(prev => [...prev, like]);
    }
  };

  const addDislike = (dislike: string) => {
    if (dislike && !dislikes.includes(dislike)) {
      setDislikes(prev => [...prev, dislike]);
    }
  };

  const addTravelExperience = (experience: any) => {
    setTravelExperiences(prev => [...prev, { ...experience, id: Date.now() }]);
  };

  const addFutureTravel = (travel: any) => {
    setFutureTravels(prev => [...prev, { ...travel, id: Date.now() }]);
  };

  const submitForm = () => {
    const lifestyleData = {
      ...formData,
      hobbies,
      likes,
      dislikes,
      travelExperiences,
      futureTravels,
      submittedAt: new Date().toISOString()
    };
    console.log('Lifestyle Profile Data:', lifestyleData);
    alert('Lifestyle profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            <Heart className="w-10 h-10 inline-block mr-3 text-pink-400" />
            ARVIPOA Lifestyle Profile
          </h1>
          <p className="text-gray-300">Enhance your profile with comprehensive lifestyle information and preferences</p>
        </div>

        {/* Personal Habits */}
        <Card className="bg-slate-800/50 border-red-500/30">
          <Collapsible open={openSections.habits} onOpenChange={() => toggleSection('habits')}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-slate-700/30 transition-colors">
                <CardTitle className="text-red-400 flex items-center justify-between">
                  <div className="flex items-center">
                    <Wine className="w-6 h-6 mr-2" />
                    Personal Habits
                  </div>
                  {openSections.habits ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-white">Do you drink alcohol?</Label>
                        <Select value={formData.drinksAlcohol} onValueChange={(value) => handleInputChange('drinksAlcohol', value)}>
                          <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                            <SelectValue placeholder="Select answer" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-600">
                            <SelectItem value="yes" className="text-white">Yes</SelectItem>
                            <SelectItem value="no" className="text-white">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {formData.drinksAlcohol === 'yes' && (
                        <div>
                          <Label className="text-white">How often do you drink?</Label>
                          <Select value={formData.drinkingFrequency} onValueChange={(value) => handleInputChange('drinkingFrequency', value)}>
                            <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-600">
                              {frequencyOptions.map((option) => (
                                <SelectItem key={option} value={option.toLowerCase()} className="text-white">{option}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label className="text-white">Do you smoke?</Label>
                        <Select value={formData.smokes} onValueChange={(value) => handleInputChange('smokes', value)}>
                          <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                            <SelectValue placeholder="Select answer" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-600">
                            <SelectItem value="yes" className="text-white">Yes</SelectItem>
                            <SelectItem value="no" className="text-white">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {formData.smokes === 'yes' && (
                        <div>
                          <Label className="text-white">How often do you smoke?</Label>
                          <Select value={formData.smokingFrequency} onValueChange={(value) => handleInputChange('smokingFrequency', value)}>
                            <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-600">
                              {frequencyOptions.map((option) => (
                                <SelectItem key={option} value={option.toLowerCase()} className="text-white">{option}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Fitness & Health */}
        <Card className="bg-slate-800/50 border-green-500/30">
          <Collapsible open={openSections.fitness} onOpenChange={() => toggleSection('fitness')}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-slate-700/30 transition-colors">
                <CardTitle className="text-green-400 flex items-center justify-between">
                  <div className="flex items-center">
                    <Dumbbell className="w-6 h-6 mr-2" />
                    Fitness & Health
                  </div>
                  {openSections.fitness ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-white">Do you go to the gym?</Label>
                      <Select value={formData.goesToGym} onValueChange={(value) => handleInputChange('goesToGym', value)}>
                        <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                          <SelectValue placeholder="Select answer" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-600">
                          <SelectItem value="yes" className="text-white">Yes</SelectItem>
                          <SelectItem value="no" className="text-white">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {formData.goesToGym === 'yes' && (
                      <div>
                        <Label className="text-white">How often do you exercise?</Label>
                        <Select value={formData.exerciseFrequency} onValueChange={(value) => handleInputChange('exerciseFrequency', value)}>
                          <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-600">
                            {frequencyOptions.map((option) => (
                              <SelectItem key={option} value={option.toLowerCase()} className="text-white">{option}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label className="text-white">Fitness Activities (Select all that apply)</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                      {fitnessTypes.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <input 
                            type="checkbox"
                            id={`fitness-${type}`}
                            checked={formData.fitnessActivities?.includes(type) || false}
                            onChange={(e) => {
                              const activities = formData.fitnessActivities || [];
                              if (e.target.checked) {
                                handleInputChange('fitnessActivities', [...activities, type]);
                              } else {
                                handleInputChange('fitnessActivities', activities.filter((a: string) => a !== type));
                              }
                            }}
                            className="w-3 h-3"
                          />
                          <Label htmlFor={`fitness-${type}`} className="text-white text-sm">{type}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Dietary Preferences */}
        <Card className="bg-slate-800/50 border-orange-500/30">
          <Collapsible open={openSections.dietary} onOpenChange={() => toggleSection('dietary')}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-slate-700/30 transition-colors">
                <CardTitle className="text-orange-400 flex items-center justify-between">
                  <div className="flex items-center">
                    <Coffee className="w-6 h-6 mr-2" />
                    Dietary Preferences
                  </div>
                  {openSections.dietary ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <Label className="text-white">Are you a vegetarian?</Label>
                    <Select value={formData.isVegetarian} onValueChange={(value) => handleInputChange('isVegetarian', value)}>
                      <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                        <SelectValue placeholder="Select answer" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        <SelectItem value="yes" className="text-white">Yes</SelectItem>
                        <SelectItem value="no" className="text-white">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-white">Dietary Restrictions/Preferences (Select all that apply)</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                      {dietaryTypes.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <input 
                            type="checkbox"
                            id={`diet-${type}`}
                            checked={formData.dietaryPreferences?.includes(type) || false}
                            onChange={(e) => {
                              const prefs = formData.dietaryPreferences || [];
                              if (e.target.checked) {
                                handleInputChange('dietaryPreferences', [...prefs, type]);
                              } else {
                                handleInputChange('dietaryPreferences', prefs.filter((p: string) => p !== type));
                              }
                            }}
                            className="w-3 h-3"
                          />
                          <Label htmlFor={`diet-${type}`} className="text-white text-sm">{type}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-white">Favorite Cuisines</Label>
                    <Textarea 
                      value={formData.favoriteCuisines || ''}
                      onChange={(e) => handleInputChange('favoriteCuisines', e.target.value)}
                      placeholder="Enter your favorite cuisines..."
                      className="bg-slate-700/50 border-slate-600 text-white"
                    />
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Political Affiliation */}
        <Card className="bg-slate-800/50 border-blue-500/30">
          <Collapsible open={openSections.politics} onOpenChange={() => toggleSection('politics')}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-slate-700/30 transition-colors">
                <CardTitle className="text-blue-400 flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="w-6 h-6 mr-2" />
                    Political Affiliation
                  </div>
                  {openSections.politics ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <Label className="text-white">Do you engage in politics?</Label>
                    <Select value={formData.politicallyActive} onValueChange={(value) => handleInputChange('politicallyActive', value)}>
                      <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                        <SelectValue placeholder="Select answer" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        <SelectItem value="yes" className="text-white">Yes</SelectItem>
                        <SelectItem value="no" className="text-white">No</SelectItem>
                        <SelectItem value="prefer-not-to-answer" className="text-white">Prefer not to answer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.politicallyActive === 'yes' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-white">Political Party</Label>
                          <Input 
                            value={formData.politicalParty || ''}
                            onChange={(e) => handleInputChange('politicalParty', e.target.value)}
                            placeholder="Enter political party name"
                            className="bg-slate-700/50 border-slate-600 text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-white">Activity Level</Label>
                          <Select value={formData.politicalActivityLevel} onValueChange={(value) => handleInputChange('politicalActivityLevel', value)}>
                            <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                              <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-600">
                              <SelectItem value="active" className="text-white">Active</SelectItem>
                              <SelectItem value="not-active" className="text-white">Not Active</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-white">Initiation Date</Label>
                          <Input 
                            type="date"
                            value={formData.politicalInitiationDate || ''}
                            onChange={(e) => handleInputChange('politicalInitiationDate', e.target.value)}
                            className="bg-slate-700/50 border-slate-600 text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-white">Quit Date (if applicable)</Label>
                          <Input 
                            type="date"
                            value={formData.politicalQuitDate || ''}
                            onChange={(e) => handleInputChange('politicalQuitDate', e.target.value)}
                            className="bg-slate-700/50 border-slate-600 text-white"
                          />
                        </div>
                      </div>

                      <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-400 text-sm">Upload Party ID Card (Front and Back)</p>
                        <Button variant="outline" className="mt-2" size="sm">
                          Choose Files
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Interests & Hobbies */}
        <Card className="bg-slate-800/50 border-purple-500/30">
          <Collapsible open={openSections.interests} onOpenChange={() => toggleSection('interests')}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-slate-700/30 transition-colors">
                <CardTitle className="text-purple-400 flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="w-6 h-6 mr-2" />
                    Interests & Hobbies
                  </div>
                  {openSections.interests ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <Label className="text-white">Hobbies</Label>
                    <div className="flex space-x-2 mt-2">
                      <Input 
                        placeholder="Add a hobby..."
                        className="bg-slate-700/50 border-slate-600 text-white"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            addHobby(e.currentTarget.value);
                            e.currentTarget.value = '';
                          }
                        }}
                      />
                      <Button 
                        variant="outline" 
                        onClick={(e) => {
                          const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                          addHobby(input.value);
                          input.value = '';
                        }}
                        className="text-purple-400 border-purple-400"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {hobbies.map((hobby, index) => (
                        <Badge key={index} variant="secondary" className="bg-purple-600/20 text-purple-300">
                          {hobby}
                          <X 
                            className="w-3 h-3 ml-1 cursor-pointer" 
                            onClick={() => setHobbies(prev => prev.filter((_, i) => i !== index))}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-white">Things You Like</Label>
                    <div className="flex space-x-2 mt-2">
                      <Input 
                        placeholder="Add something you like..."
                        className="bg-slate-700/50 border-slate-600 text-white"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            addLike(e.currentTarget.value);
                            e.currentTarget.value = '';
                          }
                        }}
                      />
                      <Button 
                        variant="outline" 
                        onClick={(e) => {
                          const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                          addLike(input.value);
                          input.value = '';
                        }}
                        className="text-green-400 border-green-400"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" className="text-blue-400 border-blue-400">
                        <Mic className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {likes.map((like, index) => (
                        <Badge key={index} variant="secondary" className="bg-green-600/20 text-green-300">
                          {like}
                          <X 
                            className="w-3 h-3 ml-1 cursor-pointer" 
                            onClick={() => setLikes(prev => prev.filter((_, i) => i !== index))}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-white">Things You Dislike</Label>
                    <div className="flex space-x-2 mt-2">
                      <Input 
                        placeholder="Add something you dislike..."
                        className="bg-slate-700/50 border-slate-600 text-white"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            addDislike(e.currentTarget.value);
                            e.currentTarget.value = '';
                          }
                        }}
                      />
                      <Button 
                        variant="outline" 
                        onClick={(e) => {
                          const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                          addDislike(input.value);
                          input.value = '';
                        }}
                        className="text-red-400 border-red-400"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" className="text-blue-400 border-blue-400">
                        <Mic className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {dislikes.map((dislike, index) => (
                        <Badge key={index} variant="secondary" className="bg-red-600/20 text-red-300">
                          {dislike}
                          <X 
                            className="w-3 h-3 ml-1 cursor-pointer" 
                            onClick={() => setDislikes(prev => prev.filter((_, i) => i !== index))}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Travel Experiences */}
        <Card className="bg-slate-800/50 border-cyan-500/30">
          <Collapsible open={openSections.travel} onOpenChange={() => toggleSection('travel')}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-slate-700/30 transition-colors">
                <CardTitle className="text-cyan-400 flex items-center justify-between">
                  <div className="flex items-center">
                    <Plane className="w-6 h-6 mr-2" />
                    Travel Experiences
                  </div>
                  {openSections.travel ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <Label className="text-white">Do you like travelling?</Label>
                    <Select value={formData.likesTravelling} onValueChange={(value) => handleInputChange('likesTravelling', value)}>
                      <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                        <SelectValue placeholder="Select answer" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        <SelectItem value="yes" className="text-white">Yes</SelectItem>
                        <SelectItem value="no" className="text-white">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.likesTravelling === 'yes' && (
                    <div className="space-y-6">
                      <div>
                        <Label className="text-white">Countries/Places Visited</Label>
                        <Textarea 
                          value={formData.placesVisited || ''}
                          onChange={(e) => handleInputChange('placesVisited', e.target.value)}
                          placeholder="List countries and places you've visited..."
                          className="bg-slate-700/50 border-slate-600 text-white"
                        />
                      </div>

                      <div>
                        <Label className="text-white">Travel Preferences</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                          {travelReasons.map((reason) => (
                            <div key={reason} className="flex items-center space-x-2">
                              <input 
                                type="checkbox"
                                id={`travel-${reason}`}
                                checked={formData.travelPreferences?.includes(reason) || false}
                                onChange={(e) => {
                                  const prefs = formData.travelPreferences || [];
                                  if (e.target.checked) {
                                    handleInputChange('travelPreferences', [...prefs, reason]);
                                  } else {
                                    handleInputChange('travelPreferences', prefs.filter((p: string) => p !== reason));
                                  }
                                }}
                                className="w-3 h-3"
                              />
                              <Label htmlFor={`travel-${reason}`} className="text-white text-sm">{reason}</Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label className="text-white">Planning any future trips?</Label>
                        <Select value={formData.planningFutureTrips} onValueChange={(value) => handleInputChange('planningFutureTrips', value)}>
                          <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                            <SelectValue placeholder="Select answer" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-600">
                            <SelectItem value="yes" className="text-white">Yes</SelectItem>
                            <SelectItem value="no" className="text-white">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {formData.planningFutureTrips === 'yes' && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label className="text-white">Planned Destination</Label>
                              <Input 
                                value={formData.plannedDestination || ''}
                                onChange={(e) => handleInputChange('plannedDestination', e.target.value)}
                                placeholder="Enter destination"
                                className="bg-slate-700/50 border-slate-600 text-white"
                              />
                            </div>
                            <div>
                              <Label className="text-white">Travel Purpose</Label>
                              <Select value={formData.plannedTravelPurpose} onValueChange={(value) => handleInputChange('plannedTravelPurpose', value)}>
                                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                                  <SelectValue placeholder="Select purpose" />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-800 border-slate-600">
                                  {travelReasons.map((reason) => (
                                    <SelectItem key={reason} value={reason.toLowerCase()} className="text-white">{reason}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label className="text-white">Estimated Travel Date</Label>
                              <Input 
                                type="date"
                                value={formData.estimatedTravelDate || ''}
                                onChange={(e) => handleInputChange('estimatedTravelDate', e.target.value)}
                                className="bg-slate-700/50 border-slate-600 text-white"
                              />
                            </div>
                            <div>
                              <Label className="text-white">Estimated Return Date</Label>
                              <Input 
                                type="date"
                                value={formData.estimatedReturnDate || ''}
                                onChange={(e) => handleInputChange('estimatedReturnDate', e.target.value)}
                                className="bg-slate-700/50 border-slate-600 text-white"
                              />
                            </div>
                          </div>

                          <div className="bg-slate-700/30 p-4 rounded-lg">
                            <h4 className="text-cyan-400 font-medium mb-2">Travel Planning Service</h4>
                            <p className="text-gray-300 text-sm mb-3">
                              Would you like us to plan your trip and provide recommendations based on your preferences? 
                              We'll suggest accommodations, food, places to visit, and local contacts.
                            </p>
                            <div className="flex space-x-2">
                              <Button className="bg-cyan-600 hover:bg-cyan-700" size="sm">
                                <FileText className="w-4 h-4 mr-2" />
                                Yes, Plan My Trip
                              </Button>
                              <Button variant="outline" size="sm" className="text-cyan-400 border-cyan-400">
                                <Mic className="w-4 h-4 mr-2" />
                                Record Preferences
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Entertainment & Media */}
        <Card className="bg-slate-800/50 border-yellow-500/30">
          <Collapsible open={openSections.entertainment} onOpenChange={() => toggleSection('entertainment')}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-slate-700/30 transition-colors">
                <CardTitle className="text-yellow-400 flex items-center justify-between">
                  <div className="flex items-center">
                    <Music className="w-6 h-6 mr-2" />
                    Entertainment & Media
                  </div>
                  {openSections.entertainment ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <Label className="text-white">Entertainment Preferences (Select all that apply)</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                      {entertainmentTypes.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <input 
                            type="checkbox"
                            id={`entertainment-${type}`}
                            checked={formData.entertainmentPreferences?.includes(type) || false}
                            onChange={(e) => {
                              const prefs = formData.entertainmentPreferences || [];
                              if (e.target.checked) {
                                handleInputChange('entertainmentPreferences', [...prefs, type]);
                              } else {
                                handleInputChange('entertainmentPreferences', prefs.filter((p: string) => p !== type));
                              }
                            }}
                            className="w-3 h-3"
                          />
                          <Label htmlFor={`entertainment-${type}`} className="text-white text-sm">{type}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-white">Favorite Music Genres</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                      {musicGenres.map((genre) => (
                        <div key={genre} className="flex items-center space-x-2">
                          <input 
                            type="checkbox"
                            id={`music-${genre}`}
                            checked={formData.musicGenres?.includes(genre) || false}
                            onChange={(e) => {
                              const genres = formData.musicGenres || [];
                              if (e.target.checked) {
                                handleInputChange('musicGenres', [...genres, genre]);
                              } else {
                                handleInputChange('musicGenres', genres.filter((g: string) => g !== genre));
                              }
                            }}
                            className="w-3 h-3"
                          />
                          <Label htmlFor={`music-${genre}`} className="text-white text-sm">{genre}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-white">Favorite Sports to Watch</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                      {sportTypes.map((sport) => (
                        <div key={sport} className="flex items-center space-x-2">
                          <input 
                            type="checkbox"
                            id={`sport-${sport}`}
                            checked={formData.favoriteSports?.includes(sport) || false}
                            onChange={(e) => {
                              const sports = formData.favoriteSports || [];
                              if (e.target.checked) {
                                handleInputChange('favoriteSports', [...sports, sport]);
                              } else {
                                handleInputChange('favoriteSports', sports.filter((s: string) => s !== sport));
                              }
                            }}
                            className="w-3 h-3"
                          />
                          <Label htmlFor={`sport-${sport}`} className="text-white text-sm">{sport}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-white">Social Media Platforms Used</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                      {socialMediaPlatforms.map((platform) => (
                        <div key={platform} className="flex items-center space-x-2">
                          <input 
                            type="checkbox"
                            id={`social-${platform}`}
                            checked={formData.socialMediaPlatforms?.includes(platform) || false}
                            onChange={(e) => {
                              const platforms = formData.socialMediaPlatforms || [];
                              if (e.target.checked) {
                                handleInputChange('socialMediaPlatforms', [...platforms, platform]);
                              } else {
                                handleInputChange('socialMediaPlatforms', platforms.filter((p: string) => p !== platform));
                              }
                            }}
                            className="w-3 h-3"
                          />
                          <Label htmlFor={`social-${platform}`} className="text-white text-sm">{platform}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Submit Section */}
        <Card className="bg-slate-800/90 border-pink-500/50">
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-bold text-pink-400 mb-4">Complete Your Lifestyle Profile</h2>
            <p className="text-white mb-6">
              Your lifestyle information helps us personalize your experience and connect you with relevant services and opportunities.
              All information is kept confidential and used only to enhance your ARVIPOA experience.
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" className="text-pink-400 border-pink-400 hover:bg-pink-400/10">
                <Eye className="w-4 h-4 mr-2" />
                Preview Profile
              </Button>
              <Button onClick={submitForm} className="bg-pink-600 hover:bg-pink-700 text-white">
                <Save className="w-4 h-4 mr-2" />
                Save Lifestyle Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}