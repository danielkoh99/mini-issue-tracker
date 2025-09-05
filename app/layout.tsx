import "./globals.css";
import type { Metadata } from "next";
import QueryProvider from "./providers/queryProvider";

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
      <body className="max-w-full h-screen p-5">
        <h1>Mini Issue Tracker</h1>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
