import React, { useState, useEffect } from 'react';
import Onboarding from './components/Onboarding';
import PriorityHabitSelection from './components/PriorityHabitSelection';
import PriorityHabitCheckin from './components/PriorityHabitCheckin';
import Dashboard from './components/Dashboard';
import EmotionalCheckin from './components/EmotionalCheckin';
import TaskDetail from './components/TaskDetail';
import AddTask from './components/AddTask';
import WeeklyInsights from './components/WeeklyInsights';
import HabitTracker from './components/HabitTracker';
import FocusTimer from './components/FocusTimer';
import MoodTracker from './components/MoodTracker';
import Achievements from './components/Achievements';
import PremiumUpgrade from './components/PremiumUpgrade';
import { Task, EmotionalState, CheckinResponse, Habit, FocusSession, MoodEntry, Achievement, PriorityHabit, PriorityHabitEvent } from './types';
import { UserPlan } from './types';
import { sampleTasks, sampleHabits, sampleMoodEntries, sampleAchievements } from './data/sampleData';

function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [showPrioritySelection, setShowPrioritySelection] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'checkin' | 'priority-checkin' | 'task' | 'add' | 'insights' | 'habits' | 'focus' | 'mood' | 'achievements' | 'premium'>('dashboard');
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [habits, setHabits] = useState<Habit[]>(sampleHabits);
  const [focusSessions, setFocusSessions] = useState<FocusSession[]>([]);
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>(sampleMoodEntries);
  const [achievements, setAchievements] = useState<Achievement[]>(sampleAchievements);
  const [priorityHabit, setPriorityHabit] = useState<PriorityHabit | null>(null);
  const [priorityHabitEvents, setPriorityHabitEvents] = useState<PriorityHabitEvent[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [checkinTask, setCheckinTask] = useState<Task | null>(null);
  const [userPlan, setUserPlan] = useState<UserPlan>({ type: 'free' });

  const handleTaskReminder = (task: Task) => {
    // Free users only get emotional check-ins for priority tasks
    // Premium users get emotional check-ins for all tasks
    const shouldShowCheckin = userPlan.type === 'premium' || task.isPriority;
    
    if (shouldShowCheckin && task.isPriority) {
      setCheckinTask(task);
      setCurrentView('priority-checkin');
    } else if (shouldShowCheckin) {
      setCheckinTask(task);
      setCurrentView('checkin');
    } else {
      // Simple reminder for free users on non-priority tasks
      alert(`Reminder: ${task.title}\n\nScheduled for: ${task.scheduledTime.toLocaleString()}`);
    }
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

  const completeTaskWithPhoto = (taskId: string, completionMood: EmotionalState, photo: string) => {
    setTasks(prev => prev.map(t => 
      t.id === taskId 
        ? { ...t, completed: true, completionMood, completedAt: new Date(), completionPhoto: photo }
        : t
    ));
  };

  const handleUpgrade = () => {
    setCurrentView('premium');
  };

  const handlePremiumUpgrade = () => {
    // In a real app, this would integrate with payment processing
    setUserPlan({ type: 'premium' });
    setCurrentView('dashboard');
    alert('Welcome to Premium! 🎉\nYou now have access to all features.');
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
    setShowPrioritySelection(true);
  };

  const handlePriorityHabitComplete = (habitData: Omit<PriorityHabit, 'id' | 'createdAt'>) => {
    const newPriorityHabit: PriorityHabit = {
      ...habitData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setPriorityHabit(newPriorityHabit);
    setShowPrioritySelection(false);
    
    // Add priority habit as a regular habit too
    const newHabit: Habit = {
      id: Date.now().toString(),
      name: habitData.name,
      category: habitData.category,
      targetFrequency: 'weekly',
      weeklyTarget: habitData.weeklyTarget,
      streak: 0,
      completedDates: [],
      createdAt: new Date(),
      color: '#EAB308',
      isPriority: true
    };
    setHabits(prev => [...prev, newHabit]);
  };

  const handlePriorityHabitCheckin = (response: {
    willingness: 'low' | 'medium' | 'high';
    emotion: EmotionalState;
    adaptedAction: string;
  }) => {
    if (checkinTask && priorityHabit) {
      const event: PriorityHabitEvent = {
        id: Date.now().toString(),
        habitId: priorityHabit.id,
        willingness: response.willingness,
        emotion: response.emotion,
        adaptedAction: response.adaptedAction,
        completed: false,
        timestamp: new Date()
      };
      setPriorityHabitEvents(prev => [...prev, event]);
      
      // Update task with adapted action
      const updatedTask = {
        ...checkinTask,
        adaptedAction: response.adaptedAction,
        lastCheckin: {
          mood: response.emotion,
          willingness: response.willingness,
          timestamp: new Date()
        }
      };
      
      setTasks(prev => prev.map(t => t.id === checkinTask.id ? updatedTask : t));
      setSelectedTask(updatedTask);
      setCurrentView('task');
    }
  };

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  if (showPrioritySelection) {
    return (
      <PriorityHabitSelection 
        onComplete={handlePriorityHabitComplete}
        onBack={() => setShowPrioritySelection(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {currentView === 'dashboard' && (
        <Dashboard 
          tasks={tasks}
          userPlan={userPlan}
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
      
      {currentView === 'priority-checkin' && checkinTask && priorityHabit && (
        <PriorityHabitCheckin 
          habit={priorityHabit}
          onComplete={handlePriorityHabitCheckin}
          onBack={() => setCurrentView('dashboard')}
        />
      )}
      
      {currentView === 'task' && selectedTask && (
        <TaskDetail 
          task={selectedTask}
          userPlan={userPlan}
          onBack={() => setCurrentView('dashboard')}
          onComplete={completeTask}
          onCompleteWithPhoto={completeTaskWithPhoto}
          onUpgrade={handleUpgrade}
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
      
      {currentView === 'premium' && (
        <PremiumUpgrade 
          onBack={() => setCurrentView('dashboard')}
          onUpgrade={handlePremiumUpgrade}
        />
      )}
    </div>
  );
}

export default App;