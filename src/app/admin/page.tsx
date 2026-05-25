'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  User, 
  FileText, 
  Activity, 
  ArrowLeft, 
  Plus, 
  Edit2, 
  Trash2, 
  Upload, 
  Save, 
  Check, 
  Loader2, 
  Moon, 
  Sun,
  Lock,
  Eye,
  LogOut,
  FolderOpen,
  AlertTriangle,
  Star
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Profile {
  id: string;
  name: string;
  title: string;
  bio: string;
  headshotUrl: string;
  academicFocus: string;
  email: string;
  linkedinUrl: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  url?: string | null;
  dataPointsCount?: number | null;
  publishedAt: string;
  pdfUrl?: string | null;
}

interface ActivityItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  imageUrl?: string | null;
  certificateUrl?: string | null;
  isTop3?: boolean;
}

export default function AdminDashboard() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Theme State
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'activities'>('profile');

  // Backend Datasets
  const [profile, setProfile] = useState<Profile>({
    id: 'profile-1',
    name: '',
    title: '',
    bio: '',
    headshotUrl: '',
    academicFocus: '',
    email: '',
    linkedinUrl: ''
  });
  const [projects, setProjects] = useState<Project[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);

  // Loading & Saving States
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);
  
  // Notification Banner
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Forms / Modals States for Adding & Editing Projects/Activities
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState<Omit<Project, 'id'>>({
    title: '',
    description: '',
    category: 'Creative Economy',
    url: '',
    dataPointsCount: 1000,
    publishedAt: '',
    pdfUrl: ''
  });
  const [showAddProject, setShowAddProject] = useState<boolean>(false);

  const [editingActivity, setEditingActivity] = useState<ActivityItem | null>(null);
  const [newActivity, setNewActivity] = useState<Omit<ActivityItem, 'id'>>({
    role: '',
    organization: '',
    period: '',
    description: '',
    imageUrl: '',
    certificateUrl: '',
    isTop3: false
  });
  const [showAddActivity, setShowAddActivity] = useState<boolean>(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; title: string; type: 'project' | 'activity' } | null>(null);

  // Theme Sync on Mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        setTheme('dark');
        document.documentElement.classList.add('dark');
      } else {
        setTheme('light');
        document.documentElement.classList.remove('dark');
      }
    }
    fetchDashboardData();
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setTheme('light');
    }
  };

  // Toast Helper
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Fetch Data from Server API
  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin');
      const data = await response.json();
      if (data.success) {
        setProfile(data.profile);
        setProjects(data.projects);
        setActivities(data.activities);
      } else {
        showToast(data.error || 'Failed to load portfolio items.', 'error');
      }
    } catch (error) {
      console.error("Dashboard load failed:", error);
      showToast('Network error loading data.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Save General Profile Info
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_profile',
          payload: profile
        })
      });
      const data = await response.json();
      if (data.success) {
        setProfile(data.profile);
        showToast('Academic profile updated successfully!');
      } else {
        showToast(data.error || 'Failed to save profile.', 'error');
      }
    } catch (error) {
      showToast('Error saving profile details.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  // Profile Photo Drag and Drop / Selection File Handler
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);
    const file = files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('isProfile', 'true');

    try {
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setProfile(prev => ({ ...prev, headshotUrl: data.url }));
        showToast('Profile image updated successfully!');
      } else {
        showToast(data.error || 'Upload failed.', 'error');
      }
    } catch (error) {
      showToast('Error uploading photo asset.', 'error');
    } finally {
      setUploadingImage(false);
    }
  };

  // Reusable File Upload Handler for projects and activities
  const handleGenericFileUpload = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('isProfile', 'false');

    try {
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        return data.url;
      } else {
        showToast(data.error || 'Upload failed.', 'error');
        return null;
      }
    } catch (error) {
      showToast('Error uploading file asset.', 'error');
      return null;
    }
  };

  // Projects CRUD Actions
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add_project',
          payload: {
            ...newProject,
            dataPointsCount: Number(newProject.dataPointsCount) || null
          }
        })
      });
      const data = await response.json();
      if (data.success) {
        setProjects(prev => [...prev, data.project]);
        setShowAddProject(false);
        setNewProject({
          title: '',
          description: '',
          category: 'Creative Economy',
          url: '',
          dataPointsCount: 1000,
          publishedAt: '',
          pdfUrl: ''
        });
        showToast('New project essay created!');
      } else {
        showToast(data.error || 'Failed to add project.', 'error');
      }
    } catch (error) {
      showToast('Error creating project essay.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    setIsSaving(true);
    try {
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_project',
          payload: {
            ...editingProject,
            dataPointsCount: Number(editingProject.dataPointsCount) || null
          }
        })
      });
      const data = await response.json();
      if (data.success) {
        setProjects(prev => prev.map(p => p.id === data.project.id ? data.project : p));
        setEditingProject(null);
        showToast('Project essay updated successfully!');
      } else {
        showToast(data.error || 'Failed to update project.', 'error');
      }
    } catch (error) {
      showToast('Error updating project.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleExecuteDelete = async () => {
    if (!deleteConfirm) return;
    const { id, type } = deleteConfirm;
    setIsSaving(true);
    try {
      if (type === 'project') {
        const response = await fetch('/api/admin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'delete_project',
            payload: { id }
          })
        });
        const data = await response.json();
        if (data.success) {
          setProjects(prev => prev.filter(p => p.id !== id));
          showToast('Project essay deleted successfully.');
        } else {
          showToast('Failed to delete project.', 'error');
        }
      } else {
        const response = await fetch('/api/admin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'delete_activity',
            payload: { id }
          })
        });
        const data = await response.json();
        if (data.success) {
          setActivities(prev => prev.filter(a => a.id !== id));
          showToast('Activity record deleted.');
        } else {
          showToast('Failed to delete activity.', 'error');
        }
      }
    } catch (error) {
      showToast('Error executing delete operation.', 'error');
    } finally {
      setIsSaving(false);
      setDeleteConfirm(null);
    }
  };

  // Activities CRUD Actions
  const handleAddActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add_activity',
          payload: newActivity
        })
      });
      const data = await response.json();
      if (data.success) {
        setActivities(prev => [...prev, data.activity]);
        setShowAddActivity(false);
        setNewActivity({
          role: '',
          organization: '',
          period: '',
          description: '',
          imageUrl: '',
          certificateUrl: '',
          isTop3: false
        });
        showToast('New activity entry added!');
      } else {
        showToast(data.error || 'Failed to add activity.', 'error');
      }
    } catch (error) {
      showToast('Error creating activity entry.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingActivity) return;
    setIsSaving(true);
    try {
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_activity',
          payload: editingActivity
        })
      });
      const data = await response.json();
      if (data.success) {
        setActivities(prev => prev.map(a => a.id === data.activity.id ? data.activity : a));
        setEditingActivity(null);
        showToast('Activity record updated!');
      } else {
        showToast(data.error || 'Failed to update activity.', 'error');
      }
    } catch (error) {
      showToast('Error updating activity.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  // Skeleton Loader screen for high-fidelity UI entry
  if (isLoading) {

    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 transition-colors duration-300">
        <Loader2 className="h-10 w-10 text-sky-600 dark:text-sky-400 animate-spin mb-4" />
        <span className="text-sm font-bold text-slate-500 dark:text-slate-400 tracking-widest uppercase animate-pulse">
          Loading Portfolio Database...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 pb-20 font-sans">
      
      {/* Dynamic Status Toast Banner */}
      {notification && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-xl border animate-reveal transition-all ${
          notification.type === 'success' 
            ? 'bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300' 
            : 'bg-rose-50 dark:bg-rose-950 border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-300'
        }`}>
          <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
            notification.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
          }`}>
            <Check className="h-3.5 w-3.5" />
          </div>
          <span className="text-sm font-semibold">{notification.message}</span>
        </div>
      )}

      {/* Admin Navbar */}
      <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push('/')}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
              title="Return to Home Portfolio"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  Academic Admin Console
                </span>
                <span className="text-[9px] font-black uppercase bg-sky-100 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 px-2 py-0.5 rounded-full select-none">
                  SECURE
                </span>
              </div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5 block font-bold leading-none">
                Luthfiyah Zahra Aqilah
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Live Home Page link */}
            <button
              onClick={() => router.push('/')}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
            >
              <Eye className="h-4 w-4" />
              <span>View Portfolio</span>
            </button>

            {/* Sun / Moon Theme toggler */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
            >
              {theme === 'dark' ? <Sun className="h-4.5 w-4.5 text-amber-500" /> : <Moon className="h-4.5 w-4.5 text-slate-600" />}
            </button>

            <div className="h-5 w-px bg-slate-200 dark:bg-slate-800 mx-1"></div>

            {/* Sign Out / Exit button */}
            <button
              onClick={() => router.push('/')}
              className="p-2 rounded-xl text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all cursor-pointer"
              title="Sign Out / Exit"
            >
              <LogOut className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Welcome banner */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-gradient-to-r from-sky-500/10 to-indigo-500/10 dark:from-sky-950/40 dark:to-indigo-950/40 rounded-3xl p-6 sm:p-8 border border-sky-100/50 dark:border-sky-950 select-none flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 transition-all duration-300">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight leading-tight">
              Welcome Back, Luthfiyah!
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              Add and manage your academic publications, development policy essays, and organizational activities. Updates propagate to your portfolio landing page instantly.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="flex items-center justify-center h-10 w-10 bg-sky-500 text-white rounded-2xl shadow-lg shadow-sky-500/20 font-bold font-serif">
              LA
            </span>
            <div>
              <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">Database Engine</span>
              <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mt-0.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
                Active Fallback JSON Mode
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Admin Console Tabs and Workspace */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side Tab Controls */}
          <div className="lg:col-span-3 space-y-2">
            <span className="block text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest pl-2 mb-2">
              Console Directory
            </span>
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-200 text-left cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-sky-600 dark:bg-sky-500 text-white shadow-lg shadow-sky-500/20'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-800/80 hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
              }`}
            >
              <User className="h-4.5 w-4.5" />
              <span>Academic Profile</span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-200 text-left cursor-pointer ${
                activeTab === 'projects'
                  ? 'bg-sky-600 dark:bg-sky-500 text-white shadow-lg shadow-sky-500/20'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-800/80 hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
              }`}
            >
              <FileText className="h-4.5 w-4.5" />
              <span>Research Essays</span>
            </button>

            <button
              onClick={() => setActiveTab('activities')}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-200 text-left cursor-pointer ${
                activeTab === 'activities'
                  ? 'bg-sky-600 dark:bg-sky-500 text-white shadow-lg shadow-sky-500/20'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-800/80 hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
              }`}
            >
              <Activity className="h-4.5 w-4.5" />
              <span>Activities Timeline</span>
            </button>
          </div>

          {/* Right Side Workspace Area */}
          <div className="lg:col-span-9 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 sm:p-8 rounded-3xl transition-colors duration-300">
            
            {/* TAB 1: ACADEMIC PROFILE */}
            {activeTab === 'profile' && (
              <div className="space-y-8 animate-reveal">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-4 flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
                      Academic Profile Identity
                    </h2>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 leading-normal">
                      Update your primary contact info, profile headshot photograph, and economic academic focuses.
                    </p>
                  </div>
                  <User className="h-6 w-6 text-sky-500/50 shrink-0" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  {/* Left Column: Image Management */}
                  <div className="md:col-span-4 flex flex-col items-center">
                    <span className="block text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest mb-3 self-start">
                      Headshot Photo
                    </span>
                    <div className="relative group max-w-[200px] w-full rounded-2xl overflow-hidden border-4 border-slate-50 dark:border-slate-850 shadow-md">
                      <img 
                        src={profile.headshotUrl || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=350"} 
                        alt={profile.name}
                        className="w-full aspect-[4/5] object-cover bg-slate-100 dark:bg-slate-950 transition-transform duration-500 group-hover:scale-105"
                      />
                      {uploadingImage && (
                        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xs flex flex-col items-center justify-center text-center p-2 text-white">
                          <Loader2 className="h-6 w-6 animate-spin text-sky-400 mb-2" />
                          <span className="text-[10px] font-bold uppercase tracking-wider">Uploading...</span>
                        </div>
                      )}
                    </div>

                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handlePhotoUpload}
                      accept="image/*"
                      className="hidden"
                    />

                    <button
                      type="button"
                      disabled={uploadingImage}
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-4 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-sky-600 hover:text-white dark:hover:bg-sky-500 dark:hover:text-white text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer w-full max-w-[200px]"
                    >
                      <Upload className="h-4 w-4" />
                      <span>{uploadingImage ? 'Uploading...' : 'Replace Photo'}</span>
                    </button>
                    
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 text-center max-w-[180px]">
                      Recommended: High resolution 4:5 vertical portrait image.
                    </p>
                  </div>

                  {/* Right Column: Form Inputs */}
                  <form onSubmit={handleSaveProfile} className="md:col-span-8 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                          Full Name
                        </label>
                        <input 
                          type="text" 
                          required
                          value={profile.name}
                          onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full text-xs bg-slate-50/50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 dark:text-white transition-all font-sans"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                          Academic Title / Subtitle
                        </label>
                        <input 
                          type="text" 
                          required
                          value={profile.title}
                          onChange={(e) => setProfile(prev => ({ ...prev, title: e.target.value }))}
                          className="w-full text-xs bg-slate-50/50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 dark:text-white transition-all font-sans"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                          Email Contact
                        </label>
                        <input 
                          type="email" 
                          required
                          value={profile.email}
                          onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full text-xs bg-slate-50/50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 dark:text-white transition-all font-sans"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                          Instagram / Social Link
                        </label>
                        <input 
                          type="url" 
                          required
                          value={profile.linkedinUrl}
                          onChange={(e) => setProfile(prev => ({ ...prev, linkedinUrl: e.target.value }))}
                          className="w-full text-xs bg-slate-50/50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 dark:text-white transition-all font-sans"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                        Academic Focus Disciplines
                      </label>
                      <input 
                        type="text" 
                        required
                        value={profile.academicFocus}
                        onChange={(e) => setProfile(prev => ({ ...prev, academicFocus: e.target.value }))}
                        className="w-full text-xs bg-slate-50/50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 dark:text-white transition-all font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                        Biography / Intro
                      </label>
                      <textarea 
                        rows={4}
                        required
                        value={profile.bio}
                        onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                        className="w-full text-xs bg-slate-50/50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 dark:text-white transition-all font-sans resize-none"
                      />
                    </div>

                    <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="flex items-center gap-2 px-6 py-3.5 bg-sky-600 dark:bg-sky-500 hover:bg-sky-700 dark:hover:bg-sky-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-sky-500/10 cursor-pointer disabled:opacity-50"
                      >
                        {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                        <span>{isSaving ? 'Saving Changes...' : 'Save Profile Details'}</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* TAB 2: PROJECTS & ESSAYS */}
            {activeTab === 'projects' && (
              <div className="space-y-8 animate-reveal">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-4 flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
                      Research Essays & Policy Papers
                    </h2>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 leading-normal">
                      Manage scientific reports, policy briefs, and statistical analysis sheets on your portfolio.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddProject(true)}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-sky-600 dark:bg-sky-500 hover:bg-sky-700 dark:hover:bg-sky-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-sky-500/10 cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Create New</span>
                  </button>
                </div>

                {/* ADD NEW PROJECT FORM MODAL OVERLAY */}
                {showAddProject && (
                  <div className="p-6 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-sky-100/50 dark:border-slate-800 shadow-inner animate-reveal">
                    <div className="flex items-center justify-between border-b border-slate-200/50 dark:border-slate-800 pb-3 mb-4">
                      <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest">
                        New Research Essay Details
                      </span>
                      <button 
                        onClick={() => setShowAddProject(false)}
                        className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>

                    <form onSubmit={handleAddProject} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                            Essay/Project Title
                          </label>
                          <input 
                            type="text" required placeholder="e.g. Analisis Disparitas Pembangunan Regional"
                            value={newProject.title}
                            onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
                            className="w-full text-xs bg-white dark:bg-slate-900 border border-slate-200/85 dark:border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:text-white transition-all font-sans"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                            Category discipline
                          </label>
                          <select
                            value={newProject.category}
                            onChange={(e) => setNewProject(prev => ({ ...prev, category: e.target.value }))}
                            className="w-full text-xs bg-white dark:bg-slate-900 border border-slate-200/85 dark:border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:text-white transition-all font-sans"
                          >
                            <option value="Creative Economy">Creative Economy</option>
                            <option value="Policy Review">Policy Review</option>
                            <option value="Regional Disparity">Regional Disparity</option>
                            <option value="Econometrics">Econometrics</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                            Published Date
                          </label>
                          <input 
                            type="text" required placeholder="e.g. April 2026"
                            value={newProject.publishedAt}
                            onChange={(e) => setNewProject(prev => ({ ...prev, publishedAt: e.target.value }))}
                            className="w-full text-xs bg-white dark:bg-slate-900 border border-slate-200/85 dark:border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:text-white transition-all font-sans"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                            Data Points Count
                          </label>
                          <input 
                            type="number" placeholder="e.g. 15600"
                            value={newProject.dataPointsCount || ''}
                            onChange={(e) => setNewProject(prev => ({ ...prev, dataPointsCount: Number(e.target.value) || null }))}
                            className="w-full text-xs bg-white dark:bg-slate-900 border border-slate-200/85 dark:border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:text-white transition-all font-sans"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                            Reference URL / Action Link
                          </label>
                          <input 
                            type="text" placeholder="#"
                            value={newProject.url || ''}
                            onChange={(e) => setNewProject(prev => ({ ...prev, url: e.target.value }))}
                            className="w-full text-xs bg-white dark:bg-slate-900 border border-slate-200/85 dark:border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:text-white transition-all font-sans"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                          Brief Essay Summary / Description
                        </label>
                        <textarea 
                          rows={3} required placeholder="Detailed outline of core research methodology and econometric modeling utilized..."
                          value={newProject.description}
                          onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                          className="w-full text-xs bg-white dark:bg-slate-900 border border-slate-200/85 dark:border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:text-white transition-all font-sans resize-none"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setShowAddProject(false)}
                          className="px-4 py-2 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 rounded-xl text-xs uppercase tracking-wider font-bold hover:bg-slate-100 dark:hover:bg-slate-850 cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isSaving}
                          className="flex items-center gap-1.5 px-6 py-2 bg-sky-600 dark:bg-sky-500 hover:bg-sky-700 dark:hover:bg-sky-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-sky-500/10 cursor-pointer disabled:opacity-50"
                        >
                          {isSaving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                          <span>Create Essay</span>
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* EDIT EXISTING PROJECT MODAL OVERLAY */}
                {editingProject && (
                  <div className="p-6 bg-amber-500/5 dark:bg-slate-950 rounded-2xl border border-amber-500/20 dark:border-slate-800 shadow-inner animate-reveal">
                    <div className="flex items-center justify-between border-b border-slate-200/50 dark:border-slate-800 pb-3 mb-4">
                      <span className="text-xs font-bold text-amber-600 dark:text-amber-500 uppercase tracking-widest flex items-center gap-1">
                        <Edit2 className="h-3.5 w-3.5" />
                        Edit Research Essay Details
                      </span>
                      <button 
                        onClick={() => setEditingProject(null)}
                        className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>

                    <form onSubmit={handleUpdateProject} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                            Essay/Project Title
                          </label>
                          <input 
                            type="text" required
                            value={editingProject.title}
                            onChange={(e) => setEditingProject(prev => prev ? ({ ...prev, title: e.target.value }) : null)}
                            className="w-full text-xs bg-white dark:bg-slate-900 border border-slate-200/85 dark:border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:text-white transition-all font-sans"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                            Category discipline
                          </label>
                          <select
                            value={editingProject.category}
                            onChange={(e) => setEditingProject(prev => prev ? ({ ...prev, category: e.target.value }) : null)}
                            className="w-full text-xs bg-white dark:bg-slate-900 border border-slate-200/85 dark:border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:text-white transition-all font-sans"
                          >
                            <option value="Creative Economy">Creative Economy</option>
                            <option value="Policy Review">Policy Review</option>
                            <option value="Regional Disparity">Regional Disparity</option>
                            <option value="Econometrics">Econometrics</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                            Published Date
                          </label>
                          <input 
                            type="text" required
                            value={editingProject.publishedAt}
                            onChange={(e) => setEditingProject(prev => prev ? ({ ...prev, publishedAt: e.target.value }) : null)}
                            className="w-full text-xs bg-white dark:bg-slate-900 border border-slate-200/85 dark:border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:text-white transition-all font-sans"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                            Data Points Count
                          </label>
                          <input 
                            type="number"
                            value={editingProject.dataPointsCount || ''}
                            onChange={(e) => setEditingProject(prev => prev ? ({ ...prev, dataPointsCount: Number(e.target.value) || null }) : null)}
                            className="w-full text-xs bg-white dark:bg-slate-900 border border-slate-200/85 dark:border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:text-white transition-all font-sans"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                            Reference URL / Action Link
                          </label>
                          <input 
                            type="text"
                            value={editingProject.url || ''}
                            onChange={(e) => setEditingProject(prev => prev ? ({ ...prev, url: e.target.value }) : null)}
                            className="w-full text-xs bg-white dark:bg-slate-900 border border-slate-200/85 dark:border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:text-white transition-all font-sans"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                          Brief Essay Summary / Description
                        </label>
                        <textarea 
                          rows={3} required
                          value={editingProject.description}
                          onChange={(e) => setEditingProject(prev => prev ? ({ ...prev, description: e.target.value }) : null)}
                          className="w-full text-xs bg-white dark:bg-slate-900 border border-slate-200/85 dark:border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:text-white transition-all font-sans resize-none"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setEditingProject(null)}
                          className="px-4 py-2 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 rounded-xl text-xs uppercase tracking-wider font-bold hover:bg-slate-100 dark:hover:bg-slate-850 cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isSaving}
                          className="flex items-center gap-1.5 px-6 py-2 bg-amber-500 dark:bg-amber-600 hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-amber-500/10 cursor-pointer disabled:opacity-50"
                        >
                          {isSaving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                          <span>Save Changes</span>
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* ESSAYS LIST LAYOUT */}
                <div className="grid grid-cols-1 gap-4">
                  {projects.length === 0 ? (
                    <div className="text-center p-12 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl select-none">
                      <FolderOpen className="h-10 w-10 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
                      <span className="block text-sm font-bold text-slate-500">No project essays found.</span>
                      <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1">
                        Use the "Create New" button at the top right to start adding quantitative scientific essays.
                      </p>
                    </div>
                  ) : (
                    projects.map((project) => (
                      <div 
                        key={project.id}
                        className="bg-slate-50/50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:border-sky-100 dark:hover:border-sky-900 transition-all duration-300"
                      >
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[9px] font-black uppercase bg-sky-50 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 px-2 py-0.5 rounded-full">
                              {project.category}
                            </span>
                            <span className="text-[10px] text-slate-450 dark:text-slate-500 font-semibold font-sans">
                              {project.publishedAt}
                            </span>
                          </div>
                          <h3 className="font-serif text-base font-extrabold text-slate-800 dark:text-slate-100 truncate">
                            {project.title}
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed max-w-2xl font-sans">
                            {project.description}
                          </p>
                          {project.dataPointsCount && (
                            <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">
                              Analyzed Data Points: {project.dataPointsCount.toLocaleString('id-ID')}
                            </span>
                          )}
                        </div>

                        <div className="flex sm:flex-col items-center justify-end gap-2 shrink-0">
                          <button
                            onClick={() => setEditingProject(project)}
                            className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 hover:text-amber-500 dark:hover:text-amber-400 transition-colors shadow-xs cursor-pointer"
                            title="Edit Project"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm({ id: project.id, title: project.title, type: 'project' })}
                            className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 hover:text-rose-500 dark:hover:text-rose-455 transition-colors shadow-xs cursor-pointer"
                            title="Delete Project"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: ACTIVITIES TIMELINE */}
            {activeTab === 'activities' && (
              <div className="space-y-8 animate-reveal">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-4 flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
                      Organizational Activities & Leadership
                    </h2>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 leading-normal">
                      Manage campus organizations, traditional art trophies, event choreography, and extracurricular leadership highlights.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddActivity(true)}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-sky-600 dark:bg-sky-500 hover:bg-sky-700 dark:hover:bg-sky-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-sky-500/10 cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Create New</span>
                  </button>
                </div>

                {/* ADD NEW ACTIVITY FORM MODAL OVERLAY */}
                {showAddActivity && (
                  <div className="p-6 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-sky-100/50 dark:border-slate-800 shadow-inner animate-reveal">
                    <div className="flex items-center justify-between border-b border-slate-200/50 dark:border-slate-800 pb-3 mb-4">
                      <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest">
                        New Activity Record Details
                      </span>
                      <button 
                        onClick={() => setShowAddActivity(false)}
                        className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>

                    <form onSubmit={handleAddActivity} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                            Role / Leadership title
                          </label>
                          <input 
                            type="text" required placeholder="e.g. CORE COMMITTEE MEMBER - BESTARI DANCE CLUB"
                            value={newActivity.role}
                            onChange={(e) => setNewActivity(prev => ({ ...prev, role: e.target.value }))}
                            className="w-full text-xs bg-white dark:bg-slate-900 border border-slate-200/85 dark:border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:text-white transition-all font-sans"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                            Activity Period
                          </label>
                          <input 
                            type="text" required placeholder="e.g. 2024 - 2025"
                            value={newActivity.period}
                            onChange={(e) => setNewActivity(prev => ({ ...prev, period: e.target.value }))}
                            className="w-full text-xs bg-white dark:bg-slate-900 border border-slate-200/85 dark:border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:text-white transition-all font-sans"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                          Host Organization / School
                        </label>
                        <input 
                          type="text" required placeholder="e.g. SMAN 12 Tangerang Selatan / Universitas Negeri Semarang"
                          value={newActivity.organization}
                          onChange={(e) => setNewActivity(prev => ({ ...prev, organization: e.target.value }))}
                          className="w-full text-xs bg-white dark:bg-slate-900 border border-slate-200/85 dark:border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:text-white transition-all font-sans"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                          Detailed Description of Responsibilities
                        </label>
                        <textarea 
                          rows={4} required placeholder="Responsible for coordinating weekly practice sessions, designing stage choreography, and synergy control..."
                          value={newActivity.description}
                          onChange={(e) => setNewActivity(prev => ({ ...prev, description: e.target.value }))}
                          className="w-full text-xs bg-white dark:bg-slate-900 border border-slate-200/85 dark:border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:text-white transition-all font-sans resize-none"
                        />
                      </div>

                      {/* Dynamic File Uploaders for Activity Illustration & Verified Certificate */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                            Activity Illustration / Photo (Optional)
                          </label>
                          <div className="flex items-center gap-3">
                            <input 
                              type="text" 
                              placeholder="Photo URL or Upload file..."
                              value={newActivity.imageUrl || ''}
                              onChange={(e) => setNewActivity(prev => ({ ...prev, imageUrl: e.target.value }))}
                              className="flex-1 text-xs bg-white dark:bg-slate-900 border border-slate-200/85 dark:border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:text-white transition-all font-sans"
                            />
                            <label className="shrink-0 p-3 bg-slate-100 dark:bg-slate-800 hover:bg-sky-600 hover:text-white dark:hover:bg-sky-500 text-slate-600 dark:text-slate-300 rounded-xl text-xs uppercase tracking-wider font-bold transition-all cursor-pointer">
                              <Upload className="h-4 w-4" />
                              <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={async (e) => {
                                  const files = e.target.files;
                                  if (files && files.length > 0) {
                                    const url = await handleGenericFileUpload(files[0]);
                                    if (url) setNewActivity(prev => ({ ...prev, imageUrl: url }));
                                  }
                                }}
                              />
                            </label>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                            Verified Certificate / Proof (Optional)
                          </label>
                          <div className="flex items-center gap-3">
                            <input 
                              type="text" 
                              placeholder="Certificate URL or Upload file..."
                              value={newActivity.certificateUrl || ''}
                              onChange={(e) => setNewActivity(prev => ({ ...prev, certificateUrl: e.target.value }))}
                              className="flex-1 text-xs bg-white dark:bg-slate-900 border border-slate-200/85 dark:border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:text-white transition-all font-sans"
                            />
                            <label className="shrink-0 p-3 bg-slate-100 dark:bg-slate-800 hover:bg-sky-600 hover:text-white dark:hover:bg-sky-500 text-slate-600 dark:text-slate-300 rounded-xl text-xs uppercase tracking-wider font-bold transition-all cursor-pointer">
                              <Upload className="h-4 w-4" />
                              <input 
                                type="file" 
                                accept="image/*,application/pdf" 
                                className="hidden" 
                                onChange={async (e) => {
                                  const files = e.target.files;
                                  if (files && files.length > 0) {
                                    const url = await handleGenericFileUpload(files[0]);
                                    if (url) setNewActivity(prev => ({ ...prev, certificateUrl: url }));
                                  }
                                }}
                              />
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Highlight Toggle Switch */}
                      <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200/85 dark:border-slate-800 rounded-2xl shadow-xs">
                        <div className="space-y-0.5">
                          <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block">
                            Highlight on Landing Page
                          </label>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-normal leading-normal">
                            Feature this achievement inside the Top 3 showcase of the homepage.
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setNewActivity(prev => ({ ...prev, isTop3: !prev.isTop3 }))}
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            newActivity.isTop3 ? 'bg-sky-600 dark:bg-sky-500' : 'bg-slate-200 dark:bg-slate-800'
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                              newActivity.isTop3 ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setShowAddActivity(false)}
                          className="px-4 py-2 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 rounded-xl text-xs uppercase tracking-wider font-bold hover:bg-slate-100 dark:hover:bg-slate-850 cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isSaving}
                          className="flex items-center gap-1.5 px-6 py-2 bg-sky-600 dark:bg-sky-500 hover:bg-sky-700 dark:hover:bg-sky-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-sky-500/10 cursor-pointer disabled:opacity-50"
                        >
                          {isSaving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                          <span>Create Activity</span>
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* EDIT EXISTING ACTIVITY MODAL OVERLAY */}
                {editingActivity && (
                  <div className="p-6 bg-amber-500/5 dark:bg-slate-950 rounded-2xl border border-amber-500/20 dark:border-slate-800 shadow-inner animate-reveal">
                    <div className="flex items-center justify-between border-b border-slate-200/50 dark:border-slate-800 pb-3 mb-4">
                      <span className="text-xs font-bold text-amber-600 dark:text-amber-500 uppercase tracking-widest flex items-center gap-1">
                        <Edit2 className="h-3.5 w-3.5" />
                        Edit Activity Record Details
                      </span>
                      <button 
                        onClick={() => setEditingActivity(null)}
                        className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>

                    <form onSubmit={handleUpdateActivity} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                            Role / Leadership title
                          </label>
                          <input 
                            type="text" required
                            value={editingActivity.role}
                            onChange={(e) => setEditingActivity(prev => prev ? ({ ...prev, role: e.target.value }) : null)}
                            className="w-full text-xs bg-white dark:bg-slate-900 border border-slate-200/85 dark:border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:text-white transition-all font-sans"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                            Activity Period
                          </label>
                          <input 
                            type="text" required
                            value={editingActivity.period}
                            onChange={(e) => setEditingActivity(prev => prev ? ({ ...prev, period: e.target.value }) : null)}
                            className="w-full text-xs bg-white dark:bg-slate-900 border border-slate-200/85 dark:border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:text-white transition-all font-sans"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                          Host Organization / School
                        </label>
                        <input 
                          type="text" required
                          value={editingActivity.organization}
                          onChange={(e) => setEditingActivity(prev => prev ? ({ ...prev, organization: e.target.value }) : null)}
                          className="w-full text-xs bg-white dark:bg-slate-900 border border-slate-200/85 dark:border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:text-white transition-all font-sans"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                          Detailed Description of Responsibilities
                        </label>
                        <textarea 
                          rows={4} required
                          value={editingActivity.description}
                          onChange={(e) => setEditingActivity(prev => prev ? ({ ...prev, description: e.target.value }) : null)}
                          className="w-full text-xs bg-white dark:bg-slate-900 border border-slate-200/85 dark:border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:text-white transition-all font-sans resize-none"
                        />
                      </div>

                      {/* Dynamic File Uploaders for Activity Illustration & Verified Certificate */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                            Activity Illustration / Photo (Optional)
                          </label>
                          <div className="flex items-center gap-3">
                            <input 
                              type="text" 
                              placeholder="Photo URL or Upload file..."
                              value={editingActivity.imageUrl || ''}
                              onChange={(e) => setEditingActivity(prev => prev ? ({ ...prev, imageUrl: e.target.value }) : null)}
                              className="flex-1 text-xs bg-white dark:bg-slate-900 border border-slate-200/85 dark:border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:text-white transition-all font-sans"
                            />
                            <label className="shrink-0 p-3 bg-slate-100 dark:bg-slate-800 hover:bg-sky-600 hover:text-white dark:hover:bg-sky-500 text-slate-600 dark:text-slate-300 rounded-xl text-xs uppercase tracking-wider font-bold transition-all cursor-pointer">
                              <Upload className="h-4 w-4" />
                              <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={async (e) => {
                                  const files = e.target.files;
                                  if (files && files.length > 0) {
                                    const url = await handleGenericFileUpload(files[0]);
                                    if (url) setEditingActivity(prev => prev ? ({ ...prev, imageUrl: url }) : null);
                                  }
                                }}
                              />
                            </label>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                            Verified Certificate / Proof (Optional)
                          </label>
                          <div className="flex items-center gap-3">
                            <input 
                              type="text" 
                              placeholder="Certificate URL or Upload file..."
                              value={editingActivity.certificateUrl || ''}
                              onChange={(e) => setEditingActivity(prev => prev ? ({ ...prev, certificateUrl: e.target.value }) : null)}
                              className="flex-1 text-xs bg-white dark:bg-slate-900 border border-slate-200/85 dark:border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:text-white transition-all font-sans"
                            />
                            <label className="shrink-0 p-3 bg-slate-100 dark:bg-slate-800 hover:bg-sky-600 hover:text-white dark:hover:bg-sky-500 text-slate-600 dark:text-slate-300 rounded-xl text-xs uppercase tracking-wider font-bold transition-all cursor-pointer">
                              <Upload className="h-4 w-4" />
                              <input 
                                type="file" 
                                accept="image/*,application/pdf" 
                                className="hidden" 
                                onChange={async (e) => {
                                  const files = e.target.files;
                                  if (files && files.length > 0) {
                                    const url = await handleGenericFileUpload(files[0]);
                                    if (url) setEditingActivity(prev => prev ? ({ ...prev, certificateUrl: url }) : null);
                                  }
                                }}
                              />
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Highlight Toggle Switch */}
                      <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200/85 dark:border-slate-800 rounded-2xl shadow-xs">
                        <div className="space-y-0.5">
                          <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block">
                            Highlight on Landing Page
                          </label>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-normal leading-normal">
                            Feature this achievement inside the Top 3 showcase of the homepage.
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setEditingActivity(prev => prev ? ({ ...prev, isTop3: !prev.isTop3 }) : null)}
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            editingActivity.isTop3 ? 'bg-sky-600 dark:bg-sky-500' : 'bg-slate-200 dark:bg-slate-800'
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                              editingActivity.isTop3 ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setEditingActivity(null)}
                          className="px-4 py-2 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 rounded-xl text-xs uppercase tracking-wider font-bold hover:bg-slate-100 dark:hover:bg-slate-850 cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isSaving}
                          className="flex items-center gap-1.5 px-6 py-2 bg-amber-500 dark:bg-amber-600 hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-amber-500/10 cursor-pointer disabled:opacity-50"
                        >
                          {isSaving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                          <span>Save Changes</span>
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* ACTIVITIES LIST LAYOUT */}
                <div className="grid grid-cols-1 gap-4">
                  {activities.length === 0 ? (
                    <div className="text-center p-12 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl select-none">
                      <FolderOpen className="h-10 w-10 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
                      <span className="block text-sm font-bold text-slate-500">No activity history found.</span>
                      <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1">
                        Use the "Create New" button at the top right to start adding your organizational accomplishments.
                      </p>
                    </div>
                  ) : (
                    activities.map((activity) => (
                      <div 
                        key={activity.id}
                        className="bg-slate-50/50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:border-sky-100 dark:hover:border-sky-900 transition-all duration-300"
                      >
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[9px] font-black uppercase bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full">
                              {activity.period}
                            </span>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold font-sans uppercase tracking-wider">
                              {activity.organization}
                            </span>
                            {activity.imageUrl && (
                              <span className="text-[9px] font-black uppercase bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full">
                                Photo
                              </span>
                            )}
                            {activity.certificateUrl && (
                              <span className="text-[9px] font-black uppercase bg-sky-50 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 px-2 py-0.5 rounded-full">
                                Certificate
                              </span>
                            )}
                            {activity.isTop3 && (
                              <span className="text-[9px] font-black uppercase bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <Star className="h-2.5 w-2.5 fill-amber-500 text-amber-500" />
                                <span>Featured</span>
                              </span>
                            )}
                          </div>
                          <h3 className="font-serif text-base font-extrabold text-slate-800 dark:text-slate-100 truncate">
                            {activity.role}
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed max-w-2xl font-sans">
                            {activity.description}
                          </p>
                        </div>

                        <div className="flex sm:flex-col items-center justify-end gap-2 shrink-0">
                          <button
                            onClick={() => setEditingActivity(activity)}
                            className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 hover:text-amber-500 dark:hover:text-amber-400 transition-colors shadow-xs cursor-pointer"
                            title="Edit Activity"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm({ id: activity.id, title: activity.role, type: 'activity' })}
                            className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 hover:text-rose-500 dark:hover:text-rose-455 transition-colors shadow-xs cursor-pointer"
                            title="Delete Activity"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* GORGEOUS CUSTOM GLASSMORPHISM DELETE CONFIRMATION MODAL */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-reveal">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl max-w-sm w-full p-6 sm:p-8 shadow-2xl animate-reveal select-none">
            <div className="flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-2xl bg-rose-50 dark:bg-rose-950/40 flex items-center justify-center text-rose-500 mb-4 ring-8 ring-rose-500/10">
                <AlertTriangle className="h-6 w-6 animate-pulse" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-black text-slate-850 dark:text-slate-100 mb-2 tracking-tight">
                Confirm Deletion
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed max-w-xs font-normal">
                Are you absolutely sure you want to delete <span className="font-bold text-slate-800 dark:text-slate-250 font-serif">"{deleteConfirm.title}"</span>? This action is permanent.
              </p>
              <div className="flex items-center gap-3 w-full">
                <button
                  type="button"
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-4 py-3 border border-slate-200 dark:border-slate-800 text-slate-650 dark:text-slate-350 rounded-xl text-xs uppercase tracking-wider font-bold hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleExecuteDelete}
                  disabled={isSaving}
                  className="flex-1 flex items-center justify-center gap-1.5 px-4 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs uppercase tracking-wider font-bold transition-all shadow-md shadow-rose-500/10 cursor-pointer disabled:opacity-50"
                >
                  {isSaving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
