import JourneyCard from "./JourneyCard-discover.jsx";
import { ArrowRight } from "lucide-react";
import { useEffect, useState, useRef, useMemo } from "react";
import destinationApi from "../api/destinationApi.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
const API_URL = import.meta.env.VITE_API_URL ?? "";
gsap.registerPlugin(ScrollTrigger);

function FeaturedJourneys() {
  const [destinations, setDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef(null);
  useEffect(() => {

    async function get() {
      const response = await destinationApi.getAllDestinations();
      setDestinations(response);
      setIsLoading(false);
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
    "Munnar": {
      days: 9,
    },
    "Varanasi": {
      days: 4,
    },
    "Agra": {
      days: 3,
    },
    "Ladakh": {
      days: 7,
    },
    "Goa": {
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

  useGSAP(() => {
    const row1Element = document.querySelector(".row1");
    const row2Element = document.querySelector(".row2");
    const row1Distance = row1Element.scrollWidth / 3;
    const row2Distance = row2Element.scrollWidth / 3;
    gsap.set(row2Element, { x: -row2Distance });
    gsap.to(row1Element,
      {
        x: -row1Distance,
        duration: 40,
        repeat: -1,
        ease: "none",
      }, 0);
    gsap.to(row2Element,
      {
        x: 0,
        duration: 40,
        repeat: -1,
        ease: "none",
      }, 0);
    return () => gsap.killTweensOf(".row1");
    gsap.killTweensOf(".row2");
  }, {
    dependencies: [featuredDestinations], scope: sectionRef
  });

  return (
    <section
      ref={sectionRef}
      className="px-6 py-section-gap md:px-margin-desktop"
      style={{ background: "linear-gradient(to bottom, #020810 0%, #081528 25%, #1f2229 55%, #fff8f4 100%)" }}
    >
      <div className=" mt-2 mb-8 flex items-end justify-between">
        <div >
          <h2 className="font-display text-2xl font-semibold text-white md:text-7xl drop-shadow-md">
            Featured Journeys
          </h2>
        </div>
        <a
          href="/destinations"
          className=" items-center gap-1 font-body text-md font-medium text-primary-fixed md:flex hover:underline underline-offset-1"
        >
          View All Destinations <ArrowRight size={14} />
        </a>
      </div>

      <div className="py-28 space-y-8 overflow-hidden w-full">
        <div className="row1 flex gap-12 w-max">
          {loopRow1.map((journey) => (
            <div key={journey.id} className="w-[480px] flex-shrink-0">
              <JourneyCard
                id={journey.id}
                image={`${API_URL}${journey.imageUrl}`}
                tag={journey.category}
                title={journey.name}
                days={journeyExtras[journey.name].days}
              />
            </div>
          ))}
        </div>
        <div className="row2 flex gap-12 w-max">
          {loopRow2.map((journey) => (
            <div key={journey.id} className="w-[480px] flex-shrink-0">
              <JourneyCard
                image={`${API_URL}${journey.imageUrl}`}
                tag={journey.category}
                title={journey.name}
                days={journeyExtras[journey.name].days}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default FeaturedJourneys