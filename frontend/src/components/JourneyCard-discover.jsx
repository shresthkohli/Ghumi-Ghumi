import {Clock} from "lucide-react";
export default function JourneyCard({ image, tag, title, days,}) {
  return (
    <div className="relative ">
      <div className="relative h-[320px] rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-2">
      <img
        className=" block w-full object-cover h-full transition-transform duration-500 ease-out group-hover:scale-105"
        src={image}
      />
       <div
        className="absolute inset-0 "
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.55) 20%, transparent 45%)",
        }}
      />
      </div>

      <div className="absolute bottom-4 left-4 right-4">
        <span className="mb-2 inline-block rounded-full bg-white/25 backdrop-blur-lg backdrop-saturate-150 border
         border-white/40 shadow-[0_8px_24px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.6)] px-3 py-1 font-body text-xs font-medium
          text-background">
          {tag}
        </span>
        <h3 className="font-display text-lg font-semibold text-white">
          {title}
        </h3>
        <div className="mt-1 flex items-center gap-1 font-body text-xs text-white/80">
          <Clock size={12} />
          {days} Days
        </div>
      </div>
    </div>
  );
}

