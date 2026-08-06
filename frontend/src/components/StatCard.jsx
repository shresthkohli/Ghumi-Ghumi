// // A single rounded stat bubble 

// function StatCard({ value, label}) {
//     return (
//         <div className="bg-white/40 p-6 rounded-3xl flex flex-col items-center text-center shadow-sm">

//         <span className="text-primary font-display text-4xl font-bold">
//             {value}
//         </span>

//         <span className="font-body text-xs text-on-surface-variant uppercase tracking-widest mt-1">
//             {label}
//         </span>

//         </div>
//     )
// }

// export default StatCard;

function StatCard({
    icon,
    value,
    label,
    accent = false,
}) {
    return (
        <div
            className={`
                group relative overflow-hidden rounded-3xl
                border border-white/10
                bg-white/5 backdrop-blur-md
                p-6
                transition-all duration-500
                hover:-translate-y-1
                hover:border-primary/40
                hover:shadow-[0_20px_40px_rgba(0,0,0,0.18)]
            `}
        >
            {/* Glow */}
            <div
                className={`
                    absolute -top-12 -right-12 h-28 w-28 rounded-full
                    blur-3xl transition-opacity duration-500
                    ${accent ? "bg-primary/25" : "bg-tertiary-fixed/15"}
                    opacity-0 group-hover:opacity-100
                `}
            />

            {/* Icon */}
            <div
                className={`
                    relative mb-5 flex h-14 w-14 items-center justify-center
                    rounded-2xl
                    transition-all duration-500
                    ${accent
                        ? "bg-primary text-on-primary"
                        : "bg-white/10 text-tertiary-fixed"}
                    group-hover:scale-110
                `}
            >
                <span className="material-symbols-outlined text-3xl">
                    {icon}
                </span>
            </div>

            {/* Value */}
            <h3 className="relative font-display text-display-sm text-white leading-none">
                {value}
            </h3>

            {/* Label */}
            <p className="relative mt-2 font-body text-label-lg tracking-wide text-white/65 uppercase">
                {label}
            </p>

            {/* Bottom Accent */}
            <div
                className={`
                    absolute bottom-0 left-0 h-1
                    bg-gradient-to-r
                    transition-all duration-500
                    group-hover:w-full
                    ${accent
                        ? "from-primary to-primary-fixed w-12"
                        : "from-tertiary-fixed to-primary-fixed w-8"}
                `}
            />
        </div>
    );
}

export default StatCard;