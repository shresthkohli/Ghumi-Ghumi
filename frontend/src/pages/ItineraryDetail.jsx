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

    if (loading) {
        return (
            <main className="min-h-screen pt-12 pb-24">
                <div className="max-w-container-max mx-auto px-margin-desktop">
                    <div className="h-10 w-1/3 rounded-full bg-surface-container-high animate-pulse mb-6" />
                    <div className="h-16 w-2/3 rounded-full bg-surface-container-high animate-pulse mb-12" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                        <div className="h-[400px] rounded-2xl bg-surface-container-high animate-pulse" />
                        <div className="h-[400px] rounded-2xl bg-surface-container-high animate-pulse" />
                    </div>
                </div>
            </main>
        );
    }

    if (error || !itinerary) {
        return (
            <main className="min-h-screen pt-12 pb-24 flex flex-col items-center text-center gap-4">
                <span className="material-symbols-outlined text-error scale-150">error</span>
                <p className="font-body-md text-body-md text-error">{error || "Itinerary not found."}</p>
                <button
                    onClick={loadItinerary}
                    className="font-label-md text-label-md text-primary underline underline-offset-4"
                >
                    Try again
                </button>
            </main>
        );
    }

    const dayNumbers = getDayNumbers(itinerary.activities);

    return (
        <main ref={pageRef} className="min-h-screen pt-12 pb-24">
            {/* Destination hero strip */}
            {itinerary.destinationImageUrl && (
                <div
                    data-animate
                    className="w-full h-[280px] bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${API_URL}${itinerary.destinationImageUrl})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                </div>
            )}

            <div className="max-w-container-max mx-auto px-margin-desktop">
                {/* Header */}
                <section
                    data-animate
                    className={`flex flex-col md:flex-row justify-between items-end gap-8 ${
                        itinerary.destinationImageUrl ? "-mt-16 relative z-10 pb-12" : "py-12"
                    }`}
                >
                    <div className="max-w-2xl">
                        {itinerary.destinationName && (
                            <p className="font-label-lg text-label-lg text-secondary tracking-widest uppercase mb-4">
                                {itinerary.destinationName}
                            </p>
                        )}
                        <h1 className="font-display-lg text-display-lg text-on-surface mb-6 leading-tight">
                            {itinerary.title}
                        </h1>
                        {itinerary.description && (
                            <p className="font-body-lg text-body-lg text-on-surface-variant/80">
                                {itinerary.description}
                            </p>
                        )}
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setShowSettings(true)}
                            className="px-6 py-3 rounded-full border border-outline font-label-lg text-label-lg text-on-surface hover:bg-surface-container-low transition-colors duration-300 flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined text-sm">settings</span>
                            Settings
                        </button>
                        <button
                            onClick={() => navigate("/itineraries")}
                            className="px-8 py-3 rounded-full bg-primary text-on-primary font-label-lg text-label-lg shadow-[0_15px_30px_rgba(162,63,26,0.25)] hover:scale-105 transition-transform duration-300 flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined text-sm">check</span>
                            Done
                        </button>
                    </div>
                </section>

                {/* Builder layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter relative">
                    <DayTimeline
                        days={dayNumbers}
                        activeDay={activeDay}
                        onDayClick={scrollToDay}
                        onAddDay={handleAddDay}
                    />

                    <div className="col-span-1 md:col-span-9 flex flex-col gap-section-gap">
                        {dayNumbers.length === 0 && (
                            <div
                                onClick={handleAddDay}
                                className="w-full py-16 border-2 border-dashed border-outline-variant rounded-2xl flex flex-col items-center justify-center bg-surface-container-low/30 hover:bg-surface-container-low transition-colors duration-300 cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-3xl text-primary mb-4">
                                    library_add
                                </span>
                                <h4 className="font-headline-md text-on-surface mb-1">
                                    Start planning Day 1
                                </h4>
                                <p className="font-body-md text-body-md text-on-surface-variant/70 text-center">
                                    Add your first activity to get this trip moving.
                                </p>
                            </div>
                        )}

                        {dayNumbers.map((dayNumber) => {
                            const dayActivities = getActivitiesForDay(dayNumber);
                            const spanStart = formatDisplayTime(dayActivities[0].startTime);
                            const spanEnd = formatDisplayTime(dayActivities[dayActivities.length - 1].endTime);

                            return (
                                <div
                                    key={dayNumber}
                                    data-animate
                                    ref={(el) => (dayRefs.current[dayNumber] = el)}
                                    className="relative scroll-mt-[120px]"
                                >
                                    <div className="flex justify-between items-end mb-8 border-b border-surface-variant pb-4">
                                        <div>
                                            <h2 className="font-display-lg text-headline-lg text-on-surface">
                                                Day {dayNumber}
                                            </h2>
                                            <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                                                {spanStart} – {spanEnd}
                                            </p>
                                        </div>
                                    </div>

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

                                    <button
                                        onClick={() => openCreateActivity(dayNumber)}
                                        className="mt-8 w-full py-8 border-2 border-dashed border-outline-variant rounded-2xl flex flex-col items-center justify-center bg-surface-container-low/30 hover:bg-surface-container-low transition-colors duration-300 group"
                                    >
                                        <div className="w-16 h-16 rounded-full bg-surface shadow-[0px_10px_20px_rgba(43,38,32,0.1)] flex items-center justify-center text-primary group-hover:-translate-y-2 transition-all duration-300 ease-out mb-4">
                                            <span className="material-symbols-outlined text-3xl">
                                                library_add
                                            </span>
                                        </div>
                                        <h4 className="font-headline-md text-on-surface mb-1">
                                            Add an activity
                                        </h4>
                                        <p className="font-body-md text-body-md text-on-surface-variant/70">
                                            Add another stop to Day {dayNumber}
                                        </p>
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

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