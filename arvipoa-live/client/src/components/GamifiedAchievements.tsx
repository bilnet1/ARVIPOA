import { useState } from "react";
import { Trophy, Star, Target, Zap, Shield, Users } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  maxProgress: number;
  completed: boolean;
  points: number;
}

export default function GamifiedAchievements() {
  const [achievements] = useState<Achievement[]>([
    {
      id: "first-property",
      title: "Property Pioneer",
      description: "Register your first property with ARVIPOA",
      icon: <Trophy className="h-6 w-6" />,
      progress: 1,
      maxProgress: 1,
      completed: true,
      points: 100
    },
    {
      id: "community-builder",
      title: "Community Builder",
      description: "Connect with 10 neighbors in your area",
      icon: <Users className="h-6 w-6" />,
      progress: 7,
      maxProgress: 10,
      completed: false,
      points: 250
    },
    {
      id: "smart-protector",
      title: "Smart Protector",
      description: "Install a Smart Pillar on your property",
      icon: <Shield className="h-6 w-6" />,
      progress: 0,
      maxProgress: 1,
      completed: false,
      points: 500
    },
    {
      id: "eco-guardian",
      title: "Eco Guardian",
      description: "Protect 5 environmental assets",
      icon: <Star className="h-6 w-6" />,
      progress: 2,
      maxProgress: 5,
      completed: false,
      points: 300
    },
    {
      id: "verification-master",
      title: "Verification Master",
      description: "Complete 100% property verification",
      icon: <Target className="h-6 w-6" />,
      progress: 85,
      maxProgress: 100,
      completed: false,
      points: 200
    },
    {
      id: "rapid-responder",
      title: "Rapid Responder",
      description: "Respond to 5 community alerts within 1 hour",
      icon: <Zap className="h-6 w-6" />,
      progress: 3,
      maxProgress: 5,
      completed: false,
      points: 150
    }
  ]);

  const totalPoints = achievements
    .filter(achievement => achievement.completed)
    .reduce((sum, achievement) => sum + achievement.points, 0);

  const completedCount = achievements.filter(achievement => achievement.completed).length;

  return (
    <section className="bg-[#001b14] text-white px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#D4AF37] mb-4">Property Management Achievements</h2>
          <div className="flex justify-center items-center gap-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#D4AF37]">{totalPoints}</p>
              <p className="text-gray-400 text-sm">Total Points</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">{completedCount}/{achievements.length}</p>
              <p className="text-gray-400 text-sm">Completed</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`relative bg-[#002818] rounded-lg p-6 border transition-all duration-300 hover:scale-105 ${
                achievement.completed 
                  ? 'border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20' 
                  : 'border-gray-700 hover:border-[#D4AF37]/50'
              }`}
            >
              {achievement.completed && (
                <div className="absolute -top-2 -right-2 bg-[#D4AF37] text-black rounded-full p-2">
                  <Trophy className="h-4 w-4" />
                </div>
              )}

              <div className={`flex items-center gap-3 mb-4 ${achievement.completed ? 'text-[#D4AF37]' : 'text-gray-400'}`}>
                {achievement.icon}
                <h3 className="font-bold text-lg">{achievement.title}</h3>
              </div>

              <p className="text-gray-300 text-sm mb-4">{achievement.description}</p>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-400">Progress</span>
                  <span className="text-xs text-gray-400">
                    {achievement.progress}/{achievement.maxProgress}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-1000 ${
                      achievement.completed ? 'bg-[#D4AF37]' : 'bg-gray-500'
                    }`}
                    style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className={`text-sm font-medium ${achievement.completed ? 'text-[#D4AF37]' : 'text-gray-400'}`}>
                  {achievement.points} points
                </span>
                {achievement.completed ? (
                  <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">Completed</span>
                ) : (
                  <span className="text-xs bg-gray-600 text-white px-2 py-1 rounded">In Progress</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button className="bg-[#D4AF37] text-black px-6 py-3 rounded-lg font-medium hover:bg-yellow-500 transition-colors">
            View All Achievements
          </button>
        </div>
      </div>
    </section>
  );
}