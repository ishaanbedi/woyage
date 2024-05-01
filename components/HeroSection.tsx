"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { type User } from "@supabase/supabase-js";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { Badge } from "@tremor/react";
const HeroSection = ({ user }: { user: User | null }) => {
  return (
    <section className="w-full pt-24">
      <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
        <div className="flex flex-col justify-center items-center">
          <div>
            <h1 className="lg:leading-tighter text-[1.90rem] font-bold tracking-tighter sm:text-5xl md:text-6xl xl:text-[3.5rem] 2xl:text-[4rem] text-center">
              Analytics for the web.
              <br />
              Supa-Fast & Supa-Reliable
            </h1>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center mt-4">
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              {process.env.NEXT_PUBLIC_SITE_NAME} is a free and open-source
              analytics tool that helps you track your website traffic.
            </p>
            <div className="space-x-4 flex">
              {user ? (
                <Link href="/dashboard">
                  <Button>Go to Dashboard</Button>
                </Link>
              ) : (
                <Link href={`/signup`}>
                  <Button>Get Started Now</Button>
                </Link>
              )}
              <Link
                href="https://www.github.com/ishaanbedi/supalytics"
                target="_blank"
              >
                <Button
                  variant={"outline"}
                  className="flex justify-center items-center"
                >
                  <GitHubLogoIcon className="mr-2 h-4 w-4" />
                  <span>Source Code</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Image
          draggable="false"
          alt="Hero"
          className="mx-auto lg:md:sm:aspect-video aspect-[3/2]  object-cover border p-2"
          height="300"
          src="/screenshots/dashboard-screenshot.png"
          width="1270"
        />
      </div>
    </section>
  );
};

export default HeroSection;
