"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Loader2 } from "lucide-react";

const RelatedArticles = ({ currentId }: { currentId: string }) => {
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRelatedBlogs();
  }, [currentId]);

  const fetchRelatedBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/blogs?status=published');
      const data = await response.json();

      if (data.success) {
        const filtered = data.data
          .filter((blog: any) => blog._id !== currentId)
          .slice(0, 3);
        setRelated(filtered);
      }
    } catch (error) {
      console.error('Error fetching related blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (related.length === 0) {
    return null;
  }

  return (
    <section className="mt-8 xs:mt-10 sm:mt-12 lg:mt-16">
      <div className="flex items-center justify-between mb-6 xs:mb-7 sm:mb-8">
        <h3 className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-900">
          You May Also Like Our Latest Articles:
        </h3>
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">
            <ArrowRight className="w-4 h-4 rotate-180" />
          </button>
          <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 lg:gap-8">
        {related.map((item) => (
          <Link
            key={item._id}
            href={`/blogs/${item.slug}`}
            className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={item.image || '/blog-hero.jpg'}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            {/* Content */}
            <div className="p-6">
              <h4 className="text-base font-bold mb-2 text-gray-900 group-hover:text-[#209F00] transition-colors line-clamp-2">
                {item.title}
              </h4>
              <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">
                {item.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedArticles;
