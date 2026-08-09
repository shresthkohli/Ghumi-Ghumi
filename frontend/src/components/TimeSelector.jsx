import { useState } from "react";
import { parseTimeTo12H, formatTo24H, addMinutesToTime, formatDisplayTime, getTimeOfDayIcon, calculateDuration } from "../utils/formatTime";

const QUICK_PRESETS = [
    { label: "Morning", time: "09:00", icon: "wb_twilight" },
    { label: "Midday", time: "12:00", icon: "sunny" },
    { label: "Afternoon", time: "15:30", icon: "wb_sunny" },
    { label: "Sunset", time: "18:00", icon: "nights_stay" },
    { label: "Dinner", time: "20:00", icon: "restaurant" },
];

const DURATION_PRESETS = [
    { label: "+30m", minutes: 30 },
    { label: "+1 hr", minutes: 60 },
    { label: "+1.5 hrs", minutes: 90 },
    { label: "+2 hrs", minutes: 120 },
    { label: "+3 hrs", minutes: 180 },
];

const MINUTE_STEPS = ["00", "15", "30", "45"];
const HOURS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

/**
 * Unified Inline Time & Duration Range Selector
 * Initially compact and uncluttered. Clicking a time card smoothly opens the bottom control deck.
 */
function TimeSelector({
    startTime = "09:00",
    endTime = "11:00",
    onStartTimeChange,
    onEndTimeChange,
}) {
    // null (collapsed), "start", or "end"
    const [activeTab, setActiveTab] = useState(null);

    const currentVal = activeTab === "start" ? startTime : endTime;
    const { hour, minute, period } = parseTimeTo12H(currentVal || "09:00");
    const durationInfo = calculateDuration(startTime, endTime);

    const startIcon = getTimeOfDayIcon(startTime);
    const endIcon = getTimeOfDayIcon(endTime);

    function toggleTab(tab) {
        if (activeTab === tab) {
            setActiveTab(null); // collapse if clicking the same tab
        } else {
            setActiveTab(tab);
        }
    }

    function handleHourSelect(newHour) {
        const time24 = formatTo24H(newHour, minute, period);
        if (activeTab === "start") {
            onStartTimeChange(time24);
        } else {
            onEndTimeChange(time24);
        }
    }

    function handleMinuteSelect(newMinute) {
        const time24 = formatTo24H(hour, newMinute, period);
        if (activeTab === "start") {
            onStartTimeChange(time24);
        } else {
            onEndTimeChange(time24);
        }
    }

    function handlePeriodToggle(newPeriod) {
        const time24 = formatTo24H(hour, minute, newPeriod);
        if (activeTab === "start") {
            onStartTimeChange(time24);
        } else {
            onEndTimeChange(time24);
        }
    }

    function handleHourIncrement(delta) {
        let newH = hour + delta;
        if (newH > 12) newH = 1;
        if (newH < 1) newH = 12;
        handleHourSelect(newH);
    }

    function handleMinuteIncrement(deltaMinutes) {
        let currentM = parseInt(minute, 10);
        let nextM = currentM + deltaMinutes;
        if (nextM >= 60) nextM = 0;
        if (nextM < 0) nextM = 45;
        const rounded = (Math.round(nextM / 5) * 5) % 60;
        handleMinuteSelect(rounded.toString().padStart(2, "0"));
    }

    function handlePresetClick(presetTime) {
        if (activeTab === "start") {
            onStartTimeChange(presetTime);
        } else {
            onEndTimeChange(presetTime);
        }
    }

    function handleDurationQuickAdd(minutes) {
        const newEndTime = addMinutesToTime(startTime, minutes);
        onEndTimeChange(newEndTime);
        setActiveTab("end");
    }

    return (
        <div className="w-full rounded-2xl bg-surface-container-low/40 border border-outline-variant/40 p-3.5 transition-all duration-300">
            {/* Header: Start vs End Time Dual Clickable Cards */}
            <div className="grid grid-cols-2 gap-3">
                {/* Start Time Card */}
                <button
                    type="button"
                    onClick={() => toggleTab("start")}
                    className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between cursor-pointer group ${
                        activeTab === "start"
                            ? "bg-surface border-primary ring-2 ring-primary/20 shadow-xs"
                            : "bg-surface/70 border-outline-variant/50 hover:bg-surface hover:border-primary/40 hover:shadow-2xs"
                    }`}
                >
                    <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant mb-1">
                        <span>Start Time</span>
                        <span className="material-symbols-outlined text-[16px] text-primary group-hover:scale-110 transition-transform">
                            {startIcon}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="font-display text-lg font-bold text-on-surface">
                            {formatDisplayTime(startTime)}
                        </span>
                        <span className={`material-symbols-outlined text-sm transition-transform duration-200 ${
                            activeTab === "start" ? "rotate-180 text-primary" : "text-outline"
                        }`}>
                            expand_more
                        </span>
                    </div>
                </button>

                {/* End Time Card */}
                <button
                    type="button"
                    onClick={() => toggleTab("end")}
                    className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between cursor-pointer group ${
                        activeTab === "end"
                            ? "bg-surface border-primary ring-2 ring-primary/20 shadow-xs"
                            : !durationInfo.isValid
                            ? "bg-error/5 border-error/40 hover:bg-error/10"
                            : "bg-surface/70 border-outline-variant/50 hover:bg-surface hover:border-primary/40 hover:shadow-2xs"
                    }`}
                >
                    <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant mb-1">
                        <span>End Time</span>
                        <span className="material-symbols-outlined text-[16px] text-primary group-hover:scale-110 transition-transform">
                            {endIcon}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="font-display text-lg font-bold text-on-surface">
                            {formatDisplayTime(endTime)}
                        </span>
                        <span className={`material-symbols-outlined text-sm transition-transform duration-200 ${
                            activeTab === "end" ? "rotate-180 text-primary" : "text-outline"
                        }`}>
                            expand_more
                        </span>
                    </div>
                </button>
            </div>

            {/* Collapsible Control Deck: Only expands when user clicks on Start or End Time */}
            {activeTab && (
                <div className="mt-3.5 pt-3.5 border-t border-surface-variant/50 bg-surface rounded-xl p-3.5 border border-outline-variant/40 shadow-xs animate-in fade-in zoom-in-95 duration-200">
                    {/* Active Indicator & AM/PM Switch */}
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-surface-variant/60">
                        <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            Adjusting {activeTab === "start" ? "Start Time" : "End Time"}
                        </span>

                        {/* AM / PM Segmented Control */}
                        <div className="inline-flex rounded-lg p-0.5 bg-surface-container border border-outline-variant/40">
                            <button
                                type="button"
                                onClick={() => handlePeriodToggle("AM")}
                                className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                                    period === "AM"
                                        ? "bg-primary text-on-primary shadow-sm"
                                        : "text-on-surface-variant hover:text-on-surface"
                                }`}
                            >
                                AM
                            </button>
                            <button
                                type="button"
                                onClick={() => handlePeriodToggle("PM")}
                                className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                                    period === "PM"
                                        ? "bg-primary text-on-primary shadow-sm"
                                        : "text-on-surface-variant hover:text-on-surface"
                                }`}
                            >
                                PM
                            </button>
                        </div>
                    </div>

                    {/* Digital Stepper Dials */}
                    <div className="flex items-center justify-center gap-4 py-2 mb-3 bg-surface-container-low/50 rounded-xl border border-outline-variant/30">
                        {/* Hour Stepper */}
                        <div className="flex items-center gap-1.5">
                            <button
                                type="button"
                                onClick={() => handleHourIncrement(-1)}
                                className="w-7 h-7 rounded-lg bg-surface border border-outline-variant/50 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary active:scale-95 transition-all cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-sm">remove</span>
                            </button>
                            <div className="w-12 py-1 text-center font-display text-2xl font-bold text-on-surface">
                                {hour.toString().padStart(2, "0")}
                            </div>
                            <button
                                type="button"
                                onClick={() => handleHourIncrement(1)}
                                className="w-7 h-7 rounded-lg bg-surface border border-outline-variant/50 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary active:scale-95 transition-all cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-sm">add</span>
                            </button>
                        </div>

                        <span className="text-xl font-bold text-on-surface-variant/40">:</span>

                        {/* Minute Stepper */}
                        <div className="flex items-center gap-1.5">
                            <button
                                type="button"
                                onClick={() => handleMinuteIncrement(-15)}
                                className="w-7 h-7 rounded-lg bg-surface border border-outline-variant/50 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary active:scale-95 transition-all cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-sm">remove</span>
                            </button>
                            <div className="w-12 py-1 text-center font-display text-2xl font-bold text-on-surface">
                                {minute}
                            </div>
                            <button
                                type="button"
                                onClick={() => handleMinuteIncrement(15)}
                                className="w-7 h-7 rounded-lg bg-surface border border-outline-variant/50 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary active:scale-95 transition-all cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-sm">add</span>
                            </button>
                        </div>
                    </div>

                    {/* Direct Hour Chips (1 to 12) */}
                    <div className="mb-2.5">
                        <div className="grid grid-cols-6 gap-1">
                            {HOURS.map((h) => {
                                const isSelected = hour === h;
                                return (
                                    <button
                                        key={h}
                                        type="button"
                                        onClick={() => handleHourSelect(h)}
                                        className={`py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                            isSelected
                                                ? "bg-primary text-on-primary font-bold shadow-xs scale-102"
                                                : "bg-surface-container text-on-surface hover:bg-surface-container-high"
                                        }`}
                                    >
                                        {h}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Direct Minute Chips */}
                    <div className="mb-3">
                        <div className="grid grid-cols-4 gap-1">
                            {MINUTE_STEPS.map((m) => {
                                const isSelected = minute === m;
                                return (
                                    <button
                                        key={m}
                                        type="button"
                                        onClick={() => handleMinuteSelect(m)}
                                        className={`py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                            isSelected
                                                ? "bg-primary text-on-primary font-bold shadow-xs scale-102"
                                                : "bg-surface-container text-on-surface hover:bg-surface-container-high"
                                        }`}
                                    >
                                        :{m}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Contextual Quick Presets Bar */}
                    <div className="pt-2 border-t border-surface-variant/60">
                        {activeTab === "start" ? (
                            <div>
                                <span className="text-[11px] font-medium text-on-surface-variant block mb-1">
                                    Travel Presets:
                                </span>
                                <div className="flex flex-wrap gap-1">
                                    {QUICK_PRESETS.map((preset) => (
                                        <button
                                            key={preset.label}
                                            type="button"
                                            onClick={() => handlePresetClick(preset.time)}
                                            className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-surface-container text-on-surface hover:bg-primary-fixed hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
                                        >
                                            <span className="material-symbols-outlined text-[12px]">{preset.icon}</span>
                                            {preset.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div>
                                <span className="text-[11px] font-medium text-on-surface-variant block mb-1">
                                    Quick duration from start:
                                </span>
                                <div className="flex flex-wrap gap-1">
                                    {DURATION_PRESETS.map((dur) => (
                                        <button
                                            key={dur.label}
                                            type="button"
                                            onClick={() => handleDurationQuickAdd(dur.minutes)}
                                            className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-primary-fixed/40 text-primary hover:bg-primary hover:text-on-primary transition-colors active:scale-95 cursor-pointer"
                                        >
                                            {dur.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Done / Collapse Button */}
                    <button
                        type="button"
                        onClick={() => setActiveTab(null)}
                        className="w-full mt-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface text-xs font-semibold hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
                    >
                        Done Setting Time
                    </button>
                </div>
            )}
        </div>
    );
}

export default TimeSelector;
