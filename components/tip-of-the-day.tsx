"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lightbulb, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { tipsOfTheDay } from "@/data/disease-data";

interface TipOfTheDayProps {
  className?: string;
}

export function TipOfTheDay({ className = "" }: TipOfTheDayProps) {
  const [tip, setTip] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getRandomTip = () => {
    const randomIndex = Math.floor(Math.random() * tipsOfTheDay.length);
    return tipsOfTheDay[randomIndex];
  };

  const refreshTip = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setTip(getRandomTip());
      setIsRefreshing(false);
    }, 500);
  };

  useEffect(() => {
    // Check if there's a saved tip and when it was last updated
    const savedTip = localStorage.getItem("tipOfTheDay");
    const lastUpdated = localStorage.getItem("tipLastUpdated");
    const now = new Date().toDateString();

    if (savedTip && lastUpdated === now) {
      // Use the saved tip if it's from today
      setTip(savedTip);
    } else {
      // Generate a new tip
      const newTip = getRandomTip();
      setTip(newTip);

      // Save the new tip and update date
      localStorage.setItem("tipOfTheDay", newTip);
      localStorage.setItem("tipLastUpdated", now);
    }
  }, []);

  return (
    <Card
      className={`bg-white/10 backdrop-blur-md border-white/20 ${className}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start">
          <Lightbulb className="h-5 w-5 text-amber-400 mr-3 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-sm font-medium text-amber-400 mb-1">
              Tip of the Day
            </h3>
            <motion.p
              key={tip}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-white/90"
            >
              {tip}
            </motion.p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white/70 hover:text-white hover:bg-white/10 -mr-2 -mt-2"
            onClick={refreshTip}
            disabled={isRefreshing}
          >
            <RefreshCw
              className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
