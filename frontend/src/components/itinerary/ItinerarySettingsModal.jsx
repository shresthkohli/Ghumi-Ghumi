import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import getErrorMessage from "../../utils/getErrorMessage";

function ItinerarySettingsModal({ itinerary, onClose, onSave, onDelete }) {
    const [title, setTitle] = useState(itinerary.title);
    const [description, setDescription] = useState(itinerary.description ?? "");
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const backdropRef = useRef(null);
    const modalRef = useRef(null);

    // Prevent body scroll when modal is open
    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    // Smooth GSAP Entrance Animation
    useGSAP(() => {
        if (backdropRef.current && modalRef.current) {
            gsap.fromTo(
                backdropRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.28, ease: "power2.out" }
            );
            gsap.fromTo(
                modalRef.current,
                { opacity: 0, scale: 0.88, y: 35, rotateX: 6 },
                { opacity: 1, scale: 1, y: 0, rotateX: 0, duration: 0.45, ease: "back.out(1.4)" }
            );
        }
    }, []);

    function handleAnimatedClose() {
        if (isClosing) return;
        setIsClosing(true);

        const tl = gsap.timeline({
            onComplete: () => {
                onClose();
            },
        });

        if (modalRef.current && backdropRef.current) {
            tl.to(
                modalRef.current,
                { opacity: 0, scale: 0.92, y: 20, duration: 0.22, ease: "power2.in" },
                0
            );
            tl.to(
                backdropRef.current,
                { opacity: 0, duration: 0.22, ease: "power2.in" },
                0
            );
        } else {
            onClose();
        }
    }

    // Close on Escape key
    useEffect(() => {
        function handleKeyDown(e) {
            if (e.key === "Escape") {
                handleAnimatedClose();
            }
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isClosing]);

    function handleBackdropClick(e) {
        if (e.target === backdropRef.current) {
            handleAnimatedClose();
        }
    }

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
            handleAnimatedClose();
        }
        catch (err) {
            setError(getErrorMessage(err));
            setSaving(false);
        }
    }

    function handleDeleteClick() {
        const confirmed = window.confirm(
            "Delete this itinerary and every activity in it? This can't be undone."
        );
        if (confirmed) {
            handleAnimatedClose();
            onDelete();
        }
    }

    return (
        <div
            ref={backdropRef}
            onClick={handleBackdropClick}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md px-4 sm:px-6 py-4"
            style={{ perspective: "1000px" }}
        >
            <div
                ref={modalRef}
                className="bg-surface rounded-3xl p-5 sm:p-6 md:p-8 w-full max-w-md max-h-[92vh] overflow-y-auto shadow-[0px_30px_70px_rgba(43,38,32,0.25)] border border-outline-variant/40 relative no-scrollbar"
            >
                {/* Decorative background glows */}
                <div className="absolute -top-20 -right-20 w-48 h-48 bg-primary-fixed/25 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-secondary-container/25 rounded-full blur-2xl pointer-events-none" />

                <div className="flex justify-between items-start mb-4 sm:mb-6 relative z-10">
                    <div>
                        <span className="font-body text-xs text-primary tracking-widest uppercase font-semibold px-2.5 py-0.5 rounded-full bg-primary-fixed/40 inline-block mb-1">
                            Settings
                        </span>
                        <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-on-surface">
                            Itinerary settings
                        </h2>
                    </div>
                    <button
                        type="button"
                        onClick={handleAnimatedClose}
                        className="w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary transition-all duration-200 cursor-pointer"
                    >
                        <span className="material-symbols-outlined text-lg">close</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10">
                    <div>
                        <label className="font-label-md text-label-md text-on-surface-variant block mb-1.5 font-medium">
                            Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none font-body text-sm text-on-surface placeholder:text-outline/70 transition-all"
                        />
                    </div>

                    <div>
                        <label className="font-label-md text-label-md text-on-surface-variant block mb-1.5 font-medium">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none font-body text-sm text-on-surface placeholder:text-outline/70 transition-all resize-none"
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
                            onClick={handleAnimatedClose}
                            className="flex-1 py-3 rounded-full border border-outline-variant font-body text-sm font-semibold text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex-1 py-3 rounded-full bg-primary text-on-primary font-body text-sm font-semibold shadow-[0_10px_20px_rgba(162,63,26,0.25)] hover:scale-[1.02] active:scale-98 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <span className="material-symbols-outlined text-sm">save</span>
                            {saving ? "Saving..." : "Save changes"}
                        </button>
                    </div>
                </form>

                <button
                    type="button"
                    onClick={handleDeleteClick}
                    className="w-full mt-4 py-2.5 rounded-full border border-error/40 text-error font-body text-sm font-medium hover:bg-error/10 transition-colors flex items-center justify-center gap-1.5 cursor-pointer relative z-10"
                >
                    <span className="material-symbols-outlined text-sm">delete</span>
                    Delete itinerary
                </button>
            </div>
        </div>
    );
}

export default ItinerarySettingsModal;