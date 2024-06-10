import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { Comfortaa } from "next/font/google";
import "./styles.css";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/Footer";
import Head from "next/head";
export const metadata: Metadata = {
  metadataBase: new URL("https://woyage.io"),
  title: {
    default: "Woyage",
    template: "Woyage | %s",
  },
  description:
    "An open-sourced & privacy-focused analytics platform for your website.",
  openGraph: {
    title: "Woyage",
    description:
      "An open-sourced & privacy-focused analytics platform for your website.",
    url: "https://woyage.io",
    siteName: "Woyage",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.woyage.app/og.png",
      },
    ],
  },
  twitter: {
    title: "Woyage",
    card: "summary_large_image",
  },
};

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
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
