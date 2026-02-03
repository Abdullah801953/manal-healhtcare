"use client";

import Image from "next/image";
import { Blog } from "../../data";
import { Check, Share2, Facebook, Twitter, Linkedin, Link2, Instagram } from "lucide-react";

export function BlogNavigating({ blog }: { blog: Blog }) {
  return (
    <article className="bg-white rounded-2xl sm:rounded-3xl shadow-sm p-4 xs:p-5 sm:p-6 lg:p-8 space-y-4 xs:space-y-5 sm:space-y-6">
      {/* Main Featured Image */}
      <div className="relative w-full h-64 xs:h-72 sm:h-80 md:h-96 overflow-hidden rounded-xl sm:rounded-2xl">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Title */}
      <h1 className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
        {blog.title}
      </h1>

      {/* First Content Paragraph */}
      <p className="text-gray-700 leading-relaxed text-justify text-sm xs:text-base">
        {blog.content}
      </p>

      {/* Bullet Points with Green Checkmarks */}
      {blog.bullets && blog.bullets.length > 0 && (
        <ul className="space-y-2 py-2">
          {blog.bullets.map((point, idx) => (
            <li key={idx} className="flex items-start gap-2 xs:gap-3">
              <div className="mt-0.5 flex-shrink-0 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
              </div>
              <span className="text-gray-700 leading-relaxed text-sm xs:text-base">
                {point}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Second Content Paragraph */}
      {blog.content2 && (
        <p className="text-gray-700 leading-relaxed text-justify text-sm xs:text-base">
          {blog.content2}
        </p>
      )}

      {/* Subheading */}
      {blog.subheading && (
        <h2 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900 pt-2">
          {blog.subheading}
        </h2>
      )}

      {/* Extra Images Grid - Side by Side */}
      {blog.extraImages && blog.extraImages.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-5 sm:gap-6 lg:gap-8 py-2">
          {blog.extraImages.map((img, idx) => (
            <div
              key={idx}
              className="relative h-48 sm:h-56 md:h-64 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm"
            >
              <Image
                src={img}
                alt={`Image ${idx + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Third Content Paragraph */}
      {blog.content3 && (
        <p className="text-gray-700 leading-relaxed text-justify text-sm xs:text-base">
          {blog.content3}
        </p>
      )}

      {/* Read More Pagination */}

      {/* Share Post Section */}
      <div className="border border-emerald-100 p-4 xs:p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-emerald-50">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-lg xs:text-xl sm:text-2xl font-semibold text-gray-700">Share this post:</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const url = window.location.href;
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
              }}
              className="flex items-center gap-2 px-4 py-2 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-full transition-colors"
              aria-label="Share on Facebook"
            >
              <Facebook className="w-4 h-4" fill="currentColor" />
              <span className="text-sm font-medium">Facebook</span>
            </button>

            <button
              onClick={() => {
                const url = window.location.href;
                navigator.clipboard.writeText(url);
                alert('Link copied! You can now share it on Instagram.');
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 text-white rounded-full transition-all"
              aria-label="Share on Instagram"
            >
              <Instagram className="w-4 h-4" />
              <span className="text-sm font-medium">Instagram</span>
            </button>

            <button
              onClick={() => {
                const url = window.location.href;
                const text = blog.title;
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
              }}
              className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] hover:bg-[#1A94DA] text-white rounded-full transition-colors"
              aria-label="Share on Twitter"
            >
              <Twitter className="w-4 h-4" fill="currentColor" />
              <span className="text-sm font-medium">Twitter</span>
            </button>

            <button
              onClick={() => {
                const url = window.location.href;
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
              }}
              className="flex items-center gap-2 px-4 py-2 bg-[#0A66C2] hover:bg-[#095196] text-white rounded-full transition-colors"
              aria-label="Share on LinkedIn"
            >
              <Linkedin className="w-4 h-4" fill="currentColor" />
              <span className="text-sm font-medium">LinkedIn</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
