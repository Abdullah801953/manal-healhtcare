import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import FAQ from '@/lib/models/FAQ';

// GET - Fetch single FAQ by ID
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params;

    const faq = await FAQ.findById(id);

    if (!faq) {
      return NextResponse.json(
        { success: false, error: 'FAQ not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: faq,
    });
  } catch (error: any) {
    console.error('Error fetching FAQ:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update FAQ
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params;
    const body = await request.json();

    const faq = await FAQ.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );

    if (!faq) {
      return NextResponse.json(
        { success: false, error: 'FAQ not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'FAQ updated successfully',
      data: faq,
    });
  } catch (error: any) {
    console.error('Error updating FAQ:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete single FAQ
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params;

    const faq = await FAQ.findByIdAndDelete(id);

    if (!faq) {
      return NextResponse.json(
        { success: false, error: 'FAQ not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'FAQ deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting FAQ:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}