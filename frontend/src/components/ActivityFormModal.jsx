import { useState } from "react";
import { toInputTime } from "../utils/formatTime";
import getErrorMessage from "../utils/getErrorMessage";

function ActivityFormModal({ initialData, dayNumber, onClose, onSave }) {
    const isEditing = Boolean(initialData);

    const [title, setTitle] = useState(initialData?.title ?? "");
    const [description, setDescription] = useState(initialData?.description ?? "");
    const [startTime, setStartTime] = useState(toInputTime(initialData?.startTime));
    const [endTime, setEndTime] = useState(toInputTime(initialData?.endTime));
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (!title.trim()) {
            setError("Give this activity a title.");
            return;
        }
        if (title.trim().length > 100) {
            setError("Title can't be longer than 100 characters.");
            return;
        }
        if (description.trim().length > 1000) {
            setError("Description can't be longer than 1000 characters.");
            return;
        }
        if (!startTime || !endTime) {
            setError("Start and end time are both required.");
            return;
        }
        if (endTime <= startTime) {
            setError("End time has to be after start time.");
            return;
        }

        setSaving(true);
        try {
            await onSave({
                title: title.trim(),
                description: description.trim() || null,
                startTime,
                endTime,
            });
            onClose();
        }
        catch (err) {
            setError(getErrorMessage(err));
        }
        finally {
            setSaving(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/40 backdrop-blur-sm px-margin-mobile">
            <div className="bg-surface-container-lowest rounded-2xl shadow-[0px_30px_60px_rgba(43,38,32,0.2)] w-full max-w-md p-8">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <p className="font-label-md text-label-md text-primary tracking-widest uppercase mb-1">
                            Day {dayNumber}
                        </p>
                        <h2 className="font-headline-md text-headline-md text-on-surface">
                            {isEditing ? "Edit activity" : "New activity"}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-on-surface-variant hover:text-primary"
                    >
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
                            maxLength={100}
                            placeholder="Check-in at Villa Bordoni"
                            className="w-full px-4 py-3 rounded-lg bg-surface-container-low border border-outline-variant focus:border-primary focus:outline-none font-body-md text-body-md"
                        />
                    </div>

                    <div>
                        <label className="font-label-md text-label-md text-on-surface-variant block mb-1">
                            Description (optional)
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            maxLength={1000}
                            rows={3}
                            className="w-full px-4 py-3 rounded-lg bg-surface-container-low border border-outline-variant focus:border-primary focus:outline-none font-body-md text-body-md resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="font-label-md text-label-md text-on-surface-variant block mb-1">
                                Start time
                            </label>
                            <input
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-surface-container-low border border-outline-variant focus:border-primary focus:outline-none font-body-md text-body-md"
                            />
                        </div>
                        <div>
                            <label className="font-label-md text-label-md text-on-surface-variant block mb-1">
                                End time
                            </label>
                            <input
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-surface-container-low border border-outline-variant focus:border-primary focus:outline-none font-body-md text-body-md"
                            />
                        </div>
                    </div>

                    {error && (
                        <p className="font-body-md text-body-md text-error">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={saving}
                        className="mt-2 px-6 py-3 rounded-full bg-primary text-on-primary font-label-lg text-label-lg disabled:opacity-50 hover:scale-[1.02] transition-transform duration-300"
                    >
                        {saving ? "Saving..." : isEditing ? "Save changes" : "Add activity"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ActivityFormModal;