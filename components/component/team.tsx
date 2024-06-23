import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

const teamMembers = [
  {
    name: "Ishaan Bedi",
    role: "Founder",
    description: "Jane is our product manager, responsible for defining and executing our product strategy.",
    imageUrl: "/placeholder-user.jpg",
    fallback: "JD",
    twitterUrl: "#",
    linkedinUrl: "#"
  },
  {
    name: "Aaditya Goel",
    role: "Co-Founder",
    description: "John is our lead software engineer, responsible for building and maintaining our core product.",
    imageUrl: "/placeholder-user.jpg",
    fallback: "JS",
    twitterUrl: "#",
    linkedinUrl: "#"
  },
  {
    name: "Eashan Bhatia",
    role: "Co-Founder",
    description: "Sarah is our talented designer, responsible for creating the beautiful user experience of our product.",
    imageUrl: "/placeholder-user.jpg",
    fallback: "SL",
    twitterUrl: "#",
    linkedinUrl: "#"
  },
  {
    name: "Michael Johnson",
    role: "Marketing Manager",
    description: "Michael is our marketing manager, responsible for driving awareness and growth for our product.",
    imageUrl: "/placeholder-user.jpg",
    fallback: "MJ",
    twitterUrl: "#",
    linkedinUrl: "#"
  },
  {
    name: "Emily Chen",
    role: "Customer Success",
    description: "Emily is our customer success manager, responsible for ensuring our clients are delighted with our product.",
    imageUrl: "/placeholder-user.jpg",
    fallback: "EC",
    twitterUrl: "#",
    linkedinUrl: "#"
  },
  {
    name: "David Lee",
    role: "Sales Manager",
    description: "David is our sales manager, responsible for driving new business and expanding our customer base.",
    imageUrl: "/placeholder-user.jpg",
    fallback: "DL",
    twitterUrl: "#",
    linkedinUrl: "#"
  },
];

export function Team() {
  return (
    <div>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Meet Our Team</h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We are a talented and passionate group of individuals dedicated to delivering exceptional results for
                our clients.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container grid grid-cols-1 gap-6 px-4 md:grid-cols-2 md:px-6 lg:grid-cols-3 xl:grid-cols-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-card p-6 rounded-lg shadow-sm">
              <div className="flex flex-col items-center justify-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={member.imageUrl} />
                  <AvatarFallback>{member.fallback}</AvatarFallback>
                </Avatar>
                <div className="space-y-1 text-center">
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                  <div className="flex justify-center gap-2 mt-2">
                    <Link href={member.twitterUrl} target="_blank" prefetch={false}>
                      <TwitterIcon className="w-5 h-5" />
                    </Link>
                    <Link href={member.linkedinUrl} target="_blank" prefetch={false}>
                      <LinkedinIcon className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

interface IconProps extends React.SVGProps<SVGSVGElement> {}

function LinkedinIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}
