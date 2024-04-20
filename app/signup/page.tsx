import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";

export default async function SignUp() {
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
      toast.error(message);
    }
    toast.success("Check your email for the confirmation link");
  };

  if (user) {
    return redirect("/dashboard");
  } else {
    return (
      <section className="h-[92vh] bg-secondary">
        <Navbar user={user} />
        <div className="flex flex-col justify-center items-center pt-24 px-2">
          <Card className="max-w-lg w-full">
            <CardHeader className="text-center">
              <h2 className="text-2xl font-bold">Sign Up</h2>
              <p className="text-gray-500">
                Create your account, it's free and only takes a minute.
              </p>
            </CardHeader>
            <form className="animate-in flex-1 flex flex-col w-full justify-center text-foreground">
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      className="rounded-md px-4 py-2 bg-inherit border mb-6"
                      name="email"
                      placeholder="you@example.com"
                      required
                      type="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      className="rounded-md px-4 py-2 bg-inherit border mb-6"
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <SubmitButton
                    formAction={signUp}
                    className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                    pendingText="Signing Up..."
                  >
                    Sign Me Up
                  </SubmitButton>
                </div>
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link className="underline" href="/login">
                    Login
                  </Link>
                </div>
              </CardContent>
            </form>
          </Card>
        </div>
      </section>
    );
  }
}
