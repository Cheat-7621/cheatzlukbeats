'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  songTitle: string;
  duration: string;
  audioUrl?: string;
  onClose?: () => void;
}

export function AudioPlayer({ songTitle, duration, audioUrl, onClose }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);

  // Parse duration string to seconds (e.g., "3 MINUTES 49 SECONDS" -> 229)
  const parseDuration = (durationStr: string): number => {
    const minutes = parseInt(durationStr.match(/(\d+)\s+MINUTES?/)?.[1] || '0');
    const seconds = parseInt(durationStr.match(/(\d+)\s+SECONDS?/)?.[1] || '0');
    return minutes * 60 + seconds;
  };

  useEffect(() => {
    setTotalTime(parseDuration(duration));
  }, [duration]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percentage = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = percentage * totalTime;
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border p-3 md:p-4 pb-safe">
      {/* Hidden audio element - streams preview audio */}
      <audio
        ref={audioRef}
        src={audioUrl || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'}
        onLoadedMetadata={(e) => {
          setTotalTime(e.currentTarget.duration);
        }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Song Info */}
        <div className="flex items-center justify-between mb-2 md:mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-xs md:text-sm font-bold text-foreground truncate">{songTitle}</h3>
            <p className="text-xs text-muted-foreground">Preview</p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="ml-2 md:ml-4 px-2 md:px-3 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
            >
              ✕
            </button>
          )}
        </div>

        {/* Progress Bar */}
        <div
          className="w-full h-1 md:h-1.5 bg-muted rounded-full cursor-pointer mb-2 md:mb-3 hover:h-1.5 md:hover:h-2 transition-all"
          onClick={handleProgressClick}
        >
          <div
            className="h-full bg-accent rounded-full transition-all"
            style={{ width: `${totalTime > 0 ? (currentTime / totalTime) * 100 : 0}%` }}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between gap-2 md:gap-4">
          <div className="flex items-center gap-2 md:gap-3">
            {/* Play/Pause */}
            <button
              onClick={togglePlayPause}
              className="p-1.5 md:p-2 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 transition-colors flex-shrink-0"
            >
              {isPlaying ? <Pause className="w-3 h-3 md:w-4 md:h-4" /> : <Play className="w-3 h-3 md:w-4 md:h-4 ml-0.5" />}
            </button>

            {/* Time Display */}
            <div className="flex items-center gap-0.5 md:gap-1 text-xs text-muted-foreground font-mono flex-shrink-0">
              <span>{formatTime(currentTime)}</span>
              <span>/</span>
              <span>{formatTime(totalTime)}</span>
            </div>
          </div>

          {/* Volume Control */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="p-1 rounded hover:bg-muted transition-colors flex-shrink-0"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-muted-foreground" />
              ) : (
                <Volume2 className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 rounded-full cursor-pointer accent-accent"
            />
          </div>

          {/* Mobile Volume Toggle Only */}
          <button
            onClick={toggleMute}
            className="md:hidden p-1.5 rounded hover:bg-muted transition-colors flex-shrink-0"
          >
            {isMuted ? (
              <VolumeX className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground" />
            ) : (
              <Volume2 className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
