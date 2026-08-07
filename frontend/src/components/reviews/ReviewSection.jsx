import {useState} from "react";
import {Link} from "react-router-dom";

import {useAuth} from "../../context/AuthContext";

import ReviewSummary from "./ReviewSummary";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";

export default function ReviewSection({
    destination,
    reviews,
    onCreateReview,
    onUpdateReview,
    onDeleteReview
}) {
    const {user } = useAuth();
    const [editingReview , setEditingReview] = useState(null);

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
        <section className="mx-auto mt-24 max-w-6xl space-y-12">
                <ReviewSummary
                    averageRating={averageRating}
                    totalReviews = {reviews.length}
                />
                {user ? ( <ReviewForm
                            exisitingReview={editingReview}
                            onSubmit={handleSubmit}
                            onCancel={() => setEditingReview(null)}
                />) : (
                    <div className="glass-widget rounded-3xl p-8 text-center">
                        <span className="material-symbols-outlined text-5xl text-primary">
                            lock
                        </span>
                        <h3 className="mt-4 font-display text-headline-md text-on-surface">
                            Share Your travel story 
                        </h3>
                        <Link
                            to ="/login"
                            className="inline-block mt-8 glossy-button rounded-2xl px-8 py-4 text-on-primary font-semibold transition-all hover:scale-105"
                        >
                            Sign In to Write Review
                        </Link>
                    </div>
                )}
                <div className="space-y-8">
                        {reviews.lenght === 0 ? (
                            <div className="glass-widget rounded-3xl py-20 text-center">
                                <span className="material-symbols-outlined text-6xl text-primary/40">
                                    reviews
                                </span>
                                <h3 className="mt-5 font-display text-headline-md">
                                    No reviews yet
                                </h3>
                                <p className="mt-3 text-on-surface-variant">
                                    Be the first traveller to share your journey
                                </p>
                            </div>
                        ) : (
                            reviews.map((review) => (
                                <ReviewCard
                                    key={review.id}
                                    review={review}
                                    onEdit={() => setEditingReview(review)}
                                    onDelete={() => onDeleteReview(review.id)}
                                />
                            ))
                        )}
                </div>
        </section>
     )
}