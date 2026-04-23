import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cosmara | Journey Through Our Cosmic Neighborhood",
  description: "A premium educational space experience exploring the Solar System and beyond. Immerse yourself in the wonders of the universe.",
  keywords: ["space", "astronomy", "solar system", "planets", "3D", "education", "cosmos"],
  openGraph: {
    title: "Cosmara | Cosmic Journey",
    description: "Explore the stars in 3D.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-cyan-500/30">
        {children}
      </body>
    </html>
  );
}
