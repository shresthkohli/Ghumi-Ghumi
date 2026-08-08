import { formatDisplayTime, getTimeOfDayIcon } from "../utils/formatTime";

function ActivityCard({ activity, featured, onEdit, onDelete }) {
    
    const timeIcon = getTimeOfDayIcon(activity.startTime);
    const timeRange = `${formatDisplayTime(activity.startTime)} – ${formatDisplayTime(activity.endTime)}`;

    if (featured) {
        return (
            <article className="relative rounded-2xl overflow-hidden shadow-[0px_30px_60px_rgba(43,38,32,0.12)] bg-gradient-to-br from-primary-container/40 to-surface-container-low p-8 flex flex-col justify-between min-h-[320px] group">
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                        onClick={() => onEdit(activity)}
                        className="w-10 h-10 rounded-full bg-surface/90 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-primary"
                    >
                        <span className="material-symbols-outlined text-sm">edit</span>
                    </button>
                    <button
                        onClick={() => onDelete(activity.id)}
                        className="w-10 h-10 rounded-full bg-surface/90 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-error"
                    >
                        <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                </div>

                <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-primary">{timeIcon}</span>
                    <span className="font-label-lg text-label-lg text-primary tracking-wide">
                        {timeRange}
                    </span>
                </div>

                <div>
                    <h3 className="font-display-lg text-headline-lg text-on-surface mb-3">
                        {activity.title}
                    </h3>
                    {activity.description && (
                        <p className="font-body-lg text-body-lg text-on-surface-variant/80 max-w-md">
                            {activity.description}
                        </p>
                    )}
                </div>
            </article>
        );
    }

    return (
        <article className="bg-surface-container p-6 rounded-2xl shadow-[0px_10px_30px_rgba(43,38,32,0.05)] border border-surface-variant relative overflow-hidden group hover:shadow-[0px_20px_40px_rgba(43,38,32,0.08)] transition-all duration-300">
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                        {timeIcon}
                    </span>
                    <span className="font-label-md text-label-md text-on-surface-variant tracking-wide">
                        {timeRange}
                    </span>
                </div>

                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => onEdit(activity)}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-high"
                    >
                        <span className="material-symbols-outlined text-[16px]">edit</span>
                    </button>
                    <button
                        onClick={() => onDelete(activity.id)}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-error hover:bg-surface-container-high"
                    >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                    </button>
                </div>
            </div>

            <h3 className="font-headline-md text-headline-md text-on-surface mb-2">
                {activity.title}
            </h3>

            {activity.description && (
                <p className="font-body-md text-body-md text-on-surface-variant/80">
                    {activity.description}
                </p>
            )}
        </article>
    );
}

export default ActivityCard;