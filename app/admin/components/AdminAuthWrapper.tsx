"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface AdminData {
  id: string;
  email: string;
  name: string;
  role: string;
}

export default function AdminAuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Skip auth check for login page
    if (pathname === "/admin/login") {
      setIsLoading(false);
      return;
    }

    // Check if admin is logged in
    const adminData = localStorage.getItem("admin");
    
    if (!adminData) {
      // Not logged in, redirect to login
      router.push("/admin/login");
    } else {
      // Logged in, allow access
      setIsAuthenticated(true);
      setIsLoading(false);
    }
  }, [pathname, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If on login page, show it
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // If authenticated, show the admin content
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Otherwise show nothing (will redirect)
  return null;
}
