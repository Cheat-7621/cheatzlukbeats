'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/hero-section';
import { PaymentMethods } from '@/components/payment-methods';
import { SongCard } from '@/components/song-card';
import { PurchaseModal } from '@/components/purchase-modal';
import { AudioPlayer } from '@/components/audio-player';
import { MOCK_SONGS } from '@/lib/songs';

const FOOTER_INFO = [
  {
    title: 'About Cheatzlukbeats',
    body: 'Elevate your sound with premium digital music. Fast, secure, and built for Cambodia\'s digital wallet ecosystem.',
  },
  {
    title: 'Payment',
    body: 'Scan one QR for all banks, including ABA, ACLEDA, and other institutions.',
  },
  {
    title: 'Support',
    body: 'For issues or questions, contact support@ysccheatz',
  },
];

// ចំនួន Card ដែលបង្ហាញម្ដងៗពេល Scroll (Infinite Scroll Page Size)
const PAGE_SIZE = 10;
// រយៈពេល Loading UI បង្ហាញ (ms) មុននឹង Card ១០បន្ថែមលេចឡើង
const LOADING_DELAY = 800;

export default function Home() {
  const [selectedSong, setSelectedSong] = useState<(typeof MOCK_SONGS)[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playingSongId, setPlayingSongId] = useState<string | null>(null);

  // ចំនួន Card ដែលកំពុងបង្ហាញ (ចាប់ផ្ដើម 10)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  // State គ្រប់គ្រង Spinner "Loading..." ខាងក្រោម Card ចំនួន 10
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Ref សម្រាប់ Sentinel div (មើលមិនឃើញ) ដែល IntersectionObserver Watch
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const visibleSongs = MOCK_SONGS.slice(0, visibleCount);
  const hasMore = visibleCount < MOCK_SONGS.length;

  const playingSong = MOCK_SONGS.find((s) => s.id === playingSongId) ?? null;

  // ពេល Sentinel (នៅខាងក្រោម Card ចុងក្រោយ) លេចចូល Viewport -> ចាប់ Loading
  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore) {
          setIsLoadingMore(true);
        }
      },
      { threshold: 0.1 } // Trigger ពេល Sentinel ចូល Viewport ពិតប្រាកដ
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [hasMore, isLoadingMore]);

  // ពេល isLoadingMore = true -> បង្ហាញ Spinner LOADING_DELAY ms រួចបន្ថែម Card 10
  useEffect(() => {
    if (!isLoadingMore) return;

    const timer = setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, MOCK_SONGS.length));
      setIsLoadingMore(false);
    }, LOADING_DELAY);

    return () => clearTimeout(timer);
  }, [isLoadingMore]);

  const handlePreview = useCallback((songId: string) => {
    setPlayingSongId(songId);
  }, []);

  const handlePurchase = useCallback((songId: string) => {
    const song = MOCK_SONGS.find((s) => s.id === songId);
    if (song) {
      setSelectedSong(song);
      setIsModalOpen(true);
    }
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSong(null);
  };

  return (
    <main className="min-h-screen bg-background">
       <Navbar />
      <HeroSection />
      <PaymentMethods />

      <section className="py-6 sm:py-12 lg:py-20 px-3 sm:px-4 lg:px-3 pb-24 sm:pb-20 lg:pb-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6 lg:mb-8 text-balance">
            ARCHIVE RESOURCES
          </h2>

          <div className="space-y-2 sm:space-y-3 lg:space-y-4">
            {visibleSongs.map((song) => (
              <SongCard
                key={song.id}
                {...song}
                onPreview={handlePreview}
                onPurchase={handlePurchase}
              />
            ))}
          </div>

          {/* Sentinel (មើលមិនឃើញ, ខ្នាត 1px) — តាំងនៅខាងក្រោម Card ចុងក្រោយ ដើម្បីឲ្យ Observer ចាប់ Scroll */}
          {hasMore && <div ref={loaderRef} className="h-1 w-full" />}

          {/* Loading UI — បង្ហាញនៅខាងក្រោម Card ចំនួន 10 ពេល isLoadingMore = true */}
          {isLoadingMore && (
            <div className="flex flex-col items-center justify-center gap-2 py-8">
              <div className="h-6 w-6 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin" />
              <span className="text-xs sm:text-sm text-muted-foreground">Loading...</span>
            </div>
          )}

          {/* Footer Info */}
          <div className="mt-8 sm:mt-12 lg:mt-16 pt-4 sm:pt-6 lg:pt-8 border-t border-border">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-8">
              {FOOTER_INFO.map((item) => (
                <div key={item.title}>
                  <h3 className="font-bold text-foreground mb-1 sm:mb-2 text-xs sm:text-sm lg:text-base">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs lg:text-sm text-muted-foreground leading-relaxed">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PurchaseModal
        isOpen={isModalOpen}
        song={
          selectedSong
            ? {
                id: selectedSong.id,
                title: selectedSong.title,
                price: selectedSong.price,
                artist: 'SoundMarket Artist',
              }
            : null
        }
        onClose={handleCloseModal}
      />

      {playingSong && (
        <AudioPlayer
          songTitle={playingSong.title}
          duration={playingSong.duration}
          audioUrl={playingSong.audioUrl}
          onClose={() => setPlayingSongId(null)}
        />
      )}
    </main>
  );
}