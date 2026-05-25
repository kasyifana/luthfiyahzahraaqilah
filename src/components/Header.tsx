'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  profileName: string;
}

export default function Header({ profileName }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Initialize theme on mount to avoid server-client layout hydration mismatches
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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-slate-950 border-b border-slate-100/80 dark:border-slate-900 transition-colors duration-300">
      {/* Header Main Bar Container */}
      <div className="relative z-50 bg-white dark:bg-slate-950 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between transition-colors duration-300">
        {/* Brand Identity */}
        <div className="flex items-center gap-3">
          <div>
            <span className="block text-sm font-bold text-slate-800 dark:text-slate-100 tracking-tight leading-none">{profileName}</span>
            <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1 block">Development Economics</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-8">
            <a href="#about" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Profile</a>
            <a href="#education" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Education</a>
            <a href="#skills" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Skills</a>
            <a href="#projects" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Research</a>
            <a href="#activities" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Activities</a>
          </nav>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800"></div>

          {/* Desktop Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark Mode"
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 focus:outline-none transition-all duration-300 cursor-pointer"
          >
            {theme === 'dark' ? (
              <Sun className="h-4.5 w-4.5 animate-[spin_6s_linear_infinite] text-amber-500" />
            ) : (
              <Moon className="h-4.5 w-4.5 transition-transform duration-300 hover:rotate-12 text-slate-600" />
            )}
          </button>

          <a href="#contact" className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-sky-600 dark:hover:bg-sky-500 hover:text-white dark:hover:text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors duration-200">Collaborate</a>
        </div>

        {/* Mobile Action Controls */}
        <div className="flex items-center gap-1.5 md:hidden">
          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark Mode"
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 focus:outline-none transition-all duration-300 cursor-pointer"
          >
            {theme === 'dark' ? (
              <Sun className="h-[18px] w-[18px] animate-[spin_6s_linear_infinite] text-amber-500" />
            ) : (
              <Moon className="h-[18px] w-[18px] text-slate-600" />
            )}
          </button>

          {/* Animated Hamburger Button for Mobile */}
          <button
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            className="flex items-center justify-center p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 focus:outline-none transition-all duration-300 z-50 cursor-pointer"
          >
            <div className="w-6 h-6 relative flex items-center justify-center">
              {/* Top Bar */}
              <span
                className={`absolute h-0.5 w-5 bg-current rounded-full transition-all duration-300 ease-in-out ${
                  isOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'
                }`}
              ></span>
              {/* Middle Bar */}
              <span
                className={`absolute h-0.5 w-4 bg-current rounded-full transition-all duration-300 ease-in-out ${
                  isOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
                }`}
              ></span>
              {/* Bottom Bar */}
              <span
                className={`absolute h-0.5 w-5 bg-current rounded-full transition-all duration-300 ease-in-out ${
                  isOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Slide-out Mobile Menu Panel (Slides down smoothly from behind the header container) */}
      <div
        className={`absolute top-full left-0 w-full bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900 shadow-lg md:hidden transition-all duration-300 ease-in-out z-40 ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col p-6 space-y-4">
          <a
            href="#about"
            onClick={closeMenu}
            className="flex items-center justify-between text-sm font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 py-3 border-b border-slate-50 dark:border-slate-900 transition-colors"
          >
            <span>Profile</span>
            <ArrowRight className="h-4 w-4 text-slate-400 dark:text-slate-500" />
          </a>
          <a
            href="#education"
            onClick={closeMenu}
            className="flex items-center justify-between text-sm font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 py-3 border-b border-slate-50 dark:border-slate-900 transition-colors"
          >
            <span>Education</span>
            <ArrowRight className="h-4 w-4 text-slate-400 dark:text-slate-500" />
          </a>
          <a
            href="#skills"
            onClick={closeMenu}
            className="flex items-center justify-between text-sm font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 py-3 border-b border-slate-50 dark:border-slate-900 transition-colors"
          >
            <span>Skills</span>
            <ArrowRight className="h-4 w-4 text-slate-400 dark:text-slate-500" />
          </a>
          <a
            href="#projects"
            onClick={closeMenu}
            className="flex items-center justify-between text-sm font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 py-3 border-b border-slate-50 dark:border-slate-900 transition-colors"
          >
            <span>Research</span>
            <ArrowRight className="h-4 w-4 text-slate-400 dark:text-slate-500" />
          </a>
          <a
            href="#activities"
            onClick={closeMenu}
            className="flex items-center justify-between text-sm font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 py-3 border-b border-slate-50 dark:border-slate-900 transition-colors"
          >
            <span>Activities</span>
            <ArrowRight className="h-4 w-4 text-slate-400 dark:text-slate-500" />
          </a>
          <a
            href="#contact"
            onClick={closeMenu}
            className="flex items-center justify-center gap-2 mt-4 px-5 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-sky-600 dark:hover:bg-sky-500 hover:text-white dark:hover:text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300"
          >
            <span>Collaborate</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </nav>
      </div>
    </header>
  );
}
