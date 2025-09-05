import "./globals.css";
import type { Metadata } from "next";
import QueryProvider from "./providers/queryProvider";
import { Header } from "@/components/ui/Header";

export const metadata: Metadata = {
  title: "Mini Issue Tracker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen flex flex-col">
        <Header />
        <QueryProvider>
          <main className="flex-1 overflow-auto">{children}</main>
        </QueryProvider>
      </body>
    </html>
  );
}
