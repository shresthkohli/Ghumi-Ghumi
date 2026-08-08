import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import itinerariesApi from "../api/itinerariesApi";
import ActivityCard from "../components/ActivityCard";
import ActivityFormModal from "../components/ActivityFormModal";
import ItinerarySettingsModal from "../components/ItinerarySettingsModal";
import DayTimeline from "../components/DayTimeline";
import { formatDisplayTime } from "../utils/formatTime";

const API_URL = import.meta.env.VITE_API_URL ?? "";

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
            gsap.fromTo(
                pageRef.current.querySelectorAll("[data-animate]"),
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.08, overwrite: true }
            );
        }
    }, [loading, error]);

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

    function getDayNumbers(activities) {
        const unique = [...new Set(activities.map((a) => a.dayNumber))];
        return unique.sort((a, b) => a - b);
    }

    function getActivitiesForDay(dayNumber) {
        return itinerary.activities
            .filter((a) => a.dayNumber === dayNumber)
            .sort((a, b) => a.position - b.position);
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
        const days = getDayNumbers(itinerary.activities);
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
            setItinerary((prev) => ({ ...prev, activities: [...prev.activities, created] }));
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

    // ── Loading skeleton ──
    if (loading) {
        return (
            <main className="min-h-screen bg-background pt-[100px] pb-32">
                <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
                    <div className="py-12 md:py-20">
                        <div className="h-5 w-40 rounded-full bg-surface-container-high animate-pulse mb-6" />
                        <div className="h-16 w-2/3 rounded-xl bg-surface-container-high animate-pulse mb-4" />
                        <div className="h-16 w-1/2 rounded-xl bg-surface-container-high animate-pulse mb-8" />
                        <div className="h-6 w-3/4 rounded-full bg-surface-container-high animate-pulse" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
                        <div className="hidden md:block col-span-3">
                            <div className="flex flex-col gap-8 py-8">
                                <div className="w-20 h-20 rounded-full bg-surface-container-high animate-pulse" />
                                <div className="w-20 h-20 rounded-full bg-surface-container-high animate-pulse" />
                            </div>
                        </div>
                        <div className="col-span-1 md:col-span-9">
                            <div className="h-10 w-1/2 rounded-full bg-surface-container-high animate-pulse mb-8" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                                <div className="h-[400px] rounded-2xl bg-surface-container-high animate-pulse" />
                                <div className="flex flex-col gap-gutter">
                                    <div className="h-[190px] rounded-2xl bg-surface-container-high animate-pulse" />
                                    <div className="h-[190px] rounded-2xl bg-surface-container-high animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    // ── Error state ──
    if (error || !itinerary) {
        return (
            <main className="min-h-screen bg-background pt-[100px] pb-24 flex flex-col items-center justify-center text-center gap-4">
                <span className="material-symbols-outlined text-error text-5xl">error</span>
                <p className="font-body text-base text-error">{error || "Itinerary not found."}</p>
                <button
                    onClick={loadItinerary}
                    className="font-body text-sm font-semibold text-primary underline underline-offset-4 hover:text-primary-container transition-colors"
                >
                    Try again
                </button>
            </main>
        );
    }

    const dayNumbers = getDayNumbers(itinerary.activities);

    // Build subtitle from destination or date range
    const subtitle = itinerary.destinationName || "";

    return (
        <main ref={pageRef} className="min-h-screen bg-background pt-[100px] pb-32 md:pb-[80px] overflow-x-hidden">
            <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">

                {/* ─── Hero / Page Header ─── */}
                <section
                    data-animate
                    className="py-12 md:py-20 flex flex-col md:flex-row justify-between items-end gap-8 relative z-10"
                >
                    <div className="max-w-2xl">
                        {subtitle && (
                            <p className="font-body text-sm font-semibold text-secondary tracking-[0.15em] uppercase mb-4">
                                {subtitle}
                            </p>
                        )}
                        <h1 className="font-display text-display-lg text-on-surface mb-6 leading-tight">
                            {itinerary.title}
                        </h1>
                        {itinerary.description && (
                            <p className="font-body text-lg text-on-surface-variant/80 leading-relaxed">
                                {itinerary.description}
                            </p>
                        )}
                    </div>
                    <div className="flex gap-4 shrink-0">
                        <button
                            onClick={() => setShowSettings(true)}
                            className="px-6 py-3 rounded-full border border-outline font-body text-sm font-semibold text-on-surface hover:bg-surface-container-low transition-colors duration-300 flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined text-sm">settings</span>
                            Settings
                        </button>
                        <button
                            onClick={() => navigate("/itineraries")}
                            className="px-8 py-3 rounded-full bg-primary text-on-primary font-body text-sm font-semibold shadow-[0_15px_30px_rgba(162,63,26,0.25)] hover:scale-105 transition-transform duration-300 flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined text-sm">check</span>
                            Finalize
                        </button>
                    </div>
                </section>

                {/* ─── Builder Layout: 12-col Grid ─── */}
                <div className="grid grid-cols-4 md:grid-cols-12 gap-gutter relative">
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
                        {/* Empty state */}
                        {dayNumbers.length === 0 && (
                            <div
                                data-animate
                                onClick={handleAddDay}
                                className="w-full py-16 border-2 border-dashed border-outline-variant rounded-2xl flex flex-col items-center justify-center bg-surface-container-low/30 hover:bg-surface-container-low transition-colors duration-300 cursor-pointer group"
                            >
                                <div className="w-16 h-16 rounded-full bg-surface shadow-[0px_10px_20px_rgba(43,38,32,0.1)] flex items-center justify-center text-primary group-hover:-translate-y-2 group-hover:shadow-[0px_20px_40px_rgba(43,38,32,0.15)] transition-all duration-300 ease-out mb-4">
                                    <span className="material-symbols-outlined text-3xl">library_add</span>
                                </div>
                                <h4 className="font-display text-xl font-semibold text-on-surface mb-1">
                                    Start planning Day 1
                                </h4>
                                <p className="font-body text-base text-on-surface-variant/70 text-center max-w-sm">
                                    Add your first activity to get this trip moving.
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
                                    data-animate
                                    ref={(el) => (dayRefs.current[dayNumber] = el)}
                                    className="relative scroll-mt-[120px]"
                                >
                                    {/* Day Header */}
                                    <div className="flex justify-between items-end mb-8 border-b border-surface-variant pb-4">
                                        <div>
                                            <h2 className="font-display text-headline-lg text-on-surface">
                                                Day {String(dayNumber).padStart(2, "0")}: {dayActivities[0]?.title || "Activities"}
                                            </h2>
                                            <p className="font-body text-base text-on-surface-variant mt-2">
                                                {spanStart} – {spanEnd}
                                            </p>
                                        </div>
                                        <button className="text-on-surface-variant hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined">more_horiz</span>
                                        </button>
                                    </div>

                                    {/* Activity Grid — Bento / Scrapbook Layout */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-gutter">
                                        {dayActivities.map((activity, index) => (
                                            <ActivityCard
                                                key={activity.id}
                                                activity={activity}
                                                featured={index === 0}
                                                onEdit={openEditActivity}
                                                onDelete={handleDeleteActivity}
                                            />
                                        ))}
                                    </div>

                                    {/* Add Activity — Curate an Experience */}
                                    <button
                                        onClick={() => openCreateActivity(dayNumber)}
                                        className="mt-8 md:mt-12 w-full py-8 border-2 border-dashed border-outline-variant rounded-2xl flex flex-col items-center justify-center bg-surface-container-low/30 hover:bg-surface-container-low transition-colors duration-300 group cursor-pointer"
                                    >
                                        <div className="w-16 h-16 rounded-full bg-surface shadow-[0px_10px_20px_rgba(43,38,32,0.1)] flex items-center justify-center text-primary group-hover:-translate-y-2 group-hover:shadow-[0px_20px_40px_rgba(43,38,32,0.15)] transition-all duration-300 ease-out mb-4">
                                            <span className="material-symbols-outlined text-3xl">library_add</span>
                                        </div>
                                        <h4 className="font-display text-xl font-semibold text-on-surface mb-1">
                                            Curate an Experience
                                        </h4>
                                        <p className="font-body text-base text-on-surface-variant/70 text-center max-w-sm">
                                            Create a bespoke activity block for Day {dayNumber}.
                                        </p>
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