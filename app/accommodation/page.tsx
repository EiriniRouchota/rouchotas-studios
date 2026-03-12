"use client";

import React, { useState } from "react";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Lightbox from "../components/Lightbox";
import BookingModal from "../components/BookingModal";

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  "Air Conditioning": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m-7.07-2.93l.7-.7m12.73 0l.7.7M3 12h1m16 0h1m-2.93-7.07l-.7.7M6.34 6.34l-.7-.7M12 8a4 4 0 100 8 4 4 0 000-8z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16s0 3 4 3 4-3 4-3" /></svg>
  ),
  "Full Kitchen": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6h18M3 6v14a1 1 0 001 1h16a1 1 0 001-1V6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2M8 11h2m4 0h2M8 15h8" /></svg>
  ),
  "Cookware & Utensils": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2v6m0 0a3 3 0 100 6m0-6a3 3 0 110 6m0 0v8M8 8V2m8 0v6" /></svg>
  ),
  "Free Wi-Fi": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01M4.93 13.222a10 10 0 0114.14 0M1.757 10.04a14.5 14.5 0 0120.486 0" /></svg>
  ),
  "Flat-Screen TV": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
  ),
  "Private Balcony": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21h18M4 21V10m16 11V10M12 3v7m-8 0h16M8 14v3m4-3v3m4-3v3" /></svg>
  ),
  "Port View": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" strokeWidth={1.5} /></svg>
  ),
  "Garden View": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 20V10m0-6C8 4 5 7 5 10h14c0-3-3-6-7-6zm-5 10c-2 0-4 2-4 5h8m2-5c2 0 4 2 4 5h-8" /></svg>
  ),
  "Refrigerator": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 2h12a1 1 0 011 1v18a1 1 0 01-1 1H6a1 1 0 01-1-1V3a1 1 0 011-1zM5 10h14M10 6v2m0 4v4" /></svg>
  ),
  "Coffee Maker": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 8h1a3 3 0 010 6h-1M5 8h13v9a3 3 0 01-3 3H8a3 3 0 01-3-3V8zm3-4h4m-2 0v4" /></svg>
  ),
  "Private Bathroom": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 12h16M4 12v6a2 2 0 002 2h12a2 2 0 002-2v-6M6 12V5a2 2 0 012-2h1" /><circle cx="12" cy="15" r="1.5" strokeWidth={1.5} /></svg>
  ),
  "Hair Dryer": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10a4 4 0 11-8 0 4 4 0 018 0zm0 0h4l2-3m-6 3l4 8m-8-5v8" /></svg>
  ),
  "Iron": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 17h18l-3-7H9l-6 7zm6-7V7a3 3 0 013-3h2" /></svg>
  ),
  "Towels & Linens": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5h16v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm4 0V3h8v2M8 10h8M8 14h5" /></svg>
  ),
  "Spacious": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4h4M20 8V4h-4M4 16v4h4m12-4v4h-4" /></svg>
  ),
  "Renovated 2026": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  ),
};

const ROOMS = [
  {
    name: "Studio 1 – The Grand",
    description:
      "Our most spacious studio, perfect for those who value extra room to relax. Features a generous living space with a fully equipped kitchen, modern air conditioning, and a private balcony. A true home away from home in the heart of Argostoli.",
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80",
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&q=80",
    ],
    amenities: ["Spacious", "Air Conditioning", "Full Kitchen", "Cookware & Utensils", "Refrigerator", "Coffee Maker", "Free Wi-Fi", "Flat-Screen TV", "Private Balcony", "Private Bathroom", "Hair Dryer", "Iron", "Towels & Linens"],
  },
  {
    name: "Studio 2 – Garden Retreat",
    description:
      "A peaceful studio overlooking the lush garden, fully equipped with everything you need for a comfortable stay. Wake up to the sound of birdsong and enjoy your morning coffee surrounded by Mediterranean greenery.",
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80",
      "https://images.unsplash.com/photo-1598928636135-d146006ff4be?w=1200&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1200&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
    ],
    amenities: ["Garden View", "Air Conditioning", "Full Kitchen", "Cookware & Utensils", "Refrigerator", "Coffee Maker", "Free Wi-Fi", "Flat-Screen TV", "Private Balcony", "Private Bathroom", "Hair Dryer", "Iron", "Towels & Linens"],
  },
  {
    name: "Studio 3 – Port Panorama",
    description:
      "Freshly renovated in 2026, this studio offers breathtaking views of the port of Argostoli. Completely redesigned with modern furnishings, a fully equipped kitchen, and a private balcony where you can watch the boats come and go.",
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=80",
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=80",
      "https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=1200&q=80",
    ],
    amenities: ["Renovated 2026", "Port View", "Air Conditioning", "Full Kitchen", "Cookware & Utensils", "Refrigerator", "Coffee Maker", "Free Wi-Fi", "Flat-Screen TV", "Private Balcony", "Private Bathroom", "Hair Dryer", "Iron", "Towels & Linens"],
  },
  {
    name: "Studio 4 – Harbour View",
    description:
      "Enjoy uninterrupted views of the harbour from this cozy and well-appointed studio. Fully equipped with a complete kitchen, air conditioning, and all the comforts you need for an unforgettable stay in Kefalonia.",
    images: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&q=80",
      "https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=1200&q=80",
    ],
    amenities: ["Port View", "Air Conditioning", "Full Kitchen", "Cookware & Utensils", "Refrigerator", "Coffee Maker", "Free Wi-Fi", "Flat-Screen TV", "Private Balcony", "Private Bathroom", "Hair Dryer", "Iron", "Towels & Linens"],
  },
  {
    name: "Studio 5 – Sunset Suite",
    description:
      "Newly renovated in 2026 with a fresh, modern design. This studio captures the golden Kefalonian sunsets over the port of Argostoli. Complete with a full kitchen, premium bedding, and a spacious balcony for evening relaxation.",
    images: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80",
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
    ],
    amenities: ["Renovated 2026", "Port View", "Air Conditioning", "Full Kitchen", "Cookware & Utensils", "Refrigerator", "Coffee Maker", "Free Wi-Fi", "Flat-Screen TV", "Private Balcony", "Private Bathroom", "Hair Dryer", "Iron", "Towels & Linens"],
  },
  {
    name: "Studio 6 – Ionian Blue",
    description:
      "Freshly renovated in 2026 and inspired by the blues of the Ionian Sea. This studio features stunning port views, contemporary interiors, and everything you need for a comfortable and stylish stay.",
    images: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=1200&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&q=80",
    ],
    amenities: ["Renovated 2026", "Port View", "Air Conditioning", "Full Kitchen", "Cookware & Utensils", "Refrigerator", "Coffee Maker", "Free Wi-Fi", "Flat-Screen TV", "Private Balcony", "Private Bathroom", "Hair Dryer", "Iron", "Towels & Linens"],
  },
  {
    name: "Studio 7 – Captains Quarters",
    description:
      "Overlooking the bustling port of Argostoli, this studio is the perfect vantage point for watching island life unfold. Fully equipped kitchen, air conditioning, and a private balcony make this your ideal Kefalonian base.",
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80",
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=1200&q=80",
      "https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=1200&q=80",
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=80",
    ],
    amenities: ["Port View", "Air Conditioning", "Full Kitchen", "Cookware & Utensils", "Refrigerator", "Coffee Maker", "Free Wi-Fi", "Flat-Screen TV", "Private Balcony", "Private Bathroom", "Hair Dryer", "Iron", "Towels & Linens"],
  },
];

