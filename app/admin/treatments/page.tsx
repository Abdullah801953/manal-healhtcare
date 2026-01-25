"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Edit, Trash2, Eye, Star } from "lucide-react";
import Link from "next/link";

export default function TreatmentsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const treatments = [
    {
      id: "1",
      title: "Cardiac Catheterization",
      category: "Cardiac Surgery",
      duration: "1-2 hours",
      price: "$3,500 - $8,000",
      featured: true,
      status: "active",
    },
    {
      id: "2",
      title: "Joint Replacement Surgery",
      category: "Orthopedic Surgery",
      duration: "2-3 hours",
      price: "$15,000 - $35,000",
      featured: true,
      status: "active",
    },
    {
      id: "3",
      title: "Chemotherapy",
      category: "Oncology",
      duration: "Varies",
      price: "$2,000 - $10,000 per cycle",
      featured: false,
      status: "active",
    },
  ];

  const filteredTreatments = treatments.filter((treatment) =>
    treatment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    treatment.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Treatments</h1>
          <p className="text-gray-600 mt-1">Manage treatment services</p>
        </div>
        <Link href="/admin/treatments/new">
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Add New Treatment
          </Button>
        </Link>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search treatments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter by Category</Button>
          </div>
        </CardContent>
      </Card>

      {/* Treatments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTreatments.map((treatment) => (
          <Card key={treatment.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{treatment.title}</h3>
                    {treatment.featured && (
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    )}
                  </div>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded">
                    {treatment.category}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon-sm" title="View">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Link href={`/admin/treatments/${treatment.id}/edit`}>
                    <Button variant="ghost" size="icon-sm" title="Edit">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon-sm" className="text-red-600 hover:text-red-700" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium text-gray-900">{treatment.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-medium text-gray-900">{treatment.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                    {treatment.status}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
