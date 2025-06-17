import { PractitionerBadge, BadgeStats } from '@/components/PractitionerBadges';
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
  FileCheck,
  Verified,
  Medal,
  Gem,
  BookOpen,
  Lightbulb,
  Timer,
  ThumbsUp,
  TrendingUp,
  UserCheck,
  Handshake,
  Phone,
  Video,
  MapPin,
  Calendar,
  Pill,
  Microscope,
  Clipboard,
  FileText
} from 'lucide-react';

export const defaultPractitionerBadges: PractitionerBadge[] = [
  // Achievement Badges
  {
    id: 'first_consultation',
    title: 'First Steps',
    description: 'Completed your first patient consultation',
    icon: Stethoscope,
    category: 'achievement',
    rarity: 'common',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    earnedDate: '2024-01-15',
    isActive: true
  },
  {
    id: 'hundred_consultations',
    title: 'Century Mark',
    description: 'Completed 100 patient consultations',
    icon: Users,
    category: 'achievement',
    rarity: 'rare',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    earnedDate: '2024-01-20',
    isActive: true
  },
  {
    id: 'thousand_consultations',
    title: 'Consultation Master',
    description: 'Reached 1,000 patient consultations',
    icon: Crown,
    category: 'achievement',
    rarity: 'epic',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    earnedDate: '2024-01-25',
    isActive: true
  },
  {
    id: 'five_thousand_consultations',
    title: 'Healthcare Legend',
    description: 'Achieved 5,000 patient consultations',
    icon: Trophy,
    category: 'achievement',
    rarity: 'legendary',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    earnedDate: '2024-01-30',
    isActive: false,
    progress: 1247,
    maxProgress: 5000
  },

  // Certification Badges
  {
    id: 'board_certified',
    title: 'Board Certified',
    description: 'Verified board certification in specialty',
    icon: FileCheck,
    category: 'certification',
    rarity: 'rare',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
    earnedDate: '2024-01-10',
    isActive: true,
    requirements: ['Submit board certification documents', 'Pass verification process']
  },
  {
    id: 'arvipoa_verified',
    title: 'ARVIPOA Verified',
    description: 'Completed ARVIPOA practitioner verification',
    icon: Verified,
    category: 'certification',
    rarity: 'common',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    earnedDate: '2024-01-05',
    isActive: true
  },
  {
    id: 'telemedicine_certified',
    title: 'Telemedicine Expert',
    description: 'Certified in telemedicine best practices',
    icon: Video,
    category: 'certification',
    rarity: 'rare',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    earnedDate: '2024-01-12',
    isActive: true
  },
  {
    id: 'emergency_certified',
    title: 'Emergency Response',
    description: 'Emergency medicine certification',
    icon: Zap,
    category: 'certification',
    rarity: 'epic',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    earnedDate: '2024-01-18',
    isActive: false
  },

  // Performance Badges
  {
    id: 'five_star_rating',
    title: 'Five Star Excellence',
    description: 'Maintained 5-star patient rating',
    icon: Star,
    category: 'performance',
    rarity: 'epic',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    earnedDate: '2024-01-22',
    isActive: true
  },
  {
    id: 'quick_responder',
    title: 'Quick Responder',
    description: 'Average response time under 5 minutes',
    icon: Timer,
    category: 'performance',
    rarity: 'rare',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    earnedDate: '2024-01-16',
    isActive: true
  },
  {
    id: 'patient_favorite',
    title: 'Patient Favorite',
    description: 'Highest patient satisfaction scores',
    icon: Heart,
    category: 'performance',
    rarity: 'epic',
    color: 'text-pink-600',
    bgColor: 'bg-pink-100',
    earnedDate: '2024-01-24',
    isActive: true
  },
  {
    id: 'accuracy_master',
    title: 'Diagnostic Accuracy',
    description: '95%+ diagnostic accuracy rate',
    icon: Target,
    category: 'performance',
    rarity: 'legendary',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    earnedDate: '2024-01-28',
    isActive: false,
    progress: 92,
    maxProgress: 95
  },

  // Specialty Badges
  {
    id: 'cardiology_specialist',
    title: 'Heart Specialist',
    description: 'Specialized in cardiovascular medicine',
    icon: Activity,
    category: 'specialty',
    rarity: 'rare',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    earnedDate: '2024-01-08',
    isActive: true
  },
  {
    id: 'pediatric_specialist',
    title: 'Child Care Expert',
    description: 'Specialized in pediatric medicine',
    icon: Users,
    category: 'specialty',
    rarity: 'rare',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    earnedDate: '2024-01-11',
    isActive: false
  },
  {
    id: 'mental_health_specialist',
    title: 'Mind Healer',
    description: 'Specialized in mental health and psychology',
    icon: Brain,
    category: 'specialty',
    rarity: 'rare',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    earnedDate: '2024-01-14',
    isActive: false
  },
  {
    id: 'surgery_specialist',
    title: 'Surgical Expert',
    description: 'Board-certified surgeon',
    icon: Microscope,
    category: 'specialty',
    rarity: 'epic',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
    earnedDate: '2024-01-19',
    isActive: false
  },

  // Milestone Badges
  {
    id: 'one_year_service',
    title: 'One Year Strong',
    description: 'One year of dedicated service',
    icon: Calendar,
    category: 'milestone',
    rarity: 'common',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    earnedDate: '2024-01-01',
    isActive: true
  },
  {
    id: 'five_year_veteran',
    title: 'Veteran Practitioner',
    description: 'Five years of professional service',
    icon: Medal,
    category: 'milestone',
    rarity: 'epic',
    color: 'text-bronze-600',
    bgColor: 'bg-orange-100',
    earnedDate: '2024-01-01',
    isActive: false
  },
  {
    id: 'ten_year_legend',
    title: 'Healthcare Legend',
    description: 'Ten years of exceptional service',
    icon: Crown,
    category: 'milestone',
    rarity: 'legendary',
    color: 'text-gold-600',
    bgColor: 'bg-yellow-100',
    earnedDate: '2024-01-01',
    isActive: false
  },

  // Recognition Badges
  {
    id: 'peer_nominated',
    title: 'Peer Recognition',
    description: 'Nominated by fellow practitioners',
    icon: Handshake,
    category: 'recognition',
    rarity: 'rare',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    earnedDate: '2024-01-26',
    isActive: true
  },
  {
    id: 'community_hero',
    title: 'Community Hero',
    description: 'Outstanding community health service',
    icon: Shield,
    category: 'recognition',
    rarity: 'epic',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    earnedDate: '2024-01-29',
    isActive: false
  },
  {
    id: 'innovation_award',
    title: 'Healthcare Innovator',
    description: 'Innovation in healthcare delivery',
    icon: Lightbulb,
    category: 'recognition',
    rarity: 'legendary',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    earnedDate: '2024-01-31',
    isActive: false
  },
  {
    id: 'teacher_mentor',
    title: 'Medical Mentor',
    description: 'Mentoring the next generation of doctors',
    icon: BookOpen,
    category: 'recognition',
    rarity: 'epic',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    earnedDate: '2024-01-27',
    isActive: false
  }
];

