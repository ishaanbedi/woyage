"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { type User } from "@supabase/supabase-js";
import { Pacifico } from "next/font/google";
const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
});
const Navbar = ({ user }: { user: User | null }) => {
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
