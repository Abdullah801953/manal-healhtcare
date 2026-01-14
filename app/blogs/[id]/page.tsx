import { notFound } from "next/navigation";
import { blogsData } from "@/app/blogs/data";
import { getBlogById } from "@/app/blogs/utils";
import BlogHero from "@/app/blogs/[id]/components/BlogHero";
import { BlogNavigating } from "@/app/blogs/[id]/components/BlogNavigating";
import RelatedArticles from "@/app/blogs/[id]/components/RelatedArticles";
import { CTABookingSection } from "@/app/blogs/[id]/components/CTABookingSection";
import { BlogListCTA } from "./components/BlogListCTA";

interface BlogDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { id } = await params;
  const blog = getBlogById(id);

  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-8">
        <BlogHero title={blog.title} image={blog.image} />
        
        <div className="mt-10  p-6 md:p-10 max-w-6xl mx-auto">
          <BlogNavigating blog={blog} />
        </div>
        
        <RelatedArticles currentId={blog.id} />
        
               <BlogListCTA />
       
      </div>
    </div>
  );
}

/* =========================
   STATIC GENERATION
========================= */
export async function generateStaticParams() {
  return blogsData.map((blog) => ({
    id: blog.id,
  }));
}

/* =========================
   SEO METADATA
========================= */
export async function generateMetadata({ params }: BlogDetailPageProps) {
  const { id } = await params;
  const blog = getBlogById(id);

  return {
    title: blog ? blog.title : "Blog | Healthcare",
    description: blog ? blog.excerpt : "Read our healthcare blog.",
    openGraph: {
      title: blog ? blog.title : "Blog",
      description: blog ? blog.excerpt : "Healthcare blog article",
      images: blog ? [blog.image.src] : [],
    },
  };
}
