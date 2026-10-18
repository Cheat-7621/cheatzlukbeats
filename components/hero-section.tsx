'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const SOCIALS = [
  // { label: 'Facebook', href: '' },
  // { label: 'Instagram', href: '' },
  { label: 'Telegram', href: 'https://t.me/ysccheatz' },
  { label: 'YouTube', href: 'https://www.youtube.com/@Cheatmashup' },
];

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

        ctx.fillStyle = i % 2 === 0 ? '#111111' : '#3a3a3a';
        ctx.globalAlpha = 0.55 + amplitude * 0.45;
        ctx.fillRect(x + 2, y, barWidth - 4, barHeight);
      }

      frame++;
      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  const display = { fontFamily: "'Archivo', 'Koulen', sans-serif", fontStretch: '125%' } as const;
  const body = { fontFamily: "'Outfit', 'Koulen', sans-serif" } as const;

  // Same look as desktop, scaled by viewport width
  const corner = { ...display, fontSize: 'clamp(0.8rem, 3.6vw, 2.25rem)' } as const;
  const sidePad = 'clamp(1.25rem, 6vw, 6rem)';

  const fadeMask =
    'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 45%, rgba(0,0,0,0.5) 72%, rgba(0,0,0,0) 100%)';
  const sideMask =
    'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 82%, rgba(0,0,0,0) 100%)';

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=Outfit:wght@300;400;500&family=Koulen&display=swap"
        rel="stylesheet"
      />

      <style>{`
        @keyframes mistDriftA {
          0%   { transform: translateX(-4%) scale(1); opacity: .55; }
          50%  { transform: translateX(4%) scale(1.08); opacity: .8; }
          100% { transform: translateX(-4%) scale(1); opacity: .55; }
        }
        @keyframes mistDriftB {
          0%   { transform: translateX(5%) scale(1.05); opacity: .6; }
          50%  { transform: translateX(-5%) scale(1); opacity: .85; }
          100% { transform: translateX(5%) scale(1.05); opacity: .6; }
        }
        @keyframes templeFloat {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-6px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .mist-a, .mist-b, .temple-float { animation: none !important; }
        }
      `}</style>

      <section
        className="relative w-full flex flex-col justify-between gap-4 sm:gap-0 min-h-0 sm:min-h-[100svh] overflow-hidden text-[#111]"
        style={{
          background: '#ffffff',
          paddingLeft: sidePad,
          paddingRight: sidePad,
          paddingTop: 'clamp(1rem, 4vw, 4rem)',
          paddingBottom: 'clamp(1rem, 4vw, 4rem)',
        }}
      >
        {/* Top corners */}
        <div className="relative z-20 flex items-start justify-between">
          <p style={corner} className="font-black leading-[0.95] uppercase">
            Limited<br />Release
          </p>
          <p style={corner} className="font-black leading-[0.95] uppercase text-right">
            Platform<br />v2.0
          </p>
        </div>

        {/* Center */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Angkor, soft and misty */}
          <div
            className="relative"
            style={{
              width: 'min(34rem, 62vw)',
              marginBottom: 'clamp(-3.5rem, -6vw, -1rem)',
            }}
          >
            {/* soft glow behind */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 blur-3xl"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 55%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.55) 40%, rgba(255,255,255,0) 72%)',
              }}
            />

            {/* temple */}
            <div
              className="temple-float"
              style={{ animation: 'templeFloat 9s ease-in-out infinite' }}
            >
              <Image
                src="/akbg.png"
                alt="Angkor Wat"
                width={640}
                height={359}
                priority
                className="w-full h-auto select-none pointer-events-none"
                style={{
                  opacity: 0.8,
                  filter: 'grayscale(0.35) contrast(0.92) brightness(1.08) saturate(0.85) blur(0.4px)',
                  WebkitMaskImage: `${fadeMask}, ${sideMask}`,
                  WebkitMaskComposite: 'source-in',
                  maskImage: `${fadeMask}, ${sideMask}`,
                  maskComposite: 'intersect',
                }}
              />
            </div>

            {/* drifting mist */}
            <div
              aria-hidden="true"
              className="mist-a absolute left-[-10%] right-[-10%] bottom-[8%] h-[38%] blur-2xl pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at 40% 50%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)',
                animation: 'mistDriftA 14s ease-in-out infinite',
              }}
            />
            <div
              aria-hidden="true"
              className="mist-b absolute left-[-10%] right-[-10%] bottom-[-4%] h-[36%] blur-2xl pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at 60% 50%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 70%)',
                animation: 'mistDriftB 18s ease-in-out infinite',
              }}
            />
          </div>

          <h1
            style={display}
            className="relative font-black uppercase leading-[0.95] tracking-tight whitespace-nowrap flex flex-nowrap items-center justify-center gap-x-[0.3em] text-[clamp(1.6rem,8vw,8rem)] sm:text-[clamp(2.75rem,11vw,8rem)]"
          >
            <span>ជាតិហ្សុីលក់</span>
            <span>BEATS</span>
          </h1>

          <p
            style={{ ...body, fontSize: 'clamp(0.8rem, 2.2vw, 1.5rem)' }}
            className="mt-3 sm:mt-6 max-w-xl font-light text-[#444] text-balance"
          >
            Music is emotion, songs are stories. A single song can change a person’s feelings.
          </p>
        </div>

        {/* Waveform */}
        <div className="relative z-10">
          <canvas
            ref={canvasRef}
            width={900}
            height={120}
            className="w-full max-w-4xl mx-auto h-10 sm:h-24 lg:h-28"
          />
        </div>

        {/* Rail */}
        <div className="relative z-10 h-4">
          <div
            className="absolute top-1/2 -translate-y-1/2 h-[5px] rounded-full"
            style={{
              left: `calc(-1 * ${sidePad})`,
              right: `calc(-1 * ${sidePad})`,
              background: 'linear-gradient(180deg, #f5f5f5 0%, #9a9a9a 45%, #5a5a5a 100%)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.25)',
            }}
          />
        </div>

        {/* Bottom corners (single row on all sizes) */}
        <div className="relative z-20 flex flex-nowrap items-end justify-between gap-3 sm:gap-6">
          <p style={corner} className="font-black leading-[0.95] uppercase shrink-0">
            CHEATZ<br />LUKBEATS
          </p>

          <nav
            aria-label="Social links"
            style={{ ...body, fontSize: 'clamp(0.55rem, 1.6vw, 1.125rem)' }}
            className="max-w-[9rem] sm:max-w-xs flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-medium uppercase tracking-wide text-[#444]"
          >
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#111] hover:underline underline-offset-4 transition-colors"
              >
                {s.label}
              </a>
            ))}
          </nav>

          <a
            href="#beats"
            style={corner}
            className="font-black leading-[0.95] uppercase text-right shrink-0 hover:opacity-60 transition-opacity"
          >
            Shop<br />Now
          </a>
        </div>
      </section>
    </>
  );
}