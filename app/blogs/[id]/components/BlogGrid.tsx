import { ArrowRightIcon } from "lucide-react";
import { blogsData } from "../../data";
import { BlogCardItem } from "./BlogCardItem";

export function BlogGrid() {
  return (
    <section className="py-12 max-w-7xl mx-auto px-2">
      {/* Header */}
      <div className="text-center mb-20">
        <p className="text-[#209F00] font-semibold mb-2">All our Blog</p>
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2">
          Trending Topics in Medicine
        </h2>
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
          and Wellness
        </h2>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {blogsData.map((blog) => (
          <BlogCardItem key={blog.id} blog={blog} />
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center items-center gap-2">
        <button className="p-4 border rounded-full border-[#209F00]">
            <ArrowRightIcon className="text-[#209F00]"/>
        </button>
      </div>
    </section>
  );
}
