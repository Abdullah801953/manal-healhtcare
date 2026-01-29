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
    title: "Our Blogs | Healthcare",
    description: "Read our latest healthcare and medical blogs.",
    openGraph: {
      title: "Our Blogs",
      description: "Healthcare blog articles",
    },
  };
}
