function DayTimeline({ days, activeDay, onDayClick, onAddDay }) {
    return (
        <div className="hidden md:block col-span-3 sticky top-[120px] h-[calc(100vh-140px)]">
            <div className="flex flex-col gap-8 py-8">
                {days.map((dayNumber) => {
                    const isActive = dayNumber === activeDay;
                    return (
                        <button
                            key={dayNumber}
                            onClick={() => onDayClick(dayNumber)}
                            className="flex items-center gap-4 group text-left"
                        >
                            <div
                                className={`w-16 h-16 rounded-full flex items-center justify-center border transition-all duration-300 shrink-0 ${
                                    isActive
                                        ? "bg-surface-container-lowest border-primary shadow-[0px_10px_20px_rgba(43,38,32,0.12)] scale-105"
                                        : "bg-surface border-outline-variant opacity-60 group-hover:opacity-100"
                                }`}
                            >
                                <span className="font-headline-md text-headline-md text-on-surface leading-none">
                                    {dayNumber}
                                </span>
                            </div>
                            <span
                                className={`font-label-lg text-label-lg ${
                                    isActive ? "text-primary" : "text-on-surface-variant"
                                }`}
                            >
                                Day {dayNumber}
                            </span>
                        </button>
                    );
                })}

                <button
                    onClick={onAddDay}
                    className="w-12 h-12 rounded-full bg-surface-container-high text-primary flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 border border-surface-variant ml-2"
                >
                    <span className="material-symbols-outlined">add</span>
                </button>
            </div>
        </div>
    );
}

export default DayTimeline;