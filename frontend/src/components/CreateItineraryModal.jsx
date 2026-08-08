import { useState, useEffect, useRef } from "react";
import destinationApi from "../api/destinationApi";

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
        const data = await destinationApi.getAllDestinations();
        setDestinations(data);
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
        await onCreate({ destinationId: destinationId,title: title,description: description });
        onClose();
        } catch (err) {
        setError("Something went wrong creating your itinerary. Try again.");
        } finally {
        setSubmitting(false);
        }
    }

    const selectedDestination = destinations.find((dest) => dest.id === destinationId);

    return (
        <div className="fixed inset-0 bg-on-surface/40 backdrop-blur-sm flex items-center justify-center z-[100] px-margin-mobile">
        <div className="bg-surface rounded-3xl p-8 w-full max-w-md shadow-2xl">
            <h3 className="font-headline-lg text-headline-lg text-on-surface mb-6">
            New Itinerary
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div ref={dropdownRef} className="relative">
                <label className="font-label-lg text-label-lg text-on-surface-variant block mb-2">
                Destination
                </label>

                {/* Trigger button — shows the current selection */}
                <button
                type="button"
                onClick={() => setIsDropdownOpen((open) => !open)}
                className="w-full flex items-center justify-between rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-3 text-left font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors"
                >
                <span className={selectedDestination ? "text-on-surface" : "text-outline"}>
                    {selectedDestination ? selectedDestination.name : "Select a destination"}
                </span>
                <span
                    className={`material-symbols-outlined text-on-surface-variant transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                    }`}
                >
                    expand_more
                </span>
                </button>

                {/* Dropdown menu */}
                {isDropdownOpen && (
                <div className="absolute z-10 mt-2 w-full max-h-60 overflow-y-auto rounded-lg border border-outline-variant bg-surface-container-lowest shadow-xl">
                    {destinations.length === 0 && (
                    <p className="px-4 py-3 font-body-md text-body-md text-outline">
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
                        className={`w-full text-left px-4 py-3 font-body-md text-body-md transition-colors hover:bg-surface-container ${
                        dest.id === destinationId
                            ? "bg-primary-container text-on-primary-container"
                            : "text-on-surface"
                        }`}
                    >
                        {dest.name}
                    </button>
                    ))}
                </div>
                )}
            </div>

            <div>
                <label className="font-label-lg text-label-lg text-on-surface-variant block mb-2">
                Title
                </label>
                <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Amalfi Coast Sojourn"
                className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-3 focus:outline-none focus:border-primary"
                />
            </div>

            <div>
                <label className="font-label-lg text-label-lg text-on-surface-variant block mb-2">
                Description (optional)
                </label>
                <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-3 focus:outline-none focus:border-primary"
                />
            </div>

            {error && <p className="text-error font-body-md text-body-md">{error}</p>}

            <div className="flex gap-3 mt-2">
                <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-full border border-outline-variant py-3 font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container transition-colors"
                >
                Cancel
                </button>
                <button
                type="submit"
                disabled={submitting}
                className="flex-1 rounded-full bg-primary text-on-primary py-3 font-label-lg text-label-lg hover:opacity-80 transition-all disabled:opacity-50"
                >
                {submitting ? "Creating..." : "Create Trip"}
                </button>
            </div>
            </form>
        </div>
        </div>
    );
}

export default CreateItineraryModal;