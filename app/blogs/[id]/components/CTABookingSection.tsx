import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";

export function CTABookingSection() {
  return (
    <section className="mt-12 mx-4 mb-8">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-8 md:p-12 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Side - Text */}
          <div className="flex-1 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Today Book Your Appointment at Dr. Ahmed Hospital
            </h2>
            <p className="text-blue-50 mb-6 text-sm max-w-xl">
              Get expert medical care from our experienced doctors. Schedule your visit today.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 rounded-full">
                Book Appointment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-full"
              >
                <Phone className="mr-2 h-4 w-4" />
                Call Now
              </Button>
            </div>
          </div>

          {/* Right Side - Doctor Image */}
          <div className="relative flex-shrink-0">
            <div className="relative w-48 h-48 md:w-56 md:h-56">
              {/* White circle background */}
              <div className="absolute inset-0 bg-white rounded-full"></div>
              
              {/* Doctor Image */}
              <div className="relative w-full h-full rounded-full overflow-hidden p-2">
                <Image
                  src="/blog-hero.jpg"
                  alt="Doctor"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              
              {/* Decorative blue circles */}
              <div className="absolute -top-3 -right-3 w-10 h-10 bg-blue-400 rounded-full opacity-60"></div>
              <div className="absolute -bottom-3 -left-3 w-10 h-10 bg-blue-400 rounded-full opacity-60"></div>
            </div>
          </div>
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full opacity-10 -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400 rounded-full opacity-10 -ml-24 -mb-24"></div>
      </div>
    </section>
  );
}
