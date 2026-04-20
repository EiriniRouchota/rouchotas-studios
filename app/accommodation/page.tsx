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
  "Up to 4 Guests": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11a3 3 0 100-6 3 3 0 000 6zM8 13a3 3 0 100-6 3 3 0 000 6z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 20a5 5 0 015-5h2a5 5 0 015 5M13 20a5 5 0 015-5h1a5 5 0 015 5" /></svg>
  ),
  "Double King-Size Bed": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 11h18v8H3zM3 11V8a2 2 0 012-2h6a2 2 0 012 2v3M13 11V8a2 2 0 012-2h4a2 2 0 012 2v3M5 19v2m14-2v2" /></svg>
  ),
  "Two Separate Beds": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12h8v7H3zM13 12h8v7h-8zM3 12V9a2 2 0 012-2h4a2 2 0 012 2v3M13 12V9a2 2 0 012-2h4a2 2 0 012 2v3M5 19v2m14-2v2" /></svg>
  ),
  "Renovated 2026": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  ),
};

const ROOMS = [
  {
    name: "Studio 5 – Sunset Suite",
    description:
      "Newly renovated in 2026 with a fresh, modern design. This studio captures the golden Kefalonian sunsets over the port of Argostoli. Complete with a full kitchen, premium bedding, and a spacious balcony for evening relaxation. Features a double king-size bed.",
    images: [
      "/images/5/846165649.jpg",
      "/images/5/846165500.jpg",
      "/images/5/846165384.jpg",
      "/images/5/846165780.jpg",
      "/images/5/846165847.jpg",
      "/images/5/846165892.jpg",
      "/images/5/846165988.jpg",
      "/images/5/846208714.jpg",
      "/images/5/846208815.jpg",
      "/images/5/846208920.jpg",
      "/images/5/846208960.jpg",
    ],
    renovationSticker: "Renovated April 2026",
    amenities: ["Renovated 2026", "Double King-Size Bed", "Port View", "Air Conditioning", "Full Kitchen", "Cookware & Utensils", "Refrigerator", "Coffee Maker", "Free Wi-Fi", "Flat-Screen TV", "Private Balcony", "Private Bathroom", "Hair Dryer", "Iron", "Towels & Linens"],
  },
  {
    name: "Studio 6 – Ionian Blue",
    description:
      "Freshly renovated in 2026 and inspired by the blues of the Ionian Sea. This studio features stunning port views, contemporary interiors, and everything you need for a comfortable and stylish stay. Includes two separate beds.",
    images: [
      "/images/6/784467690.jpg",
      "/images/6/843453787.jpg",
      "/images/6/843453868.jpg",
      "/images/6/843453920.jpg",
      "/images/6/843455834.jpg",
      "/images/6/843455911.jpg",
    ],
    renovationSticker: "Renovated April 2026",
    amenities: ["Renovated 2026", "Two Separate Beds", "Port View", "Air Conditioning", "Full Kitchen", "Cookware & Utensils", "Refrigerator", "Coffee Maker", "Free Wi-Fi", "Flat-Screen TV", "Private Balcony", "Private Bathroom", "Hair Dryer", "Iron", "Towels & Linens"],
  },
  {
    name: "Studio 3 – Port Panorama",
    description:
      "Freshly renovated in 2026, this studio offers breathtaking views of the port of Argostoli. Completely redesigned with modern furnishings, a fully equipped kitchen, and a private balcony where you can watch the boats come and go.",
    images: [],
    photoNotice: "Currently under renovation. Upcoming photos soon.",
    amenities: ["Renovated 2026", "Port View", "Air Conditioning", "Full Kitchen", "Cookware & Utensils", "Refrigerator", "Coffee Maker", "Free Wi-Fi", "Flat-Screen TV", "Private Balcony", "Private Bathroom", "Hair Dryer", "Iron", "Towels & Linens"],
  },
  {
    name: "Studio 4 – Harbour View",
    description:
      "Enjoy uninterrupted views of the harbour from this cozy and well-appointed studio. Fully equipped with a complete kitchen, air conditioning, and all the comforts you need for an unforgettable stay in Kefalonia.",
    images: [],
    photoNotice: "Currently under renovation. Upcoming photos soon.",
    amenities: ["Double King-Size Bed", "Port View", "Air Conditioning", "Full Kitchen", "Cookware & Utensils", "Refrigerator", "Coffee Maker", "Free Wi-Fi", "Flat-Screen TV", "Private Balcony", "Private Bathroom", "Hair Dryer", "Iron", "Towels & Linens"],
  },
  {
    name: "Studio 7 – Captains Quarters",
    description:
      "Overlooking the bustling port of Argostoli, this studio is the perfect vantage point for watching island life unfold. Fully equipped kitchen, air conditioning, and a private balcony make this your ideal Kefalonian base. Features a double king-size bed.",
    images: [
      "/images/7/717028738.jpg",
      "/images/7/717029006.jpg",
      "/images/7/741394917.jpg",
    ],
    amenities: ["Port View", "Air Conditioning", "Full Kitchen", "Cookware & Utensils", "Refrigerator", "Coffee Maker", "Free Wi-Fi", "Flat-Screen TV", "Private Balcony", "Private Bathroom", "Hair Dryer", "Iron", "Towels & Linens"],
  },
  {
    name: "Studio 1 – The Grand",
    description:
      "Our most spacious studio, perfect for those who value extra room to relax. Features a generous living space with a fully equipped kitchen, modern air conditioning, and a private balcony. A true home away from home in the heart of Argostoli. Accommodates up to 4 guests.",
    images: [
      "/images/1/663423818.jpg",
      "/images/1/663423850.jpg",
      "/images/general/garden.jpg",
    ],
    amenities: ["Spacious", "Up to 4 Guests", "Air Conditioning", "Full Kitchen", "Cookware & Utensils", "Refrigerator", "Coffee Maker", "Free Wi-Fi", "Flat-Screen TV", "Private Balcony", "Private Bathroom", "Hair Dryer", "Iron", "Towels & Linens"],
  },
  {
    name: "Studio 2 – Garden Retreat",
    description:
      "A peaceful studio overlooking the lush garden, fully equipped with everything you need for a comfortable stay. Wake up to the sound of birdsong and enjoy your morning coffee surrounded by Mediterranean greenery.",
    images: [
      "/images/2/723875003.jpg",
      "/images/general/garden.jpg",
    ],
    amenities: ["Garden View", "Air Conditioning", "Full Kitchen", "Cookware & Utensils", "Refrigerator", "Coffee Maker", "Free Wi-Fi", "Flat-Screen TV", "Private Balcony", "Private Bathroom", "Hair Dryer", "Iron", "Towels & Linens"],
  },
];

