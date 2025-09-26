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
  streak: number;
  completedDates: Date[];
  createdAt: Date;
  color: string;
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