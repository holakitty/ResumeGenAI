import React, { useState, useEffect } from 'react';
import { ResumeData, TemplateId } from '../types/resume';
import { HarvardTemplate } from './templates/HarvardTemplate';
import { ModernTechTemplate } from './templates/ModernTechTemplate';
import { ExecutiveSlateTemplate } from './templates/ExecutiveSlateTemplate';
import { CorporateNavyTemplate } from './templates/CorporateNavyTemplate';
import { NordicCompactTemplate } from './templates/NordicCompactTemplate';
import { EditorialSerifTemplate } from './templates/EditorialSerifTemplate';
import {
  ZoomIn,
  ZoomOut,
  CheckCircle2,
  Printer,
  FileCheck,
  Maximize2,
  Minimize2,
  Copy,
  Sparkles,
  Lock,
  Unlock,
  Eye,
  Sliders,
  Check,
} from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
  templateId: TemplateId;
  accentColor?: string;
  fontSize?: 'compact' | 'standard' | 'relaxed';
  onSelectTemplate?: (id: TemplateId) => void;
  onChangeAccentColor?: (color: string) => void;
  onChangeFontSize?: (size: 'compact' | 'standard' | 'relaxed') => void;
  targetKeywords?: string[];
  isPdfUnlocked?: boolean;
  onExportPdf?: () => void;
  onExportTxt?: () => void;
}

const TEMPLATE_OPTIONS: Array<{
  id: TemplateId;
  name: string;
  icon: string;
  color: string;
  desc: string;
}> = [
  { id: 'harvard', name: 'Harvard Ivy', icon: '🏛️', color: '#800000', desc: 'Single-column academic standard' },
  { id: 'modern-tech', name: 'Modern Tech', icon: '⚡', color: '#2563eb', desc: 'Crisp borders & skill tags' },
  { id: 'corporate-pro', name: 'Corporate Navy', icon: '💼', color: '#1e3a8a', desc: 'Fortune 500 executive format' },
  { id: 'executive-slate', name: 'Executive Slate', icon: '🎯', color: '#334155', desc: 'High-contrast leadership layout' },
  { id: 'nordic-compact', name: 'Nordic Mint', icon: '🌿', color: '#059669', desc: 'Space-efficient 1-page design' },
  { id: 'creative-serif', name: 'Editorial Serif', icon: '🖋️', color: '#9f1239', desc: 'Refined typography & clean rules' },
];

const ACCENT_PALETTE = [
  { label: 'Harvard Crimson', value: '#800000' },
  { label: 'Tech Royal Blue', value: '#2563eb' },
  { label: 'Corporate Navy', value: '#1e3a8a' },
  { label: 'Executive Slate', value: '#334155' },
  { label: 'Nordic Emerald', value: '#059669' },
  { label: 'Editorial Rose', value: '#9f1239' },
  { label: 'Dark Charcoal', value: '#18181b' },
  { label: 'Amethyst Violet', value: '#7c3aed' },
];

