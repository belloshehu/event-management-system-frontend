import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomQueryClientProviders from "./providers/query-client.provider";
import { Toaster } from "@/components/ui/sonner";
import { jura } from "./fonts";

export const metadata: Metadata = {
  title: "Eventman",
  description: "A platform for renting event centers and hiring entertainers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${jura.className} font-medium text-lg`}>
        <CustomQueryClientProviders>
          <Header />
          {children}
        </CustomQueryClientProviders>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
