// import { useParams, Link } from "react-router-dom";
// import destinationApi from "../api/destinationApi";
// import HighlightCard from "../components/HighlightCard";
// import BookingWidget from "../components/BookingWidget";
// const API_URL = import.meta.env.VITE_API_URL ?? "";

// export default function DestinationDetailPage() {
//     const { id } = useParams();
//     const destination = destinationApi.getDestinationById(id);

//     if (!destination) {
//         return (
//         <div className="max-w-container-max mx-auto px-margin-desktop py-section-gap text-center">
//             <h1 className="font-display text-headline-lg text-on-surface mb-4">Destination not found</h1>
//             <p className="font-body text-body-md text-on-surface-variant mb-8">
//             We couldn't find that destination. It may have been removed or the link is outdated.
//             </p>
//             <Link to="/destinations" className="font-body text-label-lg text-primary underline">
//             Back to all destinations
//             </Link>
//         </div>
//         );
//     }

//     const {
//         name,
//         country,
//         tagline,
//         description,
//         imageUrl,
//         category,
//         avgRating,
//         reviewCount,
//         highlights,
//         storyTitle,
//         storyText,
//         storyImage,
//         storyImageCaption,
//     } = destination;


//     return (
//         <main>
//         {/* Hero */}
//         <section className="hero-mask relative h-[870px] overflow-hidden">
//             <div className="absolute inset-0 z-0">
//                 <img className="h-full w-full object-cover" src={`${API_URL}${imageUrl}`} alt={name} />
//                 <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
//             </div>
//             <div className="max-w-container-max px-margin-desktop relative z-10 mx-auto flex h-full flex-col justify-end pb-32">
//                 <div className="max-w-2xl">
//                     <div className="mb-4 flex items-center gap-2">
//                         <span className="font-body text-label-md rounded-full bg-tertiary px-3 py-1 text-on-tertiary">
//                             {category ?? country}
//                         </span>
//                         <span className="font-body text-label-md flex items-center gap-1 text-white">
//                             <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
//                             star
//                             </span>
//                             {avgRating} ({(reviewCount / 1000).toFixed(1)}k Reviews)
//                         </span>
//                     </div>
//                     <h1 className="font-display text-display-lg mb-6 text-white">{name} : {tagline ?? name}</h1>
//                     <p className="font-body text-body-lg max-w-xl leading-relaxed text-white/90">{description}</p>
//                 </div>
//             </div>
//         </section>

//         {/* Main content: highlights + story on the left, booking widget on the right */}
//         <section className="deep-emerald-bg relative -mt-24 pb-section-gap pt-32">
//             <div className="max-w-container-max px-margin-desktop gap-gutter mx-auto grid grid-cols-1 lg:grid-cols-12">
//                 <div className="space-y-16 lg:col-span-7">
//                     <div>
//                         <h2 className="font-display text-headline-lg text-tertiary-fixed mb-10">Curated Highlights</h2>
//                         {/*<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
//                             {highlights.map((highlight) => (
//                             <HighlightCard
//                                 key={highlight.title}
//                                 icon={highlight.icon}
//                                 title={highlight.title}
//                                 description={highlight.description}
//                             />
//                             ))}
//                         </div>*/}
//                     </div>

//                     <div>
//                     <h2 className="font-display text-headline-lg text-tertiary-fixed mb-6">{storyTitle}</h2>
//                     <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
//                         <p className="font-body text-body-lg leading-loose text-white/80">{storyText}</p>
//                         <div className="relative overflow-hidden rounded-2xl shadow-2xl">
//                         <img className="h-auto w-full" src={storyImage} alt={storyImageCaption} />
//                             <div className="font-body text-label-md absolute bottom-4 right-4 rounded bg-white/20 px-3 py-1 text-white backdrop-blur-md">
//                                 {storyImageCaption}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/*<div className="lg:col-span-5 lg:pl-12">
//                 <BookingWidget destination={destination} />
//             </div>*/}
//             </div>
//         </section>
//         </main>
//     );
// }


import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import destinationApi from "../api/destinationApi";

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
    const [destination, setDestination] = useState({});
    const [favorite, setFavorite] = useState(destination?.isFavorite ?? false);
    const [visited, setVisited] = useState(destination?.isVisited ?? false);

    useEffect(() => {

        async function get() {
            const response = await destinationApi.getDestinationById(id);
            setDestination(response);
        }

        get();
    }, []);

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
                            onClick={() => setFavorite(v => !v)}
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
                            onClick={() => setVisited(v => !v)}
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

                    <div className="rounded-[2rem] border border-dashed border-white/20 p-12 text-center mb-10">
                        <span className="material-symbols-outlined text-6xl text-tertiary-fixed mb-4">
                            route
                        </span>
                        <h3 className="font-display text-headline-md text-white mb-3">
                            Curated Itineraries
                        </h3>
                        <p className="text-white/70">
                            This section is under development and will soon feature curated travel plans.
                        </p>
                    </div>

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