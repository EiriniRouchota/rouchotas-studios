import Link from "next/link";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Accommodation", href: "/accommodation" },
  { label: "Location", href: "/#location" },
  { label: "Experiences", href: "/#experiences" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  return (
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
                <Link
                  key={link.label}
                  href={link.href}
                  className="block hover:text-primary-light transition-colors"
                >
                  {link.label}
                </Link>
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
  );
}
