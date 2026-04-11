import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import doctor from '@/public/doctor.png';

export function HeroBanner() {
  return (
    <div className="relative w-full h-80 rounded-3xl overflow-hidden mb-2">

      {/* ── Background gradient ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#209f00] via-emerald-600 to-teal-700" />

      {/* ── Subtle grid texture ── */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* ── Glow blobs ── */}
      <div className="absolute -top-10 -left-10 w-56 h-56 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-10 left-1/3 w-48 h-48 bg-emerald-300/20 rounded-full blur-3xl" />
      <div className="absolute top-0 right-1/3 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

      {/* ── Decorative circle rings ── */}
      <div className="absolute -right-16 -bottom-16 w-72 h-72 rounded-full border border-white/10" />
      <div className="absolute -right-8 -bottom-8 w-56 h-56 rounded-full border border-white/10" />
      <div className="absolute right-0 bottom-0 w-40 h-40 rounded-full border border-white/10" />

      {/* ── Content ── */}
      <div className="relative h-full container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-6">

        {/* Left — Text */}
        <div className="flex-1 z-10 space-y-1">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 px-3 py-1 rounded-full mb-3">
            <span className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse" />
            <span className="text-xs text-white/90 font-medium tracking-wide">India's #1 Healthcare Network</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight ">
            HEALTH <span className="text-green-200">TRUST</span>
          </h1>

          <p className="text-white/80 text-base font-medium pt-1">
            Trusted Medical Experts · 24/7 Care
          </p>

          {/* Divider */}
          <div className="w-12 h-[2px] bg-green-300/60 rounded-full my-3" />

          <p className="text-white/70 text-sm max-w-xs leading-relaxed">
            Connect with top doctors and specialists across India's leading hospitals.
          </p>

          <div className="flex items-center gap-3 pt-4">
            <Link href="/contact">
              <Button className="bg-white text-[#209F00] hover:bg-green-50 rounded-full px-6 py-2.5 text-sm font-semibold shadow-lg transition-all hover:shadow-xl hover:scale-105">
                Schedule Meeting
              </Button>
            </Link>
            <Link href="/hospitals">
              <Button variant="ghost" className="text-white border border-white/30 hover:bg-white/10 rounded-full px-6 py-2.5 text-sm font-medium backdrop-blur-sm">
                Explore →
              </Button>
            </Link>
          </div>

          {/* Mini stats */}
          <div className="flex items-center gap-6 pt-4">
            <div>
              <p className="text-white font-bold text-lg leading-none">50+</p>
              <p className="text-white/60 text-xs mt-0.5">Hospitals</p>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div>
              <p className="text-white font-bold text-lg leading-none">2500+</p>
              <p className="text-white/60 text-xs mt-0.5">Beds</p>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div>
              <p className="text-white font-bold text-lg leading-none">4.8★</p>
              <p className="text-white/60 text-xs mt-0.5">Rating</p>
            </div>
          </div>
        </div>

        {/* Right — Doctor Image */}
        <div className="relative h-full w-64 md:w-72 flex-shrink-0 z-10">

          {/* Glow behind doctor */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-green-300/20 rounded-full blur-2xl" />

          {/* Subtle arc behind doctor */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full border-2 border-white/10" />

          <Image
            src={doctor}
            alt="Doctor"
            fill
            className="object-contain object-bottom drop-shadow-2xl"
            sizes="300px"
            priority
          />
        </div>

      </div>
    </div>
  );
}