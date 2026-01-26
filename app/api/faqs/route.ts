import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import FAQ from '@/lib/models/FAQ';

// GET - Fetch all FAQs
export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const isActive = searchParams.get('isActive');

    let query: any = {};
    if (category) query.category = category;
    if (isActive !== null) query.isActive = isActive === 'true';

    const faqs = await FAQ.find(query).sort({ order: 1, createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: faqs,
    });
  } catch (error: any) {
    console.error('Error fetching FAQs:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST - Create new FAQ
export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    const faq = await FAQ.create(body);

    return NextResponse.json(
      {
        success: true,
        message: 'FAQ created successfully',
        data: faq,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating FAQ:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete multiple FAQs
export async function DELETE(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const ids = searchParams.get('ids')?.split(',');

    if (!ids || ids.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No IDs provided' },
        { status: 400 }
      );
    }

    await FAQ.deleteMany({ _id: { $in: ids } });

    return NextResponse.json({
      success: true,
      message: `Successfully deleted ${ids.length} FAQ(s)`,
    });
  } catch (error: any) {
    console.error('Error deleting FAQs:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}