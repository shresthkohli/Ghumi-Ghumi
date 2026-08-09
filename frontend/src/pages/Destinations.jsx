import { useEffect, useState, useMemo, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getFeaturedId, getDestinations } from "../data/destinations";
import DestinationCard from "../components/destination/DestinationCard";
import FilterSidebar from "../components/destination/FilterSidebar";
import Pagination from "../components/destination/Pagination";
import destinationApi from "../api/destinationApi";

try {
    gsap.registerPlugin(ScrollTrigger, SplitText);
} catch (e) {
    try {
        gsap.registerPlugin(ScrollTrigger);
    } catch (err) {}
}

const RESULTS_PER_PAGE = 5;

function Destinations() {
    const [destinations, setDestinations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategories, setActiveCategories] = useState([]);
    const [activeBudgets, setActiveBudgets] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const pageRef = useRef(null);
    const headerRef = useRef(null);
    const navRef = useRef(null);
    const titleRef = useRef(null);
    const descRef = useRef(null);
    const sidebarRef = useRef(null);
    const gridRef = useRef(null);
    const resultsBarRef = useRef(null);
    const emptyStateRef = useRef(null);
    const paginationRef = useRef(null);

    useEffect(() => {
        async function fetchDestinations() {
            try {
                const response = await destinationApi.getAllDestinations();
                if (response && Array.isArray(response) && response.length > 0) {
                    setDestinations(response);
                } else {
                    setDestinations(getDestinations());
                }
            } catch (error) {
                console.error("Failed to load destinations from API, using fallback data", error);
                setDestinations(getDestinations());
            } finally {
                setIsLoading(false);
            }
        }

        fetchDestinations();
    }, []);

    // Category toggle
    function handleCategoryToggle(categoryId) {
        setCurrentPage(1);
        setActiveCategories((prev) =>
            prev.includes(categoryId)
                ? prev.filter((id) => id !== categoryId)
                : [...prev, categoryId]
        );
    }

    // Budget toggle
    function handleBudgetToggle(budgetId) {
        setCurrentPage(1);
        setActiveBudgets((prev) =>
            prev.includes(budgetId)
                ? prev.filter((id) => id !== budgetId)
                : [...prev, budgetId]
        );
    }

    // Clear all filters
    function handleClearAll() {
        setCurrentPage(1);
        setActiveCategories([]);
        setActiveBudgets([]);
    }

    // Multi-criteria filter (Category + Budget)
    const filteredDestinations = useMemo(() => {
        return destinations.filter((d) => {
            // Category filter
            const matchesCategory =
                activeCategories.length === 0 ||
                activeCategories.includes(d.category?.toLowerCase());

            // Budget filter
            const matchesBudget =
                activeBudgets.length === 0 ||
                activeBudgets.some(
                    (b) => d.budgetCategory?.toLowerCase() === b.toLowerCase()
                );

            return matchesCategory && matchesBudget;
        });
    }, [destinations, activeCategories, activeBudgets]);

    const totalActiveFilters = activeCategories.length + activeBudgets.length;

    const totalPages = Math.max(1, Math.ceil(filteredDestinations.length / RESULTS_PER_PAGE));
    const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;

    const visibleDestinations = filteredDestinations.slice(
        startIndex,
        startIndex + RESULTS_PER_PAGE
    );

    const featuredId = "Jaipur";

    const featuredDestination =
        currentPage === 1 && totalActiveFilters === 0
            ? visibleDestinations.find((d) => d.name === featuredId)
            : undefined;

    const regularDestinations = featuredDestination
        ? visibleDestinations.filter((d) => d.name !== featuredDestination.name)
        : visibleDestinations;

    // 1. GSAP Hero & Page Entrance Animations (Runs once on initial load / scroll)
    useGSAP(
        () => {
            if (isLoading) return;

            let split;
            if (titleRef.current) {
                try {
                    split = new SplitText(titleRef.current, { type: "words, chars" });
                } catch (e) {
                    split = null;
                }
            }

            // Hero Header Entrance (scroll-triggered once)
            const heroTl = gsap.timeline({
                defaults: { ease: "power3.out" },
                scrollTrigger: {
                    trigger: headerRef.current || pageRef.current,
                    start: "top 90%",
                    once: true,
                },
            });

            // Breadcrumb nav
            if (navRef.current) {
                heroTl.fromTo(
                    navRef.current,
                    { opacity: 0, y: -15, filter: "blur(4px)" },
                    { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6 }
                );
            }

            // Title entrance with SplitText
            if (split && split.chars && split.chars.length > 0) {
                heroTl.fromTo(
                    split.chars,
                    { opacity: 0, y: 35, rotateX: -60, filter: "blur(6px)" },
                    {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        filter: "blur(0px)",
                        stagger: 0.02,
                        duration: 0.8,
                        ease: "back.out(1.4)",
                    },
                    "-=0.3"
                );
            } else if (titleRef.current) {
                heroTl.fromTo(
                    titleRef.current,
                    { opacity: 0, y: 25, filter: "blur(6px)" },
                    { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 },
                    "-=0.3"
                );
            }

            // Subtitle description reveal
            if (descRef.current) {
                heroTl.fromTo(
                    descRef.current,
                    { opacity: 0, y: 20, filter: "blur(4px)" },
                    { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6 },
                    "-=0.4"
                );
            }

            // Filter sidebar entrance (scroll-triggered once)
            if (sidebarRef.current) {
                gsap.fromTo(
                    sidebarRef.current,
                    { opacity: 0, x: -35, filter: "blur(4px)" },
                    {
                        opacity: 1,
                        x: 0,
                        filter: "blur(0px)",
                        duration: 0.75,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: sidebarRef.current,
                            start: "top 85%",
                            once: true,
                        },
                    }
                );
            }

            // Results info bar (scroll-triggered once)
            if (resultsBarRef.current) {
                gsap.fromTo(
                    resultsBarRef.current,
                    { opacity: 0, y: 15, filter: "blur(2px)" },
                    {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        duration: 0.55,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: resultsBarRef.current,
                            start: "top 88%",
                            once: true,
                        },
                    }
                );
            }

            ScrollTrigger.refresh();

            return () => {
                if (split && split.revert) split.revert();
            };
        },
        {
            scope: pageRef,
            dependencies: [isLoading],
        }
    );

    // 2. Destination Cards & Pagination: Scroll-Triggered Slide-In Animation
    useGSAP(
        () => {
            if (isLoading) return;

            // Scroll-triggered Slide-in for each Destination Card as user scrolls down
            if (gridRef.current && gridRef.current.children.length > 0) {
                const cards = Array.from(gridRef.current.children);
                cards.forEach((cardEl) => {
                    gsap.fromTo(
                        cardEl,
                        { opacity: 0, x: 45, filter: "blur(4px)" },
                        {
                            opacity: 1,
                            x: 0,
                            filter: "blur(0px)",
                            duration: 0.65,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: cardEl,
                                start: "top 88%",
                                once: true,
                            },
                        }
                    );
                });
            }

            // Scroll-triggered Slide-in for empty state
            if (filteredDestinations.length === 0 && emptyStateRef.current) {
                gsap.fromTo(
                    emptyStateRef.current,
                    { opacity: 0, x: 35, scale: 0.96 },
                    {
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        duration: 0.55,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: emptyStateRef.current,
                            start: "top 88%",
                            once: true,
                        },
                    }
                );
            }

            // Scroll-triggered Pagination entrance
            if (paginationRef.current) {
                gsap.fromTo(
                    paginationRef.current,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.45,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: paginationRef.current,
                            start: "top 92%",
                            once: true,
                        },
                    }
                );
            }

            ScrollTrigger.refresh();
        },
        {
            scope: pageRef,
            dependencies: [isLoading, currentPage, activeCategories, activeBudgets, filteredDestinations.length],
        }
    );

    return (
        <div ref={pageRef} className="bg-surface min-h-screen">
            {/* Hero header */}
            <header ref={headerRef} className="relative bg-[#0b2b26] pt-12 pb-24 px-margin-desktop overflow-hidden">
                <div className="max-w-container-max mx-auto relative z-10">
                    <nav
                        ref={navRef}
                        className="flex items-center gap-2 text-primary-fixed opacity-70 mb-8 font-body text-label-md"
                    >
                        <span>Destinations</span>
                        <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                        <span className="text-on-primary">Places to Visit in India</span>
                    </nav>
                    <h1
                        ref={titleRef}
                        className="font-display text-display-lg text-on-primary mb-4"
                    >
                        Best Places to Visit in India
                    </h1>
                    <p
                        ref={descRef}
                        className="text-primary-fixed max-w-2xl font-body text-body-lg leading-relaxed"
                    >
                        From the Pink City's palaces to the tiger trails of Jim Corbett,
                        discover the destinations worth building your next trip around.
                    </p>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-container-max mx-auto px-margin-desktop -mt-12 mb-section-gap flex flex-col md:flex-row gap-gutter">
                <div ref={sidebarRef} className="shrink-0 w-full md:w-80">
                    <FilterSidebar
                        activeCategories={activeCategories}
                        onCategoryToggle={handleCategoryToggle}
                        activeBudgets={activeBudgets}
                        onBudgetToggle={handleBudgetToggle}
                        onClearAll={handleClearAll}
                    />
                </div>

                <section className="grow min-w-0">
                    <div
                        ref={resultsBarRef}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6"
                    >
                        <div className="flex items-center gap-3">
                            <span className="font-body text-body-md text-primary-container z-10">
                                <span className="font-bold text-on-primary text-lg">
                                    {filteredDestinations.length}
                                </span>{" "}
                                {filteredDestinations.length === 1 ? "destination" : "destinations"} found
                            </span>
                        </div>

                        {totalActiveFilters > 0 && (
                            <button
                                type="button"
                                onClick={handleClearAll}
                                className="text-xs text-primary font-semibold hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-sm">filter_alt_off</span>
                                Clear all filters ({totalActiveFilters})
                            </button>
                        )}
                    </div>

                    {/* Active Filter Chips */}
                    {totalActiveFilters > 0 && (
                        <div className="flex flex-wrap items-center gap-2 mb-6 p-3 rounded-2xl bg-surface-container-high/60 border border-outline-variant/40 animate-fade-in">
                            <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mr-1">
                                Applied:
                            </span>

                            {activeCategories.map((cat) => (
                                <button
                                    type="button"
                                    key={cat}
                                    onClick={() => handleCategoryToggle(cat)}
                                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary text-white hover:bg-primary/90 transition-colors cursor-pointer"
                                >
                                    <span className="capitalize">{cat}</span>
                                    <span className="material-symbols-outlined text-[14px]">close</span>
                                </button>
                            ))}

                            {activeBudgets.map((budget) => (
                                <button
                                    type="button"
                                    key={budget}
                                    onClick={() => handleBudgetToggle(budget)}
                                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-tertiary text-white hover:bg-tertiary/90 transition-colors cursor-pointer"
                                >
                                    <span className="capitalize">{budget}</span>
                                    <span className="material-symbols-outlined text-[14px]">close</span>
                                </button>
                            ))}
                        </div>
                    )}

                    {isLoading && (
                        <div className="py-20 flex flex-col items-center justify-center text-center">
                            <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin mb-4" />
                            <p className="text-on-surface-variant font-body">Loading destinations...</p>
                        </div>
                    )}

                    {!isLoading && filteredDestinations.length === 0 && (
                        <div
                            ref={emptyStateRef}
                            className="py-16 px-8 rounded-4xl bg-surface-container-high/50 border border-outline-variant/30 text-center flex flex-col items-center"
                        >
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                                <span className="material-symbols-outlined text-3xl">travel_explore</span>
                            </div>
                            <h3 className="font-display text-headline-md text-on-surface mb-2">
                                No destinations match your filters
                            </h3>
                            <p className="text-on-surface-variant max-w-md mb-6 font-body text-body-md">
                                Try selecting different categories or budget ranges to see available places.
                            </p>
                            <button
                                type="button"
                                onClick={handleClearAll}
                                className="px-6 py-2.5 rounded-full bg-primary text-on-primary text-label-lg font-medium hover:bg-primary/90 transition-all cursor-pointer shadow-md"
                            >
                                Reset All Filters
                            </button>
                        </div>
                    )}

                    {!isLoading && filteredDestinations.length > 0 && (
                        <div
                            ref={gridRef}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-gutter"
                        >
                            {featuredDestination && (
                                <DestinationCard destination={featuredDestination} featured />
                            )}

                            {regularDestinations.map((destination) => (
                                <DestinationCard
                                    key={destination.id}
                                    destination={destination}
                                />
                            ))}
                        </div>
                    )}

                    {totalPages > 1 && (
                        <div ref={paginationRef}>
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

export default Destinations;