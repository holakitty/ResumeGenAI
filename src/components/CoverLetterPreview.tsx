import React from 'react';
import { CoverLetterData } from '../types/resume';

interface CoverLetterPreviewProps {
  data: CoverLetterData;
  fontFamily?: 'serif' | 'sans';
  accentColor?: string;
}

export const CoverLetterPreview: React.FC<CoverLetterPreviewProps> = ({
  data,
  fontFamily = 'serif',
  accentColor = '#1e3a8a',
}) => {
  const isSerif = fontFamily === 'serif';

  return (
    <div
      className={`w-full max-w-[850px] mx-auto bg-white text-stone-900 ${
        isSerif ? 'font-serif' : 'font-sans'
      } p-8 sm:p-14 shadow-sm print:p-0 print:shadow-none print:max-w-none text-[13.5px] leading-relaxed`}
    >
      {/* Sender Header */}
      <div className="border-b-2 pb-4 mb-6" style={{ borderColor: accentColor }}>
        <h1 className="text-2xl font-bold tracking-tight uppercase mb-1" style={{ color: accentColor }}>
          {data.candidateName || 'Candidate Name'}
        </h1>
        <p className="text-stone-700 font-sans font-semibold text-[13px]">{data.candidateTitle}</p>
        <p className="text-stone-500 font-sans text-[12px] mt-0.5">{data.candidateContact}</p>
      </div>

      {/* Date */}
      <div className="mb-6 font-sans text-[12.5px] text-stone-600">
        {data.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </div>

      {/* Recipient */}
      <div className="mb-6 font-sans text-[13px] text-stone-800 space-y-0.5">
        <div className="font-semibold text-stone-950">{data.recipientName || 'Hiring Team / Hiring Manager'}</div>
        {data.recipientTitle && <div>{data.recipientTitle}</div>}
        <div className="font-medium text-stone-900">{data.companyName || 'Target Company'}</div>
        {data.companyAddress && <div className="text-stone-600">{data.companyAddress}</div>}
      </div>

      {/* Salutation */}
      <div className="mb-3 font-semibold text-stone-950">
        {data.salutation || `Dear Hiring Team at ${data.companyName || 'the organization'},`}
      </div>

      {/* Subject Line */}
      {data.subject && (
        <div className="mb-5 font-sans font-bold text-stone-900 border-l-2 border-stone-800 pl-2 text-[13px]">
          {data.subject}
        </div>
      )}

      {/* Opening Paragraph */}
      <p className="mb-4 text-justify leading-relaxed text-stone-800">
        {data.openingParagraph}
      </p>

      {/* Body Paragraphs */}
      {data.bodyParagraphs && data.bodyParagraphs.map((para, idx) => (
        <p key={idx} className="mb-4 text-justify leading-relaxed text-stone-800">
          {para}
        </p>
      ))}

      {/* Closing Paragraph */}
      <p className="mb-6 text-justify leading-relaxed text-stone-800">
        {data.closingParagraph}
      </p>

      {/* Signoff */}
      <div className="mt-8 space-y-1">
        <div className="text-stone-800">{data.signoff || 'Sincerely,'}</div>
        <div className="pt-2 font-bold text-stone-950 text-[15px]">{data.candidateName}</div>
      </div>
    </div>
  );
};
