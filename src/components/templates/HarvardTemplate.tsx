import React from 'react';
import { ResumeData } from '../../types/resume';

interface TemplateProps {
  data: ResumeData;
  accentColor?: string;
  fontSize?: 'compact' | 'standard' | 'relaxed';
}

export const HarvardTemplate: React.FC<TemplateProps> = ({
  data,
  accentColor = '#800000', // Classic Harvard Crimson default
  fontSize = 'standard',
}) => {
  const { personalInfo, summary, experiences, education, skills, projects, certifications } = data;

  const fontSizes = {
    compact: { body: 'text-[12px] leading-relaxed', h1: 'text-2xl', h2: 'text-[13px]', sub: 'text-[11px]' },
    standard: { body: 'text-[13px] leading-relaxed', h1: 'text-[26px]', h2: 'text-[14px]', sub: 'text-[12px]' },
    relaxed: { body: 'text-[14px] leading-relaxed', h1: 'text-[28px]', h2: 'text-[15px]', sub: 'text-[13px]' }
  }[fontSize];

  return (
    <div className={`w-full max-w-[850px] mx-auto bg-white text-gray-900 font-serif p-8 sm:p-12 shadow-sm print:p-0 print:shadow-none print:max-w-none ${fontSizes.body}`}>
      {/* Header */}
      <header className="text-center border-b-2 pb-4 mb-5" style={{ borderColor: accentColor }}>
        <h1 className={`${fontSizes.h1} font-bold tracking-wide uppercase mb-1.5`} style={{ color: accentColor }}>
          {personalInfo.fullName || 'Candidate Name'}
        </h1>
        {personalInfo.headline && (
          <p className="text-gray-700 italic text-[14px] mb-2 font-sans font-medium">{personalInfo.headline}</p>
        )}
        <div className="flex flex-wrap justify-center items-center gap-x-2.5 gap-y-1 text-gray-700 text-[12px] font-sans">
          {personalInfo.location && <span className="font-medium text-slate-800">{personalInfo.location}</span>}
          {personalInfo.phone && <><span>•</span><span>{personalInfo.phone}</span></>}
          {personalInfo.email && (
            <>
              <span>•</span>
              <a href={`mailto:${personalInfo.email}`} className="font-semibold underline" style={{ color: accentColor }}>
                {personalInfo.email}
              </a>
            </>
          )}
          {personalInfo.linkedin && (
            <>
              <span>•</span>
              <span className="text-gray-800 font-medium">{personalInfo.linkedin}</span>
            </>
          )}
          {personalInfo.portfolio && (
            <>
              <span>•</span>
              <span className="text-gray-800 font-medium">{personalInfo.portfolio}</span>
            </>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {summary && (
        <section className="mb-5">
          <h2
            className={`${fontSizes.h2} font-bold uppercase tracking-wider border-b pb-0.5 mb-2`}
            style={{ color: accentColor, borderColor: `${accentColor}50` }}
          >
            Professional Summary
          </h2>
          <p className="text-justify text-gray-800 leading-normal">{summary}</p>
        </section>
      )}

      {/* Work Experience */}
      {experiences && experiences.length > 0 && (
        <section className="mb-5">
          <h2
            className={`${fontSizes.h2} font-bold uppercase tracking-wider border-b pb-0.5 mb-2.5`}
            style={{ color: accentColor, borderColor: `${accentColor}50` }}
          >
            Professional Experience
          </h2>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id} className="avoid-break">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <div>
                    <span className="font-bold text-gray-900">{exp.role}</span>
                    <span className="text-gray-600 font-sans text-[13px]"> — <strong style={{ color: accentColor }}>{exp.company}</strong></span>
                  </div>
                  <div className="text-[12px] text-gray-600 font-sans italic">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate} | {exp.location}
                  </div>
                </div>
                {exp.description && (
                  <p className="text-gray-700 italic text-[12.5px] mt-0.5 mb-1.5">{exp.description}</p>
                )}
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc ml-5 space-y-1 mt-1 text-gray-800">
                    {exp.bullets.map((b, idx) => (
                      <li key={idx} className="pl-1 leading-normal text-justify">
                        {b}
                      </li>
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
            className={`${fontSizes.h2} font-bold uppercase tracking-wider border-b pb-0.5 mb-2.5`}
            style={{ color: accentColor, borderColor: `${accentColor}50` }}
          >
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="avoid-break">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <div>
                    <span className="font-bold text-gray-900">{edu.school}</span>
                    <span className="text-gray-700 text-[13px]"> — {edu.degree} in {edu.fieldOfStudy}</span>
                  </div>
                  <div className="text-[12px] text-gray-600 font-sans italic">
                    {edu.startDate} – {edu.endDate} | {edu.location}
                  </div>
                </div>
                {edu.gpa && (
                  <div className="text-[12px] font-sans text-gray-700">Honors / GPA: <span className="font-semibold">{edu.gpa}</span></div>
                )}
                {edu.highlights && edu.highlights.length > 0 && (
                  <ul className="list-disc ml-5 space-y-0.5 mt-1 text-gray-800 text-[12px]">
                    {edu.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
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
            className={`${fontSizes.h2} font-bold uppercase tracking-wider border-b pb-0.5 mb-2`}
            style={{ color: accentColor, borderColor: `${accentColor}50` }}
          >
            Skills & Competencies
          </h2>
          <div className="space-y-1.5 text-gray-800 text-[12.5px] font-sans">
            {skills.map((s, i) => (
              <div key={i} className="flex flex-col sm:flex-row">
                <span className="font-bold min-w-[200px]" style={{ color: accentColor }}>
                  {s.category}:
                </span>
                <span className="text-gray-800 flex-1">{s.items.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-5">
          <h2
            className={`${fontSizes.h2} font-bold uppercase tracking-wider border-b pb-0.5 mb-2.5`}
            style={{ color: accentColor, borderColor: `${accentColor}50` }}
          >
            Projects & Research
          </h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id} className="avoid-break">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <div>
                    <span className="font-bold text-gray-900">{proj.title}</span>
                    {proj.subtitle && <span className="text-gray-600 text-[12.5px]"> | {proj.subtitle}</span>}
                  </div>
                  {proj.startDate && (
                    <div className="text-[12px] text-gray-600 font-sans italic">
                      {proj.startDate} {proj.endDate ? `– ${proj.endDate}` : ''}
                    </div>
                  )}
                </div>
                {proj.link && (
                  <div className="text-[11px] font-mono text-gray-500">{proj.link}</div>
                )}
                {proj.description && (
                  <p className="text-gray-700 text-[12.5px] mt-0.5">{proj.description}</p>
                )}
                {proj.bullets && proj.bullets.length > 0 && (
                  <ul className="list-disc ml-5 space-y-1 mt-1 text-gray-800">
                    {proj.bullets.map((b, i) => (
                      <li key={i} className="pl-1 leading-normal">{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <section className="mb-2">
          <h2
            className={`${fontSizes.h2} font-bold uppercase tracking-wider border-b pb-0.5 mb-2`}
            style={{ color: accentColor, borderColor: `${accentColor}50` }}
          >
            Certifications & Licenses
          </h2>
          <div className="space-y-1.5 font-sans text-[12.5px]">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline text-gray-800">
                <div>
                  <span className="font-bold text-gray-900">{cert.name}</span>
                  <span className="text-gray-700"> – {cert.issuer}</span>
                </div>
                <span className="text-gray-600 text-[12px]">
                  {cert.issueDate}{cert.expiryDate ? ` (Exp: ${cert.expiryDate})` : ''}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
