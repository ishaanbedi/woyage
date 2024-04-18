import FAQSection from "@/components/FAQSection";
import Stack from "@/components/Stack";
import Navbar from "@/components/Navbar";
import { createClient } from "@/utils/supabase/server";
import { Features } from "@/components/component/features";
import HeroSection from "@/components/HeroSection";
import { Divider } from "@tremor/react";

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
        <Stack user={user} />
        <Divider />
        <Features />
        <Divider />
        <FAQSection />
      </main>
    </div>
  );
}
