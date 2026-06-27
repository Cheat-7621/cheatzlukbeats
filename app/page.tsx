'use client';

import { useState } from 'react';
import { HeroSection } from '@/components/hero-section';
import { SongCard } from '@/components/song-card';
import { PurchaseModal } from '@/components/purchase-modal';
import { AudioPlayer } from '@/components/audio-player';

const MOCK_SONGS = [
    {
    id: '004',
    number: '004',
    title: 'FREE - BEAT (2)',
    releaseDate: 'JUNE 2026',
    type: 'SINGLE, 1 SONG',
    duration: '4 MINUTES 15 SECONDS',
    price: 0.25,
    coverUrl: '/cover-2.png',
    audioUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%28FREE%29%20-%20BEAT%20%282%29-EJPRlTwphRPZf8tOj91GEbv6s3bSx9.mp3',
  },
  {
    id: '003',
    number: '003',
    title: 'FREE - BEAT (2)',
    releaseDate: 'JUNE 2026',
    type: 'SINGLE, 1 SONG',
    duration: '4 MINUTES 15 SECONDS',
    price: 0.25,
    coverUrl: '/cover-2.png',
    audioUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%28FREE%29%20-%20BEAT%20%282%29-EJPRlTwphRPZf8tOj91GEbv6s3bSx9.mp3',
  },
  {
    id: '002',
    number: '002',
    title: 'FREE - BEAT (1)',
    releaseDate: 'JUNE 2026',
    type: 'SINGLE, 1 SONG',
    duration: '4 MINUTES 30 SECONDS',
    price: 1.99,
    coverUrl: '/cover-2.png',
    audioUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%28FREE%29%20-%20BEAT%20%281%29-rY4wmC2jslvjIMoGJST8t234qtKxMs.mp3',
  },
  {
    id: '001',
    number: '001',
    title: 'FREE - BEAT',
    releaseDate: 'JUNE 2026',
    type: 'SINGLE, 1 SONG',
    duration: '3 MINUTES 45 SECONDS',
    price: 1.99,
    coverUrl: '/cover-2.png',
    audioUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%28FREE%29%20-%20BEAT-HcPNweCb5cp85jNPTk9Bc1AnArEAWY.mp3',
  },
];

const FOOTER_INFO = [
  {
    title: 'About SoundMarket',
    body: 'Your gateway to premium digital music with secure ABA payments for Cambodia.',
  },
  {
    title: 'Payment',
    body: 'We support ABA Mobile Banking with instant QR code payment processing.',
  },
  {
    title: 'Support',
    body: 'For issues or questions, contact support@soundmarket.kh',
  },
];

export default function Home() {
  const [selectedSong, setSelectedSong] = useState<(typeof MOCK_SONGS)[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playingSongId, setPlayingSongId] = useState<string | null>(null);

  const playingSong = MOCK_SONGS.find((s) => s.id === playingSongId) ?? null;

  const handlePreview = (songId: string) => {
    setPlayingSongId(songId);
  };

  const handlePurchase = (songId: string) => {
    const song = MOCK_SONGS.find((s) => s.id === songId);
    if (song) {
      setSelectedSong(song);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSong(null);
  };

  return (
    <main className="min-h-screen bg-background">
      <HeroSection />

      <section className="py-6 sm:py-12 lg:py-20 px-3 sm:px-4 lg:px-6 pb-24 sm:pb-20 lg:pb-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6 lg:mb-8 text-balance">
            Featured Tracks
          </h2>

          <div className="space-y-2 sm:space-y-3 lg:space-y-4">
            {MOCK_SONGS.map((song) => (
              <SongCard
                key={song.id}
                {...song}
                onPreview={handlePreview}
                onPurchase={handlePurchase}
              />
            ))}
          </div>

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