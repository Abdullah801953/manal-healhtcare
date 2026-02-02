import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Camera, Heart } from "lucide-react";

export function BlogListCTA() {
  return (
    <section className="my-8 px-3 xs:px-4 sm:px-6 lg:px-10">
      <div className="bg-gradient-to-r from-emerald-500 via-[#209f00] to-green-600 rounded-3xl p-4 md:p-4 lg:p-6 relative overflow-hidden container mx-auto">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Side - Text */}
          <div className="flex-1 text-white max-w-xl">
            {/* Get in Touch Badge */}
            <div className="flex items-center gap-2 mb-6">
              <Camera className="w-5 h-5" />
              <span className="text-sm font-medium">Get in Touch</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight">
              Today Book Your Appointment With Us for Your Health.
            </h2>
            
            <Button 
              size="lg" 
              className="bg-white text-[#209F00] hover:bg-gray-100 rounded-full px-8 py-6 text-base font-semibold"
            >
              Book an Appointment
              <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Button>
          </div>

          {/* Right Side - Doctor Image with Decorative Icons */}
          <div className="relative flex-shrink-0">
            <div className="relative w-80 h-96 md:w-96 md:h-[400px]">
              {/* White circle with icons */}
              <div className="absolute -top-8 left-12 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg z-10">
                <Camera className="w-10 h-10 text-[#209F00]" />
              </div>
              
              <div className="absolute -top-4 -right-8 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg z-10">
                <Heart className="w-12 h-12 text-[#209F00]" />
              </div>
              
              {/* Doctor Image */}
              <div className="relative w-full h-full">
                <Image
                  src="/blog-hero.jpg"
                  alt="Healthcare Professional"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Background Decorative Wave Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full opacity-10 -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400 rounded-full opacity-10 -ml-40 -mb-40"></div>
        
        {/* Wave pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 1440 320">
            <path fill="currentColor" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,101.3C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>
    </section>
  );
}
