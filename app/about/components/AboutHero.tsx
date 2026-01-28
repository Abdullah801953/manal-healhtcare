export function AboutHero() {
  return (
    <section className="relative bg-linear-to-r from-emerald-500 via-teal-500 to-green-500 py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          About Manal Healthcare
        </h1>
        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
          At Manal Health Care, our mission is to connect international patients
          with top-quality healthcare providers in India, making the medical
          journey easy, safe, and comfortable. We help patients access advanced
          and affordable medical treatment in India, supported by experienced
          doctors and leading hospitals. We work closely with trusted hospitals
          and medical specialists across India and provide complete support,
          including medical visa assistance and multilingual communication, to
          ensure a smooth and stress-free experience.
        </p>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
    </section>
  );
}
