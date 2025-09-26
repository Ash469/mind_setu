import React, { useState } from 'react';
import { ArrowLeft, Plus, Target, Flame, Calendar, TrendingUp } from 'lucide-react';
import { Habit } from '../types';

interface HabitTrackerProps {
  habits: Habit[];
  onBack: () => void;
  onAddHabit: () => void;
  onCompleteHabit: (habitId: string) => void;
}

const HabitTracker: React.FC<HabitTrackerProps> = ({ habits, onBack, onAddHabit, onCompleteHabit }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('today');

  const isCompletedToday = (habit: Habit) => {
    const today = new Date().toDateString();
    return habit.completedDates.some(date => new Date(date).toDateString() === today);
  };

  const getStreakEmoji = (streak: number) => {
    if (streak >= 30) return '🏆';
    if (streak >= 14) return '🔥';
    if (streak >= 7) return '⭐';
    if (streak >= 3) return '💪';
    return '🌱';
  };

  const totalHabits = habits.length;
  const completedToday = habits.filter(isCompletedToday).length;
  const averageStreak = habits.reduce((acc, h) => acc + h.streak, 0) / habits.length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4">
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
            <h1 className="text-xl font-bold text-gray-800">Habit Tracker</h1>
            <p className="text-sm text-gray-600">Build lasting positive changes</p>
          </div>
          <button
            onClick={onAddHabit}
            className="p-2 bg-purple-600 text-white rounded-full shadow-md hover:shadow-lg transition-shadow"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <div className="text-2xl font-bold text-purple-600">{completedToday}</div>
            <div className="text-xs text-gray-600">Today</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <div className="text-2xl font-bold text-orange-600">{Math.round(averageStreak)}</div>
            <div className="text-xs text-gray-600">Avg Streak</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <div className="text-2xl font-bold text-green-600">{totalHabits}</div>
            <div className="text-xs text-gray-600">Total</div>
          </div>
        </div>

        {/* Period Selector */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          {(['today', 'week', 'month'] as const).map(period => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                selectedPeriod === period
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>

        {/* Habits List */}
        <div className="space-y-4">
          {habits.map(habit => {
            const completed = isCompletedToday(habit);
            return (
              <div
                key={habit.id}
                className="bg-white rounded-xl p-4 shadow-sm border-l-4"
                style={{ borderLeftColor: habit.color }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{habit.name}</h3>
                    {habit.description && (
                      <p className="text-sm text-gray-600 mt-1">{habit.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-sm">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span className="font-medium">{habit.streak}</span>
                    </div>
                    <span className="text-lg">{getStreakEmoji(habit.streak)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span 
                      className="px-2 py-1 rounded-full text-xs font-medium"
                      style={{ 
                        backgroundColor: habit.color + '20', 
                        color: habit.color 
                      }}
                    >
                      {habit.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {habit.targetFrequency}
                    </span>
                  </div>

                  <button
                    onClick={() => onCompleteHabit(habit.id)}
                    disabled={completed}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      completed
                        ? 'bg-green-100 text-green-700 cursor-not-allowed'
                        : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                    }`}
                  >
                    {completed ? '✓ Done' : 'Mark Done'}
                  </button>
                </div>

                {/* Mini Calendar */}
                <div className="mt-3 flex gap-1">
                  {Array.from({ length: 7 }, (_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() - (6 - i));
                    const isCompleted = habit.completedDates.some(
                      d => new Date(d).toDateString() === date.toDateString()
                    );
                    return (
                      <div
                        key={i}
                        className={`w-6 h-6 rounded text-xs flex items-center justify-center ${
                          isCompleted
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {date.getDate()}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {habits.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Start Building Habits</h3>
            <p className="text-gray-600 mb-4">Create your first habit to begin your journey</p>
            <button
              onClick={onAddHabit}
              className="px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors"
            >
              Add Your First Habit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HabitTracker;