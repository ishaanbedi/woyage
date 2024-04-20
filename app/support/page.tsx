import Navbar from "@/components/Navbar";
import { createClient } from "@/utils/supabase/server";
import SupportForm from "./SupportForm";

export default async function Component() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <section>
      <Navbar user={user} />
      <div className="h-[90vh] flex items-center justify-center bg-gray-100 px-2">
        <SupportForm />
      </div>
    </section>
  );
}
