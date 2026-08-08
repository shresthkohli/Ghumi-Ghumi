import {useState , useEffect} from "react";
import StarRating from "./StarRating";

export default function ReviewForm({
    existingReview = null,
    onSubmit,
    onCancel,
    loading=false
}) {
    const[rating , setRating] = useState(0);
    const[review , setReview] = useState("");
    const[errors, setErrors] = useState({
        rating: "",
        review: ""
    });
    useEffect(() => {
        if(existingReview){
            setRating(existingReview.rating);
            setReview(existingReview.review);
        } else {
            setRating(0);
            setReview("");
        }
    },[existingReview]);

    function handleSubmit(e) {
        e.preventDefault();

        const newErrors = {
            rating : "",
            review: ""
        };

        if(rating === 0) {
            newErrors.rating = "Please select a rating";
        }

        if(!review.trim()){
            newErrors.review = "Please write your review";
        }

        setErrors(newErrors);

        if(newErrors.rating || newErrors.review) {
            return;
        }
        
        onSubmit({
            rating,
            review
        });

        if(!existingReview) {
            setRating(0);
            setReview("");

            setErrors({
                rating : "",
                review: ""
            });
        }
    }
    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-surface to-surface-container rounded-3xl p-8">
            <span className="absolute top-6 right-8 text-5xl opacity-10 text-primary rotate-12 pointer-events-none">
                ✦
            </span>

            <span className="absolute bottom-8 left-10 text-4xl opacity-10 text-secondary rotate-[-20deg] pointer-events-none">
                ✧
            </span>

            <span className="absolute top-1/2 right-1/4 text-3xl opacity-10 text-tertiary pointer-events-none">
                ✦
            </span>
           <div className="mb-8 flex items-center gap-4 border-b border-outline-variant pb-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-container shadow-md">
                    <span className="material-symbols-outlined text-3xl text-on-primary">
                            travel_explore
                    </span>

                </div>
            <div>
                <h2 className="font-display text-headline-lg text-primary">
                    {existingReview
                        ? "Update Your Review"
                        : "Share Your Experience"}
                </h2>
                <p className="mt-1 text-on-surface-variant">
                    Inspire fellow travellers with your experience.
                </p>
            </div>
        </div>
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div>
                    <label className="block text-label text-on-surface mb-3">
                            Your Rating
                    </label>
                    <StarRating 
                        rating={rating}
                        onChange={(value) => {
                            setRating(value);

                            setErrors(prev => ({
                                ...prev,
                                rating: ""
                            }));
                        }}
                        size={30}
                    />
                     <p className="mt-3 text-primary font-medium">
                    {[
                        "",
                        "Poor 😕",
                        "Fair 🙂",
                        "Good 😊",
                        "Great 😍",
                        "Excellent ✨"
                    ][rating]}
                </p>
                    {errors.rating && (
                        <p className="mt-2 text-sm text-error">
                            {errors.rating}
                        </p>
                    )}
                </div>
                <div>
                    <label className="block text-label-lg text-on-surface mb-3">
                        Your Review
                    </label>
                    <textarea
                        rows={5}
                        value={review}
                        onChange={(e) =>{ 
                            setReview(e.target.value);

                            setErrors(prev => ({
                                        ...prev,
                                        review:""
                            }));
                        }}
                        placeholder="Share your experience with future travellers..."
                        className="w-full rounded-2xl border border-outline-variant bg-surface px-5 py-4 resize-none text-body-md text-on-surface placeholder:text-on-surface-variant outline-none transition-all 
                        duration-300 focus:shadow-[0_0_25px_rgba(232,115,74,0.25)] focus:ring-4 focus:ring-primary/15"
                    />
                    {errors.review && (
                        <p className="mt-2 text-sm text-error">
                                {errors.review}
                        </p>
                    )}
                    <div className="mt-2 text-right text-label-md text-on-surface-variant">
                        {review.length}/1000
                    </div>
                </div>
                <div className="flex justify-end gap-3">
                    {existingReview && (
                        <button 
                        type="button"
                        onClick={onCancel}
                        className="rounded-xl border border-outline-variant px-6 py-3 font-medium text-on-surface hover:bg-surface-container hover: scale-105 transition-all"
                        >
                            Cancel
                        </button>
                    )}
                    <button type="submit"
                            disabled={loading}
                            className="glossy-button rounded-xl px-8 py-3 text-on-primary font-semibold disabled:opacity-50 hover:scale-105 gap-2 flex items-center transition-all"
                    >
                    <span className="material-symbols-outlined text-lg">
                        publish
                    </span>
                        {loading ? "Publishing..." : existingReview ? "Update Review" : "Submit Review"}
                    </button>
                </div>
            </form>
        </div>
    );
}
