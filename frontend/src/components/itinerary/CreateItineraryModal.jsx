import { useState, useEffect, useRef } from "react";
import destinationApi from "../../api/destinationApi";

function CreateItineraryModal({ onClose, onCreate }) {
    const [destinations, setDestinations] = useState([]);
    const [destinationId, setDestinationId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        async function loadDestinations() {
            try {
                const data = await destinationApi.getAllDestinations();
                setDestinations(data);
            } catch (err) {
                console.error("Failed to fetch destinations:", err);
            }
        }
        loadDestinations();
    }, []);

    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!destinationId || !title.trim()) {
            setError("Please choose a destination and give your trip a title.");
            return;
        }

        setSubmitting(true);
        setError("");

        try {
            await onCreate({ destinationId, title: title.trim(), description: description.trim() || undefined });
            onClose();
        } catch (err) {
            setError("Something went wrong creating your itinerary. Try again.");
        } finally {
            setSubmitting(false);
        }
    }

    const selectedDestination = destinations.find((dest) => dest.id === destinationId);

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-[100] px-margin-mobile animate-in fade-in transition-all duration-300">
            <div className="bg-surface rounded-3xl p-6 md:p-8 w-full max-w-lg shadow-[0px_30px_70px_rgba(43,38,32,0.25)] border border-outline-variant/40 relative overflow-hidden">
                {/* Decorative background glows */}
                <div className="absolute -top-20 -right-20 w-48 h-48 bg-primary-fixed/25 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-secondary-container/25 rounded-full blur-2xl pointer-events-none" />

                <div className="flex justify-between items-start mb-6 relative z-10">
                    <div>
                        <span className="font-label-md text-label-md text-primary tracking-widest uppercase font-semibold px-2.5 py-0.5 rounded-full bg-primary-fixed/40 inline-block mb-1">
                            New Journey
                        </span>
                        <h3 className="font-display text-2xl md:text-3xl font-bold text-on-surface">
                            Create Itinerary
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary transition-all duration-200"
                    >
                        <span className="material-symbols-outlined text-lg">close</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10">
                    <div ref={dropdownRef} className="relative">
                        <label className="font-label-md text-label-md text-on-surface-variant block mb-1.5 font-medium">
                            Destination
                        </label>

                        {/* Trigger button */}
                        <button
                            type="button"
                            onClick={() => setIsDropdownOpen((open) => !open)}
                            className="w-full flex items-center justify-between rounded-xl border border-outline-variant/60 bg-surface-container-low px-4 py-3 text-left font-body text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all hover:bg-surface-container"
                        >
                            <span className={selectedDestination ? "text-on-surface font-medium flex items-center gap-2" : "text-outline"}>
                                {selectedDestination ? (
                                    <>
                                        <span className="material-symbols-outlined text-primary text-base">location_on</span>
                                        {selectedDestination.name}
                                    </>
                                ) : (
                                    "Select a destination"
                                )}
                            </span>
                            <span
                                className={`material-symbols-outlined text-on-surface-variant transition-transform duration-300 ${
                                    isDropdownOpen ? "rotate-180 text-primary" : ""
                                }`}
                            >
                                expand_more
                            </span>
                        </button>

                        {/* Dropdown menu */}
                        {isDropdownOpen && (
                            <div className="absolute z-20 mt-2 w-full max-h-60 overflow-y-auto rounded-2xl border border-outline-variant/60 bg-surface shadow-[0_20px_40px_rgba(43,38,32,0.18)] p-2 animate-in fade-in zoom-in-95 duration-150">
                                {destinations.length === 0 && (
                                    <p className="px-4 py-3 font-body text-sm text-outline text-center">
                                        No destinations available
                                    </p>
                                )}

                                {destinations.map((dest) => (
                                    <button
                                        key={dest.id}
                                        type="button"
                                        onClick={() => {
                                            setDestinationId(dest.id);
                                            setIsDropdownOpen(false);
                                        }}
                                        className={`w-full text-left px-3.5 py-2.5 rounded-xl font-body text-sm transition-all flex items-center justify-between ${
                                            dest.id === destinationId
                                                ? "bg-primary text-on-primary font-semibold shadow-sm"
                                                : "text-on-surface hover:bg-surface-container"
                                        }`}
                                    >
                                        <span className="flex items-center gap-2">
                                            <span className={`material-symbols-outlined text-base ${dest.id === destinationId ? "text-on-primary" : "text-primary"}`}>
                                                pin_drop
                                            </span>
                                            {dest.name}
                                        </span>
                                        {dest.id === destinationId && (
                                            <span className="material-symbols-outlined text-sm text-on-primary">
                                                check
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="font-label-md text-label-md text-on-surface-variant block mb-1.5 font-medium">
                            Trip Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Amalfi Coast Sunset Sojourn"
                            className="w-full rounded-xl border border-outline-variant/60 bg-surface-container-low px-4 py-3 font-body text-sm text-on-surface placeholder:text-outline/70 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                    </div>

                    <div>
                        <label className="font-label-md text-label-md text-on-surface-variant block mb-1.5 font-medium">
                            Description (optional)
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            placeholder="A quick summary of what this voyage entails..."
                            className="w-full rounded-xl border border-outline-variant/60 bg-surface-container-low px-4 py-3 font-body text-sm text-on-surface placeholder:text-outline/70 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                        />
                    </div>

                    {error && (
                        <p className="font-body text-xs font-medium text-error bg-error/10 py-2 px-3 rounded-lg flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-sm">error</span>
                            {error}
                        </p>
                    )}

                    <div className="flex items-center gap-3 mt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 rounded-full border border-outline-variant font-body text-sm font-semibold text-on-surface-variant hover:bg-surface-container transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="flex-1 py-3 rounded-full bg-primary text-on-primary font-body text-sm font-semibold shadow-[0_10px_20px_rgba(162,63,26,0.25)] hover:scale-[1.02] active:scale-98 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined text-sm">luggage</span>
                            {submitting ? "Creating..." : "Create Trip"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateItineraryModal;