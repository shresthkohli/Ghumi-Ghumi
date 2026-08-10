const API_URL = import.meta.env.VITE_API_URL ?? "";
import { Link } from "react-router-dom";

import favoritesApi from "../../api/favoritesApi";
import apiFetch from "../../api/apiClient";

// Card that shows destination, pass featured if card needed to be a hero card

function DestinationCard({ destination, featured = false }) {

    const {
        id,
        name,
        city,
        country,
        description,
        imageUrl,
        category,
        bestTimeToVisit,
        avgRating,
        budgetCategory,
        isFavotite,
    } = destination;

    async function handleLike(e) {

        const id = destination.id;

        // async function addFavorite(credentials) {

        //     return apiFetch(
        //         `/api/favorites/${id}`,
        //         {
        //             method: "POST"
        //         }
        //     );
        // }
        
        // addFavorite();

        await favoritesApi.addFavorite({
                destinationId: id
        });

        console.log(await favoritesApi.getAllFavDestinations());
    }

    return (
        <Link to={`/destinations/${destination.id}`}>
            <div className="group relative h-80 sm:h-96 md:h-105 rounded-3xl sm:rounded-4xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${API_URL}${imageUrl})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                <div className="absolute top-4 right-4 h-9 w-9 sm:h-10 sm:w-10 bg-white/15 backdrop-blur-md rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-primary transition-colors shadow-md">
                    <span className="material-symbols-outlined text-sm sm:text-base">favorite</span>
                </div>

                <div className="absolute bottom-0 p-5 sm:p-7 md:p-8 w-full">
                    <span className="text-primary-fixed font-body text-xs sm:text-label-md uppercase tracking-widest mb-1 sm:mb-2 block font-semibold">
                        {category}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl md:text-headline-md text-white mb-1 font-bold">
                        {name}
                    </h3>
                    <p className="text-white/70 text-xs sm:text-sm mb-3 sm:mb-4">
                        {city}, {country}
                    </p>
                    <div className="flex justify-between items-center text-xs sm:text-sm">
                        <span className="text-white/80 font-medium">
                            {budgetCategory}
                        </span>
                        <span className="flex items-center gap-1 text-white font-semibold">
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
        </Link>
    );
}

export default DestinationCard;