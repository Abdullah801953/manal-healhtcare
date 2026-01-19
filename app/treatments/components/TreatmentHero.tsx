import { Heart, Sparkles } from 'lucide-react';

export default function TreatmentHero() {
  return (
    <section className="relative bg-linear-to-br from-[#209f00] via-emerald-600 to-teal-700 text-white py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Heart className="w-5 h-5" />
            <span className="text-sm font-medium">Comprehensive Healthcare Services</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Advanced Medical Treatments
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
            Discover our range of specialized treatments delivered by expert physicians using cutting-edge technology and compassionate care
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            <div className="text-center">
              <div className="text-4xl font-bold mb-1">50+</div>
              <div className="text-white/80 text-sm">Treatment Options</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-1">10K+</div>
              <div className="text-white/80 text-sm">Successful Procedures</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-1">98%</div>
              <div className="text-white/80 text-sm">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 animate-bounce">
        <Sparkles className="w-8 h-8 text-white/40" />
      </div>
      <div className="absolute bottom-20 left-10 animate-bounce delay-300">
        <Sparkles className="w-6 h-6 text-white/40" />
      </div>
    </section>
  );
}
