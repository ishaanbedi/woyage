import { Bricolage_Grotesque } from "next/font/google";
import { Comfortaa } from "next/font/google";
import "./styles.css";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/Footer";
import Head from "next/head";
const bricolage_grotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage_grotesque",
});
const comfortaa = Comfortaa({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-comfortaa",
});
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: process.env.NEXT_PUBLIC_SITE_NAME,
  description: `${process.env.NEXT_PUBLIC_SITE_NAME} is a free and open-source platform for tracking analytics on your website.`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body className={bricolage_grotesque.variable + comfortaa.variable}>
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
