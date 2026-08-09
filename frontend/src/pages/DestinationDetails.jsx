import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AttractionCard from "../components/attractionCard";
import destinationApi from "../api/destinationApi";
import favoriteApi from "../api/favoritesApi"
import visitedApi from "../api/visitedApi"
import ItineraryCard from "../components/ItineraryCard";

const API_URL = import.meta.env.VITE_API_URL ?? "";

function InfoCard({ icon, title, value }) {
    return (
        <div className="rounded-3xl bg-white/5 border border-white/10 p-6 backdrop-blur-md shadow-xl">
            <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-tertiary-fixed">{icon}</span>
                <h3 className="font-display text-title-lg text-tertiary-fixed">{title}</h3>
            </div>
            <p className="font-body text-body-md text-white/80 leading-relaxed">{value}</p>
        </div>
    );
}

export default function DestinationDetailPage() {
    const { id } = useParams();
    const [destination, setDestination] = useState({
        attractions: [],
        itineraries: [],
    });
    const [favorite, setFavorite] = useState(false);
    const [visited, setVisited] = useState(false);

    useEffect(() => {

        async function get() {
            const response = await destinationApi.getDestinationById(id);
            setDestination(response);
        }

        get();
    }, []);

    useEffect(() => {

        setFavorite(destination.isFavorite ?? false);
        setVisited(destination.isVisited ?? false);

    }, [destination]);

    if (!destination) {
        return (
            <div className="max-w-container-max mx-auto py-24 text-center">
                <h1 className="font-display text-headline-lg mb-4">Destination not found</h1>
                <Link to="/destinations" className="text-primary underline">Back to destinations</Link>
            </div>
        );
    }

    const {
        name,
        city,
        state,
        country,
        description,
        imageUrl,
        category,
        averageRating,
        budgetCategory,
        bestTimeToVisit,
        weather,
        entryRequirements
    } = destination;

    const badge = (text) =>
        text?.replace("-", " ").replace(/\b\w/g, c => c.toUpperCase());

    return (
        <main className="bg-surface">
            <section className="relative h-[90vh] overflow-hidden">
                <img
                    src={`${API_URL}${imageUrl}`}
                    alt={name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/20" />

                <div className="relative z-10 max-w-container-max mx-auto h-full px-margin-desktop flex flex-col justify-end pb-20">
                    <div className="flex flex-wrap gap-3 mb-6">
                        <span className="rounded-full bg-primary/90 px-4 py-2 text-on-primary text-sm">
                            {badge(category)}
                        </span>

                        <span className="rounded-full bg-white/20 backdrop-blur-md px-4 py-2 text-white text-sm">
                            {badge(budgetCategory)}
                        </span>

                        <span className="rounded-full bg-white/20 backdrop-blur-md px-4 py-2 text-white text-sm flex items-center gap-2">
                            <span className="material-symbols-outlined text-yellow-400"
                                style={{ fontVariationSettings: "'FILL' 1" }}>
                                star
                            </span>
                            {averageRating}
                        </span>
                    </div>

                    <h1 className="font-display text-display-lg text-white mb-4">{name}</h1>

                    <p className="text-white/80 text-body-lg mb-8">
                        {[city, state, country].filter(Boolean).join(", ")}
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={async () => {
                                if (favorite) {
                                    await favoriteApi.deleteFavorite({ id });
                                } else {
                                    await favoriteApi.addFavorite({ id });
                                }
                                setFavorite(!favorite);
                            }}
                            className={`rounded-full px-5 py-3 backdrop-blur-md border transition-all ${favorite
                                ? "bg-red-500 text-white border-red-500"
                                : "bg-white/15 text-white border-white/20 hover:bg-white/25"
                                }`}
                        >
                            <span className="material-symbols-outlined align-middle mr-2"
                                style={{ fontVariationSettings: favorite ? "'FILL' 1" : "normal" }}>
                                favorite
                            </span>
                            {favorite ? "Favorited" : "Add to Favorites"}
                        </button>

                        <button
                            onClick={async () => {
                                if (visited) {
                                    await visitedApi.deleteVisited({ id });
                                } else {
                                    await visitedApi.addVisited({ id });
                                }
                                setVisited(!visited);
                            }}
                            className={`rounded-full px-5 py-3 backdrop-blur-md border transition-all ${visited
                                ? "bg-green-600 text-white border-green-600"
                                : "bg-white/15 text-white border-white/20 hover:bg-white/25"
                                }`}
                        >
                            <span className="material-symbols-outlined align-middle mr-2">
                                check_circle
                            </span>
                            {visited ? "Visited" : "Mark as Visited"}
                        </button>
                    </div>
                </div>
            </section>

            <section className="deep-emerald-bg py-24">
                <div className="max-w-container-max mx-auto px-margin-desktop">

                    <div className="mb-20">
                        <h2 className="font-display text-headline-lg text-tertiary-fixed mb-6">
                            About {name}
                        </h2>
                        <p className="text-white/80 text-body-lg leading-loose max-w-4xl">
                            {description}
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4 mb-24">
                        <InfoCard icon="calendar_month" title="Best Time" value={bestTimeToVisit} />
                        <InfoCard icon="partly_cloudy_day" title="Weather" value={weather} />
                        <InfoCard icon="payments" title="Budget" value={badge(budgetCategory)} />
                        <InfoCard icon="badge" title="Entry Requirements" value={entryRequirements} />
                    </div>

                    <section className="mb-24">

                        <h2 className="
                            font-display
                            text-headline-lg
                            text-tertiary-fixed
                            mb-8
                        ">
                            Top Attractions
                        </h2>

                        <div className="
                            grid
                            gap-8
                            md:grid-cols-2
                            xl:grid-cols-3
                        ">

                            {destination.attractions?.map(
                                attraction => (

                                    <AttractionCard
                                        key={attraction.id}
                                        icon={attraction.icon}
                                        name={attraction.name}
                                        description={attraction.description}
                                    />

                                )
                            )}

                        </div>

                    </section>

                    {/* Itineraries */}

                    <section className="mt-12">

                        <div className="mb-8">

                            <h2 className="font-display
                            text-headline-lg
                            text-tertiary-fixed
                            mb-8">
                                Itineraries
                            </h2>

                            <p className="text-white/80 text-body-lg leading-loose max-w-4xl">
                                Explore itineraries created for {destination.name}.
                            </p>

                        </div>

                        {destination.itineraries?.length === 0 ? (

                            <div
                                className="
                                rounded-[2.5rem]
                                border-2
                                border-dashed
                                border-outline/20
                                p-12
                                text-center
                                mb-10
                            "
                            >

                                <span className="material-symbols-outlined text-6xl text-tertiary-fixed mb-4">
                                    route
                                </span>

                                <h3 className="font-display text-headline-md text-white mb-3">
                                    No itineraries yet
                                </h3>

                                <p className="text-white/70">
                                    Be the first to create an itinerary for this destination.
                                </p>

                            </div>

                        ) : (

                            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                                {destination.itineraries.map((itinerary) => (

                                    <ItineraryCard
                                        key={itinerary.id}
                                        itinerary={itinerary}
                                        onDelete={() => { }}
                                    />

                                ))}

                            </div>

                        )}

                    </section>

                    <div className="rounded-[2rem] border border-dashed border-white/20 p-12 text-center">
                        <span className="material-symbols-outlined text-6xl text-tertiary-fixed mb-4">
                            reviews
                        </span>
                        <h3 className="font-display text-headline-md text-white mb-3">
                            Traveller Reviews
                        </h3>
                        <p className="text-white/70">
                            Reviews will appear here once the review system is completed.
                        </p>
                    </div>

                </div>
            </section>
        </main>
    );
}