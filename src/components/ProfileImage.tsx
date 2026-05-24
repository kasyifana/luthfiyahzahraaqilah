'use client';

import React, { useState, useEffect } from 'react';

interface ProfileImageProps {
  fallbackUrl: string;
  name: string;
}

export default function ProfileImage({ fallbackUrl, name }: ProfileImageProps) {
  const fileAttempts = [
    '/images/profile/image.png',
    '/images/profile/image.jpg',
    '/images/profile/image.jpeg'
  ];

  const [imgSrc, setImgSrc] = useState<string>(fileAttempts[0]);
  const [attemptIndex, setAttemptIndex] = useState<number>(0);
  const [showPlaceholder, setShowPlaceholder] = useState<boolean>(false);

  // Sync state and reset attempts
  useEffect(() => {
    setImgSrc(fileAttempts[0]);
    setAttemptIndex(0);
    setShowPlaceholder(false);
  }, [fallbackUrl]);

  // Try next file format, and if all three fail, show a gorgeous initials placeholder
  const handleImageError = () => {
    const nextIndex = attemptIndex + 1;
    if (nextIndex < fileAttempts.length) {
      setAttemptIndex(nextIndex);
      setImgSrc(fileAttempts[nextIndex]);
    } else {
      setShowPlaceholder(true);
    }
  };

  if (showPlaceholder) {
    return (
      <div className="w-full aspect-[4/5] rounded-3xl bg-gradient-to-tr from-slate-100 to-sky-50/50 flex flex-col items-center justify-center text-center p-6 border border-slate-200/40 select-none animate-reveal min-h-[300px] sm:min-h-[350px]">
        <div className="h-16 w-16 rounded-2xl bg-sky-600 flex items-center justify-center text-white font-serif font-black text-2xl shadow-md shadow-sky-500/20 mb-4 animate-pulse">
          LZA
        </div>
        <span className="text-xs font-bold text-slate-700 tracking-wider uppercase mb-1">
          Profile Photo Not Found
        </span>
        <p className="text-[10px] text-slate-400 max-w-[180px] leading-relaxed">
          Please place an image.png or image.jpg file inside public/images/profile/ folder.
        </p>
      </div>
    );
  }

  return (
    <img 
      src={imgSrc} 
      alt={name}
      onError={handleImageError}
      className="w-full h-auto object-cover grayscale contrast-[1.05] group-hover:grayscale-0 transition-all duration-500 max-h-[350px] select-none"
    />
  );
}
