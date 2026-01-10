"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Blog post interface
export interface BlogPost {
  id: number;
  title: string;
  category: string;
  date: string;
  image: string;
  slug: string;
}

// Default blog posts
const defaultBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Selecting the Best Sunscreen for Your Skin Type",
    category: "Skin Care",
    date: "05 July 2025",
    image: "/blog-1.jpg",
    slug: "selecting-best-sunscreen",
  },
  {
    id: 2,
    title: "Selecting the Best Sunscreen for Your Skin Type",
    category: "Skin Care",
    date: "05 July 2025",
    image: "/blog-1.jpg",
    slug: "selecting-best-sunscreen-2",
  },
  {
    id: 3,
    title: "Selecting the Best Sunscreen for Your Skin Type",
    category: "Skin Care",
    date: "05 July 2025",
    image: "/blog-1.jpg",
    slug: "selecting-best-sunscreen-3",
  },
];

interface BlogSectionProps {
  badge?: string;
  heading?: string;
  viewAllText?: string;
  blogPosts?: BlogPost[];
}

// Blog Card Component
interface BlogCardProps {
  post: BlogPost;
}

function BlogCard({ post }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-gray-50 rounded-3xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative h-64 w-full">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Date and Category */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">{post.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-600" />
            <span className="text-sm text-gray-700">{post.category}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 leading-snug">
          {post.title}
        </h3>

        {/* Learn More Button */}
        <Button
          variant="outline"
          className="rounded-full border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors duration-300 px-6 h-12"
        >
          Learn More
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}

export function BlogSection({
  badge = "Latest News & Articles",
  heading = "Trending Topics in Medicine and Wellness",
  viewAllText = "View All Blogs",
  blogPosts = defaultBlogPosts,
}: BlogSectionProps) {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-green-600 font-semibold mb-3"
            >
              {badge}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900"
            >
              {heading}
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-6 h-auto text-base font-medium">
              {viewAllText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
