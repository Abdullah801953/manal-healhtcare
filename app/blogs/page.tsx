import { BlogListHero } from "./[id]/components/BlogListHero";
import { BlogGrid } from "./[id]/components/BlogGrid";
import { BlogListCTA } from "./[id]/components/BlogListCTA";
import { blogsData } from "./data";
import { getBlogById } from "./utils";

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="">
        <BlogListHero />
        
        <BlogGrid />
        
        <BlogListCTA />
      </div>
    </div>
  );
}

/* =========================
   SEO METADATA
========================= */
export async function generateMetadata() {
  return {
    title: "Healthcare Blog India | Medical Tourism Tips & Health Insights",
    description: "Expert healthcare articles, medical tourism guides, treatment information & health tips. Stay informed about medical procedures, recovery, hospital selection & patient care.",
    keywords: "healthcare blog India, medical tourism blog, health tips India, medical procedures information, treatment guides, healthcare insights, medical tourism tips, patient education, medical advice India",
    openGraph: {
      title: "Healthcare & Medical Tourism Blog - Manal Healthcare",
      description: "Expert insights on medical treatments, healthcare tips, and medical tourism guides. Learn from industry experts.",
      type: "website",
      url: "https://www.manalhealthcare.com/blogs",
      siteName: "Manal Healthcare",
      images: [{
        url: "/blog-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Healthcare blog and medical tourism insights"
      }]
    },
    twitter: {
      card: "summary_large_image",
      title: "Healthcare Blog - Manal Healthcare",
      description: "Expert healthcare articles and medical tourism guides.",
      images: ["/blog-hero.jpg"],
    },
    alternates: {
      canonical: "https://www.manalhealthcare.com/blogs"
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
