import React, { useEffect, useState } from 'react';
import { Plus, BarChart3, Clock, AlertCircle, Award } from 'lucide-react';
import { Task, UserPlan, PriorityHabit } from '../types';
import TaskCard from './TaskCard';

interface DashboardProps {
  tasks: Task[];
  userPlan: UserPlan;
  onAddTask: () => void;
  onTaskReminder: (task: Task) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ tasks, userPlan, onAddTask, onTaskReminder }) => {
  const now = new Date();
  const [priorityHabit, setPriorityHabit] = useState<PriorityHabit | null>(null);
  const [allTasks, setAllTasks] = useState<Task[]>(tasks);

  useEffect(() => {
    const storedHabit = localStorage.getItem('priorityHabit');
    if (storedHabit) {
      const habit: PriorityHabit = JSON.parse(storedHabit);
      setPriorityHabit(habit);

      // Create a top-level task for priority habit if it doesn't exist
      const existingPriorityTask = tasks.find(
        t => t.isPriority && t.title.toLowerCase() === habit.name.toLowerCase()
      );

      if (!existingPriorityTask) {
        const priorityTask: Task = {
          id: `priority-${Date.now()}`,
          title: habit.name,
          description: `Priority Habit: ${habit.name} (${habit.weeklyTarget}x/week)`,
          scheduledTime: now,
          priority: 'high',
          category: habit.category,
          completed: false,
          isPriority: true,
          createdAt: now
        };
        setAllTasks([priorityTask, ...tasks]);
      } else {
        setAllTasks(tasks.map(t =>
          t.id === existingPriorityTask.id ? { ...t, isPriority: true } : t
        ));
      }
    } else {
      setAllTasks(tasks);
    }
  }, [tasks]);

  const upcomingTasks = allTasks.filter(t => !t.completed && t.scheduledTime > now);
  const overdueTasks = allTasks.filter(t => !t.completed && t.scheduledTime <= now);
  const completedToday = allTasks.filter(t =>
    t.completed && t.completedAt &&
    new Date(t.completedAt).toDateString() === now.toDateString()
  );

  const getTaskReminderType = (task: Task) => {
    if (userPlan.type === 'premium') return 'checkin';
    return task.isPriority ? 'checkin' : 'simple';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Good afternoon! 👋</h1>
        <div className="flex gap-2">
          <button className="p-2 bg-white rounded-full shadow-md">
            <Award className="w-5 h-5 text-yellow-600" />
          </button>
          <button className="p-2 bg-white rounded-full shadow-md">
            <BarChart3 className="w-5 h-5 text-blue-600" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Completed Today</p>
            <p className="text-2xl font-bold text-green-600">{completedToday.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-2xl font-bold text-blue-600">{upcomingTasks.length + overdueTasks.length}</p>
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
                userPlan={userPlan}
                isOverdue
                reminderType={getTaskReminderType(task)}
                onReminder={() => onTaskReminder(task)}
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
            <p className="text-gray-500">All caught up! 🎉</p>
          ) : (
            upcomingTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                userPlan={userPlan}
                reminderType={getTaskReminderType(task)}
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
