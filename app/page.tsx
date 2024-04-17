import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import FAQSection from "@/components/FAQSection";
import Stack from "@/components/Stack";
import Navbar from "@/components/Navbar";
import { createClient } from "@/utils/supabase/server";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default async function Component() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <Navbar user={user} />
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid max-w-[1300px] mx-auto items-center gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
              <div className="space-y-2">
                <Badge variant={"outline"}>Beta Preview</Badge>
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Analytics, in a snap.
                </h1>
                <p className="mx-auto max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  {process.env.NEXT_PUBLIC_SITE_NAME} is a free and open-source
                  analytics tool that helps you track your website traffic and
                  user behavior.
                </p>
                <div className="flex space-x-4 py-3">
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
                    <Button variant="outline">
                      <GitHubLogoIcon className="mr-2 h-4 w-4" /> Source Code
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  alt="Image"
                  className="aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                  height="400"
                  src="https://cdn.sanity.io/images/tlr8oxjg/production/fdf314615dab9455b1e163ae8ab698abde8453c8-1456x816.png?w=3840&q=100&fit=clip&auto=format"
                  width="600"
                />
              </div>
            </div>
          </div>
        </section>
        <Stack user={user} />
        <FAQSection />
      </main>
    </div>
  );
}
