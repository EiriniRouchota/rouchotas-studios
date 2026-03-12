"use client";

import { useEffect } from "react";

interface BookingModalProps {
  roomName: string;
  onClose: () => void;
}

export default function BookingModal({ roomName, onClose }: BookingModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-8 sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-body-light hover:text-primary-dark transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h3 className="font-heading text-2xl sm:text-3xl text-primary-dark mb-2">
          Book {roomName}
        </h3>
        <p className="text-body-light text-sm mb-8">
          We accept bookings via telephone, email, or WhatsApp.
          Get in touch and we&apos;ll be happy to help you reserve your stay.
        </p>

        <div className="space-y-5">
          {/* Phone */}
          <a href="tel:+306931833057" className="flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-full bg-sand flex items-center justify-center shrink-0 group-hover:bg-sand-dark transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z" fill="#4285F4" />
              </svg>
            </div>
            <div>
              <p className="text-primary-dark font-semibold text-sm">Call Us</p>
              <p className="text-body-light text-sm group-hover:text-primary transition-colors">+30 693 183 3057</p>
            </div>
          </a>

          {/* Email */}
          <a href="mailto:xarafragkia@gmail.com" className="flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-full bg-sand flex items-center justify-center shrink-0 group-hover:bg-sand-dark transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path d="M20 18H4V6l8 5 8-5v12z" fill="#D44638" />
                <path d="M20 4H4l8 5 8-5z" fill="#EA4335" />
              </svg>
            </div>
            <div>
              <p className="text-primary-dark font-semibold text-sm">Email Us</p>
              <p className="text-body-light text-sm group-hover:text-primary transition-colors">xarafragkia@gmail.com</p>
            </div>
          </a>

          {/* WhatsApp */}
          <a href="https://wa.me/306931833057" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-full bg-sand flex items-center justify-center shrink-0 group-hover:bg-sand-dark transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="#25D366" />
              </svg>
            </div>
            <div>
              <p className="text-primary-dark font-semibold text-sm">WhatsApp</p>
              <p className="text-body-light text-sm group-hover:text-primary transition-colors">Send us a message</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
