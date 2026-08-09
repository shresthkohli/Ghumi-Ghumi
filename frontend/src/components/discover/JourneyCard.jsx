// A photo card with a dark gradient overlay and a title at the bottom.
// `featured` makes the badge + subtitle show (used for the big Tuscany card).
//
// Hover behavior: image does a gentle scale (not a big zoom), the gradient
// deepens, a warm glow appears around the card edge, and the title lifts
// slightly while the subtitle expands in underneath it.
function JourneyCard({ image, title, badge, subtitle, className = '' }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl shadow-xl group transition-all duration-500 hover:shadow-[0_0_30px_rgba(251,191,36,0.25)] ${className}`}>
        {/* Gradient overlay - deepens on hover so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10 transition-all duration-500 group-hover:from-black/90" />

        <img
            src={image}
            alt={title}
            className="w-full h-full object-cover scale-110 transition-transform duration-[3000ms] ease-out group-hover:scale-125 group-hover:translate-x-2"
        />

        <div className="absolute bottom-6 left-6 right-6 z-20 transition-transform duration-500 group-hover:-translate-y-2">
            {badge && (
            <span className="bg-primary px-3 py-1 rounded-full text-white text-xs mb-2 inline-block">
                {badge}
            </span>
            )}
            <h3 className="font-display text-white text-2xl font-bold">{title}</h3>

            {/* Subtitle is collapsed by default (max-h-0, opacity-0) and expands
                in on hover. max-h is used instead of `hidden` because you can't
                transition to/from `display: none` - this way it animates smoothly. */}
            {subtitle && (
                <p className="text-white/80 text-sm mt-1 max-h-0 opacity-0 overflow-hidden group-hover:max-h-20 group-hover:opacity-100 transition-all duration-500">
                    {subtitle}
                </p>
            )}
        </div>
    </div>
  );
}

export default JourneyCard;