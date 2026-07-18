const API_URL = import.meta.env.VITE_API_URL ?? "";

// Card that shows destination, pass featured if card needed to be a hero card

function DestinationCard({ destination, featured=false }) {

    const {
        name,
        city,
        country,
        description,
        imageUrl,
        category,
        bestTimeToVisit,
        avgRating,
        budgetCategory,
    } = destination;

    if (featured) {

        return (

            <div className="lg:col-span-2 group relative h-125 rounded-[2.5rem] overflow-hidden shadow-2xl">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${API_URL}${imageUrl})` }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-on-surface/90 via-on-surface/20 to-transparent" />

                <div className="absolute bottom-0 left-0 p-10 w-full flex flex-col md:flex-row justify-between items-end gap-6">
                    <div className="max-w-xl">
                        <div className="flex gap-2 md-4">
                            <span className="bg-primary/90 text-on-primary px-3 py-1 rounded-full text-label-md uppercase tracking-wider">
                                Editor's Choise
                            </span>
                            <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-label-md uppercase tracking-wider">
                                {category}
                            </span>
                        </div>
                        <h2 className="font-display text-display-md text-white mb-2">
                            {name}
                        </h2>
                        <p className="text-white/70 font-body text-label-md mb-2"> 
                            {city}, {country}
                        </p>
                        <p className="text-white/80 font-body text-body-md line-clamp-2">
                            {description}
                        </p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                        <span className="flex items-center gap-1 text-white font-bold text-lg">
                            <span
                                className="material-symbols-outlined text-yellow-400 text-lg" 
                                style={{ fontVariationSettings: "'FILL' 1"}}
                            >
                                star
                            </span>
                            {avgRating}
                        </span>
                        <span className="text-white/60 text-sm">
                            {budgetCategory}
                        </span>
                        <span className="text-white/60 text-sm mr-12">
                            Best time:
                        </span>
                        <span className="text-white/60 text-sm">
                            {bestTimeToVisit}
                        </span>
                        <button className="mt-4 bg-white text-on-surface px-8 py-3 rounded-full font-body text-label-lg hover:bg-primary-fixed transition-colors">
                            Explore Destination
                        </button>
                    </div>
                </div>
                
            </div>
        )
    }

    return (

        <div className="group relative h-105 rounded-4xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl">
            <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${API_URL}${imageUrl})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-on-surface/90 via-transparent to-transparent" />

            <div className="absolute top-4 right-4 h-10 w-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-primary transition-colors">
                <span className="material-symbols-outlined">favorite</span>
            </div>

            <div className="absolute bottom-0 p-8 w-full">
                <span className="text-primary-fixed font-body text-label-md uppercase tracking-widest mb-2 block">
                    {category}
                </span>
                <h3 className="font-display text-headline-md text-white mb-1">
                    {name}
                </h3>
                <p className="text-white/60 text-sm mb-4">
                    {city}, {country}
                </p>
                <div className="flex justify-between items-center">
                    <span className="text-white text-sm">
                        {budgetCategory}
                    </span>
                    <span className="flex items-center gap-1 text-white text-sm">
                        <span
                            className="material-symbols-outlined text-yellow-400 text-sm"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                            star
                        </span>
                        {avgRating}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default DestinationCard;