import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import destinationApi from "../api/destinationApi";
const API_URL = import.meta.env.VITE_API_URL ?? "";

function ItineraryCard({ itinerary, onDelete }) {

    const [destination, setDestination] = useState(null);
    const cardRef = useRef(null);
    const imgRef = useRef(null);

    useEffect(() => {
        async function loadDestination() {
            const data = await destinationApi.getDestinationById(itinerary.destinationId);
            setDestination(data);
        }
        loadDestination();
    }, [itinerary.destinationId]);

    // Animate the card in once its data has loaded
    useEffect(() => {
        if (destination && cardRef.current) {
            gsap.fromTo(
                cardRef.current,
                { opacity: 0, y: 24, scale: 0.97 },
                { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" }
            );
        }
    }, [destination]);

    // GSAP-driven hover: lift the card, zoom image, and expand shadow
    function handleMouseEnter() {
        gsap.to(cardRef.current, { y: -8, scale: 1.01, boxShadow: "0 22px 45px rgba(0,0,0,0.18)", duration: 0.35, ease: "power2.out" });
        gsap.to(imgRef.current, { scale: 1.1, duration: 0.5, ease: "power2.out" });
    }

    function handleMouseLeave() {
        gsap.to(cardRef.current, { y: 0, scale: 1, boxShadow: "0 0px 0px rgba(0,0,0,0)", duration: 0.35, ease: "power2.out" });
        gsap.to(imgRef.current, { scale: 1, duration: 0.5, ease: "power2.out" });
    }

    if (!destination) {
        return (
            <div className="glass-widget p-6 rounded-3xl">
                <div className="aspect-square rounded-2xl bg-surface-container-high animate-pulse mb-6" />
                <div className="h-5 w-2/3 rounded-full bg-surface-container-high animate-pulse mb-2" />
                <div className="h-4 w-1/3 rounded-full bg-surface-container-high animate-pulse" />
            </div>
        );
    }

    return (
        <div
            ref={cardRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="glass-widget p-6 rounded-3xl cursor-pointer"
        >
            <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 bg-surface-container-high">

                <img
                    ref={imgRef}
                    src={`${API_URL}${destination.imageUrl}`}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full font-label-md text-label-md text-primary shadow-sm">
                    {destination.name}
                </div>

            </div>

            <div className="flex justify-between items-start gap-3">
                <div>
                    <h4 className="font-headline-md text-headline-md text-on-surface transition-colors">
                        {itinerary.title}
                    </h4>
                    {itinerary.description && (
                        <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                            {itinerary.description}
                        </p>
                    )}
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(itinerary.id);
                    }}
                    className="material-symbols-outlined text-outline hover:text-primary transition-colors"
                >
                    delete
                </button>
            </div>
        </div>
    );
}

export default ItineraryCard;