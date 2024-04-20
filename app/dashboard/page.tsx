import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import SitesList from "./SitesList";
import Navbar from "@/components/Navbar";
import { type Metadata } from "next";
export const metadata: Metadata = {
  title: 'Dashboard',
};
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
