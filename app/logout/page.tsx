import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex items-center gap-4 h-[95vh]">
      <form
        action={signOut}
        className="flex flex-col justify-center items-center mx-auto gap-4"
      >
        <Label>Are you sure you want to logout?</Label>
        <Button>Logout</Button>
      </form>
    </div>
  ) : (
    redirect("/")
  );
}
