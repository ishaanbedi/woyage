"use client";
import { StopwatchIcon } from "@radix-ui/react-icons";
import {
  LanguagesIcon,
  MonitorSmartphoneIcon,
  PinIcon,
  TrafficCone,
  UsersRound,
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

export function Features({ home }: { home: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.8,
  });

  const features: {
    title: string;
    description: string;
    icon: React.ReactNode;
  }[] = [
    {
      title: "Visitors",
      description:
        "Track and analyze of your visitors and their behavior, in real-time.",
      icon: <UsersRound className="w-12 h-12" />,
    },
    {
      title: "Location",
      description:
        "See where your visitors are coming from, from all around the world.",
      icon: <PinIcon className="w-12 h-12" />,
    },
    {
      title: "Languages",
      description:
        "Analyze the languages your visitors speak, to tailor your content.",
      icon: <LanguagesIcon className="w-12 h-12" />,
    },
    {
      title: "Real-Time Data",
      description: "See what's happening in real-time, as it happens.",
      icon: <StopwatchIcon className="w-12 h-12" />,
    },
    {
      title: "Traffic Sources",
      description:
        "Analyze referral, direct, and search traffic sources to your website.",
      icon: <TrafficCone className="w-12 h-12" />,
    },
    {
      title: "Device Analytics",
      description:
        "Analyze visitor's devices, browsers, and operating systems.",
      icon: <MonitorSmartphoneIcon className="w-12 h-12" />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="w-full py-6" id="features" ref={ref}>
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-2 text-center"
        >
          <div className="space-y-2 flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center">
              {process.env.NEXT_PUBLIC_SITE_NAME} is packed with features
            </h1>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400 text-center">
              An overview of all the core features{" "}
              {process.env.NEXT_PUBLIC_SITE_NAME} provides.
            </p>
          </div>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mx-auto grid max-w-3xl items-start min-[600px]:grid-cols-3 pt-12 md:max-w-5xl lg:grid-cols-3 grid-cols-2 gap-2 lg:max-w-6xl"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="flex flex-col items-center lg:md:sm:justify-center justify-normal space-y-2 p-3 min-h-52 shadow-none hover:border hover:shadow">
                <div className="flex justify-center items-center flex-col">
                  <div className="flex items-center justify-center w-16 h-16 p-4 text-white bg-primary rounded-full">
                    {feature.icon}
                  </div>
                  <h2 className="lg:md:sm:text-xl font-bold text-center">
                    {feature.title}
                  </h2>
                </div>
                <p className="text-primary/50 lg:md:sm:text-[1rem] text-sm text-center">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        {home && (
          <Link href="/features" className="flex justify-center items-center">
            <Button className="mt-4">View all features &rarr;</Button>
          </Link>
        )}
      </div>
    </section>
  );
}
