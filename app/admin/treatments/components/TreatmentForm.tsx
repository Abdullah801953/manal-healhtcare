"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Loader2, Plus, X, Upload, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface TreatmentFormData {
  title: string;
  slug: string;
  category: string;
  description: string;
  overview: string;
  types: string;
  purpose: string;
  diseasesTreated: string;
  risks: string;
  summary: string;
  shortDescription: string;
  image: string;
  duration: string;
  price: string;
  featured: boolean;
  status: 'active' | 'inactive';
  benefits: string[];
  procedures: string[];
  // Additional fields
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
  conditions: string;
  diagnosis: string;
  functions: string;
  specialized: string;
  tests: string;
  neuroplasticity: string;
  areas: string;
  causes: string;
  tumors: string;
  clinical: string;
  surgery: string;
  whyIndia: string;
  signsAndSymptoms: string[];
  howItIsDone: string[];
  recovery: string[];
  additionalInfo: string[];
  successRate: string;
  overviewList: string[];
  descriptionList: string[];
}

export default function TreatmentForm({ id }: { id?: string }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(!!id);
  const [error, setError] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  
  const [formData, setFormData] = useState<TreatmentFormData>({
    title: "",
    slug: "",
    category: "",
    description: "",
    overview: "",
    types: "",
    purpose: "",
    diseasesTreated: "",
    risks: "",
    summary: "",
    shortDescription: "",
    image: "",
    duration: "",
    price: "",
    featured: false,
    status: 'active',
    benefits: [""],
    procedures: [""],
    gvhd: "",
    gvhdSymptoms: "",
    preTransplant: "",
    autologous: "",
    conditioning: "",
    disorders: "",
    oncologyTypes: "",
    domains: "",
    reasons: "",
    cancerTypes: "",
    conditions: "",
    diagnosis: "",
    functions: "",
    specialized: "",
    tests: "",
    neuroplasticity: "",
    areas: "",
    causes: "",
    tumors: "",
    clinical: "",
    surgery: "",
    whyIndia: "",
    signsAndSymptoms: [""],
    howItIsDone: [""],
    recovery: [""],
    additionalInfo: [""],
    successRate: "",
    overviewList: [""],
    descriptionList: [""],
  });

  useEffect(() => {
    if (id) {
      fetchTreatment();
    }
  }, [id]);

  const fetchTreatment = async () => {
    try {
      setFetchingData(true);
      const response = await fetch(`/api/treatments/${id}`);
      const data = await response.json();
      
      if (data.success) {
        const treatment = data.data;
        setFormData({
          ...treatment,
          benefits: treatment.benefits?.length > 0 ? treatment.benefits : [""],
          procedures: treatment.procedures?.length > 0 ? treatment.procedures : [""],
          // Ensure all optional fields are strings
          types: treatment.types || "",
          purpose: treatment.purpose || "",
          diseasesTreated: treatment.diseasesTreated || "",
          risks: treatment.risks || "",
          summary: treatment.summary || "",
          image: treatment.image || "",
          duration: treatment.duration || "",
          price: treatment.price || "",
          gvhd: treatment.gvhd || "",
          gvhdSymptoms: treatment.gvhdSymptoms || "",
          preTransplant: treatment.preTransplant || "",
          autologous: treatment.autologous || "",
          conditioning: treatment.conditioning || "",
          disorders: treatment.disorders || "",
          oncologyTypes: treatment.oncologyTypes || "",
          domains: treatment.domains || "",
          reasons: treatment.reasons || "",
          cancerTypes: treatment.cancerTypes || "",
          conditions: treatment.conditions || "",
          diagnosis: treatment.diagnosis || "",
          functions: treatment.functions || "",
          specialized: treatment.specialized || "",
          tests: treatment.tests || "",
          neuroplasticity: treatment.neuroplasticity || "",
          areas: treatment.areas || "",
          causes: treatment.causes || "",
          tumors: treatment.tumors || "",
          clinical: treatment.clinical || "",
          surgery: treatment.surgery || "",
          whyIndia: treatment.whyIndia || "",
          signsAndSymptoms: treatment.signsAndSymptoms?.length > 0 ? treatment.signsAndSymptoms : [""],
          howItIsDone: treatment.howItIsDone?.length > 0 ? treatment.howItIsDone : [""],
          recovery: treatment.recovery?.length > 0 ? treatment.recovery : [""],
          additionalInfo: treatment.additionalInfo?.length > 0 ? treatment.additionalInfo : [""],
          successRate: treatment.successRate || "",
          overviewList: treatment.overviewList?.length > 0 ? treatment.overviewList : [""],
          descriptionList: treatment.descriptionList?.length > 0 ? treatment.descriptionList : [""],
        });
        // Set image preview if treatment has an image
        if (treatment.image) {
          setImagePreview(treatment.image);
        }
      } else {
        setError(data.message || "Failed to fetch treatment");
      }
    } catch (error) {
      console.error('Error fetching treatment:', error);
      setError("Failed to fetch treatment");
    } finally {
      setFetchingData(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      setUploadingImage(true);
      setError("");

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setFormData(prev => ({ ...prev, image: data.url }));
        setImagePreview(data.url);
      } else {
        setError(data.message || "Failed to upload image");
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setError("Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: "" }));
    setImagePreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleChange = (field: keyof TreatmentFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-generate slug from title
    if (field === 'title' && !id) {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

type ArrayField = 'benefits' | 'procedures' | 'signsAndSymptoms' | 'howItIsDone' | 'recovery' | 'additionalInfo' | 'overviewList' | 'descriptionList';

  const handleArrayChange = (field: ArrayField, index: number, value: string) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field: ArrayField) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], ""]
    }));
  };

  const removeArrayItem = (field: ArrayField, index: number) => {
    if (formData[field].length > 1) {
      const newArray = formData[field].filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, [field]: newArray }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Validate required fields
    if (!formData.title || !formData.category || !formData.description || !formData.overview || !formData.shortDescription) {
      setError("Please fill in all required fields");
      return;
    }

    // Filter out empty strings from arrays
    const cleanData = {
      ...formData,
      benefits: formData.benefits.filter(b => b.trim() !== ""),
      procedures: formData.procedures.filter(p => p.trim() !== ""),
      signsAndSymptoms: formData.signsAndSymptoms.filter(s => s.trim() !== ""),
      howItIsDone: formData.howItIsDone.filter(h => h.trim() !== ""),
      recovery: formData.recovery.filter(r => r.trim() !== ""),
      additionalInfo: formData.additionalInfo.filter(a => a.trim() !== ""),
      overviewList: formData.overviewList.filter(o => o.trim() !== ""),
      descriptionList: formData.descriptionList.filter(d => d.trim() !== ""),
    };

    try {
      setLoading(true);
      const url = id ? `/api/treatments/${id}` : '/api/treatments';
      const method = id ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanData),
      });

      const data = await response.json();

      if (data.success) {
        router.push('/admin/treatments');
      } else {
        setError(data.message || "Failed to save treatment");
      }
    } catch (error) {
      console.error('Error saving treatment:', error);
      setError("Failed to save treatment");
    } finally {
      setLoading(false);
    }
  };

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
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
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
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="Enter treatment title"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleChange('slug', e.target.value)}
                  placeholder="treatment-slug"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  placeholder="e.g., Cardiology, Oncology"
                  required
                />
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="space-y-2">
              <Label>Treatment Image</Label>
              <div className="space-y-4">
                {/* Image Preview */}
                {imagePreview && (
                  <div className="relative w-full max-w-md">
                    <div className="relative h-48 w-full rounded-lg overflow-hidden border">
                      <Image
                        src={imagePreview}
                        alt="Treatment preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={removeImage}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                )}

                {/* Upload Button */}
                <div className="flex gap-4">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                  >
                    {uploadingImage ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Image
                      </>
                    )}
                  </Button>
                  
                  {/* Or use URL */}
                  <div className="flex-1 flex items-center gap-2">
                    <span className="text-sm text-gray-500">or</span>
                    <Input
                      value={formData.image}
                      onChange={(e) => {
                        handleChange('image', e.target.value);
                        setImagePreview(e.target.value);
                      }}
                      placeholder="Enter image URL"
                      className="flex-1"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Supported formats: JPEG, PNG, WebP, AVIF (Max 5MB)
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="shortDescription">Short Description *</Label>
              <Textarea
                id="shortDescription"
                value={formData.shortDescription}
                onChange={(e) => handleChange('shortDescription', e.target.value)}
                placeholder="Brief description (1-2 sentences)"
                rows={2}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => handleChange('duration', e.target.value)}
                  placeholder="e.g., 2-3 hours"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  value={formData.price}
                  onChange={(e) => handleChange('price', e.target.value)}
                  placeholder="e.g., $5,000 - $10,000"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked: boolean) => handleChange('featured', checked)}
                />
                <Label htmlFor="featured">Featured Treatment</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="status">Status:</Label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value as 'active' | 'inactive')}
                  className="border rounded px-3 py-2"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Information */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Full treatment description (supports markdown)"
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="overview">Overview *</Label>
              <Textarea
                id="overview"
                value={formData.overview}
                onChange={(e) => handleChange('overview', e.target.value)}
                placeholder="Treatment overview"
                rows={4}
                required
              />
            </div>
            

            <div className="space-y-2">
              <Label htmlFor="types">Types</Label>
              <Textarea
                id="types"
                value={formData.types}
                onChange={(e) => handleChange('types', e.target.value)}
                placeholder="Different types of this treatment"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose</Label>
              <Textarea
                id="purpose"
                value={formData.purpose}
                onChange={(e) => handleChange('purpose', e.target.value)}
                placeholder="Purpose of the treatment"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="diseasesTreated">Diseases Treated</Label>
              <Textarea
                id="diseasesTreated"
                value={formData.diseasesTreated}
                onChange={(e) => handleChange('diseasesTreated', e.target.value)}
                placeholder="List of diseases treated"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="risks">Risks</Label>
              <Textarea
                id="risks"
                value={formData.risks}
                onChange={(e) => handleChange('risks', e.target.value)}
                placeholder="Potential risks and complications"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="summary">Summary</Label>
              <Textarea
                id="summary"
                value={formData.summary}
                onChange={(e) => handleChange('summary', e.target.value)}
                placeholder="Treatment summary"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <Card>
          <CardHeader>
            <CardTitle>Benefits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.benefits.map((benefit, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={benefit}
                  onChange={(e) => handleArrayChange('benefits', index, e.target.value)}
                  placeholder={`Benefit ${index + 1}`}
                />
                {formData.benefits.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeArrayItem('benefits', index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => addArrayItem('benefits')}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Benefit
            </Button>
          </CardContent>
        </Card>

        {/* Procedures */}
        <Card>
          <CardHeader>
            <CardTitle>Procedures</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.procedures.map((procedure, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={procedure}
                  onChange={(e) => handleArrayChange('procedures', index, e.target.value)}
                  placeholder={`Procedure ${index + 1}`}
                />
                {formData.procedures.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeArrayItem('procedures', index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => addArrayItem('procedures')}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Procedure
            </Button>
          </CardContent>
        </Card>

        {/* Additional Fields (Optional) */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Information (Optional)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gvhd">GVHD Information</Label>
                <Textarea
                  id="gvhd"
                  value={formData.gvhd}
                  onChange={(e) => handleChange('gvhd', e.target.value)}
                  placeholder="Graft versus host disease information"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gvhdSymptoms">GVHD Symptoms</Label>
                <Textarea
                  id="gvhdSymptoms"
                  value={formData.gvhdSymptoms}
                  onChange={(e) => handleChange('gvhdSymptoms', e.target.value)}
                  placeholder="GVHD symptoms"
                  rows={2}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="conditions">Conditions</Label>
                <Textarea
                  id="conditions"
                  value={formData.conditions}
                  onChange={(e) => handleChange('conditions', e.target.value)}
                  placeholder="Conditions treated"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="diagnosis">Diagnosis</Label>
                <Textarea
                  id="diagnosis"
                  value={formData.diagnosis}
                  onChange={(e) => handleChange('diagnosis', e.target.value)}
                  placeholder="Diagnosis methods"
                  rows={2}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="whyIndia">Why India</Label>
              <Textarea
                id="whyIndia"
                value={formData.whyIndia}
                onChange={(e) => handleChange('whyIndia', e.target.value)}
                placeholder="Why choose India for this treatment"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* New Dynamic List Fields */}
        <Card>
          <CardHeader>
            <CardTitle>Overview Points</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.overviewList.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={item}
                  onChange={(e) => handleArrayChange('overviewList', index, e.target.value)}
                  placeholder={`Overview point ${index + 1}`}
                />
                {formData.overviewList.length > 1 && (
                  <Button type="button" variant="outline" size="icon" onClick={() => removeArrayItem('overviewList', index)}>
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" onClick={() => addArrayItem('overviewList')} className="w-full">
              <Plus className="w-4 h-4 mr-2" /> Add Overview Point
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Description Points</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.descriptionList.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={item}
                  onChange={(e) => handleArrayChange('descriptionList', index, e.target.value)}
                  placeholder={`Description point ${index + 1}`}
                />
                {formData.descriptionList.length > 1 && (
                  <Button type="button" variant="outline" size="icon" onClick={() => removeArrayItem('descriptionList', index)}>
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" onClick={() => addArrayItem('descriptionList')} className="w-full">
              <Plus className="w-4 h-4 mr-2" /> Add Description Point
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Signs & Symptoms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.signsAndSymptoms.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={item}
                  onChange={(e) => handleArrayChange('signsAndSymptoms', index, e.target.value)}
                  placeholder={`Symptom ${index + 1}`}
                />
                {formData.signsAndSymptoms.length > 1 && (
                  <Button type="button" variant="outline" size="icon" onClick={() => removeArrayItem('signsAndSymptoms', index)}>
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" onClick={() => addArrayItem('signsAndSymptoms')} className="w-full">
              <Plus className="w-4 h-4 mr-2" /> Add Symptom
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How It Is Done</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.howItIsDone.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={item}
                  onChange={(e) => handleArrayChange('howItIsDone', index, e.target.value)}
                  placeholder={`Step ${index + 1}`}
                />
                {formData.howItIsDone.length > 1 && (
                  <Button type="button" variant="outline" size="icon" onClick={() => removeArrayItem('howItIsDone', index)}>
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" onClick={() => addArrayItem('howItIsDone')} className="w-full">
              <Plus className="w-4 h-4 mr-2" /> Add Step
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recovery</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.recovery.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={item}
                  onChange={(e) => handleArrayChange('recovery', index, e.target.value)}
                  placeholder={`Recovery detail ${index + 1}`}
                />
                {formData.recovery.length > 1 && (
                  <Button type="button" variant="outline" size="icon" onClick={() => removeArrayItem('recovery', index)}>
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" onClick={() => addArrayItem('recovery')} className="w-full">
              <Plus className="w-4 h-4 mr-2" /> Add Recovery Detail
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.additionalInfo.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={item}
                  onChange={(e) => handleArrayChange('additionalInfo', index, e.target.value)}
                  placeholder={`Info ${index + 1}`}
                />
                {formData.additionalInfo.length > 1 && (
                  <Button type="button" variant="outline" size="icon" onClick={() => removeArrayItem('additionalInfo', index)}>
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" onClick={() => addArrayItem('additionalInfo')} className="w-full">
              <Plus className="w-4 h-4 mr-2" /> Add Info
            </Button>

            <div className="mt-4 space-y-2">
              <Label htmlFor="successRate">Success Rate (optional)</Label>
              <Input
                id="successRate"
                value={formData.successRate}
                onChange={(e) => handleChange('successRate', e.target.value)}
                placeholder="e.g., 95% success rate"
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <Link href="/admin/treatments">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700">
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              id ? 'Update Treatment' : 'Create Treatment'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
