"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";

const HERO_SLIDES = [
  "/rouchotas-studios-by-viktor-1rst-floor-argostoli-kefalonia-img-6.jpg",
  "/balcony-hero.jpg",
  "/port-argostoli.jpg",
  "/licensed-image.jpg",
  "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1920&q=80",
  "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1920&q=80",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1920&q=80",
];

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Accommodation", href: "#accommodation" },
  { label: "Location", href: "#location" },
  { label: "Experiences", href: "#experiences" },
  { label: "Contact", href: "#contact" },
];

const ROOMS = [
  {
    name: "Classic Studio",
    description:
      "Cozy and comfortable studios perfect for couples, featuring a kitchenette, private balcony, and all essential amenities for a relaxing stay.",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
  },
  {
    name: "Superior Studio",
    description:
      "Spacious studios with elegant decor, offering a fully equipped kitchen, air conditioning, and a lovely balcony overlooking the garden.",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
  },
  {
    name: "Family Apartment",
    description:
      "Ideal for families, these apartments feature a separate bedroom, a living area with sofa bed, and a full kitchen for self-catering comfort.",
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",
  },
  {
    name: "Deluxe Suite",
    description:
      "Our premium suites offer generous living space, stylish furnishings, a private terrace, and stunning views of the Ionian landscape.",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
  },
];

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <>
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "nav-scrolled py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <a href="#hero" className="text-white font-heading text-2xl font-bold tracking-wide">
            Rouchotas Studios
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white text-sm uppercase tracking-widest hover:text-accent-light transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-primary-dark/95 backdrop-blur-md">
            <div className="px-4 py-4 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-white text-sm uppercase tracking-widest hover:text-accent-light transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-accent uppercase tracking-[0.3em] text-sm mb-3">
              Accommodation
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-primary-dark mb-4">
              Studios & Apartments
            </h2>
            <div className="section-divider mb-6" />
            <p className="text-body-light max-w-2xl mx-auto">
              Choose from our selection of beautifully appointed studios and
              apartments, each designed to offer comfort and convenience for your
              Kefalonia holiday.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {ROOMS.map((room) => (
              <div
                key={room.name}
                className="room-card bg-white shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="room-image object-cover transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl text-primary-dark mb-3">
                    {room.name}
                  </h3>
                  <p className="text-body-light text-sm leading-relaxed mb-4">
                    {room.description}
                  </p>
                  <a
                    href="#contact"
                    className="text-primary uppercase text-xs tracking-widest font-bold hover:text-primary-dark transition-colors"
                  >
                    Book Now &rarr;
                  </a>
                </div>
              </div>
            ))}
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

      {/* Footer / Contact */}
      <footer id="contact" className="bg-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            <div>
              <h3 className="font-heading text-2xl mb-6">Rouchotas Studios</h3>
              <p className="text-sand-dark leading-relaxed text-sm">
                Comfortable studios and fully equipped apartments in the heart
                of Kefalonia. Ideal for couples, families, and travelers looking
                for a relaxing base to explore the beauty of the Ionian Islands.
              </p>
            </div>

            <div>
              <h4 className="uppercase tracking-widest text-sm mb-6 text-primary-light">
                Contact
              </h4>
              <div className="space-y-4 text-sand-dark text-sm">
                <div className="flex items-start gap-3">
                  <a href="https://maps.google.com/?q=Ioannou+Metaxa+54+Argostoli+Kefalonia+Greece" target="_blank" rel="noopener noreferrer" className="shrink-0 mt-0.5 hover:scale-110 transition-transform">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#EA4335" />
                      <circle cx="12" cy="9" r="2.5" fill="white" />
                    </svg>
                  </a>
                  <a href="https://maps.google.com/?q=Ioannou+Metaxa+54+Argostoli+Kefalonia+Greece" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                    Ioannou Metaxa 54, Argostoli
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none">
                    <path d="M20 18H4V6l8 5 8-5v12z" fill="#D44638" />
                    <path d="M20 4H4l8 5 8-5z" fill="#EA4335" />
                  </svg>
                  <a href="mailto:xarafragkia@gmail.com" className="hover:text-accent transition-colors">
                    xarafragkia@gmail.com
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none">
                    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z" fill="#4285F4" />
                  </svg>
                  <a href="tel:+306931833057" className="hover:text-accent transition-colors">
                    +30 693 183 3057
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="#25D366" />
                  </svg>
                  <a href="https://wa.me/306931833057" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h4 className="uppercase tracking-widest text-sm mb-6 text-primary-light">
                Quick Links
              </h4>
              <div className="space-y-3 text-sand-dark text-sm">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block hover:text-primary-light transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 w-full">
          <p className="text-sand-dark text-xs text-center w-full">
            &copy; {new Date().getFullYear()} Rouchotas Studios. All rights reserved.
            <br />
            Developed by Eirini Rouchota, Software Engineer
          </p>
        </div>
      </footer>
    </>
  );
}
