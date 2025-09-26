import { Task } from '../types';
import { Habit, MoodEntry, Achievement } from '../types';

export const sampleTasks: Task[] = [
  {
    id: '1',
    title: 'Write project report',
    description: 'Complete the quarterly project report for client presentation',
    scheduledTime: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
    priority: 'high',
    category: 'Work',
    completed: false,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
  },
  {
    id: '2',
    title: 'Go to gym',
    description: 'Evening workout session - cardio and strength training',
    scheduledTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    priority: 'medium',
    category: 'Health',
    completed: false,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000)
  },
  {
    id: '3',
    title: 'Clean kitchen',
    description: 'Deep clean kitchen counters, sink, and organize pantry',
    scheduledTime: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
    priority: 'low',
    category: 'Home',
    completed: false,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000)
  },
  {
    id: '4',
    title: 'Call mom',
    description: 'Weekly check-in call with mom',
    scheduledTime: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago (overdue)
    priority: 'medium',
    category: 'Personal',
    completed: false,
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000)
  }
]

export const sampleHabits: Habit[] = [
  {
    id: '1',
    name: 'Morning Meditation',
    description: '10 minutes of mindfulness to start the day',
    category: 'Wellness',
    targetFrequency: 'daily',
    streak: 7,
    completedDates: [
      new Date(Date.now() - 24 * 60 * 60 * 1000),
      new Date(Date.now() - 48 * 60 * 60 * 1000),
      new Date(Date.now() - 72 * 60 * 60 * 1000)
    ],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    color: '#8B5CF6'
  },
  {
    id: '2',
    name: 'Read for 30 minutes',
    description: 'Daily reading habit for personal growth',
    category: 'Learning',
    targetFrequency: 'daily',
    streak: 3,
    completedDates: [
      new Date(Date.now() - 24 * 60 * 60 * 1000),
      new Date(Date.now() - 48 * 60 * 60 * 1000)
    ],
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    color: '#10B981'
  },
  {
    id: '3',
    name: 'Drink 8 glasses of water',
    description: 'Stay hydrated throughout the day',
    category: 'Health',
    targetFrequency: 'daily',
    streak: 12,
    completedDates: [
      new Date(Date.now() - 24 * 60 * 60 * 1000),
      new Date(Date.now() - 48 * 60 * 60 * 1000),
      new Date(Date.now() - 72 * 60 * 60 * 1000)
    ],
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    color: '#3B82F6'
  }
];

export const sampleMoodEntries: MoodEntry[] = [
  {
    id: '1',
    mood: 'good',
    energy: 'high',
    stress: 'low',
    notes: 'Great morning workout, feeling energized!',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    triggers: ['exercise', 'good sleep']
  },
  {
    id: '2',
    mood: 'neutral',
    energy: 'medium',
    stress: 'medium',
    notes: 'Busy day at work but manageable',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    triggers: ['work pressure']
  },
  {
    id: '3',
    mood: 'tired',
    energy: 'low',
    stress: 'high',
    notes: 'Long meeting day, need to recharge',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    triggers: ['meetings', 'lack of sleep']
  }
];

export const sampleAchievements: Achievement[] = [
  {
    id: '1',
    title: 'First Steps',
    description: 'Completed your first task with Mind Setu',
    icon: '🎯',
    unlockedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    category: 'tasks'
  },
  {
    id: '2',
    title: 'Streak Master',
    description: 'Maintained a 7-day habit streak',
    icon: '🔥',
    unlockedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    category: 'habits'
  },
  {
    id: '3',
    title: 'Mindful Warrior',
    description: 'Completed 10 emotional check-ins',
    icon: '🧘',
    unlockedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    category: 'mood'
  }
];