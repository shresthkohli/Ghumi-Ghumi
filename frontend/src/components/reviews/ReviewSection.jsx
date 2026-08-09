import { useState } from "react";

import { useAuth } from "../../context/AuthContext";

import ReviewSummary from "./ReviewSummary";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";
import LoginModal from "../auth/LoginModal";

export default function ReviewSection({
    destination,
    reviews,
    onCreateReview,
    onUpdateReview,
    onDeleteReview,
}) {
    const { user } = useAuth();

    const [editingReview, setEditingReview] = useState(null);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [deletingReview, setDeletingReview] = useState(null);

    const averageRating =
        reviews.length === 0
            ? 0
            : reviews.reduce(
                  (sum, review) => sum + review.rating,
                  0
              ) / reviews.length;

    async function handleSubmit(data) {
        if (editingReview) {
            await onUpdateReview(
                editingReview.id,
                data
            );

            setEditingReview(null);
            setShowReviewForm(false);
        } else {
            await onCreateReview(data);

            setShowReviewForm(false);
        }
    }

    function handleEdit(review) {
        setEditingReview(review);
        setShowReviewForm(true);
    }

    function handleCancel() {
        setEditingReview(null);
        setShowReviewForm(false);
    }

    return (
        <section className="relative mx-auto mt-24 w-full max-w-6xl sm:px-6 lg:px-8">

            {/* REVIEW SUMMARY */}

            <ReviewSummary
                averageRating={averageRating}
                totalReviews={reviews.length}
            />

            {/* ADD REVIEW BUTTON / FORM */}

            {user ? (

                <div className="mx-auto mt-10 w-full max-w-2xl">

                    {!showReviewForm ? (

                        /* ADD REVIEW BUTTON */

                        <div className="flex justify-center">

                            <button
                                type="button"
                                onClick={() => {
                                    setEditingReview(null);
                                    setShowReviewForm(true);
                                }}
                                className="
                                    glossy-button
                                    flex
                                    items-center
                                    gap-2
                                    rounded-xl
                                    px-7
                                    py-3
                                    font-semibold
                                    text-on-primary
                                    transition-all
                                    hover:scale-105
                                "
                            >

                                <span className="material-symbols-outlined">
                                    edit
                                </span>

                                Add Review

                            </button>

                        </div>

                    ) : (

                        /* REVIEW FORM */

                        <div
                            className="
                                overflow-hidden
                                rounded-3xl
                                border
                                border-primary/10
                                bg-background/70
                                shadow-sm
                                backdrop-blur-sm
                            "
                        >

                            <ReviewForm
                                existingReview={editingReview}
                                onSubmit={handleSubmit}
                                onCancel={handleCancel}
                            />

                        </div>

                    )}

                </div>

            ) : (

                /* LOGIN CARD */

                <div
                    className="
                        mx-auto
                        mt-12
                        flex
                        w-full
                        max-w-2xl
                        flex-col
                        items-center
                        rounded-3xl
                        border
                        border-primary/10
                        bg-surface-container
                        p-7
                        text-center
                        shadow-sm
                        transition-all
                        duration-500
                        hover:-translate-y-1
                        hover:shadow-warm-lg
                        sm:p-10
                    "
                >

                    <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-primary/10 text-primary">

                        <span className="material-symbols-outlined text-4xl text-primary">
                            lock
                        </span>

                    </div>

                    <h3 className="mt-4 font-display text-xl font-semibold text-on-surface">
                        Join the conversation
                    </h3>

                    <button
                        type="button"
                        onClick={() =>
                            setShowLoginModal(true)
                        }
                        className="
                            glossy-button
                            mt-6
                            w-fit
                            rounded-xl
                            px-7
                            py-3
                            font-semibold
                            text-on-primary
                            transition-all
                            hover:scale-105
                        "
                    >
                        Sign in to review
                    </button>

                </div>
            )}

            {/* REVIEWS */}

            <div className="mt-16">

                {reviews.length === 0 ? (

                    <div className="glass-widget rounded-3xl border border-primary/10 py-20 text-center">

                        <span className="material-symbols-outlined text-6xl text-primary/40">
                            reviews
                        </span>

                        <h3 className="mt-5 font-display text-headline-md text-on-surface">
                            No reviews yet
                        </h3>

                        <p className="mt-3 text-on-surface-variant">
                            Be the first traveller to share your journey
                        </p>

                    </div>

                ) : (

                    <div className="mx-auto w-full max-w-5xl">

                        <div
                            className="
                                overflow-x-auto
                                overflow-y-visible
                                pb-8
                                [scrollbar-width:none]
                                [&::-webkit-scrollbar]:hidden
                            "
                        >

                            <div className="flex w-max gap-6 snap-x snap-mandatory px-2">

                                {reviews.map((review) => (

                                    <div
                                        key={review.id}
                                        className="
                                            w-[calc(100vw-3rem)]
                                            max-w-[560px]
                                            shrink-0
                                            snap-center
                                            transition-transform
                                            duration-500
                                            hover:-translate-y-3
                                        "
                                    >

                                        <ReviewCard
                                            review={review}
                                            onEdit={() =>
                                                handleEdit(review)
                                            }
                                            onDelete={() =>
                                                setDeletingReview(
                                                    review
                                                )
                                            }
                                        />

                                    </div>

                                ))}

                            </div>

                        </div>

                    </div>
                )}

                {/* SWIPE INDICATOR */}

                {reviews.length > 1 && (

                    <div className="mt-2 flex items-center justify-center gap-2 text-xs text-on-surface-variant">

                        <span className="material-symbols-outlined text-sm">
                            swipe
                        </span>

                        <span>
                            Swipe to explore reviews
                        </span>

                    </div>

                )}

            </div>

            {/* DELETE MODAL */}

            {deletingReview && (

                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 px-4 backdrop-blur-md">

                    <div className="w-full max-w-md rounded-3xl border border-primary/10 bg-surface p-7 shadow-2xl animate-[fadeIn_0.2s_ease-out]">

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10">

                            <span className="material-symbols-outlined text-2xl text-red-500">
                                delete
                            </span>

                        </div>

                        <h3 className="mt-5 text-center font-display text-2xl font-semibold text-on-surface">
                            Delete your review?
                        </h3>

                        <div className="mt-7 flex gap-3">

                            <button
                                type="button"
                                onClick={() =>
                                    setDeletingReview(null)
                                }
                                className="
                                    flex-1
                                    rounded-xl
                                    border
                                    border-on-surface/10
                                    px-5
                                    py-3
                                    font-semibold
                                    text-on-surface
                                    transition-all
                                    hover:bg-surface-container
                                "
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={async () => {

                                    try {

                                        await onDeleteReview(
                                            deletingReview.id
                                        );

                                        setDeletingReview(null);

                                    } catch (error) {

                                        console.error(
                                            "Failed to delete review",
                                            error
                                        );

                                    }

                                }}
                                className="
                                    flex-1
                                    rounded-xl
                                    bg-red-500
                                    px-5
                                    py-3
                                    font-semibold
                                    text-white
                                    transition-all
                                    hover:-translate-y-0.5
                                    hover:bg-red-600
                                    hover:shadow-lg
                                "
                            >
                                Delete Review
                            </button>

                        </div>

                    </div>

                </div>
            )}

            {/* LOGIN MODAL */}

            <LoginModal
                open={showLoginModal}
                onClose={() =>
                    setShowLoginModal(false)
                }
            />

        </section>
    );
}