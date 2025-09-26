import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, Square, Timer, Coffee, Brain } from 'lucide-react';
import { FocusSession, EmotionalState } from '../types';

interface FocusTimerProps {
  onBack: () => void;
  onSessionComplete: (session: Omit<FocusSession, 'id'>) => void;
}

const FocusTimer: React.FC<FocusTimerProps> = ({ onBack, onSessionComplete }) => {
  const [selectedDuration, setSelectedDuration] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [mood, setMood] = useState<EmotionalState>('neutral');
  const [productivity, setProductivity] = useState<'low' | 'medium' | 'high'>('medium');

  const durations = [
    { value: 15, label: '15 min', description: 'Quick focus' },
    { value: 25, label: '25 min', description: 'Pomodoro' },
    { value: 45, label: '45 min', description: 'Deep work' },
    { value: 60, label: '60 min', description: 'Flow state' }
  ];

  const moodOptions = [
    { value: 'stressed' as EmotionalState, label: 'Stressed', emoji: '😰' },
    { value: 'tired' as EmotionalState, label: 'Tired', emoji: '😴' },
    { value: 'unmotivated' as EmotionalState, label: 'Unfocused', emoji: '😑' },
    { value: 'neutral' as EmotionalState, label: 'Neutral', emoji: '😐' },
    { value: 'good' as EmotionalState, label: 'Focused', emoji: '😊' }
  ];

  const productivityOptions = [
    { value: 'low' as const, label: 'Low', description: 'Struggled to focus' },
    { value: 'medium' as const, label: 'Medium', description: 'Got some work done' },
    { value: 'high' as const, label: 'High', description: 'Very productive!' }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => {
          if (time <= 1) {
            setIsRunning(false);
            setShowCompletion(true);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startSession = () => {
    setTimeLeft(selectedDuration * 60);
    setSessionStarted(true);
    setIsRunning(true);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const stopSession = () => {
    setIsRunning(false);
    setSessionStarted(false);
    setTimeLeft(selectedDuration * 60);
  };

  const completeSession = () => {
    const actualDuration = selectedDuration - Math.floor(timeLeft / 60);
    onSessionComplete({
      duration: selectedDuration,
      actualDuration,
      startTime: new Date(Date.now() - (actualDuration * 60 * 1000)),
      endTime: new Date(),
      completed: timeLeft === 0,
      mood,
      productivity
    });
    onBack();
  };

  const progress = ((selectedDuration * 60 - timeLeft) / (selectedDuration * 60)) * 100;

  if (showCompletion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Session Complete! 🎉</h1>
            <p className="text-gray-600">How did your focus session go?</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                How do you feel now?
              </label>
              <div className="space-y-2">
                {moodOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setMood(option.value)}
                    className={`w-full p-3 rounded-xl border-2 transition-all ${
                      mood === option.value 
                        ? 'bg-green-100 text-green-700 border-green-200' 
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                How productive were you?
              </label>
              <div className="space-y-2">
                {productivityOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setProductivity(option.value)}
                    className={`w-full p-3 rounded-xl border-2 text-left transition-all ${
                      productivity === option.value 
                        ? 'bg-blue-100 text-blue-700 border-blue-200' 
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">{option.label}</div>
                    <div className="text-sm opacity-70">{option.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={completeSession}
              className="w-full py-4 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
            >
              Save Session
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!sessionStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-4">
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
              <h1 className="text-xl font-bold text-gray-800">Focus Timer</h1>
              <p className="text-sm text-gray-600">Choose your focus duration</p>
            </div>
          </div>

          {/* Duration Selection */}
          <div className="space-y-4 mb-8">
            <h3 className="font-semibold text-gray-800">Select Duration</h3>
            <div className="grid grid-cols-2 gap-3">
              {durations.map(duration => (
                <button
                  key={duration.value}
                  onClick={() => setSelectedDuration(duration.value)}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    selectedDuration === duration.value
                      ? 'bg-green-100 text-green-700 border-green-200 scale-105'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl font-bold">{duration.label}</div>
                  <div className="text-sm text-gray-600">{duration.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-white rounded-xl p-4 shadow-sm mb-8">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <Coffee className="w-4 h-4 text-orange-500" />
              Focus Tips
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Put your phone in another room</li>
              <li>• Close unnecessary browser tabs</li>
              <li>• Take deep breaths before starting</li>
              <li>• Have water nearby</li>
            </ul>
          </div>

          <button
            onClick={startSession}
            className="w-full py-4 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" />
            Start Focus Session
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button 
            onClick={onBack}
            className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-lg font-bold text-gray-800">Focus Session</h1>
            <p className="text-sm text-gray-600">{selectedDuration} minute session</p>
          </div>
        </div>

        {/* Timer Circle */}
        <div className="relative w-64 h-64 mx-auto mb-8">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#E5E7EB"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#10B981"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-800">{formatTime(timeLeft)}</div>
              <div className="text-sm text-gray-600">remaining</div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={toggleTimer}
            className="w-16 h-16 bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl hover:bg-green-700 transition-all flex items-center justify-center"
          >
            {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
          <button
            onClick={stopSession}
            className="w-16 h-16 bg-red-500 text-white rounded-full shadow-lg hover:shadow-xl hover:bg-red-600 transition-all flex items-center justify-center"
          >
            <Square className="w-6 h-6" />
          </button>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusTimer;