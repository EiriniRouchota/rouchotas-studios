import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";

const experiences = [
  {
    id: "cuisine",
    title: "Local Cuisine",
    subtitle: "Taste of Kefalonia",
    description:
      "Argostoli is home to some of the finest restaurants on the island, serving authentic Kefalonian dishes with fresh local ingredients. Walk from our studios into the heart of town and discover traditional tavernas where you can enjoy meat pies, moussaka, fresh seafood, and the island's famous Robola wine. From waterfront dining to hidden gems in the back streets, every meal is an experience.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    imageAlt: "Local Greek cuisine",
  },
  {
    id: "nature",
    title: "Nature & Wildlife",
    subtitle: "Discover the Wild Side",
    description:
      "Kefalonia is a paradise for nature lovers. Right from the port of Argostoli you can spot the famous Caretta Caretta sea turtles swimming in the harbour. Take a walk to Fanari, the lighthouse at the tip of the peninsula, for stunning sunset views. Or head to Koutavos lagoon, a peaceful natural lake connected to the sea, where you'll find swans, ducks, and beautiful walking paths surrounded by greenery.",
    image:
      "https://images.unsplash.com/photo-1518467166778-b88f373ffec7?w=800&q=80",
    imageAlt: "Sea turtle in crystal clear waters",
  },
  {
    id: "beaches",
    title: "Beaches",
    subtitle: "Sun, Sand & Crystal Waters",
    description:
      "Kefalonia boasts some of the most beautiful beaches in Greece. Near Argostoli, the locals' favourites are Makris Yialos and Platis Yialos -- golden sand beaches with turquoise waters just a short bus ride away. For a truly unforgettable experience, visit the world-famous Myrtos Beach with its dramatic white cliffs, Antisamos with its lush green backdrop, or the hidden gem Petani Beach on the west coast.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    imageAlt: "Beautiful beach with crystal clear water",
  },
  {
    id: "boat-trips",
    title: "Boat Trips & Cruises",
    subtitle: "Explore by Sea",
    description:
      "From the port of Argostoli you can take a boat to reach secluded beaches like Fteri, accessible only by sea. Book a daily cruise around the island and discover hidden caves, remote coves, and swim in waters so clear you can see the seabed. Full-day and half-day trips are available throughout the summer, with many including stops for snorkelling and lunch on board.",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    imageAlt: "Boat trip on crystal clear waters",
  },
  {
    id: "diving",
    title: "Scuba Diving & Snorkelling",
    subtitle: "Underwater Paradise",
    description:
      "The crystal-clear waters of the Ionian Sea make Kefalonia a top destination for scuba diving and snorkelling. Explore underwater caves, vibrant marine life, and ancient shipwrecks. Whether you're a certified diver or a complete beginner, local dive centres offer courses and guided dives for all levels. Even a simple snorkel from the shore will reveal an incredible underwater world.",
    image:
      "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=800&q=80",
    imageAlt: "Scuba diving in clear blue waters",
  },
  {
    id: "mountain",
    title: "Mount Ainos",
    subtitle: "Peak of the Island",
    description:
      "For hikers and mountain lovers, Mount Ainos is a must. Standing at 1,628 metres, it's the highest point in the Ionian Islands and home to a national park with the unique Kefalonian fir trees found nowhere else on earth. The hiking trails offer breathtaking panoramic views over the island and the sea. On a clear day, you can see all the way to Zakynthos and the Peloponnese.",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    imageAlt: "Mountain landscape with hiking trail",
  },
  {
    id: "nightlife",
    title: "Nightlife & Beach Parties",
    subtitle: "Summer Vibes",
    description:
      "When the sun goes down, Argostoli comes alive. The town offers a vibrant nightlife scene with cocktail bars, music venues, and clubs along the waterfront. During summer, many of the island's beaches host parties and events with live DJs, creating that perfect Greek island atmosphere. From a relaxed evening drink by the harbour to dancing until dawn, Kefalonia has it all.",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
    imageAlt: "Beach party at sunset",
  },
];

export default function ExperiencesPage() {
  return (
    <>
      <Header />

      {/* Hero Banner */}
      <section className="relative h-[40vh] min-h-[300px]">
        <Image
          src="https://images.unsplash.com/photo-1504512485720-7d83a16ee930?w=1920&q=80"
          alt="Kefalonia experiences"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary-dark/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <p className="text-xs sm:text-base uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3">
            Discover
          </p>
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold">
            Kefalonia Experiences
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-14 sm:py-20 bg-sand">
        <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8">
          <p className="text-body-light leading-relaxed text-sm sm:text-base text-center max-w-3xl">
            Kefalonia is more than just a destination -- it&apos;s an experience.
            From pristine beaches and wild nature to local flavours and vibrant
            nightlife, the island offers something for everyone. And from
            Rouchotas Studios, it&apos;s all within easy reach.
          </p>
        </div>
      </section>

      {/* Experience Sections - full-bleed alternating */}
      {experiences.map((exp, index) => (
        <section
          key={exp.id}
          id={exp.id}
          className="relative"
        >
          <div className="grid lg:grid-cols-2 min-h-[400px] lg:min-h-[500px]">
            {/* Photo */}
            <div
              className={`relative h-64 sm:h-80 lg:h-auto ${
                index % 2 === 1 ? "lg:order-2" : ""
              }`}
            >
              <Image
                src={exp.image}
                alt={exp.imageAlt}
                fill
                className="object-cover"
              />
            </div>

            {/* Text */}
            <div
              className={`flex flex-col justify-center py-10 sm:py-14 px-8 sm:px-12 lg:px-16 xl:px-20 ${
                index % 2 === 0 ? "bg-white" : "bg-sand"
              } ${index % 2 === 1 ? "lg:order-1" : ""}`}
            >
              <p className="text-accent uppercase tracking-[0.3em] text-xs mb-2">
                {exp.subtitle}
              </p>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-primary-dark mb-4">
                {exp.title}
              </h2>
              <div className="w-12 h-0.5 bg-accent mb-6" />
              <p className="text-body-light leading-relaxed text-sm sm:text-base max-w-lg">
                {exp.description}
              </p>
            </div>
          </div>
        </section>
      ))}

      <div className="py-10 sm:py-16 bg-sand" />

      <Footer />
    </>
  );
}
