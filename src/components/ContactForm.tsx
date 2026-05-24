'use client';

import React, { useState } from 'react';
import { Send, UploadCloud, CheckCircle, AlertCircle, FileText, Loader2 } from 'lucide-react';

export default function ContactForm() {
  // Form submission state
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // File upload state (Vercel Blob simulation/real integration)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== 'application/pdf') {
        setUploadError('Hanya file PDF yang diperbolehkan.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setUploadError('Ukuran file maksimal adalah 5MB.');
        return;
      }
      setSelectedFile(file);
      setUploadError(null);
      setUploadUrl(null);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;
    setIsUploading(true);
    setUploadError(null);

    try {
      const response = await fetch(`/api/upload?filename=${encodeURIComponent(selectedFile.name)}`, {
        method: 'POST',
        body: selectedFile,
      });

      const result = await response.json();

      if (result.success) {
        setUploadUrl(result.url);
        setSelectedFile(null);
      } else {
        setUploadError(result.error || 'Gagal mengunggah file.');
      }
    } catch (err) {
      console.error('File upload error:', err);
      setUploadError('Terjadi kesalahan saat mengunggah file.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({ type: 'success', text: result.message });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus({ type: 'error', text: result.error || 'Terjadi kesalahan.' });
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setSubmitStatus({ type: 'error', text: 'Gagal mengirim pesan. Silakan coba lagi.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Contact Form Details */}
      <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm glow-sky">
        <h3 className="font-serif text-2xl font-bold text-slate-800 mb-6">Kirim Pesan Akademik</h3>
        
        {submitStatus && (
          <div className={`p-4 rounded-xl mb-6 flex items-start gap-3 ${
            submitStatus.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' : 'bg-red-50 text-red-800 border border-red-100'
          }`}>
            {submitStatus.type === 'success' ? (
              <CheckCircle className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
            ) : (
              <AlertCircle className="h-5 w-5 shrink-0 text-red-600 mt-0.5" />
            )}
            <span className="text-sm font-medium">{submitStatus.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="border-expand">
            <label htmlFor="name" className="block text-xs font-bold tracking-wider text-slate-400 uppercase mb-2">Nama Lengkap</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g. Dr. H. Suherman"
              className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:bg-white focus:border-sky-400 transition-colors"
            />
          </div>

          <div className="border-expand">
            <label htmlFor="email" className="block text-xs font-bold tracking-wider text-slate-400 uppercase mb-2">Alamat Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              placeholder="e.g. suherman@upi.edu"
              className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:bg-white focus:border-sky-400 transition-colors"
            />
          </div>

          <div className="border-expand">
            <label htmlFor="message" className="block text-xs font-bold tracking-wider text-slate-400 uppercase mb-2">Isi Pesan / Kolaborasi</label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Tuliskan gagasan riset, tanggapan makalah, atau undangan diskusi akademik di sini..."
              className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:bg-white focus:border-sky-400 transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20 disabled:opacity-70 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Mengirim...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Kirim Pesan</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Essay Upload Tool */}
      <div className="lg:col-span-5 bg-slate-100/50 p-6 rounded-2xl border border-slate-200/40 shadow-sm flex flex-col justify-between min-h-[360px]">
        <div>
          <h4 className="font-serif text-lg font-bold text-slate-800 mb-2">Upload Draft Kolaborasi</h4>
          <p className="text-xs text-slate-500 leading-relaxed mb-6">
            Apakah Anda memiliki draf makalah ekonomi, data BPS pendukung, atau review jurnal untuk dikaji bersama? Unggah dokumen Anda secara aman ke server portfolio.
          </p>

          <div className="border-2 border-dashed border-slate-300 hover:border-sky-400 rounded-xl p-6 flex flex-col items-center justify-center bg-white/50 text-center transition-colors">
            <input
              type="file"
              id="essay-upload"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            <label htmlFor="essay-upload" className="cursor-pointer flex flex-col items-center gap-2">
              <UploadCloud className="h-10 w-10 text-slate-400 hover:text-sky-500 transition-colors" />
              <span className="text-xs font-semibold text-slate-600">
                {selectedFile ? selectedFile.name : 'Pilih file PDF (maks. 5MB)'}
              </span>
              <span className="text-[10px] text-slate-400">Klik untuk menjelajah file lokal Anda</span>
            </label>
          </div>

          {uploadError && (
            <div className="mt-3 flex items-center gap-2 text-xs font-medium text-red-600 bg-red-50 p-2 rounded-lg border border-red-100">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{uploadError}</span>
            </div>
          )}

          {uploadUrl && (
            <div className="mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
                <FileText className="h-4 w-4 text-emerald-600" />
                <span>Dokumen Berhasil Diunggah!</span>
              </div>
              <a
                href={uploadUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-sky-600 underline font-medium truncate"
              >
                {uploadUrl}
              </a>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleFileUpload}
          disabled={!selectedFile || isUploading}
          className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold transition-colors duration-200 disabled:opacity-50 cursor-pointer"
        >
          {isUploading ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span>Mengunggah Ke Vercel Blob...</span>
            </>
          ) : (
            <>
              <UploadCloud className="h-3.5 w-3.5" />
              <span>Unggah Dokumen</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
