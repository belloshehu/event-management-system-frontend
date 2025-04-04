import {
  CloudinaryDestroyesponseType,
  CloudinaryUploadResponseType,
} from "@/types/data.types";
import sha1 from "sha1";

export default function useFileUpload() {
  const uploadToCloudinary = async (file: any) => {
    // upload a base64 image to cloudinary
    const cloud_name: string = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "event-center");
    data.append("cloud_name", cloud_name);
    // data.append("unique_filename", true);
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      {
        method: "post",
        body: data,
      }
    );
    const jsonResponse: CloudinaryUploadResponseType = await response.json();
    return jsonResponse;
  };

  // desroy/delete the image from cloudinary
  const deleteFromCloudinary = async (publicId: string) => {
    const timestamp = new Date().getTime();
    const rawSignature = `public_id=${publicId}&timestamp=${timestamp}${process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET}`;
    const signature = sha1(rawSignature);
    const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/destroy`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          public_id: publicId,
          api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
          api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
          // upload_preset: "clothing",
          timestamp,
          signature,
        }),
      }
    );
    const jsonResponse: CloudinaryDestroyesponseType = await response.json();
    return jsonResponse;
  };

  const uploadToS3 = async (file: any) => {
    // upload a base64 image to S3 bucket
    console.log(file);
  };
  return { uploadToCloudinary, uploadToS3, deleteFromCloudinary };
}
