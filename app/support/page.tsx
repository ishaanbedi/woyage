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
