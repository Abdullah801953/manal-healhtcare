"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  Building2,
  HeartPulse,
  FileText,
  MessageSquare,
  Mail,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import AdminAuthWrapper from "./components/AdminAuthWrapper";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Doctors", href: "/admin/doctors", icon: Users },
  { name: "Hospitals", href: "/admin/hospitals", icon: Building2 },
  { name: "Treatments", href: "/admin/treatments", icon: HeartPulse },
  { name: "Blogs", href: "/admin/blogs", icon: FileText },
  { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
  { name: "Inquiries", href: "/admin/inquiries", icon: Mail },
  { name: "Newsletter", href: "/admin/newsletter", icon: Mail },
  { name: "Email Templates", href: "/admin/email-templates", icon: FileText },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminName, setAdminName] = useState("Admin");

  useEffect(() => {
    // Get admin data from localStorage
    const adminData = localStorage.getItem("admin");
    if (adminData) {
      const admin = JSON.parse(adminData);
      setAdminName(admin.name || "Admin");
    }
  }, []);

  const handleLogout = () => {
    // Clear admin data from localStorage
    localStorage.removeItem("admin");
    // Redirect to login page
    router.push("/admin/login");
  };

  return (
    <AdminAuthWrapper>
      {pathname === "/admin/login" ? (
        // Login page without admin layout
        <>{children}</>
      ) : (
        // Admin pages with sidebar and navbar
        <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-blue-50">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                M
              </div>
              <div>
                <span className="font-bold text-gray-900 block">Manal Healthcare</span>
                <span className="text-xs text-gray-500">Admin Dashboard</span>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-3">Main Menu</p>
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-full text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg scale-105"
                      : "text-gray-700 hover:bg-gray-100 hover:scale-105 hover:shadow-md"
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${
                    isActive ? "" : "group-hover:scale-110 transition-transform"
                  }`} />
                  <span>{item.name}</span>
                  {isActive && (
                    <span className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-200">
            <Button
              variant="outline"
              className="w-full justify-start gap-3 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 border-red-200 hover:border-red-300 rounded-full transition-all"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-16 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between h-full px-4 sm:px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
            
            <div className="hidden lg:block">
              <h1 className="text-xl font-semibold text-gray-900">
                Manal Healthcare Admin
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{adminName}</span>
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {adminName.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
      )}
    </AdminAuthWrapper>
  );
}
