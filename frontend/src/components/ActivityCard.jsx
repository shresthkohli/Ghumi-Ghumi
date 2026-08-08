import { formatDisplayTime, getTimeOfDayIcon } from "../utils/formatTime";

function ActivityCard({ activity, featured, onEdit, onDelete }) {

    const timeIcon = getTimeOfDayIcon(activity.startTime);
    const startDisplay = formatDisplayTime(activity.startTime);
    const endDisplay = formatDisplayTime(activity.endTime);

    // Compute duration string
    function getDuration() {
        if (!activity.startTime || !activity.endTime) return "";
        const [sh, sm] = activity.startTime.split(":").map(Number);
        const [eh, em] = activity.endTime.split(":").map(Number);
        const diff = (eh * 60 + em) - (sh * 60 + sm);
        if (diff <= 0) return "";
        const hours = Math.floor(diff / 60);
        const mins = diff % 60;
        if (hours > 0 && mins > 0) return `${hours}h ${mins}m`;
        if (hours > 0) return `${hours}h`;
        return `${mins}m`;
    }

    const duration = getDuration();

    // ── Featured / Hero Card ──
    // Large card with gradient background, scrapbook-style overlapping paper tag
    if (featured) {
        return (
            <article className="relative rounded-2xl overflow-hidden shadow-[0px_30px_60px_rgba(43,38,32,0.12)] bg-gradient-to-br from-primary-container/30 via-primary-fixed/20 to-surface-container-low min-h-[380px] md:min-h-[460px] group cursor-pointer flex flex-col justify-end">
                {/* Decorative organic shapes */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary-fixed/15 rounded-bl-[100px] -z-0" />
                <div className="absolute bottom-20 right-12 w-24 h-24 bg-secondary-container/20 rounded-full -z-0" />

                {/* Floating action buttons */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <button
                        onClick={() => onEdit(activity)}
                        className="w-10 h-10 rounded-full bg-surface/90 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-primary transition-colors"
                    >
                        <span className="material-symbols-outlined text-sm">edit</span>
                    </button>
                    <button
                        onClick={() => onDelete(activity.id)}
                        className="w-10 h-10 rounded-full bg-surface/90 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-error transition-colors"
                    >
                        <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                </div>

                {/* Scrapbook-style overlapping paper tag at bottom-left */}
                <div className="relative z-10 -ml-4 mb-6 bg-surface text-on-surface px-6 py-5 rounded-r-xl shadow-2xl max-w-[88%] border-l-4 border-primary">
                    <div className="flex items-center gap-2 mb-1.5">
                        <span className="material-symbols-outlined text-[16px] text-primary">{timeIcon}</span>
                        <span className="font-body text-xs font-semibold text-primary tracking-wide">
                            {startDisplay}
                        </span>
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-on-surface mb-2 leading-tight">
                        {activity.title}
                    </h3>
                    {activity.description && (
                        <p className="font-body text-sm text-on-surface-variant/80 line-clamp-2">
                            {activity.description}
                        </p>
                    )}
                </div>
            </article>
        );
    }

    // ── Regular / Compact Card ──
    // Text-based tactile card with decorative corner accent
    return (
        <article className="bg-surface-container p-6 md:p-8 rounded-2xl shadow-[0px_10px_30px_rgba(43,38,32,0.05)] border border-surface-variant relative overflow-hidden group hover:shadow-[0px_20px_40px_rgba(43,38,32,0.08)] transition-all duration-300">
            {/* Decorative corner blob */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-fixed/20 rounded-bl-full -z-0" />

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-on-surface-variant">{timeIcon}</span>
                        <span className="font-body text-xs font-medium text-on-surface-variant tracking-wide">
                            {startDisplay}
                            {duration && (
                                <span className="text-on-surface-variant/60 ml-1">({duration})</span>
                            )}
                        </span>
                    </div>

                    {/* Hover action buttons */}
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={() => onEdit(activity)}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors"
                        >
                            <span className="material-symbols-outlined text-[16px]">edit</span>
                        </button>
                        <button
                            onClick={() => onDelete(activity.id)}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-error hover:bg-surface-container-high transition-colors"
                        >
                            <span className="material-symbols-outlined text-[16px]">delete</span>
                        </button>
                    </div>
                </div>

                <h3 className="font-display text-xl font-semibold text-on-surface mb-2 leading-tight">
                    {activity.title}
                </h3>

                {activity.description && (
                    <p className="font-body text-sm text-on-surface-variant/80 line-clamp-3">
                        {activity.description}
                    </p>
                )}
            </div>
        </article>
    );
}

export default ActivityCard;