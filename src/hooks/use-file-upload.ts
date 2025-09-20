"use client";
import { cloudinaryConfig } from "@/config/cloudinary.config";
import {
  CloudinaryDestroyesponseType,
  CloudinaryUploadResponseType,
} from "@/types/data.types";
import { useState } from "react";
import sha1 from "sha1";
import { set } from "zod";

export default function useFileUpload() {
  const [isProgressing, setIsProgressing] = useState(false);
  const uploadToCloudinary = async (file: any) => {
    // upload a base64 image to cloudinary
    const cloud_name: string = cloudinaryConfig.cloudName!;
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "event-center");
    data.append("cloud_name", cloud_name);
    // data.append("unique_filename", true);
    setIsProgressing(true);
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      {
        method: "post",
        body: data,
      }
    );
    const jsonResponse: CloudinaryUploadResponseType = await response.json();
    setIsProgressing(false);
    return jsonResponse;
  };

  // desroy/delete the image from cloudinary
  const deleteFromCloudinary = async (publicId: string) => {
    const timestamp = new Date().getTime();
    const rawSignature = `public_id=${publicId}&timestamp=${timestamp}${cloudinaryConfig.apiSecret}`;
    const signature = sha1(rawSignature);
    const cloud_name = cloudinaryConfig.cloudName!;
    setIsProgressing(true);
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/destroy`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          public_id: publicId,
          api_key: cloudinaryConfig.apiKey,
          api_secret: cloudinaryConfig.apiSecret,
          // upload_preset: "clothing",
          timestamp,
          signature,
        }),
      }
    );
    const jsonResponse: CloudinaryDestroyesponseType = await response.json();
    setIsProgressing(false);
    return jsonResponse;
  };

  const uploadToS3 = async (file: any) => {
    // upload a base64 image to S3 bucket
    console.log(file);
  };
  return { uploadToCloudinary, uploadToS3, deleteFromCloudinary, isProgressing };
}
