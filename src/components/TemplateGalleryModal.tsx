import React from 'react';
import { TEMPLATES } from '../data/sampleData';
import { TemplateId } from '../types/resume';
import { Check, ShieldCheck, Palette, Sparkles } from 'lucide-react';

interface TemplateGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTemplateId: TemplateId;
  onSelectTemplate: (id: TemplateId) => void;
  accentColor?: string;
  onSelectAccentColor?: (color: string) => void;
}

export const TemplateGalleryModal: React.FC<TemplateGalleryModalProps> = ({
  isOpen,
  onClose,
  selectedTemplateId,
  onSelectTemplate,
  accentColor,
  onSelectAccentColor,
}) => {
  if (!isOpen) return null;

  const COLOR_PALETTES = [
    { label: 'Crimson Ruby', val: '#991b1b', bg: 'bg-red-700' },
    { label: 'Electric Blue', val: '#2563eb', bg: 'bg-blue-600' },
    { label: 'Royal Indigo', val: '#4f46e5', bg: 'bg-indigo-600' },
    { label: 'Corporate Navy', val: '#1e3a8a', bg: 'bg-blue-900' },
    { label: 'Emerald Mint', val: '#059669', bg: 'bg-emerald-600' },
    { label: 'Editorial Rose', val: '#881337', bg: 'bg-rose-900' },
    { label: 'Sunset Amber', val: '#d97706', bg: 'bg-amber-600' },
    { label: 'Teal Cyan', val: '#0d9488', bg: 'bg-teal-600' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-linear-to-r from-slate-900 via-indigo-950 to-blue-950 p-6 text-white flex justify-between items-start shrink-0">
          <div>
            <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% ATS-Compliant Layouts • 6 Distinct Aesthetic Templates</span>
            </div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span>Choose Your ATS Resume Template</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/40 text-indigo-200 border border-indigo-400/40 font-semibold">
                6 Styles Available
              </span>
            </h2>
            <p className="text-slate-300 text-xs mt-1 max-w-xl">
              Select from classic Ivy League serif to vibrant modern tech, executive slate, and Scandinavian mint layouts. All templates are 100% parsable by Workday, Taleo, Greenhouse, and Naukri.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-white/10 transition"
          >
            ✕
          </button>
        </div>

        {/* Color Palette Switcher Bar inside Modal */}
        {onSelectAccentColor && (
          <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
            <div className="flex items-center gap-2 font-bold text-slate-700">
              <Palette className="w-4 h-4 text-indigo-600" />
              <span>Global Color Palette Theme:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {COLOR_PALETTES.map((c) => (
                <button
                  key={c.val}
                  onClick={() => onSelectAccentColor(c.val)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-semibold transition ${
                    accentColor === c.val
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-500/20 shadow-xs'
                      : 'border-slate-300 bg-white text-slate-600 hover:border-slate-400'
                  }`}
                >
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c.val }} />
                  <span>{c.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Gallery Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
          {TEMPLATES.map((tmpl) => {
            const isSelected = tmpl.id === selectedTemplateId;
            const cardColor = tmpl.previewColor;

            return (
              <div
                key={tmpl.id}
                onClick={() => {
                  onSelectTemplate(tmpl.id);
                  if (onSelectAccentColor && !accentColor) {
                    onSelectAccentColor(tmpl.previewColor);
                  }
                  onClose();
                }}
                className={`relative flex flex-col justify-between p-4 rounded-xl border-2 cursor-pointer transition-all duration-150 ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/40 shadow-md ring-2 ring-indigo-500/20'
                    : 'border-slate-200 hover:border-indigo-300 hover:shadow-md bg-white'
                }`}
              >
                <div>
                  {/* Top tag & ATS badge */}
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-4 h-4 rounded-full shadow-2xs border border-white"
                        style={{ backgroundColor: cardColor }}
                      />
                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                        {tmpl.fontFamily}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      {tmpl.atsScoreRating}
                    </span>
                  </div>

                  {/* Thumbnail Mockup */}
                  <div
                    className="border rounded-lg p-3 h-36 flex flex-col justify-between mb-3 text-[8px] text-slate-400 select-none overflow-hidden transition"
                    style={{ backgroundColor: `${cardColor}08`, borderColor: `${cardColor}25` }}
                  >
                    <div className="space-y-1">
                      <div
                        className="h-2.5 rounded w-3/4 mx-auto"
                        style={{ backgroundColor: cardColor }}
                      />
                      <div className="h-1 bg-slate-300 rounded w-1/2 mx-auto" />
                      <div className="h-[1px] w-full my-1.5" style={{ backgroundColor: cardColor }} />
                    </div>
                    <div className="space-y-1">
                      <div className="h-1.5 rounded w-1/3" style={{ backgroundColor: cardColor }} />
                      <div className="h-1 bg-slate-400 rounded w-full" />
                      <div className="h-1 bg-slate-300 rounded w-5/6" />
                    </div>
                    <div className="space-y-1">
                      <div className="h-1.5 rounded w-1/4" style={{ backgroundColor: cardColor }} />
                      <div className="h-1 bg-slate-300 rounded w-11/12" />
                    </div>
                  </div>

                  {/* Template Info */}
                  <h3 className="font-bold text-slate-900 text-sm flex items-center justify-between">
                    <span>{tmpl.name}</span>
                    {isSelected && (
                      <span className="text-[11px] font-bold text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    )}
                  </h3>
                  <div className="text-[11px] font-semibold mt-0.5 mb-1.5" style={{ color: cardColor }}>
                    {tmpl.tagline}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    {tmpl.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                  <span className="text-[10px] text-slate-400 font-semibold">
                    100% Single-Column ATS
                  </span>
                  <button
                    type="button"
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                      isSelected
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600'
                    }`}
                  >
                    {isSelected ? 'Applied' : 'Use Template'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex flex-wrap justify-between items-center text-xs text-slate-500 shrink-0 gap-2">
          <span>All 6 templates follow standard global corporate ATS guidelines (Workday, Greenhouse, Taleo, Lever, Naukri).</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
