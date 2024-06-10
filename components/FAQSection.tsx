import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const appName = process.env.NEXT_PUBLIC_SITE_NAME;
  const FAQs: { question: string; answer: string }[] = [
    {
      question: `Will ${appName} collect any personal data from my visitors?`,
      answer: `While ${appName} does collect information such as user's browser, device, operating system, and country, we do not collect any personal data such as name, email, or IP address or any kind of information that can be used to identify an individual. So ${appName} is privacy-friendly and completely safe to use.`,
    },
    {
      question: `What kind of data does ${appName} collect?`,
      answer:
        "We have a lightweight script that runs on the visitor's browser and collects information, namely, country, user agent, path, language, referrer, title, and domain. Some information is parsed from the user agent string, on the server-side, to provide more insights. No kind of personal data is collected.",
    },
    {
      question: "Do you store any cookies on my visitor's computer?",
      answer:
        "No, we do not store any cookies on your visitor's computer. Authentication related cookies (that too via Supabase) are stored on your (the website owner's) computer to keep you logged in when you use this site. If you have never created an account, then no cookies are stored on your computer, and the tracking script does not store any cookies on your visitor's computer.",
    },
    {
      question:
        "I have some issue reports and feature requests. Where can I submit them?",
      answer:
        "You can submit your issue reports and feature requests on our GitHub repository. If the issue is related to some serious bug or security vulnerability, please reach out to me at hey@ishaanbedi.com.",
    },
    {
      question: `Is ${appName} free to use?`,
      answer: `Currently, all features of ${appName} is offered for free as we're in the early stages of development. However, in future, there may be pricing plans tailored to different user needs..`,
    },
    {
      question: `Does ${appName} support tracking custom events?`,
      answer: `At this stage, ${appName} does not support tracking custom events. However, it will, for sure, soon.`,
    },
  ];
  return (
    <section
      id="faq"
      className="w-full pb-12 md:pb-24 lg:pb-24 mx-auto lg:md:sm:px-0 px-3"
    >
      <h1 className="text-3xl font-bold text-center text-gray-900 md:text-4xl lg:text-5xl">
        Frequently Asked Questions
      </h1>
      <div className="max-w-3xl mx-auto mt-8">
        <Accordion type="single" collapsible className="w-full">
          {FAQs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>
                <p className="text-lg font-semibold text-gray-800 text-left">
                  {faq.question}
                </p>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-[1rem]">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
