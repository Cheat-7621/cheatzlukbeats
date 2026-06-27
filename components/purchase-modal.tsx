'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PurchaseModalProps {
  isOpen: boolean;
  song: {
    id: string;
    title: string;
    price: number;
    artist: string;
  } | null;
  onClose: () => void;
}

export function PurchaseModal({ isOpen, song, onClose }: PurchaseModalProps) {
  const [copying, setCopying] = useState(false);
  const [qrError, setQrError] = useState(false);

  if (!isOpen || !song) return null;

  const handleCopyReference = () => {
    const reference = `SOUNDMARKET-${song.id.toUpperCase()}-${Date.now()}`;
    navigator.clipboard.writeText(reference);
    setCopying(true);
    setTimeout(() => setCopying(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end md:items-center justify-center p-4">
      <div className="bg-card border border-border rounded-t-lg md:rounded-lg max-w-md w-full p-4 md:p-6 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 md:top-4 right-3 md:right-4 p-1 hover:bg-muted rounded-lg transition-colors"
        >
          <X className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
        </button>

        {/* Header */}
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-1 md:mb-2 pr-8">Complete Purchase</h2>
        <p className="text-xs md:text-sm text-muted-foreground mb-4 md:mb-6">Scan with ABA Mobile Banking</p>

        {/* Song Info */}
        <div className="bg-muted rounded-lg p-3 md:p-4 mb-4 md:mb-6">
          <p className="text-xs md:text-sm text-muted-foreground mb-1">Song</p>
          <h3 className="text-base md:text-lg font-bold text-foreground mb-2 md:mb-3 line-clamp-2">{song.title}</h3>
          <div className="flex justify-between items-center gap-2">
            <span className="text-xs md:text-sm text-muted-foreground">Amount to pay:</span>
            <span className="text-xl md:text-2xl font-bold text-accent text-white">${song.price.toFixed(2)}</span>
          </div>
        </div>

        {/* QR Code - custom static image, safe fallback */}
        <div className="flex justify-center mb-4 md:mb-6">
          {!qrError ? (
            <img
              src="/yuongsocheat_qr.jpg"
              alt="ABA QR Code"
              className="w-48 h-48 md:w-64 md:h-64 rounded-lg object-contain bg-white"
              onError={() => setQrError(true)}
            />
          ) : (
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-lg bg-white flex items-center justify-center text-xs text-muted-foreground p-4 text-center">
              QR code unavailable. Please pay using the reference number below.
            </div>
          )}
        </div>

        {/* Reference Number */}
        <div className="bg-muted rounded-lg p-3 md:p-4 mb-4 md:mb-6">
          <p className="text-xs md:text-xs text-muted-foreground mb-2">Reference Number (Send with payment):</p>
          <div className="flex gap-2">
            <code className="flex-1 text-xs md:text-sm font-mono bg-background p-2 rounded text-accent break-all">
              SOUNDMARKET-{song.id.toUpperCase()}
            </code>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyReference}
              className="flex-shrink-0 text-xs md:text-sm px-2 md:px-3"
            >
              {copying ? 'Copied!' : 'Copy'}
            </Button>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-muted rounded-lg p-3 md:p-4 mb-4 md:mb-6 text-xs md:text-sm text-muted-foreground">
          <ol className="list-decimal list-inside space-y-1 md:space-y-2">
            <li>Open ABA Mobile Banking app</li>
            <li>Tap QR Code to scan this code</li>
            <li>Confirm payment details and proceed</li>
            <li>Include reference number in payment note</li>
            <li>Your song will download after payment confirms</li>
          </ol>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 md:gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1 text-xs md:text-sm">
            Cancel
          </Button>
          <Button
            onClick={onClose}
            className="flex-1 text-xs md:text-sm bg-accent text-accent-foreground hover:bg-accent/90"
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}