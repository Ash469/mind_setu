import React, { useState, useEffect } from 'react';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import EmotionalCheckin from './components/EmotionalCheckin';
import TaskDetail from './components/TaskDetail';
import AddTask from './components/AddTask';
import WeeklyInsights from './components/WeeklyInsights';
import HabitTracker from './components/HabitTracker';
import FocusTimer from './components/FocusTimer';
import MoodTracker from './components/MoodTracker';
import Achievements from './components/Achievements';
import { Task, EmotionalState, CheckinResponse, Habit, FocusSession, MoodEntry, Achievement } from './types';
import { sampleTasks, sampleHabits, sampleMoodEntries, sampleAchievements } from './data/sampleData';

function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [currentView, setCurrentView] = useState<'dashboard' | 'checkin' | 'task' | 'add' | 'insights' | 'habits' | 'focus' | 'mood' | 'achievements'>('dashboard');
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [habits, setHabits] = useState<Habit[]>(sampleHabits);
  const [focusSessions, setFocusSessions] = useState<FocusSession[]>([]);
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>(sampleMoodEntries);
  const [achievements, setAchievements] = useState<Achievement[]>(sampleAchievements);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [checkinTask, setCheckinTask] = useState<Task | null>(null);

  const handleTaskReminder = (task: Task) => {
    setCheckinTask(task);
    setCurrentView('checkin');
  };

  const handleCheckinComplete = (response: CheckinResponse) => {
    if (checkinTask) {
      const updatedTask = {
        ...checkinTask,
        lastCheckin: response,
        adaptedAction: generateAdaptedAction(checkinTask, response)
      };
      
      setTasks(prev => prev.map(t => t.id === checkinTask.id ? updatedTask : t));
      setSelectedTask(updatedTask);
      setCurrentView('task');
    }
  };

  const generateAdaptedAction = (task: Task, response: CheckinResponse): string => {
    const { mood, willingness } = response;
    
    if (willingness === 'high' && (mood === 'good' || mood === 'neutral')) {
      return `Great energy! Start the full task: "${task.title}"`;
    } else if (willingness === 'medium') {
      return getMicroAction(task, 'medium');
    } else {
      return getMicroAction(task, 'low');
    }
  };

  const getMicroAction = (task: Task, level: 'medium' | 'low'): string => {
    const microActions = {
      'Write project report': {
        medium: 'Open the document and write just one paragraph',
        low: 'Open the document and write one sentence'
      },
      'Go to gym': {
        medium: 'Put on workout clothes and do 5 minutes of stretching',
        low: 'Put on your gym shoes and take 3 deep breaths'
      },
      'Clean kitchen': {
        medium: 'Clear and wipe down just the counter',
        low: 'Put away 3 items from the counter'
      },
      'Call mom': {
        medium: 'Send a quick text saying you\'ll call soon',
        low: 'Add mom\'s contact to your favorites'
      }
    };

    return microActions[task.title as keyof typeof microActions]?.[level] || 
           (level === 'medium' ? `Break "${task.title}" into smaller steps` : `Take one tiny step toward "${task.title}"`);
  };

  const addTask = (taskData: Omit<Task, 'id' | 'completed' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      completed: false,
      createdAt: new Date()
    };
    setTasks(prev => [...prev, newTask]);
    setCurrentView('dashboard');
  };

  const completeTask = (taskId: string, completionMood: EmotionalState) => {
    setTasks(prev => prev.map(t => 
      t.id === taskId 
        ? { ...t, completed: true, completionMood, completedAt: new Date() }
        : t
    ));
  };

  const completeHabit = (habitId: string) => {
    const today = new Date();
    setHabits(prev => prev.map(habit => 
      habit.id === habitId 
        ? { 
            ...habit, 
            completedDates: [...habit.completedDates, today],
            streak: habit.streak + 1
          }
        : habit
    ));
  };

  const addFocusSession = (session: Omit<FocusSession, 'id'>) => {
    const newSession: FocusSession = {
      ...session,
      id: Date.now().toString()
    };
    setFocusSessions(prev => [...prev, newSession]);
  };

  const addMoodEntry = (entry: Omit<MoodEntry, 'id'>) => {
    const newEntry: MoodEntry = {
      ...entry,
      id: Date.now().toString()
    };
    setMoodEntries(prev => [newEntry, ...prev]);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {currentView === 'dashboard' && (
        <Dashboard 
          tasks={tasks}
          onTaskReminder={handleTaskReminder}
          onAddTask={() => setCurrentView('add')}
          onViewInsights={() => setCurrentView('insights')}
          onViewHabits={() => setCurrentView('habits')}
          onViewFocus={() => setCurrentView('focus')}
          onViewMood={() => setCurrentView('mood')}
          onViewAchievements={() => setCurrentView('achievements')}
        />
      )}
      
      {currentView === 'checkin' && checkinTask && (
        <EmotionalCheckin 
          task={checkinTask}
          onComplete={handleCheckinComplete}
          onBack={() => setCurrentView('dashboard')}
        />
      )}
      
      {currentView === 'task' && selectedTask && (
        <TaskDetail 
          task={selectedTask}
          onBack={() => setCurrentView('dashboard')}
          onComplete={completeTask}
        />
      )}
      
      {currentView === 'add' && (
        <AddTask 
          onAdd={addTask}
          onBack={() => setCurrentView('dashboard')}
        />
      )}
      
      {currentView === 'insights' && (
        <WeeklyInsights 
          tasks={tasks}
          onBack={() => setCurrentView('dashboard')}
        />
      )}
      
      {currentView === 'habits' && (
        <HabitTracker 
          habits={habits}
          onBack={() => setCurrentView('dashboard')}
          onAddHabit={() => {/* TODO: Add habit form */}}
          onCompleteHabit={completeHabit}
        />
      )}
      
      {currentView === 'focus' && (
        <FocusTimer 
          onBack={() => setCurrentView('dashboard')}
          onSessionComplete={addFocusSession}
        />
      )}
      
      {currentView === 'mood' && (
        <MoodTracker 
          moodEntries={moodEntries}
          onBack={() => setCurrentView('dashboard')}
          onAddMoodEntry={addMoodEntry}
        />
      )}
      
      {currentView === 'achievements' && (
        <Achievements 
          achievements={achievements}
          onBack={() => setCurrentView('dashboard')}
        />
      )}
    </div>
  );
}

export default App;