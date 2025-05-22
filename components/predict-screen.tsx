"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Upload, Trash2, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TipOfTheDay } from "@/components/tip-of-the-day";
import { MainNav } from "@/components/main-nav";
import { toast } from "sonner";
import axios from "axios";

type AnalysisResult = {
  class: string;
  confidence: string;
};

export function PredictScreen() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [data, setData] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recentImages, setRecentImages] = useState<string[]>([]);

  // Load recent images from localStorage on component mount
  useEffect(() => {
    const savedImages = localStorage.getItem("recentImages");
    if (savedImages) {
      setRecentImages(JSON.parse(savedImages));
    }
  }, []);

  // Save recent images to localStorage when they change
  useEffect(() => {
    if (recentImages.length > 0) {
      localStorage.setItem("recentImages", JSON.stringify(recentImages));
    }
  }, [recentImages]);

  // Add current image to recent images
  useEffect(() => {
    if (preview && !recentImages.includes(preview)) {
      setRecentImages((prev) => [preview, ...prev].slice(0, 5));
    }
  }, [preview, recentImages]);

  const clearData = () => {
    setData(null);
    setSelectedFile(null);
    setPreview(null);
  };

  const analyzeImage = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setData(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await axios({
        method: "post",
        url: process.env.NEXT_PUBLIC_API_URL ?? "",
        data: formData,
      });

      if (res.status === 200) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setData(res.data);
        toast.success("Analysis Complete", {
          description: `Detected: ${
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            res.data.class
          } with ${Number.parseFloat(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            res.data.confidence
          ).toFixed(1)}% confidence`,
          duration: 3000,
        });
      }
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Analysis Failed", {
        description: "Please check your API server or try another image.",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setData(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      setData(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const selectRecentImage = async (imageUrl: string) => {
    setPreview(imageUrl);
    setData(null);

    try {
      // Convert the data URL to a Blob
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      // Create a File from the Blob
      const file = new File([blob], "image.jpg", { type: blob.type });
      setSelectedFile(file);

      // Create FormData and send to API
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios({
        method: "post",
        url: process.env.NEXT_PUBLIC_API_URL ?? "",
        data: formData,
      });

      if (res.status === 200) {
        setData(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          res.data
        );
        toast.success("Analysis Complete", {
          description: `Detected: ${
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            res.data.class
          } with ${Number.parseFloat(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            res.data.confidence
          ).toFixed(1)}% confidence`,
          duration: 3000,
        });
      }
    } catch (err) {
      console.error("Analysis failed:", err);
      toast.error("Analysis Failed", {
        description: "Please check your API server or try another image.",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (preview && selectedFile) {
      analyzeImage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile, preview]);

  return (
    <div className="min-h-screen bg-gradient text-white">
      <MainNav />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold mb-4">Potato Disease Detection</h1>
          <TipOfTheDay className="mb-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 h-full">
              <CardContent className="p-6">
                <div
                  className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-4 border-2 border-dashed border-white/30 flex items-center justify-center"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  {preview ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={preview || "/placeholder.svg"}
                        alt="Preview"
                        fill
                        className="object-contain"
                      />
                      <button
                        onClick={clearData}
                        className="absolute top-2 right-2 bg-black/50 p-2 rounded-full"
                        title="Clear image"
                      >
                        <Trash2 className="h-5 w-5 text-white" />
                      </button>
                    </div>
                  ) : (
                    <div className="text-center p-6">
                      <Upload className="h-12 w-12 mx-auto mb-4 text-white/70" />
                      <p className="text-white/90 mb-2">
                        Drag & drop an image or click to select
                      </p>
                      <p className="text-white/60 text-sm">
                        Supported formats: JPG, PNG
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex space-x-4">
                  <Button
                    className="flex-1 py-6"
                    onClick={() =>
                      document.getElementById("file-upload")?.click()
                    }
                  >
                    <Upload className="h-5 w-5 mr-2" />
                    Upload Image
                  </Button>
                  <label htmlFor="file-upload" className="sr-only">
                    Upload Image
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                    title="Upload Image"
                  />

                  <Button
                    variant="outline"
                    className="flex-1 py-6 bg-white/10 border-white/20 hover:bg-white/20"
                    onClick={clearData}
                  >
                    <Trash2 className="h-5 w-5 mr-2" />
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="bg-white/10 backdrop-blur-md border-white/20 h-full">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>

                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
                    <p className="text-white/80">Analyzing image...</p>
                  </div>
                ) : data ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="bg-white/10 rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white/80">Disease:</span>
                        <span className="font-semibold">{data.class}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white/80">Confidence:</span>
                        <span className="font-semibold">
                          {Number.parseFloat(data.confidence).toFixed(1)}%
                        </span>
                      </div>
                      <Progress
                        value={Number.parseFloat(data.confidence)}
                        className="h-2 mt-2"
                      />
                    </div>

                    <p className="text-white/70 text-sm">
                      Swipe left or right on the image to clear it, or use the
                      Clear button.
                    </p>
                  </motion.div>
                ) : (
                  <div className="text-center py-12 text-white/70">
                    <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Upload an image to see analysis results</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {recentImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8"
          >
            <h2 className="text-xl font-semibold mb-4">Recent Images</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {recentImages.map((imageUrl, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-lg overflow-hidden cursor-pointer border border-white/20 hover:border-white/40 transition-colors"
                  onClick={() => selectRecentImage(imageUrl)}
                >
                  <Image
                    src={imageUrl || "/placeholder.svg"}
                    alt={`Recent image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
