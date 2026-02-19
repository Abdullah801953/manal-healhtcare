"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Upload, Plus, X } from "lucide-react";
import Link from "next/link";

export default function NewHospitalPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    type: "Multispeciality Hospital",
    location: "",
    city: "",
    state: "",
    rating: 0,
    reviewCount: 0,
    beds: 0,
    established: new Date().getFullYear(),
    description: "",
    shortDescription: "",
    specialties: "",
    facilities: "",
    accreditations: "",
    expertise: "",
    infrastructure: "",
    emergency: false,
    parking: false,
    featured: false,
    status: "active",
    image: "",
    owner: "",
    award: "",
  });

  const [additionalInfo, setAdditionalInfo] = useState<string[]>([""]);

  const hospitalTypes = [
    "Multispeciality Hospital",
    "IVF Center",
    "Eye Hospital",
    "Dental Clinic",
  ];
  // Generate slug from hospital name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return "";

    try {
      setUploadingImage(true);
      const uploadFormData = new FormData();
      uploadFormData.append("file", imageFile);
      uploadFormData.append("type", "hospital");

      const response = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });

      const data = await response.json();
      if (data.success) {
        return data.url;
      } else {
        alert("Failed to upload image: " + data.message);
        return "";
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("An error occurred while uploading the image");
      return "";
    } finally {
      setUploadingImage(false);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload image if provided
      let imageUrl = formData.image;
      if (imageFile) {
        imageUrl = await uploadImage();
        if (!imageUrl && imageFile) {
          setLoading(false);
          return; // Stop if image upload failed
        }
      }

      // Generate slug from hospital name
      const slug = generateSlug(formData.name);

      // Convert comma-separated strings to arrays
      const hospitalData = {
        ...formData,
        slug,
        image: imageUrl,
        specialties: formData.specialties.split(",").map((s) => s.trim()).filter(Boolean),
        facilities: formData.facilities.split(",").map((s) => s.trim()).filter(Boolean),
        accreditations: formData.accreditations.split(",").map((s) => s.trim()).filter(Boolean),
        expertise: formData.expertise ? formData.expertise.split(",").map((s) => s.trim()).filter(Boolean) : [],
        infrastructure: formData.infrastructure ? formData.infrastructure.split(",").map((s) => s.trim()).filter(Boolean) : [],
        award: formData.award ? formData.award.split(",").map((s) => s.trim()).filter(Boolean) : [],
        additionalInfo: additionalInfo.filter((a) => a.trim() !== ""),
        owner: formData.owner,
        rating: Number(formData.rating),
        reviewCount: Number(formData.reviewCount),
        beds: Number(formData.beds),
        established: Number(formData.established),
      };

      const response = await fetch("/api/hospitals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hospitalData),
      });

      const data = await response.json();

      if (data.success) {
        alert("Hospital created successfully!");
        router.push("/admin/hospitals");
      } else {
        alert("Failed to create hospital: " + data.message);
      }
    } catch (error) {
      console.error("Error creating hospital:", error);
      alert("An error occurred while creating the hospital");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/hospitals">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Hospital</h1>
          <p className="text-gray-600 mt-1">Create a new hospital listing</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Hospital Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Image Upload */}
            <div>
              <Label htmlFor="image">Hospital Image</Label>
              <div className="mt-2">
                {imagePreview ? (
                  <div className="relative w-full h-64 border-2 border-gray-300 rounded-lg overflow-hidden">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview("");
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor="image"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-10 h-10 text-gray-400 mb-3" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, WEBP (MAX. 10MB)</p>
                    </div>
                    <input
                      id="image"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Hospital Name *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter hospital name"
                />
              </div>

              <div>
                <Label htmlFor="type">Hospital Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger id="type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {hospitalTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="location">Full Address *</Label>
                <Input
                  id="location"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Enter complete address"
                />
              </div>

              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Enter city"
                />
              </div>

              <div>
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  placeholder="Enter state"
                />
              </div>

              <div>
                <Label htmlFor="beds">Number of Beds *</Label>
                <Input
                  id="beds"
                  type="number"
                  required
                  value={formData.beds}
                  onChange={(e) => setFormData({ ...formData, beds: parseInt(e.target.value) })}
                  placeholder="Enter number of beds"
                />
              </div>

              <div>
                <Label htmlFor="established">Year Established *</Label>
                <Input
                  id="established"
                  type="number"
                  required
                  value={formData.established}
                  onChange={(e) => setFormData({ ...formData, established: parseInt(e.target.value) })}
                  placeholder="Enter year"
                />
              </div>

              <div>
                <Label htmlFor="rating">Rating (0-5)</Label>
                <Input
                  id="rating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                  placeholder="Enter rating"
                />
              </div>

              <div>
                <Label htmlFor="reviewCount">Review Count</Label>
                <Input
                  id="reviewCount"
                  type="number"
                  value={formData.reviewCount}
                  onChange={(e) => setFormData({ ...formData, reviewCount: parseInt(e.target.value) })}
                  placeholder="Enter review count"
                />
              </div>
            </div>

            {/* Descriptions */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="shortDescription">Short Description *</Label>
                <Textarea
                  id="shortDescription"
                  required
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Enter a brief description (1-2 sentences)"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="description">Full Description *</Label>
                <Textarea
                  id="description"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter detailed description"
                  rows={6}
                />
              </div>
            </div>

            {/* Lists (comma-separated) */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="specialties">Specialties * (comma-separated)</Label>
                <Textarea
                  id="specialties"
                  required
                  value={formData.specialties}
                  onChange={(e) => setFormData({ ...formData, specialties: e.target.value })}
                  placeholder="e.g., Cardiology, Neurology, Orthopedics"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="facilities">Facilities * (comma-separated)</Label>
                <Textarea
                  id="facilities"
                  required
                  value={formData.facilities}
                  onChange={(e) => setFormData({ ...formData, facilities: e.target.value })}
                  placeholder="e.g., ICU, Emergency, CT Scan"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="accreditations">Accreditations * (comma-separated)</Label>
                <Textarea
                  id="accreditations"
                  required
                  value={formData.accreditations}
                  onChange={(e) => setFormData({ ...formData, accreditations: e.target.value })}
                  placeholder="e.g., JCI, NABH, ISO 9001"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="expertise">Areas of Expertise (comma-separated, optional)</Label>
                <Textarea
                  id="expertise"
                  value={formData.expertise}
                  onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                  placeholder="e.g., Heart Transplants, Cancer Treatment"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="infrastructure">Infrastructure Details (comma-separated, optional)</Label>
                <Textarea
                  id="infrastructure"
                  value={formData.infrastructure}
                  onChange={(e) => setFormData({ ...formData, infrastructure: e.target.value })}
                  placeholder="e.g., 5 Operation Theaters, 100 Bed ICU"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="owner">Hospital Owner / Chairman (optional)</Label>
                <Input
                  id="owner"
                  value={formData.owner}
                  onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                  placeholder="e.g., Dr. Prathap C Reddy"
                />
              </div>

              <div>
                <Label htmlFor="award">Awards (comma-separated, optional)</Label>
                <Textarea
                  id="award"
                  value={formData.award}
                  onChange={(e) => setFormData({ ...formData, award: e.target.value })}
                  placeholder="e.g., Best Hospital Award 2024, NABH Excellence Award"
                  rows={2}
                />
              </div>

            </div>

            {/* Additional Information - Dynamic List */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Additional Information (Optional)</CardTitle>
                  <Button type="button" variant="outline" size="sm" onClick={() => setAdditionalInfo([...additionalInfo, ""])}>
                    <Plus className="w-4 h-4 mr-1" /> Add
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {additionalInfo.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={item}
                      onChange={(e) => {
                        const updated = [...additionalInfo];
                        updated[index] = e.target.value;
                        setAdditionalInfo(updated);
                      }}
                      placeholder={`Additional info ${index + 1}`}
                    />
                    {additionalInfo.length > 1 && (
                      <Button type="button" variant="outline" size="icon" onClick={() => setAdditionalInfo(additionalInfo.filter((_, i) => i !== index))}>
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Checkboxes */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="emergency"
                  checked={formData.emergency}
                  onChange={(e) => setFormData({ ...formData, emergency: e.target.checked })}
                  className="w-4 h-4"
                />
                <Label htmlFor="emergency">24/7 Emergency Services</Label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="parking"
                  checked={formData.parking}
                  onChange={(e) => setFormData({ ...formData, parking: e.target.checked })}
                  className="w-4 h-4"
                />
                <Label htmlFor="parking">Parking Available</Label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4"
                />
                <Label htmlFor="featured">Featured Hospital</Label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={loading || uploadingImage} className="bg-green-600 hover:bg-green-700">
                {loading ? "Creating..." : uploadingImage ? "Uploading Image..." : "Create Hospital"}
              </Button>
              <Link href="/admin/hospitals">
                <Button type="button" variant="outline" disabled={loading || uploadingImage}>
                  Cancel
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
