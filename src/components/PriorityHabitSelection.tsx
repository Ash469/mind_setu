import React, { useState } from 'react';
import { ArrowLeft, Star, Plus, Check, Target } from 'lucide-react';
import { PriorityHabit } from '../types';

interface Props {
  onComplete: (habit: PriorityHabit) => void;
  onBack: () => void;
}

const PriorityHabitSelection: React.FC<Props> = ({ onComplete, onBack }) => {
  const [selectedHabit, setSelectedHabit] = useState('');
  const [customHabit, setCustomHabit] = useState('');
  const [weeklyTarget, setWeeklyTarget] = useState(3);
  const [showCustom, setShowCustom] = useState(false);

  const predefinedHabits = [
    { name: 'Gym Workout', category: 'Health' },
    { name: 'Reading', category: 'Learning' },
    { name: 'Meditation', category: 'Wellness' },
    { name: 'Walking', category: 'Health' }
  ];

  const handleSubmit = () => {
    const habitName = showCustom ? customHabit : selectedHabit;
    if (!habitName) return;

    const habit: PriorityHabit = {
      name: habitName,
      category: showCustom ? 'Personal' : predefinedHabits.find(h => h.name === selectedHabit)?.category || 'Personal',
      weeklyTarget
    };

    // Save to localStorage
    localStorage.setItem('priorityHabit', JSON.stringify(habit));

    onComplete(habit);
  };

  const isValid = (showCustom ? customHabit.trim() : selectedHabit) && weeklyTarget > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 p-4">
      <button onClick={onBack} className="mb-6 p-2 bg-white rounded-full shadow-sm">
        <ArrowLeft className="w-5 h-5 text-gray-600" />
      </button>

      <h1 className="text-xl font-bold mb-4">Choose Your Priority Habit</h1>

      {!showCustom && (
        <div className="grid grid-cols-1 gap-3 mb-6">
          {predefinedHabits.map(habit => (
            <button
              key={habit.name}
              onClick={() => setSelectedHabit(habit.name)}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                selectedHabit === habit.name
                  ? 'bg-yellow-100 border-yellow-200 scale-105 shadow-md'
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              {habit.name}
            </button>
          ))}

          <button onClick={() => setShowCustom(true)} className="p-4 rounded-xl border-2 border-dashed border-gray-300 text-center">
            <Plus className="w-5 h-5 mx-auto" />
            <span>Create Custom Habit</span>
          </button>
        </div>
      )}

      {showCustom && (
        <div className="mb-6">
          <input
            type="text"
            value={customHabit}
            onChange={e => setCustomHabit(e.target.value)}
            placeholder="Enter custom habit..."
            className="w-full p-3 border rounded-xl mb-2"
          />
          <button onClick={() => { setShowCustom(false); setCustomHabit(''); }} className="text-sm text-gray-600">← Back</button>
        </div>
      )}

      <div className="mb-6">
        <label className="block mb-2">Weekly Target: {weeklyTarget} days</label>
        <input
          type="range"
          min="1"
          max="7"
          value={weeklyTarget}
          onChange={e => setWeeklyTarget(parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!isValid}
        className="w-full py-4 bg-yellow-600 text-white rounded-xl disabled:opacity-50"
      >
        Set as Priority Habit ⭐
      </button>
    </div>
  );
};

export default PriorityHabitSelection;
