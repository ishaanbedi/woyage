import Link from "next/link";
import { Button } from "./ui/button";
import { GitHubLogoIcon, HeartIcon } from "@radix-ui/react-icons";
import { Heart } from "lucide-react";

export function OpenSourced() {
  return (
    <section className="w-full lg:md:sm:h-[60vh] h-[35vh] flex flex-col justify-center items-center">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <div className="space-y-2 flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center">
              {process.env.NEXT_PUBLIC_SITE_NAME} is Open Sourced
            </h1>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400 text-center">
              {process.env.NEXT_PUBLIC_SITE_NAME} is an open source project. You
              can contribute to the project by submitting issues, feature
              requests, or pull requests on GitHub.
            </p>
          </div>
        </div>
        <div className="flex space-x-2 justify-center items-center mt-6">
          <Button>
            <Link
              href="https://www.github.com/ishaanbedi/supalytics"
              target="_blank"
              className="flex items-center space-x-2"
            >
              <GitHubLogoIcon className="w-5 h-5 mr-1" />
              View on GitHub
            </Link>
          </Button>
          <Button variant={"outline"}>
            <Link
              href="https://github.com/sponsors/ishaanbedi"
              target="_blank"
              className="flex items-center space-x-2"
            >
              <Heart className="w-5 h-5 mr-1 text-[#DB61A2]" />
              Sponsor Project
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
