'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, User, LogIn } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { AuthModal } from '@/components/AuthModal';

export function Navbar() {
  const { user, userProfile } = useAuth();
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    setSearchOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
          <a href="/" className="flex items-center gap-2 min-w-0 flex-1">
            <img
              src="/icon.png"
              alt="Music Icon"
              className="w-[30px] h-[30px] hidden sm:block shrink-0"
            />
            <span className="font-black tracking-widest text-foreground text-sm sm:text-base font-mono truncate">
              CHEATZLUKBEATS.ONLINE
            </span>
          </a>

          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <div className="relative">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search beats"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-mono font-semibold tracking-widest text-muted-foreground hover:text-foreground hover:bg-accent transition-all border border-transparent hover:border-border"
              >
                <Search size={14} />
              </button>
              {searchOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setSearchOpen(false)} />
                  <form
                    onSubmit={handleSearch}
                    className="absolute right-0 top-full mt-1 z-20 bg-background border border-border rounded-md shadow-lg overflow-hidden w-56 sm:w-64 flex items-center"
                  >
                    <Search size={14} className="ml-3 text-muted-foreground shrink-0" />
                    <input
                      autoFocus
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search beats..."
                      className="w-full bg-transparent px-2 py-2.5 text-xs font-mono text-foreground placeholder:text-muted-foreground outline-none"
                    />
                  </form>
                </>
              )}
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs font-mono font-bold tracking-widest transition-all whitespace-nowrap ${user ? 'border border-lime-400/40 text-lime-400 hover:bg-lime-400/10' : 'bg-foreground text-background hover:opacity-90'}`}
            >
              {user ? (
                <>
                  <User size={12} />
                  <span className="hidden sm:inline max-w-[80px] truncate">{userProfile?.displayName ?? user.displayName ?? 'USER'}</span>
                </>
              ) : (
                <>
                  <LogIn size={12} />LOG IN
                </>
              )}
            </button>
          </div>
        </div>
      </nav>
      <div className="h-14 sm:h-16" />
      <AuthModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}