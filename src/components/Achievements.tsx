import React from 'react';
import { ArrowLeft, Award, Trophy, Star, Target, Heart, Timer, CheckCircle } from 'lucide-react';
import { Achievement } from '../types';

interface AchievementsProps {
  achievements: Achievement[];
  onBack: () => void;
}

const Achievements: React.FC<AchievementsProps> = ({ achievements, onBack }) => {
  const categoryIcons = {
    tasks: CheckCircle,
    habits: Target,
    focus: Timer,
    mood: Heart
  };

  const categoryColors = {
    tasks: 'bg-blue-100 text-blue-600',
    habits: 'bg-purple-100 text-purple-600',
    focus: 'bg-green-100 text-green-600',
    mood: 'bg-pink-100 text-pink-600'
  };

  const upcomingAchievements = [
    {
      title: 'Task Master',
      description: 'Complete 50 tasks',
      progress: 23,
      total: 50,
      category: 'tasks' as const,
      icon: '🎯'
    },
    {
      title: 'Habit Builder',
      description: 'Maintain a 30-day streak',
      progress: 12,
      total: 30,
      category: 'habits' as const,
      icon: '🏗️'
    },
    {
      title: 'Focus Champion',
      description: 'Complete 25 focus sessions',
      progress: 8,
      total: 25,
      category: 'focus' as const,
      icon: '🧠'
    },
    {
      title: 'Mood Tracker',
      description: 'Log mood for 14 consecutive days',
      progress: 5,
      total: 14,
      category: 'mood' as const,
      icon: '📊'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button 
            onClick={onBack}
            className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-800">Achievements</h1>
            <p className="text-sm text-gray-600">Celebrate your progress</p>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-6 shadow-sm mb-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
              <Trophy className="w-8 h-8 text-yellow-600" />
            </div>
            <div className="text-3xl font-bold text-gray-800">{achievements.length}</div>
            <div className="text-sm text-gray-600">Achievements Unlocked</div>
          </div>
        </div>

        {/* Unlocked Achievements */}
        {achievements.length > 0 && (
          <div className="mb-8">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-600" />
              Unlocked
            </h3>
            <div className="space-y-3">
              {achievements.map(achievement => {
                const IconComponent = categoryIcons[achievement.category];
                return (
                  <div key={achievement.id} className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-yellow-400">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">{achievement.icon}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-800">{achievement.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[achievement.category]}`}>
                            {achievement.category}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <IconComponent className="w-3 h-3" />
                          <span>Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Progress Towards Next Achievements */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-blue-600" />
            In Progress
          </h3>
          <div className="space-y-3">
            {upcomingAchievements.map((achievement, index) => {
              const progress = (achievement.progress / achievement.total) * 100;
              const IconComponent = categoryIcons[achievement.category];
              return (
                <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xl opacity-60">{achievement.icon}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-800">{achievement.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[achievement.category]}`}>
                          {achievement.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{achievement.progress}/{achievement.total}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {achievements.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Start Your Journey</h3>
            <p className="text-gray-600">Complete tasks, build habits, and track your mood to unlock achievements!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Achievements;