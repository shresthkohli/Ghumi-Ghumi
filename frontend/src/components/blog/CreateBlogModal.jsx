import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * Modal for creating or editing a blog post.
 *
 * Props:
 *  - open          {boolean}  Whether the modal is visible
 *  - onClose       {function} Called when the modal should close
 *  - onSubmit      {function} Called with { title, content } on valid submit
 *  - blog          {object|null} If provided, modal enters "edit" mode and
 *                               pre-fills title + content
 *  - submitting    {boolean}  Disables the submit button while the API call is
 *                               in flight
 */
export default function CreateBlogModal({
    open,
    onClose,
    onSubmit,
    blog = null,
    submitting = false,
}) {
    const isEdit = !!blog;

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [errors, setErrors] = useState({});
    const [isClosing, setIsClosing] = useState(false);

    const backdropRef = useRef(null);
    const modalRef = useRef(null);

    // ── Pre-fill when entering edit mode ──
    useEffect(() => {
        if (open && blog) {
            setTitle(blog.title || "");
            setContent(blog.content || "");
        } else if (open) {
            setTitle("");
            setContent("");
        }
        setErrors({});
    }, [open, blog]);

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
        if (open && backdropRef.current && modalRef.current) {
            gsap.fromTo(
                backdropRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.28, ease: "power2.out" }
            );
            gsap.fromTo(
                modalRef.current,
                { opacity: 0, scale: 0.88, y: 35, rotateX: 6 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    rotateX: 0,
                    duration: 0.45,
                    ease: "back.out(1.4)",
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

        if (modalRef.current && backdropRef.current) {
            tl.to(
                modalRef.current,
                { opacity: 0, scale: 0.92, y: 20, duration: 0.22, ease: "power2.in" },
                0
            );
            tl.to(
                backdropRef.current,
                { opacity: 0, duration: 0.22, ease: "power2.in" },
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

    // ── Validation ──
    function validate() {
        const errs = {};
        if (!title.trim()) {
            errs.title = "Title is required.";
        } else if (title.trim().length > 255) {
            errs.title = "Title cannot exceed 255 characters.";
        }
        if (!content.trim()) {
            errs.content = "Content is required.";
        } else if (content.trim().length < 10) {
            errs.content = "Content must be at least 10 characters.";
        }
        return errs;
    }

    function handleSubmit(e) {
        e.preventDefault();
        const errs = validate();
        setErrors(errs);
        if (Object.keys(errs).length > 0) return;
        onSubmit({ title: title.trim(), content: content.trim() });
    }

    if (!open) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            style={{ perspective: "1000px" }}
        >
            {/* Backdrop */}
            <div
                ref={backdropRef}
                onClick={handleAnimatedClose}
                className="fixed inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Panel */}
            <div
                ref={modalRef}
                className="relative z-10 w-full max-w-lg my-auto"
            >
                {/* Close button */}
                <button
                    onClick={handleAnimatedClose}
                    type="button"
                    className="absolute -right-3 -top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-on-surface shadow-xl transition-all hover:scale-110 hover:bg-surface-container cursor-pointer"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>

                <form
                    onSubmit={handleSubmit}
                    className="rounded-3xl bg-surface shadow-2xl overflow-hidden border border-outline-variant/30"
                >
                    {/* Header */}
                    <div className="px-6 sm:px-8 pt-7 pb-2">
                        <h2 className="font-display text-2xl sm:text-3xl font-bold text-on-surface">
                            {isEdit ? "Edit Your Story" : "Write a New Story"}
                        </h2>
                        <p className="font-body text-sm text-on-surface-variant/70 mt-1">
                            {isEdit
                                ? "Update your travel tale below."
                                : "Share your travel experiences with the community."}
                        </p>
                    </div>

                    {/* Fields */}
                    <div className="px-6 sm:px-8 py-6 flex flex-col gap-5">
                        {/* Title */}
                        <div>
                            <label
                                htmlFor="blog-title"
                                className="font-body text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1.5 block"
                            >
                                Title
                            </label>
                            <input
                                id="blog-title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="A captivating headline…"
                                className={`w-full rounded-lg px-4 py-3 font-body text-sm bg-gradient-to-b from-surface-container-low to-white border ${
                                    errors.title
                                        ? "border-error focus:ring-error/30"
                                        : "border-outline-variant/40 focus:border-primary"
                                } focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-on-surface-variant/40`}
                                maxLength={255}
                            />
                            {errors.title && (
                                <p className="mt-1 text-xs text-error font-medium">
                                    {errors.title}
                                </p>
                            )}
                            <p className="mt-1 text-[11px] text-on-surface-variant/50 text-right">
                                {title.length}/255
                            </p>
                        </div>

                        {/* Content */}
                        <div>
                            <label
                                htmlFor="blog-content"
                                className="font-body text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1.5 block"
                            >
                                Content
                            </label>
                            <textarea
                                id="blog-content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Tell us about your journey…"
                                rows={8}
                                className={`w-full rounded-lg px-4 py-3 font-body text-sm bg-gradient-to-b from-surface-container-low to-white border resize-none ${
                                    errors.content
                                        ? "border-error focus:ring-error/30"
                                        : "border-outline-variant/40 focus:border-primary"
                                } focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-on-surface-variant/40`}
                            />
                            {errors.content && (
                                <p className="mt-1 text-xs text-error font-medium">
                                    {errors.content}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 sm:px-8 pb-7 flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={handleAnimatedClose}
                            className="px-5 py-2.5 rounded-full border border-outline-variant bg-surface font-body text-xs font-semibold text-on-surface hover:bg-surface-container transition-all cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="glossy-button px-6 py-2.5 rounded-full text-on-primary font-body text-xs font-semibold disabled:opacity-60 disabled:pointer-events-none flex items-center gap-2 cursor-pointer"
                        >
                            {submitting ? (
                                <>
                                    <span className="material-symbols-outlined text-sm animate-spin">
                                        progress_activity
                                    </span>
                                    {isEdit ? "Saving…" : "Publishing…"}
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined text-sm">
                                        {isEdit ? "save" : "send"}
                                    </span>
                                    {isEdit ? "Save Changes" : "Publish Story"}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
}
