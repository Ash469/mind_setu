import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Heart, Lightbulb } from 'lucide-react';
import { Task, EmotionalState } from '../types';

interface TaskDetailProps {
  task: Task;
  onBack: () => void;
  onComplete: (taskId: string, completionMood: EmotionalState) => void;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ task, onBack, onComplete }) => {
  const [showCompletion, setShowCompletion] = useState(false);
  const [completionMood, setCompletionMood] = useState<EmotionalState | null>(null);

  const moodOptions = [
    { value: 'stressed' as EmotionalState, label: 'Still Stressed', emoji: '😰' },
    { value: 'tired' as EmotionalState, label: 'Still Tired', emoji: '😴' },
    { value: 'unmotivated' as EmotionalState, label: 'Still Unmotivated', emoji: '😑' },
    { value: 'neutral' as EmotionalState, label: 'Neutral', emoji: '😐' },
    { value: 'good' as EmotionalState, label: 'Better!', emoji: '😊' }
  ];

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'stressed': return 'text-red-600';
      case 'tired': return 'text-orange-600';
      case 'unmotivated': return 'text-gray-600';
      case 'neutral': return 'text-blue-600';
      case 'good': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const handleComplete = () => {
    if (completionMood) {
      onComplete(task.id, completionMood);
      onBack();
    }
  };

  if (showCompletion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Great job! 🎉</h1>
            <p className="text-gray-600">You completed your task. How do you feel now?</p>
          </div>

          <div className="space-y-3 mb-8">
            {moodOptions.map(option => (
              <button
                key={option.value}
                onClick={() => setCompletionMood(option.value)}
                className={`w-full p-4 rounded-xl border-2 transition-all ${
                  completionMood === option.value 
                    ? 'bg-green-100 text-green-700 border-green-200 scale-105 shadow-md' 
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{option.emoji}</span>
                  <span className="font-medium">{option.label}</span>
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={handleComplete}
            disabled={!completionMood}
            className="w-full py-4 bg-green-600 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700 transition-colors"
          >
            Complete Task
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
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
            <h1 className="text-xl font-bold text-gray-800">Action Plan</h1>
            <p className="text-sm text-gray-600">Based on how you're feeling</p>
          </div>
        </div>

        {/* Current Mood */}
        {task.lastCheckin && (
          <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <div className="flex items-center gap-3 mb-3">
              <Heart className="w-5 h-5 text-purple-600" />
              <span className="font-medium text-gray-800">Your Current State</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-sm text-gray-500">Mood</div>
                <div className={`font-semibold capitalize ${getMoodColor(task.lastCheckin.mood)}`}>
                  {task.lastCheckin.mood}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-500">Willingness</div>
                <div className={`font-semibold capitalize ${getMoodColor(task.lastCheckin.willingness)}`}>
                  {task.lastCheckin.willingness}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Adapted Action */}
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-6 shadow-sm mb-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Your Personalized Action</h3>
              <p className="text-gray-700 leading-relaxed">{task.adaptedAction}</p>
            </div>
          </div>
        </div>

        {/* Encouragement */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-8">
          <h4 className="font-semibold text-gray-800 mb-2">Remember:</h4>
          <p className="text-gray-600 text-sm leading-relaxed">
            Even tiny steps count. You're showing up for yourself, and that's what matters. 
            Progress isn't always linear, and that's perfectly okay. 💙
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => setShowCompletion(true)}
            className="w-full py-4 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
          >
            I Did It! ✨
          </button>
          
          <button
            onClick={onBack}
            className="w-full py-4 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-colors"
          >
            I'll Try Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;