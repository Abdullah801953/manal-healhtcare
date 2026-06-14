import { NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/lib/cloudinary';

// Map upload type → Cloudinary folder
const FOLDER_MAP: Record<string, string> = {
  image: 'general',
  medical: 'medical-reports',
  blog: 'blogs',
  doctor: 'doctors',
  hospital: 'hospitals',
  hospitals: 'hospitals',
  achievement: 'achievements',
  testimonial: 'testimonials',
  treatment: 'treatments',
};

const IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif'];
const DOC_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/plain',
];

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = (formData.get('type') as string) || 'image';

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file provided' }, { status: 400 });
    }

    const allowsDocs = type === 'medical' || type === 'achievement';
    const validTypes = allowsDocs ? [...IMAGE_TYPES, ...DOC_TYPES] : IMAGE_TYPES;

    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          message: allowsDocs
            ? 'Invalid file type. Please upload an image, PDF, DOC, or Excel file'
            : 'Invalid file type. Please upload an image (JPEG, PNG, WebP, or AVIF)',
        },
        { status: 400 }
      );
    }

    const maxSize = allowsDocs ? 10 * 1024 * 1024 : 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        {
          success: false,
          message: `File size too large. Maximum size is ${allowsDocs ? '10' : '5'}MB`,
        },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const folder = FOLDER_MAP[type] ?? 'general';
    const resourceType = IMAGE_TYPES.includes(file.type) ? 'image' : 'raw';

    const url = await uploadToCloudinary(buffer, folder, { resourceType });

    return NextResponse.json({
      success: true,
      message: `${type === 'medical' ? 'Medical report' : 'File'} uploaded successfully`,
      url,
    });
  } catch (error: any) {
    console.error('[Upload API] Cloudinary upload error:', error);
    return NextResponse.json(
      { success: false, message: 'Upload failed. Please try again.' },
      { status: 500 }
    );
  }
}
