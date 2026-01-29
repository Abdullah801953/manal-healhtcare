export function ContactHero() {
  return (
    <section className="relative bg-linear-to-r from-emerald-500 via-[#209f00] to-green-600 py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Get in Touch
        </h1>
        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
          Have questions? We're here to help. Reach out to us and we'll respond as soon as possible.
        </p>
      </div>
      
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
    </section>
  );
}
