"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { type User } from "@supabase/supabase-js";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { motion } from "motion/react";

const Stack = ({ user }: { user: User | null }) => {
  const stack = [
    {
      name: "Supabase",
      logo: "/icons/supabase.svg",
      url: "https://supabase.io/",
      description: "The entire backend from auth to database is on Supabase.",
    },
    {
      name: "Next.js",
      logo: "/icons/nextjs.svg",
      url: "https://nextjs.org/",
      description: "The fantastic React framework for building web apps.",
    },
    {
      name: "shadcn/ui",
      logo: "/icons/shadcnui.svg",
      url: "https://ui.shadcn.com",
      description: "Built with amazing components from shadcn/ui.",
    },
    {
      name: "Vercel",
      logo: "/icons/vercel.svg",
      url: "https://vercel.com/",
      description: "The platform that hosts this project.",
    },
    {
      name: "Tremor",
      logo: "/icons/tremor.jpeg",
      url: "https://tremor.so/",
      description: "React components powering charts and dashboard.",
    },
    {
      name: "Resend",
      logo: "/icons/resend.svg",
      url: "https://resend.com/",
      description: "For sending authentication-related emails.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ 
        once: true, 
        amount: 0.4,
        margin: "-100px"
      }}
      variants={containerVariants}
      className="w-full py-12"
    >
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {process.env.NEXT_PUBLIC_SITE_NAME} is open-sourced, and free to
            use.
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            {process.env.NEXT_PUBLIC_SITE_NAME} is powered by the following
            technologies, that makes it super fast, efficient and reliable.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="grid gap-4 mt-8 lg:md:sm:grid-cols-3 grid-cols-2">
            {stack.map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Link
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-4 space-y-2 transition-transform transform rounded-lg shadow-md hover:scale-[1.025]"
                >
                  <img src={item.logo} alt={item.name} className="w-12 h-12" />
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex justify-center space-x-4 mt-8">
          {user ? (
            <Link href="/dashboard">
              <Button>Go to Dashboard</Button>
            </Link>
          ) : (
            <Link href="/signup">
              <Button>Get Started Now</Button>
            </Link>
          )}
          <Link
            href="https://www.github.com/ishaanbedi/woyage"
            target="_blank"
          >
            <Button variant="outline">
              <GitHubLogoIcon className="mr-2 h-4 w-4" /> Source Code
            </Button>
          </Link>
        </div>
        <Link
          href="https://www.github.com/ishaanbedi/woyage"
          target="_blank"
          className="pt-4"
        >
          <Button variant="ghost" className="underline underline-offset-4">
            You can also self-host this project &#8599;
          </Button>
        </Link>
      </div>
    </motion.section>
  );
};

export default Stack;
