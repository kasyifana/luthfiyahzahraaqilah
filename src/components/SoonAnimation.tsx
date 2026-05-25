'use client';

import React from 'react';

export default function SoonAnimation() {
  return (
    <div className="relative w-48 h-48 flex items-center justify-center mb-6 select-none group">
      {/* Glow Backdrop */}
      <div className="absolute inset-0 bg-sky-400/10 rounded-full blur-3xl group-hover:bg-sky-400/20 transition-all duration-500 scale-90"></div>

      {/* Outer Tech Radar Grid (Slow Spin) */}
      <svg
        className="absolute w-40 h-40 text-sky-200/50 fill-none stroke-current stroke-[0.75] animate-[spin_25s_linear_infinite]"
        viewBox="0 0 100 100"
      >
        <circle cx="50" cy="50" r="45" strokeDasharray="3 3" />
        <circle cx="50" cy="50" r="32" strokeDasharray="6 4" />
        <circle cx="50" cy="50" r="20" />
        <line x1="50" y1="5" x2="50" y2="95" strokeDasharray="2 2" />
        <line x1="5" y1="50" x2="95" y2="50" strokeDasharray="2 2" />
      </svg>

      {/* Interactive Orbiting Data Particle 1 */}
      <div className="absolute w-2 h-2 bg-sky-500 rounded-full shadow-lg shadow-sky-500/50 animate-[ping_2s_infinite] -translate-x-12 -translate-y-8"></div>
      
      {/* Interactive Orbiting Data Particle 2 */}
      <div className="absolute w-1.5 h-1.5 bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/50 animate-pulse translate-x-14 translate-y-10"></div>

      {/* Main Floating Document Wrapper (Bounce Effect) */}
      <div className="relative z-10 w-24 h-28 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-md flex flex-col justify-between p-3.5 transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl group-hover:border-sky-300 dark:group-hover:border-sky-700 animate-[bounce_4s_infinite_ease-in-out]">
        
        {/* Document Header lines */}
        <div className="space-y-1.5">
          <div className="h-1.5 bg-sky-500 rounded-full w-2/3"></div>
          <div className="h-1 bg-slate-200 dark:bg-slate-700 rounded-full w-full"></div>
          <div className="h-1 bg-slate-200 dark:bg-slate-700 rounded-full w-5/6"></div>
        </div>

        {/* Statistical Economic Bars (Pulsing and Scaling) */}
        <div className="flex items-end justify-between gap-1.5 px-1 py-2 h-10 border-b border-slate-100 dark:border-slate-800">
          <div className="w-2.5 bg-sky-300 dark:bg-sky-800/60 rounded-sm animate-[pulse_1.5s_infinite_ease-in-out_200ms]" style={{ height: '40%' }}></div>
          <div className="w-2.5 bg-sky-500 rounded-sm animate-[pulse_1.5s_infinite_ease-in-out_400ms]" style={{ height: '75%' }}></div>
          <div className="w-2.5 bg-indigo-500 rounded-sm animate-[pulse_1.5s_infinite_ease-in-out_600ms]" style={{ height: '50%' }}></div>
          <div className="w-2.5 bg-sky-400 dark:bg-sky-600 rounded-sm animate-[pulse_1.5s_infinite_ease-in-out_800ms]" style={{ height: '90%' }}></div>
        </div>

        {/* Document Footer */}
        <div className="flex items-center justify-between pt-1">
          <div className="h-1 bg-slate-300 dark:bg-slate-600 rounded-full w-1/3"></div>
          {/* Glowing Green Activity Dot */}
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>
        </div>
      </div>

      {/* Floating Sparkle/Loading Gear */}
      <svg
        className="absolute bottom-6 right-6 w-8 h-8 text-sky-500/80 animate-[spin_8s_linear_infinite]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.43l-1.003.828c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.43l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.991l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.28z"
        />
        <circle cx="12" cy="12" r="3" />
      </svg>
    </div>
  );
}
