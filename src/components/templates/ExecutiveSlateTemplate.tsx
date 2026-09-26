import React from 'react';
import { ResumeData } from '../../types/resume';

interface TemplateProps {
  data: ResumeData;
  accentColor?: string;
  fontSize?: 'compact' | 'standard' | 'relaxed';
}

export const ExecutiveSlateTemplate: React.FC<TemplateProps> = ({
  data,
  accentColor = '#0f172a',
  fontSize = 'standard',
}) => {
  const { personalInfo, summary, experiences, education, skills, projects, certifications } = data;

  const fontSizes = {
    compact: { body: 'text-[12px] leading-relaxed', h1: 'text-2xl', h2: 'text-[13px]' },
    standard: { body: 'text-[13px] leading-relaxed', h1: 'text-[26px]', h2: 'text-[14px]' },
    relaxed: { body: 'text-[14px] leading-relaxed', h1: 'text-[28px]', h2: 'text-[15px]' },
  }[fontSize];

  return (
    <div
      className={`w-full max-w-[850px] mx-auto bg-white text-zinc-900 font-sans p-8 sm:p-12 shadow-sm print:p-0 print:shadow-none print:max-w-none ${fontSizes.body}`}
    >
      {/* Executive Header */}
      <header className="border-b-4 pb-4 mb-5" style={{ borderColor: accentColor }}>
        <div className="flex flex-col sm:flex-row justify-between sm:items-baseline gap-2">
          <div>
            <h1 className={`${fontSizes.h1} font-black tracking-tight uppercase`} style={{ color: accentColor }}>
              {personalInfo.fullName || 'Candidate Name'}
            </h1>
            {personalInfo.headline && (
              <p className="text-zinc-800 font-bold tracking-wide uppercase text-[13px] mt-1 mb-2">
                {personalInfo.headline}
              </p>
            )}
          </div>
          <div className="text-left sm:text-right text-[11px] font-semibold text-zinc-600">
            <span className="inline-block px-2.5 py-0.5 rounded uppercase font-bold" style={{ backgroundColor: `${accentColor}12`, color: accentColor }}>
              Executive Profile
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-zinc-600 border-t border-zinc-200 pt-2.5">
          {personalInfo.location && <span className="font-medium text-zinc-800">{personalInfo.location}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.email && (
            <span>
              • <a href={`mailto:${personalInfo.email}`} className="font-semibold underline" style={{ color: accentColor }}>
                {personalInfo.email}
              </a>
            </span>
          )}
          {personalInfo.linkedin && <span className="font-medium">• {personalInfo.linkedin}</span>}
          {personalInfo.portfolio && <span>• {personalInfo.portfolio}</span>}
        </div>
      </header>

      {/* Executive Summary */}
      {summary && (
        <section className="mb-5">
          <h2
            className={`${fontSizes.h2} font-extrabold uppercase tracking-widest border-l-4 pl-2.5 mb-2`}
            style={{ borderColor: accentColor, color: accentColor }}
          >
            Executive Summary
          </h2>
          <div className="p-3.5 rounded-lg border leading-relaxed text-justify text-zinc-700" style={{ backgroundColor: `${accentColor}06`, borderColor: `${accentColor}20` }}>
            {summary}
          </div>
        </section>
      )}

      {/* Core Leadership & Technical Competencies */}
      {skills && skills.length > 0 && (
        <section className="mb-5">
          <h2
            className={`${fontSizes.h2} font-extrabold uppercase tracking-widest border-l-4 pl-2.5 mb-2.5`}
            style={{ borderColor: accentColor, color: accentColor }}
          >
            Core Competencies & Domain Expertise
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px]">
            {skills.map((grp, idx) => (
              <div key={idx} className="p-2.5 rounded-lg border bg-zinc-50/70" style={{ borderColor: `${accentColor}20` }}>
                <span className="font-bold block mb-1" style={{ color: accentColor }}>
                  {grp.category}
                </span>
                <span className="text-zinc-700 leading-normal">{grp.items.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Professional Experience */}
      {experiences && experiences.length > 0 && (
        <section className="mb-5">
          <h2
            className={`${fontSizes.h2} font-extrabold uppercase tracking-widest border-l-4 pl-2.5 mb-3`}
            style={{ borderColor: accentColor, color: accentColor }}
          >
            Professional Experience & Track Record
          </h2>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id} className="avoid-break pl-3 border-l-2" style={{ borderColor: `${accentColor}30` }}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <div>
                    <span className="font-black text-zinc-950 text-[14px]">{exp.role}</span>
                    <span className="font-bold ml-1.5" style={{ color: accentColor }}>| {exp.company}</span>
                  </div>
                  <div className="text-[12px] text-zinc-600 font-medium">
                    <span>{exp.location}</span>
                    <span className="mx-1.5">•</span>
                    <span className="font-semibold text-zinc-800">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                </div>
                {exp.description && (
                  <p className="text-zinc-600 italic text-[12px] my-1">{exp.description}</p>
                )}
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc ml-4 space-y-1 text-zinc-800 mt-1">
                    {exp.bullets.map((b, i) => (
                      <li key={i} className="leading-snug text-justify">{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects & Strategic Initiatives */}
      {projects && projects.length > 0 && (
        <section className="mb-5">
          <h2
            className={`${fontSizes.h2} font-extrabold uppercase tracking-widest border-l-4 pl-2.5 mb-2.5`}
            style={{ borderColor: accentColor, color: accentColor }}
          >
            Strategic Projects & Research
          </h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id} className="avoid-break p-3 rounded-lg border bg-zinc-50/50" style={{ borderColor: `${accentColor}20` }}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <div className="font-bold text-zinc-950">
                    {proj.title} {proj.subtitle && <span className="font-normal text-zinc-600 text-[12px]">({proj.subtitle})</span>}
                  </div>
                  {proj.startDate && (
                    <span className="text-[11px] text-zinc-500 font-medium">
                      {proj.startDate} {proj.endDate ? `– ${proj.endDate}` : ''}
                    </span>
                  )}
                </div>
                {proj.description && <p className="text-zinc-700 text-[12px] mt-1">{proj.description}</p>}
                {proj.bullets && proj.bullets.length > 0 && (
                  <ul className="list-disc ml-4 space-y-0.5 text-zinc-700 text-[12px] mt-1">
                    {proj.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-5">
          <h2
            className={`${fontSizes.h2} font-extrabold uppercase tracking-widest border-l-4 pl-2.5 mb-2.5`}
            style={{ borderColor: accentColor, color: accentColor }}
          >
            Education & Academic Honors
          </h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="avoid-break flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                <div>
                  <span className="font-bold text-zinc-950">{edu.school}</span>
                  <span className="text-zinc-800 text-[13px]"> — {edu.degree} in {edu.fieldOfStudy}</span>
                  {edu.gpa && <span className="text-[12px] text-zinc-600 font-semibold ml-1">({edu.gpa})</span>}
                </div>
                <div className="text-[12px] text-zinc-600 font-medium">
                  {edu.startDate} – {edu.endDate} | {edu.location}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <section className="mb-2">
          <h2
            className={`${fontSizes.h2} font-extrabold uppercase tracking-widest border-l-4 pl-2.5 mb-2`}
            style={{ borderColor: accentColor, color: accentColor }}
          >
            Certifications & Governance
          </h2>
          <div className="space-y-1 text-[12px]">
            {certifications.map((c) => (
              <div key={c.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-zinc-900">{c.name}</span>
                  <span className="text-zinc-700"> — {c.issuer}</span>
                </div>
                <span className="text-zinc-500 font-mono text-[11px]">{c.issueDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
