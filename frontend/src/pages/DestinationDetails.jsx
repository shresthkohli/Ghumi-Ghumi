import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import AttractionCard from "../components/destination/AttractionCard";
import destinationApi from "../api/destinationApi";
import favoriteApi from "../api/favoritesApi";
import visitedApi from "../api/visitedApi";
import ItineraryCard from "../components/itinerary/ItineraryCard";
import reviewApi from "../api/reviewApi";
import ReviewSection from "../components/reviews/ReviewSection";

const API_URL = import.meta.env.VITE_API_URL ?? "";

function InfoCard({ icon, title, value }) {
    return (
        <div
            data-animate-info-card
            className="group relative rounded-3xl bg-white/5 border border-white/10 p-6 backdrop-blur-md shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/10 hover:border-tertiary-fixed/30 hover:shadow-2xl"
        >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-gradient-to-r from-transparent via-tertiary-fixed/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="flex items-center gap-3.5 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-tertiary-fixed/15 text-tertiary-fixed group-hover:scale-105 group-hover:bg-tertiary-fixed group-hover:text-tertiary-dark transition-all duration-300">
                    <span className="material-symbols-outlined text-xl">{icon}</span>
                </div>
                <h3 className="font-display text-lg font-bold text-tertiary-fixed">{title}</h3>
            </div>
            <p className="font-body text-sm md:text-base text-white/85 leading-relaxed pl-1">
                {value || "Not specified"}
            </p>
        </div>
    );
}

