import React from 'react';
import { ResumeData, TemplateId } from '../types/resume';
import { HarvardTemplate } from './templates/HarvardTemplate';
import { ModernTechTemplate } from './templates/ModernTechTemplate';
import { ExecutiveSlateTemplate } from './templates/ExecutiveSlateTemplate';
import { CorporateNavyTemplate } from './templates/CorporateNavyTemplate';
import { NordicCompactTemplate } from './templates/NordicCompactTemplate';
import { EditorialSerifTemplate } from './templates/EditorialSerifTemplate';

interface ResumePreviewProps {
  data: ResumeData;
  templateId: TemplateId;
  accentColor?: string;
  fontSize?: 'compact' | 'standard' | 'relaxed';
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({
  data,
  templateId,
  accentColor,
  fontSize = 'standard',
}) => {
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
      return <HarvardTemplate data={data} fontSize={fontSize} />;
  }
};
