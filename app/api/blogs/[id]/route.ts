import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/mongodb';
import Blog from '@/lib/models/Blog';
import { deleteCachePattern } from '@/lib/cache';

// GET single blog by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          error: 'Blog not found',
        },
        { status: 404 }
      );
    }

    // Increment views
    blog.views += 1;
    await blog.save();

    return NextResponse.json({
      success: true,
      data: blog,
    });
  } catch (error: any) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch blog',
      },
      { status: 500 }
    );
  }
}

// PUT update blog
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    await deleteCachePattern('blogs:*');
    await deleteCachePattern('blogs');
    const { id } = await params;

    const body = await request.json();

    // Normalize slug: strip leading/trailing slashes
    if (body.slug) {
      body.slug = body.slug.replace(/^\/+|\/+$/g, '');
    }

    const blog = await Blog.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          error: 'Blog not found',
        },
        { status: 404 }
      );
    }

    // Revalidate the static pages so changes appear immediately
    revalidatePath('/blogs');
    revalidatePath(`/blogs/${blog.slug}`);

    return NextResponse.json({
      success: true,
      data: blog,
    });
  } catch (error: any) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to update blog',
      },
      { status: 500 }
    );
  }
}

// DELETE single blog
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          error: 'Blog not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Blog deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to delete blog',
      },
      { status: 500 }
    );
  }
}
