"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Edit, Trash2, Check, X, Star } from "lucide-react";

export default function TestimonialsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all"); // all, pending, verified

  const testimonials = [
    {
      id: "1",
      name: "John Smith",
      country: "United States",
      countryFlag: "🇺🇸",
      treatment: "Cardiac Bypass Surgery",
      hospital: "Manal Heart Institute",
      doctor: "Dr. Rajesh Kumar",
      rating: 5,
      testimonial: "My experience at Manal Healthcare was exceptional. The cardiac surgery team was highly professional...",
      date: "2025-12-15",
      verified: false,
      featured: false,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      country: "United Kingdom",
      countryFlag: "🇬🇧",
      treatment: "Knee Replacement Surgery",
      hospital: "Manal Orthopedic Center",
      doctor: "Dr. Priya Sharma",
      rating: 5,
      testimonial: "After years of knee pain, I decided to have my surgery at Manal Healthcare. The entire process...",
      date: "2025-11-28",
      verified: true,
      featured: true,
    },
    {
      id: "3",
      name: "Mohammed Al-Faisal",
      country: "Saudi Arabia",
      countryFlag: "🇸🇦",
      treatment: "Cosmetic Rhinoplasty",
      hospital: "Manal Cosmetic Surgery Center",
      doctor: "Dr. Anjali Mehta",
      rating: 5,
      testimonial: "The cosmetic surgery team at Manal Healthcare exceeded my expectations...",
      date: "2025-11-10",
      verified: true,
      featured: false,
    },
  ];

  const filteredTestimonials = testimonials.filter((testimonial) => {
    const matchesSearch = testimonial.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimonial.treatment.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "pending" && !testimonial.verified) ||
      (filter === "verified" && testimonial.verified);
    return matchesSearch && matchesFilter;
  });

  const pendingCount = testimonials.filter(t => !t.verified).length;
  const verifiedCount = testimonials.filter(t => t.verified).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Testimonials</h1>
        <p className="text-gray-600 mt-1">Manage patient testimonials and reviews</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="cursor-pointer" onClick={() => setFilter("all")}>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">{testimonials.length}</div>
            <div className="text-sm text-gray-600">Total Testimonials</div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer" onClick={() => setFilter("pending")}>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">{pendingCount}</div>
            <div className="text-sm text-gray-600">Pending Approval</div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer" onClick={() => setFilter("verified")}>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{verifiedCount}</div>
            <div className="text-sm text-gray-600">Verified</div>
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
                placeholder="Search testimonials..."
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
                variant={filter === "pending" ? "default" : "outline"}
                onClick={() => setFilter("pending")}
              >
                Pending
              </Button>
              <Button
                variant={filter === "verified" ? "default" : "outline"}
                onClick={() => setFilter("verified")}
              >
                Verified
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Testimonials List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredTestimonials.map((testimonial) => (
          <Card key={testimonial.id} className={`${!testimonial.verified ? "border-orange-200 bg-orange-50/30" : ""}`}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Main Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                        <span className="text-xl">{testimonial.countryFlag}</span>
                        {testimonial.featured && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{testimonial.country}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        </svg>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded">
                        {testimonial.treatment}
                      </span>
                      {testimonial.verified ? (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          Verified
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded">
                          Pending Approval
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Hospital:</span> {testimonial.hospital}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Doctor:</span> {testimonial.doctor}
                    </p>
                  </div>

                  <p className="text-sm text-gray-700 line-clamp-2">{testimonial.testimonial}</p>
                  <p className="text-xs text-gray-500 mt-2">{new Date(testimonial.date).toLocaleDateString()}</p>
                </div>

                {/* Actions */}
                <div className="flex md:flex-col gap-2">
                  {!testimonial.verified && (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <Check className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
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
