import { NextAuthOptions, getServerSession } from "next-auth";
import { redirect } from 'next/navigation';
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import GoogleProvider from 'next-auth/providers/google'
import { GoogleProfile } from "next-auth/providers/google";

const prisma = new PrismaClient()
const prismaAdapter = PrismaAdapter(prisma);

//@ts-ignore
prismaAdapter.createUser = (data) => {
  return prisma.user.create({
    data: {
      name: data.name as string,
      email: data.email as string,
      role: data.role as string
    },
  });
};

export const authConfig: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          name: profile.login,
          email: profile.email,
          image: profile.picture,
          role: profile.role ?? "user"
        };
      },
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    })
  ],
  callbacks: {
    async session({ session, user }) {
      session.user.role = user.role;
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true
};

export async function loginIsRequiredServer() {
  const session = await getServerSession(authConfig);
  if (!session) return redirect("/");
}
