import { useState, useEffect } from "react";
import destinationApi from "../api/destinationApi";

function CreateItineraryModal({ onClose, onCreate }) {

    const [destinations, setDestinations] = useState([]);
    const [destinationId, setDestinationId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadDestinations() {
        const data = await destinationApi.getAllDestinations();
        setDestinations(data);
        }
        loadDestinations();
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

    return (
        <div className="fixed inset-0 bg-on-surface/40 backdrop-blur-sm flex items-center justify-center z-[100] px-margin-mobile">
        <div className="bg-surface rounded-3xl p-8 w-full max-w-md shadow-2xl">
            <h3 className="font-headline-lg text-headline-lg text-on-surface mb-6">
            New Itinerary
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
                <label className="font-label-lg text-label-lg text-on-surface-variant block mb-2">
                Destination
                </label>
                <select
                value={destinationId}
                onChange={(e) => setDestinationId(e.target.value)}
                className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-3 focus:outline-none focus:border-primary"
                >
                <option value="">Select a destination</option>
                {destinations.map((dest) => (
                    <option key={dest.id} value={dest.id}>
                    {dest.name}
                    </option>
                ))}
                </select>
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