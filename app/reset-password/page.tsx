import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ResetPasswordForm from "@/components/ResetPasswordForm";
export default async function Login() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <section className="min-h-[92dvh] bg-secondary">
      <Navbar user={user} />
      <div className="flex flex-col justify-center items-center pt-24 px-2">
        <Card className="max-w-lg w-full">
          <CardHeader className="text-center">
            <h2 className="text-2xl font-bold">Reset Password</h2>
          </CardHeader>
          <div className="animate-in flex-1 flex flex-col w-full justify-center text-foreground">
            <CardContent className="space-y-6">
              <ResetPasswordForm />
            </CardContent>
          </div>
        </Card>
      </div>
    </section>
  );
}
