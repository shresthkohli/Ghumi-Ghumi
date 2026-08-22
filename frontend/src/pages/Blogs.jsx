import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import blogsApi from "../api/blogsApi.js";
import { useAuth } from "../context/AuthContext.jsx";
import BlogCard from "../components/blog/BlogCard.jsx";
import BlogDetailModal from "../components/blog/BlogDetailModal.jsx";
import CreateBlogModal from "../components/blog/CreateBlogModal.jsx";
import LoginModal from "../components/auth/LoginModal.jsx";

gsap.registerPlugin(ScrollTrigger);

/**
 * Bento-grid size assignment — creates a visually interesting
 * repeating pattern where cards get different sizes:
 *
 *  Index 0 → tall  (spans 2 rows)
 *  Index 1 → normal
 *  Index 2 → normal
 *  Index 3 → wide  (spans 2 columns)
 *  Index 4 → normal
 *  Index 5 → tall  (spans 2 rows)
 *  … then repeats
 */
const BENTO_PATTERN = ["tall", "normal", "normal", "wide", "normal", "tall"];

function getBentoSize(index) {
    return BENTO_PATTERN[index % BENTO_PATTERN.length];
}

/**
 * Returns Tailwind grid classes for a card based on its bento size.
 * On mobile everything is 1-col so no spanning.
 */
function getBentoClasses(size) {
    switch (size) {
        case "tall":
            return "md:row-span-2";
        case "wide":
            return "md:col-span-2";
        default:
            return "";
    }
}

