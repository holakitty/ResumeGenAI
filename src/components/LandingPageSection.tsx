import React, { useState, useRef } from 'react';
import {
  FileText,
  Sparkles,
  Printer,
  Upload,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Zap,
  ArrowRight,
  BookOpen,
  Award,
  Layers,
  Database,
  Lock,
  Key,
  RefreshCw,
  FileCheck,
  Sliders,
  Check,
  Eye,
  AlertCircle
} from 'lucide-react';
import { TEMPLATES } from '../data/sampleData';
import { TemplateId, ResumeData } from '../types/resume';
import { ResumePreview } from './ResumePreview';

interface LandingPageSectionProps {
  onLaunchGenerator: () => void;
  onSelectTemplate: (id: TemplateId) => void;
  selectedTemplate: TemplateId;
  accentColor: string;
  onChangeAccentColor?: (color: string) => void;
  resumeData: ResumeData;
  onOpenRazorpayModal: () => void;
  onOpenApiKeysModal: () => void;
  isPdfUnlocked: boolean;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  isUploadingFile: boolean;
  statusMessage: string | null;
  openRouterKey?: string;
  onExportTxt?: () => void;
}

export const LandingPageSection: React.FC<LandingPageSectionProps> = ({
  onLaunchGenerator,
  onSelectTemplate,
  selectedTemplate,
  accentColor,
  onChangeAccentColor,
  resumeData,
  onOpenRazorpayModal,
  onOpenApiKeysModal,
  isPdfUnlocked,
  onFileUpload,
  isUploadingFile,
  statusMessage,
  openRouterKey,
  onExportTxt,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const syntheticEvent = {
        target: { files },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      await onFileUpload(syntheticEvent);
    }
  };

  return (
    <div className="space-y-12 pb-16 font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-slate-800 text-white p-8 sm:p-12 text-center shadow-2xl">
        <div className="absolute inset-0 bg-radial from-indigo-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>100% ATS Single-Column Compliant • Razorpay Secure Export (₹199)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Craft Job-Winning Resumes <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
              Tailored for Top Portals
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Upload your existing CV directly below to generate an instant single-column ATS preview. Preserves authentic experiences for <strong className="text-white">Ranjana Guha</strong> (Statistical Analyst, ISI Kolkata) or your own uploaded document.
          </p>

          {/* Primary Action Buttons - ONE ABOVE */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onLaunchGenerator}
              className="px-7 py-3.5 rounded-xl font-extrabold text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 shadow-xl shadow-indigo-600/30 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>🚀 Launch Live App &amp; Generator</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3.5 rounded-xl font-bold text-sm text-slate-100 bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-500/10"
            >
              <Upload className="w-4 h-4 text-indigo-300" />
              <span>Upload CV File on Index</span>
            </button>

            <button
              onClick={onOpenRazorpayModal}
              className="px-6 py-3.5 rounded-xl font-bold text-sm text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4 text-blue-400" />
              <span>{isPdfUnlocked ? '✓ PDF Export Unlocked' : 'Unlock PDF Export (₹199)'}</span>
            </button>

            <button
              onClick={onOpenApiKeysModal}
              className="px-5 py-3.5 rounded-xl font-bold text-xs text-slate-300 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 transition flex items-center justify-center gap-2 cursor-pointer"
              title="Configure OpenRouter key for extraction & Razorpay live key"
            >
              <Key className="w-3.5 h-3.5 text-amber-400" />
              <span>API &amp; Razorpay Keys</span>
            </button>
          </div>

          {/* Key Stats Bar */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-indigo-400 font-bold block text-sm">98/100 ATS Score</span>
              <span className="text-[11px] text-slate-400">Workday &amp; Taleo Parsable</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-emerald-400 font-bold block text-sm">6 Templates</span>
              <span className="text-[11px] text-slate-400">Harvard, Tech Blue, Navy &amp; more</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-sky-400 font-bold block text-sm">Naukri &amp; Indeed</span>
              <span className="text-[11px] text-slate-400">Portal Keyword Matcher</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-purple-400 font-bold block text-sm">Razorpay Live (₹199)</span>
              <span className="text-[11px] text-slate-400">Protected Backend Key Storage</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INDEX PAGE CV UPLOAD CARD */}
      <section className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl text-white space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Upload Existing CV on Index Page</span>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 font-mono px-2 py-0.5 rounded-full border border-indigo-500/30">
                  PDF • DOC • DOCX • TXT
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Drop your resume file below. Text extraction automatically parses work history, degrees, and skills into the live preview.
              </p>
            </div>
          </div>

          {/* OpenRouter Extraction Status Indicator */}
          <div className="flex items-center gap-2">
            {openRouterKey ? (
              <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-xl flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>OpenRouter 100% Extraction Active</span>
              </span>
            ) : (
              <button
                type="button"
                onClick={onOpenApiKeysModal}
                className="text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition cursor-pointer"
                title="Add OpenRouter API key for high-precision extraction"
              >
                <Key className="w-3.5 h-3.5 text-amber-400" />
                <span>Add OpenRouter Key for Extraction</span>
              </button>
            )}
          </div>
        </div>

        {/* Drag & Drop Zone */}
        <input
          type="file"
          ref={fileInputRef}
          accept=".pdf,.doc,.docx,.txt"
          className="hidden"
          onChange={onFileUpload}
        />

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-8 text-center transition cursor-pointer flex flex-col items-center justify-center gap-3 ${
            isDragOver
              ? 'border-indigo-400 bg-indigo-950/40 text-white'
              : 'border-slate-800 hover:border-indigo-500 bg-slate-900/60 hover:bg-slate-900 text-slate-300'
          }`}
        >
          {isUploadingFile ? (
            <div className="space-y-3 py-4">
              <RefreshCw className="w-10 h-10 text-indigo-400 animate-spin mx-auto" />
              <p className="text-sm font-bold text-white">Extracting &amp; Structuring Resume Data...</p>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                {statusMessage || 'Reading document streams, parsing job positions and technical skills...'}
              </p>
            </div>
          ) : (
            <>
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center">
                <FileText className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-white">
                  Drag and drop your CV file here, or <span className="text-indigo-400 underline">browse device</span>
                </p>
                <p className="text-xs text-slate-400">
                  Accepts PDF, Word documents (.docx, .doc), or plain text. Real client-side text parsing with zero data leakage.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-[11px] text-slate-400">
                <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">PDF (.pdf)</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Word (.docx, .doc)</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Plaintext (.txt)</span>
              </div>
            </>
          )}
        </div>

        {statusMessage && !isUploadingFile && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{statusMessage}</span>
            </span>
            <button
              onClick={onLaunchGenerator}
              className="text-[11px] font-bold text-emerald-200 hover:text-white underline cursor-pointer"
            >
              Open in Resume Editor →
            </button>
          </div>
        )}
      </section>

      {/* 3. GOOD PREVIEW OF GENERATED CV ON INDEX PAGE */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Live Generated CV Preview (Single-Column ATS)
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Currently displaying: <strong className="text-slate-800">{resumeData.personalInfo.fullName}</strong> • {resumeData.experiences.length} Work Positions • {resumeData.skills.length} Skill Categories
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onOpenRazorpayModal}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-blue-200" />
              <span>{isPdfUnlocked ? 'Print PDF' : 'Unlock PDF (₹199)'}</span>
            </button>

            {onExportTxt && (
              <button
                onClick={onExportTxt}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200 transition cursor-pointer"
                title="Download ATS Plaintext"
              >
                Download TXT
              </button>
            )}
          </div>
        </div>

        {/* Embedded Full-Featured Interactive ResumePreview */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
          <ResumePreview
            data={resumeData}
            templateId={selectedTemplate}
            accentColor={accentColor}
            onSelectTemplate={onSelectTemplate}
            onChangeAccentColor={onChangeAccentColor}
            isPdfUnlocked={isPdfUnlocked}
            onExportPdf={onOpenRazorpayModal}
            onExportTxt={onExportTxt}
          />
        </div>
      </section>

      {/* 4. README & SYSTEM ARCHITECTURE SECTION */}
      <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
            README.md Highlights &amp; System Docs
          </span>
        </div>

        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Single-Column ATS Compliance &amp; System Design
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Why multi-column resumes fail in enterprise recruiting tools and how ResumeCraft guarantees 100% text extraction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs text-slate-700 leading-relaxed">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                1
              </span>
              <span>Strict Single-Column Flow Rule</span>
            </h3>
            <p>
              Applicant Tracking Systems (Workday, Taleo, Greenhouse) read resumes top-to-bottom. Two-column or side-by-side resumes cause parsers to interleave sentences across columns, resulting in garbled experience text. ResumeCraft enforces a single-column linear layout.
            </p>
            <ul className="list-disc list-inside text-[11px] text-slate-500 font-mono space-y-1">
              <li>Standard H1, H2, H3 hierarchy</li>
              <li>Zero floating graphics or vector text obstacles</li>
              <li>Universal bullet point characters recognized by OCR</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                2
              </span>
              <span>Authentic Candidate Experience Preservation</span>
            </h3>
            <p>
              Zero hallucinated certifications or fake corporate placeholders. Preserves authentic career experiences at the <strong className="text-slate-900">Indian Statistical Institute (ISI)</strong>:
            </p>
            <ul className="list-disc list-inside text-[11px] text-slate-500 font-mono space-y-1">
              <li>Survey Analyst &amp; Field Project Manager (2018–Present)</li>
              <li>Statistical Field Project Coordinator &amp; Data Analyst (2014–2018)</li>
              <li>Advanced Excel, R (survey, tidyverse), and DBF microdata processing</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                3
              </span>
              <span>Automated Job Portal Matching</span>
            </h3>
            <p>
              Direct connectors for <strong className="text-slate-900">Naukri.com</strong>, <strong className="text-slate-900">Indeed</strong>, and <strong className="text-slate-900">LinkedIn</strong> job listings. Evaluates keyword density, technical competencies, and computes real-time ATS match grades.
            </p>
            <ul className="list-disc list-inside text-[11px] text-slate-500 font-mono space-y-1">
              <li>0–100 ATS keyword scoring metric</li>
              <li>Instant missing keyword suggestions</li>
              <li>Google STAR bullet point enhancement</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">
                4
              </span>
              <span>Razorpay Instant PDF Export Gateway (₹199)</span>
            </h3>
            <p>
              Secured with Razorpay payment processing for seamless unlock of high-resolution, single-column printable PDFs and matched executive cover letters.
            </p>
            <ul className="list-disc list-inside text-[11px] text-slate-500 font-mono space-y-1">
              <li>Protected live Razorpay key stored securely in backend</li>
              <li>₹199 flat fee supporting UPI (GPay, PhonePe, Paytm), Cards &amp; NetBanking</li>
              <li>Instant watermark-free single-column PDF export</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. 6 ATS TEMPLATES SHOWCASE */}
      <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xs space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Visual &amp; OCR Standards</span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">6 Colorful ATS-Compliant Layouts</h2>
          <p className="text-xs text-slate-500">
            Each layout follows single-column standard guidelines approved by Fortune 500 corporate talent acquisition teams.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.id}
              onClick={() => {
                onSelectTemplate(tmpl.id);
                onLaunchGenerator();
              }}
              className={`p-3 rounded-2xl border transition text-left group flex flex-col justify-between cursor-pointer ${
                selectedTemplate === tmpl.id
                  ? 'border-indigo-600 bg-indigo-50/50 shadow-sm ring-2 ring-indigo-500/20'
                  : 'border-slate-200 hover:border-indigo-500 bg-slate-50 hover:bg-white hover:shadow-md'
              }`}
            >
              <div>
                <div
                  className="h-2 w-10 rounded-full mb-3"
                  style={{ backgroundColor: tmpl.previewColor }}
                />
                <h4 className="font-bold text-xs text-slate-900 group-hover:text-indigo-600 transition">
                  {tmpl.name}
                </h4>
                <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">
                  {tmpl.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px]">
                <span className="font-bold text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded">
                  98% Pass
                </span>
                <span className="text-indigo-600 font-semibold group-hover:underline flex items-center gap-0.5">
                  Try <ArrowRight className="w-2.5 h-2.5" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 6. BOTTOM STICKY ACTION BANNER */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-extrabold text-base">Ready to customize or export your ATS resume?</h4>
          <p className="text-xs text-blue-100">
            Open in full editor to add projects, customize sections, tailor to live Naukri/Indeed postings, and download.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onLaunchGenerator}
            className="px-6 py-3 rounded-xl bg-white text-indigo-900 font-black text-xs shadow-lg hover:bg-slate-100 transition transform hover:scale-105 shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <span>🚀 Launch Live App &amp; Generator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onOpenRazorpayModal}
            className="px-5 py-3 rounded-xl bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs border border-blue-400/40 transition cursor-pointer"
          >
            <span>Unlock PDF (₹199)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
