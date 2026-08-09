function AttractionCard({
    icon,
    name,
    description
}) {
    return (
        <div className="group relative rounded-3xl bg-[#fff8f4] border border-[#dec0b7]/70 p-7 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-primary/40 flex flex-col justify-between">
            {/* Subtle top accent gradient */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div>
                <div className="w-13 h-13 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white shadow-sm">
                    <span className="material-symbols-outlined text-2xl">
                        {icon || "explore"}
                    </span>
                </div>

                <h3 className="font-display text-xl font-bold text-[#1f1b15] mb-2.5 group-hover:text-primary transition-colors">
                    {name}
                </h3>

                <p className="font-body text-sm text-[#57423b] leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
}

export default AttractionCard;