// A photo card with a dark gradient overlay and a title at bottom.
// 'featured' makes the badge + subtitle show (used for the big cards)

function JourneyCard({ image, title, badge, subtitle, className = '' }) {
    return (
        <div className="{`relative overflow-hidden rounded-3xl shadow-x1 group ${className}`}">

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />

            <img 
                src={image}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />

            <div className="absolute bottom-6 left-6 z-20">
                {badge && (
                    <span className="bg-primary px-3 py-1 rounded-full text-white text-xs mb-2 inline-block">
                        {badge}
                    </span>
                )}
                <h3 className="font-display text-white text-2xl font-bold">{title}</h3>
                {subtitle && <p className="text-white/80 text-sm mt-1">{subtitle}</p>}
            </div>

        </div>
    )
}

export default JourneyCard;