function Blogs() {
    const { user } = useAuth();

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [viewingBlog, setViewingBlog] = useState(null);

    const containerRef = useRef(null);
    const gridRef = useRef(null);
    const ctaRef = useRef(null);

    // ── Fetch blogs on mount ──
    useEffect(() => {
        loadBlogs();
    }, []);

    async function loadBlogs() {
        setLoading(true);
        setError("");
        try {
            const data = await blogsApi.getAllBlogs();
            setBlogs(data || []);
        } catch (err) {
            console.error(err);
            setError("Something went wrong while loading stories. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    // ── All GSAP animations in a single context so cleanup is automatic ──
    useGSAP(() => {
        if (!containerRef.current || loading) return;

        // 1. Hero entrance — immediate on mount
        const heroEls = containerRef.current.querySelectorAll("[data-animate-hero]");
        if (heroEls.length > 0) {
            gsap.fromTo(
                heroEls,
                { opacity: 0, y: 20, filter: "blur(4px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, stagger: 0.08, ease: "power3.out" }
            );
        }

        // 2. Bento grid — staggered slide-in via ScrollTrigger.batch
        if (gridRef.current) {
            const cards = gridRef.current.querySelectorAll("[data-animate-card]");
            if (cards.length > 0) {
                gsap.set(cards, { opacity: 0, y: 50, scale: 0.94 });

                ScrollTrigger.batch(cards, {
                    start: "top 90%",
                    onEnter: (batch) => {
                        gsap.to(batch, {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 0.7,
                            ease: "power3.out",
                            stagger: 0.12,
                        });
                    },
                    once: true,
                });
            }
        }

        // 3. CTA section — scroll-triggered reveal with staggered children
        if (ctaRef.current) {
            const ctaChildren = ctaRef.current.querySelectorAll("[data-cta-child]");

            gsap.set(ctaRef.current, { opacity: 0, y: 50 });
            gsap.set(ctaChildren, { opacity: 0, y: 25 });

            ScrollTrigger.create({
                trigger: ctaRef.current,
                start: "top 85%",
                once: true,
                onEnter: () => {
                    gsap.to(ctaRef.current, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power3.out",
                    });
                    gsap.to(ctaChildren, {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        stagger: 0.15,
                        ease: "power3.out",
                        delay: 0.2,
                    });
                },
            });
        }
    }, { dependencies: [loading, blogs], scope: containerRef });

    // ── Create / Edit submit handler ──
    async function handleBlogSubmit({ title, content }) {
        setSubmitting(true);
        try {
            if (editingBlog) {
                const updated = await blogsApi.updateBlog(editingBlog.id, { title, content });
                if (updated) {
                    setBlogs((prev) =>
                        prev.map((b) => (b.id === editingBlog.id ? updated : b))
                    );
                }
            } else {
                const created = await blogsApi.createBlog({ title, content });
                if (created) {
                    setBlogs((prev) => [created, ...prev]);
                }
            }
            setShowCreateModal(false);
            setEditingBlog(null);
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    }

    // ── Delete handler ──
    async function handleDelete(blog) {
        if (!window.confirm(`Delete "${blog.title}"? This cannot be undone.`)) return;
        try {
            await blogsApi.deleteBlog(blog.id);
            setBlogs((prev) => prev.filter((b) => b.id !== blog.id));
        } catch (err) {
            console.error(err);
        }
    }

    // ── Open create / edit ──
    function handleWriteClick() {
        if (!user) {
            setShowLoginModal(true);
            return;
        }
        setEditingBlog(null);
        setShowCreateModal(true);
    }

    function handleEditClick(blog) {
        setEditingBlog(blog);
        setShowCreateModal(true);
    }

    return (
        <main
            ref={containerRef}
            className="min-h-screen bg-background pt-[100px] pb-0 overflow-hidden relative"
        >
            {/* ── Ambient Orbs ── */}
            <div className="absolute top-16 left-1/4 w-80 h-80 bg-primary-fixed/25 rounded-full blur-3xl pointer-events-none -z-0 animate-pulse duration-[8000ms]" />
            <div className="absolute top-72 right-10 w-72 h-72 bg-secondary-container/25 rounded-full blur-3xl pointer-events-none -z-0 animate-pulse duration-[10000ms]" />

            <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-margin-desktop relative z-10">

                {/* ════════════════════════════════════════════════
                    COMPACT HERO — pushed up, editorial feel
                   ════════════════════════════════════════════════ */}
                <section className="py-6 sm:py-8 md:py-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-outline-variant/30 mb-8 sm:mb-10 md:mb-12">
                    <div>
                        <span
                            data-animate-hero
                            className="font-body text-[11px] sm:text-xs font-bold uppercase tracking-widest text-primary mb-2 block"
                        >
                            Community Stories
                        </span>
                        <h1
                            data-animate-hero
                            className="font-display text-3xl sm:text-4xl md:text-5xl text-on-surface leading-tight font-bold"
                        >
                            The Travel Journal
                        </h1>
                        <p
                            data-animate-hero
                            className="font-body text-sm sm:text-base text-on-surface-variant/70 mt-2 max-w-lg"
                        >
                            Immersive stories, local guides, and insider tales from fellow wanderers.
                        </p>
                    </div>

                    {/* Blog count pill */}
                    {!loading && !error && blogs.length > 0 && (
                        <div
                            data-animate-hero
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container border border-outline-variant/30 self-start sm:self-auto"
                        >
                            <span className="material-symbols-outlined text-sm text-primary">article</span>
                            <span className="font-body text-xs font-semibold text-on-surface-variant">
                                {blogs.length} {blogs.length === 1 ? "Story" : "Stories"}
                            </span>
                        </div>
                    )}
                </section>

                {/* ════════════════════════════════════════════════
                    CONTENT AREA
                   ════════════════════════════════════════════════ */}

                {/* ── Loading Skeleton Bento ── */}
                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 auto-rows-[minmax(180px,auto)]">
                        {[
                            "md:row-span-2",
                            "",
                            "",
                            "md:col-span-2",
                            "",
                            "md:row-span-2",
                        ].map((span, i) => (
                            <div
                                key={i}
                                className={`rounded-3xl border border-outline-variant/20 bg-surface-container/60 overflow-hidden animate-pulse ${span}`}
                            >
                                <div className="p-5 sm:p-7 space-y-4 h-full flex flex-col">
                                    <div className="h-4 w-20 rounded-full bg-outline-variant/30" />
                                    <div className="h-6 w-4/5 rounded-lg bg-outline-variant/30" />
                                    <div className="space-y-2 flex-1">
                                        <div className="h-3 w-full rounded bg-outline-variant/20" />
                                        <div className="h-3 w-5/6 rounded bg-outline-variant/20" />
                                        <div className="h-3 w-3/4 rounded bg-outline-variant/20" />
                                    </div>
                                    <div className="pt-4 border-t border-outline-variant/10 flex items-center gap-2 mt-auto">
                                        <div className="w-8 h-8 rounded-full bg-outline-variant/30" />
                                        <div className="h-3 w-20 rounded bg-outline-variant/20" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* ── Error State ── */}
                {!loading && error && (
                    <div className="flex flex-col items-center py-16 sm:py-24 text-center">
                        <span className="material-symbols-outlined text-5xl text-error/60 mb-4">
                            cloud_off
                        </span>
                        <h4 className="font-display text-xl font-bold text-on-surface mb-2">
                            Couldn't Load Stories
                        </h4>
                        <p className="font-body text-sm text-on-surface-variant/70 max-w-sm mb-6">
                            {error}
                        </p>
                        <button
                            onClick={loadBlogs}
                            className="px-6 py-2.5 rounded-full bg-primary text-on-primary font-body text-xs font-semibold shadow-lg hover:scale-105 transition-transform cursor-pointer flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined text-sm">refresh</span>
                            Try Again
                        </button>
                    </div>
                )}

                {/* ── Empty State ── */}
                {!loading && !error && blogs.length === 0 && (
                    <div className="flex flex-col items-center py-16 sm:py-24 text-center">
                        <div className="w-24 h-24 rounded-full bg-primary-fixed/40 flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-4xl text-primary">
                                menu_book
                            </span>
                        </div>
                        <h4 className="font-display text-xl font-bold text-on-surface mb-2">
                            No Stories Yet
                        </h4>
                        <p className="font-body text-sm text-on-surface-variant/70 max-w-sm mb-6">
                            Be the first to share a travel tale! Your story could inspire the
                            next great adventure.
                        </p>
                        <button
                            onClick={handleWriteClick}
                            className="glossy-button px-6 py-2.5 rounded-full text-on-primary font-body text-xs font-semibold flex items-center gap-2 cursor-pointer"
                        >
                            <span className="material-symbols-outlined text-sm">edit_note</span>
                            Write the First Story
                        </button>
                    </div>
                )}

                {/* ── Bento Blog Grid ── */}
                {!loading && !error && blogs.length > 0 && (
                    <div
                        ref={gridRef}
                        className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 auto-rows-[minmax(180px,auto)]"
                    >
                        {blogs.map((blog, index) => {
                            const size = getBentoSize(index);
                            const bentoClasses = getBentoClasses(size);
                            return (
                                <div key={blog.id} className={bentoClasses}>
                                    <BlogCard
                                        blog={blog}
                                        index={index}
                                        size={size}
                                        isOwner={user?.id === blog.userId}
                                        onEdit={handleEditClick}
                                        onDelete={handleDelete}
                                        onClick={(blog) => setViewingBlog(blog)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* ════════════════════════════════════════════════
                    BOTTOM CTA — "Write Your Own Story"
                    Warm, light design consistent with the page
                   ════════════════════════════════════════════════ */}
                <section
                    ref={ctaRef}
                    className="mt-16 sm:mt-20 md:mt-24 mb-16 sm:mb-20"
                >
                    <div className="relative rounded-[2rem] overflow-hidden border border-outline-variant/30 bg-surface-container-high">
                        {/* Decorative warm orbs */}
                        <div className="absolute -top-10 -right-10 w-56 h-56 bg-primary-fixed/40 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-tertiary-fixed/30 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative px-8 sm:px-12 md:px-16 py-12 sm:py-16 md:py-20 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                            {/* Left — icon */}
                            <div
                                data-cta-child
                                className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-primary-fixed/50 border border-primary/15 flex items-center justify-center shadow-sm"
                            >
                                <span className="material-symbols-outlined text-4xl sm:text-5xl text-primary">
                                    edit_note
                                </span>
                            </div>

                            {/* Center — text */}
                            <div data-cta-child className="flex-1 text-center md:text-left">
                                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-on-surface mb-3 leading-snug">
                                    Write Your Own Story
                                </h2>
                                <p className="font-body text-sm sm:text-base text-on-surface-variant/70 max-w-lg leading-relaxed">
                                    Got a travel tale worth telling? Share your journey, tips, and
                                    hidden gems with a community of fellow explorers. Your next
                                    adventure starts with your words.
                                </p>
                            </div>

                            {/* Right — CTA button */}
                            <button
                                data-cta-child
                                onClick={handleWriteClick}
                                className="flex-shrink-0 glossy-button px-7 sm:px-9 py-3 sm:py-3.5 rounded-full text-on-primary font-body text-sm font-semibold flex items-center gap-2.5 cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-lg">draw</span>
                                Start Writing
                            </button>
                        </div>
                    </div>
                </section>
            </div>

            {/* ── Modals ── */}
            <CreateBlogModal
                open={showCreateModal}
                onClose={() => {
                    setShowCreateModal(false);
                    setEditingBlog(null);
                }}
                onSubmit={handleBlogSubmit}
                blog={editingBlog}
                submitting={submitting}
            />

            <LoginModal
                open={showLoginModal}
                onClose={() => setShowLoginModal(false)}
            />

            <BlogDetailModal
                open={!!viewingBlog}
                onClose={() => setViewingBlog(null)}
                blog={viewingBlog}
                isOwner={user?.id === viewingBlog?.userId}
                onEdit={handleEditClick}
                onDelete={handleDelete}
            />
        </main>
    );
}

export default Blogs;