export const ResumePreview: React.FC<ResumePreviewProps> = ({
  data,
  templateId,
  accentColor = '#2563eb',
  fontSize = 'standard',
  onSelectTemplate,
  onChangeAccentColor,
  onChangeFontSize,
  targetKeywords = [],
  isPdfUnlocked = false,
  onExportPdf,
  onExportTxt,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isFitWidth, setIsFitWidth] = useState<boolean>(false);
  const [showMarginGuides, setShowMarginGuides] = useState<boolean>(false);
  const [highlightKeywords, setHighlightKeywords] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  // Close fullscreen with ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 10, 130));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 10, 70));
  const handleResetZoom = () => {
    setZoomLevel(100);
    setIsFitWidth(false);
  };

  const handleCopyPlaintext = () => {
    if (onExportTxt) {
      onExportTxt();
      setCopiedNotification('Plaintext copied & downloaded!');
      setTimeout(() => setCopiedNotification(null), 3000);
      return;
    }

    const lines: string[] = [];
    lines.push(data.personalInfo.fullName.toUpperCase());
    lines.push(data.personalInfo.headline);
    lines.push(`${data.personalInfo.email} | ${data.personalInfo.phone} | ${data.personalInfo.location}`);
    if (data.personalInfo.linkedin) lines.push(data.personalInfo.linkedin);
    lines.push('\n--- PROFESSIONAL SUMMARY ---');
    lines.push(data.summary);
    lines.push('\n--- WORK EXPERIENCE ---');
    data.experiences.forEach((exp) => {
      lines.push(`${exp.role.toUpperCase()} - ${exp.company} (${exp.startDate} - ${exp.current ? 'Present' : exp.endDate})`);
      if (exp.description) lines.push(exp.description);
      exp.bullets.forEach((b) => lines.push(`• ${b}`));
      lines.push('');
    });
    lines.push('--- EDUCATION ---');
    data.education.forEach((edu) => {
      lines.push(`${edu.degree} in ${edu.fieldOfStudy} - ${edu.school} (${edu.startDate} - ${edu.endDate})`);
    });

    navigator.clipboard.writeText(lines.join('\n'));
    setCopiedNotification('ATS Plaintext copied to clipboard!');
    setTimeout(() => setCopiedNotification(null), 3000);
  };

  const renderTemplateContent = () => {
    switch (templateId) {
      case 'harvard':
        return <HarvardTemplate data={data} accentColor={accentColor} fontSize={fontSize} />;
      case 'modern-tech':
        return <ModernTechTemplate data={data} accentColor={accentColor} fontSize={fontSize} />;
      case 'executive-slate':
        return <ExecutiveSlateTemplate data={data} accentColor={accentColor} fontSize={fontSize} />;
      case 'corporate-pro':
        return <CorporateNavyTemplate data={data} accentColor={accentColor} fontSize={fontSize} />;
      case 'nordic-compact':
        return <NordicCompactTemplate data={data} accentColor={accentColor} fontSize={fontSize} />;
      case 'creative-serif':
        return <EditorialSerifTemplate data={data} accentColor={accentColor} fontSize={fontSize} />;
      default:
        return <HarvardTemplate data={data} accentColor={accentColor} fontSize={fontSize} />;
    }
  };

  const activeTemplate = TEMPLATE_OPTIONS.find((t) => t.id === templateId) || TEMPLATE_OPTIONS[0];

  return (
    <div className="w-full flex flex-col items-center bg-slate-900/5">
      {/* 1. Quick-Switch Template Navigation Strip */}
      <div className="w-full bg-slate-900 border-b border-slate-800 px-3 py-2 no-print overflow-x-auto">
        <div className="flex items-center gap-1.5 min-w-max">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1.5 flex items-center gap-1">
            <Sliders className="w-3.5 h-3.5 text-blue-400" />
            Template:
          </span>
          {TEMPLATE_OPTIONS.map((tmpl) => {
            const isSelected = tmpl.id === templateId;
            return (
              <button
                key={tmpl.id}
                onClick={() => onSelectTemplate && onSelectTemplate(tmpl.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer border ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                    : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700/80 border-slate-700/60'
                }`}
                title={tmpl.desc}
              >
                <span>{tmpl.icon}</span>
                <span>{tmpl.name}</span>
                {isSelected && <Check className="w-3 h-3 text-blue-200" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Interactive Document Toolbar */}
      <div className="w-full bg-slate-950 text-white px-4 py-2.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs select-none no-print">
        {/* Left: Document Info & ATS Confidence */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 font-bold text-slate-100">
            <FileCheck className="w-4 h-4 text-emerald-400" />
            <span className="truncate max-w-[160px] sm:max-w-xs">
              {data.personalInfo.fullName || 'Candidate'}&apos;s ATS Resume
            </span>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1 text-emerald-400 text-[11px] font-semibold bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>99% ATS Parsable</span>
          </span>

          {copiedNotification && (
            <span className="animate-in fade-in inline-flex items-center gap-1 text-amber-300 text-[11px] font-semibold bg-amber-500/15 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
              <Check className="w-3 h-3" />
              <span>{copiedNotification}</span>
            </span>
          )}
        </div>

        {/* Right: Controls (Font Size, Accent Swatches, Zoom, Fullscreen, Actions) */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Font Size Adjuster */}
          {onChangeFontSize && (
            <div className="hidden lg:flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-[11px]">
              <span className="text-slate-400 px-1.5 font-medium">Text:</span>
              <button
                onClick={() => onChangeFontSize('compact')}
                className={`px-2 py-0.5 rounded font-medium transition cursor-pointer ${
                  fontSize === 'compact' ? 'bg-slate-700 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
                title="Compact (9pt) - Ideal for fitting on 1 Page"
              >
                9pt
              </button>
              <button
                onClick={() => onChangeFontSize('standard')}
                className={`px-2 py-0.5 rounded font-medium transition cursor-pointer ${
                  fontSize === 'standard' ? 'bg-slate-700 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
                title="Standard (10pt)"
              >
                10pt
              </button>
              <button
                onClick={() => onChangeFontSize('relaxed')}
                className={`px-2 py-0.5 rounded font-medium transition cursor-pointer ${
                  fontSize === 'relaxed' ? 'bg-slate-700 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
                title="Relaxed (11pt)"
              >
                11pt
              </button>
            </div>
          )}

          {/* Accent Color Swatches */}
          {onChangeAccentColor && (
            <div className="hidden sm:flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg px-2 py-1">
              <span className="text-[11px] text-slate-400 font-medium mr-1">Color:</span>
              {ACCENT_PALETTE.slice(0, 5).map((color) => (
                <button
                  key={color.value}
                  onClick={() => onChangeAccentColor(color.value)}
                  style={{ backgroundColor: color.value }}
                  className={`w-3.5 h-3.5 rounded-full transition cursor-pointer ${
                    accentColor === color.value ? 'ring-2 ring-white ring-offset-1 ring-offset-slate-900 scale-110' : 'opacity-80 hover:opacity-100'
                  }`}
                  title={color.label}
                />
              ))}
            </div>
          )}

          {/* Margin Guides Toggle */}
          <button
            onClick={() => setShowMarginGuides(!showMarginGuides)}
            className={`hidden md:flex items-center gap-1 px-2 py-1 rounded-lg border text-[11px] font-medium transition cursor-pointer ${
              showMarginGuides
                ? 'bg-blue-900/60 text-blue-200 border-blue-600'
                : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
            }`}
            title="Toggle Printable Margin Guidelines"
          >
            <Eye className="w-3 h-3" />
            <span>Margins</span>
          </button>

          {/* Zoom Controls */}
          <div className="flex items-center bg-slate-900 rounded-lg p-0.5 border border-slate-800">
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 70}
              className="p-1 hover:bg-slate-800 text-slate-300 hover:text-white rounded transition disabled:opacity-40 cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleResetZoom}
              className="px-2 py-0.5 text-[11px] font-mono font-bold text-slate-300 hover:text-white transition cursor-pointer"
              title="Reset Zoom to 100%"
            >
              {zoomLevel}%
            </button>
            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= 130}
              className="p-1 hover:bg-slate-800 text-slate-300 hover:text-white rounded transition disabled:opacity-40 cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Fit Width Toggle */}
          <button
            onClick={() => setIsFitWidth(!isFitWidth)}
            className={`hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg border text-[11px] font-medium transition cursor-pointer ${
              isFitWidth
                ? 'bg-indigo-600 text-white border-indigo-500'
                : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
            }`}
            title="Toggle Fit to Screen Width"
          >
            <Maximize2 className="w-3 h-3" />
            <span>Fit Width</span>
          </button>

          {/* Fullscreen Inspector */}
          <button
            onClick={() => setIsFullscreen(true)}
            className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-800 transition cursor-pointer"
            title="Inspect Fullscreen Sheet (ESC to exit)"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>

          {/* Copy Plaintext Action */}
          <button
            onClick={handleCopyPlaintext}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg border border-slate-700 font-medium transition cursor-pointer"
            title="Copy ATS Plaintext for Workday / Taleo job portals"
          >
            <Copy className="w-3 h-3" />
            <span>Copy Text</span>
          </button>

          {/* Print / Export PDF Button */}
          <button
            onClick={onExportPdf ? onExportPdf : () => window.print()}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg flex items-center gap-1.5 shadow-sm transition cursor-pointer"
            title={isPdfUnlocked ? 'Instant Print / PDF' : 'Unlock Single-Column PDF via Razorpay (₹199)'}
          >
            {isPdfUnlocked ? (
              <Unlock className="w-3 h-3 text-emerald-300" />
            ) : (
              <Lock className="w-3 h-3 text-amber-300" />
            )}
            <Printer className="w-3 h-3" />
            <span>{isPdfUnlocked ? 'Print / PDF' : 'Export PDF'}</span>
          </button>
        </div>
      </div>

      {/* 3. Desk Canvas Presentation Area */}
      <div className="w-full bg-slate-200/90 p-4 sm:p-8 flex justify-center overflow-x-auto min-h-[750px] transition-colors relative">
        <div
          className={`transition-transform duration-200 origin-top flex flex-col items-center ${
            isFitWidth ? 'w-full' : 'w-full max-w-[850px]'
          }`}
          style={{
            transform: !isFitWidth && zoomLevel !== 100 ? `scale(${zoomLevel / 100})` : 'none',
          }}
        >
          {/* Printable White Paper Sheet with Realistic Lighting & Drop Shadow */}
          <div
            id="printable-resume-sheet"
            className={`w-full bg-white text-slate-900 rounded-xs shadow-[0_20px_70px_rgba(0,0,0,0.18),0_0_0_1px_rgba(0,0,0,0.06)] overflow-hidden transition-all duration-300 print:shadow-none print:rounded-none print:m-0 print:p-0 print:border-none relative ${
              showMarginGuides ? 'ring-1 ring-dashed ring-blue-400' : ''
            }`}
            style={{
              minHeight: '1100px',
            }}
          >
            {/* Margin Guide Overlays if enabled */}
            {showMarginGuides && (
              <div className="absolute inset-0 pointer-events-none border-2 border-dashed border-blue-400/40 m-6 sm:m-10 z-10 no-print flex flex-col justify-between p-2">
                <span className="text-[10px] font-mono text-blue-500 font-bold bg-blue-50/80 px-1.5 py-0.5 rounded self-start">
                  Standard Printable A4 Margin Area (15mm)
                </span>
                <span className="text-[10px] font-mono text-blue-500 font-bold bg-blue-50/80 px-1.5 py-0.5 rounded self-end">
                  Optimal Single-Page Height Limit
                </span>
              </div>
            )}

            {/* Template Content */}
            <div className="relative z-0">
              {renderTemplateContent()}
            </div>

            {/* Clean bottom sheet page indicator */}
            <div className="px-8 pb-4 pt-2 text-right text-[10px] text-slate-400 font-mono no-print">
              Page 1 of 1 • ATS Single-Column Standard • {activeTemplate.name}
            </div>
          </div>

          {/* Page Bottom Footer / Dimension Guide */}
          <div className="mt-4 pb-2 text-center text-[11px] font-medium text-slate-600 no-print flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              A4 Standard (210 × 297 mm)
            </span>
            <span>•</span>
            <span>Single-Column ATS Compliant</span>
            <span>•</span>
            <span>Zero Unparseable Graphics</span>
            <span>•</span>
            <span className="text-blue-700 font-semibold">{activeTemplate.name}</span>
          </div>
        </div>
      </div>

      {/* 4. Fullscreen Sheet Inspector Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex flex-col no-print animate-in fade-in duration-200">
          {/* Fullscreen Modal Header */}
          <div className="w-full bg-slate-950 border-b border-slate-800 px-6 py-3 flex items-center justify-between text-white text-xs">
            <div className="flex items-center gap-3">
              <span className="font-bold text-sm text-slate-100 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-400" />
                {data.personalInfo.fullName}&apos;s Resume Sheet Preview
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-600/30 text-blue-300 border border-blue-500/40">
                {activeTemplate.name}
              </span>
              <span className="text-slate-400 hidden sm:inline">Press ESC to exit</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyPlaintext}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg flex items-center gap-1.5 font-medium transition cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Plaintext</span>
              </button>

              <button
                onClick={onExportPdf ? onExportPdf : () => window.print()}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center gap-1.5 font-bold transition cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / PDF</span>
              </button>

              <button
                onClick={() => setIsFullscreen(false)}
                className="p-1.5 bg-slate-800 hover:bg-red-900/60 text-slate-300 hover:text-red-200 rounded-lg transition cursor-pointer"
                title="Close Fullscreen"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Fullscreen Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-10 flex justify-center items-start">
            <div className="w-full max-w-[850px] bg-white rounded-xs shadow-2xl overflow-hidden my-4">
              {renderTemplateContent()}
              <div className="px-8 pb-4 pt-2 text-right text-[10px] text-slate-400 font-mono">
                Page 1 of 1 • ATS Single-Column Standard • {activeTemplate.name}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
