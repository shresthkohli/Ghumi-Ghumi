import StarRating from "./StarRating";

export default function ReviewCard({
    review,
    onEdit,
    onDelete
}) {
    const initials = review.userName 
    ?.split(" ")
    .map(word => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

    const date = new Date(review.createdAt).toLocaleDateString(
        "en-US",
        {
            month:"short",
            day:"numeric",
            year:"numeric"
        }
    );
    return(
        <div className="glass-widget bg-gradient-to-br from-primary to-primary-container rounded-xl p-6 transition-all duration-300 hover:translate-y-1 border border-white/30 hover:shadow-warm-lg">
            <div className="flex items-start justify-between">
                <div className="flex gap-4">
                    <div className="flex shrink-0 h-12 w-12 rounded-full bg-primary-container text-on-primary items-center justify-center font-semibold text-lg">
                        {initials}
                    </div>
                <div>
                    <h3 className="font-semibold text-on-surface">
                        {review.userName}
                    </h3>
                    <span
                    className="rounded-full bg-secondary-container px-2 py-0.5 text-xs font-medium text-secondary"
                    >
                    Verified Traveller
                </span>
                    <p className="text-sm text-on-surface-variant">
                        {date}
                    </p>
                </div>
            </div>
            <StarRating 
                rating={review.rating}
                readOnly
                size={26}
            />
        </div>
        <p className="text-5xl leading-none text-primary opacity-25 mt-6 ">
            ❝
        </p>
        <p className="mt-2 leading-7 text-on-surface tracking-wide">
            {review.review}
        </p>
        {review.isOwner && (
            <div className="mt-6 flex justify-end gap-3"> 
            <button 
                onClick={() => onEdit(review)}
                className="rounded-xl border border-outline-variant px-4 py-2 text-sm hover:bg-surface-container transition-all"
            >
                ✏ Edit
            </button>
             <button 
                onClick={() => onDelete(review.id)}
                className="rounded-xl border border-error px-4 py-2 text-sm hover:bg-red-100 transition-all"
            >
                 🗑 Delete
            </button>
            </div>
        )}
        </div>       
    );
}