export default function DestinationDetailPage() {
    const { id } = useParams();
    const [destination, setDestination] = useState(null);
    const [loading, setLoading] = useState(true);
    const [favorite, setFavorite] = useState(false);
    const [visited, setVisited] = useState(false);
    const [favLoading, setFavLoading] = useState(false);
    const [visitedLoading, setVisitedLoading] = useState(false);

    const pageRef = useRef(null);
    const heroImageRef = useRef(null);
    const favBtnRef = useRef(null);
    const visitedBtnRef = useRef(null);

    useEffect(() => {
        let isMounted = true;

        async function fetchDestination() {
            try {
                setLoading(true);
                const response = await destinationApi.getDestinationById(id);
                if (isMounted) {
                    setDestination(response);
                    setFavorite(response?.isFavorite ?? false);
                    setVisited(response?.isVisited ?? false);
                }
            } catch (error) {
                console.error("Failed to load destination details:", error);
            } finally {
                if (isMounted) setLoading(false);
            }
        }

        fetchDestination();
        return () => {
            isMounted = false;
        };
    }, [id]);

    // GSAP Entrance Animations
    useGSAP(
        () => {
            if (loading || !destination || !pageRef.current) return;

            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // 1. Hero Image subtle scale down entrance
            if (heroImageRef.current) {
                gsap.fromTo(
                    heroImageRef.current,
                    { scale: 1.12, opacity: 0.4 },
                    { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" }
                );
            }

            // 2. Hero Content Stagger
            tl.fromTo(
                pageRef.current.querySelectorAll("[data-animate-hero-badge]"),
                { opacity: 0, y: 20, scale: 0.9 },
                { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08 },
                "-=0.8"
            );

            tl.fromTo(
                pageRef.current.querySelectorAll("[data-animate-hero-title]"),
                { opacity: 0, y: 30, filter: "blur(4px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7 },
                "-=0.3"
            );

            tl.fromTo(
                pageRef.current.querySelectorAll("[data-animate-hero-location]"),
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5 },
                "-=0.4"
            );

            tl.fromTo(
                pageRef.current.querySelectorAll("[data-animate-hero-btn]"),
                { opacity: 0, y: 25, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.1 },
                "-=0.3"
            );

            // 3. About Section & Quick Info Cards
            tl.fromTo(
                pageRef.current.querySelectorAll("[data-animate-about]"),
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6 },
                "-=0.2"
            );

            tl.fromTo(
                pageRef.current.querySelectorAll("[data-animate-info-card]"),
                { opacity: 0, y: 30, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.09 },
                "-=0.35"
            );

            // 4. Top Attractions
            tl.fromTo(
                pageRef.current.querySelectorAll("[data-animate-attraction]"),
                { opacity: 0, y: 30, scale: 0.97 },
                { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1 },
                "-=0.3"
            );

            // 5. Itineraries Section
            tl.fromTo(
                pageRef.current.querySelectorAll("[data-animate-itinerary]"),
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
                "-=0.3"
            );

            // 6. Review Section
            tl.fromTo(
                pageRef.current.querySelectorAll("[data-animate-reviews]"),
                { opacity: 0, y: 35 },
                { opacity: 1, y: 0, duration: 0.7 },
                "-=0.2"
            );
        },
        { scope: pageRef, dependencies: [loading, destination] }
    );

    async function handleToggleFavorite() {
        if (favLoading) return;
        try {
            setFavLoading(true);
            const nextFav = !favorite;
            if (favorite) {
                await favoriteApi.deleteFavorite({ id });
            } else {
                await favoriteApi.addFavorite({ id });
            }
            setFavorite(nextFav);

            if (favBtnRef.current) {
                gsap.fromTo(
                    favBtnRef.current,
                    { scale: 0.9 },
                    { scale: 1, duration: 0.4, ease: "back.out(2)" }
                );
            }
        } catch (err) {
            console.error("Error toggling favorite:", err);
        } finally {
            setFavLoading(false);
        }
    }

    async function handleToggleVisited() {
        if (visitedLoading) return;
        try {
            setVisitedLoading(true);
            const nextVisited = !visited;
            if (visited) {
                await visitedApi.deleteVisited({ id });
            } else {
                await visitedApi.addVisited({ id });
            }
            setVisited(nextVisited);

            if (visitedBtnRef.current) {
                gsap.fromTo(
                    visitedBtnRef.current,
                    { scale: 0.9 },
                    { scale: 1, duration: 0.4, ease: "back.out(2)" }
                );
            }
        } catch (err) {
            console.error("Error toggling visited:", err);
        } finally {
            setVisitedLoading(false);
        }
    }

    async function handleCreateReview(reviewData) {
        const newReview = await reviewApi.createReview(id, reviewData);
        if (newReview) {
            setDestination((prev) => ({
                ...prev,
                reviews: [newReview, ...(prev?.reviews || [])],
            }));
        }
    }

    async function handleUpdateReview(reviewId, reviewData) {
        const updatedReview = await reviewApi.updateReview(reviewId, reviewData);
        if (updatedReview) {
            setDestination((prev) => ({
                ...prev,
                reviews: (prev?.reviews || []).map((r) =>
                    r.id === reviewId ? updatedReview : r
                ),
            }));
        }
    }

    async function handleDeleteReview(reviewId) {
        const success = await reviewApi.deleteReview(reviewId);
        if (success !== null) {
            setDestination((prev) => ({
                ...prev,
                reviews: (prev?.reviews || []).filter((r) => r.id !== reviewId),
            }));
        }
    }

    // Loading Skeleton
    if (loading) {
        return (
            <main className="min-h-screen bg-surface">
                {/* Hero Skeleton */}
                <div className="relative h-[85vh] w-full bg-surface-container animate-pulse overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    <div className="relative z-10 max-w-container-max mx-auto h-full px-margin-mobile md:px-margin-desktop flex flex-col justify-end pb-20 space-y-4">
                        <div className="flex gap-3">
                            <div className="h-8 w-28 rounded-full bg-white/20" />
                            <div className="h-8 w-24 rounded-full bg-white/20" />
                        </div>
                        <div className="h-16 w-3/4 max-w-xl rounded-2xl bg-white/20" />
                        <div className="h-6 w-1/3 rounded-full bg-white/20" />
                    </div>
                </div>

                {/* Body Skeleton */}
                <div className="deep-emerald-bg py-24">
                    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop space-y-12">
                        <div className="space-y-4 max-w-3xl">
                            <div className="h-10 w-64 rounded-xl bg-white/10" />
                            <div className="h-24 w-full rounded-2xl bg-white/5" />
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                            {[1, 2, 3, 4].map((n) => (
                                <div key={n} className="h-32 rounded-3xl bg-white/5 animate-pulse" />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    // Destination Not Found
    if (!destination) {
        return (
            <main className="min-h-screen bg-surface flex items-center justify-center py-24 px-4 text-center">
                <div className="max-w-md mx-auto">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 text-primary mb-5">
                        <span className="material-symbols-outlined text-4xl">travel_explore</span>
                    </div>
                    <h1 className="font-display text-headline-lg text-on-surface mb-3">
                        Destination Not Found
                    </h1>
                    <p className="font-body text-sm text-on-surface-variant mb-6 leading-relaxed">
                        We couldn't find the destination you're searching for. It may have been relocated or removed.
                    </p>
                    <Link
                        to="/destinations"
                        className="glossy-button inline-flex items-center gap-2 rounded-full px-7 py-3 font-body text-sm font-semibold text-on-primary hover:scale-105 transition-transform"
                    >
                        <span className="material-symbols-outlined text-base">arrow_back</span>
                        Explore All Destinations
                    </Link>
                </div>
            </main>
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
        entryRequirements,
        attractions = [],
        itineraries = [],
        reviews = [],
    } = destination;

    const badge = (text) =>
        text?.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase());

    const locationText = [city, state, country].filter(Boolean).join(", ");

    return (
        <main ref={pageRef} className="bg-surface overflow-x-hidden">
            {/* ─── Hero Section ─── */}
            <section className="relative h-[88vh] min-h-[580px] overflow-hidden">
                <img
                    ref={heroImageRef}
                    src={imageUrl?.startsWith("http") ? imageUrl : `${API_URL}${imageUrl}`}
                    alt={name}
                    className="absolute inset-0 h-full w-full object-cover will-change-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/25" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

                <div className="relative z-10 max-w-container-max mx-auto h-full px-margin-mobile md:px-margin-desktop flex flex-col justify-end pb-16 md:pb-20">
                    {/* Badge Chips */}
                    <div className="flex flex-wrap gap-2.5 mb-5">
                        {category && (
                            <span
                                data-animate-hero-badge
                                className="inline-flex items-center gap-1.5 rounded-full bg-primary/95 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-on-primary shadow-lg backdrop-blur-md"
                            >
                                <span className="material-symbols-outlined text-[15px]">explore</span>
                                {badge(category)}
                            </span>
                        )}

                        {budgetCategory && (
                            <span
                                data-animate-hero-badge
                                className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20 px-4 py-1.5 text-xs font-semibold text-white shadow-lg"
                            >
                                <span className="material-symbols-outlined text-[15px]">payments</span>
                                {badge(budgetCategory)}
                            </span>
                        )}

                        {averageRating > 0 && (
                            <span
                                data-animate-hero-badge
                                className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20 px-4 py-1.5 text-xs font-bold text-white shadow-lg"
                            >
                                <span
                                    className="material-symbols-outlined text-amber-400 text-[16px]"
                                    style={{ fontVariationSettings: "'FILL' 1" }}
                                >
                                    star
                                </span>
                                {Number(averageRating).toFixed(1)}
                            </span>
                        )}
                    </div>

                    {/* Destination Title */}
                    <h1
                        data-animate-hero-title
                        className="font-display text-4xl sm:text-5xl md:text-display-lg text-white font-bold mb-3 tracking-tight drop-shadow-md max-w-4xl"
                    >
                        {name}
                    </h1>

                    {/* Location Subtitle */}
                    {locationText && (
                        <p
                            data-animate-hero-location
                            className="text-white/85 font-body text-base md:text-body-lg mb-8 flex items-center gap-2 drop-shadow-sm"
                        >
                            <span className="material-symbols-outlined text-primary-fixed text-lg">
                                location_on
                            </span>
                            {locationText}
                        </p>
                    )}

                    {/* Action Buttons: Favorites & Visited */}
                    <div className="flex flex-wrap items-center gap-3.5">
                        <button
                            ref={favBtnRef}
                            data-animate-hero-btn
                            type="button"
                            onClick={handleToggleFavorite}
                            disabled={favLoading}
                            className={`inline-flex items-center gap-2 rounded-full px-6 py-3 font-body text-sm font-semibold backdrop-blur-md border transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-lg ${
                                favorite
                                    ? "bg-red-500 text-white border-red-500 shadow-red-500/30"
                                    : "bg-white/15 text-white border-white/25 hover:bg-white/25 hover:border-white/40"
                            }`}
                        >
                            <span
                                className={`material-symbols-outlined text-lg transition-transform duration-300 ${favorite ? "scale-110" : ""}`}
                                style={{ fontVariationSettings: favorite ? "'FILL' 1" : "normal" }}
                            >
                                favorite
                            </span>
                            {favorite ? "Favorited" : "Add to Favorites"}
                        </button>

                        <button
                            ref={visitedBtnRef}
                            data-animate-hero-btn
                            type="button"
                            onClick={handleToggleVisited}
                            disabled={visitedLoading}
                            className={`inline-flex items-center gap-2 rounded-full px-6 py-3 font-body text-sm font-semibold backdrop-blur-md border transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-lg ${
                                visited
                                    ? "bg-emerald-600 text-white border-emerald-600 shadow-emerald-600/30"
                                    : "bg-white/15 text-white border-white/25 hover:bg-white/25 hover:border-white/40"
                            }`}
                        >
                            <span
                                className={`material-symbols-outlined text-lg transition-transform duration-300 ${visited ? "scale-110" : ""}`}
                                style={{ fontVariationSettings: visited ? "'FILL' 1" : "normal" }}
                            >
                                check_circle
                            </span>
                            {visited ? "Visited" : "Mark as Visited"}
                        </button>
                    </div>
                </div>
            </section>

            {/* ─── Body Details Section ─── */}
            <section className="deep-emerald-bg py-20 md:py-28 relative">
                {/* Ambient glow in dark emerald container */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-tertiary/15 blur-[120px] pointer-events-none rounded-full" />

                <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop space-y-24">
                    {/* 1. About Description */}
                    <div data-animate-about className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-tertiary-fixed mb-4">
                            <span className="material-symbols-outlined text-sm">menu_book</span>
                            Overview
                        </div>
                        <h2 className="font-display text-3xl md:text-headline-lg text-tertiary-fixed mb-6 font-bold">
                            About {name}
                        </h2>
                        <p className="text-white/85 font-body text-base md:text-body-lg leading-relaxed md:leading-loose">
                            {description}
                        </p>
                    </div>

                    {/* 2. Quick Info Cards Grid */}
                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                        <InfoCard icon="calendar_month" title="Best Time" value={bestTimeToVisit} />
                        <InfoCard icon="partly_cloudy_day" title="Weather" value={weather} />
                        <InfoCard icon="payments" title="Budget" value={badge(budgetCategory)} />
                        <InfoCard icon="badge" title="Entry Requirements" value={entryRequirements} />
                    </div>

                    {/* 3. Top Attractions */}
                    {attractions?.length > 0 && (
                        <section data-animate-attraction>
                            <div className="flex items-end justify-between mb-8 pb-4 border-b border-white/10">
                                <div>
                                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-tertiary-fixed mb-2">
                                        <span className="material-symbols-outlined text-sm">photo_camera</span>
                                        Highlights
                                    </div>
                                    <h2 className="font-display text-3xl md:text-headline-lg text-tertiary-fixed font-bold">
                                        Top Attractions
                                    </h2>
                                </div>
                                <span className="font-body text-xs font-semibold text-white/60">
                                    {attractions.length} {attractions.length === 1 ? "Spot" : "Spots"} to Explore
                                </span>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                {attractions.map((attraction) => (
                                    <div key={attraction.id} data-animate-attraction>
                                        <AttractionCard
                                            icon={attraction.icon}
                                            name={attraction.name}
                                            description={attraction.description}
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* 4. Itineraries */}
                    <section data-animate-itinerary>
                        <div className="flex items-end justify-between mb-8 pb-4 border-b border-white/10">
                            <div>
                                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-tertiary-fixed mb-2">
                                    <span className="material-symbols-outlined text-sm">route</span>
                                    Curated Trips
                                </div>
                                <h2 className="font-display text-3xl md:text-headline-lg text-tertiary-fixed font-bold">
                                    Featured Itineraries
                                </h2>
                                <p className="text-white/75 font-body text-sm md:text-base mt-1">
                                    Explore step-by-step travel blueprints crafted for {name}.
                                </p>
                            </div>
                        </div>

                        {itineraries.length === 0 ? (
                            <div className="rounded-[2.5rem] border-2 border-dashed border-white/20 bg-white/5 p-12 text-center backdrop-blur-md">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-tertiary-fixed/15 text-tertiary-fixed mb-4">
                                    <span className="material-symbols-outlined text-4xl">route</span>
                                </div>
                                <h3 className="font-display text-2xl font-bold text-white mb-2">
                                    No itineraries yet
                                </h3>
                                <p className="font-body text-sm text-white/70 max-w-md mx-auto">
                                    Be the first explorer to craft a custom day-by-day journey for this destination.
                                </p>
                            </div>
                        ) : (
                            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                {itineraries.map((itinerary) => (
                                    <div key={itinerary.id} data-animate-itinerary>
                                        <ItineraryCard
                                            itinerary={itinerary}
                                            onDelete={() => {}}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* 5. Reviews Section */}
                    <div data-animate-reviews>
                        <ReviewSection
                            destination={destination}
                            reviews={reviews}
                            onCreateReview={handleCreateReview}
                            onUpdateReview={handleUpdateReview}
                            onDeleteReview={handleDeleteReview}
                        />
                    </div>
                </div>
            </section>
        </main>
    );
}