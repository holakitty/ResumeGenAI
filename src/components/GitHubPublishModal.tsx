import React, { useState } from 'react';
import { Github, Globe, Download, Check, Copy, ExternalLink, AlertCircle, Sparkles, FolderCheck } from 'lucide-react';

interface GitHubPublishModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubPublishModal: React.FC<GitHubPublishModalProps> = ({ isOpen, onClose }) => {
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  if (!isOpen) return null;

  const repoUrl = 'https://github.com/holakitty/ResumeGenAI';
  const pagesUrl = 'https://holakitty.github.io/ResumeGenAI/';
  const pagesSettingsUrl = 'https://github.com/holakitty/ResumeGenAI/settings/pages';
  const uploadUrl = 'https://github.com/holakitty/ResumeGenAI/upload/main';

  const gitCommands = `git init
git add .
git commit -m "feat: complete ResumeGenAI ATS app and GitHub Pages landing page"
git branch -M main
git remote add origin https://github.com/holakitty/ResumeGenAI.git
git push -u origin main`;

  const handleCopyCmd = () => {
    navigator.clipboard.writeText(gitCommands);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(pagesUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-left">
        
        {/* Header */}
        <div className="bg-linear-to-r from-slate-900 via-slate-850 to-indigo-950 p-6 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Github className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>GitHub Pages &amp; Repo Setup</span>
              </div>
              <h2 className="text-xl font-bold">Publish to holakitty/ResumeGenAI</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-white/10 transition"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">

          {/* Explanation Alert: Why it's not showing yet */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex gap-3 text-xs text-amber-900">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-amber-950 block">Why is {pagesUrl} not showing yet?</span>
              <p className="leading-relaxed">
                This project lives inside your cloud development environment. The files have <strong>not been pushed to your GitHub account yet</strong>, and GitHub Pages needs to be pointed to your <code>/docs</code> folder.
              </p>
            </div>
          </div>

          {/* Step 1: Download Landing Page files */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">1</span>
              <h3 className="font-extrabold text-slate-900 text-sm">Download Ready-to-Upload Files</h3>
            </div>
            <p className="text-xs text-slate-500 pl-8">
              We generated a self-contained, responsive landing page engineered specifically for GitHub Pages:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-8">
              <a
                href="/api/download-landing"
                download="index.html"
                className="p-3 rounded-xl border border-indigo-200 hover:border-indigo-400 bg-indigo-50/50 hover:bg-indigo-50 flex items-center justify-between text-xs font-bold text-indigo-900 transition"
              >
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4 text-indigo-600" />
                  <span>Download index.html (Landing Page)</span>
                </div>
                <span className="text-[10px] bg-indigo-200/60 px-1.5 py-0.5 rounded text-indigo-800 font-mono">docs/</span>
              </a>

              <a
                href="/api/download-readme"
                download="README.md"
                className="p-3 rounded-xl border border-slate-200 hover:border-slate-400 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-xs font-bold text-slate-800 transition"
              >
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4 text-slate-600" />
                  <span>Download README.md (Repo Index)</span>
                </div>
                <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded text-slate-700 font-mono">root</span>
              </a>
            </div>

            <div className="pl-8 pt-1">
              <a
                href="/landing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1"
              >
                <span>Preview the Landing Page in a new tab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Step 2: Upload or Git Push */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">2</span>
              <h3 className="font-extrabold text-slate-900 text-sm">Upload to your GitHub Repository</h3>
            </div>

            <div className="pl-8 space-y-3">
              {/* Option A: Fast Web Upload */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs">
                <span className="font-bold text-slate-800 block">Method A: Upload via GitHub.com in Browser</span>
                <ol className="list-decimal list-inside space-y-1 text-slate-600">
                  <li>Open <a href={uploadUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline font-semibold">github.com/holakitty/ResumeGenAI/upload/main</a>.</li>
                  <li>Upload <code>README.md</code> in the root.</li>
                  <li>In your repository, create a <code>docs/</code> folder and drop <code>index.html</code> inside it.</li>
                  <li>Click <strong>Commit changes</strong>.</li>
                </ol>
              </div>

              {/* Option B: Git Push Terminal Command */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span className="font-bold text-slate-800">Method B: Push via Git Terminal</span>
                  <button
                    onClick={handleCopyCmd}
                    className="text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-1 text-[11px]"
                  >
                    {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCmd ? 'Copied!' : 'Copy Commands'}</span>
                  </button>
                </div>
                <pre className="bg-slate-950 text-emerald-400 p-3 rounded-xl font-mono text-[11px] overflow-x-auto border border-slate-800">
                  {gitCommands}
                </pre>
              </div>
            </div>
          </div>

          {/* Step 3: Enable GitHub Pages in Settings */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center">3</span>
              <h3 className="font-extrabold text-slate-900 text-sm">Enable GitHub Pages in Repo Settings</h3>
            </div>

            <div className="pl-8 space-y-2 text-xs text-slate-600">
              <p>
                Once your files are committed to GitHub:
              </p>
              <ol className="list-decimal list-inside space-y-1.5 bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-200/80 text-emerald-950">
                <li>
                  Go to <a href={pagesSettingsUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline font-bold">GitHub Pages Settings</a>.
                </li>
                <li>Under <strong>Build and deployment &gt; Branch</strong>, select:
                  <ul className="list-disc list-inside pl-4 font-mono font-bold text-[11px] text-emerald-800 mt-0.5">
                    <li>Branch: <strong>main</strong></li>
                    <li>Folder: <strong>/docs</strong></li>
                  </ul>
                </li>
                <li>Click <strong>Save</strong>.</li>
                <li>Wait 1–2 minutes, and your site is live at:</li>
              </ol>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-100 border border-slate-200">
                <a
                  href={pagesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs font-bold text-indigo-700 hover:underline flex items-center gap-1"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{pagesUrl}</span>
                </a>
                <button
                  onClick={handleCopyUrl}
                  className="text-slate-500 hover:text-slate-800 p-1 text-[11px] font-bold"
                >
                  {copiedUrl ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 font-semibold"
          >
            <Github className="w-4 h-4" />
            <span>Open github.com/holakitty/ResumeGenAI</span>
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
