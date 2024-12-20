import { authConfig, authMiddleware, loginIsRequiredServer } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation'
import { GoogleSignInButton } from './components/authBottons'
import Quote from './components/quote'


const quotes = [
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


export default async function Home() {
  const session = await getServerSession(authConfig);
  if(session){
    redirect("/dashboard");
  }
  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-5">
        <Quote/>
        <h1 className="text-center text-xl italic font-bold uppercase">Be Unfazed.</h1>
        <GoogleSignInButton />
    </div>
  );
}
