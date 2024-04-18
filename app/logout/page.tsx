import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/server";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
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
      <BackButton />
      <form
        action={signOut}
        className="flex flex-col justify-center items-center mx-auto gap-4"
      >
        <h1 className="text-2xl font-bold">Are you sure you want to logout?</h1>
        <Button>Logout</Button>
      </form>
    </div>
  ) : (
    redirect("/")
  );
}

const BackButton = () => (
  <Link href="/" className="absolute left-8 top-8 flex items-center gap-2">
    <ArrowLeftIcon className="w-5 h-5" />
    <Label>Home</Label>
  </Link>
);
