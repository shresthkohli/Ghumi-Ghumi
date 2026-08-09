// One "Curated Highlight" tile — an icon, a title, and a short description

export default function HighlightCard({ icon, title, description }) {
    return (
        <div className="group rounded-2xl border border-white/10 bg-surface-container-highest/10 p-6 backdrop-blur-sm transition-all hover:bg-surface-container-highest/20">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-tertiary/30 transition-transform group-hover:scale-110">
                <span
                    className="material-symbols-outlined text-4xl text-tertiary-fixed"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                >
                {icon}
                </span>
            </div>
            <h3 className="font-display text-headline-md text-white mb-2">{title}</h3>
            <p className="font-body text-body-md text-white/70">{description}</p>
        </div>
    );
}