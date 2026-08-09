import { useState, useEffect } from "react";
import StarRating from "./StarRating";

const RATING_DESCRIPTIONS = [
    "",
    "Disappointing 😕",
    "Fair, had issues 🙂",
    "Good experience 😊",
    "Great trip! Loved it 😍",
    "Unforgettable experience! ✨"
];

export default function ReviewForm({
    existingReview = null,
    onSubmit,
    onCancel,
    loading = false
}) {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [errors, setErrors] = useState({
        rating: "",
        review: ""
    });

    useEffect(() => {
        if (existingReview) {
            setRating(existingReview.rating || 0);
            setReview(existingReview.review || "");
        } else {
            setRating(0);
            setReview("");
        }

        setErrors({
            rating: "",
            review: ""
        });
    }, [existingReview]);

    function handleSubmit(e) {
        e.preventDefault();

        const newErrors = {
            rating: "",
            review: ""
        };

        if (rating === 0) {
            newErrors.rating = "Please select a star rating";
        }

        if (!review.trim()) {
            newErrors.review = "Please write a few words about your experience";
        } else if (review.trim().length < 10) {
            newErrors.review = "Review must be at least 10 characters long";
        }

        if (newErrors.rating || newErrors.review) {
            setErrors(newErrors);
            return;
        }

        onSubmit({
            rating,
            review: review.trim()
        });

        if (!existingReview) {
            setRating(0);
            setReview("");
            setErrors({ rating: "", review: "" });
        }
    }

    return (
        <div className="relative overflow-hidden rounded-3xl border border-outline-variant/40 bg-surface p-6 sm:p-9 shadow-warm-lg backdrop-blur-md">
            {/* Ambient decorative accents */}
            <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-secondary/10 blur-2xl pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between border-b border-outline-variant/30 pb-6 mb-8">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-on-primary shadow-xs">
                        <span className="material-symbols-outlined text-2xl">
                            {existingReview ? "edit_note" : "rate_review"}
                        </span>
                    </div>

                    <div>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-on-surface">
                            {existingReview ? "Edit Your Review" : "Share Your Experience"}
                        </h3>
                        <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-0.5">
                            Inspire fellow explorers with your honest impressions.
                        </p>
                    </div>
                </div>

                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors cursor-pointer"
                        aria-label="Close review form"
                    >
                        <span className="material-symbols-outlined text-xl">close</span>
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                {/* Rating Input */}
                <div>
                    <label className="block font-label-lg text-xs font-bold uppercase tracking-wider text-on-surface mb-2.5">
                        Your Rating <span className="text-error">*</span>
                    </label>

                    <div className="flex flex-wrap items-center gap-4">
                        <div className="bg-surface-container/60 rounded-2xl px-4 py-2 border border-outline-variant/30 inline-block shadow-2xs">
                            <StarRating
                                rating={rating}
                                onChange={(value) => {
                                    setRating(value);
                                    setErrors((prev) => ({ ...prev, rating: "" }));
                                }}
                                size={28}
                            />
                        </div>

                        {rating > 0 && (
                            <span className="font-body text-sm font-semibold text-primary animate-[fadeIn_0.2s_ease-out]">
                                {RATING_DESCRIPTIONS[rating]}
                            </span>
                        )}
                    </div>

                    {errors.rating && (
                        <p className="mt-2 font-body text-xs text-error flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">error</span>
                            {errors.rating}
                        </p>
                    )}
                </div>

                {/* Review Textarea */}
                <div>
                    <div className="flex items-center justify-between mb-2.5">
                        <label className="block font-label-lg text-xs font-bold uppercase tracking-wider text-on-surface">
                            Your Review <span className="text-error">*</span>
                        </label>
                        <span className={`font-body text-xs ${review.length > 900 ? "text-error font-semibold" : "text-on-surface-variant"}`}>
                            {review.length} / 1000
                        </span>
                    </div>

                    <textarea
                        rows={5}
                        maxLength={1000}
                        value={review}
                        onChange={(e) => {
                            setReview(e.target.value);
                            setErrors((prev) => ({ ...prev, review: "" }));
                        }}
                        placeholder="What did you love most? Any local tips, best viewpoints, or highlights for other travellers?"
                        className="w-full rounded-2xl border border-outline-variant/50 bg-surface px-4 py-3.5 font-body text-sm text-on-surface placeholder:text-on-surface-variant/60 outline-none transition-all duration-200 focus:border-primary focus:ring-3 focus:ring-primary/15"
                    />

                    {errors.review && (
                        <p className="mt-2 font-body text-xs text-error flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">error</span>
                            {errors.review}
                        </p>
                    )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-2">
                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={loading}
                            className="rounded-full border border-outline-variant/60 bg-surface px-6 py-2.5 font-body text-sm font-semibold text-on-surface hover:bg-surface-container transition-all cursor-pointer"
                        >
                            Cancel
                        </button>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="glossy-button inline-flex items-center gap-2 rounded-full px-7 py-2.5 font-body text-sm font-semibold text-on-primary hover:scale-102 active:scale-98 transition-all disabled:opacity-50 cursor-pointer"
                    >
                        {loading ? (
                            <>
                                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                <span>{existingReview ? "Updating..." : "Publishing..."}</span>
                            </>
                        ) : (
                            <>
                                <span className="material-symbols-outlined text-base">
                                    {existingReview ? "check" : "send"}
                                </span>
                                <span>{existingReview ? "Update Review" : "Post Review"}</span>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
