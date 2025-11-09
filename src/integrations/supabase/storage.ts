import { supabase } from './client';
import { v4 as uuidv4 } from 'uuid';

export const uploadFile = async (bucketName: string, file: File, userId: string): Promise<string | null> => {
  const fileExtension = file.name.split('.').pop();
  const fileName = `${userId}/${uuidv4()}.${fileExtension}`; // Store files under user ID folder with a unique name

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error("Error uploading file:", error);
    return null;
  }

  // Get public URL
  const { data: publicUrlData } = supabase.storage
    .from(bucketName)
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
};

export const deleteFile = async (bucketName: string, filePath: string): Promise<boolean> => {
  // Extract the path relative to the bucket from the full public URL
  const urlParts = filePath.split(`${bucketName}/`);
  if (urlParts.length < 2) {
    console.warn("Invalid file path for deletion:", filePath);
    return false;
  }
  const pathInBucket = urlParts[1];

  const { error } = await supabase.storage
    .from(bucketName)
    .remove([pathInBucket]);

  if (error) {
    console.error("Error deleting file:", error);
    return false;
  }
  return true;
};