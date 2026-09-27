export interface ApiCallCounts {
  total: number;
  openai: number;
  groq: number;
  openrouter: number;
  gemini: number;
  extractions: number;
  enhancements: number;
  lastUsedProvider: string;
  lastUsedTimestamp: number;
}

const STORAGE_KEY = 'rc_api_counter';

const DEFAULT_COUNTS: ApiCallCounts = {
  total: 0,
  openai: 0,
  groq: 0,
  openrouter: 0,
  gemini: 0,
  extractions: 0,
  enhancements: 0,
  lastUsedProvider: 'none',
  lastUsedTimestamp: Date.now(),
};

export function getApiCounts(): ApiCallCounts {
  if (typeof window === 'undefined') return DEFAULT_COUNTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_COUNTS;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_COUNTS, ...parsed };
  } catch (e) {
    return DEFAULT_COUNTS;
  }
}

export function incrementApiCount(
  provider: string = 'gemini',
  type: 'extraction' | 'enhancement' | 'chat' | 'other' = 'other'
): ApiCallCounts {
  if (typeof window === 'undefined') return DEFAULT_COUNTS;

  const current = getApiCounts();
  const prov = provider.toLowerCase();

  const updated: ApiCallCounts = {
    ...current,
    total: current.total + 1,
    openai: prov.includes('openai') ? current.openai + 1 : current.openai,
    groq: prov.includes('groq') ? current.groq + 1 : current.groq,
    openrouter: prov.includes('openrouter') ? current.openrouter + 1 : current.openrouter,
    gemini: prov.includes('gemini') || (!prov.includes('openai') && !prov.includes('groq') && !prov.includes('openrouter')) ? current.gemini + 1 : current.gemini,
    extractions: type === 'extraction' ? current.extractions + 1 : current.extractions,
    enhancements: type === 'enhancement' ? current.enhancements + 1 : current.enhancements,
    lastUsedProvider: prov,
    lastUsedTimestamp: Date.now(),
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('rc-api-count-updated', { detail: updated }));
  } catch (e) {}

  return updated;
}

export function resetApiCounts(): ApiCallCounts {
  if (typeof window === 'undefined') return DEFAULT_COUNTS;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_COUNTS));
    window.dispatchEvent(new CustomEvent('rc-api-count-updated', { detail: DEFAULT_COUNTS }));
  } catch (e) {}
  return DEFAULT_COUNTS;
}
