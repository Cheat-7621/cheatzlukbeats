'use client';
import { useState } from 'react';
import { User, LogIn } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { AuthModal } from '@/components/AuthModal';

export function Navbar() {
  const { user, userProfile } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Koulen&display=swap" rel="stylesheet" />
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
          <a href="/" className="flex items-center gap-2 shrink min-w-0">
            <img 
  src="/logo-gold.png" 
  alt="Music Icon" 
  className="w-[50px] h-[50px] hidden sm:block" 
/>
            <span className="font-black tracking-widest text-foreground text-sm sm:text-base font-mono whitespace-nowrap">CHEATZLUKBEATS.ONLINE</span>
          </a>
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button onClick={() => setModalOpen(true)} className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs font-mono font-bold tracking-widest transition-all whitespace-nowrap ${user ? 'border border-white text-white hover:bg-lime-400/10' : 'bg-foreground text-background hover:opacity-90'}`}>
              {user ? <><User size={12} /><span className="hidden sm:inline max-w-[80px] truncate">{userProfile?.displayName ?? user.displayName ?? 'USER'}</span></> : <><LogIn size={12} />LOG IN</>}
            </button>
          </div>
        </div>
      </nav>
      <div className="h-14 sm:h-16" />
      <AuthModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}