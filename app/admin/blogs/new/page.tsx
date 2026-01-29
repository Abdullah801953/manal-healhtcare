"use client";

import { BlogForm } from "../components/BlogForm";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewBlogPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/admin/blogs");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/blogs">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Blog Post</h1>
          <p className="text-gray-600 mt-1">Write and publish a new blog article</p>
        </div>
      </div>

      {/* Form */}
      <BlogForm onSuccess={handleSuccess} />
    </div>
  );
}
