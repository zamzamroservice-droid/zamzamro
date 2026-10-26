import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { dict, type DictKey } from './dict';
import type { Lang } from '../data/products';

interface LangContext {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  /** Translate a dictionary key. `{name}` placeholders are filled from `vars`. */
  t: (key: DictKey, vars?: Record<string, string | number>) => string;
}

const Ctx = createContext<LangContext | null>(null);
const STORAGE_KEY = 'zz-lang';

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'ta') return saved;
  } catch {
    /* storage unavailable */
  }
  return 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang === 'ta' ? 'ta-IN' : 'en-IN';
    document.documentElement.dataset.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const toggle = useCallback(() => setLangState((l) => (l === 'en' ? 'ta' : 'en')), []);
  const t = useCallback(
    (key: DictKey, vars?: Record<string, string | number>) => {
      let s: string = dict[lang][key] ?? dict.en[key];
      if (vars) for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, String(v));
      return s;
    },
    [lang],
  );

  const value = useMemo(() => ({ lang, setLang, toggle, t }), [lang, setLang, toggle, t]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLang() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>');
  return ctx;
}