export const calculateBadgeStats = (badges: PractitionerBadge[]): BadgeStats => {
  const earnedBadges = badges.filter(badge => badge.isActive);
  
  const rarityCount = {
    common: earnedBadges.filter(b => b.rarity === 'common').length,
    rare: earnedBadges.filter(b => b.rarity === 'rare').length,
    epic: earnedBadges.filter(b => b.rarity === 'epic').length,
    legendary: earnedBadges.filter(b => b.rarity === 'legendary').length
  };

  const categoryCount = {
    achievement: earnedBadges.filter(b => b.category === 'achievement').length,
    certification: earnedBadges.filter(b => b.category === 'certification').length,
    performance: earnedBadges.filter(b => b.category === 'performance').length,
    specialty: earnedBadges.filter(b => b.category === 'specialty').length,
    milestone: earnedBadges.filter(b => b.category === 'milestone').length,
    recognition: earnedBadges.filter(b => b.category === 'recognition').length
  };

  // Calculate overall score based on rarity weights
  const rarityWeights = { common: 1, rare: 3, epic: 7, legendary: 15 };
  const overallScore = earnedBadges.reduce((score, badge) => {
    return score + rarityWeights[badge.rarity];
  }, 0);

  return {
    totalBadges: earnedBadges.length,
    commonBadges: rarityCount.common,
    rareBadges: rarityCount.rare,
    epicBadges: rarityCount.epic,
    legendaryBadges: rarityCount.legendary,
    overallScore,
    categoryStats: categoryCount
  };
};

export const getNextBadgeToEarn = (badges: PractitionerBadge[]): PractitionerBadge | null => {
  const unearnedBadges = badges.filter(badge => !badge.isActive);
  if (unearnedBadges.length === 0) return null;

  // Prioritize badges with progress
  const badgesWithProgress = unearnedBadges.filter(badge => badge.progress !== undefined);
  if (badgesWithProgress.length > 0) {
    return badgesWithProgress.sort((a, b) => {
      const aProgress = (a.progress || 0) / (a.maxProgress || 1);
      const bProgress = (b.progress || 0) / (b.maxProgress || 1);
      return bProgress - aProgress;
    })[0];
  }

  // Otherwise return the first common badge
  return unearnedBadges.find(badge => badge.rarity === 'common') || unearnedBadges[0];
};

export const getBadgesBySpecialty = (specialty: string): PractitionerBadge[] => {
  const specialtyMap: Record<string, string[]> = {
    'General Medicine': ['first_consultation', 'hundred_consultations', 'board_certified', 'arvipoa_verified'],
    'Cardiology': ['cardiology_specialist', 'first_consultation', 'board_certified', 'telemedicine_certified'],
    'Dentistry': ['first_consultation', 'board_certified', 'patient_favorite', 'arvipoa_verified'],
    'Optometry': ['first_consultation', 'board_certified', 'quick_responder', 'arvipoa_verified'],
    'Psychology': ['mental_health_specialist', 'first_consultation', 'board_certified', 'patient_favorite'],
    'Pharmacy': ['first_consultation', 'board_certified', 'accuracy_master', 'arvipoa_verified']
  };

  const relevantBadgeIds = specialtyMap[specialty] || ['first_consultation', 'arvipoa_verified'];
  return defaultPractitionerBadges.filter(badge => relevantBadgeIds.includes(badge.id));
};