"use client";

import Image from "next/image";

export function AboutHero() {
  return (
    <section className="relative bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 py-20 px-4 sm:px-6 lg:px-10 overflow-hidden">
      <div className="mx-5 lg:mx-24 grid lg:grid-cols-2 gap-12 items-center">
        {/* LEFT CONTENT */}
        <div className="text-left text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            About Manal Healthcare
          </h1>

          <p className="text-lg md:text-xl text-white/90 max-w-xl leading-relaxed">
            At Manal Healthcare, our team is made up of caring and dedicated
            people who are here to support you at every step. We work closely
            with trusted doctors and hospitals across India to help you get the
            right treatment without confusion or stress. From your first message
            to your return home, we stay connected and ready to help whenever
            you need us. Whether it’s explaining your treatment, arranging your
            travel, or just checking in on you—our team is always there. For us,
            it’s not just work. We truly care about you and your journey to
            better health.
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