export default function AccommodationPage() {
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);
  const [bookingRoom, setBookingRoom] = useState<string | null>(null);

  return (
    <>
      <Header />
      {lightbox && (
        <Lightbox
          images={lightbox.images}
          startIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}
      {bookingRoom && (
        <BookingModal
          roomName={bookingRoom}
          onClose={() => setBookingRoom(null)}
        />
      )}

      {/* Hero Banner */}
      <section className="relative h-[40vh] min-h-[300px]">
        <Image
          src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1920&q=80"
          alt="Rouchotas Studios - Accommodation"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary-dark/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <p className="text-xs sm:text-base uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3">
            Accommodation
          </p>
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold">
            Our Studios
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-14 sm:py-20 bg-sand">
        <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8">
          <p className="text-body-light leading-relaxed text-sm sm:text-base text-center max-w-3xl">
            All seven studios are fully equipped with everything you need for a
            comfortable stay -- just like home. Each features a private balcony,
            air conditioning, a complete kitchen with cookware, free Wi-Fi, and
            more. Located in the heart of Argostoli with views of the port or garden.
          </p>
        </div>
      </section>

      {/* Rooms */}
      <section className="py-14 sm:py-20 bg-sand-dark">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="space-y-20 sm:space-y-28">
            {ROOMS.map((room, index) => (
              <div
                key={room.name}
                className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center"
              >
                <div className={`flex flex-col gap-2 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div
                    className="relative h-72 sm:h-96 lg:h-[400px] overflow-hidden rounded-lg shadow-lg cursor-pointer group"
                    onClick={() => setLightbox({ images: room.images, index: 0 })}
                  >
                    <Image
                      src={room.images[0]}
                      alt={room.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {room.amenities.includes("Renovated 2026") && (
                      <div className="absolute top-4 left-4 bg-accent text-white text-xs uppercase tracking-wider font-bold px-3 py-1.5 rounded-full shadow-md">
                        Renovated 2026
                      </div>
                    )}
                    <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
                      Click to view all photos
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {room.images.slice(1).map((img, imgIndex) => (
                      <div
                        key={imgIndex}
                        className="relative h-20 sm:h-24 overflow-hidden rounded cursor-pointer group"
                        onClick={() => setLightbox({ images: room.images, index: imgIndex + 1 })}
                      >
                        <Image
                          src={img}
                          alt={`${room.name} - Photo ${imgIndex + 2}`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-primary-dark mb-4">
                    {room.name}
                  </h2>
                  <p className="text-body-light leading-relaxed text-sm sm:text-base mb-8">
                    {room.description}
                  </p>

                  <h3 className="text-primary-dark font-semibold text-sm uppercase tracking-widest mb-4">
                    Amenities
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                    {room.amenities.filter(a => a !== "Renovated 2026").map((amenity) => (
                      <div key={amenity} className="flex items-center gap-2 text-body-light text-sm">
                        <span className="text-primary shrink-0">
                          {AMENITY_ICONS[amenity]}
                        </span>
                        {amenity}
                      </div>
                    ))}
                  </div>
                 <div><br></br></div>
                  <button
                    onClick={() => setBookingRoom(room.name)}
                    className="px-8 py-3 bg-primary hover:bg-primary-light text-white uppercase tracking-widest text-sm transition-colors cursor-pointer"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="py-10 sm:py-16 bg-sand" />
      <br></br>
      <Footer />
    </>
  );
}
