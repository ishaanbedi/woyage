  'use client';
  import Link from "next/link";
  import { Button } from "./ui/button";
  import { type User } from "@supabase/supabase-js";
  import { Pacifico } from "next/font/google";
  import { useState, useEffect } from "react";

  const pacifico = Pacifico({
    subsets: ["latin"],
    weight: ["400"],
  });

  const Navbar = ({ user }: { user: User | null }) => {
    const [isSticky, setIsSticky] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        setIsSticky(window.scrollY > 0);
      };

      window.addEventListener("scroll", handleScroll);

      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleMobileMenuToggle = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
      <header
        className={`px-4 lg:px-6 h-14 flex items-center fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
          isSticky ? "bg-slate-100/70 backdrop-blur-md shadow-sm" : ""
        }`} // Apply glassmorphism and shadow on scroll
      >
        <Link
          className={`flex items-center justify-center text-xl ${pacifico.className}`}
          href="/"
        >
          {process.env.NEXT_PUBLIC_SITE_NAME}
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          {/* Mobile Menu Toggle Button */}
          <button
            className="sm:hidden" // Hide on desktop
            onClick={handleMobileMenuToggle}
          >
            {/* Hamburger Icon */}
            <svg
              className="w-6 h-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center gap-4 sm:gap-6">
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
          </div>
        </nav>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden absolute top-14 right-0 bg-white shadow-md rounded-md p-4 z-10">
            <Link
              className="block text-sm font-medium hover:underline"
              href="#"
            >
              Features
            </Link>
            <div className="h-0.5"></div>
            <Link
              className="block text-sm font-medium hover:underline"
              href="#"
            >
              About
            </Link>
            <div className="h-0.5"></div>
            <Link
              className="block text-sm font-medium hover:underline"
              href="#"
            >
              Docs
            </Link>
            <div className="h-1"></div>
            {user ? (
              <div className="flex items-center gap-2 mt-2">
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
          </div>
        )}
      </header>
    );
  };

  export default Navbar;
