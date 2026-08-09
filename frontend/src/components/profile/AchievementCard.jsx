function AchievementCard({ badge }) {
    if (!badge) return null;

    const {
        name,
        description,
        icon,
    } = badge;

    return (
        <section className="group relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-tertiary to-tertiary-dark p-8 text-white shadow-warm-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
            {/* Animated shine line on hover */}
            <div
                className="
                    pointer-events-none
                    absolute inset-0
                    bg-gradient-to-r
                    from-transparent
                    via-amber-300/20
                    to-transparent
                    -translate-x-full
                    group-hover:translate-x-full
                    transition-transform
                    duration-1000
                    ease-in-out
                "
            />

            {/* Soft glow */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-amber-300/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                {/* Badge Icon */}
                <div
                    className="
                        flex h-24 w-24 sm:h-28 sm:w-28 shrink-0 items-center justify-center
                        rounded-full
                        bg-primary-container
                        text-white
                        transition-all duration-500
                        group-hover:scale-105
                        group-hover:rotate-6
                        group-hover:bg-gradient-to-br
                        group-hover:from-amber-300
                        group-hover:to-amber-500
                        group-hover:text-slate-950
                        group-hover:shadow-[0_0_30px_rgba(251,191,36,0.55)]
                    "
                >
                    <span className="material-symbols-outlined text-6xl sm:text-7xl">
                        {icon}
                    </span>
                </div>

                {/* Text */}
                <div className="relative flex-1">
                    <p className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                        Current Badge
                    </p>

                    <h2 className="mt-1.5 font-display text-3xl sm:text-4xl font-bold">
                        {name}
                    </h2>

                    <p className="mt-2 font-body text-sm sm:text-base leading-relaxed text-white/80 max-w-2xl">
                        {description}
                    </p>
                </div>
            </div>
        </section>
    );
}

export default AchievementCard;