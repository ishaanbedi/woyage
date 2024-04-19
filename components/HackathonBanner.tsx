import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

const HackathonBanner = () => {
  return (
    <section>
      <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:h-[75vh] lg:grid-cols-2">
          <div className="relative z-10 lg:py-16">
            <div className="relative h-64 sm:h-80 lg:h-full">
              <Image
                alt="Hero"
                className="mx-auto lg:md:sm:aspect-video  object-cover border p-2"
                height="300"
                src="/screenshots/supabase.png"
                width="1270"
              />
            </div>
          </div>

          <div className="relative flex items-center bg-secondary">
            <span className="hidden lg:absolute lg:inset-y-0 lg:-start-16 lg:block lg:w-16 lg:bg-secondary"></span>
            <div className="p-8 sm:p-16 lg:p-24">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Built during the Supabase Open Source Hackathon 2024
              </h2>

              <p className="mt-4 text-gray-600">
                {`${process.env.NEXT_PUBLIC_SITE_NAME} was built during the Supabase Open Source Hackathon 2024. The hackathon was a great opportunity to learn new technologies and build something cool.`}
              </p>
              <div className="mt-8">
                <Link
                  href="https://www.github.com/ishaanbedi/supalytics"
                  target="_blank"
                >
                  <Button>
                    <GitHubLogoIcon className="mr-2 h-4 w-4" /> Check out the
                    Source Code
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HackathonBanner;
