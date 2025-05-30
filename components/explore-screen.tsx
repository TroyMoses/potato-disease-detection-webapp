"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, X, Bookmark, BookmarkCheck, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TipOfTheDay } from "@/components/tip-of-the-day";
import { MainNav } from "@/components/main-nav";
import { useBookmarks } from "@/context/bookmark-context";
import { diseases } from "@/data/disease-data";
import { toast } from "sonner";

export function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDisease, setSelectedDisease] = useState<
    (typeof diseases)[0] | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toggleBookmark, isBookmarked } = useBookmarks();

  // Filter diseases based on search query
  const filteredDiseases = diseases.filter(
    (disease) =>
      disease.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      disease.short.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (text: string) => {
    setIsLoading(true);
    // Simulate search delay
    setTimeout(() => {
      setSearchQuery(text);
      setIsLoading(false);
    }, 300);
  };

  const handleBookmark = (disease: (typeof diseases)[0]) => {
    toggleBookmark(disease);
    toast.success(
      isBookmarked(disease.id)
        ? "Removed from bookmarks"
        : "Added to bookmarks",
      {
        description: disease.name,
        duration: 2000,
      }
    );
  };

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
          <h1 className="text-2xl font-bold mb-4">Potato Diseases</h1>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              className="pl-10 bg-white/10 border-white/20 placeholder:text-gray-400 focus-visible:ring-blue-500"
              placeholder="Search diseases..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            {searchQuery.length > 0 && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                title="Clear search"
                aria-label="Clear search"
              >
                <X className="h-4 w-4 text-gray-400" />
              </button>
            )}
          </div>
        </motion.div>

        <TipOfTheDay className="mb-6" />

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        ) : filteredDiseases.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl font-medium">No diseases found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredDiseases.map((disease, index) => (
              <motion.div
                key={disease.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20 overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative w-full md:w-1/3 h-48 md:h-auto">
                      <Image
                        src={disease.imageUrl || "/placeholder.svg"}
                        alt={disease.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4 md:p-6 flex-1">
                      <div className="flex justify-between items-start">
                        <h2 className="text-xl font-semibold">
                          {disease.name}
                        </h2>
                        {isBookmarked(disease.id) && (
                          <BookmarkCheck className="h-5 w-5 text-blue-500" />
                        )}
                      </div>
                      <p className="text-gray-300 mt-2">{disease.short}</p>

                      <div className="flex space-x-2 mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-white/10 border-white/20 hover:bg-white/20 cursor-pointer"
                          onClick={() => setSelectedDisease(disease)}
                        >
                          <Info className="h-4 w-4 mr-2" />
                          Learn More
                        </Button>

                        <Button
                          variant={
                            isBookmarked(disease.id) ? "secondary" : "outline"
                          }
                          size="sm"
                          className={
                            isBookmarked(disease.id)
                              ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                              : "bg-white/10 border-white/20 hover:bg-white/20 cursor-pointer"
                          }
                          onClick={() => handleBookmark(disease)}
                        >
                          {isBookmarked(disease.id) ? (
                            <>
                              <BookmarkCheck className="h-4 w-4 mr-2" />
                              Saved
                            </>
                          ) : (
                            <>
                              <Bookmark className="h-4 w-4 mr-2" />
                              Save
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        <Dialog
          open={!!selectedDisease}
          onOpenChange={(open) => !open && setSelectedDisease(null)}
        >
          {selectedDisease && (
            <DialogContent className="bg-zinc-900 border-zinc-800 text-white p-0 sm:p-6 max-w-3xl w-full h-[95vh] sm:h-auto sm:max-h-[90vh] flex flex-col">
              <div className="flex flex-col h-full overflow-hidden">
                <DialogHeader className="p-4 sm:p-0 flex-shrink-0">
                  <DialogTitle className="text-xl sm:text-2xl">
                    {selectedDisease.name}
                  </DialogTitle>
                </DialogHeader>

                <div className="relative w-full h-48 sm:h-64 flex-shrink-0">
                  <Image
                    src={selectedDisease.imageUrl || "/placeholder.svg"}
                    alt={selectedDisease.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 overflow-hidden flex flex-col min-h-0">
                  <ScrollArea className="flex-1 p-4 sm:pr-4 overflow-y-auto">
                    <div className="whitespace-pre-line pb-4">
                      {selectedDisease.full}
                    </div>
                  </ScrollArea>
                </div>

                <div className="p-4 sm:pt-4 border-t border-white/10 flex-shrink-0 bg-zinc-900 sticky bottom-0 left-0 right-0">
                  <div className="flex justify-between gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setSelectedDisease(null)}
                      className="bg-white/10 border-white/20 hover:bg-white/20 cursor-pointer"
                    >
                      Close
                    </Button>

                    <Button
                      variant={
                        isBookmarked(selectedDisease.id)
                          ? "secondary"
                          : "outline"
                      }
                      className={
                        isBookmarked(selectedDisease.id)
                          ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                          : "bg-white/10 border-white/20 hover:bg-white/20 cursor-pointer"
                      }
                      onClick={() => handleBookmark(selectedDisease)}
                    >
                      {isBookmarked(selectedDisease.id) ? (
                        <>
                          <BookmarkCheck className="h-4 w-4 mr-2" />
                          Saved
                        </>
                      ) : (
                        <>
                          <Bookmark className="h-4 w-4 mr-2" />
                          Save
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </div>
  );
}
