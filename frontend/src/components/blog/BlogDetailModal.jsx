import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * Turn an ISO timestamp into a friendly readable date.
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
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
 * Full-screen detail modal for viewing a blog post.
 *
 * Props:
 *  - open      {boolean}   Whether the modal is visible
 *  - onClose   {function}  Called when the modal should close
 *  - blog      {object}    The blog object to display
 *  - isOwner   {boolean}   Whether the current user owns this blog
 *  - onEdit    {function}  Called when the user clicks "Edit"
 *  - onDelete  {function}  Called when the user clicks "Delete"
 */
export default function BlogDetailModal({
    open,
    onClose,
    blog,
    isOwner = false,
    onEdit,
    onDelete,
}) {
    const [isClosing, setIsClosing] = useState(false);
    const backdropRef = useRef(null);
    const panelRef = useRef(null);

    // ── Lock scroll ──
    useEffect(() => {
        if (!open) return;
        setIsClosing(false);
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    // ── GSAP Entrance ──
    useGSAP(() => {
        if (open && backdropRef.current && panelRef.current) {
            gsap.fromTo(
                backdropRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.3, ease: "power2.out" }
            );
            gsap.fromTo(
                panelRef.current,
                { opacity: 0, y: 60, scale: 0.92 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.5,
                    ease: "back.out(1.2)",
                }
            );
        }
    }, [open]);

    // ── Animated Close ──
    function handleAnimatedClose() {
        if (isClosing) return;
        setIsClosing(true);

        const tl = gsap.timeline({
            onComplete: () => {
                setIsClosing(false);
                onClose();
            },
        });

        if (panelRef.current && backdropRef.current) {
            tl.to(
                panelRef.current,
                { opacity: 0, y: 40, scale: 0.95, duration: 0.25, ease: "power2.in" },
                0
            );
            tl.to(
                backdropRef.current,
                { opacity: 0, duration: 0.25, ease: "power2.in" },
                0
            );
        } else {
            onClose();
        }
    }

    // ── Escape key ──
    useEffect(() => {
        if (!open) return;
        function handleEscape(e) {
            if (e.key === "Escape") handleAnimatedClose();
        }
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [open, isClosing]);

    if (!open || !blog) return null;

    const avatarFallback = blog.user?.name
        ? blog.user.name
            .split(" ")
            .map((w) => w[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
        : "?";

    return createPortal(
        <div
            className="fixed inset-0 z-[99998] flex items-start justify-center overflow-y-auto py-8 sm:py-12 px-4"
            style={{ perspective: "1000px" }}
        >
            {/* Backdrop */}
            <div
                ref={backdropRef}
                onClick={handleAnimatedClose}
                className="fixed inset-0 bg-black/55 backdrop-blur-sm"
            />

            {/* Panel */}
            <div
                ref={panelRef}
                className="relative z-10 w-full max-w-2xl my-auto"
            >
                {/* Close button */}
                <button
                    onClick={handleAnimatedClose}
                    type="button"
                    className="absolute -right-3 -top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-on-surface shadow-xl transition-all hover:scale-110 hover:bg-surface-container cursor-pointer"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>

                <article className="rounded-3xl bg-surface shadow-2xl overflow-hidden border border-outline-variant/30">
                    {/* Header */}
                    <div className="px-7 sm:px-10 pt-8 sm:pt-10 pb-5 border-b border-outline-variant/20">
                        {/* Meta row */}
                        <div className="flex items-center gap-3 mb-4 flex-wrap">
                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-on-surface-variant/70">
                                <span className="material-symbols-outlined text-sm">schedule</span>
                                {readingTime(blog.content)}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-outline-variant" />
                            <span className="text-xs text-on-surface-variant/60">
                                {formatDate(blog.createdAt)}
                            </span>

                            {/* Owner actions */}
                            {isOwner && (
                                <>
                                    <span className="flex-1" />
                                    <button
                                        onClick={() => {
                                            handleAnimatedClose();
                                            setTimeout(() => onEdit?.(blog), 300);
                                        }}
                                        className="p-1.5 rounded-full hover:bg-surface-container transition-colors cursor-pointer"
                                        title="Edit"
                                    >
                                        <span className="material-symbols-outlined text-base text-on-surface-variant">
                                            edit
                                        </span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleAnimatedClose();
                                            setTimeout(() => onDelete?.(blog), 300);
                                        }}
                                        className="p-1.5 rounded-full hover:bg-red-100/60 transition-colors cursor-pointer"
                                        title="Delete"
                                    >
                                        <span className="material-symbols-outlined text-base text-error">
                                            delete
                                        </span>
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Title */}
                        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-on-surface leading-snug">
                            {blog.title}
                        </h2>
                    </div>

                    {/* Body — full content, no clamp */}
                    <div className="px-7 sm:px-10 py-7 sm:py-9">
                        <p className="font-body text-base sm:text-lg text-on-surface/85 leading-relaxed whitespace-pre-line">
                            {blog.content}
                        </p>
                    </div>

                    {/* Footer — author */}
                    <div className="px-7 sm:px-10 py-5 border-t border-outline-variant/20 flex items-center gap-3 bg-surface-container/30">
                        {blog.user?.avatarUrl ? (
                            <img
                                src={blog.user.avatarUrl}
                                alt={blog.user.name}
                                className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
                            />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold ring-2 ring-white shadow-sm">
                                {avatarFallback}
                            </div>
                        )}
                        <div>
                            <span className="font-body text-sm font-semibold text-on-surface block">
                                {blog.user?.name || "Anonymous"}
                            </span>
                            <span className="font-body text-xs text-on-surface-variant/60">
                                Author
                            </span>
                        </div>
                    </div>
                </article>
            </div>
        </div>,
        document.body
    );
}
