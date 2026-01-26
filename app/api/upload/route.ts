import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string || 'image'; // 'image' or 'medical'
    
    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file provided' },
        { status: 400 }
      );
    }

    // Define valid types based on upload type
    const validTypes = type === 'medical' 
      ? [
          'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif',
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'text/plain'
        ]
      : ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif'];

    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { 
          success: false, 
          message: type === 'medical' 
            ? 'Invalid file type. Please upload an image, PDF, or DOC file' 
            : 'Invalid file type. Please upload an image (JPEG, PNG, WebP, or AVIF)' 
        },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB for medical, 5MB for images)
    const maxSize = type === 'medical' ? 10 * 1024 * 1024 : 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { 
          success: false, 
          message: `File size too large. Maximum size is ${type === 'medical' ? '10' : '5'}MB` 
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const timestamp = Date.now();
    const originalName = file.name.replace(/\s+/g, '-').toLowerCase();
    const extension = path.extname(originalName);
    const nameWithoutExt = path.basename(originalName, extension);
    const filename = `${nameWithoutExt}-${timestamp}${extension}`;

    // Ensure uploads directory exists
    const uploadFolder = type === 'medical' ? 'medical-reports' : 'treatments';
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', uploadFolder);
    await mkdir(uploadsDir, { recursive: true });

    // Write file
    const filepath = path.join(uploadsDir, filename);
    await writeFile(filepath, buffer);

    // Return the public URL
    const publicUrl = `/uploads/${uploadFolder}/${filename}`;

    return NextResponse.json({
      success: true,
      message: `${type === 'medical' ? 'Medical report' : 'Image'} uploaded successfully`,
      url: publicUrl
    });

  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to upload file', error: error.message },
      { status: 500 }
    );
  }
}
