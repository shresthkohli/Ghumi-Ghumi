import { useState } from "react";
import getErrorMessage from "../utils/getErrorMessage";

function ItinerarySettingsModal({ itinerary, onClose, onSave, onDelete }) {
    const [title, setTitle] = useState(itinerary.title);
    const [description, setDescription] = useState(itinerary.description ?? "");
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (!title.trim()) {
            setError("Your itinerary needs a title.");
            return;
        }

        setSaving(true);
        try {
            await onSave({ title: title.trim(), description: description.trim() || null });
            onClose();
        }
        catch (err) {
            setError(getErrorMessage(err));
        }
        finally {
            setSaving(false);
        }
    }

    function handleDeleteClick() {
        const confirmed = window.confirm(
            "Delete this itinerary and every activity in it? This can't be undone."
        );
        if (confirmed) onDelete();
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/40 backdrop-blur-sm px-margin-mobile">
            <div className="bg-surface-container-lowest rounded-2xl shadow-[0px_30px_60px_rgba(43,38,32,0.2)] w-full max-w-md p-8">
                <div className="flex justify-between items-start mb-6">
                    <h2 className="font-headline-md text-headline-md text-on-surface">
                        Itinerary settings
                    </h2>
                    <button onClick={onClose} className="text-on-surface-variant hover:text-primary">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="font-label-md text-label-md text-on-surface-variant block mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-surface-container-low border border-outline-variant focus:border-primary focus:outline-none font-body-md text-body-md"
                        />
                    </div>

                    <div>
                        <label className="font-label-md text-label-md text-on-surface-variant block mb-1">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 rounded-lg bg-surface-container-low border border-outline-variant focus:border-primary focus:outline-none font-body-md text-body-md resize-none"
                        />
                    </div>

                    {error && (
                        <p className="font-body-md text-body-md text-error">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={saving}
                        className="mt-2 px-6 py-3 rounded-full bg-primary text-on-primary font-label-lg text-label-lg disabled:opacity-50 hover:scale-[1.02] transition-transform duration-300"
                    >
                        {saving ? "Saving..." : "Save changes"}
                    </button>
                </form>

                <button
                    onClick={handleDeleteClick}
                    className="w-full mt-4 px-6 py-3 rounded-full border border-error text-error font-label-lg text-label-lg hover:bg-error-container/30 transition-colors"
                >
                    Delete itinerary
                </button>
            </div>
        </div>
    );
}

export default ItinerarySettingsModal;