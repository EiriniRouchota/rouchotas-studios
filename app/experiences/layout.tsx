import type { Metadata } from "next";

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
  openGraph: {
    title: "Kefalonia Experiences | Rouchotas Studios",
    description:
      "Beaches, nature, cuisine, boat trips, diving and nightlife -- everything Kefalonia has to offer, all within reach from Rouchotas Studios.",
  },
};

export default function ExperiencesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
