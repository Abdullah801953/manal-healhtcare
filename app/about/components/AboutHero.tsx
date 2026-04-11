"use client";

import Image from "next/image";

export function AboutHero() {
  return (
    <section className="relative bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 py-20 px-4 sm:px-6 lg:px-10 overflow-hidden">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* LEFT CONTENT */}
        <div className="text-left text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            About Manal Healthcare
          </h1>

          <p className="text-lg md:text-xl text-white/90 max-w-xl leading-relaxed">
          My journey began with people — their stories, their courage, and their distance from home. I saw patients arrive alone, confused, and overwhelmed. Doctors healed their bodies — but who was taking care of the person?
That question became Manal Healthcare.
<b> You are not just a patient to us. You are someone's whole world — and you deserve to be treated that way</b>
          </p>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative w-full h-[500px] md:h-[600px]">
          <Image
            src="/foundationImg.jpeg" // 👈 apni image ka naam yaha dalna
            alt="About Manal Healthcare"
            fill
            className="object-cover rounded-3xl shadow-2xl"
            priority
          />
        </div>
      </div>

      {/* Decorative Blur Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
    </section>
  );
}
