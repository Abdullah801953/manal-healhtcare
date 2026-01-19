"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { blogsData } from "@/app/blogs/data";
import { formatDate } from "@/app/blogs/utils";

// Blog post interface
export interface BlogPost {
  id: number;
  title: string;
  category: string;
  date: string;
  image: string;
  slug: string;
}

// Blog post interface
export interface BlogPost {
  id: number;
  title: string;
  category: string;
  date: string;
  image: string;
  slug: string;
}

interface BlogSectionProps {
  badge?: string;
  heading?: string;
  viewAllText?: string;
}

// Blog Card Component
interface BlogCardProps {
  blog: typeof blogsData[0];
}

function BlogCard({ blog }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Link
        href={`/blogs/${blog.id}`}
        className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 block"
      >
        {/* Image */}
        <div className="relative h-44 sm:h-48 md:h-56 overflow-hidden">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 lg:p-6 space-y-2 sm:space-y-3">
          {/* Meta Info */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{formatDate(blog.date)}</span>
            </div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="flex items-center gap-1">
              <Tag className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{blog.category}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#209F00] transition-colors line-clamp-2 min-h-[3rem] sm:min-h-14">
            {blog.title}
          </h3>

          {/* Learn More Link */}
          <div className="flex items-center gap-2 font-semibold text-xs sm:text-sm group-hover:gap-3 transition-all">
            <span className="border rounded-full p-3 sm:p-4 flex gap-3 sm:gap-5">
              <span>Learn More</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 rounded-full text-white bg-[#209F00]" />
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
  // Get first 3 blogs from blogsData
  const displayBlogs = blogsData.slice(0, 3);

  return (
    <section className="py-12 sm:py-14 md:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 sm:gap-6 mb-8 sm:mb-10 lg:mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-green-600 font-semibold mb-2 sm:mb-3 text-xs sm:text-sm"
            >
              {badge}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900"
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
              <Button className="bg-[#209F00] hover:bg-green-700 text-white rounded-full px-4 sm:px-6 py-3 sm:py-4 h-auto text-sm sm:text-base font-medium w-full md:w-auto">
                {viewAllText}
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {displayBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
}
