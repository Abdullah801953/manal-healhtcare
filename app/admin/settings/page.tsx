"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Globe, Phone, Loader2, MapPin, Clock, Building, Plus, Trash2 } from "lucide-react";

interface Department {
  name: string;
  phone: string;
  available: string;
}

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    siteName: "",
    siteEmail: "",
    sitePhone: "",
    whatsappNumber: "",
    address: "",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    youtube: "",
    // Contact page configuration
    emergencyPhone: "",
    supportEmail: "",
    postalCode: "",
    workingHoursWeekday: "",
    workingHoursWeekend: "",
    departments: [] as Department[],
    mapEmbedUrl: "",
    mapLatitude: "",
    mapLongitude: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/settings');
      const data = await response.json();

      if (data.success) {
        setFormData({
          siteName: data.data.siteName || '',
          siteEmail: data.data.siteEmail || '',
          sitePhone: data.data.sitePhone || '',
          whatsappNumber: data.data.whatsappNumber || '',
          address: data.data.address || '',
          facebook: data.data.facebook || '',
          twitter: data.data.twitter || '',
          instagram: data.data.instagram || '',
          linkedin: data.data.linkedin || '',
          youtube: data.data.youtube || '',
          emergencyPhone: data.data.emergencyPhone || '',
          supportEmail: data.data.supportEmail || '',
          postalCode: data.data.postalCode || '',
          workingHoursWeekday: data.data.workingHoursWeekday || 'Mon - Fri: 8:00 AM - 8:00 PM',
          workingHoursWeekend: data.data.workingHoursWeekend || 'Sat - Sun: 9:00 AM - 5:00 PM',
          departments: data.data.departments || [],
          mapEmbedUrl: data.data.mapEmbedUrl || '',
          mapLatitude: data.data.mapLatitude || '',
          mapLongitude: data.data.mapLongitude || '',
        });
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDepartmentChange = (index: number, field: keyof Department, value: string) => {
    const newDepartments = [...formData.departments];
    newDepartments[index] = { ...newDepartments[index], [field]: value };
    setFormData({ ...formData, departments: newDepartments });
  };

  const addDepartment = () => {
    setFormData({
      ...formData,
      departments: [...formData.departments, { name: '', phone: '', available: '' }],
    });
  };

  const removeDepartment = (index: number) => {
    setFormData({
      ...formData,
      departments: formData.departments.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert("Settings saved successfully!");
      } else {
        alert(data.error || "Failed to save settings");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

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

            {/* Contact Page Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Contact Page Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="emergencyPhone" className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Phone
                    </label>
                    <Input
                      id="emergencyPhone"
                      name="emergencyPhone"
                      value={formData.emergencyPhone}
                      onChange={handleChange}
                      placeholder="+91 800 123 4567"
                    />
                    <p className="text-xs text-gray-500 mt-1">24/7 emergency hotline</p>
                  </div>
                  <div>
                    <label htmlFor="supportEmail" className="block text-sm font-medium text-gray-700 mb-2">
                      Support Email
                    </label>
                    <Input
                      id="supportEmail"
                      name="supportEmail"
                      type="email"
                      value={formData.supportEmail}
                      onChange={handleChange}
                      placeholder="support@manalhealthcare.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-2">
                    Postal Code / PIN Code
                  </label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="110001"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Working Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Working Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="workingHoursWeekday" className="block text-sm font-medium text-gray-700 mb-2">
                    Weekday Hours
                  </label>
                  <Input
                    id="workingHoursWeekday"
                    name="workingHoursWeekday"
                    value={formData.workingHoursWeekday}
                    onChange={handleChange}
                    placeholder="Mon - Fri: 8:00 AM - 8:00 PM"
                  />
                </div>
                <div>
                  <label htmlFor="workingHoursWeekend" className="block text-sm font-medium text-gray-700 mb-2">
                    Weekend Hours
                  </label>
                  <Input
                    id="workingHoursWeekend"
                    name="workingHoursWeekend"
                    value={formData.workingHoursWeekend}
                    onChange={handleChange}
                    placeholder="Sat - Sun: 9:00 AM - 5:00 PM"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Departments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building className="w-5 h-5" />
                    Departments
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addDepartment}
                    className="flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.departments.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-4">
                    No departments added yet. Click &quot;Add&quot; to create a department.
                  </p>
                ) : (
                  formData.departments.map((dept, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Department {index + 1}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeDepartment(index)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Department Name
                        </label>
                        <Input
                          value={dept.name}
                          onChange={(e) => handleDepartmentChange(index, 'name', e.target.value)}
                          placeholder="e.g., Patient Support"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Phone Number
                        </label>
                        <Input
                          value={dept.phone}
                          onChange={(e) => handleDepartmentChange(index, 'phone', e.target.value)}
                          placeholder="+91 123 456 7890"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Availability
                        </label>
                        <Input
                          value={dept.available}
                          onChange={(e) => handleDepartmentChange(index, 'available', e.target.value)}
                          placeholder="e.g., 24/7 or Mon-Fri 9AM-6PM"
                        />
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Map Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Map Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="mapEmbedUrl" className="block text-sm font-medium text-gray-700 mb-2">
                    Google Maps Embed URL
                  </label>
                  <textarea
                    id="mapEmbedUrl"
                    name="mapEmbedUrl"
                    value={formData.mapEmbedUrl}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                    placeholder="Paste Google Maps embed URL here..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Get this from Google Maps → Share → Embed a map → Copy the src URL
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="mapLatitude" className="block text-sm font-medium text-gray-700 mb-2">
                      Latitude (optional)
                    </label>
                    <Input
                      id="mapLatitude"
                      name="mapLatitude"
                      value={formData.mapLatitude}
                      onChange={handleChange}
                      placeholder="28.6139"
                    />
                  </div>
                  <div>
                    <label htmlFor="mapLongitude" className="block text-sm font-medium text-gray-700 mb-2">
                      Longitude (optional)
                    </label>
                    <Input
                      id="mapLongitude"
                      name="mapLongitude"
                      value={formData.mapLongitude}
                      onChange={handleChange}
                      placeholder="77.2090"
                    />
                  </div>
                </div>
                {formData.mapEmbedUrl && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Preview</p>
                    <div className="w-full h-48 rounded-lg overflow-hidden border border-gray-200">
                      <iframe
                        src={formData.mapEmbedUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </div>
                )}
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
                <Button type="submit" disabled={saving} className="w-full bg-green-600 hover:bg-green-700">
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save All Settings
                    </>
                  )}
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
