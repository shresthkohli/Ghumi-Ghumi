import StarRating from "./StarRating";

export default function ReviewSummary ({
    averageRating,
    totalReviews
}) {
    return (
        <div className="mx-auto max-w-4xl px-6">
        <div className="glass-widget relative rounded-3xl p-8 md:p-12 transition-all duration-500 hover:-translate-y-1 hover:shadow-warm-lg ">
            <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl"/>
             <div className="pointer-events-none absolute inset-3 rounded-[32px] border border-white/30" />
                <span className="absolute right-72 top-1 text-[140px] opacity-[0.06] text-primary select-none font-display">
                        🌍
                </span>

            <div className="relative z-10 inline-flex items-center gap-2 rounded-full bg-primary-fixed px-5 py-3 ">
                <span className="material-symbols-outlined text-primary text-lg">
                    hotel_class
                </span>
                <span className="tracking-wide text-primary font-semibold">
                    Guest Reviews
                </span>
            </div>

            <div className="relative z-10 mt-10 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
                <div>
                    <div className="flex items-end gap-3">
                        <div className=" absolute h-36 w-36 rounded-full "/>
                        <span className="font-display text-display-md text-primary">
                            {averageRating.toFixed(1)}
                        </span>
                        <span className="mb-2 text-on-surface-variant text-xl">
                            /5
                        </span>
                    </div>
                    <div className="mt-5 ">
                        <StarRating
                            rating={Math.round(averageRating)}
                            readOnly
                            size={24}
                        />
                    </div>
                    <p className="mt-6 text-on-surface-variant text-lg">
                        Based on{" "}
                    <span className="font-semibold text-on-surface mx-2">
                        {totalReviews}
                    </span>
                    {" "}traveller{totalReviews !== 1 ? "s" : ""}
                    </p>
                </div>
                <div className="flex items-start rounded-3xl bg-surface-container p-6 w-full max-w-2xl">
                    <div className="rounded-2xl bg-primary/10 p-2.5">
                        <span className="material-symbols-outlined text-primary">
                            edit_square
                        </span>
                    </div>
                    <div>
                    <h3 className="font-semibold text-on-surface text-headline-md px-3 mt-2.5">
                        Share your journey
                    </h3>
                    <p className=" mt-5 text-[16px] text-on-surface-variant leading-6">
                        Help future travellers by writing an honest review
                        about your experience
                    </p>
                    </div>
                </div>
                </div>
        </div>
        </div>
    );
}