import Link from "next/link";
import Image from "next/image";
import { blogsData } from "../../data";
import { ArrowRight } from "lucide-react";

const RelatedArticles = ({ currentId }: { currentId: string }) => {
  const related = blogsData.filter((blog) => blog.id !== currentId).slice(0, 3);

  return (
    <section className="mt-16 px-4 py-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map((item) => (
          <Link
            key={item.id}
            href={`/blogs/${item.id}`}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={item.image}
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
