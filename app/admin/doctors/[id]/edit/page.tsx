"use client";

import { useState, useEffect } from "react";
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

function SerialBadge({ n }: { n: number }) {
  return (
    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-green-100 text-green-700 text-sm font-bold shrink-0">
      {n}
    </span>
  );
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
  const [uploadingImage, setUploadingImage] = useState(false);
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
  const [treatments, setTreatments] = useState<string[]>([""]);
  const [overviewList, setOverviewList] = useState<string[]>([""]);
  const [experienceDetails, setExperienceDetails] = useState<string[]>([""]);
  const [additionalInfo, setAdditionalInfo] = useState<string[]>([""]);
  const [researchPublications, setResearchPublications] = useState<string[]>([""]);
  const [whyChoose, setWhyChoose] = useState<string[]>([""]);
  const [achievements, setAchievements] = useState<Achievement[]>([{ title: "" }]);

  useEffect(() => { fetchDoctor(); }, [doctorId]);

  const fetchDoctor = async () => {
    try {
      setFetching(true);
      const res = await fetch(`/api/doctors/${doctorId}`);
      const data = await res.json();
      if (data.success) {
        const d = data.data;
        setFormData({
          name: d.name || "",
          designation: d.designation || "",
          hospital: d.hospital || "",
          overview: d.overview || "",
          experience: d.experience || "",
          experienceYears: d.experienceYears || "",
          image: d.image || "",
          status: d.status || "active",
        });
        setImagePreview(d.image || "");
        setQualifications(d.qualifications?.length ? d.qualifications : [""]);
        setSpecializations(d.specialization?.length ? d.specialization : [""]);
        setClinicalFocus(d.clinicalFocus?.length ? d.clinicalFocus : [""]);
        setTreatments(d.treatments?.length ? d.treatments : [""]);
        setOverviewList(d.overviewList?.length ? d.overviewList : [""]);
        setExperienceDetails(d.experienceDetails?.length ? d.experienceDetails : [""]);
        setAdditionalInfo(d.additionalInfo?.length ? d.additionalInfo : [""]);
        setResearchPublications(d.researchPublications?.length ? d.researchPublications : [""]);
        setWhyChoose(d.whyChoose?.length ? d.whyChoose : [""]);
        if (d.achievements?.length) {
          setAchievements(d.achievements.map((a: any) => typeof a === 'string' ? { title: a } : a));
        } else {
          setAchievements([{ title: "" }]);
        }
      }
    } catch { setError('Failed to load doctor data'); }
    finally { setFetching(false); }
  };

  const handleImageSelect = async (file: File) => {
    setUploadingImage(true);
    setError("");
    try {
      // Create preview locally for immediate feedback
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload to server
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'doctor');
      
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      const data = await res.json();
      if (data.success) {
        // Store only the URL, not base64
        setFormData(prev => ({ ...prev, image: data.url }));
      } else {
        setError(data.message || 'Failed to upload image');
      }
    } catch (err) {
      setError('Failed to upload image');
      console.error(err);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (index: number, value: string, setState: React.Dispatch<React.SetStateAction<string[]>>) => {
    setState(prev => { const a = [...prev]; a[index] = value; return a; });
  };

  const addArrayItem = (setState: React.Dispatch<React.SetStateAction<string[]>>) => {
    setState(prev => [...prev, ""]);
  };

  const removeArrayItem = (index: number, setState: React.Dispatch<React.SetStateAction<string[]>>) => {
    setState(prev => prev.filter((_, i) => i !== index));
  };

  const addAchievement = () => setAchievements(prev => [...prev, { title: "" }]);
  const removeAchievement = (index: number) => setAchievements(prev => prev.filter((_, i) => i !== index));
  const updateAchievementTitle = (index: number, title: string) =>
    setAchievements(prev => { const a = [...prev]; a[index] = { ...a[index], title }; return a; });

  const handleAchievementFileUpload = async (index: number, file: File) => {
    setUploadingAchievement(index);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('type', 'achievement');
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.success) {
        setAchievements(prev => {
          const a = [...prev];
          a[index] = { ...a[index], file: data.url, fileType: file.type, fileName: file.name };
          return a;
        });
      } else setError(data.message || 'Failed to upload file');
    } catch { setError('Failed to upload file'); }
    finally { setUploadingAchievement(null); }
  };

  const removeAchievementFile = (index: number) =>
    setAchievements(prev => {
      const a = [...prev];
      a[index] = { ...a[index], file: undefined, fileType: undefined, fileName: undefined };
      return a;
    });

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
        treatments: treatments.filter(t => t.trim() !== ""),
        overviewList: overviewList.filter(o => o.trim() !== ""),
        experienceDetails: experienceDetails.filter(d => d.trim() !== ""),
        additionalInfo: additionalInfo.filter(a => a.trim() !== ""),
        researchPublications: researchPublications.filter(r => r.trim() !== ""),
        whyChoose: whyChoose.filter(w => w.trim() !== ""),
        achievements: achievements.filter(a => a.title.trim() !== ""),
      };
      const res = await fetch(`/api/doctors/${doctorId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(doctorData),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess("Doctor updated successfully!");
        setTimeout(() => router.push('/admin/doctors'), 2000);
      } else setError(data.message || 'Failed to update doctor');
    } catch { setError('An error occurred while updating doctor'); }
    finally { setLoading(false); }
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
      <div className="flex items-center gap-4">
        <Link href="/admin/doctors">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Doctor</h1>
          <p className="text-gray-600">Update the doctor information</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">✅ {success}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── Main Column ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Basic Information */}
            <Card className="rounded-3xl">
              <CardHeader><CardTitle>Basic Information</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Doctor Name *</label>
                  <Input name="name" value={formData.name} onChange={handleInputChange}
                    placeholder="e.g., Dr John Smith" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Designation *</label>
                  <Input name="designation" value={formData.designation} onChange={handleInputChange}
                    placeholder="e.g., Senior Consultant Cardiologist" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hospital *</label>
                  <Input name="hospital" value={formData.hospital} onChange={handleInputChange}
                    placeholder="e.g., Apollo Hospitals, New Delhi" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Experience Years *</label>
                    <Input name="experienceYears" value={formData.experienceYears} onChange={handleInputChange}
                      placeholder="e.g., 20+" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select name="status" value={formData.status} onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Specializations (no serial) */}
            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Specializations
                  <Button type="button" size="sm" onClick={() => addArrayItem(setSpecializations)}>
                    <Plus className="w-4 h-4 mr-1" /> Add
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {specializations.map((spec, index) => (
                  <div key={index} className="flex gap-2">
                    <Input value={spec}
                      onChange={(e) => handleArrayChange(index, e.target.value, setSpecializations)}
                      placeholder="e.g., Heart Surgery" />
                    {specializations.length > 1 && (
                      <Button type="button" variant="ghost" size="sm"
                        onClick={() => removeArrayItem(index, setSpecializations)}>
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Treatments (no serial) */}
            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  List of Treatments
                  <Button type="button" size="sm" onClick={() => addArrayItem(setTreatments)}>
                    <Plus className="w-4 h-4 mr-1" /> Add
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {treatments.map((treatment, index) => (
                  <div key={index} className="flex gap-2">
                    <Input value={treatment}
                      onChange={(e) => handleArrayChange(index, e.target.value, setTreatments)}
                      placeholder="e.g., Knee Replacement Surgery" />
                    {treatments.length > 1 && (
                      <Button type="button" variant="ghost" size="sm"
                        onClick={() => removeArrayItem(index, setTreatments)}>
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* ── SECTION 1: Overview & Detailed Experience ── */}
            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SerialBadge n={1} /> Overview & Detailed Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Overview *</label>
                  <textarea name="overview" value={formData.overview} onChange={handleInputChange}
                    placeholder="Brief overview about the doctor..." required rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">Overview Points</label>
                    <Button type="button" size="sm" variant="outline" onClick={() => addArrayItem(setOverviewList)}>
                      <Plus className="w-4 h-4 mr-1" /> Add Point
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {overviewList.map((item, index) => (
                      <div key={index} className="flex gap-2">
                        <Input value={item}
                          onChange={(e) => handleArrayChange(index, e.target.value, setOverviewList)}
                          placeholder={`Overview point ${index + 1}`} />
                        {overviewList.length > 1 && (
                          <Button type="button" variant="ghost" size="sm"
                            onClick={() => removeArrayItem(index, setOverviewList)}>
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <hr />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Detailed Experience *</label>
                  <textarea name="experience" value={formData.experience} onChange={handleInputChange}
                    placeholder="Detailed experience description..." required rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">Experience Details</label>
                    <Button type="button" size="sm" variant="outline" onClick={() => addArrayItem(setExperienceDetails)}>
                      <Plus className="w-4 h-4 mr-1" /> Add Detail
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {experienceDetails.map((detail, index) => (
                      <div key={index} className="flex gap-2">
                        <Input value={detail}
                          onChange={(e) => handleArrayChange(index, e.target.value, setExperienceDetails)}
                          placeholder={`Experience detail ${index + 1}`} />
                        {experienceDetails.length > 1 && (
                          <Button type="button" variant="ghost" size="sm"
                            onClick={() => removeArrayItem(index, setExperienceDetails)}>
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ── SECTION 2: Qualification ── */}
            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><SerialBadge n={2} /> Qualification</span>
                  <Button type="button" size="sm" onClick={() => addArrayItem(setQualifications)}>
                    <Plus className="w-4 h-4 mr-1" /> Add
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {qualifications.map((qual, index) => (
                  <div key={index} className="flex gap-2">
                    <Input value={qual}
                      onChange={(e) => handleArrayChange(index, e.target.value, setQualifications)}
                      placeholder="e.g., MBBS - AIIMS, New Delhi" />
                    {qualifications.length > 1 && (
                      <Button type="button" variant="ghost" size="sm"
                        onClick={() => removeArrayItem(index, setQualifications)}>
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* ── SECTION 3: Clinical Focus ── */}
            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><SerialBadge n={3} /> Clinical Focus</span>
                  <Button type="button" size="sm" onClick={() => addArrayItem(setClinicalFocus)}>
                    <Plus className="w-4 h-4 mr-1" /> Add
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {clinicalFocus.map((focus, index) => (
                  <div key={index} className="flex gap-2">
                    <Input value={focus}
                      onChange={(e) => handleArrayChange(index, e.target.value, setClinicalFocus)}
                      placeholder="e.g., Patient-centered care" />
                    {clinicalFocus.length > 1 && (
                      <Button type="button" variant="ghost" size="sm"
                        onClick={() => removeArrayItem(index, setClinicalFocus)}>
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* ── SECTION 4: Additional Information ── */}
            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><SerialBadge n={4} /> Additional Information</span>
                  <Button type="button" size="sm" onClick={() => addArrayItem(setAdditionalInfo)}>
                    <Plus className="w-4 h-4 mr-1" /> Add
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {additionalInfo.map((info, index) => (
                  <div key={index} className="flex gap-2">
                    <Input value={info}
                      onChange={(e) => handleArrayChange(index, e.target.value, setAdditionalInfo)}
                      placeholder="e.g., Fluent in English, Hindi, and Arabic" />
                    {additionalInfo.length > 1 && (
                      <Button type="button" variant="ghost" size="sm"
                        onClick={() => removeArrayItem(index, setAdditionalInfo)}>
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* ── SECTION 5: Research & Publication ── */}
            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><SerialBadge n={5} /> Research & Publication</span>
                  <Button type="button" size="sm" onClick={() => addArrayItem(setResearchPublications)}>
                    <Plus className="w-4 h-4 mr-1" /> Add
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {researchPublications.map((pub, index) => (
                  <div key={index} className="flex gap-2">
                    <Input value={pub}
                      onChange={(e) => handleArrayChange(index, e.target.value, setResearchPublications)}
                      placeholder="e.g., Published in Journal of Medicine 2024" />
                    {researchPublications.length > 1 && (
                      <Button type="button" variant="ghost" size="sm"
                        onClick={() => removeArrayItem(index, setResearchPublications)}>
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* ── SECTION 6: Award & Achievement ── */}
            <Card className="rounded-3xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-amber-900">
                  <span className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-200 text-amber-800 text-sm font-bold">6</span>
                    🏆 Award & Achievement
                  </span>
                  <Button type="button" size="sm" onClick={addAchievement}
                    className="bg-amber-500 hover:bg-amber-600">
                    <Plus className="w-4 h-4 mr-1" /> Add
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="p-4 bg-white rounded-xl border border-amber-200 space-y-3">
                    <div className="flex gap-2">
                      <Input value={achievement.title}
                        onChange={(e) => updateAchievementTitle(index, e.target.value)}
                        placeholder="e.g., Best Doctor Award 2023" className="bg-white flex-1" />
                      {achievements.length > 1 && (
                        <Button type="button" variant="ghost" size="sm"
                          onClick={() => removeAchievement(index)}
                          className="text-red-500 hover:text-red-700">
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      {achievement.file ? (
                        <div className="flex items-center gap-2 flex-1 p-2 bg-amber-50 rounded-lg border border-amber-200">
                          {getFileIcon(achievement.fileType)}
                          <span className="text-sm text-gray-700 truncate flex-1">
                            {achievement.fileName || 'Uploaded file'}
                          </span>
                          <a href={achievement.file} target="_blank" rel="noopener noreferrer"
                            className="text-amber-600 hover:text-amber-800 text-sm font-medium">View</a>
                          <Button type="button" variant="ghost" size="sm"
                            onClick={() => removeAchievementFile(index)}
                            className="text-red-500 hover:text-red-700 h-6 w-6 p-0">
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ) : (
                        <label className="flex items-center gap-2 cursor-pointer flex-1 p-2 border-2 border-dashed border-amber-300 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition-colors">
                          {uploadingAchievement === index
                            ? <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
                            : <Upload className="w-4 h-4 text-amber-500" />}
                          <span className="text-sm text-gray-600">
                            {uploadingAchievement === index ? 'Uploading...' : 'Upload certificate/document (optional)'}
                          </span>
                          <input type="file" className="hidden"
                            accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
                            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleAchievementFileUpload(index, f); }}
                            disabled={uploadingAchievement !== null} />
                        </label>
                      )}
                    </div>
                  </div>
                ))}
                <p className="text-xs text-amber-700 mt-2">
                  Add awards, recognitions, certifications, and achievements. Optionally upload supporting documents.
                </p>
              </CardContent>
            </Card>

            {/* ── SECTION 7: Why Choose This Doctor ── */}
            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><SerialBadge n={7} /> Why Choose This Doctor</span>
                  <Button type="button" size="sm" onClick={() => addArrayItem(setWhyChoose)}>
                    <Plus className="w-4 h-4 mr-1" /> Add
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {whyChoose.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <Input value={item}
                      onChange={(e) => handleArrayChange(index, e.target.value, setWhyChoose)}
                      placeholder="e.g., Internationally trained in robotic surgery" />
                    {whyChoose.length > 1 && (
                      <Button type="button" variant="ghost" size="sm"
                        onClick={() => removeArrayItem(index, setWhyChoose)}>
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-6">
            <Card className="rounded-3xl">
              <CardHeader><CardTitle>Doctor Image</CardTitle></CardHeader>
              <CardContent>
                <ImageUpload onImageSelect={handleImageSelect} currentImage={imagePreview}
                  label="Upload Doctor Photo" />
              </CardContent>
            </Card>

            <Card className="rounded-3xl">
              <CardHeader><CardTitle>Actions</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <Button type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                  disabled={loading}>
                  {loading
                    ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...</>
                    : <><Save className="mr-2 h-4 w-4" /> Update Doctor</>}
                </Button>
                <Link href="/admin/doctors">
                  <Button type="button" variant="outline" className="w-full" disabled={loading}>Cancel</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="rounded-3xl bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <p className="text-sm text-blue-900 font-medium mb-2">💡 Quick Tips</p>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• Update any field as needed</li>
                  <li>• Add/remove specializations</li>
                  <li>• Modify treatments list</li>
                  <li>• Complete all 7 sections</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
