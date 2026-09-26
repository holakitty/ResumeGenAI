import React, { useState } from 'react';
import { CoverLetterData, ResumeData, JobConnector } from '../types/resume';
import { CoverLetterPreview } from './CoverLetterPreview';
import { Sparkles, Printer, Copy, Check, Download, RefreshCw, Send, Sliders } from 'lucide-react';

interface CoverLetterStudioProps {
  resume: ResumeData;
  activeJob: JobConnector | null;
  coverLetter: CoverLetterData;
  onUpdateCoverLetter: (data: CoverLetterData) => void;
  accentColor?: string;
}

export const CoverLetterStudio: React.FC<CoverLetterStudioProps> = ({
  resume,
  activeJob,
  coverLetter,
  onUpdateCoverLetter,
  accentColor = '#1e3a8a',
}) => {
  const [tone, setTone] = useState<'professional' | 'confident' | 'enthusiastic' | 'executive'>('confident');
  const [hiringManager, setHiringManager] = useState('Hiring Manager / Talent Acquisition');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [fontFamily, setFontFamily] = useState<'serif' | 'sans'>('serif');

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resume,
          jobDescription: activeJob?.rawDescription || 'Lead Data Analyst and Statistical Modeling specialist role.',
          jobTitle: activeJob?.jobTitle || 'Lead / Senior Data Analyst',
          company: activeJob?.company || 'Target Company',
          tone,
          hiringManager,
        }),
      });

      const resData = await response.json();
      if (resData.success && resData.coverLetter) {
        onUpdateCoverLetter(resData.coverLetter);
      }
    } catch (e) {
      console.error('Error generating cover letter:', e);
      // Fallback generation so user has immediate output
      const fallbackLetter: CoverLetterData = {
        recipientName: hiringManager,
        recipientTitle: 'Talent Acquisition & Analytics Leadership',
        companyName: activeJob?.company || 'Fractal Analytics',
        companyAddress: activeJob?.location || 'Kolkata, India',
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        salutation: `Dear ${hiringManager},`,
        subject: `Application for ${activeJob?.jobTitle || 'Lead / Senior Data Analyst'} Position`,
        openingParagraph: `I am writing to express my enthusiastic interest in the ${activeJob?.jobTitle || 'Lead Data Analyst'} position at ${activeJob?.company || 'your organization'}. With 9+ years of progressive experience delivering advanced statistical modeling, econometric forecasting, and multi-wave survey data analytics, I am excited about the opportunity to contribute directly to your team's quantitative research and intelligence initiatives.`,
        bodyParagraphs: [
          `In my current capacity as Lead Data Analyst & Statistical Modeler, I have spearheaded predictive modeling initiatives in Python, R, and SQL, successfully improving client retention by 34% and engineering an end-to-end survey analytics infrastructure for studies exceeding 250,000 respondents. My background in sample design, post-stratification weighting, and regression diagnostics enables me to transform raw quantitative signals into rigorous strategic recommendations.`,
          `Your job description emphasizes rigorous statistical methodologies, survey science, and translating analytical models into actionable business decisions. Throughout my career, I have consistently applied multivariate regression, ANOVA, and hypothesis testing to identify customer satisfaction drivers—guiding multi-million dollar product allocations and reducing non-response bias by 45%.`,
        ],
        closingParagraph: `I welcome the opportunity to discuss how my statistical modeling expertise, survey analytics background, and dedication to data integrity can accelerate ${activeJob?.company || 'your organization'}'s research objectives. Thank you for your time and consideration.`,
        signoff: 'Sincerely,',
        candidateName: resume.personalInfo.fullName,
        candidateTitle: resume.personalInfo.headline,
        candidateContact: `${resume.personalInfo.email} • ${resume.personalInfo.phone} • ${resume.personalInfo.location}`,
      };
      onUpdateCoverLetter(fallbackLetter);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyText = () => {
    const fullText = `${coverLetter.candidateName}
${coverLetter.candidateTitle}
${coverLetter.candidateContact}

${coverLetter.date}

${coverLetter.recipientName}
${coverLetter.companyName}

${coverLetter.salutation}

Subject: ${coverLetter.subject}

${coverLetter.openingParagraph}

${coverLetter.bodyParagraphs.join('\n\n')}

${coverLetter.closingParagraph}

${coverLetter.signoff}
${coverLetter.candidateName}`;

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full items-start">
      {/* Controls & Editor Panel (5 cols) */}
      <div className="lg:col-span-5 space-y-4 no-print">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="font-bold text-slate-900 text-base flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                Cover Letter Generator
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Tailored to {activeJob ? activeJob.company : 'your target job specifications'}
              </p>
            </div>
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Regenerate with AI</span>
                </>
              )}
            </button>
          </div>

          {/* Tone Selector */}
          <div className="space-y-1.5 text-xs">
            <label className="font-semibold text-slate-700 block">Tone & Style</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {(['confident', 'professional', 'enthusiastic', 'executive'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTone(t)}
                  className={`py-1.5 px-2 rounded-lg font-medium capitalize text-center border transition ${
                    tone === t
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-900 font-bold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Recipient Details */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <label className="font-semibold text-slate-600 block mb-1">Hiring Manager</label>
              <input
                type="text"
                value={coverLetter.recipientName}
                onChange={(e) =>
                  onUpdateCoverLetter({ ...coverLetter, recipientName: e.target.value })
                }
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-600 block mb-1">Company</label>
              <input
                type="text"
                value={coverLetter.companyName}
                onChange={(e) =>
                  onUpdateCoverLetter({ ...coverLetter, companyName: e.target.value })
                }
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              />
            </div>
          </div>

          {/* Subject Line */}
          <div className="text-xs">
            <label className="font-semibold text-slate-600 block mb-1">Subject</label>
            <input
              type="text"
              value={coverLetter.subject}
              onChange={(e) =>
                onUpdateCoverLetter({ ...coverLetter, subject: e.target.value })
              }
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium"
            />
          </div>

          {/* Opening Paragraph */}
          <div className="text-xs">
            <label className="font-semibold text-slate-600 block mb-1">Opening Hook</label>
            <textarea
              rows={3}
              value={coverLetter.openingParagraph}
              onChange={(e) =>
                onUpdateCoverLetter({ ...coverLetter, openingParagraph: e.target.value })
              }
              className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 leading-relaxed"
            />
          </div>

          {/* Body Paragraphs */}
          <div className="text-xs space-y-2">
            <label className="font-semibold text-slate-600 block">Body Achievements</label>
            {coverLetter.bodyParagraphs.map((para, i) => (
              <textarea
                key={i}
                rows={3}
                value={para}
                onChange={(e) => {
                  const newParas = [...coverLetter.bodyParagraphs];
                  newParas[i] = e.target.value;
                  onUpdateCoverLetter({ ...coverLetter, bodyParagraphs: newParas });
                }}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 leading-relaxed mb-1"
              />
            ))}
          </div>

          {/* Closing Paragraph */}
          <div className="text-xs">
            <label className="font-semibold text-slate-600 block mb-1">Call to Action / Closing</label>
            <textarea
              rows={2}
              value={coverLetter.closingParagraph}
              onChange={(e) =>
                onUpdateCoverLetter({ ...coverLetter, closingParagraph: e.target.value })
              }
              className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* Live Cover Letter Document Preview (7 cols) */}
      <div className="lg:col-span-7 space-y-4">
        {/* Document Action Bar */}
        <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-200 no-print text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-600">Font:</span>
            <button
              onClick={() => setFontFamily('serif')}
              className={`px-2.5 py-1 rounded font-serif ${
                fontFamily === 'serif' ? 'bg-indigo-100 text-indigo-900 font-bold' : 'text-slate-600'
              }`}
            >
              Classic Serif
            </button>
            <button
              onClick={() => setFontFamily('sans')}
              className={`px-2.5 py-1 rounded font-sans ${
                fontFamily === 'sans' ? 'bg-indigo-100 text-indigo-900 font-bold' : 'text-slate-600'
              }`}
            >
              Modern Sans
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg flex items-center gap-1.5 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg flex items-center gap-1.5 shadow-xs transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>

        {/* The Formal Letter Page */}
        <div className="resume-sheet bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
          <CoverLetterPreview data={coverLetter} fontFamily={fontFamily} accentColor={accentColor} />
        </div>
      </div>
    </div>
  );
};
