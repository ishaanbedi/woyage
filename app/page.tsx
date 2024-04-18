import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import FAQSection from "@/components/FAQSection";
import Stack from "@/components/Stack";
import Navbar from "@/components/Navbar";
import { createClient } from "@/utils/supabase/server";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Features } from "@/components/component/features";
import Image from "next/image";

export default async function Component() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <Navbar user={user} />
        <section className="w-full pt-24 border-y">
          <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
            <div className="flex flex-col justify-center items-center">
              <div>
                <h1 className="lg:leading-tighter text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl xl:text-[3.5rem] 2xl:text-[4rem] max-w-3xl text-center">
                  Analytics for the web. <br />
                  Supa-Fast & Supa-Reliable
                </h1>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center mt-4">
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Supalytics is a free and open-source analytics tool that helps
                  you track your website traffic and user behavior.
                </p>
                <div className="space-x-4 flex">
                  {user ? (
                    <Link href="/dashboard">
                      <Button>Go to Dashboard</Button>
                    </Link>
                  ) : (
                    <Link href={`/login`}>
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
                    {/* <Button variant="outline">

                    </Button> */}
                  </Link>
                </div>
              </div>
            </div>
            <Image
              alt="Hero"
              className="mx-auto aspect-[3/1] overflow-hidden rounded-t-xl object-cover"
              height="300"
              src="https://cdn.sanity.io/images/tlr8oxjg/production/fdf314615dab9455b1e163ae8ab698abde8453c8-1456x816.png?w=3840&q=100&fit=clip&auto=format"
              width="1270"
            />
          </div>
        </section>

        <Features />
        <Stack user={user} />
        <FAQSection />
      </main>
    </div>
  );
}
