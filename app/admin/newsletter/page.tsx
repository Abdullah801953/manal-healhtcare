"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download, Trash2, UserPlus, Mail } from "lucide-react";

export default function NewsletterPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const subscribers = [
    { id: "1", email: "john.smith@example.com", name: "John Smith", date: "2025-01-20", status: "active" },
    { id: "2", email: "sarah.j@example.com", name: "Sarah Johnson", date: "2025-01-19", status: "active" },
    { id: "3", email: "ahmed.hassan@example.com", name: "Ahmed Hassan", date: "2025-01-18", status: "active" },
    { id: "4", email: "maria.garcia@example.com", name: "Maria Garcia", date: "2025-01-17", status: "active" },
    { id: "5", email: "david.lee@example.com", name: "David Lee", date: "2025-01-16", status: "active" },
    { id: "6", email: "lisa.wang@example.com", name: "Lisa Wang", date: "2025-01-15", status: "active" },
  ];

  const filteredSubscribers = subscribers.filter((sub) =>
    sub.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Newsletter Subscribers</h1>
          <p className="text-gray-600 mt-1">Manage your email subscribers</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Subscriber
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">{subscribers.length}</div>
            <div className="text-sm text-gray-600">Total Subscribers</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">45</div>
            <div className="text-sm text-gray-600">This Week</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">156</div>
            <div className="text-sm text-gray-600">This Month</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">98.5%</div>
            <div className="text-sm text-gray-600">Active Rate</div>
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
                placeholder="Search by email or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Mail className="w-4 h-4 mr-2" />
              Send Email to All
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Subscribers List */}
      <Card>
        <CardHeader>
          <CardTitle>All Subscribers ({filteredSubscribers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Subscribed Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredSubscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-medium text-gray-900">{subscriber.name}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm text-gray-700">{subscriber.email}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm text-gray-600">{new Date(subscriber.date).toLocaleDateString()}</p>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                        {subscriber.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon-sm" title="Send Email">
                          <Mail className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon-sm" className="text-red-600 hover:text-red-700" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">Showing {filteredSubscribers.length} of {subscribers.length} subscribers</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
