import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import ItineraryCard from "../components/ItineraryCard";
import CreateItineraryModal from "../components/CreateItineraryModal";
import itineraryApi from "../api/itineraryApi";

function Itineraries() {
    const [itineraries, setItineraries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showCreateModal, setShowCreateModal] = useState(false);

    const heroRef = useRef(null);
    const gridRef = useRef(null);

    useEffect(() => {
        loadItineraries();
    }, []);

    // Hero fade/slide-in on mount
    useEffect(() => {
        if (heroRef.current) {
            gsap.fromTo(
                heroRef.current.children,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.1 }
            );
        }
    }, []);

    // Stagger the grid in once itineraries have loaded
    useEffect(() => {
        if (!loading && !error && gridRef.current) {
            const cards = gridRef.current.children;
            gsap.fromTo(
                cards,
                { opacity: 0, y: 30, scale: 0.96 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.5,
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
        gsap.to(e.currentTarget, { scale: 1.02, duration: 0.3, ease: "power2.out" });
        gsap.to(e.currentTarget.querySelector(".create-icon"), {
            rotate: 90,
            duration: 0.4,
            ease: "back.out(2)",
        });
    }

    function handleCreateTileLeave(e) {
        gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: "power2.out" });
        gsap.to(e.currentTarget.querySelector(".create-icon"), {
            rotate: 0,
            duration: 0.4,
            ease: "power2.out",
        });
    }

    return (
        <main className="min-h-screen pt-12 pb-24">
        <div className="max-w-container-max mx-auto px-margin-desktop">
            {/* Hero */}
            <section ref={heroRef} className="mb-section-gap ">
            <span className="font-label-lg text-label-lg text-primary tracking-[0.2em] block mb-4">
                PLAN YOUR NEXT CHAPTER
            </span>
            <h1 className="font-display-lg text-display-lg text-on-surface mb-6">
                Your Itineraries
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
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
                    className="aspect-square bg-surface-container-high rounded-3xl flex flex-col items-center justify-center border-2 border-dashed border-outline-variant cursor-pointer hover:bg-surface-container-highest transition-colors"
                >
                    <div className="create-icon w-16 h-16 rounded-full bg-surface-container-lowest flex items-center justify-center mb-4 shadow-sm">
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