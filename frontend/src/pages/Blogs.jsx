import { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const UPCOMING_STORIES = [
    {
        id: "rajasthan-heritage",
        category: "Gastronomy & Culture",
        title: "Desert Palaces & Rajasthani Flavours",
        excerpt: "An intimate journey through royal havelis, ancient forts, bustling bazaars, and the rich culinary traditions of Rajasthan.",
        readTime: "6 min read",
        gradient: "linear-gradient(135deg, #fff3ee 0%, #ffe0d3 45%, #ffd4c2 100%)",
        accent: "#a23f1a",
        border: "#fca88f",
        tag: "In Editorial",
    },
    {
        id: "western-ghats",
        category: "Wild Expeditions",
        title: "Monsoon Mist Across the Western Ghats",
        excerpt: "Chasing roaring waterfalls, emerald forests, mist-covered hills, and hidden trails through one of India's richest biodiversity hotspots.",
        readTime: "8 min read",
        gradient: "linear-gradient(135deg, #f0f8ee 0%, #d7f0d2 45%, #c2e8bc 100%)",
        accent: "#4e6447",
        border: "#98dca2",
        tag: "Field Notes",
    },
    {
        id: "kerala-slow-travel",
        category: "Mindful Journeys",
        title: "The Art of Slow Travel in Kerala",
        excerpt: "Drifting through tranquil backwaters, waking to misty tea gardens, and discovering the quiet rhythms of life along India's southern coast.",
        readTime: "5 min read",
        gradient: "linear-gradient(135deg, #eaf8f8 0%, #ccf0f0 45%, #b4e8e8 100%)",
        accent: "#276868",
        border: "#78d4d4",
        tag: "Upcoming",
    },
];
function Blogs() {
    const containerRef = useRef(null);
    useGSAP(() => {
        if (!containerRef.current) return;
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.fromTo(
            containerRef.current.querySelectorAll("[data-animate-hero]"),
            { opacity: 0, y: 30, filter: "blur(4px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, stagger: 0.1 }
        );
        tl.fromTo(
            containerRef.current.querySelectorAll("[data-animate-card]"),
            { opacity: 0, y: 35, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.12 },
            "-=0.3"
        );
    }, []);
    return (
        <main ref={containerRef} className="min-h-screen bg-background pt-[100px] pb-24 overflow-hidden relative">
            {/* Ambient Background Glow Orbs */}
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary-fixed/30 rounded-full blur-3xl pointer-events-none -z-0 animate-pulse duration-[8000ms]" />
            <div className="absolute top-80 right-10 w-96 h-96 bg-secondary-container/30 rounded-full blur-3xl pointer-events-none -z-0 animate-pulse duration-[10000ms]" />
            <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-margin-desktop relative z-10">
                {/* Hero / Under Progress Announcement */}
                <section className="text-center max-w-3xl mx-auto py-8 sm:py-12 md:py-16 flex flex-col items-center">
                    <div
                        data-animate-hero
                        className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-primary-fixed/50 border border-primary/20 shadow-xs mb-4 sm:mb-6"
                    >
                        <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                        <span className="font-body text-[11px] sm:text-xs font-bold uppercase tracking-widest text-primary">
                            In The Works • Coming Soon
                        </span>
                    </div>
                    <h1
                        data-animate-hero
                        className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-display-lg text-on-surface leading-tight font-bold mb-4 sm:mb-6"
                    >
                        Our Travel Journal is Taking Flight
                    </h1>
                    <p
                        data-animate-hero
                        className="font-body text-sm sm:text-base md:text-lg text-on-surface-variant/80 leading-relaxed max-w-2xl mb-6 sm:mb-8"
                    >
                        We are currently writing and curating deeply immersive stories, local culinary guides, and insider itineraries to inspire your next wanderlust adventure.
                    </p>
                    {/* Quick Navigation Actions */}
                    <div data-animate-hero className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                        <Link
                            to="/destinations"
                            className="px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-primary text-on-primary font-body text-xs sm:text-sm font-semibold shadow-[0_12px_28px_rgba(162,63,26,0.25)] hover:scale-105 active:scale-98 transition-all duration-300 flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined text-base">explore</span>
                            Explore Destinations
                        </Link>
                        <Link
                            to="/itineraries"
                            className="px-5 sm:px-7 py-2.5 sm:py-3 rounded-full border border-outline-variant bg-surface font-body text-xs sm:text-sm font-semibold text-on-surface hover:bg-surface-container transition-all duration-200 flex items-center gap-2 shadow-2xs hover:scale-102"
                        >
                            <span className="material-symbols-outlined text-base">calendar_month</span>
                            Plan an Itinerary
                        </Link>
                    </div>
                </section>
                {/* Sneak Peek / Upcoming Articles Preview Grid */}
                <section className="mt-6 sm:mt-8 md:mt-12">
                    <div className="flex flex-col items-center mb-6 sm:mb-8 text-center">
                        <span className="font-body text-xs font-bold uppercase tracking-widest text-primary mb-1">
                            Sneak Peek
                        </span>
                        <h3 className="font-display text-2xl md:text-3xl font-bold text-on-surface">
                            Stories In Production
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-gutter">
                        {UPCOMING_STORIES.map((story) => (
                            <article
                                key={story.id}
                                data-animate-card
                                style={{
                                    background: story.gradient,
                                    borderColor: story.border,
                                }}
                                className="rounded-3xl p-5 sm:p-7 border shadow-sm relative overflow-hidden flex flex-col justify-between group hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                            >
                                <div>
                                    <div className="flex items-center justify-between gap-2 mb-4">
                                        <span
                                            style={{ backgroundColor: story.accent, color: "#ffffff" }}
                                            className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-2xs"
                                        >
                                            {story.tag}
                                        </span>
                                        <span className="text-xs font-medium text-on-surface-variant/70 flex items-center gap-1">
                                            <span className="material-symbols-outlined text-sm">schedule</span>
                                            {story.readTime}
                                        </span>
                                    </div>
                                    <span className="text-xs font-semibold text-primary uppercase tracking-wide block mb-1.5">
                                        {story.category}
                                    </span>
                                    <h4 className="font-display text-xl font-bold text-on-surface mb-3 leading-snug group-hover:text-primary transition-colors">
                                        {story.title}
                                    </h4>
                                    <p className="font-body text-sm text-on-surface-variant/80 line-clamp-3 leading-relaxed">
                                        {story.excerpt}
                                    </p>
                                </div>
                                <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between text-xs font-bold text-primary">
                                    <span>Coming Soon</span>
                                    <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                                        arrow_forward
                                    </span>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
export default Blogs;