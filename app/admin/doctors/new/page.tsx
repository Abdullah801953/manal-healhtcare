"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Save, Loader2, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ImageUpload } from "../../components/ImageUpload";

export default function NewDoctorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    hospital: "",
    overview: "",
    experience: "",
    experienceYears: "",
    image: "",
    status: "active",
  });

  const [qualifications, setQualifications] = useState<string[]>([""]);
  const [specializations, setSpecializations] = useState<string[]>([""]);
  const [clinicalFocus, setClinicalFocus] = useState<string[]>([""]);

  const handleImageSelect = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImagePreview(base64String);
      setFormData(prev => ({ ...prev, image: base64String }));
    };
    reader.readAsDataURL(file);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (index: number, value: string, setState: React.Dispatch<React.SetStateAction<string[]>>) => {
    setState(prev => {
      const newArray = [...prev];
      newArray[index] = value;
      return newArray;
    });
  };

  const addArrayItem = (setState: React.Dispatch<React.SetStateAction<string[]>>) => {
    setState(prev => [...prev, ""]);
  };

  const removeArrayItem = (index: number, setState: React.Dispatch<React.SetStateAction<string[]>>) => {
    setState(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const doctorData = {
        ...formData,
        qualifications: qualifications.filter(q => q.trim() !== ""),
        specialization: specializations.filter(s => s.trim() !== ""),
        clinicalFocus: clinicalFocus.filter(c => c.trim() !== ""),
      };

      const response = await fetch('/api/doctors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(doctorData),
      });

      const data = await response.json();

      if (data.success) {
        router.push('/admin/doctors');
      } else {
        setError(data.message || 'Failed to create doctor');
      }
    } catch (error) {
      setError('An error occurred while creating doctor');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/doctors">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Doctor</h1>
          <p className="text-gray-600">Fill in the doctor information below</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Doctor Name *
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Dr John Smith"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Designation *
                  </label>
                  <Input
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    placeholder="e.g., Senior Consultant Cardiologist"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hospital *
                  </label>
                  <Input
                    name="hospital"
                    value={formData.hospital}
                    onChange={handleInputChange}
                    placeholder="e.g., Apollo Hospitals, New Delhi"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Experience Years *
                    </label>
                    <Input
                      name="experienceYears"
                      value={formData.experienceYears}
                      onChange={handleInputChange}
                      placeholder="e.g., 20+"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Overview *
                  </label>
                  <textarea
                    name="overview"
                    value={formData.overview}
                    onChange={handleInputChange}
                    placeholder="Brief overview about the doctor..."
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Detailed Experience *
                  </label>
                  <textarea
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    placeholder="Detailed experience description..."
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Qualifications */}
            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Qualifications
                  <Button type="button" size="sm" onClick={() => addArrayItem(setQualifications)}>
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {qualifications.map((qual, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={qual}
                      onChange={(e) => handleArrayChange(index, e.target.value, setQualifications)}
                      placeholder="e.g., MBBS - AIIMS, New Delhi"
                    />
                    {qualifications.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeArrayItem(index, setQualifications)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Specializations */}
            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Specializations
                  <Button type="button" size="sm" onClick={() => addArrayItem(setSpecializations)}>
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {specializations.map((spec, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={spec}
                      onChange={(e) => handleArrayChange(index, e.target.value, setSpecializations)}
                      placeholder="e.g., Heart Surgery"
                    />
                    {specializations.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeArrayItem(index, setSpecializations)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Clinical Focus */}
            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Clinical Focus
                  <Button type="button" size="sm" onClick={() => addArrayItem(setClinicalFocus)}>
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {clinicalFocus.map((focus, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={focus}
                      onChange={(e) => handleArrayChange(index, e.target.value, setClinicalFocus)}
                      placeholder="e.g., Patient-centered care"
                    />
                    {clinicalFocus.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeArrayItem(index, setClinicalFocus)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle>Doctor Image</CardTitle>
              </CardHeader>
              <CardContent>
                <ImageUpload 
                  onImageSelect={handleImageSelect}
                  currentImage={imagePreview}
                  label="Upload Doctor Photo"
                />
              </CardContent>
            </Card>

            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Create Doctor
                    </>
                  )}
                </Button>
                <Link href="/admin/doctors">
                  <Button type="button" variant="outline" className="w-full" disabled={loading}>
                    Cancel
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="rounded-3xl bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <p className="text-sm text-blue-900 font-medium mb-2">💡 Quick Tips</p>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• Fill all required fields (*)</li>
                  <li>• Add multiple qualifications</li>
                  <li>• List all specializations</li>
                  <li>• Include clinical focus areas</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
