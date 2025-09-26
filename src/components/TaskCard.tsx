import React from 'react';
import { Clock, AlertCircle, Star, Crown, Bell } from 'lucide-react';
import { Task, UserPlan } from '../types';

interface TaskCardProps {
  task: Task;
  userPlan: UserPlan;
  onReminder: () => void;
  isOverdue?: boolean;
  reminderType: 'checkin' | 'simple';
}

const TaskCard: React.FC<TaskCardProps> = ({ task, userPlan, onReminder, isOverdue = false, reminderType }) => {
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'work': return 'bg-blue-100 text-blue-800';
      case 'health': return 'bg-green-100 text-green-800';
      case 'home': return 'bg-purple-100 text-purple-800';
      case 'personal': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`bg-white rounded-xl p-4 shadow-sm border-l-4 ${
      isOverdue ? 'border-orange-400' : 'border-blue-400'
    } hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 mb-1">{task.title}</h3>
          {task.description && (
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{task.description}</p>
          )}
          
          <div className="flex items-center gap-2 flex-wrap">
            {task.isPriority && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 flex items-center gap-1">
                <span>⭐</span>
                Priority
              </span>
            )}
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(task.category)}`}>
              {task.category}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getPriorityColor(task.priority)}`}>
              <Star className="w-3 h-3" />
              {task.priority}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          {isOverdue ? (
            <div className="flex items-center gap-1 text-orange-600">
              <AlertCircle className="w-4 h-4" />
              <span>Overdue</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{formatTime(task.scheduledTime)}</span>
            </div>
          )}
          
          {/* Reminder Type Indicator */}
          <div className="flex items-center gap-1 text-xs">
            {reminderType === 'checkin' ? (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full flex items-center gap-1">
                🧠 Smart
              </span>
            ) : (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full flex items-center gap-1">
                <Bell className="w-3 h-3" />
                Simple
              </span>
            )}
          </div>
        </div>

        <button
          onClick={onReminder}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isOverdue 
              ? 'bg-orange-100 text-orange-700 hover:bg-orange-200' 
              : reminderType === 'checkin'
                ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {isOverdue 
            ? (reminderType === 'checkin' ? 'Check In' : 'Remind') 
            : (reminderType === 'checkin' ? 'Start' : 'Remind')
          }
        </button>
      </div>
      
      {/* Premium Upgrade Hint for Free Users */}
      {userPlan.type === 'free' && !task.isPriority && (
        <div className="mt-3 p-2 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
          <div className="flex items-center gap-2 text-xs text-yellow-700">
            <Crown className="w-3 h-3" />
            <span>Upgrade to Premium for emotional check-ins on all tasks</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;