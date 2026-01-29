export function AboutHero() {
  return (
    <section className="relative bg-linear-to-r from-emerald-500 via-teal-500 to-green-500 py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          About Manal Healthcare
        </h1>
        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
          Dedicated to providing exceptional healthcare services with compassion, 
          expertise, and cutting-edge medical technology.
        </p>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
    </section>
  );
}
