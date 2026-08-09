import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import itinerariesApi from "../api/itinerariesApi";
import ActivityCard from "../components/itinerary/ActivityCard";
import ActivityFormModal from "../components/itinerary/ActivityFormModal";
import ItinerarySettingsModal from "../components/itinerary/ItinerarySettingsModal";
import DayTimeline from "../components/itinerary/DayTimeline";
import { formatDisplayTime } from "../utils/formatTime";

function ItineraryDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [itinerary, setItinerary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [activeDay, setActiveDay] = useState(null);
    const [showSettings, setShowSettings] = useState(false);
    const [activityModal, setActivityModal] = useState(null);

    const pageRef = useRef(null);
    const dayRefs = useRef({});

    useEffect(() => {
        loadItinerary();
    }, [id]);

    useGSAP(() => {
        if (!loading && !error && pageRef.current) {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // Stagger hero elements
            tl.fromTo(
                pageRef.current.querySelectorAll("[data-animate-hero]"),
                { opacity: 0, y: 30, filter: "blur(4px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, stagger: 0.1 }
            );

            // Stagger day sections
            tl.fromTo(
                pageRef.current.querySelectorAll("[data-animate-day]"),
                { opacity: 0, y: 35, scale: 0.98 },
                { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.12 },
                "-=0.3"
            );
        }
    }, [loading, error, itinerary]);

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
    const subtitle = itinerary.destinationName || "";

    return (
        <main ref={pageRef} className="min-h-screen bg-background pt-[100px] pb-32 md:pb-[80px]">
            <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">

                {/* ─── Hero / Page Header ─── */}
                <section className="py-10 md:py-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 relative z-10">
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

                        {/* Trip Quick Stats Bar */}
                        <div data-animate-hero className="flex flex-wrap items-center gap-3 pt-1">
                            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-container border border-outline-variant/40 text-xs font-semibold text-on-surface">
                                <span className="material-symbols-outlined text-[15px] text-primary">calendar_month</span>
                                {dayNumbers.length} {dayNumbers.length === 1 ? "Day" : "Days"} Planned
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-container border border-outline-variant/40 text-xs font-semibold text-on-surface">
                                <span className="material-symbols-outlined text-[15px] text-primary">attractions</span>
                                {totalActivities} {totalActivities === 1 ? "Experience" : "Experiences"}
                            </span>
                        </div>
                    </div>

                    <div data-animate-hero className="flex items-center gap-3 shrink-0">
                        <button
                            onClick={() => setShowSettings(true)}
                            className="px-5 py-3 rounded-full border border-outline-variant bg-surface font-body text-sm font-semibold text-on-surface hover:bg-surface-container transition-all duration-200 flex items-center gap-2 shadow-2xs hover:scale-102 cursor-pointer"
                        >
                            <span className="material-symbols-outlined text-base">settings</span>
                            Settings
                        </button>
                        <button
                            onClick={() => navigate("/itineraries")}
                            className="px-7 py-3 rounded-full bg-primary text-on-primary font-body text-sm font-semibold shadow-[0_12px_28px_rgba(162,63,26,0.25)] hover:scale-105 active:scale-98 transition-all duration-300 flex items-center gap-2 cursor-pointer"
                        >
                            <span className="material-symbols-outlined text-base">check_circle</span>
                            Done Planning
                        </button>
                    </div>
                </section>

                {/* ─── Builder Layout: 12-col Grid ─── */}
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
                                    className="relative scroll-mt-[120px]"
                                >
                                    {/* Day Header Bar */}
                                    <div className="flex justify-between items-end mb-6 pb-4 border-b border-surface-variant">
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
                                        className="mt-6 w-full py-6 border-2 border-dashed border-outline-variant/60 rounded-3xl flex items-center justify-center gap-4 bg-surface-container-low/30 hover:bg-surface-container-low/70 hover:border-primary/50 transition-all duration-300 group cursor-pointer"
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
        </main>
    );
}

export default ItineraryDetail;