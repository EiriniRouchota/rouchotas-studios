"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useCallback, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

const HERO_SLIDES = [
  "/rouchotas-studios-by-viktor-1rst-floor-argostoli-kefalonia-img-6.jpg",
  "/balcony-hero.jpg",
  "/port-argostoli.jpg",
  "/licensed-image.jpg",
  "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1920&q=80",
  "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1920&q=80",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1920&q=80",
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section
        id="hero"
        className="relative h-svh min-h-[500px] overflow-hidden"
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
        onTouchMove={(e) => { touchEndX.current = e.touches[0].clientX; }}
        onTouchEnd={() => {
          const diff = touchStartX.current - touchEndX.current;
          if (Math.abs(diff) > 50) {
            diff > 0 ? nextSlide() : prevSlide();
          }
        }}
      >
        {HERO_SLIDES.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={src}
            alt={`Rouchotas Studios - Photo ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              i === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="hero-overlay absolute inset-0" />

        {/* Arrow buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full transition-colors"
          aria-label="Previous slide"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full transition-colors"
          aria-label="Next slide"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 z-[5]">
          <p className="text-xs sm:text-base uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4 animate-fade-in-up opacity-0">
            Welcome to
          </p>
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 animate-fade-in-up opacity-0 animate-delay-200 px-2">
            Rouchotas Studios
          </h1>
          <p className="text-base sm:text-xl lg:text-2xl font-light max-w-2xl animate-fade-in-up opacity-0 animate-delay-400 px-4">
            Your Ionian Island Retreat in Kefalonia
          </p>
          <a
            href="#accommodation"
            className="mt-8 sm:mt-10 px-6 sm:px-8 py-3 bg-accent hover:bg-accent-light text-white uppercase tracking-widest text-xs sm:text-sm transition-colors animate-fade-in-up opacity-0 animate-delay-600"
          >
            Discover Our Studios
          </a>
        </div>

        {/* Dots indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === currentSlide ? "bg-white scale-110" : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-14 sm:py-20 lg:py-28 bg-sand">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-accent uppercase tracking-[0.3em] text-sm mb-3">
              Since the Late &apos;90s
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-primary-dark mb-6">
              About Rouchotas Studios
            </h2>
            <div className="section-divider" />
          </div>

          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-3 space-y-4 sm:space-y-6 text-body-light leading-relaxed text-sm sm:text-base ml-6 sm:ml-12 lg:ml-20 mr-6 sm:mr-12 lg:mr-16">
              <p>
                Rouchotas Studios is a family-run business in the heart of
                Argostoli, welcoming guests since the late 1990s. Freshly
                renovated in 2026, our studios and apartments blend modern
                comfort with the warmth of traditional Kefalonian hospitality.
              </p>
              <p>
                Every unit is fully equipped -- just like home. From a complete
                kitchen to air conditioning and everything in between, we make
                sure you have all you need for a relaxing stay. Step outside
                onto your balcony and enjoy a stunning view of the port of
                Argostoli.
              </p>
              <p>
                Located right outside the bus station with easy access to local
                transportation, Rouchotas Studios is the perfect base to explore
                the island&apos;s famous beaches, villages, and hidden gems.
              </p>
              <br></br>
              {/* Booking.com rating card */}
              <div className="mt-6 sm:mt-8 inline-flex items-center gap-5 bg-white rounded-xl shadow-lg px-6 py-4 border border-sand-dark">
                <div className="flex flex-col items-center gap-1">
                  <div className="bg-[#003580] rounded-lg px-3 py-2">
                    <span className="text-white text-xl font-bold leading-none">8.9</span>
                  </div>
                  <span className="text-[#003580] text-[10px] font-semibold uppercase tracking-wider">Score</span>
                </div>
                <div className="h-12 w-px bg-sand-dark" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-primary-dark font-semibold text-base">Excellent</span>
                  <span className="text-body-light text-xs">Based on Guest Reviews</span>
                </div>
                <div className="h-12 w-px bg-sand-dark" />
                <svg className="h-7 w-auto shrink-0" viewBox="0 0 300 48" fill="none">
                  <rect width="300" height="48" rx="6" fill="#003580" />
                  <text x="12" y="35" fill="white" fontSize="30" fontWeight="bold" fontFamily="Arial, sans-serif">Booking.com</text>
                </svg>
              </div>
            </div>
            <div className="lg:col-span-2 grid grid-cols-2 gap-3 sm:gap-4">
              <div className="relative h-48 sm:h-64 lg:h-80">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/port-argostoli.jpg"
                  alt="Port of Argostoli view"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="relative h-48 sm:h-64 lg:h-80 mt-6 sm:mt-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/balcony-hero.jpg"
                  alt="Breakfast on the balcony"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accommodation Section */}
      <section id="accommodation" className="py-14 sm:py-20 lg:py-28 bg-sand-dark">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-accent uppercase tracking-[0.3em] text-sm mb-3">
              Accommodation Rennovated in 2026
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-primary-dark">
              Apartments &amp; Studios 
            </h2>
            <div className="mt-6 section-divider" />
          </div>
          <br></br>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch mt-10 sm:mt-14">
            <div className="relative h-72 sm:h-96 lg:h-auto lg:min-h-[450px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80"
                alt="Renovated studio room"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-8 lg:py-12">
              <p className="text-body-light leading-relaxed text-sm sm:text-base mb-6">
                Our freshly renovated studios and apartments are designed to feel
                just like home. Each unit features a fully equipped kitchen,
                air conditioning, private balcony with views of the port of
                Argostoli, and everything you need for a comfortable and
                memorable stay in Kefalonia.
              </p>
              <div>
                <Link
                  href="/accommodation"
                  className="inline-block px-8 py-3 bg-primary hover:bg-primary-light text-white uppercase tracking-widest text-sm transition-colors"
                >
                  View All Rooms &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="relative">
        <div className="grid lg:grid-cols-[2fr_3fr]">
          {/* Google Maps embed */}
          <div className="relative h-64 sm:h-80 lg:h-auto lg:min-h-[500px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3145.5!2d20.4895!3d38.1747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135f7e3a3b3b3b3b%3A0x0!2sIoannou+Metaxa+54%2C+Argostoli+281+00%2C+Greece!5e0!3m2!1sen!2sgr!4v1"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Rouchotas Studios location on Google Maps"
            />
          </div>

          {/* Text content */}
          <div className="bg-primary-dark text-white py-12 sm:py-16 px-6 sm:px-8 lg:px-12 flex flex-col justify-start overflow-hidden">
            <p className="text-accent uppercase tracking-[0.3em] text-sm mb-3">
              Location
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl mb-6">
              Centre of Argostoli
            </h2>
            <div className="w-16 h-0.5 bg-accent mb-6" />
            <p className="text-sand-dark leading-relaxed mb-4">
              Located right in the heart of Argostoli, at the port where the
              ferry departs for Lixouri. Our central position makes Rouchotas
              Studios the ideal base to explore everything Kefalonia has to offer
              -- and that&apos;s what makes our apartments truly unique.
            </p>
            <p className="text-sand-dark leading-relaxed mb-4">
              The local bus takes you directly to the best beaches -- Makris
              Yialos, Platis -- and of course to the airport. Everything you
              need is just steps away.
            </p>
            <br></br>
            <div className="my-8" />

            {/* Nearby amenities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 mb-8">
              <div className="flex items-center gap-3 text-sand-dark text-sm">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>
                </div>
                Sea &amp; Port View
              </div>
              <div className="flex items-center gap-3 text-sand-dark text-sm">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" /></svg>
                </div>
                City Centre
              </div>
              <div className="flex items-center gap-3 text-sand-dark text-sm">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM7.15 4.76l-1.28.97L9.44 10H2v2h7.44l2.66 3.5 1.28-.97L9.81 10h6.75l1.44 1.5.69-.52L17.6 9.5l1.09-1.48-.69-.52L16.56 9H9.81l3.57-4.74-1.28-.97-2.1 2.8-2.85-2.33z" /></svg>
                </div>
                Supermarket
              </div>
              <div className="flex items-center gap-3 text-sand-dark text-sm">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M18.5 3H6c-1.1 0-2 .9-2 2v5.71c0 3.83 2.95 7.18 6.78 7.29 3.96.12 7.22-3.06 7.22-7v-1h.5c1.93 0 3.5-1.57 3.5-3.5S20.43 3 18.5 3zm0 5H18V5h.5C19.33 5 20 5.67 20 6.5S19.33 8 18.5 8zM2 21h18v2H2v-2z" /></svg>
                </div>
                Coffee Shops
              </div>
              <div className="flex items-center gap-3 text-sand-dark text-sm">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" /></svg>
                </div>
                Pharmacy
              </div>
              <div className="flex items-center gap-3 text-sand-dark text-sm">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" /></svg>
                </div>
                Central Square (2 min)
              </div>
              <div className="flex items-center gap-3 text-sand-dark text-sm">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M13 9h-2V7h2v2zm0 2h-2v6h2v-6zm4-2V7h-2v2h2zm0 2h-2v6h2v-6zM9 9V7H7v2h2zm0 2H7v6h2v-6zm12-6v14c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2z" /></svg>
                </div>
                Hair Salon
              </div>
              <div className="flex items-center gap-3 text-sand-dark text-sm">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" /></svg>
                </div>
                Free Parking
              </div>
            </div>
          <br />
            {/* Transport links */}
            <h3 className="text-white uppercase tracking-widest text-xs font-semibold mb-4">
              Transport
            </h3>
            <div className="space-y-3 mb-8">
              <a
                href="https://ktelkefalonias.gr/en/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 px-4 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z" /></svg>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">KTEL Bus Station</p>
                  <p className="text-sand-dark text-xs">To Makris Yialos, Platis &amp; Airport</p>
                </div>
                <svg className="w-4 h-4 text-white/50 ml-auto shrink-0 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
              <a
                href="https://www.ionianseaferries.gr/en/lixouri-argostoli-pessada-zakinthos.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 px-4 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.65 2.62.99 4 .99h2v-2h-2zM3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.78s-.34-.42-.6-.5L20 10.62V6c0-1.1-.9-2-2-2h-3V1H9v3H6c-1.1 0-2 .9-2 2v4.62l-1.29.42c-.26.08-.48.26-.6.5s-.14.52-.05.78L3.95 19zM6 6h12v3.97L12 8 6 9.97V6z" /></svg>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Ferry to Lixouri</p>
                  <p className="text-sand-dark text-xs">Ionian Sea Ferries</p>
                </div>
                <svg className="w-4 h-4 text-white/50 ml-auto shrink-0 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
            </div>

            <a
              href="https://maps.google.com/?q=Ioannou+Metaxa+54+Argostoli+Kefalonia+Greece"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-white text-primary-dark uppercase tracking-widest text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all self-center rounded-lg"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 8 12 8 12s8-6.75 8-12c0-4.42-3.58-8-8-8z" fill="#EA4335" />
                <circle cx="12" cy="10" r="3" fill="white" />
                <path d="M12 2C7.58 2 4 5.58 4 10h8V2z" fill="#4285F4" opacity="0.3" />
                <path d="M12 2v8h8c0-4.42-3.58-8-8-8z" fill="#FBBC04" opacity="0.3" />
                <path d="M4 10c0 5.25 8 12 8 12V10H4z" fill="#34A853" opacity="0.3" />
              </svg>
              Find Us on Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* Experiences Section */}
      <section id="experiences" className="py-14 sm:py-20 lg:py-28 bg-sand">
        <div className="w-full mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col items-center mb-16">
            <p className="text-accent uppercase tracking-[0.3em] text-sm mb-3 text-center">
              Off the Beaten Track
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-primary-dark mb-4 text-center">
              Kefalonia Experiences
            </h2>
            <div className="w-16 h-0.5 bg-accent mb-6" />
            <p className="text-body-light max-w-2xl text-center">
              From pristine beaches and wild nature to local cuisine and vibrant
              nightlife -- discover everything Kefalonia has to offer, all
              within easy reach from our studios.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Beaches & Sea",
                desc: "Myrtos, Antisamos, Petani, Makris Yialos -- world-famous beaches with crystal-clear waters.",
                image:
                  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
              },
              {
                title: "Local Cuisine",
                desc: "Discover Argostoli's finest restaurants serving authentic Kefalonian dishes and Robola wine.",
                image:
                  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
              },
              {
                title: "Nature & Adventures",
                desc: "Sea turtles, boat trips to Fteri beach, scuba diving, Mount Ainos hiking, and more.",
                image:
                  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80",
              },
              {
                title: "Nightlife & Events",
                desc: "Beach parties, cocktail bars, and live music along the Argostoli waterfront all summer long.",
                image:
                  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80",
              },
            ].map((exp) => (
              <div key={exp.title} className="group text-center">
                <div className="relative h-64 overflow-hidden rounded-lg mb-5">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
                <h3 className="font-heading text-xl text-primary-dark mb-2">
                  {exp.title}
                </h3>
                <p className="text-body-light text-sm leading-relaxed px-2">
                  {exp.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-14">
            <Link
              href="/experiences"
              className="inline-flex items-center gap-3 px-12 py-5 bg-primary hover:bg-primary-light text-white uppercase tracking-widest text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Explore All Experiences
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-16 sm:py-24">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/licensed-image.jpg"
          alt="Kefalonia sunset over the Ionian Sea"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary-dark/75" />
        <div className="relative text-center text-white px-6 sm:px-4">
          <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl mb-4 sm:mb-6">
            Your Summer in Kefalonia Starts Here
          </h2>
          <p className="text-sand-dark max-w-xl mx-auto mb-8 sm:mb-10 text-base sm:text-lg">
            Book your stay at Rouchotas Studios and wake up to sea views,
            warm breezes, and the laid-back charm of island life.
          </p>
          <a
            href="#contact"
            className="px-10 py-4 bg-primary hover:bg-primary-light text-white uppercase tracking-widest text-sm transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
