import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import ItineraryCard from "../components/ItineraryCard";
import CreateItineraryModal from "../components/CreateItineraryModal";
import itineraryApi from "../api/itineraryApi";

gsap.registerPlugin(ScrollTrigger, SplitText);

function Itineraries() {
    const [itineraries, setItineraries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showCreateModal, setShowCreateModal] = useState(false);

    const mainRef = useRef(null);
    const badgeRef = useRef(null);
    const titleRef = useRef(null);
    const descRef = useRef(null);
    const gridRef = useRef(null);

    useEffect(() => {
        loadItineraries();
    }, []);

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
        if (!loading && !error && gridRef.current) {
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
    }, [loading, error, itineraries]);

    async function loadItineraries() {
        try {
            setLoading(true);
            const data = await itineraryApi.getAllItineraries();
            setItineraries(data);
        }
        catch (err) {
            console.log(err);
            setError("Couldn't load your itineraries. Please try again.");
        }
        finally {
            setLoading(false);
        }
    }

    async function handleCreate(itineraryData) {
        const newItinerary = await itineraryApi.createItinerary(itineraryData);
        setItineraries((prev) => [...prev, newItinerary]);
    }

    async function handleDelete(id) {
        const confirmed = window.confirm("Delete this itinerary?");
        if (!confirmed) return;

        await itineraryApi.deleteItinerary({ id: id });
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
        <main ref={mainRef} className="min-h-screen pt-12 pb-24" style={{ perspective: "1000px" }}>
        <div className="max-w-container-max mx-auto px-margin-desktop">
            {/* Hero */}
            <section className="mb-section-gap">
            <span ref={badgeRef} className="font-label-lg text-label-lg text-primary tracking-[0.2em] block mb-4">
                PLAN YOUR NEXT CHAPTER
            </span>
            <h1 ref={titleRef} className="font-display-lg text-display-lg text-on-surface mb-6">
                Your Itineraries
            </h1>
            <p ref={descRef} className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                Every trip starts with a single idea. Pick a destination and start
                shaping your next journey.
            </p>
            </section>

            {/* Itinerary grid */}
            <section>
            {loading && (
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

            {error && (
                <div className="flex flex-col items-center text-center py-16 gap-4">
                    <span className="material-symbols-outlined text-error scale-150">
                        error
                    </span>
                    <p className="font-body-md text-body-md text-error">{error}</p>
                    <button
                        onClick={loadItineraries}
                        className="font-label-md text-label-md text-primary underline underline-offset-4 hover:opacity-70 transition-opacity"
                    >
                        Try again
                    </button>
                </div>
            )}

            {!loading && !error && (
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
        </main>
    );
}

export default Itineraries;