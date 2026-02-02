"use client";

import { useState, useEffect } from "react";
import { ArrowRightIcon, Loader2 } from "lucide-react";
import { BlogCardItem } from "./BlogCardItem";

export function BlogGrid() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/blogs?status=published');
      const data = await response.json();

      if (data.success) {
        setBlogs(data.data);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10">
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

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
        </div>
      ) : (
        <>
          {/* Blog Grid */}
          {blogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No blog posts found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {blogs.map((blog) => (
                <BlogCardItem key={blog._id} blog={{
                  ...blog,
                  id: blog._id,
                }} />
              ))}
            </div>
          )}

          {/* Pagination Dots */}
          <div className="flex justify-center items-center gap-2">
            <button className="p-4 border rounded-full border-[#209F00]">
                <ArrowRightIcon className="text-[#209F00]"/>
            </button>
          </div>
        </>
      )}
    </section>
  );
}
