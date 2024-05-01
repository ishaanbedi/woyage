import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { type Metadata } from "next";
import AnalyticsPage from "@/components/AnalyticsPage";
export const metadata: Metadata = {
    title: 'Analytics',
};
export default async function SharedSlugDynamicPage({
    params,
}: {
    params: { slug: string };
}) {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
        const { data, error } = await supabase
            .from("site_domains")
            .select("*")
            .eq("website_id", params.slug)
            .single();
        if (error) {
            redirect("/login");
        }
        if (data.length === 0) {
            redirect("/login");
        }
        if (!data.public_url) {
            redirect("/login");
        }
        return (
            <div>
                <Navbar user={user} />
                <AnalyticsPage domain={data.domain_name} params={params} public_url={data.public_url} />
            </div>
        );

    } else {
        const email = user.email;
        const { data, error } = await supabase
            .from("site_domains")
            .select("*")
            .eq("website_id", params.slug)
            .single();
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
                <Navbar user={user} />
                <AnalyticsPage domain={data.domain_name} params={params} public_url={data.public_url} />
            </div>
        );
    }
}
