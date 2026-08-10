import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import ItineraryCard from "../components/itinerary/ItineraryCard";
import CreateItineraryModal from "../components/itinerary/CreateItineraryModal";
import LoginModal from "../components/auth/LoginModal";
import itinerariesApi from "../api/itinerariesApi";
import { useAuth } from "../context/AuthContext";

gsap.registerPlugin(ScrollTrigger, SplitText);

function Itineraries() {
    const { user, loading: authLoading } = useAuth();
    const [itineraries, setItineraries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const mainRef = useRef(null);
    const badgeRef = useRef(null);
    const titleRef = useRef(null);
    const descRef = useRef(null);
    const gridRef = useRef(null);
    const authPromptRef = useRef(null);

    useEffect(() => {
        if (!authLoading) {
            if (user) {
                loadItineraries();
            } else {
                setLoading(false);
                setItineraries([]);
                setError("");
            }
        }
    }, [user, authLoading]);

    // GSAP Hero Animation on mount using useGSAP
    useGSAP(
        () => {
            let split;
            if (titleRef.current) {
                split = new SplitText(titleRef.current, { type: "words, chars" });
            }

            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // 1. Badge slide in
            if (badgeRef.current) {
                tl.fromTo(
                    badgeRef.current,
                    { opacity: 0, y: -15, filter: "blur(4px)" },
                    { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6 }
                );
            }

            // 2. SplitText title entrance
            if (split && split.chars && split.chars.length > 0) {
                tl.fromTo(
                    split.chars,
                    { opacity: 0, y: 35, rotateX: -60, filter: "blur(6px)" },
                    {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        filter: "blur(0px)",
                        stagger: 0.02,
                        duration: 0.8,
                        ease: "back.out(1.4)",
                    },
                    "-=0.3"
                );
            } else if (titleRef.current) {
                tl.fromTo(
                    titleRef.current,
                    { opacity: 0, y: 25, filter: "blur(6px)" },
                    { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 },
                    "-=0.3"
                );
            }

            // 3. Subtitle description reveal
            if (descRef.current) {
                tl.fromTo(
                    descRef.current,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.6 },
                    "-=0.4"
                );
            }

            return () => {
                if (split) split.revert();
            };
        },
        { scope: mainRef }
    );

    // Stagger the grid in once itineraries have loaded
    useEffect(() => {
        if (!loading && !error && gridRef.current && user) {
            const cards = gridRef.current.children;
            gsap.fromTo(
                cards,
                { opacity: 0, y: 40, scale: 0.94, rotateX: 8 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotateX: 0,
                    duration: 0.6,
                    ease: "power3.out",
                    stagger: 0.08,
                }
            );
        }
    }, [loading, error, itineraries, user]);

    // Animate auth prompt card when user is logged out
    useEffect(() => {
        if (!authLoading && !user && authPromptRef.current) {
            const el = authPromptRef.current;
            const icon = el.querySelector("[data-auth-icon]");
            const textElements = el.querySelectorAll("[data-auth-text]");
            const buttons = el.querySelectorAll("[data-auth-btn]");

            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.fromTo(
                el,
                { opacity: 0, y: 40, scale: 0.92, filter: "blur(8px)" },
                { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.75, ease: "back.out(1.2)" }
            );

            if (icon) {
                tl.fromTo(
                    icon,
                    { scale: 0, rotate: -20, opacity: 0 },
                    { scale: 1, rotate: 0, opacity: 1, duration: 0.6, ease: "back.out(2)" },
                    "-=0.45"
                );
            }

            if (textElements.length > 0) {
                tl.fromTo(
                    textElements,
                    { opacity: 0, y: 15 },
                    { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
                    "-=0.4"
                );
            }

            if (buttons.length > 0) {
                tl.fromTo(
                    buttons,
                    { opacity: 0, y: 15, scale: 0.92 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.5)" },
                    "-=0.3"
                );
            }
        }
    }, [authLoading, user]);

    async function loadItineraries() {
        try {
            setLoading(true);
            setError("");
            const data = await itinerariesApi.getAllItineraries();
            setItineraries(data);
        }
        catch (err) {
            console.error(err);
            if (err?.status === 401 || err?.statusCode === 401 || !user) {
                setItineraries([]);
            } else {
                setError("Couldn't load your itineraries. Please try again.");
            }
        }
        finally {
            setLoading(false);
        }
    }

    async function handleCreate(itineraryData) {
        const newItinerary = await itinerariesApi.createItinerary(itineraryData);
        setItineraries((prev) => [...prev, newItinerary]);
    }

    async function handleDelete(id) {
        const confirmed = window.confirm("Delete this itinerary?");
        if (!confirmed) return;

        await itinerariesApi.deleteItinerary({ id: id });
        setItineraries((prev) => prev.filter((it) => it.id !== id));
    }

    function handleCreateTileEnter(e) {
        gsap.to(e.currentTarget, { scale: 1.03, y: -4, duration: 0.35, ease: "power2.out" });
        gsap.to(e.currentTarget.querySelector(".create-icon"), {
            rotate: 90,
            scale: 1.15,
            duration: 0.45,
            ease: "back.out(2)",
        });
    }

    function handleCreateTileLeave(e) {
        gsap.to(e.currentTarget, { scale: 1, y: 0, duration: 0.35, ease: "power2.out" });
        gsap.to(e.currentTarget.querySelector(".create-icon"), {
            rotate: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
        });
    }

    return (
        <main ref={mainRef} className="min-h-screen pt-8 sm:pt-12 pb-16 sm:pb-24" style={{ perspective: "1000px" }}>
        <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-margin-desktop">
            {/* Hero */}
            <section className="mb-8 sm:mb-12 md:mb-section-gap">
            <span ref={badgeRef} className="font-body text-xs sm:text-label-lg font-semibold text-primary tracking-[0.2em] block mb-2 sm:mb-4">
                PLAN YOUR NEXT CHAPTER
            </span>
            <h1 ref={titleRef} className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-display-lg text-on-surface mb-3 sm:mb-6 font-bold leading-tight">
                Your Itineraries
            </h1>
            <p ref={descRef} className="font-body text-sm sm:text-base md:text-body-lg text-on-surface-variant max-w-xl leading-relaxed">
                Every trip starts with a single idea. Pick a destination and start
                shaping your next journey.
            </p>
            </section>

            {/* Itinerary content section */}
            <section>
            {(authLoading || (loading && user)) && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="glass-widget p-6 rounded-3xl">
                            <div className="aspect-square rounded-2xl bg-surface-container-high animate-pulse mb-6" />
                            <div className="h-5 w-2/3 rounded-full bg-surface-container-high animate-pulse mb-2" />
                            <div className="h-4 w-1/3 rounded-full bg-surface-container-high animate-pulse" />
                        </div>
                    ))}
                </div>
            )}

            {!authLoading && !user && (
                <div
                    ref={authPromptRef}
                    className="glass-widget mx-auto max-w-2xl rounded-[2.5rem] border border-outline-variant/30 bg-surface-container-low/60 p-8 sm:p-12 text-center shadow-warm-lg backdrop-blur-xl"
                >
                    <div
                        data-auth-icon
                        className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 text-primary mb-6 shadow-xs"
                    >
                        <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                            lock
                        </span>
                    </div>

                    <h2
                        data-auth-text
                        className="font-display text-2xl sm:text-3xl font-bold text-on-surface"
                    >
                        Log in to view your itineraries
                    </h2>

                    <p
                        data-auth-text
                        className="mt-3 font-body text-sm sm:text-base text-on-surface-variant max-w-md mx-auto leading-relaxed"
                    >
                        Sign in to create, organize, and explore your personalized travel journeys and bucket list destinations.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            data-auth-btn
                            type="button"
                            onClick={() => setShowLoginModal(true)}
                            className="glossy-button inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-body text-sm font-semibold text-white shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer w-full sm:w-auto justify-center"
                        >
                            <span className="material-symbols-outlined text-lg">login</span>
                            Log In
                        </button>

                        <Link
                            data-auth-btn
                            to="/signup"
                            className="inline-flex items-center gap-2 rounded-full border border-outline-variant bg-surface px-8 py-3.5 font-body text-sm font-semibold text-on-surface hover:bg-surface-container transition-all cursor-pointer w-full sm:w-auto justify-center"
                        >
                            Create Account
                        </Link>
                    </div>
                </div>
            )}

            {!authLoading && user && error && (
                <div className="flex flex-col items-center text-center py-16 gap-4">
                    <span className="material-symbols-outlined text-error scale-150">
                        error
                    </span>
                    <p className="font-body-md text-body-md text-error">{error}</p>
                    <button
                        onClick={loadItineraries}
                        className="font-label-md text-label-md text-primary underline underline-offset-4 hover:opacity-70 transition-opacity cursor-pointer"
                    >
                        Try again
                    </button>
                </div>
            )}

            {!authLoading && user && !loading && !error && (
                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
                {itineraries.map((itinerary) => (
                    <ItineraryCard
                        key={itinerary.id}
                        itinerary={itinerary}
                        onDelete={handleDelete}
                    />
                ))}

                {/* Create new itinerary card */}
                <div
                    onClick={() => setShowCreateModal(true)}
                    onMouseEnter={handleCreateTileEnter}
                    onMouseLeave={handleCreateTileLeave}
                    className="aspect-square bg-surface-container-high rounded-3xl flex flex-col items-center justify-center border-2 border-dashed border-outline-variant cursor-pointer hover:bg-surface-container-highest transition-colors shadow-sm"
                >
                    <div className="create-icon w-16 h-16 rounded-full bg-surface-container-lowest flex items-center justify-center mb-4 shadow-sm transition-transform">
                        <span className="material-symbols-outlined text-primary scale-125">
                            add
                        </span>
                    </div>
                    <p className="font-headline-md text-headline-md text-on-surface-variant">
                        Plan a new trip
                    </p>
                    <p className="font-body-md text-body-md text-outline mt-1">
                        Choose a destination to begin
                    </p>
                </div>
                </div>
            )}
            </section>
        </div>

        {showCreateModal && (
            <CreateItineraryModal
                onClose={() => setShowCreateModal(false)}
                onCreate={handleCreate}
            />
        )}

        <LoginModal
            open={showLoginModal}
            onClose={() => setShowLoginModal(false)}
        />
        </main>
    );
}

export default Itineraries;