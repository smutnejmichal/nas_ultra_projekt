import React, { useState, useEffect } from 'react';

export default function App() {
  // Tab navigation state
  const [activeTab, setActiveTab] = useState('tasks');

  // Tasks state
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Review project wireframes', completed: false, category: 'Work', priority: 'High' },
    { id: 2, text: 'Morning workout (30 mins)', completed: true, category: 'Health', priority: 'Medium' },
    { id: 3, text: 'Read 2 chapters of current book', completed: false, category: 'Personal', priority: 'Low' }
  ]);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('Work');
  const [newTaskPriority, setNewTaskPriority] = useState('Medium');

  // Pomodoro timer state
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState('work'); // 'work' or 'break'
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  // Notes state
  const [notes, setNotes] = useState([
    { id: 1, title: 'Project Ideas', content: 'Explore micro-interactions for the dashboard. Keep animations subtle and responsive.' },
    { id: 2, title: 'Weekly Goals', content: 'Finish documentation, exercise 4 times, meal prep for the upcoming week.' }
  ]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');

  // Habits state
  const [habits, setHabits] = useState([
    { id: 1, name: 'Drink 2L Water', streak: 5, completedToday: true },
    { id: 2, name: 'Meditate (10 mins)', streak: 2, completedToday: false },
    { id: 3, name: 'Code for 1 Hour', streak: 12, completedToday: true }
  ]);
  const [newHabitName, setNewHabitName] = useState('');

  // Pomodoro countdown effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && pomodoroTime > 0) {
      interval = setInterval(() => {
        setPomodoroTime((prev) => prev - 1);
      }, 1000);
    } else if (pomodoroTime === 0) {
      setIsTimerRunning(false);
      if (timerMode === 'work') {
        setSessionsCompleted((prev) => prev + 1);
        setTimerMode('break');
        setPomodoroTime(5 * 60);
      } else {
        setTimerMode('work');
        setPomodoroTime(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, pomodoroTime, timerMode]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Task actions
  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: newTaskText.trim(),
        completed: false,
        category: newTaskCategory,
        priority: newTaskPriority
      }
    ]);
    setNewTaskText('');
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  // Note actions
  const addNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim() && !newNoteContent.trim()) return;
    setNotes([
      ...notes,
      {
        id: Date.now(),
        title: newNoteTitle.trim() || 'Untitled Note',
        content: newNoteContent.trim()
      }
    ]);
    setNewNoteTitle('');
    setNewNoteContent('');
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  // Habit actions
  const addHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;
    setHabits([
      ...habits,
      {
        id: Date.now(),
        name: newHabitName.trim(),
        streak: 0,
        completedToday: false
      }
    ]);
    setNewHabitName('');
  };

  const toggleHabit = (id: number) => {
    setHabits(habits.map(h => {
      if (h.id === id) {
        const completedToday = !h.completedToday;
        const streak = completedToday ? h.streak + 1 : Math.max(0, h.streak - 1);
        return { ...h, completedToday, streak };
      }
      return h;
    }));
  };

  const deleteHabit = (id: number) => {
    setHabits(habits.filter(h => h.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans select-none">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-sm shadow-indigo-200">
            P
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 leading-none">Productivity Hub</h1>
            <p className="text-xs text-slate-500 mt-1">Organize your workflow & focus effortlessly</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>{sessionsCompleted} Pomodoros completed today</span>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-4 flex flex-row md:flex-col justify-between md:justify-start space-x-2 md:space-x-0 md:space-y-1">
          <div className="flex md:flex-col space-x-1 md:space-x-0 md:space-y-1 w-full justify-around md:justify-start">
            <button
              onClick={() => setActiveTab('tasks')}
              className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 w-full text-left ${
                activeTab === 'tasks'
                  ? 'bg-indigo-50 text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012-2m-6 9l2 2 4-4" />
              </svg>
              <span className="hidden md:inline">Tasks</span>
            </button>

            <button
              onClick={() => setActiveTab('timer')}
              className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 w-full text-left ${
                activeTab === 'timer'
                  ? 'bg-indigo-50 text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="hidden md:inline">Pomodoro</span>
            </button>

            <button
              onClick={() => setActiveTab('notes')}
              className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 w-full text-left ${
                activeTab === 'notes'
                  ? 'bg-indigo-50 text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span className="hidden md:inline">Quick Notes</span>
            </button>

            <button
              onClick={() => setActiveTab('habits')}
              className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 w-full text-left ${
                activeTab === 'habits'
                  ? 'bg-indigo-50 text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="hidden md:inline">Habit Tracker</span>
            </button>
          </div>

          <div className="hidden md:block p-4 bg-slate-50 rounded-2xl border border-slate-200 mt-auto">
            <p className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Quick Stats</p>
            <div className="mt-2 space-y-1 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Pending Tasks:</span>
                <span className="font-bold text-slate-800">{tasks.filter(t => !t.completed).length}</span>
              </div>
              <div className="flex justify-between">
                <span>Active Habits:</span>
                <span className="font-bold text-slate-800">{habits.length}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-50/50">
          {/* TASKS VIEW */}
          {activeTab === 'tasks' && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Tasks & Objectives</h2>
                  <p className="text-sm text-slate-500 mt-0.5">Manage daily tasks, priorities, and categories.</p>
                </div>
                <div className="text-xs bg-indigo-50 text-indigo-700 font-semibold px-3 py-1 rounded-full">
                  {tasks.filter(t => t.completed).length} / {tasks.length} completed
                </div>
              </div>

              {/* Add Task Form */}
              <form onSubmit={addTask} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="What needs to be done?"
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm"
                />
                <select
                  value={newTaskCategory}
                  onChange={(e) => setNewTaskCategory(e.target.value)}
                  className="px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm bg-white"
                >
                  <option value="Work">Work</option>
                  <option value="Health">Health</option>
                  <option value="Personal">Personal</option>
                </select>
                <select
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value)}
                  className="px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm bg-white"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition-all shadow-sm shadow-indigo-200 cursor-pointer"
                >
                  Add Task
                </button>
              </form>

              {/* Tasks List */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden divide-y divide-slate-100">
                {tasks.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 text-sm">No tasks added yet. Get started above!</div>
                ) : (
                  tasks.map((task) => (
                    <div key={task.id} className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(task.id)}
                          className="w-5 h-5 rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                        />
                        <div className="flex flex-col min-w-0">
                          <span className={`text-sm font-medium truncate ${task.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                            {task.text}
                          </span>
                          <div className="flex items-center space-x-2 mt-0.5">
                            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                              {task.category}
                            </span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${
                              task.priority === 'High' ? 'bg-rose-50 text-rose-600' :
                              task.priority === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
                            }`}>
                              {task.priority} Priority
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-slate-400 hover:text-rose-600 p-2 rounded-lg transition-colors cursor-pointer"
                        title="Delete task"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* POMODORO TIMER VIEW */}
          {activeTab === 'timer' && (
            <div className="max-w-xl mx-auto space-y-6 text-center">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Pomodoro Focus Timer</h2>
                <p className="text-sm text-slate-500 mt-0.5">Boost deep work sessions with timed intervals.</p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center">
                <div className="flex space-x-2 bg-slate-100 p-1.5 rounded-2xl mb-8">
                  <button
                    onClick={() => {
                      setIsTimerRunning(false);
                      setTimerMode('work');
                      setPomodoroTime(25 * 60);
                    }}
                    className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                      timerMode === 'work' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Work (25m)
                  </button>
                  <button
                    onClick={() => {
                      setIsTimerRunning(false);
                      setTimerMode('break');
                      setPomodoroTime(5 * 60);
                    }}
                    className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                      timerMode === 'break' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Break (5m)
                  </button>
                </div>

                <div className="text-6xl sm:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 font-mono">
                  {formatTime(pomodoroTime)}
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className={`px-8 py-3 rounded-2xl font-bold text-sm text-white transition-all shadow-md cursor-pointer ${
                      isTimerRunning
                        ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-200'
                        : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'
                    }`}
                  >
                    {isTimerRunning ? 'Pause Timer' : 'Start Focus'}
                  </button>
                  <button
                    onClick={() => {
                      setIsTimerRunning(false);
                      setPomodoroTime(timerMode === 'work' ? 25 * 60 : 5 * 60);
                    }}
                    className="px-6 py-3 rounded-2xl font-bold text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* NOTES VIEW */}
          {activeTab === 'notes' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Quick Notes</h2>
                <p className="text-sm text-slate-500 mt-0.5">Capture swift insights, thoughts, and memos.</p>
              </div>

              {/* Add Note Form */}
              <form onSubmit={addNote} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <input
                  type="text"
                  placeholder="Note title..."
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm font-semibold"
                />
                <textarea
                  placeholder="Write note contents..."
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm resize-none"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition-all shadow-sm shadow-indigo-200 cursor-pointer"
                  >
                    Create Note
                  </button>
                </div>
              </form>

              {/* Notes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {notes.length === 0 ? (
                  <div className="col-span-2 p-8 text-center text-slate-400 text-sm bg-white rounded-2xl border border-slate-200">
                    No notes saved yet. Jot something down above!
                  </div>
                ) : (
                  notes.map((note) => (
                    <div key={note.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-3 relative group">
                      <div>
                        <h3 className="font-bold text-slate-900 text-base">{note.title}</h3>
                        <p className="text-sm text-slate-600 mt-1 whitespace-pre-wrap leading-relaxed">{note.content}</p>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <span className="text-[10px] text-slate-400">Saved securely</span>
                        <button
                          onClick={() => deleteNote(note.id)}
                          className="text-slate-400 hover:text-rose-600 text-xs font-medium transition-colors cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* HABITS VIEW */}
          {activeTab === 'habits' && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Habit Tracker</h2>
                <p className="text-sm text-slate-500 mt-0.5">Build consistency and maintain daily streaks.</p>
              </div>

              {/* Add Habit Form */}
              <form onSubmit={addHabit} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex gap-3">
                <input
                  type="text"
                  placeholder="New habit name (e.g., Read 15 mins)..."
                  value={newHabitName}
                  onChange={(e) => setNewHabitName(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition-all shadow-sm shadow-indigo-200 cursor-pointer"
                >
                  Add Habit
                </button>
              </form>

              {/* Habits List */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden divide-y divide-slate-100">
                {habits.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 text-sm">No habits added yet. Start tracking today!</div>
                ) : (
                  habits.map((habit) => (
                    <div key={habit.id} className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => toggleHabit(habit.id)}
                          className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                            habit.completedToday
                              ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-200'
                              : 'bg-slate-100 border border-slate-200 hover:bg-slate-200'
                          }`}
                          title="Toggle today's completion"
                        >
                          {habit.completedToday && (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                        <div>
                          <span className={`text-sm font-semibold ${habit.completedToday ? 'text-slate-900' : 'text-slate-700'}`}>
                            {habit.name}
                          </span>
                          <div className="flex items-center space-x-1 mt-0.5 text-xs text-amber-600 font-medium">
                            <span>🔥 {habit.streak} day streak</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteHabit(habit.id)}
                        className="text-slate-400 hover:text-rose-600 p-2 rounded-lg transition-colors cursor-pointer"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}