"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Trash2, Info, BookmarkX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { TipOfTheDay } from "@/components/tip-of-the-day";
import { MainNav } from "@/components/main-nav";
import { useBookmarks } from "@/context/bookmark-context";
import { diseases } from "@/data/disease-data";
import { toast } from "sonner";

export function BookmarksScreen() {
  const { bookmarks, toggleBookmark } = useBookmarks();
  const [selectedDisease, setSelectedDisease] = useState<
    (typeof diseases)[0] | null
  >(null);
  const [diseaseToRemove, setDiseaseToRemove] = useState<
    (typeof diseases)[0] | null
  >(null);

  // Get the full disease objects for the bookmarked IDs
  const bookmarkedDiseases = diseases.filter((disease) =>
    bookmarks.includes(disease.id)
  );

  const handleRemoveBookmark = (disease: (typeof diseases)[0]) => {
    setDiseaseToRemove(disease);
  };

  const confirmRemoveBookmark = () => {
    if (diseaseToRemove) {
      toggleBookmark(diseaseToRemove);
      toast.success("Removed from bookmarks", {
        description: diseaseToRemove.name,
        duration: 2000,
      });
      setDiseaseToRemove(null);
    }
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
          <h1 className="text-2xl font-bold mb-4">Saved Diseases</h1>
          <TipOfTheDay className="mb-6" />
        </motion.div>

        {bookmarkedDiseases.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <BookmarkX className="h-16 w-16 text-white/50 mb-4" />
            <h2 className="text-xl font-semibold mb-2">No bookmarks yet</h2>
            <p className="text-white/70 text-center max-w-md">
              Save diseases for quick access by clicking the bookmark button on
              a disease card in the Explore tab
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookmarkedDiseases.map((disease, index) => (
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
                      <h2 className="text-xl font-semibold">{disease.name}</h2>
                      <p className="text-gray-300 mt-2">{disease.short}</p>

                      <div className="flex space-x-2 mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-white/10 border-white/20 hover:bg-white/20 cursor-pointer"
                          onClick={() => setSelectedDisease(disease)}
                        >
                          <Info className="h-4 w-4 mr-2" />
                          Details
                        </Button>

                        <Button
                          variant="destructive"
                          size="sm"
                          className="cursor-pointer"
                          onClick={() => handleRemoveBookmark(disease)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
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
            <DialogContent className="max-w-3xl bg-zinc-900 border-zinc-800 text-white max-h-[90vh] flex flex-col">
              <DialogHeader className="flex-shrink-0">
                <DialogTitle className="text-2xl">
                  {selectedDisease.name}
                </DialogTitle>
              </DialogHeader>

              <div className="relative w-full h-64 my-4 flex-shrink-0">
                <Image
                  src={selectedDisease.imageUrl || "/placeholder.svg"}
                  alt={selectedDisease.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>

              <ScrollArea className="flex-grow overflow-auto pr-4 mb-4">
                <div className="whitespace-pre-line">
                  {selectedDisease.full}
                </div>
              </ScrollArea>

              <div className="flex justify-between mt-2 pt-4 border-t border-white/10 flex-shrink-0">
                <Button
                  variant="outline"
                  onClick={() => setSelectedDisease(null)}
                  className="bg-white/10 border-white/20 hover:bg-white/20 cursor-pointer"
                >
                  Close
                </Button>
              </div>
            </DialogContent>
          )}
        </Dialog>

        <AlertDialog
          open={!!diseaseToRemove}
          onOpenChange={(open) => !open && setDiseaseToRemove(null)}
        >
          <AlertDialogContent className="bg-zinc-900 border-zinc-800 text-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Remove Bookmark</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to remove this bookmark? This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-white/10 border-white/20 hover:bg-white/20 text-white">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmRemoveBookmark}
                className="bg-red-600 hover:bg-red-700"
              >
                Remove
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
