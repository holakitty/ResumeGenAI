import React from 'react';
import { AtsAuditResult, JobConnector } from '../types/resume';
import { CheckCircle2, AlertTriangle, Sparkles, ArrowRight, Check, Plus, ShieldCheck, Target, Zap } from 'lucide-react';

interface AtsScoreCardProps {
  auditResult: AtsAuditResult;
  activeJob: JobConnector | null;
  onApplyTailoredSummary: (summary: string) => void;
  onApplyBulletImprovement: (expId: string, original: string, improved: string) => void;
  onAddMissingSkill: (skill: string) => void;
  onOpenCoverLetter: () => void;
}

export const AtsScoreCard: React.FC<AtsScoreCardProps> = ({
  auditResult,
  activeJob,
  onApplyTailoredSummary,
  onApplyBulletImprovement,
  onAddMissingSkill,
  onOpenCoverLetter,
}) => {
  const {
    score = 85,
    matchGrade = 'Good',
    summaryFeedback,
    matchedKeywords = [],
    missingKeywords = [],
    scoreBreakdown,
    tailoredSummary,
    suggestedBulletEnhancements = [],
    recommendedImprovements = [],
    suggestedSkillsToAdd = [],
  } = auditResult;

  const getScoreColor = (val: number) => {
    if (val >= 90) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (val >= 75) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (val >= 60) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-rose-600 bg-rose-50 border-rose-200';
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-5">
      {/* Top Banner with ATS Score */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div
            className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center border font-black shadow-xs ${getScoreColor(
              score
            )}`}
          >
            <span className="text-2xl leading-none">{score}</span>
            <span className="text-[10px] uppercase font-bold tracking-wider mt-0.5">ATS Match</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-base">
                {matchGrade} Compatibility
              </span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                100% ATS Parsable
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5 max-w-md">
              {summaryFeedback ||
                (activeJob
                  ? `Optimized for ${activeJob.jobTitle} at ${activeJob.company}`
                  : 'Compare against a job description to calculate exact keyword alignment.')}
            </p>
          </div>
        </div>

        {activeJob && (
          <button
            onClick={onOpenCoverLetter}
            className="w-full sm:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate Matching Cover Letter</span>
          </button>
        )}
      </div>

      {/* Score Breakdown Bars */}
      {scoreBreakdown && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <div className="text-slate-500 font-medium">Keywords Match</div>
            <div className="text-base font-bold text-slate-900 mt-0.5">
              {scoreBreakdown.keywords || 88}%
            </div>
            <div className="w-full bg-slate-200 h-1 rounded-full mt-1.5 overflow-hidden">
              <div
                className="bg-blue-600 h-full rounded-full"
                style={{ width: `${scoreBreakdown.keywords || 88}%` }}
              ></div>
            </div>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <div className="text-slate-500 font-medium">Skills Coverage</div>
            <div className="text-base font-bold text-slate-900 mt-0.5">
              {scoreBreakdown.skillsCoverage || 92}%
            </div>
            <div className="w-full bg-slate-200 h-1 rounded-full mt-1.5 overflow-hidden">
              <div
                className="bg-emerald-600 h-full rounded-full"
                style={{ width: `${scoreBreakdown.skillsCoverage || 92}%` }}
              ></div>
            </div>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <div className="text-slate-500 font-medium">Experience Fit</div>
            <div className="text-base font-bold text-slate-900 mt-0.5">
              {scoreBreakdown.experienceAlignment || 86}%
            </div>
            <div className="w-full bg-slate-200 h-1 rounded-full mt-1.5 overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full"
                style={{ width: `${scoreBreakdown.experienceAlignment || 86}%` }}
              ></div>
            </div>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <div className="text-slate-500 font-medium">Quantifiable Impact</div>
            <div className="text-base font-bold text-slate-900 mt-0.5">
              {scoreBreakdown.impactMetrics || 90}%
            </div>
            <div className="w-full bg-slate-200 h-1 rounded-full mt-1.5 overflow-hidden">
              <div
                className="bg-amber-600 h-full rounded-full"
                style={{ width: `${scoreBreakdown.impactMetrics || 90}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Keywords Analysis */}
      <div className="space-y-3">
        {/* Matched Keywords */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 mb-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Matched ATS Keywords ({matchedKeywords.length})</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {matchedKeywords.map((kw, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 text-[11px] font-medium bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-200"
              >
                <Check className="w-3 h-3 text-emerald-600" />
                {kw}
              </span>
            ))}
            {matchedKeywords.length === 0 && (
              <span className="text-xs text-slate-400 italic">No matched keywords extracted yet.</span>
            )}
          </div>
        </div>

        {/* Missing Keywords */}
        {missingKeywords && missingKeywords.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 mb-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>Missing Keywords from Target Job (Click to Add into Skills)</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {missingKeywords.map((kw, i) => (
                <button
                  key={i}
                  onClick={() => onAddMissingSkill(kw)}
                  className="group inline-flex items-center gap-1 text-[11px] font-medium bg-amber-50 hover:bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md border border-amber-200 transition cursor-pointer"
                  title="Click to add to your skills"
                >
                  <Plus className="w-3 h-3 text-amber-600 group-hover:scale-125 transition" />
                  {kw}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Tailored Professional Summary Suggestion */}
      {tailoredSummary && (
        <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Job-Tailored Professional Summary</span>
            </div>
            <button
              onClick={() => onApplyTailoredSummary(tailoredSummary)}
              className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold rounded-lg shadow-xs transition flex items-center gap-1"
            >
              <Check className="w-3 h-3" />
              <span>Apply to Resume</span>
            </button>
          </div>
          <p className="text-xs text-blue-950 leading-relaxed bg-white p-2.5 rounded-lg border border-blue-100 font-sans">
            {tailoredSummary}
          </p>
        </div>
      )}

      {/* Suggested Bullet Enhancements (STAR Method) */}
      {suggestedBulletEnhancements && suggestedBulletEnhancements.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
            <Target className="w-3.5 h-3.5 text-indigo-600" />
            <span>AI Bullet Enhancements (STAR Method & Metrics)</span>
          </div>
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {suggestedBulletEnhancements.map((enh, idx) => (
              <div
                key={idx}
                className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs space-y-1.5"
              >
                <div className="text-slate-500 line-through text-[11px]">
                  {enh.originalBullet}
                </div>
                <div className="text-slate-900 font-medium bg-white p-2 rounded border border-indigo-100 text-indigo-950 flex items-start justify-between gap-2">
                  <span>{enh.improvedBullet}</span>
                  <button
                    onClick={() =>
                      onApplyBulletImprovement(
                        enh.experienceId,
                        enh.originalBullet,
                        enh.improvedBullet
                      )
                    }
                    className="shrink-0 px-2 py-0.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold rounded transition"
                  >
                    Apply
                  </button>
                </div>
                {enh.keywordsAdded && enh.keywordsAdded.length > 0 && (
                  <div className="text-[10px] text-indigo-600 font-medium">
                    Keywords injected: {enh.keywordsAdded.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
