import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  Award, 
  Star, 
  Shield, 
  Clock, 
  Users, 
  Heart, 
  Stethoscope, 
  Trophy, 
  Target, 
  CheckCircle, 
  Crown, 
  Zap,
  Brain,
  Eye,
  Activity,
  Verified,
  Medal,
  Gem,
  FileCheck
} from 'lucide-react';

export interface PractitionerBadge {
  id: string;
  title: string;
  description: string;
  icon: any;
  category: 'achievement' | 'certification' | 'performance' | 'specialty' | 'milestone' | 'recognition';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  color: string;
  bgColor: string;
  earnedDate: string;
  progress?: number;
  maxProgress?: number;
  requirements?: string[];
  isActive: boolean;
}

export interface BadgeStats {
  totalBadges: number;
  commonBadges: number;
  rareBadges: number;
  epicBadges: number;
  legendaryBadges: number;
  overallScore: number;
  categoryStats: {
    achievement: number;
    certification: number;
    performance: number;
    specialty: number;
    milestone: number;
    recognition: number;
  };
}

interface PractitionerBadgesProps {
  practitionerId: string;
  badges: PractitionerBadge[];
  stats: BadgeStats;
  showOnlyEarned?: boolean;
  compact?: boolean;
}

const rarityColors = {
  common: { color: 'text-gray-600', bgColor: 'bg-gray-100', border: 'border-gray-300' },
  rare: { color: 'text-blue-600', bgColor: 'bg-blue-100', border: 'border-blue-300' },
  epic: { color: 'text-purple-600', bgColor: 'bg-purple-100', border: 'border-purple-300' },
  legendary: { color: 'text-yellow-600', bgColor: 'bg-yellow-100', border: 'border-yellow-300' }
};

const categoryIcons = {
  achievement: Trophy,
  certification: FileCheck,
  performance: Target,
  specialty: Stethoscope,
  milestone: Crown,
  recognition: Medal
};

export default function PractitionerBadges({ 
  practitionerId, 
  badges, 
  stats, 
  showOnlyEarned = false,
  compact = false 
}: PractitionerBadgesProps) {
  
  const displayBadges = showOnlyEarned ? badges.filter(badge => badge.isActive) : badges;
  
  const getBadgesByCategory = (category: string) => {
    return displayBadges.filter(badge => badge.category === category);
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return <Crown className="h-4 w-4" />;
      case 'epic': return <Gem className="h-4 w-4" />;
      case 'rare': return <Star className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  const BadgeCard = ({ badge }: { badge: PractitionerBadge }) => {
    const IconComponent = badge.icon;
    const rarity = rarityColors[badge.rarity];
    
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Card className={`relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer ${
              badge.isActive ? `${rarity.border} border-2` : 'border border-gray-200 opacity-50'
            }`}>
              {badge.isActive && (
                <div className={`absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] ${
                  badge.rarity === 'legendary' ? 'border-t-yellow-400' :
                  badge.rarity === 'epic' ? 'border-t-purple-400' :
                  badge.rarity === 'rare' ? 'border-t-blue-400' : 'border-t-gray-400'
                }`} />
              )}
              
              <CardContent className="p-4 text-center">
                <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
                  badge.isActive ? rarity.bgColor : 'bg-gray-100'
                }`}>
                  <IconComponent className={`h-8 w-8 ${
                    badge.isActive ? rarity.color : 'text-gray-400'
                  }`} />
                </div>
                
                <h4 className={`font-semibold text-sm mb-1 ${
                  badge.isActive ? 'text-gray-900' : 'text-gray-400'
                }`}>
                  {badge.title}
                </h4>
                
                <div className="flex items-center justify-center gap-1 mb-2">
                  {getRarityIcon(badge.rarity)}
                  <span className={`text-xs capitalize ${rarity.color}`}>
                    {badge.rarity}
                  </span>
                </div>
                
                {badge.progress !== undefined && badge.maxProgress && (
                  <div className="mt-2">
                    <Progress 
                      value={(badge.progress / badge.maxProgress) * 100} 
                      className="h-2"
                    />
                    <span className="text-xs text-gray-500 mt-1">
                      {badge.progress}/{badge.maxProgress}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-sm">
            <div className="space-y-2">
              <h4 className="font-semibold">{badge.title}</h4>
              <p className="text-sm">{badge.description}</p>
              {badge.isActive && (
                <p className="text-xs text-green-600">
                  Earned on {new Date(badge.earnedDate).toLocaleDateString()}
                </p>
              )}
              {badge.requirements && (
                <div>
                  <p className="text-xs font-medium mb-1">Requirements:</p>
                  <ul className="text-xs space-y-1">
                    {badge.requirements.map((req, index) => (
                      <li key={index} className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  if (compact) {
    return (
      <div className="flex flex-wrap gap-2">
        {displayBadges.filter(badge => badge.isActive).slice(0, 6).map((badge) => {
          const IconComponent = badge.icon;
          const rarity = rarityColors[badge.rarity];
          
          return (
            <TooltipProvider key={badge.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${rarity.bgColor} ${rarity.border} border-2 cursor-pointer hover:scale-110 transition-transform`}>
                    <IconComponent className={`h-5 w-5 ${rarity.color}`} />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-semibold">{badge.title}</p>
                  <p className="text-xs">{badge.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
        {displayBadges.filter(badge => badge.isActive).length > 6 && (
          <div className="w-10 h-10 rounded-full bg-gray-100 border-2 border-gray-300 flex items-center justify-center text-xs font-semibold text-gray-600">
            +{displayBadges.filter(badge => badge.isActive).length - 6}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-600" />
            Badge Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.totalBadges}</div>
              <div className="text-sm text-gray-600">Total Badges</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.overallScore}</div>
              <div className="text-sm text-gray-600">Overall Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.legendaryBadges}</div>
              <div className="text-sm text-gray-600">Legendary</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.epicBadges}</div>
              <div className="text-sm text-gray-600">Epic</div>
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Badge Collection Progress</span>
              <span>{displayBadges.filter(b => b.isActive).length}/{displayBadges.length}</span>
            </div>
            <Progress 
              value={(displayBadges.filter(b => b.isActive).length / displayBadges.length) * 100} 
              className="h-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Badge Categories */}
      {Object.keys(categoryIcons).map((category) => {
        const categoryBadges = getBadgesByCategory(category);
        if (categoryBadges.length === 0) return null;
        
        const CategoryIcon = categoryIcons[category as keyof typeof categoryIcons];
        
        return (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 capitalize">
                <CategoryIcon className="h-5 w-5" />
                {category} Badges ({categoryBadges.filter(b => b.isActive).length}/{categoryBadges.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {categoryBadges.map((badge) => (
                  <BadgeCard key={badge.id} badge={badge} />
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Recent Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-orange-600" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {displayBadges
              .filter(badge => badge.isActive)
              .sort((a, b) => new Date(b.earnedDate).getTime() - new Date(a.earnedDate).getTime())
              .slice(0, 5)
              .map((badge) => {
                const IconComponent = badge.icon;
                const rarity = rarityColors[badge.rarity];
                
                return (
                  <div key={badge.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${rarity.bgColor}`}>
                      <IconComponent className={`h-6 w-6 ${rarity.color}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{badge.title}</h4>
                      <p className="text-sm text-gray-600">{badge.description}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className={`${rarity.bgColor} ${rarity.color}`}>
                        {badge.rarity}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(badge.earnedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}