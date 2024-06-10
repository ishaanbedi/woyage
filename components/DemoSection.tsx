import { Card } from "./ui/card";

const DemoSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col justify-center items-center">
          <div className="space-y-4">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                See {process.env.NEXT_PUBLIC_SITE_NAME} in action.
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Have a look at this quick 1-minute demo video to see how{" "}
                {process.env.NEXT_PUBLIC_SITE_NAME} works.
              </p>
            </div>
            <Card className="p-4">
              <div className="relative" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://player.vimeo.com/video/937103792?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
