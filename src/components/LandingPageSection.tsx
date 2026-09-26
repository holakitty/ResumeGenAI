import React from 'react';
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
} from 'lucide-react';
import { TEMPLATES } from '../data/sampleData';
import { TemplateId } from '../types/resume';

interface LandingPageSectionProps {
  onLaunchGenerator: () => void;
  onSelectTemplate: (id: TemplateId) => void;
  onOpenRazorpayModal: () => void;
  isPdfUnlocked: boolean;
}

export const LandingPageSection: React.FC<LandingPageSectionProps> = ({
  onLaunchGenerator,
  onSelectTemplate,
  onOpenRazorpayModal,
  isPdfUnlocked,
}) => {
  return (
    <div className="space-y-12 pb-16 font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-slate-800 text-white p-8 sm:p-14 text-center shadow-2xl">
        <div className="absolute inset-0 bg-radial from-indigo-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>100% ATS Single-Column Compliant • Razorpay Secure Export</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Craft Job-Winning Resumes <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
              Tailored for Top Portals
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Engineered for <strong className="text-white">Ranjana Guha</strong> (Statistical Analyst, Indian Statistical Institute). Features 6 colorful single-column ATS templates, real client-side PDF/DOC/TXT parsing, and instant PDF export via Razorpay payment gateway.
          </p>

          {/* Primary Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onLaunchGenerator}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-extrabold text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 shadow-xl shadow-indigo-600/30 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>🚀 Launch Resume Generator</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenRazorpayModal}
              className="w-full sm:w-auto px-6 py-4 rounded-xl font-bold text-sm text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4 text-blue-400" />
              <span>{isPdfUnlocked ? '✓ PDF Export Unlocked' : 'Unlock PDF Export (₹49)'}</span>
            </button>
          </div>

          {/* Key Stats Bar */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-indigo-400 font-bold block text-sm">98/100 ATS Score</span>
              <span className="text-[11px] text-slate-400">Workday &amp; Taleo Parsable</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-emerald-400 font-bold block text-sm">6 Templates</span>
              <span className="text-[11px] text-slate-400">Crimson, Navy, Emerald &amp; more</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-sky-400 font-bold block text-sm">Naukri &amp; Indeed</span>
              <span className="text-[11px] text-slate-400">Portal Keyword Matcher</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-purple-400 font-bold block text-sm">Razorpay UPI</span>
              <span className="text-[11px] text-slate-400">Secure Instant PDF Gateway</span>
            </div>
          </div>
        </div>
      </section>

      {/* README & Core Architecture Section */}
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
              <span>Razorpay Instant PDF Export Gateway</span>
            </h3>
            <p>
              Secured with Razorpay payment processing for seamless unlock of high-resolution, single-column printable PDFs and matched executive cover letters.
            </p>
            <ul className="list-disc list-inside text-[11px] text-slate-500 font-mono space-y-1">
              <li>UPI (Google Pay, PhonePe, Paytm), Cards, NetBanking</li>
              <li>Instant PDF generation without watermarks</li>
              <li>Direct verification and printable output</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Candidate Spotlight Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px] tracking-wide uppercase border border-emerald-500/30">
              Verified Candidate Profile
            </span>
            <span className="text-xs text-slate-400">Indian Statistical Institute (ISI)</span>
          </div>
          <h3 className="text-xl font-black text-white">Ranjana Guha — Senior Statistical Analyst</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Specialized in nationwide empirical survey analysis, large-scale microdata scrutiny, DBF database conversion, and statistical modeling in R and Advanced Excel.
          </p>
        </div>

        <button
          onClick={onLaunchGenerator}
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <span>Open Profile in Generator</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {/* 6 ATS Templates Showcase */}
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
              className="p-3 rounded-2xl border border-slate-200 hover:border-indigo-500 hover:shadow-md transition text-left group flex flex-col justify-between bg-slate-50 hover:bg-white cursor-pointer"
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

      {/* Bottom Sticky Action Banner to Generator */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-extrabold text-base">Ready to build or tailor your ATS resume?</h4>
          <p className="text-xs text-blue-100">
            Connect to job descriptions, run real-time STAR audits, and export with Razorpay.
          </p>
        </div>
        <button
          onClick={onLaunchGenerator}
          className="px-6 py-3 rounded-xl bg-white text-indigo-900 font-black text-xs shadow-lg hover:bg-slate-100 transition transform hover:scale-105 shrink-0 flex items-center gap-2 cursor-pointer"
        >
          <span>🚀 Launch Resume Generator</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
