'use client';
import { useState } from 'react';
import { X, LogIn, UserPlus, LogOut, User, Mail, Lock, Eye, EyeOff, Music2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
type Tab = 'login' | 'register';
interface AuthModalProps { isOpen: boolean; onClose: () => void; }
export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { user, userProfile, login, register, logout } = useAuth();
  const [tab, setTab] = useState<Tab>('login');
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  if (!isOpen) return null;
  const resetForm = () => { setEmail(''); setPassword(''); setDisplayName(''); setError(''); };
  const handleSubmit = async () => {
    setError(''); setBusy(true);
    try {
      if (tab === 'login') { await login(email, password); }
      else { if (!displayName.trim()) { setError('សូមបញ្ចូលឈ្មោះ'); setBusy(false); return; } await register(email, password, displayName); }
      resetForm(); onClose();
    } catch (e: unknown) {
      const msg = (e as { code?: string })?.code ?? '';
      if (msg === 'auth/user-not-found' || msg === 'auth/wrong-password' || msg === 'auth/invalid-credential') setError('អ៊ីមែល ឬ លេខសម្ងាត់មិនត្រឹមត្រូវ');
      else if (msg === 'auth/email-already-in-use') setError('អ៊ីមែលនេះបានប្រើប្រាស់រួចហើយ');
      else if (msg === 'auth/weak-password') setError('លេខសម្ងាត់ត្រូវតែ ៦ តួអក្សរ ឬ លើសជាង');
      else setError('មានបញ្ហា សូមព្យាយាមម្តងទៀត');
    }
    setBusy(false);
  };
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Koulen&display=swap" rel="stylesheet" />
      <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-sm bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
          <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-zinc-800">
            <div className="flex items-center gap-2"><Music2 size={16} style={{ color: '#7700ff' }} /><span className="font-mono font-black tracking-widest text-sm text-white">CHEATZLUKBEATS</span></div>
            <button onClick={onClose} className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors"><X size={16} /></button>
          </div>
          {user ? (
            <div className="px-5 py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-lime-400/10 border border-lime-400/30 flex items-center justify-center mx-auto"><User size={28} style={{ color: '#7700ff' }} /></div>
              <div><p className="font-bold text-white text-base">{userProfile?.displayName ?? user.displayName ?? 'User'}</p><p className="text-xs text-zinc-400 mt-0.5">{user.email}</p></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-zinc-900 rounded-xl p-3 border border-zinc-800"><p className="text-xl font-black" style={{ color: '#7700ff' }}>{userProfile?.purchases?.length ?? 0}</p><p className="text-[10px] text-zinc-500 font-mono mt-0.5">BEATS PURCHASED</p></div>
                <div className="bg-zinc-900 rounded-xl p-3 border border-zinc-800"><p className="text-xl font-black text-white">PRO</p><p className="text-[10px] text-zinc-500 font-mono mt-0.5">LICENSE TYPE</p></div>
              </div>
              <button onClick={async () => { await logout(); onClose(); }} className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-mono font-bold tracking-widest transition-colors border border-zinc-700"><LogOut size={14} />LOG OUT</button>
            </div>
          ) : (
            <div className="px-5 py-5">
              <div className="flex rounded-xl bg-zinc-900 p-1 mb-5">
                {(['login', 'register'] as Tab[]).map((t) => (
                  <button key={t} onClick={() => { setTab(t); resetForm(); }} className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-mono font-bold tracking-widest transition-all ${tab === t ? 'bg-lime-400 text-black' : 'text-zinc-400 hover:text-white'}`}>
                    {t === 'login' ? <><LogIn size={12} />LOG IN</> : <><UserPlus size={12} />REGISTER</>}
                  </button>
                ))}
              </div>
              <div className="space-y-3">
                {tab === 'register' && (
                  <div className="relative"><User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" /><input type="text" placeholder="ឈ្មោះ" value={displayName} onChange={e => setDisplayName(e.target.value)} className="w-full pl-9 pr-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-white placeholder:text-zinc-500 focus:outline-none transition-colors" style={{ fontFamily: "'Koulen', sans-serif" }} onFocus={e => e.currentTarget.style.borderColor = '#7700ff'} onBlur={e => e.currentTarget.style.borderColor = ''} /></div>
                )}
                <div className="relative"><Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" /><input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-9 pr-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-white placeholder:text-zinc-500 focus:outline-none transition-colors font-mono" onFocus={e => e.currentTarget.style.borderColor = '#7700ff'} onBlur={e => e.currentTarget.style.borderColor = ''} /></div>
                <div className="relative"><Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" /><input type={showPass ? 'text' : 'password'} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSubmit()} className="w-full pl-9 pr-10 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-white placeholder:text-zinc-500 focus:outline-none transition-colors font-mono" onFocus={e => e.currentTarget.style.borderColor = '#7700ff'} onBlur={e => e.currentTarget.style.borderColor = ''} /><button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white">{showPass ? <EyeOff size={14} /> : <Eye size={14} />}</button></div>
                {error && <p className="text-red-400 text-xs text-center py-2 px-3 bg-red-400/10 rounded-lg border border-red-400/20" style={{ fontFamily: "'Koulen', sans-serif" }}>{error}</p>}
                <button onClick={handleSubmit} disabled={busy} className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl hover:opacity-90 text-black text-sm font-mono font-black tracking-widest transition-colors disabled:opacity-50 mt-1" style={{ backgroundColor: '#7700ff' }}>
                  {busy ? <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> : tab === 'login' ? <><LogIn size={14} />LOG IN</> : <><UserPlus size={14} />CREATE ACCOUNT</>}
                </button>
              </div>
              <p className="text-center text-xs text-zinc-600 mt-4 font-mono">{tab === 'login' ? "Don't have an account? " : 'Already have an account? '}<button onClick={() => { setTab(tab === 'login' ? 'register' : 'login'); resetForm(); }} className="hover:underline" style={{ color: '#7700ff' }}>{tab === 'login' ? 'Register' : 'Log in'}</button></p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}