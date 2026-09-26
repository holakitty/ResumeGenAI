import React, { useState } from 'react';
import { ResumeData, WorkExperience, Education, SkillCategory, Project, Certification } from '../types/resume';
import { User, Briefcase, GraduationCap, Award, FolderGit2, Wrench, Plus, Trash2, Sparkles, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';

interface ResumeEditorProps {
  data: ResumeData;
  onChange: (newData: ResumeData) => void;
  targetRole?: string;
  targetKeywords?: string[];
}

export const ResumeEditor: React.FC<ResumeEditorProps> = ({
  data,
  onChange,
  targetRole,
  targetKeywords,
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'summary' | 'exp' | 'edu' | 'skills' | 'projects' | 'certs'>('info');
  const [enhancingBulletKey, setEnhancingBulletKey] = useState<string | null>(null);
  const [enhancedBulletOptions, setEnhancedBulletOptions] = useState<Array<{ type: string; text: string; rationale: string }> | null>(null);

  // Update Personal Info
  const updatePersonalInfo = (field: keyof typeof data.personalInfo, value: string) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value,
      },
    });
  };

  // Update Summary
  const updateSummary = (val: string) => {
    onChange({
      ...data,
      summary: val,
    });
  };

  // Work Experience Handlers
  const addExperience = () => {
    const newExp: WorkExperience = {
      id: `exp-${Date.now()}`,
      company: 'New Company',
      role: 'Job Title',
      location: 'Location',
      startDate: '2023-01',
      endDate: 'Present',
      current: true,
      description: '',
      bullets: ['Spearheaded new strategic initiative, accelerating delivery by 35%.'],
    };
    onChange({
      ...data,
      experiences: [newExp, ...data.experiences],
    });
  };

  const updateExperience = (index: number, updated: WorkExperience) => {
    const exps = [...data.experiences];
    exps[index] = updated;
    onChange({ ...data, experiences: exps });
  };

  const removeExperience = (index: number) => {
    const exps = data.experiences.filter((_, i) => i !== index);
    onChange({ ...data, experiences: exps });
  };

  const addBulletToExperience = (expIndex: number) => {
    const exps = [...data.experiences];
    exps[expIndex].bullets.push('Led implementation of key technical capability with measurable impact.');
    onChange({ ...data, experiences: exps });
  };

  const updateBullet = (expIndex: number, bulletIndex: number, text: string) => {
    const exps = [...data.experiences];
    exps[expIndex].bullets[bulletIndex] = text;
    onChange({ ...data, experiences: exps });
  };

  const removeBullet = (expIndex: number, bulletIndex: number) => {
    const exps = [...data.experiences];
    exps[expIndex].bullets = exps[expIndex].bullets.filter((_, i) => i !== bulletIndex);
    onChange({ ...data, experiences: exps });
  };

  // AI Single-Bullet Enhancer
  const handleEnhanceBullet = async (expIndex: number, bulletIndex: number, currentText: string) => {
    const key = `${expIndex}-${bulletIndex}`;
    setEnhancingBulletKey(key);
    setEnhancedBulletOptions(null);

    try {
      const response = await fetch('/api/enhance-bullet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bullet: currentText,
          targetRole,
          targetKeywords,
        }),
      });
      const res = await response.json();
      if (res.success && res.variations) {
        setEnhancedBulletOptions(res.variations);
      }
    } catch (e) {
      console.error('Enhance bullet error:', e);
    } finally {
      // Keep key open so user can pick
    }
  };

  const applyBulletVariation = (expIndex: number, bulletIndex: number, newText: string) => {
    updateBullet(expIndex, bulletIndex, newText);
    setEnhancingBulletKey(null);
    setEnhancedBulletOptions(null);
  };

  // Skills Handlers
  const addSkillCategory = () => {
    const newCat: SkillCategory = {
      category: 'New Category',
      items: ['Skill A', 'Skill B'],
    };
    onChange({ ...data, skills: [...data.skills, newCat] });
  };

  const updateSkillCategoryName = (index: number, name: string) => {
    const s = [...data.skills];
    s[index].category = name;
    onChange({ ...data, skills: s });
  };

  const updateSkillCategoryItems = (index: number, itemsString: string) => {
    const s = [...data.skills];
    s[index].items = itemsString
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
    onChange({ ...data, skills: s });
  };

  const removeSkillCategory = (index: number) => {
    onChange({ ...data, skills: data.skills.filter((_, i) => i !== index) });
  };

  // Education Handlers
  const addEducation = () => {
    const newEdu: Education = {
      id: `edu-${Date.now()}`,
      school: 'University Name',
      degree: 'Bachelor of Science (B.S.)',
      fieldOfStudy: 'Computer Science',
      location: 'City, State',
      startDate: '2016',
      endDate: '2020',
      gpa: '',
      highlights: [],
    };
    onChange({ ...data, education: [...data.education, newEdu] });
  };

  const updateEducation = (index: number, updated: Education) => {
    const edus = [...data.education];
    edus[index] = updated;
    onChange({ ...data, education: edus });
  };

  const removeEducation = (index: number) => {
    onChange({ ...data, education: data.education.filter((_, i) => i !== index) });
  };

  // Projects Handlers
  const addProject = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: 'Project Name',
      subtitle: 'Tech Stack / Subtitle',
      link: 'github.com/project',
      bullets: ['Built scalable solution solving key business problem.'],
    };
    onChange({ ...data, projects: [...data.projects, newProj] });
  };

  const updateProject = (index: number, updated: Project) => {
    const projs = [...data.projects];
    projs[index] = updated;
    onChange({ ...data, projects: projs });
  };

  const removeProject = (index: number) => {
    onChange({ ...data, projects: data.projects.filter((_, i) => i !== index) });
  };

  // Certifications Handlers
  const addCertification = () => {
    const newCert: Certification = {
      id: `cert-${Date.now()}`,
      name: 'Certification Title',
      issuer: 'Issuing Organization',
      issueDate: '2023',
    };
    onChange({ ...data, certifications: [...data.certifications, newCert] });
  };

  const updateCert = (index: number, updated: Certification) => {
    const certs = [...data.certifications];
    certs[index] = updated;
    onChange({ ...data, certifications: certs });
  };

  const removeCert = (index: number) => {
    onChange({ ...data, certifications: data.certifications.filter((_, i) => i !== index) });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col h-full">
      {/* Editor Tab Bar */}
      <div className="flex border-b border-slate-200 bg-slate-50/80 px-2 pt-2 gap-1 overflow-x-auto scrollbar-none text-xs font-semibold">
        <button
          onClick={() => setActiveTab('info')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg transition border-b-2 whitespace-nowrap ${
            activeTab === 'info'
              ? 'bg-white border-blue-600 text-blue-700 shadow-xs'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Contact</span>
        </button>
        <button
          onClick={() => setActiveTab('summary')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg transition border-b-2 whitespace-nowrap ${
            activeTab === 'summary'
              ? 'bg-white border-blue-600 text-blue-700 shadow-xs'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Summary</span>
        </button>
        <button
          onClick={() => setActiveTab('exp')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg transition border-b-2 whitespace-nowrap ${
            activeTab === 'exp'
              ? 'bg-white border-blue-600 text-blue-700 shadow-xs'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Experience ({data.experiences.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('skills')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg transition border-b-2 whitespace-nowrap ${
            activeTab === 'skills'
              ? 'bg-white border-blue-600 text-blue-700 shadow-xs'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Wrench className="w-3.5 h-3.5" />
          <span>Skills ({data.skills.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('edu')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg transition border-b-2 whitespace-nowrap ${
            activeTab === 'edu'
              ? 'bg-white border-blue-600 text-blue-700 shadow-xs'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Education</span>
        </button>
        <button
          onClick={() => setActiveTab('projects')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg transition border-b-2 whitespace-nowrap ${
            activeTab === 'projects'
              ? 'bg-white border-blue-600 text-blue-700 shadow-xs'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>Projects</span>
        </button>
        <button
          onClick={() => setActiveTab('certs')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg transition border-b-2 whitespace-nowrap ${
            activeTab === 'certs'
              ? 'bg-white border-blue-600 text-blue-700 shadow-xs'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Certs</span>
        </button>
      </div>

      {/* Editor Content Area */}
      <div className="p-5 overflow-y-auto space-y-4 flex-1">
        {/* TAB: Personal Info */}
        {activeTab === 'info' && (
          <div className="space-y-3.5 text-xs">
            <h3 className="font-bold text-slate-900 text-sm">Personal & Contact Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  value={data.personalInfo.fullName}
                  onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Professional Headline</label>
                <input
                  type="text"
                  value={data.personalInfo.headline}
                  onChange={(e) => updatePersonalInfo('headline', e.target.value)}
                  placeholder="e.g. Senior Full Stack Engineer"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  value={data.personalInfo.email}
                  onChange={(e) => updatePersonalInfo('email', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Phone Number</label>
                <input
                  type="text"
                  value={data.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Location</label>
                <input
                  type="text"
                  value={data.personalInfo.location}
                  onChange={(e) => updatePersonalInfo('location', e.target.value)}
                  placeholder="City, State / Remote"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">LinkedIn URL / Handle</label>
                <input
                  type="text"
                  value={data.personalInfo.linkedin}
                  onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                  placeholder="linkedin.com/in/yourname"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">GitHub (Optional)</label>
                <input
                  type="text"
                  value={data.personalInfo.github || ''}
                  onChange={(e) => updatePersonalInfo('github', e.target.value)}
                  placeholder="github.com/username"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Portfolio / Website (Optional)</label>
                <input
                  type="text"
                  value={data.personalInfo.portfolio || ''}
                  onChange={(e) => updatePersonalInfo('portfolio', e.target.value)}
                  placeholder="yoursite.dev"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB: Summary */}
        {activeTab === 'summary' && (
          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-900 text-sm">Professional Summary</h3>
              <span className="text-[11px] text-slate-500">
                Aim for 2-4 high-impact sentences highlighting years of experience and top achievements.
              </span>
            </div>
            <textarea
              rows={6}
              value={data.summary}
              onChange={(e) => updateSummary(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-xl text-slate-900 text-xs leading-relaxed focus:ring-2 focus:ring-blue-500 outline-none font-sans"
              placeholder="Write a concise overview of your background, leadership, and quantifiable business outcomes..."
            />
          </div>
        )}

        {/* TAB: Work Experience */}
        {activeTab === 'exp' && (
          <div className="space-y-5 text-xs">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-900 text-sm">Work Experience</h3>
              <button
                type="button"
                onClick={addExperience}
                className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-lg flex items-center gap-1 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Position
              </button>
            </div>

            <div className="space-y-5">
              {data.experiences.map((exp, expIdx) => (
                <div
                  key={exp.id || expIdx}
                  className="bg-slate-50/70 p-4 rounded-xl border border-slate-200 space-y-3"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1">
                      <div>
                        <label className="block text-slate-500 text-[11px] font-semibold mb-0.5">
                          Job Role / Title
                        </label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => updateExperience(expIdx, { ...exp, role: e.target.value })}
                          className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg font-bold text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-500 text-[11px] font-semibold mb-0.5">
                          Company Name
                        </label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateExperience(expIdx, { ...exp, company: e.target.value })}
                          className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-800"
                        />
                      </div>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <label className="block text-slate-500 text-[11px] font-semibold mb-0.5">
                            Start Date
                          </label>
                          <input
                            type="text"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(expIdx, { ...exp, startDate: e.target.value })}
                            placeholder="2022-03"
                            className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-800"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-slate-500 text-[11px] font-semibold mb-0.5">
                            End Date
                          </label>
                          <input
                            type="text"
                            value={exp.current ? 'Present' : exp.endDate}
                            onChange={(e) => updateExperience(expIdx, { ...exp, endDate: e.target.value })}
                            placeholder="Present"
                            className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-800"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-slate-500 text-[11px] font-semibold mb-0.5">
                          Location
                        </label>
                        <input
                          type="text"
                          value={exp.location}
                          onChange={(e) => updateExperience(expIdx, { ...exp, location: e.target.value })}
                          className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-800"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeExperience(expIdx)}
                      className="p-1.5 text-slate-400 hover:text-red-600 transition"
                      title="Remove experience"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Bullet points with 1-click AI Enhancer */}
                  <div className="space-y-2 pt-2 border-t border-slate-200">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-slate-700 text-[11px] uppercase tracking-wide">
                        Bullet Points (STAR Method)
                      </span>
                      <button
                        type="button"
                        onClick={() => addBulletToExperience(expIdx)}
                        className="text-blue-600 hover:text-blue-800 font-semibold text-[11px] flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        Add Bullet
                      </button>
                    </div>

                    <div className="space-y-2">
                      {exp.bullets.map((b, bIdx) => {
                        const isEnhancing = enhancingBulletKey === `${expIdx}-${bIdx}`;
                        return (
                          <div key={bIdx} className="space-y-1.5">
                            <div className="flex items-start gap-2">
                              <textarea
                                rows={2}
                                value={b}
                                onChange={(e) => updateBullet(expIdx, bIdx, e.target.value)}
                                className="flex-1 p-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:ring-1 focus:ring-blue-500 outline-none"
                              />
                              <div className="flex flex-col gap-1">
                                <button
                                  type="button"
                                  onClick={() => handleEnhanceBullet(expIdx, bIdx, b)}
                                  className="p-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg transition"
                                  title="Enhance with AI (Metrics & Action Verbs)"
                                >
                                  <Sparkles className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => removeBullet(expIdx, bIdx)}
                                  className="p-1.5 text-slate-400 hover:text-red-600 transition"
                                  title="Remove bullet"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            {/* Show AI Enhancer Options if active */}
                            {isEnhancing && enhancedBulletOptions && (
                              <div className="p-3 bg-indigo-50/80 border border-indigo-200 rounded-xl space-y-2 animate-in fade-in">
                                <div className="flex justify-between items-center">
                                  <span className="text-[11px] font-bold text-indigo-900 flex items-center gap-1">
                                    <Sparkles className="w-3 h-3 text-indigo-600" />
                                    Choose an Enhanced Variation:
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => setEnhancingBulletKey(null)}
                                    className="text-[10px] text-slate-500 hover:text-slate-800"
                                  >
                                    Dismiss
                                  </button>
                                </div>
                                <div className="space-y-1.5">
                                  {enhancedBulletOptions.map((opt, oIdx) => (
                                    <div
                                      key={oIdx}
                                      onClick={() => applyBulletVariation(expIdx, bIdx, opt.text)}
                                      className="p-2 bg-white hover:bg-indigo-100/50 border border-indigo-100 rounded-lg cursor-pointer transition text-xs space-y-0.5"
                                    >
                                      <div className="font-semibold text-indigo-900 text-[11px]">
                                        {opt.type}
                                      </div>
                                      <div className="text-slate-800">{opt.text}</div>
                                      <div className="text-[10px] text-slate-500">{opt.rationale}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: Skills */}
        {activeTab === 'skills' && (
          <div className="space-y-4 text-xs">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Skills & Technologies</h3>
                <p className="text-slate-500 text-[11px]">
                  Separate individual skills with commas. Group into clear ATS-recognized categories.
                </p>
              </div>
              <button
                type="button"
                onClick={addSkillCategory}
                className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-lg flex items-center gap-1 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Category
              </button>
            </div>

            <div className="space-y-3">
              {data.skills.map((skillGroup, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <input
                      type="text"
                      value={skillGroup.category}
                      onChange={(e) => updateSkillCategoryName(idx, e.target.value)}
                      placeholder="Category (e.g. Languages & Frameworks)"
                      className="font-bold text-slate-900 bg-white px-2 py-1 border border-slate-300 rounded text-xs w-60"
                    />
                    <button
                      type="button"
                      onClick={() => removeSkillCategory(idx)}
                      className="text-slate-400 hover:text-red-600 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={skillGroup.items.join(', ')}
                    onChange={(e) => updateSkillCategoryItems(idx, e.target.value)}
                    placeholder="e.g. React, Node.js, TypeScript, AWS"
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-800 text-xs"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: Education */}
        {activeTab === 'edu' && (
          <div className="space-y-4 text-xs">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-900 text-sm">Education</h3>
              <button
                type="button"
                onClick={addEducation}
                className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-lg flex items-center gap-1 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                Add School
              </button>
            </div>

            <div className="space-y-3">
              {data.education.map((edu, idx) => (
                <div
                  key={edu.id || idx}
                  className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2.5"
                >
                  <div className="flex justify-between items-start">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1">
                      <input
                        type="text"
                        value={edu.school}
                        onChange={(e) => updateEducation(idx, { ...edu, school: e.target.value })}
                        placeholder="University / College"
                        className="font-bold bg-white px-2.5 py-1.5 border border-slate-300 rounded-lg text-slate-900"
                      />
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => updateEducation(idx, { ...edu, degree: e.target.value })}
                        placeholder="Degree (e.g. B.S., M.S.)"
                        className="bg-white px-2.5 py-1.5 border border-slate-300 rounded-lg text-slate-900"
                      />
                      <input
                        type="text"
                        value={edu.fieldOfStudy}
                        onChange={(e) => updateEducation(idx, { ...edu, fieldOfStudy: e.target.value })}
                        placeholder="Field of Study / Major"
                        className="bg-white px-2.5 py-1.5 border border-slate-300 rounded-lg text-slate-900"
                      />
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={edu.startDate}
                          onChange={(e) => updateEducation(idx, { ...edu, startDate: e.target.value })}
                          placeholder="Start (2016)"
                          className="flex-1 bg-white px-2.5 py-1.5 border border-slate-300 rounded-lg text-slate-900"
                        />
                        <input
                          type="text"
                          value={edu.endDate}
                          onChange={(e) => updateEducation(idx, { ...edu, endDate: e.target.value })}
                          placeholder="End (2020)"
                          className="flex-1 bg-white px-2.5 py-1.5 border border-slate-300 rounded-lg text-slate-900"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeEducation(idx)}
                      className="p-1 text-slate-400 hover:text-red-600 ml-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: Projects */}
        {activeTab === 'projects' && (
          <div className="space-y-4 text-xs">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-900 text-sm">Key Projects</h3>
              <button
                type="button"
                onClick={addProject}
                className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-lg flex items-center gap-1 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Project
              </button>
            </div>

            <div className="space-y-3">
              {data.projects.map((proj, idx) => (
                <div
                  key={proj.id || idx}
                  className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2"
                >
                  <div className="flex justify-between">
                    <input
                      type="text"
                      value={proj.title}
                      onChange={(e) => updateProject(idx, { ...proj, title: e.target.value })}
                      placeholder="Project Title"
                      className="font-bold bg-white px-2.5 py-1 border border-slate-300 rounded-lg text-slate-900 flex-1 mr-2"
                    />
                    <button
                      type="button"
                      onClick={() => removeProject(idx)}
                      className="p-1 text-slate-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={proj.subtitle || ''}
                      onChange={(e) => updateProject(idx, { ...proj, subtitle: e.target.value })}
                      placeholder="Subtitle / Tech stack"
                      className="bg-white px-2.5 py-1 border border-slate-300 rounded-lg text-slate-800"
                    />
                    <input
                      type="text"
                      value={proj.link || ''}
                      onChange={(e) => updateProject(idx, { ...proj, link: e.target.value })}
                      placeholder="Link / GitHub"
                      className="bg-white px-2.5 py-1 border border-slate-300 rounded-lg text-slate-800"
                    />
                  </div>
                  <textarea
                    rows={2}
                    value={proj.bullets.join('\n')}
                    onChange={(e) =>
                      updateProject(idx, {
                        ...proj,
                        bullets: e.target.value.split('\n').filter(Boolean),
                      })
                    }
                    placeholder="Project bullet points (one per line)..."
                    className="w-full bg-white p-2 border border-slate-300 rounded-lg text-slate-800"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: Certifications */}
        {activeTab === 'certs' && (
          <div className="space-y-4 text-xs">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-900 text-sm">Certifications & Licenses</h3>
              <button
                type="button"
                onClick={addCertification}
                className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-lg flex items-center gap-1 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Certification
              </button>
            </div>

            <div className="space-y-2.5">
              {data.certifications.map((cert, idx) => (
                <div
                  key={cert.id || idx}
                  className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) => updateCert(idx, { ...cert, name: e.target.value })}
                    placeholder="Cert Name (e.g. AWS Solutions Architect)"
                    className="font-bold bg-white px-2.5 py-1 border border-slate-300 rounded-lg text-slate-900 flex-2"
                  />
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) => updateCert(idx, { ...cert, issuer: e.target.value })}
                    placeholder="Issuer (e.g. Amazon)"
                    className="bg-white px-2.5 py-1 border border-slate-300 rounded-lg text-slate-800 flex-1"
                  />
                  <input
                    type="text"
                    value={cert.issueDate}
                    onChange={(e) => updateCert(idx, { ...cert, issueDate: e.target.value })}
                    placeholder="Year (e.g. 2023)"
                    className="bg-white px-2.5 py-1 border border-slate-300 rounded-lg text-slate-800 w-24"
                  />
                  <button
                    type="button"
                    onClick={() => removeCert(idx)}
                    className="p-1 text-slate-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
