import type { Metadata } from "next";
import { siteName } from "../site-config";

export const metadata: Metadata = {
  title: "Accommodation - Studios in Argostoli, Kefalonia",
  description:
    "Browse our 7 fully equipped apartment studios in the centre of Argostoli, Kefalonia. Each with private balcony, air conditioning, kitchen, free Wi-Fi. Ideal kefalonia accommodation for holidays 2026.",
  keywords: [
    "argostoli studios",
    "kefalonia accommodation",
    "apartment studios kefalonia",
    "kefalonia hotels",
    "self catering argostoli",
    "holidays 2026 greece",
    "studios with sea view kefalonia",
    "accomodation kefalonia",
  ],
  alternates: {
    canonical: "/accommodation",
  },
  openGraph: {
    title: `Accommodation | ${siteName} - Argostoli, Kefalonia`,
    description:
      "7 fully equipped apartment studios in central Argostoli with sea views, balconies, and free parking. Book for holidays 2026.",
    url: "/accommodation",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Accommodation | ${siteName}`,
    description:
      "7 fully equipped studios in Argostoli with kitchen, balcony, Wi-Fi, and sea or garden views.",
  },
};

export default function AccommodationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
