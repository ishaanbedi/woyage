import { createClient } from "@/utils/supabase/server";
import AnalyticsPage from "./AnalyticsPage";
import { redirect } from "next/navigation";
export default async function SitesDynamicPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/login");
  } else {
    const email = user.email;
    const { data, error } = await supabase
      .from("site_domains")
      .select("*")
      .eq("website_id", params.slug)
      .single();
    if (error) {
      console.error(error);
      return (
        <div>
          <h1>Not Found</h1>
          <p>Try again later</p>
        </div>
      );
    }
    if (data.length === 0) {
      return (
        <div>
          <h1>Not Found</h1>
          <p>Site not found</p>
        </div>
      );
    }
    if (data.email !== email) {
      return (
        <div>
          <h1>Not Found</h1>
          <p>Site not found</p>
        </div>
      );
    }
    return (
      <div>
        <AnalyticsPage user={user} params={params} />
      </div>
    );
  }
}
