import { useParams, Link } from "react-router-dom";
import destinationApi from "../api/destinationApi";
import HighlightCard from "../components/HighlightCard";
import BookingWidget from "../components/BookingWidget";
const API_URL = import.meta.env.VITE_API_URL ?? "";

export default function DestinationDetailPage() {
    const { id } = useParams();
    const destination = destinationApi.getDestinationById(id);

    if (!destination) {
        return (
        <div className="max-w-container-max mx-auto px-margin-desktop py-section-gap text-center">
            <h1 className="font-display text-headline-lg text-on-surface mb-4">Destination not found</h1>
            <p className="font-body text-body-md text-on-surface-variant mb-8">
            We couldn't find that destination. It may have been removed or the link is outdated.
            </p>
            <Link to="/destinations" className="font-body text-label-lg text-primary underline">
            Back to all destinations
            </Link>
        </div>
        );
    }

    const {
        name,
        country,
        tagline,
        description,
        imageUrl,
        category,
        avgRating,
        reviewCount,
        highlights,
        storyTitle,
        storyText,
        storyImage,
        storyImageCaption,
    } = destination;
    

    return (
        <main>
        {/* Hero */}
        <section className="hero-mask relative h-[870px] overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img className="h-full w-full object-cover" src={`${API_URL}${imageUrl}`} alt={name} />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
            </div>
            <div className="max-w-container-max px-margin-desktop relative z-10 mx-auto flex h-full flex-col justify-end pb-32">
                <div className="max-w-2xl">
                    <div className="mb-4 flex items-center gap-2">
                        <span className="font-body text-label-md rounded-full bg-tertiary px-3 py-1 text-on-tertiary">
                            {category ?? country}
                        </span>
                        <span className="font-body text-label-md flex items-center gap-1 text-white">
                            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                            star
                            </span>
                            {avgRating} ({(reviewCount / 1000).toFixed(1)}k Reviews)
                        </span>
                    </div>
                    <h1 className="font-display text-display-lg mb-6 text-white">{name} : {tagline ?? name}</h1>
                    <p className="font-body text-body-lg max-w-xl leading-relaxed text-white/90">{description}</p>
                </div>
            </div>
        </section>

        {/* Main content: highlights + story on the left, booking widget on the right */}
        <section className="deep-emerald-bg relative -mt-24 pb-section-gap pt-32">
            <div className="max-w-container-max px-margin-desktop gap-gutter mx-auto grid grid-cols-1 lg:grid-cols-12">
                <div className="space-y-16 lg:col-span-7">
                    <div>
                        <h2 className="font-display text-headline-lg text-tertiary-fixed mb-10">Curated Highlights</h2>
                        {/*<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            {highlights.map((highlight) => (
                            <HighlightCard
                                key={highlight.title}
                                icon={highlight.icon}
                                title={highlight.title}
                                description={highlight.description}
                            />
                            ))}
                        </div>*/}
                    </div>

                    <div>
                    <h2 className="font-display text-headline-lg text-tertiary-fixed mb-6">{storyTitle}</h2>
                    <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
                        <p className="font-body text-body-lg leading-loose text-white/80">{storyText}</p>
                        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                        <img className="h-auto w-full" src={storyImage} alt={storyImageCaption} />
                            <div className="font-body text-label-md absolute bottom-4 right-4 rounded bg-white/20 px-3 py-1 text-white backdrop-blur-md">
                                {storyImageCaption}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*<div className="lg:col-span-5 lg:pl-12">
                <BookingWidget destination={destination} />
            </div>*/}
            </div>
        </section>
        </main>
    );
}