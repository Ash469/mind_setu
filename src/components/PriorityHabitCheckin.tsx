import React, { useState } from 'react';
import { ArrowLeft, Star, Battery, Heart, Lightbulb } from 'lucide-react';
import { EmotionalState, PriorityHabit } from '../types';

interface PriorityHabitCheckinProps {
  habit: PriorityHabit;
  onComplete: (response: {
    willingness: 'low' | 'medium' | 'high';
    emotion: EmotionalState;
    adaptedAction: string;
  }) => void;
  onBack: () => void;
}

const PriorityHabitCheckin: React.FC<PriorityHabitCheckinProps> = ({ habit, onComplete, onBack }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [willingness, setWillingness] = useState<'low' | 'medium' | 'high' | null>(null);
  const [emotion, setEmotion] = useState<EmotionalState | null>(null);

  const willingnessOptions = [
    { value: 'low' as const, label: 'Low', description: 'Really not feeling it', color: 'bg-red-50 text-red-700 border-red-200', emoji: '😔' },
    { value: 'medium' as const, label: 'Medium', description: 'Could probably do something small', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', emoji: '😐' },
    { value: 'high' as const, label: 'High', description: 'Ready to tackle this!', color: 'bg-green-50 text-green-700 border-green-200', emoji: '😊' }
  ];

  const emotionOptions = [
    { value: 'stressed' as EmotionalState, label: 'Stressed', emoji: '😰', color: 'bg-red-100 text-red-700 border-red-200' },
    { value: 'tired' as EmotionalState, label: 'Tired', emoji: '😴', color: 'bg-orange-100 text-orange-700 border-orange-200' },
    { value: 'unmotivated' as EmotionalState, label: 'Unmotivated', emoji: '😑', color: 'bg-gray-100 text-gray-700 border-gray-200' },
    { value: 'neutral' as EmotionalState, label: 'Neutral', emoji: '😐', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    { value: 'good' as EmotionalState, label: 'Good', emoji: '😊', color: 'bg-green-100 text-green-700 border-green-200' }
  ];

  const generateAdaptedAction = (willingness: 'low' | 'medium' | 'high', emotion: EmotionalState, habitName: string): string => {
    const microActions = {
      'Gym Workout': {
        low: 'Put on your workout clothes and take 3 deep breaths',
        medium: 'Do 5 minutes of stretching or light movement',
        high: 'Start with a 10-minute warm-up routine'
      },
      'Reading': {
        low: 'Pick up your book and read just one paragraph',
        medium: 'Read for 5 minutes or one page',
        high: 'Set a timer for 15 minutes and dive in'
      },
      'Meditation': {
        low: 'Take 3 mindful breaths where you are right now',
        medium: 'Try a 2-minute breathing exercise',
        high: 'Start with a 5-10 minute guided meditation'
      },
      'Walking': {
        low: 'Step outside and take 10 steps',
        medium: 'Walk around the block once',
        high: 'Go for a 15-minute energizing walk'
      }
    };

    if (willingness === 'high' && (emotion === 'good' || emotion === 'neutral')) {
      return `Great energy! ${microActions[habitName as keyof typeof microActions]?.high || `Start your full ${habitName.toLowerCase()} routine`}`;
    } else if (willingness === 'medium') {
      return microActions[habitName as keyof typeof microActions]?.medium || `Take a small step toward ${habitName.toLowerCase()}`;
    } else {
      return microActions[habitName as keyof typeof microActions]?.low || `Just prepare for ${habitName.toLowerCase()} - even tiny steps count`;
    }
  };

  const handleNext = () => {
    if (step === 1 && willingness) {
      setStep(2);
    } else if (step === 2 && emotion && willingness) {
      const adaptedAction = generateAdaptedAction(willingness, emotion, habit.name);
      onComplete({
        willingness,
        emotion,
        adaptedAction
      });
    }
  };

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
            <h1 className="text-xl font-bold text-gray-800">Priority Habit Check-in</h1>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-600" />
              {habit.name}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Step {step} of 2</span>
            <span>{Math.round((step / 2) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-yellow-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 2) * 100}%` }}
            />
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Battery className="w-8 h-8 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">How willing are you to do this habit?</h2>
              <p className="text-gray-600">We'll adapt based on your energy level</p>
            </div>

            <div className="space-y-3">
              {willingnessOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => setWillingness(option.value)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    willingness === option.value 
                      ? option.color + ' scale-105 shadow-md' 
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{option.emoji}</span>
                    <div className="flex-1">
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm opacity-70">{option.description}</div>
                    </div>
                    <Battery className="w-5 h-5" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">How are you feeling right now?</h2>
              <p className="text-gray-600">This helps us suggest the perfect next step</p>
            </div>

            <div className="space-y-3">
              {emotionOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => setEmotion(option.value)}
                  className={`w-full p-4 rounded-xl border-2 transition-all ${
                    emotion === option.value 
                      ? option.color + ' scale-105 shadow-md' 
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
          </div>
        )}

        {/* Continue Button */}
        <button
          onClick={handleNext}
          disabled={(!willingness && step === 1) || (!emotion && step === 2)}
          className="w-full mt-8 py-4 bg-yellow-600 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-700 transition-colors"
        >
          {step === 1 ? 'Continue' : 'Get My Action Plan'}
        </button>
      </div>
    </div>
  );
};

export default PriorityHabitCheckin;