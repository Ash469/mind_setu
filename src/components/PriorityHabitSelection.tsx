import React, { useState } from 'react';
import { ArrowLeft, Star, Target, Book, Brain, Plus, Check } from 'lucide-react';
import { PriorityHabit } from '../types';

interface PriorityHabitSelectionProps {
  onComplete: (priorityHabit: Omit<PriorityHabit, 'id' | 'createdAt'>) => void;
  onBack: () => void;
}

const PriorityHabitSelection: React.FC<PriorityHabitSelectionProps> = ({ onComplete, onBack }) => {
  const [selectedHabit, setSelectedHabit] = useState<string>('');
  const [customHabit, setCustomHabit] = useState('');
  const [weeklyTarget, setWeeklyTarget] = useState(3);
  const [showCustom, setShowCustom] = useState(false);

  const predefinedHabits = [
    {
      name: 'Gym Workout',
      category: 'Health',
      icon: '💪',
      color: 'from-red-500 to-pink-500',
      bgColor: 'from-red-50 to-pink-50'
    },
    {
      name: 'Reading',
      category: 'Learning',
      icon: '📚',
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'from-blue-50 to-indigo-50'
    },
    {
      name: 'Meditation',
      category: 'Wellness',
      icon: '🧘',
      color: 'from-purple-500 to-violet-500',
      bgColor: 'from-purple-50 to-violet-50'
    },
    {
      name: 'Walking',
      category: 'Health',
      icon: '🚶',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50'
    }
  ];

  const handleSubmit = () => {
    const habitName = showCustom ? customHabit : selectedHabit;
    const category = showCustom ? 'Personal' : predefinedHabits.find(h => h.name === selectedHabit)?.category || 'Personal';
    
    if (habitName && weeklyTarget > 0) {
      onComplete({
        name: habitName,
        category,
        weeklyTarget
      });
    }
  };

  const isValid = (showCustom ? customHabit.trim() : selectedHabit) && weeklyTarget > 0;

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
            <h1 className="text-xl font-bold text-gray-800">Choose Your Priority Habit</h1>
            <p className="text-sm text-gray-600">What's most important to you right now?</p>
          </div>
        </div>

        {/* Intro */}
        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-6 shadow-sm mb-8">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <Star className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Why Choose a Priority Habit?</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Focus on one habit that matters most. We'll give it special attention with emotional check-ins 
                and adaptive suggestions to help you succeed.
              </p>
            </div>
          </div>
        </div>

        {/* Habit Selection */}
        <div className="space-y-4 mb-8">
          <h3 className="font-semibold text-gray-800">Select a habit:</h3>
          
          {!showCustom && (
            <div className="grid grid-cols-1 gap-3">
              {predefinedHabits.map(habit => (
                <button
                  key={habit.name}
                  onClick={() => setSelectedHabit(habit.name)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    selectedHabit === habit.name
                      ? 'bg-yellow-100 text-yellow-700 border-yellow-200 scale-105 shadow-md'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{habit.icon}</span>
                    <div>
                      <div className="font-medium">{habit.name}</div>
                      <div className="text-sm text-gray-600">{habit.category}</div>
                    </div>
                    {selectedHabit === habit.name && (
                      <Check className="w-5 h-5 text-yellow-600 ml-auto" />
                    )}
                  </div>
                </button>
              ))}
              
              <button
                onClick={() => setShowCustom(true)}
                className="p-4 rounded-xl border-2 border-dashed border-gray-300 text-center text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-all"
              >
                <div className="flex items-center justify-center gap-2">
                  <Plus className="w-5 h-5" />
                  <span className="font-medium">Create Custom Habit</span>
                </div>
              </button>
            </div>
          )}

          {showCustom && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What habit do you want to focus on?
                </label>
                <input
                  type="text"
                  value={customHabit}
                  onChange={(e) => setCustomHabit(e.target.value)}
                  placeholder="e.g., Drink 8 glasses of water, Write in journal..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={() => {
                  setShowCustom(false);
                  setCustomHabit('');
                }}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                ← Back to predefined habits
              </button>
            </div>
          )}
        </div>

        {/* Weekly Target */}
        <div className="space-y-4 mb-8">
          <h3 className="font-semibold text-gray-800">How many days per week?</h3>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-medium text-gray-800">{weeklyTarget} days per week</span>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-600">Weekly Goal</span>
              </div>
            </div>
            
            <input
              type="range"
              min="1"
              max="7"
              value={weeklyTarget}
              onChange={(e) => setWeeklyTarget(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>1 day</span>
              <span>7 days</span>
            </div>
          </div>

          {/* Quick Selection */}
          <div className="flex gap-2">
            {[3, 5, 7].map(days => (
              <button
                key={days}
                onClick={() => setWeeklyTarget(days)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  weeklyTarget === days
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {days} days
              </button>
            ))}
          </div>
        </div>

        {/* Preview */}
        {isValid && (
          <div className="bg-white rounded-xl p-4 shadow-sm mb-8 border-l-4 border-yellow-400">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-600" />
              Your Priority Habit
            </h4>
            <div className="text-sm text-gray-600">
              <p><strong>{showCustom ? customHabit : selectedHabit}</strong></p>
              <p>Goal: {weeklyTarget} times per week</p>
              <p className="mt-2 text-xs">
                💡 You'll get emotional check-ins and adaptive suggestions for this habit
              </p>
            </div>
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className="w-full py-4 bg-yellow-600 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-700 transition-colors"
        >
          Set as Priority Habit ⭐
        </button>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #EAB308;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #EAB308;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default PriorityHabitSelection;