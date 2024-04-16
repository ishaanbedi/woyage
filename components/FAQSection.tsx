import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const FAQs: { question: string; answer: string }[] = [
    {
      question: "Question 1",
      answer: "Yes. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      question: "Question 2",
      answer: "No. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      question: "Question 3",
      answer: "Yes. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      question: "Question 4",
      answer: "No. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      question: "Question 5",
      answer: "Yes. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      question: "Question 6",
      answer: "No. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ];
  return (
    <section className="w-full pb-12 md:pb-24 lg:pb-24 mx-auto lg:md:sm:px-0 px-3">
      <h1 className="text-3xl font-bold text-center text-gray-900 md:text-4xl lg:text-5xl">
        Frequently Asked Questions
      </h1>
      <div className="max-w-2xl mx-auto mt-8">
        <Accordion type="single" collapsible className="w-full">
          {FAQs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
