"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { type User } from "@supabase/supabase-js";
import { Pacifico } from "next/font/google";
const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
});

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const Navbar = ({ user }: { user: User | null }) => {
  const { setTheme } = useTheme()
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">

      <Link
        className={`flex items-center justify-center text-xl ${pacifico.className}`}
        href="/"
      >
        {process.env.NEXT_PUBLIC_SITE_NAME}
      </Link>
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          Features
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          About
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          Docs
        </Link>

        {user ? (
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/dashboard">
              <Button size={"sm"}>Dashboard</Button>
            </Link>

            <Link href="/logout">
              <Button variant={"outline"} size={"sm"}>
                Logout
              </Button>
            </Link>

          </div>
        ) : (
          <Link href={`/login`}>
            <Button size={"sm"}>Get Started Now</Button>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
