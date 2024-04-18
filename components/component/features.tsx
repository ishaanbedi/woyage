import { StopwatchIcon } from "@radix-ui/react-icons"
import { BarChart, BarChart2, Eye, FilterIcon, FlagIcon, HopIcon, LanguagesIcon, LocateFixedIcon, LocateIcon, MoveIcon, PersonStandingIcon, PinIcon, TrafficCone, TrendingUp, UsersRound, View } from "lucide-react"
export function Features() {
  return (
    <section className="w-full py-6">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Platform Features</h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
            An overview of all the core features Supalytics provides.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-3xl items-start gap-6 min-[600px]:grid-cols-3 py-12 md:gap-10 md:max-w-5xl lg:grid-cols-3 lg:gap-8 lg:max-w-6xl">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-lg border border-gray-900 dark:border-gray-800">
              <UsersRound className="w-12 h-12" />
            </div>
            <h3 className="font-bold">Visitor Info</h3>
            <p className="flex justify-center text-center items-center text-sm text-gray-500 dark:text-gray-400">
            Get detailed information about your visitors like their device, browser, OS and location.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-lg border border-gray-900 dark:border-gray-800">
              <Eye className="w-12 h-12" />
            </div>
            <h3 className="font-bold">Page views</h3>
            <p className="flex justify-center items-center text-center text-sm text-gray-500 dark:text-gray-400">
            Knowing which of your pages gets the most traffic is essential to improving your website content.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-lg border border-gray-900 dark:border-gray-800">
              <TrafficCone className="w-12 h-12" />
            </div>
            <h3 className="font-bold">Traffic sources</h3>
            <p className=" flex justify-center items-center text-center text-sm text-gray-500 dark:text-gray-400">
            See where your traffic is coming from to better understand where you should be spending your effort.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-lg border border-gray-900 dark:border-gray-800">
              <FilterIcon className="w-12 h-12" />
            </div>
            <h3 className="font-bold">Filtering</h3>
            <p className="flex justify-center items-center text-center text-sm text-gray-500 dark:text-gray-400">
            Gain further insight into your data by applying filters like country, browser, and URL.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-lg border border-gray-900 dark:border-gray-800">
              <PinIcon className="w-12 h-12" />
            </div>
            <h3 className="font-bold">Location</h3>
            <p className="flex justify-center items-center text-center text-sm text-gray-500 dark:text-gray-400">
            Find out where your visitors are coming from including the city, region and country.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-lg border border-gray-900 dark:border-gray-800">
              <LanguagesIcon className="w-12 h-12" />
            </div>
            <h3 className="font-bold">Languages</h3>
            <p className="felx justify-center items-center text-center text-sm text-gray-500 dark:text-gray-400">
            Know which languages are the most popular among your visitors to help you tailor your content.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-lg border border-gray-900dark:border-gray-800">
              <StopwatchIcon className="w-12 h-12" />
            </div>
            <h3 className="font-bold">Realtime Data</h3>
            <p className="flex justify-center items-center text-center text-sm text-gray-500 dark:text-gray-400">
            Data available in seconds, not days. The data that Supalytics collects is immediately available on your dashboard
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-lg border border-gray-900dark:border-gray-800">
              <BarChart2 className="w-12 h-12" />
            </div>
            <h3 className="font-bold">Reports</h3>
            <p className="flex justify-center items-center text-center text-sm text-gray-500 dark:text-gray-400">
            Supalytics comes with out of the box reporting that enables you to gain insights from all your website data.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-lg border border-gray-900 dark:border-gray-800">
              <TrendingUp className="w-12 h-12" />
            </div>
            <h3 className="font-bold">Bounce rate</h3>
            <p className="flex justify-center items-center text-center text-sm text-gray-500 dark:text-gray-400">
            See which pages keep your visitors engaged versus those they are abandoning.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
};
