import { notFound } from "next/navigation";
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

// Fetch blog by slug
async function getBlogBySlug(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/blogs/slug/${slug}`, {
      cache: 'no-store'
    });
    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

// Fetch all published blogs
async function getAllBlogs() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/blogs?status=published`, {
      cache: 'no-store'
    });
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { id } = await params;
  const blog = await getBlogBySlug(id);

  if (!blog || blog.status !== 'published') {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10 py-8">
        <BlogHero 
          title={blog.title} 
          image={blog.image || '/blog-hero.jpg'} 
        />
        
        <div className="mt-6 xs:mt-7 sm:mt-8 lg:mt-10">
          <BlogNavigating blog={{
            ...blog,
            id: blog._id,
            image: blog.image || '/blog-hero.jpg',
          }} />
        </div>
        
        <RelatedArticles currentId={blog._id} />
        
        <BlogListCTA />
       
      </div>
    </div>
  );
}

/* =========================
   STATIC GENERATION
========================= */
export async function generateStaticParams() {
  const blogs = await getAllBlogs();
  
  return blogs.map((blog: any) => ({
    id: blog.slug,
  }));
}

/* =========================
   SEO METADATA
========================= */
export async function generateMetadata({ params }: BlogDetailPageProps) {
  const { id } = await params;
  const blog = await getBlogBySlug(id);

  return {
    title: blog ? blog.title : "Blog | Healthcare",
    description: blog ? blog.excerpt : "Read our healthcare blog.",
    openGraph: {
      title: blog ? blog.title : "Blog",
      description: blog ? blog.excerpt : "Healthcare blog article",
      images: blog ? [blog.image] : [],
    },
  };
}
