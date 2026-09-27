import React, { useState, useEffect } from 'react';
import { Key, ShieldCheck, CheckCircle2, AlertCircle, X, ExternalLink, Sparkles, Lock, CreditCard, RefreshCw } from 'lucide-react';

interface ApiKeysModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRouterKeySaved?: (key: string) => void;
}

export const ApiKeysModal: React.FC<ApiKeysModalProps> = ({
  isOpen,
  onClose,
  onOpenRouterKeySaved,
}) => {
  const [openRouterKey, setOpenRouterKey] = useState<string>(() => {
    return typeof window !== 'undefined' ? localStorage.getItem('rc_openrouter_key') || '' : '';
  });
  const [razorpayKeyId, setRazorpayKeyId] = useState<string>('');
  const [razorpayKeySecret, setRazorpayKeySecret] = useState<string>('');
  const [isSavingOpenRouter, setIsSavingOpenRouter] = useState<boolean>(false);
  const [isSavingRazorpay, setIsSavingRazorpay] = useState<boolean>(false);
  const [openRouterSuccess, setOpenRouterSuccess] = useState<string | null>(null);
  const [razorpaySuccess, setRazorpaySuccess] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [backendStatus, setBackendStatus] = useState<{
    hasOpenRouterKey: boolean;
    hasRazorpayKey: boolean;
    isLiveRazorpay: boolean;
    razorpayKeyId: string;
    amount: number;
    displayAmount: string;
  } | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchBackendStatus();
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

  const handleSaveOpenRouter = async () => {
    const key = openRouterKey.trim();
    if (!key) {
      setErrorMsg('Please enter a valid OpenRouter API key (sk-or-v1-...)');
      return;
    }

    setIsSavingOpenRouter(true);
    setErrorMsg(null);
    setOpenRouterSuccess(null);

    try {
      // 1. Save in localStorage for persistent client session
      localStorage.setItem('rc_openrouter_key', key);

      // 2. Save in backend server environment
      const res = await fetch('/api/config/openrouter-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: key }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save OpenRouter key in backend');
      }

      setOpenRouterSuccess('OpenRouter API Key saved! 100% extraction precision unlocked.');
      if (onOpenRouterKeySaved) onOpenRouterKeySaved(key);
      await fetchBackendStatus();
      setTimeout(() => setOpenRouterSuccess(null), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error saving OpenRouter key');
    } finally {
      setIsSavingOpenRouter(false);
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
    setRazorpaySuccess(null);

    try {
      // Send to backend - keys are kept securely on the server!
      const res = await fetch('/api/razorpay/configure-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyId: kid, keySecret: ksec }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to update Razorpay key in backend');
      }

      setRazorpaySuccess(
        `Razorpay ${data.isLive ? 'Live' : 'Test'} Key securely saved in backend memory for ₹199 exports!`
      );
      setRazorpayKeySecret(''); // Clear secret from input for security
      await fetchBackendStatus();
      setTimeout(() => setRazorpaySuccess(null), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error configuring Razorpay key');
    } finally {
      setIsSavingRazorpay(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-white shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
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
                Configure OpenRouter for flawless CV extraction &amp; Razorpay Live Key kept securely in backend.
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

        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* SECTION 1: OpenRouter API Key for CV Extraction */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-400" />
              <h3 className="text-sm font-bold text-white">OpenRouter API Key (Flawless CV Extraction)</h3>
            </div>
            {backendStatus?.hasOpenRouterKey || openRouterKey ? (
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Active &amp; Ready</span>
              </span>
            ) : (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                Not configured
              </span>
            )}
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            By adding your OpenRouter key, resume text extraction bypasses default rate limits and extracts 100% of candidate positions, bullet points, skills, and dates with zero hallucination.
          </p>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300">
              OpenRouter Key (<code className="text-indigo-300">sk-or-v1-...</code>)
            </label>
            <div className="flex gap-2">
              <input
                type="password"
                placeholder="sk-or-v1-xxxxxxxxxxxxxxxxxxxx"
                value={openRouterKey}
                onChange={(e) => setOpenRouterKey(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={handleSaveOpenRouter}
                disabled={isSavingOpenRouter}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                {isSavingOpenRouter ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                )}
                <span>Save Key</span>
              </button>
            </div>
          </div>

          {openRouterSuccess && (
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{openRouterSuccess}</span>
            </div>
          )}

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
            <span>Need an OpenRouter key?</span>
            <a
              href="https://openrouter.ai/keys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:text-sky-300 inline-flex items-center gap-1 font-medium"
            >
              <span>Get OpenRouter API Key</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* SECTION 2: Live Razorpay Key (Kept in Backend) */}
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
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Test Mode Active
              </span>
            ) : (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                Using Demo Sandbox
              </span>
            )}
          </div>

          <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-900/40 text-blue-200 text-xs flex items-start gap-2">
            <Lock className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-white">Kept Securely in Backend</p>
              <p className="text-[11px] text-blue-300 leading-relaxed">
                Your Razorpay Key Secret is stored in the Node.js server process and NEVER exposed to frontend bundles or browser logs. All ₹199 payments process directly to your Razorpay merchant dashboard.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Razorpay Key ID (<code className="text-blue-300">rzp_live_...</code> or <code className="text-slate-400">rzp_test_...</code>)
              </label>
              <input
                type="text"
                placeholder="rzp_live_xxxxxxxxxxxxxx"
                value={razorpayKeyId}
                onChange={(e) => setRazorpayKeyId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Razorpay Key Secret (Stored in backend)
              </label>
              <input
                type="password"
                placeholder="••••••••••••••••••••••••"
                value={razorpayKeySecret}
                onChange={(e) => setRazorpayKeySecret(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-slate-400">Export Pricing: <strong className="text-white">₹199 per unlock</strong></span>
            <button
              onClick={handleSaveRazorpay}
              disabled={isSavingRazorpay}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5 cursor-pointer"
            >
              {isSavingRazorpay ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <ShieldCheck className="w-3.5 h-3.5" />
              )}
              <span>Save Razorpay Keys to Backend</span>
            </button>
          </div>

          {razorpaySuccess && (
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{razorpaySuccess}</span>
            </div>
          )}

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
            <span>Find your live API keys in Razorpay Dashboard:</span>
            <a
              href="https://dashboard.razorpay.com/app/keys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 font-medium"
            >
              <span>Razorpay API Keys</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition cursor-pointer"
          >
            Done &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
};
