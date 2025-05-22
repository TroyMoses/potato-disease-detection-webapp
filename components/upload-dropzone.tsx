"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";

interface UploadDropzoneProps {
  onFilesSelected: (files: File[]) => void;
}

export function UploadDropzone({ onFilesSelected }: UploadDropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFilesSelected(acceptedFiles);
    },
    [onFilesSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed border-white/40 rounded-lg p-6 text-center cursor-pointer transition-colors min-h-[180px] flex flex-col items-center justify-center ${
        isDragActive ? "bg-white/10" : ""
      }`}
    >
      <input {...getInputProps()} />
      <Upload className="h-10 w-10 mb-2 text-white/70" />
      <p className="text-white/90">
        {isDragActive
          ? "Drop the image here..."
          : "Drag & drop an image or click to select"}
      </p>
    </div>
  );
}
