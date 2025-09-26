export interface Task {
  id: string;
  title: string;
  description?: string;
  scheduledTime: Date;
  priority: 'low' | 'medium' | 'high';
  category: string;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
  lastCheckin?: CheckinResponse;
  adaptedAction?: string;
  completionMood?: EmotionalState;
  isPriority?: boolean;
  completionPhoto?: string; // base64 or URL
  subtasks?: Subtask[];
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
  completionPhoto?: string;
}

export interface UserPlan {
  type: 'free' | 'premium';
  expiresAt?: Date;
}

export interface CheckinResponse {
  mood: EmotionalState;
  willingness: 'low' | 'medium' | 'high';
  timestamp: Date;
}

export type EmotionalState = 'stressed' | 'tired' | 'unmotivated' | 'neutral' | 'good';

export interface Habit {
  id: string;
  name: string;
  description?: string;
  category: string;
  targetFrequency: 'daily' | 'weekly';
  weeklyTarget?: number;
  streak: number;
  completedDates: Date[];
  createdAt: Date;
  color: string;
  isPriority?: boolean;
}

export interface PriorityHabit {
  id: string;
  name: string;
  category: string;
  weeklyTarget: number;
  createdAt: Date;
}

export interface PriorityHabitEvent {
  id: string;
  habitId: string;
  willingness: 'low' | 'medium' | 'high';
  emotion: EmotionalState;
  adaptedAction: string;
  completed: boolean;
  timestamp: Date;
}

export interface FocusSession {
  id: string;
  taskId?: string;
  duration: number; // in minutes
  actualDuration?: number;
  startTime: Date;
  endTime?: Date;
  completed: boolean;
  mood: EmotionalState;
  productivity: 'low' | 'medium' | 'high';
  notes?: string;
}

export interface MoodEntry {
  id: string;
  mood: EmotionalState;
  energy: 'low' | 'medium' | 'high';
  stress: 'low' | 'medium' | 'high';
  notes?: string;
  timestamp: Date;
  triggers?: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  category: 'tasks' | 'habits' | 'focus' | 'mood';
}