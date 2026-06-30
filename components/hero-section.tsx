'use client';

import { useEffect, useRef } from 'react';
import { Music } from 'lucide-react';

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const bars = 60;
    const barWidth = width / bars;
    let frame = 0;
    let raf: number;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < bars; i++) {
       const amplitude = Math.sin(i * 0.3 - frame * 0.05) * 0.5 + 0.5;
        const barHeight = amplitude * height * 0.8 + height * 0.1;
        const x = i * barWidth;
        const y = (height - barHeight) / 2;

        ctx.fillStyle = i % 2 === 0 ? '#eff4f6' : '#f1f1f0';
        ctx.globalAlpha = 0.7 + amplitude * 0.3;
        ctx.fillRect(x + 2, y, barWidth - 4, barHeight);
      }

      frame++;
      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Koulen&display=swap" rel="stylesheet" />

      <section className="w-full bg-gradient-to-b from-[#7700ff] via-[#6600dd] to-[#0f0f0f] py-8 sm:py-16 lg:py-24 px-3 sm:px-4 lg:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 sm:mb-10 lg:mb-12">
            <h1
              style={{ fontFamily: 'Koulen, sans-serif' }}
              className="text-3xl sm:text-4xl lg:text-7xl font-normal text-white mb-2 sm:mb-3 lg:mb-4 text-balance leading-tight tracking-wide flex items-center justify-center gap-2 sm:gap-3 lg:gap-4"
            >
              <Music className="w-7 h-7 sm:w-9 sm:h-9 lg:w-14 lg:h-14" />ជាតិហ្សុីលក់ "BEATS"<Music className="w-7 h-7 sm:w-9 sm:h-9 lg:w-14 lg:h-14" />
            </h1>
            <p className="text-sm sm:text-base lg:text-xl text-gray-200 text-balance px-1 sm:px-2">
              Music is emotion, songs are stories - Music may have no words, yet it can express every emotion - A single song can change a person’s feelings.
            </p>
          </div>



          <div className="relative z-10 scale-50 sm:scale-75 lg:scale-100 origin-top">
            <canvas
              ref={canvasRef}
              width={900}
              height={120}
              className="w-full max-w-4xl mx-auto h-24 sm:h-28 lg:h-32"
            />
          </div>

          <div className="mt-6 sm:mt-10 lg:mt-12 grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6">
            <div className="text-center p-1.5 sm:p-4 lg:p-0">
              <div className="text-base sm:text-2xl lg:text-4xl font-bold text-[#FFD700] mb-1 lg:mb-2 whitespace-nowrap">
                100+
              </div>
              <p className="text-[10px] sm:text-sm lg:text-base text-gray-300 leading-tight">
              Tracks
              </p>
            </div>
            <div className="text-center p-1.5 sm:p-4 lg:p-0">
              <div className="text-base sm:text-2xl lg:text-4xl font-bold text-[#FFD700] mb-1 lg:mb-2 whitespace-nowrap">
                High Quality
              </div>
              <p className="text-[10px] sm:text-sm lg:text-base text-gray-300 leading-tight">
               Audio
              </p>
            </div>
            <div className="text-center p-1.5 sm:p-4 lg:p-0">
              <div className="text-base sm:text-2xl lg:text-4xl font-bold text-[#FFD700] mb-1 lg:mb-2 whitespace-nowrap">
               QR
              </div>
              <p className="text-[10px] sm:text-sm lg:text-base text-gray-300 leading-tight">
                Easy Payment
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}