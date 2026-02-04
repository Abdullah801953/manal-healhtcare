"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

// Blog type from API
export interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  status: string;
  featured: boolean;
}

interface BlogSectionProps {
  badge?: string;
  heading?: string;
  viewAllText?: string;
}

// Format date helper
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Blog Card Component
interface BlogCardProps {
  blog: Blog;
}

function BlogCard({ blog }: BlogCardProps) {
  const imageUrl = blog.image || '/blog-placeholder.jpg';
  const isUploadedImage = imageUrl.startsWith('/uploads/');
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Link
        href={`/blogs/${blog.slug}`}
        className="group bg-white rounded-lg xs:rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 block"
      >
        {/* Image */}
        <div className="relative h-36 xs:h-40 sm:h-48 md:h-56 overflow-hidden">
          <Image
            src={imageUrl}
            alt={blog.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            unoptimized={isUploadedImage}
          />
        </div>

        {/* Content */}
        <div className="p-3 xs:p-4 sm:p-5 lg:p-6 space-y-1.5 xs:space-y-2 sm:space-y-3">
          {/* Meta Info */}
          <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 text-[10px] xs:text-xs sm:text-sm text-gray-500">
            <div className="flex items-center gap-0.5 xs:gap-1">
              <Calendar className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-4 sm:h-4" />
              <span>{formatDate(blog.date)}</span>
            </div>
            <div className="w-0.5 h-0.5 xs:w-1 xs:h-1 bg-gray-400 rounded-full"></div>
            <div className="flex items-center gap-0.5 xs:gap-1">
              <Tag className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-4 sm:h-4" />
              <span>{blog.category}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-sm xs:text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#209F00] transition-colors line-clamp-2 min-h-[2.5rem] xs:min-h-[3rem] sm:min-h-14">
            {blog.title}
          </h3>

          {/* Learn More Link */}
          <div className="flex items-center gap-1.5 xs:gap-2 font-semibold text-[10px] xs:text-xs sm:text-sm group-hover:gap-2 xs:group-hover:gap-3 transition-all">
            <span className="border rounded-full p-2 xs:p-3 sm:p-4 flex gap-2 xs:gap-3 sm:gap-5">
              <span>Learn More</span>
              <ArrowRight className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 rounded-full text-white bg-[#209F00]" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function BlogSection({
  badge = "Latest News & Articles",
  heading = "Trending Topics in Medicine and Wellness",
  viewAllText = "View All Blogs",
}: BlogSectionProps) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/blogs?status=published');
        const result = await response.json();
        
        if (result.success && result.data) {
          // Get first 3 published blogs
          setBlogs(result.data.slice(0, 3));
        }
      } catch (err) {
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="py-8 xs:py-10 sm:py-12 md:py-14 lg:py-16 xl:py-20 bg-white">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 xs:gap-4 sm:gap-6 mb-6 xs:mb-8 sm:mb-10 lg:mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-green-600 font-semibold mb-1.5 xs:mb-2 sm:mb-3 text-[10px] xs:text-xs sm:text-sm"
            >
              {badge}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900"
            >
              {heading}
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="w-full md:w-auto"
          >
            <Link href="/blogs" className="block">
              <Button className="bg-[#209F00] hover:bg-green-700 text-white rounded-full px-3 xs:px-4 sm:px-6 py-2 xs:py-3 sm:py-4 h-auto text-xs xs:text-sm sm:text-base font-medium w-full md:w-auto">
                {viewAllText}
                <ArrowRight className="ml-1.5 xs:ml-2 h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-6 lg:gap-8">
          {loading ? (
            <div className="col-span-full flex justify-center items-center py-12">
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-[#209f00] border-t-transparent"></div>
            </div>
          ) : blogs.length > 0 ? (
            blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 py-8">No blogs available.</p>
          )}
        </div>
      </div>
    </section>
  );
}
