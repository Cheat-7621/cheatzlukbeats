'use client';

import { CreditCard } from 'lucide-react';

const PAYMENT_METHODS = [
  {
    name: 'ABA Bank',
    logo: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect width="36" height="36" rx="8" fill="#003087" />
        <text x="18" y="23" textAnchor="middle" fontSize="11" fontWeight="700" fill="#FFD700" fontFamily="sans-serif">ABA</text>
      </svg>
    ),
  },
  {
    name: 'Bakong KHQR',
    logo: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect width="36" height="36" rx="8" fill="#E8001D" />
        <text x="18" y="15" textAnchor="middle" fontSize="8" fontWeight="700" fill="#fff" fontFamily="sans-serif">BAKONG</text>
        <text x="18" y="27" textAnchor="middle" fontSize="8" fontWeight="700" fill="#FFD700" fontFamily="sans-serif">KHQR</text>
      </svg>
    ),
  },
  {
    name: 'ACLEDA Bank',
    logo: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect width="36" height="36" rx="8" fill="#0068B4" />
        <text x="18" y="17" textAnchor="middle" fontSize="8" fontWeight="700" fill="#fff" fontFamily="sans-serif">ACLEDA</text>
        <text x="18" y="28" textAnchor="middle" fontSize="7" fill="#90d0ff" fontFamily="sans-serif">BANK</text>
      </svg>
    ),
  },
  {
    name: 'Wing Bank',
    logo: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect width="36" height="36" rx="8" fill="#FF6B00" />
        <text x="18" y="17" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff" fontFamily="sans-serif">WING</text>
        <text x="18" y="28" textAnchor="middle" fontSize="7" fill="#ffe5c7" fontFamily="sans-serif">BANK</text>
      </svg>
    ),
  },
  {
    name: 'Canadia Bank',
    logo: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect width="36" height="36" rx="8" fill="#1A3C6B" />
        <text x="18" y="16" textAnchor="middle" fontSize="7" fontWeight="700" fill="#C8A951" fontFamily="sans-serif">CANADIA</text>
        <text x="18" y="27" textAnchor="middle" fontSize="7" fill="#a0b8d8" fontFamily="sans-serif">BANK</text>
      </svg>
    ),
  },
  {
    name: 'Vattanac Bank',
    logo: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect width="36" height="36" rx="8" fill="#8B0000" />
        <text x="18" y="16" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#FFD700" fontFamily="sans-serif">VATTANAC</text>
        <text x="18" y="27" textAnchor="middle" fontSize="7" fill="#ffaaaa" fontFamily="sans-serif">BANK</text>
      </svg>
    ),
  },
  {
    name: 'Prince Bank',
    logo: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect width="36" height="36" rx="8" fill="#5B2D8E" />
        <text x="18" y="16" textAnchor="middle" fontSize="8" fontWeight="700" fill="#fff" fontFamily="sans-serif">PRINCE</text>
        <text x="18" y="27" textAnchor="middle" fontSize="7" fill="#d4b8f0" fontFamily="sans-serif">BANK</text>
      </svg>
    ),
  },
];

export function PaymentMethods() {
  return (
    <section className="py-10 sm:py-14 px-3 sm:px-4 lg:px-6">
      {/* Koulen font for Khmer */}
      <link href="https://fonts.googleapis.com/css2?family=Koulen&display=swap" rel="stylesheet" />

      <div className="max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-lime-400/30 bg-lime-400/5 text-lime-400 text-xs font-semibold tracking-wide mb-5">
          <CreditCard className="w-3.5 h-3.5" />
          PAYMENTS SUPPORTED
        </div>

        <h2
          className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-2"
          style={{ fontFamily: "'Koulen', sans-serif" }}
        >
          ទទួលយកការទូទាត់ប្រាក់ពីគ្រប់ធនាគារធំៗនៅក្នុងប្រទេសកម្ពុជា!
        </h2>
        <p className="text-muted-foreground text-xs sm:text-sm mb-7">
          One QR. Every wallet. Powered by Bakong KHQR &amp; ABA PayWay.
        </p>

        {/* Marquee wrapper */}
        <div
          className="overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          }}
        >
          <div
            className="flex gap-3 w-max"
            style={{ animation: 'marquee-slide 18s linear infinite' }}
            onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
            onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}
          >
            {[...PAYMENT_METHODS, ...PAYMENT_METHODS].map(({ name, logo }, i) => (
              <div
                key={`${name}-${i}`}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-zinc-900/80 border border-purple-500/20 hover:border-lime-400/40 transition-colors flex-shrink-0"
              >
                {logo}
                <span className="text-sm font-medium text-white whitespace-nowrap">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
@keyframes marquee-slide {
  0%   { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}
      `}</style>
    </section>
  );
}