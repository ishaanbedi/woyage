import Navbar from "@/components/Navbar";
import { createClient } from "@/utils/supabase/server";
import SupportForm from "./SupportForm";
import { type Metadata } from "next";
export const metadata: Metadata = {
  title: 'Support',
};
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}/terms`
  : "http://localhost:3000/terms";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: `${process.env.NEXT_PUBLIC_SITE_NAME} | Privacy Policy`,
  description: `Privacy Policy for ${process.env.NEXT_PUBLIC_SITE_NAME}`,
};
export default async function Component() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <section>
      <Navbar user={user} />
      <div className="h-[85vh] flex items-center justify-center bg-gray-100 px-2">
        <SupportForm />
      </div>
    </section>
  );
}
