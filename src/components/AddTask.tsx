import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, Tag, Flag } from 'lucide-react';
import { Task } from '../types';

interface AddTaskProps {
  onAdd: (task: Omit<Task, 'id' | 'completed' | 'createdAt'>) => void;
  onBack: () => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onAdd, onBack }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [category, setCategory] = useState('Personal');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const categories = ['Work', 'Personal', 'Health', 'Home', 'Finance', 'Learning'];
  const priorities = [
    { value: 'low' as const, label: 'Low', color: 'bg-green-100 text-green-700' },
    { value: 'medium' as const, label: 'Medium', color: 'bg-yellow-100 text-yellow-700' },
    { value: 'high' as const, label: 'High', color: 'bg-red-100 text-red-700' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !scheduledTime) return;

    onAdd({
      title,
      description: description || undefined,
      scheduledTime: new Date(scheduledTime),
      category,
      priority
    });
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(9, 0, 0, 0);
    return tomorrow.toISOString().slice(0, 16);
  };

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
            <h1 className="text-xl font-bold text-gray-800">Add New Task</h1>
            <p className="text-sm text-gray-600">What would you like to accomplish?</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What do you want to do?
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Write project report, Call dentist..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add any details that might help..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Scheduled Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="w-4 h-4 inline mr-1" />
              When would you like to do this?
            </label>
            <input
              type="datetime-local"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              min={new Date().toISOString().slice(0, 16)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Tag className="w-4 h-4 inline mr-1" />
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <Flag className="w-4 h-4 inline mr-1" />
              Priority Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {priorities.map(p => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setPriority(p.value)}
                  className={`py-3 px-4 rounded-xl font-medium text-sm transition-all ${
                    priority === p.value 
                      ? p.color + ' ring-2 ring-offset-2 ring-blue-500' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Quick Schedule:</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  const now = new Date();
                  now.setHours(now.getHours() + 1);
                  setScheduledTime(now.toISOString().slice(0, 16));
                }}
                className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors"
              >
                In 1 hour
              </button>
              <button
                type="button"
                onClick={() => setScheduledTime(getTomorrowDate())}
                className="px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition-colors"
              >
                Tomorrow 9AM
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!title || !scheduledTime}
            className="w-full py-4 bg-blue-600 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;