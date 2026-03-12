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
        <div className="grid lg:grid-cols-2">
          <div className="relative h-64 sm:h-80 lg:h-auto lg:min-h-[500px]">
            <Image
              src="https://images.unsplash.com/photo-1504512485720-7d83a16ee930?w=1200&q=80"
              alt="Kefalonia coastline"
              fill
              className="object-cover"
            />
          </div>
          <div className="bg-primary-dark text-white py-12 sm:py-16 px-6 sm:px-8 lg:px-16 flex flex-col justify-center">
            <p className="text-accent uppercase tracking-[0.3em] text-sm mb-3">
              Location
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl mb-6">
              Kefalonia, Greece
            </h2>
            <div className="w-16 h-0.5 bg-accent mb-8" />
            <p className="text-sand-dark leading-relaxed mb-6">
              Rouchotas Studios is ideally located in Kefalonia, the largest of
              the Ionian Islands. Enjoy easy access to pristine beaches,
              charming villages, and the island&apos;s most celebrated attractions.
            </p>
            <p className="text-sand-dark leading-relaxed mb-8">
              Just minutes from stunning beaches and close to the island&apos;s
              capital, Argostoli, our location offers the perfect blend of
              convenience and serenity for your Greek island holiday.
            </p>
            <a
              href="https://maps.google.com/?q=Kefalonia+Greece"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 border-2 border-accent text-accent uppercase tracking-widest text-sm hover:bg-accent hover:text-white transition-colors self-start"
            >
              Find Us on Map
            </a>
          </div>
        </div>
      </section>

      {/* Experiences Section */}
      <section id="experiences" className="py-14 sm:py-20 lg:py-28 bg-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-accent uppercase tracking-[0.3em] text-sm mb-3">
              Off the Beaten Track
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-primary-dark mb-4">
              Kefalonia Experiences
            </h2>
            <div className="section-divider mb-6" />
            <p className="text-body-light max-w-2xl mx-auto">
              Discover the magic of Kefalonia with unforgettable experiences,
              from hidden beaches and ancient caves to local wine tours and boat
              excursions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Pristine Beaches",
                desc: "Explore world-famous Myrtos Beach, the serene Antisamos, and hidden coves only accessible by boat.",
                image:
                  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
              },
              {
                title: "Local Cuisine & Wine",
                desc: "Savor authentic Kefalonian dishes paired with the island's renowned Robola wine at traditional tavernas.",
                image:
                  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
              },
              {
                title: "Island Adventures",
                desc: "From boat trips around the island to hiking through lush forests and exploring Melissani Cave, adventure awaits.",
                image:
                  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80",
              },
            ].map((exp) => (
              <div key={exp.title} className="group cursor-pointer">
                <div className="relative h-72 overflow-hidden mb-6">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
                <h3 className="font-heading text-xl text-primary-dark mb-3">
                  {exp.title}
                </h3>
                <p className="text-body-light text-sm leading-relaxed">
                  {exp.desc}
                </p>
              </div>
            ))}
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
