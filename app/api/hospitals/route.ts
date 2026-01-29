import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Hospital from '@/lib/models/Hospital';

// GET all hospitals with filtering
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search');
    const type = searchParams.get('type');
    const city = searchParams.get('city');
    const emergency = searchParams.get('emergency');
    const parking = searchParams.get('parking');
    const minBeds = searchParams.get('minBeds');
    const minRating = searchParams.get('minRating');
    const featured = searchParams.get('featured');
    const status = searchParams.get('status') || 'active';

    // Build filter query
    const filter: any = { status };

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { specialties: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    if (type && type !== 'All Hospitals') {
      filter.type = type;
    }

    if (city) {
      filter.city = city;
    }

    if (emergency !== null && emergency !== undefined) {
      filter.emergency = emergency === 'true';
    }

    if (parking !== null && parking !== undefined) {
      filter.parking = parking === 'true';
    }

    if (minBeds) {
      filter.beds = { $gte: parseInt(minBeds) };
    }

    if (minRating) {
      filter.rating = { $gte: parseFloat(minRating) };
    }

    if (featured !== null && featured !== undefined) {
      filter.featured = featured === 'true';
    }

    const hospitals = await Hospital.find(filter).sort({ featured: -1, rating: -1 });

    return NextResponse.json({
      success: true,
      data: hospitals,
      count: hospitals.length,
    });
  } catch (error: any) {
    console.error('Error fetching hospitals:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch hospitals',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// POST - Create new hospital
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    // Generate slug if not provided
    if (!body.slug && body.name) {
      const generateSlug = (name: string) => {
        return name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
      };
      
      body.slug = generateSlug(body.name);
      
      // Check if slug exists and make it unique
      const existingHospital = await Hospital.findOne({ slug: body.slug });
      if (existingHospital) {
        let counter = 1;
        let uniqueSlug = `${body.slug}-${counter}`;
        while (await Hospital.findOne({ slug: uniqueSlug })) {
          counter++;
          uniqueSlug = `${body.slug}-${counter}`;
        }
        body.slug = uniqueSlug;
      }
    }

    const hospital = await Hospital.create(body);

    return NextResponse.json({
      success: true,
      data: hospital,
      message: 'Hospital created successfully',
    });
  } catch (error: any) {
    console.error('Error creating hospital:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create hospital',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
