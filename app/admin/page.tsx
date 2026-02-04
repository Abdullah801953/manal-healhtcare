"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Building2,
  HeartPulse,
  FileText,
  MessageSquare,
  Mail,
  TrendingUp,
  Clock,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface DashboardStats {
  stats: {
    doctors: number;
    hospitals: number;
    treatments: number;
    blogs: number;
    testimonials: number;
    totalInquiries: number;
    newInquiries: number;
  };
  inquiryStats: {
    thisWeek: number;
    lastWeek: number;
    thisMonth: number;
  };
  recentInquiries: Array<{
    id: string;
    name: string;
    email: string;
    subject: string;
    date: string;
    status: string;
  }>;
  pendingTestimonials: Array<{
    id: string;
    name: string;
    treatment: string;
    rating: number;
    date: string;
  }>;
}

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      const result = await response.json();
      if (result.success) {
        setDashboardData(result.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return date.toLocaleDateString();
  };

  const stats = dashboardData ? [
    { name: "Total Doctors", value: dashboardData.stats.doctors.toString(), icon: Users, color: "bg-blue-500", href: "/admin/doctors" },
    { name: "Hospitals", value: dashboardData.stats.hospitals.toString(), icon: Building2, color: "bg-green-500", href: "/admin/hospitals" },
    { name: "Treatments", value: dashboardData.stats.treatments.toString(), icon: HeartPulse, color: "bg-purple-500", href: "/admin/treatments" },
    { name: "Blog Posts", value: dashboardData.stats.blogs.toString(), icon: FileText, color: "bg-orange-500", href: "/admin/blogs" },
    { name: "Testimonials", value: dashboardData.stats.testimonials.toString(), icon: MessageSquare, color: "bg-pink-500", href: "/admin/testimonials" },
    { name: "New Inquiries", value: dashboardData.stats.newInquiries.toString(), icon: Mail, color: "bg-red-500", href: "/admin/inquiries" },
  ] : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">👋 Welcome Back, Admin!</h1>
            <p className="text-green-50 text-lg">Here's your website overview for today</p>
          </div>
          <div className="hidden md:block text-6xl">📊</div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Link key={stat.name} href={stat.href}>
            <Card className="hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border-l-4 border-transparent hover:border-green-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{stat.name}</p>
                    <p className="text-4xl font-bold text-gray-900 mt-3">{stat.value}</p>
                    <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Click to manage
                    </p>
                  </div>
                  <div className={`${stat.color} p-4 rounded-full shadow-lg`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inquiries Chart */}
        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Inquiries Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Simple bar chart representation */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">This Week</span>
                  <span className="font-semibold">{dashboardData?.inquiryStats.thisWeek || 0}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-green-500 h-3 rounded-full" style={{ width: `${Math.min((dashboardData?.inquiryStats.thisWeek || 0) / Math.max(dashboardData?.inquiryStats.thisMonth || 1, 1) * 100, 100)}%` }}></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Week</span>
                  <span className="font-semibold">{dashboardData?.inquiryStats.lastWeek || 0}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-blue-500 h-3 rounded-full" style={{ width: `${Math.min((dashboardData?.inquiryStats.lastWeek || 0) / Math.max(dashboardData?.inquiryStats.thisMonth || 1, 1) * 100, 100)}%` }}></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">This Month</span>
                  <span className="font-semibold">{dashboardData?.inquiryStats.thisMonth || 0}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-purple-500 h-3 rounded-full" style={{ width: "95%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Popular Content */}
        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Popular Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Total Content</p>
                  <p className="text-xs text-gray-500">Overview</p>
                </div>
                <span className="text-sm font-semibold text-green-600">
                  {(dashboardData?.stats.doctors || 0) + 
                   (dashboardData?.stats.hospitals || 0) + 
                   (dashboardData?.stats.treatments || 0) + 
                   (dashboardData?.stats.blogs || 0)} items
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Doctors</p>
                  <p className="text-xs text-gray-500">Doctor Profiles</p>
                </div>
                <span className="text-sm font-semibold text-green-600">{dashboardData?.stats.doctors || 0} profiles</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Hospitals</p>
                  <p className="text-xs text-gray-500">Hospital Listings</p>
                </div>
                <span className="text-sm font-semibold text-green-600">{dashboardData?.stats.hospitals || 0} listings</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Blog Posts</p>
                  <p className="text-xs text-gray-500">Published Articles</p>
                </div>
                <span className="text-sm font-semibold text-green-600">{dashboardData?.stats.blogs || 0} articles</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <Card className="rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg font-semibold">Recent Inquiries</CardTitle>
            <Link href="/admin/inquiries">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData?.recentInquiries && dashboardData.recentInquiries.length > 0 ? (
                dashboardData.recentInquiries.map((inquiry) => (
                  <div key={inquiry.id} className="flex items-start justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-gray-900">{inquiry.name}</h4>
                        {inquiry.status === "new" && (
                          <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-700 rounded-full">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{inquiry.subject}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                        <Clock className="w-3 h-3" />
                        {formatDate(inquiry.date)}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-4">No recent inquiries</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Pending Testimonials */}
        <Card className="rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg font-semibold">Pending Testimonials</CardTitle>
            <Link href="/admin/testimonials">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData?.pendingTestimonials && dashboardData.pendingTestimonials.length > 0 ? (
                dashboardData.pendingTestimonials.map((testimonial) => (
                  <div key={testimonial.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{testimonial.treatment}</p>
                      <div className="flex items-center gap-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
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
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-green-600"
                        onClick={() => window.location.href = `/admin/testimonials?id=${testimonial.id}`}
                      >
                        Approve
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-4">No pending testimonials</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/admin/doctors/new">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Users className="w-4 h-4" />
                Add New Doctor
              </Button>
            </Link>
            <Link href="/admin/hospitals/new">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Building2 className="w-4 h-4" />
                Add New Hospital
              </Button>
            </Link>
            <Link href="/admin/blogs/new">
              <Button variant="outline" className="w-full justify-start gap-2">
                <FileText className="w-4 h-4" />
                Create Blog Post
              </Button>
            </Link>
            <Link href="/admin/treatments/new">
              <Button variant="outline" className="w-full justify-start gap-2">
                <HeartPulse className="w-4 h-4" />
                Add Treatment
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
