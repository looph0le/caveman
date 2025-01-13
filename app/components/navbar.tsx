"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Menu, Search, User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { signOut, useSession } from "next-auth/react"

const navlinks = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Workout Plan", path: "/workoutplan" },
  { name: "Progress Tracker", path: "/tracker" },
  { name: "Settings", path: "/settings" },
];

const Navigation = () => {
  return (
    navlinks.map((a, b) => (
      <a href={a.path} className="text-sm font-medium hover:text-primary" key={b}>
        {a.name}
      </a>
    ))
  )
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Session Information
  const session = useSession();

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 transition-all duration-100 ${isScrolled ? "bg-background/80 backdrop-blur-md shadow-md" : "bg-transparent"}`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col space-y-4">
                <Navigation />
              </nav>
            </SheetContent>
          </Sheet>
          <a href="/" className="text-2xl font-bold uppercase italic">caveman</a>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <Navigation />
        </nav>
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Avatar>
                  <AvatarImage src={session?.data?.user?.image!} alt="@caveman" />
                  <AvatarFallback>{session?.data?.user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{session.data?.user?.name ? session.data?.user?.name : session.data?.user.email}</DropdownMenuLabel>
              {session.data?.user.role == 'admin' ?<a href="/admin"><DropdownMenuItem>Admin Dashboard</DropdownMenuItem></a> : null}
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut()}>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.nav>
  )
}
