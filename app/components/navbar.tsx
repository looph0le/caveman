"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Menu, Search, User } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
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
                <a href="#" className="text-lg font-medium hover:text-primary">
                  Home
                </a>
                <a href="#" className="text-lg font-medium hover:text-primary">
                  About
                </a>
                <a href="#" className="text-lg font-medium hover:text-primary">
                  Services
                </a>
                <a href="#" className="text-lg font-medium hover:text-primary">
                  Contact
                </a>
              </nav>
            </SheetContent>
          </Sheet>
          <a href="/" className="text-2xl font-bold uppercase">caveman</a>
        </div>
        <nav className="hidden md:flex items-center space-x-6 text-gray-300">
          <a
            href="#"
            className="text-sm font-medium hover:text-primary transition-colors relative group"
          >
            Dashboard 
            <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform" />
          </a>
          <a
            href="#"
            className="text-sm font-medium hover:text-primary transition-colors relative group"
          >
            Workout Plan
            <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform" />
          </a>
          <a
            href="#"
            className="text-sm font-medium hover:text-primary transition-colors relative group"
          >
            Exercies
            <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform" />
          </a>
          <a
            href="#"
            className="text-sm font-medium hover:text-primary transition-colors relative group"
          >
            Statistics
            <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform" />
          </a>
        </nav>
        <div className="flex items-center space-x-4">
          <div className="hidden md:block relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 w-[200px] bg-background/50 focus:bg-background transition-colors"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.nav>
  )
}
