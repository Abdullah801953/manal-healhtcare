"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import { Blog } from "../../data";
import { formatDate } from "../../utils";
import { useState } from "react";

interface BlogCardProps {
  blog: Blog;
}

export function BlogCardItem({ blog }: BlogCardProps) {
  const [imageError, setImageError] = useState(false);
  const imageUrl = imageError ? '/blog-placeholder.jpg' : (blog.image || '/blog-placeholder.jpg');
  const isUploadedImage = typeof imageUrl === 'string' && imageUrl.startsWith('/uploads/');
  
  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-gray-200">
        <Image
          src={imageUrl}
          alt={blog.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          onError={() => setImageError(true)}
          unoptimized={isUploadedImage}
        />
      </div>

      {/* Content */}
      <div className="p-6 space-y-3">
        {/* Meta Info */}
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(blog.date)}</span>
          </div>
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          <div className="flex items-center gap-1">
            <Tag className="w-4 h-4" />
            <span>{blog.category}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#209F00] transition-colors line-clamp-2 min-h-[56px]">
          {blog.title}
        </h3>

        {/* Learn More Link */}
        <div className="flex items-center gap-2   font-semibold text-sm group-hover:gap-3 transition-all">
          <span className="border rounded-full p-4 flex gap-5"><span className="">Learn More</span>
          <ArrowRight className="w-5 h-5 rounded-full text-white  bg-[#209F00]" /></span>
        </div>
      </div>
    </Link>
  );
}
