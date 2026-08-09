import StarRating from "./StarRating";

export default function ReviewCard({
    review,
    onEdit,
    onDelete
}) {
    const userName = review.userName || "Traveller";
    const initials = userName
        .split(" ")
        .map(word => word[0])
        .filter(Boolean)
        .join("")
        .slice(0, 2)
        .toUpperCase() || "T";

    const formattedDate = review.createdAt
        ? new Date(review.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric"
          })
        : "Recently";

    return (
        <div className="group relative flex flex-col justify-between rounded-3xl border border-outline-variant/40 bg-surface-container/60 p-6 sm:p-7 backdrop-blur-sm shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-warm-lg hover:border-primary/40">
            {/* Subtle top ambient shimmer on hover */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div>
                {/* Header: User Info & Rating */}
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                        {/* Avatar */}
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-container font-display text-sm font-bold text-white shadow-xs">
                            {initials}
                        </div>

                        <div>
                            <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="font-display text-base font-bold text-on-surface">
                                    {userName}
                                </h4>
                                <span className="inline-flex items-center gap-1 rounded-full bg-secondary-container/70 border border-secondary/20 px-2 py-0.5 text-[10px] font-bold text-secondary uppercase tracking-wider">
                                    <span className="material-symbols-outlined text-[12px]">verified</span>
                                    Verified
                                </span>
                            </div>

                            <p className="font-body text-xs text-on-surface-variant/70 mt-0.5 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[13px]">calendar_today</span>
                                {formattedDate}
                            </p>
                        </div>
                    </div>

                    {/* Star Rating */}
                    <div className="shrink-0 bg-surface/80 rounded-xl px-2.5 py-1.5 border border-outline-variant/30 shadow-2xs">
                        <StarRating
                            rating={review.rating}
                            readOnly
                            size={16}
                        />
                    </div>
                </div>

                {/* Review Text */}
                <div className="mt-5 relative">
                    <span className="material-symbols-outlined text-3xl text-primary/25 absolute -top-3 -left-1 select-none pointer-events-none" style={{ fontVariationSettings: "'FILL' 1" }}>
                        format_quote
                    </span>
                    <p className="font-body text-sm sm:text-base text-on-surface/90 leading-relaxed pl-6 pt-1 whitespace-pre-line">
                        {review.review}
                    </p>
                </div>
            </div>

            {/* Footer / Owner Actions */}
            {review.isOwner && (
                <div className="mt-6 flex items-center justify-end gap-2 pt-4 border-t border-outline-variant/20">
                    <button
                        type="button"
                        onClick={() => onEdit(review)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-outline-variant/50 bg-surface px-3.5 py-1.5 font-body text-xs font-semibold text-on-surface hover:bg-surface-container hover:border-primary/40 hover:text-primary transition-all duration-200 cursor-pointer shadow-2xs"
                    >
                        <span className="material-symbols-outlined text-[14px]">edit</span>
                        Edit
                    </button>

                    <button
                        type="button"
                        onClick={() => onDelete(review.id)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-error/20 bg-error/5 px-3.5 py-1.5 font-body text-xs font-semibold text-error hover:bg-error hover:text-white transition-all duration-200 cursor-pointer shadow-2xs"
                    >
                        <span className="material-symbols-outlined text-[14px]">delete</span>
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}