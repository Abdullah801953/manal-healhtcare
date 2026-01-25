"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Globe, Mail, Phone, MapPin } from "lucide-react";

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    siteName: "Manal Healthcare",
    siteEmail: "info@manalhealthcare.com",
    sitePhone: "+91 123 456 7890",
    whatsappNumber: "+91 987 654 3210",
    address: "123 Healthcare Street, New Delhi, India",
    facebook: "https://facebook.com/manalhealthcare",
    twitter: "https://twitter.com/manalhealthcare",
    instagram: "https://instagram.com/manalhealthcare",
    linkedin: "https://linkedin.com/company/manalhealthcare",
    youtube: "https://youtube.com/@manalhealthcare",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving settings:", formData);
    // Add API call to save settings
    alert("Settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your website settings and configurations</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* General Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  General Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-2">
                    Site Name
                  </label>
                  <Input
                    id="siteName"
                    name="siteName"
                    value={formData.siteName}
                    onChange={handleChange}
                    placeholder="Enter site name"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="siteEmail" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <Input
                    id="siteEmail"
                    name="siteEmail"
                    type="email"
                    value={formData.siteEmail}
                    onChange={handleChange}
                    placeholder="info@manalhealthcare.com"
                  />
                </div>
                <div>
                  <label htmlFor="sitePhone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <Input
                    id="sitePhone"
                    name="sitePhone"
                    value={formData.sitePhone}
                    onChange={handleChange}
                    placeholder="+91 123 456 7890"
                  />
                </div>
                <div>
                  <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    WhatsApp Number
                  </label>
                  <Input
                    id="whatsappNumber"
                    name="whatsappNumber"
                    value={formData.whatsappNumber}
                    onChange={handleChange}
                    placeholder="+91 987 654 3210"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This number will be used for the WhatsApp floating button
                  </p>
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your business address"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Social Media Links */}
            <Card>
              <CardHeader>
                <CardTitle>Social Media Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="facebook" className="block text-sm font-medium text-gray-700 mb-2">
                    Facebook URL
                  </label>
                  <Input
                    id="facebook"
                    name="facebook"
                    value={formData.facebook}
                    onChange={handleChange}
                    placeholder="https://facebook.com/yourpage"
                  />
                </div>
                <div>
                  <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 mb-2">
                    Twitter/X URL
                  </label>
                  <Input
                    id="twitter"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleChange}
                    placeholder="https://twitter.com/yourhandle"
                  />
                </div>
                <div>
                  <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-2">
                    Instagram URL
                  </label>
                  <Input
                    id="instagram"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    placeholder="https://instagram.com/yourhandle"
                  />
                </div>
                <div>
                  <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-2">
                    LinkedIn URL
                  </label>
                  <Input
                    id="linkedin"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/company/yourcompany"
                  />
                </div>
                <div>
                  <label htmlFor="youtube" className="block text-sm font-medium text-gray-700 mb-2">
                    YouTube URL
                  </label>
                  <Input
                    id="youtube"
                    name="youtube"
                    value={formData.youtube}
                    onChange={handleChange}
                    placeholder="https://youtube.com/@yourchannel"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Save Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save All Settings
                </Button>
                <Button type="button" variant="outline" className="w-full">
                  Reset to Default
                </Button>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle>Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-600 mb-1">Last Updated</p>
                  <p className="font-medium text-gray-900">January 22, 2026</p>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <p className="text-gray-600 mb-1">Version</p>
                  <p className="font-medium text-gray-900">1.0.0</p>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <p className="text-gray-600 mb-1">Environment</p>
                  <p className="font-medium text-gray-900">Production</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <a
                  href="/"
                  target="_blank"
                  className="block text-sm text-green-600 hover:underline"
                >
                  View Website →
                </a>
                <a
                  href="#"
                  className="block text-sm text-green-600 hover:underline"
                >
                  API Documentation →
                </a>
                <a
                  href="#"
                  className="block text-sm text-green-600 hover:underline"
                >
                  Support Center →
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
