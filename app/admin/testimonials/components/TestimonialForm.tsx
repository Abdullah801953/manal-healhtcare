"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Loader2 } from "lucide-react";

interface TestimonialFormData {
  name: string;
  age: number;
  country: string;
  countryFlag: string;
  treatment: string;
  hospital: string;
  doctor: string;
  rating: number;
  date: string;
  image: string;
  testimonial: string;
  videoUrl: string;
  verified: boolean;
  featured: boolean;
  category: string;
  status: string;
}

interface TestimonialFormProps {
  testimonialId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const categories = [
  "Cardiac Care",
  "Orthopedic",
  "Cosmetic Surgery",
  "Cancer Treatment",
  "Neurology",
  "General Surgery",
  "Dental Care",
  "Eye Care",
  "IVF Treatment",
  "Weight Loss",
  "Transplant",
];

export function TestimonialForm({ testimonialId, onSuccess, onCancel }: TestimonialFormProps) {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<TestimonialFormData>({
    name: "",
    age: 30,
    country: "",
    countryFlag: "",
    treatment: "",
    hospital: "",
    doctor: "",
    rating: 5,
    date: new Date().toISOString().split('T')[0],
    image: "",
    testimonial: "",
    videoUrl: "",
    verified: false,
    featured: false,
    category: "Cardiac Care",
    status: "pending",
  });

  useEffect(() => {
    if (testimonialId) {
      fetchTestimonial();
    }
  }, [testimonialId]);

  const fetchTestimonial = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/testimonials/${testimonialId}`);
      const data = await response.json();

      if (data.success) {
        const testimonial = data.data;
        setFormData({
          name: testimonial.name,
          age: testimonial.age,
          country: testimonial.country,
          countryFlag: testimonial.countryFlag,
          treatment: testimonial.treatment,
          hospital: testimonial.hospital,
          doctor: testimonial.doctor,
          rating: testimonial.rating,
          date: new Date(testimonial.date).toISOString().split('T')[0],
          image: testimonial.image || "",
          testimonial: testimonial.testimonial,
          videoUrl: testimonial.videoUrl || "",
          verified: testimonial.verified,
          featured: testimonial.featured,
          category: testimonial.category,
          status: testimonial.status,
        });
      }
    } catch (error) {
      console.error("Error fetching testimonial:", error);
      alert("Failed to fetch testimonial");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append("file", file);

    try {
      setUploading(true);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      });

      const data = await response.json();

      if (data.success) {
        setFormData((prev) => ({ ...prev, image: data.url }));
      } else {
        alert(data.error || "Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = testimonialId
        ? `/api/testimonials/${testimonialId}`
        : "/api/testimonials";
      const method = testimonialId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert(testimonialId ? "Testimonial updated successfully!" : "Testimonial created successfully!");
        onSuccess?.();
      } else {
        alert(data.error || "Failed to save testimonial");
      }
    } catch (error) {
      console.error("Error saving testimonial:", error);
      alert("Failed to save testimonial");
    } finally {
      setLoading(false);
    }
  };

  if (loading && testimonialId) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardContent className="pt-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Patient Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  min="1"
                  max="120"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="countryFlag">Country Flag (Emoji) *</Label>
                <Input
                  id="countryFlag"
                  placeholder="🇺🇸"
                  value={formData.countryFlag}
                  onChange={(e) => setFormData({ ...formData, countryFlag: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Medical Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="treatment">Treatment *</Label>
                <Input
                  id="treatment"
                  value={formData.treatment}
                  onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hospital">Hospital *</Label>
                <Input
                  id="hospital"
                  value={formData.hospital}
                  onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="doctor">Doctor *</Label>
                <Input
                  id="doctor"
                  value={formData.doctor}
                  onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Treatment Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating">Rating *</Label>
                <Select
                  value={formData.rating.toString()}
                  onValueChange={(value) => setFormData({ ...formData, rating: parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} Star{num > 1 ? 's' : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Testimonial Content */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Testimonial Content</h3>
            
            <div className="space-y-2">
              <Label htmlFor="testimonial">Testimonial Text *</Label>
              <Textarea
                id="testimonial"
                rows={6}
                value={formData.testimonial}
                onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                placeholder="Write the patient's testimonial..."
                required
              />
              <p className="text-sm text-gray-500">Minimum 50 characters</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Patient Image</Label>
              <div className="flex gap-4 items-start">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
                {uploading && <Loader2 className="w-5 h-5 animate-spin" />}
              </div>
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="mt-2 w-32 h-32 object-cover rounded-lg"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="videoUrl">Video URL (Optional)</Label>
              <Input
                id="videoUrl"
                type="url"
                value={formData.videoUrl}
                onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                placeholder="https://youtube.com/..."
              />
            </div>
          </div>

          {/* Status & Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Status & Settings</h3>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="verified">Verified Testimonial</Label>
              <Switch
                id="verified"
                checked={formData.verified}
                onCheckedChange={(checked) => setFormData({ ...formData, verified: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="featured">Featured on Homepage</Label>
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : testimonialId ? (
            "Update Testimonial"
          ) : (
            "Create Testimonial"
          )}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
