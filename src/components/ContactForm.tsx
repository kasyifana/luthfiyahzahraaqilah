'use client';

import React, { useState } from 'react';
import { UploadCloud, AlertCircle, FileText, Loader2 } from 'lucide-react';

export default function ContactForm() {
  // File upload state (Vercel Blob simulation/real integration)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== 'application/pdf') {
        setUploadError('Only PDF files are allowed.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setUploadError('Maximum file size is 5MB.');
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
        setUploadError(result.error || 'Failed to upload file.');
      }
    } catch (err) {
      console.error('File upload error:', err);
      setUploadError('An error occurred while uploading the file.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm glow-sky flex flex-col justify-between min-h-[380px]">
      <div>
        <h4 className="font-serif text-xl font-bold text-slate-800 mb-3 text-center">Upload Collaboration Draft</h4>
        <p className="text-xs text-slate-500 leading-relaxed mb-6 text-center max-w-md mx-auto font-sans font-normal">
          Do you have an economics paper draft, supporting statistical datasets, or a research outline to review together? Securely upload your document here.
        </p>

        <div className="border-2 border-dashed border-slate-200 hover:border-sky-400 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50/50 text-center transition-colors">
          <input
            type="file"
            id="essay-upload"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          <label htmlFor="essay-upload" className="cursor-pointer flex flex-col items-center gap-3">
            <UploadCloud className="h-12 w-12 text-slate-400 hover:text-sky-500 transition-colors" />
            <span className="text-xs font-bold text-slate-700">
              {selectedFile ? selectedFile.name : 'Choose PDF file (max. 5MB)'}
            </span>
            <span className="text-[10px] text-slate-400">Click to browse your local files</span>
          </label>
        </div>

        {uploadError && (
          <div className="mt-4 flex items-center gap-2 text-xs font-medium text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-100">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{uploadError}</span>
          </div>
        )}

        {uploadUrl && (
          <div className="mt-5 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex flex-col gap-2 animate-reveal">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
              <FileText className="h-4 w-4 text-emerald-600" />
              <span>Document Uploaded Successfully!</span>
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
        className="mt-8 w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-semibold transition-colors duration-200 disabled:opacity-50 cursor-pointer shadow-sm shadow-sky-500/10"
      >
        {isUploading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Uploading to Vercel Blob...</span>
          </>
        ) : (
          <>
            <UploadCloud className="h-4 w-4" />
            <span>Upload Document</span>
          </>
        )}
      </button>
    </div>
  );
}
