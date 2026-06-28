import { notFound } from "next/navigation";
import BlogHero from "@/app/blogs/[id]/components/BlogHero";
import { BlogNavigating } from "@/app/blogs/[id]/components/BlogNavigating";
import RelatedArticles from "@/app/blogs/[id]/components/RelatedArticles";
import { CTABookingSection } from "@/app/blogs/[id]/components/CTABookingSection";
import { BlogListCTA } from "./components/BlogListCTA";
import { blogsData } from "@/app/blogs/data";

// Revalidate this page every 60 seconds as a fallback (on-demand revalidation via revalidatePath is the primary mechanism)
export const revalidate = 60;

interface BlogDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Fetch blog by slug — tries MongoDB first, falls back to static data
async function getBlogBySlug(slug: string) {
  // Normalize slug: strip leading/trailing slashes (handles DB slugs stored with leading /)
  const normalizedSlug = slug.replace(/^\/+|\/+$/g, '');

  // Try MongoDB first
  try {
    const connectDB = (await import('@/lib/mongodb')).default;
    const Blog = (await import('@/lib/models/Blog')).default;
    
    await connectDB();
    const blog = await Blog.findOne({ slug: normalizedSlug, status: 'published' }).lean();
    
    if (blog) {
      // Increment views
      await Blog.findOneAndUpdate(
        { slug },
        { $inc: { views: 1 } }
      );
      return JSON.parse(JSON.stringify(blog));
    }
  } catch (error) {
    console.error('Error fetching blog from DB:', error);
  }

  // Fallback to static data (normalize both sides for comparison)
  const staticBlog = blogsData.find((b) => b.slug === normalizedSlug);
  if (staticBlog) {
    return {
      ...staticBlog,
      _id: staticBlog.id,
      status: 'published',
      image: typeof staticBlog.image === 'string' ? staticBlog.image : '/blog-hero.jpg',
      extraImages: staticBlog.extraImages?.map((img) =>
        typeof img === 'string' ? img : '/blog-hero.jpg'
      ),
    };
  }

  return null;
}

// Fetch all published blogs
async function getAllBlogs() {
  try {
    const connectDB = (await import('@/lib/mongodb')).default;
    const Blog = (await import('@/lib/models/Blog')).default;
    
    await connectDB();
    const blogs = await Blog.find({ status: 'published' }).lean();
    
    return JSON.parse(JSON.stringify(blogs));
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
      <div className="mx-6 py-8">
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
  const dbBlogs = await getAllBlogs();
  const dbSlugs = dbBlogs.map((blog: any) => blog.slug);
  
  // Also include slugs from static data that aren't already in the DB
  const staticSlugs = blogsData
    .filter((b) => !dbSlugs.includes(b.slug))
    .map((b) => b.slug);
  
  return [...new Set([...dbSlugs, ...staticSlugs])].map((slug) => ({
    id: slug,
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
