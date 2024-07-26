import { createClient } from "@/utils/supabase/server";
import AnalyticsPage from "../../../components/AnalyticsPage";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { type Metadata } from "next";
export const metadata: Metadata = {
  title: 'Analytics',
};
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
    console.log(params.slug)
    const { data, error } = await supabase
      .from("site_domains")
      .select("domain_name, owner_id, public_url")
      .eq("website_id", params.slug)
      .eq("owner_id", user.id)
      .single()
    console.log(data)
    if (error) {
      return (
        <div className="min-h-[92vh] flex flex-col space-y-3 items-center justify-center">
          <h1 className="text-3xl font-bold">Site Not Found</h1>
          <p className="max-w-[400px] text-center">
            Possible reasons could be that the site does not exist or you do not
            have access to it.
          </p>
          <Link href="/dashboard">
            <Button>Go back to dashboard</Button>
          </Link>
        </div>
      );
    }

    if (data.owner_id !== user.id) {
      return (
        <div>
          <h1>Not Found</h1>
          <p>
            Looks like you do not have access to this site.
          </p>
        </div>
      );
    }
    return (
      <div>
        <Navbar user={user} />
        <AnalyticsPage domain={data.domain_name} params={params} public_url={data.public_url} />
      </div>
    );
  }
}
