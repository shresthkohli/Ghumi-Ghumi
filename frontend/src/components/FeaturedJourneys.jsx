import JourneyCard from "./JourneyCard-discover.jsx";
import {ArrowRight} from "lucide-react";

function FeaturedJourneys() {
  const journeys = [
    {
      image: "https://plus.unsplash.com/premium_photo-1661963054563-ce928e477ff3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3MjAxN3wwfDF8c2VhcmNofDF8fGphaXB1cnxlbnwwfHx8fDE3ODM5MTg0NDV8MA&ixlib=rb-4.1.0&q=85&q=85&fmt=jpg&crop=entropy&cs=tinysrgb&w=450",
      tag: "Cultural Immersion",
      title: "Jaipur",
      days: 8,
    },
    {
      image: "https://images.unsplash.com/photo-1579376254079-3a86c6cd6869?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3MjAxN3wwfDF8c2VhcmNofDh8fGFuZGFtYW4lMjBhbmQlMjBuaWNvYmFyfGVufDB8fHx8MTc4MzkxODUzM3ww&ixlib=rb-4.1.0&q=85&q=85&fmt=jpg&crop=entropy&cs=tinysrgb&w=450",
      tag: "Coastal Retreat",
      title: "Andaman & Nicobar",
      days: 7,
    },
    {
      image: "https://images.unsplash.com/photo-1669021820358-317111184ede?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3MjAxN3wwfDF8c2VhcmNofDd8fGppbSUyMGNvcmJldHR8ZW58MHx8fHwxNzgzOTE4NjYwfDA&ixlib=rb-4.1.0&q=85&q=85&fmt=jpg&crop=entropy&cs=tinysrgb&w=450",
      tag: "Wildlife Adventure",
      title: "Jim Corbett",
      days: 5,
    },
  ];

  return (
    <section className="bg-background px-6 py-section-gap md:px-margin-desktop">
      <div className=" mt-2 mb-8 flex items-end justify-between">
        <div >
          <h2 className="font-display text-2xl font-semibold text-on-surface md:text-3xl">
            Featured Journeys
          </h2>
          <p className="mt-1 max-w-md font-body text-sm text-on-surface-variant">
            Handpicked itineraries blending luxury accommodations with
            authentic, untamed experiences.
          </p>
        </div>
        <a
          href="/destinations"
          className=" items-center gap-1 font-body text-sm font-medium text-primary md:flex hover:underline underline-offset-1"
        >
          View All Destinations <ArrowRight size={14} />
        </a>
      </div>

      <div className=" mt-15 grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3 ">
        {journeys.map((j,i) => (
            <div key={j.title} className={`w-full  ${i === 1 ? "sm:translate-y-4" : "sm:-translate-y-4"}`}>
          <JourneyCard {...j} />
          </div>
        ))}
      </div>
    </section>
  );
}
export default FeaturedJourneys