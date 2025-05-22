"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TipOfTheDay } from "@/components/tip-of-the-day";
import { MainNav } from "@/components/main-nav";

export function AboutScreen() {
  return (
    <div className="min-h-screen bg-gradient text-white">
      <MainNav />

      <div className="container mx-auto px-4 py-8">
        <TipOfTheDay className="mb-6" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6 md:p-8">
              <h1 className="text-2xl font-bold mb-4">About the App</h1>
              <p className="text-white/90 mb-6">
                This app helps farmers identify common potato diseases using AI
                and image recognition. Users can upload a picture of a potato
                plant and get instant predictions.
              </p>

              <div className="h-px bg-white/20 my-6"></div>

              <h2 className="text-xl font-semibold mb-4">Features</h2>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 mr-3"></div>
                  <span>AI-powered disease detection</span>
                </li>
                <li className="flex items-start">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 mr-3"></div>
                  <span>Comprehensive disease library</span>
                </li>
                <li className="flex items-start">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 mr-3"></div>
                  <span>Daily farming tips</span>
                </li>
                <li className="flex items-start">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 mr-3"></div>
                  <span>Bookmark important information</span>
                </li>
              </ul>

              <div className="h-px bg-white/20 my-6"></div>

              <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
              <div className="space-y-3 mb-6">
                <Link href="mailto:troylegacy256@gmail.com">
                  <Button
                    variant="outline"
                    className="w-full bg-white/10 border-white/20 hover:bg-white/20"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email: troylegacy256@gmail.com
                  </Button>
                </Link>

                <Link href="https://troylegacy.vercel.app" target="_blank">
                  <Button
                    variant="outline"
                    className="w-full bg-white/10 border-white/20 hover:bg-white/20"
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    Visit our website
                  </Button>
                </Link>
              </div>

              <div className="h-px bg-white/20 my-6"></div>

              <div className="text-center text-white/70">
                <p className="text-sm mb-1">Version 1.0.0</p>
                <p className="text-sm">
                  © 2024 TroyLegacy. All rights reserved.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
