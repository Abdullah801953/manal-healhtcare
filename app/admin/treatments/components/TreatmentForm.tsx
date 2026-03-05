"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Loader2, Plus, X, Upload } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface TreatmentFormData {
  title: string;
  slug: string;
  category: string;
  description: string;
  shortDescription: string;
  image: string;
  duration: string;
  price: string;
  featured: boolean;
  status: 'active' | 'inactive';
  // 14 sections (all arrays for Add button support)
  overviewList: string[];        // 1. Overview (mandatory)
  additionalInfo: string[];      // 2. Additional Information
  signsAndSymptoms: string[];    // 3. Signs and Symptoms
  conditionList: string[];       // 4. Condition
  diagnosisList: string[];       // 5. Diagnosis
  treatmentTypes: string[];      // 6. Types of Treatments
  surgeryTypes: string[];        // 7. Types of Surgery
  howItIsDone: string[];         // 8. How It's Done
  purposeList: string[];         // 9. Purpose
  recovery: string[];            // 10. Recovery
  riskList: string[];            // 11. Risk
  successRate: string;           // 12. Success Rate (single field)
  summaryList: string[];         // 13. Summary
  whyIndiaList: string[];        // 14. Why Choose India
  // legacy / backward-compat fields kept in DB
  overview: string;
  benefits: string[];
  procedures: string[];
  overviewList_legacy?: string[];
  descriptionList: string[];
  // other legacy string fields
  types: string;
  purpose: string;
  diseasesTreated: string;
  risks: string;
  summary: string;
  conditions: string;
  diagnosis: string;
  whyIndia: string;
  gvhd: string;
  gvhdSymptoms: string;
  preTransplant: string;
  autologous: string;
  conditioning: string;
  disorders: string;
  oncologyTypes: string;
  domains: string;
  reasons: string;
  cancerTypes: string;
  functions: string;
  specialized: string;
  tests: string;
  neuroplasticity: string;
  areas: string;
  causes: string;
  tumors: string;
  clinical: string;
  surgery: string;
}

type ArrayField =
  | 'overviewList' | 'additionalInfo' | 'signsAndSymptoms' | 'conditionList'
  | 'diagnosisList' | 'treatmentTypes' | 'surgeryTypes' | 'howItIsDone'
  | 'purposeList' | 'recovery' | 'riskList' | 'summaryList' | 'whyIndiaList'
  | 'benefits' | 'procedures' | 'descriptionList';

const EMPTY: TreatmentFormData = {
  title: "", slug: "", category: "", description: "", shortDescription: "",
  image: "", duration: "", price: "", featured: false, status: 'active',
  overviewList: [""], additionalInfo: [""], signsAndSymptoms: [""],
  conditionList: [""], diagnosisList: [""], treatmentTypes: [""],
  surgeryTypes: [""], howItIsDone: [""], purposeList: [""], recovery: [""],
  riskList: [""], successRate: "", summaryList: [""], whyIndiaList: [""],
  overview: "", benefits: [""], procedures: [""], descriptionList: [""],
  types: "", purpose: "", diseasesTreated: "", risks: "", summary: "",
  conditions: "", diagnosis: "", whyIndia: "",
  gvhd: "", gvhdSymptoms: "", preTransplant: "", autologous: "",
  conditioning: "", disorders: "", oncologyTypes: "", domains: "",
  reasons: "", cancerTypes: "", functions: "", specialized: "", tests: "",
  neuroplasticity: "", areas: "", causes: "", tumors: "", clinical: "", surgery: "",
};

