"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Edit, Trash2, Eye, Star } from "lucide-react";
import Link from "next/link";

export default function HospitalsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const hospitals = [
    {
      id: "1",
      name: "Indraprastha Apollo Hospital",
      city: "New Delhi",
      state: "Delhi",
      beds: 710,
      rating: 4.9,
      specialties: "Cardiac Sciences, Oncology, Neurosciences",
      featured: true,
      status: "active",
    },
    {
      id: "2",
      name: "Apollo Fertility Center",
      city: "New Delhi",
      state: "Delhi",
      beds: 50,
      rating: 4.8,
      specialties: "Fertility, IVF, Reproductive Medicine",
      featured: true,
      status: "active",
    },
    {
      id: "3",
      name: "Fortis Memorial Hospital",
      city: "Gurgaon",
      state: "Haryana",
      beds: 400,
      rating: 4.7,
      specialties: "Orthopedics, Cardiology, Neurology",
      featured: false,
      status: "active",
    },
  ];

  const filteredHospitals = hospitals.filter((hospital) =>
    hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hospital.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hospitals</h1>
          <p className="text-gray-600 mt-1">Manage hospital listings</p>
        </div>
        <Link href="/admin/hospitals/new">
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Add New Hospital
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
                placeholder="Search by hospital name or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
        </CardContent>
      </Card>

      {/* Hospitals Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredHospitals.map((hospital) => (
          <Card key={hospital.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">🏥</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">{hospital.name}</h3>
                        {hospital.featured && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{hospital.city}, {hospital.state}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <span className="font-medium text-gray-700">{hospital.beds}</span>
                          <span className="text-gray-500">beds</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          <span className="font-medium text-gray-700">{hospital.rating}</span>
                        </span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                          {hospital.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-1">{hospital.specialties}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon-sm" title="View">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Link href={`/admin/hospitals/${hospital.id}/edit`}>
                    <Button variant="ghost" size="icon-sm" title="Edit">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon-sm" className="text-red-600 hover:text-red-700" title="Delete">
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
