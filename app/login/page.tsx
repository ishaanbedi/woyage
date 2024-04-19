import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import { ArrowLeft } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

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
    return (
      <section className="flex h-screen items-center justify-center bg-background">
        <div className="w-full max-w-md">
          <BackButton />
          <h1 className="text-3xl font-bold text-center mb-4">Sign In</h1>
          <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 pt-6 pb-9">
              <h3 className="whitespace-nowrap font-semibold leading-none tracking-tight text-2xl __className_335c89 mb-2">Supalytics</h3>
              <p className="text-sm text-muted-foreground">Welcome Back! Enter your login details</p>
            </div>
            <form className="animate-in flex-1 flex flex-col w-full justify-center text-foreground">
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
                className="rounded-md px-4 py-2 bg-inherit border"
                type="password"
                name="password"
                placeholder="••••••••"
                required
              />
              <div className="text-sm text-muted-foreground flex justify-end mt-2 mb-7">
                <Link href="/forgotpassword" className="text-center">Forgot Password?</Link>
              </div>
              <SubmitButton
                formAction={signIn}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                pendingText="Signing In..."
              >
                Sign In
              </SubmitButton>
              <p className="text-center mt-4 text-primary/80 text-sm">
                Don't have an account?{" "}
                <Link href="/signup" className="underline underline-offset-4">
                  Sign Up
                </Link>
              </p>
              {searchParams?.message && (
                <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                  {searchParams.message}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    );
  }
}

const BackButton = () => (
  <Link href="/" className="absolute top-8 left-8 flex items-center gap-2">
    <ArrowLeftIcon className="w-5 h-5" />
    <Label>Home</Label>
  </Link>
);