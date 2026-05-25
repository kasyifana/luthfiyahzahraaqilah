import React from 'react';
export const dynamic = 'force-dynamic';
import { ArrowLeft, Award } from 'lucide-react';
import ActivitiesTimeline from '@/components/ActivitiesTimeline';
import { getActivities, getProfile } from '@/lib/dataService';

export default async function ActivitiesPage() {
  const activities = await getActivities();
  const profile = await getProfile();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Premium Header */}
      <header className="sticky top-0 z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-slate-100 dark:border-slate-800/80 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-2 text-slate-500 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400 transition-colors group text-xs uppercase tracking-wider font-bold"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Portfolio</span>
          </a>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest font-sans">
              Interactive Timeline
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Title section */}
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex h-12 w-12 rounded-2xl bg-sky-50 dark:bg-sky-950/50 border border-sky-100/50 dark:border-sky-900/40 items-center justify-center text-sky-600 dark:text-sky-400 mb-2">
              <Award className="h-6 w-6" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-sky-600 dark:text-sky-400 block">
              Complete Academic & Leadership Journey
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-black text-slate-800 dark:text-slate-100 tracking-tight leading-none transition-colors duration-300">
              Student Organizations & Activities
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed font-normal transition-colors duration-300">
              A comprehensive archive of Luthfiyah Zahra Aqilah's institutional contributions, choreography championships, and campus leadership roles. Click any entry to inspect certificate credentials and live media evidence.
            </p>
          </div>

          {/* Activities Timeline Rendering */}
          <div className="mt-8">
            <ActivitiesTimeline activities={activities} />
          </div>
        </div>
      </main>

      {/* Premium Footer */}
      <footer className="py-12 border-t border-slate-100 dark:border-slate-900 text-center transition-colors duration-300">
        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">
          © {new Date().getFullYear()} {profile.name} • Universitas Negeri Semarang
        </p>
      </footer>
    </div>
  );
}
