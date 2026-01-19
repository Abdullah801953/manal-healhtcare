import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";

interface BlogHeroProps {
  title: string;
  image: StaticImageData;
}

const BlogHero = ({ title, image }: BlogHeroProps) => {
  return (
    <section className="max-w-8xl mx-auto mb-10">
      <div className="relative w-full h-[380] overflow-hidden rounded-2xl">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 flex items-end">
          <div className="w-full bg-[#F6FAFF] rounded-t-3xl px-8 py-10 flex flex-col lg:flex-row justify-between gap-8">
            {/* LEFT */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#0A1D3B]">
                {title}
              </h1>
              <div className="mt-4 text-sm text-gray-600 flex gap-2">
                <Link href="/" className="hover:text-[#209F00]">Home</Link>
                <span>›</span>
                <span className="text-[#209F00] font-medium">Blogs</span>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-xl shadow-sm">
              <div className="h-12 w-12 bg-[#209F00] text-white rounded-full flex items-center justify-center">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Need help?</p>
                <p className="font-semibold">+91 98765 43210</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogHero;
