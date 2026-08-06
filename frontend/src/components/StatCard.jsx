function StatCard({

    value,
    label,
    icon,
    accent = false,

}) {

    return (

        <div
            className="
                group
                relative
                overflow-hidden
                rounded-[2rem]
                bg-tertiary-dark
                border
                border-tertiary/30
                p-7
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-primary/40
                hover:shadow-2xl
            "
        >

            {/* Decorative circle */}

            <div
                className="
                    absolute
                    -right-10
                    -top-10
                    h-28
                    w-28
                    rounded-full
                    bg-white/5
                "
            />

            {/* Icon */}

            <div
                className={`
                    relative
                    mb-8
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    transition-all
                    duration-300

                    ${
                        accent
                        ? "bg-primary text-on-primary"
                        : "bg-tertiary text-tertiary-fixed"
                    }
                `}
            >
                <span className="material-symbols-outlined text-3xl">
                    {icon}
                </span>
            </div>

            {/* Number */}

            <h2 className="font-display text-5xl text-white leading-none">

                {value}

            </h2>

            {/* Label */}

            <p className="mt-3 font-body text-white/70">

                {label}

            </p>

            {/* Bottom bar */}

            <div
                className={`
                    absolute
                    left-0
                    bottom-0
                    h-1

                    ${
                        accent
                        ? "bg-primary w-20"
                        : "bg-tertiary-fixed w-14"
                    }

                    group-hover:w-full
                    transition-all
                    duration-500
                `}
            />

        </div>

    );

}

export default StatCard;