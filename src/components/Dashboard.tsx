import React from 'react';
import { Plus, BarChart3, Clock, AlertCircle, Target, Timer, Heart, Award } from 'lucide-react';
import { Task } from '../types';
import TaskCard from './TaskCard';

interface DashboardProps {
  tasks: Task[];
  onTaskReminder: (task: Task) => void;
  onAddTask: () => void;
  onViewInsights: () => void;
  onViewHabits: () => void;
  onViewFocus: () => void;
  onViewMood: () => void;
  onViewAchievements: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  tasks, 
  onTaskReminder, 
  onAddTask, 
  onViewInsights,
  onViewHabits,
  onViewFocus,
  onViewMood,
  onViewAchievements
}) => {
  const now = new Date();
  const upcomingTasks = tasks.filter(t => !t.completed && t.scheduledTime > now);
  const overdueTasks = tasks.filter(t => !t.completed && t.scheduledTime <= now);
  const completedToday = tasks.filter(t => 
    t.completed && t.completedAt && 
    new Date(t.completedAt).toDateString() === now.toDateString()
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Good afternoon! 👋</h1>
          <div className="flex gap-2">
            <button
              onClick={onViewAchievements}
              className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
            >
              <Award className="w-5 h-5 text-yellow-600" />
            </button>
            <button
              onClick={onViewInsights}
              className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
            >
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </button>
          </div>
        </div>
        <p className="text-gray-600">How are you feeling today? Let's check in with your tasks.</p>
        
        {/* Quick Actions */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          <button
            onClick={onViewHabits}
            className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors whitespace-nowrap"
          >
            <Target className="w-4 h-4" />
            Habits
          </button>
          <button
            onClick={onViewFocus}
            className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium hover:bg-green-200 transition-colors whitespace-nowrap"
          >
            <Timer className="w-4 h-4" />
            Focus
          </button>
          <button
            onClick={onViewMood}
            className="flex items-center gap-2 px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-medium hover:bg-pink-200 transition-colors whitespace-nowrap"
          >
            <Heart className="w-4 h-4" />
            Mood
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed Today</p>
              <p className="text-2xl font-bold text-green-600">{completedToday.length}</p>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-blue-600">{upcomingTasks.length + overdueTasks.length}</p>
            </div>
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Overdue Tasks */}
      {overdueTasks.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-5 h-5 text-orange-500" />
            <h2 className="text-lg font-semibold text-gray-800">Needs Attention</h2>
          </div>
          <div className="space-y-3">
            {overdueTasks.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onReminder={() => onTaskReminder(task)}
                isOverdue={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Tasks */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Upcoming Tasks</h2>
        <div className="space-y-3">
          {upcomingTasks.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <div className="w-6 h-6 bg-green-500 rounded-full"></div>
              </div>
              <p className="text-gray-500">All caught up! Great work! 🎉</p>
            </div>
          ) : (
            upcomingTasks.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onReminder={() => onTaskReminder(task)}
              />
            ))
          )}
        </div>
      </div>

      {/* Add Task Button */}
      <button
        onClick={onAddTask}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all duration-200 flex items-center justify-center"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Dashboard;