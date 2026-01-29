import { blogsData } from "./data";

export function getBlogById(id: string) {
  return blogsData.find((blog) => blog.id === id) || null;
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function truncateText(text: string, length: number) {
  return text.length > length ? text.slice(0, length) + "..." : text;
}

export function getShareUrl(
  platform: "facebook" | "twitter" | "linkedin",
  url: string
) {
  const encoded = encodeURIComponent(`https://yourdomain.com${url}`);

  switch (platform) {
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${encoded}`;
    case "twitter":
      return `https://twitter.com/intent/tweet?url=${encoded}`;
    case "linkedin":
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`;
  }
}
