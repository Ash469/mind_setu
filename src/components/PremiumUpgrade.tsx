import React from 'react';
import { ArrowLeft, Crown, Check, Zap, Camera, Target } from 'lucide-react';

interface PremiumUpgradeProps {
  onBack: () => void;
  onUpgrade: () => void;
}

const PremiumUpgrade: React.FC<PremiumUpgradeProps> = ({ onBack, onUpgrade }) => {
  const freeFeatures = [
    'Emotional check-ins for 1 priority habit',
    'Basic task reminders',
    'Simple mood tracking',
    'Weekly insights'
  ];

  const premiumFeatures = [
    'Emotional check-ins for ALL tasks',
    'Smart subtask breakdown',
    'Photo proof of completion',
    'Advanced analytics & insights',
    'Unlimited habits tracking',
    'Custom categories & tags',
    'Export data & reports',
    'Priority support'
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
            <h1 className="text-xl font-bold text-gray-800">Upgrade to Premium</h1>
            <p className="text-sm text-gray-600">Unlock your full potential</p>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl p-6 shadow-lg mb-6 text-white">
          <div className="text-center">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Mind Setu Premium</h2>
            <p className="text-yellow-100 mb-4">Complete emotional productivity system</p>
            <div className="text-3xl font-bold">$4.99<span className="text-lg font-normal">/month</span></div>
          </div>
        </div>

        {/* Feature Comparison */}
        <div className="space-y-6 mb-8">
          {/* Free Plan */}
          <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-gray-600">F</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Free Plan</h3>
                <p className="text-sm text-gray-600">Basic emotional productivity</p>
              </div>
            </div>
            <ul className="space-y-2">
              {freeFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Premium Plan */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 shadow-sm border-2 border-yellow-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <Crown className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Premium Plan</h3>
                <p className="text-sm text-gray-600">Complete productivity system</p>
              </div>
            </div>
            <ul className="space-y-2">
              {premiumFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="grid grid-cols-1 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Zap className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Smart Adaptation</h4>
              <p className="text-sm text-gray-600">Every task gets emotional check-ins</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Target className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Subtask Breakdown</h4>
              <p className="text-sm text-gray-600">Complex tasks made manageable</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Camera className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Photo Proof</h4>
              <p className="text-sm text-gray-600">Visual completion tracking</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onUpgrade}
          className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Crown className="w-6 h-6" />
          Upgrade to Premium
        </button>

        <p className="text-center text-xs text-gray-500 mt-4">
          7-day free trial • Cancel anytime • No commitment
        </p>
      </div>
    </div>
  );
};

export default PremiumUpgrade;