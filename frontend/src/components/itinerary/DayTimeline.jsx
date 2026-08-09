function DayTimeline({ days = [], activeDay, onDayClick, onAddDay, startDate }) {

    function getDayMeta(dayNumber) {
        if (!startDate) {
            return { month: "DAY", dayOfMonth: String(dayNumber).padStart(2, "0") };
        }
        const d = new Date(startDate);
        d.setDate(d.getDate() + dayNumber - 1);
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return {
            month: monthNames[d.getMonth()],
            dayOfMonth: String(d.getDate()).padStart(2, "0"),
        };
    }

    return (
        <aside className="hidden md:block col-span-3 sticky top-[100px] self-start select-none z-30">
            {/* Generous padding-left and padding-right so hover scale, glow shadows, and rings are never clipped */}
            <div className="relative pl-6 pr-4 py-6 max-h-[calc(100vh-120px)] overflow-y-auto overflow-x-visible no-scrollbar">
                
                {/* Hand-drawn organic flowing SVG line (centered at x = 60px) */}
                <div className="absolute left-[40px] top-0 bottom-0 w-10 overflow-visible z-0 pointer-events-none">
                    <svg
                        className="h-full w-full opacity-70 overflow-visible"
                        preserveAspectRatio="none"
                        viewBox="0 0 40 1000"
                    >
                        <path
                            className="timeline-path"
                            d="M20,0 Q26,50 14,100 T20,200 T16,300 T24,400 T20,500 T16,600 T24,700 T20,800 T16,900 T20,1000"
                            fill="none"
                            stroke="#dec0b7"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                        />
                    </svg>
                </div>

                {/* Timeline Nodes List with spacious vertical gaps */}
                <div className="relative z-10 flex flex-col gap-14 md:gap-16">
                    {days.map((dayNumber) => {
                        const isActive = dayNumber === activeDay;
                        const meta = getDayMeta(dayNumber);

                        return (
                            <button
                                key={dayNumber}
                                type="button"
                                onClick={() => onDayClick(dayNumber)}
                                className="flex items-center gap-4 group text-left cursor-pointer transition-all duration-200 focus:outline-none"
                            >
                                {/* Day Circle Node with ample margins */}
                                <div
                                    className={`w-[72px] h-[72px] rounded-full flex flex-col items-center justify-center transition-all duration-300 relative shrink-0 ${
                                        isActive
                                            ? "bg-surface border-2 border-primary ring-4 ring-primary/20 shadow-[0px_10px_25px_rgba(162,63,26,0.2)] scale-105"
                                            : "bg-surface/95 border border-outline-variant/70 opacity-80 group-hover:opacity-100 group-hover:border-primary/60 group-hover:bg-surface group-hover:scale-105 group-hover:shadow-md"
                                    }`}
                                >
                                    <span
                                        className={`font-display text-2xl font-bold leading-none transition-colors ${
                                            isActive ? "text-primary" : "text-on-surface"
                                        }`}
                                    >
                                        {meta.dayOfMonth}
                                    </span>
                                    <span
                                        className={`font-body text-[10px] uppercase font-bold tracking-widest mt-1 transition-colors ${
                                            isActive ? "text-primary" : "text-on-surface-variant/70"
                                        }`}
                                    >
                                        {meta.month}
                                    </span>
                                </div>

                                {/* Day Label & Active Pip */}
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-1.5">
                                        <span
                                            className={`font-display text-base font-bold transition-all duration-200 ${
                                                isActive
                                                    ? "text-primary translate-x-1"
                                                    : "text-on-surface group-hover:text-primary"
                                            }`}
                                        >
                                            Day {String(dayNumber).padStart(2, "0")}
                                        </span>
                                        {isActive && (
                                            <span className="w-2 h-2 rounded-full bg-primary" />
                                        )}
                                    </div>
                                    <span className="font-body text-xs text-on-surface-variant/60 font-medium">
                                        {isActive ? "Active section" : "Jump to day"}
                                    </span>
                                </div>
                            </button>
                        );
                    })}

                    {/* Add Day Node - Exactly centered along the vertical line */}
                    <div className="flex items-center gap-4 pt-1">
                        <div className="w-[72px] flex items-center justify-center shrink-0">
                            <button
                                type="button"
                                onClick={onAddDay}
                                title="Add Next Day"
                                className="w-12 h-12 rounded-full bg-surface border-2 border-dashed border-primary/50 text-primary flex items-center justify-center shadow-xs hover:shadow-md hover:scale-115 hover:bg-primary hover:text-on-primary hover:border-solid transition-all duration-250 group cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-xl group-hover:rotate-90 transition-transform duration-300">
                                    add
                                </span>
                            </button>
                        </div>
                        <span className="font-body text-xs font-semibold text-on-surface-variant/80">
                            Add Day
                        </span>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default DayTimeline;