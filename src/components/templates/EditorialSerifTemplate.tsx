import React from 'react';
import { ResumeData } from '../../types/resume';

interface TemplateProps {
  data: ResumeData;
  accentColor?: string;
  fontSize?: 'compact' | 'standard' | 'relaxed';
}

export const EditorialSerifTemplate: React.FC<TemplateProps> = ({
  data,
  accentColor = '#881337', // Luxurious Burgundy / Rose default
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
      className={`w-full max-w-[850px] mx-auto bg-white text-stone-900 font-serif p-8 sm:p-12 shadow-sm print:p-0 print:shadow-none print:max-w-none ${fontSizes.body}`}
    >
      {/* Editorial Header */}
      <header className="text-center pb-5 mb-5 border-b-2" style={{ borderColor: accentColor }}>
        <h1
          className={`${fontSizes.h1} font-bold tracking-wide uppercase mb-1.5`}
          style={{ letterSpacing: '0.06em', color: accentColor }}
        >
          {personalInfo.fullName || 'Candidate Name'}
        </h1>
        {personalInfo.headline && (
          <p className="text-stone-700 italic text-[14px] mb-2 font-medium">{personalInfo.headline}</p>
        )}
        <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-[12px] text-stone-600 font-sans">
          <span>{personalInfo.location}</span>
          <span>•</span>
          <span>{personalInfo.phone}</span>
          <span>•</span>
          <a href={`mailto:${personalInfo.email}`} className="font-semibold underline" style={{ color: accentColor }}>
            {personalInfo.email}
          </a>
          {personalInfo.linkedin && (
            <>
              <span>•</span>
              <span className="text-stone-800">{personalInfo.linkedin}</span>
            </>
          )}
          {personalInfo.portfolio && (
            <>
              <span>•</span>
              <span className="text-stone-800">{personalInfo.portfolio}</span>
            </>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-5">
          <div className="p-3.5 rounded-lg border leading-relaxed text-justify text-stone-800" style={{ backgroundColor: `${accentColor}06`, borderColor: `${accentColor}25` }}>
            <span className="font-bold uppercase tracking-wider text-[11px] block mb-1 font-sans" style={{ color: accentColor }}>
              Executive Biography
            </span>
            <p className="italic">{summary}</p>
          </div>
        </section>
      )}

      {/* Work Experience */}
      {experiences && experiences.length > 0 && (
        <section className="mb-5">
          <h2
            className={`${fontSizes.h2} font-bold uppercase tracking-wider border-b pb-1 mb-2.5 font-sans`}
            style={{ color: accentColor, borderColor: `${accentColor}40` }}
          >
            Professional Experience
          </h2>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id} className="avoid-break">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <div>
                    <span className="font-bold text-stone-900 text-[14px]">{exp.role}</span>
                    <span className="font-bold ml-1.5" style={{ color: accentColor }}>— {exp.company}</span>
                  </div>
                  <div className="text-[12px] text-stone-600 font-sans italic">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate} | {exp.location}
                  </div>
                </div>
                {exp.description && (
                  <p className="text-stone-600 italic text-[12px] my-0.5">{exp.description}</p>
                )}
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc ml-5 space-y-1 text-stone-800 mt-1">
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

      {/* Core Skills & Expertise */}
      {skills && skills.length > 0 && (
        <section className="mb-5">
          <h2
            className={`${fontSizes.h2} font-bold uppercase tracking-wider border-b pb-1 mb-2 font-sans`}
            style={{ color: accentColor, borderColor: `${accentColor}40` }}
          >
            Areas of Expertise
          </h2>
          <div className="space-y-1.5 text-[12.5px] font-sans">
            {skills.map((s, i) => (
              <div key={i} className="flex flex-col sm:flex-row">
                <span className="font-bold min-w-[200px]" style={{ color: accentColor }}>
                  {s.category}:
                </span>
                <span className="text-stone-800 flex-1">{s.items.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-5">
          <h2
            className={`${fontSizes.h2} font-bold uppercase tracking-wider border-b pb-1 mb-2.5 font-sans`}
            style={{ color: accentColor, borderColor: `${accentColor}40` }}
          >
            Research & Frameworks
          </h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id} className="avoid-break">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <div>
                    <span className="font-bold text-stone-900">{proj.title}</span>
                    {proj.subtitle && <span className="text-stone-600 text-[12px]"> ({proj.subtitle})</span>}
                  </div>
                  {proj.startDate && (
                    <span className="text-[12px] text-stone-500 font-sans italic">
                      {proj.startDate} {proj.endDate ? `– ${proj.endDate}` : ''}
                    </span>
                  )}
                </div>
                {proj.description && <p className="text-stone-700 text-[12px] mt-0.5">{proj.description}</p>}
                {proj.bullets && proj.bullets.length > 0 && (
                  <ul className="list-disc ml-5 space-y-0.5 text-stone-700 mt-1 text-[12px]">
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
            className={`${fontSizes.h2} font-bold uppercase tracking-wider border-b pb-1 mb-2 font-sans`}
            style={{ color: accentColor, borderColor: `${accentColor}40` }}
          >
            Education
          </h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="avoid-break flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                <div>
                  <span className="font-bold text-stone-900">{edu.school}</span>
                  <span className="text-stone-700 text-[13px]"> — {edu.degree} in {edu.fieldOfStudy}</span>
                  {edu.gpa && <span className="text-[12px] text-stone-600 font-sans ml-1">({edu.gpa})</span>}
                </div>
                <div className="text-[12px] text-stone-500 font-sans italic">
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
            className={`${fontSizes.h2} font-bold uppercase tracking-wider border-b pb-1 mb-2 font-sans`}
            style={{ color: accentColor, borderColor: `${accentColor}40` }}
          >
            Certifications & Affiliations
          </h2>
          <div className="space-y-1 text-[12px] font-sans">
            {certifications.map((c) => (
              <div key={c.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-semibold text-stone-900">{c.name}</span>
                  <span className="text-stone-600"> — {c.issuer}</span>
                </div>
                <span className="text-stone-500 font-mono text-[11px]">{c.issueDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