export default function TreatmentForm({ id }: { id?: string }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(!!id);
  const [error, setError] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [formData, setFormData] = useState<TreatmentFormData>(EMPTY);

  useEffect(() => { if (id) fetchTreatment(); }, [id]);

  const arr = (v: unknown, fallback = [""]) =>
    Array.isArray(v) && (v as string[]).length > 0 ? (v as string[]) : fallback;

  const fetchTreatment = async () => {
    try {
      setFetchingData(true);
      const res = await fetch(`/api/treatments/${id}`);
      const data = await res.json();
      if (data.success) {
        const t = data.data;
        setFormData({
          ...EMPTY,
          ...t,
          overviewList: arr(t.overviewList, t.overview ? [t.overview] : [""]),
          additionalInfo: arr(t.additionalInfo),
          signsAndSymptoms: arr(t.signsAndSymptoms),
          conditionList: arr(t.conditionList, t.conditions ? [t.conditions] : [""]),
          diagnosisList: arr(t.diagnosisList, t.diagnosis ? [t.diagnosis] : [""]),
          treatmentTypes: arr(t.treatmentTypes, t.types ? [t.types] : [""]),
          surgeryTypes: arr(t.surgeryTypes),
          howItIsDone: arr(t.howItIsDone),
          purposeList: arr(t.purposeList, t.purpose ? [t.purpose] : [""]),
          recovery: arr(t.recovery),
          riskList: arr(t.riskList, t.risks ? [t.risks] : [""]),
          summaryList: arr(t.summaryList, t.summary ? [t.summary] : [""]),
          whyIndiaList: arr(t.whyIndiaList, t.whyIndia ? [t.whyIndia] : [""]),
          benefits: arr(t.benefits),
          procedures: arr(t.procedures),
          descriptionList: arr(t.descriptionList),
          successRate: t.successRate || "",
        });
        if (t.image) setImagePreview(t.image);
      } else {
        setError(data.message || "Failed to fetch treatment");
      }
    } catch {
      setError("Failed to fetch treatment");
    } finally {
      setFetchingData(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      setUploadingImage(true);
      setError("");
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.success) {
        setFormData(prev => ({ ...prev, image: data.url }));
        setImagePreview(data.url);
      } else {
        setError(data.message || "Failed to upload image");
      }
    } catch {
      setError("Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: "" }));
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleChange = (field: keyof TreatmentFormData, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'title' && !id) {
      const slug = (value as string).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleArrayChange = (field: ArrayField, index: number, value: string) => {
    const newArr = [...formData[field]];
    newArr[index] = value;
    setFormData(prev => ({ ...prev, [field]: newArr }));
  };

  const addArrayItem = (field: ArrayField) =>
    setFormData(prev => ({ ...prev, [field]: [...prev[field], ""] }));

  const removeArrayItem = (field: ArrayField, index: number) => {
    if (formData[field].length > 1)
      setFormData(prev => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));
  };

  const clean = (arr: string[]) => arr.filter(v => v.trim() !== "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!formData.title || !formData.category || !formData.description ||
      !formData.overviewList.some(o => o.trim() !== "") || !formData.shortDescription) {
      setError("Please fill in all required fields (Title, Category, Description, Overview, Short Description)");
      return;
    }

    const cleanData = {
      ...formData,
      overviewList: clean(formData.overviewList),
      overview: clean(formData.overviewList).join('\n'),
      additionalInfo: clean(formData.additionalInfo),
      signsAndSymptoms: clean(formData.signsAndSymptoms),
      conditionList: clean(formData.conditionList),
      conditions: clean(formData.conditionList).join('\n'),
      diagnosisList: clean(formData.diagnosisList),
      diagnosis: clean(formData.diagnosisList).join('\n'),
      treatmentTypes: clean(formData.treatmentTypes),
      types: clean(formData.treatmentTypes).join('\n'),
      surgeryTypes: clean(formData.surgeryTypes),
      howItIsDone: clean(formData.howItIsDone),
      purposeList: clean(formData.purposeList),
      purpose: clean(formData.purposeList).join('\n'),
      recovery: clean(formData.recovery),
      riskList: clean(formData.riskList),
      risks: clean(formData.riskList).join('\n'),
      summaryList: clean(formData.summaryList),
      summary: clean(formData.summaryList).join('\n'),
      whyIndiaList: clean(formData.whyIndiaList),
      whyIndia: clean(formData.whyIndiaList).join('\n'),
      benefits: clean(formData.benefits),
      procedures: clean(formData.procedures),
      descriptionList: clean(formData.descriptionList),
    };

    try {
      setLoading(true);
      const url = id ? `/api/treatments/${id}` : '/api/treatments';
      const method = id ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanData),
      });
      const data = await res.json();
      if (data.success) {
        router.push('/admin/treatments');
      } else {
        setError(data.message || "Failed to save treatment");
      }
    } catch {
      setError("Failed to save treatment");
    } finally {
      setLoading(false);
    }
  };

  // Helper to render an array section card
  const ArraySection = ({
    serial, title, field, placeholder, mandatory = false,
  }: {
    serial: number; title: string; field: ArrayField;
    placeholder: string; mandatory?: boolean;
  }) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-green-100 text-green-700 text-sm font-bold">
            {serial}
          </span>
          {title}
          {mandatory && <span className="text-red-500 ml-1">*</span>}
          {!mandatory && <span className="text-xs text-gray-400 font-normal ml-1">(optional)</span>}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {formData[field].map((item, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={item}
              onChange={(e) => handleArrayChange(field, index, e.target.value)}
              placeholder={`${placeholder} ${index + 1}`}
            />
            {formData[field].length > 1 && (
              <Button type="button" variant="outline" size="icon"
                onClick={() => removeArrayItem(field, index)}>
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        ))}
        <Button type="button" variant="outline" onClick={() => addArrayItem(field)}
          className="w-full border-dashed">
          <Plus className="w-4 h-4 mr-2" /> Add {title}
        </Button>
      </CardContent>
    </Card>
  );

  if (fetchingData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/treatments">
          <Button variant="outline" size="icon"><ArrowLeft className="w-4 h-4" /></Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {id ? 'Edit Treatment' : 'Add New Treatment'}
          </h1>
          <p className="text-gray-600 mt-1">
            {id ? 'Update treatment information' : 'Create a new treatment'}
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ── Basic Information ── */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
                <Input id="title" value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="Enter treatment title" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug <span className="text-red-500">*</span></Label>
                <Input id="slug" value={formData.slug}
                  onChange={(e) => handleChange('slug', e.target.value)}
                  placeholder="treatment-slug" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category <span className="text-red-500">*</span></Label>
                <Input id="category" value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  placeholder="e.g., Cardiology, Oncology" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shortDescription">Short Description <span className="text-red-500">*</span></Label>
                <Input id="shortDescription" value={formData.shortDescription}
                  onChange={(e) => handleChange('shortDescription', e.target.value)}
                  placeholder="Brief 1-2 sentence description" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description <span className="text-red-500">*</span></Label>
              <Textarea id="description" value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Full treatment description" rows={3} required />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label>Treatment Image</Label>
              <div className="space-y-4">
                {imagePreview && (
                  <div className="relative w-full max-w-md">
                    <div className="relative h-48 w-full rounded-lg overflow-hidden border">
                      <Image src={imagePreview} alt="Treatment preview" fill className="object-cover" />
                    </div>
                    <Button type="button" variant="destructive" size="sm"
                      className="absolute top-2 right-2" onClick={removeImage}>
                      <X className="w-4 h-4 mr-1" /> Remove
                    </Button>
                  </div>
                )}
                <div className="flex gap-4">
                  <input ref={fileInputRef} type="file" accept="image/*"
                    onChange={handleFileChange} className="hidden" />
                  <Button type="button" variant="outline"
                    onClick={() => fileInputRef.current?.click()} disabled={uploadingImage}>
                    {uploadingImage
                      ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Uploading...</>
                      : <><Upload className="w-4 h-4 mr-2" /> Upload Image</>}
                  </Button>
                  <div className="flex-1 flex items-center gap-2">
                    <span className="text-sm text-gray-500">or</span>
                    <Input value={formData.image}
                      onChange={(e) => { handleChange('image', e.target.value); setImagePreview(e.target.value); }}
                      placeholder="Enter image URL" className="flex-1" />
                  </div>
                </div>
                <p className="text-xs text-gray-500">Supported: JPEG, PNG, WebP, AVIF (Max 5MB)</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input id="duration" value={formData.duration}
                  onChange={(e) => handleChange('duration', e.target.value)}
                  placeholder="e.g., 2-3 hours" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input id="price" value={formData.price}
                  onChange={(e) => handleChange('price', e.target.value)}
                  placeholder="e.g., $5,000 - $10,000" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch id="featured" checked={formData.featured}
                  onCheckedChange={(v: boolean) => handleChange('featured', v)} />
                <Label htmlFor="featured">Featured Treatment</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="status">Status:</Label>
                <select id="status" value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value as 'active' | 'inactive')}
                  className="border rounded px-3 py-2">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ── Section 1: Overview (MANDATORY) ── */}
        <ArraySection serial={1} title="Overview" field="overviewList"
          placeholder="Overview point" mandatory />

        {/* ── Section 2: Additional Information ── */}
        <ArraySection serial={2} title="Additional Information" field="additionalInfo"
          placeholder="Additional info" />

        {/* ── Section 3: Signs and Symptoms ── */}
        <ArraySection serial={3} title="Signs and Symptoms" field="signsAndSymptoms"
          placeholder="Sign / Symptom" />

        {/* ── Section 4: Condition ── */}
        <ArraySection serial={4} title="Condition" field="conditionList"
          placeholder="Condition" />

        {/* ── Section 5: Diagnosis ── */}
        <ArraySection serial={5} title="Diagnosis" field="diagnosisList"
          placeholder="Diagnosis point" />

        {/* ── Section 6: Types of Treatments ── */}
        <ArraySection serial={6} title="Types of Treatments" field="treatmentTypes"
          placeholder="Treatment type" />

        {/* ── Section 7: Types of Surgery ── */}
        <ArraySection serial={7} title="Types of Surgery" field="surgeryTypes"
          placeholder="Surgery type" />

        {/* ── Section 8: How It's Done ── */}
        <ArraySection serial={8} title="How It's Done" field="howItIsDone"
          placeholder="Step" />

        {/* ── Section 9: Purpose ── */}
        <ArraySection serial={9} title="Purpose" field="purposeList"
          placeholder="Purpose point" />

        {/* ── Section 10: Recovery ── */}
        <ArraySection serial={10} title="Recovery" field="recovery"
          placeholder="Recovery detail" />

        {/* ── Section 11: Risk ── */}
        <ArraySection serial={11} title="Risk" field="riskList"
          placeholder="Risk / Complication" />

        {/* ── Section 12: Success Rate ── */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-green-100 text-green-700 text-sm font-bold">
                12
              </span>
              Success Rate
              <span className="text-xs text-gray-400 font-normal ml-1">(optional)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Input id="successRate" value={formData.successRate}
              onChange={(e) => handleChange('successRate', e.target.value)}
              placeholder="e.g., 95% success rate" />
          </CardContent>
        </Card>

        {/* ── Section 13: Summary ── */}
        <ArraySection serial={13} title="Summary" field="summaryList"
          placeholder="Summary point" />

        {/* ── Section 14: Why Choose India ── */}
        <ArraySection serial={14} title="Why Choose India" field="whyIndiaList"
          placeholder="Reason" />

        {/* ── Submit ── */}
        <div className="flex justify-end gap-4">
          <Link href="/admin/treatments">
            <Button type="button" variant="outline">Cancel</Button>
          </Link>
          <Button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700">
            {loading
              ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</>
              : id ? 'Update Treatment' : 'Create Treatment'}
          </Button>
        </div>
      </form>
    </div>
  );
}
