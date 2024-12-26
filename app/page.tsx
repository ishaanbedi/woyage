import FAQSection from "@/components/FAQSection";
import Stack from "@/components/Stack";
import Navbar from "@/components/Navbar";
import { createClient } from "@/utils/supabase/server";
import { Features } from "@/components/features";
import HeroSection from "@/components/HeroSection";
import Steps from "@/components/Steps";
import { Divider } from "@tremor/react";
import Script from "next/script";
import DemoSection from "@/components/DemoSection";

export default async function Component() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <Navbar user={user} />
        <HeroSection user={user} />
        <Divider />
        <Features home />
        <Divider />
        <Steps user={user} />
        <Divider />
        <Stack user={user} />
        <Divider />
        <FAQSection />
      </main>
      <Script defer src="https://woyage.app/track.js" data-website-id="187fcd8e-96dc-42b5-9fa0-a17243a7bbd8"/>
    </div>
  );
}
