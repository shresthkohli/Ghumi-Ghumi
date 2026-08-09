import {useState} from "react";
import {Link} from "react-router-dom";

import {useAuth} from "../../context/AuthContext";

import ReviewSummary from "./ReviewSummary";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";
import LoginModal from "../auth/LoginModal";

export default function ReviewSection({
    destination,
    reviews,
    onCreateReview,
    onUpdateReview,
    onDeleteReview
}) {
    const {user } = useAuth();
    const [editingReview , setEditingReview] = useState(null);
    const [showLoginModal , setShowLoginModal] = useState(false);
    const [deletingReview , setDeletingReview] = useState(null);

    const averageRating = reviews.length === 0 ? 0 : reviews.reduce((sum,review) => sum + review.rating,0) /
     reviews.length;

     async function handleSubmit(data) {
        if(editingReview) {
            await onUpdateReview(editingReview.id , data);
            setEditingReview(null);
        }
        else{
            await onCreateReview(data);
        }
     }
     return(
        <section className=" relative mx-auto mt-24 w-full max-w-6xl sm:px-6 lg:px-8">
                <ReviewSummary
                    averageRating={averageRating}
                    totalReviews = {reviews.length}
                />
                {user ? ( 
                    <div className="mx-auto mt-12 w-full max-w-2xl">
                        <div className="relative overflow-hidden rounded-3xl border border-primary/10 bg-surface-container p-5
                        shadow-sm transition-all duration:500 hover:-translate-y-1 hover:shadow-warm-lg sm:p-7">
                            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl"/>
                            <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                        <span className="material-symbols-outlined">
                                            edit_square
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="font-display text-lg font-semibold text-on-surface sm:text-xl">
                                                Share your journey
                                        </h3>
                                        <p className="mt-1 max-w-md text-sm leading-6 text-on-surface-variant">
                                                Tell future travellers what made your experience memorable
                                        </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 rounded-3xl border border-primary/10 bg-background/70 shadow-sm backdrop-blur-sm">
                    <ReviewForm
                            existingReview={editingReview}
                            onSubmit={handleSubmit}
                            onCancel={() => setEditingReview(null)}
                /> 
                </div> 
                </div> 
            ) : (
                        <div className=" mx-auto mt-12 w-full max-w-2xl relative overflow-hidden rounded-3xl border border-primary/10 bg-surface-container p-5
                        shadow-sm transition-all duration:500 hover:-translate-y-1 hover:shadow-warm-lg sm:p-7">
                    <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-3xl bg-primary/10 text-primary">
                        <span className="materials-symbols-outlined text-5xl text-primary">
                            lock
                        </span>
                        </div>
                        <h3 className="mt-4 font-display text-xl font-semibold text-on-surface"> 
                            Join the conversation
                        </h3>
                        <button
                            type="button"
                            onClick={() => setShowLoginModal(true)}
                            className="glossy-button mt-6 rounded-xl px-7 py-3 font-semibold text-on-primary transition-all hover:scale-105"
                        >
                            Sign in to review
                        </button>
                    </div>
                )}
                <div className="space-y-8">
                        {reviews.length === 0 ? (
                            <div className="glass-widget rounded-3xl border border-primary/10 py-20 text-center">
                                <span className="material-symbols-outlined text-6xl text-primary/40">
                                    reviews
                                </span>
                                <h3 className="mt-5 font-display  text-on-surface text-headline-md">
                                    No reviews yet
                                </h3>
                                <p className="mt-3 text-on-surface-variant">
                                    Be the first traveller to share your journey
                                </p>
                            </div>
                        ) : (
                            <div className="  mt-12 mx-auto w-full max-w-4xl overflow-x-auto overflow-y-visible pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            <div className="flex w-max gap-5 snap-x snap-mandatory">
                            {reviews.map((review) => (
                                <div className="w-[calc(100vw-3rem)] max-w-[560px] shrink-0 snap-center transition-transform duration-500 hover:-translate-3 ">
                                <ReviewCard
                                    key={review.id}
                                    review={review}
                                    onEdit={() =>
                                        setEditingReview(review)}
                                    onDelete={() => setDeletingReview(review)}
                                />
                                </div>
                            ))}
                            </div>
                        </div>
                        )}

                {reviews.length > 1 && (
                    <div className="mt-2 flex items-center justify-center gap-2 text-xs text-on-surface-variant">
                        <span className="material-symbols-outlined text-sm">
                            swipe
                        </span>
                    </div>
                )}
                </div>
                {deletingReview && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-md px-4">
                        <div className="w-full max-w-md rounded-3xl bg-surface p-7 shadow-2xl border border-primary/10 animate-[fadeIn_0.2s_ease-out]">
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
                                    onClick={() => setDeletingReview(null)}
                                    className="flex-1 rounded-xl border border-on-surface/10 px-5 py-3 font-semibold text-on-surface transition-all hover:bg-surface-container"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={async() => {
                                        try{
                                            await onDeleteReview(deletingReview.id);
                                            setDeletingReview(null);
                                        } catch (error) {
                                            console.error("Failed to delete review");
                                        }
                                    }} 
                                    className="flex-1 rounded-xl bg-red-500 px-5 py-3 font-semibold text-white transition-all hover:bg-red-600 hover:-translate-y-0.5 hover:shadow-lg"
                                >
                                    Delete Review
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <LoginModal
                    open={showLoginModal}
                    onClose={() => setShowLoginModal(false)}
                />

        </section>
     )
}