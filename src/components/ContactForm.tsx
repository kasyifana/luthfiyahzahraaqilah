'use client';

import React, { useState } from 'react';
import { Send, User, Mail, MessageSquare } from 'lucide-react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Format the WhatsApp message text beautifully
    const formattedText = `*Academic Portfolio Inquiry*\n` +
                          `---------------------------------------\n` +
                          `*Name:* ${name.trim()}\n` +
                          `*Email:* ${email.trim()}\n` +
                          `*Message:* ${message.trim()}`;

    const whatsappUrl = `https://wa.me/6285926182642?text=${encodeURIComponent(formattedText)}`;
    
    // Redirect directly to WhatsApp
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-white dark:bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm glow-sky flex flex-col justify-between min-h-[380px] transition-colors duration-300">
      <div>
        <h4 className="font-serif text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 text-center transition-colors">Send Instant Message</h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6 text-center max-w-md mx-auto font-sans font-normal transition-colors">
          Fill out the fields below, and instantly deliver your message, request, or proposal to Luthfiyah's WhatsApp on submission.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">Your Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 dark:text-slate-600">
                <User className="h-4 w-4" />
              </span>
              <input
                type="text"
                placeholder="e.g. Prof. Aris"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs bg-slate-50/50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 dark:text-white transition-all font-sans"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">Your Email</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 dark:text-slate-600">
                <Mail className="h-4 w-4" />
              </span>
              <input
                type="email"
                placeholder="e.g. aris@campus.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs bg-slate-50/50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 dark:text-white transition-all font-sans"
              />
            </div>
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">Your Message</label>
            <div className="relative">
              <span className="absolute top-3.5 left-3 text-slate-400 dark:text-slate-600">
                <MessageSquare className="h-4 w-4" />
              </span>
              <textarea
                placeholder="Write your research query or academic feedback here..."
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full text-xs bg-slate-50/50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl pl-10 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 dark:text-white transition-all font-sans resize-none"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-[11px] font-bold text-red-500 bg-red-50 dark:bg-red-950/20 p-2.5 rounded-xl border border-red-100 dark:border-red-900/50 flex items-center gap-1.5 animate-reveal">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm shadow-emerald-500/10 cursor-pointer"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Send to WhatsApp</span>
          </button>
        </form>
      </div>
    </div>
  );
}
