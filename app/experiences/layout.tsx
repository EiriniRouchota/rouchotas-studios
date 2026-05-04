import type { Metadata } from "next";
import { siteName } from "../site-config";

export const metadata: Metadata = {
  title: "Kefalonia Experiences - Beaches, Nature, Cuisine & Nightlife",
  description:
    "Discover the best of Kefalonia from Rouchotas Studios. Myrtos Beach, Caretta Caretta turtles, local cuisine, boat trips, scuba diving, Mount Ainos, and summer nightlife in Argostoli.",
  keywords: [
    "kefalonia beaches",
    "myrtos beach",
    "argostoli things to do",
    "kefalonia activities",
    "caretta caretta turtles",
    "kefalonia boat trips",
    "kefalonia nightlife",
    "holidays 2026 greece",
    "kefalonia scuba diving",
  ],
  alternates: {
    canonical: "/experiences",
  },
  openGraph: {
    title: `Kefalonia Experiences | ${siteName}`,
    description:
      "Beaches, nature, cuisine, boat trips, diving and nightlife -- everything Kefalonia has to offer, all within reach from Rouchotas Studios.",
    url: "/experiences",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Kefalonia Experiences | ${siteName}`,
    description:
      "Best things to do in Kefalonia: beaches, food, nature, cruises and nightlife around Argostoli.",
  },
};

export default function ExperiencesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
