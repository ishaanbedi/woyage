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
      title: "The Tracking Code",
      description: "Place the tracking code in the <head> of your website.",
    },
    {
      icon: PartyPopper,
      title: "Start Tracking",
      description: "That's it! You can now start tracking your website.",
    },
  ];
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid items-center justify-center px-4 text-center md:px-6 lg:gap-6">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl pb-8">
            Get Started in {steps.length} Simple Steps
          </h2>
        </div>
        <div>
          <div className="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-primary">
            <ol className="relative z-10 flex justify-between text-sm font-medium text-primary">
              <li className="flex items-center gap-2 bg-white p-2">
                <span className="size-6 rounded-full bg-primary text-center text-[10px]/6 font-bold text-white">
                  {" "}
                  1{" "}
                </span>

                <span className="hidden sm:block">Step #1</span>
              </li>

              <li className="flex items-center gap-2 bg-white p-2">
                <span className="size-6 rounded-full bg-primary text-center text-[10px]/6 font-bold text-white">
                  2
                </span>

                <span className="hidden sm:block">Step #2</span>
              </li>

              <li className="flex items-center gap-2 bg-white p-2">
                <span className="size-6 rounded-full bg-primary text-center text-[10px]/6 font-bold text-white">
                  {" "}
                  3{" "}
                </span>

                <span className="hidden sm:block">Step #3</span>
              </li>
            </ol>
          </div>
        </div>
        <div className="grid w-full max-w-4xl gap-6 sm:grid-cols-3 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div className="flex flex-col items-center gap-4" key={index}>
              <Card className="py-2 min-h-44">
                <CardContent className="space-y-2 flex flex-col h-full justify-center">
                  <step.icon className="w-8 h-8" />
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        <div className="flex justify-center pt-8">
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
