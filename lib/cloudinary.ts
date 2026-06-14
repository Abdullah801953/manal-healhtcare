import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Upload a buffer to Cloudinary.
 * @param buffer  - File data as a Buffer
 * @param folder  - Cloudinary folder (e.g. "doctors", "blogs")
 * @param publicId - Optional stable public ID (for overwriting the same asset)
 * @returns The secure Cloudinary URL
 */
export async function uploadToCloudinary(
  buffer: Buffer,
  folder: string,
  options?: { publicId?: string; resourceType?: 'image' | 'raw' | 'auto' }
): Promise<string> {
  const resourceType = options?.resourceType ?? 'auto';

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `manal-healthcare/${folder}`,
        public_id: options?.publicId,
        resource_type: resourceType,
        overwrite: true,
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error('Cloudinary upload failed'));
        } else {
          resolve(result.secure_url);
        }
      }
    );

    uploadStream.end(buffer);
  });
}

/**
 * Delete an asset from Cloudinary by its public ID.
 * Pass the full public ID including folder prefix.
 */
export async function deleteFromCloudinary(publicId: string, resourceType: 'image' | 'raw' | 'video' = 'image') {
  return cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
}

export default cloudinary;
