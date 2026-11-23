import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PSM Resort — Field notes from an alpine valley",
  description:
    "A fictional alpine retreat. Fourteen rooms, one long table, and a landscape that sets the pace. An original concept site with no published contact details.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
