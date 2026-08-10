import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { toInputTime, calculateDuration, addMinutesToTime } from "../../utils/formatTime";
import getErrorMessage from "../../utils/getErrorMessage";
import TimeSelector from "./TimeSelector";

function ActivityFormModal({ initialData, dayNumber, onClose, onSave }) {
    const isEditing = Boolean(initialData);

    const [title, setTitle] = useState(initialData?.title ?? "");
    const [description, setDescription] = useState(initialData?.description ?? "");
    const [startTime, setStartTime] = useState(toInputTime(initialData?.startTime) || "09:00");
    const [endTime, setEndTime] = useState(toInputTime(initialData?.endTime) || "11:00");
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const backdropRef = useRef(null);
    const modalRef = useRef(null);
    const titleInputRef = useRef(null);

    const durationInfo = calculateDuration(startTime, endTime);

    // Auto-focus title input on open
    useEffect(() => {
        const timer = setTimeout(() => {
            titleInputRef.current?.focus();
        }, 50);
        return () => clearTimeout(timer);
    }, []);

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

    function handleAutoFixEndTime() {
        const fixedEndTime = addMinutesToTime(startTime, 60);
        setEndTime(fixedEndTime);
        setError("");
    }

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
        if (!durationInfo.isValid) {
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
            handleAnimatedClose();
        }
        catch (err) {
            setError(getErrorMessage(err));
            setSaving(false);
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
                className="bg-surface rounded-3xl shadow-[0px_30px_70px_rgba(43,38,32,0.25)] border border-outline-variant/40 w-full max-w-lg max-h-[92vh] flex flex-col relative overflow-hidden"
            >
                {/* Decorative background glows */}
                <div className="absolute -top-20 -right-20 w-48 h-48 bg-primary-fixed/25 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-secondary-container/25 rounded-full blur-2xl pointer-events-none" />

                {/* Modal Header */}
                <div className="flex justify-between items-start p-5 sm:p-7 pb-4 border-b border-surface-variant/50 relative z-10 shrink-0">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="font-label-md text-label-md text-primary tracking-widest uppercase font-semibold px-2.5 py-0.5 rounded-full bg-primary-fixed/40">
                                Day {dayNumber}
                            </span>
                            {durationInfo.isValid && durationInfo.text && (
                                <span className="font-body text-xs text-on-surface-variant/80 bg-surface-container px-2.5 py-0.5 rounded-full flex items-center gap-1 font-medium">
                                    <span className="material-symbols-outlined text-[14px] text-primary">schedule</span>
                                    {durationInfo.text}
                                </span>
                            )}
                        </div>
                        <h2 className="font-display text-2xl md:text-3xl font-bold text-on-surface">
                            {isEditing ? "Edit Activity" : "Curate Experience"}
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

                {/* Scrollable Form Body */}
                <form onSubmit={handleSubmit} className="p-6 md:p-7 pt-4 overflow-y-auto flex flex-col gap-4 relative z-10 no-scrollbar">
                    <div>
                        <label className="font-label-md text-label-md text-on-surface-variant block mb-1.5 font-medium">
                            Activity Title
                        </label>
                        <input
                            ref={titleInputRef}
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            maxLength={100}
                            placeholder="e.g. Sunset Boat Tour in Positano"
                            className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none font-body text-sm text-on-surface placeholder:text-outline/70 transition-all duration-200"
                        />
                    </div>

                    <div>
                        <label className="font-label-md text-label-md text-on-surface-variant block mb-1.5 font-medium">
                            Description & Notes (optional)
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            maxLength={1000}
                            rows={2}
                            placeholder="Add highlights, ticket reservation codes, meeting points..."
                            className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none font-body text-sm text-on-surface placeholder:text-outline/70 transition-all duration-200 resize-none"
                        />
                    </div>

                    {/* Unified Inline Time & Duration Range Selector (Collapsible) */}
                    <div>
                        <label className="font-label-md text-label-md text-on-surface-variant block mb-1.5 font-medium">
                            Activity Schedule & Duration
                        </label>
                        <TimeSelector
                            startTime={startTime}
                            endTime={endTime}
                            onStartTimeChange={(val) => {
                                setStartTime(val);
                                setError("");
                            }}
                            onEndTimeChange={(val) => {
                                setEndTime(val);
                                setError("");
                            }}
                        />
                    </div>

                    {/* Validation Warning & Auto Fix */}
                    {!durationInfo.isValid && (
                        <div className="p-3 rounded-xl bg-error/10 border border-error/20 flex items-center justify-between gap-2 text-xs text-error animate-in fade-in">
                            <div className="flex items-center gap-1.5 font-medium">
                                <span className="material-symbols-outlined text-sm">warning</span>
                                <span>End time must be after start time.</span>
                            </div>
                            <button
                                type="button"
                                onClick={handleAutoFixEndTime}
                                className="underline font-bold hover:text-error/80 cursor-pointer shrink-0"
                            >
                                Auto-set +1 hr
                            </button>
                        </div>
                    )}

                    {error && (
                        <p className="font-body text-xs font-medium text-error bg-error/10 py-2 px-3 rounded-lg flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-sm">error</span>
                            {error}
                        </p>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 pt-2">
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
                            <span className="material-symbols-outlined text-sm">
                                {isEditing ? "save" : "add_task"}
                            </span>
                            {saving ? "Saving..." : isEditing ? "Save Changes" : "Add Experience"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ActivityFormModal;