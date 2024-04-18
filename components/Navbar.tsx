"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { type User } from "@supabase/supabase-js";
import { Pacifico } from "next/font/google";
const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
});
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Divide, Menu, Moon, Sun } from "lucide-react";
import { Divider } from "@tremor/react";

const Navbar = ({ user }: { user: User | null }) => {
  const { setTheme } = useTheme();
  return (
    <header className="flex h-16 w-full items-center justify-between bg-white px-4 shadow-sm dark:bg-gray-950 md:px-6">
      <div>
        <Link
          className={`flex items-center justify-center text-xl ${pacifico.className}`}
          href="/"
        >
          {process.env.NEXT_PUBLIC_SITE_NAME}
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
            <Link href={`/login`}>
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
              <Link className="" href="/">
                <span
                  className={`flex items-center justify-center text-center text-3xl ${pacifico.className}`}
                >
                  {process.env.NEXT_PUBLIC_SITE_NAME}
                </span>
              </Link>
              <div className="justify-between flex flex-col">
                <div className="flex flex-col gap-4 mt-4 w-full">
                  <Link
                    className="font-medium hover:underline hover:underline-offset-4 w-full"
                    href="/features"
                  >
                    <Button className="w-full" variant={"outline"}>
                      Features
                    </Button>
                  </Link>

                  <Link
                    className="font-medium hover:underline hover:underline-offset-4 w-full"
                    href="/support"
                  >
                    <Button className="w-full" variant={"outline"}>
                      Support
                    </Button>
                  </Link>
                </div>
                <div className="flex space-x-2 mt-4 w-full">
                  <Link
                    className="font-medium hover:underline hover:underline-offset-4 w-full"
                    href="/dashboard"
                  >
                    <Button className="w-full" variant={"outline"}>
                      Dashboard
                    </Button>
                  </Link>

                  <Link
                    className="font-medium hover:underline hover:underline-offset-4 w-full"
                    href="/logout"
                  >
                    <Button className="w-full" variant={"destructive"}>
                      Logout
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <nav className="flex flex-col gap-4 mt-4 w-full">
              <div className="flex space-x-2 mt-4 w-full">
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
