import React from 'react';
import { ResumeData } from '../../types/resume';

interface TemplateProps {
  data: ResumeData;
  accentColor?: string;
  fontSize?: 'compact' | 'standard' | 'relaxed';
}

export const CorporateNavyTemplate: React.FC<TemplateProps> = ({
  data,
  accentColor = '#1e3a8a',
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
      className={`w-full max-w-[850px] mx-auto bg-white text-gray-800 font-sans p-8 sm:p-12 shadow-sm print:p-0 print:shadow-none print:max-w-none ${fontSizes.body}`}
    >
      {/* Header */}
      <header className="border-b-2 pb-4 mb-5" style={{ borderColor: accentColor }}>
        <h1 className={`${fontSizes.h1} font-black tracking-tight uppercase`} style={{ color: accentColor }}>
          {personalInfo.fullName || 'Candidate Name'}
        </h1>
        {personalInfo.headline && (
          <p className="font-bold text-[15px] mt-0.5 mb-2 text-slate-800">
            {personalInfo.headline}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[12px] text-gray-600 font-medium">
          <span>{personalInfo.location}</span>
          <span>|</span>
          <span>{personalInfo.phone}</span>
          <span>|</span>
          <a href={`mailto:${personalInfo.email}`} className="font-bold underline" style={{ color: accentColor }}>
            {personalInfo.email}
          </a>
          {personalInfo.linkedin && (
            <>
              <span>|</span>
              <span className="text-gray-800">{personalInfo.linkedin}</span>
            </>
          )}
          {personalInfo.portfolio && (
            <>
              <span>|</span>
              <span className="text-gray-800">{personalInfo.portfolio}</span>
            </>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-5">
          <h2
            className={`${fontSizes.h2} font-bold uppercase tracking-wider pb-1 mb-2 border-b-2`}
            style={{ color: accentColor, borderColor: accentColor }}
          >
            Professional Profile
          </h2>
          <p className="text-gray-700 leading-normal text-justify">{summary}</p>
        </section>
      )}

      {/* Professional Experience */}
      {experiences && experiences.length > 0 && (
        <section className="mb-5">
          <h2
            className={`${fontSizes.h2} font-bold uppercase tracking-wider pb-1 mb-2.5 border-b-2`}
            style={{ color: accentColor, borderColor: accentColor }}
          >
            Professional Experience
          </h2>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id} className="avoid-break">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <div>
                    <span className="font-bold text-gray-900 text-[14px]">{exp.role}</span>
                    <span className="font-bold ml-1" style={{ color: accentColor }}> – {exp.company}</span>
                  </div>
                  <div className="text-[12px] text-gray-600 font-medium">
                    <span>{exp.location}</span>
                    <span className="mx-1">•</span>
                    <span className="font-bold text-gray-800">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                </div>
                {exp.description && (
                  <p className="text-gray-600 italic text-[12px] my-0.5">{exp.description}</p>
                )}
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc ml-5 space-y-1 text-gray-700 mt-1">
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

      {/* Key Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-5">
          <h2
            className={`${fontSizes.h2} font-bold uppercase tracking-wider pb-1 mb-2 border-b-2`}
            style={{ color: accentColor, borderColor: accentColor }}
          >
            Key Competencies & Tools
          </h2>
          <div className="space-y-1.5 text-[12.5px]">
            {skills.map((s, i) => (
              <div key={i} className="flex flex-col sm:flex-row">
                <span className="font-bold min-w-[200px]" style={{ color: accentColor }}>
                  {s.category}:
                </span>
                <span className="text-gray-700 flex-1">{s.items.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-5">
          <h2
            className={`${fontSizes.h2} font-bold uppercase tracking-wider pb-1 mb-2.5 border-b-2`}
            style={{ color: accentColor, borderColor: accentColor }}
          >
            Strategic Projects & Initiatives
          </h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id} className="avoid-break">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <div>
                    <span className="font-bold text-gray-900">{proj.title}</span>
                    {proj.subtitle && <span className="text-gray-600 text-[12px]"> | {proj.subtitle}</span>}
                  </div>
                  {proj.startDate && (
                    <span className="text-[12px] text-gray-600">
                      {proj.startDate} {proj.endDate ? `– ${proj.endDate}` : ''}
                    </span>
                  )}
                </div>
                {proj.description && <p className="text-gray-700 text-[12px] mt-0.5">{proj.description}</p>}
                {proj.bullets && proj.bullets.length > 0 && (
                  <ul className="list-disc ml-5 space-y-0.5 text-gray-700 mt-1 text-[12px]">
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
            className={`${fontSizes.h2} font-bold uppercase tracking-wider pb-1 mb-2 border-b-2`}
            style={{ color: accentColor, borderColor: accentColor }}
          >
            Education
          </h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="avoid-break flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                <div>
                  <span className="font-bold text-gray-900">{edu.school}</span>
                  <span className="text-gray-700 text-[13px]"> — {edu.degree} in {edu.fieldOfStudy}</span>
                  {edu.gpa && <span className="text-[12px] text-gray-600 ml-1">({edu.gpa})</span>}
                </div>
                <div className="text-[12px] text-gray-600">
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
            className={`${fontSizes.h2} font-bold uppercase tracking-wider pb-1 mb-2 border-b-2`}
            style={{ color: accentColor, borderColor: accentColor }}
          >
            Certifications & Licenses
          </h2>
          <div className="space-y-1 text-[12px]">
            {certifications.map((c) => (
              <div key={c.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-semibold text-gray-900">{c.name}</span>
                  <span className="text-gray-600"> — {c.issuer}</span>
                </div>
                <span className="text-gray-500 font-mono text-[11px]">{c.issueDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
