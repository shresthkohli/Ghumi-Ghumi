import { useRef } from "react";
import gsap from "gsap";

/**
 * Rotating palette of warm editorial gradients — cycles through
 * terracotta, sage-green, and ocean-teal tones so adjacent cards
 * never look the same.
 */
const CARD_PALETTES = [
    {
        gradient: "linear-gradient(135deg, #fff3ee 0%, #ffe0d3 45%, #ffd4c2 100%)",
        accent: "#a23f1a",
        border: "#fca88f",
    },
    {
        gradient: "linear-gradient(135deg, #f0f8ee 0%, #d7f0d2 45%, #c2e8bc 100%)",
        accent: "#4e6447",
        border: "#98dca2",
    },
    {
        gradient: "linear-gradient(135deg, #eaf8f8 0%, #ccf0f0 45%, #b4e8e8 100%)",
        accent: "#276868",
        border: "#78d4d4",
    },
    {
        gradient: "linear-gradient(135deg, #fff8ee 0%, #ffe8cc 45%, #ffddb3 100%)",
        accent: "#8b6914",
        border: "#f0c878",
    },
];

/**
 * Turn an ISO timestamp into a friendly relative string.
 */
function timeAgo(dateString) {
    const now = new Date();
    const date = new Date(dateString);
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return "Just now";

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;

    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo ago`;

    return `${Math.floor(months / 12)}y ago`;
}

/**
 * Estimate reading time from the raw content string.
 */
function readingTime(content) {
    const words = content.trim().split(/\s+/).length;
    const mins = Math.max(1, Math.round(words / 200));
    return `${mins} min read`;
}

/**
 * BlogCard — supports a `size` prop for the bento grid layout.
 *
 *  "tall"   → spans 2 rows, larger title, more content lines
 *  "wide"   → spans 2 columns, horizontal layout on desktop
 *  "normal" → default 1×1 card
 */
export default function BlogCard({
    blog,
    index = 0,
    size = "normal",
    isOwner = false,
    onEdit,
    onDelete,
    onClick,
}) {
    const palette = CARD_PALETTES[index % CARD_PALETTES.length];
    const cardRef = useRef(null);

    function handleMouseEnter() {
        if (!cardRef.current) return;
        gsap.to(cardRef.current, {
            y: -6,
            boxShadow: "0 20px 40px -8px rgba(43,38,32,0.15)",
            duration: 0.35,
            ease: "power2.out",
        });
    }

    function handleMouseLeave() {
        if (!cardRef.current) return;
        gsap.to(cardRef.current, {
            y: 0,
            boxShadow: "0 4px 12px -2px rgba(43,38,32,0.06)",
            duration: 0.35,
            ease: "power2.out",
        });
    }

    const avatarFallback = blog.user?.name
        ? blog.user.name
            .split(" ")
            .map((w) => w[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
        : "?";

    // Adaptive content clamp based on card size
    const titleClamp = size === "tall" ? "line-clamp-3" : "line-clamp-2";
    const contentClamp =
        size === "tall"
            ? "line-clamp-[8]"
            : size === "wide"
                ? "line-clamp-4"
                : "line-clamp-3";
    const titleSize =
        size === "tall"
            ? "text-2xl sm:text-3xl"
            : size === "wide"
                ? "text-xl sm:text-2xl"
                : "text-lg sm:text-xl";

    return (
        <article
            ref={cardRef}
            data-animate-card
            onClick={() => onClick?.(blog)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                background: palette.gradient,
                borderColor: palette.border,
            }}
            className="rounded-3xl border shadow-sm relative overflow-hidden flex flex-col group transition-colors duration-300 h-full cursor-pointer"
        >
            {/* ── Card Body ── */}
            <div className="p-5 sm:p-7 flex flex-col flex-1">
                {/* Top Row — read time + owner actions */}
                <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
                    <span className="text-xs font-medium text-on-surface-variant/70 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        {readingTime(blog.content)}
                    </span>

                    {isOwner && (
                        <div className="flex items-center gap-1">
                            <button
                                onClick={(e) => { e.stopPropagation(); onEdit?.(blog); }}
                                className="p-1.5 rounded-full hover:bg-white/50 transition-colors cursor-pointer"
                                title="Edit"
                            >
                                <span className="material-symbols-outlined text-base text-on-surface-variant">
                                    edit
                                </span>
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); onDelete?.(blog); }}
                                className="p-1.5 rounded-full hover:bg-red-100/60 transition-colors cursor-pointer"
                                title="Delete"
                            >
                                <span className="material-symbols-outlined text-base text-error">
                                    delete
                                </span>
                            </button>
                        </div>
                    )}
                </div>

                {/* Title */}
                <h4
                    className={`font-display ${titleSize} font-bold text-on-surface mb-3 leading-snug group-hover:text-primary transition-colors ${titleClamp}`}
                >
                    {blog.title}
                </h4>

                {/* Excerpt */}
                <p
                    className={`font-body text-sm text-on-surface-variant/80 ${contentClamp} leading-relaxed flex-1`}
                >
                    {blog.content}
                </p>
            </div>

            {/* ── Footer — author + timestamp ── */}
            <div className="px-5 sm:px-7 py-4 border-t border-black/5 flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2.5">
                    {blog.user?.avatarUrl ? (
                        <img
                            src={blog.user.avatarUrl}
                            alt={blog.user.name}
                            className="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-sm"
                        />
                    ) : (
                        <div
                            style={{ backgroundColor: palette.accent }}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ring-2 ring-white shadow-sm"
                        >
                            {avatarFallback}
                        </div>
                    )}
                    <span className="font-body text-xs font-semibold text-on-surface truncate max-w-[120px]">
                        {blog.user?.name || "Anonymous"}
                    </span>
                </div>

                <span className="text-[11px] font-medium text-on-surface-variant/60">
                    {timeAgo(blog.createdAt)}
                </span>
            </div>
        </article>
    );
}
