import JourneyCard from "./JourneyCard-discover.jsx";
import { ArrowRight } from "lucide-react";
import { useEffect, useState, useRef, useMemo } from "react";
import destinationApi from "../api/destinationApi.js";
import IndiaSvg from "../assets/india-map.svg?react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

const API_URL = import.meta.env.VITE_API_URL ?? "";
gsap.registerPlugin(ScrollTrigger, SplitText);

function FeaturedJourneys() {
  const [destinations, setDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const linkRef = useRef(null);
  const cardsWrapperRef = useRef(null);

  useEffect(() => {
    async function get() {
      try {
        const response = await destinationApi.getAllDestinations();
        setDestinations(response);
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 150);
      } catch (err) {
        console.error("Failed to fetch destinations:", err);
      } finally {
        setIsLoading(false);
      }
    }

    get();
  }, []);

  const featuredJourneyNames = [
    "Jaipur",
    "Andaman and Nicobar Islands",
    "Jim Corbett National Park",
    "Munnar",
    "Varanasi",
    "Agra",
    "Ladakh",
    "Goa",
  ];

  const journeyExtras = {
    Jaipur: {
      days: 8,
    },
    "Andaman and Nicobar Islands": {
      days: 7,
    },
    "Jim Corbett National Park": {
      days: 5,
    },
    Munnar: {
      days: 9,
    },
    Varanasi: {
      days: 4,
    },
    Agra: {
      days: 3,
    },
    Ladakh: {
      days: 7,
    },
    Goa: {
      days: 5,
    },
  };

  const featuredDestinations = useMemo(
    () => destinations.filter((d) => featuredJourneyNames.includes(d.name)),
    [destinations]
  );
  const row1 = featuredDestinations.slice(0, 4);
  const row2 = featuredDestinations.slice(4, 8);
  const loopRow1 = [...row1, ...row1, ...row1];
  const loopRow2 = [...row2, ...row2, ...row2];

  useGSAP(
    () => {
      if (!featuredDestinations.length) return;

      const row1Element = sectionRef.current?.querySelector(".row1");
      const row2Element = sectionRef.current?.querySelector(".row2");

      if (!row1Element || !row2Element) return;

      // 1. Split text for title reveal
      let split;
      if (titleRef.current) {
        split = new SplitText(titleRef.current, { type: "words, chars" });
      }

      // Master ScrollTrigger entrance timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Step 1: Title character entrance animation
      if (split && split.chars && split.chars.length > 0) {
        tl.fromTo(
          split.chars,
          { opacity: 0, y: 45, rotateX: -60, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            filter: "blur(0px)",
            stagger: 0.025,
            duration: 0.9,
            ease: "back.out(1.4)",
          }
        );
      } else if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { opacity: 0, y: 40, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out" }
        );
      }

      // Step 2: View All link entrance
      if (linkRef.current) {
        tl.fromTo(
          linkRef.current,
          { opacity: 0, x: 25 },
          { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" },
          "-=0.6"
        );
      }

      // Step 3: Cards Container & Rows Entrance
      if (cardsWrapperRef.current) {
        tl.fromTo(
          cardsWrapperRef.current,
          { opacity: 0, y: 70, scale: 0.95, filter: "blur(12px)" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.1,
            ease: "power3.out",
          },
          "-=0.5"
        );
      }

      // Row 1 & Row 2 stagger entrance inside wrapper
      tl.fromTo(
        row1Element,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.8"
      );
      tl.fromTo(
        row2Element,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.6"
      );

      // Infinite Marquee scrolling
      const row1Distance = row1Element.scrollWidth / 3;
      const row2Distance = row2Element.scrollWidth / 3;
      gsap.set(row2Element, { x: -row2Distance });

      const marquee1 = gsap.to(row1Element, {
        x: -row1Distance,
        duration: 40,
        repeat: -1,
        ease: "none",
      });

      const marquee2 = gsap.to(row2Element, {
        x: 0,
        duration: 40,
        repeat: -1,
        ease: "none",
      });

      return () => {
        if (split) split.revert();
        marquee1.kill();
        marquee2.kill();
        tl.kill();
      };
    },
    {
      dependencies: [featuredDestinations],
      scope: sectionRef,
    }
  );

  return (
    <section
      ref={sectionRef}
      className="px-6 py-section-gap md:px-margin-desktop overflow-hidden relative bg-[#f7ece2]"
    >
      {/* ── Translucent India Map Watermark Background ── */}
      <div className="absolute right-[-2%] top-1/2 -translate-y-1/2 w-[420px] md:w-[650px] lg:w-[800px] pointer-events-none opacity-[0.08] select-none text-[#a23f1a] blur-[0.3px] z-0">
        <IndiaSvg className="w-full h-auto fill-current" />
      </div>

      <div className="mt-2 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 relative z-10">
        <div>
          <h2
            ref={titleRef}
            className="font-display text-3xl font-semibold text-[#1f1b15] md:text-7xl tracking-tight"
          >
            Featured Journeys
          </h2>
        </div>
        <a
          ref={linkRef}
          href="/destinations"
          className="group inline-flex items-center gap-2 font-body text-md font-semibold text-[#a23f1a] hover:text-[#e8734a] transition-colors duration-200 hover:underline underline-offset-4"
        >
          View All Destinations{" "}
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>
      </div>

      <div
        ref={cardsWrapperRef}
        className="py-16 md:py-24 space-y-8 overflow-hidden w-full"
      >
        <div className="row1 flex gap-12 w-max">
          {loopRow1.map((journey, idx) => (
            <div key={`${journey.id}-1-${idx}`} className="w-[440px] md:w-[480px] flex-shrink-0">
              <JourneyCard
                id={journey.id}
                image={`${API_URL}${journey.imageUrl}`}
                tag={journey.category}
                title={journey.name}
                days={journeyExtras[journey.name]?.days || 5}
              />
            </div>
          ))}
        </div>
        <div className="row2 flex gap-12 w-max">
          {loopRow2.map((journey, idx) => (
            <div key={`${journey.id}-2-${idx}`} className="w-[440px] md:w-[480px] flex-shrink-0">
              <JourneyCard
                id={journey.id}
                image={`${API_URL}${journey.imageUrl}`}
                tag={journey.category}
                title={journey.name}
                days={journeyExtras[journey.name]?.days || 5}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedJourneys;