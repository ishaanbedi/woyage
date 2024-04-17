import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import SitesList from "./SitesList";
import NewSiteDialog from "./NewSiteDialog";
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
      <div className="p-4 h-[92vh]">
        <NewSiteDialog user={user} />
        <SitesList user={user} />
      </div>
    </section>
  );
}
