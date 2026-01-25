"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewEmailTemplatePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    category: "",
    body: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving template:", formData);
    router.push("/admin/email-templates");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/email-templates">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create Email Template</h1>
          <p className="text-gray-600 mt-1">Create a reusable email template</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Template Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Template Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Welcome Email"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">Select category</option>
                    <option value="General">General</option>
                    <option value="Inquiry">Inquiry</option>
                    <option value="Appointment">Appointment</option>
                    <option value="Treatment">Treatment</option>
                    <option value="Follow-up">Follow-up</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Subject *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Email subject line"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Body *
                  </label>
                  <textarea
                    id="body"
                    name="body"
                    value={formData.body}
                    onChange={handleChange}
                    rows={15}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 font-mono text-sm"
                    placeholder="Write your email template here...&#10;&#10;You can use variables like:&#10;{name} - Recipient name&#10;{email} - Recipient email&#10;{phone} - Phone number&#10;{message} - Their message"
                    required
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save Template
                </Button>
                <Link href="/admin/email-templates" className="block">
                  <Button type="button" variant="outline" className="w-full">
                    Cancel
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Available Variables</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="p-2 bg-gray-50 rounded">
                    <code className="text-green-600">{"{name}"}</code>
                    <p className="text-xs text-gray-600 mt-1">Recipient's name</p>
                  </div>
                  <div className="p-2 bg-gray-50 rounded">
                    <code className="text-green-600">{"{email}"}</code>
                    <p className="text-xs text-gray-600 mt-1">Recipient's email</p>
                  </div>
                  <div className="p-2 bg-gray-50 rounded">
                    <code className="text-green-600">{"{phone}"}</code>
                    <p className="text-xs text-gray-600 mt-1">Phone number</p>
                  </div>
                  <div className="p-2 bg-gray-50 rounded">
                    <code className="text-green-600">{"{message}"}</code>
                    <p className="text-xs text-gray-600 mt-1">Their inquiry message</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
