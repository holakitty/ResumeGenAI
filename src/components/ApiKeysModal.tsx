import React, { useState, useEffect } from 'react';
import {
  Key,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  X,
  ExternalLink,
  Sparkles,
  Lock,
  CreditCard,
  RefreshCw,
  Cpu,
  Zap,
  Eye,
  EyeOff,
  Check,
} from 'lucide-react';

interface ApiKeysModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeysSaved?: (keys: {
    openRouterKey: string;
    groqKey: string;
    openAiKey: string;
    preferredProvider: string;
  }) => void;
}

export const ApiKeysModal: React.FC<ApiKeysModalProps> = ({
  isOpen,
  onClose,
  onKeysSaved,
}) => {
  // State for AI keys
  const [openRouterKey, setOpenRouterKey] = useState<string>(() => {
    return typeof window !== 'undefined' ? localStorage.getItem('rc_openrouter_key') || '' : '';
  });
  const [groqKey, setGroqKey] = useState<string>(() => {
    return typeof window !== 'undefined' ? localStorage.getItem('rc_groq_key') || '' : '';
  });
  const [openAiKey, setOpenAiKey] = useState<string>(() => {
    return typeof window !== 'undefined' ? localStorage.getItem('rc_openai_key') || '' : '';
  });
  const [preferredProvider, setPreferredProvider] = useState<string>(() => {
    return typeof window !== 'undefined' ? localStorage.getItem('rc_preferred_provider') || 'auto' : 'auto';
  });

  // State for Razorpay keys
  const [razorpayKeyId, setRazorpayKeyId] = useState<string>('');
  const [razorpayKeySecret, setRazorpayKeySecret] = useState<string>('');

  // UI state
  const [activeTab, setActiveTab] = useState<'ai' | 'razorpay'>('ai');
  const [showKeys, setShowKeys] = useState<{ [key: string]: boolean }>({});
  const [testingProvider, setTestingProvider] = useState<string | null>(null);
  const [savingProvider, setSavingProvider] = useState<string | null>(null);
  const [isSavingRazorpay, setIsSavingRazorpay] = useState<boolean>(false);
  const [testResults, setTestResults] = useState<{ [key: string]: { success: boolean; message: string } }>({});
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [backendStatus, setBackendStatus] = useState<{
    hasGeminiKey: boolean;
    hasOpenRouterKey: boolean;
    hasGroqKey: boolean;
    hasOpenAiKey: boolean;
    hasRazorpayKey: boolean;
    isLiveRazorpay: boolean;
    razorpayKeyId: string;
    amount: number;
    displayAmount: string;
  } | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchBackendStatus();
      setErrorMsg(null);
      setSuccessMsg(null);
    }
  }, [isOpen]);

  const fetchBackendStatus = async () => {
    try {
      const res = await fetch('/api/config/status');
      if (res.ok) {
        const data = await res.json();
        setBackendStatus(data);
        if (data.razorpayKeyId && !data.razorpayKeyId.includes('demokey')) {
          setRazorpayKeyId(data.razorpayKeyId);
        }
      }
    } catch (e) {
      console.warn('Could not fetch backend config status:', e);
    }
  };

  if (!isOpen) return null;

  const toggleShowKey = (id: string) => {
    setShowKeys((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Test an individual key
  const handleTestKey = async (provider: 'openrouter' | 'groq' | 'openai', key: string) => {
    const trimmed = key.trim();
    if (!trimmed) {
      setErrorMsg(`Please enter a valid ${provider.toUpperCase()} key before testing.`);
      return;
    }

    setTestingProvider(provider);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/config/test-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider, apiKey: trimmed }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setTestResults((prev) => ({
          ...prev,
          [provider]: { success: true, message: data.message || 'Key verified!' },
        }));
      } else {
        setTestResults((prev) => ({
          ...prev,
          [provider]: { success: false, message: data.error || 'Verification failed' },
        }));
      }
    } catch (err: any) {
      setTestResults((prev) => ({
        ...prev,
        [provider]: { success: false, message: err.message || 'Network error during test' },
      }));
    } finally {
      setTestingProvider(null);
    }
  };

  // Save an individual AI key
  const handleSaveIndividualKey = async (
    provider: 'openrouter' | 'groq' | 'openai',
    key: string
  ) => {
    const trimmed = key.trim();
    if (!trimmed) {
      setErrorMsg(`Please enter a key for ${provider.toUpperCase()}`);
      return;
    }

    setSavingProvider(provider);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      // 1. Save in client localStorage
      const storageKey =
        provider === 'openrouter'
          ? 'rc_openrouter_key'
          : provider === 'groq'
          ? 'rc_groq_key'
          : 'rc_openai_key';
      localStorage.setItem(storageKey, trimmed);

      // 2. Save in backend server environment
      const endpoint =
        provider === 'openrouter'
          ? '/api/config/openrouter-key'
          : provider === 'groq'
          ? '/api/config/groq-key'
          : '/api/config/openai-key';

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: trimmed }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || `Failed to save ${provider} key`);
      }

      setSuccessMsg(`${provider.toUpperCase()} API key saved successfully in front end & backend!`);
      await fetchBackendStatus();

      if (onKeysSaved) {
        onKeysSaved({
          openRouterKey: provider === 'openrouter' ? trimmed : openRouterKey,
          groqKey: provider === 'groq' ? trimmed : groqKey,
          openAiKey: provider === 'openai' ? trimmed : openAiKey,
          preferredProvider,
        });
      }

      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || `Error saving ${provider} key`);
    } finally {
      setSavingProvider(null);
    }
  };

  // Save all AI preferences at once
  const handleSaveAllAiConfig = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);

    // Save in localStorage
    if (openRouterKey.trim()) localStorage.setItem('rc_openrouter_key', openRouterKey.trim());
    if (groqKey.trim()) localStorage.setItem('rc_groq_key', groqKey.trim());
    if (openAiKey.trim()) localStorage.setItem('rc_openai_key', openAiKey.trim());
    localStorage.setItem('rc_preferred_provider', preferredProvider);

    try {
      const res = await fetch('/api/config/ai-keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          openRouterKey: openRouterKey.trim(),
          groqKey: groqKey.trim(),
          openAiKey: openAiKey.trim(),
          preferredProvider,
        }),
      });

      if (res.ok) {
        setSuccessMsg('All AI Provider Keys and settings saved successfully!');
        await fetchBackendStatus();
        if (onKeysSaved) {
          onKeysSaved({
            openRouterKey: openRouterKey.trim(),
            groqKey: groqKey.trim(),
            openAiKey: openAiKey.trim(),
            preferredProvider,
          });
        }
        setTimeout(() => setSuccessMsg(null), 4000);
      }
    } catch (e: any) {
      setErrorMsg('Failed to sync keys to backend: ' + e.message);
    }
  };

  const handleSaveRazorpay = async () => {
    const kid = razorpayKeyId.trim();
    const ksec = razorpayKeySecret.trim();

    if (!kid) {
      setErrorMsg('Please enter a valid Razorpay Key ID (rzp_live_... or rzp_test_...)');
      return;
    }

    setIsSavingRazorpay(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch('/api/razorpay/configure-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyId: kid, keySecret: ksec }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to update Razorpay key in backend');
      }

      setSuccessMsg(
        `Razorpay ${data.isLive ? 'Live' : 'Test'} Key securely saved in backend memory for ₹199 exports!`
      );
      setRazorpayKeySecret('');
      await fetchBackendStatus();
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error configuring Razorpay key');
    } finally {
      setIsSavingRazorpay(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-white shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                <span>API &amp; Payment Gateway Configuration</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Front-end key management for OpenRouter, Groq, OpenAI &amp; Live Razorpay (₹199).
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher: AI Models vs Razorpay */}
        <div className="flex gap-2 border-b border-slate-800 pb-3 text-xs font-bold">
          <button
            onClick={() => setActiveTab('ai')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'ai'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>AI Extraction Keys (OpenRouter / Groq / OpenAI)</span>
          </button>
          <button
            onClick={() => setActiveTab('razorpay')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'razorpay'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Razorpay Live Key (₹199)</span>
          </button>
        </div>

        {/* Global Notifications */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* TAB 1: AI KEYS & PARSING ENGINES */}
        {activeTab === 'ai' && (
          <div className="space-y-5">
            {/* Preferred Provider Selection */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <label className="block text-xs font-bold text-slate-200">
                Primary Extraction Provider Preference:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { id: 'auto', label: '⚡ Auto Cascade', desc: 'Tries all available' },
                  { id: 'openrouter', label: 'OpenRouter', desc: 'Gemini 2.0 / LLaMA' },
                  { id: 'openai', label: 'OpenAI', desc: 'GPT-4o-mini' },
                  { id: 'groq', label: 'Groq', desc: 'LLaMA 3.3 70B' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setPreferredProvider(item.id);
                      localStorage.setItem('rc_preferred_provider', item.id);
                    }}
                    className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                      preferredProvider === item.id
                        ? 'border-indigo-500 bg-indigo-500/10 text-white'
                        : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold flex items-center justify-between">
                      <span>{item.label}</span>
                      {preferredProvider === item.id && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Provider 1: OpenRouter */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-sky-400" />
                  <h3 className="text-xs font-bold text-white">OpenRouter API Key</h3>
                  <code className="text-[10px] text-slate-400 px-1.5 py-0.5 rounded bg-slate-800">
                    sk-or-v1-...
                  </code>
                </div>
                {backendStatus?.hasOpenRouterKey || openRouterKey ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Configured</span>
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-500">Not set</span>
                )}
              </div>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type={showKeys['openrouter'] ? 'text' : 'password'}
                    placeholder="sk-or-v1-xxxxxxxxxxxxxxxxxxxx"
                    value={openRouterKey}
                    onChange={(e) => setOpenRouterKey(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 pr-9 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => toggleShowKey('openrouter')}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-200"
                  >
                    {showKeys['openrouter'] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <button
                  onClick={() => handleTestKey('openrouter', openRouterKey)}
                  disabled={testingProvider === 'openrouter' || !openRouterKey}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition flex items-center gap-1 shrink-0 cursor-pointer"
                  title="Verify OpenRouter credentials"
                >
                  {testingProvider === 'openrouter' && <RefreshCw className="w-3 h-3 animate-spin" />}
                  <span>Test</span>
                </button>

                <button
                  onClick={() => handleSaveIndividualKey('openrouter', openRouterKey)}
                  disabled={savingProvider === 'openrouter' || !openRouterKey}
                  className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  {savingProvider === 'openrouter' && <RefreshCw className="w-3 h-3 animate-spin" />}
                  <span>Save</span>
                </button>
              </div>

              {testResults['openrouter'] && (
                <div
                  className={`text-[11px] p-2 rounded-lg flex items-center gap-1.5 ${
                    testResults['openrouter'].success
                      ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                      : 'bg-red-500/10 text-red-300 border border-red-500/20'
                  }`}
                >
                  {testResults['openrouter'].success ? (
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  ) : (
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  )}
                  <span>{testResults['openrouter'].message}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Accesses Google Gemini 2.0 Flash &amp; LLaMA 3.3 models</span>
                <a
                  href="https://openrouter.ai/keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:text-sky-300 inline-flex items-center gap-1"
                >
                  <span>Get OpenRouter Key</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Provider 2: Groq */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <h3 className="text-xs font-bold text-white">Groq API Key (Ultra-Fast Inference)</h3>
                  <code className="text-[10px] text-slate-400 px-1.5 py-0.5 rounded bg-slate-800">
                    gsk_...
                  </code>
                </div>
                {backendStatus?.hasGroqKey || groqKey ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Configured</span>
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-500">Not set</span>
                )}
              </div>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type={showKeys['groq'] ? 'text' : 'password'}
                    placeholder="gsk_xxxxxxxxxxxxxxxxxxxx"
                    value={groqKey}
                    onChange={(e) => setGroqKey(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 pr-9 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => toggleShowKey('groq')}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-200"
                  >
                    {showKeys['groq'] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <button
                  onClick={() => handleTestKey('groq', groqKey)}
                  disabled={testingProvider === 'groq' || !groqKey}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition flex items-center gap-1 shrink-0 cursor-pointer"
                  title="Verify Groq credentials"
                >
                  {testingProvider === 'groq' && <RefreshCw className="w-3 h-3 animate-spin" />}
                  <span>Test</span>
                </button>

                <button
                  onClick={() => handleSaveIndividualKey('groq', groqKey)}
                  disabled={savingProvider === 'groq' || !groqKey}
                  className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  {savingProvider === 'groq' && <RefreshCw className="w-3 h-3 animate-spin" />}
                  <span>Save</span>
                </button>
              </div>

              {testResults['groq'] && (
                <div
                  className={`text-[11px] p-2 rounded-lg flex items-center gap-1.5 ${
                    testResults['groq'].success
                      ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                      : 'bg-red-500/10 text-red-300 border border-red-500/20'
                  }`}
                >
                  {testResults['groq'].success ? (
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  ) : (
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  )}
                  <span>{testResults['groq'].message}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Runs LLaMA 3.3 70B at &gt;300 tokens/sec</span>
                <a
                  href="https://console.groq.com/keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 inline-flex items-center gap-1"
                >
                  <span>Get Groq Key</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Provider 3: OpenAI */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-xs font-bold text-white">OpenAI API Key (GPT-4o / GPT-4o-mini)</h3>
                  <code className="text-[10px] text-slate-400 px-1.5 py-0.5 rounded bg-slate-800">
                    sk-...
                  </code>
                </div>
                {backendStatus?.hasOpenAiKey || openAiKey ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Configured</span>
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-500">Not set</span>
                )}
              </div>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type={showKeys['openai'] ? 'text' : 'password'}
                    placeholder="sk-proj-xxxxxxxxxxxxxxxxxxxx"
                    value={openAiKey}
                    onChange={(e) => setOpenAiKey(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 pr-9 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => toggleShowKey('openai')}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-200"
                  >
                    {showKeys['openai'] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <button
                  onClick={() => handleTestKey('openai', openAiKey)}
                  disabled={testingProvider === 'openai' || !openAiKey}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition flex items-center gap-1 shrink-0 cursor-pointer"
                  title="Verify OpenAI credentials"
                >
                  {testingProvider === 'openai' && <RefreshCw className="w-3 h-3 animate-spin" />}
                  <span>Test</span>
                </button>

                <button
                  onClick={() => handleSaveIndividualKey('openai', openAiKey)}
                  disabled={savingProvider === 'openai' || !openAiKey}
                  className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  {savingProvider === 'openai' && <RefreshCw className="w-3 h-3 animate-spin" />}
                  <span>Save</span>
                </button>
              </div>

              {testResults['openai'] && (
                <div
                  className={`text-[11px] p-2 rounded-lg flex items-center gap-1.5 ${
                    testResults['openai'].success
                      ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                      : 'bg-red-500/10 text-red-300 border border-red-500/20'
                  }`}
                >
                  {testResults['openai'].success ? (
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  ) : (
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  )}
                  <span>{testResults['openai'].message}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Official OpenAI direct API endpoints for GPT-4o-mini extraction</span>
                <a
                  href="https://platform.openai.com/api-keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1"
                >
                  <span>Get OpenAI Key</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Save All Button */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleSaveAllAiConfig}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Save All AI Provider Keys</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: RAZORPAY CONFIGURATION */}
        {activeTab === 'razorpay' && (
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-blue-400" />
                  <h3 className="text-sm font-bold text-white">Razorpay Live Key (₹199 PDF Export)</h3>
                </div>
                {backendStatus?.isLiveRazorpay ? (
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Live Mode Active (₹199)</span>
                  </span>
                ) : backendStatus?.hasRazorpayKey ? (
                  <span className="text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    Test Mode (rzp_test)
                  </span>
                ) : (
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                    Demo Mode
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Configure your official live Razorpay credentials to accept real UPI, card, and netbanking payments in India. All secrets are stored securely on the backend server.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-slate-300">
                    Key ID (<code className="text-blue-300">rzp_live_...</code> or <code className="text-slate-400">rzp_test_...</code>)
                  </label>
                  <input
                    type="text"
                    placeholder="rzp_live_xxxxxxxxxxxxxxxx"
                    value={razorpayKeyId}
                    onChange={(e) => setRazorpayKeyId(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-slate-300">
                    Key Secret (Kept on server)
                  </label>
                  <input
                    type="password"
                    placeholder="Razorpay Secret"
                    value={razorpayKeySecret}
                    onChange={(e) => setRazorpayKeySecret(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-400">
                  Fixed Export Fee: <strong className="text-white">₹199</strong> (19900 paise)
                </span>
                <button
                  onClick={handleSaveRazorpay}
                  disabled={isSavingRazorpay || !razorpayKeyId}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5 cursor-pointer"
                >
                  {isSavingRazorpay ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <ShieldCheck className="w-3.5 h-3.5" />
                  )}
                  <span>Save Razorpay Key</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
                <span>Manage keys in Razorpay Dashboard:</span>
                <a
                  href="https://dashboard.razorpay.com/app/keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 font-medium"
                >
                  <span>dashboard.razorpay.com/app/keys</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Credentials encrypted &amp; client sessions cached in local storage.</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
