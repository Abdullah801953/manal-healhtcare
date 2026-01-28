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
import { Loader2, X, Plus } from "lucide-react";

interface BlogFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  content2: string;
  content3: string;
  image: string;
  category: string;
  author: string;
  date: string;
  bullets: string[];
  subheading: string;
  extraImages: string[];
  status: string;
  featured: boolean;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
}

interface BlogFormProps {
  blogId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const categories = [
  "Skincare",
  "Cardiology",
  "Orthopedics",
  "Neurology",
  "Oncology",
  "Pediatrics",
  "Gynecology",
  "Dental",
  "Eye Care",
  "Mental Health",
  "Nutrition",
  "Fitness",
  "General Health",
  "Medical Tourism",
  "Technology",
];

export function BlogForm({ blogId, onSuccess, onCancel }: BlogFormProps) {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    content2: "",
    content3: "",
    image: "",
    category: "General Health",
    author: "Admin",
    date: new Date().toISOString().split('T')[0],
    bullets: [""],
    subheading: "",
    extraImages: [],
    status: "draft",
    featured: false,
    tags: [],
    seoTitle: "",
    seoDescription: "",
  });

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/blogs/${blogId}`);
      const data = await response.json();

      if (data.success) {
        const blog = data.data;
        setFormData({
          title: blog.title,
          slug: blog.slug,
          excerpt: blog.excerpt,
          content: blog.content,
          content2: blog.content2 || "",
          content3: blog.content3 || "",
          image: blog.image,
          category: blog.category,
          author: blog.author,
          date: new Date(blog.date).toISOString().split('T')[0],
          bullets: blog.bullets.length > 0 ? blog.bullets : [""],
          subheading: blog.subheading || "",
          extraImages: blog.extraImages || [],
          status: blog.status,
          featured: blog.featured,
          tags: blog.tags || [],
          seoTitle: blog.seoTitle || "",
          seoDescription: blog.seoDescription || "",
        });
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
      alert("Failed to fetch blog");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (blogId) {
      fetchBlog();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blogId]);

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>, field: 'image' | 'extraImages') => {
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
        if (field === 'image') {
          setFormData((prev) => ({ ...prev, image: data.url }));
        } else {
          setFormData((prev) => ({ ...prev, extraImages: [...prev.extraImages, data.url] }));
        }
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
      // Generate slug from title if empty
      const slug = formData.slug || formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const url = blogId ? `/api/blogs/${blogId}` : "/api/blogs";
      const method = blogId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          slug,
          bullets: formData.bullets.filter(b => b.trim() !== ''),
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert(blogId ? "Blog updated successfully!" : "Blog created successfully!");
        onSuccess?.();
      } else {
        alert(data.error || "Failed to save blog");
      }
    } catch (error) {
      console.error("Error saving blog:", error);
      alert("Failed to save blog");
    } finally {
      setLoading(false);
    }
  };

  const addBullet = () => {
    setFormData({ ...formData, bullets: [...formData.bullets, ""] });
  };

  const removeBullet = (index: number) => {
    const newBullets = formData.bullets.filter((_, i) => i !== index);
    setFormData({ ...formData, bullets: newBullets.length > 0 ? newBullets : [""] });
  };

  const updateBullet = (index: number, value: string) => {
    const newBullets = [...formData.bullets];
    newBullets[index] = value;
    setFormData({ ...formData, bullets: newBullets });
  };

  const removeExtraImage = (index: number) => {
    const newImages = formData.extraImages.filter((_, i) => i !== index);
    setFormData({ ...formData, extraImages: newImages });
  };

  if (loading && blogId) {
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
            
            <div className="space-y-2">
              <Label htmlFor="title">Blog Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                maxLength={200}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">URL Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="Auto-generated from title"
              />
              <p className="text-xs text-gray-500">Leave empty to auto-generate from title</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt *</Label>
              <Textarea
                id="excerpt"
                rows={3}
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Short description for blog preview..."
                required
                maxLength={300}
              />
              <p className="text-xs text-gray-500">{formData.excerpt.length}/300 characters</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
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

              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Publication Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Content</h3>
            
            <div className="space-y-2">
              <Label htmlFor="content">Main Content *</Label>
              <Textarea
                id="content"
                rows={8}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Main blog content..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content2">Additional Content (Section 2)</Label>
              <Textarea
                id="content2"
                rows={6}
                value={formData.content2}
                onChange={(e) => setFormData({ ...formData, content2: e.target.value })}
                placeholder="Optional second section..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content3">Additional Content (Section 3)</Label>
              <Textarea
                id="content3"
                rows={6}
                value={formData.content3}
                onChange={(e) => setFormData({ ...formData, content3: e.target.value })}
                placeholder="Optional third section..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subheading">Subheading</Label>
              <Input
                id="subheading"
                value={formData.subheading}
                onChange={(e) => setFormData({ ...formData, subheading: e.target.value })}
                placeholder="Optional subheading or quote"
              />
            </div>
          </div>

          {/* Bullet Points */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Key Points / Bullets</Label>
              <Button type="button" variant="outline" size="sm" onClick={addBullet}>
                <Plus className="w-4 h-4 mr-1" />
                Add Point
              </Button>
            </div>
            {formData.bullets.map((bullet, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={bullet}
                  onChange={(e) => updateBullet(index, e.target.value)}
                  placeholder={`Key point ${index + 1}`}
                />
                {formData.bullets.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeBullet(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Images */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Images</h3>
            
            <div className="space-y-2">
              <Label htmlFor="image">Featured Image *</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'image')}
                disabled={uploading}
              />
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Featured"
                  className="mt-2 w-full h-48 object-cover rounded-lg"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="extraImages">Additional Images (Optional)</Label>
              <Input
                id="extraImages"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'extraImages')}
                disabled={uploading}
              />
              {formData.extraImages.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {formData.extraImages.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        src={img}
                        alt={`Extra ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-1 right-1"
                        onClick={() => removeExtraImage(index)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* SEO */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">SEO (Optional)</h3>
            
            <div className="space-y-2">
              <Label htmlFor="seoTitle">SEO Title</Label>
              <Input
                id="seoTitle"
                value={formData.seoTitle}
                onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                placeholder="Custom title for search engines"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="seoDescription">SEO Description</Label>
              <Textarea
                id="seoDescription"
                rows={3}
                value={formData.seoDescription}
                onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                placeholder="Custom description for search engines"
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
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="featured">Featured Blog</Label>
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
        <Button type="submit" disabled={loading || uploading} className="flex-1">
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : blogId ? (
            "Update Blog"
          ) : (
            "Create Blog"
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
