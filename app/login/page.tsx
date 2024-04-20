import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ForgotPassword from "@/components/ForgotPassword";

export default async function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      const message = error.message;
      return redirect(`/login?message=${encodeURIComponent(message)}`);
    }

    return redirect("/dashboard");
  };
  if (user) {
    return redirect("/dashboard");
  } else {
    console.log(user);
    return (
      <section className="h-[92vh] bg-secondary">
        <Navbar user={user} />
        <div className="flex flex-col justify-center items-center pt-24 px-2">
          <Card className="max-w-lg w-full">
            <CardHeader className="text-center">
              <h2 className="text-2xl font-bold">Sign In</h2>
              <p className="text-gray-500">
                Welcome back! Sign in to continue.
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
                  <div className="flex justify-end">
                    <ForgotPassword />
                  </div>
                  <SubmitButton
                    formAction={signIn}
                    className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                    pendingText="Logging you in..."
                  >
                    Sign In
                  </SubmitButton>
                </div>
                <div className="text-center text-sm">
                  Don't have an account?{" "}
                  <Link className="underline" href="/signup">
                    Sign up
                  </Link>
                </div>
                {searchParams?.message && (
                  <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                    {searchParams.message}
                  </p>
                )}
              </CardContent>
            </form>
          </Card>
        </div>
      </section>
    );
  }
}
