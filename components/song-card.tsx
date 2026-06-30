'use client';

import { Play, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface SongCardProps {
  id: string;
  number: string;
  title: string;
  releaseDate: string;
  type: string;
  duration: string;
  price: number;
  coverUrl: string;
  onPreview: (songId: string) => void;
  onPurchase: (songId: string) => void;
}

export function SongCard({
  id,
  number,
  title,
  releaseDate,
  type,
  duration,
  price,
  coverUrl,
  onPreview,
  onPurchase,
}: SongCardProps) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="flex items-center gap-3 sm:gap-4 lg:gap-4 px-3 py-3 sm:px-4 sm:py-4 lg:px-3 lg:py-7 bg-card rounded-lg border border-border hover:border-accent transition-all duration-300 group">
      {/* Album Cover */}
      <div
        className="relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-20 lg:h-20 rounded-lg overflow-hidden bg-gradient-to-br from-[#7700ff] to-[#ff4444] cursor-pointer"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => onPreview(id)}
      >
        <img src={coverUrl} alt={title} className="w-full h-full object-cover" />
        {isHovering && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Play className="w-5 h-5 sm:w-6 sm:h-6 lg:w-6 lg:h-6 text-accent fill-accent" />
          </div>
        )}
      </div>

      {/* Track Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-1.5 sm:gap-2 mb-1.5 sm:mb-1 lg:mb-1">
          <span className="text-[10px] sm:text-xs lg:text-xs font-bold text-muted-foreground flex-shrink-0 pt-0.5">{number}</span>
          <h3 className="text-sm sm:text-base lg:text-base font-bold text-foreground truncate lg:line-clamp-1 max-w-[160px] sm:max-w-[220px] lg:max-w-[260px]">{title}</h3>
        </div>
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-3">
          <div>
            <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-tight">Release</p>
            <p className="text-[11px] sm:text-xs lg:text-xs text-foreground font-medium truncate">{releaseDate}</p>
          </div>
          <div>
            <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-tight">Type</p>
            <p className="text-[11px] sm:text-xs lg:text-xs text-foreground font-medium truncate">{type}</p>
          </div>
          <div>
            <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-tight">Duration</p>
            <p className="text-[11px] sm:text-xs lg:text-xs text-foreground font-medium truncate">{duration}</p>
          </div>
          <div>
            <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-tight">Price</p>
            <p className="text-[11px] sm:text-xs lg:text-xs text-[#7700ff] font-bold">${price.toFixed(2)}</p>
          </div>
        </div>
        {/* Mobile compact view */}
        <div className="sm:hidden flex items-center gap-2 text-[10px]">
          <span className="text-muted-foreground">{releaseDate}</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-[#7700ff] font-bold">${price.toFixed(2)}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex-shrink-0 flex gap-1.5 sm:gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 sm:h-9 sm:w-9 lg:h-9 lg:w-9 rounded-full bg-muted hover:bg-accent hover:text-accent-foreground"
          onClick={() => onPreview(id)}
          title="Preview"
        >
          <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-4 lg:h-4" />
        </Button>
        <Button
          size="sm"
          className="gap-1 sm:gap-1.5 bg-[#7700ff] text-white hover:bg-[#7700ff]/90 h-8 sm:h-9 lg:h-9 px-2 sm:px-3 lg:px-4 text-xs sm:text-sm lg:text-sm"
          onClick={() => onPurchase(id)}
        >
          <ShoppingCart className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-3.5 lg:h-3.5" />
          <span className="hidden sm:inline">Buy</span>
          <span className="sm:hidden">Buy</span>
        </Button>
      </div>
    </div>
  );
}