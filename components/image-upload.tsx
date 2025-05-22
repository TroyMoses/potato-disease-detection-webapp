"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { UploadDropzone } from "@/components/upload-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trash2 } from "lucide-react";
import { AppHeader } from "@/components/app-header";

type AnalysisResult = {
  class: string;
  confidence: string;
};

export function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [data, setData] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendFile = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    setIsLoading(true);

    try {
      const res = await axios({
        method: "post",
        url: process.env.NEXT_PUBLIC_API_URL ?? "",
        data: formData,
      });

      console.log("Response:", res);

      if (
        res.status === 200 &&
        res.data &&
        typeof res.data.values === "string" &&
        typeof res.data.values === "string"
      ) {
        setData({
          class: res.data.class,
          confidence: res.data.confidence,
        });
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Please check your API server.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearData = () => {
    setData(null);
    setSelectedFile(null);
    setPreview(null);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (!preview) return;
    sendFile();
  }, [preview]);

  const onSelectFile = (files: File[]) => {
    if (!files || files.length === 0) {
      setSelectedFile(null);
      setData(null);
      return;
    }

    setSelectedFile(files[0]);
    setData(null);
  };

  const confidence = data
    ? (Number.parseFloat(data.confidence) * 100).toFixed(2)
    : "0";

  return (
    <>
      <AppHeader />

      <div className="relative min-h-screen bg-gradient-to-b from-green-800 to-green-900 text-white pb-10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/bg.png')",
            opacity: 0.2,
          }}
        />

        <div className="relative pt-16 pb-8 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Welcome to Potato Health Scanner
            </h1>
            <p className="text-lg opacity-90">
              Upload a potato leaf image to detect plant diseases using
              AI-powered image classification.
            </p>
          </div>
        </div>

        <div className="max-w-md mx-auto px-4">
          <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-xl">
            <CardContent className="p-6">
              <UploadDropzone onFilesSelected={onSelectFile} />

              {preview && (
                <div className="mt-4 rounded-lg overflow-hidden">
                  <Image
                    src={preview || "/placeholder.svg"}
                    alt="Preview"
                    width={500}
                    height={300}
                    className="w-full h-auto max-h-[300px] object-cover rounded-lg"
                  />
                </div>
              )}

              {isLoading && (
                <div className="flex flex-col items-center mt-4 space-y-2">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  <p className="text-sm">Analyzing image...</p>
                </div>
              )}

              {data && (
                <div className="mt-4 p-4 bg-white/20 rounded-lg text-left">
                  <h3 className="font-semibold text-lg">
                    Detected Disease: {data.class}
                  </h3>
                  <p className="text-sm mt-1">Confidence: {confidence}%</p>
                  <Progress
                    value={Number.parseFloat(confidence)}
                    className="h-2 mt-2"
                  />
                </div>
              )}

              {data && (
                <Button
                  variant="outline"
                  className="w-full mt-4 border-white/30 text-white hover:bg-white/20 hover:text-white"
                  onClick={clearData}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear & Try Another
                </Button>
              )}
            </CardContent>
          </Card>

          <div className="mt-16 text-center text-sm text-white/70">
            <p>Built with 💚 for farmers, by TroyLegacy.</p>
          </div>
        </div>
      </div>
    </>
  );
}
