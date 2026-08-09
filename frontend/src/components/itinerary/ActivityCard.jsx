import { useRef } from "react";
import { formatDisplayTime, getTimeOfDayIcon, calculateDuration } from "../../utils/formatTime";
import { getActivityGradient } from "../../utils/gradientUtils";

function ActivityCard({ activity, index = 0, featured = false, onEdit, onDelete }) {
    const cardRef = useRef(null);

    const palette = getActivityGradient(activity, index);
    const timeIcon = getTimeOfDayIcon(activity.startTime);
    const startDisplay = formatDisplayTime(activity.startTime);
    const endDisplay = formatDisplayTime(activity.endTime);
    const durationInfo = calculateDuration(activity.startTime, activity.endTime);

    // Subtle 3D tilt effect on mouse move
    function handleMouseMove(e) {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    }

    function handleMouseLeave() {
        if (!cardRef.current) return;
        cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    }

    // ── Featured / Hero Card (Scrapbook + Gradient Luxury) ──
    if (featured) {
        return (
            <article
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    background: palette.bgGradient,
                    borderColor: palette.cardBorder,
                    boxShadow: `0 20px 40px -15px ${palette.accentGlow}, 0 10px 25px rgba(43,38,32,0.06)`,
                    transition: "transform 0.25s ease-out, box-shadow 0.25s ease-out",
                }}
                className="relative rounded-3xl overflow-hidden border p-7 md:p-9 min-h-[380px] md:min-h-[440px] group flex flex-col justify-between"
            >
                {/* Decorative floating organic shapes */}
                <div
                    style={{ background: palette.organicBlob }}
                    className="absolute -top-12 -right-12 w-64 h-64 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-700"
                />
                <div
                    style={{ background: palette.accentGlow }}
                    className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700 opacity-60"
                />

                {/* Top Row: Time & Palette Badge + Action Buttons */}
                <div className="flex justify-between items-start relative z-20">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span
                            style={{ backgroundColor: palette.badgeBg, color: palette.badgeText }}
                            className="font-body text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm backdrop-blur-sm tracking-wide uppercase"
                        >
                            <span className="material-symbols-outlined text-[15px]">{timeIcon}</span>
                            <span>{startDisplay}</span>
                            {endDisplay && <span className="opacity-70">– {endDisplay}</span>}
                        </span>

                        {durationInfo.text && (
                            <span className="bg-surface/80 backdrop-blur-md text-on-surface-variant font-body text-xs font-medium px-2.5 py-1 rounded-full border border-surface-variant/40 shadow-xs">
                                ⏱️ {durationInfo.text}
                            </span>
                        )}
                    </div>

                    {/* Floating Action Buttons */}
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                        <button
                            onClick={() => onEdit(activity)}
                            title="Edit Activity"
                            className="w-9 h-9 rounded-full bg-surface/90 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-primary shadow-md hover:scale-110 transition-all duration-200"
                        >
                            <span className="material-symbols-outlined text-base">edit</span>
                        </button>
                        <button
                            onClick={() => onDelete(activity.id)}
                            title="Delete Activity"
                            className="w-9 h-9 rounded-full bg-surface/90 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-error shadow-md hover:scale-110 transition-all duration-200"
                        >
                            <span className="material-symbols-outlined text-base">delete</span>
                        </button>
                    </div>
                </div>

                {/* Bottom Scrapbook Overlapping Paper Tag */}
                <div
                    style={{ borderLeftColor: palette.paperBorder }}
                    className="relative z-10 bg-surface/95 backdrop-blur-md text-on-surface p-6 rounded-2xl shadow-[0_15px_35px_rgba(43,38,32,0.1)] border-l-4 border-t border-r border-b border-surface-variant/30 mt-auto transform group-hover:-translate-y-1 transition-transform duration-300"
                >
                    <div className="flex items-center justify-between gap-3 mb-2">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-primary/80">
                            Key Experience
                        </span>
                        <span className="text-[11px] text-on-surface-variant/60 font-medium">
                            Day {activity.dayNumber}
                        </span>
                    </div>

                    <h3 className="font-display text-2xl md:text-3xl font-bold text-on-surface mb-2.5 leading-tight group-hover:text-primary transition-colors duration-200">
                        {activity.title}
                    </h3>

                    {activity.description && (
                        <p className="font-body text-sm text-on-surface-variant/85 leading-relaxed line-clamp-3">
                            {activity.description}
                        </p>
                    )}
                </div>
            </article>
        );
    }

    // ── Regular / Compact Activity Card ──
    return (
        <article
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                background: palette.bgGradient,
                borderColor: palette.cardBorder,
                boxShadow: `0 12px 30px -10px ${palette.accentGlow}, 0 4px 15px rgba(43,38,32,0.04)`,
                transition: "transform 0.25s ease-out, box-shadow 0.25s ease-out",
            }}
            className="rounded-3xl p-6 md:p-7 border relative overflow-hidden group flex flex-col justify-between"
        >
            {/* Decorative soft corner blob */}
            <div
                style={{ background: palette.organicBlob }}
                className="absolute top-0 right-0 w-40 h-40 rounded-bl-[100px] pointer-events-none group-hover:scale-125 transition-transform duration-700"
            />

            <div className="relative z-10">
                {/* Top Time & Actions Header */}
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span
                            style={{ backgroundColor: palette.badgeBg, color: palette.badgeText }}
                            className="font-body text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-2xs backdrop-blur-sm tracking-wide"
                        >
                            <span className="material-symbols-outlined text-[15px]">{timeIcon}</span>
                            <span>{startDisplay}</span>
                            {endDisplay && <span className="opacity-70">– {endDisplay}</span>}
                        </span>

                        {durationInfo.text && (
                            <span className="bg-surface/80 text-on-surface-variant font-body text-xs font-medium px-2.5 py-1 rounded-full border border-surface-variant/40">
                                {durationInfo.text}
                            </span>
                        )}
                    </div>

                    {/* Action buttons on hover */}
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                            onClick={() => onEdit(activity)}
                            title="Edit Activity"
                            className="w-8 h-8 rounded-full bg-surface/90 hover:bg-surface flex items-center justify-center text-on-surface-variant hover:text-primary shadow-xs hover:scale-110 transition-all duration-200"
                        >
                            <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                        <button
                            onClick={() => onDelete(activity.id)}
                            title="Delete Activity"
                            className="w-8 h-8 rounded-full bg-surface/90 hover:bg-surface flex items-center justify-center text-on-surface-variant hover:text-error shadow-xs hover:scale-110 transition-all duration-200"
                        >
                            <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <h3 className="font-display text-xl md:text-2xl font-bold text-on-surface mb-2 leading-snug group-hover:text-primary transition-colors duration-200">
                    {activity.title}
                </h3>

                {activity.description && (
                    <p className="font-body text-sm text-on-surface-variant/80 line-clamp-3 leading-relaxed">
                        {activity.description}
                    </p>
                )}
            </div>
        </article>
    );
}

export default ActivityCard;