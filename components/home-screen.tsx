"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Camera, Leaf, Bookmark, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TipOfTheDay } from "@/components/tip-of-the-day";
import { MainNav } from "@/components/main-nav";

export function HomeScreen() {
  return (
    <div className="min-h-screen bg-gradient text-white">
      <MainNav />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mb-8"
        >
          <Image
            src="/logo1.png"
            alt="Potato Disease Classifier Logo"
            width={100}
            height={100}
            className="mb-4"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            Legacy Potato Doctor
          </h1>
          <p className="text-lg text-gray-300 mt-2 text-center">
            Identify potato plant diseases instantly with AI.
          </p>
        </motion.div>

        <TipOfTheDay className="mb-8" />

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Features</h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/predict">
              <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-colors mb-4">
                <CardContent className="p-4 flex items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mr-4 flex-shrink-0">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">Disease Detection</h3>
                    <p className="text-sm text-gray-300">
                      Upload a photo of your potato plant and get instant
                      disease identification
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link href="/explore">
              <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-colors mb-4">
                <CardContent className="p-4 flex items-center">
                  <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center mr-4 flex-shrink-0">
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">Disease Library</h3>
                    <p className="text-sm text-gray-300">
                      Browse and learn about common potato diseases
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/bookmarks">
              <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-colors">
                <CardContent className="p-4 flex items-center">
                  <div className="w-12 h-12 rounded-full bg-amber-600 flex items-center justify-center mr-4 flex-shrink-0">
                    <Bookmark className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">Saved Diseases</h3>
                    <p className="text-sm text-gray-300">
                      Access your bookmarked diseases for quick reference
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col space-y-4"
        >
          <Link href="/predict">
            <Button className="w-full py-6 text-lg cursor-pointer" size="lg">
              Start Detection
            </Button>
          </Link>

          <Link href="/about">
            <Button
              variant="outline"
              className="w-full py-6 text-lg bg-white/10 border-white/20 hover:bg-white/20 cursor-pointer"
              size="lg"
            >
              About the App
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
