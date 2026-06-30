'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/hero-section';
import { PaymentMethods } from '@/components/payment-methods';
import { SongCard } from '@/components/song-card';
import { PurchaseModal } from '@/components/purchase-modal';
import { AudioPlayer } from '@/components/audio-player';

// ការប្រើប្រាស់ Path ផ្ទាល់ពី public/music/
const MOCK_SONGS = [
   
  // ALBUMS-1
  {
    id: '001',
    number: '001',
    title: 'BEAT (1)',
    releaseDate: 'High Quality',
    type: 'SINGLE, 1 SONG',
    duration: '3 MINUTES 45 SECONDS',
    price: 0.25,
    coverUrl: '/lg1.png',
    audioUrl: '/music/beat-1.mp3', // ត្រូវប្រាកដថាឈ្មោះ File ក្នុង Folder ត្រូវគ្នា
  },
    {
    id: '002',
    number: '002',
    title: 'BEAT (2)',
    releaseDate: 'High Quality',
    type: 'SINGLE, 1 SONG',
    duration: '4 MINUTES 20 SECONDS',
    price: 0.25,
    coverUrl: '/lg1.png',
    audioUrl: '/music/beat-2.mp3', 
  },
      {
    id: '003',
    number: '003',
    title: 'BEAT (3)',
    releaseDate: 'High Quality',
    type: 'SINGLE, 1 SONG',
    duration: '4 MINUTES 20 SECONDS',
    price: 0.25,
    coverUrl: '/lg1.png',
    audioUrl: '/music/beat-3.mp3', 
  },
        {
    id: '004',
    number: '004',
    title: 'BEAT (4)',
    releaseDate: 'JHigh Quality',
    type: 'SINGLE, 1 SONG',
    duration: '3 MINUTES 18 SECONDS',
    price: 0.25,
    coverUrl: '/lg1.png',
    audioUrl: '/music/beat-4.mp3', 
  },

   // ALBUMS-2
  {
    id: '005',
    number: '005',
    title: 'BEAT (5)',
    releaseDate: 'High Quality',
    type: 'SINGLE, 1 SONG',
    duration: '4 MINUTES 27 SECONDS',
    price: 0.25,
    coverUrl: '/lg2.png',
    audioUrl: '/music/beat-5.mp3', 
  },
    {
    id: '006',
    number: '006',
    title: 'BEAT (6)',
    releaseDate: 'High Quality',
    type: 'SINGLE, 1 SONG',
    duration: '4 MINUTES 22 SECONDS',
    price: 0.25,
    coverUrl: '/lg2.png',
    audioUrl: '/music/beat-6.mp3', 
  },
      {
    id: '007',
    number: '007',
    title: 'BEAT (7)',
    releaseDate: 'High Quality',
    type: 'SINGLE, 1 SONG',
    duration: '4 MINUTES 10 SECONDS',
    price: 0.25,
    coverUrl: '/lg2.png',
    audioUrl: '/music/beat-7.mp3', 
  },
        {
    id: '008',
    number: '008',
    title: 'BEAT (8)',
    releaseDate: 'High Quality',
    type: 'SINGLE, 1 SONG',
    duration: '4 MINUTES 14 SECONDS',
    price: 0.25,
    coverUrl: '/lg2.png',
    audioUrl: '/music/beat-8.mp3', 
  },
  {
    id: '009',
    number: '009',
    title: 'BEAT (9)',
    releaseDate: 'High Quality',
    type: 'SINGLE, 1 SONG',
    duration: '5 MINUTES 00 SECONDS',
    price: 0.00,
    coverUrl: '/lg2.png',
    audioUrl: '/music/beat-9.mp3', 
  },

  // ALBUMS-3
  {
    id: '010',
    number: '010',
    title: 'BEAT (10)-(COMING SOON!)',
    releaseDate: 'High Quality',
    type: 'SINGLE, 1 SONG',
    duration: '0 MINUTES 00 SECONDS',
    price: 0.99,
    coverUrl: '/logo-gold.png',
    audioUrl: '/music/beat-10.mp3', 
  },
    {
    id: '011',
    number: '011',
    title: 'BEAT (11)-(COMING SOON!)',
    releaseDate: 'High Quality',
    type: 'SINGLE, 1 SONG',
    duration: '0 MINUTES 00 SECONDS',
    price: 0.99,
    coverUrl: '/logo-red.png',
    audioUrl: '/music/beat-11.mp3', 
  },
    {
    id: '012',
    number: '012',
    title: 'BEAT (12)-(COMING SOON!)',
    releaseDate: 'High Quality',
    type: 'SINGLE, 1 SONG',
    duration: '0 MINUTES 00 SECONDS',
    price: 0.99,
    coverUrl: '/logo-or.png',
    audioUrl: '/music/beat-12.mp3', 
  },
    {
    id: '013',
    number: '013',
    title: 'BEAT (13)-(COMING SOON!)',
    releaseDate: 'High Quality',
    type: 'SINGLE, 1 SONG',
    duration: '0 MINUTES 00 SECONDS',
    price: 0.99,
    coverUrl: '/logo-tikbrak.png',
    audioUrl: '/music/beat-13.mp3', 
  },
  
    {
    id: '014',
    number: '014',
    title: 'BEAT (14)-(COMING SOON!)',
    releaseDate: 'High Quality',
    type: 'SINGLE, 1 SONG',
    duration: '0 MINUTES 00 SECONDS',
    price: 0.99,
    coverUrl: '/logo-slear.png',
    audioUrl: '/music/beat-14.mp3', 
  },
    {
    id: '015',
    number: '015',
    title: 'BEAT (15)-(COMING SOON!)',
    releaseDate: 'High Quality',
    type: 'SINGLE, 1 SONG',
    duration: '0 MINUTES 00 SECONDS',
    price: 0.99,
    coverUrl: '/icon.png',
    audioUrl: '/music/beat-15.mp3', 
  },
    {
    id: '016',
    number: '016',
    title: 'BEAT (16)-(COMING SOON!)',
    releaseDate: 'High Quality',
    type: 'SINGLE, 1 SONG',
    duration: '0 MINUTES 00 SECONDS',
    price: 0.99,
    coverUrl: '/logo-gold.png',
    audioUrl: '/music/beat-16.mp3', 
  },
    {
    id: '017',
    number: '017',
    title: 'BEAT (17)-(COMING SOON!)',
    releaseDate: 'High Quality',
    type: 'SINGLE, 1 SONG',
    duration: '0 MINUTES 00 SECONDS',
    price: 0.99,
    coverUrl: '/logo-gold.png',
    audioUrl: '/music/beat-17.mp3', 
  },
  
];

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