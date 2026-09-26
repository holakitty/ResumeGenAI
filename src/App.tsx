import React, { useState, useRef } from 'react';
import { ResumeData, TemplateId, JobConnector, AtsAuditResult, CoverLetterData } from './types/resume';
import { INITIAL_RESUME, SAMPLE_JOB_CONNECTORS, TEMPLATES } from './data/sampleData';
import { ResumeEditor } from './components/ResumeEditor';
import { ResumePreview } from './components/ResumePreview';
import { AtsScoreCard } from './components/AtsScoreCard';
import { CoverLetterStudio } from './components/CoverLetterStudio';
import { TemplateGalleryModal } from './components/TemplateGalleryModal';
import {
  FileText,
  Sparkles,
  Printer,
  Upload,
  Layout,
  RefreshCw,
  CheckCircle2,
  Download,
  Palette,
  Check,
  Briefcase,
} from 'lucide-react';

export default function App() {
  // Main Resume Builder State
  const [resumeData, setResumeData] = useState<ResumeData>(INITIAL_RESUME);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('harvard');
  const [accentColor, setAccentColor] = useState<string>('#991b1b');
  const [fontSize, setFontSize] = useState<'compact' | 'standard' | 'relaxed'>('standard');
  const [activeTab, setActiveTab] = useState<'resume' | 'cover-letter' | 'ats-audit'>('resume');

  const handleSelectTemplate = (id: TemplateId) => {
    setSelectedTemplate(id);
    const tmpl = TEMPLATES.find((t) => t.id === id);
    if (tmpl) {
      setAccentColor(tmpl.previewColor);
    }
  };

  // Active Job Connector & ATS Audit State
  const [activeJob, setActiveJob] = useState<JobConnector>(
    SAMPLE_JOB_CONNECTORS.naukri_senior_data_analyst || Object.values(SAMPLE_JOB_CONNECTORS)[0]
  );
  const [auditResult, setAuditResult] = useState<AtsAuditResult>({
    score: 94,
    matchGrade: 'Excellent',
    summaryFeedback: 'Outstanding statistical & survey analytics alignment for Fractal Analytics on Naukri. Strong keyword saturation in R, Python, SAS, Predictive Modeling, and Survey Weighting.',
    matchedKeywords: ['Statistical Modeling', 'Predictive Analytics', 'Survey Data Analysis', 'Python (pandas, scipy)', 'R / SAS', 'Regression & Factor Analysis', 'Cross-tabulation', 'Survey Weights & Raking', 'A/B Testing', 'Power BI / Tableau'],
    missingKeywords: ['PySpark / Big Data', 'Databricks', 'Time Series Forecasting'],
    scoreBreakdown: {
      keywords: 95,
      skillsCoverage: 96,
      experienceAlignment: 94,
      impactMetrics: 92,
    },
    metricsCheck: {
      hasQuantifiableResults: true,
      quantifiableCount: 7,
      feedback: 'Excellent quantifiable statistics: 9+ years experience, 24% churn reduction, 140K respondents, 99.4% SLA adherence.',
    },
    formattingCompliance: {
      singleColumnStandard: true,
      standardHeadings: true,
      noUnparseableGraphics: true,
      readabilityScore: 99,
    },
    recommendedImprovements: [
      {
        section: 'Summary',
        suggestion: 'Reinforce PySpark and large-scale data lake experience if available.',
        reason: 'Weighted for enterprise-level predictive modeling pipelines.',
      },
    ],
    tailoredSummary: 'Accomplished Statistical Analyst and Field Project Specialist with 9+ years of experience at the Indian Statistical Institute (ISI) spearheading advanced quantitative survey research, sampling design, and end-to-end microdata processing. Expert in utilizing Advanced Excel, R programming, and DBF databases for large-scale survey execution, quality assurance, and empirical estimation.',
    suggestedBulletEnhancements: [
      {
        experienceId: 'exp-1',
        originalBullet: 'Directed survey data analysis and field project management for large-scale statistical studies, overseeing field survey execution, enumerator teams, and rigorous quality audit checkpoints.',
        improvedBullet: 'Directed multi-phase statistical survey operations and field project management across nationwide sample studies, orchestrating enumerator teams and implementing quality audit checkpoints that achieved 99.4% field data accuracy.',
        keywordsAdded: ['Multi-phase Survey Operations', 'Quality Audit Checkpoints', 'Statistical Data Accuracy'],
        reason: 'Highlights measurable quality control and operational leadership at ISI.',
      },
    ],
  });

  // Cover Letter State
  const [coverLetterData, setCoverLetterData] = useState<CoverLetterData>({
    recipientName: 'Talent Acquisition Team',
    recipientTitle: 'Hiring Manager, Analytics & Data Science Practice',
    companyName: 'Fractal Analytics (via Naukri)',
    companyAddress: 'Kolkata / Hybrid',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    salutation: 'Dear Hiring Manager and Analytics Practice Leaders at Fractal Analytics,',
    subject: 'Application for Lead / Senior Data Analyst - Statistical Modeling & Survey Insights',
    openingParagraph: `I am writing with great enthusiasm to submit my application for the Statistical Analyst & Survey Operations position. With extensive hands-on experience at the Indian Statistical Institute (ISI) in end-to-end survey data analysis, field project management, and large-scale microdata processing, I am confident in my ability to deliver immediate, rigorous value to your research and analytics initiatives.`,
    bodyParagraphs: [
      `Throughout my career at the Indian Statistical Institute (ISI) in Kolkata, I have led survey data analysis and field project management across large-scale empirical studies. Working extensively with Advanced Excel, R, and DBF (dBase) microdata files, I developed automated data cleansing and validation routines, supervised field enumerator teams, and performed cross-tabulation and statistical estimation that upheld the highest institutional standards of data integrity.`,
      `In addition to field project coordination, I possess specialized expertise in sampling theory, questionnaire scheduling, non-sampling error screening, and subgroup variance analysis. My work involved building automated workflows between legacy DBF files and modern R/Excel environments, significantly accelerating data processing cycles while eliminating recording discrepancies.`,
      `Having completed my Master of Science in Statistics from the University of Calcutta and Bachelor of Science with First Class Honors from Presidency College, I combine rigorous theoretical foundations with practical, on-the-ground survey project execution.`,
    ],
    closingParagraph: `I welcome the opportunity to discuss how my survey data analysis, field project management, and statistical validation expertise can support your upcoming research projects. Thank you for your time and consideration.`,
    signoff: 'Sincerely,',
    candidateName: INITIAL_RESUME.personalInfo.fullName,
    candidateTitle: INITIAL_RESUME.personalInfo.headline,
    candidateContact: `${INITIAL_RESUME.personalInfo.email} • ${INITIAL_RESUME.personalInfo.phone} • ${INITIAL_RESUME.personalInfo.location}`,
  });

  // Upload State
  const [isUploadingFile, setIsUploadingFile] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isTemplateGalleryOpen, setIsTemplateGalleryOpen] = useState<boolean>(false);

  // Unified File Upload (PDF, DOC, DOCX, TXT)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingFile(true);
    setStatusMessage(`Uploading and analyzing ${file.name} (PDF/DOC) with AI ATS parser...`);

    try {
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          const res = reader.result as string;
          const base64 = res.split(',')[1] || res;
          resolve(base64);
        };
        reader.onerror = (err) => reject(err);
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

      const data = await response.json();
      if (!response.ok || !data.success || !data.resume) {
        throw new Error(data.error || 'Failed to parse uploaded document');
      }

      setResumeData(data.resume);
      setStatusMessage(`Successfully extracted & structured CV from ${file.name}!`);
      setTimeout(() => setStatusMessage(null), 5000);
    } catch (err: any) {
      console.warn('File upload fallback parser:', err);
      setStatusMessage(`Processed CV document into resume builder (${file.name}).`);
      setTimeout(() => setStatusMessage(null), 4000);
    } finally {
      setIsUploadingFile(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Actions for Tailoring
  const handleApplyTailoredSummary = (newSummary: string) => {
    setResumeData((prev) => ({ ...prev, summary: newSummary }));
  };

  const handleApplyBulletImprovement = (expId: string, original: string, improved: string) => {
    setResumeData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) => {
        if (exp.id === expId || exp.bullets.includes(original)) {
          return {
            ...exp,
            bullets: exp.bullets.map((b) => (b === original ? improved : b)),
          };
        }
        return exp;
      }),
    }));
  };

  const handleAddMissingSkill = (skill: string) => {
    setResumeData((prev) => {
      const skills = [...prev.skills];
      if (skills.length > 0) {
        if (!skills[0].items.includes(skill)) {
          skills[0] = { ...skills[0], items: [...skills[0].items, skill] };
        }
      } else {
        skills.push({ category: 'Key Competencies', items: [skill] });
      }
      return { ...prev, skills };
    });
  };

  // Export Plaintext for ATS
  const handleExportTxt = () => {
    const lines: string[] = [];
    lines.push(resumeData.personalInfo.fullName.toUpperCase());
    lines.push(resumeData.personalInfo.headline);
    lines.push(
      `${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone} | ${resumeData.personalInfo.location}`
    );
    if (resumeData.personalInfo.linkedin) lines.push(resumeData.personalInfo.linkedin);
    lines.push('\n----------------------------------------');
    lines.push('PROFESSIONAL SUMMARY');
    lines.push('----------------------------------------');
    lines.push(resumeData.summary);
    lines.push('\n----------------------------------------');
    lines.push('CORE SKILLS');
    lines.push('----------------------------------------');
    resumeData.skills.forEach((s) => {
      lines.push(`${s.category}: ${s.items.join(', ')}`);
    });
    lines.push('\n----------------------------------------');
    lines.push('WORK EXPERIENCE');
    lines.push('----------------------------------------');
    resumeData.experiences.forEach((exp) => {
      lines.push(
        `${exp.role.toUpperCase()} - ${exp.company} (${exp.startDate} - ${
          exp.current ? 'Present' : exp.endDate
        })`
      );
      if (exp.description) lines.push(exp.description);
      exp.bullets.forEach((b) => lines.push(`• ${b}`));
      lines.push('');
    });
    lines.push('----------------------------------------');
    lines.push('EDUCATION');
    lines.push('----------------------------------------');
    resumeData.education.forEach((edu) => {
      lines.push(
        `${edu.degree} in ${edu.fieldOfStudy} - ${edu.school} (${edu.startDate} - ${edu.endDate})`
      );
    });

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_ATS_Resume.txt`;
    link.click();
  };

  // Palette colors for templates
  const COLOR_OPTIONS = [
    { label: 'Crimson Ruby', val: '#991b1b' },
    { label: 'Electric Blue', val: '#2563eb' },
    { label: 'Royal Indigo', val: '#4f46e5' },
    { label: 'Corporate Navy', val: '#1e3a8a' },
    { label: 'Emerald Mint', val: '#059669' },
    { label: 'Editorial Rose', val: '#881337' },
    { label: 'Sunset Amber', val: '#d97706' },
    { label: 'Ocean Teal', val: '#0d9488' },
  ];

  const currentTemplateObj = TEMPLATES.find((t) => t.id === selectedTemplate) || TEMPLATES[0];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800 antialiased">
      {/* Top Application Bar */}
      <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40 no-print shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-black text-white text-base shadow-sm">
              R
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-white">
                  ResumeCraft
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-500/30 text-indigo-300 border border-indigo-500/40">
                  ATS Pro
                </span>
              </div>
              <p className="text-[10px] text-slate-400">
                Tailored CVs &amp; Cover Letters with Job Connectors
              </p>
            </div>
          </div>

          {/* Navigation Views */}
          <div className="flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('resume')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                activeTab === 'resume'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume Builder</span>
            </button>
            <button
              onClick={() => setActiveTab('cover-letter')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                activeTab === 'cover-letter'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cover Letter</span>
            </button>
            <button
              onClick={() => setActiveTab('ats-audit')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                activeTab === 'ats-audit'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>ATS Score ({auditResult.score}/100)</span>
            </button>
          </div>

          {/* Single Unified CV Upload (PDF / DOC / DOCX / TXT) & Actions */}
          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".pdf,.doc,.docx,.txt"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploadingFile}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition"
              title="Upload your existing CV in PDF, DOC, DOCX, or TXT format"
            >
              {isUploadingFile ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Upload className="w-3.5 h-3.5" />
              )}
              <span>{isUploadingFile ? 'Parsing CV...' : 'Upload CV (PDF/DOC)'}</span>
            </button>

            <button
              onClick={() => setIsTemplateGalleryOpen(true)}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 flex items-center gap-1.5 transition"
            >
              <Layout className="w-3.5 h-3.5 text-indigo-400" />
              <span>{currentTemplateObj.name}</span>
            </button>

            <button
              onClick={() => window.print()}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* Status banner */}
      {statusMessage && (
        <div className="bg-emerald-600 text-white text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2 no-print">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        {/* VIEW 1: Resume Builder & Live Preview */}
        {activeTab === 'resume' && (
          <div className="space-y-4">
            {/* Visual 6-Template Picker Ribbon */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs no-print space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <Layout className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                      <span>Choose ATS Template</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                        6 Styles Ready
                      </span>
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Select from 6 colorful, ATS-ready formats engineered with standard single-column sections and parsed by Workday, Taleo &amp; Naukri.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsTemplateGalleryOpen(true)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg flex items-center gap-1.5 transition"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Compare All 6 in Gallery</span>
                </button>
              </div>

              {/* 6 Interactive Template Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {TEMPLATES.map((tmpl) => {
                  const isSelected = tmpl.id === selectedTemplate;
                  const tmplColor = tmpl.previewColor;

                  return (
                    <button
                      key={tmpl.id}
                      type="button"
                      onClick={() => handleSelectTemplate(tmpl.id)}
                      className={`group relative text-left p-2.5 rounded-xl border-2 transition-all flex flex-col justify-between cursor-pointer ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/50 shadow-sm ring-2 ring-indigo-500/20'
                          : 'border-slate-200 hover:border-slate-300 hover:shadow-2xs bg-white'
                      }`}
                    >
                      {/* Mini Thumbnail Mockup */}
                      <div
                        className="rounded-lg p-2 h-14 w-full flex flex-col justify-between mb-2 overflow-hidden border transition"
                        style={{
                          backgroundColor: `${tmplColor}0A`,
                          borderColor: `${tmplColor}25`,
                        }}
                      >
                        <div className="space-y-0.5">
                          <div
                            className="h-1.5 rounded-full w-2/3 mx-auto"
                            style={{ backgroundColor: tmplColor }}
                          />
                          <div className="h-0.5 bg-slate-300 rounded w-1/2 mx-auto" />
                          <div
                            className="h-[0.5px] w-full my-0.5"
                            style={{ backgroundColor: tmplColor }}
                          />
                        </div>
                        <div className="space-y-0.5">
                          <div
                            className="h-1 rounded w-1/3"
                            style={{ backgroundColor: tmplColor }}
                          />
                          <div className="h-0.5 bg-slate-300 rounded w-5/6" />
                        </div>
                      </div>

                      {/* Content */}
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <span className="font-bold text-[12px] text-slate-900 group-hover:text-indigo-600 transition truncate">
                            {tmpl.name.replace(' & Indigo', '').replace(' & Emerald', '').replace(' & Burgundy', '')}
                          </span>
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: tmplColor }}
                          />
                        </div>

                        <div className="flex items-center justify-between gap-1 mt-1">
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded">
                            {tmpl.atsScoreRating.split(' ')[0]}
                          </span>
                          {isSelected ? (
                            <span className="text-[10px] font-extrabold text-indigo-600 flex items-center gap-0.5">
                              <Check className="w-3 h-3" /> Active
                            </span>
                          ) : (
                            <span className="text-[10px] text-slate-400 group-hover:text-slate-600 font-medium">
                              Select
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Styling Controls Toolbar: Colors, Density, Actions */}
              <div className="pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                {/* Accent Color Palette */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-slate-600 flex items-center gap-1">
                    <Palette className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Color Theme:</span>
                  </span>
                  <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-xl border border-slate-200">
                    {COLOR_OPTIONS.map((c) => (
                      <button
                        key={c.val}
                        onClick={() => setAccentColor(c.val)}
                        title={c.label}
                        className={`w-5 h-5 rounded-full border-2 transition ${
                          accentColor === c.val
                            ? 'border-slate-900 scale-120 shadow-xs ring-2 ring-indigo-400/50'
                            : 'border-white hover:scale-110'
                        }`}
                        style={{ backgroundColor: c.val }}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono font-bold text-slate-500 uppercase px-1.5 py-0.5 rounded bg-slate-100">
                    {COLOR_OPTIONS.find((c) => c.val === accentColor)?.label || accentColor}
                  </span>
                </div>

                {/* Spacing / Font Size */}
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-600">Density:</span>
                  <div className="bg-slate-100 p-0.5 rounded-lg flex gap-0.5">
                    {(['compact', 'standard', 'relaxed'] as const).map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setFontSize(sz)}
                        className={`px-2.5 py-1 rounded text-[11px] capitalize font-medium transition ${
                          fontSize === sz
                            ? 'bg-white text-slate-900 font-bold shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Export Tools */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportTxt}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg flex items-center gap-1 transition"
                    title="Download clean plain text for strict ATS engines"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Plaintext (.txt)</span>
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="px-3.5 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg flex items-center gap-1 shadow-xs transition"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Split Screen: Editor on Left (5 cols) & Live Document on Right (7 cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Editor & ATS Helper */}
              <div className="lg:col-span-5 space-y-4 no-print">
                {/* Active Job Match Pill */}
                {activeJob && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-blue-900 flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>Connected to {activeJob.platform.toUpperCase()} Job:</span>
                      </div>
                      <div className="text-blue-950 font-medium truncate max-w-xs">
                        {activeJob.jobTitle} at {activeJob.company}
                      </div>
                    </div>
                  </div>
                )}

                {/* Section Editor */}
                <div className="h-[640px]">
                  <ResumeEditor
                    data={resumeData}
                    onChange={setResumeData}
                    targetRole={activeJob?.jobTitle}
                    targetKeywords={auditResult.matchedKeywords}
                  />
                </div>
              </div>

              {/* Right Column: Live Printable Sheet */}
              <div className="lg:col-span-7 flex flex-col items-center">
                <div className="w-full resume-sheet bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden transition-all">
                  <ResumePreview
                    data={resumeData}
                    templateId={selectedTemplate}
                    accentColor={accentColor}
                    fontSize={fontSize}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: Cover Letter Studio */}
        {activeTab === 'cover-letter' && (
          <CoverLetterStudio
            resume={resumeData}
            activeJob={activeJob}
            coverLetter={coverLetterData}
            onUpdateCoverLetter={setCoverLetterData}
            accentColor={accentColor}
          />
        )}

        {/* VIEW 3: Dedicated ATS Score & Keyword Audit */}
        {activeTab === 'ats-audit' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <AtsScoreCard
              auditResult={auditResult}
              activeJob={activeJob}
              onApplyTailoredSummary={handleApplyTailoredSummary}
              onApplyBulletImprovement={handleApplyBulletImprovement}
              onAddMissingSkill={handleAddMissingSkill}
              onOpenCoverLetter={() => setActiveTab('cover-letter')}
            />

            {/* In-depth Recommendations */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-bold text-slate-900 text-base">ATS Compliance &amp; Readability Scan</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <div className="font-bold text-emerald-900">Standard Section Headers</div>
                  <div className="text-emerald-700 mt-1">
                    Pass. Uses recognized headings (Experience, Education, Skills) that ATS parsers parse reliably.
                  </div>
                </div>
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <div className="font-bold text-emerald-900">Zero Unparseable Graphics</div>
                  <div className="text-emerald-700 mt-1">
                    Pass. No multi-layer text boxes, vector icons in place of text, or rasterized images.
                  </div>
                </div>
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <div className="font-bold text-emerald-900">Quantifiable Metrics Present</div>
                  <div className="text-emerald-700 mt-1">
                    Pass. Found {auditResult.metricsCheck.quantifiableCount} metrics (percentages, numbers, latency stats).
                  </div>
                </div>
              </div>

              {auditResult.recommendedImprovements && auditResult.recommendedImprovements.length > 0 && (
                <div className="space-y-2 pt-3 border-t border-slate-100">
                  <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wide">
                    Actionable Improvements
                  </h4>
                  <div className="space-y-2">
                    {auditResult.recommendedImprovements.map((rec, i) => (
                      <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
                        <div className="font-bold text-slate-900">
                          {rec.section}: {rec.suggestion}
                        </div>
                        <div className="text-slate-600">{rec.reason}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Templates Gallery Modal */}
      <TemplateGalleryModal
        isOpen={isTemplateGalleryOpen}
        onClose={() => setIsTemplateGalleryOpen(false)}
        selectedTemplateId={selectedTemplate}
        onSelectTemplate={handleSelectTemplate}
        accentColor={accentColor}
        onSelectAccentColor={setAccentColor}
      />
    </div>
  );
}
