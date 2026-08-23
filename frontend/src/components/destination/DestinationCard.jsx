const API_URL = import.meta.env.VITE_API_URL ?? "";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import favoritesApi from "../../api/favoritesApi";
import { useAuth } from "../../context/AuthContext";

// Card that shows destination, pass featured if card needed to be a hero card
function DestinationCard({ destination, featured = false, onRequireLogin, onToggleFavorite }) {
    const { user } = useAuth();
    const [isFavorite, setIsFavorite] = useState(
        Boolean(destination?.isFavorite ?? destination?.isFavotite)
    );
    const [isProcessing, setIsProcessing] = useState(false);
    const heartRef = useRef(null);

    useEffect(() => {
        setIsFavorite(Boolean(destination?.isFavorite ?? destination?.isFavotite));
    }, [destination?.isFavorite, destination?.isFavotite]);

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
    } = destination;

    async function handleLike(e) {
        e.preventDefault();
        e.stopPropagation();

        if (!user) {
            if (onRequireLogin) {
                onRequireLogin();
            }
            return;
        }

        if (isProcessing) return;

        const nextState = !isFavorite;
        setIsFavorite(nextState);
        setIsProcessing(true);

        if (heartRef.current) {
            gsap.fromTo(
                heartRef.current,
                { scale: 0.7 },
                { scale: 1, duration: 0.4, ease: "back.out(2)" }
            );
        }

        try {
            if (nextState) {
                await favoritesApi.addFavorite({ id: destination.id });
            } else {
                await favoritesApi.deleteFavorite({ id: destination.id });
            }
            if (onToggleFavorite) {
                onToggleFavorite(destination.id, nextState);
            }
        } catch (err) {
            console.error("Failed to update favorite:", err);
            setIsFavorite(!nextState);
        } finally {
            setIsProcessing(false);
        }
    }

    return (
        <Link to={`/destinations/${destination.id}`}>
            <div className="group relative h-80 sm:h-96 md:h-105 rounded-3xl sm:rounded-4xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${API_URL}${imageUrl})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                <button
                    ref={heartRef}
                    type="button"
                    onClick={handleLike}
                    disabled={isProcessing}
                    title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    className={`absolute top-4 right-4 h-9 w-9 sm:h-10 sm:w-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer z-10 ${isFavorite
                            ? "bg-red-500 text-white shadow-red-500/30 scale-105 hover:bg-red-600 hover:scale-110"
                            : "bg-white/15 backdrop-blur-md text-white border border-white/20 hover:bg-white/30 hover:scale-105"
                        }`}
                >
                    <span
                        className="material-symbols-outlined text-base sm:text-lg transition-transform duration-200"
                        style={{ fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0" }}
                    >
                        favorite
                    </span>
                </button>

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