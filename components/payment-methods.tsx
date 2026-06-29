'use client';

import { CreditCard } from 'lucide-react';

const PAYMENT_METHODS = [
  {
    name: 'ABA Bank',
    logo: 'https://play-lh.googleusercontent.com/O7xMXY5ehCEVwpR0MlKYQOK5QJ1oFIw4EoXQqyt_vgDKT3Uvn1g8FIz_fNDDhWH4Zbdclp54WhRMnI8vzyE9OeU',
  },
  {
    name: 'Bakong KHQR',
    logo: 'https://play-lh.googleusercontent.com/Q27JPO0Plka8m3_-h2yw3Xu22Wedt3NJcxl1NPgMlaI6VRNcmSEPArvAcmnK1_TpmMBUlTsxjS1ycy0rRDFrmA',
  },
  {
    name: 'ACLEDA Bank',
    logo: 'https://www.acledabank.com.kh/kh/assets/download_material/download-logo-blue.jpg',
  },
  {
    name: 'Wing Bank',
    logo: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/5d/ea/bc/5deabc8c-4916-4b2f-906c-05b5ada70538/Placeholder.mill/400x400bb-75.webp',
  },
  {
    name: 'Canadia Bank',
    logo: 'https://hrincjobs-pro.s3.amazonaws.com/media/public/filer_public/e9/72/e97240fd-c1ba-49fb-9f5e-59f20bc92212/canadiaa.jpg',
  },
  {
    name: 'Vattanac Bank',
    logo: 'https://play-lh.googleusercontent.com/27_HIIuncArt6Splsyu1ede2SURGQXIdf-l_IqDyjm6fuVmjGCrPWV8butv1ojz4wxf3NQLekrS0q3yBr2VeKg',
  },
  {
    name: 'Prince Bank',
    logo: 'https://media.licdn.com/dms/image/v2/D560BAQFx66uzFSDBzw/company-logo_200_200/company-logo_200_200/0/1689566127844/prince_bank_logo?e=2147483647&v=beta&t=W99HaZMq1oQHEOywL8aB_Z6PpqBz7E7-O01LqW0UwXY',
  }
];

export function PaymentMethods() {
  return (
    <section className="py-10 sm:py-14 px-3 sm:px-4 lg:px-6">
      {/* Koulen font for Khmer */}
      <link href="https://fonts.googleapis.com/css2?family=Koulen&display=swap" rel="stylesheet" />

      <div className="max-w-6xl mx-auto text-center">
<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#7700ff]/30 bg-[#7700ff]/5 text-[#7700ff] text-xs font-semibold tracking-wide mb-5">
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
            onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = 'paused')}
            onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = 'running')}
          >
            {[...PAYMENT_METHODS, ...PAYMENT_METHODS].map(({ name, logo }, i) => (
              <div
                key={`${name}-${i}`}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-zinc-900/80 border border-purple-500/20 hover:border-lime-400/40 transition-colors flex-shrink-0"
              >
                <img
                  src={logo}
                  alt={name}
                  width={36}
                  height={36}
                  className="rounded-lg object-contain flex-shrink-0"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      'data:image/svg+xml;utf8,' +
                      encodeURIComponent(
                        `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><rect width="36" height="36" rx="8" fill="#27272a"/><text x="18" y="22" text-anchor="middle" font-size="10" font-weight="700" fill="#a3e635" font-family="sans-serif">${name
                          .split(' ')
                          .map((w) => w[0])
                          .join('')
                          .slice(0, 3)}</text></svg>`
                      );
                  }}
                />
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