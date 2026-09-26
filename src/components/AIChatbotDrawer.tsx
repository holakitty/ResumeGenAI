import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  MessageSquare,
  Key,
  Zap,
  X,
  Send,
  RefreshCw,
  Check,
  Eye,
  EyeOff,
  AlertCircle,
  HelpCircle,
  Briefcase,
  FileText,
  Sliders,
  ChevronRight,
  ShieldCheck,
  Info,
} from 'lucide-react';
import { ResumeData, JobConnector } from '../types/resume';

interface AIChatbotDrawerProps {
  currentResume: ResumeData;
  activeJob: JobConnector | null;
  onApplyTailoring?: (tailoredSummary: string) => void;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  actionableSnippet?: string;
}

export const AIChatbotDrawer: React.FC<AIChatbotDrawerProps> = ({
  currentResume,
  activeJob,
  onApplyTailoring,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'keys' | 'generator'>('chat');

  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: `Hello! I am your **ResumeCraft AI Co-Pilot & Feature Generator**.\n\nI can help you:\n- **Tailor your CV** to Naukri, Indeed, and LinkedIn job descriptions.\n- **Optimize bullets** using the Google/Amazon STAR method.\n- **Generate webpage features** or new application components you'd like to add.\n- **Guide you on API keys**: You are currently on the **Free Built-In Tier (Gemini 3.8 Flash)** with zero setup needed!`,
      timestamp: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // API Key Settings State (Saved in localStorage for user convenience)
  const [provider, setProvider] = useState<'gemini' | 'openrouter' | 'groq'>(() => {
    return (localStorage.getItem('user_ai_provider') as any) || 'gemini';
  });
  const [customKey, setCustomKey] = useState<string>(() => {
    return localStorage.getItem('user_custom_api_key') || '';
  });
  const [customModel, setCustomModel] = useState<string>(() => {
    return localStorage.getItem('user_custom_model') || '';
  });
  const [showKey, setShowKey] = useState(false);
  const [keySavedMessage, setKeySavedMessage] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSaveKeys = () => {
    localStorage.setItem('user_ai_provider', provider);
    localStorage.setItem('user_custom_api_key', customKey.trim());
    localStorage.setItem('user_custom_model', customModel.trim());
    setKeySavedMessage(true);
    setTimeout(() => setKeySavedMessage(false), 2500);

    // Notify in chat
    const keyInfo = customKey.trim()
      ? `Updated AI provider to **${provider.toUpperCase()}** with custom key.`
      : `Reverted to default **Free Built-In Tier (Gemini 3.8 Flash)**.`;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role: 'assistant',
        text: `⚙️ **Settings Updated**: ${keyInfo}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const handleClearKeys = () => {
    setCustomKey('');
    setCustomModel('');
    setProvider('gemini');
    localStorage.removeItem('user_custom_api_key');
    localStorage.removeItem('user_custom_model');
    localStorage.removeItem('user_ai_provider');
    setKeySavedMessage(true);
    setTimeout(() => setKeySavedMessage(false), 2500);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (customKey.trim()) {
        headers['x-custom-api-key'] = customKey.trim();
        headers['x-provider'] = provider;
      }

      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          message: text.trim(),
          history: messages.slice(-6).map((m) => ({ role: m.role, text: m.text })),
          currentResume,
          activeJob,
          provider,
          model: customModel.trim() || undefined,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Server error processing request');
      }

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: data.reply || 'I processed your request.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          text: `⚠️ **Error**: ${err.message || 'Unable to reach the AI model.'}\n\n*Tip:* If using a custom key, please verify it is active or switch back to the free default tier in the **API Key** tab.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const PROMPT_SUGGESTIONS = [
    { label: '🎯 Tailor to target job', prompt: `Tailor my current resume to the target job "${activeJob ? activeJob.jobTitle : 'Senior Data Analyst'}" at "${activeJob ? activeJob.company : 'Naukri/Indeed'}". Highlight keywords and STAR bullet enhancements.` },
    { label: '📊 Enhance ISI Survey Bullets', prompt: 'Rewrite my Indian Statistical Institute (ISI) survey analysis and field project management bullets with quantitative impact metrics using Excel, R, and DBF.' },
    { label: '💡 Generate new webpage feature', prompt: 'Propose a new feature for this resume builder web application (e.g. an ATS keyword heat-map or automated interview question generator) and explain how it works.' },
    { label: '🔑 Guide on Free vs Paid Keys', prompt: 'Explain the difference between the Free tier and Paid API keys (Gemini, OpenRouter, Groq) and how to configure them.' },
  ];

  return (
    <>
      {/* Floating Trigger Button (Bottom-Right) */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 px-4 py-3 bg-linear-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-500 hover:to-blue-500 text-white font-bold rounded-2xl shadow-xl shadow-indigo-600/30 flex items-center gap-2.5 transition transform hover:scale-105 active:scale-95 no-print"
      >
        <div className="relative">
          <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-indigo-600"></span>
        </div>
        <div className="text-left">
          <div className="text-xs font-black tracking-wide flex items-center gap-1.5">
            <span>AI Co-Pilot &amp; Chatbot</span>
            <span className="text-[9px] bg-white/20 px-1.5 py-0.2 rounded font-mono">
              {customKey ? 'Custom Key' : 'Free Tier'}
            </span>
          </div>
          <div className="text-[10px] text-indigo-100 font-normal">Generate features &amp; tailor CV</div>
        </div>
      </button>

      {/* Slide-over Drawer Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-2xs flex justify-end no-print animate-in fade-in duration-150">
          {/* Drawer Window */}
          <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between border-l border-slate-200 animate-in slide-in-from-right duration-200">
            
            {/* Header */}
            <div className="bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 p-4 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-600/40 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm flex items-center gap-2">
                    <span>AI Co-Pilot &amp; Generator</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {customKey ? 'Custom Key' : 'Free Tier'}
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    CV tailoring, bullet optimization &amp; feature generation
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center border-b border-slate-200 bg-slate-50 px-3 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('chat')}
                className={`py-2.5 px-3 border-b-2 flex items-center gap-1.5 transition ${
                  activeTab === 'chat'
                    ? 'border-indigo-600 text-indigo-600 font-bold bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat &amp; Features</span>
              </button>

              <button
                onClick={() => setActiveTab('keys')}
                className={`py-2.5 px-3 border-b-2 flex items-center gap-1.5 transition ${
                  activeTab === 'keys'
                    ? 'border-indigo-600 text-indigo-600 font-bold bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Key className="w-3.5 h-3.5" />
                <span>API Keys &amp; Tiers</span>
                {customKey && <span className="w-2 h-2 rounded-full bg-emerald-500"></span>}
              </button>

              <button
                onClick={() => setActiveTab('generator')}
                className={`py-2.5 px-3 border-b-2 flex items-center gap-1.5 transition ${
                  activeTab === 'generator'
                    ? 'border-indigo-600 text-indigo-600 font-bold bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>1-Click Actions</span>
              </button>
            </div>

            {/* TAB 1: Chat View */}
            {activeTab === 'chat' && (
              <div className="flex-1 flex flex-col justify-between overflow-hidden">
                {/* Messages Scroll Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed whitespace-pre-wrap ${
                          msg.role === 'user'
                            ? 'bg-indigo-600 text-white rounded-br-xs shadow-xs'
                            : 'bg-slate-100 text-slate-800 rounded-bl-xs border border-slate-200 shadow-2xs'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-slate-400 px-1 mt-1 font-mono">
                        {msg.role === 'user' ? 'You' : 'AI Assistant'} • {msg.timestamp}
                      </span>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex items-center gap-2 text-xs text-indigo-600 font-semibold bg-indigo-50 p-2.5 rounded-xl border border-indigo-100 max-w-[80%]">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Reasoning &amp; generating output...</span>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Prompt Suggestions */}
                <div className="p-2 border-t border-slate-100 bg-slate-50/80">
                  <div className="text-[10px] uppercase font-bold text-slate-400 px-2 mb-1.5">
                    Quick Prompts:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {PROMPT_SUGGESTIONS.map((s, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSendMessage(s.prompt)}
                        disabled={isLoading}
                        className="text-[11px] bg-white hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 transition text-left"
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chat Input Bar */}
                <div className="p-3 border-t border-slate-200 bg-white flex items-center gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Ask AI to tailor CV, write bullets, or propose features..."
                    className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => handleSendMessage()}
                    disabled={!inputText.trim() || isLoading}
                    className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-40 transition shrink-0"
                    title="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: API Keys & Paid/Free Tier Guide */}
            {activeTab === 'keys' && (
              <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs text-left">
                
                {/* Guide: Free Tier vs Paid Tier */}
                <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 text-indigo-950 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-indigo-900">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Free vs. Paid API Tier Guide</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-indigo-900/80">
                    <strong>🟢 Free Built-In Tier (Default):</strong> You do <em>not</em> need to enter any API key. This app automatically includes <code>gemini-3.8-flash</code> server-side for unlimited resume tailoring, LinkedIn parsing, and ATS score analysis.
                  </p>
                  <p className="text-[11px] leading-relaxed text-indigo-900/80">
                    <strong>💎 Paid / Custom Tier:</strong> If you wish to use higher quota limits, reasoning models (such as <code>gemini-3.1-pro-preview</code>), or multi-provider models (via <strong>OpenRouter</strong> or <strong>Groq</strong>), you can provide your own API key below.
                  </p>
                </div>

                {/* API Key Form */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
                  <h4 className="font-extrabold text-slate-900 text-sm flex items-center justify-between">
                    <span>Frontend API Key Input</span>
                    {customKey ? (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                        Custom Active
                      </span>
                    ) : (
                      <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-full">
                        Using Free Tier
                      </span>
                    )}
                  </h4>

                  {/* Provider Selection */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">AI Provider:</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['gemini', 'openrouter', 'groq'] as const).map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setProvider(p)}
                          className={`p-2 rounded-xl border text-center font-bold capitalize transition ${
                            provider === p
                              ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-2xs'
                              : 'border-slate-200 hover:border-slate-300 text-slate-600'
                          }`}
                        >
                          {p === 'gemini' ? 'Gemini (Google)' : p === 'openrouter' ? 'OpenRouter' : 'Groq'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Key Input */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="font-bold text-slate-700">
                        {provider.toUpperCase()} API Key:
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowKey(!showKey)}
                        className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1"
                      >
                        {showKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        <span>{showKey ? 'Hide' : 'Show'}</span>
                      </button>
                    </div>

                    <div className="relative">
                      <input
                        type={showKey ? 'text' : 'password'}
                        value={customKey}
                        onChange={(e) => setCustomKey(e.target.value)}
                        placeholder={
                          provider === 'gemini'
                            ? 'AIzaSy...'
                            : provider === 'openrouter'
                            ? 'sk-or-v1-...'
                            : 'gsk_...'
                        }
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl font-mono outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                      />
                    </div>
                    <p className="text-[10px] text-slate-400">
                      Keys are transmitted securely via server-side proxy headers and never exposed in public client bundles.
                    </p>
                  </div>

                  {/* Model Override */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">
                      Custom Model (Optional):
                    </label>
                    <input
                      type="text"
                      value={customModel}
                      onChange={(e) => setCustomModel(e.target.value)}
                      placeholder={
                        provider === 'gemini'
                          ? 'gemini-3.8-flash (default)'
                          : provider === 'openrouter'
                          ? 'google/gemini-2.0-flash-001'
                          : 'llama-3.3-70b-versatile'
                      }
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl font-mono outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={handleSaveKeys}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl flex items-center gap-1.5 transition"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Save &amp; Apply</span>
                    </button>

                    {customKey && (
                      <button
                        type="button"
                        onClick={handleClearKeys}
                        className="px-3 py-2 text-slate-500 hover:text-red-600 font-semibold text-xs transition"
                      >
                        Reset to Free Tier
                      </button>
                    )}
                  </div>

                  {keySavedMessage && (
                    <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5" />
                      <span>Settings saved! Your AI requests now use this configuration.</span>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* TAB 3: 1-Click Feature Generators */}
            {activeTab === 'generator' && (
              <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs text-left">
                <div className="space-y-1">
                  <h4 className="font-extrabold text-slate-900 text-sm">Instant AI Generators</h4>
                  <p className="text-slate-500 text-[11px]">
                    Click any action below to trigger instant analysis and generation in the AI chat:
                  </p>
                </div>

                <div className="space-y-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('chat');
                      handleSendMessage(`Generate a comprehensive ATS keyword audit for my Indian Statistical Institute (ISI) survey experience against: ${activeJob ? activeJob.jobTitle : 'Senior Data Analyst'}.`);
                    }}
                    className="w-full p-3 rounded-xl border border-slate-200 hover:border-indigo-400 bg-white hover:bg-indigo-50/40 text-left transition flex items-center justify-between group"
                  >
                    <div>
                      <span className="font-bold text-slate-800 group-hover:text-indigo-700 block">
                        🎯 Audit Indian Statistical Institute (ISI) Profile
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Check keyword alignment for Excel, R, DBF microdata, and survey sampling.
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 shrink-0" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('chat');
                      handleSendMessage(`Draft a tailored 3-paragraph cover letter for ${activeJob ? activeJob.company : 'the target employer'} highlighting my field project management and survey analysis at Indian Statistical Institute.`);
                    }}
                    className="w-full p-3 rounded-xl border border-slate-200 hover:border-indigo-400 bg-white hover:bg-indigo-50/40 text-left transition flex items-center justify-between group"
                  >
                    <div>
                      <span className="font-bold text-slate-800 group-hover:text-indigo-700 block">
                        ✍️ Draft Tailored Executive Cover Letter
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Synthesizes job description requirements with authentic candidate credentials.
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 shrink-0" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('chat');
                      handleSendMessage('Propose 3 new high-value features for this ATS Resume Builder web app (e.g. AI Interview Prep simulator, Resume PDF Differ, or Keyword Heatmap) with implementation ideas.');
                    }}
                    className="w-full p-3 rounded-xl border border-slate-200 hover:border-indigo-400 bg-white hover:bg-indigo-50/40 text-left transition flex items-center justify-between group"
                  >
                    <div>
                      <span className="font-bold text-slate-800 group-hover:text-indigo-700 block">
                        💡 Suggest Webpage Features &amp; Code
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Get architectural ideas and feature expansions for your GitHub repository.
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 shrink-0" />
                  </button>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Active: {customKey ? `${provider.toUpperCase()} (Custom)` : 'Gemini 3.8 Flash (Free)'}</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('keys')}
                className="text-indigo-600 hover:underline font-semibold"
              >
                Change Keys / Tiers
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
