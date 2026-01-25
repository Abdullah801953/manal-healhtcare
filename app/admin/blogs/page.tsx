"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Edit, Trash2, Eye, Calendar } from "lucide-react";
import Link from "next/link";

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const blogs = [
    {
      id: "1",
      title: "Selecting the Best Sunscreen for Your Skin Type",
      category: "Skincare",
      date: "2025-01-10",
      author: "Admin",
      status: "published",
      views: 1234,
    },
    {
      id: "2",
      title: "Understanding Heart Disease Prevention",
      category: "Cardiology",
      date: "2025-01-08",
      author: "Admin",
      status: "published",
      views: 892,
    },
    {
      id: "3",
      title: "Latest Advances in Joint Replacement Surgery",
      category: "Orthopedics",
      date: "2025-01-05",
      author: "Admin",
      status: "draft",
      views: 0,
    },
  ];

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-gray-600 mt-1">Manage your blog content</p>
        </div>
        <Link href="/admin/blogs/new">
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Create New Post
          </Button>
        </Link>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search blog posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">All Categories</Button>
            <Button variant="outline">All Status</Button>
          </div>
        </CardContent>
      </Card>

      {/* Blogs List */}
      <Card>
        <CardHeader>
          <CardTitle>All Posts ({filteredBlogs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{blog.title}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded">
                      {blog.category}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      blog.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-700"
                    }`}>
                      {blog.status}
                    </span>
                    <span className="flex items-center gap-1 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      {new Date(blog.date).toLocaleDateString()}
                    </span>
                    <span className="text-gray-600">
                      {blog.views} views
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/blogs/${blog.id}`} target="_blank">
                    <Button variant="ghost" size="icon-sm" title="View">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href={`/admin/blogs/${blog.id}/edit`}>
                    <Button variant="ghost" size="icon-sm" title="Edit">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon-sm" className="text-red-600 hover:text-red-700" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
