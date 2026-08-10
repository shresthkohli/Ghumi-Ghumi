function StatCard({
    value,
    label,
    icon,
    accent = false,
}) {
    return (
        <div
            className={`
                group
                relative
                overflow-hidden
                rounded-3xl
                sm:rounded-[2rem]
                bg-tertiary-dark
                border
                border-tertiary/30
                p-5
                sm:p-7
                transition-all
                duration-300
                ease-out
                hover:-translate-y-1.5
                hover:border-primary/50
                hover:shadow-[0_20px_40px_-10px_rgba(22,63,63,0.5)]
                cursor-default
            `}
        >
            {/* Subtle ambient hover glow */}
            <div
                className="
                    pointer-events-none
                    absolute
                    -right-8
                    -top-8
                    h-28
                    w-28
                    rounded-full
                    bg-white/5
                    blur-xl
                    transition-all
                    duration-500
                    group-hover:scale-150
                    group-hover:bg-primary/10
                "
            />

            {/* Icon */}
            <div
                className={`
                    relative
                    mb-4
                    sm:mb-6
                    flex
                    h-11
                    w-11
                    sm:h-14
                    sm:w-14
                    items-center
                    justify-center
                    rounded-2xl
                    transition-all
                    duration-300
                    ease-out
                    group-hover:scale-110
                    group-hover:-rotate-6
                    ${accent
                        ? "bg-primary text-on-primary shadow-[0_4px_20px_rgba(162,63,26,0.35)]"
                        : "bg-tertiary text-tertiary-fixed shadow-[0_4px_20px_rgba(39,104,104,0.35)]"
                    }
                `}
            >
                <span className="material-symbols-outlined text-2xl sm:text-3xl">
                    {icon}
                </span>
            </div>

            {/* Number */}
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white font-bold leading-none transition-all duration-300 group-hover:scale-105 origin-left">
                {value}
            </h2>

            {/* Label */}
            <p className="mt-3 font-body text-sm font-medium text-white/70 group-hover:text-white/90 transition-colors">
                {label}
            </p>

            {/* Bottom animated accent bar */}
            <div
                className={`
                    absolute
                    left-0
                    bottom-0
                    h-1
                    transition-all
                    duration-500
                    ease-out
                    ${accent
                        ? "bg-gradient-to-r from-primary to-amber-400 w-16 group-hover:w-full"
                        : "bg-gradient-to-r from-tertiary-fixed to-teal-300 w-12 group-hover:w-full"
                    }
                `}
            />
        </div>
    );
}

export default StatCard;