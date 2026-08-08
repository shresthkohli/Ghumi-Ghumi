function DayTimeline({ days, activeDay, onDayClick, onAddDay, startDate }) {

    function getDayLabel(dayNumber) {
        if (!startDate) return `Day ${dayNumber}`;
        const d = new Date(startDate);
        d.setDate(d.getDate() + dayNumber - 1);
        const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        return monthNames[d.getMonth()];
    }

    function getDayTitle(dayNumber) {
        return `Day ${dayNumber}`;
    }

    return (
        <div className="hidden md:block col-span-3 relative sticky top-[120px] h-[calc(100vh-140px)]">
            {/* Hand-drawn SVG Timeline Line */}
            <div className="absolute left-[39px] top-0 bottom-0 w-12 overflow-hidden z-0">
                <svg
                    className="h-full w-full"
                    preserveAspectRatio="none"
                    viewBox="0 0 10 1000"
                >
                    <path
                        className="timeline-path"
                        d="M5,0 Q8,50 3,100 T5,200 T4,300 T6,400 T5,500 T4,600 T6,700 T5,800 T4,900 T5,1000"
                        fill="none"
                        stroke="#dec0b7"
                        strokeLinecap="round"
                        strokeWidth="1.5"
                    />
                </svg>
            </div>

            {/* Timeline Nodes */}
            <div className="relative z-10 flex flex-col gap-16 py-8">
                {days.map((dayNumber) => {
                    const isActive = dayNumber === activeDay;
                    const monthLabel = getDayLabel(dayNumber);

                    return (
                        <button
                            key={dayNumber}
                            onClick={() => onDayClick(dayNumber)}
                            className="flex items-center gap-6 group text-left cursor-pointer"
                        >
                            <div
                                className={`w-20 h-20 rounded-full flex flex-col items-center justify-center border transition-all duration-300 relative z-10 ${
                                    isActive
                                        ? "bg-surface-container-lowest shadow-[0px_10px_20px_rgba(43,38,32,0.12)] border-surface-container group-hover:scale-110 group-hover:border-primary"
                                        : "bg-surface border-outline-variant opacity-60 group-hover:opacity-100 group-hover:scale-110"
                                }`}
                            >
                                <span className="font-display text-2xl font-semibold text-on-surface leading-none">
                                    {String(dayNumber).padStart(2, "0")}
                                </span>
                                <span className="font-body text-[10px] uppercase tracking-wider text-on-surface-variant mt-0.5">
                                    {monthLabel}
                                </span>
                            </div>
                            <span
                                className={`font-body text-sm font-semibold transition-colors duration-300 ${
                                    isActive ? "text-primary" : "text-on-surface-variant"
                                }`}
                            >
                                {getDayTitle(dayNumber)}
                            </span>
                        </button>
                    );
                })}

                {/* Add Day Node */}
                <div className="flex items-center gap-6 ml-4 mt-8">
                    <button
                        onClick={onAddDay}
                        className="w-12 h-12 rounded-full bg-surface-container-high text-primary flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 border border-surface-variant"
                    >
                        <span className="material-symbols-outlined">add</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DayTimeline;