import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import SitesList from "./SitesList";
import NewSiteDialog from "./NewSiteDialog";
export default async function SitesPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/login");
  }
  return (
    <div>
      <NewSiteDialog user={user} />
      <SitesList user={user} />
    </div>
  );
}
