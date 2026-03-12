import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rouchotas Studios | Kefalonia, Greece",
  description:
    "Welcome to Rouchotas Studios in Kefalonia, Greece. Enjoy comfortable self-catering accommodation surrounded by the beauty of the Ionian Islands.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
