import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Rouchotas Studios | Argostoli, Kefalonia - Holidays 2026",
    template: "%s | Rouchotas Studios Kefalonia",
  },
  description:
    "Rouchotas Studios - Fully equipped apartment studios in the centre of Argostoli, Kefalonia. Ideal accommodation for holidays 2026 in Greece. Sea views, free parking, and walking distance to beaches, restaurants & port.",
  keywords: [
    "holidays 2026",
    "greece",
    "kefalonia hotels",
    "argostoli studios",
    "apartment studios",
    "kefalonia accommodation",
    "kefalonia apartments",
    "argostoli accommodation",
    "kefalonia greece holidays",
    "ionian islands accommodation",
    "rouchotas studios",
    "self catering kefalonia",
    "studios argostoli kefalonia",
  ],
  authors: [{ name: "Rouchotas Studios" }],
  openGraph: {
    title: "Rouchotas Studios | Argostoli, Kefalonia - Holidays 2026",
    description:
      "Fully equipped apartment studios in the centre of Argostoli, Kefalonia. Sea views, free parking, and walking distance to everything. Book your Greek island holiday 2026.",
    url: "https://rouchotas-studios.vercel.app",
    siteName: "Rouchotas Studios",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rouchotas Studios | Kefalonia, Greece",
    description:
      "Apartment studios in the heart of Argostoli, Kefalonia. Perfect for holidays 2026 in Greece.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://rouchotas-studios.vercel.app",
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LodgingBusiness",
              name: "Rouchotas Studios",
              description:
                "Fully equipped apartment studios in the centre of Argostoli, Kefalonia, Greece. Family-run since the late 1990s, renovated 2026.",
              url: "https://rouchotas-studios.vercel.app",
              telephone: "+306931833057",
              email: "xarafragkia@gmail.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Ioannou Metaxa 54",
                addressLocality: "Argostoli",
                addressRegion: "Kefalonia",
                postalCode: "28100",
                addressCountry: "GR",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 38.1747,
                longitude: 20.4895,
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "8.9",
                bestRating: "10",
                ratingCount: "150",
                itemReviewed: {
                  "@type": "LodgingBusiness",
                  name: "Rouchotas Studios",
                },
              },
              amenityFeature: [
                { "@type": "LocationFeatureSpecification", name: "Free Wi-Fi" },
                { "@type": "LocationFeatureSpecification", name: "Air Conditioning" },
                { "@type": "LocationFeatureSpecification", name: "Free Parking" },
                { "@type": "LocationFeatureSpecification", name: "Kitchen" },
                { "@type": "LocationFeatureSpecification", name: "Private Balcony" },
                { "@type": "LocationFeatureSpecification", name: "Sea View" },
              ],
              starRating: {
                "@type": "Rating",
                ratingValue: "3",
              },
              numberOfRooms: 7,
              checkinTime: "14:00",
              checkoutTime: "11:00",
            }),
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
