function AchievementCard({ badge }) {
    if (!badge) return null;

    const {
        name,
        description,
        icon,
    } = badge;

    return (
        <div className="group relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-tertiary to-tertiary-dark p-8 text-white shadow-warm-lg transition-all duration-500 hover:-translate-y-1">

            {/* Animated shine */}
            <div
                className="
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
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-amber-300/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative flex items-center gap-6">

                {/* Badge Icon */}
                <div
                    className="
                        flex h-28 w-28 shrink-0 items-center justify-center
                        rounded-full
                        bg-primary-container
                        transition-all duration-700
                        group-hover:scale-105
                        group-hover:bg-gradient-to-br
                        group-hover:from-amber-300
                        group-hover:to-amber-500
                        group-hover:shadow-[0_0_30px_rgba(251,191,36,0.55)]
                    "
                >
                    <span className="material-symbols-outlined text-7xl">
                        {icon}
                    </span>
                </div>

                {/* Text */}
                <div className="relative flex-1">

                    <p className="font-body text-label-md uppercase tracking-[0.3em] text-white/60">
                        Current Badge
                    </p>

                    <h2 className="mt-2 font-display text-headline-md">
                        {name}
                    </h2>

                    <p className="mt-3 font-body text-body-md leading-relaxed text-white/80">
                        {description}
                    </p>

                </div>

            </div>

        </div>
    );
}

export default AchievementCard;