"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Mail, MailOpen, Trash2, Download, Eye } from "lucide-react";

export default function InquiriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all"); // all, new, read

  const inquiries = [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 234 567 8900",
      subject: "Cardiac Surgery Inquiry",
      message: "I would like to know more about cardiac bypass surgery options and costs. I am 58 years old and have been advised to undergo this procedure...",
      date: "2025-01-22T10:30:00",
      status: "new",
      source: "Contact Form",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "+44 20 1234 5678",
      subject: "Knee Replacement Cost",
      message: "Can you provide information about knee replacement surgery, recovery time, and total cost including hospital stay?",
      date: "2025-01-22T08:15:00",
      status: "new",
      source: "Query Modal",
    },
    {
      id: "3",
      name: "Ahmed Hassan",
      email: "ahmed.hassan@example.com",
      phone: "+966 50 123 4567",
      subject: "Cancer Treatment Options",
      message: "I am looking for advanced cancer treatment options. My father has been diagnosed with liver cancer...",
      date: "2025-01-21T16:45:00",
      status: "read",
      source: "Contact Form",
    },
    {
      id: "4",
      name: "Maria Garcia",
      email: "maria.garcia@example.com",
      phone: "+34 600 123 456",
      subject: "IVF Treatment Inquiry",
      message: "I would like to know about IVF treatment success rates and costs at your fertility centers...",
      date: "2025-01-21T14:20:00",
      status: "read",
      source: "Contact Form",
    },
    {
      id: "5",
      name: "David Lee",
      email: "david.lee@example.com",
      phone: "+61 400 123 456",
      subject: "Spine Surgery Consultation",
      message: "I need information about spine surgery for herniated disc. Looking for best specialists...",
      date: "2025-01-20T11:00:00",
      status: "read",
      source: "Lab Test Booking",
    },
  ];

  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch =
      inquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "new" && inquiry.status === "new") ||
      (filter === "read" && inquiry.status === "read");
    return matchesSearch && matchesFilter;
  });

  const newCount = inquiries.filter((i) => i.status === "new").length;
  const readCount = inquiries.filter((i) => i.status === "read").length;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const handleExport = () => {
    console.log("Exporting inquiries to CSV...");
    // Add CSV export logic here
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inquiries</h1>
          <p className="text-gray-600 mt-1">Manage patient inquiries and messages</p>
        </div>
        <Button variant="outline" onClick={handleExport}>
          <Download className="w-4 h-4 mr-2" />
          Export to CSV
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="cursor-pointer" onClick={() => setFilter("all")}>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">{inquiries.length}</div>
            <div className="text-sm text-gray-600">Total Inquiries</div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer" onClick={() => setFilter("new")}>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{newCount}</div>
            <div className="text-sm text-gray-600">New/Unread</div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer" onClick={() => setFilter("read")}>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{readCount}</div>
            <div className="text-sm text-gray-600">Read</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search inquiries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
              >
                All
              </Button>
              <Button
                variant={filter === "new" ? "default" : "outline"}
                onClick={() => setFilter("new")}
              >
                New
              </Button>
              <Button
                variant={filter === "read" ? "default" : "outline"}
                onClick={() => setFilter("read")}
              >
                Read
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inquiries List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredInquiries.map((inquiry) => (
          <Card
            key={inquiry.id}
            className={`${
              inquiry.status === "new" ? "border-red-200 bg-red-50/30" : ""
            } hover:shadow-md transition-shadow`}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    inquiry.status === "new" ? "bg-red-100" : "bg-green-100"
                  }`}
                >
                  {inquiry.status === "new" ? (
                    <Mail className="w-5 h-5 text-red-600" />
                  ) : (
                    <MailOpen className="w-5 h-5 text-green-600" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">{inquiry.name}</h3>
                        {inquiry.status === "new" && (
                          <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{inquiry.email}</p>
                      <p className="text-sm text-gray-600">{inquiry.phone}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{formatDate(inquiry.date)}</p>
                      <span className="text-xs text-gray-500 mt-1 inline-block">{inquiry.source}</span>
                    </div>
                  </div>

                  <h4 className="font-medium text-gray-900 mb-2">{inquiry.subject}</h4>
                  <p className="text-sm text-gray-700 line-clamp-2">{inquiry.message}</p>

                  {/* Actions */}
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-1" />
                      View Full
                    </Button>
                    <Button size="sm" variant="outline">
                      <Mail className="w-4 h-4 mr-1" />
                      Reply
                    </Button>
                    {inquiry.status === "new" && (
                      <Button size="sm" variant="outline">
                        Mark as Read
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
