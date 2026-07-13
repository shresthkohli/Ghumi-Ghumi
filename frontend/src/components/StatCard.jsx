// A single rounded stat bubble 

function StatCard({ value, label}) {
    return (
        <div className="bg-white/40 p-6 rounded-3xl flex flex-col items-center text-center shadow-sm">

        <span className="text-primary font-display text-4xl font-bold">
            {value}
        </span>

        <span className="font-body text-xs text-on-surface-variant uppercase tracking-widest mt-1">
            {label}
        </span>

        </div>
    )
}

export default StatCard;