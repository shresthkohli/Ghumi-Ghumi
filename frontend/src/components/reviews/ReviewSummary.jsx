import StarRating from "./StarRating";

export default function ReviewSummary({
    averageRating = 0,
    totalReviews = 0,
    reviews = [],
    onWriteReview,
    activeRatingFilter = null,
    onSelectRatingFilter = () => {},
}) {
    // Calculate star breakdown distribution
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => {
        const rating = Math.min(5, Math.max(1, Math.round(r.rating || 0)));
        if (counts[rating] !== undefined) {
            counts[rating] += 1;
        }
    });

    const positiveCount = (counts[5] || 0) + (counts[4] || 0);
    const positivePercentage = totalReviews > 0 ? Math.round((positiveCount / totalReviews) * 100) : 100;

    return (
        <div className="mx-auto w-full max-w-5xl">
            <div className="glass-widget relative rounded-3xl border border-outline-variant/30 p-5 sm:p-8 md:p-10 shadow-warm-lg backdrop-blur-md overflow-hidden transition-all duration-300">
                {/* Decorative background glow */}
                <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
                <div className="absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

                {/* Section Header Badge */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary-fixed/60 border border-primary/20 px-3.5 sm:px-4 py-1 sm:py-1.5 shadow-2xs">
                        <span className="material-symbols-outlined text-primary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                            hotel_class
                        </span>
                        <span className="font-body text-xs font-bold uppercase tracking-wider text-primary">
                            Traveller Reviews & Feedback
                        </span>
                    </div>

                    {totalReviews > 0 && (
                        <div className="inline-flex items-center gap-1.5 text-xs font-medium text-on-surface-variant bg-surface-container px-3 py-1 rounded-full border border-outline-variant/30">
                            <span className="material-symbols-outlined text-sm text-secondary">verified</span>
                            <span>{positivePercentage}% Recommended</span>
                        </div>
                    )}
                </div>

                {/* Main 2-Column Editorial Grid */}
                <div className="relative z-10 grid gap-6 sm:gap-8 lg:grid-cols-12 lg:items-center">
                    {/* Left Column: Big Rating & Star Breakdown */}
                    <div className="lg:col-span-7 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
                        {/* Rating Hero */}
                        <div className="flex flex-col items-start shrink-0 min-w-[140px]">
                            <div className="flex items-baseline gap-1.5">
                                <span className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-primary tracking-tight">
                                    {averageRating.toFixed(1)}
                                </span>
                                <span className="text-on-surface-variant font-body text-xl font-medium">
                                    / 5
                                </span>
                            </div>

                            <div className="mt-2">
                                <StarRating
                                    rating={Math.round(averageRating)}
                                    readOnly
                                    size={22}
                                />
                            </div>

                            <p className="mt-2.5 font-body text-sm text-on-surface-variant font-medium">
                                Based on <strong className="text-on-surface">{totalReviews}</strong> {totalReviews === 1 ? "review" : "reviews"}
                            </p>
                        </div>

                        {/* Star Distribution Progress Bars */}
                        <div className="flex-1 w-full flex flex-col gap-2 pt-1 border-t sm:border-t-0 sm:border-l border-outline-variant/30 sm:pl-8">
                            {[5, 4, 3, 2, 1].map((stars) => {
                                const count = counts[stars] || 0;
                                const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                                const isSelected = activeRatingFilter === stars;

                                return (
                                    <button
                                        key={stars}
                                        type="button"
                                        onClick={() => onSelectRatingFilter(isSelected ? null : stars)}
                                        className={`group flex items-center gap-3 w-full text-left rounded-lg px-2 py-1 transition-colors cursor-pointer ${
                                            isSelected ? "bg-primary/10 ring-1 ring-primary/30" : "hover:bg-surface-container/60"
                                        }`}
                                    >
                                        <span className="font-body text-xs font-semibold text-on-surface w-7 shrink-0 flex items-center gap-0.5">
                                            {stars} <span className="material-symbols-outlined text-[13px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        </span>

                                        <div className="flex-1 h-2 rounded-full bg-surface-container-high overflow-hidden relative">
                                            <div
                                                className="h-full rounded-full bg-gradient-to-r from-primary to-primary-container transition-all duration-500 ease-out"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>

                                        <span className="font-body text-xs text-on-surface-variant w-8 text-right shrink-0">
                                            {count}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Column: Call to Action Card */}
                    <div className="lg:col-span-5 h-full">
                        <div className="h-full rounded-2xl bg-surface-container/80 border border-outline-variant/30 p-6 flex flex-col justify-between shadow-xs">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        <span className="material-symbols-outlined text-xl">
                                            edit_note
                                        </span>
                                    </div>
                                    <h3 className="font-display text-xl font-bold text-on-surface">
                                        Share Your Journey
                                    </h3>
                                </div>
                                <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                                    Have you visited this destination? Leave a review and help fellow wanderers plan their perfect getaway.
                                </p>
                            </div>

                            {onWriteReview && (
                                <div className="mt-5">
                                    <button
                                        type="button"
                                        onClick={onWriteReview}
                                        className="glossy-button w-full sm:w-auto flex items-center justify-center gap-2 rounded-full px-6 py-2.5 font-body text-sm font-semibold text-on-primary hover:scale-102 active:scale-98 transition-all cursor-pointer"
                                    >
                                        <span className="material-symbols-outlined text-base">rate_review</span>
                                        Write a Review
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}