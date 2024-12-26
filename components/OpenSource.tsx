"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { GitHubLogoIcon, HeartIcon } from "@radix-ui/react-icons";
import { Heart } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

export function OpenSourced() {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true,
    amount: 0.6,
    margin: "-50px"
  });

  return (
    <section className="w-full lg:md:sm:min-h-[60vh] min-h-[35vh] flex flex-col justify-center items-center" ref={ref}>
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-2 text-center"
        >
          <div className="space-y-2 flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center">
              {process.env.NEXT_PUBLIC_SITE_NAME} is Open Sourced
            </h1>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400 text-center">
              {process.env.NEXT_PUBLIC_SITE_NAME} is an open source project. You
              can contribute to the project by submitting issues, feature
              requests, or pull requests on GitHub.
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex space-x-2 justify-center items-center mt-6"
        >
          <Button>
            <Link
              href="https://www.github.com/ishaanbedi/woyage"
              target="_blank"
              className="flex items-center space-x-2"
            >
              <GitHubLogoIcon className="w-5 h-5 mr-1" />
              View on GitHub
            </Link>
          </Button>
          <Button variant={"outline"}>
            <Link
              href="https://github.com/sponsors/ishaanbedi"
              target="_blank"
              className="flex items-center space-x-2"
            >
              <Heart className="w-5 h-5 mr-1 text-[#DB61A2]" />
              Sponsor Project
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
