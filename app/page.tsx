import { authConfig, authMiddleware, loginIsRequiredServer } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation'
import { GoogleSignInButton } from './components/authBottons'



export default async function Home() {
  const session = await getServerSession(authConfig);
  if(session){
    redirect("/dashboard");
  }
  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-5">
        <h1 className="text-center text-xl italic font-bold uppercase">Be Unfazed.</h1>
        <GoogleSignInButton />
    </div>
  );
}
