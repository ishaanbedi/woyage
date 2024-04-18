import { CookieIcon, RocketIcon, StopwatchIcon } from "@radix-ui/react-icons";
import {
  GitBranch,
  GlobeLock,
  HeartHandshake,
  LanguagesIcon,
  MonitorSmartphoneIcon,
  PinIcon,
  TrafficCone,
  UsersRound,
} from "lucide-react";
import { Card } from "./ui/card";
export function PrivacyFeatures() {
  const features: {
    title: string;
    description: string;
    icon: React.ReactNode;
  }[] = [
    {
      title: "No Cookies",
      description:
        "We don't store any cookies on your visitors' devices, ensuring their privacy.",
      icon: <CookieIcon className="w-12 h-12" />,
    },
    {
      title: "Privacy First",
      description:
        "No personal data is collected from your visitors which could be used to identify them.",
      icon: <GlobeLock className="w-12 h-12" />,
    },
    {
      title: "Performance",
      description:
        "Our technology ensures that our analytics won't slow down your website.",
      icon: <RocketIcon className="w-12 h-12" />,
    },
  ];
  return (
    <section className="w-full">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <div className="space-y-2 flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center">
              {process.env.NEXT_PUBLIC_SITE_NAME}{" "}
              <HeartHandshake className="w-12 h-12 inline-block" /> Privacy
            </h1>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400 text-center">
              When you use Supalytics, you can trust that your data is safe, and
              information about your visitors is kept private.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-3xl items-start min-[600px]:grid-cols-3 py-12 md:max-w-5xl lg:grid-cols-3 grid-cols-2 gap-2 lg:max-w-6xl">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="flex flex-col items-center lg:md:sm:justify-center justify-normal space-y-2 p-3 min-h-52 shadow-none hover:border hover:shadow"
            >
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
          ))}
        </div>
      </div>
    </section>
  );
}
