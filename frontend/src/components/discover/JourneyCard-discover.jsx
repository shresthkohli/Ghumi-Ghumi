import { Clock } from "lucide-react";
import { Link } from "react-router-dom";


export default function JourneyCard({ id, image, tag, title, days, }) {
  return (
    <Link to={`/destinations/${id}`}>
    <div className="relative ">
      <div className="relative h-[240px] sm:h-[280px] md:h-[320px] rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-2">
        <img
          className=" block w-full object-cover h-full transition-transform duration-500 ease-out group-hover:scale-105"
          src={image}
          alt={title}
          loading="lazy"
        />

        <div
          className="absolute inset-0 "
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.65) 20%, transparent 50%)",
          }}
        />

      </div>

      <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
        <span className="mb-1.5 sm:mb-2 inline-block rounded-full bg-white/25 backdrop-blur-lg backdrop-saturate-150 border
         border-white/40 shadow-[0_8px_24px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.6)] px-2.5 sm:px-3 py-0.5 sm:py-1 font-body text-[11px] sm:text-xs font-medium
          text-background">
          {tag}
        </span>
        <h3 className="font-display text-base sm:text-lg font-semibold text-white truncate">
          {title}
        </h3>
        <div className="mt-1 flex items-center gap-1 font-body text-xs text-white/80">
          <Clock size={12} />
          {days} Days
        </div>
      </div>
    </div >
    </Link>
  );
}
