function AttractionCard({
    icon,
    name,
    description
}) {
    return (
        <div className="group relative rounded-3xl bg-white/5 border border-white/10 p-7 backdrop-blur-md shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/10 hover:border-tertiary-fixed/30 hover:shadow-2xl flex flex-col justify-between">
            {/* Subtle top accent gradient */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-gradient-to-r from-transparent via-tertiary-fixed/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div>
                <div className="w-13 h-13 rounded-2xl bg-tertiary-fixed/15 border border-tertiary-fixed/30 text-tertiary-fixed flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:bg-tertiary-fixed group-hover:text-tertiary-dark shadow-sm">
                    <span className="material-symbols-outlined text-2xl">
                        {icon || "explore"}
                    </span>
                </div>

                <h3 className="font-display text-xl font-bold text-white mb-2.5 group-hover:text-tertiary-fixed transition-colors">
                    {name}
                </h3>

                <p className="font-body text-sm text-white/75 leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
}

export default AttractionCard;