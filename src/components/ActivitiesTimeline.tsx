'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, X, Eye, Award, Image as ImageIcon, FileWarning } from 'lucide-react';

interface Activity {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
}

interface ActivitiesTimelineProps {
  activities: Activity[];
}

// Folder Key Mapping for each Activity
const ACTIVITY_KEYS: Record<string, string> = {
  "BESTARI EXTRACURRICULAR - DANCE CLUB COMMITTEE": "bestari",
  "SECOND WINNER - KINANTI LARAS TRADITIONAL DANCE": "kinanti-laras",
  "AWARD - LENGGANG NYAI TRADITIONAL DANCE": "lenggang-nyai"
};

export default function ActivitiesTimeline({ activities }: ActivitiesTimelineProps) {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [activeTab, setActiveTab] = useState<'activity' | 'certificate'>('activity');
  
  // State for dynamic self-healing image sequence
  const [imgSrc, setImgSrc] = useState<string>('');
  const [attempts, setAttempts] = useState<string[]>([]);
  const [attemptIndex, setAttemptIndex] = useState<number>(0);
  const [showPlaceholder, setShowPlaceholder] = useState<boolean>(false);

  const openModal = (activity: Activity) => {
    setSelectedActivity(activity);
    setActiveTab('activity');
    
    // 1. Pre-initialize imgSrc to avoid empty string on first render frame
    const key = ACTIVITY_KEYS[activity.role];
    if (key) {
      setImgSrc(`/images/activities/${key}/image.png`);
    }
  };

  const closeModal = () => {
    setSelectedActivity(null);
  };

  // Sync image source with sequential file attempts on tab or activity change
  useEffect(() => {
    if (selectedActivity) {
      const key = ACTIVITY_KEYS[selectedActivity.role];
      
      if (key) {
        const folder = activeTab === 'activity' ? 'activities' : 'certificates';
        
        // Define sequential list of files to search for locally
        const fileAttempts = [
          `/images/${folder}/${key}/image.png`,
          `/images/${folder}/${key}/image.jpg`,
          `/images/${folder}/${key}/image.jpeg`
        ];
        
        setAttempts(fileAttempts);
        setAttemptIndex(0);
        setShowPlaceholder(false);
        setImgSrc(fileAttempts[0]);
      }
    }
  }, [selectedActivity, activeTab]);

  // Image load error: self-heals by advancing (PNG -> JPG -> JPEG -> Placeholder)
  const handleImageError = () => {
    const nextIndex = attemptIndex + 1;
    if (nextIndex < attempts.length) {
      setAttemptIndex(nextIndex);
      setImgSrc(attempts[nextIndex]);
    } else {
      setShowPlaceholder(true);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {activities.map((activity, index) => (
        <div 
          key={activity.id}
          className={`relative flex gap-6 sm:gap-8 items-start group cursor-pointer reveal-on-scroll ${
            index === 0 ? 'reveal-delay-100' : index === 1 ? 'reveal-delay-200' : 'reveal-delay-300'
          }`}
          onClick={() => openModal(activity)}
        >
          {/* Timeline bar indicator */}
          {index !== activities.length - 1 && (
            <div className="absolute left-[19px] sm:left-[23px] top-10 bottom-0 w-[2px] bg-slate-200"></div>
          )}

          {/* Bullet */}
          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-center shrink-0 text-sky-600 font-serif font-black text-sm group-hover:border-sky-300 transition-all duration-300">
            {index + 1}
          </div>

          {/* Body card */}
          <div className="flex-grow bg-white border border-slate-100 p-5 sm:p-6 rounded-2xl shadow-sm hover:border-sky-300 hover:shadow-md hover:shadow-sky-100/10 hover:-translate-y-0.5 transition-all duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-base sm:text-lg font-bold text-slate-800 group-hover:text-sky-600 transition-colors">
                    {activity.role}
                  </h3>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sky-600 flex items-center gap-0.5 text-[10px] font-bold uppercase tracking-wider">
                    <Eye className="h-3.5 w-3.5" /> View
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-400">{activity.organization}</span>
              </div>
              <span className="text-[10px] font-bold text-sky-600 bg-sky-50 border border-sky-100/50 px-2.5 py-1 rounded-full self-start sm:self-center">
                {activity.period}
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              {activity.description}
            </p>
          </div>
        </div>
      ))}

      {/* Lightbox / Modal */}
      {selectedActivity && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop Overlay */}
          <div 
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-md transition-opacity duration-300"
            onClick={closeModal}
          ></div>

          {/* Modal Container */}
          <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-xl w-full overflow-hidden flex flex-col z-10 animate-reveal scale-100 max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="font-serif text-base sm:text-lg font-bold text-slate-800 leading-tight">
                  {selectedActivity.role}
                </h4>
                <p className="text-xs font-bold text-slate-400 mt-1">
                  {selectedActivity.organization}
                </p>
              </div>
              <button 
                onClick={closeModal}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex border-b border-slate-100 bg-slate-50/50 p-1.5 gap-1.5 text-xs font-bold uppercase tracking-wider">
              <button 
                className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all ${
                  activeTab === 'activity' 
                    ? 'bg-white text-sky-600 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                onClick={() => setActiveTab('activity')}
              >
                <ImageIcon className="h-4 w-4" />
                <span>Activity Photo</span>
              </button>
              <button 
                className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all ${
                  activeTab === 'certificate' 
                    ? 'bg-white text-sky-600 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                onClick={() => setActiveTab('certificate')}
              >
                <Award className="h-4 w-4" />
                <span>Certificate Award</span>
              </button>
            </div>

            {/* Modal Content - Images or Custom Placeholder */}
            <div className="p-6 flex-grow overflow-y-auto flex flex-col items-center justify-center bg-slate-50/20 min-h-[300px]">
              {/* 2. Safety Render Check: Show placeholder if showPlaceholder is true OR imgSrc is still empty */}
              {showPlaceholder || !imgSrc ? (
                <div className="w-full aspect-[4/3] rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 flex flex-col items-center justify-center text-center p-6 transition-all duration-300 animate-reveal">
                  <div className="h-12 w-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mb-4">
                    {activeTab === 'activity' ? (
                      <ImageIcon className="h-5 w-5" />
                    ) : (
                      <Award className="h-5 w-5" />
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {activeTab === 'activity' ? 'No Photo Uploaded' : 'No Certificate Uploaded'}
                  </h4>
                  <p className="text-[11px] text-slate-400 max-w-[280px] leading-relaxed">
                    {activeTab === 'activity' 
                      ? 'Activity photo is not uploaded yet. Please drop an image.png or image.jpg file in this folder.'
                      : 'Certificate document is not uploaded yet. Please drop an image.png or image.jpg file in this folder.'}
                  </p>
                </div>
              ) : (
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200/60 bg-slate-900 shadow-inner flex items-center justify-center group/img">
                  <img 
                    src={imgSrc} 
                    alt={selectedActivity.role}
                    onError={handleImageError}
                    className="w-full h-full object-cover select-none"
                  />
                </div>
              )}
              
              {!showPlaceholder && imgSrc && (
                <p className="text-[11px] text-slate-400 mt-4 leading-relaxed text-center max-w-sm font-normal">
                  {activeTab === 'activity' 
                    ? `Documentation photo of active participation as ${selectedActivity.role} at ${selectedActivity.organization}.`
                    : `Official award certificate credential for ${selectedActivity.role} (received in ${selectedActivity.period.split(' - ')[0] || '2024'}).`}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
