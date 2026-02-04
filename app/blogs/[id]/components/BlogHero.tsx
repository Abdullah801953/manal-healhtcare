"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { useState } from "react";

interface BlogHeroProps {
  title: string;
  image: string | any;
}

const BlogHero = ({ title, image }: BlogHeroProps) => {
  const [imageError, setImageError] = useState(false);
  const imageUrl = imageError ? '/blog-hero.jpg' : (typeof image === 'string' ? image : '/blog-hero.jpg');
  const isUploadedImage = imageUrl.startsWith('/uploads/');
  
  return (
    <section className="mb-6 xs:mb-7 sm:mb-8 lg:mb-10">
      <div className="relative w-full h-[300px] sm:h-[350px] md:h-[380px] overflow-hidden rounded-2xl sm:rounded-3xl">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          priority
          onError={() => setImageError(true)}
          unoptimized={isUploadedImage}
        />

        <div className="absolute inset-0 flex items-end">
          <div className="w-full bg-[#F6FAFF] rounded-t-2xl sm:rounded-t-3xl px-4 xs:px-5 sm:px-6 lg:px-8 py-6 xs:py-7 sm:py-8 lg:py-10 flex flex-col lg:flex-row justify-between gap-4 xs:gap-5 sm:gap-6 lg:gap-8">
            {/* LEFT */}
            <div>
              <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-[#0A1D3B]">
                {title}
              </h1>
              <div className="mt-3 xs:mt-4 text-xs xs:text-sm text-gray-600 flex gap-2">
                <Link href="/" className="hover:text-[#209F00]">Home</Link>
                <span>›</span>
                <span className="text-[#209F00] font-medium">Blogs</span>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3 xs:gap-4 bg-white px-4 xs:px-5 sm:px-6 py-3 xs:py-4 rounded-xl shadow-sm flex-shrink-0">
              <div className="h-10 w-10 xs:h-12 xs:w-12 bg-[#209F00] text-white rounded-full flex items-center justify-center flex-shrink-0">
                <Phone size={18} className="xs:w-5 xs:h-5" />
              </div>
              <div className="whitespace-nowrap">
                <p className="text-xs xs:text-sm text-gray-500">Need help?</p>
                <p className="text-sm xs:text-base font-semibold">+91 98765 43210</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogHero;
