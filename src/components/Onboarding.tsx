import React, { useState, useEffect } from 'react';
import { ChevronRight, Heart, Brain, Target, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const steps = [
    {
      id: 'welcome',
      title: 'Welcome to Mind Setu',
      subtitle: 'Your Emotional Productivity Companion',
      description: 'A smart to-do app that cares about how you feel—not just what you need to do.',
      icon: Heart,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50'
    },
    {
      id: 'problem',
      title: 'We Get It',
      subtitle: 'Traditional apps ignore your emotions',
      description: 'You know what to do, but stress, fatigue, or overwhelm stops you from starting. Sound familiar?',
      icon: Brain,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50'
    },
    {
      id: 'solution',
      title: 'Smart Adaptation',
      subtitle: 'Tasks that match your energy',
      description: 'We check how you feel first, then suggest the perfect next step—from full tasks to tiny micro-actions.',
      icon: Target,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50'
    },
    {
      id: 'flow',
      title: 'How It Works',
      subtitle: 'Simple 3-step process',
      description: 'Check in with your emotions → Get personalized action → Track your progress',
      icon: TrendingUp,
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50'
    },
    {
      id: 'benefits',
      title: 'Your Journey Starts',
      subtitle: 'Less guilt, more progress',
      description: 'Build self-compassion while actually getting things done. Small steps lead to big changes.',
      icon: CheckCircle,
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'from-indigo-50 to-purple-50'
    }
  ];

  const flowSteps = [
    { emoji: '💭', text: 'How are you feeling?', delay: 0 },
    { emoji: '🎯', text: 'Get personalized action', delay: 1000 },
    { emoji: '📈', text: 'Track your progress', delay: 2000 }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsAnimating(false);
      }, 300);
    } else {
      onComplete();
    }
  };

  const skipOnboarding = () => {
    onComplete();
  };

  const currentStepData = steps[currentStep];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentStepData.bgColor} transition-all duration-1000 ease-in-out`}>
      <div className="relative min-h-screen flex flex-col">
        {/* Skip Button */}
        <div className="absolute top-6 right-6 z-10">
          <button
            onClick={skipOnboarding}
            className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors"
          >
            Skip
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="pt-16 px-6">
          <div className="flex justify-center space-x-2 mb-8">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-500 ${
                  index === currentStep 
                    ? 'w-8 bg-white shadow-lg' 
                    : index < currentStep 
                      ? 'w-2 bg-white/70' 
                      : 'w-2 bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center px-6 pb-20">
          <div className={`text-center transition-all duration-500 ${isAnimating ? 'opacity-0 transform translate-y-8' : 'opacity-100 transform translate-y-0'}`}>
            {/* Icon */}
            <div className="mb-8 flex justify-center">
              <div className={`w-24 h-24 rounded-full bg-gradient-to-r ${currentStepData.color} flex items-center justify-center shadow-2xl animate-pulse`}>
                <currentStepData.icon className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-800 mb-3 animate-fade-in">
              {currentStepData.title}
            </h1>

            {/* Subtitle */}
            <h2 className="text-lg font-semibold text-gray-600 mb-6 animate-fade-in-delay">
              {currentStepData.subtitle}
            </h2>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-8 max-w-sm mx-auto animate-fade-in-delay-2">
              {currentStepData.description}
            </p>

            {/* Special Flow Animation for Step 4 */}
            {currentStep === 3 && (
              <div className="mb-8 space-y-4">
                {flowSteps.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center space-x-3 animate-slide-in"
                    style={{ animationDelay: `${step.delay}ms` }}
                  >
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-xl">{step.emoji}</span>
                    </div>
                    <div className="flex-1 max-w-xs">
                      <div className="bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm">
                        <p className="text-sm font-medium text-gray-700">{step.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Features Grid for Welcome Step */}
            {currentStep === 0 && (
              <div className="grid grid-cols-2 gap-4 mb-8 max-w-sm mx-auto">
                {[
                  { icon: '🧠', text: 'Emotion-aware' },
                  { icon: '🎯', text: 'Micro-actions' },
                  { icon: '📊', text: 'Progress tracking' },
                  { icon: '💙', text: 'Self-compassion' }
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-sm animate-bounce-in"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="text-2xl mb-2">{feature.icon}</div>
                    <p className="text-xs font-medium text-gray-700">{feature.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="px-6 pb-8">
          <button
            onClick={nextStep}
            className={`w-full py-4 bg-gradient-to-r ${currentStepData.color} text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2`}
          >
            <span>{currentStep === steps.length - 1 ? "Let's Start!" : 'Continue'}</span>
            {currentStep === steps.length - 1 ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <ArrowRight className="w-5 h-5" />
            )}
          </button>

          {currentStep > 0 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="w-full mt-3 py-3 text-gray-500 font-medium"
            >
              Back
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.3); }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fade-in 0.6s ease-out 0.2s both;
        }
        
        .animate-fade-in-delay-2 {
          animation: fade-in 0.6s ease-out 0.4s both;
        }
        
        .animate-slide-in {
          animation: slide-in 0.8s ease-out both;
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out both;
        }
      `}</style>
    </div>
  );
};

export default Onboarding;