import { createClient } from "@/utils/supabase/server";
import { Features } from "@/components/features";
import Navbar from "@/components/Navbar";
import { PrivacyFeatures } from "@/components/PrivacyFeatures";
import { OpenSourced } from "@/components/OpenSource";
import { Divider } from "@tremor/react";

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
