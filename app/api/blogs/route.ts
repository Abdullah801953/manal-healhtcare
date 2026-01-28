import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/lib/models/Blog';

// GET all blogs
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');

    // Build query
    const query: any = {};
    if (status) query.status = status;
    if (category && category !== 'All') query.category = category;
    if (featured) query.featured = featured === 'true';

    const blogs = await Blog.find(query).sort({ date: -1, createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: blogs,
    });
  } catch (error: any) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch blogs',
      },
      { status: 500 }
    );
  }
}

// POST create new blog
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    // Auto-generate slug if not provided
    if (!body.slug && body.title) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    const blog = await Blog.create(body);

    return NextResponse.json({
      success: true,
      data: blog,
    });
  } catch (error: any) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to create blog',
      },
      { status: 500 }
    );
  }
}

// DELETE multiple blogs
export async function DELETE(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const ids = searchParams.get('ids')?.split(',');

    if (!ids || ids.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'No blog IDs provided',
        },
        { status: 400 }
      );
    }

    await Blog.deleteMany({ _id: { $in: ids } });

    return NextResponse.json({
      success: true,
      message: `${ids.length} blog(s) deleted successfully`,
    });
  } catch (error: any) {
    console.error('Error deleting blogs:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to delete blogs',
      },
      { status: 500 }
    );
  }
}
