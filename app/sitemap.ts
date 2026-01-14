import { MetadataRoute } from "next";
import { blogsData } from "./blogs/data";
import { treatmentsData } from "./treatments/data";
import { doctorsData } from "./doctors/data";
import { hospitalsData } from "./hospitals/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.manalhealthcare.com";
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/treatments`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/doctors`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hospitals`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  // Dynamic blog pages
  const blogPages: MetadataRoute.Sitemap = blogsData.map((blog) => ({
    url: `${baseUrl}/blogs/${blog.id}`,
    lastModified: new Date(blog.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Dynamic treatment pages
  const treatmentPages: MetadataRoute.Sitemap = treatmentsData.map((treatment) => ({
    url: `${baseUrl}/treatments/${treatment.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Dynamic doctor pages
  const doctorPages: MetadataRoute.Sitemap = doctorsData.map((doctor) => ({
    url: `${baseUrl}/doctors/${doctor.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Dynamic hospital pages
  const hospitalPages: MetadataRoute.Sitemap = hospitalsData.map((hospital) => ({
    url: `${baseUrl}/hospitals/${hospital.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages, ...treatmentPages, ...doctorPages, ...hospitalPages];
}
