"use client";

import { log } from "console";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <div>
      <CldUploadWidget
        onSuccess={handleUpload}
        uploadPreset="notboypy"
        options={{
          maxFiles: 1,
        }}
      >
        {({ open }) => {
          return (
            <div
              className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 "
              onClick={() => open()}
            >
              <TbPhotoPlus size={50} />
              <div className="font-semibold text-lg"> Click to Upload</div>
              {value && (
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    alt="upload"
                    fill
                    style={{ objectFit: "cover" }}
                    src={value}
                  />
                </div>
              )}
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};
export default ImageUpload;
