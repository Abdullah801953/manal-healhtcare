"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Save, Loader2, Plus, X, Upload, FileText, Image as ImageIcon, File } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ImageUpload } from "../../../components/ImageUpload";

interface Achievement {
  title: string;
  file?: string;
  fileType?: string;
  fileName?: string;
}

export default function EditDoctorPage() {
  const router = useRouter();
  const params = useParams();
  const doctorId = params.id as string;
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [uploadingAchievement, setUploadingAchievement] = useState<number | null>(null);

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
  const [achievements, setAchievements] = useState<Achievement[]>([{ title: "" }]);

  useEffect(() => {
    fetchDoctor();
  }, [doctorId]);

  const fetchDoctor = async () => {
    try {
      setFetching(true);
      const response = await fetch(`/api/doctors/${doctorId}`);
      const data = await response.json();

      if (data.success) {
        const doctor = data.data;
        setFormData({
          name: doctor.name || "",
          designation: doctor.designation || "",
          hospital: doctor.hospital || "",
          overview: doctor.overview || "",
          experience: doctor.experience || "",
          experienceYears: doctor.experienceYears || "",
          image: doctor.image || "",
          status: doctor.status || "active",
        });
        setImagePreview(doctor.image || "");
        setQualifications(doctor.qualifications?.length ? doctor.qualifications : [""]);
        setSpecializations(doctor.specialization?.length ? doctor.specialization : [""]);
        setClinicalFocus(doctor.clinicalFocus?.length ? doctor.clinicalFocus : [""]);
        
        // Handle achievements - support both old string format and new object format
        if (doctor.achievements?.length) {
          const formattedAchievements = doctor.achievements.map((a: any) => {
            if (typeof a === 'string') {
              return { title: a };
            }
            return a;
          });
          setAchievements(formattedAchievements);
        } else {
          setAchievements([{ title: "" }]);
        }
      }
    } catch (error) {
      console.error('Error fetching doctor:', error);
      setError('Failed to load doctor data');
    } finally {
      setFetching(false);
    }
  };

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

  // Achievement-specific functions
  const addAchievement = () => {
    setAchievements(prev => [...prev, { title: "" }]);
  };

  const removeAchievement = (index: number) => {
    setAchievements(prev => prev.filter((_, i) => i !== index));
  };

  const updateAchievementTitle = (index: number, title: string) => {
    setAchievements(prev => {
      const newAchievements = [...prev];
      newAchievements[index] = { ...newAchievements[index], title };
      return newAchievements;
    });
  };

  const handleAchievementFileUpload = async (index: number, file: File) => {
    setUploadingAchievement(index);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'achievement');

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setAchievements(prev => {
          const newAchievements = [...prev];
          newAchievements[index] = {
            ...newAchievements[index],
            file: data.url,
            fileType: file.type,
            fileName: file.name
          };
          return newAchievements;
        });
      } else {
        setError(data.message || 'Failed to upload file');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to upload file');
    } finally {
      setUploadingAchievement(null);
    }
  };

  const removeAchievementFile = (index: number) => {
    setAchievements(prev => {
      const newAchievements = [...prev];
      newAchievements[index] = {
        ...newAchievements[index],
        file: undefined,
        fileType: undefined,
        fileName: undefined
      };
      return newAchievements;
    });
  };

  const getFileIcon = (fileType?: string) => {
    if (!fileType) return <File className="w-4 h-4" />;
    if (fileType.startsWith('image/')) return <ImageIcon className="w-4 h-4" />;
    if (fileType === 'application/pdf') return <FileText className="w-4 h-4 text-red-500" />;
    return <FileText className="w-4 h-4 text-blue-500" />;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const doctorData = {
        ...formData,
        qualifications: qualifications.filter(q => q.trim() !== ""),
        specialization: specializations.filter(s => s.trim() !== ""),
        clinicalFocus: clinicalFocus.filter(c => c.trim() !== ""),
        achievements: achievements.filter(a => a.title.trim() !== ""),
      };

      console.log('📤 Submitting doctor data with achievements:', doctorData.achievements);

      const response = await fetch(`/api/doctors/${doctorId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(doctorData),
      });

      const data = await response.json();
      console.log('📥 API Response:', data);

      if (data.success) {
        const achievementTitles = doctorData.achievements.map(a => a.title).join(", ");
        setSuccess("Doctor updated successfully! Achievements saved: " + (achievementTitles || "None"));
        // Wait 2 seconds before redirecting so user sees the success message
        setTimeout(() => {
          router.push('/admin/doctors');
        }, 2000);
      } else {
        setError(data.message || 'Failed to update doctor');
      }
    } catch (error) {
      setError('An error occurred while updating doctor');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 text-green-600 animate-spin" />
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold text-gray-900">Edit Doctor</h1>
          <p className="text-gray-600">Update the doctor information</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          ✅ {success}
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

            {/* Achievements */}
            <Card className="rounded-3xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-amber-900">
                  🏆 Awards & Achievements
                  <Button 
                    type="button" 
                    size="sm" 
                    onClick={addAchievement}
                    className="bg-amber-500 hover:bg-amber-600"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="p-4 bg-white rounded-xl border border-amber-200 space-y-3">
                    <div className="flex gap-2">
                      <Input
                        value={achievement.title}
                        onChange={(e) => updateAchievementTitle(index, e.target.value)}
                        placeholder="e.g., Best Doctor Award 2023"
                        className="bg-white flex-1"
                      />
                      {achievements.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAchievement(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    
                    {/* File Upload Section */}
                    <div className="flex items-center gap-3">
                      {achievement.file ? (
                        <div className="flex items-center gap-2 flex-1 p-2 bg-amber-50 rounded-lg border border-amber-200">
                          {getFileIcon(achievement.fileType)}
                          <span className="text-sm text-gray-700 truncate flex-1">
                            {achievement.fileName || 'Uploaded file'}
                          </span>
                          <a 
                            href={achievement.file} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-amber-600 hover:text-amber-800 text-sm font-medium"
                          >
                            View
                          </a>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeAchievementFile(index)}
                            className="text-red-500 hover:text-red-700 h-6 w-6 p-0"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ) : (
                        <label className="flex items-center gap-2 cursor-pointer flex-1 p-2 border-2 border-dashed border-amber-300 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition-colors">
                          {uploadingAchievement === index ? (
                            <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
                          ) : (
                            <Upload className="w-4 h-4 text-amber-500" />
                          )}
                          <span className="text-sm text-gray-600">
                            {uploadingAchievement === index ? 'Uploading...' : 'Upload certificate/document (optional)'}
                          </span>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleAchievementFileUpload(index, file);
                            }}
                            disabled={uploadingAchievement !== null}
                          />
                        </label>
                      )}
                    </div>
                  </div>
                ))}
                <p className="text-xs text-amber-700 mt-2">
                  Add professional awards, recognitions, certifications, and notable achievements. You can optionally upload supporting documents.
                </p>
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
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Update Doctor
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
                  <li>• Update any field as needed</li>
                  <li>• Add/remove qualifications</li>
                  <li>• Modify specializations</li>
                  <li>• Update clinical focus areas</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
