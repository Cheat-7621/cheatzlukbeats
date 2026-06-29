'use client';
import { useState } from 'react';
import { Globe, User, LogIn, Music2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { AuthModal } from '@/components/AuthModal';
const TRANSLATIONS = {
  en: { brand: 'CHEATZLUKBEATS.ONLINE', login: 'LOG IN', langLabel: 'EN' },
  kh: { brand: 'ចេតស្លូកប៊ីត', login: 'ចូលគណនី', langLabel: 'ខ្មែរ' },
} as const;
type Lang = keyof typeof TRANSLATIONS;
export function Navbar() {
  const { user, userProfile } = useAuth();
  const [lang, setLang] = useState<Lang>('en');
  const [langOpen, setLangOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const t = TRANSLATIONS[lang];
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Koulen&display=swap" rel="stylesheet" />
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
          <a href="/" className="flex items-center gap-2 shrink min-w-0">
            <img 
  src="/icon.png" 
  alt="Music Icon" 
  className="w-[30px] h-[30px] hidden sm:block" 
/>
            <span className="font-black tracking-widest text-foreground text-[11px] sm:text-base font-mono whitespace-nowrap" style={lang === 'kh' ? { fontFamily: "'Koulen', sans-serif" } : {}}>{t.brand}</span>
          </a>
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <div className="relative">
              <button onClick={() => setLangOpen(!langOpen)} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-mono font-semibold tracking-widest text-muted-foreground hover:text-foreground hover:bg-accent transition-all border border-transparent hover:border-border">
                <Globe size={13} /><span>{t.langLabel}</span>
              </button>
              {langOpen && (
                <><div className="fixed inset-0 z-10" onClick={() => setLangOpen(false)} />
                <div className="absolute right-0 top-full mt-1 z-20 bg-background border border-border rounded-md shadow-lg overflow-hidden min-w-[130px]">
                  {(['en', 'kh'] as Lang[]).map((l) => (
                    <button key={l} onClick={() => { setLang(l); setLangOpen(false); }} className={`w-full text-left px-3 py-2 text-xs font-semibold tracking-wide transition-colors hover:bg-accent ${lang === l ? 'text-foreground bg-accent' : 'text-muted-foreground'}`}>
                      {l === 'en' ? '🇬🇧  English' : '🇰🇭  ភាសាខ្មែរ'}
                    </button>
                  ))}
                </div></>
              )}
            </div>
            <button onClick={() => setModalOpen(true)} className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-[10px] sm:text-xs font-mono font-bold tracking-widest transition-all whitespace-nowrap ${user ? 'border border-lime-400/40 text-lime-400 hover:bg-lime-400/10' : 'bg-foreground text-background hover:opacity-90'}`}>
              {user ? <><User size={12} /><span className="hidden sm:inline max-w-[80px] truncate">{userProfile?.displayName ?? user.displayName ?? 'USER'}</span></> : <><LogIn size={12} />{t.login}</>}
            </button>
          </div>
        </div>
      </nav>
      <div className="h-14 sm:h-16" />
      <AuthModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}