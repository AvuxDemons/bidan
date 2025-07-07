import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import ThemeProvider from "@/components/providers/ThemeProvider";
import SessionProviders from "@/components/providers/SessionProvider";
import HeroUIProviders from "@/components/providers/HeroUIProvider";
import ToastProvider from "@/components/providers/ToastProvider";

// import EngagespotContextProvider from "@/components/providers/EngagespotProvider";

import "./globals.css";

import { metadataConfig } from "./config";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "600", "800", "900"],
});

export const metadata = {
  metadataBase: new URL(metadataConfig.website),
  canonical: metadataConfig.website,
  title: metadataConfig.name,
  description: metadataConfig.description,
  language: "id",
  generator: "Next.js",
  applicationName: metadataConfig.name,
  referrer: "origin-when-cross-origin",
  keywords: metadataConfig.keywords,
  authors: metadataConfig.authors,
  publisher: metadataConfig.publisher,
  icons: {
    icon: metadataConfig.icons,
    shortcut: metadataConfig.icons,
    apple: metadataConfig.icons,
  },
  openGraph: {
    title: metadataConfig.name,
    description: metadataConfig.description,
    url: metadataConfig.website,
    siteName: metadataConfig.name,
    images: metadataConfig.icons,
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    cardType: "summary_large_image",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} antialiased`}>
        <SessionProviders>
          <HeroUIProviders>
            <ThemeProvider>
              <ToastProvider />
              {/* <EngagespotContextProvider>
              <DataProvider> */}
              {children}
              {/*   </DataProvider>
              </EngagespotContextProvider> */}
            </ThemeProvider>
          </HeroUIProviders>
        </SessionProviders>
      </body>
    </html>
  );
}
