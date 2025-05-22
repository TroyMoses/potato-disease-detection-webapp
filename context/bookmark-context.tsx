"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { diseases } from "@/data/disease-data";

type BookmarkContextType = {
  bookmarks: string[];
  toggleBookmark: (disease: (typeof diseases)[0]) => void;
  isBookmarked: (id: string) => boolean;
};

const BookmarkContext = createContext<BookmarkContextType | undefined>(
  undefined
);

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  // Load bookmarks from localStorage on component mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("bookmarks");
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  }, []);

  // Save bookmarks to localStorage when they change
  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (disease: (typeof diseases)[0]) => {
    setBookmarks((prevBookmarks) => {
      if (prevBookmarks.includes(disease.id)) {
        return prevBookmarks.filter((id) => id !== disease.id);
      } else {
        return [...prevBookmarks, disease.id];
      }
    });
  };

  const isBookmarked = (id: string) => {
    return bookmarks.includes(id);
  };

  return (
    <BookmarkContext.Provider
      value={{ bookmarks, toggleBookmark, isBookmarked }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error("useBookmarks must be used within a BookmarkProvider");
  }
  return context;
}
