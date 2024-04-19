import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import SitesList from "./SitesList";
import Navbar from "@/components/Navbar";
export default async function SitesPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/login");
  }
  return (
    <section>
      <Navbar user={user} />
      <SitesList user={user} />
    </section>
  );
}
