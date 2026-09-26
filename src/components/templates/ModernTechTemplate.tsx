import React from 'react';
import { ResumeData } from '../../types/resume';

interface TemplateProps {
  data: ResumeData;
  accentColor?: string;
  fontSize?: 'compact' | 'standard' | 'relaxed';
}

export const ModernTechTemplate: React.FC<TemplateProps> = ({
  data,
  accentColor = '#2563eb',
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
      className={`w-full max-w-[850px] mx-auto bg-white text-slate-800 font-sans p-8 sm:p-12 shadow-sm print:p-0 print:shadow-none print:max-w-none ${fontSizes.body}`}
    >
      {/* Top Header */}
      <header className="border-b-2 pb-4 mb-5" style={{ borderColor: accentColor }}>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3">
          <div>
            <div className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold mb-1.5 uppercase tracking-wider" style={{ backgroundColor: `${accentColor}15`, color: accentColor }}>
              Verified Profile
            </div>
            <h1 className={`${fontSizes.h1} font-extrabold tracking-tight mb-1`} style={{ color: accentColor }}>
              {personalInfo.fullName || 'Candidate Name'}
            </h1>
            <p className="text-slate-800 font-semibold text-[15px]">{personalInfo.headline}</p>
          </div>
          <div className="text-left sm:text-right text-[12px] text-slate-600 space-y-0.5">
            <div className="font-medium text-slate-800">{personalInfo.location}</div>
            <div>{personalInfo.phone} • {personalInfo.email}</div>
            <div className="font-mono text-[11px] space-x-2" style={{ color: accentColor }}>
              {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
              {personalInfo.github && <span>• {personalInfo.github}</span>}
            </div>
          </div>
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <h2 className={`${fontSizes.h2} font-bold uppercase tracking-wider text-slate-900 border-l-4 pl-2`} style={{ borderColor: accentColor }}>
              Professional Overview
            </h2>
            <div className="flex-1 h-[1px] bg-slate-200"></div>
          </div>
          <p className="text-slate-700 leading-normal p-3 rounded-lg border" style={{ backgroundColor: `${accentColor}06`, borderColor: `${accentColor}20` }}>
            {summary}
          </p>
        </section>
      )}

      {/* Skills Showcase */}
      {skills && skills.length > 0 && (
        <section className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <h2 className={`${fontSizes.h2} font-bold uppercase tracking-wider text-slate-900 border-l-4 pl-2`} style={{ borderColor: accentColor }}>
              Core Technical Competencies
            </h2>
            <div className="flex-1 h-[1px] bg-slate-200"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {skills.map((grp, idx) => (
              <div key={idx} className="p-3 rounded-lg border bg-white shadow-2xs" style={{ borderColor: `${accentColor}25` }}>
                <span className="text-[12px] font-bold block mb-1.5" style={{ color: accentColor }}>
                  {grp.category}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {grp.items.map((item, i) => (
                    <span
                      key={i}
                      className="inline-block text-[11px] font-medium px-2 py-0.5 rounded border"
                      style={{ backgroundColor: `${accentColor}0D`, borderColor: `${accentColor}25`, color: '#1e293b' }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Work Experience */}
      {experiences && experiences.length > 0 && (
        <section className="mb-5">
          <div className="flex items-center gap-2 mb-2.5">
            <h2 className={`${fontSizes.h2} font-bold uppercase tracking-wider text-slate-900 border-l-4 pl-2`} style={{ borderColor: accentColor }}>
              Experience & Achievements
            </h2>
            <div className="flex-1 h-[1px] bg-slate-200"></div>
          </div>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id} className="avoid-break pl-3 border-l-2" style={{ borderColor: `${accentColor}40` }}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <div>
                    <span className="font-bold text-slate-900 text-[14px]">{exp.role}</span>
                    <span className="font-bold ml-1.5" style={{ color: accentColor }}>@ {exp.company}</span>
                  </div>
                  <div className="text-[12px] font-medium text-slate-500">
                    <span>{exp.location}</span>
                    <span className="mx-1.5">•</span>
                    <span className="font-semibold text-slate-700">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                </div>
                {exp.description && (
                  <p className="text-slate-600 text-[12px] mt-0.5 mb-1">{exp.description}</p>
                )}
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc ml-4 space-y-1 text-slate-700 mt-1.5">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx} className="leading-snug text-justify">{bullet}</li>
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
        <section className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <h2 className={`${fontSizes.h2} font-bold uppercase tracking-wider text-slate-900 border-l-4 pl-2`} style={{ borderColor: accentColor }}>
              Key Projects & Frameworks
            </h2>
            <div className="flex-1 h-[1px] bg-slate-200"></div>
          </div>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id} className="avoid-break p-3 rounded-lg border" style={{ borderColor: `${accentColor}20`, backgroundColor: `${accentColor}04` }}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <div>
                    <span className="font-bold text-slate-900">{proj.title}</span>
                    {proj.subtitle && <span className="text-slate-600 text-[12px] ml-1">({proj.subtitle})</span>}
                  </div>
                  {proj.startDate && (
                    <span className="text-[11px] font-medium text-slate-500">
                      {proj.startDate} {proj.endDate ? `– ${proj.endDate}` : ''}
                    </span>
                  )}
                </div>
                {proj.link && (
                  <div className="text-[11px] font-mono mt-0.5" style={{ color: accentColor }}>
                    {proj.link}
                  </div>
                )}
                {proj.description && <p className="text-slate-700 text-[12px] mt-1">{proj.description}</p>}
                {proj.bullets && proj.bullets.length > 0 && (
                  <ul className="list-disc ml-4 space-y-0.5 text-slate-700 mt-1 text-[12px]">
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
          <div className="flex items-center gap-2 mb-2">
            <h2 className={`${fontSizes.h2} font-bold uppercase tracking-wider text-slate-900 border-l-4 pl-2`} style={{ borderColor: accentColor }}>
              Education
            </h2>
            <div className="flex-1 h-[1px] bg-slate-200"></div>
          </div>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="avoid-break flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                <div>
                  <span className="font-bold text-slate-900">{edu.school}</span>
                  <span className="text-slate-700 text-[13px]"> — {edu.degree} in {edu.fieldOfStudy}</span>
                  {edu.gpa && <span className="text-[12px] text-slate-600 ml-2">({edu.gpa})</span>}
                </div>
                <div className="text-[12px] text-slate-500 font-medium">
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
          <div className="flex items-center gap-2 mb-2">
            <h2 className={`${fontSizes.h2} font-bold uppercase tracking-wider text-slate-900 border-l-4 pl-2`} style={{ borderColor: accentColor }}>
              Certifications & Credentials
            </h2>
            <div className="flex-1 h-[1px] bg-slate-200"></div>
          </div>
          <div className="space-y-1.5 text-[12px]">
            {certifications.map((c) => (
              <div key={c.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-semibold text-slate-900">{c.name}</span>
                  <span className="text-slate-600"> — {c.issuer}</span>
                </div>
                <span className="text-slate-500 font-mono text-[11px]">{c.issueDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
