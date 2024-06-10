"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { type User } from "@supabase/supabase-js";
import { Fira_Sans_Extra_Condensed } from "next/font/google";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Badge } from "@tremor/react";
const Navbar = ({ user }: { user: User | null }) => {
  return (
    <header className="flex h-16 w-full items-center justify-between bg-white px-4 shadow-sm dark:bg-gray-950 md:px-6">
      <div>
        <Link href="/">
          <Button
            variant={"ghost"}
            className={`flex items-center p-0.5 justify-center tracking-tight text-xl`}
          >
            <span className="flex items-center space-x-2">
              <span>{process.env.NEXT_PUBLIC_SITE_NAME}</span>
              <Badge className="mt-0.5">BETA</Badge>
            </span>
          </Button>
        </Link>
      </div>

      <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
        <div className="flex items-center gap-4">
          <Link
            className="hover:underline hover:underline-offset-4"
            href="/features"
          >
            Features
          </Link>
          <Link
            className="hover:underline hover:underline-offset-4"
            href="/support"
          >
            Support
          </Link>
        </div>
        <div>
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
            <Link href={`/signup`}>
              <Button size={"sm"}>Get Started Now</Button>
            </Link>
          )}
        </div>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="md:hidden" size="icon" variant="outline">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <div className="p-6 flex flex-col justify-between items-center w-full  h-full">
            <div>
              <Link className=" flex flex-col items-center" href="/">
                <span>{process.env.NEXT_PUBLIC_SITE_NAME}</span>
                <Badge className="mt-0.5">BETA</Badge>
              </Link>
              <div className="justify-center text-center items-center flex flex-col">
                <div className="flex flex-col gap-4 mt-12 w-full">
                  <Link
                    className="font-medium hover:underline hover:underline-offset-4 w-full"
                    href="/features"
                  >
                    Features
                  </Link>

                  <Link
                    className="font-medium hover:underline hover:underline-offset-4 w-full"
                    href="/support"
                  >
                    Support
                  </Link>
                  {user ? (
                    <>
                      <Link
                        className="font-medium hover:underline hover:underline-offset-4 w-full"
                        href="/dashboard"
                      >
                        Dashboard
                      </Link>

                      <Link
                        className="font-medium hover:underline hover:underline-offset-4 w-full"
                        href="/logout"
                      >
                        Logout
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        className="font-medium hover:underline hover:underline-offset-4 w-full"
                        href="/signup"
                      >
                        Get Started
                      </Link>
                      <Link
                        className="font-medium hover:underline hover:underline-offset-4 w-full"
                        href="https://www.github.com/ishaanbedi/woyage"
                      >
                        Source Code
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
            <nav className="flex items-center flex-col gap-4 mt-4 w-full">
              <div className="flex justify-between items-center space-x-2 mt-4 w-full">
                <Link
                  className="font-medium hover:underline hover:underline-offset-4 w-full"
                  href="/terms"
                >
                  Terms
                </Link>
                <Link
                  className="font-medium hover:underline hover:underline-offset-4 w-full"
                  href="/privacy"
                >
                  Privacy
                </Link>
                <Link
                  className="font-medium hover:underline hover:underline-offset-4 w-full"
                  href="https://www.twitter.com/ishnbedi"
                  target="_blank"
                >
                  Twitter
                </Link>
              </div>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Navbar;
