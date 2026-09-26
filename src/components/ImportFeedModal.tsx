import React, { useState, useRef } from 'react';
import { ResumeData } from '../types/resume';
import { FileText, Linkedin, Sparkles, Upload, Check, AlertCircle, RefreshCw, FileUp, CheckCircle2 } from 'lucide-react';
import { INITIAL_RESUME } from '../data/sampleData';

interface ImportFeedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess: (data: ResumeData) => void;
}

export const ImportFeedModal: React.FC<ImportFeedModalProps> = ({
  isOpen,
  onClose,
  onImportSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'linkedin' | 'text'>('upload');
  const [inputText, setInputText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleFileUploadAndParse = async (fileToProcess?: File) => {
    const file = fileToProcess || selectedFile;
    if (!file) {
      setErrorMessage('Please select a PDF or Word (.doc, .docx) file to upload.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setStatusMessage(`Extracting text & ATS sections from ${file.name}...`);

    try {
      // Convert file to Base64
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          const res = reader.result as string;
          const base64 = res.split(',')[1] || res;
          resolve(base64);
        };
        reader.onerror = (e) => reject(e);
      });
      reader.readAsDataURL(file);
      const fileBase64 = await base64Promise;

      const response = await fetch('/api/upload-cv-file', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: file.name,
          mimeType: file.type,
          fileBase64,
        }),
      });

      const resData = await response.json();

      if (!response.ok || !resData.success || !resData.resume) {
        throw new Error(resData.error || 'Failed to parse uploaded document.');
      }

      onImportSuccess(resData.resume);
      onClose();
    } catch (err: any) {
      console.error('File upload parse error:', err);
      setErrorMessage(
        err.message || 'Error parsing document. You can also paste your resume text in the text tab.'
      );
    } finally {
      setIsLoading(false);
      setStatusMessage(null);
    }
  };

  const handleExtractFromText = async () => {
    if (!inputText.trim()) {
      setErrorMessage('Please paste your profile or CV text first.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setStatusMessage('Analyzing text with ATS parser...');

    try {
      const response = await fetch('/api/extract-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: inputText,
          type: activeTab,
        }),
      });

      const resData = await response.json();

      if (!response.ok || !resData.success || !resData.resume) {
        throw new Error(resData.error || 'Failed to parse resume text.');
      }

      onImportSuccess(resData.resume);
      onClose();
    } catch (err: any) {
      console.error('Import error:', err);
      setErrorMessage(
        err.message || 'Error communicating with AI parser. You can try loading sample data.'
      );
    } finally {
      setIsLoading(false);
      setStatusMessage(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setErrorMessage(null);
      // Auto parse on selection
      handleFileUploadAndParse(file);
    }
  };

  const handleLoadRanjanaSample = () => {
    setInputText(`Ranjana Guha
Statistical Analyst - Survey Analysis & Field Project Management
Kolkata, West Bengal (Open to Remote / Hybrid) • ranjana.guha@gmail.com • +91 84202 69510 • linkedin.com/in/ranjana-guha-969a9a30b/

Summary:
Accomplished Statistical Analyst and Field Project Specialist with extensive experience at the Indian Statistical Institute (ISI), specializing in end-to-end survey data analysis, field project management, and large-scale microdata processing. Expert in utilizing Advanced Excel, R programming, and DBF (dBase) databases for data cleaning, cross-tabulation, sampling validation, and quality assurance. Proven record directing multi-phase field survey operations, managing enumerator teams, ensuring data integrity, and conducting rigorous statistical evaluations.

Experience:
Survey Analyst & Field Project Manager - Indian Statistical Institute (ISI)
May 2018 - Present (Kolkata, West Bengal)
- Directed survey data analysis and field project management for large-scale statistical studies, overseeing field survey execution, enumerator teams, and rigorous quality audit checkpoints.
- Processed, cleansed, and verified extensive survey microdata stored in DBF (dBase) database files and Excel, developing validation routines to eliminate non-sampling errors.
- Conducted quantitative survey data analysis and cross-tabulations using R and Advanced Excel, computing sampling weights, standard errors, and descriptive statistical metrics.
- Automated repetitive data extraction and merging pipelines from DBF formats into R and Excel, accelerating project data delivery cycles by 60%.
- Trained and mentored field enumerators and junior research staff on survey questionnaire protocols, ethical data collection, and field consistency screening.

Statistical Field Project Coordinator & Data Analyst - Indian Statistical Institute (ISI)
Jun 2014 - Apr 2018 (Kolkata, India)
- Managed primary field survey logistics, respondent sampling frames, and on-ground questionnaire scheduling across diverse field locations.
- Performed data entry verification, legacy DBF database conversion, and consistency checking in Excel and R to maintain high data fidelity.
- Generated cross-tabulation summaries, frequency charts, and statistical briefing notes for principal research investigators and academic faculty.

Education:
University of Calcutta - M.Sc. in Statistics (2012 - 2014), First Class Honors
Presidency College / University - B.Sc. (Hons.) in Statistics with Mathematics (2009 - 2012), First Class Honors

Skills:
Survey Data Analysis, Field Project Management, Enumerator Training & Supervision, Questionnaire Scheduling, Sampling Methodologies, Cross-Tabulation & Aggregation, Non-Sampling Error Screening, Quality Control & Audit, Advanced Excel (VBA, Macros, Pivot Tables, Data Cleaning), R (tidyverse, survey, data.table), DBF Databases (dBase / Microdata Files), SQL, Descriptive & Inferential Statistics, Hypothesis Testing, Sampling Weights`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-linear-to-r from-slate-900 to-indigo-950 p-6 text-white flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>ATS Resume Parser & CV Ingestion</span>
            </div>
            <h2 className="text-xl font-bold">Import Resume or CV Document</h2>
            <p className="text-slate-300 text-xs mt-0.5">
              Upload your personal CV in PDF or Word (.doc / .docx), import from LinkedIn, or paste raw text.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-white/10 transition"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-2 sm:gap-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex items-center gap-2 pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition whitespace-nowrap ${
              activeTab === 'upload'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileUp className="w-4 h-4 text-indigo-600" />
            Upload PDF / Word (.doc/.docx)
          </button>
          <button
            onClick={() => setActiveTab('linkedin')}
            className={`flex items-center gap-2 pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition whitespace-nowrap ${
              activeTab === 'linkedin'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Linkedin className="w-4 h-4 text-blue-600" />
            LinkedIn Profile
          </button>
          <button
            onClick={() => setActiveTab('text')}
            className={`flex items-center gap-2 pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition whitespace-nowrap ${
              activeTab === 'text'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-4 h-4 text-slate-600" />
            Paste CV Text
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* TAB 1: Direct File Upload for PDF, DOC, DOCX */}
          {activeTab === 'upload' && (
            <div className="space-y-4">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-indigo-300 hover:border-indigo-500 bg-indigo-50/40 hover:bg-indigo-50/70 p-8 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition group"
              >
                <div className="w-14 h-14 rounded-2xl bg-indigo-100 group-hover:scale-110 flex items-center justify-center text-indigo-600 mb-3 shadow-xs transition">
                  <FileUp className="w-7 h-7" />
                </div>
                <div className="font-bold text-slate-900 text-sm mb-1">
                  Click to browse or drop your CV here
                </div>
                <div className="text-xs text-slate-500 max-w-sm">
                  Supports <span className="font-semibold text-indigo-700">PDF (.pdf)</span>,{' '}
                  <span className="font-semibold text-indigo-700">Word (.doc, .docx)</span>, and plain text documents up to 20MB.
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.txt,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {selectedFile && (
                <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-indigo-600" />
                    <div>
                      <div className="font-bold text-slate-900">{selectedFile.name}</div>
                      <div className="text-slate-500 text-[11px]">
                        {(selectedFile.size / 1024).toFixed(1)} KB • {selectedFile.type || 'Document'}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleFileUploadAndParse()}
                    disabled={isLoading}
                    className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold rounded-lg transition"
                  >
                    Parse File
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2 & 3: LinkedIn Profile or Plain Text Feed */}
          {(activeTab === 'linkedin' || activeTab === 'text') && (
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">
                  {activeTab === 'linkedin'
                    ? 'Paste your LinkedIn profile text or bio feed below:'
                    : 'Paste the contents of your CV or resume below:'}
                </span>
                <button
                  type="button"
                  onClick={handleLoadRanjanaSample}
                  className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Load Sample (Ranjana Guha - Data Analyst)
                </button>
              </div>

              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={9}
                placeholder={
                  activeTab === 'linkedin'
                    ? 'Paste LinkedIn profile content (About, Work History, Education, Skills, Modeling projects)...'
                    : 'Paste your full resume or CV text here...'
                }
                className="w-full p-3.5 text-xs text-slate-800 font-mono bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none resize-none transition"
              />
            </div>
          )}

          {/* Status notification */}
          {statusMessage && (
            <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl flex items-center gap-2 text-xs text-indigo-800 animate-pulse">
              <RefreshCw className="w-4 h-4 animate-spin text-indigo-600" />
              <span>{statusMessage}</span>
            </div>
          )}

          {/* Error notification */}
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Import Issue</p>
                <p>{errorMessage}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-between items-center">
          <button
            onClick={() => {
              onImportSuccess(INITIAL_RESUME);
              onClose();
            }}
            className="text-xs text-slate-600 hover:text-slate-900 font-medium underline"
          >
            Reset to Ranjana Guha Preset
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 transition rounded-lg"
            >
              Cancel
            </button>
            {activeTab !== 'upload' ? (
              <button
                onClick={handleExtractFromText}
                disabled={isLoading || !inputText.trim()}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-2 transition"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Parsing CV...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Extract & Build Resume</span>
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={() => handleFileUploadAndParse()}
                disabled={isLoading || !selectedFile}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-2 transition"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Processing Document...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>Upload & Parse CV</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
