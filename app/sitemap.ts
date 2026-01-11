import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://www.manalhealthcare.com", lastModified: new Date() },
    { url: "https://www.manalhealthcare.com/doctors" },
    { url: "https://www.manalhealthcare.com/hospitals" },
  ];
}
