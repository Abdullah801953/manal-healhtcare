import { NextResponse } from 'next/server';
import connectDB, { resetConnection } from '@/lib/mongodb';
import Doctor from '@/lib/models/Doctor';
import { getCache, setCache, deleteCachePattern, cacheKey, TTL } from '@/lib/cache';

// Helper function to generate slug from name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// GET all doctors (optionally filtered by hospital name)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const hospital = searchParams.get('hospital');
  const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20')));
  const skip = (page - 1) * limit;

  const query: Record<string, unknown> = {};
  if (hospital) {
    query.hospital = { $regex: hospital, $options: 'i' };
  }

  // Check Redis cache first
  const key = cacheKey('doctors', searchParams);
  const cached = await getCache<object>(key);
  if (cached) return NextResponse.json({ success: true, ...cached as object, cached: true });

  const MAX_RETRIES = 3;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      await connectDB();
      const [doctors, total] = await Promise.all([
        Doctor.find(query)
          .select('-overview -overviewList -qualifications -experience -experienceDetails -achievements -treatments -additionalInfo -whyChoose -researchPublications -clinicalFocus')
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean(),
        Doctor.countDocuments(query),
      ]);

      // Use Cloudinary URL if available, otherwise return placeholder directly (no proxy redirect)
      const cleaned = doctors.map((doc: any) => ({
        ...doc,
        image: doc.image && (doc.image.startsWith('http://') || doc.image.startsWith('https://'))
          ? doc.image
          : '/indra.avif',
        rating: (doc.rating !== null && doc.rating !== undefined) ? Number(doc.rating) : null,
      }));

      const payload = {
        data: cleaned,
        pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      };

      await setCache(key, payload, TTL.MEDIUM);
      return NextResponse.json({ success: true, ...payload });
    } catch (error: any) {
      const isTimeout = error.message?.includes('timed out') || error.message?.includes('ETIMEDOUT');
      if (isTimeout && attempt < MAX_RETRIES) {
        console.warn(`GET /api/doctors attempt ${attempt} timed out, retrying...`);
        resetConnection();
        continue;
      }
      console.error('GET /api/doctors error:', error.message);
      return NextResponse.json(
        { success: false, message: 'Failed to fetch doctors', error: error.message },
        { status: 500 }
      );
    }
  }
}

// POST create new doctor — invalidate cache
export async function POST(request: Request) {
  await deleteCachePattern('doctors:*');
  await deleteCachePattern('doctors');
  const body = await request.json();

  // Validate required fields
  const requiredFields = ['name', 'designation', 'hospital', 'overview', 'experience', 'experienceYears'];
  for (const field of requiredFields) {
    if (!body[field]) {
      return NextResponse.json(
        { success: false, message: `${field} is required` },
        { status: 400 }
      );
    }
  }

  // Retry up to 3 times on timeout errors
  const MAX_RETRIES = 3;
  let slug = body.slug || '';

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      await connectDB();

      // Generate slug once (not on every retry)
      if (!slug) {
        slug = generateSlug(body.name);
        let slugExists = await Doctor.findOne({ slug });
        let counter = 1;
        while (slugExists) {
          slug = `${generateSlug(body.name)}-${counter}`;
          slugExists = await Doctor.findOne({ slug });
          counter++;
        }
        body.slug = slug;
      }

      // On retry, check if previous attempt actually saved the doctor
      if (attempt > 1) {
        const existing = await Doctor.findOne({ slug });
        if (existing) {
          return NextResponse.json(
            { success: true, message: 'Doctor created successfully', data: existing },
            { status: 201 }
          );
        }
      }

      const doctor = await Doctor.create(body);

      return NextResponse.json(
        { success: true, message: 'Doctor created successfully', data: doctor },
        { status: 201 }
      );
    } catch (error: any) {
      const isTimeout = error.message?.includes('timed out') || error.message?.includes('ETIMEDOUT');
      if (isTimeout && attempt < MAX_RETRIES) {
        console.warn(`POST /api/doctors attempt ${attempt} timed out, retrying...`);
        resetConnection();
        continue;
      }
      console.error('POST /api/doctors error:', error.message);
      return NextResponse.json(
        { success: false, message: 'Failed to create doctor', error: error.message },
        { status: 500 }
      );
    }
  }
}

// DELETE multiple doctors
export async function DELETE(request: Request) {
  const { ids } = await request.json();

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json(
      { success: false, message: 'Doctor IDs are required' },
      { status: 400 }
    );
  }

  const MAX_RETRIES = 3;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      await connectDB();
      const result = await Doctor.deleteMany({ _id: { $in: ids } });
      return NextResponse.json({
        success: true,
        message: `${result.deletedCount} doctor(s) deleted successfully`,
        deletedCount: result.deletedCount
      });
    } catch (error: any) {
      const isTimeout = error.message?.includes('timed out') || error.message?.includes('ETIMEDOUT');
      if (isTimeout && attempt < MAX_RETRIES) {
        console.warn(`DELETE /api/doctors attempt ${attempt} timed out, retrying...`);
        resetConnection();
        continue;
      }
      return NextResponse.json(
        { success: false, message: 'Failed to delete doctors', error: error.message },
        { status: 500 }
      );
    }
  }
}
