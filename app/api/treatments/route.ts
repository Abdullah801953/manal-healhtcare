import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Treatment from '@/lib/models/Treatment';

// Helper function to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// GET all treatments
export async function GET() {
  try {
    await connectDB();
    const treatments = await Treatment.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      data: treatments
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch treatments',
        error: error.message
      },
      { status: 500 }
    );
  }
}

// POST create new treatment
export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['title', 'category', 'description', 'shortDescription'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          {
            success: false,
            message: `${field} is required`
          },
          { status: 400 }
        );
      }
    }

    // Auto-populate overview from overviewList for backward compatibility
    if (!body.overview && body.overviewList?.length > 0) {
      body.overview = body.overviewList.filter((o: string) => o.trim() !== '').join('\n');
    }
    if (!body.overview) body.overview = '';

    // Auto-populate types from treatmentTypes for backward compatibility
    if (!body.types && body.treatmentTypes?.length > 0) {
      body.types = body.treatmentTypes.filter((t: string) => t.trim() !== '').join('\n');
    }

    // Generate slug if not provided
    if (!body.slug) {
      body.slug = generateSlug(body.title);
      
      // Check if slug already exists and make it unique
      let slugExists = await Treatment.findOne({ slug: body.slug });
      let counter = 1;
      while (slugExists) {
        body.slug = `${generateSlug(body.title)}-${counter}`;
        slugExists = await Treatment.findOne({ slug: body.slug });
        counter++;
      }
    }

    const treatment = await Treatment.create(body);

    return NextResponse.json(
      {
        success: true,
        message: 'Treatment created successfully',
        data: treatment
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create treatment',
        error: error.message
      },
      { status: 500 }
    );
  }
}

// DELETE multiple treatments
export async function DELETE(request: Request) {
  try {
    await connectDB();
    const { ids } = await request.json();

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Treatment IDs are required'
        },
        { status: 400 }
      );
    }

    const result = await Treatment.deleteMany({ _id: { $in: ids } });

    return NextResponse.json({
      success: true,
      message: `${result.deletedCount} treatment(s) deleted successfully`,
      deletedCount: result.deletedCount
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete treatments',
        error: error.message
      },
      { status: 500 }
    );
  }
}
