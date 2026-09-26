import React from 'react';
import { ResumeData } from '../../types/resume';

interface TemplateProps {
  data: ResumeData;
  accentColor?: string;
  fontSize?: 'compact' | 'standard' | 'relaxed';
}

export const NordicCompactTemplate: React.FC<TemplateProps> = ({
  data,
  accentColor = '#059669',
  fontSize = 'standard',
}) => {
  const { personalInfo, summary, experiences, education, skills, projects, certifications } = data;

  const fontSizes = {
    compact: { body: 'text-[11.5px] leading-snug', h1: 'text-xl', h2: 'text-[12px]' },
    standard: { body: 'text-[12.5px] leading-normal', h1: 'text-2xl', h2: 'text-[13px]' },
    relaxed: { body: 'text-[13.5px] leading-relaxed', h1: 'text-[26px]', h2: 'text-[14px]' },
  }[fontSize];

  return (
    <div
      className={`w-full max-w-[850px] mx-auto bg-white text-stone-800 font-sans p-8 sm:p-10 shadow-sm print:p-0 print:shadow-none print:max-w-none ${fontSizes.body}`}
    >
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-baseline border-b-2 pb-3 mb-4" style={{ borderColor: accentColor }}>
        <div>
          <h1 className={`${fontSizes.h1} font-extrabold text-stone-900 tracking-tight`} style={{ color: accentColor }}>
            {personalInfo.fullName || 'Candidate Name'}
          </h1>
          <p className="font-semibold text-[13px] text-stone-700">{personalInfo.headline}</p>
        </div>
        <div className="text-left sm:text-right text-[11px] text-stone-600 mt-1 sm:mt-0 font-medium">
          <div>{personalInfo.location} • {personalInfo.phone}</div>
          <div className="font-mono">
            <a href={`mailto:${personalInfo.email}`} className="font-bold underline" style={{ color: accentColor }}>
              {personalInfo.email}
            </a>
            {personalInfo.linkedin && <span> • {personalInfo.linkedin}</span>}
          </div>
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-3.5 p-2.5 rounded-lg border leading-normal text-justify text-stone-700" style={{ backgroundColor: `${accentColor}08`, borderColor: `${accentColor}25` }}>
          {summary}
        </section>
      )}

      {/* Skills Bar */}
      {skills && skills.length > 0 && (
        <section className="mb-4 p-3 rounded-lg border" style={{ backgroundColor: `${accentColor}06`, borderColor: `${accentColor}20` }}>
          <h2 className={`${fontSizes.h2} font-bold uppercase tracking-wider mb-1.5`} style={{ color: accentColor }}>
            Core Skills & Methodologies
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
            {skills.map((grp, i) => (
              <div key={i} className="flex">
                <span className="font-bold text-stone-900 min-w-[130px]" style={{ color: accentColor }}>{grp.category}:</span>
                <span className="text-stone-700">{grp.items.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Work Experience */}
      {experiences && experiences.length > 0 && (
        <section className="mb-4">
          <h2 className={`${fontSizes.h2} font-bold uppercase tracking-wider border-b pb-1 mb-2`} style={{ color: accentColor, borderColor: `${accentColor}40` }}>
            Work Experience
          </h2>
          <div className="space-y-3">
            {experiences.map((exp) => (
              <div key={exp.id} className="avoid-break pl-2.5 border-l-2" style={{ borderColor: `${accentColor}30` }}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <div>
                    <span className="font-bold text-stone-900">{exp.role}</span>
                    <span className="font-bold ml-1" style={{ color: accentColor }}>· {exp.company}</span>
                  </div>
                  <span className="text-[11px] text-stone-600 font-medium">
                    {exp.location} | {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-stone-600 italic text-[11.5px] mt-0.5">{exp.description}</p>
                )}
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc ml-4 space-y-0.5 text-stone-700 mt-1">
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

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-4">
          <h2 className={`${fontSizes.h2} font-bold uppercase tracking-wider border-b pb-1 mb-2`} style={{ color: accentColor, borderColor: `${accentColor}40` }}>
            Key Projects & Analysis Pipelines
          </h2>
          <div className="space-y-2">
            {projects.map((proj) => (
              <div key={proj.id} className="avoid-break p-2.5 rounded-lg border bg-stone-50/60" style={{ borderColor: `${accentColor}20` }}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-stone-900">
                    {proj.title} {proj.subtitle && <span className="font-normal text-stone-600 text-[11px]">({proj.subtitle})</span>}
                  </span>
                  {proj.startDate && (
                    <span className="text-[10.5px] text-stone-500 font-mono">
                      {proj.startDate} {proj.endDate ? `– ${proj.endDate}` : ''}
                    </span>
                  )}
                </div>
                {proj.description && <p className="text-stone-700 text-[11.5px] mt-0.5">{proj.description}</p>}
                {proj.bullets && proj.bullets.length > 0 && (
                  <ul className="list-disc ml-4 space-y-0.5 text-stone-700 mt-1 text-[11px]">
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
        <section className="mb-3">
          <h2 className={`${fontSizes.h2} font-bold uppercase tracking-wider border-b pb-1 mb-1.5`} style={{ color: accentColor, borderColor: `${accentColor}40` }}>
            Education
          </h2>
          <div className="space-y-1.5">
            {education.map((edu) => (
              <div key={edu.id} className="avoid-break flex justify-between items-baseline text-[12px]">
                <div>
                  <span className="font-bold text-stone-900">{edu.school}</span>
                  <span className="text-stone-700"> — {edu.degree} in {edu.fieldOfStudy}</span>
                  {edu.gpa && <span className="text-stone-600 text-[11px] ml-1">({edu.gpa})</span>}
                </div>
                <span className="text-stone-500 font-mono text-[11px]">{edu.startDate} – {edu.endDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <section className="mb-1">
          <h2 className={`${fontSizes.h2} font-bold uppercase tracking-wider border-b pb-1 mb-1.5`} style={{ color: accentColor, borderColor: `${accentColor}40` }}>
            Certifications
          </h2>
          <div className="space-y-1 text-[11.5px]">
            {certifications.map((c) => (
              <div key={c.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-semibold text-stone-900">{c.name}</span>
                  <span className="text-stone-600"> — {c.issuer}</span>
                </div>
                <span className="text-stone-500 font-mono text-[10.5px]">{c.issueDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
