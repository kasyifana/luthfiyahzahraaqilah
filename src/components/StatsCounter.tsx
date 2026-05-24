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
    <div className="flex flex-col items-center p-6 bg-white border border-slate-100 rounded-2xl shadow-sm glow-sky transition-all hover:scale-105 duration-300 hover:border-sky-100 relative overflow-hidden">
      <div className="p-3 mb-4 rounded-xl bg-sky-50 text-sky-600">
        {icon}
      </div>
      {isSoon ? (
        <span className="text-xl sm:text-2xl font-serif font-black text-sky-600 uppercase tracking-widest my-1 sm:my-2 select-none">
          Soon
        </span>
      ) : (
        <span className="text-3xl sm:text-4xl font-serif font-bold text-slate-800 tracking-tight">
          {formatNumber(value)}{suffix}
        </span>
      )}
      <span className="mt-2 text-[10px] sm:text-xs font-semibold tracking-wider text-slate-500 uppercase text-center">
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
