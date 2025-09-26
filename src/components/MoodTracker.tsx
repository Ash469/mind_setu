import React, { useState } from 'react';
import { ArrowLeft, Plus, Heart, TrendingUp, Calendar, Zap } from 'lucide-react';
import { MoodEntry, EmotionalState } from '../types';

interface MoodTrackerProps {
  moodEntries: MoodEntry[];
  onBack: () => void;
  onAddMoodEntry: (entry: Omit<MoodEntry, 'id'>) => void;
}

const MoodTracker: React.FC<MoodTrackerProps> = ({ moodEntries, onBack, onAddMoodEntry }) => {
  const [showAddMood, setShowAddMood] = useState(false);
  const [selectedMood, setSelectedMood] = useState<EmotionalState>('neutral');
  const [selectedEnergy, setSelectedEnergy] = useState<'low' | 'medium' | 'high'>('medium');
  const [selectedStress, setSelectedStress] = useState<'low' | 'medium' | 'high'>('medium');
  const [notes, setNotes] = useState('');
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);

  const moodOptions = [
    { value: 'stressed' as EmotionalState, label: 'Stressed', emoji: '😰', color: 'bg-red-100 text-red-700' },
    { value: 'tired' as EmotionalState, label: 'Tired', emoji: '😴', color: 'bg-orange-100 text-orange-700' },
    { value: 'unmotivated' as EmotionalState, label: 'Unmotivated', emoji: '😑', color: 'bg-gray-100 text-gray-700' },
    { value: 'neutral' as EmotionalState, label: 'Neutral', emoji: '😐', color: 'bg-blue-100 text-blue-700' },
    { value: 'good' as EmotionalState, label: 'Good', emoji: '😊', color: 'bg-green-100 text-green-700' }
  ];

  const levelOptions = [
    { value: 'low' as const, label: 'Low', color: 'bg-green-100 text-green-700' },
    { value: 'medium' as const, label: 'Medium', color: 'bg-yellow-100 text-yellow-700' },
    { value: 'high' as const, label: 'High', color: 'bg-red-100 text-red-700' }
  ];

  const commonTriggers = [
    'work pressure', 'lack of sleep', 'exercise', 'good sleep', 'social interaction',
    'meetings', 'deadlines', 'weather', 'caffeine', 'meditation', 'music', 'nature'
  ];

  const handleSubmit = () => {
    onAddMoodEntry({
      mood: selectedMood,
      energy: selectedEnergy,
      stress: selectedStress,
      notes: notes || undefined,
      timestamp: new Date(),
      triggers: selectedTriggers.length > 0 ? selectedTriggers : undefined
    });
    setShowAddMood(false);
    setNotes('');
    setSelectedTriggers([]);
  };

  const toggleTrigger = (trigger: string) => {
    setSelectedTriggers(prev => 
      prev.includes(trigger) 
        ? prev.filter(t => t !== trigger)
        : [...prev, trigger]
    );
  };

  const getMoodColor = (mood: EmotionalState) => {
    const option = moodOptions.find(o => o.value === mood);
    return option?.color || 'bg-gray-100 text-gray-700';
  };

  const getAverageMood = () => {
    if (moodEntries.length === 0) return 3;
    const moodScores = { stressed: 1, tired: 2, unmotivated: 2, neutral: 3, good: 5 };
    return moodEntries.reduce((acc, entry) => acc + moodScores[entry.mood], 0) / moodEntries.length;
  };

  const recentEntries = moodEntries.slice(0, 5);

  if (showAddMood) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 p-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <button 
              onClick={() => setShowAddMood(false)}
              className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-800">How are you feeling?</h1>
              <p className="text-sm text-gray-600">Track your emotional state</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Mood */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Overall Mood
              </label>
              <div className="space-y-2">
                {moodOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedMood(option.value)}
                    className={`w-full p-3 rounded-xl border-2 transition-all ${
                      selectedMood === option.value 
                        ? option.color + ' border-current scale-105' 
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{option.emoji}</span>
                      <span className="font-medium">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Energy */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <Zap className="w-4 h-4 inline mr-1" />
                Energy Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {levelOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedEnergy(option.value)}
                    className={`py-3 px-4 rounded-xl font-medium text-sm transition-all ${
                      selectedEnergy === option.value 
                        ? option.color + ' ring-2 ring-offset-2 ring-blue-500' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Stress */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Stress Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {levelOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedStress(option.value)}
                    className={`py-3 px-4 rounded-xl font-medium text-sm transition-all ${
                      selectedStress === option.value 
                        ? option.color + ' ring-2 ring-offset-2 ring-blue-500' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Triggers */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                What's influencing your mood? (optional)
              </label>
              <div className="flex flex-wrap gap-2">
                {commonTriggers.map(trigger => (
                  <button
                    key={trigger}
                    onClick={() => toggleTrigger(trigger)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedTriggers.includes(trigger)
                        ? 'bg-purple-100 text-purple-700 ring-2 ring-purple-300'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {trigger}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes (optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Anything else you'd like to note..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-4 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors"
            >
              Save Mood Entry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 p-4">
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
            <h1 className="text-xl font-bold text-gray-800">Mood Tracker</h1>
            <p className="text-sm text-gray-600">Understanding your emotional patterns</p>
          </div>
          <button
            onClick={() => setShowAddMood(true)}
            className="p-2 bg-purple-600 text-white rounded-full shadow-md hover:shadow-lg transition-shadow"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Mood</p>
                <p className="text-2xl font-bold text-purple-600">{getAverageMood().toFixed(1)}/5</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Entries</p>
                <p className="text-2xl font-bold text-blue-600">{moodEntries.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Entries */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800">Recent Entries</h3>
          {recentEntries.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Start Tracking Your Mood</h3>
              <p className="text-gray-600 mb-4">Understanding your emotions is the first step to better productivity</p>
              <button
                onClick={() => setShowAddMood(true)}
                className="px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors"
              >
                Add Your First Entry
              </button>
            </div>
          ) : (
            recentEntries.map(entry => (
              <div key={entry.id} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {moodOptions.find(m => m.value === entry.mood)?.emoji}
                    </span>
                    <div>
                      <div className="font-semibold text-gray-800 capitalize">{entry.mood}</div>
                      <div className="text-sm text-gray-600">
                        {new Date(entry.timestamp).toLocaleDateString()} at{' '}
                        {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMoodColor(entry.mood)}`}>
                    {entry.mood}
                  </span>
                </div>

                <div className="flex gap-4 mb-3 text-sm">
                  <div className="flex items-center gap-1">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span className="text-gray-600">Energy: </span>
                    <span className="font-medium capitalize">{entry.energy}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-red-500" />
                    <span className="text-gray-600">Stress: </span>
                    <span className="font-medium capitalize">{entry.stress}</span>
                  </div>
                </div>

                {entry.triggers && entry.triggers.length > 0 && (
                  <div className="mb-3">
                    <div className="text-sm text-gray-600 mb-1">Triggers:</div>
                    <div className="flex flex-wrap gap-1">
                      {entry.triggers.map(trigger => (
                        <span key={trigger} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {trigger}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {entry.notes && (
                  <p className="text-sm text-gray-600 italic">"{entry.notes}"</p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;