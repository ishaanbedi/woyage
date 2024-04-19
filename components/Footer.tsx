import Link from "next/link";
const Footer = () => {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {process.env.NEXT_PUBLIC_SITE_NAME} | &copy; {new Date().getFullYear()}{" "}
        <Link
          href="https://www.ishaanbedi.com"
          target="_blank"
          className="underline underline-offset-4"
        >
          Ishaan Bedi
        </Link>
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link className="text-xs hover:underline underline-offset-4" href="/">
          Terms of Service
        </Link>
        <Link className="text-xs hover:underline underline-offset-4" href="/">
          Privacy
        </Link>
        <Link
          className="text-xs hover:underline underline-offset-4"
          href="https://www.twitter.com/ishnbedi"
          target="_blank"
        >
          Twitter
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
