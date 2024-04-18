"use client";
import { Card, CardContent } from "./ui/card";
import { FileCode2, PartyPopper } from "lucide-react";
import { type User } from "@supabase/supabase-js";
import Link from "next/link";
import { Button } from "./ui/button";
import { GitHubLogoIcon, PlusCircledIcon } from "@radix-ui/react-icons";
const Steps = ({ user }: { user: User | null }) => {
  const steps: { icon: any; title: string; description: string }[] = [
    {
      icon: PlusCircledIcon,
      title: "Add your first site",
      description: "In dashboard, click on 'Add Site' and add the domain name.",
    },
    {
      icon: FileCode2,
      title: "Place the Tracking Code",
      description:
        "Copy the tracking code and paste it in the <head> of your website.",
    },
    {
      icon: PartyPopper,
      title: "Start Tracking",
      description: "That's it! You can now start tracking your website.",
    },
  ];
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid items-center justify-center gap-8 px-4 text-center md:px-6 lg:gap-12">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            How it Works
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Get started in just a few simple steps.
          </p>
        </div>
        <div className="grid w-full max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div className="flex flex-col items-center gap-4" key={index}>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-2xl font-bold text-gray-50 dark:bg-gray-50 dark:text-gray-900">
                {index + 1}
              </div>
              <Card className="py-2 min-h-44">
                <CardContent className="space-y-2 flex flex-col h-full justify-center">
                  <step.icon className="w-8 h-8 text-gray-900 dark:text-gray-50" />
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          {user ? (
            <Link href="/dashboard">
              <Button>Go to Dashboard &rarr;</Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button>Get Started, it's Free &rarr;</Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Steps;
