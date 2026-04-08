import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Axon Neuro — Neuro-Rehabilitation Reablement",
  description:
    "Person-centred reablement support across England — helping individuals rebuild independence after brain injury and neurological conditions.",
  keywords: [
    "neuro rehabilitation",
    "reablement",
    "brain injury support",
    "neurological conditions",
    "independence",
    "England",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
