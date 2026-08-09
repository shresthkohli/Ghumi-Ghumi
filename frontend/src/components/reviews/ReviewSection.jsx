import { useState, useMemo, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { useAuth } from "../../context/AuthContext";
import ReviewSummary from "./ReviewSummary";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";
import LoginModal from "../auth/LoginModal";

export default function ReviewSection({
    destination,
    reviews = [],
    onCreateReview,
    onUpdateReview,
    onDeleteReview,
}) {
    const { user } = useAuth();

    const [editingReview, setEditingReview] = useState(null);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [deletingReviewId, setDeletingReviewId] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Filters and sorting
    const [ratingFilter, setRatingFilter] = useState(null); // null means All
    const [sortBy, setSortBy] = useState("newest"); // "newest", "highest", "lowest"

    const reviewGridRef = useRef(null);
    const formSectionRef = useRef(null);

    const averageRating =
        reviews.length === 0
            ? 0
            : reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / reviews.length;

    // Filter and sort reviews
    const filteredAndSortedReviews = useMemo(() => {
        let list = [...reviews];

        if (ratingFilter !== null) {
            list = list.filter((r) => Math.round(r.rating) === ratingFilter);
        }

        list.sort((a, b) => {
            if (sortBy === "highest") return (b.rating || 0) - (a.rating || 0);
            if (sortBy === "lowest") return (a.rating || 0) - (b.rating || 0);
            // Default "newest"
            return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        });

        return list;
    }, [reviews, ratingFilter, sortBy]);

    // Animate review cards when filter/sort changes
    useGSAP(
        () => {
            if (reviewGridRef.current) {
                const cards = reviewGridRef.current.querySelectorAll("[data-review-card]");
                if (cards.length > 0) {
                    gsap.fromTo(
                        cards,
                        { opacity: 0, y: 20, scale: 0.98 },
                        { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.06, ease: "power2.out" }
                    );
                }
            }
        },
        { scope: reviewGridRef, dependencies: [ratingFilter, sortBy, reviews.length] }
    );

    async function handleSubmit(data) {
        try {
            setIsSubmitting(true);
            if (editingReview) {
                await onUpdateReview(editingReview.id, data);
                setEditingReview(null);
                setShowReviewForm(false);
            } else {
                await onCreateReview(data);
                setShowReviewForm(false);
            }
        } catch (err) {
            console.error("Error saving review:", err);
        } finally {
            setIsSubmitting(false);
        }
    }

    function handleEdit(review) {
        setEditingReview(review);
        setShowReviewForm(true);
        // Scroll to form smoothly
        setTimeout(() => {
            formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 50);
    }

    function handleCancel() {
        setEditingReview(null);
        setShowReviewForm(false);
    }

    function handleOpenWriteReview() {
        if (!user) {
            setShowLoginModal(true);
        } else {
            setEditingReview(null);
            setShowReviewForm(true);
            setTimeout(() => {
                formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 50);
        }
    }

    // Counts for star filter tabs
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => {
        const rating = Math.min(5, Math.max(1, Math.round(r.rating || 0)));
        if (counts[rating] !== undefined) {
            counts[rating] += 1;
        }
    });

    return (
        <section className="relative mx-auto mt-24 w-full max-w-6xl">
            {/* 1. REVIEW SUMMARY */}
            <ReviewSummary
                averageRating={averageRating}
                totalReviews={reviews.length}
                reviews={reviews}
                onWriteReview={!showReviewForm ? handleOpenWriteReview : null}
                activeRatingFilter={ratingFilter}
                onSelectRatingFilter={setRatingFilter}
            />

            {/* 2. ADD / EDIT REVIEW FORM */}
            <div ref={formSectionRef} className="mx-auto mt-8 w-full max-w-3xl">
                {showReviewForm && (
                    <div className="animate-[fadeIn_0.3s_ease-out]">
                        <ReviewForm
                            existingReview={editingReview}
                            onSubmit={handleSubmit}
                            onCancel={handleCancel}
                            loading={isSubmitting}
                        />
                    </div>
                )}
            </div>

            {/* 3. FILTER & SORT TOOLBAR */}
            {reviews.length > 0 && (
                <div className="mx-auto mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 max-w-5xl px-2">
                    {/* Star Rating Filter Pills */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                        <button
                            type="button"
                            onClick={() => setRatingFilter(null)}
                            className={`rounded-full px-3.5 py-1.5 font-body text-xs font-semibold transition-all duration-200 cursor-pointer ${
                                ratingFilter === null
                                    ? "bg-primary text-on-primary shadow-xs"
                                    : "bg-surface-container border border-outline-variant/40 text-on-surface hover:bg-surface-container-high"
                            }`}
                        >
                            All ({reviews.length})
                        </button>

                        {[5, 4, 3, 2, 1].map((stars) => {
                            const count = counts[stars] || 0;
                            if (count === 0 && ratingFilter !== stars) return null;

                            return (
                                <button
                                    key={stars}
                                    type="button"
                                    onClick={() => setRatingFilter(ratingFilter === stars ? null : stars)}
                                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 font-body text-xs font-semibold transition-all duration-200 cursor-pointer ${
                                        ratingFilter === stars
                                            ? "bg-primary text-on-primary shadow-xs"
                                            : "bg-surface-container border border-outline-variant/40 text-on-surface hover:bg-surface-container-high"
                                    }`}
                                >
                                    <span>{stars}</span>
                                    <span className="material-symbols-outlined text-[13px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                                        star
                                    </span>
                                    <span className="text-[11px] opacity-80">({count})</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Sorting Dropdown */}
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                        <span className="material-symbols-outlined text-base text-on-surface-variant">
                            sort
                        </span>
                        <label htmlFor="review-sort" className="font-body text-xs text-on-surface-variant font-medium">
                            Sort by:
                        </label>
                        <select
                            id="review-sort"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="rounded-full border border-outline-variant/50 bg-surface px-3 py-1.5 font-body text-xs font-semibold text-on-surface outline-none focus:border-primary cursor-pointer shadow-2xs"
                        >
                            <option value="newest">Newest First</option>
                            <option value="highest">Highest Rating</option>
                            <option value="lowest">Lowest Rating</option>
                        </select>
                    </div>
                </div>
            )}

            {/* 4. REVIEWS GRID */}
            <div ref={reviewGridRef} className="mx-auto mt-8 w-full max-w-5xl">
                {reviews.length === 0 ? (
                    /* Zero Total Reviews State */
                    <div className="glass-widget rounded-3xl border border-outline-variant/30 py-16 px-6 text-center shadow-xs">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 text-primary mb-4">
                            <span className="material-symbols-outlined text-4xl">reviews</span>
                        </div>
                        <h3 className="font-display text-2xl font-bold text-on-surface">
                            No reviews yet
                        </h3>
                        <p className="mt-2 font-body text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
                            Be the first traveller to share impressions and insights about {destination?.name || "this destination"}.
                        </p>
                        <div className="mt-6">
                            <button
                                type="button"
                                onClick={handleOpenWriteReview}
                                className="glossy-button inline-flex items-center gap-2 rounded-full px-7 py-3 font-body text-sm font-semibold text-on-primary hover:scale-105 active:scale-98 transition-all cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-base">edit</span>
                                Write the First Review
                            </button>
                        </div>
                    </div>
                ) : filteredAndSortedReviews.length === 0 ? (
                    /* Zero Matching Filter State */
                    <div className="rounded-3xl border border-dashed border-outline-variant/60 bg-surface-container/30 py-12 px-6 text-center">
                        <span className="material-symbols-outlined text-4xl text-on-surface-variant/50 mb-2">
                            filter_alt_off
                        </span>
                        <h4 className="font-display text-lg font-bold text-on-surface">
                            No {ratingFilter}-star reviews found
                        </h4>
                        <p className="mt-1 font-body text-xs text-on-surface-variant">
                            Try selecting a different star rating or view all reviews.
                        </p>
                        <button
                            type="button"
                            onClick={() => setRatingFilter(null)}
                            className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-outline-variant/60 bg-surface px-4 py-1.5 font-body text-xs font-semibold text-primary hover:bg-surface-container transition-colors cursor-pointer"
                        >
                            Reset Filter
                        </button>
                    </div>
                ) : (
                    /* 2-Column Responsive Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredAndSortedReviews.map((review) => (
                            <div key={review.id} data-review-card>
                                <ReviewCard
                                    review={review}
                                    onEdit={() => handleEdit(review)}
                                    onDelete={() => setDeletingReviewId(review.id)}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* 5. DELETE CONFIRMATION MODAL */}
            {deletingReviewId && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]">
                    <div className="w-full max-w-md rounded-3xl border border-outline-variant/30 bg-surface p-7 shadow-2xl animate-[scaleUp_0.25s_ease-out]">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-error/10 text-error">
                            <span className="material-symbols-outlined text-3xl">delete</span>
                        </div>

                        <h3 className="mt-4 text-center font-display text-2xl font-bold text-on-surface">
                            Delete your review?
                        </h3>

                        <p className="mt-2 text-center font-body text-sm text-on-surface-variant">
                            This action cannot be undone. Your review will be permanently removed.
                        </p>

                        <div className="mt-6 flex gap-3">
                            <button
                                type="button"
                                onClick={() => setDeletingReviewId(null)}
                                className="flex-1 rounded-full border border-outline-variant/50 bg-surface px-5 py-2.5 font-body text-sm font-semibold text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={async () => {
                                    try {
                                        await onDeleteReview(deletingReviewId);
                                        setDeletingReviewId(null);
                                    } catch (error) {
                                        console.error("Failed to delete review", error);
                                    }
                                }}
                                className="flex-1 rounded-full bg-error px-5 py-2.5 font-body text-sm font-semibold text-white hover:bg-red-700 transition-all cursor-pointer shadow-sm hover:shadow-md"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 6. LOGIN MODAL */}
            <LoginModal
                open={showLoginModal}
                onClose={() => setShowLoginModal(false)}
            />
        </section>
    );
}