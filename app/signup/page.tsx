import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import { ArrowLeft } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default async function SignUp({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      const message = error.message;
      return redirect(`/signup?message=${encodeURIComponent(message)}`);
    }

    return redirect("/signup?message=Check email to continue sign in process");
  };
  if (user) {
    return redirect("/dashboard");
  } else {
    return (
      <section className="flex h-[92vh] items-center justify-center bg-background">
        <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
          <Link
            href="/"
            className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back
          </Link>

          <form className="animate-in flex-1 flex flex-col w-full justify-center text-foreground">
            <h1 className="text-3xl font-bold text-center mb-4">Sign Up</h1>
            <Label className="text-md" htmlFor="email">
              Email
            </Label>
            <Input
              className="rounded-md px-4 py-2 bg-inherit border mb-6"
              name="email"
              placeholder="you@example.com"
              required
            />
            <Label className="text-md" htmlFor="password">
              Password
            </Label>
            <Input
              className="rounded-md px-4 py-2 bg-inherit border mb-6"
              type="password"
              name="password"
              placeholder="••••••••"
              required
            />
            <SubmitButton
              formAction={signUp}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
              pendingText="Signing Up..."
            >
              Sign Me Up
            </SubmitButton>
            <p className="text-center mt-4 text-primary/80 text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline underline-offset-4">
                Login
              </Link>
            </p>
            {searchParams?.message && (
              <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                {searchParams.message}
              </p>
            )}
          </form>
        </div>
      </section>
    );
  }
}
