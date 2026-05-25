'use client';

import React, { useEffect, useState } from 'react';
import { Database, FileText, Wrench, GraduationCap } from 'lucide-react';

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  targetValue: number;
  suffix?: string;
  duration?: number;
  isSoon?: boolean;
}

const StatItem: React.FC<StatItemProps> = ({ 
  icon, 
  label, 
  targetValue, 
  suffix = '', 
  duration = 1500,
  isSoon = false
}) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (isSoon) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setValue(Math.floor(progress * targetValue));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [targetValue, duration, isSoon]);

  const formatNumber = (num: number) => {
    return num.toLocaleString('id-ID');
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-sm glow-sky transition-all hover:scale-105 duration-300 hover:border-sky-100 dark:hover:border-sky-800 relative overflow-hidden">
      <div className="p-3 mb-4 rounded-xl bg-sky-50 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400">
        {icon}
      </div>
      {isSoon ? (
        <span className="text-lg sm:text-xl font-serif font-black bg-gradient-to-r from-sky-500 via-sky-600 to-indigo-600 bg-clip-text text-transparent uppercase tracking-widest my-1 sm:my-2 select-none flex items-center justify-center animate-[pulse_2.5s_infinite_ease-in-out]">
          <span>Soon</span>
          <span className="animate-[bounce_1s_infinite_100ms] text-sky-500 inline-block ml-0.5">.</span>
          <span className="animate-[bounce_1s_infinite_300ms] text-sky-600 inline-block ml-0.5">.</span>
          <span className="animate-[bounce_1s_infinite_500ms] text-indigo-500 inline-block ml-0.5">.</span>
        </span>
      ) : (
        <span className="text-3xl sm:text-4xl font-serif font-bold text-slate-800 dark:text-slate-100 tracking-tight transition-colors duration-300">
          {formatNumber(value)}{suffix}
        </span>
      )}
      <span className="mt-2 text-[10px] sm:text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase text-center transition-colors duration-300">
        {label}
      </span>
    </div>
  );
};

export default function StatsCounter() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
      <StatItem 
        icon={<Database className="h-6 w-6" />}
        label="Analyzed Data Points"
        targetValue={66600}
        suffix="+"
        isSoon={true}
      />
      <StatItem 
        icon={<FileText className="h-6 w-6" />}
        label="Scientific Papers / Essays"
        targetValue={3}
        isSoon={true}
      />
      <StatItem 
        icon={<Wrench className="h-6 w-6" />}
        label="Econometric Toolkits"
        targetValue={12}
        isSoon={true}
      />
      <StatItem 
        icon={<GraduationCap className="h-6 w-6" />}
        label="Academic Semester"
        targetValue={2}
      />
    </div>
  );
}
