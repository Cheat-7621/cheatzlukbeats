'use client';

export function WaveformAnimation() {
  return (
    <div className="relative w-full h-40 flex items-center justify-center overflow-hidden">
      {/* Lime green bars */}
      <svg className="w-full h-full" viewBox="0 0 1200 200" preserveAspectRatio="xMidYMid slice">
        {/* Animated bars */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <g key={i}>
            <rect
              x={100 + i * 100}
              y={50}
              width="60"
              height="100"
              rx="30"
              fill="#ccff00"
              opacity="0.9"
              className="animate-pulse"
              style={{
                animationDelay: `${i * 0.1}s`,
              }}
            />
          </g>
        ))}

        {/* Red sine wave overlay */}
        <path
          d="M 0,100 Q 75,40 150,100 T 300,100 T 450,100 T 600,100 T 750,100 T 900,100 T 1050,100 T 1200,100"
          stroke="#ff4444"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          className="animate-pulse"
          style={{
            animationDelay: '0.05s',
          }}
        />
      </svg>
    </div>
  );
}
