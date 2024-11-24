import { authConfig, loginIsRequiredServer } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation'
import { signIn } from 'next-auth/react';
import { GoogleSignInButton } from './components/authBottons'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';



export default async function Home() {
  // Session Management
  const session = await getServerSession(authConfig);
  if (session) return redirect("/dashboard");

  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-5">
        <h1 className="text-center text-xl italic font-bold uppercase">Be Unfazed.</h1>
        <GoogleSignInButton />
    </div>
  );
}
