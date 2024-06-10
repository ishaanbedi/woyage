import { createClient } from "@/utils/supabase/server";
import { Features } from "@/components/features";
import Navbar from "@/components/Navbar";
import { PrivacyFeatures } from "@/components/PrivacyFeatures";
import { OpenSourced } from "@/components/OpenSource";
import { Divider } from "@tremor/react";
import { type Metadata } from "next";
export const metadata: Metadata = {
  title: "Features",
  description: `Exlpore the features of ${process.env.NEXT_PUBLIC_SITE_NAME}.`,
};
export default async function FeaturesPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <section>
      <Navbar user={user} />
      <Features home={false} />
      <Divider />
      <PrivacyFeatures />
      <Divider />
      <OpenSourced />
    </section>
  );
}