const LOBBY_IMAGES = [
  "/images/general/lobby_entry.jpg",
  "/images/general/lobby.jpg",
  "/images/general/lobby2.jpg",
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
          src="/images/6/843455834.jpg"
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
        
        <br></br>
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="w-full rounded-2xl border border-primary/20 bg-white/60 backdrop-blur-sm px-6 py-7 sm:px-10 sm:py-9 text-center shadow-[0_10px_30px_rgba(38,56,74,0.08)]">
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-primary font-semibold mb-3">
              Your Stay At A Glance
            </p>
            <h2 className="font-heading text-primary-dark text-2xl sm:text-3xl mb-4">
              All Seven Studios, Fully Equipped
            </h2>
            <p className="text-primary-dark/90 leading-relaxed text-base sm:text-lg">
              All seven studios are fully equipped with everything you need for a
              comfortable stay, just like home. Every studio includes a private
              balcony, air conditioning, a complete kitchen with cookware, free Wi-Fi,
              and more, all in the heart of Argostoli with port or garden views.
            </p>
          </div>
          <br></br>
        </div>
      </section>

      {/* Rooms */}
      <section className="py-14 sm:py-20 bg-sand-dark">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="space-y-32 sm:space-y-40">
            {ROOMS.map((room, index) => (
              // Use explicit sticker text when provided (e.g. Renovated April 2026).
              // Fall back to amenity-based badge for existing renovated rooms.
              <div
                key={room.name}
                className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-stretch"
              >
                <div className={`flex flex-col gap-2 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  {room.images.length > 0 ? (
                    <>
                      <div
                        className="relative h-72 sm:h-96 lg:h-[400px] overflow-hidden rounded-lg shadow-lg cursor-pointer group"
                        onClick={() => setLightbox({ images: room.images, index: 0 })}
                      >
                        <Image
                          src={room.images[0]}
                          alt={room.name}
                          fill
                          className="object-contain bg-sand-dark transition-transform duration-500 group-hover:scale-105"
                        />
                        {(room.renovationSticker || room.amenities.includes("Renovated 2026")) && (
                          <div className="absolute top-4 left-4 z-10 bg-[#d4af37] text-[#2d2212] rounded-md px-3 py-2 border border-[#b58f22] shadow-[0_10px_24px_rgba(58,42,15,0.28)]">
                            <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#5b460f]">
                                Recently Updated
                            </p>
                            <p className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.08em] leading-tight">
                              {room.renovationSticker || "Renovated 2026"}
                            </p>
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
                              className="object-contain bg-sand-dark group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="h-72 sm:h-96 lg:h-[400px] rounded-lg shadow-lg bg-primary-dark/90 text-white flex items-center justify-center text-center px-6">
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-white/80 mb-3">
                          Photo Update
                        </p>
                        <p className="font-heading text-xl sm:text-2xl mb-2">
                          Currently Under Renovation
                        </p>
                        <p className="text-sm sm:text-base text-white/90">
                          Upcoming photos soon.
                        </p>
                      </div>
                    </div>
                  )}
                  <br></br>
                </div>
                <div className={`${index % 2 === 1 ? "lg:order-1" : ""} h-full flex flex-col justify-center`}>
                  <div className="space-y-6">
                    <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-primary-dark">
                      {room.name}
                    </h2>
                    {room.photoNotice && (
                      <p className="inline-block px-3 py-1.5 bg-accent/15 text-accent text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-full">
                        {room.photoNotice}
                      </p>
                    )}
                    <br></br>
                    <p className="text-body-light leading-relaxed text-sm sm:text-base">
                      {room.description}
                    </p>

                    
                    <br></br><h3 className="text-primary-dark font-semibold text-sm uppercase tracking-widest">
                      Amenities
                    </h3> <br></br>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {room.amenities.filter(a => a !== "Renovated 2026").map((amenity) => (
                        <div key={amenity} className="flex items-center gap-2 text-body-light text-sm">
                          <span className="text-primary shrink-0">
                            {AMENITY_ICONS[amenity]}
                          </span>
                          {amenity}
                        </div>
                      ))}
                    </div>
                  </div>
                  <br></br>
                  <button
                    onClick={() => setBookingRoom(room.name)}
                    className="mt-8 px-8 py-3 bg-primary hover:bg-primary-light text-white uppercase tracking-widest text-sm transition-colors cursor-pointer"
                  >
                    Book Now
                  </button>
                  <br></br>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lobby Area */}
      <section className="py-14 sm:py-20 bg-sand">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <p className="text-accent uppercase tracking-[0.22em] text-xs sm:text-sm mb-3">
                Shared Lobby Area
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl text-primary-dark mb-5">
                Start Your Day In The Lobby
              </h2>
              <p className="text-body-light leading-relaxed text-sm sm:text-base">
                Our welcoming lobby area is available to all guests and is the
                perfect place to begin your morning. You can find fresh water
                and juice here to start your day before heading out to explore
                Argostoli and the island.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div
                className="relative col-span-2 h-56 sm:h-72 rounded-lg overflow-hidden shadow-lg cursor-pointer group"
                onClick={() => setLightbox({ images: LOBBY_IMAGES, index: 0 })}
              >
                <Image
                  src="/images/general/lobby_entry.jpg"
                  alt="Lobby entrance and garden area"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div
                className="relative h-36 sm:h-44 rounded-lg overflow-hidden shadow-md cursor-pointer group"
                onClick={() => setLightbox({ images: LOBBY_IMAGES, index: 1 })}
              >
                <Image
                  src="/images/general/lobby.jpg"
                  alt="Lobby area at Rouchotas Studios"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div
                className="relative h-36 sm:h-44 rounded-lg overflow-hidden shadow-md cursor-pointer group"
                onClick={() => setLightbox({ images: LOBBY_IMAGES, index: 2 })}
              >
                <Image
                  src="/images/general/lobby2.jpg"
                  alt="Lobby sitting area"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="py-10 sm:py-16 bg-sand" />
      <br></br>
      <Footer />
    </>
  );
}
