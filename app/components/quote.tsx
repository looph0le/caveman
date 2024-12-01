"use client"

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"

const motivationalQuotes = [
  { quote: "A man can’t gain something without sacrificing something in return.", author: "Fullmetal Alchemist Brotherhood" },
  { quote: "Fate only binds you if you let it.", author: "Kratos, God of War" },
  { quote: "Weakness is a choice.", author: "Anonymous" },
  { quote: "Pain is temporary. Glory lasts forever.", author: "Anonymous" },
  { quote: "The world doesn’t care about your sadness. Harden yourself.", author: "Guts, Berserk" },
  { quote: "The impediment to action advances action. What stands in the way becomes the way.", author: "Marcus Aurelius" },
  { quote: "You have power over your mind, not outside events. Realize this, and you will find strength.", author: "Marcus Aurelius" },
  { quote: "We suffer more in imagination than in reality.", author: "Seneca" },
  { quote: "Do not pray for an easy life, pray for the strength to endure a difficult one.", author: "Bruce Lee (Stoic-inspired)" },
  { quote: "He who has a why to live can bear almost any how.", author: "Nietzsche (Stoic-adjacent)" },
  { quote: "Even if we’re fated to wander in hell, I’ll find my way back. My will is unbreakable.", author: "Guts, Berserk" },
  { quote: "Endure, and in enduring, grow strong.", author: "Hákon Jarl (Norse-inspired)" }
];

const RandomQuote = () => {
  const [quote, setQuote] = useState<{ quote: string; author: string } | null>(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setQuote(motivationalQuotes[randomIndex]);
  }, []);

  if (!quote) {
    return <Skeleton className="m-10 h-[100px] w-[400px] rounded-lg bg-black/50" ></Skeleton>; // Optional loading state
  }

  return (
    <div>
      <Card className=" m-10 py-5 px-5 shadow-xl shadow-red-500/20 text-gray-200" >
        <div>
          "{quote.quote}"
        </div>
        <div className="text-right text-gray-500">
          – {quote.author}
        </div>
      </Card>
    </div>
  );
};

export default RandomQuote;
