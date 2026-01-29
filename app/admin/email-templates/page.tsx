"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Edit, Trash2, Copy } from "lucide-react";
import Link from "next/link";

export default function EmailTemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const templates = [
    {
      id: "1",
      name: "Welcome Email",
      subject: "Welcome to Manal Healthcare",
      category: "General",
      lastModified: "2025-01-20",
      usageCount: 45,
    },
    {
      id: "2",
      name: "Inquiry Response",
      subject: "Thank you for your inquiry",
      category: "Inquiry",
      lastModified: "2025-01-19",
      usageCount: 123,
    },
    {
      id: "3",
      name: "Appointment Confirmation",
      subject: "Your appointment has been confirmed",
      category: "Appointment",
      lastModified: "2025-01-18",
      usageCount: 89,
    },
    {
      id: "4",
      name: "Treatment Information",
      subject: "Information about your requested treatment",
      category: "Treatment",
      lastModified: "2025-01-17",
      usageCount: 67,
    },
    {
      id: "5",
      name: "Follow-up Email",
      subject: "Following up on your inquiry",
      category: "Follow-up",
      lastModified: "2025-01-16",
      usageCount: 34,
    },
  ];

  const filteredTemplates = templates.filter((template) =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Email Templates</h1>
          <p className="text-gray-600 mt-1">Manage your email response templates</p>
        </div>
        <Link href="/admin/email-templates/new">
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Create Template
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">{templates.length}</div>
            <div className="text-sm text-gray-600">Total Templates</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">358</div>
            <div className="text-sm text-gray-600">Times Used</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">5</div>
            <div className="text-sm text-gray-600">Categories</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">12</div>
            <div className="text-sm text-gray-600">Used This Week</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter by Category</Button>
          </div>
        </CardContent>
      </Card>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{template.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{template.subject}</p>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                    {template.category}
                  </span>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex items-center justify-between text-sm mb-3">
                  <span className="text-gray-600">Last modified:</span>
                  <span className="font-medium text-gray-900">
                    {new Date(template.lastModified).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm mb-4">
                  <span className="text-gray-600">Used:</span>
                  <span className="font-medium text-gray-900">{template.usageCount} times</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                  <Link href={`/admin/email-templates/${template.id}/edit`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
