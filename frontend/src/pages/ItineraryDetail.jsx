import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import itinerariesApi from "../api/itinerariesApi";
import ActivityCard from "../components/itinerary/ActivityCard";
import ActivityFormModal from "../components/itinerary/ActivityFormModal";
import ItinerarySettingsModal from "../components/itinerary/ItinerarySettingsModal";
import DayTimeline from "../components/itinerary/DayTimeline";
import { formatDisplayTime } from "../utils/formatTime";

gsap.registerPlugin(ScrollTrigger);

function ItineraryDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [itinerary, setItinerary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [activeDay, setActiveDay] = useState(null);
    const [showSettings, setShowSettings] = useState(false);
    const [activityModal, setActivityModal] = useState(null);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");

    const pageRef = useRef(null);
    const dayRefs = useRef({});

    useEffect(() => {
        loadItinerary();
    }, [id]);

    useEffect(() => {
        if (!toastMessage) return;
        const timer = setTimeout(() => setToastMessage(""), 3500);
        return () => clearTimeout(timer);
    }, [toastMessage]);

    useGSAP(
        () => {
            if (loading || error || !pageRef.current || !itinerary) return;

            // 1. Hero / Page Header entrance animation (scroll-triggered once)
            const heroElements = pageRef.current.querySelectorAll("[data-animate-hero]");
            if (heroElements.length > 0) {
                gsap.fromTo(
                    heroElements,
                    { opacity: 0, y: 30, filter: "blur(4px)" },
                    {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        duration: 0.7,
                        stagger: 0.08,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: heroElements[0],
                            start: "top 90%",
                            once: true,
                        },
                    }
                );
            }

            // 2. Sticky DayTimeline entrance animation
            const timelineEl = pageRef.current.querySelector("aside");
            if (timelineEl) {
                gsap.fromTo(
                    timelineEl,
                    { opacity: 0, x: -25, filter: "blur(3px)" },
                    {
                        opacity: 1,
                        x: 0,
                        filter: "blur(0px)",
                        duration: 0.75,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: timelineEl,
                            start: "top 85%",
                            once: true,
                        },
                    }
                );
            }

            // 3. Day Sections & Activities: scroll-triggered once as each section scrolls into view
            const daySections = pageRef.current.querySelectorAll("[data-animate-day]");
            daySections.forEach((dayEl) => {
                const header = dayEl.querySelector(".day-header");
                const cards = dayEl.querySelectorAll("article");
                const curateBtn = dayEl.querySelector(".curate-btn");

                // Empty state card (when 0 days planned)
                if (!header && cards.length === 0) {
                    gsap.fromTo(
                        dayEl,
                        { opacity: 0, y: 35, scale: 0.97 },
                        {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 0.7,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: dayEl,
                                start: "top 85%",
                                once: true,
                            },
                        }
                    );
                    return;
                }

                // Day section timeline triggered once on scroll
                const dayTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: dayEl,
                        start: "top 82%",
                        once: true,
                    },
                    defaults: { ease: "power3.out" },
                });

                if (header) {
                    dayTl.fromTo(
                        header,
                        { opacity: 0, y: 25, filter: "blur(3px)" },
                        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6 }
                    );
                }

                if (cards.length > 0) {
                    dayTl.fromTo(
                        cards,
                        { opacity: 0, y: 35, scale: 0.96, filter: "blur(3px)" },
                        { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.6, stagger: 0.08 },
                        header ? "-=0.35" : 0
                    );
                }

                if (curateBtn) {
                    dayTl.fromTo(
                        curateBtn,
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.5 },
                        "-=0.2"
                    );
                }
            });

            // 4. ScrollSpy: Update activeDay in the sticky timeline as user scrolls through sections
            const days = getDayNumbers(itinerary?.activities || []);
            days.forEach((dayNumber) => {
                const el = dayRefs.current[dayNumber];
                if (!el) return;

                ScrollTrigger.create({
                    trigger: el,
                    start: "top 45%",
                    end: "bottom 45%",
                    onEnter: () => setActiveDay(dayNumber),
                    onEnterBack: () => setActiveDay(dayNumber),
                });
            });

            ScrollTrigger.refresh();
        },
        { scope: pageRef, dependencies: [loading, error, itinerary] }
    );

    async function loadItinerary() {
        try {
            setLoading(true);
            setError("");
            const data = await itinerariesApi.getItineraryById(id);
            setItinerary(data);

            const firstDay = getDayNumbers(data.activities)[0];
            if (firstDay) setActiveDay(firstDay);
        }
        catch (err) {
            console.error(err);
            setError("Couldn't load this itinerary. Please try again.");
        }
        finally {
            setLoading(false);
        }
    }

    function getDayNumbers(activities = []) {
        const unique = [...new Set(activities.map((a) => a.dayNumber))];
        return unique.sort((a, b) => a - b);
    }

    function getActivitiesForDay(dayNumber) {
        if (!itinerary?.activities) return [];
        return itinerary.activities
            .filter((a) => a.dayNumber === dayNumber)
            .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
    }

    function scrollToDay(dayNumber) {
        setActiveDay(dayNumber);
        dayRefs.current[dayNumber]?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function calculateTotalExplorationHours(activities = []) {
        let totalMinutes = 0;
        activities.forEach((act) => {
            if (act.startTime && act.endTime) {
                const [sh, sm] = act.startTime.split(":").map(Number);
                const [eh, em] = act.endTime.split(":").map(Number);
                if (!isNaN(sh) && !isNaN(sm) && !isNaN(eh) && !isNaN(em)) {
                    const diff = (eh * 60 + em) - (sh * 60 + sm);
                    if (diff > 0) totalMinutes += diff;
                }
            }
        });
        const hours = Math.floor(totalMinutes / 60);
        const mins = totalMinutes % 60;
        if (hours === 0 && mins === 0) return null;
        if (mins === 0) return `${hours} hrs`;
        if (hours === 0) return `${mins} mins`;
        return `${hours}h ${mins}m`;
    }

    async function handleShareTrip() {
        const shareUrl = window.location.href;
        const shareData = {
            title: itinerary?.title || "Wanderly Travel Itinerary",
            text: `Explore this handcrafted travel itinerary for ${itinerary?.destinationName || "this journey"} on Wanderly!`,
            url: shareUrl,
        };

        if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
            try {
                await navigator.share(shareData);
                return;
            } catch (err) {
                if (err.name === "AbortError") return;
            }
        }

        try {
            await navigator.clipboard.writeText(shareUrl);
            setToastType("success");
            setToastMessage("Itinerary link copied to clipboard");
        } catch {
            setToastType("info");
            setToastMessage(shareUrl);
        }
    }

    function handleExportPrint() {
        window.print();
    }

    async function handleSaveSettings(updates) {
        const updated = await itinerariesApi.updateItinerary(id, updates);
        setItinerary((prev) => ({ ...prev, ...updated }));
    }

    async function handleDeleteItinerary() {
        await itinerariesApi.deleteItinerary(id);
        navigate("/itineraries");
    }

    function openCreateActivity(dayNumber) {
        setActivityModal({ activity: null, dayNumber });
    }

    function openEditActivity(activity) {
        setActivityModal({ activity, dayNumber: activity.dayNumber });
    }

    function handleAddDay() {
        const days = getDayNumbers(itinerary?.activities || []);
        const nextDay = days.length > 0 ? Math.max(...days) + 1 : 1;
        openCreateActivity(nextDay);
    }

    async function handleSaveActivity(formData) {
        const { activity, dayNumber } = activityModal;

        if (activity) {
            const updated = await itinerariesApi.updateActivity(activity.id, formData);
            setItinerary((prev) => ({
                ...prev,
                activities: prev.activities.map((a) => (a.id === activity.id ? updated : a)),
            }));
        }
        else {
            const existingInDay = getActivitiesForDay(dayNumber).length;
            const created = await itinerariesApi.createActivity(id, {
                ...formData,
                dayNumber: dayNumber,
                position: existingInDay + 1,
            });
            setItinerary((prev) => ({ ...prev, activities: [...(prev.activities || []), created] }));
            setActiveDay(dayNumber);
        }
    }

    async function handleDeleteActivity(activityId) {
        const confirmed = window.confirm("Delete this activity?");
        if (!confirmed) return;

        await itinerariesApi.deleteActivity(activityId);
        setItinerary((prev) => ({
            ...prev,
            activities: prev.activities.filter((a) => a.id !== activityId),
        }));
    }

    // ── Loading Skeleton ──
    if (loading) {
        return (
            <main className="min-h-screen bg-background pt-[100px] pb-32">
                <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
                    <div className="py-12 md:py-20 animate-pulse">
                        <div className="h-6 w-36 rounded-full bg-surface-container-high mb-6" />
                        <div className="h-16 w-2/3 rounded-2xl bg-surface-container-high mb-4" />
                        <div className="h-6 w-1/2 rounded-full bg-surface-container-high mb-8" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
                        <div className="hidden md:block col-span-3">
                            <div className="flex flex-col gap-8 py-8">
                                <div className="w-20 h-20 rounded-full bg-surface-container-high animate-pulse" />
                                <div className="w-20 h-20 rounded-full bg-surface-container-high animate-pulse" />
                            </div>
                        </div>
                        <div className="col-span-1 md:col-span-9">
                            <div className="h-10 w-1/3 rounded-full bg-surface-container-high animate-pulse mb-8" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                                <div className="h-[360px] rounded-3xl bg-surface-container-high animate-pulse" />
                                <div className="h-[360px] rounded-3xl bg-surface-container-high animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    // ── Error State ──
    if (error || !itinerary) {
        return (
            <main className="min-h-screen bg-background pt-[100px] pb-24 flex flex-col items-center justify-center text-center gap-4 px-margin-mobile">
                <div className="w-16 h-16 rounded-full bg-error/10 text-error flex items-center justify-center mb-2">
                    <span className="material-symbols-outlined text-4xl">error</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-on-surface">Something went wrong</h3>
                <p className="font-body text-base text-on-surface-variant max-w-md">{error || "Itinerary not found."}</p>
                <button
                    onClick={loadItinerary}
                    className="mt-2 px-6 py-2.5 rounded-full bg-primary text-on-primary font-body text-sm font-semibold hover:scale-105 transition-transform"
                >
                    Try Again
                </button>
            </main>
        );
    }

    const dayNumbers = getDayNumbers(itinerary.activities || []);
    const totalActivities = itinerary.activities?.length || 0;
    const totalExplorationTime = calculateTotalExplorationHours(itinerary.activities || []);
    const avgActs = dayNumbers.length > 0 ? totalActivities / dayNumbers.length : 0;
    const paceLabel = totalActivities === 0 ? null : avgActs >= 3 ? "Active Pace" : "Relaxed Pace";
    const paceIcon = avgActs >= 3 ? "bolt" : "spa";
    const subtitle = itinerary.destinationName || "";

    const allSortedActivities = itinerary?.activities
        ? [...itinerary.activities].sort(
            (a, b) =>
                (a.dayNumber - b.dayNumber) ||
                ((a.position ?? 0) - (b.position ?? 0)) ||
                (a.startTime || "").localeCompare(b.startTime || "")
        )
        : [];

    return (
        <main ref={pageRef} className="min-h-screen bg-background pt-[100px] pb-32 md:pb-[80px]">
            <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">

                {/* ─── Hero / Page Header (Interactive web view) ─── */}
                <section className="py-10 md:py-14 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 relative z-10 print:hidden">
                    <div className="max-w-2xl">
                        {subtitle && (
                            <div data-animate-hero className="flex items-center gap-2 mb-3">
                                <span className="material-symbols-outlined text-primary text-base">location_on</span>
                                <span className="font-body text-xs font-bold text-primary tracking-[0.2em] uppercase">
                                    {subtitle}
                                </span>
                            </div>
                        )}

                        <h1 data-animate-hero className="font-display text-display-md md:text-display-lg text-on-surface mb-4 leading-tight font-bold">
                            {itinerary.title}
                        </h1>

                        {itinerary.description && (
                            <p data-animate-hero className="font-body text-base md:text-lg text-on-surface-variant/80 leading-relaxed mb-6">
                                {itinerary.description}
                            </p>
                        )}

                        {/* Trip Quick Stats Bar (No emojis, clean Material Symbols icons) */}
                        <div data-animate-hero className="flex flex-wrap items-center gap-2.5 pt-1">
                            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-container border border-outline-variant/40 text-xs font-semibold text-on-surface">
                                <span className="material-symbols-outlined text-[15px] text-primary">calendar_month</span>
                                {dayNumbers.length} {dayNumbers.length === 1 ? "Day" : "Days"} Planned
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-container border border-outline-variant/40 text-xs font-semibold text-on-surface">
                                <span className="material-symbols-outlined text-[15px] text-primary">attractions</span>
                                {totalActivities} {totalActivities === 1 ? "Experience" : "Experiences"}
                            </span>
                            {totalExplorationTime && (
                                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-container border border-outline-variant/40 text-xs font-semibold text-on-surface">
                                    <span className="material-symbols-outlined text-[15px] text-primary">schedule</span>
                                    {totalExplorationTime} Exploration
                                </span>
                            )}
                            {paceLabel && (
                                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-container border border-outline-variant/40 text-xs font-semibold text-on-surface">
                                    <span className="material-symbols-outlined text-[15px] text-secondary">{paceIcon}</span>
                                    {paceLabel}
                                </span>
                            )}
                        </div>
                    </div>

                    <div data-animate-hero className="flex items-center gap-2.5 shrink-0 flex-wrap">
                        <button
                            onClick={handleShareTrip}
                            className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-full border border-outline-variant bg-surface font-body text-sm font-semibold text-on-surface hover:bg-surface-container hover:border-primary/40 transition-all duration-200 flex items-center gap-2 shadow-2xs hover:scale-102 cursor-pointer"
                            title="Share itinerary link"
                        >
                            <span className="material-symbols-outlined text-base text-primary">share</span>
                            Share
                        </button>
                        <button
                            onClick={handleExportPrint}
                            className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-full border border-outline-variant bg-surface font-body text-sm font-semibold text-on-surface hover:bg-surface-container hover:border-primary/40 transition-all duration-200 flex items-center gap-2 shadow-2xs hover:scale-102 cursor-pointer"
                            title="Print or Save as PDF"
                        >
                            <span className="material-symbols-outlined text-base text-primary">print</span>
                            Export / Print
                        </button>
                        <button
                            onClick={() => setShowSettings(true)}
                            className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-full border border-outline-variant bg-surface font-body text-sm font-semibold text-on-surface hover:bg-surface-container transition-all duration-200 flex items-center gap-2 shadow-2xs hover:scale-102 cursor-pointer"
                        >
                            <span className="material-symbols-outlined text-base">settings</span>
                            Settings
                        </button>
                        <button
                            onClick={() => navigate("/itineraries")}
                            className="px-5 py-2.5 sm:px-7 sm:py-3 rounded-full bg-primary text-on-primary font-body text-sm font-semibold shadow-[0_12px_28px_rgba(162,63,26,0.25)] hover:scale-105 active:scale-98 transition-all duration-300 flex items-center gap-2 cursor-pointer"
                        >
                            <span className="material-symbols-outlined text-base">check_circle</span>
                            Done Planning
                        </button>
                    </div>
                </section>

                {/* ─── Page 1 in Print: Executive Master Overview & Key Experiences Dossier ─── */}
                <section className="mb-12 print:mb-0 print:pb-0 print-page-break">
                    {/* Print-Only Luxury Concierge Dossier Header */}
                    <div className="hidden print:block mb-6 pb-5 border-b-2 border-primary/30">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="flex items-center gap-2">
                                    <h1 className="font-display text-3xl font-bold text-primary tracking-tight">Wanderly</h1>
                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold tracking-widest uppercase">
                                        Executive Travel Dossier
                                    </span>
                                </div>
                                <p className="font-body text-xs text-on-surface-variant uppercase tracking-widest mt-1 font-semibold">
                                    Master Overview & Curated Highlights
                                </p>
                            </div>
                            <div className="text-right">
                                {subtitle && <p className="font-body text-sm font-bold text-primary uppercase">{subtitle}</p>}
                                <p className="font-body text-[11px] text-on-surface-variant mt-0.5">
                                    Printed: {new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Executive Dossier Card */}
                    <div className="rounded-3xl bg-surface-container/60 border border-outline-variant/40 p-6 md:p-8 backdrop-blur-md shadow-sm print:bg-white print:border-2 print:border-outline-variant/60 print:p-6 print:rounded-2xl">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6 pb-6 border-b border-outline-variant/30">
                            <div>
                                <span className="font-body text-xs font-bold text-primary uppercase tracking-[0.2em]">
                                    Executive Trip Overview
                                </span>
                                <h2 className="font-display text-2xl md:text-3xl font-bold text-on-surface mt-1">
                                    {itinerary.title}
                                </h2>
                                {itinerary.description && (
                                    <p className="font-body text-sm md:text-base text-on-surface-variant/90 mt-2 max-w-3xl leading-relaxed">
                                        {itinerary.description}
                                    </p>
                                )}
                            </div>

                            {/* Summary Metrics Matrix */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 shrink-0 w-full md:w-auto">
                                <div className="px-4 py-3 rounded-2xl bg-surface border border-outline-variant/30 text-center print:bg-gray-50">
                                    <span className="font-body text-[10px] font-bold text-on-surface-variant block uppercase tracking-wider">Duration</span>
                                    <span className="font-display text-base font-bold text-primary">{dayNumbers.length} {dayNumbers.length === 1 ? "Day" : "Days"}</span>
                                </div>
                                <div className="px-4 py-3 rounded-2xl bg-surface border border-outline-variant/30 text-center print:bg-gray-50">
                                    <span className="font-body text-[10px] font-bold text-on-surface-variant block uppercase tracking-wider">Experiences</span>
                                    <span className="font-display text-base font-bold text-primary">{totalActivities} Items</span>
                                </div>
                                <div className="px-4 py-3 rounded-2xl bg-surface border border-outline-variant/30 text-center print:bg-gray-50">
                                    <span className="font-body text-[10px] font-bold text-on-surface-variant block uppercase tracking-wider">Active Time</span>
                                    <span className="font-display text-base font-bold text-primary">{totalExplorationTime || "—"}</span>
                                </div>
                                <div className="px-4 py-3 rounded-2xl bg-surface border border-outline-variant/30 text-center print:bg-gray-50">
                                    <span className="font-body text-[10px] font-bold text-on-surface-variant block uppercase tracking-wider">Pace</span>
                                    <span className="font-display text-base font-bold text-secondary">{paceLabel || "Relaxed"}</span>
                                </div>
                            </div>
                        </div>

                        {/* Master Key Experiences Index */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-xl">auto_stories</span>
                                    <h3 className="font-display text-lg md:text-xl font-bold text-on-surface">
                                        Key Experiences & Highlights at a Glance
                                    </h3>
                                </div>
                                <span className="font-body text-xs text-on-surface-variant font-medium hidden sm:inline-block">
                                    Complete Overview across all {dayNumbers.length} Days
                                </span>
                            </div>

                            {allSortedActivities.length === 0 ? (
                                <p className="font-body text-sm text-on-surface-variant/70 italic py-4 text-center">
                                    No activities curated yet. Add experiences below to populate your itinerary index.
                                </p>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 print:grid-cols-2 print:gap-3">
                                    {allSortedActivities.map((act) => (
                                        <div
                                            key={act.id}
                                            className="flex items-start gap-3 p-3.5 rounded-2xl bg-surface border border-outline-variant/30 hover:border-primary/40 transition-colors print:bg-white print:border-gray-300"
                                        >
                                            <div className="flex flex-col items-center justify-center px-2.5 py-1 rounded-xl bg-primary-fixed/40 text-primary font-bold text-[11px] shrink-0 print:bg-gray-100 print:text-black">
                                                <span className="uppercase text-[9px] tracking-wider opacity-70">Day</span>
                                                <span className="text-sm font-extrabold">{String(act.dayNumber).padStart(2, "0")}</span>
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h4 className="font-display text-sm font-bold text-on-surface truncate">{act.title}</h4>
                                                {act.description && (
                                                    <p className="font-body text-[11px] text-on-surface-variant/80 line-clamp-1 mb-1">
                                                        {act.description}
                                                    </p>
                                                )}
                                                <div className="flex items-center gap-1 text-[10px] font-medium text-primary">
                                                    <span className="material-symbols-outlined text-[13px]">schedule</span>
                                                    <span>{formatDisplayTime(act.startTime)} {act.endTime ? `– ${formatDisplayTime(act.endTime)}` : ""}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* ─── Builder Layout: 12-col Grid (Day by Day Detail on Subsequent Pages) ─── */}
                <div className="grid grid-cols-4 md:grid-cols-12 gap-gutter relative items-start">
                    {/* Left: Sticky Timeline */}
                    <DayTimeline
                        days={dayNumbers}
                        activeDay={activeDay}
                        onDayClick={scrollToDay}
                        onAddDay={handleAddDay}
                        startDate={itinerary.startDate}
                    />

                    {/* Right: Activity Canvas */}
                    <div className="col-span-4 md:col-span-9 flex flex-col gap-section-gap">
                        {/* Empty state when no activities yet */}
                        {dayNumbers.length === 0 && (
                            <div
                                data-animate-day
                                onClick={handleAddDay}
                                className="w-full py-20 border-2 border-dashed border-primary/40 rounded-3xl flex flex-col items-center justify-center bg-gradient-to-br from-primary-fixed/20 via-surface-container-low/40 to-surface hover:border-primary transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-md"
                            >
                                <div className="w-20 h-20 rounded-full bg-surface shadow-[0px_10px_25px_rgba(43,38,32,0.1)] flex items-center justify-center text-primary group-hover:scale-115 group-hover:bg-primary group-hover:text-on-primary group-hover:shadow-[0px_20px_40px_rgba(162,63,26,0.3)] transition-all duration-300 ease-out mb-5 border border-primary/20">
                                    <span className="material-symbols-outlined text-4xl group-hover:rotate-90 transition-transform duration-300">
                                        add_location_alt
                                    </span>
                                </div>
                                <h4 className="font-display text-2xl font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">
                                    Start Planning Day 1
                                </h4>
                                <p className="font-body text-sm text-on-surface-variant/80 text-center max-w-sm leading-relaxed">
                                    Curate your first highlight, arrival check-in, or sunset activity.
                                </p>
                            </div>
                        )}

                        {/* Day Sections */}
                        {dayNumbers.map((dayNumber) => {
                            const dayActivities = getActivitiesForDay(dayNumber);
                            const spanStart = formatDisplayTime(dayActivities[0]?.startTime);
                            const spanEnd = formatDisplayTime(dayActivities[dayActivities.length - 1]?.endTime);

                            return (
                                <div
                                    key={dayNumber}
                                    data-animate-day
                                    ref={(el) => (dayRefs.current[dayNumber] = el)}
                                    className="relative scroll-mt-[70px] md:scroll-mt-[120px]"
                                >
                                    {/* Day Header Bar */}
                                    <div className="day-header flex justify-between items-end mb-6 pb-4 border-b border-surface-variant">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-label-md text-xs font-bold uppercase tracking-widest text-primary px-2.5 py-0.5 rounded-full bg-primary-fixed/40">
                                                    Day {String(dayNumber).padStart(2, "0")}
                                                </span>
                                                {spanStart && (
                                                    <span className="font-body text-xs font-medium text-on-surface-variant/70">
                                                        • {spanStart} {spanEnd ? `– ${spanEnd}` : ""}
                                                    </span>
                                                )}
                                            </div>
                                            <h2 className="font-display text-2xl md:text-3xl font-bold text-on-surface">
                                                {dayActivities[0]?.title ? `${dayActivities[0].title} & Highlights` : `Day ${dayNumber} Itinerary`}
                                            </h2>
                                        </div>

                                        <button
                                            onClick={() => openCreateActivity(dayNumber)}
                                            className="px-4 py-2 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary text-on-surface font-body text-xs font-bold transition-all duration-200 flex items-center gap-1.5 shadow-2xs cursor-pointer"
                                        >
                                            <span className="material-symbols-outlined text-sm">add</span>
                                            Add Activity
                                        </button>
                                    </div>

                                    {/* Activity Bento Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-gutter">
                                        {dayActivities.map((activity, index) => (
                                            <ActivityCard
                                                key={activity.id}
                                                activity={activity}
                                                index={index}
                                                featured={index === 0}
                                                onEdit={openEditActivity}
                                                onDelete={handleDeleteActivity}
                                            />
                                        ))}
                                    </div>

                                    {/* Curate Next Experience Callout Button */}
                                    <button
                                        onClick={() => openCreateActivity(dayNumber)}
                                        className="curate-btn mt-6 w-full py-6 border-2 border-dashed border-outline-variant/60 rounded-3xl flex items-center justify-center gap-4 bg-surface-container-low/30 hover:bg-surface-container-low/70 hover:border-primary/50 transition-all duration-300 group cursor-pointer"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-surface shadow-sm flex items-center justify-center text-primary group-hover:scale-115 group-hover:bg-primary group-hover:text-on-primary transition-all duration-300">
                                            <span className="material-symbols-outlined text-xl">add</span>
                                        </div>
                                        <div className="text-left">
                                            <h5 className="font-display text-base font-bold text-on-surface group-hover:text-primary transition-colors">
                                                Curate Another Experience for Day {dayNumber}
                                            </h5>
                                            <p className="font-body text-xs text-on-surface-variant/70">
                                                Add meals, scenic stops, tours, or leisure blocks.
                                            </p>
                                        </div>
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Modals */}
            {showSettings && (
                <ItinerarySettingsModal
                    itinerary={itinerary}
                    onClose={() => setShowSettings(false)}
                    onSave={handleSaveSettings}
                    onDelete={handleDeleteItinerary}
                />
            )}

            {activityModal && (
                <ActivityFormModal
                    initialData={activityModal.activity}
                    dayNumber={activityModal.dayNumber}
                    onClose={() => setActivityModal(null)}
                    onSave={handleSaveActivity}
                />
            )}

            {/* Toast Feedback Notification */}
            {toastMessage && (
                <div
                    role="status"
                    className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[99999] bg-on-surface text-surface px-6 py-3 rounded-full shadow-warm-lg font-body text-sm font-semibold flex items-center gap-2.5 transition-all duration-300 border border-outline-variant/30 backdrop-blur-md"
                >
                    <span className="material-symbols-outlined text-primary-container text-lg">
                        {toastType === "success" ? "check_circle" : "info"}
                    </span>
                    <span>{toastMessage}</span>
                </div>
            )}
        </main>
    );
}

export default ItineraryDetail;