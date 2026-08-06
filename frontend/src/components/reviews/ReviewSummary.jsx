import StarRating from "./StarRating";

export default function ReviewSummary ({
    averageRating,
    totalReviews
}) {
    return (
        <div className="glass-widget rounded-3xl p-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-fixed px-6 py-4">
                <span className="material-symbols-outlined text-primary text-lg">
                    hotel_class
                </span>
                <span className="text-label-lg font-sans text-primary font-semibold">
                    Guest Reviews
                </span>
            </div>
            <h2 className="mt-5 font-display text-display-md text-on-surface">
                What Travellers Say
            </h2>
            <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                <div>
                    <div className="flex items-end gap-3">
                        <span className="font-display text-display-md text-primary">
                            {averageRating.toFixed(1)}
                        </span>
                        <span className="mb-2 text-on-surface-variant">
                            /5
                        </span>
                    </div>
                    <div className="mt-3">
                        <StarRating
                            rating={Math.round(averageRating)}
                            readOnly
                            size={24}
                        />
                    </div>
                    <p className="mt-3 text-on-surface-variant">
                        Based on{" "}
                    <span className="font-semibold text-on-surface">
                        {totalReviews}
                    </span>
                    {" "}traveller{totalReviews !== 1 ? "s" : ""}
                    </p>
                </div>
                <div className="rounded-2xl bg-surface-container p-6 max-w-sm">
                    <h3 className="font-semibold text-on-surface">
                        Share your journey
                    </h3>
                    <p className="mt-2 text-sm text-on-surface-variant leading-6">
                        Help future travellers by writing an honest review
                        about your experience
                    </p>
                </div>
            </div>
        </div>
    );
}